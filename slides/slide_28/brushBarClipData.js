pt.brushBarClipData = pt.brushBarClipData || {};

pt.brushBarClipData.init = function(data) {
	
  //Remove the svg from the previous slide
  d3.select('#brush-bar-clip-data #brushBarClipData svg').remove();

  //Only take the top 50
  var data = data.slice(0,49),
      updatedData;

	///////////////////////////////////////////////////////////////////////////
	//////////////////// Set up and initiate svg containers ///////////////////
	///////////////////////////////////////////////////////////////////////////	

  //Added only for the mouse wheel
  var zoomer = d3.behavior.zoom()
      .on("zoom", null);

  var main_margin = {top: 10, right: 10, bottom: 90, left: 400},
      main_width = 1200 - main_margin.left - main_margin.right,
      main_height = 700 - main_margin.top - main_margin.bottom;

  var mini_margin = {top: 10, right: 250, bottom: 90, left: 30},
  	  mini_width = 400 - mini_margin.left - mini_margin.right,
      mini_height = 700 - mini_margin.top - mini_margin.bottom;
			
	//SVG container
	var svg = d3.select('#brush-bar-clip-data #brushBarClipData')
		.append("svg")
        .attr("class", "svgWrapper")
        .attr("width", main_width + main_margin.left + main_margin.right + mini_width + mini_margin.left + mini_margin.right)
        .attr("height", main_height + main_margin.top + main_margin.bottom)
        .call(zoomer)
        .on("wheel.zoom", scroll)
        .on("mousedown.zoom", null)
        .on("touchstart.zoom", null)
        .on("touchmove.zoom", null)
        .on("touchend.zoom", null);

  var mainGroup = svg.append("g")
          .attr("class","mainGroupWrapper")
          .attr("transform","translate(" + main_margin.left + "," + main_margin.top + ")")
          .append("g") //another one for the clip path - due to not wanting to clip the labels
          .attr("clip-path", "url(#clip)")
          .style("clip-path", "url(#clip)")
          .attr("class","mainGroup");

  var miniGroup = svg.append("g")
          .attr("class","miniGroup")
          .attr("transform","translate(" + (main_margin.left + main_width + main_margin.right + mini_margin.left) + "," + mini_margin.top + ")");

  var brushGroup = svg.append("g")
          .attr("class","brushGroup")
          .attr("transform","translate(" + (main_margin.left + main_width + main_margin.right + mini_margin.left) + "," + mini_margin.top + ")");

  /////////////////////////////////////////////////////////////
  ////////////////////// Initiate scales //////////////////////
  /////////////////////////////////////////////////////////////

  var main_xScale = d3.scale.linear().range([0, main_width]);
  var mini_xScale = d3.scale.linear().range([0, mini_width]);

  var main_yScale = d3.scale.ordinal().rangeRoundBands([0, main_height], 0.4, 0);
  var mini_yScale = d3.scale.ordinal().rangeBands([0, mini_height], 0.4, 0);

  //Based on the idea from: http://stackoverflow.com/questions/21485339/d3-brushing-on-grouped-bar-chart
  var main_yZoom = d3.scale.linear()
      .range([0, main_height])
      .domain([0, main_height]);

  //Create x axis object
  var main_xAxis = d3.svg.axis()
    .scale(main_xScale)
    .orient("bottom")
    .ticks(4)
    .tickFormat(d3.format("$,"))
    .outerTickSize(0);

  //Add group for the x axis
  d3.select("#brushBarClipData .mainGroupWrapper").append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (main_height + 10) + ")");

  d3.select("#brushBarClipData .mainGroupWrapper").append("text")
  	.attr("class", "axis label")
  	.attr("x", main_width/2)
  	.attr("y", main_height + 70)
  	.text("Wordwide gross in billions");

  //Create y axis object
  var main_yAxis = d3.svg.axis()
    .scale(main_yScale)
    .orient("left")
    .tickSize(0)
    .outerTickSize(0);

  //Add group for the y axis
  mainGroup.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(-5,0)");

  /////////////////////////////////////////////////////////////
  /////////////////////// Update scales ///////////////////////
  /////////////////////////////////////////////////////////////

  //Update the scales
  main_xScale.domain([0, d3.max(data, function(d) { return d.boxoffice; })]);
  mini_xScale.domain([0, d3.max(data, function(d) { return d.boxoffice; })]);
  main_yScale.domain(data.map(function(d) { return d.title; }));
  mini_yScale.domain(data.map(function(d) { return d.title; }));

  //Create the visual part of the axes
  //d3.select("#brushBarClipData .mainGroup").select(".y.axis").call(main_yAxis);
  d3.select("#brushBarClipData .mainGroupWrapper").select(".x.axis").call(main_xAxis);

  /////////////////////////////////////////////////////////////
  ///////////////////// Label axis scales /////////////////////
  /////////////////////////////////////////////////////////////

  // var textScale = d3.scale.threshold()
  //     .domain([18,25,40,50])
  //     .range([16,14,12,9,6]);
  var textScale = d3.scale.linear()
        .domain([8,50])
        .range([20,10])
        .clamp(true);

  /////////////////////////////////////////////////////////////
  ///////////////////////// Create brush //////////////////////
  /////////////////////////////////////////////////////////////

  //What should the first extent of the brush become - a bit arbitrary this
  var brushExtent = 15;

  var brush = d3.svg.brush()
      .y(mini_yScale)
      .extent([mini_yScale(data[0].title), mini_yScale(data[brushExtent].title)])
      .on("brush", brushmove);

  //Set up the visual part of the brush
  var gBrush = d3.select("#brushBarClipData .brushGroup").append("g")
    .attr("class", "brush")
    .call(brush);
  
  gBrush.selectAll(".resize")
    .append("line")
    .attr("x2", mini_width);

  gBrush.selectAll(".resize")
    .append("path")
    .attr("d", d3.svg.symbol().type("triangle-up").size(20))
    .attr("transform", function(d,i) { 
      return i ? "translate(" + (mini_width/2) + "," + 4 + ") rotate(180)" : "translate(" + (mini_width/2) + "," + -4 + ") rotate(0)"; 
    });

  gBrush.selectAll("rect")
    .attr("width", mini_width);

  gBrush.select(".background")
    .on("mousedown.brush", brushcenter)
    .on("touchstart.brush", brushcenter);

  ///////////////////////////////////////////////////////////////////////////
  /////////////////// Create a rainbow gradient - for fun ///////////////////
  ///////////////////////////////////////////////////////////////////////////

  var defs = svg.append("defs")

  //Create two separate gradients for the main and mini bar - just because it looks fun
  pt.brushBarUpdateData.createGradient(defs, "gradient-rainbow-main", "40%");
  pt.brushBarUpdateData.createGradient(defs, "gradient-rainbow-mini", "7%");

  //Add the clip path for the main bar chart
  defs.append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("x", -main_margin.left)
    .attr("width", main_width + main_margin.left)
    .attr("height", main_height);

  /////////////////////////////////////////////////////////////
  //////////////// Set-up the main bar chart //////////////////
  /////////////////////////////////////////////////////////////

  var bar = d3.select("#brushBarClipData .mainGroup").selectAll(".bar")
  	.data(data, function(d) { return d.rank; })
      .enter().append("rect")
    	.attr("class", "bar")
    	.attr("x", 0)
    	.attr("width", function(d) { return main_xScale(d.boxoffice); })
    	.attr("y", function(d,i) { return main_yScale(d.title); })
    	.attr("height", main_yScale.rangeBand())
    	.style("fill", "url(#gradient-rainbow-main)");

  /////////////////////////////////////////////////////////////
  /////////////// Set-up the mini bar chart ///////////////////
  /////////////////////////////////////////////////////////////

  var mini_bar = d3.select("#brushBarClipData .miniGroup").selectAll(".bar")
    	.data(data)
    	.enter().append("rect")
    	.attr("class", "bar")
    	.attr("x", 0)
    	.attr("width", function(d) { return mini_xScale(d.boxoffice); })
    	.attr("y", function(d,i) { return mini_yScale(d.title); })
    	.attr("height", mini_yScale.rangeBand())
    	.style("fill", "url(#gradient-rainbow-mini)");

  //Start the brush
  gBrush.call(brush.event);	

  /////////////////////////////////////////////////////////////
  ////////////////////// Brush functions //////////////////////
  /////////////////////////////////////////////////////////////

  //First function that runs on a brush move
  function brushmove() {

    var extent = brush.extent();

    //Reset the part that is visible on the big chart
    var originalRange = main_yZoom.range();
    main_yZoom.domain( extent );

    /////////////////////////////////////////////////////////////
    /////////////// Update the mini bar fills ///////////////////
    /////////////////////////////////////////////////////////////

    //Update the colors within the mini bar chart
    var selected = mini_yScale.domain()
      .filter(function(d) { return (extent[0] - mini_yScale.rangeBand() + 1e-2 <= mini_yScale(d)) && (mini_yScale(d) <= extent[1] - 1e-2); }); 
    //Update the colors of the mini chart - Make everything outside the brush grey
    d3.select("#brushBarClipData .miniGroup").selectAll(".bar")
      .style("fill", function(d, i) { return selected.indexOf(d.title) > -1 ? "url(#gradient-rainbow-mini)" : "#e0e0e0"; });

    /////////////////////////////////////////////////////////////
    ///////////////////// Update the axis ///////////////////////
    /////////////////////////////////////////////////////////////

    //Update the domain of the x & y scale of the big bar chart
    main_yScale.domain(data.map(function(d) { return d.title; }));
    main_yScale.rangeBands( [ main_yZoom(originalRange[0]), main_yZoom(originalRange[1]) ], 0.4, 0);

    //Update the y axis of the big chart
    d3.select("#brushBarClipData .mainGroup")
      .select(".y.axis")
      .call(main_yAxis);

    //Update the bars
    d3.select("#brushBarClipData .mainGroup").selectAll(".bar")
      .attr("x", 0)
      .attr("width", function(d) { return main_xScale(d.boxoffice); })
      .attr("y", function(d,i) { return main_yScale(d.title); })
      .attr("height", main_yScale.rangeBand());

    //Update the label size
    d3.selectAll("#brushBarClipData .y.axis text")
      .style("font-size", textScale(selected.length));


  }//brushmove

  //Based on http://bl.ocks.org/mbostock/6498000
  //What to do when the user clicks on another location along the brushable bar chart
  function brushcenter() {
    var target = d3.event.target,
        extent = brush.extent(),
        size = extent[1] - extent[0],
        range = mini_yScale.range(),
        y0 = d3.min(range) + size / 2,
        y1 = d3.max(range) + mini_yScale.rangeBand() - size / 2,
        center = Math.max( y0, Math.min( y1, d3.mouse(target)[1] ) );

    d3.event.stopPropagation();

    gBrush
        .call(brush.extent([center - size / 2, center + size / 2]))
        .call(brush.event);
  }//brushcenter


  /////////////////////////////////////////////////////////////
  ///////////////////// Scroll functions //////////////////////
  /////////////////////////////////////////////////////////////

  function scroll() {

    //Mouse scroll on the mini chart
    var extent = brush.extent(),
      size = extent[1] - extent[0],
      range = mini_yScale.range(),
      y0 = d3.min(range),
      y1 = d3.max(range) + mini_yScale.rangeBand(),
      dy = d3.event.deltaY,
      topSection;

    if ( extent[0] - dy < y0 ) { topSection = y0; } 
    else if ( extent[1] - dy > y1 ) { topSection = y1 - size; } 
    else { topSection = extent[0] - dy; }

    //Make sure the page doesn't scroll as well
    d3.event.stopPropagation();
    d3.event.preventDefault();

    gBrush
        .call(brush.extent([ topSection, topSection + size ]))
        .call(brush.event);

  }//scroll


}//init
