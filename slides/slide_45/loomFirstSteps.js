pt.loomFirstSteps = pt.loomFirstSteps || {};

pt.loomFirstSteps.updateTitle = function(title, subtitle) {
	d3.select("#loom-first-steps-title")
		.html(title);
	d3.select("#loom-first-steps-subtitle")
		.html(subtitle);
}//updateTitle
