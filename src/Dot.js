var Dot = cc.Sprite.extend({
    ctor: function( maze ) {
    	this.maze = maze;
        this._super();
        this.initWithFile( 'images/dot.png' );
    },

    hit: function( obj ) {
	    var objPos = obj.getPosition();
	    var myPos = this.getPosition();
	 	
	    return checkCollision( objPos.x, objPos.y, myPos.x, myPos.y, 10 );
    },

    remove: function() {
    	this.maze.dots.splice( this.maze.dots.indexOf( this ), 1);
    	this.removeFromParent( true );
    }
});