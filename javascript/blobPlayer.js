/* 
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

//Blob Player Source

'use strict';

var video = document.querySelector('#videoTag');

function getVideo(fileEntry) {
  get(dataSource, function(uInt8Array) {
    var blob = new Blob([uInt8Array], {
      type: 'video/mp4'
    });
    writeToFile(fileEntry, blob);
  });
}

function get(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer';
  xhr.send();

  xhr.onload = function() {
    if (xhr.status !== 200) {
      alert('Unexpected status code ' + xhr.status + ' for ' + url);
      return false;
    }
    callback(new Uint8Array(xhr.response));
  };
}

window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, handleInitSuccess, handleError);

function handleInitSuccess(fileSystem) {
  window.fileSystem = fileSystem;
  log('Initiated FileSystem: ' + fileSystem.name);
  createFile('video.mp4');
}

function createFile(fullPath) {
  window.fileSystem.root.getFile(fullPath, {
    create: true
  },
  function(fileEntry) {
    log('Created file: ' + fileEntry.fullPath);
    getVideo(fileEntry);
  }, handleError);
}

function writeToFile(fileEntry, blob) {
  fileEntry.createWriter(function(fileWriter) {
    fileWriter.onwriteend = function() {
      log('Wrote to file ' + fileEntry.fullPath);
      readFromFile(fileEntry.fullPath);
    };
    fileWriter.onerror = function(e) {
      log('Write failed: ' + e.toString());
    };
    fileWriter.write(blob);
  }, handleError);
}

function readFromFile(fullPath) {
  window.fileSystem.root.getFile(fullPath, {}, function(fileEntry) {
    fileEntry.file(function(file) {
      var reader = new FileReader();
      reader.onloadend = function() {
        video.src = URL.createObjectURL(new Blob([this.result]));
      };
      reader.readAsArrayBuffer(file);
    }, handleError);
  }, handleError);
}

function handleError(e) {
  switch (e.code) {
  case FileError.QUOTA_EXCEEDED_ERR:
    log('QUOTA_EXCEEDED_ERR');
    break;
  case FileError.NOT_FOUND_ERR:
    log('NOT_FOUND_ERR');
    break;
  case FileError.SECURITY_ERR:
    log('SECURITY_ERR');
    break;
  case FileError.INVALID_MODIFICATION_ERR:
    log('INVALID_MODIFICATION_ERR');
    break;
  case FileError.INVALID_STATE_ERR:
    log('INVALID_STATE_ERR');
    break;
  default:
    log('Unknown error');
    break;
  }
}

var data = document.getElementById('data');

function log(text) {
  //data.innerHTML += text + '<br />';
}