	
	//vanilla js functions
	
	// sets (#) for the webpage
	function setHash (hashVal) {
		
		location.hash = hashVal;
		
	}

	function isEven(n) {
 		n = Number(n);
  		return n === 0 || !!(n && !(n%2));
	}

	function isOdd(n) {
  		return isEven(Number(n) + 1);
	}


	//proprietary functions

	// gets (#) and sets the appropriate page onload
	function parseURLHash() {
		
		var hashVal = location.hash;
		
		$("canvas").hide();
		$("footer").transition({ bottom: "-88px"}, 300, "ease");
		//clearInterval(loadAnim);
		
		if (hashVal == "#ideas") {
			
			$("#ideas").revealAsOnlyOfClass("content");
			$("#ideabutton").highlightWithClass("activeButton");
			console.log("ideas showing");
			
		} else if (hashVal == "#dev") {
			
			$("#dev").revealAsOnlyOfClass("content");
			$("#devbutton").highlightWithClass("activeButton");
			console.log("dev showing");
			
		} else if (hashVal == "#audio") {
			
			$("#audio").revealAsOnlyOfClass("content");
			$("#audiobutton").highlightWithClass("activeButton");
			console.log("aud showing");
			
		} else if (hashVal == "#video") {
			
			$("#video").revealAsOnlyOfClass("content");
			$("#videobutton").highlightWithClass("activeButton");
			console.log("vid showing");
			
		} else if (hashVal == "#viz") {
			
			$("#viz").revealAsOnlyOfClass("content");
			$("#vizbutton").highlightWithClass("activeButton");
			setUpCrpAcrd();
			console.log("viz showing");
			
		} else {
			
			$("#hpg").revealAsOnlyOfClass("content");
			console.log("hpg showing");
		
		};

			//intro animation sequence
			setTimeout(function(){
				
				$("#introtext1").fadeIn(300); 
			
				setTimeout(function(){
	
					$("#introtext1").slideUp(300);
					$("#introtext2").fadeIn(300);
					
					setTimeout(function(){
					
						$("#introtext3").fadeIn(300);
					
						setTimeout(function(){
							
							
							$("#introtext4").fadeIn(300);
							
						}, 2500);
						
					}, 2000);
					
				}, 1000);

			}, 300);

		}
		
	
	//jQuery functions
	
	//gives exclusive class of passed parameter to (this)
	(function( $ ){
   		$.fn.highlightWithClass = function(classString) {
   			
      		$("." + classString).removeClass(classString);
      		
      		$(this).addClass(classString);
      
  		}; 
	})( jQuery );
	
	//exclusively reveals (this) as class of passed parameter 
	(function( $ ){
   		$.fn.revealAsOnlyOfClass = function(classString) {
   			
      		$("." + classString).hide();
      		
      		$(this).show();
      
  		}; 
	})( jQuery );
	
	//accordion animator while I try to figure out how to generate JSON objects
	(function( $ ){
   		$.fn.transCssTo = function(cssString, targetCssVal, interval) {
   			
   			var $this = $(this);
   			var currentCssVal = Number($this.css(cssString).replace("px", ""));
   			var deltaVal = ((currentCssVal - targetCssVal)/interval);
   			var i = 0;
   			animating = true;
   			
   			var intervalLoop = setInterval( function(){
   				
   				currentCssVal -= deltaVal;
   					
   				$this.css(cssString, currentCssVal);
   				
   				if( i > interval ) clearInterval(intervalLoop);
   				
   				i++;
   				
   			}, 1);
   			
   			setTimeout( function (){
   				
   				animating = false;
   				
   			}, interval);
   				
  		}; 
	})( jQuery );
