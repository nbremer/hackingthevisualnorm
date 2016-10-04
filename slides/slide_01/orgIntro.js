pt.organogramIntro = pt.organogramIntro || {};

pt.organogramIntro.init = function(graph) {
	
	//Remove any existing svgs
	d3.select('#intro-organogram #organogramIntro svg').remove();

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
	pt.organogramIntro.svg = d3.select('#intro-organogram #organogramIntro')
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom);
		
	var svg = pt.organogramIntro.svg.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
	var networkData = JSON.parse(JSON.stringify(graph));
	pt.organogramIntro.nodeRadius = 6;
	var nodeColors = ["#EFB605", "#E47D06", "#DB0131", "#AF0158", "#7F378D", "#3465A8", "#0AA174", "#7EB852"];

	///////////////////////////////////////////////////////////////////////////
	/////////////////////// Calculate hexagon variables ///////////////////////
	///////////////////////////////////////////////////////////////////////////	

	var SQRT3 = Math.sqrt(3),
		hexRadius = Math.min(width, height)/2,
		hexWidth = SQRT3 * hexRadius,
		hexHeight = 2 * hexRadius;
	var hexagonPoly = [[0,-1],[SQRT3/2,0.5],[0,1],[-SQRT3/2,0.5],[-SQRT3/2,-0.5],[0,-1],[SQRT3/2,-0.5]];
	var hexagonPath = "m" + hexagonPoly.map(function(p){ return [p[0]*hexRadius, p[1]*hexRadius].join(','); }).join('l') + "z";

	pt.organogramIntro.hexWidth = hexWidth;
	pt.organogramIntro.hexHeight = hexHeight;

	///////////////////////////////////////////////////////////////////////////
	/////////////////////////////// Create defs ///////////////////////////////
	///////////////////////////////////////////////////////////////////////////	

	var defs = svg.append("defs");

	//Create a clip path that is the same as the top hexagon
	defs.append("clipPath")
        .attr("id", "clip")
        .append("path")
        .attr("d", "M" + (width/2) + "," + (height/2) + hexagonPath);

	///////////////////////////////////////////////////////////////////////////
	/////////////////////////// Initialize force //////////////////////////////
	///////////////////////////////////////////////////////////////////////////	

	var nodes = flatten(networkData),
      	links = d3.layout.tree().links(nodes);

    var force = d3.layout.force()
        .gravity(.075)
	    .charge(-80)
	    .linkDistance(10)
        .size([pt.organogramIntro.hexWidth, pt.organogramIntro.hexHeight])
        .nodes(nodes)
        .links(links)
        .start();

	///////////////////////////////////////////////////////////////////////////
	/////////////////////////// Initialize containers /////////////////////////
	///////////////////////////////////////////////////////////////////////////	

    //Create a wrapper for the network
    var networkWrapper = svg.append("g")
    	.attr("clip-path", "url(#clip)")
		.style("clip-path", "url(#clip)") //make it work in safari
	   .append("g")
		.attr("transform", "translate(" + ((width-hexWidth)/2) + "," + ((height-hexHeight)/2) + ")")
		.attr("class", "networkWrapper");

    //Create wrapper for the voronoi clip paths
    var clipWrapper = networkWrapper.append("g")
        .attr("class", "clipWrapper");

    // //Container for all the links
    // var linkWrapper = networkWrapper.append("g")
    //     .attr("class", "linkWrapper");

    //Container for all the links
    var nodeWrapper = networkWrapper.append("g")
        .attr("class", "nodeWrapper");

 	///////////////////////////////////////////////////////////////////////////
	///////////////////////////// Initialize Links ////////////////////////////
	///////////////////////////////////////////////////////////////////////////	

    // //Create the link lines
    // var link = linkWrapper.selectAll(".link")
    //     .data(links)
    //   .enter().append("path")
    //     .attr("class", "link");

    // //Draw the lines
    // link.attr( "d", function ( d ) {
    //     var source = d.source;
    //     var target = d.target;
    //     var dx = target.x - source.x;
    //     var dy = target.y - source.y;
    //     var dr = Math.sqrt(dx * dx + dy * dy) * 2;

    //     //Curved lines
    //     return [
    //         "M", source.x, source.y,
    //         "A", dr, dr, "0 0 1", target.x, target.y
    //     ].join( " " );
    // });

	///////////////////////////////////////////////////////////////////////////
	//////////////////////////// Initialize Nodes /////////////////////////////
	///////////////////////////////////////////////////////////////////////////	

    //Create the node circles - first a wrapper for each node
    var node = nodeWrapper.selectAll(".node")
        .data(nodes)
      .enter().append("g")
        .attr("class", function(d,i) { return "node node-id-" + i; })
        .attr("clip-path", function(d,i) { return "url(#clip-" + i + ")"; })
        .style("clip-path", function(d,i) { return "url(#clip-" + i + ")"; })
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        .style("fill", function(d,i) { return nodeColors[i%(nodeColors.length-1)]; });

    node.append("circle")
        .attr("class", "circle-node background-node")
        .attr("r", pt.organogramIntro.nodeRadius*3)
        .style("stroke", "none")
        .style("fill", "white")
        .style("opacity", 0.7);

    //Background circles to catch the voronoi event better
    node.append("circle")
        .attr("class", "circle-node voronoi-node")
        .attr("r", pt.organogramIntro.nodeRadius*3)
        .style("fill-opacity", 0.6);

    //The full opacity smaller circles
    node.append("circle")
        .attr("class", "circle-node visible-node")
        .attr("r", pt.organogramIntro.nodeRadius);

	///////////////////////////////////////////////////////////////////////////
	///////////////////////////// Start animation /////////////////////////////
	///////////////////////////////////////////////////////////////////////////	

    force
    	.on("tick", function() {
        	pt.organogramIntro.drawNetwork(link, node, links, nodes); 
    	})

	///////////////////////////////////////////////////////////////////////////
	///////////////////////// Place hexagon in center /////////////////////////
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
  
	function flatten(root) {
	  	var nodes = [];
	  	function recurse(node) {
	    	if (node.children) node.children.forEach(recurse);
	    	nodes.push(node);
	  	}
	  	recurse(root);
	  	return nodes;
	}//flatten

}//init

pt.organogramIntro.drawNetwork = function(link, node, links, nodes) {

  //Place nodes
  node
    .attr('transform', function(d) { 
    	d.x = Math.max(pt.organogramIntro.nodeRadius, Math.min(pt.organogramIntro.hexWidth - pt.organogramIntro.nodeRadius, d.x));
    	d.y = Math.max(pt.organogramIntro.nodeRadius, Math.min(pt.organogramIntro.hexHeight - pt.organogramIntro.nodeRadius, d.y)); 
    	return 'translate(' + d.x + ',' + d.y + ')'; 
    });

  // //Draw the lines
  // link
  //   .attr( "d", function ( d ) {
  //     var source = d.source;
  //     var target = d.target;
  //     var dx = target.x - source.x;
  //     var dy = target.y - source.y;
  //     var dr = Math.sqrt(dx * dx + dy * dy) * 2;

  //     //Curved lines
  //     return [
  //         "M", source.x, source.y,
  //         "A", dr, dr, "0 0 1", target.x, target.y
  //     ].join( " " );
  // });

  //Calculate the clipping paths
  pt.organogramIntro.createClippingPaths(node);

}//drawNetwork

pt.organogramIntro.createClippingPaths = function(node) {

  //Add the voronoi clipping paths to the nodes
  var voronoiData = pt.organogramIntro.recenterVoronoi(node.data());

  //Add the clipping paths data to the nodes
  var clips = d3.select("#organogramIntro .clipWrapper").selectAll(".clip")
      .data(voronoiData, function(d,i) { return i; } );
  //Update
  clips.select(".clip-path-low")
      .attr("d", function(d) { return "M" + d.join(",") + "Z"; });
  //Enter
  clips
      .enter().append("clipPath")
      .attr("class", "clip")
      .attr("id", function(d,i) { return "clip-" + i; })
      .append("path")
      .attr("class", "clip-path-low")
      .attr("d", function(d) { return "M" + d.join(",") + "Z"; });
  //Exit
  clips.exit().remove(); 

}//setClippingPaths

//Figure out the voronoi shape to use for the clip path
//http://bl.ocks.org/couchand/6420534
pt.organogramIntro.recenterVoronoi = function(nodes) {
    var voronoi = d3.geom.voronoi()
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; });

    var shapes = [];
    voronoi(nodes).forEach(function(d) {
        if ( !d.length ) return;
        var n = [];
        d.forEach(function(c) {
            n.push([ c[0] - d.point.x, c[1] - d.point.y ]);
        });
        n.point = d.point;
        shapes.push(n);
    });
    return shapes;
}//recenterVoronoi
