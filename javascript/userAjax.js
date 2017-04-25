/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

var ajaxFile = 'ajax/ajaxRequisitions.php';

//function for simple ajax, without sent and received datas, if you want to receive and/or send datas, create anoter one

function getPage(page, parameters, callback) {
    var request = new XMLHttpRequest();
    
    request.open('POST', page, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
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

function ajax(method, action, dataId, before, notDone, done) {
    var request = new XMLHttpRequest();
    var url = ajaxFile + '?ajaxAction=' + action + '&ajaxId=' + dataId;
    
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

function addWatchList() {
    dataId = $(this).attr('data-id');
    
    ajax(
        'POST',
        'addWatchList',
        dataId,
        '',
        '',
        $('.addWatchList').removeClass('addWatchList').addClass('removeWatchList')
    );
}

function removeWatchList() {
    dataId = $(this).attr('data-id');
    
    ajax(
        'POST',
        'removeWatchList',
        dataId,
        '',
        '',
        $('.removeWatchList').removeClass('removeWatchList').addClass('addWatchList')
    );
}

function addWatchListIndex() {
    var $this = $(this);
    dataId = $(this).attr('data-id');

    var request = new XMLHttpRequest();
    var url = ajaxFile + '?ajaxAction=addWatchList&ajaxId=' + dataId;
    
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

function removeWatchListIndex() {
    var $this = $(this);
    dataId = $(this).attr('data-id');

    var request = new XMLHttpRequest();
    var url = ajaxFile + '?ajaxAction=removeWatchList&ajaxId=' + dataId;
    
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

function followUser() {
    var button = $(this);

    var request = new XMLHttpRequest();

    request.open('POST', ajaxFile + '?ajaxAction=follow&ajaxId=' + $(button).attr('data-id'));

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

function unfollowUser() {
    var button = $(this);

    var request = new XMLHttpRequest();

    request.open('POST', ajaxFile + '?ajaxAction=unfollow&ajaxId=' + $(button).attr('data-id'));

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

function makeComment() {
    var comment = $("#commentInput").val();
    var checkComment = comment.trim();
    
    if(checkComment == '') {
        alert('Type a comment');
    }
    else {
        var $this = $(this);

        var request = new XMLHttpRequest();

        request.open('POST', ajaxFile + '?ajaxAction=makeComment&ajaxId=' + $this.attr('data-id'));
        
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        request.onerror = function() {
            alert("Comment not made");
        };

        request.onload = function() {
            $('#commentsDiv #commentFormDiv').remove();
            $('#commentsDiv').prepend('<div id="userComment"><img src="' + baseUrl + 'images/user/' + $this.attr('data-userid') + '/profile.jpg"/><div id="rightDiv"><div id="commentSpanDiv"><span id="commentSpan">' + comment + '</span></div><div id="commentOptionsDiv"><div id="buttonEdit" class="button" data-id="' + $this.attr('data-id') + '"></div><div id="buttonDelete" class="button" data-userid="' + $this.attr('data-userid') + '" data-id="' + $this.attr('data-id') + '"></div></div></div></div>');
            $('#userComment').on('click', '#buttonDelete', deleteComment);
        };

        request.send("comment=" + comment);
    }
}

function editComment() {
    alert('Comming soon');
}

function deleteComment() {
    var $this = $(this);

    var request = new XMLHttpRequest();

    request.open('POST', ajaxFile + '?ajaxAction=deleteComment&ajaxId=' + $this.attr('data-id'));

    request.onerror = function() {
        alert("Comment not deleted");
    };

    request.onload = function() {
        $('#commentsDiv #userComment').remove();
        $('#commentsDiv').prepend('<div id="commentFormDiv"><textarea cols="10" rows="3" max-cols="10" id="commentInput" placeholder="Leave your comment"></textarea><div id="buttonsDiv"><button id="commentSubmit" data-userid="' + $this.attr('data-userid') + '" data-id="' + $this.attr('data-id') + '" disabled="disabled">Comentar</button></div></div>');
        $('#commentFormDiv').on('click', '#commentSubmit', makeComment);
        
        disableEnable();
    };

    request.send();
}

function showDetails(event) {
	event.preventDefault();
    contentLink = $(this).find('.contentLink').attr('href');

    var allcontainerDiv = $('.contentContainer .titleDetailsOpen');
    var allcontentDiv = $('.contentContainer .contentDiv .contentOpen');
    
    var contentDiv = $(this);//content
    var parentDiv = contentDiv.parent();//contentGroup
    var containerDiv = parentDiv.parent().parent();//contentContainer

    allcontainerDiv.find('.sectionContent article').remove();

    allcontainerDiv.removeClass('titleDetailsOpen').addClass('titleDetails');
    allcontentDiv.removeClass('contentOpen').addClass('content');
    $(this).removeClass('content').addClass('contentOpen');
    
    containerDiv.find('.titleDetails').removeClass('titleDetails').addClass('titleDetailsOpen');
    
    if(parentDiv.attr('class') == 'contentGroup') {
        $('html, body').animate({
            scrollTop: containerDiv.find('.titleDetailsOpen').offset().top - 150
        },500);
    }
	getPage(contentLink, "body=yes", function(data) {
        $('.titleDetailsOpen').find('.sectionContent').html(data);
    });
}

function closeDetails() {
	var containerDiv = $(this).parent().parent().parent();//contentContainer
	var allcontainerDiv = $('.contentContainer .titleDetailsOpen');
	var allcontentDiv = $('.contentContainer .contentDiv div');
	var offsetDetailsDiv = containerDiv.offset().top;
	
	$('html, body').animate({
		scrollTop: offsetDetailsDiv
	},500, function() {
		allcontainerDiv.removeClass('titleDetailsOpen').addClass('titleDetails');
        $('.titleDetails').find('.sectionContent article').remove();
        $('.titleDetailsOpen').find('.sectionContent article').remove();
		allcontentDiv.find('.contentOpen').removeClass('contentOpen').addClass('content');
	});
}