if (! window.AudioContext) {
	if (! window.webkitAudioContext) {
		alert('no audiocontext found');
	}
	window.AudioContext = window.webkitAudioContext;
}
var context = new AudioContext();
var sourceNode;
var analyser;
var javascriptNode;
var arrayBuffer;
var audioBuffers;
	// get the context from the canvas to draw on
	var ctx = $("#canvas").get()[0].getContext("2d");

	// create a gradient for the fill. Note the strange
	// offset, since the gradient is calculated based on
	// the canvas, not the specific element we draw
	
	var gradient = ctx.createLinearGradient(0,0,0,200);
	gradient.addColorStop(1,'#000000');
	gradient.addColorStop(0.75,'#444444');
	gradient.addColorStop(0.25,'#888888');
	gradient.addColorStop(0,'#FFFFFF');
	
	// load the sound
	setupAudioNodes();

	function setupAudioNodes() {

		// setup a javascript node
		javascriptNode = context.createScriptProcessor(512, 1, 1);
		// connect to destination, else it isn't called
		javascriptNode.connect(context.destination);
		// setup a analyzer
		analyser = context.createAnalyser();
		analyser.smoothingTimeConstant = .75;
		analyser.fftSize = 32;
		// create a buffer source node
		sourceNode = context.createBufferSource();
		sourceNode.connect(analyser);
		analyser.connect(javascriptNode);
		sourceNode.connect(context.destination);
	}

	window.onload = function(){
		var filelnput = document.getElementById('loader'); 
		filelnput.addEventListener('change', function(e) { 
			var reader = new FileReader(); 
			reader.onload = function(e) { 
				initSound(this.result);
			};
			reader.readAsArrayBuffer(this.files[0]);
		}, false);
	}

	function initSound(arrayBuffer) {
		context.decodeAudioData(arrayBuffer, 
			function(buffer) { audioBuffers = buffer; alert("ready");}, 
			function(e) { alert('Error decoding file', e); 
		} );
	}

	function playSound() {
		sourceNode.buffer = audioBuffers; 
		sourceNode.start(0); 
	}

	javascriptNode.onaudioprocess = function() {

		// get the average for the first channel
		var array =  new Uint8Array(analyser.frequencyBinCount);
		analyser.getByteFrequencyData(array);

		// clear the current state
		ctx.clearRect(0, 0, 1000, 255);
		ctx.fillStyle=gradient;
		drawSpectrum(array);
	}

	function drawSpectrum(array) {
		for ( var i = 2; i < (array.length); i=i+3 ){
			var value = array[i];
			var volume = parseInt((value+1)/32);

			for ( var j = 8; j > (8-volume); j-- ){
				ctx.strokeStyle = 'rgba(255,255,255,1)';
				ctx.fillStyle = 'rgba(255,255,255,1)';
				roundRect(ctx, (i-2)/3*30+0,j*20,25,15, 3, true);

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