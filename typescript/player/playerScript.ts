/* 
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
//var baseUrl:string = $('head').attr('data-url');
var ajaxFile = baseUrl + 'ajax/ajaxRequisitions.php';
var thisPage = $('main').attr('data-page');

if(thisPage == 'watch') {
	var play = true;
}
else {
	var config = $("#managerOptions").attr('data-autoplay');
	if(config == 'true') {
		var play = true;
	}
	else {
		var play = false;
	}
}

$(document).ready(function() {
	checkFormats(true);
});

function playerConfig(dataSource:string, ready:boolean) {
   var config = {
	   autoplay: play,
	   source: {
		   dash: dataSource,
		   //hls: "hls.m3u8"
	   },
   };
   //console.log(config);
   showPlayer(config, ready);
}