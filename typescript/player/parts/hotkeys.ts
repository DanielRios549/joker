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
		
		if(keyPress == 32) {
			playPause();
		}

		//M == Mute and Unmute
		
		if(keyPress == 77) {
			muteVideo();
		}

		//F  == Toggle FullScreen

		if(keyPress == 70) {
			toggleFullScreen();
		}
	});
}