/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

function loadVideo(videoTag) {
    contentType = document.getElementById("watchInterface").getAttribute("data-type");
    dataId = document.getElementById("watchInterface").getAttribute("data-id");

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
    

    //var videoPath = 'http://techslides.com/demos/sample-videos';
    videoName = 'video';//'small';

    webmExtension = 'webm';
    webmCodec = 'vorbis, vp8';//vorbis, vp9

    mp4Extension = 'mp4';
    mp4Codec = 'avc1.42E01E, mp4a.40.2';//avc1.640029, mp4a.40.5

    videoExtension = webmExtension;
    videoCodecs = webmCodec;
    dataSource = videoPath + '/' + videoName + '.' + videoExtension;

    if(videoTag == true) {
        mediaHolder.innerHTML = "<video id='videoTag'></video>";
	    video = document.getElementById('videoTag');
    }
}