/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

export class Comments extends Ajax {
    makeComment():void {
        var comment = $("#commentInput").val();
        var checkComment = (comment as any).trim();
        
        if(checkComment == '') {
            alert('Type a comment');
        }
        else {
            var $this = $(this);

            var request = new XMLHttpRequest();

            request.open('POST', this.ajaxFile + '?ajaxAction=makeComment&ajaxId=' + $this.attr('data-id'));
            
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            request.onerror = function() {
                alert("Comment not made");
            };

            request.onload = function() {
                $('#commentsDiv #commentFormDiv').remove();
                $('#commentsDiv').prepend('<div id="userComment"><img src="' + baseUrl + 'images/user/' + $this.attr('data-userid') + '/profile.jpg"/><div id="rightDiv"><div id="commentSpanDiv"><span id="commentSpan">' + comment + '</span></div><div id="commentOptionsDiv"><div id="buttonEdit" class="button" data-id="' + $this.attr('data-id') + '"></div><div id="buttonDelete" class="button" data-userid="' + $this.attr('data-userid') + '" data-id="' + $this.attr('data-id') + '"></div></div></div></div>');
                $('#userComment').on('click', '#buttonDelete', this.deleteComment());
            };

            request.send("comment=" + comment);
        }
    }

    editComment():void {
        alert('Comming soon');
    }

    deleteComment():void {
        var $this = $(this);

        var request = new XMLHttpRequest();

        request.open('POST', this.ajaxFile + '?ajaxAction=deleteComment&ajaxId=' + $this.attr('data-id'));

        request.onerror = function() {
            alert("Comment not deleted");
        };

        request.onload = function() {
            $('#commentsDiv #userComment').remove();
            $('#commentsDiv').prepend('<div id="commentFormDiv"><textarea cols="10" rows="3" max-cols="10" id="commentInput" placeholder="Leave your comment"></textarea><div id="buttonsDiv"><button id="commentSubmit" data-userid="' + $this.attr('data-userid') + '" data-id="' + $this.attr('data-id') + '" disabled="disabled">Comentar</button></div></div>');
            $('#commentFormDiv').on('click', '#commentSubmit', this.makeComment());
            
            this.disableEnable();
        };

        request.send();
    }
}