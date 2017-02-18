/* 
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

var ajaxFile = baseUrl + 'ajax/ajaxRequisitions.php';

function convertTime(d) {
	d = Number(d);
	var h = Math.floor(d / 3600);
	var m = Math.floor(d % 3600 / 60);
	var s = Math.floor(d % 3600 % 60);
	return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
}

function getVideo(async, url, callback, done) {
	var request = new XMLHttpRequest();

	request.open('GET', url, async);
	request.responseType = 'arraybuffer';

	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			callback(new Uint8Array(request.response));
			//callback(request.response);
			done();
		}
		else {
			alert('Unexpected status code ' + request.status + ' for ' + url);
			return false;
		}
	};
	request.onerror = function() {
		callback('error');
	};
	request.send();
}

function destroyVideo() {
	$(playerBox).find(video).remove();
	$(playerBox).find(videoLoad).remove();
	$(playerBox).find(controlsDiv).remove();
	$(mediaHolder).append('<img src="' + baseUrl + 'images/error404.png"/>');
}

//firt function after chooseFormat

function showPlayer() {
	if(videoReadyToUse) {
		intializePlayer();
	
		$(playerBox).removeClass('playerBoxHide').addClass('playerBoxShow');
		
		$(buttonPlay).removeClass("playBtn").addClass('playBtn2');
		
		$("body").on("contextmenu", function() {
			//return false;
		});
		
		$('body').css('overflow' , 'hidden');
	}
	else {
		destroyVideo();
		alert('There is a error to play the video...');
		//console.log('There is no video to use...');
	}
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
	timePreview = document.getElementById('timePreview');
	currentTime = document.getElementById('currentVideoTime');
	totalTime = document.getElementById('totalVideoTime');
	mute = document.getElementById('muteButton');
	volumeSlider = document.getElementById('volumeCurrent');
	setVolume = document.getElementById('volumeSliderDiv');
	episodesButton = document.getElementById('episodesButton');
	fullScreen = document.getElementById('fullScreenButton');

	loadVideo();
}

function loadVideo() {
	video.src = URL.createObjectURL(mediaSource);
	mediaSource.addEventListener('sourceopen', function() {
		var sourceBuffer = mediaSource.addSourceBuffer(mimeType);

		getVideo(true, dataSource, function(response) {
			sourceBuffer.addEventListener('updateend', function () {
				mediaSource.endOfStream();
				video.play();
			});
			sourceBuffer.appendBuffer(response);
		},function() {
			addEvents();
		});
	}, false);
}

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
	
	hideControls();
	hotKeys();
	episodeSelectPlayer();
	
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

function hideControls() {
	$(playerBox).ready(function() {
		$(this).on("mouseover, mousemove", "#videoTag, #controlsDiv, #mediaLoading", function() {
			$("#controlsDiv").removeClass("controlsDivHide").addClass('controlsDivShow');
			$('#videoTag').css('cursor', 'auto');
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
			$('#videoTag').css('cursor', 'auto');
		}
	});
}

function autoHideControls() {
	if(!video.paused) {
		$("#controlsDiv").removeClass("controlsDivShow").addClass('controlsDivHide');
		$('#videoTag').css('cursor', 'none');
	}
}

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

	this.addEventListener('mouseout', function() {
		timePreview.removeAttribute('style');
	});
}

function videoSeekDrag(e) {
	setTime.removeEventListener("click", videoSeek);

	if(!video.paused) {
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
	var bufferedEnd = video.buffered.end(video.buffered.length - 1);
    var duration =  video.duration;

    if(duration > 0) {
      bufferDiv.style.width = ((bufferedEnd / duration) * 100) + '%';
    }
}

function seekTimeUpdade() {
	var timePercent = video.currentTime * (100 / video.duration);
	var loadTime = convertTime(video.currentTime);
	var videoTime = convertTime(video.duration);

	slider.style.width = timePercent + '%';
	currentTime.innerHTML =  loadTime;
	totalTime.innerHTML =  videoTime;
}

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