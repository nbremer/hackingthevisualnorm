pt.brushIntro = pt.brushIntro || {};

pt.brushIntro.init = function() {

	//Remove any existing svgs
	d3.select('#intro-brush #brushIntro svg').remove();

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
	pt.brushIntro.svg = d4.select('#intro-brush #brushIntro')
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom);
		
	var svg = pt.brushIntro.svg.append("g")
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

    //Create rainbow gradient for fill
	var colors = ["#EFB605", "#E9A501", "#E48405", "#E34914", "#DE0D2B", "#CF003E", "#B90050", "#A30F65", 
				  "#8E297E", "#724097", "#4F54A8", "#296DA4", "#0C8B8C", "#0DA471", "#39B15E", "#7EB852"];

    var rainbowGradient = defs.append("linearGradient")
      .attr("id", "rainbow-brush-intro-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0).attr("y1", height/2 - hexHeight/2)
      .attr("x2", 0).attr("y2", height/2 + hexHeight/2);

    rainbowGradient.append("stop").attr("offset", 0).attr("stop-color", colors[0]).attr("stop-opacity", 0);
    rainbowGradient.selectAll(".rainbow-stop") 
      .data(colors)                  
      .enter().append("stop") 
      .attr("class", "rainbow-stop")
      .attr("offset", function(d,i) { return i/(colors.length-1) + (i === (colors.length - 1) ?  -1e-4 : +1e-4); })   
      .attr("stop-color", function(d) { return d; });
    rainbowGradient.append("stop").attr("offset", 1).attr("stop-color", colors[colors.length]).attr("stop-opacity", 0);

	///////////////////////////////////////////////////////////////////////////
	////////////////////// Place circles inside hexagon ///////////////////////
	///////////////////////////////////////////////////////////////////////////	

    //First append a group for the clip path, then a new group that can be transformed
	var voronoiWrapper = svg.append("g")
		.attr("clip-path", "url(#clip")
		.style("clip-path", "url(#clip)") //make it work in safari
		.append("g")
		.attr("transform", "translate(" + (width/2) + "," + 0 + ")");

	//Add the bars
	var recHeight = 30;

	//Add grey bars
	voronoiWrapper.selectAll(".grey-bar")
		.data(d3.range(1,21))
		.enter().append("rect")
		.attr("class", "grey-bar")
		.attr("x", -width/2)
		.attr("y", function(d,i) { return i * (recHeight + 10); })
		.attr("width", width)
		.attr("height", recHeight)
		.style("fill", "#d2d2d2");

	voronoiWrapper.selectAll(".bar")
		.data(d3.range(1,21))
		.enter().append("rect")
		.attr("class", "bar")
		.attr("x", -width/2)
		.attr("y", function(d,i) { return i * (recHeight + 10); })
		.attr("width", width)
		.attr("height", recHeight)
		.style("fill", "url(#rainbow-brush-intro-gradient)");

	pt.brushIntro.loopBrushIntro = true;

	///////////////////////////////////////////////////////////////////////////
	/////////////////////////// Move colored region ///////////////////////////
	///////////////////////////////////////////////////////////////////////////	
		
	var start = height/2 - hexHeight/2,
		range = hexHeight * 0.4,
		end = height/2 + hexHeight/2 - range,
		easing = d4.easePolyInOut;

	moveGradient();

	function moveGradient() {
		
		//Safari can only handle this function when loaded from local host
		if(is_safari) return;
		if (!pt.brushIntro.loopBrushIntro) return; 

		var dur = 3500;

		//Move the top of the gradient
		d3.selectAll("#rainbow-brush-intro-gradient")
			.transition("moveTop").duration(dur).ease(easing)
		    .attrTween("y1", function() { return d3.interpolate(start, end); })
			.transition("moveTop").duration(dur).delay(dur).ease(easing)
	    	.attrTween("y1", function() { return d3.interpolate(end, start); });

		//Move the bottom of the gradient
		d3.selectAll("#rainbow-brush-intro-gradient")
			.transition("moveBottom").duration(dur).ease(easing)
		    .attrTween("y2", function() { return d3.interpolate(start+range, end+range); })
			.transition("moveBottom").duration(dur).delay(dur).ease(easing)
	    	.attrTween("y2", function() { return d3.interpolate(end+range, start+range); });

    	setTimeout(moveGradient, 2*dur + 100);

	}//moveGradient

	///////////////////////////////////////////////////////////////////////////
	///////////////////////// Place Hexagon in center /////////////////////////
	///////////////////////////////////////////////////////////////////////////	

	// //Place a hexagon on the scene
	// svg.append("path")
	// 	.attr("class", "hexagon")
	// 	.attr("d", "M" + (width/2) + "," + (height/2) + hexagonPath)
	// 	.style("stroke", "#DFDFDF")
	// 	.style("stroke-width", "7px")
	// 	.style("fill", "none");

}//init
