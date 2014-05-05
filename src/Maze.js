var Maze = cc.Node.extend({
    ctor: function() {
        this._super();
        this.WIDTH = 20;
        this.HEIGHT = 13;
        this.MAP = [
            '####################',
            '#*       #   #   #.#',
            '#        # # #+#+#+#',
            '#++++++++# #   #   #',
            '# # # # ## #########',
            '#    -             #',
            '#+#######++#######+#',
            '#                  #',
            '#.################.#',
            '#  |     ||     |  #',
            '#+################+#',
            '#     <<<<<<<<<<<< #',
            '####################'
        ];

        this.obstacles = [];
        this.goal = null;
        this.dots = [];
        this.slicePlaces = [];
 
        for ( var r = 0; r < this.HEIGHT; r++ ) {
            for ( var c = 0; c < this.WIDTH; c++ ) {
                if ( this.MAP[ r ][ c ] == '#' ) {
                    this.createWall( r, c );
                } 
                else if ( this.MAP[ r ][ c ] == '.' ) {
                    this.createDot( r, c );
                }
                else if ( this.MAP[ r ][ c ] == '|' ) {
                    this.createLinearEnermy( r, c, LinearEnermy.DIR.UP );
                }
                else if ( this.MAP[ r ][ c ] == '-' ) {
                    this.createLinearEnermy( r, c, LinearEnermy.DIR.RIGHT );
                }
                else if ( this.MAP[ r ][ c ] == '*') {
                    this.createGoal( r, c );
                }
                else if ( this.MAP[ r ][ c ] == '+') {
                    this.createTrap( r, c );
                }
                else if ( this.MAP[ r ][ c ] == '<') {
                    this.createSlicePlace( r, c, 1 );
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

    createLinearEnermy: function( r, c, dir ) {
        var x = c * 40 + 20;
        var y = (this.HEIGHT -r - 1) * 40 + 20;
        var o = new LinearEnermy( x, y, dir );
        o.setRadian(2*40);
        o.scheduleUpdate();
        this.obstacles.push( o );
        this.addChild( o );
    },

    createTrap: function( r, c ) {
        var x = c * 40 + 20;
        var y = (this.HEIGHT -r - 1) * 40 + 20;
        var t = new Trap( x, y, 1.5 );
        this.obstacles.push( t );
        this.addChild( t );
    },

    createGoal: function( r, c ) {
        var g = new Goal();
        g.setPosition( cc.p( c * 40 + 20, (this.HEIGHT -r - 1) * 40 + 20 ) );
        this.addChild( g );
        this.goal = g;
    },

    createSlicePlace: function( r, c, dir ) {
        var x = c * 40 + 20;
        var y = (this.HEIGHT -r - 1) * 40 + 20;
        /*var sp = new SlicePlace( dir );
        this.slicePlaces.push( sp );
        this.addChild( sp );*/
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