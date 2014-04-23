var checkCollision = function(obj1X, obj1Y, obj2X, obj2Y, r ) {
	return Math.abs(obj1X - obj2X) <= r && Math.abs(obj1Y - obj2Y) <= r;
}