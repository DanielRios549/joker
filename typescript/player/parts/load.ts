/* 
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

//firt function after chooseFormat

function showPlayer(configObject:any, ready:boolean) {
	if(ready == true) {
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

		if(autoplay == true) {
			$(buttonPlay).removeClass("playBtn").addClass('playBtn2');
			$(videoLoad).removeClass("videoPaused").addClass('loading');

			setTimeout(function() {
				$(controlsDiv).removeClass("controlsDivShow").addClass('controlsDivHide');
			},3000);

			startVideo();
		}
		else {
			buttonPlay.addEventListener("click", startVideo);
			video.addEventListener("click", startVideo);
			videoLoad.addEventListener("click", startVideo);
		}
		
		$("body").on("contextmenu", function() {
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
	else if(hls != false) {
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