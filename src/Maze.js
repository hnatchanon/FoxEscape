var Maze = cc.Node.extend({
    ctor: function() {
        this._super();
        this.WIDTH = 20;
        this.HEIGHT = 13;
        this.MAP = [
            '####################',
            '#..................#',
            '#..................#',
            '#..................#',
            '#..................#',
            '#..................#',
            '#..................#',
            '#..................#',
            '#..................#',
            '#..................#',
            '#..................#',
            '#..................#',
            '####################'
        ];

        this.blockes = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
 
        for ( var r = 0; r < this.HEIGHT; r++ ) {
            for ( var c = 0; c < this.WIDTH; c++ ) {
                if ( this.MAP[ r ][ c ] == '#' ) {
                    var s = cc.Sprite.create( 'images/wall.png' );
                    s.setAnchorPoint( cc.p( 0, 0 ) );
                    s.setPosition( cc.p( c * 40, (this.HEIGHT - r - 1) * 40 ) );
                    this.addChild( s );
                } else if ( this.MAP[ r ][ c ] == '.' ) {
                    var d = new Dot();
                    d.setPosition( cc.p( c * 40 + 20, (this.HEIGHT -r - 1) * 40 + 20 ) );
                    this.addChild( d );
                    this.blockes[ r ][ c ] = d;
                }
            }
        }

        this.setAnchorPoint( cc.p( 0, 0 ) );
    },

    isWall: function( blockX, blockY ) {
        var r = this.HEIGHT - blockY - 1;
        var c = blockX;
        return this.MAP[ r ][ c ] == '#';
    },

    getDot: function( blockX, blockY ) {
        var r = this.HEIGHT - blockY - 1;
        var c = blockX;
        console.log(this.blockes);
        return this.blockes[ r ][ c ];
    },

    removeDot: function( blockX, blockY, dot ) {
        this.removeChild(dot);
    },
});