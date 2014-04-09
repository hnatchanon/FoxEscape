var Obstacle = cc.Sprite.extend({
    ctor: function( x, y ) {
        this._super();
        this.initWithFile( 'images/Obs.png' );

        this.centerX = x;
        this.centerY = y;
        this.radianX = 0;
        this.radianY = 0;
        this.x = x;
        this.y = y;
        this.direction = Obstacle.DIR.RIGHT;
        this.updatePosition();
    },

    setDirection: function( dir ) {
        this.direction = dir;
    },

    setRadianX: function( r ) {
    	this.radianX = r;
    },

    setRadianY: function( r ) {
    	this.radianY = r;
    },

    update: function() {
    	if( this.x > this.centerX + this.radianX )
        	this.direction = Obstacle.DIR.LEFT;
        if( this.x < this.centerX - this.radianX )
        	this.direction = Obstacle.DIR.RIGHT;
        if( this.y > this.centerY + this.radianY )
        	this.direction = Obstacle.DIR.DOWN;
        if( this.y < this.centerY - this.radianY )
        	this.direction = Obstacle.DIR.UP;

        switch ( this.direction ) {
        case Obstacle.DIR.UP:
            this.y += Obstacle.MOVE_STEP;
            break;
        case Obstacle.DIR.DOWN:
            this.y -= Obstacle.MOVE_STEP;
            break;
        case Obstacle.DIR.LEFT:
            this.x -= Obstacle.MOVE_STEP;
            break;
        case Obstacle.DIR.RIGHT:
            this.x += Obstacle.MOVE_STEP;
            break;
        }

        this.updatePosition();

    },

    updatePosition: function() {
        this.setPosition( cc.p( this.x, this.y ) );
    },
});

Obstacle.MOVE_STEP = 2;
Obstacle.DIR = {
    LEFT: 1,
    RIGHT: 2,
    UP: 3,
    DOWN: 4,
    STILL: 0
};