	$("#area1").hide();
	$("#area2").hide();
	
	var library = [{avgPcnt: 0, stdDev: 0}, {avgPcnt: 0, stdDev: 0}, {avgPcnt: 0, stdDev: 0}];

	library[0].color = "#3a320e";
	library[1].color = "#6d1a1a";
	library[2].color = "#19567a";

	var gaussianCanv = document.getElementById("gaussianCanv");
    var ctx = gaussianCanv.getContext("2d");

    var xScale = 0, yScale = 1;

	$(function(){

		setupCanvas();

		$("#area0").bind("input propertychange", function() {

			library[0].wrdCnt = countWordsFrom("area0", library[0].color);
			library[0].avgPcnt = avgPercent(library[0].wrdCnt);
			library[0].stdDev = stdDev(library[0].wrdCnt);  //average operation duplication

			updateStats();
			updateGaussianCanv();

		});

		$("#area1").bind("input propertychange", function() {
			
			library[1].wrdCnt = countWordsFrom("area1", library[1].color);
			library[1].avgPcnt = avgPercent(library[1].wrdCnt);
			library[1].stdDev = stdDev(library[1].wrdCnt);

			updateStats();
			updateGaussianCanv();

		});

		$("#area2").bind("input propertychange", function() {
			
			library[2].wrdCnt = countWordsFrom("area2", library[2].color);
			library[2].avgPcnt = avgPercent(library[2].wrdCnt);
			library[2].stdDev = stdDev(library[2].wrdCnt); 

			updateStats();
			updateGaussianCanv();

		});

		$("#addText").on("click", function(){

			console.log($("textarea:visible").length);

			if ($("textarea:visible").length === 1) {

				console.log($("textarea:visible").length);

				$(".textarea").transition({height: "210px"}, 300, "ease");
				$("#area1").slideDown(300);

			} else if ($("textarea:visible").length === 2) {

				console.log($("textarea:visible").length);

				$(".textarea").transition({height: "135px"}, 300, "ease");
				$("#area2").slideDown(300);
				$(this).hide();

			};

		});

	})();
