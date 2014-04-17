var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 0, 0, 0, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.maze = new Maze();
        this.maze.setPosition( cc.p( 0, 40 ) );
        this.addChild( this.maze );

        this.fox = new Fox( 18*40 + 20, 1*40 + 20 );
        this.maze.addChild( this.fox );
        this.fox.scheduleUpdate();
        this.fox.setMaze( this.maze );

        this.setKeyboardEnabled( true );
        this.scheduleUpdate();
        this.status = GameLayer.STATUS.START;
        return true;
    },


    onKeyDown: function( e ) {
        if( this.status != GameLayer.STATUS.END ) {
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
        
        var obstacles = this.maze.getObstacles();
        for(var i=0; i<obstacles.length; i++) {
            if( obstacles[i].hit( this.fox ) )
            {
                this.status = GameLayer.STATUS.END;
            }
            
        }
    },
});

GameLayer.STATUS = {
    START: 0,
    END: 1
}

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});