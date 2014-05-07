var Goal = cc.Sprite.extend({
	ctor: function() {
		this._super();
		this.initWithFile( 'images/door_1.png' );

		var animation = new cc.Animation.create();
		animation.addSpriteFrameWithFile( 'images/door_2.png' );
		animation.addSpriteFrameWithFile( 'images/door_3.png' );
		animation.addSpriteFrameWithFile( 'images/door_4.png' );
		animation.setDelayPerUnit( 0.3 );
		this.action = cc.Animate.create( animation );

		this.status = Goal.STATUS.CLOSE;
	},

	open: function() {
		if( this.status == Goal.STATUS.CLOSE )
		{
			this.runAction( this.action );
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