pt.voronoiIntro = pt.voronoiIntro || {};

pt.voronoiIntro.init = function() {
	
	//Remove the svg from the previous slide
	d3.select('#org-interactivity #orgInteractivity svg').remove();

	//Remove any existing svgs
	d3.select('#intro-voronoi #voronoiIntro svg').remove();

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
	pt.voronoiIntro.svg = d4.select('#intro-voronoi #voronoiIntro')
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom);
		
	var svg = pt.voronoiIntro.svg.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	//var areas = [];

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
	//////////// Get continuous color scale for the Rainbow ///////////////////
	///////////////////////////////////////////////////////////////////////////

	//Color idea based on http://bl.ocks.org/christophermanning/1734663
	var colors = ["#EFB605", "#E8A301", "#E47D06", "#E23B19", "#DB0131", "#C80044", 
					"#AF0158", "#991C71", "#7F378D", "#5C4DA4", "#3465A8", "#108492", 
					"#0AA174", "#35B15F", "#7EB852"];
	var areaMax = 20000,
		areaMin = 500;
	var colorReach = d4.range(areaMin, areaMax, (areaMax - areaMin) / (colors.length - 1));
	colorReach.push(areaMax);
			   
	//Create color gradient
	var colorScale = d4.scaleSqrt()
		.domain(colorReach)
		.range(colors)
		.clamp(true);

	///////////////////////////////////////////////////////////////////////////
	///////////////////// Set up some location variables //////////////////////
	///////////////////////////////////////////////////////////////////////////	

	//Based heavily on http://bl.ocks.org/mbostock/4060366
	var sites = d4.range(65)
	    .map(function(d) { return [
	    	Math.random() * hexWidth/2 * (Math.random() >= 0.5 ? 1 : -1), 
	    	Math.random() * hexHeight/2 * (Math.random() >= 0.5 ? 1 : -1)
	    ]; });

	//Make the one cell follow a circle path
	var circleRadius = hexWidth/2 * 0.65,
		theta = 0,
		x = circleRadius * Math.cos(theta),
		y = circleRadius * Math.sin(theta);
	sites[0] = [x, y];

	var voronoi = d4.voronoi()
	    .extent([[-hexWidth/2 - 1, -hexHeight/2 - 1], [hexWidth/2 + 1, hexHeight/2 + 1]]);

	var line = d4.line()
    	.curve(d4.curveBasisClosed);
		
	///////////////////////////////////////////////////////////////////////////
	////////////////////// Place circles inside hexagon ///////////////////////
	///////////////////////////////////////////////////////////////////////////	

    //First append a group for the clip path, then a new group that can be transformed
	var voronoiWrapper = svg.append("g")
		.attr("clip-path", "url(#clip")
		.style("clip-path", "url(#clip)") //make it work in safari
		.append("g")
		.on("touchmove mousemove", moved)
		.attr("transform", "translate(" + (width/2) + "," + (height/2) + ")");

	//Add rect to the back to pick up the mouse movement
	voronoiWrapper.append("rect")
		.attr("x", -hexWidth/2)
		.attr("y", -hexHeight/2)
		.attr("width", hexWidth)
		.attr("height", hexHeight)
		.style("fill", "none")
		.style("pointer-events", "all");

	var polygon = voronoiWrapper.append("g")
	    .attr("class", "polygons")
	  	.selectAll("path")
	  	.data(voronoi.polygons(sites))
	  	.enter().append("path")
	    .call(redrawPolygon);

	var link = voronoiWrapper.append("g")
	    .attr("class", "links")
	  	.selectAll("line")
	  	.data(voronoi.links(sites))
	  	.enter().append("line")
	    .call(redrawLink);

	var site = voronoiWrapper.append("g")
	    .attr("class", "sites")
	  	.selectAll("circle")
	  	.data(sites)
	  	.enter().append("circle")
	    .attr("r", function(d,i) { return i === 0 ? 5 : 2.5; })
	    .call(redrawSite);

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

	///////////////////////////////////////////////////////////////////////////
	///////////////////////////// Helper functions ////////////////////////////
	///////////////////////////////////////////////////////////////////////////	

	pt.voronoiIntro.moveCell = true;
	requestAnimationFrame(moved);

	function moved() {
	  	if(d4.event) { 
	  		pt.voronoiIntro.moveCell = false;
	  		sites[0] = [d4.event.offsetX, d4.event.offsetY]; 
	  		//console.log(d3.min(areas), d3.max(areas));
	  	} else {
	  		theta += 0.025;
	  		x = circleRadius * Math.cos(theta);
	  		y = circleRadius * Math.sin(theta);
	  		sites[0] = [x, y];
	  		if(pt.voronoiIntro.moveCell) requestAnimationFrame(moved);
	  	}//else
	  	redraw();
	}//moved

	function redraw() {
	  var diagram = voronoi(sites);
	  polygon = polygon.data(diagram.polygons()).call(redrawPolygon);
	  link = link.data(diagram.links()), link.exit().remove();
	  link = link.enter().append("line").merge(link).call(redrawLink);
	  site = site.data(sites).call(redrawSite);
	}//redraw

	function redrawPolygon(polygon) {
	  polygon
	      //.attr("d", function(d) { return d ? "M" + d.join("L") + "Z" : null; });
	      .attr("d", function(d) { return d ? line(d) + "Z" : null; })
	      .transition().duration(150)
	      .style("fill", function(d, i) { 
	      	//areas.push(d3.geom.polygon(d).area()); 
	      	return i === 0 ? "black" : colorScale( d3.geom.polygon(d).area() ); });
	}//redrawPolygon

	function redrawLink(link) {
	  link
	      .attr("x1", function(d) { return d.source[0]; })
	      .attr("y1", function(d) { return d.source[1]; })
	      .attr("x2", function(d) { return d.target[0]; })
	      .attr("y2", function(d) { return d.target[1]; });
	}//redrawLink

	function redrawSite(site) {
	  site
	      .attr("cx", function(d) { return d[0]; })
	      .attr("cy", function(d) { return d[1]; });
	}//redrawSite

}//init
