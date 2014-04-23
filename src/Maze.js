var Maze = cc.Node.extend({
    ctor: function() {
        this._super();
        this.WIDTH = 20;
        this.HEIGHT = 13;
        this.MAP = [
            '####################',
            '#.                 #',
            '#########*######## #',
            '#.#   #            #',
            '# # # # ########## #',
            '# # # #      # #   #',
            '#   # ##### ## # ###',
            '##### # #   .      #',
            '#     # # ###  #   #',
            '# #####            #',
            '# #   ########  @  #',
            '#   #            # #',
            '####################'
        ];

        this.obstacles = [];
        this.goal = null;
        this.dots = [];
 
        for ( var r = 0; r < this.HEIGHT; r++ ) {
            for ( var c = 0; c < this.WIDTH; c++ ) {
                if ( this.MAP[ r ][ c ] == '#' ) {
                    this.createWall( r, c );
                } 
                else if ( this.MAP[ r ][ c ] == '.' ) {
                    this.createDot( r, c );
                }
                else if ( this.MAP[ r ][ c ] == '@' ) {
                    this.createObstacle( r, c );
                }
                else if ( this.MAP[ r ][ c ] == '*') {
                    this.createGoal( r, c );
                }
            }
        }

        this.setAnchorPoint( cc.p( 0, 0 ) );
    },

    createWall: function( r, c ) {
        var s = cc.Sprite.create( 'images/wall.png' );
        s.setAnchorPoint( cc.p( 0, 0 ) );
        s.setPosition( cc.p( c * 40, (this.HEIGHT - r - 1) * 40 ) );
        this.addChild( s );
    },

    createDot: function( r, c ) {
        var d = new Dot( this );
        d.setPosition( cc.p( c * 40 + 20, (this.HEIGHT -r - 1) * 40 + 20 ) );
        this.addChild( d );
        this.dots.push( d );
    },

    createObstacle: function( r, c ) {
        var x = c * 40 + 20;
        var y = (this.HEIGHT -r - 1) * 40 + 20;
        var o = new Obstacle( x, y );
        o.setRadianX(2*40);
        o.scheduleUpdate();
        this.obstacles.push( o );
        this.addChild( o );
    },

    createGoal: function( r, c ) {
        var g = new Goal();
        g.setPosition( cc.p( c * 40 + 20, (this.HEIGHT -r - 1) * 40 + 20 ) );
        this.addChild( g );
        this.goal = g;
    },

    isWall: function( blockX, blockY ) {
        var r = this.HEIGHT - blockY - 1;
        var c = blockX;
        return this.MAP[ r ][ c ] == '#';
    },

    getDots: function() {
        return this.dots;
    },

    getObstacles: function() {
        return this.obstacles;
    },

    removeDot: function( dot ) {
        dots.remove( dot );
    }
});