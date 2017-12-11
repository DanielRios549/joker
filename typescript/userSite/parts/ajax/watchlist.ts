/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

class Watchlist extends Ajax {
    addWatchList():void {
        var dataId = $(this).attr('data-id');
        
        this.ajax(
            'POST',
            'addWatchList',
            dataId,
            '',
            '',
            $('.addWatchList').removeClass('addWatchList').addClass('removeWatchList')
        );
    }

    removeWatchList():void {
        var dataId = $(this).attr('data-id');
        
        this.ajax(
            'POST',
            'removeWatchList',
            dataId,
            '',
            '',
            $('.removeWatchList').removeClass('removeWatchList').addClass('addWatchList')
        );
    }

    addWatchListIndex():void {
        var $this = $(this);
        var dataId = $(this).attr('data-id');

        var request = new XMLHttpRequest();
        var url = this.ajaxFile + '?ajaxAction=addWatchList&ajaxId=' + dataId;
        
        request.onerror = function() {
            alert('Error');
        };
        request.open('POST', url);
        
        request.onload = function() {
            var data = JSON.parse(this.responseText);

            if (request.status >= 200 && request.status < 400) {
                if($('#watchListDiv').length == false) {
                    $('.mainSection').prepend('<article id="watchListDiv" class="contentContainer"><p class="contentDivHeader">' + data.title + '</p><div class="contentDiv"><div class="contentGroupScroll"></div></div></article>');
                }

                if($this.attr('data-type') == 'movie') {
                    var linkType = 'movies';
                }
                else if($this.attr('data-type') == 'serie') {
                    var linkType = 'series';
                }

                $this.removeClass('addWatchList').addClass('removeWatchList');

                $('#watchListDiv .contentGroupScroll').prepend('<div class="content" data-id="' + $this.attr('data-id')  + '"><a class="contentLink" href="' + baseUrl + 'title?id=' + $this.attr('data-id') + '"><figure class="contentFigure"><img src="/joker/images/media/' + linkType + '/' + $this.attr('data-id') + '/image.jpg"/><figcaption></figcaption></figure></a><div class="removeWatchList" data-type="' + linkType + '" data-id="' + $this.attr('data-id') + '"></div></div>');

                $('.contentDiv div .addWatchList[data-id="' + $this.attr('data-id') + '"]').removeClass('addWatchList').addClass('removeWatchList');
                $('#imageDiv div span[data-id="' + $this.attr('data-id') + '"]').removeClass('addWatchList').addClass('removeWatchList');

                $('#contentSortcuts').find('.addWatchList').removeClass('addWatchList').addClass('removeWatchList');
            }
            else {
                alert('Error');
            }
        };
        request.send();
    }

    removeWatchListIndex():void {
        var $this = $(this);
        var dataId = $(this).attr('data-id');

        var request = new XMLHttpRequest();
        var url = this.ajaxFile + '?ajaxAction=removeWatchList&ajaxId=' + dataId;
        
        request.onerror = function() {
            alert('Error');
        };
        request.open('POST', url);
        
        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                $('#watchListDiv div[data-id="' + $this.attr('data-id') + '"]').remove();
                $('.contentDiv div .removeWatchList[data-id="' + $this.attr('data-id') + '"]').removeClass('removeWatchList').addClass('addWatchList');
                
                $('#imageDiv span[data-id="' + $this.attr('data-id') + '"]').removeClass('removeWatchList').addClass('addWatchList');

                $('#contentSortcuts').find('.removeWatchList').removeClass('removeWatchList').addClass('addWatchList');

                if($.trim($('#watchListDiv .contentGroupScroll').html()) == '') {
                    $('#watchListDiv').remove();
                }
            }
            else {
                alert('Error');
            }
        };
        request.send();
    }
}