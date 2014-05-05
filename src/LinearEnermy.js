var LinearEnermy = cc.Sprite.extend({
    ctor: function( x, y, dir ) {
        this._super();
        this.initWithFile( 'images/Obs.png' );

        this.centerX = x;
        this.centerY = y;
        this.radian = 0;
        this.x = x;
        this.y = y;
        this.direction = dir;
        this.updatePosition();
    },

    setDirection: function( dir ) {
        this.direction = dir;
    },

    setRadian: function( r ) {
    	this.radian = r;
    },

    update: function() {
        this.turnAround();
        this.autoMove();
    },

    turnAround: function() {
        if( this.x > this.centerX + this.radian )
            this.direction = LinearEnermy.DIR.LEFT;
        if( this.x < this.centerX - this.radian )
            this.direction = LinearEnermy.DIR.RIGHT;
        if( this.y > this.centerY + this.radian )
            this.direction = LinearEnermy.DIR.DOWN;
        if( this.y < this.centerY - this.radian )
            this.direction = LinearEnermy.DIR.UP;
    },

    autoMove: function() {
       switch ( this.direction ) {
        case LinearEnermy.DIR.UP:
            this.y += LinearEnermy.MOVE_STEP;
            break;
        case LinearEnermy.DIR.DOWN:
            this.y -= LinearEnermy.MOVE_STEP;
            break;
        case LinearEnermy.DIR.LEFT:
            this.x -= LinearEnermy.MOVE_STEP;
            break;
        case LinearEnermy.DIR.RIGHT:
            this.x += LinearEnermy.MOVE_STEP;
            break;
        }
        this.updatePosition();
    },

    updatePosition: function() {
        this.setPosition( cc.p( this.x, this.y ) );
    },

    hit: function( obj ) {
        var objPos = obj.getPosition();
        var myPos = this.getPosition();
 
        return checkCollision( objPos.x, objPos.y, myPos.x, myPos.y, 10 );
    },
});

LinearEnermy.MOVE_STEP = 2;
LinearEnermy.DIR = {
    LEFT: 1,
    RIGHT: 2,
    UP: 3,
    DOWN: 4,
    STILL: 0
};