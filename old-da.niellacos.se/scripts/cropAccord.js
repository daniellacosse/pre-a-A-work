	
	var itemCt, acrdWidth, arcdHeight, itemPad, itemWidths, maxItemWidth, intCropWidth,
	itemHeights, aspectRatioes, compAspect, maxAspectIndex, $currentItem;
	
	var maxAspect = 0;
	var minCollapse = 10;
	var animating = false;
	
	//dynamically determines crop accordion height based on dimensions of provided images
	function setUpCrpAcrd() {
	
		itemCt = $(".crpAcrdItem").length;
		acrdWidth = Number( $("#crpAcrd").css("width").replace("px", "") );
		itemPad = Number( $(".crpAcrdWrap").css("margin-right").replace("px", "") );
		
		itemWidths = new Array();
		itemHeights = new Array();
		aspectRatioes = new Array();
		
		maxItemWidth = (acrdWidth - ((itemPad + minCollapse) * itemCt) );
		intCropWidth = (acrdWidth / itemCt) - itemPad;
		
		for (var i = 0; i < itemCt; i++ ) {
			
			$currentItem = $("#" + i + "_crpAcrd").children(":first");
			$currentItem.addClass("center");
			
			itemWidths[i] = $currentItem.width();
			itemHeights[i] = $currentItem.height();
			aspectRatioes[i] = itemWidths[i] / itemHeights[i];
			
			compAspect = aspectRatioes[i];
			
			if(compAspect > maxAspect) {
				maxAspect = compAspect;
				maxAspectIndex = i;
			}
			
		};
		
		acrdHeight = ( maxItemWidth / aspectRatioes[maxAspectIndex] );
		
		for (var i = 0; i < itemCt; i++ ) {
			
			$currentItem = $("#" + i + "_crpAcrd").children(":first");
			
			$currentItem.height( acrdHeight );
			$currentItem.width( (aspectRatioes[i] * acrdHeight) );
			itemWidths[i] = $currentItem.width();
			
			$currentItem.css("position", "relative");
			$currentItem.css("left", "50%");
			$currentItem.css("margin-left", "-" + (itemWidths[i] / 2) + "px");
			
			console.log(itemWidths[i]);
		}
		
		$(".crpAcrdItem").width( intCropWidth );
		
	}