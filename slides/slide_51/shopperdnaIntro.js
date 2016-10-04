pt.shopperdnaIntro = pt.shopperdnaIntro || {};

pt.shopperdnaIntro.init = function() {
	
	//Remove any existing svgs
	d3.select('#intro-shopperdna #shopperdnaIntro svg').remove();

	pt.shopperdnaIntro.growCircles = true;

	///////////////////////////////////////////////////////////////////////////
	//////////////////// Set up and initiate svg containers ///////////////////
	///////////////////////////////////////////////////////////////////////////	

	var margin = {
		top: 10,
		right: 0,
		bottom: 10,
		left: 0
	};
	var width = $(".slides").width()*0.75 - margin.left - margin.right;
	var height = $(".slides").height()*0.75 - margin.top - margin.bottom;
				
	//SVG container
	pt.voronoiIntro.svg = d3.select('#intro-shopperdna #shopperdnaIntro')
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom);
		
	var svg = pt.voronoiIntro.svg.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	///////////////////////////////////////////////////////////////////////////
	/////////////////////// Calculate hexagon variables ///////////////////////
	///////////////////////////////////////////////////////////////////////////	

	var SQRT3 = Math.sqrt(3),
		hexRadius = Math.min(width, height)/2,
		hexWidth = SQRT3 * hexRadius,
		hexHeight = 2 * hexRadius;
	var hexagonPoly = [[0,-1],[SQRT3/2,0.5],[0,1],[-SQRT3/2,0.5],[-SQRT3/2,-0.5],[0,-1],[SQRT3/2,-0.5]];
	var hexagonPath = "m" + hexagonPoly.map(function(p){ return [p[0]*hexRadius, p[1]*hexRadius].join(','); }).join('l') + "z";

	///////////////////////////////////////////////////////////////////////////
	///////////////////////////// Create gradient /////////////////////////////
	///////////////////////////////////////////////////////////////////////////	

	var defs = svg.append("defs");

	//Create a clip path that is the same as the top hexagon
	defs.append("clipPath")
        .attr("id", "clip")
        .append("path")
        .attr("d", "M" + (width/2) + "," + (height/2) + hexagonPath);

	///////////////////////////////////////////////////////////////////////////
	////////////// Get continuous color scale for the Rainbow /////////////////
	///////////////////////////////////////////////////////////////////////////

	var colors = ["#EFB605", "#E8A301", "#E47D06", "#E23B19", "#DB0131", "#C80044", 
					"#AF0158", "#991C71", "#7F378D", "#5C4DA4", "#3465A8", "#108492", 
					"#0AA174", "#35B15F", "#7EB852"];

	///////////////////////////////////////////////////////////////////////////
	///////////////////////////// Set up bundle ///////////////////////////////
	///////////////////////////////////////////////////////////////////////////

	var circleRadius = hexWidth/2*0.7,
		nColors = colors.length,
		circleData = d3.range(0,nColors*2);

	//http://stackoverflow.com/questions/23137621/error-reading-json-file-in-bundle-layout-in-d3-js?rq=1
	var bundleData = [];
	for(var i = 0; i < nColors*2; i++) {
		var point1 = randomData(i, nColors*2),
			point2 = randomData(i, nColors*2, point1); 

		bundleData.push({
			name: "data." + i,
			imports: [ "data." + point1, "data." + point2]
		});
	}//for i

	function randomData(i, nColors, point1) {
		point1 = point1 || i;

		var otherPoint = Math.floor( Math.random() * nColors );

		if(otherPoint === i) {
			if(otherPoint - 1 === point1) {
				otherPoint = otherPoint + 1;
			} else {
				otherPoint = otherPoint - 1;
			}
		} else if (otherPoint === point1) {
			if(otherPoint - 1 === i) {
				otherPoint = otherPoint + 1;
			} else {
				otherPoint = otherPoint - 1;
			}
		}//else if
		return otherPoint%nColors;
	}//randomData

	var cluster = d3.layout.cluster()
	    .size([360, circleRadius]);

	var bundle = d3.layout.bundle();

	var line = d3.svg.line.radial()
	    .interpolate("bundle")
	    .tension(.75)
	    .radius(function(d) { return d.y - 10; })
	    .angle(function(d) { return d.x / 180 * Math.PI; });

	var nodes = cluster.nodes(packageHierarchy(bundleData));
	var links = packageImports(nodes);

	///////////////////////////////////////////////////////////////////////////
	////////////////////// Place circles inside hexagon ///////////////////////
	///////////////////////////////////////////////////////////////////////////	

    //First append a group for the clip path, then a new group that can be transformed
	var bundleWrapper = svg.append("g")
		.attr("clip-path", "url(#clip")
		.style("clip-path", "url(#clip)") //make it work in safari
		.append("g")
		.style("isolation","isolate")
		.attr("transform", "translate(" + (width/2) + "," + (height/2) + ")");

	var linkWrapper = bundleWrapper.append("g").attr("class","linkWrapper");
	var link = linkWrapper.selectAll(".link")
		.data(bundle(links))
    	.enter().append("path")
        .attr("class", "link")
      	.each(function(d) { d.source = d[0], d.target = d[d.length - 1]; })
      	.attr("d", line);

    var nodeWrapper = bundleWrapper.append("g").attr("class","nodeWrapper");
	var node = nodeWrapper.selectAll(".circles")
	  	.data(nodes.filter(function(n) { return !n.children; }))
	  	.enter().append("circle")
	  	.attr("class", "circles")
	  	.attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + (d.y + 10) + ",0)"; })
	    .attr("r", function(d,i) { return Math.random()*22 + 4; })
	    .style("opacity", 1)
	    .style("mix-blend-mode","multiply")
	    .style("fill", function(d,i) { return colors[ i % nColors ]; });

    //Initialize the chain of movement
	node.transition().duration(100)
		.each("end", grow);
	link
		.each(function(d) { d.pathLength =  d3.select(this).node().getTotalLength(); })
      	.style("stroke-dasharray", function(d) { return d.pathLength; })
      	.style("stroke-dashoffset", function(d) { return d.pathLength; })
		.transition().duration(100)
	    .each("end", jump);

	///////////////////////////////////////////////////////////////////////////
	///////////////////////// Place Hexagon in center /////////////////////////
	///////////////////////////////////////////////////////////////////////////	

	//Place a hexagon on the scene
	svg.append("path")
		.attr("class", "hexagon")
		.attr("d", "M" + (width/2) + "," + (height/2) + hexagonPath)
		.style("stroke", "#0aa174")
		.style("stroke-width", "7px")
		.style("fill", "none");

	///////////////////////////////////////////////////////////////////////////
	///////////////////////////// Node movement ///////////////////////////////
	///////////////////////////////////////////////////////////////////////////	

	function grow(d) {

		if(!pt.shopperdnaIntro.growCircles) return;

		//Transition the circle to its new location
		d3.select(this)
			.transition("growing").duration(1000 + 4000*Math.random())
			.delay(function(d,i) { return Math.random() * 1000; })
		    .attr("r", function(d,i) { return Math.random() * 70 + 20; })
		    .style("opacity", 0.5)
		    .transition("shrinking").duration(1000 + 3000*Math.random())
		    .attr("r", 8)
		    .style("opacity", 1)
			.each("end", grow);

	}//function grow

	///////////////////////////////////////////////////////////////////////////
	///////////////////////////// Link movement ///////////////////////////////
	///////////////////////////////////////////////////////////////////////////	

	function jump(d) {

		if(!pt.shopperdnaIntro.growCircles) return;

		var el = d3.select(this);

		//Only sometimes make the line jump
		if(Math.random() > 0.075) {
			el.transition("doNothing").duration(0)
				.delay(1000 + 6000*Math.random())
				.each("end", jump);
		} else { 
			el
				.style("stroke-dashoffset", d.pathLength)
				.style("stroke-width", Math.random() * 6 + 2)
				.style("opacity", Math.random() / 2 + 0.1)
			  	.transition("jumpToFront").duration(750 + 2000*Math.random())
				.style("stroke-dashoffset", 0)
				.transition("jumpToEnd").duration(750 + 2000*Math.random())
				.style("stroke-dashoffset", -d.pathLength)
				.transition("jumpBackFront").duration(750 + 2000*Math.random())
				.style("stroke-dashoffset", 0)
				.transition("jumpBackEnd").duration(750 + 2000*Math.random())
				.style("stroke-dashoffset", d.pathLength)
				.each("end", jump);
		}//else	

	}//function jump

	///////////////////////////////////////////////////////////////////////////
	///////////////////////////// Helper functions ////////////////////////////
	///////////////////////////////////////////////////////////////////////////	

	//From https://bl.ocks.org/mbostock/7607999
	// Lazily construct the package hierarchy from class names.
	function packageHierarchy(classes) {
	  var map = {};

	  function find(name, data) {
	    var node = map[name], i;
	    if (!node) {
	      node = map[name] = data || {name: name, children: []};
	      if (name.length) {
	        node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
	        node.parent.children.push(node);
	        node.key = name.substring(i + 1);
	      }
	    }
	    return node;
	  }

	  classes.forEach(function(d) {
	    find(d.name, d);
	  });

	  return map[""];
	}//packageHierarchy

	// Return a list of imports for the given array of nodes.
	function packageImports(nodes) {
	  var map = {},
	      imports = [];

	  // Compute a map from name to node.
	  nodes.forEach(function(d) {
	    map[d.name] = d;
	  });

	  // For each import, construct a link from the source to target node.
	  nodes.forEach(function(d) {
	    if (d.imports) d.imports.forEach(function(i) {
	      imports.push({source: map[d.name], target: map[i]});
	    });
	  });

	  return imports;
	}//packageImports

}//init
