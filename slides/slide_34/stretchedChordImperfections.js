pt.stretchedChordImperfections = pt.stretchedChordImperfections || {};

pt.stretchedChordImperfections.updateTitle = function(title, subtitle) {
	d3.select("#stretched-chord-imperfections-title")
		.html(title);
	d3.select("#stretched-chord-imperfections-subtitle")
		.html(subtitle);
}//updateTitle
