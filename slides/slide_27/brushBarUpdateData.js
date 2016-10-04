pt.brushBarUpdateData = pt.brushBarUpdateData || {};

pt.brushBarUpdateData.init = function(data) {
	
  //Remove the svg from the previous slide
  d3.select('#brush-bar-update-data #brushBarUpdateData svg').remove();

  //Only take the top 50
  var data = data.slice(0,49),
      updatedData;

	pt.brushBarUpdateData.scrolling = false;
	pt.brushBarUpdateData.scrollEnd = false;

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
	var svg = d3.select('#brush-bar-update-data #brushBarUpdateData')
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
          .attr("class","mainGroup")
          .attr("transform","translate(" + main_margin.left + "," + main_margin.top + ")");

  var miniGroup = svg.append("g")
          .attr("class","miniGroup")
          .attr("transform","translate(" + (main_margin.left + main_width + main_margin.right + mini_margin.left) + "," + mini_margin.top + ")");

  var brushGroup = svg.append("g")
          .attr("class","brushGroup")
          .attr("transform","translate(" + (main_margin.left + main_width + main_margin.right + mini_margin.left) + "," + mini_margin.top + ")");

  /////////////////////////////////////////////////////////////
  ////////////////////// Initiate scales //////////////////////
  /////////////////////////////////////////////////////////////

  pt.brushBarUpdateData.main_xScale = d3.scale.linear().range([0, main_width]);
  var mini_xScale = d3.scale.linear().range([0, mini_width]);

  pt.brushBarUpdateData.main_yScale = d3.scale.ordinal().rangeRoundBands([0, main_height], 0.4, 0);
  var mini_yScale = d3.scale.ordinal().rangeBands([0, mini_height], 0.4, 0);

//Create x axis object
  var main_xAxis = d3.svg.axis()
    .scale(pt.brushBarUpdateData.main_xScale)
    .orient("bottom")
    .ticks(4)
    .tickFormat(d3.format("$,"))
    .outerTickSize(0);

  //Add group for the x axis
  mainGroup.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (main_height + 10) + ")");

  mainGroup.append("text")
  	.attr("class", "axis label")
  	.attr("x", main_width/2)
  	.attr("y", main_height + 70)
  	.text("Wordwide gross in billions");

  //Create y axis object
  pt.brushBarUpdateData.main_yAxis = d3.svg.axis()
    .scale(pt.brushBarUpdateData.main_yScale)
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
  pt.brushBarUpdateData.main_xScale.domain([0, d3.max(data, function(d) { return d.boxoffice; })]);
  mini_xScale.domain([0, d3.max(data, function(d) { return d.boxoffice; })]);
  pt.brushBarUpdateData.main_yScale.domain(data.map(function(d) { return d.title; }));
  mini_yScale.domain(data.map(function(d) { return d.title; }));

  //Create the visual part of the axes
  //mainGroup.select(".y.axis").call(main_yAxis);
  mainGroup.select(".x.axis").call(main_xAxis);

  /////////////////////////////////////////////////////////////
  ///////////////////// Label axis scales /////////////////////
  /////////////////////////////////////////////////////////////

  // pt.brushBarUpdateData.textScale = d3.scale.threshold()
  //     .domain([18,25,40,50])
  //     .range([16,14,12,9,6]);
  pt.brushBarUpdateData.textScale = d3.scale.linear()
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
      .on("brush", brushmove)
      .on("brushend", brushend);

  //Set up the visual part of the brush
  var gBrush = d3.select("#brushBarUpdateData .brushGroup").append("g")
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

  /////////////////////////////////////////////////////////////
  /////////////// Set-up the mini bar chart ///////////////////
  /////////////////////////////////////////////////////////////

  var mini_bar = d3.select("#brushBarUpdateData .miniGroup").selectAll(".bar")
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
    
    //What is the extent of the brush
    var extent = brush.extent();

    //Adjust the extent of the brush so that is snaps to the bars
    if (d3.event.mode === "move" || pt.brushBarUpdateData.scrollEnd === true) {
      //If dragging, preserve the width of the extent

      //Does the top edge lie closer to the upper or lower bar
      var topExtent = extent[0];
      //Using ES5 - http://stackoverflow.com/questions/8584902/get-closest-number-out-of-array
      var closestTop = mini_yScale.range().reduce(function (prev, curr) {
        return (Math.abs(curr - topExtent) < Math.abs(prev - topExtent) ? curr : prev);
      });

      //Pixel location of the bottom bar
      var maxBar = d3.max(mini_yScale.range());
      //Does the top edge lie closer to the upper or lower bar
      var bottomExtent = extent[1];
      //Using ES5 - http://stackoverflow.com/questions/8584902/get-closest-number-out-of-array
      var closestBottom = mini_yScale.range().reduce(function (prev, curr) {
        return (Math.abs(curr - bottomExtent) < Math.abs(prev - bottomExtent) ? curr : prev);
      });

      //Don't let it go over the last bar in the design
      if(maxBar === closestBottom) {
        //The new extent that snaps to the bars
        extent = [closestBottom+mini_yScale.rangeBand()-(extent[1] - extent[0]),closestBottom+mini_yScale.rangeBand()];
      } else {
        //The new extent that snaps to the bars
        extent = [closestTop,closestTop+(extent[1] - extent[0])];
      }//else

    } else if (!pt.brushBarUpdateData.scrolling) {
      //If changing size, snap to the nearest rect

      //Find the pixel values of the bars that lie within the selected brush
      var pixelRanges = mini_yScale.range()
        .filter(function(d) { return (d >= extent[0]-mini_yScale.rangeBand()/2) && (d <= extent[1]); });

      //The new extent that snaps to the bars within the selection
      extent = [d3.min(pixelRanges),d3.max(pixelRanges)+mini_yScale.rangeBand()];
    }//else if 
    //else do nothing - then it comes from the scrolling and the extent has already been determined

    //Snap to rect edge - the new extent
    d3.select("#brushBarUpdateData g.brush")
      .call(brush.extent(extent));

    //What bars are captured in the brush
    //During scrolling take a wider range and don't snap
    if( pt.brushBarUpdateData.scrolling ) {
      var selected = mini_yScale.domain()
        .filter(function(d) { return (extent[0]-1e-3-mini_yScale.rangeBand() <= mini_yScale(d)) && (mini_yScale(d) <= extent[1]+1e-3+mini_yScale.rangeBand() ); }); 
    } else {
      var selected = mini_yScale.domain()
        .filter(function(d) { return (extent[0]-1e-3 <= mini_yScale(d)) && (mini_yScale(d) <= extent[1]+1e-3); }); 
    }//else

    //Take a subset of the selected data from the original dataset
    updatedData = data.filter(function(d) { return selected.indexOf(d.title) > -1; });

    //Update the colors of the mini chart - Make everything outside the brush grey
    d3.select("#brushBarUpdateData .miniGroup").selectAll(".bar")
      .style("fill", function(d, i) { return selected.indexOf(d.title) > -1 ? "url(#gradient-rainbow-mini)" : "#e0e0e0"; });
 
    ////Update the main chart
    ////If you want to see update during a brush moving uncomment this
    ////But that doesn't work very well with the transitions of the bars in the update function & scrolling
    //update(updatedData);

  }//brushmove

  //Finally update the data
  function brushend() {
    if(!pt.brushBarUpdateData.scrolling) pt.brushBarUpdateData.update(updatedData);
  }

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


  //Function to calculate what should happen on a mouse scroll
  function scroll() {

    if (pt.brushBarUpdateData.mousewheelTimer) clearTimeout(pt.brushBarUpdateData.mousewheelTimer);

    var extent = brush.extent(),
      size = extent[1] - extent[0],
      range = mini_yScale.range(),
      y0 = d3.min(range),
      y1 = d3.max(range),
      dy = d3.event.deltaY,
      topSection;

    pt.brushBarUpdateData.scrolling = true;

    if( extent[0] - dy < y0 ) {
      topSection = y0;
    } else if ( extent[1] - dy > y1 ) {
      topSection = y1 - size;
    } else {
      topSection = extent[0] - dy;
    }//else

    //Once the person stops scrolling, run the update data function
    pt.brushBarUpdateData.mousewheelTimer = setTimeout(function() {
        pt.brushBarUpdateData.mousewheelTimer = null;
        pt.brushBarUpdateData.scrolling = false;
        pt.brushBarUpdateData.scrollEnd = true;

        //Finally snap the brush and update the data
        gBrush
          .call(brush.event);

        pt.brushBarUpdateData.scrollEnd = false;
      }, 200);

    d3.event.stopPropagation();
    d3.event.preventDefault();

    //Update the brush position during the scrolling
    if(pt.brushBarUpdateData.scrolling) {
      gBrush
          .call(brush.extent([ topSection, topSection + size ]))
          .call(brush.event);
    }//if

  }//scroll


}//init

/////////////////////////////////////////////////////////////
/////////////////// Update the main bar /////////////////////
/////////////////////////////////////////////////////////////

//Function runs on a brush move - to update the big bar chart
pt.brushBarUpdateData.update = function(data) {

	//The transition (& delay) time of the bars and the axis
	var transTime = 400;
	var delayTime = pt.brushBarUpdateData.scrollEnd ? 0 : transTime;

	/////////////////////////////////////////////////////////////
	///////////////////// Update the axis ///////////////////////
	/////////////////////////////////////////////////////////////

	//Update the domain of the y scale of the big bar chart
	pt.brushBarUpdateData.main_yScale.domain(data.map(function(d) { return d.title; }));

	//Update the y axis of the big chart
	d3.select("#brushBarUpdateData .mainGroup")
	  .select(".y.axis")
	  .transition()
	  .duration(transTime).delay(delayTime)
	  .call(pt.brushBarUpdateData.main_yAxis);

	/////////////////////////////////////////////////////////////
	////////// Update the bars of the main bar chart ////////////
	/////////////////////////////////////////////////////////////

	//DATA JOIN
	var bar = d3.select("#brushBarUpdateData .mainGroup").selectAll(".bar")
	    .data(data, function(d) { return d.rank; });

	//UPDATE
	bar
	  .transition().duration(transTime).delay(delayTime)
	  .attr("x", 0)
	  .attr("width", function(d) { return pt.brushBarUpdateData.main_xScale(d.boxoffice); })
	  .attr("y", function(d,i) { return pt.brushBarUpdateData.main_yScale(d.title); })
	  .attr("height", pt.brushBarUpdateData.main_yScale.rangeBand());

	//ENTER
	bar.enter().append("rect")
	  .attr("class", "bar")
	  .attr("x", 0)
	  .attr("width", 0)
	  .attr("y", function(d,i) { return pt.brushBarUpdateData.main_yScale(d.title); })
	  .attr("height", pt.brushBarUpdateData.main_yScale.rangeBand())
	  .style("fill", "url(#gradient-rainbow-main)")
	  .transition().duration(transTime).delay(delayTime*2)
	  .attr("width", function(d) { return pt.brushBarUpdateData.main_xScale(d.boxoffice); });

	//EXIT
	bar.exit()
	  .transition().duration(transTime)
	  .attr("width", 0)
	  .remove();

  //Update the label size
  d3.selectAll("#brushBarUpdateData .y.axis text")
    .transition().duration(transTime).delay(delayTime*2)
    .style("font-size", pt.brushBarUpdateData.textScale(data.length));

}//update

/////////////////////////////////////////////////////////////
///////////////////// Helper functions //////////////////////
/////////////////////////////////////////////////////////////

//Create a gradient 
pt.brushBarUpdateData.createGradient = function(defs, idName, endPerc) {
	var coloursRainbow = ["#EFB605", "#E9A501", "#E48405", "#E34914", "#DE0D2B", "#CF003E", "#B90050", "#A30F65", "#8E297E", "#724097", "#4F54A8", "#296DA4", "#0C8B8C", "#0DA471", "#39B15E", "#7EB852"];

	defs.append("linearGradient")
	  .attr("id", idName)
	  .attr("gradientUnits", "userSpaceOnUse")
	  .attr("x1", "0%").attr("y1", "0%")
	  .attr("x2", endPerc).attr("y2", "0%")
	  .selectAll("stop") 
	  .data(coloursRainbow)                  
	  .enter().append("stop") 
	  .attr("offset", function(d,i) { return i/(coloursRainbow.length-1); })   
	  .attr("stop-color", function(d) { return d; });
}//createGradient
