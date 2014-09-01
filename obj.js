

var Obj = function(img, p, v, a, d, c) {
	var t = this;
	t.p = p || new Vector(0, 0);
	t.v = v || new Vector(0, 0);
	t.a = a || new Vector(0, 0);
	t.r = 0;
	t.d = d || 0.9;
	this.c = c || 0;
	t.i = img;
	t.m = [];
	t.z = false;
	t.ft = 0;
};

Obj.prototype = {
	constructor:Obj,
	u:function(g, c, i) {
		var t = this,
		p = t.p,
		v = t.v,
		a = t.a;
		//update
		v.a(a);
		p.a(v);
		v.m(t.d);
		a.s(0, 0);
		//firetimer
		if (t.ft > 0) t.ft--;
		//bounds
		if (p.y < bounds.near) {
			p.y = bounds.far;
			t.c = move(t.c, true, 1);
			if (t.z) rotate(0);
		} else if (p.y > bounds.far) {
			p.y = bounds.near;
			t.c = move(t.c, true, -1);
			if (t.z) rotate(1);
		} else if (p.x < bounds.near) {
			p.x = bounds.far;
			t.c = move(t.c, false, 1);
			if (t.z) rotate(2);
		} else if (p.x > bounds.far) {
			p.x = bounds.near;
			t.c = move(t.c, false, -1);
			if (t.z) rotate(3);
		}
		//if you're on the back canvas, return
		if (i === 2) return;
		//rotation
		t.r = Math.atan2(v.y, v.x) + HALF_PI;
		//if this is not your canvas, don't draw
		if (t.c !== c) return;
		//draw
		g.save();
		g.translate(p.x, p.y);
		g.rotate(t.r);
		g.drawImage(t.i, -halfObjSize, -halfObjSize);
		g.restore();
	},
	um:function(g, c, i) {
		var t = this;
		for (var i = 0; i < t.m.length; i++)
			t.m[i].u(g, c, i);
	},
	f:function() {
		var t = this;
		if (t.ft === 0) {
			t.ft = 60;
			t.m.push(new Obj(graphics.b.tri, new Vector(t.p.x, t.p.y), new Vector(t.v.x, t.v.y), null, 1, t.c));
		}
	}
}