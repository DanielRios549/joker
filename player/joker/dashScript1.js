"use strict";

var classJS = (function() {

    function getXML(async, url, callback, done) {
        var request = new XMLHttpRequest();

        request.open('GET', url, async);
        request.responseType = 'text';

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                var tempoutput = request.response;
                var parser = new DOMParser();

                var xmlData = parser.parseFromString(tempoutput, "text/xml", 0);
                log("parsing mpd file");
                
                callback(xmlData);
                done();
            }
            else {
                alert('Unexpected status code ' + request.status + ' for ' + url);
                return false;
            }
        };
        request.onerror = function() {
            callback('error');
        };
        request.send();
    }

    function initVideo(range, url, callback) {
        var request = new XMLHttpRequest();
        if (range || url) {
            // Set the desired range of bytes we want from the mp4 video file
            request.open('GET', url);
            request.setRequestHeader("Range", "bytes=" + range);
            segCheck = (timeToDownload(range) * .8).toFixed(3); // use .8 as fudge factor
            request.send();
            request.responseType = 'arraybuffer';

            try {
                request.addEventListener("readystatechange", function () {
                        if (request.readyState == request.DONE) {
                            callback(request.response);
                        }
                }, false);
            }
            catch (e) {
                log(e);
            }
        }
        else {
            return;
        }
    }

    function showTypes() {
        var display = document.getElementById("videoStats");
        var spanData;
        spanData = "<h3>Reported values:</h3><ul><li>Media file: " + file + "</li>";
        spanData += "<li>Type: " + type + "</li>";
        spanData += "<li>Codecs: " + codecs + "</li>";
        spanData += "<li>Video Dimensions: " + width + "x" + height + "</li>";
        spanData += "<li>Bandwidth: " + bandwidth + "</li>";
        //spanData += "<li>Initialization Range: " + initialization + "</li>";
        //spanData += "<li>Segment length: " + segDuration / 1000 + " seconds</li>";
        spanData += "<li>" + vidDuration + "</li>";
        spanData += "</ul>";
        display.innerHTML = spanData;
        document.getElementById("numIndexes").innerHTML = segments.length;
        document.getElementById("curInfo").style.display = "block";
        document.getElementById("curInfo").style.display = "block";
    }

    function setupVideo() {
        //  Create the media source
        mediaSource = new MediaSource();

        var url = URL.createObjectURL(mediaSource);
        videoTag.pause();
        videoTag.src = url;
        videoTag.width = width;
        videoTag.height = height;

        // Wait for event that tells us that our media source object is 
        //   ready for a buffer to be added.
        mediaSource.addEventListener('sourceopen', function (e) {
            videoSource = mediaSource.addSourceBuffer(type);
            
            initVideo(initialization, file, function(data) {
                // Add response to buffer
                try {
                        videoSource.appendBuffer(new Uint8Array(data.response));
                        // Wait for the update complete event before continuing
                        videoSource.addEventListener("update",updateFunct, false);
                }
                catch (e) {
                        log('Exception while appending initialization content', e);
                }
            });
        },false);
    }

    function log(s) {
        //  send to console
        //    you can also substitute UI here
        console.log(s);
    };

    function timeToDownload(range) {
        var vidDur = range.split("-");
        // Time = size * 8 / bitrate
        return (((vidDur[1] - vidDur[0]) * 8) / bandwidth)
    }

    // Converts mpd time to human time
    function parseDuration(pt) {
        // Parse time from format "PT#H#M##.##S"
        var ptTemp = pt.split("T")[1];
        ptTemp = ptTemp.split("H")
        var hours = ptTemp[0];
        var minutes = ptTemp[1].split("M")[0];
        var seconds = ptTemp[1].split("M")[1].split("S")[0];
        var hundredths = seconds.split(".");
        //  Display the length of video (taken from .mpd file, since video duration is infinate)
        return "Video length: " + hours + ":" + pZ(minutes, 2) + ":" + pZ(hundredths[0], 2) + "." + hundredths[1];
    }

    //  Pad digits with zeros if needed 
    function pZ(value, padCount) {
        var tNum = value + '';
        while (tNum.length < padCount) {
        tNum = "0" + tNum;
        }
        return tNum;
    }

    var html = {
		hasClass: function(element, cls) {
			return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
		},

		addClass: function(element, cls) {
			element.className += ' '+ cls + ' ';
		},

		removeClass: function(element, cls) {

		    var newClassName = "";
		    var i;
		    var classes = element.className.split(" ");
		    for(i = 0; i < classes.length; i++) {
		        if(classes[i] !== cls) {
		            newClassName += classes[i] + " ";
		        }
		    }
		    element.className = newClassName;
		},

		toggleClass: function(element, cls ) {
			if( this.hasClass(element,cls) ) {
				this.removeClass(element, cls);
			}
			else {
				this.addClass(element, cls);	
			}

		}
	};
    return {
		init: init,
		play: play,
		pause: pause,
		rewind: rewind,
		volume: volume,
		ended: ended,
		setFullscreen: setFullscreen,
		video: currentVideo
	};
})();