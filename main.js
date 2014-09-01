

/*******************************
* Setup and Constants
*******************************/

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

/*******************************
* Transformations for Canvases
*******************************/

var fade = 0.12;

var transformVals = [
[0, 0, 0, 0, 0, 0, 1],
[0, -160, -160, 90, 0, 0, fade],
[0, 0, -320, 0, 180, 0, 0],
[0, 160, -160, -90, 0, 0, fade],
[-160, 0, -160, 0, -90, 0, fade],
[160, 0, -160, 0, 90, 0, fade]
];

/*******************************
* Movement and Rotation Setup
*******************************/

var csv = [0, 1, 2, 3],
csh = [0, 4, 2, 5],
csvP = [],
cshP = [];

/*******************************
* Movement
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

/*******************************
* Rotation
*******************************/

var reconcileRotation = function(arr, other) {
	other[0] = arr[0];
	other[2] = arr[2];
};
var pushShift = function(arr) {
	arr.push(arr.shift());
	reconcileRotation(arr, (arr === csv) ? csh : csv);
};
var unshiftPop = function(arr) {
	arr.unshift(arr.pop());
	reconcileRotation(arr, (arr === csv) ? csh : csv);
};

var rotationDir = 0,
rotationTimer = 0,
newTransformValues = [],
nextTransformVals = [];

var rotate = function(dir) {
	switch (dir) {
		case 0:
		csvP = csv;
		pushShift(csv);
		break;
		case 1:
		csvP = csv;
		unshiftPop(csv);
		break;
		case 2:
		cshP = csh;
		pushShift(csh);
		break;
		case 3:
		cshP = csh;
		unshiftPop(csh);
		break;
	}
	rotationDir = dir;
	rotationTimer = 60;
	//console.log(csv);
	//console.log(csh);
	//console.log(object.c);
};

/*******************************
* Main Game Loop
*******************************/

var lerp = function(percent, a, b) {
	return a + percent * (b - a);
};

var animate = function() {
	requestAnimationFrame(animate);

	for (var i = 0; i < 6; i++) {
		var ti = (i < 4) ? csv[i] : (i === 4) ? csh[1] : csh[3];
		
		var g = contexts[ti];

		if (rotationTimer > 0 && i === 0) {
			var p = rotationTimer/60;
			newTransformVals = transformVals[i].slice(0);
			nextTransformVals = transformVals[i + 1].slice(0);
			for (var j = 0; j < 7; j++) {
				newTransformVals[j] = lerp(p, newTransformVals[j], nextTransformVals[j]);
			}

			transform(g.canvas, newTransformVals);

			rotationTimer--;
			continue;
		}

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
		if (i === 0) g.canvas.style.zIndex = 999;
		else g.canvas.style.zIndex = 0;

		player.um(g, ti, i);
		player.u(g, ti, i);

		if (player.c !== ti) continue;

		for (var k = 37; k < 41; k++)
			if (keys[k]) player.a.a(moves[k]);

		if (keys[32]) player.f();
		if (keys[65]) player.m = [];

	}
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

	player = new Obj(graphics.y.tri);
	player.z = true;
	player.p.s(halfSize, size);

	animate();
};
