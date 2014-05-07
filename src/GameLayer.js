var GameLayer = cc.LayerColor.extend({

    ctor: function( level ) {
        this._super();
        this.level = level;
    },

    init: function() {
        this._super( new cc.Color4B( 0, 0, 0, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        console.log('level: '+this.level);
        this.maze = new Maze( this.level );
        this.maze.setPosition( cc.p( 0, 40 ) );
        this.addChild( this.maze );

        this.fox = new Fox( 18*40 + 20, 1*40 + 20 , this);
        this.maze.addChild( this.fox );
        this.fox.scheduleUpdate();
        this.fox.setMaze( this.maze );

        this.setKeyboardEnabled( true );
        this.scheduleUpdate();
        this.status = GameLayer.STATUS.START;
        this.count = 0;
        this.sp = new SlicePlace(1);
        return true;
    },


    onKeyDown: function( e ) {
        if( this.status != GameLayer.STATUS.END && this.fox.status == Fox.STATUS.CONTROLLABLE ) {
            switch( e ) {
            case cc.KEY.left:
                this.fox.setNextDirection( Fox.DIR.LEFT );
                break;
            case cc.KEY.right:
                this.fox.setNextDirection( Fox.DIR.RIGHT );
                break;
            case cc.KEY.up:
                this.fox.setNextDirection( Fox.DIR.UP );
                break;
            case cc.KEY.down:
                this.fox.setNextDirection( Fox.DIR.DOWN );
                break;
            }
        }
        if( this.status == GameLayer.STATUS.END && e == cc.KEY.space )
        {
            var director = cc.Director.getInstance();
            if( this.level < this.maze.MAP.length )
                director.replaceScene(cc.TransitionFade.create( 1, new GameScene( this.level ) ) );
            else
                director.replaceScene(cc.TransitionFade.create( 1, new GameScene( 0 ) ) );
        }
    },

    onKeyUp: function( e ) {
        if( this.status != GameLayer.STATUS.END ) {
            switch( e ) {
            case cc.KEY.left:
                if( this.fox.direction == Fox.DIR.LEFT );
                this.fox.setNextDirection( Fox.DIR.STILL );
                break;
            case cc.KEY.right:
                if( this.fox.direction == Fox.DIR.RIGHT );
                this.fox.setNextDirection( Fox.DIR.STILL );
                break;
            case cc.KEY.up:
                if( this.fox.direction == Fox.DIR.UP );
                this.fox.setNextDirection( Fox.DIR.STILL );
                break;
            case cc.KEY.down:
                if( this.fox.direction == Fox.DIR.DOWN );
                this.fox.setNextDirection( Fox.DIR.STILL );
                break;
            }
        }
    },

    isWall: function( blockX, blockY ) {
        var r = this.HEIGHT - blockY - 1;
        var c = blockX;
        return this.MAP[ r ][ c ] == '#';
    },

    update: function() {
        
        
        if( this.status != GameLayer.STATUS.END )
        {
            var obstacles = this.maze.getObstacles();
            for(var i=0; i<obstacles.length; i++) {
                if( obstacles[i].hit( this.fox ) )
                {
                    this.status = GameLayer.STATUS.END;

                    this.label1 = cc.LabelTTF.create( 'GAMEOVER', 'Arial', 120 );
                    this.label1.setPosition( new cc.Point( screenWidth/2, screenHeight/2 ) );
                    this.addChild( this.label1 );

                    this.label2 = cc.LabelTTF.create( 'Press spacebar to retry', 'Arial', 60 );
                    this.label2.setPosition( new cc.Point( screenWidth/2, screenHeight/2 - 120 ) );
                    this.addChild( this.label2 );
                }
            }
            
            var dots = this.maze.getDots();
            for(var i=0; i<dots.length; i++)
            {
                if( dots[i].hit( this.fox ) )
                {
                    dots[i].remove();
                    this.count++;
                    if( this.count == 3 )
                        this.maze.goal.open();
                }
            }

            var goal = this.maze.goal;
            if( goal.hit( this.fox) && this.status != GameLayer.STATUS.END )
            {
                this.status = GameLayer.STATUS.END;

                this.label1 = cc.LabelTTF.create( 'YOU WIN', 'Arial', 120 );
                this.label1.setPosition( new cc.Point( screenWidth/2, screenHeight/2 ) );
                this.addChild( this.label1 );

                this.label2 = cc.LabelTTF.create( 'Press spacebar to continue', 'Arial', 60 );
                this.label2.setPosition( new cc.Point( screenWidth/2, screenHeight/2 - 120 ) );
                this.addChild( this.label2 );

                this.level++;

                console.log('level up: '+this.level);
            }

            var SlicePlaces = this.maze.getSlicePlaces();
            var isHitSlicePlace = false;
            for(var i=0; i<SlicePlaces.length; i++)
            {
                if( SlicePlaces[i].hit( this.fox ) )
                {
                    isHitSlicePlace = true;
                    
                    this.fox.setNextDirection( SlicePlaces[i].direction );
                }
            }
            if( isHitSlicePlace ) {
                this.fox.setStatus( Fox.STATUS.OUT_OF_CONTROL );
            }
            else {
                if( this.fox.status == Fox.STATUS.OUT_OF_CONTROL )
                    this.fox.setNextDirection( Fox.DIR.STILL );
                this.fox.setStatus( Fox.STATUS.CONTROLLABLE );
            }
                
        }   
        


    },
});

GameLayer.STATUS = {
    START: 0,
    END: 1,
    FINISH: 2
}

var GameScene = cc.Scene.extend({
    ctor: function( level ) {
        this._super();
        this.level = level;
    },

    onEnter: function() {
        this._super();
        var layer = new GameLayer( this.level );
        layer.init();
        this.addChild( layer );
    }
});