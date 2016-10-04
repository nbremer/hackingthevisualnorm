pt.voronoiScatterPlot = pt.voronoiScatterPlot || {};

pt.voronoiScatterPlot.init = function(countries) {
	
	//Remove any existing svgs
	d3.select('#voronoi-scatter-plot #voronoiScatterPlot svg').remove();

	///////////////////////////////////////////////////////////////////////////
	//////////////////// Set up and initiate svg containers ///////////////////
	///////////////////////////////////////////////////////////////////////////	

	var margin = {
		top: 60,
		right: 300,
		bottom: 80,
		left: 80
	};
	pt.voronoiScatterPlot.margin = margin;
	var width = $(".slides").width()*0.80 - margin.left - margin.right;
	var height = $(".slides").height()*0.675 - margin.top - margin.bottom;
	pt.voronoiScatterPlot.height = height;
				
	//SVG container
	pt.voronoiScatterPlot.svg = d4.select('#voronoi-scatter-plot #voronoiScatterPlot')
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom);
		
	var svg = pt.voronoiScatterPlot.svg.append("g")
		.attr("class", "voronoiScatterPlotWrapper")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	///////////////////////////////////////////////////////////////////////////
	/////////////////////////////// Set the colors ////////////////////////////
	///////////////////////////////////////////////////////////////////////////

	pt.voronoiScatterPlot.opacityCircles = 0.7;
	pt.voronoiScatterPlot.maxDistanceFromPoint = 75;

	//Set the color for each region
	var color = d3.scale.ordinal()
					.range(["#EFB605", "#E58903", "#E01A25", "#C20049", "#991C71", "#66489F", "#2074A0", "#10A66E", "#7EB852"])
					.domain(["Africa | North & East", "Africa | South & West", "America | North & Central", "America | South", 
							 "Asia | East & Central", "Asia | South & West", "Europe | North & West", "Europe | South & East", "Oceania"]);

	///////////////////////////////////////////////////////////////////////////
	////////////////////////// Set the scales and axes ////////////////////////
	///////////////////////////////////////////////////////////////////////////

	//Set the new x axis range
	var xScale = d3.scale.log()
		.range([0, width])
		.domain([100,2e5]);
	//Set new x-axis
	var xAxis = d3.svg.axis()
		.orient("bottom")
		.ticks(2)
		.tickFormat(function (d) {
			return xScale.tickFormat(8,function(d) { 
				var prefix = d3.formatPrefix(d); 
				return "$" + prefix.scale(d) + prefix.symbol;
			})(d);
		})	
		.scale(xScale);	
	//Append the x-axis
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(" + 0 + "," + height + ")")
		.call(xAxis);
			
	//Set the new y axis range
	var yScale = d3.scale.linear()
		.range([height,0])
		.domain([42,85]);
	var yAxis = d3.svg.axis()
		.orient("left")
		.ticks(6)
		.scale(yScale);	
	//Append the y-axis
	svg.append("g")
			.attr("class", "y axis")
			.attr("transform", "translate(" + 0 + "," + 0 + ")")
			.call(yAxis);
			
	//Scale for the bubble size
	var rScale = d3.scale.sqrt()
		.range([4,30])
		.domain(d3.extent(countries, function(d) { return d.GDP; }));
	pt.voronoiScatterPlot.rScale = rScale;

	//////////////////////////////////////////////////////
	///////////////// Initialize Labels //////////////////
	//////////////////////////////////////////////////////

	//Set up X axis label
	svg.append("text")
		.attr("class", "x title")
		.attr("transform", "translate(" + width + "," + (height - 10) + ")")
		.text("GDP per capita [US $] - Note the logarithmic scale");

	//Set up y axis label
	svg.append("text")
		.attr("class", "y title")
		.attr("transform", "translate(25, 0) rotate(-90)")
		.text("Life expectancy");

	////////////////////////////////////////////////////////////// 
	//////////////////// Set-up voronoi ////////////////////////// 
	////////////////////////////////////////////////////////////// 

	//Initiate the voronoi function
	var voronoi = d3.geom.voronoi()
		.x(function(d) { return xScale(d.GDP_perCapita); })
		.y(function(d) { return yScale(d.lifeExpectancy); })
		.clipExtent([[0, 0], [width, height]]);

	var voronoiCells = voronoi(countries);

	////////////////////////////////////////////////////////////	
	///////////// Circles to capture close mouse event /////////
	////////////////////////////////////////////////////////////	

    //Create wrapper for the voronoi clip paths
    var clipWrapper = svg.append("defs")
        .attr("class", "clipWrapper");

  	clipWrapper.selectAll(".clip")
		.data(voronoiCells)
		.enter().append("clipPath")
      	.attr("class", "clip")
      	.attr("id", function(d) { return "clip-" + d.point.CountryCode; })
      	.append("path")
      	.attr("class", "clip-path-circle")
      	.attr("d", function(d) { return "M" + d.join(",") + "Z"; });

	//Initiate a group element for the circles	
	var circleClipGroup = svg.append("g")
		.attr("class", "circleClipWrapper"); 
		
	//Place the larger circles to eventually capture the mouse
	pt.voronoiScatterPlot.circlesOuter = circleClipGroup.selectAll(".circle-wrapper")
		.data(countries.sort(function(a,b) { return b.GDP > a.GDP; }))
		.enter().append("circle")
		.attr("class", function(d,i) { return "circle-wrapper " + d.CountryCode; })
		.attr("clip-path", function(d) { return "url(#clip-" + d.CountryCode + ")"; })
        .style("clip-path", function(d) { return "url(#clip-" + d.CountryCode + ")"; })
		.attr("cx", function(d) {return xScale(d.GDP_perCapita);})
		.attr("cy", function(d) {return yScale(d.lifeExpectancy);})
		.attr("r", pt.voronoiScatterPlot.maxDistanceFromPoint)
		.style("fill", "#b3e0ed")
		.style("opacity", 0);

	////////////////////////////////////////////////////////////	
	/////////////////// Scatterplot Circles ////////////////////
	////////////////////////////////////////////////////////////	

	//Initiate a group element for the circles	
	var circleGroup = svg.append("g")
		.attr("class", "circleWrapper"); 

	//Place the country circles
	pt.voronoiScatterPlot.circles = circleGroup.selectAll(".countries")
		.data(countries.sort(function(a,b) { return b.GDP > a.GDP; }))
		.enter().append("circle")
		.attr("class", function(d,i) { return "countries " + d.CountryCode; })
		.attr("cx", function(d) {return xScale(d.GDP_perCapita);})
		.attr("cy", function(d) {return yScale(d.lifeExpectancy);})
		.attr("r", function(d) {return rScale(d.GDP);})
		.style("opacity", pt.voronoiScatterPlot.opacityCircles)
		.style("fill", function(d) {return color(d.Region);});

	////////////////////////////////////////////////////////////// 
	//////////////////////// Voronoi ///////////////////////////// 
	////////////////////////////////////////////////////////////// 

	//Initiate a group element to place the voronoi diagram in
	var voronoiGroup = svg.append("g")
		.attr("class", "voronoiWrapper");
		
	//Create the Voronoi diagram
	pt.voronoiScatterPlot.voronois = voronoiGroup.selectAll("path")
		.data(voronoiCells)
		.enter().append("path")
		.attr("d", function(d, i) { return "M" + d.join("L") + "Z"; })
		.datum(function(d, i) { return d.point; })
		.attr("class", function(d,i) { return "voronoi " + d.CountryCode; });

	///////////////////////////////////////////////////////////////////////////
	//////////////////////// Create the color legend //////////////////////////
	///////////////////////////////////////////////////////////////////////////
		
	var legendWrapper = svg.append("g")
		.attr("class", "legendWrapper")
		.attr("transform", "translate(" + (width + 100) + "," + 30 +")");
	
	var	legendWidth = 145,
		rectSize = 20, //dimensions of the colored square
		rowHeight = 30, //height of a row in the legend
		maxWidth = 144; //width of each row

	legendWrapper.append("text")
		.attr("class", "legendTitle")
		.attr("x", 0)
		.attr("y", -20)
		.text("Region");
		  
	//Create container per rect/text pair  
	var legend = legendWrapper.selectAll(".legendSquare")  	
		  .data(color.range())                              
		  .enter().append("g")   
		  .attr("class", "legendSquare") 
		  .attr("transform", function(d,i) { return "translate(" + 0 + "," + (i * rowHeight) + ")"; })
		  .style("cursor", "pointer")
		  .on("mouseover", selectLegend(0.02))
		  .on("mouseout", selectLegend(pt.voronoiScatterPlot.opacityCircles));
	 
	//Non visible white rectangle behind square and text for better hover
	legend.append("rect")                                     
		  .attr("width", maxWidth) 
		  .attr("height", rowHeight) 			  		  
		  .style("fill", "white");
	//Append small squares to Legend
	legend.append("rect")                                     
		  .attr("width", rectSize) 
		  .attr("height", rectSize) 			  		  
		  .style("fill", function(d) {return d;});                                 
	//Append text to Legend
	legend.append("text")                                     
		  .attr("transform", "translate(" + 30 + "," + (rectSize/2) + ")")
		  .attr("class", "legendText")
		  .attr("dy", ".35em")		  
		  .text(function(d,i) { return color.domain()[i]; });  

	//Decrease opacity of non selected circles when hovering in the legend	
	function selectLegend(opacity) {
		return function(d, i) {
			var chosen = color.domain()[i];
				
			d3.selectAll("#voronoiScatterPlot .countries")
				.filter(function(d) { return d.Region != chosen; })
				.transition()
				.style("opacity", opacity);
		  };
	}//function selectLegend

	///////////////////////////////////////////////////////////////////////////
	//////////////////////// Create the size legend ///////////////////////////
	///////////////////////////////////////////////////////////////////////////

	//Create g element for bubble size legend
	var sizeLegend = legendWrapper.append("g")
						.attr("class", "sizeLegendWrapper")
						.attr("transform", "translate(" + (legendWidth/2 - 30) + "," + (color.domain().length*rowHeight + 75) +")");
	//Draw the bubble size legend
	pt.voronoiScatterPlot.bubbleLegend(sizeLegend, rScale, legendSizes = [1e11,3e12,1e13], legendName = "GDP [Billion $]");		

}//init

//////////////////////////////////////////////////////
/////////////////// Bubble Legend ////////////////////
//////////////////////////////////////////////////////

pt.voronoiScatterPlot.bubbleLegend = function(wrapperVar, scale, sizes, titleName) {

	var legendSize1 = sizes[0],
		legendSize2 = sizes[1],
		legendSize3 = sizes[2],
		legendCenter = 0,
		legendBottom = 50,
		legendLineLength = 35,
		textPadding = 65,
		numFormat = d3.format(",");
	
	wrapperVar.append("text")
		.attr("class","legendTitle")
		.attr("transform", "translate(" + legendCenter + "," + -50 + ")")
		.attr("x", 0 + "px")
		.attr("y", 0 + "px")
		.attr("dy", "1em")
		.text(titleName);
		
	wrapperVar.append("circle")
        .attr('r', scale(legendSize1))
        .attr('class',"legendCircle")
        .attr('cx', legendCenter)
        .attr('cy', (legendBottom-scale(legendSize1)));
    wrapperVar.append("circle")
        .attr('r', scale(legendSize2))
        .attr('class',"legendCircle")
        .attr('cx', legendCenter)
        .attr('cy', (legendBottom-scale(legendSize2)));
    wrapperVar.append("circle")
        .attr('r', scale(legendSize3))
        .attr('class',"legendCircle")
        .attr('cx', legendCenter)
        .attr('cy', (legendBottom-scale(legendSize3)));
		
	wrapperVar.append("line")
        .attr('class',"legendLine")
        .attr('x1', legendCenter)
        .attr('y1', (legendBottom-2*scale(legendSize1)))
		.attr('x2', (legendCenter + legendLineLength))
        .attr('y2', (legendBottom-2*scale(legendSize1)));	
	wrapperVar.append("line")
        .attr('class',"legendLine")
        .attr('x1', legendCenter)
        .attr('y1', (legendBottom-2*scale(legendSize2)))
		.attr('x2', (legendCenter + legendLineLength))
        .attr('y2', (legendBottom-2*scale(legendSize2)));
	wrapperVar.append("line")
        .attr('class',"legendLine")
        .attr('x1', legendCenter)
        .attr('y1', (legendBottom-2*scale(legendSize3)))
		.attr('x2', (legendCenter + legendLineLength))
        .attr('y2', (legendBottom-2*scale(legendSize3)));
		
	wrapperVar.append("text")
        .attr('class',"legendCircleText")
        .attr('x', (legendCenter + legendLineLength + textPadding))
        .attr('y', (legendBottom-2*scale(legendSize1)))
		.attr('dy', '0.4em')
		.text("$ " + numFormat(Math.round(legendSize1/1e9)) + " B");
	wrapperVar.append("text")
        .attr('class',"legendCircleText")
        .attr('x', (legendCenter + legendLineLength + textPadding))
        .attr('y', (legendBottom-2*scale(legendSize2)))
		.attr('dy', '0.4em')
		.text("$ " + numFormat(Math.round(legendSize2/1e9)) + " B");
	wrapperVar.append("text")
        .attr('class',"legendCircleText")
        .attr('x', (legendCenter + legendLineLength + textPadding))
        .attr('y', (legendBottom-2*scale(legendSize3)))
		.attr('dy', '0.4em')
		.text("$ " + numFormat(Math.round(legendSize3/1e9)) + " B");
		
}//bubbleLegend

///////////////////////////////////////////////////////////////////////////
//////////////////////////// Start no tooltips ////////////////////////////
///////////////////////////////////////////////////////////////////////////

pt.voronoiScatterPlot.setNoTooltip = function() {

	//Change title
	d3.select("#voronoi-scatter-plot .chart-title")
		.text("Life expectancy versus GDP per Capita");

	//Append tooltip on circles
	pt.voronoiScatterPlot.circles
		.style("pointer-events", "auto")
		.on("mouseover", null)
		.on("mouseout",  null);
	//Remove possible tooltip from voronoi cells
	pt.voronoiScatterPlot.voronois
		.style("pointer-events", "none")
		.on("mouseover", null)
		.on("mouseout",  null)
		.transition().duration(500)
		.style("stroke-opacity", 0);

	//Update the text in the code block
	d3.selectAll("#voronoi-scatter-plot pre code")
		.html('/* Set tooltip on circle */ <br>' + 
			  'circles.on("mouseover", function(d,i) { <br>' +	
			  '	var el = d3.select(this); <br>' + 
			  '	/* ... append tooltip to circle "el" */ <br>' + 
			  '});')
	//Update the code to its javascript highlight
	$("#voronoi-scatter-plot pre code").each(function(i, block) {
	   hljs.highlightBlock(block);
	});

}//setNoTooltip

///////////////////////////////////////////////////////////////////////////
///////////////////////// General tooltip placement ///////////////////////
///////////////////////////////////////////////////////////////////////////

pt.voronoiScatterPlot.placeTooltip = function(x,y,extra,country) {

	d3.select("#voronoi-scatter-plot #voronoi-tooltip-content")
		.html("<span style='text-align: center; white-space: nowrap;'>" + country + "</span>");

	var tooltipWidth = document.getElementById("voronoi-tooltip-content").offsetWidth;
	var tooltipHeight = document.getElementById("voronoi-tooltip-content").clientHeight;
	d3.select("#voronoi-scatter-plot .popover").style("left", -tooltipWidth/2 + "px")

	//NO IDEA why the 176 & 20 extra...
	var xLoc = x + pt.voronoiScatterPlot.margin.left + 176,
		yLoc = y + pt.voronoiScatterPlot.margin.top + tooltipHeight + 20 - extra;

	d3.select("#voronoi-scatter-plot #circle-tooltip")
		.style("top", yLoc + "px")
		.style("left", xLoc + "px")
		.transition().duration(150)
		.style("opacity", 1);

}//placeTooltip

pt.voronoiScatterPlot.removeTooltip = function() {

	d3.select("#voronoi-scatter-plot #circle-tooltip")
		.transition().duration(150)
		.style("opacity", 0);
		
}//removeTooltip

///////////////////////////////////////////////////////////////////////////
/////////////// Hover functions of the circles - Circles //////////////////
///////////////////////////////////////////////////////////////////////////

pt.voronoiScatterPlot.setTooltipCircle = function() {

	d3.select("#voronoi-scatter-plot .chart-title")
		.text("Circle triggered - tooltip attached to circle");

	//Append tooltip on circles
	pt.voronoiScatterPlot.circles
		.style("pointer-events", "auto")
		.on("mouseover", pt.voronoiScatterPlot.showTooltipCircle)
		.on("mouseout",  pt.voronoiScatterPlot.removeTooltipCircle);
	//Remove possible tooltip from voronoi cells
	pt.voronoiScatterPlot.voronois
		.style("pointer-events", "none")
		.on("mouseover", null)
		.on("mouseout",  null)
		.transition().duration(500)
		.style("stroke-opacity", 0);
	//Remove possible tooltip from outer circles
	pt.voronoiScatterPlot.circlesOuter
		.style("pointer-events", "none")
		.on("mouseover", null)
		.on("mouseout",  null)
		.transition().duration(500)
		.style("opacity", 0);

	//Update the text in the code block
	d3.selectAll("#voronoi-scatter-plot pre code")
		.html('/* Set tooltip on circle */ <br>' + 
			  'circles.on("mouseover", function(d,i) { <br>' +	
			  '	var el = d3.select(this); <br>' + 
			  '	/* ... append tooltip to circle "el" */ <br>' + 
			  '});')
	//Update the code to its javascript highlight
	$("#voronoi-scatter-plot pre code").each(function(i, block) {
	   hljs.highlightBlock(block);
	});

}//setTooltipCircle

pt.voronoiScatterPlot.removeTooltipCircle = function(d, i) {
	//Fade out the bubble again
	d3.select(this).style("opacity", pt.voronoiScatterPlot.opacityCircles);
	pt.voronoiScatterPlot.removeTooltip();		
}//function removeTooltipCircle

pt.voronoiScatterPlot.showTooltipCircle = function(d, i) {
	//Place and show tooltip
	var el = d3.select(this);
	var x = +el.attr("cx"),
		y = +el.attr("cy"),
		r = pt.voronoiScatterPlot.rScale(d.GDP) - 3;
	pt.voronoiScatterPlot.placeTooltip(x,y,r,d.Country);

	//Make chosen circle more visible
	d3.select(this).style("opacity", 1);					
}//function showTooltipCircle

///////////////////////////////////////////////////////////////////////////
/////////////// Hover functions of the circles - Circles //////////////////
///////////////////////////////////////////////////////////////////////////

pt.voronoiScatterPlot.setTooltipVoronoi = function() {

	d3.select("#voronoi-scatter-plot .chart-title")
		.text("Voronoi triggered - tooltip attached to voronoi");

	//Remove possible tooltip on circles
	pt.voronoiScatterPlot.circles
		.style("pointer-events", "none")
		.on("mouseover", null)
		.on("mouseout",  null);
	//Append tooltip event to voronoi cells
	pt.voronoiScatterPlot.voronois
		.style("pointer-events", "all")
		.on("mouseover", pt.voronoiScatterPlot.showTooltipVoronoi)
		.on("mouseout",  pt.voronoiScatterPlot.removeTooltipVoronoi)
		.transition().duration(750).delay(function(d,i) { return i*8; })
		.style("stroke-opacity", 0.5);
	//Remove possible tooltip from outer circles
	pt.voronoiScatterPlot.circlesOuter
		.style("pointer-events", "none")
		.on("mouseover", null)
		.on("mouseout",  null)
		.transition().duration(500)
		.style("opacity", 0);

	//Update the text in the code block
	d3.selectAll("#voronoi-scatter-plot pre code")
		.html('/* Set tooltip on voronoi cell */ <br>' + 
			  'voronois.on("mouseover", function(d,i) { <br>' +	
			  '	var el = d3.select(this); <br>' + 
			  '	/* ... append tooltip to voronoi cell "el" */ <br>' + 
			  '});')
	//Update the code to its javascript highlight
	$("#voronoi-scatter-plot pre code").each(function(i, block) {
	   hljs.highlightBlock(block);
	});

}//setTooltipCircle

pt.voronoiScatterPlot.removeTooltipVoronoi = function(d) {	
	pt.voronoiScatterPlot.removeTooltip();	
}//function removeTooltipVoronoi

pt.voronoiScatterPlot.showTooltipVoronoi = function(d) {
	//Place and show tooltip
	var el = this.getBBox();
	var x = el.x + el.width/2,
		y = el.y,
		minus = 0;
	pt.voronoiScatterPlot.placeTooltip(x,y,minus,d.Country);
}//function showTooltipVoronoi

///////////////////////////////////////////////////////////////////////////
/////////// Hover functions of the circles - Voronoi & Circle /////////////
///////////////////////////////////////////////////////////////////////////

pt.voronoiScatterPlot.setTooltipVoronoiCircle = function() {

	d3.select("#voronoi-scatter-plot .chart-title")
		.text("Voronoi triggered - tooltip attached to circle");

	//Remove possible tooltip on circles
	pt.voronoiScatterPlot.circles
		.style("pointer-events", "none")
		.on("mouseover", null)
		.on("mouseout",  null);
	//Append tooltip event to voronoi cells
	pt.voronoiScatterPlot.voronois
		.style("pointer-events", "all")
		.on("mouseover", pt.voronoiScatterPlot.showTooltipVoronoiCircle)
		.on("mouseout",  pt.voronoiScatterPlot.removeTooltipVoronoiCircle)
		.transition().duration(500)
		.style("stroke-opacity", 0.5);
	//Remove possible tooltip from outer circles
	pt.voronoiScatterPlot.circlesOuter
		.style("pointer-events", "none")
		.on("mouseover", null)
		.on("mouseout",  null)
		.transition().duration(500)
		.style("opacity", 0);

	//Update the text in the code block
	d3.selectAll("#voronoi-scatter-plot pre code")
		.html('/* Set tooltip on circle */ <br>' + 
			  'voronois.on("mouseover", function(d,i) { <br>' +	
			  '	var el = circles.selectAll(".countries." + d.countryCode); <br>' + 
			  '	/* ... append tooltip to circle "el" */ <br>' + 
			  '});')
	//Update the code to its javascript highlight
	$("#voronoi-scatter-plot pre code").each(function(i, block) {
	   hljs.highlightBlock(block);
	});

}//setTooltipVoronoiCircle

pt.voronoiScatterPlot.removeTooltipVoronoiCircle = function(d) {
	//Fade out the hovered over circle
	d3.selectAll("#voronoiScatterPlot .countries." + d.CountryCode)
		.style("opacity", pt.voronoiScatterPlot.opacityCircles);
	pt.voronoiScatterPlot.removeTooltip();	
}//function removeTooltipVoronoiCircle

pt.voronoiScatterPlot.showTooltipVoronoiCircle = function(d) {
	
	//Save the chosen circle (so not the voronoi)
	var el = d3.selectAll("#voronoiScatterPlot .countries."+d.CountryCode);

	//Place and show tooltip
	var x = +el.attr("cx"),
		y = +el.attr("cy"),
		r = pt.voronoiScatterPlot.rScale(d.GDP) - 3;
	pt.voronoiScatterPlot.placeTooltip(x,y,r,d.Country);

	//Make chosen circle more visible
	el.style("opacity", 1);
					
}//function showTooltipVoronoiCircle


pt.voronoiScatterPlot.removeVoronoiStroke = function(d) {

	//Change title (in case you move backward)
	d3.select("#voronoi-scatter-plot .chart-title")
		.text("Voronoi triggered - tooltip attached to circle");

	//Append tooltip event to voronoi cells
	pt.voronoiScatterPlot.voronois
		.style("pointer-events", "all")
		.on("mouseover", pt.voronoiScatterPlot.showTooltipVoronoiCircle)
		.on("mouseout",  pt.voronoiScatterPlot.removeTooltipVoronoiCircle)
		.transition().duration(500)
		.style("stroke-opacity", 0);

	//Remove possible tooltip from outer circles (in case you move backward)
	pt.voronoiScatterPlot.circlesOuter
		.style("pointer-events", "none")
		.on("mouseover", null)
		.on("mouseout",  null)
		.transition().duration(500)
		.style("opacity", 0);

	//Update the text in the code block (in case you move backward)
	d3.selectAll("#voronoi-scatter-plot pre code")
		.html('/* Set tooltip on circle */ <br>' + 
			  'voronois.on("mouseover", function(d,i) { <br>' +	
			  '	var el = circles.selectAll(".countries." + d.countryCode); <br>' + 
			  '	/* ... append tooltip to circle "el" */ <br>' + 
			  '});')
	//Update the code to its javascript highlight
	$("#voronoi-scatter-plot pre code").each(function(i, block) {
	   hljs.highlightBlock(block);
	});

}//function removeVoronoiStroke


///////////////////////////////////////////////////////////////////////////
///// Hover functions of the circles - Outer circle|Voronoi & Circle //////
///////////////////////////////////////////////////////////////////////////

pt.voronoiScatterPlot.setTooltipVoronoiOuterCircle = function() {

	//Fade out guide lines (in case you move backwards), then remove them
	d3.selectAll("#voronoiScatterPlot .guide")
		.transition().duration(200)
		.style("opacity",  0)
		.remove();

	//Change top title
	d3.select("#voronoi-scatter-plot .chart-title")
		.text("Outer circle triggered - tooltip attached to circle");

	//Remove possible tooltip on circles
	pt.voronoiScatterPlot.circles
		.style("pointer-events", "none")
		.on("mouseover", null)
		.on("mouseout",  null);
	//Append tooltip event to voronoi cells
	pt.voronoiScatterPlot.voronois
		.style("pointer-events", "none")
		.on("mouseover", null)
		.on("mouseout",  null)
		.transition().duration(500)
		.style("stroke-opacity", 0.5);
	//Remove possible tooltip from outer circles
	pt.voronoiScatterPlot.circlesOuter
		.style("pointer-events", "all")
		.on("mouseover", pt.voronoiScatterPlot.showTooltipVoronoiOuterCircle)
		.on("mouseout",  pt.voronoiScatterPlot.removeTooltipVoronoiOuterCircle)
		.transition().duration(500)
		.style("opacity", 0.5);
		
	//Update the text in the code block
	d3.selectAll("#voronoi-scatter-plot pre code")
		.html('/* Set tooltip on circle */ <br>' + 
			  'outerCircles.on("mouseover", function(d,i) { <br>' +	
			  '	var el = circles.selectAll(".countries." + d.countryCode); <br>' + 
			  '	/* ... append tooltip to circle "el" */ <br>' + 
			  '});')
	//Update the code to its javascript highlight
	$("#voronoi-scatter-plot pre code").each(function(i, block) {
	   hljs.highlightBlock(block);
	});

}//setTooltipVoronoiCircle

pt.voronoiScatterPlot.removeTooltipVoronoiOuterCircle = function(d) {
	//Fade out the hovered over circle
	d3.selectAll("#voronoiScatterPlot .countries." + d.CountryCode)
		.style("opacity", pt.voronoiScatterPlot.opacityCircles);
	pt.voronoiScatterPlot.removeTooltip();
}//function removeTooltipVoronoiOuterCircle

pt.voronoiScatterPlot.showTooltipVoronoiOuterCircle = function(d) {
	
	//Save the chosen circle (so not the voronoi)
	var el = d3.selectAll("#voronoiScatterPlot .countries."+d.CountryCode);

	//Place and show tooltip
	var x = +el.attr("cx"),
		y = +el.attr("cy"),
		r = pt.voronoiScatterPlot.rScale(d.GDP) - 3;
	pt.voronoiScatterPlot.placeTooltip(x,y,r,d.Country);

	//Make chosen circle more visible
	el.style("opacity", 1);
					
}//function showTooltipVoronoiOuterCircle

///////////////////////////////////////////////////////////////////////////
///// Hover functions of the circles - Outer circle|Voronoi & Circle //////
///////////////////////////////////////////////////////////////////////////

pt.voronoiScatterPlot.setTooltipFinal = function() {

	//Change top title
	d3.select("#voronoi-scatter-plot .chart-title")
		.text("Outer circle triggered - tooltip attached to circle");

	//Remove possible tooltip on circles
	pt.voronoiScatterPlot.circles
		.style("pointer-events", "none")
		.on("mouseover", null)
		.on("mouseout",  null);
	//Append tooltip event to voronoi cells
	pt.voronoiScatterPlot.voronois
		.style("pointer-events", "none")
		.on("mouseover", null)
		.on("mouseout",  null)
		.transition().duration(500)
		.style("stroke-opacity", 0);
	//Remove possible tooltip from outer circles
	pt.voronoiScatterPlot.circlesOuter
		.style("pointer-events", "all")
		.on("mouseover", pt.voronoiScatterPlot.showTooltipFinal)
		.on("mouseout",  pt.voronoiScatterPlot.removeTooltipFinal)
		.transition().duration(500)
		.style("opacity", 0);
		
	//Update the text in the code block
	d3.selectAll("#voronoi-scatter-plot pre code")
		.html('/* Set tooltip on circle */ <br>' + 
			  'outerCircles.on("mouseover", function(d,i) { <br>' +	
			  '	var el = circles.selectAll(".countries." + d.countryCode); <br>' + 
			  '	/* ... append tooltip to circle "el" */ <br>' + 
			  '});')
	//Update the code to its javascript highlight
	$("#voronoi-scatter-plot pre code").each(function(i, block) {
	   hljs.highlightBlock(block);
	});

}//setTooltipFinal

pt.voronoiScatterPlot.removeTooltipFinal = function(d) {
	//Fade out the hovered over circle
	d3.selectAll("#voronoiScatterPlot .countries." + d.CountryCode)
		.style("opacity", pt.voronoiScatterPlot.opacityCircles);
	pt.voronoiScatterPlot.removeTooltip();	
  
	//Fade out guide lines, then remove them
	d3.selectAll("#voronoiScatterPlot .guide")
		.transition().duration(200)
		.style("opacity",  0)
		.remove();
		
}//function removeTooltipFinal

pt.voronoiScatterPlot.showTooltipFinal = function(d) {
	
	//Save the chosen circle (so not the voronoi)
	var el = d3.selectAll("#voronoiScatterPlot .countries." + d.CountryCode);

	//Place and show tooltip
	var x = +el.attr("cx"),
		y = +el.attr("cy"),
		color = el.style("fill"),
		r = pt.voronoiScatterPlot.rScale(d.GDP) - 3;

	pt.voronoiScatterPlot.placeTooltip(x,y,r,d.Country);

	//Make chosen circle more visible
	el.style("opacity", 1);
	
	//Append lines to bubbles that will be used to show the precise data points
	
	//vertical line
	d3.select("#voronoiScatterPlot .voronoiScatterPlotWrapper")
		.append("line")
		.attr("class", "guide")
		.attr("x1", x)
		.attr("x2", x)
		.attr("y1", y)
		.attr("y2", pt.voronoiScatterPlot.height + 27)
		.style("stroke", color)
		.style("opacity",  0)
		.transition().duration(200)
		.style("opacity", 0.5);
	//Value on the axis
	d3.select("#voronoiScatterPlot .voronoiScatterPlotWrapper")
		.append("text")
		.attr("class", "guide")
		.attr("x", x)
		.attr("y", pt.voronoiScatterPlot.height + 45)
		.style("fill", color)
		.style("opacity",  0)
		.style("text-anchor", "middle")
		.text( "$ " + d3.format(".2s")(d.GDP_perCapita) )
		.transition().duration(200)
		.style("opacity", 0.5);

	//horizontal line
	d3.select("#voronoiScatterPlot .voronoiScatterPlotWrapper")
		.append("line")
		.attr("class", "guide")
		.attr("x1", x)
		.attr("x2", -30)
		.attr("y1", y)
		.attr("y2", y)
		.style("stroke", color)
		.style("opacity",  0)
		.transition().duration(200)
		.style("opacity", 0.5);
	//Value on the axis
	d3.select("#voronoiScatterPlot .voronoiScatterPlotWrapper")
		.append("text")
		.attr("class", "guide")
		.attr("x", -35)
		.attr("y", y)
		.attr("dy", "0.35em")
		.style("fill", color)
		.style("opacity",  0)
		.style("text-anchor", "end")
		.text( d3.format(".1f")(d.lifeExpectancy) )
		.transition().duration(200)
		.style("opacity", 0.5);	

}//function showTooltipFinal

