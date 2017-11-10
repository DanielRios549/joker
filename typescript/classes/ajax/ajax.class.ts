/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

class Ajax {
    public ajaxFile:string = 'ajax/ajaxRequisitions.php';
    
    //function for simple ajax, without sent and received datas, if you want to receive and/or send datas, create anoter one

    changeUrl(url):void {
        history.pushState({}, '', url);
    }

    getPage(page:string, parameters:any, callback:any):void {
        var request = new XMLHttpRequest();
        
        request.open('POST', page, true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        request.onprogress = function(e) {
        $('.ajaxReplace').addClass('loading');
            var percent = (e.loaded / e.total) * 100;
            
            $('.loading:before').css({
                width: percent + '%'
            });
        };

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                callback(request.response);
            }
            else {
                alert('Unexpected status code ' + request.status + ' for ' + page);
                return false;
            }
        };
        request.onerror = function() {
            callback('error before seding');
        };
        request.send(parameters);
    }

    ajax(method:string, action:string, dataId, before, notDone, done):void {
        var request = new XMLHttpRequest();
        var url = this.ajaxFile + '?ajaxAction=' + action + '&ajaxId=' + dataId;
        
        request.onerror = function() {
            notDone;
        };
        request.open(method, url);
        
        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                done;
            }
            else {
                notDone;
            }
        };
        request.send();
    }
}