/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
//var baseUrl:string = $('head').attr('data-url');
var ajaxFile = baseUrl + 'ajax/ajaxRequisitions.php';
var thisPage = $('main').attr('data-page');
if (thisPage == 'watch') {
    var play = true;
}
else {
    var config = $("#managerOptions").attr('data-autoplay');
    if (config == 'true') {
        var play = true;
    }
    else {
        var play = false;
    }
}
$(document).ready(function () {
    checkFormats(true);
});
function playerConfig(dataSource, ready) {
    var config = {
        autoplay: play,
        source: {
            dash: dataSource,
        },
    };
    //console.log(config);
    showPlayer(config, ready);
}
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
function playPause() {
    if (video.paused || video.ended) {
        video.play();
        $(buttonPlay).removeClass("playBtn").addClass("playBtn2");
        $(videoLoad).removeClass("videoPaused").removeClass("loading").addClass("loadingNone");
        $("#controlsDiv").removeClass("controlsDivShow").addClass('controlsDivHide');
    }
    else {
        video.pause();
        $(buttonPlay).removeClass("playBtn2").addClass("playBtn");
        $(videoLoad).removeClass("loading").removeClass("loadingNone").addClass("videoPaused");
        $("#controlsDiv").removeClass("controlsDivHide").addClass('controlsDivShow');
    }
}
function videoSeek(e) {
    var posX = ((e.pageX - $(this).offset().left) * 100) / $(this).innerWidth();
    seekTo = posX.toString().slice(0, 5);
    video.currentTime = video.duration * (posX.toString() / 100);
    slider.style.width = seekTo + '%';
}
function videoSeekHover(e) {
    var posX = ((e.pageX - $(this).offset().left) * 100) / $(this).innerWidth();
    timePreview.style.display = 'flex';
    timePreview.style.left = 'calc(' + posX + '% - ' + (timePreview.offsetWidth / 2) + 'px)';
    seekToHover = video.duration * (posX.toString() / 100);
    timePreview.innerHTML = convertTime(seekToHover);
    this.addEventListener('mouseout', function () {
        timePreview.removeAttribute('style');
    });
}
function videoSeekDrag(e) {
    setTime.removeEventListener("click", videoSeek);
    if (!video.paused) {
        playPause();
    }
    var posX = ((e.pageX - $(this).offset().left) * 100) / $(this).innerWidth();
    seekTo = posX.toString().slice(0, 5);
    video.currentTime = video.duration * (seekTo / 100);
    timePreview.style.left = 'calc(' + posX + '% - ' + (timePreview.offsetWidth / 2) + 'px)';
    timePreview.innerHTML = convertTime(video.duration * (posX.toString() / 100));
    slider.style.width = seekTo + '%';
    setTime.addEventListener("click", videoSeek);
    setTime.addEventListener("dragend", playPause);
}
function videoBuffer() {
    if (dash != false) {
        var bufferedEnd = video.buffered.end(video.buffered.length - 1);
        var duration = video.duration;
        if (duration > 0) {
            bufferDiv.style.width = ((bufferedEnd / duration) * 100) + '%';
        }
    }
    else {
        bufferDiv.style.width = '100%';
    }
}
function seekTimeUpdade() {
    var timePercent = video.currentTime * (100 / video.duration);
    var loadTime = convertTime(video.currentTime);
    var videoTime = convertTime(video.duration);
    slider.style.width = timePercent + '%';
    currentTime.innerHTML = loadTime;
    totalTime.innerHTML = videoTime;
}
function muteVideo() {
    if (video.muted) {
        video.muted = false;
        volumeSlider.value = 50;
        $(mute).removeClass("soundMuted").addClass("sound2");
    }
    else {
        video.muted = true;
        volumeSlider.value = 0;
        $(mute).removeClass("sound2").removeClass("sound").addClass("soundMuted");
    }
}
function videoVolume(e) {
    var posY = ((e.pageY - $(this).offset().top) * 100) / $(this).innerHeight();
    seekToTop = posY.toString().slice(0, 5);
    seekTo = 100 - seekToTop;
    volumeSeek();
}
function videoVolumeDrag(e) {
    setVolume.removeEventListener('click', videoVolume);
    var posY = ((e.pageY - $(this).offset().top) * 100) / $(this).innerHeight();
    seekToTop = posY.toString().slice(0, 5);
    seekTo = 100 - seekToTop;
    volumeSeek();
    setVolume.addEventListener('click', videoVolume);
}
function volumeSeek() {
    video.volume = seekTo / 100;
    volumeSlider.style.height = seekTo + '%';
    //Define the icon of sound level
    if (video.volume > 0) {
        video.muted = false;
        if (video.volume < 0.5) {
            $(mute).removeClass("soundMuted").removeClass("sound2").addClass("sound");
        }
        else if (video.volume <= 1) {
            $(mute).removeClass("soundMuted").removeClass("sound").addClass("sound2");
        }
    }
    else if (video.volume == 0) {
        video.muted = true;
        $(mute).removeClass("sound2").removeClass("sound").addClass("soundMuted");
    }
}
function toggleFullScreen() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (playerBox.requestFullScreen) {
            playerBox.requestFullScreen();
        }
        else if (playerBox.mozRequestFullScreen) {
            playerBox.mozRequestFullScreen();
        }
        else if (playerBox.webkitRequestFullScreen) {
            playerBox.webkitRequestFullScreen();
        }
        $('#playerBox').removeClass('playerBoxShow').addClass('playerBoxShowFull');
    }
    else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
        $('#playerBox').removeClass('playerBoxShowFull').addClass('playerBoxShow');
    }
}
function exitFullScreen() {
    var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
    var event = state ? 'FullscreenOn' : 'FullscreenOff';
    if (event == 'FullscreenOff') {
        $('#playerBox').removeClass('playerBoxShowFull').addClass('playerBoxShow');
    }
}
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
function checkFormats(videoTag) {
    contentType = document.getElementById("watchInterface").getAttribute("data-type");
    dataId = document.getElementById("watchInterface").getAttribute("data-id");
    dataDash = document.getElementById("watchInterface").getAttribute("data-dash");
    dataHls = document.getElementById("watchInterface").getAttribute("data-hls");
    if (contentType == 'movie') {
        var mediaFolder = baseUrl + 'media/movies/';
        videoPath = mediaFolder + dataId;
    }
    else if (contentType == 'serie') {
        var mediaFolder = baseUrl + 'media/series/';
        var contentSeason = document.getElementById("watchInterface").getAttribute("data-season");
        var contentEpisode = document.getElementById("watchInterface").getAttribute("data-episode");
        dataParent = mediaFolder + dataId;
        videoPath = dataParent + '/season' + contentSeason + '/episode' + contentEpisode;
    }
    dashFileExists = false;
    hlsFileExists = false;
    var videoName = 'output_dash';
    var dashExtension = 'mpd';
    var hlsExtension = 'm3u8';
    if (videoTag == true) {
        mediaHolder.innerHTML = "<video id='videoTag'></video>";
        video = document.getElementById('videoTag');
    }
    if (dataDash == 'yes') {
        window.MediaSource = window.MediaSource || window.WebKitMediaSource;
        if (window.MediaSource) {
            var dataSource = videoPath + '/' + videoName + '.' + dashExtension;
            var dashFileExists = true;
            var videoReadyToUse = true;
            playerConfig(dataSource, videoReadyToUse);
        }
        else {
            alert('The MediaSource API is not available on this platform e/ou browser.');
        }
    }
    else if (dataHls == 'yes') {
        var dataSource = videoPath + '/' + videoName + '.' + hlsExtension;
        var hlsFileExists = true;
        var videoReadyToUse = true;
        playerConfig(dataSource, videoReadyToUse);
    }
    else {
        alert("Error to import the video file...");
        var videoReadyToUse = false;
    }
}
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
function hideControls() {
    $(playerBox).ready(function () {
        $(this).on("mouseover, mousemove", "#videoTag, #controlsDiv, #mediaLoading", function () {
            $("#controlsDiv").removeClass("controlsDivHide").addClass('controlsDivShow');
            $('#videoTag').css('cursor', 'auto');
        });
        $(this).on("mouseout", "#videoTag, #controlsDiv, #mediaLoading", function () {
            if (!video.paused) {
                $("#controlsDiv").removeClass("controlsDivShow").addClass('controlsDivHide');
            }
        });
        $(this).on("mousemove, mouseout", "#videoTag", function () {
            if (!video.paused) {
                clearTimeout(autoHideControls);
            }
        });
    });
    $("#videoTag").on("mousestop", function () {
        if (!video.paused) {
            setTimeout(autoHideControls, 4000);
            $('#videoTag').css('cursor', 'auto');
        }
    });
}
function autoHideControls() {
    if (!video.paused) {
        $("#controlsDiv").removeClass("controlsDivShow").addClass('controlsDivHide');
        $('#videoTag').css('cursor', 'none');
    }
}
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
function episodeSelectPlayer() {
    $("#seasonSelect").ready(function () {
        $(this).on("click", "#openSelector #openSpan", function () {
            $(".seasonGroupShow").removeClass("seasonGroupShow").addClass("seasonGroupHide");
            $("#seasonSelect").removeClass("seasonSelectHide").addClass("seasonSelectShow");
            /*var parentHeight = 0;
            $(this).parent().parent().parent().parent()
            .find('#seasonSelect .season').each(function() {
                parentHeight += $(this).outerHeight();
            });
            $(this).parent().parent().parent().parent().css({
                'height': parentHeight + 'px'
            });*/
        });
        $(this).on("click", ".seasonSelectShow .season", function () {
            $(".seasonSelectShow").removeClass("seasonSelectShow").addClass("seasonSelectHide");
            $(".seasonNameShow").removeClass("seasonNameShow").addClass("seasonNameHide");
            indiceShow = $(this).index();
            indiceShow++;
            $("#episodeSelect #seasonGroup" + indiceShow).removeClass("seasonGroupHide").addClass("seasonGroupShow");
            $("#episodeSelect #seasonName" + indiceShow).removeClass("seasonNameHide").addClass("seasonNameShow");
            $(".episodeOpen").removeClass("episodeOpen").addClass("episodeClose");
            $(".episodeClose:nth-of-type(1)").removeClass("episodeClose").addClass("episodeOpen");
            //$('#episodesDiv').removeAttr('style');
        });
    });
    $("#episodeList").on("click", ".seasonGroupShow .episodeClose", function () {
        $(".seasonGroupShow .episodeOpen").removeClass("episodeOpen").addClass("episodeClose");
        $(this).removeClass("episodeClose").addClass("episodeOpen");
    });
    /*$('#episodesDiv').on('mouseout', function() {
        $(this).removeAttr('style');
    });*/
}
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
function addEvents() {
    buttonPlay.addEventListener("click", playPause);
    video.addEventListener("click", playPause);
    videoLoad.addEventListener("click", playPause);
    video.addEventListener("timeupdate", seekTimeUpdade);
    setTime.addEventListener("click", videoSeek);
    setTime.addEventListener("mousemove", videoSeekHover);
    setTime.addEventListener("dragover", videoSeekDrag);
    video.addEventListener('progress', videoBuffer);
    mute.addEventListener("click", muteVideo);
    setVolume.addEventListener("click", videoVolume);
    setVolume.addEventListener("dragover", videoVolumeDrag);
    fullScreen.addEventListener("click", toggleFullScreen);
    video.addEventListener("dblclick", toggleFullScreen);
    document.addEventListener('webkitfullscreenchange', exitFullScreen, false);
    document.addEventListener('mozfullscreenchange', exitFullScreen, false);
    document.addEventListener('fullscreenchange', exitFullScreen, false);
    document.addEventListener('MSFullscreenChange', exitFullScreen, false);
    video.play();
    hideControls();
    hotKeys();
    episodeSelectPlayer();
    $(buttonPlay).removeClass("playBtn").addClass('playBtn2');
    $(videoLoad).removeClass("loading").addClass('loadingNone');
    //bufferPercent = ((video.buffered.end(0) / video.duration) * 100);
}
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
function hotKeys() {
    $(document).on('keyup', function (e) {
        e.preventDefault();
        var keyPress = e.which || e.keyCode;
        //Space == Play and Pause
        if (keyPress == 32) {
            playPause();
        }
        //M == Mute and Unmute
        if (keyPress == 77) {
            muteVideo();
        }
        //F  == Toggle FullScreen
        if (keyPress == 70) {
            toggleFullScreen();
        }
    });
}
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
//firt function after chooseFormat
/// <reference path="../../../node_modules/dashjs/index.d.ts"/>
/// <reference path="../../../node_modules/@types/webtorrent/index.d.ts"/>
function showPlayer(configObject, ready) {
    if (ready == true) {
        config = configObject;
        dash = config.source.dash || false;
        hls = config.source.hls || false;
        progressive = config.source.progressive || false;
        autoplay = config.autoplay;
        playerBox = document.getElementById('playerBox');
        mediaHolder = document.getElementById('mediaHolder');
        buttonPlay = document.getElementById('playBtn');
        videoLoad = document.getElementById('mediaLoading');
        controlsDiv = document.getElementById('controlsDiv');
        slider = document.getElementById('progressCurrent');
        bufferDiv = document.getElementById('progressBuffer');
        setTime = document.getElementById('progressContainer');
        timePreview = document.getElementById('timePreview');
        currentTime = document.getElementById('currentVideoTime');
        totalTime = document.getElementById('totalVideoTime');
        mute = document.getElementById('muteButton');
        volumeSlider = document.getElementById('volumeCurrent');
        setVolume = document.getElementById('volumeSliderDiv');
        episodesButton = document.getElementById('episodesButton');
        fullScreen = document.getElementById('fullScreenButton');
        videoStats = document.getElementById('videoStats');
        if (autoplay == true) {
            $(buttonPlay).removeClass("playBtn").addClass('playBtn2');
            $(videoLoad).removeClass("videoPaused").addClass('loading');
            setTimeout(function () {
                $(controlsDiv).removeClass("controlsDivShow").addClass('controlsDivHide');
            }, 3000);
            startVideo();
        }
        else {
            buttonPlay.addEventListener("click", startVideo);
            video.addEventListener("click", startVideo);
            videoLoad.addEventListener("click", startVideo);
        }
        $("body").on("contextmenu", function () {
            //return false;
        });
        //$('body').css('overflow' , 'hidden');
    }
    else {
        destroyVideo();
        alert('There is a error to play the video specified...');
        //console.log('There is no video to use...');
    }
}
function startVideo() {
    buttonPlay.removeEventListener("click", startVideo);
    video.removeEventListener("click", startVideo);
    videoLoad.removeEventListener("click", startVideo);
    if (dash != false) {
        //loadVideoDash();
        loadVideoTorrent();
    }
    else if (hls != false) {
        loadVideoHls();
    }
    else {
        destroyVideo();
        alert('No DASH, HLS or direct video to play');
    }
}
function loadVideoTorrent() {
    //var WebTorrent = require('webtorrent');
    var client = new WebTorrent();
    //var torrentId = videoPath + '/video_720p.torrent'
    var torrentId = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent';
    client.add(torrentId, function (torrent) {
        var file = torrent.files.find(function (file) {
            return file.name.endsWith('.mp4');
        });
        file.renderTo('video#videoTag');
        //console.log(file.getBlobURL());
    });
    addEvents();
}
function loadVideoDash() {
    var player = dashjs.MediaPlayer();
    var dashPlayer = player.create();
    dashPlayer.getDebug().setLogToBrowserConsole(false);
    dashPlayer.initialize(video, dash, autoplay);
    addEvents();
    //createQualities();
}
function loadVideoHls() {
    console.log("Using HLS");
}
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
function convertTime(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
}
function destroyVideo() {
    $(playerBox).find(video).remove();
    $(playerBox).find(videoLoad).remove();
    $(playerBox).find(controlsDiv).remove();
    $(mediaHolder).append('<img src="' + baseUrl + 'images/error404.png"/>');
}
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
function createQualities() {
    var qualities = video;
    console.log(qualities);
}
function changeQuality() {
}
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
function showStats(info) {
    console.log();
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsYXllclNjcmlwdC50cyIsInBhcnRzL2J1dHRvbnMudHMiLCJwYXJ0cy9jb25maWcudHMiLCJwYXJ0cy9jb250cm9scy50cyIsInBhcnRzL2VwaXNvZGVzLnRzIiwicGFydHMvZXZlbnRzLnRzIiwicGFydHMvaG90a2V5cy50cyIsInBhcnRzL2xvYWQudHMiLCJwYXJ0cy9vdGhlcnMudHMiLCJwYXJ0cy9xdWFsaXR5LnRzIiwicGFydHMvc3RhdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0VBS0U7QUFDRixrREFBa0Q7QUFDbEQsSUFBSSxRQUFRLEdBQUcsT0FBTyxHQUFHLDJCQUEyQixDQUFDO0FBQ3JELElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7QUFFM0MsRUFBRSxDQUFBLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDeEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLENBQUM7QUFDRCxJQUFJLENBQUMsQ0FBQztJQUNMLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN4RCxFQUFFLENBQUEsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNyQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7SUFDakIsQ0FBQztJQUNELElBQUksQ0FBQyxDQUFDO1FBQ0wsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDO0lBQ2xCLENBQUM7QUFDRixDQUFDO0FBRUQsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNqQixZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyxDQUFDLENBQUM7QUFFSCxzQkFBc0IsVUFBaUIsRUFBRSxLQUFhO0lBQ25ELElBQUksTUFBTSxHQUFHO1FBQ1osUUFBUSxFQUFFLElBQUk7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QUM7QUNwQkQ7Ozs7O0VBS0U7QUFFRjtJQUNJLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztJQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzNCLENBQUM7QUFFRDtBQUVBLENBQUM7QUNkRDs7Ozs7RUFLRTtBQUVGLG1CQUFtQixJQUFXO0lBQzFCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNsQixDQUFDIiwiZmlsZSI6InBsYXllclNjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIFxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuLy92YXIgYmFzZVVybDpzdHJpbmcgPSAkKCdoZWFkJykuYXR0cignZGF0YS11cmwnKTtcbnZhciBhamF4RmlsZSA9IGJhc2VVcmwgKyAnYWpheC9hamF4UmVxdWlzaXRpb25zLnBocCc7XG52YXIgdGhpc1BhZ2UgPSAkKCdtYWluJykuYXR0cignZGF0YS1wYWdlJyk7XG5cbmlmKHRoaXNQYWdlID09ICd3YXRjaCcpIHtcblx0dmFyIHBsYXkgPSB0cnVlO1xufVxuZWxzZSB7XG5cdHZhciBjb25maWcgPSAkKFwiI21hbmFnZXJPcHRpb25zXCIpLmF0dHIoJ2RhdGEtYXV0b3BsYXknKTtcblx0aWYoY29uZmlnID09ICd0cnVlJykge1xuXHRcdHZhciBwbGF5ID0gdHJ1ZTtcblx0fVxuXHRlbHNlIHtcblx0XHR2YXIgcGxheSA9IGZhbHNlO1xuXHR9XG59XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuXHRjaGVja0Zvcm1hdHModHJ1ZSk7XG59KTtcblxuZnVuY3Rpb24gcGxheWVyQ29uZmlnKGRhdGFTb3VyY2U6c3RyaW5nLCByZWFkeTpib29sZWFuKSB7XG4gICB2YXIgY29uZmlnID0ge1xuXHQgICBhdXRvcGxheTogcGxheSxcblx0ICAgc291cmNlOiB7XG5cdFx0ICAgZGFzaDogZGF0YVNvdXJjZSxcblx0XHQgICAvL2hsczogXCJobHMubTN1OFwiXG5cdCAgIH0sXG4gICB9O1xuXG4gICAvL2NvbnNvbGUubG9nKGNvbmZpZyk7XG4gICBzaG93UGxheWVyKGNvbmZpZywgcmVhZHkpO1xufSIsIi8qIFxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG5mdW5jdGlvbiBwbGF5UGF1c2UoKSB7XG5cdGlmKHZpZGVvLnBhdXNlZCB8fCB2aWRlby5lbmRlZCkge1xuXHRcdHZpZGVvLnBsYXkoKTtcblx0XHQkKGJ1dHRvblBsYXkpLnJlbW92ZUNsYXNzKFwicGxheUJ0blwiKS5hZGRDbGFzcyhcInBsYXlCdG4yXCIpO1xuXHRcdCQodmlkZW9Mb2FkKS5yZW1vdmVDbGFzcyhcInZpZGVvUGF1c2VkXCIpLnJlbW92ZUNsYXNzKFwibG9hZGluZ1wiKS5hZGRDbGFzcyhcImxvYWRpbmdOb25lXCIpO1xuXHRcdCQoXCIjY29udHJvbHNEaXZcIikucmVtb3ZlQ2xhc3MoXCJjb250cm9sc0RpdlNob3dcIikuYWRkQ2xhc3MoJ2NvbnRyb2xzRGl2SGlkZScpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdHZpZGVvLnBhdXNlKCk7XG5cdFx0JChidXR0b25QbGF5KS5yZW1vdmVDbGFzcyhcInBsYXlCdG4yXCIpLmFkZENsYXNzKFwicGxheUJ0blwiKTtcblx0XHQkKHZpZGVvTG9hZCkucmVtb3ZlQ2xhc3MoXCJsb2FkaW5nXCIpLnJlbW92ZUNsYXNzKFwibG9hZGluZ05vbmVcIikuYWRkQ2xhc3MoXCJ2aWRlb1BhdXNlZFwiKTtcblx0XHQkKFwiI2NvbnRyb2xzRGl2XCIpLnJlbW92ZUNsYXNzKFwiY29udHJvbHNEaXZIaWRlXCIpLmFkZENsYXNzKCdjb250cm9sc0RpdlNob3cnKTtcblx0fVxufVxuXG5mdW5jdGlvbiB2aWRlb1NlZWsoZSkge1xuXHR2YXIgcG9zWCA9ICgoZS5wYWdlWCAtICQodGhpcykub2Zmc2V0KCkubGVmdCkgKiAxMDApIC8gJCh0aGlzKS5pbm5lcldpZHRoKCk7XG5cdHNlZWtUbyA9IHBvc1gudG9TdHJpbmcoKS5zbGljZSgwLCA1KTtcblx0dmlkZW8uY3VycmVudFRpbWUgPSB2aWRlby5kdXJhdGlvbiAqIChwb3NYLnRvU3RyaW5nKCkgLyAxMDApO1xuXHRzbGlkZXIuc3R5bGUud2lkdGggPSBzZWVrVG8gKyAnJSc7XG59XG5cbmZ1bmN0aW9uIHZpZGVvU2Vla0hvdmVyKGUpIHtcblx0dmFyIHBvc1ggPSAoKGUucGFnZVggLSAkKHRoaXMpLm9mZnNldCgpLmxlZnQpICogMTAwKSAvICQodGhpcykuaW5uZXJXaWR0aCgpO1xuXHR0aW1lUHJldmlldy5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuXHR0aW1lUHJldmlldy5zdHlsZS5sZWZ0ID0gJ2NhbGMoJyArIHBvc1ggKyAnJSAtICcgKyAodGltZVByZXZpZXcub2Zmc2V0V2lkdGggLyAyKSArICdweCknO1xuXG5cdHNlZWtUb0hvdmVyID0gdmlkZW8uZHVyYXRpb24gKiAocG9zWC50b1N0cmluZygpIC8gMTAwKTtcblx0dGltZVByZXZpZXcuaW5uZXJIVE1MID0gY29udmVydFRpbWUoc2Vla1RvSG92ZXIpO1xuXG5cdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBmdW5jdGlvbigpIHtcblx0XHR0aW1lUHJldmlldy5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiB2aWRlb1NlZWtEcmFnKGUpIHtcblx0c2V0VGltZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdmlkZW9TZWVrKTtcblxuXHRpZighdmlkZW8ucGF1c2VkKSB7XG5cdFx0cGxheVBhdXNlKCk7XG5cdH1cblx0dmFyIHBvc1ggPSAoKGUucGFnZVggLSAkKHRoaXMpLm9mZnNldCgpLmxlZnQpICogMTAwKSAvICQodGhpcykuaW5uZXJXaWR0aCgpO1xuXHRzZWVrVG8gPSBwb3NYLnRvU3RyaW5nKCkuc2xpY2UoMCwgNSk7XG5cdHZpZGVvLmN1cnJlbnRUaW1lID0gdmlkZW8uZHVyYXRpb24gKiAoc2Vla1RvIC8gMTAwKTtcblxuXHR0aW1lUHJldmlldy5zdHlsZS5sZWZ0ID0gJ2NhbGMoJyArIHBvc1ggKyAnJSAtICcgKyAodGltZVByZXZpZXcub2Zmc2V0V2lkdGggLyAyKSArICdweCknO1xuXHR0aW1lUHJldmlldy5pbm5lckhUTUwgPSBjb252ZXJ0VGltZSh2aWRlby5kdXJhdGlvbiAqIChwb3NYLnRvU3RyaW5nKCkgLyAxMDApKTtcblx0c2xpZGVyLnN0eWxlLndpZHRoID0gc2Vla1RvICsgJyUnO1xuXG5cdHNldFRpbWUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHZpZGVvU2Vlayk7XG5cdHNldFRpbWUuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbmRcIiwgcGxheVBhdXNlKTtcbn1cblxuZnVuY3Rpb24gdmlkZW9CdWZmZXIoKSB7XG5cdGlmKGRhc2ggIT0gZmFsc2UpIHtcblx0XHR2YXIgYnVmZmVyZWRFbmQgPSB2aWRlby5idWZmZXJlZC5lbmQodmlkZW8uYnVmZmVyZWQubGVuZ3RoIC0gMSk7XG5cdFx0dmFyIGR1cmF0aW9uID0gIHZpZGVvLmR1cmF0aW9uO1xuXG5cdFx0aWYoZHVyYXRpb24gPiAwKSB7XG5cdFx0XHRidWZmZXJEaXYuc3R5bGUud2lkdGggPSAoKGJ1ZmZlcmVkRW5kIC8gZHVyYXRpb24pICogMTAwKSArICclJztcblx0XHR9XG5cdH1cblx0ZWxzZSB7XG5cdFx0YnVmZmVyRGl2LnN0eWxlLndpZHRoID0gJzEwMCUnO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHNlZWtUaW1lVXBkYWRlKCkge1xuXHR2YXIgdGltZVBlcmNlbnQgPSB2aWRlby5jdXJyZW50VGltZSAqICgxMDAgLyB2aWRlby5kdXJhdGlvbik7XG5cdHZhciBsb2FkVGltZSA9IGNvbnZlcnRUaW1lKHZpZGVvLmN1cnJlbnRUaW1lKTtcblx0dmFyIHZpZGVvVGltZSA9IGNvbnZlcnRUaW1lKHZpZGVvLmR1cmF0aW9uKTtcblxuXHRzbGlkZXIuc3R5bGUud2lkdGggPSB0aW1lUGVyY2VudCArICclJztcblx0Y3VycmVudFRpbWUuaW5uZXJIVE1MID0gIGxvYWRUaW1lO1xuXHR0b3RhbFRpbWUuaW5uZXJIVE1MID0gIHZpZGVvVGltZTtcbn1cblxuZnVuY3Rpb24gbXV0ZVZpZGVvKCkge1xuXHRpZih2aWRlby5tdXRlZCkge1xuXHRcdHZpZGVvLm11dGVkID0gZmFsc2U7XG5cdFx0dm9sdW1lU2xpZGVyLnZhbHVlID0gNTA7XG5cdFx0JChtdXRlKS5yZW1vdmVDbGFzcyhcInNvdW5kTXV0ZWRcIikuYWRkQ2xhc3MoXCJzb3VuZDJcIik7XG5cdH1cblx0ZWxzZSB7XG5cdFx0dmlkZW8ubXV0ZWQgPSB0cnVlO1xuXHRcdHZvbHVtZVNsaWRlci52YWx1ZSA9IDA7XG5cdFx0JChtdXRlKS5yZW1vdmVDbGFzcyhcInNvdW5kMlwiKS5yZW1vdmVDbGFzcyhcInNvdW5kXCIpLmFkZENsYXNzKFwic291bmRNdXRlZFwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiB2aWRlb1ZvbHVtZShlKSB7XG5cdHZhciBwb3NZID0gKChlLnBhZ2VZIC0gJCh0aGlzKS5vZmZzZXQoKS50b3ApICogMTAwKSAvICQodGhpcykuaW5uZXJIZWlnaHQoKTtcbiAgICBzZWVrVG9Ub3AgPSBwb3NZLnRvU3RyaW5nKCkuc2xpY2UoMCwgNSk7XG5cdHNlZWtUbyA9IDEwMCAtIHNlZWtUb1RvcDtcblx0dm9sdW1lU2VlaygpO1xufVxuXG5mdW5jdGlvbiB2aWRlb1ZvbHVtZURyYWcoZSkge1xuXHRzZXRWb2x1bWUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB2aWRlb1ZvbHVtZSk7XG5cblx0dmFyIHBvc1kgPSAoKGUucGFnZVkgLSAkKHRoaXMpLm9mZnNldCgpLnRvcCkgKiAxMDApIC8gJCh0aGlzKS5pbm5lckhlaWdodCgpO1xuICAgIHNlZWtUb1RvcCA9IHBvc1kudG9TdHJpbmcoKS5zbGljZSgwLCA1KTtcblx0c2Vla1RvID0gMTAwIC0gc2Vla1RvVG9wO1xuXHR2b2x1bWVTZWVrKCk7XG5cblx0c2V0Vm9sdW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdmlkZW9Wb2x1bWUpO1xufVxuXG5mdW5jdGlvbiB2b2x1bWVTZWVrKCkge1xuXHR2aWRlby52b2x1bWUgPSBzZWVrVG8gLyAxMDA7XG5cdHZvbHVtZVNsaWRlci5zdHlsZS5oZWlnaHQgPSBzZWVrVG8gKyAnJSc7XG5cdFxuXHQvL0RlZmluZSB0aGUgaWNvbiBvZiBzb3VuZCBsZXZlbFxuXHRcblx0aWYodmlkZW8udm9sdW1lID4gMCkge1xuXHRcdHZpZGVvLm11dGVkID0gZmFsc2U7XG5cblx0XHRpZih2aWRlby52b2x1bWUgPCAwLjUpIHtcblx0XHRcdCQobXV0ZSkucmVtb3ZlQ2xhc3MoXCJzb3VuZE11dGVkXCIpLnJlbW92ZUNsYXNzKFwic291bmQyXCIpLmFkZENsYXNzKFwic291bmRcIik7XG5cdFx0fVxuXHRcdGVsc2UgaWYodmlkZW8udm9sdW1lIDw9IDEpIHtcblx0XHRcdCQobXV0ZSkucmVtb3ZlQ2xhc3MoXCJzb3VuZE11dGVkXCIpLnJlbW92ZUNsYXNzKFwic291bmRcIikuYWRkQ2xhc3MoXCJzb3VuZDJcIik7XG5cdFx0fVxuXHR9XG5cdGVsc2UgaWYodmlkZW8udm9sdW1lID09IDApIHtcblx0XHR2aWRlby5tdXRlZCA9IHRydWU7XG5cdFx0JChtdXRlKS5yZW1vdmVDbGFzcyhcInNvdW5kMlwiKS5yZW1vdmVDbGFzcyhcInNvdW5kXCIpLmFkZENsYXNzKFwic291bmRNdXRlZFwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiB0b2dnbGVGdWxsU2NyZWVuKCkge1xuXHRpZiAoKGRvY3VtZW50LmZ1bGxTY3JlZW5FbGVtZW50ICYmIGRvY3VtZW50LmZ1bGxTY3JlZW5FbGVtZW50ICE9PSBudWxsKSB8fCAoIWRvY3VtZW50Lm1vekZ1bGxTY3JlZW4gJiYgIWRvY3VtZW50LndlYmtpdElzRnVsbFNjcmVlbikpIHtcblx0XHRpZiAocGxheWVyQm94LnJlcXVlc3RGdWxsU2NyZWVuKSB7XG5cdFx0XHRwbGF5ZXJCb3gucmVxdWVzdEZ1bGxTY3JlZW4oKTtcblx0XHR9IFxuXHRcdGVsc2UgaWYgKHBsYXllckJveC5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xuXHRcdFx0cGxheWVyQm94Lm1velJlcXVlc3RGdWxsU2NyZWVuKCk7XG5cdFx0fSBcblx0XHRlbHNlIGlmIChwbGF5ZXJCb3gud2Via2l0UmVxdWVzdEZ1bGxTY3JlZW4pIHtcblx0XHRcdHBsYXllckJveC53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbigpO1xuXHRcdH1cblx0XHQkKCcjcGxheWVyQm94JykucmVtb3ZlQ2xhc3MoJ3BsYXllckJveFNob3cnKS5hZGRDbGFzcygncGxheWVyQm94U2hvd0Z1bGwnKTtcblx0fVxuXHRlbHNlIHtcblx0XHRpZiAoZG9jdW1lbnQuY2FuY2VsRnVsbFNjcmVlbikge1xuXHRcdFx0ZG9jdW1lbnQuY2FuY2VsRnVsbFNjcmVlbigpO1xuXHRcdH0gXG5cdFx0ZWxzZSBpZiAoZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbikge1xuXHRcdFx0ZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbigpO1xuXHRcdH0gXG5cdFx0ZWxzZSBpZiAoZG9jdW1lbnQud2Via2l0Q2FuY2VsRnVsbFNjcmVlbikge1xuXHRcdFx0ZG9jdW1lbnQud2Via2l0Q2FuY2VsRnVsbFNjcmVlbigpO1xuXHRcdH1cblx0XHQkKCcjcGxheWVyQm94JykucmVtb3ZlQ2xhc3MoJ3BsYXllckJveFNob3dGdWxsJykuYWRkQ2xhc3MoJ3BsYXllckJveFNob3cnKTtcblx0fVxufVxuXG5mdW5jdGlvbiBleGl0RnVsbFNjcmVlbigpIHtcblx0dmFyIHN0YXRlID0gZG9jdW1lbnQuZnVsbFNjcmVlbiB8fCBkb2N1bWVudC5tb3pGdWxsU2NyZWVuIHx8IGRvY3VtZW50LndlYmtpdElzRnVsbFNjcmVlbjtcblx0dmFyIGV2ZW50ID0gc3RhdGUgPyAnRnVsbHNjcmVlbk9uJyA6ICdGdWxsc2NyZWVuT2ZmJztcblxuXHRpZihldmVudCA9PSAnRnVsbHNjcmVlbk9mZicpIHtcblx0XHQkKCcjcGxheWVyQm94JykucmVtb3ZlQ2xhc3MoJ3BsYXllckJveFNob3dGdWxsJykuYWRkQ2xhc3MoJ3BsYXllckJveFNob3cnKTtcblx0fVxufSIsIi8qIFxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG5mdW5jdGlvbiBjaGVja0Zvcm1hdHModmlkZW9UYWc6Ym9vbGVhbikge1xuICAgIGNvbnRlbnRUeXBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3YXRjaEludGVyZmFjZVwiKS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXR5cGVcIik7XG4gICAgZGF0YUlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3YXRjaEludGVyZmFjZVwiKS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpO1xuICAgIGRhdGFEYXNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3YXRjaEludGVyZmFjZVwiKS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWRhc2hcIik7XG4gICAgZGF0YUhscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2F0Y2hJbnRlcmZhY2VcIikuZ2V0QXR0cmlidXRlKFwiZGF0YS1obHNcIik7XG5cbiAgICBpZihjb250ZW50VHlwZSA9PSAnbW92aWUnKSB7XG4gICAgICAgIHZhciBtZWRpYUZvbGRlciA9IGJhc2VVcmwgKyAnbWVkaWEvbW92aWVzLyc7XG5cbiAgICAgICAgdmlkZW9QYXRoID0gbWVkaWFGb2xkZXIgKyBkYXRhSWQ7XG4gICAgfVxuICAgIGVsc2UgaWYoY29udGVudFR5cGUgPT0gJ3NlcmllJykge1xuICAgICAgICB2YXIgbWVkaWFGb2xkZXIgPSBiYXNlVXJsICsgJ21lZGlhL3Nlcmllcy8nO1xuICAgICAgICB2YXIgY29udGVudFNlYXNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2F0Y2hJbnRlcmZhY2VcIikuZ2V0QXR0cmlidXRlKFwiZGF0YS1zZWFzb25cIik7XG4gICAgICAgIHZhciBjb250ZW50RXBpc29kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2F0Y2hJbnRlcmZhY2VcIikuZ2V0QXR0cmlidXRlKFwiZGF0YS1lcGlzb2RlXCIpO1xuICAgICAgICBcbiAgICAgICAgZGF0YVBhcmVudCA9IG1lZGlhRm9sZGVyICsgZGF0YUlkO1xuICAgICAgICB2aWRlb1BhdGggPSBkYXRhUGFyZW50ICsgJy9zZWFzb24nICsgY29udGVudFNlYXNvbiArICcvZXBpc29kZScgKyBjb250ZW50RXBpc29kZTtcbiAgICB9XG4gICAgXG4gICAgZGFzaEZpbGVFeGlzdHMgPSBmYWxzZTtcbiAgICBobHNGaWxlRXhpc3RzID0gZmFsc2U7XG5cbiAgICB2YXIgdmlkZW9OYW1lOnN0cmluZyA9ICdvdXRwdXRfZGFzaCc7XG4gICAgdmFyIGRhc2hFeHRlbnNpb246c3RyaW5nID0gJ21wZCc7XG4gICAgdmFyIGhsc0V4dGVuc2lvbjpzdHJpbmcgPSAnbTN1OCc7XG5cbiAgICBpZih2aWRlb1RhZyA9PSB0cnVlKSB7XG4gICAgICAgIG1lZGlhSG9sZGVyLmlubmVySFRNTCA9IFwiPHZpZGVvIGlkPSd2aWRlb1RhZyc+PC92aWRlbz5cIjtcblx0XHR2aWRlbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWRlb1RhZycpO1xuICAgIH1cblxuICAgIGlmKGRhdGFEYXNoID09ICd5ZXMnKSB7XG4gICAgICAgIHdpbmRvdy5NZWRpYVNvdXJjZSA9IHdpbmRvdy5NZWRpYVNvdXJjZSB8fCB3aW5kb3cuV2ViS2l0TWVkaWFTb3VyY2U7XG5cbiAgICAgICAgaWYgKHdpbmRvdy5NZWRpYVNvdXJjZSkge1xuICAgICAgICAgICAgdmFyIGRhdGFTb3VyY2U6c3RyaW5nID0gdmlkZW9QYXRoICsgJy8nICsgIHZpZGVvTmFtZSArICcuJyArIGRhc2hFeHRlbnNpb247XG4gICAgICAgICAgICB2YXIgZGFzaEZpbGVFeGlzdHMgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIHZpZGVvUmVhZHlUb1VzZSA9IHRydWU7XG5cbiAgICAgICAgICAgIHBsYXllckNvbmZpZyhkYXRhU291cmNlLCB2aWRlb1JlYWR5VG9Vc2UpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYWxlcnQoJ1RoZSBNZWRpYVNvdXJjZSBBUEkgaXMgbm90IGF2YWlsYWJsZSBvbiB0aGlzIHBsYXRmb3JtIGUvb3UgYnJvd3Nlci4nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmKGRhdGFIbHMgPT0gJ3llcycpIHtcbiAgICAgICAgdmFyIGRhdGFTb3VyY2UgPSB2aWRlb1BhdGggKyAnLycgKyB2aWRlb05hbWUgKyAgJy4nICsgaGxzRXh0ZW5zaW9uO1xuICAgICAgICB2YXIgaGxzRmlsZUV4aXN0cyA9IHRydWU7XG4gICAgICAgIHZhciB2aWRlb1JlYWR5VG9Vc2UgPSB0cnVlO1xuXG4gICAgICAgIHBsYXllckNvbmZpZyhkYXRhU291cmNlLCB2aWRlb1JlYWR5VG9Vc2UpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYWxlcnQoXCJFcnJvciB0byBpbXBvcnQgdGhlIHZpZGVvIGZpbGUuLi5cIik7XG4gICAgICAgIHZhciB2aWRlb1JlYWR5VG9Vc2UgPSBmYWxzZTtcbiAgICB9XG59IiwiLyogXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmZ1bmN0aW9uIGhpZGVDb250cm9scygpIHtcblx0JChwbGF5ZXJCb3gpLnJlYWR5KGZ1bmN0aW9uKCkge1xuXHRcdCQodGhpcykub24oXCJtb3VzZW92ZXIsIG1vdXNlbW92ZVwiLCBcIiN2aWRlb1RhZywgI2NvbnRyb2xzRGl2LCAjbWVkaWFMb2FkaW5nXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0JChcIiNjb250cm9sc0RpdlwiKS5yZW1vdmVDbGFzcyhcImNvbnRyb2xzRGl2SGlkZVwiKS5hZGRDbGFzcygnY29udHJvbHNEaXZTaG93Jyk7XG5cdFx0XHQkKCcjdmlkZW9UYWcnKS5jc3MoJ2N1cnNvcicsICdhdXRvJyk7XG5cdFx0fSk7XG5cdFx0XG5cdFx0JCh0aGlzKS5vbihcIm1vdXNlb3V0XCIsIFwiI3ZpZGVvVGFnLCAjY29udHJvbHNEaXYsICNtZWRpYUxvYWRpbmdcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHRpZighdmlkZW8ucGF1c2VkKSB7XG5cdFx0XHRcdCQoXCIjY29udHJvbHNEaXZcIikucmVtb3ZlQ2xhc3MoXCJjb250cm9sc0RpdlNob3dcIikuYWRkQ2xhc3MoJ2NvbnRyb2xzRGl2SGlkZScpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdCQodGhpcykub24oXCJtb3VzZW1vdmUsIG1vdXNlb3V0XCIsIFwiI3ZpZGVvVGFnXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYoIXZpZGVvLnBhdXNlZCkge1xuXHRcdFx0XHRjbGVhclRpbWVvdXQoYXV0b0hpZGVDb250cm9scyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0pO1xuXHQkKFwiI3ZpZGVvVGFnXCIpLm9uKFwibW91c2VzdG9wXCIsIGZ1bmN0aW9uKCkge1xuXHRcdGlmKCF2aWRlby5wYXVzZWQpIHtcblx0XHRcdHNldFRpbWVvdXQoYXV0b0hpZGVDb250cm9scywgNDAwMCk7XG5cdFx0XHQkKCcjdmlkZW9UYWcnKS5jc3MoJ2N1cnNvcicsICdhdXRvJyk7XG5cdFx0fVxuXHR9KTtcbn1cblxuZnVuY3Rpb24gYXV0b0hpZGVDb250cm9scygpIHtcblx0aWYoIXZpZGVvLnBhdXNlZCkge1xuXHRcdCQoXCIjY29udHJvbHNEaXZcIikucmVtb3ZlQ2xhc3MoXCJjb250cm9sc0RpdlNob3dcIikuYWRkQ2xhc3MoJ2NvbnRyb2xzRGl2SGlkZScpO1xuXHRcdCQoJyN2aWRlb1RhZycpLmNzcygnY3Vyc29yJywgJ25vbmUnKTtcblx0fVxufSIsIi8qIFxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG5mdW5jdGlvbiBlcGlzb2RlU2VsZWN0UGxheWVyKCkge1xuXHQkKFwiI3NlYXNvblNlbGVjdFwiKS5yZWFkeShmdW5jdGlvbigpIHtcblx0XHQkKHRoaXMpLm9uKFwiY2xpY2tcIiwgXCIjb3BlblNlbGVjdG9yICNvcGVuU3BhblwiLCBmdW5jdGlvbigpIHtcblx0XHRcdCQoXCIuc2Vhc29uR3JvdXBTaG93XCIpLnJlbW92ZUNsYXNzKFwic2Vhc29uR3JvdXBTaG93XCIpLmFkZENsYXNzKFwic2Vhc29uR3JvdXBIaWRlXCIpO1xuXHRcdFx0JChcIiNzZWFzb25TZWxlY3RcIikucmVtb3ZlQ2xhc3MoXCJzZWFzb25TZWxlY3RIaWRlXCIpLmFkZENsYXNzKFwic2Vhc29uU2VsZWN0U2hvd1wiKTtcblxuXHRcdFx0Lyp2YXIgcGFyZW50SGVpZ2h0ID0gMDtcblx0XHRcdCQodGhpcykucGFyZW50KCkucGFyZW50KCkucGFyZW50KCkucGFyZW50KClcblx0XHRcdC5maW5kKCcjc2Vhc29uU2VsZWN0IC5zZWFzb24nKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRwYXJlbnRIZWlnaHQgKz0gJCh0aGlzKS5vdXRlckhlaWdodCgpO1xuXHRcdFx0fSk7XG5cdFx0XHQkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnBhcmVudCgpLnBhcmVudCgpLmNzcyh7XG5cdFx0XHRcdCdoZWlnaHQnOiBwYXJlbnRIZWlnaHQgKyAncHgnXG5cdFx0XHR9KTsqL1xuXHRcdH0pO1xuXHRcdCQodGhpcykub24oXCJjbGlja1wiLCBcIi5zZWFzb25TZWxlY3RTaG93IC5zZWFzb25cIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHQkKFwiLnNlYXNvblNlbGVjdFNob3dcIikucmVtb3ZlQ2xhc3MoXCJzZWFzb25TZWxlY3RTaG93XCIpLmFkZENsYXNzKFwic2Vhc29uU2VsZWN0SGlkZVwiKTtcblx0XHRcdCQoXCIuc2Vhc29uTmFtZVNob3dcIikucmVtb3ZlQ2xhc3MoXCJzZWFzb25OYW1lU2hvd1wiKS5hZGRDbGFzcyhcInNlYXNvbk5hbWVIaWRlXCIpO1xuXG5cdFx0XHRpbmRpY2VTaG93ID0gJCh0aGlzKS5pbmRleCgpO1xuXHRcdFx0aW5kaWNlU2hvdyArKztcblxuXHRcdFx0JChcIiNlcGlzb2RlU2VsZWN0ICNzZWFzb25Hcm91cFwiICsgaW5kaWNlU2hvdykucmVtb3ZlQ2xhc3MoXCJzZWFzb25Hcm91cEhpZGVcIikuYWRkQ2xhc3MoXCJzZWFzb25Hcm91cFNob3dcIik7XG5cdFx0XHQkKFwiI2VwaXNvZGVTZWxlY3QgI3NlYXNvbk5hbWVcIiArIGluZGljZVNob3cpLnJlbW92ZUNsYXNzKFwic2Vhc29uTmFtZUhpZGVcIikuYWRkQ2xhc3MoXCJzZWFzb25OYW1lU2hvd1wiKTtcblxuXHRcdFx0JChcIi5lcGlzb2RlT3BlblwiKS5yZW1vdmVDbGFzcyhcImVwaXNvZGVPcGVuXCIpLmFkZENsYXNzKFwiZXBpc29kZUNsb3NlXCIpO1xuXHRcdFx0JChcIi5lcGlzb2RlQ2xvc2U6bnRoLW9mLXR5cGUoMSlcIikucmVtb3ZlQ2xhc3MoXCJlcGlzb2RlQ2xvc2VcIikuYWRkQ2xhc3MoXCJlcGlzb2RlT3BlblwiKTtcblxuXHRcdFx0Ly8kKCcjZXBpc29kZXNEaXYnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuXHRcdH0pO1xuXHR9KTtcblx0JChcIiNlcGlzb2RlTGlzdFwiKS5vbihcImNsaWNrXCIsIFwiLnNlYXNvbkdyb3VwU2hvdyAuZXBpc29kZUNsb3NlXCIsIGZ1bmN0aW9uKCkge1xuXHRcdCQoXCIuc2Vhc29uR3JvdXBTaG93IC5lcGlzb2RlT3BlblwiKS5yZW1vdmVDbGFzcyhcImVwaXNvZGVPcGVuXCIpLmFkZENsYXNzKFwiZXBpc29kZUNsb3NlXCIpO1xuXHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoXCJlcGlzb2RlQ2xvc2VcIikuYWRkQ2xhc3MoXCJlcGlzb2RlT3BlblwiKTtcblx0fSk7XG5cblx0LyokKCcjZXBpc29kZXNEaXYnKS5vbignbW91c2VvdXQnLCBmdW5jdGlvbigpIHtcblx0XHQkKHRoaXMpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG5cdH0pOyovXG59IiwiLyogXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmZ1bmN0aW9uIGFkZEV2ZW50cygpIHtcblx0YnV0dG9uUGxheS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcGxheVBhdXNlKTtcblx0dmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHBsYXlQYXVzZSk7XG5cdHZpZGVvTG9hZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcGxheVBhdXNlKTtcblx0dmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihcInRpbWV1cGRhdGVcIiwgc2Vla1RpbWVVcGRhZGUpO1xuXHRzZXRUaW1lLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB2aWRlb1NlZWspO1xuXHRzZXRUaW1lLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdmlkZW9TZWVrSG92ZXIpO1xuXHRzZXRUaW1lLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCB2aWRlb1NlZWtEcmFnKTtcblx0dmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCB2aWRlb0J1ZmZlcik7XG5cdG11dGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG11dGVWaWRlbyk7XG5cdHNldFZvbHVtZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdmlkZW9Wb2x1bWUpO1xuXHRzZXRWb2x1bWUuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIHZpZGVvVm9sdW1lRHJhZyk7XG5cdGZ1bGxTY3JlZW4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZUZ1bGxTY3JlZW4pO1xuXHR2aWRlby5hZGRFdmVudExpc3RlbmVyKFwiZGJsY2xpY2tcIiwgdG9nZ2xlRnVsbFNjcmVlbik7XG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UnLCBleGl0RnVsbFNjcmVlbiwgZmFsc2UpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vemZ1bGxzY3JlZW5jaGFuZ2UnLCBleGl0RnVsbFNjcmVlbiwgZmFsc2UpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Z1bGxzY3JlZW5jaGFuZ2UnLCBleGl0RnVsbFNjcmVlbiwgZmFsc2UpO1xuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdNU0Z1bGxzY3JlZW5DaGFuZ2UnLCBleGl0RnVsbFNjcmVlbiwgZmFsc2UpO1xuXG5cdHZpZGVvLnBsYXkoKTtcblx0aGlkZUNvbnRyb2xzKCk7XG5cdGhvdEtleXMoKTtcblx0ZXBpc29kZVNlbGVjdFBsYXllcigpO1xuXG5cdCQoYnV0dG9uUGxheSkucmVtb3ZlQ2xhc3MoXCJwbGF5QnRuXCIpLmFkZENsYXNzKCdwbGF5QnRuMicpO1xuXHQkKHZpZGVvTG9hZCkucmVtb3ZlQ2xhc3MoXCJsb2FkaW5nXCIpLmFkZENsYXNzKCdsb2FkaW5nTm9uZScpO1xuXHRcblx0Ly9idWZmZXJQZXJjZW50ID0gKCh2aWRlby5idWZmZXJlZC5lbmQoMCkgLyB2aWRlby5kdXJhdGlvbikgKiAxMDApO1xufSIsIi8qIFxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG5mdW5jdGlvbiBob3RLZXlzKCkge1xuXHQkKGRvY3VtZW50KS5vbigna2V5dXAnLCBmdW5jdGlvbiAoZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR2YXIga2V5UHJlc3MgPSBlLndoaWNoIHx8IGUua2V5Q29kZTtcblx0XHRcblx0XHQvL1NwYWNlID09IFBsYXkgYW5kIFBhdXNlXG5cdFx0XG5cdFx0aWYoa2V5UHJlc3MgPT0gMzIpIHtcblx0XHRcdHBsYXlQYXVzZSgpO1xuXHRcdH1cblxuXHRcdC8vTSA9PSBNdXRlIGFuZCBVbm11dGVcblx0XHRcblx0XHRpZihrZXlQcmVzcyA9PSA3Nykge1xuXHRcdFx0bXV0ZVZpZGVvKCk7XG5cdFx0fVxuXG5cdFx0Ly9GICA9PSBUb2dnbGUgRnVsbFNjcmVlblxuXG5cdFx0aWYoa2V5UHJlc3MgPT0gNzApIHtcblx0XHRcdHRvZ2dsZUZ1bGxTY3JlZW4oKTtcblx0XHR9XG5cdH0pO1xufSIsIi8qIFxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG4vL2ZpcnQgZnVuY3Rpb24gYWZ0ZXIgY2hvb3NlRm9ybWF0XG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZGFzaGpzL2luZGV4LmQudHNcIi8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0B0eXBlcy93ZWJ0b3JyZW50L2luZGV4LmQudHNcIi8+XG5cbmZ1bmN0aW9uIHNob3dQbGF5ZXIoY29uZmlnT2JqZWN0OmFueSwgcmVhZHk6Ym9vbGVhbik6dm9pZCB7XG5cdGlmKHJlYWR5ID09IHRydWUpIHtcblx0XHRjb25maWcgPSBjb25maWdPYmplY3Q7XG5cdFx0ZGFzaCA9IGNvbmZpZy5zb3VyY2UuZGFzaCB8fCBmYWxzZTtcblx0XHRobHMgPSBjb25maWcuc291cmNlLmhscyB8fCBmYWxzZTtcblx0XHRwcm9ncmVzc2l2ZSA9IGNvbmZpZy5zb3VyY2UucHJvZ3Jlc3NpdmUgfHwgZmFsc2U7XG5cdFx0YXV0b3BsYXkgPSBjb25maWcuYXV0b3BsYXk7XG5cblx0XHRwbGF5ZXJCb3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyQm94Jyk7XG5cdFx0bWVkaWFIb2xkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVkaWFIb2xkZXInKTtcblx0XHRidXR0b25QbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXlCdG4nKTtcblxuXHRcdHZpZGVvTG9hZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZWRpYUxvYWRpbmcnKTtcblx0XHRjb250cm9sc0RpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9sc0RpdicpO1xuXHRcdHNsaWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9ncmVzc0N1cnJlbnQnKTtcblx0XHRidWZmZXJEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZ3Jlc3NCdWZmZXInKTtcblx0XHRzZXRUaW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2dyZXNzQ29udGFpbmVyJyk7XG5cdFx0dGltZVByZXZpZXcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGltZVByZXZpZXcnKTtcblx0XHRjdXJyZW50VGltZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXJyZW50VmlkZW9UaW1lJyk7XG5cdFx0dG90YWxUaW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvdGFsVmlkZW9UaW1lJyk7XG5cdFx0bXV0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtdXRlQnV0dG9uJyk7XG5cdFx0dm9sdW1lU2xpZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZvbHVtZUN1cnJlbnQnKTtcblx0XHRzZXRWb2x1bWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndm9sdW1lU2xpZGVyRGl2Jyk7XG5cdFx0ZXBpc29kZXNCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXBpc29kZXNCdXR0b24nKTtcblx0XHRmdWxsU2NyZWVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Z1bGxTY3JlZW5CdXR0b24nKTtcblx0XHR2aWRlb1N0YXRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvU3RhdHMnKTtcblxuXHRcdGlmKGF1dG9wbGF5ID09IHRydWUpIHtcblx0XHRcdCQoYnV0dG9uUGxheSkucmVtb3ZlQ2xhc3MoXCJwbGF5QnRuXCIpLmFkZENsYXNzKCdwbGF5QnRuMicpO1xuXHRcdFx0JCh2aWRlb0xvYWQpLnJlbW92ZUNsYXNzKFwidmlkZW9QYXVzZWRcIikuYWRkQ2xhc3MoJ2xvYWRpbmcnKTtcblxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0JChjb250cm9sc0RpdikucmVtb3ZlQ2xhc3MoXCJjb250cm9sc0RpdlNob3dcIikuYWRkQ2xhc3MoJ2NvbnRyb2xzRGl2SGlkZScpO1xuXHRcdFx0fSwzMDAwKTtcblxuXHRcdFx0c3RhcnRWaWRlbygpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGJ1dHRvblBsYXkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0YXJ0VmlkZW8pO1xuXHRcdFx0dmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0YXJ0VmlkZW8pO1xuXHRcdFx0dmlkZW9Mb2FkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdGFydFZpZGVvKTtcblx0XHR9XG5cdFx0XG5cdFx0JChcImJvZHlcIikub24oXCJjb250ZXh0bWVudVwiLCBmdW5jdGlvbigpIHtcblx0XHRcdC8vcmV0dXJuIGZhbHNlO1xuXHRcdH0pO1xuXHRcdFxuXHRcdC8vJCgnYm9keScpLmNzcygnb3ZlcmZsb3cnICwgJ2hpZGRlbicpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGRlc3Ryb3lWaWRlbygpO1xuXHRcdGFsZXJ0KCdUaGVyZSBpcyBhIGVycm9yIHRvIHBsYXkgdGhlIHZpZGVvIHNwZWNpZmllZC4uLicpO1xuXHRcdC8vY29uc29sZS5sb2coJ1RoZXJlIGlzIG5vIHZpZGVvIHRvIHVzZS4uLicpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHN0YXJ0VmlkZW8oKTp2b2lkIHtcblx0YnV0dG9uUGxheS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RhcnRWaWRlbyk7XG5cdHZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdGFydFZpZGVvKTtcblx0dmlkZW9Mb2FkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdGFydFZpZGVvKTtcblxuXHRpZiAoZGFzaCAhPSBmYWxzZSkge1xuXHRcdC8vbG9hZFZpZGVvRGFzaCgpO1xuXHRcdGxvYWRWaWRlb1RvcnJlbnQoKTtcblx0fVxuXHRlbHNlIGlmKGhscyAhPSBmYWxzZSkge1xuXHRcdGxvYWRWaWRlb0hscygpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGRlc3Ryb3lWaWRlbygpO1xuXHRcdGFsZXJ0KCdObyBEQVNILCBITFMgb3IgZGlyZWN0IHZpZGVvIHRvIHBsYXknKTtcblx0fVxufVxuXG5mdW5jdGlvbiBsb2FkVmlkZW9Ub3JyZW50KCk6dm9pZCB7XG5cdC8vdmFyIFdlYlRvcnJlbnQgPSByZXF1aXJlKCd3ZWJ0b3JyZW50Jyk7XG5cdHZhciBjbGllbnQgPSBuZXcgV2ViVG9ycmVudCgpO1xuXHQvL3ZhciB0b3JyZW50SWQgPSB2aWRlb1BhdGggKyAnL3ZpZGVvXzcyMHAudG9ycmVudCdcblx0dmFyIHRvcnJlbnRJZCA9ICdtYWduZXQ6P3h0PXVybjpidGloOjA4YWRhNWE3YTYxODNhYWUxZTA5ZDgzMWRmNjc0OGQ1NjYwOTVhMTAmZG49U2ludGVsJnRyPXVkcCUzQSUyRiUyRmV4cGxvZGllLm9yZyUzQTY5NjkmdHI9dWRwJTNBJTJGJTJGdHJhY2tlci5jb3BwZXJzdXJmZXIudGslM0E2OTY5JnRyPXVkcCUzQSUyRiUyRnRyYWNrZXIuZW1waXJlLWpzLnVzJTNBMTMzNyZ0cj11ZHAlM0ElMkYlMkZ0cmFja2VyLmxlZWNoZXJzLXBhcmFkaXNlLm9yZyUzQTY5NjkmdHI9dWRwJTNBJTJGJTJGdHJhY2tlci5vcGVudHJhY2tyLm9yZyUzQTEzMzcmdHI9d3NzJTNBJTJGJTJGdHJhY2tlci5idG9ycmVudC54eXomdHI9d3NzJTNBJTJGJTJGdHJhY2tlci5mYXN0Y2FzdC5ueiZ0cj13c3MlM0ElMkYlMkZ0cmFja2VyLm9wZW53ZWJ0b3JyZW50LmNvbSZ3cz1odHRwcyUzQSUyRiUyRndlYnRvcnJlbnQuaW8lMkZ0b3JyZW50cyUyRiZ4cz1odHRwcyUzQSUyRiUyRndlYnRvcnJlbnQuaW8lMkZ0b3JyZW50cyUyRnNpbnRlbC50b3JyZW50Jztcblx0XG5cdGNsaWVudC5hZGQodG9ycmVudElkLCBmdW5jdGlvbiAodG9ycmVudDphbnkpIHtcblx0XHR2YXIgZmlsZSA9IHRvcnJlbnQuZmlsZXMuZmluZChmdW5jdGlvbiAoZmlsZTphbnkpIHtcblx0XHRcdHJldHVybiBmaWxlLm5hbWUuZW5kc1dpdGgoJy5tcDQnKTtcblx0XHR9KTtcblxuXHRcdGZpbGUucmVuZGVyVG8oJ3ZpZGVvI3ZpZGVvVGFnJyk7XG5cblx0XHQvL2NvbnNvbGUubG9nKGZpbGUuZ2V0QmxvYlVSTCgpKTtcblx0fSk7XG5cblx0YWRkRXZlbnRzKCk7XG59XG5cbmZ1bmN0aW9uIGxvYWRWaWRlb0Rhc2goKTp2b2lkIHtcblx0dmFyIHBsYXllciA9IGRhc2hqcy5NZWRpYVBsYXllcigpO1xuXHR2YXIgZGFzaFBsYXllciA9IHBsYXllci5jcmVhdGUoKTtcblx0ZGFzaFBsYXllci5nZXREZWJ1ZygpLnNldExvZ1RvQnJvd3NlckNvbnNvbGUoZmFsc2UpO1xuXHRkYXNoUGxheWVyLmluaXRpYWxpemUodmlkZW8sIGRhc2gsIGF1dG9wbGF5KTtcblx0XG5cdGFkZEV2ZW50cygpO1xuXHQvL2NyZWF0ZVF1YWxpdGllcygpO1xufVxuXG5mdW5jdGlvbiBsb2FkVmlkZW9IbHMoKTp2b2lkIHtcblx0Y29uc29sZS5sb2coXCJVc2luZyBITFNcIik7XG59IiwiLyogXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmZ1bmN0aW9uIGNvbnZlcnRUaW1lKGQpIHtcblx0ZCA9IE51bWJlcihkKTtcblx0dmFyIGggPSBNYXRoLmZsb29yKGQgLyAzNjAwKTtcblx0dmFyIG0gPSBNYXRoLmZsb29yKGQgJSAzNjAwIC8gNjApO1xuXHR2YXIgcyA9IE1hdGguZmxvb3IoZCAlIDM2MDAgJSA2MCk7XG5cdHJldHVybiAoKGggPiAwID8gaCArIFwiOlwiICsgKG0gPCAxMCA/IFwiMFwiIDogXCJcIikgOiBcIlwiKSArIG0gKyBcIjpcIiArIChzIDwgMTAgPyBcIjBcIiA6IFwiXCIpICsgcyk7XG59XG5cbmZ1bmN0aW9uIGRlc3Ryb3lWaWRlbygpIHtcblx0JChwbGF5ZXJCb3gpLmZpbmQodmlkZW8pLnJlbW92ZSgpO1xuXHQkKHBsYXllckJveCkuZmluZCh2aWRlb0xvYWQpLnJlbW92ZSgpO1xuXHQkKHBsYXllckJveCkuZmluZChjb250cm9sc0RpdikucmVtb3ZlKCk7XG5cdCQobWVkaWFIb2xkZXIpLmFwcGVuZCgnPGltZyBzcmM9XCInICsgYmFzZVVybCArICdpbWFnZXMvZXJyb3I0MDQucG5nXCIvPicpO1xufSIsIi8qIFxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG5mdW5jdGlvbiBjcmVhdGVRdWFsaXRpZXMoKTp2b2lkIHtcbiAgICB2YXIgcXVhbGl0aWVzID0gdmlkZW87XG4gICAgY29uc29sZS5sb2cocXVhbGl0aWVzKTtcbn1cblxuZnVuY3Rpb24gY2hhbmdlUXVhbGl0eSgpOnZvaWQge1xuXG59IiwiLyogXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmZ1bmN0aW9uIHNob3dTdGF0cyhpbmZvOm9iamVjdCk6dm9pZCB7XG4gICAgY29uc29sZS5sb2coKTtcbn0iXX0=
