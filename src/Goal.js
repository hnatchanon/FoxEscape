var Goal = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/goal.png' );
    },

    hit: function( obj ) {
	    var objPos = obj.getPosition();
	    var myPos = this.getPosition();
	 
	    return checkCollision( objPos.x, objPos.y, myPos.x, myPos.y, 10 );
    },
});