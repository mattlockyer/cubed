

var Vector = function(x, y) {
	var t = this;
	t.x = x;
	t.y = y;
};

Vector.prototype = {
	constructor:Vector,
	s:Vector,
	a:function(o) {
		var t = this;
		t.x += o.x;
		t.y += o.y;
	},
	m:function(v) {
		var t = this;
		t.x *= v;
		t.y *= v;
	}
};