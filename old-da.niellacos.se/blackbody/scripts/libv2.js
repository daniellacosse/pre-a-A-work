// NOTE: ALL CALCULATORY FUNCTIONS OPERATE IN LOG BASE 10:
// To print values, use the read_FUNCTIONNAME() version
//
// rationale: in order for all values to be displayed elegantly
// in spectraGraph, logarithmic scales must be utilized

// important universal constants

var planck = 6.62606957e-16, // kg * nm^2 * s^-1
    boltzmann = 1.3806488e-5, // kg * nm^2 * s^-2 * K^-1
    spdOfLight = 299792458e9, // nm/s

// public variables for canvasObj (spectraGraph)

    spectraGraph = document.getElementById("spectraGraph"),
    ctx = spectraGraph.getContext("2d"),
    spectraGradient = ctx.createLinearGradient(0, 0, spectraGraph.width, 0),

// min and max of the spectraGraph axes (logarithmic, base 10)

	positiveX = 5,
	negativeX = -3,
	positiveY = 17,
	negativeY = -17;

//logarithmic conversion functions
function log10( val ) { return Math.log(val) / Math.LN10; } //	(returns the log base 10 of the value)
function tenTo( val ) { return Math.pow(10, val); } //			(un-logarizes)

//takes a graph value and returns the appropriate pixel value
function convToPixels_X( val ){ return ( val - negativeX / ( positiveX - negativeX )) * spectraGraph.width; }
function convToPixels_Y( val ){ return ( val - negativeY / ( positiveY - negativeY )) * spectraGraph.height; }

//takes a pixel value and returns the appropriate graph value
function convToGraph_X( pixl ){ return ( pixl / spectraGraph.width ) * ( positiveX - negativeX ) + negativeX; }
function convToGraph_Y( pixl ){ return ( pixl / spectraGraph.height ) * ( positiveY - negativeY ) + negativeY; }

// calRad calculates spectral radiance from temp in (K) and wl in (nm) (in log base 10)
function calRad( Temp, WveLngth ) {

	Temp = tenTo(Temp);
	WveLngth = tenTo(WveLngth);

    var constantFactor = 2 * planck * Math.pow(spdOfLight, 2), 
        result = (constantFactor / Math.pow(WveLngth, 5)) * 1/(Math.exp((planck * spdOfLight)/(WveLngth * boltzmann * Temp))-1)/1000;

    return log10(result);

}

//like calRad, but returns a readable (non-logarithmic) result
function read_calRad( Temp, WveLngth ) {o  var constantFactor = 2 * planck * Math.pow(spdOfLight, 2), 
        result = (constantFactor / Math.pow(WveLngth, 5)) * 1/(Math.exp((planck * spdOfLight)/(WveLngth * boltzmann * Temp))-1)/1000;

    return result;

}

//uses Wien's Approximation law to figure out peak wavelength
function calRadMax( Temp ) {
	
	Temp = tenTo(Temp); 

	return log10( 2.898e6 / Temp ); 

}

//read returns non-logarithmic value
function read_calRadMax( Temp ) {o(Temp); 

	return 2.898e6 / Temp; 

}

// stefan-boltzmann -- returns area under the current radiancy curve
function stefBoltz( Temp ) { 

	Temp = tenTo(Temp);

	return log10((Math.pow(Temp, 4) * 5.6704e-8)/(Math.PI * 1000)); 

}

//read returns non-logarithmic value
function read_stefBoltz( Temp ) { o(Temp);

	return ((Math.pow(Temp, 4) * 5.6704e-8)/(Math.PI * 1000)); 

}

//uses stefBoltz() to approximate the percentage of the curve a range of wavelengths take up
function calRadPcnt ( Temp, WveLngthLwr, WveLngthUpr ) { //!!! -- make sure internal handling of logarithims is correct

    var trapInteg = read_calRad(Temp, WveLngthLwr);

    for (var i = (tenTo(WveLngthUpr) - tenTo(WveLngthLwr) - 1); i > 0; i--) trapInteg += read_calRad(Temp, (WveLngthUpr - i));

    return ((trapInteg * 0.5) / read_stefBoltz(Temp) * 100);

}

function setupCanvas(){

    ctx = spectraGraph.getContext("2d");

    if (ctx !== null) {
 
        ctx.translate(0.5, 0.5);
        ctx.webkitImageSmoothingEnabled = true;
        ctx.mozImageSmoothingEnabled = true;

    };

    spectraGradient.addColorStop(0, "gray");
    spectraGradient.addColorStop((log10(400) - negativeX) / (positiveX - negativeX), "gray"); //    interior operation converts wv 
    spectraGradient.addColorStop((log10(401) - negativeX) / (positiveX - negativeX), "purple"); //  to a percentage of the 
    spectraGradient.addColorStop((log10(470) - negativeX) / (positiveX - negativeX), "blue"); //    graph scale length (value between 0 and 1)
    spectraGradient.addColorStop((log10(490) - negativeX) / (positiveX - negativeX), "cyan");
    spectraGradient.addColorStop((log10(510) - negativeX) / (positiveX - negativeX), "green");
    spectraGradient.addColorStop((log10(570) - negativeX) / (positiveX - negativeX), "yellow");
    spectraGradient.addColorStop((log10(590) - negativeX) / (positiveX - negativeX), "orange");
    spectraGradient.addColorStop((log10(650) - negativeX) / (positiveX - negativeX), "red");
    spectraGradient.addColorStop((log10(700) - negativeX) / (positiveX - negativeX), "gray");
    spectraGradient.addColorStop(1, "gray");
}

function updateTemp(){ //plots out the spec rad curve based on the present temperature value

    var specRad, Temp = $("#temperatureSlider").slider("option", "value");

    ctx = spectraGraph.getContext("2d");
    
    if (ctx !== null) {

        //save and clear canvas state to avoid overdrawing
        ctx.save();
        ctx.clearRect( 0, 0, spectraGraph.width, spectraGraph.height);

        //begins path
        ctx.beginPath();
        ctx.lineTo(0, spectraGraph.height);

        //for each column of pixels, converts from pixels to mathematic scale and plots result of 
        //calRad();
        for (var i = 0; i < spectraGraph.width + 1; i++) {

            specRad = calRad( Temp, convToGraph_X(i) );

            ctx.lineTo( i, convToPixels_Y(specRad) );

        };

        //closes path and converts to clipping mask
        ctx.lineTo(spectraGraph.width, spectraGraph.height);
        ctx.closePath();
        ctx.clip();

        //fills in clipping mask with gradient created in graphSetup()
        ctx.fillStyle = spectraGradient;
        ctx.fillRect(0, 0, spectraGraph.width, spectraGraph.height);
        ctx.restore();

    }; // if statement ends

    //updates html with current value (to be replaced by tootip)
    document.getElementById("tempP").innerHTML = tenTo($("#temperatureSlider").slider("option", "value")) + " K";

}

function calRadPlot( val ) {

    val = convToPixels_X( val );

    ctx = spectraGraph.getContext("2d");
    if(ctx != null) {

        ctx.save();

        ctx.moveTo( val, spectraGraph.height ); //moves to the slider location

        ctx.beginPath();
        ctx.lineTo( val, 0 ); //draws line to the top of the graph (no need to calculate calRad again)

        ctx.lineWidth = 2;
        ctx.strokeStyle = '#ffffff';

        ctx.stroke();
        ctx.restore();

    };

}

function updateCalRad() {
    
    var vals = $("#calRadSlider").slider("option", "values");

    if (vals[0] === vals[1]) { // if the range isn't being utilized, only use one of the sliders for calculation

        calRadPlot(vals[0]);

        document.getElementById("wavelengthP").innerHTML = tenTo(vals[0]) + " nm (max)";
        document.getElementById("wavelengthP2").innerHTML = ""; //clear
        document.getElementById("pcntP").innerHTML = ""; //clear

    } else { //if both are being utilized, use both

        calRadPlot(vals[0]);
        calRadPlot(vals[1]);

        document.getElementById("wavelengthP").innerHTML = tenTo(vals[0]) + " nm";
        document.getElementById("wavelengthP2").innerHTML = tenTo(vals[1]) + " nm";
        document.getElementById("pcntP").innerHTML = calRadPcnt(

            $("#temperatureSlider").slider("option", "value"),
            vals[0],
            vals[1]

        ) + "%";
    };
}