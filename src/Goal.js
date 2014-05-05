var Goal = cc.Sprite.extend({
	ctor: function() {
		this._super();
		this.initWithFile( 'images/goal_1.png' );
		this.status = Goal.STATUS.CLOSE;
	},

	open: function() {
		if( this.status == Goal.STATUS.CLOSE )
		{
			this.initWithFile( 'images/goal_2.png' );
			this.status = Goal.STATUS.OPEN;
		}
	},

	hit: function( obj ) {
		var objPos = obj.getPosition();
		var myPos = this.getPosition();

		return checkCollision( objPos.x, objPos.y, myPos.x, myPos.y, 10 ) && this.status == Goal.STATUS.OPEN;
	},
});

Goal.STATUS = {
    CLOSE: 1,
    OPEN: 2
};