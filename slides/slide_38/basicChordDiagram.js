pt.basicChordDiagram = pt.basicChordDiagram || {};

pt.basicChordDiagram.init = function() {
	
	//Remove any existing svgs
	d3.select('#basic-chord-diagram #basicChordDiagram svg').remove();

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
	pt.basicChordDiagram.svg = d3.select('#basic-chord-diagram #basicChordDiagram')
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom);
		
	var svg = pt.basicChordDiagram.svg.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	///////////////////////////////////////////////////////////////////////////
	///////////////////////////// Basic chord diagram /////////////////////////
	///////////////////////////////////////////////////////////////////////////	

	//From http://bl.ocks.org/mbostock/4062006
	// From http://mkweb.bcgsc.ca/circos/guide/tables/
	var matrix = [
	  [11975,  5871, 8916, 2868],
	  [ 1951, 10048, 2060, 6171],
	  [ 8010, 16145, 8090, 8045],
	  [ 1013,   990,  940, 6907]
	];

	var outerRadius = Math.min(width, height) * 0.5 - 40,
	    innerRadius = outerRadius*0.96;

	var formatValue = d4.formatPrefix(",.0", 1e3);

	var chord = d4.chord()
	    .padAngle(0.05)
	    .sortSubgroups(d4.descending);

	var arc = d4.arc()
	    .innerRadius(innerRadius)
	    .outerRadius(outerRadius);

	var ribbon = d4.ribbon()
	    .radius(innerRadius);

	var color = d4.scaleOrdinal()
	    .domain(d4.range(4))
	    .range(["#000000", "#FFDD89", "#957244", "#F26223"]);

	var g = svg.append("g")
	    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
	    .datum(chord(matrix));

	var group = g.append("g")
	    .attr("class", "groups")
	  .selectAll("g")
	    .data(function(chords) { return chords.groups; })
	  .enter().append("g")
	  .attr("class", "arc-wrapper");

	group.append("path")
		.attr("class", "arc")
	    .style("fill", function(d) { return color(d.index); })
	    .style("stroke", function(d) { return d4.rgb(color(d.index)).darker(); })
	    .attr("d", arc);

	var groupTick = group.selectAll(".group-tick")
	    .data(function(d) { return groupTicks(d, 1e3); })
	  .enter().append("g")
	    .attr("class", "group-tick")
	    .attr("transform", function(d) { return "rotate(" + (d.angle * 180 / Math.PI - 90) + ") translate(" + outerRadius + ",0)"; });

	groupTick.append("line")
	    .attr("x2", 6);

	groupTick
	  .filter(function(d) { return d.value % 5e3 === 0; })
	  .append("text")
	    .attr("x", 8)
	    .attr("dy", ".35em")
	    .attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180) translate(-16)" : null; })
	    .style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
	    .text(function(d) { return formatValue(d.value); });

	g.append("g")
	    .attr("class", "ribbons")
	  .selectAll("path")
	    .data(function(chords) { return chords; })
	  .enter().append("path")
	  	.attr("class", "ribbon")
	    .attr("d", ribbon)
	    .style("fill", function(d) { return color(d.target.index); })
	    .style("stroke", function(d) { return d4.rgb(color(d.target.index)).darker(); });

	// Returns an array of tick angles and values for a given group and step.
	function groupTicks(d, step) {
	  var k = (d.endAngle - d.startAngle) / d.value;
	  return d4.range(0, d.value, step).map(function(value) {
	    return {value: value, angle: value * k + d.startAngle};
	  });
	}

}//init

pt.basicChordDiagram.resetOpacities = function() {
	pt.basicChordDiagram.svg.selectAll(".ribbon")
		.transition().duration(750)
		.style("opacity", 0.85);

	pt.basicChordDiagram.svg.selectAll(".arc-wrapper")
		.transition().duration(750)
		.style("opacity", 1);

	pt.basicChordDiagram.svg.selectAll(".arc")
		.transition().duration(750)
		.style("opacity", 1);

}//resetOpacities

pt.basicChordDiagram.showBrown = function() {
	pt.basicChordDiagram.svg.selectAll(".ribbon")
		.transition().duration(750)
		.style("opacity", 0.2);

	pt.basicChordDiagram.svg.selectAll(".arc-wrapper")
		.transition().duration(750)
		.style("opacity", function(d,i) { return d.index === 2 ? 1 : 0.4; });
}//showBrown

pt.basicChordDiagram.showBrowntoBlond = function() {
	pt.basicChordDiagram.svg.selectAll(".ribbon")
		.transition().duration(750)
		.style("opacity", function(d,i) { return d.source.index === 2 && d.target.index === 1 ? 1 : 0.2; });

	pt.basicChordDiagram.svg.selectAll(".arc-wrapper")
		.transition().duration(750)
		.style("opacity", function(d,i) { return d.index === 2 ? 1 : 0.4; });
}//showBrowntoBlond

pt.basicChordDiagram.showBlond = function() {
	pt.basicChordDiagram.svg.selectAll(".ribbon")
		.transition().duration(750)
		.style("opacity", function(d,i) { return d.source.index === 2 && d.target.index === 1 ? 1 : 0.2; });

	pt.basicChordDiagram.svg.selectAll(".arc-wrapper")
		.transition().duration(750)
		.style("opacity", function(d,i) { return d.index === 1 ? 1 : 0.4; });
}//showBrown
