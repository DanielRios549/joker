/* 
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

//firt function after chooseFormat

/// <reference path="../../../node_modules/dashjs/index.d.ts"/>
/// <reference path="../../../node_modules/@types/webtorrent/index.d.ts"/>

function showPlayer(configObject:any, ready:boolean):void {
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
		videoStats = document.getElementById('videoStats');

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

function startVideo():void {
	buttonPlay.removeEventListener("click", startVideo);
	video.removeEventListener("click", startVideo);
	videoLoad.removeEventListener("click", startVideo);

	if (dash != false) {
		//loadVideoDash();
		loadVideoTorrent();
	}
	else if(hls != false) {
		loadVideoHls();
	}
	else {
		destroyVideo();
		alert('No DASH, HLS or direct video to play');
	}
}

function loadVideoTorrent():void {
	//var WebTorrent = require('webtorrent');
	var client = new WebTorrent();
	//var torrentId = videoPath + '/video_720p.torrent'
	var torrentId = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent';
	
	client.add(torrentId, function (torrent:any) {
		var file = torrent.files.find(function (file:any) {
			return file.name.endsWith('.mp4');
		});

		file.renderTo('video#videoTag');

		//console.log(file.getBlobURL());
	});

	addEvents();
}

function loadVideoDash():void {
	var player = dashjs.MediaPlayer();
	var dashPlayer = player.create();
	dashPlayer.getDebug().setLogToBrowserConsole(false);
	dashPlayer.initialize(video, dash, autoplay);
	
	addEvents();
	//createQualities();
}

function loadVideoHls():void {
	console.log("Using HLS");
}