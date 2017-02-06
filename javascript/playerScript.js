/* 
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

var ajaxFile = 'ajax/ajaxRequisitions.php';

function loadVideo(sync, url, callback, done) {
	var request = new XMLHttpRequest();

	request.open('GET', url, sync);
	request.responseType = 'arraybuffer';

	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			callback(request.response);
			done();
		}
		else {
			alert('Unexpected status code ' + request.status + ' for ' + url);
			return false;
		}
	};
	request.send();
}

$(window).ready(function() {
    showPlayer();
});

function showPlayer() {
	intializePlayer();
	
	$(playerBox).removeClass('playerBoxHide').addClass('playerBoxShow');
	
	$(buttonPlay).removeClass("playBtn").addClass('playBtn2');
	
	$("body").on("contextmenu", function() {
		//return false;
	});
	
	$('body').css('overflow' , 'hidden');
}

function intializePlayer() {
	playerBox = document.getElementById('playerBox');
	mediaHolder = document.getElementById('mediaHolder');
	buttonPlay = document.getElementById('playBtn');

	videoLoad = document.getElementById('mediaLoading');
	controlsDiv = document.getElementById('controlsDiv');
	slider = document.getElementById('progressCurrent');
	bufferDiv = document.getElementById('progressBuffer');
	setTime = document.getElementById('progressContainer');
	currentTime = document.getElementById('currentVideoTime');
	totalTime = document.getElementById('totalVideoTime');
	mute = document.getElementById('muteButton');
	volumeSlider = document.getElementById('volumeCurrent');
	setVolume = document.getElementById('volumeSliderDiv');
	episodesButton = document.getElementById('episodesButton');
	fullScreen = document.getElementById('fullScreenButton');

	loadFolder();
}

function loadFolder() {
	var contentType = document.getElementById("watchInterface").getAttribute("data-type");
	var dataId = document.getElementById("watchInterface").getAttribute("data-id");

	if(contentType == 'movie') {
		var mediaFolder = baseUrl + 'media/movies/';
		
		dataPath = mediaFolder + dataId;
		dataSource = dataPath + '/video.mp4';
	}
	else if(contentType == 'serie') {
		var mediaFolder = baseUrl + 'media/series/';
		var contentSeason = document.getElementById("watchInterface").getAttribute("data-season");
		var contentEpisode = document.getElementById("watchInterface").getAttribute("data-episode");
		
		dataPath = mediaFolder + dataId;
		dataSource = dataPath + '/season' + contentSeason + '/episode' + contentEpisode + '/video.mp4';
	}

	mediaHolder.innerHTML = "<video id='videoTag' preload='metadata'></video>";
	video = document.getElementById('videoTag');

	var testeurl = 'https://video-gru2-1.xx.fbcdn.net/v/t42.1790-2/16136505_1640691379570540_6345596034156068864_n.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InN2ZTM2MF9xZl81MTJ3X2NyZl8yMV9tYWluXzQuMl9wMTBfc2QifQ%3D%3D&oh=583f6096a687a501de7dd12d87741b92&oe=5897B227';

	loadVideo(true, dataSource, function(response) {
		var reader = new FileReader();
		var blob = new Blob([response], {type: 'text/plain'});

        reader.onloadend = function() {
        	video.src = URL.createObjectURL(blob);
			video.play();
        };

        reader.readAsArrayBuffer(blob);
		console.log('adicionou o link');
	}, function() {
		addEvents();
	});
}

function addEvents() {
	console.log('adicionou os eventos');
	buttonPlay.addEventListener("click", playPause);
	video.addEventListener("click", playPause);
	videoLoad.addEventListener("click", playPause);
	video.addEventListener("timeupdate", seekTimeUpdade);
	setTime.addEventListener("click", videoSeek);
	video.addEventListener('progress', videoBuffer);
	mute.addEventListener("click", muteVideo);
	setVolume.addEventListener("click", videoVolume);
	fullScreen.addEventListener("click", toggleFullScreen);
	video.addEventListener("dblclick", toggleFullScreen);
	
	hideControls();
	hotKeys();
	episodeSelectPlayer();
	
	video.play();
	$(videoLoad).removeClass("videoPaused").removeClass("loading").addClass("loadingNone");
	
	//bufferPercent = ((video.buffered.end(0) / video.duration) * 100);
}

function episodeSelectPlayer() {
	$("#seasonSelect").ready(function() {
		$(this).on("click", "#openSelector #openSpan", function() {
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
		$(this).on("click", ".seasonSelectShow .season", function() {
			$(".seasonSelectShow").removeClass("seasonSelectShow").addClass("seasonSelectHide");
			$(".seasonNameShow").removeClass("seasonNameShow").addClass("seasonNameHide");

			indiceShow = $(this).index();
			indiceShow ++;

			$("#episodeSelect #seasonGroup" + indiceShow).removeClass("seasonGroupHide").addClass("seasonGroupShow");
			$("#episodeSelect #seasonName" + indiceShow).removeClass("seasonNameHide").addClass("seasonNameShow");

			$(".episodeOpen").removeClass("episodeOpen").addClass("episodeClose");
			$(".episodeClose:nth-of-type(1)").removeClass("episodeClose").addClass("episodeOpen");

			//$('#episodesDiv').removeAttr('style');
		});
	});
	$("#episodeList").on("click", ".seasonGroupShow .episodeClose", function() {
		$(".seasonGroupShow .episodeOpen").removeClass("episodeOpen").addClass("episodeClose");
		$(this).removeClass("episodeClose").addClass("episodeOpen");
	});

	/*$('#episodesDiv').on('mouseout', function() {
		$(this).removeAttr('style');
	});*/
}

/*---------------------
	Hide controls
---------------------*/

function hideControls() {
	$(playerBox).ready(function() {
		$(this).on("mouseover, mousemove", "#videoTag, #controlsDiv, #mediaLoading", function() {
			$("#controlsDiv").removeClass("controlsDivHide").addClass('controlsDivShow');
		});
		
		$(this).on("mouseout", "#videoTag, #controlsDiv, #mediaLoading", function() {
			if(!video.paused) {
				$("#controlsDiv").removeClass("controlsDivShow").addClass('controlsDivHide');
			}
		});
		$(this).on("mousemove, mouseout", "#videoTag", function() {
			if(!video.paused) {
				clearTimeout(autoHideControls);
			}
		});
	});
	$("#videoTag").on("mousestop", function() {
		if(!video.paused) {
			setTimeout(autoHideControls, 4000);
		}
	});
}

/*---------------------
  Auto Hide controls
---------------------*/

function autoHideControls() {
	if(!video.paused) {
		$("#controlsDiv").removeClass("controlsDivShow").addClass('controlsDivHide');
	}
}

/*---------------------
	Play and Pause
---------------------*/

function playPause() {
	if(video.paused || video.ended) {
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

/*---------------------
      Video Time
---------------------*/

function videoSeek(e) {
	var posX = ((e.pageX - $(this).offset().left) * 100) / $(this).innerWidth();
    seekTo = posX.toString().slice(0, 5);
	video.currentTime = video.duration * (seekTo / 100);
	
	slider.style.width = seekTo + '%';
}

function videoBuffer() {
	var bufferedEnd = video.buffered.end(video.buffered.length - 1);
    var duration =  video.duration;

    if(duration > 0) {
      bufferDiv.style.width = ((bufferedEnd / duration) * 100) + '%';
    }
}

/*---------------------
   Video Time Update
---------------------*/

function seekTimeUpdade() {
	var newTime = video.currentTime * (100 / video.duration);
	
	var currentHr = Math.floor(video.currentTime / 3600);
	var currentMin = Math.floor(video.currentTime / 60);
	var currentSec = Math.floor(video.currentTime - currentMin * 60);
	
	var videoHr = Math.floor(video.duration / 3600);
	var videoMin = Math.floor(video.duration / 60);
	var videoSec = Math.floor(video.duration -  videoMin * 60);

	slider.style.width = newTime + '%';
	
	//Hours
	
	if(currentHr < 10) {
		currentHr = "0" + currentHr;
	}
	if(videoHr < 10) {
		videoHr = "0" + videoHr;
	}
	
	//Minutes
	
	if(currentMin < 10) {
		currentMin = "0" + currentMin;
	}
	if(videoMin < 10) {
		videoMin = "0" + videoMin;
	}
	
	//Seconds
	
	if(currentSec < 10) {
		currentSec = "0" + currentSec;
	}
	if(videoSec < 10) {
		videoSec = "0" + videoSec;
	}
	currentTime.innerHTML =  currentHr + ":" + currentMin + ":" + currentSec;
	totalTime.innerHTML =  videoHr + ":" + videoMin + ":" + videoSec;
}

/*---------------------
      Sound Muted
---------------------*/

function muteVideo() {
	if(video.muted) {
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

/*---------------------
     Sound Volume
---------------------*/

function videoVolume(e) {
	var posY = ((e.pageY - $(this).offset().top) * 100) / $(this).innerHeight();
    seekToTop = posY.toString().slice(0, 5);

	seekTo = 100 - seekToTop;
	//console.log(seekTo);

	video.volume = seekTo / 100;

	volumeSlider.style.height = seekTo + '%';
	
	//Define the icon of sound level
	
	if(video.volume > 0) {
		video.muted = false;

		if(video.volume < 0.5) {
			$(mute).removeClass("soundMuted").removeClass("sound2").addClass("sound");
		}
		else if(video.volume <= 1) {
			$(mute).removeClass("soundMuted").removeClass("sound").addClass("sound2");
		}
	}
	else if(video.volume == 0) {
		video.muted = true;
		$(mute).removeClass("sound2").removeClass("sound").addClass("soundMuted");
	}
}

/*---------------------
      Full Screen
---------------------*/

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

/*---------------------
	 Shortcut keys
---------------------*/

function hotKeys() {
	$(document).ready(function() {
		var pressedCtrl = false;

		$(document).keyup(function (e) {
			
			//Space == Play and Pause
			
			if(e.wich == 32 || e.keyCode == 32){
				playPause();
			}
			
			//Enter == Mute and Unmute
			
			if(e.wich == 77 || e.keyCode == 77){
				muteVideo();
			}
			
			//ESC or F11 == Exit FullScreen
			
			if((e.wich == 27 || e.keyCode == 27) || (e.wich == 122 || e.keyCode == 122)) {
				$('#playerBox').removeClass('playerBoxShowFull').addClass('playerBoxShow');
			}
			
			//Left ALT + ENTER == FullScreen
			
			if(e.which == 18) pressedCtrl = true;
			
			if((e.which == 13 || e.keyCode == 13) && (pressedCtrl == true)) {
				toggleFullScreen();
			}
		});
	});
}