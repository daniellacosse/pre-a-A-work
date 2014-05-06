$(function(){
			
			var $SliderValue = $('#slideshowPosition');
			var $SlideshowWidth = $('#slideshow').width();
			var $WindowWidth = $(window).width();
			var $x = 0;
			
			$SliderValue.change(function(){
				
				$WindowWidth = $(window).width();
				$x = -1*(this.value/100)*($SlideshowWidth-$WindowWidth);
				
				console.log('Slider Value: ' + this.value);
				console.log('Slideshow Width: ' + $SlideshowWidth);
				console.log('Window Width: ' + $WindowWidth);
				console.log('Shift Amount: ' + $x);
				
				$('#slideshow').css('left', $x);
				
				
			});
			
			$SliderValue.change();
			
		});