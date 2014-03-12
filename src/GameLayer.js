var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 0, 0, 0, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.maze = new Maze();
        this.maze.setPosition( cc.p( 0, 40 ) );
        this.addChild( this.maze );

        this.fox = new Fox( 10*40 + 20, 6*40 + 20 );
        this.maze.addChild( this.fox );
        this.fox.scheduleUpdate();
        this.fox.setMaze( this.maze );

        this.setKeyboardEnabled( true );
        
        return true;
    },


    onKeyDown: function( e ) {
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
    },

    onKeyUp: function( e ) {
        this.fox.setNextDirection( Fox.DIR.STILL );
    },

    isWall: function( blockX, blockY ) {
        var r = this.HEIGHT - blockY - 1;
        var c = blockX;
        return this.MAP[ r ][ c ] == '#';
    },
});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});