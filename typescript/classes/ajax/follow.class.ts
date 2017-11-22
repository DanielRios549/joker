/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

class Follow extends Ajax {
    followUser():void {
        var button = $(this);

        var request = new XMLHttpRequest();

        request.open('POST', this.ajaxFile + '?ajaxAction=follow&ajaxId=' + $(button).attr('data-id'));

        request.onerror = function() {
            alert('Error');
        };

        request.onload = function() {
            var data = JSON.parse(this.responseText);

            $(button).attr("id", data.change);
            $(button).find(".buttonSpan").html(data.write);
        };

        request.send();
    }

    unfollowUser():void {
        var button = $(this);

        var request = new XMLHttpRequest();

        request.open('POST', this.ajaxFile + '?ajaxAction=unfollow&ajaxId=' + $(button).attr('data-id'));

        request.onerror = function() {
            alert('Error');
        };

        request.onload = function() {
            var data = JSON.parse(this.responseText);

            $(button).attr("id", data.change);
            $(button).find(".buttonSpan").html(data.write); 
        };

        request.send();
    }

    ajaxLink(event, url):void {
        event.preventDefault();
        if(url != undefined) {
            var linkTo = url;
        }
        else {
            var linkTo:any = $(this).attr('href');
        }
        $(document).off('scroll');

        this.getPage(linkTo, "body=true", function(data) {
            //console.log(data);
            //$('.ajaxReplace').removeClass('loading');
            $('.ajaxReplace').html(data);

            $('html, body').animate({
                scrollTop: 0
            },500);

            this.changeUrl(linkTo);

            $('#menuBtInput').prop('checked', false);

            if(linkTo == baseUrl) {
                clearInterval(intervalId);
            }
        });
    }
}