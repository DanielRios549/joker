/* 
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

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
	if(dash != false) {
		var bufferedEnd = video.buffered.end(video.buffered.length - 1);
		var duration =  video.duration;

		if(duration > 0) {
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

function exitFullScreen() {
	var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
	var event = state ? 'FullscreenOn' : 'FullscreenOff';

	if(event == 'FullscreenOff') {
		$('#playerBox').removeClass('playerBoxShowFull').addClass('playerBoxShow');
	}
}