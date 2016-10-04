pt.radialPlotEvolution = pt.radialPlotEvolution || {};

pt.radialPlotEvolution.init = function() {
	
	//Remove any existing svgs
	d3.select('#radial-plot-evolution #radialPlotEvolution svg').remove();

	///////////////////////////////////////////////////////////////////////////
	//////////////////// Set up and initiate svg containers ///////////////////
	///////////////////////////////////////////////////////////////////////////	

	var margin = {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};
	var width = $(".slides").width()*0.95 - margin.left - margin.right;
	var height = $(".slides").height()*0.95 - margin.top - margin.bottom;
				
	//SVG container
	pt.radialPlotEvolution.svg = d4.select('#radial-plot-evolution #radialPlotEvolution')
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom);
		
	var svg = pt.radialPlotEvolution.svg.append("g")
		.attr("transform", "translate(" + (margin.left + width/2) + "," + (margin.top + height/2) + ")");


	///////////////////////////////////////////////////////////////////////////
	/////////////////////// Create simpel donut chart /////////////////////////
	///////////////////////////////////////////////////////////////////////////

	var innerRadius = 300,
		outerRadius = innerRadius + 30,
		outerRadiusSmall = 188;
	pt.radialPlotEvolution.innerRadius = innerRadius;
	pt.radialPlotEvolution.outerRadius = outerRadius;

	//Some random data
	var donutData = [15, 9, 19, 12, 14, 21, 18];
	var barData = 	[642, 1827, 2179, 2587, 2846, 2782, 2931, 2635, 2903, 3179, 3057, 2829, 2638, 2832, 2774, 3147, 3379, 3432, 6773, 3458, 3497, 2861, 3203, 6762, 4839, 4041, 3962, 3873, 2904, 2453, 2631, 2694, 2781, 2739, 3226, 4602, 3171, 3076, 3445, 3073, 3218, 3256, 3538, 3376, 4292, 3955, 3662, 4392, 5252, 3897, 3695, 3532, 2965];

	pt.radialPlotEvolution.barScale = d3.scale.linear()
		.domain([0, d3.max(barData)])
		.range([outerRadius,outerRadius * 0.4]);

	var barScaleSmall = d3.scale.linear()
		.domain([0, d3.max(barData)])
		.range([outerRadiusSmall,outerRadiusSmall * 0.5]);

	//Create a color scale
	pt.radialPlotEvolution.colorScale = d3.scale.linear()
	   .domain([1,3.5,6])
	   .range(["#2c7bb6", "#ffffbf", "#d7191c"])
	   .interpolate(d3.interpolateHcl);

	pt.radialPlotEvolution.colorLength = 7;

	//The first small donut  
	pt.radialPlotEvolution.smallArc = d3.svg.arc()
		.innerRadius(60) 
		.outerRadius(70)
		.padAngle(0.01);

	//The large same width donut 
	pt.radialPlotEvolution.arc = d3.svg.arc()
		.innerRadius(innerRadius) 
		.outerRadius(outerRadius)
		.padAngle(0.01);

	//The difference height donut
	pt.radialPlotEvolution.growArc = d3.svg.arc()
		.innerRadius(function(d) { return d.barValue; }) 
		.outerRadius(outerRadius)
		.padAngle(0.01);

	//The small difference height donut
	pt.radialPlotEvolution.growArcSmall = d3.svg.arc()
		.innerRadius(function(d) { return barScaleSmall(d.barValue); }) 
		.outerRadius(outerRadiusSmall)
		.padAngle(0.01);

	//The 7 slices donut
	var angleOffset = 2 * Math.PI * 0.95 * 157/365;
	var pieDonut = d3.layout.pie()
		.startAngle( -angleOffset )
		.endAngle( 2 * Math.PI * 0.9675 - angleOffset )
		.value(function(d) { return d; })
		.sort(null);
	//The 53 slices pie
	var pieBar = d3.layout.pie()
		.startAngle( -angleOffset )
		.endAngle( 2 * Math.PI * 0.9675 - angleOffset )
		.value(function(d) { return 10; })
		.sort(null);

	pt.radialPlotEvolution.donutDataPie = pieDonut(donutData);
	pt.radialPlotEvolution.barDataPie = pieBar(barData);

	//Create a new dataset for the small bar slices
	pt.radialPlotEvolution.newBarData = [];
	pt.radialPlotEvolution.barDataPie.forEach(function(d) {
		var avgAngle = d.startAngle + (d.endAngle - d.startAngle)/2;
		pt.radialPlotEvolution.newBarData.push({
			startAngle: avgAngle - 1.5 * Math.PI/180,
			endAngle: avgAngle + 1.5 * Math.PI/180,
			barValue: d.data
		});	
	});//forEach

	////////////////////////////////////////////////////////////// 
	//////////////////// Create Donut Chart ////////////////////// 
	////////////////////////////////////////////////////////////// 

	pt.radialPlotEvolution.donutWrapper = svg.append("g").attr("class", "donutWrapper");

	//Create the donut slices
	pt.radialPlotEvolution.donutWrapper.selectAll(".donutArcSlices")
		.data(pt.radialPlotEvolution.donutDataPie)
	  	.enter().append("path")
		.attr("class", "donutArcSlices")
		.attr("d", pt.radialPlotEvolution.smallArc)
		.style("fill", "#D3D3D3") //function(d,i) { return pt.radialPlotEvolution.colorScale(i); })
		.style("opacity", 0)
		.each(function(d) { this._current = d; });
		
	pt.radialPlotEvolution.previousFragment = "start";

}//init

pt.radialPlotEvolution.showSketch = function() {

	//Show sketch
	d3.select("#radial-plot-evolution #sketch")
		.transition().duration(500)
		.style("opacity", 1);

	//The donut slices
	pt.radialPlotEvolution.donutWrapper.selectAll(".donutArcSlices")
		.transition().duration(1000)
		.attr("d", pt.radialPlotEvolution.smallArc)
		.style("opacity", 0);

	//if(pt.radialPlotEvolution.previousFragment === "start") d3.select("#radial-plot-evolution").attr("data-autoslide", 2500);

	pt.radialPlotEvolution.previousFragment = "showSketch";

}//showSketch


pt.radialPlotEvolution.createDonut = function() {

	//Fade out sketch
	d3.select("#radial-plot-evolution #sketch")
		.transition().duration(2000)
		.style("opacity", 0);

	if(pt.radialPlotEvolution.previousFragment === "showSketch") {
		pt.radialPlotEvolution.donutWrapper.selectAll(".donutArcSlices")
			.transition("show").duration(500)
			.style("opacity", 1);

		pt.radialPlotEvolution.donutWrapper.selectAll(".donutArcSlices")
			.transition("grow").duration(1500).delay(1000)
			.attr("d", pt.radialPlotEvolution.arc);
	} else {
		var donuts = pt.radialPlotEvolution.donutWrapper.selectAll(".donutArcSlices")
        	.data(pt.radialPlotEvolution.donutDataPie);
    	pt.radialPlotEvolution.changeArcs(donuts, pt.radialPlotEvolution.arc);
	}//else

	if(pt.radialPlotEvolution.previousFragment === "showSketch") d3.select("#radial-plot-evolution").attr("data-autoslide", 3500);

	pt.radialPlotEvolution.previousFragment = "createDonut";

}//createDonut


pt.radialPlotEvolution.createDonutBars = function() {

    var donuts = pt.radialPlotEvolution.donutWrapper.selectAll(".donutArcSlices")
      	.data(pt.radialPlotEvolution.barDataPie);
    pt.radialPlotEvolution.changeArcs(donuts, pt.radialPlotEvolution.arc);

    pt.radialPlotEvolution.donutWrapper.selectAll(".donutArcSlices")
    	.transition("colorChange").duration(1000)
		.style("fill", "#D3D3D3");

	if(pt.radialPlotEvolution.previousFragment === "createDonut") d3.select("#radial-plot-evolution").attr("data-autoslide", 2000);

    pt.radialPlotEvolution.previousFragment = "createDonutBars";

}//createDonutBars


pt.radialPlotEvolution.growBars = function() {

    var donuts = pt.radialPlotEvolution.donutWrapper.selectAll(".donutArcSlices")
      	.data(pt.radialPlotEvolution.newBarData);
    pt.radialPlotEvolution.changeArcs(donuts, pt.radialPlotEvolution.growArc);

	donuts.style("fill", "#D3D3D3");

	//Hide final (in case you move backward)
	d3.select("#radial-plot-evolution #final")
		.transition().duration(500)
		.style("opacity", 0);

	//Show bars (in case you move backward)
	pt.radialPlotEvolution.donutWrapper.selectAll(".donutArcSlices")
		.transition("show").duration(500)
		.style("opacity", 1);

	if(pt.radialPlotEvolution.previousFragment === "createDonutBars") d3.select("#radial-plot-evolution").attr("data-autoslide", 2000);

	pt.radialPlotEvolution.previousFragment = "growBars";

}//growBars

pt.radialPlotEvolution.showFinal = function() {

	//Show sketch
	d3.select("#radial-plot-evolution #final")
		.transition().duration(1000).delay(500)
		.style("opacity", 1);

	//Decrease size of the total bar plot
	pt.radialPlotEvolution.donutWrapper.selectAll(".donutArcSlices")
		.data(pt.radialPlotEvolution.newBarData)
		.transition("makeSmall").duration(1000)
		.attr("d", pt.radialPlotEvolution.growArcSmall);
	//Hide the total bar chart
	pt.radialPlotEvolution.donutWrapper.selectAll(".donutArcSlices")
		.transition("hide").duration(2000)
		.style("opacity", 0);

	if(pt.radialPlotEvolution.previousFragment === "growBars") d3.select("#radial-plot-evolution").attr("data-autoslide", 0);

	pt.radialPlotEvolution.previousFragment = "showFinal";

}//showFinal


pt.radialPlotEvolution.changeArcs = function(donuts, arc) {
	
	//Thanks to http://blockbuilder.org/sxywu/8192e134d310a91beeb433fa65c21c9f

	var exit = donuts.exit();
	var enter = donuts.enter().append('path')
			.attr("class", "donutArcSlices");
	var enterUpdate = enter.merge(donuts)
	   	 	.style("fill", "#D3D3D3") ;//function(d,i) { return pt.radialPlotEvolution.colorScale(i%pt.radialPlotEvolution.colorLength); });

	//Remove the arcs
	exit.each(function(d) {
	    // the arcs that need to exit, animate it back to its starting angle
	    d.start = {startAngle: d.startAngle, endAngle: d.endAngle};
	    d.end = {startAngle: d.startAngle, endAngle: d.startAngle};
	});
	exit.transition().duration(500)
  		.attrTween('d', arcTween())
  		.remove();

  	//Update the other acrs
	enterUpdate.each(function(d) {
		var current = this._current ? this._current : {startAngle: 0, endAngle: 0, barValue: pt.radialPlotEvolution.innerRadius};
		var currentBarValue = typeof current.barValue === "undefined" ? pt.radialPlotEvolution.innerRadius : pt.radialPlotEvolution.barScale(current.barValue);
		var barValue = typeof d.barValue === "undefined" ? pt.radialPlotEvolution.innerRadius : pt.radialPlotEvolution.barScale(d.barValue);
      	d.start = {startAngle: current.startAngle, endAngle: current.endAngle, barValue: currentBarValue};
      	d.end = {startAngle: d.startAngle, endAngle: d.endAngle, barValue: barValue};
      	this._current = d;
	});
  	enterUpdate.transition().duration(1000)
  		.style("opacity", 1)
      	.attrTween('d', arcTween());


  function arcTween() {
	  return function(d) {
	    // interpolate both its starting and ending angles
	    var interpolateStart = d3.interpolate(d.start.startAngle, d.end.startAngle);
	    var interpolateEnd = d3.interpolate(d.start.endAngle, d.end.endAngle);
	    var interpolateBar = d3.interpolate(d.start.barValue, d.end.barValue);
	    return function(t) {
	      return arc({
	        startAngle: interpolateStart(t),
	        endAngle: interpolateEnd(t),
	        barValue: interpolateBar(t)
	      });
	    };
	  };
	}//arcTween

}//changeArcs
