$( function () {

    setupCanvas();
    $( "#temperatureSlider" ).slider({

        orentation: vertical,
        animate: true,
        mix: 1,
        max: 7,
        step: 0.001

    });

    $( "#calRadSlider" ).slider({

        range: true, 
        animate: true,
        min: negativeX,
        max: positiveX,
        step: 0.001  

    });

    // calls updateTempToCanvas() on slider change, sets & draws line for lambda peak
    $( "#temperatureSlider" ).on( "change", function () {

        updateTemp();

        var calRadMax = calRadMax($("#temperatureSlider").slider("option", "value")); //!!! <- should be in lib.js

       $("#calRadSlider").slider("option", "values",
        
            [calRadMax, calRadMax]

        );

        updateCalRad();

    });

    // calls updateWveLngthMaxToCanvas();
    $( "#calRadSlider" ).on( "change", function () {

        updateTemp();
        updateCalRad();

    });
});