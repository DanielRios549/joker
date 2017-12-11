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