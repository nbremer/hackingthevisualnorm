pt.shopperdnaColors = pt.shopperdnaColors || {};

pt.shopperdnaColors.updateTitle = function(title, subtitle) {
	d3.select("#shopperdna-colors-title")
		.html(title);
	d3.select("#shopperdna-colors-subtitle")
		.html(subtitle);
}//updateTitle
