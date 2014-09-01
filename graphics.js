

var graphics = {};
var cis = ['b', 'a', 'g', 'y', 'o', 'r'];
var colors = ['DodgerBlue', 'Aqua', 'Lime', 'Gold', 'Orange', 'Red']

var resetGraphic = function(g, s) {
	g.clearRect(0, 0, s, s);
	return new Image();
};

var genGraphics = function(g) {
	var c = g.canvas;
	for (var i = 0; i < colors.length; i++) {
		var ci = graphics[cis[i]] = {};
		//circle
		var r = resetGraphic(g, objSize);
		//draw
		g.fillStyle = colors[i];
		g.beginPath();
		g.arc(halfObjSize, halfObjSize, halfObjSize, 0, 2 * Math.PI);
		g.fill();
		r.src = c.toDataURL('image/png');
		ci.circle = r;
		//next shape
		var r = resetGraphic(g, objSize);
		//rect
		g.fillRect(0, 0, objSize, objSize);
		r.src = c.toDataURL('image/png');
		ci.rect = r;
		//next shape
		var r = resetGraphic(g, objSize);
		//hex
		g.beginPath();
		var hex = [halfObjSize, 0, objSize, quarterObjSize, objSize, quarter3ObjSize, halfObjSize, objSize, 0, quarter3ObjSize, 0, quarterObjSize];
		g.moveTo(hex[0], hex[1]);
		for(var j = 2; j < hex.length -1; j += 2)
			g.lineTo(hex[j], hex[j+1]);
		g.fill();
		r.src = c.toDataURL('image/png');
		ci.hex = r;
		//next shape
		var r = resetGraphic(g, objSize);
		//tri
		g.beginPath();
		var tri = [halfObjSize, 0, objSize, objSize, 0, objSize];
		g.moveTo(tri[0], tri[1]);
		for(var j = 2; j < hex.length -1; j += 2)
			g.lineTo(tri[j], tri[j+1]);
		g.fill();
		r.src = c.toDataURL('image/png');
		ci.tri = r;
		//reset canvas
		resetGraphic(g, size);
	}
};