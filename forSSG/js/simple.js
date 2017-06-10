var ctx = $("#canvas").get()[0].getContext("2d");

var audio = null;
audio = document.createElement("audio");
audio.src = "audio/calypso.ogg";
audio.controls = true;
audio.crossOrigin = "anonymous";
//audio._htmlAudioElement.crossOrigin = "anonymous";

audio.addEventListener('ended', function () {

		audio.play();
	}, false);

function play() {

	audio.play();
}

var context = new AudioContext();
var node = context.createScriptProcessor(512, 1, 1);
//Анализатор
var analyser = context.createAnalyser();
analyser.smoothingTimeConstant = 0.7;
var FFT = analyser.fftSize = 32;

audio.addEventListener('canplay', function () {
	var source = context.createMediaElementSource(audio);
	source.connect(analyser);
	analyser.connect(node);
	node.connect(context.destination);
	source.connect(context.destination);
});

window.onload = function() {
	
	audio.play();

	//console.log(bands);
};

node.onaudioprocess = function () {
	var array =  new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(array);
	//console.log(array);


	ctx.clearRect(0, 0, 1920, 255);
	ctx.fillStyle = 'rgba(255,255,255,1)';
	drawSpectrum(array);
};




function drawSpectrum(array) {
	for ( var i = 2; i < (array.length); i=i+3 ){
		var value = array[i];
		var volume = parseInt((value+1)/FFT);

		for ( var j = 8; j > (8-volume); j-- ){
				//ctx.strokeStyle = 'rgba(255,255,255,1)';
				ctx.fillStyle = 'rgba(255,255,255,1)';
				roundRect(ctx, (i-2)/3*23+0,j*18,18,13, 2, true, false);

			}
			//  console.log([i,value])
		}
	}

	function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
		if (typeof stroke == "undefined" ) {
			stroke = true;
		}
		if (typeof radius === "undefined") {
			radius = 5;
		}
		ctx.beginPath();
		ctx.moveTo(x + radius, y);
		ctx.lineTo(x + width - radius, y);
		ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
		ctx.lineTo(x + width, y + height - radius);
		ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
		ctx.lineTo(x + radius, y + height);
		ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
		ctx.lineTo(x, y + radius);
		ctx.quadraticCurveTo(x, y, x + radius, y);
		ctx.closePath();
		if (stroke) {
			ctx.stroke();
		}
		if (fill) {
			ctx.fill();
		}
	}