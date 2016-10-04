pt.shopperdnaColorIntro = pt.shopperdnaColorIntro || {};

pt.shopperdnaColorIntro.init = function() {

	//Remove any existing svgs
	d3.select('#shopperdna-color-intro #shopperdnaColorIntro svg').remove();

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
	pt.shopperdnaColorIntro.svg = d4.select('#shopperdna-color-intro #shopperdnaColorIntro')
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom);
		
	var svg = pt.shopperdnaColorIntro.svg.append("g")
		.attr("transform", "translate(" + (margin.left + width/2) + "," + (margin.top + height/2) + ")");

	///////////////////////////////////////////////////////////////////////////
	///////////////////////////// Create gradient /////////////////////////////
	///////////////////////////////////////////////////////////////////////////	

	var defs = svg.append("defs");

    //Create rainbow gradient for fill
	var colors = ["#EFB605", "#E9A501", "#E48405", "#E34914", "#DE0D2B", "#CF003E", "#B90050", "#A30F65", 
				  "#8E297E", "#724097", "#4F54A8", "#296DA4", "#0C8B8C", "#0DA471", "#39B15E", "#7EB852"];

    var rainbowGradient = defs.append("linearGradient")
      .attr("id", "rainbow-color-gradient")
      //.attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0).attr("y1", 0)
      .attr("x2", 1).attr("y2", 0);

    rainbowGradient.selectAll(".rainbow-stop") 
      .data(colors)                  
      .enter().append("stop") 
      .attr("class", "rainbow-stop")
      .attr("offset", function(d,i) { return i/(colors.length-1); })   
      .attr("stop-color", function(d) { return d; });

	///////////////////////////////////////////////////////////////////////////
	////////////////////////////// Place the text /////////////////////////////
	///////////////////////////////////////////////////////////////////////////	

	svg.append("text")
		.attr("class", "title-text")
		.attr("dy", "0.35em")
		.style("fill", "url(#rainbow-color-gradient)")
		.text("Colors");

}//init
