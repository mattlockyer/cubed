

var PI = Math.PI,
QUATER_PI = PI / 4,
HALF_PI = PI / 2,
TWO_PI = PI * 2;

var size = 320,
halfSize = 160,
//object sizes
objSize = 16,
halfObjSize = 8,
quarterObjSize = 4,
quarter3ObjSize = 12,
bounds = {
	far:size + halfObjSize,
	near:-halfObjSize
};

var body = document.body;
var contexts = [];

var graphics = {};

var object;

var speed = 0.8;
var moves = {
	37:new Vector(-speed, 0),
	38:new Vector(0, -speed),
	39:new Vector(speed, 0),
	40:new Vector(0, speed)
};

/*******************************
* Main Game Loop
*******************************/

var animate = function() {
	requestAnimationFrame(animate);

	var g = contexts[0];
	g.clearRect(0, 0, size, size);

	for (var i = 37; i < 41; i++)
		if (keys[i]) object.a.a(moves[i]);

	if (keys[32]) object.f();
	if (keys[65]) object.m = [];
	
	object.u(g);
};

/*******************************
* Start
*******************************/

window.onload = function() {
	
	for (var i = 0; i < 6; i++) {
		var c = document.createElement('canvas');
		c.width = c.height = size;
		body.appendChild(c);
		contexts.push(c.getContext('2d'));
	}

	genGraphics(contexts[0]);

	object = new Obj(graphics.y.tri);
	object.p.s(halfSize, size);

	animate();
};
