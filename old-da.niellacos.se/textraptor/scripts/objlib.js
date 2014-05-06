
word = {

	str: "", 			//word string (TO IMPLEMENT: related[] and pos: "")
	count: 0, 			//number of instances of word string in parent text
	percent: 0, 		//% instances of word string in parent text
	occurrences = [], 	//list of index# where word string occurs

	color: "#000000" 	//color that word appears as in app

};

function word(str, count, percent, occur, color) {

	this.str = str;
	this.count = count;
	this.percent = percent;
	this.occurrences = occur;
	this.color = color;

}

text = {

	index = [],			//sequence of word strings in text, in chronological order. 
						//(text.index.length gives length of text)

	words = [],			//array of word{} objects, where word strings from index[] 
						//are counted and sorted (see: 18)

	avg: 0,				//avg# of occurrences of any given word string
	stdDev: 0,			//stdDev of occurrences of any given word string
	avgPcnt: 0,			//avg% of occurrences of any given word string
	stdDevPcnt: 0,		//stdDev% of occurrences of any given word string

	color: "#000000"  	//color that children of words[] appears as in app

};

function text(text, color) {

	var a = [], sum;

	this.index = createArrayfromString(removePunct(text));
	this.words = this.index.slice().sort();

	for ( var i = 0; i < this.words.length; i++ ) {

	        if ( this.words[i] !== prev && i > 0) {

				a[a.length-1].percent = ( a[a.length-1].count / this.words.length ) * 100;
				
	            a.push( word(this.words[i], 1, (1/this.words.length)*100, [i], color) );

	        } else if ( this.words[i] !== prev ) {

	            a.push( word(this.words[i], 1, (1/this.words.length)*100, [i], color) );

	        } else {

	            a[a.length-1].count++;
	            a[a.length-1].percent = ((a[a.length-1].count/this.words.length) * 100);

	        }

	        prev = this.words.length[i];

	};

	this.words = a;
	this.words.sort(function(x, y){ return y.count - x.count; });

	this.color = color;

	this.avg = this.index.length / this.words.length;
	this.avgPcnt = avgPercent(this.words);
	this.stdDev = stdDev(this.words);
	this.stdDevPcnt = stdDevPercent(this.words);

}

	var library = [];		//master array of texts to be compared

	function avgCount(arr) {

		var sum = 0;

		for(var i = 0; i < arr.length; i++){
    		sum += arr[i].count;
		}

		sum /= arr.length;
		return sum;

	}

	function avgPercent(arr) {

		var sum = 0;

		for(var i = 0; i < arr.length; i++){
    		sum += arr[i].percent;
		}

		sum /= arr.length;
		return sum;

	}

	function stdDev(arr) {

		var average = avgCount(arr),
			sum = 0;

		for (var i = 0; i < arr.length; i++){

    		sum += Math.pow(arr[i].count - average, 2);

		};

		sum /= arr.length;
		return Math.sqrt(sum);

	}

	function stdDevPercent(arr) {

		var average = avgPercent(arr),
			sum = 0;

		for (var i = 0; i < arr.length; i++){

    		sum += Math.pow(arr[i].percent - average, 2);

		};

		sum /= arr.length;
		return Math.sqrt(sum);

	}

		function countWordsFrom(area, color) {

		var str = removePunct(document.getElementById(area).value),
			arr = createArrayfromString(str),
			arrSt = arr.slice().sort(),
			arrCt = wordCount(arrSt, color);

		arrCt.sort(function(x, y){ return y.count - x.count; });
		return arrCt;

	}

	function removePunct(str) {

		str = str.replace(/[\n\r\_\u2014]/g, " ");
		str = str.replace(/[0123456789\.\!\?\"\'\`\(\)\[\]\{\}\<\>\,\:\;\-\—\—\+\=\u201C\u201D\u2026]/g, "");
		str = str.toLowerCase();

		return str;

	}
