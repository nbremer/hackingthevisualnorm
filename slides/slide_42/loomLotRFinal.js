pt.loomLotRFinal = pt.loomLotRFinal || {};

pt.loomLotRFinal.init = function(data) {
	
	//Remove any existing svgs
	d3.select('#loom-lotr-final #loomLotRFinal svg').remove();

	///////////////////////////////////////////////////////////////////////////
	//////////////////// Set up and initiate svg containers ///////////////////
	///////////////////////////////////////////////////////////////////////////	

	var margin = {
		top: 50,
		right: 50,
		bottom: 50,
		left: 50
	};
	var width = $(".slides").width()*0.75 - margin.left - margin.right;
	var height = $(".slides").height()*0.75 - margin.top - margin.bottom;

	//SVG container
	var svg = d3.select('#loom-lotr-final #loomLotRFinal')
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom);
		
	//var svg = pt.loomLotRFinal.svg.append("g")
	//	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var innerRadius = Math.min(width * 0.33, height * .45),
	    outerRadius = innerRadius * 1.05;
	
	//Reset the overall font size
	//var newFontSize = Math.min(70, Math.max(40, innerRadius * 62.5 / 250));
	//d3.select("html").style("font-size", newFontSize + "%");

	////////////////////////////////////////////////////////////
	////////////////// Set-up Chord parameters /////////////////
	////////////////////////////////////////////////////////////
		
	var pullOutSize = 20 + 30/135 * innerRadius;
	var numFormat = d4.format(",.0f");
	var defaultOpacity = 0.85,
		fadeOpacity = 0.075;
							
	var loom = pt.loomLotRFinal.loom()
	    .padAngle(0.05)
		.emptyPerc(0.2)
		.widthOffsetInner(30)
		.value(function(d) { return d.words; })
		.inner(function(d) { return d.character; })
		.outer(function(d) { return d.location; });

	var arc = d4.arc()
	    .innerRadius(innerRadius*1.01)
	    .outerRadius(outerRadius);

	var string = pt.loomLotRFinal.string()
	    .radius(innerRadius)
		.pullout(pullOutSize);

	////////////////////////////////////////////////////////////
	//////////////////// Character notes ///////////////////////
	////////////////////////////////////////////////////////////
	
	var characterNotes = [];
	characterNotes["Gandalf"] = "Speaking almost twice as many words as the second most abundant speaker, Gandalf is taking up a large portion of dialogue in almost every location he's in, but stays rather quiet in Mordor";
	characterNotes["Sam"] = "An unexpected runner up to having spoken the most words, Sam flourishes after the battle at Amon Hen, taking up a considerable portion of the words said in both Mordor and Gondor";
	characterNotes["Aragorn"] = "Although eventually being crowned in Minas Tirith, Gondor, Aragorn is by far most talkative in that other human region, Rohan, fighting a battle at Helm's Deep and convincing an army of dead";
	characterNotes["Frodo"] = "Frodo seems most comfortable speaking in the Shire, (mostly) when still an innocent youth, but he feels the burden of the ring increasingly towards the end and leaves the talking to his best friend Sam";
	characterNotes["Gimli"] = "Gimli is a quiet character at practically all locations until he reaches Rohan, where he speaks almost half of all his lines";
	characterNotes["Pippin"] = "Like Merry, Pippin is also seen saying something at all locations, but his presence is mostly felt when he sings his song in Minas Tirith, serving the steward of Gondor, Denethor";
	characterNotes["Merry"] = "Merry manages to say an average sentence worth of words at all locations, but is most active during his time with Treebeard in Fangorn forest and bonding with Eowyn in Rohan";
	characterNotes["Boromir"] = "Boromir speaks his finest lines during the march up Caradhras in the Misty Mountains and right before the Uruk-hai battle at Amon Hen, Parth Galen, taking up a large portion of the total number of words spoken at those locations";
	characterNotes["Legolas"] = "Although a very memorable presence throughout the movies, Legolas speaks even less in 3 movies than Boromir, who is alive in only the first movie";

	////////////////////////////////////////////////////////////
	///////////////////// Prepare the data /////////////////////
	////////////////////////////////////////////////////////////
	
	//Sort the inner characters based on the total number of words spoken
	
	//Find the total number of words per character
	var dataChar = d4.nest()
		.key(function(d) { return d.character; })
		.rollup(function(leaves) { return d4.sum(leaves, function(d) { return d.words; }); })
		.entries(data)
		.sort(function(a, b){ return d4.descending(a.value, b.value); });				
	//Unflatten the result
	var characterOrder = dataChar.map(function(d) { return d.key; });
	//Sort the characters on a specific order
	function sortCharacter(a, b) {
	  	return characterOrder.indexOf(a) - characterOrder.indexOf(b);
	}//sortCharacter
	
	//Set more loom functions
	loom
		.sortSubgroups(sortCharacter)
		.heightInner(innerRadius*0.75/characterOrder.length);
	
	////////////////////////////////////////////////////////////
	///////////////////////// Colors ///////////////////////////
	////////////////////////////////////////////////////////////
					
	//Color for the unique locations
	var locations = ["Bree", "Emyn Muil", "Fangorn", "Gondor",  "Isengard", "Lothlorien", "Misty Mountains", "Mordor",  "Moria",   "Parth Galen", "Rivendell", "Rohan",   "The Shire"];
	var colors = ["#5a3511", "#47635f",   "#223e15", "#C6CAC9", "#0d1e25",  "#53821a",    "#4387AA",         "#770000", "#373F41", "#602317",     "#8D9413",   "#c17924", "#3C7E16"];
	var color = d4.scaleOrdinal()
    	.domain(locations)
    	.range(colors);
	
	//Create a group that already holds the data
	var g = svg.append("g")
	    .attr("transform", "translate(" + (width/2 + margin.left) + "," + (height/2 + margin.top) + ")")
		.datum(loom(data));	

	////////////////////////////////////////////////////////////
	///////////////////// Set-up title /////////////////////////
	////////////////////////////////////////////////////////////

	var titles = g.append("g")
		.attr("class", "texts")
		.style("opacity", 0);
		
	titles.append("text")
		.attr("class", "name-title")
		.attr("x", 0)
		.attr("y", -innerRadius*5/6);
		
	titles.append("text")
		.attr("class", "value-title")
		.attr("x", 0)
		.attr("y", -innerRadius*5/6 + 25);
	
	//The character pieces	
	var characterNoteText = titles.append("text")
		.attr("class", "character-note")
		.attr("x", 0)
		.attr("y", innerRadius/2)
		.attr("dy", "0.35em");
					
	////////////////////////////////////////////////////////////
	////////////////////// Draw outer arcs /////////////////////
	////////////////////////////////////////////////////////////

	var arcWrapper = g.append("g")
	    .attr("class", "arcs");

	var arcs =  arcWrapper.selectAll("g")
	    .data(function(s) { return s.groups; })
	    .enter().append("g")
		.attr("class", "arc-wrapper")
	  	.each(function(d) { d.pullOutSize = (pullOutSize * ( d.startAngle > Math.PI + 1e-2 ? -1 : 1)) })
 	 	.on("mouseover", function(d) {
			
			//Hide all other arcs	
			arcs
		      	.transition()
				.style("opacity", function(s) { return s.outername === d.outername ? 1 : 0.5; });
			
			//Hide all other strings
		    strings
		      	.transition()
		        .style("opacity", function(s) { return s.outer.outername === d.outername ? 1 : fadeOpacity; });
				
			//Find the data for the strings of the hovered over location
			var locationData = loom(data).filter(function(s) { return s.outer.outername === d.outername; });
			//Hide the characters who haven't said a word
			innerLabels
		      	.transition()
		        .style("opacity", function(s) {
					//Find out how many words the character said at the hovered over location
					var char = locationData.filter(function(c) { return c.outer.innername === s.name; });
					return char.length === 0 ? 0.1 : 1;
				});
 	 	})
     	.on("mouseout", function(d) {
			
			//Sjow all arc labels
			arcs
		      	.transition()
				.style("opacity", 1);
			
			//Show all strings again
		    strings
		      	.transition()
		        .style("opacity", defaultOpacity);
				
			//Show all characters again
			innerLabels
		      	.transition()
		        .style("opacity", 1);
 	 	});

	var outerArcs = arcs.append("path")
		.attr("class", "arc")
	    .style("fill", function(d) { return color(d.outername); })
	    .attr("d", arc)
		.attr("transform", function(d, i) { return "translate(" + d.pullOutSize + ',' + 0 + ")"; });
		 					
	////////////////////////////////////////////////////////////
	//////////////////// Draw outer labels /////////////////////
	////////////////////////////////////////////////////////////

	//The text needs to be rotated with the offset in the clockwise direction
	var outerLabels = arcs.append("g")
		.each(function(d) { d.angle = ((d.startAngle + d.endAngle) / 2); })
		.attr("class", "outer-labels")
		.attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
		.attr("transform", function(d,i) { 
			var c = arc.centroid(d);
			return "translate(" + (c[0] + d.pullOutSize) + "," + c[1] + ")"
			+ "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
			+ "translate(" + 26 + ",0)"
			+ (d.angle > Math.PI ? "rotate(180)" : "")
		})
		
	//The outer name
	var outerLabelNames = outerLabels.append("text")
		.attr("class", "outer-label")
		.attr("dy", ".35em")
		.text(function(d,i){ return d.outername; });
		
	//The value below it
	var outerLabelValues = outerLabels.append("text")
		.attr("class", "outer-label-value")
		.attr("dy", "2em")
		.text(function(d,i){ return numFormat(d.value) + " words"; });

	////////////////////////////////////////////////////////////
	////////////////// Draw inner strings //////////////////////
	////////////////////////////////////////////////////////////
	
	var stringWrapper = g.append("g")
	    .attr("class", "stringWrapper")
		.style("isolation", "isolate");
	    
	var strings = stringWrapper.selectAll("path")
	    .data(function(strings) { return strings; })
	    .enter().append("path")
		.attr("class", "string")
		.style("mix-blend-mode", "multiply")
	    .attr("d", string)
	    .style("fill", function(d) { return d4.rgb( color(d.outer.outername) ).brighter(0.2) ; })
		.style("opacity", defaultOpacity);
		
	////////////////////////////////////////////////////////////
	//////////////////// Draw inner labels /////////////////////
	////////////////////////////////////////////////////////////
			
	//The text also needs to be displaced in the horizontal directions
	//And also rotated with the offset in the clockwise direction
	var innerLabels = g.append("g")
		.attr("class","inner-labels")
	    .selectAll("text")
	    .data(function(s) { return s.innergroups; })
	    .enter().append("text")
		.attr("class", "inner-label")
		.attr("x", function(d,i) { return d.x; })
		.attr("y", function(d,i) { return d.y; })
		.style("text-anchor", "middle")
		.attr("dy", ".35em")
	    .text(function(d,i) { return d.name; })
 	 	.on("mouseover", function(d) {
			
			//Show all the strings of the highlighted character and hide all else
		    strings
		      	.transition()
		        .style("opacity", function(s) {
					return s.outer.innername !== d.name ? fadeOpacity : 1;
				});
				
			//Update the word count of the outer labels
			var characterData = loom(data).filter(function(s) { return s.outer.innername === d.name; });
			outerLabelValues
				.text(function(s,i){
					//Find which characterData is the correct one based on location
					var loc = characterData.filter(function(c) { return c.outer.outername === s.outername; });
					if(loc.length === 0) {
						var value = 0;
					} else {
						var value = loc[0].outer.value;
					}
					return numFormat(value) + (value === 1 ? " word" : " words"); 
					
				});
			
			//Hide the arc where the character hasn't said a thing
			arcs
		      	.transition()
		        .style("opacity", function(s) {
					//Find which characterData is the correct one based on location
					var loc = characterData.filter(function(c) { return c.outer.outername === s.outername; });
					return loc.length === 0 ? 0.1 : 1;
				});
					
			//Update the title to show the total word count of the character
			titles
				.transition()
				.style("opacity", 1);	
			titles.select(".name-title")
				.text(d.name);
			titles.select(".value-title")
				.text(function() {
					var words = dataChar.filter(function(s) { return s.key === d.name; });
					return numFormat(words[0].value);
				});
				
			//Show the character note
			characterNoteText
				.text(characterNotes[d.name])
				.call(wrap, 2.25*pullOutSize);
				
		})
     	.on("mouseout", function(d) {
			
			//Put the string opacity back to normal
		    strings
		      	.transition()
				.style("opacity", defaultOpacity);
				
			//Return the word count to what it was
			outerLabelValues	
				.text(function(s,i){ return numFormat(s.value) + " words"; });
				
			//Show all arcs again
			arcs
		      	.transition()
		        .style("opacity", 1);
			
			//Hide the title
			titles
				.transition()
				.style("opacity", 0);
			
		});

	////////////////////////////////////////////////////////////
	///////////////////// Extra functions //////////////////////
	////////////////////////////////////////////////////////////

	//Sort alphabetically
	function sortAlpha(a, b){
		    if(a < b) return -1;
		    if(a > b) return 1;
		    return 0;
	}//sortAlpha

	//Sort on the number of words
	function sortWords(a, b){
		    if(a.words < b.words) return -1;
		    if(a.words > b.words) return 1;
		    return 0;
	}//sortWords

}//init

/* Based on the d3v4 d3.chord() function by Mike Bostock
** Adjusted by Nadieh Bremer - July 2016 */
pt.loomLotRFinal.loom = function() {
	
  var pi$3 = Math.PI;
  var tau$3 = pi$3 * 2;
  var max$1 = Math.max;
	
  var padAngle = 0,
      sortGroups = null,
      sortSubgroups = null,
  	  sortStrings = null,
  	  heightInner = 20,
  	  widthOffsetInner = function() { return x; },
  	  emptyPerc = 0.2,
  	  value = function(d) { return d; },
	  inner = function(d) { return d.source; },
  	  outer = function(d) { return d.target; };

  function loom(data) {
	  
	  //Nest the data on the outer variable
	  data = d4.nest().key(outer).entries(data);
	  
	  var n = data.length,
	  	groupSums = [],
        groupIndex = d4.range(n),
        subgroupIndex = [],
        looms = [],
        groups = looms.groups = new Array(n),
        subgroups,
		numSubGroups,
	  	uniqueInner = looms.innergroups = [],
	  	uniqueCheck = [],
	    emptyk,
        k,
        x,
        x0,
        dx,
        i,
        j,
	  	l,
	  	m,
	  	s,
	    v,
	    sum,
	  	counter,
		reverseOrder = false,
	    approxCenter;

	//Loop over the outer groups and sum the values
	k = 0;
	numSubGroups = 0;
	for(i = 0; i < n; i++) {
		v = data[i].values.length;
		sum = 0;
		for(j = 0; j < v; j++) {
			sum += value(data[i].values[j]);
		}//for j
		groupSums.push(sum);
		subgroupIndex.push(d4.range(v));
		numSubGroups += v;
		k += sum;	
	}//for i
	
    // Sort groups…
    if (sortGroups) groupIndex.sort(function(a, b) {
      return sortGroups(groupSums[a], groupSums[b]);
    });

    // Sort subgroups…
    if (sortSubgroups) subgroupIndex.forEach(function(d, i) {
      d.sort(function(a, b) {
        return sortSubgroups( inner(data[i].values[a]), inner(data[i].values[b]) );
      });
    });
				
	//After which group are we past the center
	//TODO: make something for if there is no nice split in two...
	l = 0;
	for(i = 0; i < n; i++) {
		l += groupSums[groupIndex[i]];
		if(l > k/2) {
			approxCenter = groupIndex[i];
			break;
		}//if
	}//for i
	
	//How much should be added to k to make the empty part emptyPerc big of the total
	emptyk = k * emptyPerc / (1 - emptyPerc);
	k += emptyk;

    // Convert the sum to scaling factor for [0, 2pi].
    k = max$1(0, tau$3 - padAngle * n) / k;
    dx = k ? padAngle : tau$3 / n;
  
    // Compute the start and end angle for each group and subgroup.
    // Note: Opera has a bug reordering object literal properties!
	subgroups = new Array(numSubGroups);
    x = emptyk * 0.25 * k; //quarter of the empty part //0;
	counter = 0;
	for(i = 0; i < n; i++) {
		var di = groupIndex[i],
			outername = data[di].key;
		
		if(approxCenter === di) { 
			x = x + emptyk * 0.5 * k; 
		}//if
		x0 = x;
		//If you've crossed the bottom, reverse the order of the inner strings
		if(x > pi$3) reverseOrder = true;
		s = subgroupIndex[di].length;
		for(j = 0; j < s; j++) {
            var dj = reverseOrder ? subgroupIndex[di][(s-1)-j] : subgroupIndex[di][j],
                v = value(data[di].values[dj]),
				innername = inner(data[di].values[dj]);
                a0 = x,
                a1 = x += v * k;
	        subgroups[counter] = {
	              index: di,
	              subindex: dj,
	              startAngle: a0,
	              endAngle: a1,
	              value: v,
				  outername: outername,
				  innername: innername
	        };
			
			//Check and save the unique inner names
		    if( !uniqueCheck[innername] ) {
		    	uniqueCheck[innername] = true;
		    	uniqueInner.push({name: innername});
			}//if
			
			counter += 1;
		}//for j
        groups[di] = {
            index: di,
            startAngle: x0,
            endAngle: x,
            value: groupSums[di],
			outername: outername
        };
        x += dx;		
	}//for i

	//Sort the inner groups in the same way as the strings
  	if (sortSubgroups) {
  		uniqueInner.sort(function(a, b) {
    		return sortSubgroups( a.name, b.name );
  		});
  	}//if
	//Find x and y locations of the inner categories
	//TODO: make x depend on length of inner name	
	m = uniqueInner.length
	for(i = 0; i < m; i++) {
		uniqueInner[i].x = 0;
		uniqueInner[i].y = -m*heightInner/2 + i*heightInner;
		uniqueInner[i].offset = widthOffsetInner(uniqueInner[i].name, i, uniqueInner);
	}//for i
  			
    //Generate bands for each (non-empty) subgroup-subgroup link
	counter = 0;
	for(i = 0; i < n; i++) {
		var di = groupIndex[i];
		s = subgroupIndex[di].length;
		for(j = 0; j < s; j++) {
			var outerGroup = subgroups[counter];
			var innerTerm = outerGroup.innername;
			//Find the correct inner object based on the name
			var innerGroup = searchTerm(innerTerm, "name", uniqueInner);
	            if (outerGroup.value) {
	              looms.push({inner: innerGroup, outer: outerGroup});
	            }//if
			counter +=1;
		}//for j
	}//for i

    return sortStrings ? looms.sort(sortStrings) : looms;
  };//function loom(matrix)

  function searchTerm(term, property, arrayToSearch){
	   for (var i=0; i < arrayToSearch.length; i++) {
	       if (arrayToSearch[i][property] === term) {
	           return arrayToSearch[i];
	       }//if
	   }//for i
  }//searchTerm

  function constant$11(x) {
      return function() { return x; };
  }//constant$11
  
  loom.padAngle = function(_) {
    return arguments.length ? (padAngle = max$1(0, _), loom) : padAngle;
  };

  loom.inner = function(_) {
    return arguments.length ? (inner = _, loom) : inner;
  };
  
  loom.outer = function(_) {
    return arguments.length ? (outer = _, loom) : outer;
  };
  
  loom.value = function(_) {
    return arguments.length ? (value = _, loom) : value;
  };
  
  loom.heightInner = function(_) {
    return arguments.length ? (heightInner = _, loom) : heightInner;
  };

  loom.widthOffsetInner = function(_) {
    return arguments.length ? (widthOffsetInner = typeof _ === "function" ? _ : constant$11(+_), loom) : widthOffsetInner;
  };
  
  loom.emptyPerc = function(_) {
    return arguments.length ? (emptyPerc = _ < 1 ? max$1(0, _) : max$1(0, _*0.01), loom) : emptyPerc;
  };
  
  loom.sortGroups = function(_) {
    return arguments.length ? (sortGroups = _, loom) : sortGroups;
  };

  loom.sortSubgroups = function(_) {
    return arguments.length ? (sortSubgroups = _, loom) : sortSubgroups;
  };

  loom.sortBands = function(_) {
    return arguments.length ? (_ == null ? sortBands = null : (sortBands = compareValue(_))._ = _, loom) : sortBands && sortBands._;
  };

  return loom;
  
}//loom



/* Based on the d3v4 d3.ribbon() function by Mike Bostock
** Adjusted by Nadieh Bremer - July 2016 */
pt.loomLotRFinal.string = function() {

  var slice$5 = Array.prototype.slice;
	
  var cos = Math.cos;
  var sin = Math.sin;
  var pi$3 = Math.PI;
  var halfPi$2 = pi$3 / 2;
  var tau$3 = pi$3 * 2;
  var max$1 = Math.max;
  
  var inner = function (d) { return d.inner; },
      outer = function (d) { return d.outer; },
      radius = function (d) { return d.radius; },
      startAngle = function (d) { return d.startAngle; },
      endAngle = function (d) { return d.endAngle; },
  	  x = function (d) { return d.x; },
  	  y = function (d) { return d.y; },
  	  offset = function (d) { return d.offset; },
  	  pullout = 50,
  	  heightInner = 0, 
      context = null;

  function string() {
    var buffer,
        argv = slice$5.call(arguments),
        out = outer.apply(this, argv),
        inn = inner.apply(this, argv),
        sr = +radius.apply(this, (argv[0] = out, argv)),
        sa0 = startAngle.apply(this, argv) - halfPi$2,
        sa1 = endAngle.apply(this, argv) - halfPi$2,
        sx0 = sr * cos(sa0),
        sy0 = sr * sin(sa0),
        sx1 = sr * cos(sa1),
        sy1 = sr * sin(sa1),
        tr = +radius.apply(this, (argv[0] = inn, argv)),
	  	tx = x.apply(this, argv),
	  	ty = y.apply(this, argv),
	  	toffset = offset.apply(this, argv),
	    theight,
	  	xco,
	    yco,
	  	xci,
	    yci,
	  	leftHalf,
		pulloutContext;
		
		//Does the group lie on the left side
		leftHalf = sa0+halfPi$2 > pi$3 && sa0+halfPi$2 < tau$3;
		//If the group lies on the other side, switch the inner point offset
		if(leftHalf) toffset = -toffset;
		tx = tx + toffset;
		//And the height of the end point
		theight = leftHalf ? -heightInner : heightInner;
		

        if (!context) context = buffer = d4.path();

		//Change the pullout based on where the string is
		pulloutContext  = (leftHalf ? -1 : 1 ) * pullout;
		sx0 = sx0 + pulloutContext;
		sx1 = sx1 + pulloutContext;
		
		//Start at smallest angle of outer arc
        context.moveTo(sx0, sy0);
		//Circular part along the outer arc
        context.arc(pulloutContext, 0, sr, sa0, sa1);
		//From end outer arc to center (taking into account the pullout)
        xco = d4.interpolateNumber(pulloutContext, sx1)(0.5);
        yco = d4.interpolateNumber(0, sy1)(0.5);
		if( (!leftHalf && sx1 < tx) || (leftHalf && sx1 > tx) ) {
			//If the outer point lies closer to the center than the inner point
			xci = tx + (tx - sx1)/2;
			yci = d4.interpolateNumber(ty + theight/2, sy1)(0.5);
		} else {
			xci = d4.interpolateNumber(tx, sx1)(0.25);
			yci = ty + theight/2;
		}//else
        context.bezierCurveTo(xco, yco, xci, yci, tx, ty + theight/2);
		//Draw a straight line up/down (depending on the side of the circle)
		context.lineTo(tx, ty - theight/2);
		//From center (taking into account the pullout) to start of outer arc
        xco = d4.interpolateNumber(pulloutContext, sx0)(0.5);
        yco = d4.interpolateNumber(0, sy0)(0.5);
		if( (!leftHalf && sx0 < tx) || (leftHalf && sx0 > tx) ) { 
			//If the outer point lies closer to the center than the inner point
			xci = tx + (tx - sx0)/2;
			yci = d4.interpolateNumber(ty - theight/2, sy0)(0.5);
		} else {
			xci = d4.interpolateNumber(tx, sx0)(0.25);
			yci = ty - theight/2;
		}//else
		context.bezierCurveTo(xci, yci, xco, yco, sx0, sy0);
		//Close path
		context.closePath();

        if (buffer) return context = null, buffer + "" || null;
  }//function string

  function constant$11(x) {
      return function() { return x; };
  }//constant$11

  string.radius = function(_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : constant$11(+_), string) : radius;
  };

  string.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant$11(+_), string) : startAngle;
  };

  string.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant$11(+_), string) : endAngle;
  };
  
  string.x = function(_) {
    return arguments.length ? (x = _, string) : x;
  };

  string.y = function(_) {
    return arguments.length ? (y = _, string) : y;
  };

  string.offset = function(_) {
    return arguments.length ? (offset = _, string) : offset;
  };
  
  string.heightInner = function(_) {
    return arguments.length ? (heightInner = _, string) : heightInner;
  };

  string.inner = function(_) {
    return arguments.length ? (inner = _, string) : inner;
  };

  string.outer = function(_) {
    return arguments.length ? (outer = _, string) : outer;
  };
  
  string.pullout = function(_) {
    return arguments.length ? (pullout = _, string) : pullout;
  };

  string.context = function(_) {
    return arguments.length ? ((context = _ == null ? null : _), string) : context;
  };

  return string;
  
}//string


