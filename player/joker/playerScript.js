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
        loadVideoDash();
    }
    else if (hls != false) {
        loadVideoHls();
    }
    else {
        destroyVideo();
        alert('No DASH, HLS or direct video to play');
    }
}
function loadVideoDash() {
    var player = dashjs.MediaPlayer();
    var dashPlayer = player.create();
    //dashPlayer.getDebug().setLogToBrowserConsole(false)
    dashPlayer.initialize(videoTag, dash, autoplay);
    //console.log();
    addEvents();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsYXllclNjcmlwdC50cyIsInBhcnRzL2J1dHRvbnMudHMiLCJwYXJ0cy9jb25maWcudHMiLCJwYXJ0cy9jb250cm9scy50cyIsInBhcnRzL2VwaXNvZGVzLnRzIiwicGFydHMvZXZlbnRzLnRzIiwicGFydHMvaG90a2V5cy50cyIsInBhcnRzL2xvYWQudHMiLCJwYXJ0cy9vdGhlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0VBS0U7QUFDRixrREFBa0Q7QUFDbEQsSUFBSSxRQUFRLEdBQUcsT0FBTyxHQUFHLDJCQUEyQixDQUFDO0FBQ3JELElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7QUFFM0MsRUFBRSxDQUFBLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDeEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLENBQUM7QUFDRCxJQUFJLENBQUMsQ0FBQztJQUNMLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN4RCxFQUFFLENBQUEsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNyQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7SUFDakIsQ0FBQztJQUNELElBQUksQ0FBQyxDQUFDO1FBQ0wsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDO0lBQ2xCLENBQUM7QUFDRixDQUFDO0FBRUQsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNqQixZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyxDQUFDLENBQUM7QUFFSCxzQkFBc0IsVUFBaUIsRUFBRSxLQUFhO0lBQ25ELElBQUksTUFBTSxHQUFHO1FBQ1osUUFBUSxFQUFFLElBQUk7UUFDZCxNQUFNLEVBQUU7WUFDUCxJQUFJLEVBQUUsVUFBVTtT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QUMsQ0FBQyxDQUFDO0FBQzNGLENBQUM7QUFFRDtJQUNDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN0QyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3hDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxHQUFHLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQyxDQUFDO0FBQzFFLENBQUMiLCJmaWxlIjoicGxheWVyU2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG4vL3ZhciBiYXNlVXJsOnN0cmluZyA9ICQoJ2hlYWQnKS5hdHRyKCdkYXRhLXVybCcpO1xudmFyIGFqYXhGaWxlID0gYmFzZVVybCArICdhamF4L2FqYXhSZXF1aXNpdGlvbnMucGhwJztcbnZhciB0aGlzUGFnZSA9ICQoJ21haW4nKS5hdHRyKCdkYXRhLXBhZ2UnKTtcblxuaWYodGhpc1BhZ2UgPT0gJ3dhdGNoJykge1xuXHR2YXIgcGxheSA9IHRydWU7XG59XG5lbHNlIHtcblx0dmFyIGNvbmZpZyA9ICQoXCIjbWFuYWdlck9wdGlvbnNcIikuYXR0cignZGF0YS1hdXRvcGxheScpO1xuXHRpZihjb25maWcgPT0gJ3RydWUnKSB7XG5cdFx0dmFyIHBsYXkgPSB0cnVlO1xuXHR9XG5cdGVsc2Uge1xuXHRcdHZhciBwbGF5ID0gZmFsc2U7XG5cdH1cbn1cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG5cdGNoZWNrRm9ybWF0cyh0cnVlKTtcbn0pO1xuXG5mdW5jdGlvbiBwbGF5ZXJDb25maWcoZGF0YVNvdXJjZTpzdHJpbmcsIHJlYWR5OmJvb2xlYW4pIHtcbiAgIHZhciBjb25maWcgPSB7XG5cdCAgIGF1dG9wbGF5OiBwbGF5LFxuXHQgICBzb3VyY2U6IHtcblx0XHQgICBkYXNoOiBkYXRhU291cmNlLFxuXHRcdCAgIC8vaGxzOiBcImhscy5tM3U4XCJcblx0ICAgfSxcbiAgIH07XG4gICAvL2NvbnNvbGUubG9nKGNvbmZpZyk7XG4gICBzaG93UGxheWVyKGNvbmZpZywgcmVhZHkpO1xufSIsIi8qIFxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG5mdW5jdGlvbiBwbGF5UGF1c2UoKSB7XG5cdGlmKHZpZGVvLnBhdXNlZCB8fCB2aWRlby5lbmRlZCkge1xuXHRcdHZpZGVvLnBsYXkoKTtcblx0XHQkKGJ1dHRvblBsYXkpLnJlbW92ZUNsYXNzKFwicGxheUJ0blwiKS5hZGRDbGFzcyhcInBsYXlCdG4yXCIpO1xuXHRcdCQodmlkZW9Mb2FkKS5yZW1vdmVDbGFzcyhcInZpZGVvUGF1c2VkXCIpLnJlbW92ZUNsYXNzKFwibG9hZGluZ1wiKS5hZGRDbGFzcyhcImxvYWRpbmdOb25lXCIpO1xuXHRcdCQoXCIjY29udHJvbHNEaXZcIikucmVtb3ZlQ2xhc3MoXCJjb250cm9sc0RpdlNob3dcIikuYWRkQ2xhc3MoJ2NvbnRyb2xzRGl2SGlkZScpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdHZpZGVvLnBhdXNlKCk7XG5cdFx0JChidXR0b25QbGF5KS5yZW1vdmVDbGFzcyhcInBsYXlCdG4yXCIpLmFkZENsYXNzKFwicGxheUJ0blwiKTtcblx0XHQkKHZpZGVvTG9hZCkucmVtb3ZlQ2xhc3MoXCJsb2FkaW5nXCIpLnJlbW92ZUNsYXNzKFwibG9hZGluZ05vbmVcIikuYWRkQ2xhc3MoXCJ2aWRlb1BhdXNlZFwiKTtcblx0XHQkKFwiI2NvbnRyb2xzRGl2XCIpLnJlbW92ZUNsYXNzKFwiY29udHJvbHNEaXZIaWRlXCIpLmFkZENsYXNzKCdjb250cm9sc0RpdlNob3cnKTtcblx0fVxufVxuXG5mdW5jdGlvbiB2aWRlb1NlZWsoZSkge1xuXHR2YXIgcG9zWCA9ICgoZS5wYWdlWCAtICQodGhpcykub2Zmc2V0KCkubGVmdCkgKiAxMDApIC8gJCh0aGlzKS5pbm5lcldpZHRoKCk7XG5cdHNlZWtUbyA9IHBvc1gudG9TdHJpbmcoKS5zbGljZSgwLCA1KTtcblx0dmlkZW8uY3VycmVudFRpbWUgPSB2aWRlby5kdXJhdGlvbiAqIChwb3NYLnRvU3RyaW5nKCkgLyAxMDApO1xuXHRzbGlkZXIuc3R5bGUud2lkdGggPSBzZWVrVG8gKyAnJSc7XG59XG5cbmZ1bmN0aW9uIHZpZGVvU2Vla0hvdmVyKGUpIHtcblx0dmFyIHBvc1ggPSAoKGUucGFnZVggLSAkKHRoaXMpLm9mZnNldCgpLmxlZnQpICogMTAwKSAvICQodGhpcykuaW5uZXJXaWR0aCgpO1xuXHR0aW1lUHJldmlldy5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuXHR0aW1lUHJldmlldy5zdHlsZS5sZWZ0ID0gJ2NhbGMoJyArIHBvc1ggKyAnJSAtICcgKyAodGltZVByZXZpZXcub2Zmc2V0V2lkdGggLyAyKSArICdweCknO1xuXG5cdHNlZWtUb0hvdmVyID0gdmlkZW8uZHVyYXRpb24gKiAocG9zWC50b1N0cmluZygpIC8gMTAwKTtcblx0dGltZVByZXZpZXcuaW5uZXJIVE1MID0gY29udmVydFRpbWUoc2Vla1RvSG92ZXIpO1xuXG5cdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBmdW5jdGlvbigpIHtcblx0XHR0aW1lUHJldmlldy5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiB2aWRlb1NlZWtEcmFnKGUpIHtcblx0c2V0VGltZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdmlkZW9TZWVrKTtcblxuXHRpZighdmlkZW8ucGF1c2VkKSB7XG5cdFx0cGxheVBhdXNlKCk7XG5cdH1cblx0dmFyIHBvc1ggPSAoKGUucGFnZVggLSAkKHRoaXMpLm9mZnNldCgpLmxlZnQpICogMTAwKSAvICQodGhpcykuaW5uZXJXaWR0aCgpO1xuXHRzZWVrVG8gPSBwb3NYLnRvU3RyaW5nKCkuc2xpY2UoMCwgNSk7XG5cdHZpZGVvLmN1cnJlbnRUaW1lID0gdmlkZW8uZHVyYXRpb24gKiAoc2Vla1RvIC8gMTAwKTtcblxuXHR0aW1lUHJldmlldy5zdHlsZS5sZWZ0ID0gJ2NhbGMoJyArIHBvc1ggKyAnJSAtICcgKyAodGltZVByZXZpZXcub2Zmc2V0V2lkdGggLyAyKSArICdweCknO1xuXHR0aW1lUHJldmlldy5pbm5lckhUTUwgPSBjb252ZXJ0VGltZSh2aWRlby5kdXJhdGlvbiAqIChwb3NYLnRvU3RyaW5nKCkgLyAxMDApKTtcblx0c2xpZGVyLnN0eWxlLndpZHRoID0gc2Vla1RvICsgJyUnO1xuXG5cdHNldFRpbWUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHZpZGVvU2Vlayk7XG5cdHNldFRpbWUuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbmRcIiwgcGxheVBhdXNlKTtcbn1cblxuZnVuY3Rpb24gdmlkZW9CdWZmZXIoKSB7XG5cdGlmKGRhc2ggIT0gZmFsc2UpIHtcblx0XHR2YXIgYnVmZmVyZWRFbmQgPSB2aWRlby5idWZmZXJlZC5lbmQodmlkZW8uYnVmZmVyZWQubGVuZ3RoIC0gMSk7XG5cdFx0dmFyIGR1cmF0aW9uID0gIHZpZGVvLmR1cmF0aW9uO1xuXG5cdFx0aWYoZHVyYXRpb24gPiAwKSB7XG5cdFx0XHRidWZmZXJEaXYuc3R5bGUud2lkdGggPSAoKGJ1ZmZlcmVkRW5kIC8gZHVyYXRpb24pICogMTAwKSArICclJztcblx0XHR9XG5cdH1cblx0ZWxzZSB7XG5cdFx0YnVmZmVyRGl2LnN0eWxlLndpZHRoID0gJzEwMCUnO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHNlZWtUaW1lVXBkYWRlKCkge1xuXHR2YXIgdGltZVBlcmNlbnQgPSB2aWRlby5jdXJyZW50VGltZSAqICgxMDAgLyB2aWRlby5kdXJhdGlvbik7XG5cdHZhciBsb2FkVGltZSA9IGNvbnZlcnRUaW1lKHZpZGVvLmN1cnJlbnRUaW1lKTtcblx0dmFyIHZpZGVvVGltZSA9IGNvbnZlcnRUaW1lKHZpZGVvLmR1cmF0aW9uKTtcblxuXHRzbGlkZXIuc3R5bGUud2lkdGggPSB0aW1lUGVyY2VudCArICclJztcblx0Y3VycmVudFRpbWUuaW5uZXJIVE1MID0gIGxvYWRUaW1lO1xuXHR0b3RhbFRpbWUuaW5uZXJIVE1MID0gIHZpZGVvVGltZTtcbn1cblxuZnVuY3Rpb24gbXV0ZVZpZGVvKCkge1xuXHRpZih2aWRlby5tdXRlZCkge1xuXHRcdHZpZGVvLm11dGVkID0gZmFsc2U7XG5cdFx0dm9sdW1lU2xpZGVyLnZhbHVlID0gNTA7XG5cdFx0JChtdXRlKS5yZW1vdmVDbGFzcyhcInNvdW5kTXV0ZWRcIikuYWRkQ2xhc3MoXCJzb3VuZDJcIik7XG5cdH1cblx0ZWxzZSB7XG5cdFx0dmlkZW8ubXV0ZWQgPSB0cnVlO1xuXHRcdHZvbHVtZVNsaWRlci52YWx1ZSA9IDA7XG5cdFx0JChtdXRlKS5yZW1vdmVDbGFzcyhcInNvdW5kMlwiKS5yZW1vdmVDbGFzcyhcInNvdW5kXCIpLmFkZENsYXNzKFwic291bmRNdXRlZFwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiB2aWRlb1ZvbHVtZShlKSB7XG5cdHZhciBwb3NZID0gKChlLnBhZ2VZIC0gJCh0aGlzKS5vZmZzZXQoKS50b3ApICogMTAwKSAvICQodGhpcykuaW5uZXJIZWlnaHQoKTtcbiAgICBzZWVrVG9Ub3AgPSBwb3NZLnRvU3RyaW5nKCkuc2xpY2UoMCwgNSk7XG5cdHNlZWtUbyA9IDEwMCAtIHNlZWtUb1RvcDtcblx0dm9sdW1lU2VlaygpO1xufVxuXG5mdW5jdGlvbiB2aWRlb1ZvbHVtZURyYWcoZSkge1xuXHRzZXRWb2x1bWUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB2aWRlb1ZvbHVtZSk7XG5cblx0dmFyIHBvc1kgPSAoKGUucGFnZVkgLSAkKHRoaXMpLm9mZnNldCgpLnRvcCkgKiAxMDApIC8gJCh0aGlzKS5pbm5lckhlaWdodCgpO1xuICAgIHNlZWtUb1RvcCA9IHBvc1kudG9TdHJpbmcoKS5zbGljZSgwLCA1KTtcblx0c2Vla1RvID0gMTAwIC0gc2Vla1RvVG9wO1xuXHR2b2x1bWVTZWVrKCk7XG5cblx0c2V0Vm9sdW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdmlkZW9Wb2x1bWUpO1xufVxuXG5mdW5jdGlvbiB2b2x1bWVTZWVrKCkge1xuXHR2aWRlby52b2x1bWUgPSBzZWVrVG8gLyAxMDA7XG5cdHZvbHVtZVNsaWRlci5zdHlsZS5oZWlnaHQgPSBzZWVrVG8gKyAnJSc7XG5cdFxuXHQvL0RlZmluZSB0aGUgaWNvbiBvZiBzb3VuZCBsZXZlbFxuXHRcblx0aWYodmlkZW8udm9sdW1lID4gMCkge1xuXHRcdHZpZGVvLm11dGVkID0gZmFsc2U7XG5cblx0XHRpZih2aWRlby52b2x1bWUgPCAwLjUpIHtcblx0XHRcdCQobXV0ZSkucmVtb3ZlQ2xhc3MoXCJzb3VuZE11dGVkXCIpLnJlbW92ZUNsYXNzKFwic291bmQyXCIpLmFkZENsYXNzKFwic291bmRcIik7XG5cdFx0fVxuXHRcdGVsc2UgaWYodmlkZW8udm9sdW1lIDw9IDEpIHtcblx0XHRcdCQobXV0ZSkucmVtb3ZlQ2xhc3MoXCJzb3VuZE11dGVkXCIpLnJlbW92ZUNsYXNzKFwic291bmRcIikuYWRkQ2xhc3MoXCJzb3VuZDJcIik7XG5cdFx0fVxuXHR9XG5cdGVsc2UgaWYodmlkZW8udm9sdW1lID09IDApIHtcblx0XHR2aWRlby5tdXRlZCA9IHRydWU7XG5cdFx0JChtdXRlKS5yZW1vdmVDbGFzcyhcInNvdW5kMlwiKS5yZW1vdmVDbGFzcyhcInNvdW5kXCIpLmFkZENsYXNzKFwic291bmRNdXRlZFwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiB0b2dnbGVGdWxsU2NyZWVuKCkge1xuXHRpZiAoKGRvY3VtZW50LmZ1bGxTY3JlZW5FbGVtZW50ICYmIGRvY3VtZW50LmZ1bGxTY3JlZW5FbGVtZW50ICE9PSBudWxsKSB8fCAoIWRvY3VtZW50Lm1vekZ1bGxTY3JlZW4gJiYgIWRvY3VtZW50LndlYmtpdElzRnVsbFNjcmVlbikpIHtcblx0XHRpZiAocGxheWVyQm94LnJlcXVlc3RGdWxsU2NyZWVuKSB7XG5cdFx0XHRwbGF5ZXJCb3gucmVxdWVzdEZ1bGxTY3JlZW4oKTtcblx0XHR9IFxuXHRcdGVsc2UgaWYgKHBsYXllckJveC5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xuXHRcdFx0cGxheWVyQm94Lm1velJlcXVlc3RGdWxsU2NyZWVuKCk7XG5cdFx0fSBcblx0XHRlbHNlIGlmIChwbGF5ZXJCb3gud2Via2l0UmVxdWVzdEZ1bGxTY3JlZW4pIHtcblx0XHRcdHBsYXllckJveC53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbigpO1xuXHRcdH1cblx0XHQkKCcjcGxheWVyQm94JykucmVtb3ZlQ2xhc3MoJ3BsYXllckJveFNob3cnKS5hZGRDbGFzcygncGxheWVyQm94U2hvd0Z1bGwnKTtcblx0fVxuXHRlbHNlIHtcblx0XHRpZiAoZG9jdW1lbnQuY2FuY2VsRnVsbFNjcmVlbikge1xuXHRcdFx0ZG9jdW1lbnQuY2FuY2VsRnVsbFNjcmVlbigpO1xuXHRcdH0gXG5cdFx0ZWxzZSBpZiAoZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbikge1xuXHRcdFx0ZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbigpO1xuXHRcdH0gXG5cdFx0ZWxzZSBpZiAoZG9jdW1lbnQud2Via2l0Q2FuY2VsRnVsbFNjcmVlbikge1xuXHRcdFx0ZG9jdW1lbnQud2Via2l0Q2FuY2VsRnVsbFNjcmVlbigpO1xuXHRcdH1cblx0XHQkKCcjcGxheWVyQm94JykucmVtb3ZlQ2xhc3MoJ3BsYXllckJveFNob3dGdWxsJykuYWRkQ2xhc3MoJ3BsYXllckJveFNob3cnKTtcblx0fVxufVxuXG5mdW5jdGlvbiBleGl0RnVsbFNjcmVlbigpIHtcblx0dmFyIHN0YXRlID0gZG9jdW1lbnQuZnVsbFNjcmVlbiB8fCBkb2N1bWVudC5tb3pGdWxsU2NyZWVuIHx8IGRvY3VtZW50LndlYmtpdElzRnVsbFNjcmVlbjtcblx0dmFyIGV2ZW50ID0gc3RhdGUgPyAnRnVsbHNjcmVlbk9uJyA6ICdGdWxsc2NyZWVuT2ZmJztcblxuXHRpZihldmVudCA9PSAnRnVsbHNjcmVlbk9mZicpIHtcblx0XHQkKCcjcGxheWVyQm94JykucmVtb3ZlQ2xhc3MoJ3BsYXllckJveFNob3dGdWxsJykuYWRkQ2xhc3MoJ3BsYXllckJveFNob3cnKTtcblx0fVxufSIsIi8qIFxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG5mdW5jdGlvbiBjaGVja0Zvcm1hdHModmlkZW9UYWc6Ym9vbGVhbikge1xuICAgIGNvbnRlbnRUeXBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3YXRjaEludGVyZmFjZVwiKS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXR5cGVcIik7XG4gICAgZGF0YUlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3YXRjaEludGVyZmFjZVwiKS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpO1xuICAgIGRhdGFEYXNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3YXRjaEludGVyZmFjZVwiKS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWRhc2hcIik7XG4gICAgZGF0YUhscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2F0Y2hJbnRlcmZhY2VcIikuZ2V0QXR0cmlidXRlKFwiZGF0YS1obHNcIik7XG5cbiAgICBpZihjb250ZW50VHlwZSA9PSAnbW92aWUnKSB7XG4gICAgICAgIHZhciBtZWRpYUZvbGRlciA9IGJhc2VVcmwgKyAnbWVkaWEvbW92aWVzLyc7XG5cbiAgICAgICAgdmlkZW9QYXRoID0gbWVkaWFGb2xkZXIgKyBkYXRhSWQ7XG4gICAgfVxuICAgIGVsc2UgaWYoY29udGVudFR5cGUgPT0gJ3NlcmllJykge1xuICAgICAgICB2YXIgbWVkaWFGb2xkZXIgPSBiYXNlVXJsICsgJ21lZGlhL3Nlcmllcy8nO1xuICAgICAgICB2YXIgY29udGVudFNlYXNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2F0Y2hJbnRlcmZhY2VcIikuZ2V0QXR0cmlidXRlKFwiZGF0YS1zZWFzb25cIik7XG4gICAgICAgIHZhciBjb250ZW50RXBpc29kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2F0Y2hJbnRlcmZhY2VcIikuZ2V0QXR0cmlidXRlKFwiZGF0YS1lcGlzb2RlXCIpO1xuICAgICAgICBcbiAgICAgICAgZGF0YVBhcmVudCA9IG1lZGlhRm9sZGVyICsgZGF0YUlkO1xuICAgICAgICB2aWRlb1BhdGggPSBkYXRhUGFyZW50ICsgJy9zZWFzb24nICsgY29udGVudFNlYXNvbiArICcvZXBpc29kZScgKyBjb250ZW50RXBpc29kZTtcbiAgICB9XG4gICAgXG4gICAgZGFzaEZpbGVFeGlzdHMgPSBmYWxzZTtcbiAgICBobHNGaWxlRXhpc3RzID0gZmFsc2U7XG5cbiAgICB2YXIgdmlkZW9OYW1lOnN0cmluZyA9ICdvdXRwdXRfZGFzaCc7XG4gICAgdmFyIGRhc2hFeHRlbnNpb246c3RyaW5nID0gJ21wZCc7XG4gICAgdmFyIGhsc0V4dGVuc2lvbjpzdHJpbmcgPSAnbTN1OCc7XG5cbiAgICBpZih2aWRlb1RhZyA9PSB0cnVlKSB7XG4gICAgICAgIG1lZGlhSG9sZGVyLmlubmVySFRNTCA9IFwiPHZpZGVvIGlkPSd2aWRlb1RhZyc+PC92aWRlbz5cIjtcblx0ICAgIHZpZGVvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvVGFnJyk7XG4gICAgfVxuXG4gICAgaWYoZGF0YURhc2ggPT0gJ3llcycpIHtcbiAgICAgICAgd2luZG93Lk1lZGlhU291cmNlID0gd2luZG93Lk1lZGlhU291cmNlIHx8IHdpbmRvdy5XZWJLaXRNZWRpYVNvdXJjZTtcblxuICAgICAgICBpZiAod2luZG93Lk1lZGlhU291cmNlKSB7XG4gICAgICAgICAgICB2YXIgZGF0YVNvdXJjZTpzdHJpbmcgPSB2aWRlb1BhdGggKyAnLycgKyAgdmlkZW9OYW1lICsgJy4nICsgZGFzaEV4dGVuc2lvbjtcbiAgICAgICAgICAgIHZhciBkYXNoRmlsZUV4aXN0cyA9IHRydWU7XG4gICAgICAgICAgICB2YXIgdmlkZW9SZWFkeVRvVXNlID0gdHJ1ZTtcblxuICAgICAgICAgICAgcGxheWVyQ29uZmlnKGRhdGFTb3VyY2UsIHZpZGVvUmVhZHlUb1VzZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhbGVydCgnVGhlIE1lZGlhU291cmNlIEFQSSBpcyBub3QgYXZhaWxhYmxlIG9uIHRoaXMgcGxhdGZvcm0gZS9vdSBicm93c2VyLicpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYoZGF0YUhscyA9PSAneWVzJykge1xuICAgICAgICB2YXIgZGF0YVNvdXJjZSA9IHZpZGVvUGF0aCArICcvJyArIHZpZGVvTmFtZSArICAnLicgKyBobHNFeHRlbnNpb247XG4gICAgICAgIHZhciBobHNGaWxlRXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgdmFyIHZpZGVvUmVhZHlUb1VzZSA9IHRydWU7XG5cbiAgICAgICAgcGxheWVyQ29uZmlnKGRhdGFTb3VyY2UsIHZpZGVvUmVhZHlUb1VzZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBhbGVydChcIkVycm9yIHRvIGltcG9ydCB0aGUgdmlkZW8gZmlsZS4uLlwiKTtcbiAgICAgICAgdmFyIHZpZGVvUmVhZHlUb1VzZSA9IGZhbHNlO1xuICAgIH1cbn0iLCIvKiBcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiB8IENvcHlyaWdodCAoYykgMjAxNC0yMDE1IEF0b21vLmNvbS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiB8IEAgQXV0aG9yXHQ6IERhbmllbCBSaW9zLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKi9cblxuZnVuY3Rpb24gaGlkZUNvbnRyb2xzKCkge1xuXHQkKHBsYXllckJveCkucmVhZHkoZnVuY3Rpb24oKSB7XG5cdFx0JCh0aGlzKS5vbihcIm1vdXNlb3ZlciwgbW91c2Vtb3ZlXCIsIFwiI3ZpZGVvVGFnLCAjY29udHJvbHNEaXYsICNtZWRpYUxvYWRpbmdcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHQkKFwiI2NvbnRyb2xzRGl2XCIpLnJlbW92ZUNsYXNzKFwiY29udHJvbHNEaXZIaWRlXCIpLmFkZENsYXNzKCdjb250cm9sc0RpdlNob3cnKTtcblx0XHRcdCQoJyN2aWRlb1RhZycpLmNzcygnY3Vyc29yJywgJ2F1dG8nKTtcblx0XHR9KTtcblx0XHRcblx0XHQkKHRoaXMpLm9uKFwibW91c2VvdXRcIiwgXCIjdmlkZW9UYWcsICNjb250cm9sc0RpdiwgI21lZGlhTG9hZGluZ1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdGlmKCF2aWRlby5wYXVzZWQpIHtcblx0XHRcdFx0JChcIiNjb250cm9sc0RpdlwiKS5yZW1vdmVDbGFzcyhcImNvbnRyb2xzRGl2U2hvd1wiKS5hZGRDbGFzcygnY29udHJvbHNEaXZIaWRlJyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0JCh0aGlzKS5vbihcIm1vdXNlbW92ZSwgbW91c2VvdXRcIiwgXCIjdmlkZW9UYWdcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHRpZighdmlkZW8ucGF1c2VkKSB7XG5cdFx0XHRcdGNsZWFyVGltZW91dChhdXRvSGlkZUNvbnRyb2xzKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG5cdCQoXCIjdmlkZW9UYWdcIikub24oXCJtb3VzZXN0b3BcIiwgZnVuY3Rpb24oKSB7XG5cdFx0aWYoIXZpZGVvLnBhdXNlZCkge1xuXHRcdFx0c2V0VGltZW91dChhdXRvSGlkZUNvbnRyb2xzLCA0MDAwKTtcblx0XHRcdCQoJyN2aWRlb1RhZycpLmNzcygnY3Vyc29yJywgJ2F1dG8nKTtcblx0XHR9XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBhdXRvSGlkZUNvbnRyb2xzKCkge1xuXHRpZighdmlkZW8ucGF1c2VkKSB7XG5cdFx0JChcIiNjb250cm9sc0RpdlwiKS5yZW1vdmVDbGFzcyhcImNvbnRyb2xzRGl2U2hvd1wiKS5hZGRDbGFzcygnY29udHJvbHNEaXZIaWRlJyk7XG5cdFx0JCgnI3ZpZGVvVGFnJykuY3NzKCdjdXJzb3InLCAnbm9uZScpO1xuXHR9XG59IiwiLyogXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmZ1bmN0aW9uIGVwaXNvZGVTZWxlY3RQbGF5ZXIoKSB7XG5cdCQoXCIjc2Vhc29uU2VsZWN0XCIpLnJlYWR5KGZ1bmN0aW9uKCkge1xuXHRcdCQodGhpcykub24oXCJjbGlja1wiLCBcIiNvcGVuU2VsZWN0b3IgI29wZW5TcGFuXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0JChcIi5zZWFzb25Hcm91cFNob3dcIikucmVtb3ZlQ2xhc3MoXCJzZWFzb25Hcm91cFNob3dcIikuYWRkQ2xhc3MoXCJzZWFzb25Hcm91cEhpZGVcIik7XG5cdFx0XHQkKFwiI3NlYXNvblNlbGVjdFwiKS5yZW1vdmVDbGFzcyhcInNlYXNvblNlbGVjdEhpZGVcIikuYWRkQ2xhc3MoXCJzZWFzb25TZWxlY3RTaG93XCIpO1xuXG5cdFx0XHQvKnZhciBwYXJlbnRIZWlnaHQgPSAwO1xuXHRcdFx0JCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKVxuXHRcdFx0LmZpbmQoJyNzZWFzb25TZWxlY3QgLnNlYXNvbicpLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHBhcmVudEhlaWdodCArPSAkKHRoaXMpLm91dGVySGVpZ2h0KCk7XG5cdFx0XHR9KTtcblx0XHRcdCQodGhpcykucGFyZW50KCkucGFyZW50KCkucGFyZW50KCkucGFyZW50KCkuY3NzKHtcblx0XHRcdFx0J2hlaWdodCc6IHBhcmVudEhlaWdodCArICdweCdcblx0XHRcdH0pOyovXG5cdFx0fSk7XG5cdFx0JCh0aGlzKS5vbihcImNsaWNrXCIsIFwiLnNlYXNvblNlbGVjdFNob3cgLnNlYXNvblwiLCBmdW5jdGlvbigpIHtcblx0XHRcdCQoXCIuc2Vhc29uU2VsZWN0U2hvd1wiKS5yZW1vdmVDbGFzcyhcInNlYXNvblNlbGVjdFNob3dcIikuYWRkQ2xhc3MoXCJzZWFzb25TZWxlY3RIaWRlXCIpO1xuXHRcdFx0JChcIi5zZWFzb25OYW1lU2hvd1wiKS5yZW1vdmVDbGFzcyhcInNlYXNvbk5hbWVTaG93XCIpLmFkZENsYXNzKFwic2Vhc29uTmFtZUhpZGVcIik7XG5cblx0XHRcdGluZGljZVNob3cgPSAkKHRoaXMpLmluZGV4KCk7XG5cdFx0XHRpbmRpY2VTaG93ICsrO1xuXG5cdFx0XHQkKFwiI2VwaXNvZGVTZWxlY3QgI3NlYXNvbkdyb3VwXCIgKyBpbmRpY2VTaG93KS5yZW1vdmVDbGFzcyhcInNlYXNvbkdyb3VwSGlkZVwiKS5hZGRDbGFzcyhcInNlYXNvbkdyb3VwU2hvd1wiKTtcblx0XHRcdCQoXCIjZXBpc29kZVNlbGVjdCAjc2Vhc29uTmFtZVwiICsgaW5kaWNlU2hvdykucmVtb3ZlQ2xhc3MoXCJzZWFzb25OYW1lSGlkZVwiKS5hZGRDbGFzcyhcInNlYXNvbk5hbWVTaG93XCIpO1xuXG5cdFx0XHQkKFwiLmVwaXNvZGVPcGVuXCIpLnJlbW92ZUNsYXNzKFwiZXBpc29kZU9wZW5cIikuYWRkQ2xhc3MoXCJlcGlzb2RlQ2xvc2VcIik7XG5cdFx0XHQkKFwiLmVwaXNvZGVDbG9zZTpudGgtb2YtdHlwZSgxKVwiKS5yZW1vdmVDbGFzcyhcImVwaXNvZGVDbG9zZVwiKS5hZGRDbGFzcyhcImVwaXNvZGVPcGVuXCIpO1xuXG5cdFx0XHQvLyQoJyNlcGlzb2Rlc0RpdicpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG5cdFx0fSk7XG5cdH0pO1xuXHQkKFwiI2VwaXNvZGVMaXN0XCIpLm9uKFwiY2xpY2tcIiwgXCIuc2Vhc29uR3JvdXBTaG93IC5lcGlzb2RlQ2xvc2VcIiwgZnVuY3Rpb24oKSB7XG5cdFx0JChcIi5zZWFzb25Hcm91cFNob3cgLmVwaXNvZGVPcGVuXCIpLnJlbW92ZUNsYXNzKFwiZXBpc29kZU9wZW5cIikuYWRkQ2xhc3MoXCJlcGlzb2RlQ2xvc2VcIik7XG5cdFx0JCh0aGlzKS5yZW1vdmVDbGFzcyhcImVwaXNvZGVDbG9zZVwiKS5hZGRDbGFzcyhcImVwaXNvZGVPcGVuXCIpO1xuXHR9KTtcblxuXHQvKiQoJyNlcGlzb2Rlc0RpdicpLm9uKCdtb3VzZW91dCcsIGZ1bmN0aW9uKCkge1xuXHRcdCQodGhpcykucmVtb3ZlQXR0cignc3R5bGUnKTtcblx0fSk7Ki9cbn0iLCIvKiBcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiB8IENvcHlyaWdodCAoYykgMjAxNC0yMDE1IEF0b21vLmNvbS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiB8IEAgQXV0aG9yXHQ6IERhbmllbCBSaW9zLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKi9cblxuZnVuY3Rpb24gYWRkRXZlbnRzKCkge1xuXHRidXR0b25QbGF5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwbGF5UGF1c2UpO1xuXHR2aWRlby5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcGxheVBhdXNlKTtcblx0dmlkZW9Mb2FkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwbGF5UGF1c2UpO1xuXHR2aWRlby5hZGRFdmVudExpc3RlbmVyKFwidGltZXVwZGF0ZVwiLCBzZWVrVGltZVVwZGFkZSk7XG5cdHNldFRpbWUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHZpZGVvU2Vlayk7XG5cdHNldFRpbWUuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB2aWRlb1NlZWtIb3Zlcik7XG5cdHNldFRpbWUuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIHZpZGVvU2Vla0RyYWcpO1xuXHR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIHZpZGVvQnVmZmVyKTtcblx0bXV0ZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbXV0ZVZpZGVvKTtcblx0c2V0Vm9sdW1lLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB2aWRlb1ZvbHVtZSk7XG5cdHNldFZvbHVtZS5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgdmlkZW9Wb2x1bWVEcmFnKTtcblx0ZnVsbFNjcmVlbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdG9nZ2xlRnVsbFNjcmVlbik7XG5cdHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoXCJkYmxjbGlja1wiLCB0b2dnbGVGdWxsU2NyZWVuKTtcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0ZnVsbHNjcmVlbmNoYW5nZScsIGV4aXRGdWxsU2NyZWVuLCBmYWxzZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW96ZnVsbHNjcmVlbmNoYW5nZScsIGV4aXRGdWxsU2NyZWVuLCBmYWxzZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZnVsbHNjcmVlbmNoYW5nZScsIGV4aXRGdWxsU2NyZWVuLCBmYWxzZSk7XG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ01TRnVsbHNjcmVlbkNoYW5nZScsIGV4aXRGdWxsU2NyZWVuLCBmYWxzZSk7XG5cblx0dmlkZW8ucGxheSgpO1xuXHRoaWRlQ29udHJvbHMoKTtcblx0aG90S2V5cygpO1xuXHRlcGlzb2RlU2VsZWN0UGxheWVyKCk7XG5cblx0JChidXR0b25QbGF5KS5yZW1vdmVDbGFzcyhcInBsYXlCdG5cIikuYWRkQ2xhc3MoJ3BsYXlCdG4yJyk7XG5cdCQodmlkZW9Mb2FkKS5yZW1vdmVDbGFzcyhcImxvYWRpbmdcIikuYWRkQ2xhc3MoJ2xvYWRpbmdOb25lJyk7XG5cdFxuXHQvL2J1ZmZlclBlcmNlbnQgPSAoKHZpZGVvLmJ1ZmZlcmVkLmVuZCgwKSAvIHZpZGVvLmR1cmF0aW9uKSAqIDEwMCk7XG59IiwiLyogXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmZ1bmN0aW9uIGhvdEtleXMoKSB7XG5cdCQoZG9jdW1lbnQpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHZhciBrZXlQcmVzcyA9IGUud2hpY2ggfHwgZS5rZXlDb2RlO1xuXHRcdFxuXHRcdC8vU3BhY2UgPT0gUGxheSBhbmQgUGF1c2Vcblx0XHRcblx0XHRpZihrZXlQcmVzcyA9PSAzMikge1xuXHRcdFx0cGxheVBhdXNlKCk7XG5cdFx0fVxuXG5cdFx0Ly9NID09IE11dGUgYW5kIFVubXV0ZVxuXHRcdFxuXHRcdGlmKGtleVByZXNzID09IDc3KSB7XG5cdFx0XHRtdXRlVmlkZW8oKTtcblx0XHR9XG5cblx0XHQvL0YgID09IFRvZ2dsZSBGdWxsU2NyZWVuXG5cblx0XHRpZihrZXlQcmVzcyA9PSA3MCkge1xuXHRcdFx0dG9nZ2xlRnVsbFNjcmVlbigpO1xuXHRcdH1cblx0fSk7XG59IiwiLyogXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbi8vZmlydCBmdW5jdGlvbiBhZnRlciBjaG9vc2VGb3JtYXRcblxuZnVuY3Rpb24gc2hvd1BsYXllcihjb25maWdPYmplY3Q6YW55LCByZWFkeTpib29sZWFuKSB7XG5cdGlmKHJlYWR5ID09IHRydWUpIHtcblx0XHRjb25maWcgPSBjb25maWdPYmplY3Q7XG5cdFx0ZGFzaCA9IGNvbmZpZy5zb3VyY2UuZGFzaCB8fCBmYWxzZTtcblx0XHRobHMgPSBjb25maWcuc291cmNlLmhscyB8fCBmYWxzZTtcblx0XHRwcm9ncmVzc2l2ZSA9IGNvbmZpZy5zb3VyY2UucHJvZ3Jlc3NpdmUgfHwgZmFsc2U7XG5cdFx0YXV0b3BsYXkgPSBjb25maWcuYXV0b3BsYXk7XG5cblx0XHRwbGF5ZXJCb3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyQm94Jyk7XG5cdFx0bWVkaWFIb2xkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVkaWFIb2xkZXInKTtcblx0XHRidXR0b25QbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXlCdG4nKTtcblxuXHRcdHZpZGVvTG9hZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZWRpYUxvYWRpbmcnKTtcblx0XHRjb250cm9sc0RpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9sc0RpdicpO1xuXHRcdHNsaWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9ncmVzc0N1cnJlbnQnKTtcblx0XHRidWZmZXJEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZ3Jlc3NCdWZmZXInKTtcblx0XHRzZXRUaW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2dyZXNzQ29udGFpbmVyJyk7XG5cdFx0dGltZVByZXZpZXcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGltZVByZXZpZXcnKTtcblx0XHRjdXJyZW50VGltZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXJyZW50VmlkZW9UaW1lJyk7XG5cdFx0dG90YWxUaW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvdGFsVmlkZW9UaW1lJyk7XG5cdFx0bXV0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtdXRlQnV0dG9uJyk7XG5cdFx0dm9sdW1lU2xpZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZvbHVtZUN1cnJlbnQnKTtcblx0XHRzZXRWb2x1bWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndm9sdW1lU2xpZGVyRGl2Jyk7XG5cdFx0ZXBpc29kZXNCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXBpc29kZXNCdXR0b24nKTtcblx0XHRmdWxsU2NyZWVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Z1bGxTY3JlZW5CdXR0b24nKTtcblxuXHRcdGlmKGF1dG9wbGF5ID09IHRydWUpIHtcblx0XHRcdCQoYnV0dG9uUGxheSkucmVtb3ZlQ2xhc3MoXCJwbGF5QnRuXCIpLmFkZENsYXNzKCdwbGF5QnRuMicpO1xuXHRcdFx0JCh2aWRlb0xvYWQpLnJlbW92ZUNsYXNzKFwidmlkZW9QYXVzZWRcIikuYWRkQ2xhc3MoJ2xvYWRpbmcnKTtcblxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0JChjb250cm9sc0RpdikucmVtb3ZlQ2xhc3MoXCJjb250cm9sc0RpdlNob3dcIikuYWRkQ2xhc3MoJ2NvbnRyb2xzRGl2SGlkZScpO1xuXHRcdFx0fSwzMDAwKTtcblxuXHRcdFx0c3RhcnRWaWRlbygpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGJ1dHRvblBsYXkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0YXJ0VmlkZW8pO1xuXHRcdFx0dmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0YXJ0VmlkZW8pO1xuXHRcdFx0dmlkZW9Mb2FkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdGFydFZpZGVvKTtcblx0XHR9XG5cdFx0XG5cdFx0JChcImJvZHlcIikub24oXCJjb250ZXh0bWVudVwiLCBmdW5jdGlvbigpIHtcblx0XHRcdC8vcmV0dXJuIGZhbHNlO1xuXHRcdH0pO1xuXHRcdFxuXHRcdC8vJCgnYm9keScpLmNzcygnb3ZlcmZsb3cnICwgJ2hpZGRlbicpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGRlc3Ryb3lWaWRlbygpO1xuXHRcdGFsZXJ0KCdUaGVyZSBpcyBhIGVycm9yIHRvIHBsYXkgdGhlIHZpZGVvIHNwZWNpZmllZC4uLicpO1xuXHRcdC8vY29uc29sZS5sb2coJ1RoZXJlIGlzIG5vIHZpZGVvIHRvIHVzZS4uLicpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHN0YXJ0VmlkZW8oKSB7XG5cdGJ1dHRvblBsYXkucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0YXJ0VmlkZW8pO1xuXHR2aWRlby5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RhcnRWaWRlbyk7XG5cdHZpZGVvTG9hZC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RhcnRWaWRlbyk7XG5cblx0aWYgKGRhc2ggIT0gZmFsc2UpIHtcblx0XHRsb2FkVmlkZW9EYXNoKCk7XG5cdH1cblx0ZWxzZSBpZihobHMgIT0gZmFsc2UpIHtcblx0XHRsb2FkVmlkZW9IbHMoKTtcblx0fVxuXHRlbHNlIHtcblx0XHRkZXN0cm95VmlkZW8oKTtcblx0XHRhbGVydCgnTm8gREFTSCwgSExTIG9yIGRpcmVjdCB2aWRlbyB0byBwbGF5Jyk7XG5cdH1cbn1cblxuZnVuY3Rpb24gbG9hZFZpZGVvRGFzaCgpIHtcblx0dmFyIHBsYXllciA9IGRhc2hqcy5NZWRpYVBsYXllcigpO1xuXHR2YXIgZGFzaFBsYXllciA9IHBsYXllci5jcmVhdGUoKTtcblx0Ly9kYXNoUGxheWVyLmdldERlYnVnKCkuc2V0TG9nVG9Ccm93c2VyQ29uc29sZShmYWxzZSlcbiAgICBkYXNoUGxheWVyLmluaXRpYWxpemUodmlkZW9UYWcsIGRhc2gsIGF1dG9wbGF5KTtcblxuXHQvL2NvbnNvbGUubG9nKCk7XG4gICAgYWRkRXZlbnRzKCk7XG59XG5cbmZ1bmN0aW9uIGxvYWRWaWRlb0hscygpIHtcblx0Y29uc29sZS5sb2coXCJVc2luZyBITFNcIik7XG59IiwiLyogXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmZ1bmN0aW9uIGNvbnZlcnRUaW1lKGQpIHtcblx0ZCA9IE51bWJlcihkKTtcblx0dmFyIGggPSBNYXRoLmZsb29yKGQgLyAzNjAwKTtcblx0dmFyIG0gPSBNYXRoLmZsb29yKGQgJSAzNjAwIC8gNjApO1xuXHR2YXIgcyA9IE1hdGguZmxvb3IoZCAlIDM2MDAgJSA2MCk7XG5cdHJldHVybiAoKGggPiAwID8gaCArIFwiOlwiICsgKG0gPCAxMCA/IFwiMFwiIDogXCJcIikgOiBcIlwiKSArIG0gKyBcIjpcIiArIChzIDwgMTAgPyBcIjBcIiA6IFwiXCIpICsgcyk7XG59XG5cbmZ1bmN0aW9uIGRlc3Ryb3lWaWRlbygpIHtcblx0JChwbGF5ZXJCb3gpLmZpbmQodmlkZW8pLnJlbW92ZSgpO1xuXHQkKHBsYXllckJveCkuZmluZCh2aWRlb0xvYWQpLnJlbW92ZSgpO1xuXHQkKHBsYXllckJveCkuZmluZChjb250cm9sc0RpdikucmVtb3ZlKCk7XG5cdCQobWVkaWFIb2xkZXIpLmFwcGVuZCgnPGltZyBzcmM9XCInICsgYmFzZVVybCArICdpbWFnZXMvZXJyb3I0MDQucG5nXCIvPicpO1xufSJdfQ==
