// important universal constants
var planck = 6.62606957e-16, // kg * nm^2 * s^-1
    boltzmann = 1.3806488e-5, // kg * nm^2 * s^-2 * K^-1
    spdOfLight = 299792458e9, // nm/s
             
// public variables for canvasObj
    spectraGraph = document.getElementById("spectraGraph"),
    ctx = spectraGraph.getContext("2d"),
    spectraGradient = ctx.createLinearGradient(0, 0, spectraGraph.width, 0),

// width and height of the values shown on graph (logrithmic, base 10)
    wlScale = 11, 
    srScale = 34,

//offset of wl and sr (basically how far the scale goes on the negative axis)
    wlOffset = 3,
    srOffset = 17,
    transX = scale(wlOffset, (wlOffset + wlScale), spectraGraph.width), //!!!
    transY = spectraGraph.height - scale(srOffset, (srOffset + srScale), spectraGraph.height);
    console.log(transX, transY);

// calRad calculates spectral radiance from temp in (K) and wl in (nm)
function calRad( Temp, WveLngth ) {

    var constantFactor = 2 * planck * Math.pow(spdOfLight, 2), 
        result = (constantFactor / Math.pow(WveLngth, 5)) * 1/(Math.exp((planck * spdOfLight)/(WveLngth * boltzmann * Temp))-1)/1000;

    return result;

}

//uses Wien's Approximation law to figure out peak wavelength
function calRadMax( Temp ) { return ( 2.898e6 / Temp ); }

// stefan-boltzmann -- area under the current radiancy curve
function stefBoltz( Temp ) { return ((Math.pow(Temp, 4) * 5.6704e-8)/(Math.PI * 1000)); }

//uses stefBoltz() to approximate the percentage of the curve a range of wavelengths take up
function calRadPcnt ( Temp, WveLngthLwr, WveLngthUpr ) {

    var trapInteg = calRad(Temp, WveLngthLwr);

    for (var i = (WveLngthUpr - WveLngthLwr - 1); i > 0; i--) trapInteg += calRad(Temp, (WveLngthUpr - i));

    return ((trapInteg * 0.5) / stefBoltz(Temp) * 100);

}

function scale( val, scaleFrom, scaleTo ) { return ((val/scaleFrom) * scaleTo); }

function log10( val ) { return Math.log(val) / Math.LN10; }

//gets canvas context and sets origin to bottom left
function setupCanvas(){

    ctx = spectraGraph.getContext("2d");

    if (ctx !== null) {

        //sets scale

        // ctx.translate(
        //     0, 
        //     spectraGraph.height 
        // );

        ctx.translate( transX, transY );

        
        ctx.translate(0.5, 0.5);
        ctx.webkitImageSmoothingEnabled = true;
        ctx.mozImageSmoothingEnabled = true;

        //debug
        /*ctx.fillRect(0, 0, 1, 1);//middle point
        ctx.fillRect(-transX, 0, 1-transX, 1); // left point
        console.log("left co-ordinates: " + -transX, 0);
        ctx.fillRect(0, -transY, 1, 1-transY); // top point
        console.log("top co-ordinates: " + 0, -transY);
        ctx.fillRect(0, spectraGraph.height-1-transY, 1, spectraGraph.height-2-transY);//bottom point -- 1 less than the actual point, because it intersects with frame border
        console.log("bottom co-ordinates: " + 0, (spectraGraph.height-transY));
        ctx.fillRect(spectraGraph.width-1-transX, 0, spectraGraph.width-2-transX, 1);//right point -- 1 less than the actual point, because it intersects with frame border
        console.log("right co-ordinates: " + (spectraGraph.width-transX), 0);*/

    };

    specGrad(); //creates color gradient

}

//creates background gradient
function specGrad() {

    spectraGradient = ctx.createLinearGradient(0, 0, spectraGraph.width, 0);
    spectraGradient.addColorStop(0, "gray");

    spectraGradient.addColorStop((log10(400) / (wlScale-wlOffset))+(wlOffset/wlScale), "gray");
    console.log((log10(400) / (wlScale-wlOffset))+(wlOffset/wlScale));
    spectraGradient.addColorStop((log10(401) / (wlScale-wlOffset))+(wlOffset/wlScale), "purple");
    console.log((log10(401) / (wlScale-wlOffset))+(wlOffset/wlScale));
    spectraGradient.addColorStop((log10(470) / (wlScale-wlOffset))+(wlOffset/wlScale), "blue");
    console.log((log10(470) / (wlScale-wlOffset))+(wlOffset/wlScale));
    spectraGradient.addColorStop((log10(490) / (wlScale-wlOffset))+(wlOffset/wlScale), "cyan");
    console.log((log10(490) / (wlScale-wlOffset))+(wlOffset/wlScale));
    spectraGradient.addColorStop((log10(510) / (wlScale-wlOffset))+(wlOffset/wlScale), "green");
    console.log((log10(510) / (wlScale-wlOffset))+(wlOffset/wlScale));
    spectraGradient.addColorStop((log10(570) / (wlScale-wlOffset))+(wlOffset/wlScale), "yellow");
    console.log((log10(570) / (wlScale-wlOffset))+(wlOffset/wlScale));
    spectraGradient.addColorStop((log10(590) / (wlScale-wlOffset))+(wlOffset/wlScale), "orange");
    console.log((log10(590) / (wlScale-wlOffset))+(wlOffset/wlScale));
    spectraGradient.addColorStop((log10(650) / (wlScale-wlOffset))+(wlOffset/wlScale), "red");
    console.log((log10(650) / (wlScale-wlOffset))+(wlOffset/wlScale));
    spectraGradient.addColorStop((log10(700) / (wlScale-wlOffset))+(wlOffset/wlScale), "gray");
    console.log((log10(700) / (wlScale-wlOffset))+(wlOffset/wlScale));

    spectraGradient.addColorStop(1, "gray");

    // document.getElementById('calRadSlider').max = wlScale;

}

//proprietary canvas update for user change in Temperature
function updateTempToCanvas(){

    var specRad, Temp = Math.pow(10, (document.getElementById("temperatureSlider").value));

    ctx = spectraGraph.getContext("2d");
    specGrad();
    
    if (ctx !== null) {

        //save and clear canvas state to avoid overdrawing
        ctx.save();
        ctx.clearRect( -transX, -transY, spectraGraph.width, spectraGraph.height);

        //begins path
        ctx.beginPath();
        ctx.lineTo(-transX, spectraGraph.height-transY);

        //for each column of pixels, converts from pixels to mathematic scale and plots result of 
        //calRad();
        for (var i = 0; i < spectraGraph.width + 1; i++) {

            specRad = calRad( Temp, Math.pow(10, scale(i, spectraGraph.width, wlScale)));

            ctx.lineTo(i-transX, -scale(log10(specRad), srScale, spectraGraph.height));

        };

        //closes path and converts to clipping mask
        ctx.lineTo(spectraGraph.width-transX, spectraGraph.height-transY);
        ctx.closePath();
        ctx.clip();

        //fills in clipping mask with gradient created in setScale()
        ctx.fillStyle = spectraGradient;
        ctx.fillRect(-transX, -transY, spectraGraph.width, spectraGraph.height);
        ctx.restore();

    }; // if statement ends

}

function updateTempToP() {

    document.getElementById("tempP").innerHTML = Math.pow(10, (document.getElementById("temperatureSlider").value)) + " K";

    document.getElementById("wavelengthP").innerHTML += " (max)";

}

function updateWveLngthMaxToCanvas() {
    
    ctx = spectraGraph.getContext("2d");
    var val = $("#calRadSlider").slider("option", "values");

    if(ctx != null) {

        ctx.save();
        ctx.beginPath();

        ctx.moveTo( 
            scale(val[0], 
            wlScale, 
            spectraGraph.width)-transX, spectraGraph.height-transY );

        ctx.lineTo( 
            scale(val[0], 
            wlScale, 
            spectraGraph.width)-transX, 

            -(scale(
                log10(calRad(
                    Math.pow(10, document.getElementById("temperatureSlider").value), 
                    Math.pow(10, val[0])
                )), 
                srScale, 
                spectraGraph.height)
            )-transY
        );

        ctx.lineWidth = 2;
        ctx.strokeStyle = '#ffffff';

        ctx.stroke();
        ctx.restore();

    };

}

function updateWveLngthToP() {

    document.getElementById("wavelengthP").innerHTML = Math.pow(10, document.getElementById("calRadSlider").value) + " nm";

}

