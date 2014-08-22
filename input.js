

var keys = {37:0, 38:0, 39:0, 40:0};
var updateKeys = function(e) {
	var key = e.keyCode;
	if (key == 65 || key == 32 || (key > 36 && key < 41)) keys[key] = (e.type === 'keydown') ? true : false;
};
onkeydown = onkeyup = updateKeys