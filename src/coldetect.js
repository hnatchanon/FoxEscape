var checkCollision = function(obj1X, obj1Y, obj2X, obj2Y) {
	return Math.abs(obj1X - obj2X) <= 10 && Math.abs(obj1Y - obj2Y) <= 10;
}