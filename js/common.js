var play_au = 1;
var n = 1;
//Скроллбар
$(window).load(function()
{
});

$(window).on('load', function() 
{
	$(".preloader").delay(1000).fadeOut('slow');
})

var pContainerHeight = $('.bird-box').height();

$(window).scroll(function()
{
	var wScroll = $(this).scrollTop();

/*
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
*/
// Landing Elements

	if(wScroll > $('.track-box').offset().top - ($(window).height() / 2)) 
	{
		$('.tracks-grid .track-item').each(function(i) {
			setTimeout(function() {
				$('.tracks-grid .track-item').eq(i).addClass('is-showing');
			}, 200*i/*(700 * (Math.exp(i * 0.14))) - 700*/);
		});
	}

// Promoscope
	if(wScroll > $('.large-window').offset().top - $(window).height()){
		$('.large-window').css({'background-position':'center '+ (wScroll - $('.large-window').offset().top) +'px'});
		var opacity = (wScroll - $('.large-window').offset().top + 700) / (wScroll / 6);
		console.log(opacity);
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
var mysong = null;
var el = null;

$(document).ready(function() {

	var elem = document.getElementById('spec');
	$(".my-content,.blur-menu,.bmenu-ober,.bmenu,.menu,.right,.bgi1,.bgi2,.bgi3,.bgi4,.enter-site,.overlay-main,#my-footer,footer").hide();
	$(".enter-site").click(function() {
		elem.parentNode.removeChild(elem);
		$(".spectrum,.enter-site,.left-text-1,.left-text-2,#triangle-bottomleft,.bottom-text").hide();
		$(".my-content,.bmenu-ober,.right,.bgi1,.bgi2,.bgi3,.bgi4,.overlay-main,footer,#my-footer").show();		
		$(".blur-menu").show(100);
		$(".bmenu").show(1000);
		$("header").removeClass("site-header");
		$(".site-header").removeClass("spectrum-cont");
		$("header").addClass("main-site");
		//$(".line1,.line2,.line3,.line4").show();
		$(".menu").slideUp();
		audio.pause();
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
		margin: 10,
		autoplay: true,
		autoplayTimeout: 2000,
		autoplayHoverPause: true,
		dots: false,
		//responsiveClass:true,
		center: true,
		responsive:
		{
			0: 	{items:1,},
			480:{items:1,},
			640:{items:1,},			
			768:{items:1,},
			960:{items:3,}
		}
	});
	//Слайдер портфолио
	$('.track-box').owlCarousel({
		animateOut: 'fadeOut',
		items: 1,
		nav: true,
		navElement: 'div',
		navContainerClass: 'owl-nav',
		navText: ["<i class='fa fa-chevron-left'></i>" , "<i class='fa fa-chevron-right'></i>"],
		dots: false
	});
	// Плавная перемотка
	$(function() {
		$('a[data-target^="anchor"]').bind('click.smoothscroll', function() {
			var target = $(this).attr('href'),
			bl_top = $(target).offset().top - $(".menu").height();
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


/**
 *
 * HTML5 Audio player with playlist
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2012, Script Tutorials
 * http://www.script-tutorials.com/
 */

    // inner variables
    var song;
    
    var tracker = $('.tracker');
    var volume = $('.volume');


    function initAudio(element) 
    {
        var url = element.attr('audiourl');
        var title = element.attr('title');
        var cover = element.attr('cover');
        var artist = element.attr('artist');

        $('.player .title').text(title);
        $('.player .artist').text(artist);
        $('.player .cover').css('background-image','url(img/' + cover+')');;

				

        song = new Audio('audio/' + url);

        // timeupdate event listener
        song.addEventListener('timeupdate',function ()
        {
            var curtime = parseInt(song.currentTime);
            tracker.slider('value', curtime);
        });

        $('.playlist div div').removeClass('active');
        element.addClass('active');
    }
    function playAudio() 
    {
        song.play();
        tracker.slider("option", "max", song.duration);
        $('.ctrl .play').addClass('hidden');
        $('.ctrl .pause').addClass('visible');
        //$('.play').show(1000);
        //$('.pause').hide(1000);
    }
    function stopAudio() 
    {
        song.pause();
        $('.ctrl .play').removeClass('hidden');
        $('.ctrl .pause').removeClass('visible');
        //$('.play').hide(1000);
        //$('.pause').show(1000);
    }

    // play click
    $('.play').click(function (e) 
    {
        e.preventDefault();
        playAudio();
    });

    // pause click
    $('.pause').click(function (e) 
    {
        e.preventDefault();
        stopAudio();
    });

    // forward click
    $('.fwd').click(function (e) 
    {
        e.preventDefault();

        stopAudio();

        var next = $('.playlist div div.active').next();
        if (next.length == 0) 
        {
            next = $('.playlist div div:first-child');
        }
        initAudio(next);
    });

    // rewind click
    $('.rew').click(function (e) 
    {
        e.preventDefault();

        stopAudio();

        var prev = $('.playlist div div.active').prev();
        if (prev.length == 0) 
        {
            prev = $('.playlist div div:last-child');
        }
        initAudio(prev);
    });

    // show playlist
    /*
    $('.pl').click(function (e) 
    {
        e.preventDefault();
        
        if (n===1)
        {
            $('.playlist').fadeIn(300);
            n = 0;
        }
        else
        {
            $('.playlist').fadeOut(300);
            n = 1;
        };
        console.log(n);
    });
*/
    // playlist elements - click
    $('.playlist div div').click(function () 
    {
        stopAudio();
        initAudio($(this));
    });

    // initialization - first element in playlist
    initAudio($('.playlist div div:first-child'));

    // set volume
    song.volume = 0.2;

    // initialize the volume slider
    volume.slider
    ({
        range: 'min',
        min: 1,
        max: 100,
        value: 50,
        start: function(event, ui) {},
        slide: function(event, ui) 
        {
            song.volume = ui.value / 100;
        },
        stop: function(event, ui) {},
    });

    // empty tracker slider
    tracker.slider
    ({
        range: 'min',
        min: 0, 
        max: 50,
        start: function(event, ui) {},
        slide: function(event, ui) 
        {
            song.currentTime = ui.value;
        },
        stop: function(event, ui) {}
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
audio.addEventListener('canplay', function () {
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
	//console.log(array.length);
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
		var volume_song = parseInt((value+1)/FFT);
		for ( var j = 8; j > (8-volume_song); j-- )
		{
			ctx.fillStyle = 'rgba(255,255,255,1)';

			if (window.matchMedia("(max-width: 992px)").matches) {
  		//	roundRect(ctx, (i-2)/3*13+0,j*11,11, 8, 1, true, false);
  			ctx.clearRect(0, 0, 1920, 255);
			} else {
  			//roundRect(ctx, (i-2)/3*23+0,j*18,18, 13, 3, true, false);
  			roundRect(ctx, (i-2)/3*26,j*20-20,22, 16, 4, true, false);
			}

			//roundRect(ctx, (i-2)/3*23+0,j*18,18,13, 3, true, false);
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
	mysong = el.find(".au")[0];
}
function playAudio() {
	mysong.play();
	return 1;
}
function stopAudio() {
	mysong.pause();
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

	//Изменения вида скроллбара раздела купить песню
	$(".playlist").mCustomScrollbar({
		theme:"dark"
	});
});