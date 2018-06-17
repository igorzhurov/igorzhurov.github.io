var play_au = 1;

$(window).on('load', function() 
{
	$(".preloader").delay(1000).fadeOut('slow');
})

var pContainerHeight = $('.bird-box').height();

$(window).scroll(function()
{
	var wScroll = $(this).scrollTop();
	if (wScroll <= pContainerHeight) 
	{
		$('.logo').css({
			'transform' : 'translate(0px, '+ wScroll /2 +'%)'
		});
		$('.back-bird').css({
			'transform' : 'translate(0px, '+ wScroll /4 +'%)'
		});
		$('.fore-bird').css({
			'transform' : 'translate(0px, -'+ wScroll /10 +'%)'
		});
	}
// Landing Elements
/*
	if(wScroll > $('.tracks').offset().top - ($(window).height() / 1.2)) 
	{
		$('.tracks figure').each(function(i)
		{
			setTimeout(function()
			{
				$('.tracks figure').eq(i).addClass('is-showing');
			}, (700 * (Math.exp(i * 0.14))) - 700);
		});
	}
*/
// Promoscope
	if(wScroll > $('.large-window').offset().top - $(window).height()){
		$('.large-window').css({'background-position':'center '+ (wScroll - $('.large-window').offset().top) +'px'});
		var opacity = (wScroll - $('.large-window').offset().top + 400) / (wScroll / 5);
		$('.window-tint').css({'opacity': opacity});
	}
	if( wScroll > $(window).height() ) 
	{
		$(".menu").slideDown();
	}
	else 
	{
		$(".menu").slideUp();
	}
});

/*
$( function() { 
	var state = true; 
	//if(wScroll > 200) {
	$( "#button" ).on( "click", function(){ 
		if ( state ) {
			$( ".blur-menu" ).animate(
			{
				backgroundColor: "#aa0000", 
				color: "#fff", 
				width: 500
			}, 
			1000, 
			"linear",
			function() 
			{
				$( ".blur-menu" ).css(
				{
					"position" : "absolute"
				});
			});
		} 
		else 
		{
			$( "#my-header" ).animate(
			{
				//backgroundColor: "#fff", 
				//color: "#000", 
				width: 1200, 
				height: 300,
				top: 0, 
			}, 
			1000, 
			"linear",
			function() {
				$("#my-header" ).css(
				{
					"position" : "fixed",
					"z-index": "1000",
				});
			});
		}
		state = !state; 
	});
}); 
*/
var song = null;
var el = null;
$(document).ready(function() {
	var elem = document.getElementById('spec');
	$(".my-content").hide();
	$(".palka1,.palka2,.palka3,.palka4").hide();
	$(".blur-menu").hide();
	$(".bmenu-ober").hide();
	$(".bmenu").hide();
	//$(".resid").hide();
	$(".menu").hide();
	$("#my-footer").hide();
	$("footer").hide();
	$(".right").hide();
	$(".bgi1,.bgi2,.bgi3,.bgi4").hide();
	$(".enter-site").hide();
	$(".enter-site").click(function() {
		$("header").removeClass("site-header");
		$(".site-header").removeClass("spectrum-cont");
		elem.parentNode.removeChild(elem);
		$("header").addClass("main-site");
		$(".spectrum").hide();
		$(".enter-site").hide();
		$(".left-text-1, .left-text-2").hide();
		$(".palka1,.palka2,.palka3,.palka4").show();
		$("#triangle-bottomleft, .bottom-text").hide();
		$(".my-content").show();
		$(".blur-menu").show(100);
		$(".bmenu-ober").show(0);
		$(".bmenu").show(1000);
		$("#my-footer").show();
		$(".right").show();
		$("footer").show();
		$(".bgi1,.bgi2,.bgi3,.bgi4").show();
		audio.pause();
		$(".menu").slideUp();
		//$(".resid").show(5000);
	});
	//разворачивающийся список треков
	$('.full-track-but').click (function() {
		$('.full-tracks').animate({
			height: '150px'
		});
	});
	//Слайдер резидентов
	$('.resid').owlCarousel({
		items: 3,
		loop: true,
		margin: 0,
		autoplay: true,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		responsiveClass:true,
    responsive:{
        0:{
            items:1,
        },
        480:{
            items:1,
        },
        768:{
            items:2,
        },
        960:{
            items:3,
        }
    }
	});
	//Слайдер портфолио
	$('.track-box').owlCarousel({
		animateOut: 'fadeOut',
		items: 1,
		nav: true,
		dots: false
	});
	// Плавная перемотка
	$(function() {
		$('a[data-target^="anchor"]').bind('click.smoothscroll', function() {
			var target = $(this).attr('href'),
			bl_top = $(target).offset().top - 50;
			$('body, html').animate({scrollTop: bl_top}, 500);
			return false;
		});
	});
	//E-mail Ajax Send
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "localhost:3000/mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});
});

var ctx = $("#canvas").get()[0].getContext("2d");
var audio = null;
audio = document.createElement("audio");
audio.src = "audio/titov.mp3";
audio.controls = true;
audio.crossOrigin = "anonymous";
var context = new AudioContext();
var node = context.createScriptProcessor(512, 1, 1);
//Анализатор
var analyser = context.createAnalyser();
analyser.smoothingTimeConstant = 0.7;
var FFT = analyser.fftSize = 32;
var source = context.createMediaElementSource(audio);
//context.resume();
audio.addEventListener('canplay', function () 
{
	source.connect(analyser);
	analyser.connect(node);
	node.connect(context.destination);
	source.connect(context.destination);
});
//------------------------------------------
window.onload = function() 
{
};
//------------------------------------------
audio.addEventListener('ended', function () 
{
	audio.play();
}, false);
//------------------------------------------
node.onaudioprocess = function () 
{
	var array =  new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(array);
	ctx.clearRect(0, 0, 1920, 255);
	ctx.fillStyle = 'rgba(255,255,255,1)';
	drawSpectrum(array);
};
//------------------------------------------
function drawSpectrum(array) 
{
	for ( var i = 2; i < (array.length); i=i+3 )
	{
		var value = array[i];
		var volume = parseInt((value+1)/FFT);
		for ( var j = 8; j > (8-volume); j-- )
		{
			ctx.fillStyle = 'rgba(255,255,255,1)';
			roundRect(ctx, (i-2)/3*23+0,j*18,18,13, 3, true, false);
		}
	}
}
//------------------------------------------
function roundRect(ctx, x, y, width, height, radius, fill, stroke) 
{
	if (typeof stroke == "undefined" ) 
	{
		stroke = true;
	}
	if (typeof radius === "undefined") 
	{
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
	if (stroke) 
	{
		ctx.stroke();
	}
	if (fill) 
	{
		ctx.fill();
	}
}
function initAudio(el) {
	song = el.find(".au")[0];
}
function playAudio() {
	song.play();
	return 1;
}
function stopAudio() {
	song.pause();
}
// play click
$('.triangle-play').click(function (e) {
	e.preventDefault();
	if (play_au === 1)
	{
		playAudio();
		play_au = 0;
	}
	else
	{
		stopAudio();
		play_au = 1;
	}
});
// playlist elements - click
$('.track-item').click(function () {
//stopAudio();
	initAudio($(this));
	if (play_au === 1)
	{
		playAudio();
		play_au = 0;
	}
	else
	{
		stopAudio();
		play_au = 1;
	}
});
$(".triangle").click (function() {
	audio.play();
	context.resume();
	$(".overlay").fadeOut(1000);
	$(".triangle").fadeOut(1000);
	$(".enter-site").show();
});