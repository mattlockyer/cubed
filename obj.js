

var Obj = function(img, p, v, a, d) {
	var t = this;
	t.p = p || new Vector(0, 0);
	t.v = v || new Vector(0, 0);
	t.a = a || new Vector(0, 0);
	t.r = 0;
	t.d = d || 0.9;
	t.i = img;
	t.m = [];
};

Obj.prototype = {
	constructor:Obj,
	u:function(g) {
		var t = this,
		p = t.p,
		v = t.v,
		a = t.a;
		//update
		v.a(a);
		p.a(v);
		v.m(t.d);
		a.s(0, 0);
		//bounds
		if (p.x > bounds.far) p.x = bounds.near;
		if (p.x < bounds.near) p.x = bounds.far;
		if (p.y > bounds.far) p.y = bounds.near;
		if (p.y < bounds.near) p.y = bounds.far;
		//rotation
		t.r = Math.atan2(v.y, v.x) + HALF_PI;
		//draw
		g.save();
		g.translate(p.x, p.y);
		g.rotate(t.r);
		g.drawImage(t.i, -halfObjSize, -halfObjSize);
		g.restore();

		for (var i = 0; i < t.m.length; i++)
			t.m[i].u(g);
	},
	f:function() {
		var t = this;
		t.m.push(new Obj(graphics.b.tri, new Vector(t.p.x, t.p.y), new Vector(t.v.x, t.v.y), null, 1));
		console.log(t.m.length);
	}
}