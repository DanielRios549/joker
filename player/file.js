/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

function checkVideo(video, callback, done) {
	var check = new XMLHttpRequest();
	check.open('GET', video, true);

	check.onload = function() {
        if (check.status >= 200 && check.status < 400) {
			callback('exists');
            done();
		}
		else {
			callback('do not exists');
		}
	};
	check.send();
}

function checkFormats(videoTag) {
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

    if(videoTag == true) {
        mediaHolder.innerHTML = "<video id='videoTag'></video>";
	    video = document.getElementById('videoTag');
    }

	videoToCheck = videoPath + '/' + videoName + '.';

	checkVideo(videoToCheck + webmExtension, function(response) {
        if(response == 'exists') {
            webmVideoExists = true;
        }
        else {
            webmVideoExists = false;
        }
	}, function() {});
    
    checkVideo(videoToCheck + mp4Extension, function(response) {
        if(response == 'exists') {
            mp4VideoExists = true;
        }
        else {
            mp4VideoExists = false;
        }
    }, function() {
        chooseFormat();
    });
}

function chooseFormat() {
    webmMime = 'video/' + webmExtension + '; codecs="' + webmCodec + '"';
    mp4Mime = 'video/' + mp4Extension + '; codecs="' + mp4Codec + '"';

    window.MediaSource = window.MediaSource || window.WebKitMediaSource;

    if (!window.MediaSource) {
        alert('The MediaSource API is not available on this platform e/ou browser.');
    }

    mediaSource = new MediaSource();
    webmSupport = MediaSource.isTypeSupported(webmMime);
    mp4Support = MediaSource.isTypeSupported(mp4Mime);
    
    console.log(webmExtension + ' exists? ' + webmVideoExists + ' supports? ' + webmSupport);
    console.log(mp4Extension + ' exists? ' + mp4VideoExists + ' supports? ' + mp4Support);

    if(webmVideoExists && webmSupport) {
        dataSource = videoToCheck + webmExtension;
        videoExtension = webmExtension;
        videoCodec = webmCodec;
        mimeType = webmMime;
        videoReadyToUse = true;
    }
    else if(mp4VideoExists && mp4Support) {
        dataSource = videoToCheck + mp4Extension;
        videoExtension = mp4Extension;
        videoCodec = mp4Codec;
        mimeType = mp4Mime;
        videoReadyToUse = true;
    }
    else {
        videoReadyToUse = false;
    }
    console.log('Using the video ' + videoExtension);
    showPlayer();
}