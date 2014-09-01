

/*******************************
* Input
*******************************/

var speed = 0.64;

var moves = {
	37:new Vector(-speed, 0),
	38:new Vector(0, -speed),
	39:new Vector(speed, 0),
	40:new Vector(0, speed)
};

var keys = {37:0, 38:0, 39:0, 40:0};
var updateKeys = function(e) {
	var key = e.keyCode;
	if (key == 65 || key == 32 || (key > 36 && key < 41)) keys[key] = (e.type === 'keydown') ? true : false;
};
onkeydown = onkeyup = updateKeys