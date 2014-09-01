

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

var container = document.getElementById('c');
var contexts = [];

var graphics = {};

var objects;

var speed = 0.8;

var moves = {
	37:new Vector(-speed, 0),
	38:new Vector(0, -speed),
	39:new Vector(speed, 0),
	40:new Vector(0, speed)
};

var fade = 0.12;

var rotating = false;

var transformVals = [
[0, 0, 0, 0, 0, 0, 1],
[0, -160, -160, 90, 0, 0, fade],
[0, 0, -320, 0, 180, 0, 0],
[0, 160, -160, -90, 0, 0, fade],
[-160, 0, -160, 0, -90, 0, fade],
[160, 0, -160, 0, 90, 0, fade]
];

var csv = [0, 1, 2, 3];
var csh = [0, 4, 2, 5];

/*******************************
* Something is off when you rotate and then rotate the other direction... not sure what.

inconsistency between move and transformations perhaps... otherwise, really close to solution.

Try rotating 1, 2, or 3 times in one direction, other rotations are off, when you are back to canonical, everything is fine...
*******************************/

var move = function(cur, vert, amount) {
	var arr = (vert) ? csv : csh;
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] === cur) break;
	}
	i += amount;
	if (i < 0) i = 3;
	if (i > 3) i = 0;
	return arr[i];
};

var reconcileRotationV = function() {
	csh[0] = csv[0];
	csh[2] = csv[2];
};
var reconcileRotationH = function() {
	csv[0] = csh[0];
	csv[2] = csh[2];
};

var rotate = function(dir) {
	switch (dir) {
		case 0:
		csv.push(csv.shift());
		reconcileRotationV();
		break;
		case 1:
		csv.unshift(csv.pop());
		reconcileRotationV();
		break;
		case 2:
		csh.push(csh.shift());
		reconcileRotationH();
		break;
		case 3:
		csh.unshift(csh.pop());
		reconcileRotationH();
		break;
	}
	//console.log(csv);
	//console.log(csh);
	//console.log(object.c);
};

/*******************************
* Main Game Loop
*******************************/

var animate = function() {
	for (var i = 0; i < 6; i++) {
		var ti = (i < 4) ? csv[i] : (i === 4) ? csh[1] : csh[3];
		
		var g = contexts[ti];
		g.clearRect(0, 0, size, size);

		/*******************************
		* Debugging
		*******************************/
		//g.fillStyle = colors[ti];
		//g.font = "bold 16px Arial";
		//g.fillRect(size/2 - 40, size/2 - 40, 80, 80);
		//g.fillText('index: ' + i, 100, 100);
		//g.fillText('t index: ' + ti, 100, 200);

		transform(g.canvas, transformVals[i]);

		object.u(g, ti);
		object.um(g, ti);

		if (object.c !== ti) continue;

		for (var k = 37; k < 41; k++)
			if (keys[k]) object.a.a(moves[k]);

		if (keys[32]) object.f();
		if (keys[65]) object.m = [];

	}

	requestAnimationFrame(animate);
};

var transform = function(el, args) {
	var s = el.style;
	s.opacity = args[6];
	s.transform = 'perspective(40px) translate3d(' + args[0] + 'px, ' + args[1] + 'px, '
		+ args[2] + 'px) rotateX(' + args[3] + 'deg) rotateY(' + args[4] + 'deg) rotateZ(' + args[5] + 'deg)';
};

/*******************************
* Start
*******************************/

window.onload = function() {
	
	for (var i = 0; i < 6; i++) {
		var c = document.createElement('canvas');
		c.width = c.height = size;
		container.appendChild(c);
		contexts.push(c.getContext('2d'));
	}

	genGraphics(contexts[0]);

	object = new Obj(graphics.y.tri);
	object.z = true;
	object.p.s(halfSize, size);

	animate();
};
