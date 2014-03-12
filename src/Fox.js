var Fox = cc.Sprite.extend({
    ctor: function( x, y ) {
        this._super();
        this.initWithFile( 'images/Fox.png' );
 
        this.x = x;
        this.y = y;
        this.maze = null;
        this.nextDirection = Fox.DIR.STILL;
        this.direction = Fox.DIR.STILL;
        this.updatePosition();
    },
 
    updatePosition: function() {
        this.setPosition( cc.p( this.x, this.y ) );
    },

    setNextDirection: function( dir ) {
        this.nextDirection = dir;
    },

    update: function( dt ) {
        
        if ( this.isAtCenter() ) {
            this.checkDot();
            if ( ! this.isPossibleToMove( this.nextDirection ) ) {
                this.nextDirection = Fox.DIR.STILL;
            }
            this.direction = this.nextDirection;
        }
        switch ( this.direction ) {
        case Fox.DIR.UP:
            this.y += Fox.MOVE_STEP;
            break;
        case Fox.DIR.DOWN:
            this.y -= Fox.MOVE_STEP;
            break;
        case Fox.DIR.LEFT:
            this.x -= Fox.MOVE_STEP;
            break;
        case Fox.DIR.RIGHT:
            this.x += Fox.MOVE_STEP;
            break;
        }
        this.updatePosition();
    },

    isAtCenter: function() {
        return (this.x-20) % 40 == 0 && (this.y-20) % 40 == 0;
    },

    isPossibleToMove: function( dir ) {
        if ( dir == Fox.DIR.STILL ) {
            return true;
        }
        //console.log((this.x - 20) / 40);
        var nextBlockX = ((this.x - 20) / 40) + (( this.nextDirection == Fox.DIR.LEFT )? (-1): ( this.nextDirection == Fox.DIR.RIGHT )? 1:0);
        var nextBlockY = ((this.y - 20) / 40) + (( this.nextDirection == Fox.DIR.UP )? (1): ( this.nextDirection == Fox.DIR.DOWN )? -1:0);
        //console.log(nextBlockX);
        return ! this.maze.isWall( nextBlockX, nextBlockY );
    },

    setDirection: function( dir ) {
        this.direction = dir;
    },

    setMaze: function( maze ) {
        this.maze = maze;
    },

    checkDot: function() {
        // ... from this.x and this.y do something to get blockX and blockY
        var blockX = ((this.x - 20) / 40);
        var blockY = ((this.y - 20) / 40);
        var dot = this.maze.getDot( blockX, blockY );
        if ( dot ) {
            // ... do something..  currently we might do nothing, but our scoring code would appear here.
            this.maze.removeDot( blockX, blockY, dot );           
        }
    },
});

Fox.MOVE_STEP = 5;
Fox.DIR = {
    LEFT: 1,
    RIGHT: 2,
    UP: 3,
    DOWN: 4,
    STILL: 0
};