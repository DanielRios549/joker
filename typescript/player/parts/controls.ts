/* 
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

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