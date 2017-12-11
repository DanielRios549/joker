/* 
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

function checkFormats(videoTag:boolean) {
    contentType = document.getElementById("watchInterface").getAttribute("data-type");
    dataId = document.getElementById("watchInterface").getAttribute("data-id");
    dataDash = document.getElementById("watchInterface").getAttribute("data-dash");
    dataHls = document.getElementById("watchInterface").getAttribute("data-hls");

    if(contentType == 'movie') {
        var mediaFolder = baseUrl + 'media/movies/';

        videoPath = mediaFolder + dataId;
    }
    else if(contentType == 'serie') {
        var mediaFolder = baseUrl + 'media/series/';
        var contentSeason = document.getElementById("watchInterface").getAttribute("data-season");
        var contentEpisode = document.getElementById("watchInterface").getAttribute("data-episode");
        
        dataParent = mediaFolder + dataId;
        videoPath = dataParent + '/season' + contentSeason + '/episode' + contentEpisode;
    }
    
    dashFileExists = false;
    hlsFileExists = false;

    var videoName:string = 'output_dash';
    var dashExtension:string = 'mpd';
    var hlsExtension:string = 'm3u8';

    if(videoTag == true) {
        mediaHolder.innerHTML = "<video id='videoTag'></video>";
	    video = document.getElementById('videoTag');
    }

    if(dataDash == 'yes') {
        window.MediaSource = window.MediaSource || window.WebKitMediaSource;

        if (window.MediaSource) {
            var dataSource:string = videoPath + '/' +  videoName + '.' + dashExtension;
            var dashFileExists = true;
            var videoReadyToUse = true;

            playerConfig(dataSource, videoReadyToUse);
        }
        else {
            alert('The MediaSource API is not available on this platform e/ou browser.');
        }
    }
    else if(dataHls == 'yes') {
        var dataSource = videoPath + '/' + videoName +  '.' + hlsExtension;
        var hlsFileExists = true;
        var videoReadyToUse = true;

        playerConfig(dataSource, videoReadyToUse);
    }
    else {
        alert("Error to import the video file...");
        var videoReadyToUse = false;
    }
}