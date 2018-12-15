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
var n = 1;

jQuery(document).ready(function() 
{

    // inner variables
    var song;
    
    var tracker = $('.tracker');
    var volume = $('.volume');

    function initAudio(element) 
    {
        var url = element.attr('audiourl');
        var title = element.text();
        //var cover = element.attr('cover');
        var artist = element.attr('artist');

        $('.player .title').text(title);
        $('.player .artist').text(artist);
        //$('.player .cover').css('background-image','url(data/' + cover+')');;

        song = new Audio('audio/' + url);

        // timeupdate event listener
        song.addEventListener('timeupdate',function ()
        {
            var curtime = parseInt(song.currentTime);
            tracker.slider('value', curtime);
        });

        $('.playlist li').removeClass('active');
        element.addClass('active');
    }
    function playAudio() 
    {
        song.play();
        tracker.slider("option", "max", song.duration);
        $('.play').addClass('hidden');
        $('.pause').addClass('visible');
        //$('.play').show(1000);
        //$('.pause').hide(1000);
    }
    function stopAudio() 
    {
        song.pause();
        $('.play').removeClass('hidden');
        $('.pause').removeClass('visible');
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

        var next = $('.playlist li.active').next();
        if (next.length == 0) 
        {
            next = $('.playlist li:first-child');
        }
        initAudio(next);
    });

    // rewind click
    $('.rew').click(function (e) 
    {
        e.preventDefault();

        stopAudio();

        var prev = $('.playlist li.active').prev();
        if (prev.length == 0) 
        {
            prev = $('.playlist li:last-child');
        }
        initAudio(prev);
    });

    // show playlist
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

    // playlist elements - click
    $('.playlist li').click(function () 
    {
        stopAudio();
        initAudio($(this));
    });

    // initialization - first element in playlist
    initAudio($('.playlist li:first-child'));

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
