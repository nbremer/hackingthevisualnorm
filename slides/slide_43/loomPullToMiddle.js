pt.loomPullToMiddle = pt.loomPullToMiddle || {};

pt.loomPullToMiddle.init = function() {
	
	//Remove any existing svgs
	d3.select('#loom-pull-to-middle #loomPullToMiddle svg').remove();

	///////////////////////////////////////////////////////////////////////////
	//////////////////// Set up and initiate svg containers ///////////////////
	///////////////////////////////////////////////////////////////////////////	

	var margin = {
		top: 10,
		right: 0,
		bottom: 10,
		left: 0
	};
	var width = $(".slides").width()*0.95 - margin.left - margin.right;
	var height = $(".slides").height()*0.7 - margin.top - margin.bottom;
				
	//SVG container
	pt.loomPullToMiddle.svg = d3.select('#loom-pull-to-middle #loomPullToMiddle')
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom);
		
	var svg = pt.loomPullToMiddle.svg.append("g")
	    .attr("transform", "translate(" + (margin.left + width / 2) + "," + (margin.top + height / 2) + ")");

	///////////////////////////////////////////////////////////////////////////
	//////////////////////////// General variables ////////////////////////////
	///////////////////////////////////////////////////////////////////////////	

	var outerRadius = Math.min(width, height) * 0.5 - 40,
	    innerRadius = outerRadius*0.96;

	var chord = d4.chord()
	    .padAngle(0.08)
	    .sortSubgroups(d4.descending);

	pt.loomPullToMiddle.arc = d4.arc()
	    .innerRadius(innerRadius)
	    .outerRadius(outerRadius);

	var formatValue = d4.formatPrefix(",.0", 1e3);

	var color = d4.scaleOrdinal()
	    .domain(d4.range(4))
	    .range(["#000000", "#FFDD89", "#957244", "#F26223"]);

	///////////////////////////////////////////////////////////////////////////
	///////////////////////// Different ribbon functions //////////////////////
	///////////////////////////////////////////////////////////////////////////	

	//From http://bl.ocks.org/mbostock/4062006
	// From http://mkweb.bcgsc.ca/circos/guide/tables/
	var matrix = [
	  [11975,  5871, 8916, 2868],
	  [ 1951, 10048, 2060, 6171],
	  [ 8010, 16145, 8090, 8045],
	  [ 1013,   990,  940, 6907]
	];
	pt.loomPullToMiddle.originalChordData = chord(matrix);

	//New matrix with only the data for the chords that are a source in the original
	var newMatrix = [
	  [11975,  	5871, 	8916, 	2868],
	  [ 0, 		10048, 	0, 		6171],
	  [ 0, 		16145, 	8090, 	8045],
	  [ 0,   	0,  	0, 		6907]
	];
	pt.loomPullToMiddle.newChordData = chord(newMatrix);


	pt.loomPullToMiddle.ribbon = d4.ribbon()
	    .radius(innerRadius);

	pt.loomPullToMiddle.adjustedRibbon = pt.loomPullToMiddle.adjustedRibbonFunction()
	    .radius(innerRadius);

	///////////////////////////////////////////////////////////////////////////
	////////////////////////// Draw the similar factors ///////////////////////
	///////////////////////////////////////////////////////////////////////////	

	var arcWrapper = svg.append("g").attr("class", "arcWrapper");
	  
	pt.loomPullToMiddle.arcs = arcWrapper.selectAll(".arc")
	    .data(pt.loomPullToMiddle.originalChordData.groups)
	    .enter().append("path")
	    .attr("class", "arc")
	    .style("fill", function(d) { return color(d.index); })
	    .style("stroke", function(d) { return d4.rgb(color(d.index)).darker(); })
	    .attr("d", pt.loomPullToMiddle.arc);

	var chordWrapper = svg.append("g").attr("class", "ribbonWrapper");

	pt.loomPullToMiddle.chords = chordWrapper.selectAll(".ribbon")
	    .data(pt.loomPullToMiddle.originalChordData)
	    .enter().append("path")
	  	.attr("class", "ribbon")
	  	.style("fill", function(d) { return color(d.target.index); })
	    .style("stroke", function(d) { return d4.rgb(color(d.target.index)).darker(); })
	    .attr("d", pt.loomPullToMiddle.ribbon);

}//init

pt.loomPullToMiddle.normalChord = function() {
	pt.loomPullToMiddle.chords
		.transition().duration(1000)
      	.attrTween("d", function(d) {
      		//https://bl.ocks.org/mbostock/3916621
      		var d1 = pt.loomPullToMiddle.ribbon(d), 
      			precision = 4;

	      	var path0 = this,
		        path1 = path0.cloneNode(),
		        n0 = path0.getTotalLength(),
		        n1 = (path1.setAttribute("d", d1), path1).getTotalLength();

		    // Uniform sampling of distance based on specified precision.
		    var distances = [0], i = 0, dt = precision / Math.max(n0, n1);
		    while ((i += dt) < 1) distances.push(i);
		    distances.push(1);

		    // Compute point-interpolators at each distance.
		    var points = distances.map(function(t) {
		      var p0 = path0.getPointAtLength(t * n0),
		          p1 = path1.getPointAtLength(t * n1);
		      return d3.interpolate([p0.x, p0.y], [p1.x, p1.y]);
		    });

		    return function(t) {
		      return t < 1 ? "M" + points.map(function(p) { return p(t); }).join("L") : d1;
		    };
	    });
}//normalChord

pt.loomPullToMiddle.adjustedChord = function() {

	//Adjust the arcs to their original state (in case you move backward)
	pt.loomPullToMiddle.arcs
	    .data(pt.loomPullToMiddle.originalChordData.groups)
	    .transition().duration(2000)
	    .attr("d", pt.loomPullToMiddle.arc);

	//Adjust the arcs to end in the middle
	pt.loomPullToMiddle.chords
		.data(pt.loomPullToMiddle.originalChordData)
		.transition().duration(2000)
      	.attrTween("d", function(d) {
      		//https://bl.ocks.org/mbostock/3916621
      		var d1 = pt.loomPullToMiddle.adjustedRibbon(d), 
      			precision = 4;

	      	var path0 = this,
		        path1 = path0.cloneNode(),
		        n0 = path0.getTotalLength(),
		        n1 = (path1.setAttribute("d", d1), path1).getTotalLength();

		    // Uniform sampling of distance based on specified precision.
		    var distances = [0], i = 0, dt = precision / Math.max(n0, n1);
		    while ((i += dt) < 1) distances.push(i);
		    distances.push(1);

		    // Compute point-interpolators at each distance.
		    var points = distances.map(function(t) {
		      var p0 = path0.getPointAtLength(t * n0),
		          p1 = path1.getPointAtLength(t * n1);
		      return d3.interpolate([p0.x, p0.y], [p1.x, p1.y]);
		    });

		    return function(t) {
		      return t < 1 ? "M" + points.map(function(p) { return p(t); }).join("L") : d1;
		    };
	    });
}//adjustedChord

//Not really what is done, but visually gives the right idea
pt.loomPullToMiddle.adjustedArc = function() {

	//Adjust the arcs to have no leftover
	pt.loomPullToMiddle.arcs
	    .data(pt.loomPullToMiddle.newChordData.groups)
	    .transition().duration(1500)
	    .attr("d", pt.loomPullToMiddle.arc);

	//Adjust the chords to fit the new arcs
	pt.loomPullToMiddle.chords
		.data(pt.loomPullToMiddle.newChordData)
		.transition().duration(1500)
      	.attrTween("d", function(d) {
      		//https://bl.ocks.org/mbostock/3916621
      		var d1 = pt.loomPullToMiddle.adjustedRibbon(d), 
      			precision = 4;

	      	var path0 = this,
		        path1 = path0.cloneNode(),
		        n0 = path0.getTotalLength(),
		        n1 = (path1.setAttribute("d", d1), path1).getTotalLength();

		    // Uniform sampling of distance based on specified precision.
		    var distances = [0], i = 0, dt = precision / Math.max(n0, n1);
		    while ((i += dt) < 1) distances.push(i);
		    distances.push(1);

		    // Compute point-interpolators at each distance.
		    var points = distances.map(function(t) {
		      var p0 = path0.getPointAtLength(t * n0),
		          p1 = path1.getPointAtLength(t * n1);
		      return d3.interpolate([p0.x, p0.y], [p1.x, p1.y]);
		    });

		    return function(t) {
		      return t < 1 ? "M" + points.map(function(p) { return p(t); }).join("L") : d1;
		    };
	    });
}//adjustedArc

pt.loomPullToMiddle.adjustedRibbonFunction = function() {
  	var halfPi$2 = Math.PI / 2;

  	var slice$5 = Array.prototype.slice;

	function constant$11(x) {
	    return function() {
	      return x;
	    };
	}

    var source = function(d) { return d.source; },
        target = function(d) { return d.target; },
        radius = function(d) { return d.radius; },
        startAngle = function(d) { return d.startAngle; },
        endAngle = function(d) { return d.endAngle; },
        context = null;

    function ribbon() {
      var buffer,
          argv = slice$5.call(arguments),
          s = source.apply(this, argv),
          t = target.apply(this, argv),
          sr = +radius.apply(this, (argv[0] = s, argv)),
          sa0 = startAngle.apply(this, argv) - halfPi$2,
          sa1 = endAngle.apply(this, argv) - halfPi$2,
          sx0 = sr * Math.cos(sa0),
          sy0 = sr * Math.sin(sa0),
          sx1 = sr * Math.cos(sa1),
          sy1 = sr * Math.sin(sa1),
          ta0 = 0,
          ta1 = 0;

      if (!context) context = buffer = d4.path();

      context.moveTo(sx0, sy0);
      context.arc(0, 0, sr, sa0, sa1);
      context.bezierCurveTo(sx1/2, sy1, sx1/2, ta1, ta0, ta1);
      context.bezierCurveTo(sx0/2, ta1, sx0/2, sy0, sx0, sy0);
      context.closePath();

      if (buffer) return context = null, buffer + "" || null;
    }

    ribbon.radius = function(_) {
      return arguments.length ? (radius = typeof _ === "function" ? _ : constant$11(+_), ribbon) : radius;
    };

    ribbon.startAngle = function(_) {
      return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant$11(+_), ribbon) : startAngle;
    };

    ribbon.endAngle = function(_) {
      return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant$11(+_), ribbon) : endAngle;
    };

    ribbon.source = function(_) {
      return arguments.length ? (source = _, ribbon) : source;
    };

    ribbon.target = function(_) {
      return arguments.length ? (target = _, ribbon) : target;
    };

    ribbon.context = function(_) {
      return arguments.length ? ((context = _ == null ? null : _), ribbon) : context;
    };

    return ribbon;

}//adjustedRibbonFunction
