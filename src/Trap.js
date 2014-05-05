var Trap = cc.Sprite.extend({
    ctor: function( x, y, d ) {
        this._super();

        this.initWithFile( 'images/trap_1.png' );

        this.setPosition( cc.p( x, y ) );

        this.delay = d;
        this.status = Trap.STATUS.SAFE;
        this.schedule( this.changeStatus, this.delay );
    },

    changeStatus: function() {

        if(this.status == Trap.STATUS.SAFE)
        {
            this.status = Trap.STATUS.UNSAFE
            this.initWithFile( 'images/trap_2.png' );
        }
        else
        {
            this.status = Trap.STATUS.SAFE
            this.initWithFile( 'images/trap_1.png' );
        }
    },

    updatePosition: function() {
        this.setPosition( cc.p( this.x, this.y ) );
    },

    hit: function( obj ) {
        var objPos = obj.getPosition();
        var myPos = this.getPosition();
 
        return checkCollision( objPos.x, objPos.y, myPos.x, myPos.y, 10 ) && this.status == Trap.STATUS.UNSAFE;
    },
});

Trap.STATUS = {
    SAFE: 0,
    UNSAFE: 1
};