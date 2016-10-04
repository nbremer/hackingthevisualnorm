pt.shopperdnaLayoutChanges = pt.shopperdnaLayoutChanges || {};

pt.shopperdnaLayoutChanges.showImage = function() {
	d3.select("#shopperdna-layout-changes-first-image").style("display","inline");
}//showImage

pt.shopperdnaLayoutChanges.hideImage = function() {
	d3.select("#shopperdna-layout-changes-first-image").style("display","none");
}//showImage
