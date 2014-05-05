var SlicePlace = cc.Sprite.extend({
    ctor: function( dir ) {
        this.direction = dir;
        this._super();
        this.initWithFile( 'images/Sli.png' );
        if( this.direction == SlicePlace.DIR.LEFT )
            this.setRotation( 270 );
        else if( this.direction == SlicePlace.DIR.RIGHT )
            this.setRotation( 90 );
        else if( this.direction == SlicePlace.DIR.DOWN )
            this.setRotation( 180 );

    },

    hit: function( obj ) {
        var objPos = obj.getPosition();
        var myPos = this.getPosition();
        
        return checkCollision( objPos.x, objPos.y, myPos.x, myPos.y, 10 );
    },
});

SlicePlace.DIR = {
    LEFT: 1,
    RIGHT: 2,
    UP: 3,
    DOWN: 4
};