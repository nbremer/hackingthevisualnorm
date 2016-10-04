pt.loomIntro = pt.loomIntro || {};

pt.loomIntro.init = function() {
	
	//Remove any existing svgs
	d3.select('#intro-loom #loomIntro svg').remove();

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
	pt.loomIntro.svg = d3.select('#intro-loom #loomIntro')
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom);
		
	var svg = pt.loomIntro.svg.append("g")
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

	////////////////////////////////////////////////////////////
	/////////////////// Create dummy data //////////////////////
	////////////////////////////////////////////////////////////

	var data = [
		{"outside": "A", "inside": "z", "value": 100},
		{"outside": "A", "inside": "x", "value": 30},
		{"outside": "A", "inside": "y", "value": 50},
		{"outside": "A", "inside": "s", "value": 120},
		{"outside": "B", "inside": "z", "value": 60},
		{"outside": "B", "inside": "w", "value": 70},
		{"outside": "C", "inside": "x", "value": 80},
		{"outside": "C", "inside": "y", "value": 20},
		{"outside": "C", "inside": "v", "value": 50},
		{"outside": "C", "inside": "t", "value": 100},
		{"outside": "D", "inside": "y", "value": 60},
		{"outside": "D", "inside": "z", "value": 20},
		{"outside": "E", "inside": "y", "value": 70},
		{"outside": "E", "inside": "x", "value": 30},
		{"outside": "E", "inside": "u", "value": 30},
		{"outside": "F", "inside": "s", "value": 90},
		{"outside": "F", "inside": "x", "value": 10},
		{"outside": "F", "inside": "z", "value": 60},
		{"outside": "F", "inside": "v", "value": 80},
		{"outside": "G", "inside": "y", "value": 100},
		{"outside": "G", "inside": "s", "value": 50},
		{"outside": "G", "inside": "t", "value": 120},
		{"outside": "H", "inside": "w", "value": 60},
		{"outside": "H", "inside": "z", "value": 70}
	];
	////////////////////////////////////////////////////////////
	///////////////////////// Colors ///////////////////////////
	////////////////////////////////////////////////////////////
					
	//Color for the unique locations
	var colors = ["#EFB605", "#E47D06", "#DB0131", "#AF0158", "#7F378D", "#3465A8", "#0AA174", "#7EB852"];
	var color = d4.scaleOrdinal()
    	.range(colors);
	
	///////////////////////////////////////////////////////////////////////////
	///////////////////////////// Create gradient /////////////////////////////
	///////////////////////////////////////////////////////////////////////////	

	var defs = svg.append("defs");
	
	//Create a clip path that is the same as the top hexagon
	defs.append("clipPath")
        .attr("id", "clip")
        .append("path")
        .attr("d", "M" + (width/2) + "," + (height/2) + hexagonPath);

	////////////////////////////////////////////////////////////
	//////////////////// Chord variables ///////////////////////
	////////////////////////////////////////////////////////////
		
	var pullOutSize = 20,
		defaultOpacity = 0.85,
		innerRadius = Math.min(width * 0.5, height * 0.5),
	    outerRadius = innerRadius * 1.05;
							
	var loom = pt.loomLotRFinal.loom()
	    .padAngle(0.04)
		.heightInner(0)
		.emptyPerc(0.1)
		//.sortSubgroups(sortCharacter)
		.widthOffsetInner(0)
		.value(function(d) { return d.value; })
		.inner(function(d) { return d.inside; })
		.outer(function(d) { return d.outside; });

	var arc = d4.arc()
	    .innerRadius(innerRadius*1.01)
	    .outerRadius(outerRadius);

	var string = pt.loomLotRFinal.string()
	    .radius(innerRadius)
		.pullout(pullOutSize);

	////////////////////////////////////////////////////////////
	////////////////////// Create strings //////////////////////
	////////////////////////////////////////////////////////////
	
	//Create a group that already holds the data
	var loomWrapper = svg.append("g")
		.attr("clip-path", "url(#clip")
		.style("clip-path", "url(#clip)")
		.append("g")
	    .attr("transform", "translate(" + (width/2) + "," + (height/2) + ")")
	    .attr("class", "loom-wrapper")
		.datum(loom(data));	
	
	var stringWrapper = loomWrapper.append("g")
	    .attr("class", "stringWrapper")
		.style("isolation", "isolate");

	loomStrings = stringWrapper.selectAll("path")
	    .data(function(strings) { return strings; })
	  	.enter().append("path")
		.attr("class", "string")
		.style("mix-blend-mode", "multiply")
		//.style("stroke", function(d) { return d4.rgb( color(d.outer.outername) ).darker(0.2) ; })
		//.style("stroke-width", 2)
	    .attr("d", string)
	    .style("fill", function(d) { return d4.rgb( color(d.outer.innername) ) ; })
		.style("opacity", defaultOpacity);

	///////////////////////////////////////////////////////////////////////////
	///////////////////////// Place Hexagon in center /////////////////////////
	///////////////////////////////////////////////////////////////////////////	

	//Place a hexagon on the scene
	svg.append("path")
		.attr("class", "hexagon")
		.attr("d", "M" + (width/2) + "," + (height/2) + hexagonPath)
		.style("stroke", "#DFDFDF")
		.style("stroke-width", "7px")
		.style("fill", "none");

	// ////////////////////////////////////////////////////////////
	// ///////////////////// Extra functions //////////////////////
	// ////////////////////////////////////////////////////////////

	// pt.loomIntro.changeColor = true;

	// loomStrings.transition().duration(500)
	//     .delay(function(d,i) { return Math.random()*1000 + 500; })
	//     .each(colorSwap);

	// //Function based on http://blockbuilder.org/mbostock/1125997
	// function colorSwap(d) {
	// 	var group = d3.select(this);
	// 	var element = d;
	// 	(function repeat() {

	// 		if(!pt.loomIntro.changeColor) return;

	// 		var dur = Math.random()*2000 + 500;

	// 	    group = group.transition()
	//   			.duration(dur)
	//   			.style("fill", function(d) { 
	//   				return colors[Math.round(Math.random()*(colors.length-1))]; 
	//   			})
	//   			.each("end", repeat);

	// 	})();
	// }//colorSwap

}//init