
var childWidth, otherWidth;

var expandCount = 1;
var animating = false;
var $selection = $("#active_selector");

$(function(){
			
//footer reveal toggle event listener
	$("footer").on("click", function(){

		if ( isOdd(expandCount) ) $(this).transition({ bottom: "-1px"}, 300, "ease");
		else $(this).transition({ bottom: "-88px"}, 300, "ease");

		$("#footerNav").slideToggle(300);

		$("#tut").removeClass("tutAnim").fadeOut(300);

		expandCount++;
		if (expandCount > 2) $("#copyright").fadeToggle(300);

	})

//footer nav event listener	
	$("#ideabutton").on("click", function() {
				
		setHash("ideas");
		$("#ideas").revealAsOnlyOfClass("content");
		$(this).highlightWithClass("activeButton");
				
	});
				
	$("#devbutton").on("click", function () {
				
		setHash("dev");
		$("#dev").revealAsOnlyOfClass("content");
		$(this).highlightWithClass("activeButton");
				
	});
				
	$("#audiobutton").on("click", function () {
				
		setHash("audio");
		$("#audio").revealAsOnlyOfClass("content");
		$(this).highlightWithClass("activeButton");					
				
	});
			
	$("#videobutton").on("click", function () {
				
		setHash("video");
		$("#video").revealAsOnlyOfClass("content");
		$(this).highlightWithClass("activeButton");
				
	});
		
	$("#vizbutton").on("click", function () {
				
		setHash("viz");
		$("#viz").revealAsOnlyOfClass("content");
		$(this).highlightWithClass("activeButton");
		setUpCrpAcrd();
				
	});
			
	$("header > img").on("click", function () {
				
		setHash("");
		$("#hpg").revealAsOnlyOfClass("content");
		$(".activeButton").removeClass("activeButton");
				
	});
		
//homepage nav event listener	
	$("#intro_select").on("click", function() {
				
		$selection.transition({top: "-25px"}, 300);
		$("#intro_selectLabel").transition({opacity: 1}, 300);
		$("#news_selectLabel").transition({opacity: 0.5}, 300);
		$("#aboutme_selectLabel").transition({opacity: 0.5}, 300);
				
		$("#intro").revealAsOnlyOfClass("homepage");
		
	});
				
	$("#news_select").on("click", function() {
				
		$selection.transition({top: "167px"}, 300);
		$("#intro_selectLabel").transition({opacity: 0.5}, 300);
		$("#news_selectLabel").transition({opacity: 1}, 300);
		$("#aboutme_selectLabel").transition({opacity: 0.5}, 300);
				
		$("#news").revealAsOnlyOfClass("homepage");
		
		$("#recent_news").hide(); //slides down recent news for conveyance
		setTimeout(function() { $("#recent_news").slideDown(300); }, 100);
	
	});
			
	$("#aboutme_select").on("click", function() {
				
		$selection.transition({top: "360px"}, 300);
		$("#intro_selectLabel").transition({opacity: 0.5}, 300);
		$("#news_selectLabel").transition({opacity: 0.5}, 300);
		$("#aboutme_selectLabel").transition({opacity: 1}, 300);
				
		$("#aboutme").revealAsOnlyOfClass("homepage");	
				
	});
		
//video widget event listener
	$(".playlister_select").on("click", function(){
			
		var idNo = $(this).attr("id").charAt(0);

		$(this).highlightWithClass("activeVidja");
		$("#" + idNo + "_playlister").revealAsOnlyOfClass("vidja");
			
	});

//crop accordion event listener
	$(".crpAcrdItem").mouseover( function() {

		if ( !(animating) ) {
				
			childWidth = $(this).children(":first").width();
			otherWidth = ((acrdWidth - childWidth) / (itemCt - 1) - itemPad);
				
			$(this).transCssTo("width", childWidth, 50);
			$(".crpAcrdItem").not(this).transCssTo("width", otherWidth, 50);
			$(this).siblings(".crpAcrdDescrip").revealAsOnlyOfClass("crpAcrdDescrip");
				
		};
			
	});
		
		
	$(".crpAcrdItem").mouseout( function() {
			
		if ( !(animating) ){	
			
			$(this).transCssTo("width", intCropWidth, 50);
			$(".crpAcrdItem").not(this).transCssTo("width", intCropWidth, 50);
			$(this).siblings(".crpAcrdDescrip").fadeOut(300);
				
		};
			
	});
		
})();
		