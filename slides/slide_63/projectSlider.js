pt.projectSlider = pt.projectSlider || {};

pt.projectSlider.init = function(sectionID) {

	var ids = ["shopperdna","organogram","scatterplot","babynames","brushable-bar","stretched-chord","loom"];
	var counter = 0;

	pt.projectSlider.loop = setInterval(loopProjects,800);
	loopProjects();

	function loopProjects() {
		d3.select("#" + sectionID + " #" + ids[(counter-1)%ids.length])
			.transition().duration(800)
			.ease("linear")
			.style("opacity", 0);

		d3.select("#" + sectionID + " #" + ids[counter%ids.length])
			.transition().duration(800)
			.ease("linear")
			.style("opacity", 1);

		counter += 1;
	}//loopProjects

}//init
