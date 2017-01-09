/* 
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

var ajaxFile = 'ajax/ajaxRequisitions.php';

$(window).ready(function() {
    showPlayer();
});

function showPlayer() {
	intializePlayer();
	episodeSelect();
	
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
	
	loadFolder();
}

function loadFolder() {
	var contentType = document.getElementById("watchInterface").getAttribute("data-type");
	if(contentType == 'serie') {
		var contentSeason = document.getElementById("watchInterface").getAttribute("data-season");
		var contentEpisode = document.getElementById("watchInterface").getAttribute("data-episode");
	}
	var request = new XMLHttpRequest();

	request.open('POST', ajaxFile + '?ajaxAction=watchLink&ajaxId=' + contentType);

	request.error = function() {
		alert('Error to get access to link');
	};

	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(this.responseText);

			var dataId = document.getElementById("watchInterface").getAttribute("data-id");
			dataLink = data.link;
            dataPath = dataLink + dataId;

			if(contentType == 'movie') {
				dataSource = dataPath + '/video.mp4';
			}
			else if(contentType == 'serie') {
				dataSource = dataPath + '/season' + contentSeason + '/episode' + contentEpisode + '/video.mp4';
			}

			var blob = new Blob([dataSource], {type: 'application/octet-binary'});
			var blobUrl = URL.createObjectURL(blob);

			var videoCode = "<video id='videoTag' autoplay src='" + dataSource + "' type='video/mp4'></video>";
			
			mediaHolder.innerHTML = videoCode;

			video = document.getElementById('videoTag');
			videoLoad = document.getElementById('mediaLoading');
			controlsDiv = document.getElementById('controlsDiv');
			buttonPlay = document.getElementById('playBtn');
			slider = document.getElementById('seekSlider');
			currentTime = document.getElementById('currentVideoTime');
			totalTime = document.getElementById('totalVideoTime');
			mute = document.getElementById('muteButton');
			volumeSlider = document.getElementById('volumeSlider');
			episodesButton = document.getElementById('episodesButton');
			fullScreen = document.getElementById('fullScreenButton');

			buttonPlay.addEventListener("click", playPause);
			video.addEventListener("click", playPause);
			videoLoad.addEventListener("click", playPause);
			video.addEventListener("timeupdate", seekTimeUpdade);
			slider.addEventListener("change", videoSeek);
			mute.addEventListener("click", muteVideo);
			volumeSlider.addEventListener("change", videoVolume);
			fullScreen.addEventListener("click", toggleFullScreen);
			video.addEventListener("dblclick", toggleFullScreen);

			hideControls();
			hotKeys();
			
			$(videoLoad).removeClass("videoPaused").removeClass("loading").addClass("loadingNone");
        }
        else {
            alert("Error to get the link");
        }
	};

	request.send();

	console.log(request.data);
}

function episodeSelect() {
	$("#seasonSelect").ready(function() {
		$(this).on("click", "#openSelector #openSpan", function() {
			$(".seasonGroupShow").removeClass("seasonGroupShow").addClass("seasonGroupHide");
			$("#seasonSelect").removeClass("seasonSelectHide").addClass("seasonSelectShow");
		});
		$(this).on("click", ".seasonSelectShow div", function() {
			$(".seasonSelectShow").removeClass("seasonSelectShow").addClass("seasonSelectHide");
			$(".seasonNameShow").removeClass("seasonNameShow").addClass("seasonNameHide");

			indiceShow = $(this).index();
			indiceShow ++;

			$("#episodeSelect #seasonGroup" + indiceShow).removeClass("seasonGroupHide").addClass("seasonGroupShow");
			$("#episodeSelect #seasonName" + indiceShow).removeClass("seasonNameHide").addClass("seasonNameShow");

			$(".episodeOpen").removeClass("episodeOpen").addClass("episodeClose");
			$(".episodeClose:nth-of-type(1)").removeClass("episodeClose").addClass("episodeOpen");
		});
	});
	$("#episodeList").on("click", ".episodeClose", function() {
		$(".episodeOpen").removeClass("episodeOpen").addClass("episodeClose");
		$(this).removeClass("episodeClose").addClass("episodeOpen");
	});
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
	if(video.paused) {
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

function videoSeek() {
	var seekTo = video.duration * (slider.value / 100);
	video.currentTime = seekTo;
}

/*---------------------
   Video Time Update
---------------------*/

function seekTimeUpdade() {
	var newTime = video.currentTime * (100 / video.duration);
	slider.value = newTime;
	
	var currentHr = Math.floor(video.currentTime / 3600);
	var currentMin = Math.floor(video.currentTime / 60);
	var currentSec = Math.floor(video.currentTime - currentMin * 60);
	
	var videoHr = Math.floor(video.duration / 3600);
	var videoMin = Math.floor(video.duration / 60);
	var videoSec = Math.floor(video.duration -  videoMin * 60);
	
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

function videoVolume() {
	video.volume = volumeSlider.value / 100;
	
	if(video.volume == 0) {
		video.muted = true;
	}
	else {
		video.muted = false;
	}
	
	//Define the icon of sound level
	
	if(video.volume > 0) {
		if(video.volume < 0.5) {
			$(mute).removeClass("soundMuted").removeClass("sound2").addClass("sound");
		}
		
		else if(video.volume >= 0.5) {
			if(video.volume <= 1) {
				$(mute).removeClass("soundMuted").removeClass("sound").addClass("sound2");
			}
		}
	}
	else if(video.volume == 0) {
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