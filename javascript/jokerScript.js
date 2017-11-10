var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
var baseUrl = $('head').attr('data-url');
var cookieId = $('head').attr('data-cookie');
//var intervalLogoff:number = setInterval(userScript.secureLogoff(baseUrl), 250); 
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
var Ajax = /** @class */ (function () {
    function Ajax() {
        this.ajaxFile = 'ajax/ajaxRequisitions.php';
    }
    //function for simple ajax, without sent and received datas, if you want to receive and/or send datas, create anoter one
    Ajax.prototype.changeUrl = function (url) {
        history.pushState({}, '', url);
    };
    Ajax.prototype.getPage = function (page, parameters, callback) {
        var request = new XMLHttpRequest();
        request.open('POST', page, true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.onprogress = function (e) {
            $('.ajaxReplace').addClass('loading');
            var percent = (e.loaded / e.total) * 100;
            $('.loading:before').css({
                width: percent + '%'
            });
        };
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                callback(request.response);
            }
            else {
                alert('Unexpected status code ' + request.status + ' for ' + page);
                return false;
            }
        };
        request.onerror = function () {
            callback('error before seding');
        };
        request.send(parameters);
    };
    Ajax.prototype.ajax = function (method, action, dataId, before, notDone, done) {
        var request = new XMLHttpRequest();
        var url = this.ajaxFile + '?ajaxAction=' + action + '&ajaxId=' + dataId;
        request.onerror = function () {
            notDone;
        };
        request.open(method, url);
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                done;
            }
            else {
                notDone;
            }
        };
        request.send();
    };
    return Ajax;
}());
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
var Details = /** @class */ (function (_super) {
    __extends(Details, _super);
    function Details() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Details.prototype.showDetails = function (event) {
        event.preventDefault();
        var contentLink = $(this).find('.contentLink').attr('href');
        var contentLinkToBack = $(this).find('.contentLink').attr('data-url');
        var contentTitleToBack = $(this).find('.contentLink').attr('data-title');
        $('.closeButton').attr('data-url', contentLinkToBack);
        $('.closeButton').attr('data-title', contentTitleToBack);
        var allcontainerDiv = $('.contentContainer .titleDetailsOpen');
        var allcontentDiv = $('.contentContainer .contentDiv .contentOpen');
        var contentDiv = $(this); //content
        var parentDiv = contentDiv.parent(); //contentGroup
        var containerDiv = parentDiv.parent().parent(); //contentContainer
        allcontainerDiv.find('.sectionContent article').remove();
        allcontainerDiv.removeClass('titleDetailsOpen').addClass('titleDetails');
        allcontentDiv.removeClass('contentOpen').addClass('content');
        $(this).removeClass('content').addClass('contentOpen');
        containerDiv.find('.titleDetails').removeClass('titleDetails').addClass('titleDetailsOpen');
        if (parentDiv.attr('class') == 'contentGroup') {
            $('html, body').animate({
                scrollTop: containerDiv.find('.titleDetailsOpen').offset().top - 150
            }, 500);
        }
        this.getPage(contentLink, "body=true", function (data) {
            var filter = $(data).children();
            //console.log(data);
            $('.titleDetailsOpen').find('.sectionContent').html(filter);
            this.changeUrl(contentLink);
        });
    };
    Details.prototype.closeDetails = function () {
        var containerDiv = $(this).parent().parent().parent(); //contentContainer
        var allcontainerDiv = $('.contentContainer .titleDetailsOpen');
        var allcontentDiv = $('.contentContainer .contentDiv div');
        var offsetDetailsDiv = containerDiv.offset().top;
        var linkToBack = $(this).attr('data-url');
        var titleToBack = $(this).attr('data-title');
        $('html, body').animate({
            scrollTop: offsetDetailsDiv
        }, 500, function () {
            allcontainerDiv.removeClass('titleDetailsOpen').addClass('titleDetails');
            $('.titleDetails').find('.sectionContent article').remove();
            $('.titleDetailsOpen').find('.sectionContent article').remove();
            allcontentDiv.find('.contentOpen').removeClass('contentOpen').addClass('content');
            this.changeUrl(linkToBack);
            $('title').empty().text(titleToBack);
        });
    };
    return Details;
}(Ajax));
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
var Comments = /** @class */ (function (_super) {
    __extends(Comments, _super);
    function Comments() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Comments.prototype.makeComment = function () {
        var comment = $("#commentInput").val();
        var checkComment = comment.trim();
        if (checkComment == '') {
            alert('Type a comment');
        }
        else {
            var $this = $(this);
            var request = new XMLHttpRequest();
            request.open('POST', this.ajaxFile + '?ajaxAction=makeComment&ajaxId=' + $this.attr('data-id'));
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.onerror = function () {
                alert("Comment not made");
            };
            request.onload = function () {
                $('#commentsDiv #commentFormDiv').remove();
                $('#commentsDiv').prepend('<div id="userComment"><img src="' + baseUrl + 'images/user/' + $this.attr('data-userid') + '/profile.jpg"/><div id="rightDiv"><div id="commentSpanDiv"><span id="commentSpan">' + comment + '</span></div><div id="commentOptionsDiv"><div id="buttonEdit" class="button" data-id="' + $this.attr('data-id') + '"></div><div id="buttonDelete" class="button" data-userid="' + $this.attr('data-userid') + '" data-id="' + $this.attr('data-id') + '"></div></div></div></div>');
                $('#userComment').on('click', '#buttonDelete', this.deleteComment());
            };
            request.send("comment=" + comment);
        }
    };
    Comments.prototype.editComment = function () {
        alert('Comming soon');
    };
    Comments.prototype.deleteComment = function () {
        var $this = $(this);
        var request = new XMLHttpRequest();
        request.open('POST', this.ajaxFile + '?ajaxAction=deleteComment&ajaxId=' + $this.attr('data-id'));
        request.onerror = function () {
            alert("Comment not deleted");
        };
        request.onload = function () {
            $('#commentsDiv #userComment').remove();
            $('#commentsDiv').prepend('<div id="commentFormDiv"><textarea cols="10" rows="3" max-cols="10" id="commentInput" placeholder="Leave your comment"></textarea><div id="buttonsDiv"><button id="commentSubmit" data-userid="' + $this.attr('data-userid') + '" data-id="' + $this.attr('data-id') + '" disabled="disabled">Comentar</button></div></div>');
            $('#commentFormDiv').on('click', '#commentSubmit', this.makeComment());
            this.disableEnable();
        };
        request.send();
    };
    return Comments;
}(Ajax));
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
var Follow = /** @class */ (function (_super) {
    __extends(Follow, _super);
    function Follow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Follow.prototype.followUser = function () {
        var button = $(this);
        var request = new XMLHttpRequest();
        request.open('POST', this.ajaxFile + '?ajaxAction=follow&ajaxId=' + $(button).attr('data-id'));
        request.onerror = function () {
            alert('Error');
        };
        request.onload = function () {
            var data = JSON.parse(this.responseText);
            $(button).attr("id", data.change);
            $(button).find(".buttonSpan").html(data.write);
        };
        request.send();
    };
    Follow.prototype.unfollowUser = function () {
        var button = $(this);
        var request = new XMLHttpRequest();
        request.open('POST', this.ajaxFile + '?ajaxAction=unfollow&ajaxId=' + $(button).attr('data-id'));
        request.onerror = function () {
            alert('Error');
        };
        request.onload = function () {
            var data = JSON.parse(this.responseText);
            $(button).attr("id", data.change);
            $(button).find(".buttonSpan").html(data.write);
        };
        request.send();
    };
    Follow.prototype.ajaxLink = function (event, url) {
        event.preventDefault();
        if (url != undefined) {
            var linkTo = url;
        }
        else {
            var linkTo = $(this).attr('href');
        }
        $(document).off('scroll');
        this.getPage(linkTo, "body=true", function (data) {
            //console.log(data);
            //$('.ajaxReplace').removeClass('loading');
            $('.ajaxReplace').html(data);
            $('html, body').animate({
                scrollTop: 0
            }, 500);
            this.changeUrl(linkTo);
            $('#menuBtInput').prop('checked', false);
            if (linkTo == baseUrl) {
                clearInterval(intervalId);
            }
        });
    };
    return Follow;
}(Ajax));
var Watchlist = /** @class */ (function () {
    function Watchlist() {
    }
    Watchlist.prototype.addWatchList = function () {
        var dataId = $(this).attr('data-id');
        this.ajax('POST', 'addWatchList', dataId, '', '', $('.addWatchList').removeClass('addWatchList').addClass('removeWatchList'));
    };
    Watchlist.prototype.removeWatchList = function () {
        var dataId = $(this).attr('data-id');
        this.ajax('POST', 'removeWatchList', dataId, '', '', $('.removeWatchList').removeClass('removeWatchList').addClass('addWatchList'));
    };
    Watchlist.prototype.addWatchListIndex = function () {
        var $this = $(this);
        var dataId = $(this).attr('data-id');
        var request = new XMLHttpRequest();
        var url = this.ajaxFile + '?ajaxAction=addWatchList&ajaxId=' + dataId;
        request.onerror = function () {
            alert('Error');
        };
        request.open('POST', url);
        request.onload = function () {
            var data = JSON.parse(this.responseText);
            if (request.status >= 200 && request.status < 400) {
                if ($('#watchListDiv').length == false) {
                    $('.mainSection').prepend('<article id="watchListDiv" class="contentContainer"><p class="contentDivHeader">' + data.title + '</p><div class="contentDiv"><div class="contentGroupScroll"></div></div></article>');
                }
                if ($this.attr('data-type') == 'movie') {
                    var linkType = 'movies';
                }
                else if ($this.attr('data-type') == 'serie') {
                    var linkType = 'series';
                }
                $this.removeClass('addWatchList').addClass('removeWatchList');
                $('#watchListDiv .contentGroupScroll').prepend('<div class="content" data-id="' + $this.attr('data-id') + '"><a class="contentLink" href="' + baseUrl + 'title?id=' + $this.attr('data-id') + '"><figure class="contentFigure"><img src="/joker/images/media/' + linkType + '/' + $this.attr('data-id') + '/image.jpg"/><figcaption></figcaption></figure></a><div class="removeWatchList" data-type="' + linkType + '" data-id="' + $this.attr('data-id') + '"></div></div>');
                $('.contentDiv div .addWatchList[data-id="' + $this.attr('data-id') + '"]').removeClass('addWatchList').addClass('removeWatchList');
                $('#imageDiv div span[data-id="' + $this.attr('data-id') + '"]').removeClass('addWatchList').addClass('removeWatchList');
                $('#contentSortcuts').find('.addWatchList').removeClass('addWatchList').addClass('removeWatchList');
            }
            else {
                alert('Error');
            }
        };
        request.send();
    };
    Watchlist.prototype.removeWatchListIndex = function () {
        var $this = $(this);
        var dataId = $(this).attr('data-id');
        var request = new XMLHttpRequest();
        var url = this.ajaxFile + '?ajaxAction=removeWatchList&ajaxId=' + dataId;
        request.onerror = function () {
            alert('Error');
        };
        request.open('POST', url);
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                $('#watchListDiv div[data-id="' + $this.attr('data-id') + '"]').remove();
                $('.contentDiv div .removeWatchList[data-id="' + $this.attr('data-id') + '"]').removeClass('removeWatchList').addClass('addWatchList');
                $('#imageDiv span[data-id="' + $this.attr('data-id') + '"]').removeClass('removeWatchList').addClass('addWatchList');
                $('#contentSortcuts').find('.removeWatchList').removeClass('removeWatchList').addClass('addWatchList');
                if ($.trim($('#watchListDiv .contentGroupScroll').html()) == '') {
                    $('#watchListDiv').remove();
                }
            }
            else {
                alert('Error');
            }
        };
        request.send();
    };
    return Watchlist;
}());
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
var Login = /** @class */ (function () {
    function Login() {
    }
    Login.prototype.inputError = function (parentDiv) {
        $(parentDiv).on('focusout', '.inputText', function () {
            if ($(this).val().length < 1) {
                $(this).removeClass('inputText').addClass('inputTextError');
            }
        });
        $(parentDiv).on('focusout', '.inputTextError', function () {
            if ($(this).val().length >= 1) {
                $(this).removeClass('inputTextError').addClass('inputText');
            }
        });
    };
    Login.prototype.secureLogoff = function (url) {
        if (!document.cookie.match('login')) {
            location.replace(url + 'logoff');
        }
    };
    return Login;
}());
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
var Parallax = /** @class */ (function () {
    function Parallax() {
    }
    //Effect of external index
    Parallax.prototype.parallaxHome = function () {
        var parallaxIn = '#descImage > img';
        var parallaxOut = '#contentSlider > article > div > img';
        if ($(this).scrollTop() < 450) {
            //$(parallaxIn).css("top" , (window.pageYOffset / 2) + 'px');
            $(parallaxOut).css("top", (window.pageYOffset / 2) + 'px');
        }
    };
    Parallax.prototype.parallaxHeaderUser = function () {
        //Effect of header of profile page
        var imgDiv = $('#userHeaderImg');
        if ($(this).scrollTop() < 210) {
            $(imgDiv).css("top", (window.pageYOffset / 2.6) + 'px');
        }
        //Change class of header of profile page
        var userHeader = $('#userHeader');
        var userHeaderImg = $('#userHeaderImg');
        if ($(this).scrollTop() >= 210) {
            userHeader.removeClass('userHeader');
            userHeader.addClass('userHeaderFixed');
            userHeaderImg.removeClass('userHeaderImg');
            userHeaderImg.addClass('userHeaderImgFixed');
        }
        else {
            userHeader.removeClass('userHeaderFixed');
            userHeader.addClass('userHeader');
            userHeaderImg.removeClass('userHeaderImgFixed');
            userHeaderImg.addClass('userHeaderImg');
        }
    };
    Parallax.prototype.parallaxImg = function () {
        //Effect of user image of profile page
        var img = document.getElementById('userImgFigure');
        if ($(this).scrollTop() < 210) {
            img.style.width = (150 - $(this).scrollTop() / 2.1) + 'px';
            img.style.height = (150 - $(this).scrollTop() / 2.1) + 'px';
            img.style.left = (0 + $(this).scrollTop() / 4.2) + 'px';
            img.style.top = (-120 + $(this).scrollTop() / 5.2) + 'px';
        }
        //Change class of user image of profile page
        var userImg = $('#userImgFigure');
        if ($(this).scrollTop() >= 210) {
            userImg.removeClass('userImgFigure');
            userImg.addClass('userImgFigureFixed');
        }
        else {
            userImg.removeClass('userImgFigureFixed');
            userImg.addClass('userImgFigure');
        }
    };
    Parallax.prototype.parallaxName = function () {
        //Effect of user name of profile page
        var name = document.getElementById('userNameDiv');
        if ($(this).scrollTop() < 210) {
            name.style.left = (220 - $(this).scrollTop() / 3.75) + 'px';
        }
        //Change class of user name div
        var userName = $('#userNameDiv');
        if ($(this).scrollTop() >= 210) {
            userName.removeClass('userNameDiv');
            userName.addClass('userNameDivFixed');
        }
        else {
            userName.removeClass('userNameDivFixed');
            userName.addClass('userNameDiv');
        }
    };
    Parallax.prototype.posterParalax = function (image) {
        var $poster = $(image);
        var $shine = $poster.find('.shine');
        var $layer = $poster.find('*[class*="layer-"]');
        var w = $poster.width();
        var h = $poster.height();
        $poster.on('mousemove', function (e) {
            $('.mainSection').css({
                'transform-style': 'preserve-3d',
                'transform': 'perspective(1000px)'
            }),
                $('#imageBack').css({
                    'top': '0'
                });
            //var offsetX = 0.5 - e.pageX / w; // cursor hor
            //var offsetY = 0.5 - e.pageY / h; // cursor vert
            var offsetX = 0.5 - e.pageX / w; // cursor hor
            var offsetY = 0.5 - e.pageY / h; // cursor vert
            var dx = e.pageX - w / 2; // poster center hor
            var dy = e.pageY - h / 2; // poster center vert
            var theta = Math.atan2(dy, dx); // angle b/w cursor and poster center in RAD
            var angle = theta * 180 / Math.PI - 90; // convert rad to degrees
            var offsetPoster = $poster.data('offset');
            var transformPoster = 'translateY(' + -offsetX * offsetPoster + 'px) rotateX(' + (-offsetY * offsetPoster) + 'deg) rotateY(' + (offsetX * (offsetPoster * 2)) + 'deg)';
            $poster.css('transform', transformPoster);
            if (angle < 0) {
                angle = angle + 360;
            }
            $shine.css('background', 'linear-gradient(' + angle + 'deg, rgba(0, 0, 0,' + e.pageY / h + ') 0%,rgba(0, 0, 0, 0) 80%)');
            $layer.each(function () {
                var $this = $(this);
                var offsetLayer = $this.data('offset') || 0;
                var transformLayer = 'translateX(' + offsetX * offsetLayer + 'px) translateY(' + offsetY * offsetLayer + 'px)';
                $this.css('transform', transformLayer);
            });
        });
    };
    return Parallax;
}());
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
var Slide = /** @class */ (function () {
    function Slide() {
    }
    Slide.prototype.slideIndex = function () {
        if ($(this).scrollTop() < 200) {
            if ($('.imageShow').next().size()) {
                $('.imageShow').removeClass('imageShow').addClass('imageHide').next().removeClass('imageHide').addClass('imageShow');
            }
            else {
                $('.imageShow').removeClass('imageShow').addClass('imageHide');
                $('#contentSlider #imageDiv div:nth-of-type(1)').removeClass('imageHide').addClass('imageShow');
            }
            if ($('.changeShow').next().size()) {
                $('.changeShow').removeClass('changeShow').addClass('changeHide').next().removeClass('changeHide').addClass('changeShow');
            }
            else {
                $('.changeShow').removeClass('changeShow').addClass('changeHide');
                $('#contentSlider #changeDiv div:nth-of-type(1)').removeClass('changeHide').addClass('changeShow');
            }
        }
    };
    Slide.prototype.changeIndex = function (slider) {
        //Index buttons
        $(slider).on('click', '.changeHide', function () {
            clearInterval(intervalId);
            $('.changeShow').removeClass('changeShow').addClass('changeHide');
            $(this).removeClass('changeHide').addClass('changeShow');
            var indice = $(this).index();
            indice++;
            $('#imageDiv .imageShow').removeClass('imageShow').addClass('imageHide');
            $('#imageDiv div:nth-of-type(' + indice + ')').removeClass('imageHide').addClass('imageShow');
        });
        //Previous button
        $(slider).on('click', '#previousImage', function () {
            clearInterval(intervalId);
            if ($('.imageShow').prev().size()) {
                $('.imageShow').removeClass('imageShow').addClass('imageHide').prev().removeClass('imageHide').addClass('imageShow');
            }
            else {
                $('.imageShow').removeClass('imageShow').addClass('imageHide');
                $('#contentSlider #imageDiv div:last-child').removeClass('imageHide').addClass('imageShow');
            }
            var indice = $(this).parent().find('#imageDiv .imageShow').index('#imageDiv div');
            indice++;
            $('#changeDiv div').removeClass('changeShow').addClass('changeHide');
            $('#changeDiv div:nth-of-type(' + indice + ')').removeClass('changeHide').addClass('changeShow');
        });
        //Next button
        $(slider).on('click', '#nextImage', function () {
            clearInterval(intervalId);
            if ($('.imageShow').next().size()) {
                $('.imageShow').removeClass('imageShow').addClass('imageHide').next().removeClass('imageHide').addClass('imageShow');
            }
            else {
                $('.imageShow').removeClass('imageShow').addClass('imageHide');
                $('#contentSlider #imageDiv div:nth-of-type(1)').removeClass('imageHide').addClass('imageShow');
            }
            var indice = $(this).parent().find('#imageDiv .imageShow').index('#imageDiv div');
            indice++;
            $('#changeDiv div').removeClass('changeShow').addClass('changeHide');
            $('#changeDiv div:nth-of-type(' + indice + ')').removeClass('changeHide').addClass('changeShow');
        });
    };
    return Slide;
}());
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
var UserOthers = /** @class */ (function () {
    function UserOthers() {
    }
    /**
     * hide the replies
     */
    UserOthers.prototype.hideReply = function (div) {
        $(div).on("click", ".noHide", function () {
            $(this).removeClass("noHide").addClass("hide");
        })
            .on("click", ".hide", function () {
            $(this).removeClass("hide").addClass("noHide");
        });
    };
    //Close Message
    UserOthers.prototype.closeMessage = function (errorDiv, errorBtn) {
        $(errorDiv).on("click", errorBtn, function () {
            $(this).parent().remove();
            //location.href = history.go(-1);
        });
    };
    //Tab Select
    UserOthers.prototype.tabSelect = function (IsScroll) {
        var scroll = IsScroll ? IsScroll : false;
        $("#tabHeader").on("click", ".tab", function () {
            $("#tabHeader .tabSelected").removeClass("tabSelected").addClass("tab");
            $(this).removeClass("tab").addClass("tabSelected");
            var indice = $(this).index();
            indice++;
            $("#tabContents .contentShow").removeClass('contentShow').addClass('contentHide');
            $("#tabContents .contentHide:nth-of-type(" + indice + ")").removeClass('contentHide').addClass('contentShow');
        })
            .on('click', 'div', function (event) {
            if (scroll == true) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: 450
                }, 500);
            }
        });
    };
    //Episode Select
    UserOthers.prototype.episodeSelect = function (episodeSlider) {
        $(episodeSlider).on("click", ".seasonSelect .seasonSpan", function () {
            $("#seasonSelect").removeClass("seasonSelect").addClass("seasonSelectOpen");
            $(".seasonHide").removeClass("seasonHide").addClass("seasonShow");
        })
            .on("click", ".seasonSelectOpen .seasonSpan", function () {
            $("#seasonSelect").removeClass("seasonSelectOpen").addClass("seasonSelect");
            $(".seasonShow").removeClass("seasonShow").addClass("seasonHide");
            var indice = $(this).parent();
            indice.removeClass("seasonHide").addClass("seasonShow");
            var indiceShow = $(this).parent().index();
            indiceShow++;
            $("#episodeDiv .seasonGroupShow").removeClass("seasonGroupShow").addClass("seasonGroupHide");
            $("#episodeDiv .contentGroup:nth-of-type(" + indiceShow + ")").removeClass("seasonGroupHide").addClass("seasonGroupShow");
            if ($("#episodeDiv .contentGroup:nth-of-type(" + indiceShow + ")").width() > $("#episodeDiv").width()) {
                $("#episodeDiv").find('.nextHide').removeClass('nextHide').addClass('nextShow');
            }
            else {
                $("#episodeDiv").find('.nextShow').removeClass('nextShow').addClass('nextHide');
            }
        });
        //Episode Select Close
        $(episodeSlider).on("mouseleave", ".seasonSelectOpen", function () {
            var indexClose = $("#episodeDiv .seasonGroupShow").index();
            indexClose++;
            $("#seasonSelect").removeClass("seasonSelectOpen").addClass("seasonSelect");
            $(".seasonShow").removeClass("seasonShow").addClass("seasonHide");
            $(".seasonHide:nth-of-type(" + indexClose + ")").removeClass("seasonHide").addClass("seasonShow");
        });
    };
    UserOthers.prototype.disableEnable = function () {
        $("#commentInput").keyup(function () {
            var commentBefore = $(this).val();
            var checkCommentBefore = commentBefore.trim();
            if (checkCommentBefore == '') {
                //$('#commentSubmit').attr('disabled', true);
                $('#commentSubmit').attr('disabled');
            }
            else {
                $('#commentSubmit').removeAttr('disabled');
            }
        });
    };
    return UserOthers;
}());
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
var AdminMenu = /** @class */ (function () {
    function AdminMenu() {
    }
    //Set the menu open and close
    AdminMenu.prototype.toggleMenu = function (header) {
        $(header).on("click", ".closeMenu", function () {
            $(this).removeClass("closeMenu").addClass("openMenu");
            $(".menuOpened").removeClass("menuOpened").addClass("menuClosed");
            $("section[id$='Interface']").removeClass("bodyMenuOpened").addClass("bodyMenuClosed");
        });
        $(header).on("click", ".openMenu", function () {
            $(this).removeClass("openMenu").addClass("closeMenu");
            $(".menuClosed").removeClass("menuClosed").addClass("menuOpened");
            $("section[id$='Interface']").removeClass("bodyMenuClosed").addClass("bodyMenuOpened");
        });
    };
    //Menu accordion
    AdminMenu.prototype.menuAccordion = function (menu) {
        $(menu).find("#ulMenu > .itemMenu > .subMenuItems").hide();
        $(menu).on("click", "#ulMenu .itemMenuOpen", function () {
            $(this).find(".subMenuItems").slideUp("normal");
            $(this).removeClass("itemMenuOpen").addClass("itemMenuClose");
        });
        $(menu).on("click", "#ulMenu .itemMenuClose", function () {
            $("#ulMenu > li").find(".subMenuItems").slideUp("normal");
            $("#ulMenu > li").next().removeClass("itemMenuOpen").addClass("itemMenuClose");
            $(this).removeClass("itemMenuClose").addClass("itemMenuOpen");
            $(this).find(".subMenuItems").slideDown("normal");
        });
    };
    return AdminMenu;
}());
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
var AdminOthers = /** @class */ (function () {
    function AdminOthers() {
    }
    //Show the advanced options
    AdminOthers.prototype.advancedOptions = function (button, show) {
        $(button).on("click", ".searchAdvancedClose", function () {
            $(this).removeClass("searchAdvancedClose").addClass("searchAdvancedOpen");
            $(show).removeClass("advancedSearchHide").addClass("advancedSearchShow");
        });
        $(button).on("click", ".searchAdvancedOpen", function () {
            $(this).removeClass("searchAdvancedOpen").addClass("searchAdvancedClose");
            $(show).removeClass("advancedSearchShow").addClass("advancedSearchHide");
        });
    };
    //Upload
    AdminOthers.prototype.showSelectedFile = function (div) {
        $(div).on('change', '.inputImage', function () {
            var $this = $(this);
            var files = $this.prop('files');
            var fileReader = new FileReader();
            fileReader.addEventListener('load', function () {
                var imageSelected = fileReader.result;
                $this.next('.fileInputLabel').removeClass('fileInputLabel').addClass('selectedInputLabel');
                $this.next('.selectedInputLabel').find('img').attr('src', imageSelected);
            });
            fileReader.readAsDataURL(files[0]);
        })
            .on('change', '.inputVideo', function () {
            var $this = $(this);
            var files = $this.prop('files');
            var fileReader = new FileReader();
            var blob = new Blob([files[0]], { type: files.type });
            var video = document.getElementById("selectedVideo");
            var url = (URL || webkitURL).createObjectURL(blob);
            video.src = url;
            fileReader.readAsArrayBuffer(files[0]);
        });
    };
    return AdminOthers;
}());
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
//Change class of header of all page
$(document).ready(function () {
    $(window).on('scroll', function () {
        var topDiv = $('#topDiv');
        if ($(this).scrollTop() >= 300) {
            topDiv.removeClass('topDiv').addClass('topDivFixed');
        }
        else {
            topDiv.removeClass('topDivFixed').addClass('topDiv');
        }
    });
    $('#footer').on("click", "#topDiv", function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });
});
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
$(document).ready(function () {
    var parallax = new Parallax();
    var slide = new Slide();
    var watchlist = new Watchlist();
    var details = new Details();
    var userOthers = new UserOthers();
    //Not connected
    $(this).on('scroll', function () {
        parallax.parallaxHome();
    });
    userOthers.tabSelect(true);
    //Connected
    if ($('#contentSlider #changeDiv').length) {
        var intervalId = setInterval(slide.slideIndex(), 5000);
        slide.changeIndex('#contentSlider');
    }
    $('#imageDiv div').on('click', '.addWatchList', watchlist.addWatchListIndex);
    $('#imageDiv div').on('click', '.removeWatchList', watchlist.removeWatchListIndex);
    $('.contentGroupScroll').on('click', '.content .addWatchList', watchlist.addWatchListIndex);
    $('.contentGroupScroll').on('click', '.content .removeWatchList', watchlist.removeWatchListIndex);
    //$('.contentGroupScroll').on('click', '.content', details.showDetails);
    //$('.contentContainer').on('click', '.closeButton', details.closeDetails);
});
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
$(document).ready(function () {
    //adminScript.toggleMenu("#header");
    //adminScript.menuAccordion(".menuOpened");
    //Dynamic minimum page height
    $("body > section").ready(function () {
        $(".interface").css('min-height', ($(document).height() - 70) + 'px');
    });
    $("#header").on('click', '#settingsOpen', function () {
        $('#configBar').toggleClass('configBarOpen');
    });
});
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
System.register("jokerScript", ["./config/config", "./classes/ajax/ajax.class", "./classes/ajax/details.class", "./classes/ajax/comments.class", "./classes/ajax/follow.class", "./classes/ajax/watchlist.class", "./classes/user/login.class", "./classes/user/parallax.class", "./classes/user/slide.class", "./classes/user/others.class", "./classes/admin/menu.class", "./classes/admin/others.class", "./events/all", "./events/index", "./events/admin"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (_1) {
            },
            function (_2) {
            },
            function (_3) {
            },
            function (_4) {
            },
            function (_5) {
            },
            function (_6) {
            },
            function (_7) {
            },
            function (_8) {
            },
            function (_9) {
            },
            function (_10) {
            },
            function (_11) {
            },
            function (_12) {
            },
            function (_13) {
            },
            function (_14) {
            },
            function (_15) {
            }
        ],
        execute: function () {/*
             ***************************************************************
             | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
             | @ Author	: Daniel Rios.
             ***************************************************************
            */
        }
    };
});
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
$(document).ready(function () {
    //Close the message displayed when has some error
    var others = new UserOthers();
    var login = new Login();
    login.inputError('.userDiv');
    others.closeMessage('.userError', '#errorMsgClose');
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cGVzY3JpcHQvY29uZmlnL2NvbmZpZy50cyIsInR5cGVzY3JpcHQvY2xhc3Nlcy9hamF4L2FqYXguY2xhc3MudHMiLCJ0eXBlc2NyaXB0L2NsYXNzZXMvYWpheC9kZXRhaWxzLmNsYXNzLnRzIiwidHlwZXNjcmlwdC9jbGFzc2VzL2FqYXgvY29tbWVudHMuY2xhc3MudHMiLCJ0eXBlc2NyaXB0L2NsYXNzZXMvYWpheC9mb2xsb3cuY2xhc3MudHMiLCJ0eXBlc2NyaXB0L2NsYXNzZXMvYWpheC93YXRjaGxpc3QuY2xhc3MudHMiLCJ0eXBlc2NyaXB0L2NsYXNzZXMvdXNlci9sb2dpbi5jbGFzcy50cyIsInR5cGVzY3JpcHQvY2xhc3Nlcy91c2VyL3BhcmFsbGF4LmNsYXNzLnRzIiwidHlwZXNjcmlwdC9jbGFzc2VzL3VzZXIvc2xpZGUuY2xhc3MudHMiLCJ0eXBlc2NyaXB0L2NsYXNzZXMvdXNlci9vdGhlcnMuY2xhc3MudHMiLCJ0eXBlc2NyaXB0L2NsYXNzZXMvYWRtaW4vbWVudS5jbGFzcy50cyIsInR5cGVzY3JpcHQvY2xhc3Nlcy9hZG1pbi9vdGhlcnMuY2xhc3MudHMiLCJ0eXBlc2NyaXB0L2V2ZW50cy9hbGwudHMiLCJ0eXBlc2NyaXB0L2V2ZW50cy9pbmRleC50cyIsInR5cGVzY3JpcHQvZXZlbnRzL2FkbWluLnRzIiwidHlwZXNjcmlwdC9qb2tlclNjcmlwdC50cyIsInR5cGVzY3JpcHQvZXZlbnRzL2xvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7RUFLRTtBQUVGLElBQUksT0FBTyxHQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDaEQsSUFBSSxRQUFRLEdBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUVwRCxpRkFBaUY7QUNWakY7Ozs7O0VBS0U7QUFFRjtJQUFBO1FBQ1csYUFBUSxH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LENBQUMsQ0FBQyxDQUFDO0FDdENIOzs7OztFQUtFO0FBRUYsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNkLG9DQUFvQztJQUNwQywyQ0FBMkM7SUFFM0MsNkJBQTZCO0lBRTdCLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUMzRSxDQUFDLENBQUMsQ0FBQztJQUNILENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRTtRQUN0QyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ2pELENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUM7QUNuQkg7Ozs7O0VBS0U7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OEJBTEY7Ozs7O2NBS0U7UUE4QnNCLENBQUM7OztBQ25DekI7Ozs7O0VBS0U7QUFFRixDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ2QsaURBQWlEO0lBRWpELElBQUksTUFBTSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7SUFDOUIsSUFBSSxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztJQUV4QixLQUFLLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzdCLE1BQU0sQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDeEQsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiam9rZXJTY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG52YXIgYmFzZVVybDpzdHJpbmcgPSAkKCdoZWFkJykuYXR0cignZGF0YS11cmwnKTtcbnZhciBjb29raWVJZDpzdHJpbmcgPSAkKCdoZWFkJykuYXR0cignZGF0YS1jb29raWUnKTtcblxuLy92YXIgaW50ZXJ2YWxMb2dvZmY6bnVtYmVyID0gc2V0SW50ZXJ2YWwodXNlclNjcmlwdC5zZWN1cmVMb2dvZmYoYmFzZVVybCksIDI1MCk7IiwiLypcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiB8IENvcHlyaWdodCAoYykgMjAxNC0yMDE1IEF0b21vLmNvbS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiB8IEAgQXV0aG9yXHQ6IERhbmllbCBSaW9zLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKi9cblxuY2xhc3MgQWpheCB7XG4gICAgcHVibGljIGFqYXhGaWxlOnN0cmluZyA9ICdhamF4L2FqYXhSZXF1aXNpdGlvbnMucGhwJztcbiAgICBcbiAgICAvL2Z1bmN0aW9uIGZvciBzaW1wbGUgYWpheCwgd2l0aG91dCBzZW50IGFuZCByZWNlaXZlZCBkYXRhcywgaWYgeW91IHdhbnQgdG8gcmVjZWl2ZSBhbmQvb3Igc2VuZCBkYXRhcywgY3JlYXRlIGFub3RlciBvbmVcblxuICAgIGNoYW5nZVVybCh1cmwpOnZvaWQge1xuICAgICAgICBoaXN0b3J5LnB1c2hTdGF0ZSh7fSwgJycsIHVybCk7XG4gICAgfVxuXG4gICAgZ2V0UGFnZShwYWdlOnN0cmluZywgcGFyYW1ldGVyczphbnksIGNhbGxiYWNrOmFueSk6dm9pZCB7XG4gICAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIFxuICAgICAgICByZXF1ZXN0Lm9wZW4oJ1BPU1QnLCBwYWdlLCB0cnVlKTtcbiAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC10eXBlXCIsIFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIpO1xuXG4gICAgICAgIHJlcXVlc3Qub25wcm9ncmVzcyA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgJCgnLmFqYXhSZXBsYWNlJykuYWRkQ2xhc3MoJ2xvYWRpbmcnKTtcbiAgICAgICAgICAgIHZhciBwZXJjZW50ID0gKGUubG9hZGVkIC8gZS50b3RhbCkgKiAxMDA7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICQoJy5sb2FkaW5nOmJlZm9yZScpLmNzcyh7XG4gICAgICAgICAgICAgICAgd2lkdGg6IHBlcmNlbnQgKyAnJSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPj0gMjAwICYmIHJlcXVlc3Quc3RhdHVzIDwgNDAwKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2socmVxdWVzdC5yZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydCgnVW5leHBlY3RlZCBzdGF0dXMgY29kZSAnICsgcmVxdWVzdC5zdGF0dXMgKyAnIGZvciAnICsgcGFnZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCdlcnJvciBiZWZvcmUgc2VkaW5nJyk7XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3Quc2VuZChwYXJhbWV0ZXJzKTtcbiAgICB9XG5cbiAgICBhamF4KG1ldGhvZDpzdHJpbmcsIGFjdGlvbjpzdHJpbmcsIGRhdGFJZCwgYmVmb3JlLCBub3REb25lLCBkb25lKTp2b2lkIHtcbiAgICAgICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgdmFyIHVybCA9IHRoaXMuYWpheEZpbGUgKyAnP2FqYXhBY3Rpb249JyArIGFjdGlvbiArICcmYWpheElkPScgKyBkYXRhSWQ7XG4gICAgICAgIFxuICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG5vdERvbmU7XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3Qub3BlbihtZXRob2QsIHVybCk7XG4gICAgICAgIFxuICAgICAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID49IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyA8IDQwMCkge1xuICAgICAgICAgICAgICAgIGRvbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBub3REb25lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXF1ZXN0LnNlbmQoKTtcbiAgICB9XG59IiwiLypcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiB8IENvcHlyaWdodCAoYykgMjAxNC0yMDE1IEF0b21vLmNvbS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiB8IEAgQXV0aG9yXHQ6IERhbmllbCBSaW9zLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKi9cblxuY2xhc3MgRGV0YWlscyBleHRlbmRzIEFqYXgge1xuICAgIHNob3dEZXRhaWxzKGV2ZW50PzphbnkpOnZvaWQge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB2YXIgY29udGVudExpbmsgPSAkKHRoaXMpLmZpbmQoJy5jb250ZW50TGluaycpLmF0dHIoJ2hyZWYnKTtcbiAgICAgICAgdmFyIGNvbnRlbnRMaW5rVG9CYWNrID0gJCh0aGlzKS5maW5kKCcuY29udGVudExpbmsnKS5hdHRyKCdkYXRhLXVybCcpO1xuICAgICAgICB2YXIgY29udGVudFRpdGxlVG9CYWNrID0gJCh0aGlzKS5maW5kKCcuY29udGVudExpbmsnKS5hdHRyKCdkYXRhLXRpdGxlJyk7XG4gICAgICAgICQoJy5jbG9zZUJ1dHRvbicpLmF0dHIoJ2RhdGEtdXJsJywgY29udGVudExpbmtUb0JhY2spO1xuICAgICAgICAkKCcuY2xvc2VCdXR0b24nKS5hdHRyKCdkYXRhLXRpdGxlJywgY29udGVudFRpdGxlVG9CYWNrKTtcblxuICAgICAgICB2YXIgYWxsY29udGFpbmVyRGl2ID0gJCgnLmNvbnRlbnRDb250YWluZXIgLnRpdGxlRGV0YWlsc09wZW4nKTtcbiAgICAgICAgdmFyIGFsbGNvbnRlbnREaXYgPSAkKCcuY29udGVudENvbnRhaW5lciAuY29udGVudERpdiAuY29udGVudE9wZW4nKTtcbiAgICAgICAgXG4gICAgICAgIHZhciBjb250ZW50RGl2ID0gJCh0aGlzKTsvL2NvbnRlbnRcbiAgICAgICAgdmFyIHBhcmVudERpdiA9IGNvbnRlbnREaXYucGFyZW50KCk7Ly9jb250ZW50R3JvdXBcbiAgICAgICAgdmFyIGNvbnRhaW5lckRpdiA9IHBhcmVudERpdi5wYXJlbnQoKS5wYXJlbnQoKTsvL2NvbnRlbnRDb250YWluZXJcblxuICAgICAgICBhbGxjb250YWluZXJEaXYuZmluZCgnLnNlY3Rpb25Db250ZW50IGFydGljbGUnKS5yZW1vdmUoKTtcblxuICAgICAgICBhbGxjb250YWluZXJEaXYucmVtb3ZlQ2xhc3MoJ3RpdGxlRGV0YWlsc09wZW4nKS5hZGRDbGFzcygndGl0bGVEZXRhaWxzJyk7XG4gICAgICAgIGFsbGNvbnRlbnREaXYucmVtb3ZlQ2xhc3MoJ2NvbnRlbnRPcGVuJykuYWRkQ2xhc3MoJ2NvbnRlbnQnKTtcbiAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnY29udGVudCcpLmFkZENsYXNzKCdjb250ZW50T3BlbicpO1xuICAgICAgICBcbiAgICAgICAgY29udGFpbmVyRGl2LmZpbmQoJy50aXRsZURldGFpbHMnKS5yZW1vdmVDbGFzcygndGl0bGVEZXRhaWxzJykuYWRkQ2xhc3MoJ3RpdGxlRGV0YWlsc09wZW4nKTtcbiAgICAgICAgXG4gICAgICAgIGlmKHBhcmVudERpdi5hdHRyKCdjbGFzcycpID09ICdjb250ZW50R3JvdXAnKSB7XG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBjb250YWluZXJEaXYuZmluZCgnLnRpdGxlRGV0YWlsc09wZW4nKS5vZmZzZXQoKS50b3AgLSAxNTBcbiAgICAgICAgICAgIH0sNTAwKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdldFBhZ2UoY29udGVudExpbmssIFwiYm9keT10cnVlXCIsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciBmaWx0ZXI6YW55ID0gJChkYXRhKS5jaGlsZHJlbigpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICQoJy50aXRsZURldGFpbHNPcGVuJykuZmluZCgnLnNlY3Rpb25Db250ZW50JykuaHRtbChmaWx0ZXIpO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VVcmwoY29udGVudExpbmspO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjbG9zZURldGFpbHMoKTp2b2lkIHtcbiAgICAgICAgdmFyIGNvbnRhaW5lckRpdiA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkucGFyZW50KCk7Ly9jb250ZW50Q29udGFpbmVyXG4gICAgICAgIHZhciBhbGxjb250YWluZXJEaXYgPSAkKCcuY29udGVudENvbnRhaW5lciAudGl0bGVEZXRhaWxzT3BlbicpO1xuICAgICAgICB2YXIgYWxsY29udGVudERpdiA9ICQoJy5jb250ZW50Q29udGFpbmVyIC5jb250ZW50RGl2IGRpdicpO1xuICAgICAgICB2YXIgb2Zmc2V0RGV0YWlsc0RpdiA9IGNvbnRhaW5lckRpdi5vZmZzZXQoKS50b3A7XG4gICAgICAgIHZhciBsaW5rVG9CYWNrID0gJCh0aGlzKS5hdHRyKCdkYXRhLXVybCcpO1xuICAgICAgICB2YXIgdGl0bGVUb0JhY2sgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtdGl0bGUnKTtcblxuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICBzY3JvbGxUb3A6IG9mZnNldERldGFpbHNEaXZcbiAgICAgICAgfSw1MDAsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYWxsY29udGFpbmVyRGl2LnJlbW92ZUNsYXNzKCd0aXRsZURldGFpbHNPcGVuJykuYWRkQ2xhc3MoJ3RpdGxlRGV0YWlscycpO1xuICAgICAgICAgICAgJCgnLnRpdGxlRGV0YWlscycpLmZpbmQoJy5zZWN0aW9uQ29udGVudCBhcnRpY2xlJykucmVtb3ZlKCk7XG4gICAgICAgICAgICAkKCcudGl0bGVEZXRhaWxzT3BlbicpLmZpbmQoJy5zZWN0aW9uQ29udGVudCBhcnRpY2xlJykucmVtb3ZlKCk7XG4gICAgICAgICAgICBhbGxjb250ZW50RGl2LmZpbmQoJy5jb250ZW50T3BlbicpLnJlbW92ZUNsYXNzKCdjb250ZW50T3BlbicpLmFkZENsYXNzKCdjb250ZW50Jyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVXJsKGxpbmtUb0JhY2spO1xuICAgICAgICAgICAgJCgndGl0bGUnKS5lbXB0eSgpLnRleHQodGl0bGVUb0JhY2spO1xuICAgICAgICB9KTtcbiAgICB9XG59IiwiLypcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiB8IENvcHlyaWdodCAoYykgMjAxNC0yMDE1IEF0b21vLmNvbS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiB8IEAgQXV0aG9yXHQ6IERhbmllbCBSaW9zLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKi9cblxuY2xhc3MgQ29tbWVudHMgZXh0ZW5kcyBBamF4IHtcbiAgICBtYWtlQ29tbWVudCgpOnZvaWQge1xuICAgICAgICB2YXIgY29tbWVudCA9ICQoXCIjY29tbWVudElucHV0XCIpLnZhbCgpO1xuICAgICAgICB2YXIgY2hlY2tDb21tZW50ID0gKGNvbW1lbnQgYXMgYW55KS50cmltKCk7XG4gICAgICAgIFxuICAgICAgICBpZihjaGVja0NvbW1lbnQgPT0gJycpIHtcbiAgICAgICAgICAgIGFsZXJ0KCdUeXBlIGEgY29tbWVudCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcblxuICAgICAgICAgICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgICAgICAgcmVxdWVzdC5vcGVuKCdQT1NUJywgdGhpcy5hamF4RmlsZSArICc/YWpheEFjdGlvbj1tYWtlQ29tbWVudCZhamF4SWQ9JyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtdHlwZVwiLCBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiKTtcblxuICAgICAgICAgICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJDb21tZW50IG5vdCBtYWRlXCIpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkKCcjY29tbWVudHNEaXYgI2NvbW1lbnRGb3JtRGl2JykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgJCgnI2NvbW1lbnRzRGl2JykucHJlcGVuZCgnPGRpdiBpZD1cInVzZXJDb21tZW50XCI+PGltZyBzcmM9XCInICsgYmFzZVVybCArICdpbWFnZXMvdXNlci8nICsgJHRoaXMuYXR0cignZGF0YS11c2VyaWQnKSArICcvcHJvZmlsZS5qcGdcIi8+PGRpdiBpZD1cInJpZ2h0RGl2XCI+PGRpdiBpZD1cImNvbW1lbnRTcGFuRGl2XCI+PHNwYW4gaWQ9XCJjb21tZW50U3BhblwiPicgKyBjb21tZW50ICsgJzwvc3Bhbj48L2Rpdj48ZGl2IGlkPVwiY29tbWVudE9wdGlvbnNEaXZcIj48ZGl2IGlkPVwiYnV0dG9uRWRpdFwiIGNsYXNzPVwiYnV0dG9uXCIgZGF0YS1pZD1cIicgKyAkdGhpcy5hdHRyKCdkYXRhLWlkJykgKyAnXCI+PC9kaXY+PGRpdiBpZD1cImJ1dHRvbkRlbGV0ZVwiIGNsYXNzPVwiYnV0dG9uXCIgZGF0YS11c2VyaWQ9XCInICsgJHRoaXMuYXR0cignZGF0YS11c2VyaWQnKSArICdcIiBkYXRhLWlkPVwiJyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSArICdcIj48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAkKCcjdXNlckNvbW1lbnQnKS5vbignY2xpY2snLCAnI2J1dHRvbkRlbGV0ZScsIHRoaXMuZGVsZXRlQ29tbWVudCgpKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJlcXVlc3Quc2VuZChcImNvbW1lbnQ9XCIgKyBjb21tZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVkaXRDb21tZW50KCk6dm9pZCB7XG4gICAgICAgIGFsZXJ0KCdDb21taW5nIHNvb24nKTtcbiAgICB9XG5cbiAgICBkZWxldGVDb21tZW50KCk6dm9pZCB7XG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG5cbiAgICAgICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgICByZXF1ZXN0Lm9wZW4oJ1BPU1QnLCB0aGlzLmFqYXhGaWxlICsgJz9hamF4QWN0aW9uPWRlbGV0ZUNvbW1lbnQmYWpheElkPScgKyAkdGhpcy5hdHRyKCdkYXRhLWlkJykpO1xuXG4gICAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYWxlcnQoXCJDb21tZW50IG5vdCBkZWxldGVkXCIpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKCcjY29tbWVudHNEaXYgI3VzZXJDb21tZW50JykucmVtb3ZlKCk7XG4gICAgICAgICAgICAkKCcjY29tbWVudHNEaXYnKS5wcmVwZW5kKCc8ZGl2IGlkPVwiY29tbWVudEZvcm1EaXZcIj48dGV4dGFyZWEgY29scz1cIjEwXCIgcm93cz1cIjNcIiBtYXgtY29scz1cIjEwXCIgaWQ9XCJjb21tZW50SW5wdXRcIiBwbGFjZWhvbGRlcj1cIkxlYXZlIHlvdXIgY29tbWVudFwiPjwvdGV4dGFyZWE+PGRpdiBpZD1cImJ1dHRvbnNEaXZcIj48YnV0dG9uIGlkPVwiY29tbWVudFN1Ym1pdFwiIGRhdGEtdXNlcmlkPVwiJyArICR0aGlzLmF0dHIoJ2RhdGEtdXNlcmlkJykgKyAnXCIgZGF0YS1pZD1cIicgKyAkdGhpcy5hdHRyKCdkYXRhLWlkJykgKyAnXCIgZGlzYWJsZWQ9XCJkaXNhYmxlZFwiPkNvbWVudGFyPC9idXR0b24+PC9kaXY+PC9kaXY+Jyk7XG4gICAgICAgICAgICAkKCcjY29tbWVudEZvcm1EaXYnKS5vbignY2xpY2snLCAnI2NvbW1lbnRTdWJtaXQnLCB0aGlzLm1ha2VDb21tZW50KCkpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmRpc2FibGVFbmFibGUoKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXF1ZXN0LnNlbmQoKTtcbiAgICB9XG59IiwiLypcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiB8IENvcHlyaWdodCAoYykgMjAxNC0yMDE1IEF0b21vLmNvbS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiB8IEAgQXV0aG9yXHQ6IERhbmllbCBSaW9zLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKi9cblxuY2xhc3MgRm9sbG93IGV4dGVuZHMgQWpheCB7XG4gICAgZm9sbG93VXNlcigpOnZvaWQge1xuICAgICAgICB2YXIgYnV0dG9uID0gJCh0aGlzKTtcblxuICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICAgIHJlcXVlc3Qub3BlbignUE9TVCcsIHRoaXMuYWpheEZpbGUgKyAnP2FqYXhBY3Rpb249Zm9sbG93JmFqYXhJZD0nICsgJChidXR0b24pLmF0dHIoJ2RhdGEtaWQnKSk7XG5cbiAgICAgICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhbGVydCgnRXJyb3InKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2VUZXh0KTtcblxuICAgICAgICAgICAgJChidXR0b24pLmF0dHIoXCJpZFwiLCBkYXRhLmNoYW5nZSk7XG4gICAgICAgICAgICAkKGJ1dHRvbikuZmluZChcIi5idXR0b25TcGFuXCIpLmh0bWwoZGF0YS53cml0ZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVxdWVzdC5zZW5kKCk7XG4gICAgfVxuXG4gICAgdW5mb2xsb3dVc2VyKCk6dm9pZCB7XG4gICAgICAgIHZhciBidXR0b24gPSAkKHRoaXMpO1xuXG4gICAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgICAgcmVxdWVzdC5vcGVuKCdQT1NUJywgdGhpcy5hamF4RmlsZSArICc/YWpheEFjdGlvbj11bmZvbGxvdyZhamF4SWQ9JyArICQoYnV0dG9uKS5hdHRyKCdkYXRhLWlkJykpO1xuXG4gICAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYWxlcnQoJ0Vycm9yJyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlVGV4dCk7XG5cbiAgICAgICAgICAgICQoYnV0dG9uKS5hdHRyKFwiaWRcIiwgZGF0YS5jaGFuZ2UpO1xuICAgICAgICAgICAgJChidXR0b24pLmZpbmQoXCIuYnV0dG9uU3BhblwiKS5odG1sKGRhdGEud3JpdGUpOyBcbiAgICAgICAgfTtcblxuICAgICAgICByZXF1ZXN0LnNlbmQoKTtcbiAgICB9XG5cbiAgICBhamF4TGluayhldmVudCwgdXJsKTp2b2lkIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYodXJsICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFyIGxpbmtUbyA9IHVybDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBsaW5rVG86YW55ID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XG4gICAgICAgIH1cbiAgICAgICAgJChkb2N1bWVudCkub2ZmKCdzY3JvbGwnKTtcblxuICAgICAgICB0aGlzLmdldFBhZ2UobGlua1RvLCBcImJvZHk9dHJ1ZVwiLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgLy8kKCcuYWpheFJlcGxhY2UnKS5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xuICAgICAgICAgICAgJCgnLmFqYXhSZXBsYWNlJykuaHRtbChkYXRhKTtcblxuICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMFxuICAgICAgICAgICAgfSw1MDApO1xuXG4gICAgICAgICAgICB0aGlzLmNoYW5nZVVybChsaW5rVG8pO1xuXG4gICAgICAgICAgICAkKCcjbWVudUJ0SW5wdXQnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuXG4gICAgICAgICAgICBpZihsaW5rVG8gPT0gYmFzZVVybCkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn0iLCJjbGFzcyBXYXRjaGxpc3Qge1xuICAgIGFkZFdhdGNoTGlzdCgpOnZvaWQge1xuICAgICAgICB2YXIgZGF0YUlkID0gJCh0aGlzKS5hdHRyKCdkYXRhLWlkJyk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmFqYXgoXG4gICAgICAgICAgICAnUE9TVCcsXG4gICAgICAgICAgICAnYWRkV2F0Y2hMaXN0JyxcbiAgICAgICAgICAgIGRhdGFJZCxcbiAgICAgICAgICAgICcnLFxuICAgICAgICAgICAgJycsXG4gICAgICAgICAgICAkKCcuYWRkV2F0Y2hMaXN0JykucmVtb3ZlQ2xhc3MoJ2FkZFdhdGNoTGlzdCcpLmFkZENsYXNzKCdyZW1vdmVXYXRjaExpc3QnKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbW92ZVdhdGNoTGlzdCgpOnZvaWQge1xuICAgICAgICB2YXIgZGF0YUlkID0gJCh0aGlzKS5hdHRyKCdkYXRhLWlkJyk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmFqYXgoXG4gICAgICAgICAgICAnUE9TVCcsXG4gICAgICAgICAgICAncmVtb3ZlV2F0Y2hMaXN0JyxcbiAgICAgICAgICAgIGRhdGFJZCxcbiAgICAgICAgICAgICcnLFxuICAgICAgICAgICAgJycsXG4gICAgICAgICAgICAkKCcucmVtb3ZlV2F0Y2hMaXN0JykucmVtb3ZlQ2xhc3MoJ3JlbW92ZVdhdGNoTGlzdCcpLmFkZENsYXNzKCdhZGRXYXRjaExpc3QnKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGFkZFdhdGNoTGlzdEluZGV4KCk6dm9pZCB7XG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgIHZhciBkYXRhSWQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtaWQnKTtcblxuICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB2YXIgdXJsID0gdGhpcy5hamF4RmlsZSArICc/YWpheEFjdGlvbj1hZGRXYXRjaExpc3QmYWpheElkPScgKyBkYXRhSWQ7XG4gICAgICAgIFxuICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGFsZXJ0KCdFcnJvcicpO1xuICAgICAgICB9O1xuICAgICAgICByZXF1ZXN0Lm9wZW4oJ1BPU1QnLCB1cmwpO1xuICAgICAgICBcbiAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlVGV4dCk7XG5cbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA+PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgPCA0MDApIHtcbiAgICAgICAgICAgICAgICBpZigkKCcjd2F0Y2hMaXN0RGl2JykubGVuZ3RoID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5tYWluU2VjdGlvbicpLnByZXBlbmQoJzxhcnRpY2xlIGlkPVwid2F0Y2hMaXN0RGl2XCIgY2xhc3M9XCJjb250ZW50Q29udGFpbmVyXCI+PHAgY2xhc3M9XCJjb250ZW50RGl2SGVhZGVyXCI+JyArIGRhdGEudGl0bGUgKyAnPC9wPjxkaXYgY2xhc3M9XCJjb250ZW50RGl2XCI+PGRpdiBjbGFzcz1cImNvbnRlbnRHcm91cFNjcm9sbFwiPjwvZGl2PjwvZGl2PjwvYXJ0aWNsZT4nKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZigkdGhpcy5hdHRyKCdkYXRhLXR5cGUnKSA9PSAnbW92aWUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsaW5rVHlwZSA9ICdtb3ZpZXMnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKCR0aGlzLmF0dHIoJ2RhdGEtdHlwZScpID09ICdzZXJpZScpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpbmtUeXBlID0gJ3Nlcmllcyc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgJHRoaXMucmVtb3ZlQ2xhc3MoJ2FkZFdhdGNoTGlzdCcpLmFkZENsYXNzKCdyZW1vdmVXYXRjaExpc3QnKTtcblxuICAgICAgICAgICAgICAgICQoJyN3YXRjaExpc3REaXYgLmNvbnRlbnRHcm91cFNjcm9sbCcpLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJjb250ZW50XCIgZGF0YS1pZD1cIicgKyAkdGhpcy5hdHRyKCdkYXRhLWlkJykgICsgJ1wiPjxhIGNsYXNzPVwiY29udGVudExpbmtcIiBocmVmPVwiJyArIGJhc2VVcmwgKyAndGl0bGU/aWQ9JyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSArICdcIj48ZmlndXJlIGNsYXNzPVwiY29udGVudEZpZ3VyZVwiPjxpbWcgc3JjPVwiL2pva2VyL2ltYWdlcy9tZWRpYS8nICsgbGlua1R5cGUgKyAnLycgKyAkdGhpcy5hdHRyKCdkYXRhLWlkJykgKyAnL2ltYWdlLmpwZ1wiLz48ZmlnY2FwdGlvbj48L2ZpZ2NhcHRpb24+PC9maWd1cmU+PC9hPjxkaXYgY2xhc3M9XCJyZW1vdmVXYXRjaExpc3RcIiBkYXRhLXR5cGU9XCInICsgbGlua1R5cGUgKyAnXCIgZGF0YS1pZD1cIicgKyAkdGhpcy5hdHRyKCdkYXRhLWlkJykgKyAnXCI+PC9kaXY+PC9kaXY+Jyk7XG5cbiAgICAgICAgICAgICAgICAkKCcuY29udGVudERpdiBkaXYgLmFkZFdhdGNoTGlzdFtkYXRhLWlkPVwiJyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSArICdcIl0nKS5yZW1vdmVDbGFzcygnYWRkV2F0Y2hMaXN0JykuYWRkQ2xhc3MoJ3JlbW92ZVdhdGNoTGlzdCcpO1xuICAgICAgICAgICAgICAgICQoJyNpbWFnZURpdiBkaXYgc3BhbltkYXRhLWlkPVwiJyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSArICdcIl0nKS5yZW1vdmVDbGFzcygnYWRkV2F0Y2hMaXN0JykuYWRkQ2xhc3MoJ3JlbW92ZVdhdGNoTGlzdCcpO1xuXG4gICAgICAgICAgICAgICAgJCgnI2NvbnRlbnRTb3J0Y3V0cycpLmZpbmQoJy5hZGRXYXRjaExpc3QnKS5yZW1vdmVDbGFzcygnYWRkV2F0Y2hMaXN0JykuYWRkQ2xhc3MoJ3JlbW92ZVdhdGNoTGlzdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ0Vycm9yJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3Quc2VuZCgpO1xuICAgIH1cblxuICAgIHJlbW92ZVdhdGNoTGlzdEluZGV4KCk6dm9pZCB7XG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgIHZhciBkYXRhSWQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtaWQnKTtcblxuICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB2YXIgdXJsID0gdGhpcy5hamF4RmlsZSArICc/YWpheEFjdGlvbj1yZW1vdmVXYXRjaExpc3QmYWpheElkPScgKyBkYXRhSWQ7XG4gICAgICAgIFxuICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGFsZXJ0KCdFcnJvcicpO1xuICAgICAgICB9O1xuICAgICAgICByZXF1ZXN0Lm9wZW4oJ1BPU1QnLCB1cmwpO1xuICAgICAgICBcbiAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA+PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgPCA0MDApIHtcbiAgICAgICAgICAgICAgICAkKCcjd2F0Y2hMaXN0RGl2IGRpdltkYXRhLWlkPVwiJyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSArICdcIl0nKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAkKCcuY29udGVudERpdiBkaXYgLnJlbW92ZVdhdGNoTGlzdFtkYXRhLWlkPVwiJyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSArICdcIl0nKS5yZW1vdmVDbGFzcygncmVtb3ZlV2F0Y2hMaXN0JykuYWRkQ2xhc3MoJ2FkZFdhdGNoTGlzdCcpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICQoJyNpbWFnZURpdiBzcGFuW2RhdGEtaWQ9XCInICsgJHRoaXMuYXR0cignZGF0YS1pZCcpICsgJ1wiXScpLnJlbW92ZUNsYXNzKCdyZW1vdmVXYXRjaExpc3QnKS5hZGRDbGFzcygnYWRkV2F0Y2hMaXN0Jyk7XG5cbiAgICAgICAgICAgICAgICAkKCcjY29udGVudFNvcnRjdXRzJykuZmluZCgnLnJlbW92ZVdhdGNoTGlzdCcpLnJlbW92ZUNsYXNzKCdyZW1vdmVXYXRjaExpc3QnKS5hZGRDbGFzcygnYWRkV2F0Y2hMaXN0Jyk7XG5cbiAgICAgICAgICAgICAgICBpZigkLnRyaW0oJCgnI3dhdGNoTGlzdERpdiAuY29udGVudEdyb3VwU2Nyb2xsJykuaHRtbCgpKSA9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAkKCcjd2F0Y2hMaXN0RGl2JykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ0Vycm9yJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3Quc2VuZCgpO1xuICAgIH1cbn0iLCIvKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG5jbGFzcyBMb2dpbiB7XG4gICAgaW5wdXRFcnJvcihwYXJlbnREaXY6c3RyaW5nKTp2b2lkIHtcblx0XHQkKHBhcmVudERpdikub24oJ2ZvY3Vzb3V0JywgJy5pbnB1dFRleHQnLCBmdW5jdGlvbigpIHtcblx0XHRcdGlmKCgkKHRoaXMpIGFzIGFueSkudmFsKCkubGVuZ3RoIDwgMSkge1xuXHRcdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdpbnB1dFRleHQnKS5hZGRDbGFzcygnaW5wdXRUZXh0RXJyb3InKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRcblx0XHQkKHBhcmVudERpdikub24oJ2ZvY3Vzb3V0JywgJy5pbnB1dFRleHRFcnJvcicsIGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYoKCQodGhpcykgYXMgYW55KS52YWwoKS5sZW5ndGggPj0gMSkge1xuXHRcdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdpbnB1dFRleHRFcnJvcicpLmFkZENsYXNzKCdpbnB1dFRleHQnKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHNlY3VyZUxvZ29mZih1cmwpOnZvaWQge1xuXHRcdGlmKCFkb2N1bWVudC5jb29raWUubWF0Y2goJ2xvZ2luJykpIHtcblx0XHRcdGxvY2F0aW9uLnJlcGxhY2UodXJsICsgJ2xvZ29mZicpO1xuXHRcdH1cblx0fVxufSIsIi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmNsYXNzIFBhcmFsbGF4IHtcbiAgICAvL0VmZmVjdCBvZiBleHRlcm5hbCBpbmRleFxuXG5cdHBhcmFsbGF4SG9tZSgpOnZvaWQge1xuXHRcdHZhciBwYXJhbGxheEluOnN0cmluZyA9ICcjZGVzY0ltYWdlID4gaW1nJztcblx0XHR2YXIgcGFyYWxsYXhPdXQ6c3RyaW5nID0gJyNjb250ZW50U2xpZGVyID4gYXJ0aWNsZSA+IGRpdiA+IGltZyc7XG5cblx0XHRpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA8IDQ1MCkge1xuXHRcdFx0Ly8kKHBhcmFsbGF4SW4pLmNzcyhcInRvcFwiICwgKHdpbmRvdy5wYWdlWU9mZnNldCAvIDIpICsgJ3B4Jyk7XG5cdFx0XHQkKHBhcmFsbGF4T3V0KS5jc3MoXCJ0b3BcIiAsICh3aW5kb3cucGFnZVlPZmZzZXQgLyAyKSArICdweCcpO1xuXHRcdH1cblx0fVxuXG5cdHBhcmFsbGF4SGVhZGVyVXNlcigpOnZvaWQge1xuXHRcdC8vRWZmZWN0IG9mIGhlYWRlciBvZiBwcm9maWxlIHBhZ2VcblxuXHRcdHZhciBpbWdEaXYgPSAkKCcjdXNlckhlYWRlckltZycpO1xuXG5cdFx0aWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPCAyMTApIHtcblx0XHRcdCQoaW1nRGl2KS5jc3MoXCJ0b3BcIiAsICh3aW5kb3cucGFnZVlPZmZzZXQgLyAyLjYpICsgJ3B4Jyk7XG5cdFx0fVxuXG5cdFx0Ly9DaGFuZ2UgY2xhc3Mgb2YgaGVhZGVyIG9mIHByb2ZpbGUgcGFnZVxuXG5cdFx0dmFyIHVzZXJIZWFkZXIgPSAkKCcjdXNlckhlYWRlcicpO1xuXHRcdHZhciB1c2VySGVhZGVySW1nID0gJCgnI3VzZXJIZWFkZXJJbWcnKTtcblxuXHRcdGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID49IDIxMCkge1xuXHRcdFx0dXNlckhlYWRlci5yZW1vdmVDbGFzcygndXNlckhlYWRlcicpO1xuXHRcdFx0dXNlckhlYWRlci5hZGRDbGFzcygndXNlckhlYWRlckZpeGVkJyk7XG5cdFx0XHR1c2VySGVhZGVySW1nLnJlbW92ZUNsYXNzKCd1c2VySGVhZGVySW1nJyk7XG5cdFx0XHR1c2VySGVhZGVySW1nLmFkZENsYXNzKCd1c2VySGVhZGVySW1nRml4ZWQnKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR1c2VySGVhZGVyLnJlbW92ZUNsYXNzKCd1c2VySGVhZGVyRml4ZWQnKTtcblx0XHRcdHVzZXJIZWFkZXIuYWRkQ2xhc3MoJ3VzZXJIZWFkZXInKTtcblx0XHRcdHVzZXJIZWFkZXJJbWcucmVtb3ZlQ2xhc3MoJ3VzZXJIZWFkZXJJbWdGaXhlZCcpO1xuXHRcdFx0dXNlckhlYWRlckltZy5hZGRDbGFzcygndXNlckhlYWRlckltZycpO1xuXHRcdH1cblx0fVxuXG5cdHBhcmFsbGF4SW1nKCk6dm9pZCB7XG5cdFx0Ly9FZmZlY3Qgb2YgdXNlciBpbWFnZSBvZiBwcm9maWxlIHBhZ2VcblxuXHRcdHZhciBpbWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlckltZ0ZpZ3VyZScpO1xuXG5cdFx0aWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPCAyMTApIHtcblx0XHRcdGltZy5zdHlsZS53aWR0aCA9ICgxNTAgLSAkKHRoaXMpLnNjcm9sbFRvcCgpIC8gMi4xKSArICdweCc7XG5cdFx0XHRpbWcuc3R5bGUuaGVpZ2h0ID0gKDE1MCAtICQodGhpcykuc2Nyb2xsVG9wKCkgLyAyLjEpICsgJ3B4Jztcblx0XHRcdGltZy5zdHlsZS5sZWZ0ID0gKDAgKyAkKHRoaXMpLnNjcm9sbFRvcCgpIC8gNC4yKSArICdweCc7XG5cdFx0XHRpbWcuc3R5bGUudG9wID0gKC0xMjAgKyAkKHRoaXMpLnNjcm9sbFRvcCgpIC8gNS4yKSArICdweCc7XG5cdFx0fVxuXG5cdFx0Ly9DaGFuZ2UgY2xhc3Mgb2YgdXNlciBpbWFnZSBvZiBwcm9maWxlIHBhZ2VcblxuXHRcdHZhciB1c2VySW1nID0gJCgnI3VzZXJJbWdGaWd1cmUnKTtcblxuXHRcdGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID49IDIxMCkge1xuXHRcdFx0dXNlckltZy5yZW1vdmVDbGFzcygndXNlckltZ0ZpZ3VyZScpO1xuXHRcdFx0dXNlckltZy5hZGRDbGFzcygndXNlckltZ0ZpZ3VyZUZpeGVkJyk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dXNlckltZy5yZW1vdmVDbGFzcygndXNlckltZ0ZpZ3VyZUZpeGVkJyk7XG5cdFx0XHR1c2VySW1nLmFkZENsYXNzKCd1c2VySW1nRmlndXJlJyk7XG5cdFx0fVxuXHR9XG5cblx0cGFyYWxsYXhOYW1lKCk6dm9pZCB7XG5cdFx0Ly9FZmZlY3Qgb2YgdXNlciBuYW1lIG9mIHByb2ZpbGUgcGFnZVxuXG5cdFx0dmFyIG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlck5hbWVEaXYnKTtcblxuXHRcdGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpIDwgMjEwKSB7XG5cdFx0XHRuYW1lLnN0eWxlLmxlZnQgPSAoMjIwIC0gJCh0aGlzKS5zY3JvbGxUb3AoKSAvIDMuNzUpICsgJ3B4Jztcblx0XHR9XG5cblx0XHQvL0NoYW5nZSBjbGFzcyBvZiB1c2VyIG5hbWUgZGl2XG5cblx0XHR2YXIgdXNlck5hbWUgPSAkKCcjdXNlck5hbWVEaXYnKTtcblxuXHRcdGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID49IDIxMCkge1xuXHRcdFx0dXNlck5hbWUucmVtb3ZlQ2xhc3MoJ3VzZXJOYW1lRGl2Jyk7XG5cdFx0XHR1c2VyTmFtZS5hZGRDbGFzcygndXNlck5hbWVEaXZGaXhlZCcpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHVzZXJOYW1lLnJlbW92ZUNsYXNzKCd1c2VyTmFtZURpdkZpeGVkJyk7XG5cdFx0XHR1c2VyTmFtZS5hZGRDbGFzcygndXNlck5hbWVEaXYnKTtcblx0XHR9XG5cdH1cblxuXHRwb3N0ZXJQYXJhbGF4KGltYWdlKTp2b2lkIHtcblx0XHR2YXIgJHBvc3RlciA9ICQoaW1hZ2UpO1xuXHRcdHZhciAkc2hpbmUgPSAkcG9zdGVyLmZpbmQoJy5zaGluZScpO1xuXHRcdHZhciAkbGF5ZXIgPSAkcG9zdGVyLmZpbmQoJypbY2xhc3MqPVwibGF5ZXItXCJdJyk7XG5cdFx0dmFyIHcgPSAkcG9zdGVyLndpZHRoKCk7XG5cdFx0dmFyIGggPSAkcG9zdGVyLmhlaWdodCgpO1xuXG5cdFx0JHBvc3Rlci5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24oZSkge1xuXHRcdFx0JCgnLm1haW5TZWN0aW9uJykuY3NzKHtcblx0XHRcdFx0J3RyYW5zZm9ybS1zdHlsZSc6ICdwcmVzZXJ2ZS0zZCcsXG5cdFx0XHRcdCd0cmFuc2Zvcm0nOiAncGVyc3BlY3RpdmUoMTAwMHB4KSdcblx0XHRcdH0pLFxuXHRcdFx0JCgnI2ltYWdlQmFjaycpLmNzcyh7XG5cdFx0XHRcdCd0b3AnOiAnMCdcblx0XHRcdH0pO1xuXG5cdFx0XHQvL3ZhciBvZmZzZXRYID0gMC41IC0gZS5wYWdlWCAvIHc7IC8vIGN1cnNvciBob3Jcblx0XHRcdC8vdmFyIG9mZnNldFkgPSAwLjUgLSBlLnBhZ2VZIC8gaDsgLy8gY3Vyc29yIHZlcnRcblx0XHRcdHZhciBvZmZzZXRYID0gMC41IC0gZS5wYWdlWCAvIHc7IC8vIGN1cnNvciBob3Jcblx0XHRcdHZhciBvZmZzZXRZID0gMC41IC0gZS5wYWdlWSAvIGg7IC8vIGN1cnNvciB2ZXJ0XG5cdFx0XHR2YXIgZHggPSBlLnBhZ2VYIC0gdyAvIDI7IC8vIHBvc3RlciBjZW50ZXIgaG9yXG5cdFx0XHR2YXIgZHkgPSBlLnBhZ2VZIC0gaCAvIDI7IC8vIHBvc3RlciBjZW50ZXIgdmVydFxuXHRcdFx0dmFyIHRoZXRhID0gTWF0aC5hdGFuMihkeSwgZHgpOyAvLyBhbmdsZSBiL3cgY3Vyc29yIGFuZCBwb3N0ZXIgY2VudGVyIGluIFJBRFxuXHRcdFx0dmFyIGFuZ2xlID0gdGhldGEgKiAxODAgLyBNYXRoLlBJIC0gOTA7IC8vIGNvbnZlcnQgcmFkIHRvIGRlZ3JlZXNcblx0XHRcdHZhciBvZmZzZXRQb3N0ZXIgPSAkcG9zdGVyLmRhdGEoJ29mZnNldCcpO1xuXHRcdFx0dmFyIHRyYW5zZm9ybVBvc3RlciA9ICd0cmFuc2xhdGVZKCcgKyAtb2Zmc2V0WCAqIG9mZnNldFBvc3RlciArICdweCkgcm90YXRlWCgnICsgKC1vZmZzZXRZICogb2Zmc2V0UG9zdGVyKSArICdkZWcpIHJvdGF0ZVkoJyArIChvZmZzZXRYICogKG9mZnNldFBvc3RlciAqIDIpKSArICdkZWcpJztcblx0XHRcdCRwb3N0ZXIuY3NzKCd0cmFuc2Zvcm0nLCB0cmFuc2Zvcm1Qb3N0ZXIpO1xuXG5cdFx0XHRpZiAoYW5nbGUgPCAwKSB7XG5cdFx0XHRcdGFuZ2xlID0gYW5nbGUgKyAzNjA7XG5cdFx0XHR9XG5cblx0XHRcdCRzaGluZS5jc3MoJ2JhY2tncm91bmQnLCAnbGluZWFyLWdyYWRpZW50KCcgKyBhbmdsZSArICdkZWcsIHJnYmEoMCwgMCwgMCwnICsgZS5wYWdlWSAvIGggKyAnKSAwJSxyZ2JhKDAsIDAsIDAsIDApIDgwJSknKTtcblx0XHRcdFxuXHRcdFx0JGxheWVyLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyk7XG5cdFx0XHRcdHZhciBvZmZzZXRMYXllciA9ICR0aGlzLmRhdGEoJ29mZnNldCcpIHx8IDA7XG5cdFx0XHRcdHZhciB0cmFuc2Zvcm1MYXllciA9ICd0cmFuc2xhdGVYKCcgKyBvZmZzZXRYICogb2Zmc2V0TGF5ZXIgKyAncHgpIHRyYW5zbGF0ZVkoJyArIG9mZnNldFkgKiBvZmZzZXRMYXllciArICdweCknO1xuXHRcdFx0XHRcblx0XHRcdFx0JHRoaXMuY3NzKCd0cmFuc2Zvcm0nLCB0cmFuc2Zvcm1MYXllcik7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxufSIsIi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmNsYXNzIFNsaWRlIHtcbiAgICBzbGlkZUluZGV4KCk6dm9pZCB7XG5cdFx0aWYoJCh0aGlzKS5zY3JvbGxUb3AoKSA8IDIwMCkge1xuXHRcdFx0aWYoKCQoJy5pbWFnZVNob3cnKSBhcyBhbnkpLm5leHQoKS5zaXplKCkpIHtcblx0XHRcdFx0JCgnLmltYWdlU2hvdycpLnJlbW92ZUNsYXNzKCdpbWFnZVNob3cnKS5hZGRDbGFzcygnaW1hZ2VIaWRlJykubmV4dCgpLnJlbW92ZUNsYXNzKCdpbWFnZUhpZGUnKS5hZGRDbGFzcygnaW1hZ2VTaG93Jyk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0KCQoJy5pbWFnZVNob3cnKSBhcyBhbnkpLnJlbW92ZUNsYXNzKCdpbWFnZVNob3cnKS5hZGRDbGFzcygnaW1hZ2VIaWRlJyk7XG5cdFx0XHRcdCQoJyNjb250ZW50U2xpZGVyICNpbWFnZURpdiBkaXY6bnRoLW9mLXR5cGUoMSknKS5yZW1vdmVDbGFzcygnaW1hZ2VIaWRlJykuYWRkQ2xhc3MoJ2ltYWdlU2hvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZigoJCgnLmNoYW5nZVNob3cnKSBhcyBhbnkpLm5leHQoKS5zaXplKCkpIHtcblx0XHRcdFx0JCgnLmNoYW5nZVNob3cnKS5yZW1vdmVDbGFzcygnY2hhbmdlU2hvdycpLmFkZENsYXNzKCdjaGFuZ2VIaWRlJykubmV4dCgpLnJlbW92ZUNsYXNzKCdjaGFuZ2VIaWRlJykuYWRkQ2xhc3MoJ2NoYW5nZVNob3cnKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHQkKCcuY2hhbmdlU2hvdycpLnJlbW92ZUNsYXNzKCdjaGFuZ2VTaG93JykuYWRkQ2xhc3MoJ2NoYW5nZUhpZGUnKTtcblx0XHRcdFx0JCgnI2NvbnRlbnRTbGlkZXIgI2NoYW5nZURpdiBkaXY6bnRoLW9mLXR5cGUoMSknKS5yZW1vdmVDbGFzcygnY2hhbmdlSGlkZScpLmFkZENsYXNzKCdjaGFuZ2VTaG93Jyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Y2hhbmdlSW5kZXgoc2xpZGVyKTp2b2lkIHtcblx0XHQvL0luZGV4IGJ1dHRvbnNcblxuXHRcdCQoc2xpZGVyKS5vbignY2xpY2snLCAnLmNoYW5nZUhpZGUnLCBmdW5jdGlvbigpIHtcblx0XHRcdGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XG5cblx0XHRcdCQoJy5jaGFuZ2VTaG93JykucmVtb3ZlQ2xhc3MoJ2NoYW5nZVNob3cnKS5hZGRDbGFzcygnY2hhbmdlSGlkZScpO1xuXHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygnY2hhbmdlSGlkZScpLmFkZENsYXNzKCdjaGFuZ2VTaG93Jyk7XG5cblx0XHRcdHZhciBpbmRpY2UgPSAkKHRoaXMpLmluZGV4KCk7XG5cdFx0XHRpbmRpY2UgKys7XG5cblx0XHRcdCQoJyNpbWFnZURpdiAuaW1hZ2VTaG93JykucmVtb3ZlQ2xhc3MoJ2ltYWdlU2hvdycpLmFkZENsYXNzKCdpbWFnZUhpZGUnKTtcblx0XHRcdCQoJyNpbWFnZURpdiBkaXY6bnRoLW9mLXR5cGUoJyArIGluZGljZSArICcpJykucmVtb3ZlQ2xhc3MoJ2ltYWdlSGlkZScpLmFkZENsYXNzKCdpbWFnZVNob3cnKTtcblx0XHR9KTtcblxuXHRcdC8vUHJldmlvdXMgYnV0dG9uXG5cblx0XHQkKHNsaWRlcikub24oJ2NsaWNrJywgJyNwcmV2aW91c0ltYWdlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRjbGVhckludGVydmFsKGludGVydmFsSWQpO1xuXG5cdFx0XHRpZigoJCgnLmltYWdlU2hvdycpIGFzIGFueSkucHJldigpLnNpemUoKSkge1xuXHRcdFx0XHQkKCcuaW1hZ2VTaG93JykucmVtb3ZlQ2xhc3MoJ2ltYWdlU2hvdycpLmFkZENsYXNzKCdpbWFnZUhpZGUnKS5wcmV2KCkucmVtb3ZlQ2xhc3MoJ2ltYWdlSGlkZScpLmFkZENsYXNzKCdpbWFnZVNob3cnKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHQkKCcuaW1hZ2VTaG93JykucmVtb3ZlQ2xhc3MoJ2ltYWdlU2hvdycpLmFkZENsYXNzKCdpbWFnZUhpZGUnKTtcblx0XHRcdFx0JCgnI2NvbnRlbnRTbGlkZXIgI2ltYWdlRGl2IGRpdjpsYXN0LWNoaWxkJykucmVtb3ZlQ2xhc3MoJ2ltYWdlSGlkZScpLmFkZENsYXNzKCdpbWFnZVNob3cnKTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGluZGljZSA9ICQodGhpcykucGFyZW50KCkuZmluZCgnI2ltYWdlRGl2IC5pbWFnZVNob3cnKS5pbmRleCgnI2ltYWdlRGl2IGRpdicpO1xuXHRcdFx0aW5kaWNlICsrO1xuXG5cdFx0XHQkKCcjY2hhbmdlRGl2IGRpdicpLnJlbW92ZUNsYXNzKCdjaGFuZ2VTaG93JykuYWRkQ2xhc3MoJ2NoYW5nZUhpZGUnKTtcblx0XHRcdCQoJyNjaGFuZ2VEaXYgZGl2Om50aC1vZi10eXBlKCcgKyBpbmRpY2UgKyAnKScpLnJlbW92ZUNsYXNzKCdjaGFuZ2VIaWRlJykuYWRkQ2xhc3MoJ2NoYW5nZVNob3cnKTtcblx0XHR9KTtcblxuXHRcdC8vTmV4dCBidXR0b25cblxuXHRcdCQoc2xpZGVyKS5vbignY2xpY2snLCAnI25leHRJbWFnZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0Y2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcblxuXHRcdFx0aWYoKCQoJy5pbWFnZVNob3cnKSBhcyBhbnkpLm5leHQoKS5zaXplKCkpIHtcblx0XHRcdFx0JCgnLmltYWdlU2hvdycpLnJlbW92ZUNsYXNzKCdpbWFnZVNob3cnKS5hZGRDbGFzcygnaW1hZ2VIaWRlJykubmV4dCgpLnJlbW92ZUNsYXNzKCdpbWFnZUhpZGUnKS5hZGRDbGFzcygnaW1hZ2VTaG93Jyk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0JCgnLmltYWdlU2hvdycpLnJlbW92ZUNsYXNzKCdpbWFnZVNob3cnKS5hZGRDbGFzcygnaW1hZ2VIaWRlJyk7XG5cdFx0XHRcdCQoJyNjb250ZW50U2xpZGVyICNpbWFnZURpdiBkaXY6bnRoLW9mLXR5cGUoMSknKS5yZW1vdmVDbGFzcygnaW1hZ2VIaWRlJykuYWRkQ2xhc3MoJ2ltYWdlU2hvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgaW5kaWNlID0gJCh0aGlzKS5wYXJlbnQoKS5maW5kKCcjaW1hZ2VEaXYgLmltYWdlU2hvdycpLmluZGV4KCcjaW1hZ2VEaXYgZGl2Jyk7XG5cdFx0XHRpbmRpY2UgKys7XG5cblx0XHRcdCQoJyNjaGFuZ2VEaXYgZGl2JykucmVtb3ZlQ2xhc3MoJ2NoYW5nZVNob3cnKS5hZGRDbGFzcygnY2hhbmdlSGlkZScpO1xuXHRcdFx0JCgnI2NoYW5nZURpdiBkaXY6bnRoLW9mLXR5cGUoJyArIGluZGljZSArICcpJykucmVtb3ZlQ2xhc3MoJ2NoYW5nZUhpZGUnKS5hZGRDbGFzcygnY2hhbmdlU2hvdycpO1xuXHRcdH0pO1xuXHR9XG59IiwiLypcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiB8IENvcHlyaWdodCAoYykgMjAxNC0yMDE1IEF0b21vLmNvbS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiB8IEAgQXV0aG9yXHQ6IERhbmllbCBSaW9zLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKi9cbmNsYXNzIFVzZXJPdGhlcnMge1xuICAgIC8qKlxuXHQgKiBoaWRlIHRoZSByZXBsaWVzXG5cdCAqL1xuICAgIFxuICAgIGhpZGVSZXBseShkaXY6c3RyaW5nKTp2b2lkIHtcblx0XHQkKGRpdikub24oXCJjbGlja1wiLCBcIi5ub0hpZGVcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKFwibm9IaWRlXCIpLmFkZENsYXNzKFwiaGlkZVwiKTtcblx0XHR9KVxuXHRcdC5vbihcImNsaWNrXCIsIFwiLmhpZGVcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKFwiaGlkZVwiKS5hZGRDbGFzcyhcIm5vSGlkZVwiKTtcblx0XHR9KTtcbiAgICB9XG4gICAgLy9DbG9zZSBNZXNzYWdlXG5cblx0Y2xvc2VNZXNzYWdlKGVycm9yRGl2OnN0cmluZywgZXJyb3JCdG46c3RyaW5nKTp2b2lkIHtcblx0XHQkKGVycm9yRGl2KS5vbihcImNsaWNrXCIsIGVycm9yQnRuLCBmdW5jdGlvbigpIHtcblx0XHRcdCQodGhpcykucGFyZW50KCkucmVtb3ZlKCk7XG5cdFx0XHQvL2xvY2F0aW9uLmhyZWYgPSBoaXN0b3J5LmdvKC0xKTtcblx0XHR9KTtcblx0fVxuXG5cdC8vVGFiIFNlbGVjdFxuXG5cdHRhYlNlbGVjdChJc1Njcm9sbDpib29sZWFuKTp2b2lkIHtcblx0XHR2YXIgc2Nyb2xsID0gSXNTY3JvbGwgPyBJc1Njcm9sbCA6IGZhbHNlO1xuXG5cdFx0JChcIiN0YWJIZWFkZXJcIikub24oXCJjbGlja1wiLCBcIi50YWJcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHQkKFwiI3RhYkhlYWRlciAudGFiU2VsZWN0ZWRcIikucmVtb3ZlQ2xhc3MoXCJ0YWJTZWxlY3RlZFwiKS5hZGRDbGFzcyhcInRhYlwiKTtcblx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoXCJ0YWJcIikuYWRkQ2xhc3MoXCJ0YWJTZWxlY3RlZFwiKTtcblx0XHRcdFxuXHRcdFx0dmFyIGluZGljZSA9ICQodGhpcykuaW5kZXgoKTtcblx0XHRcdGluZGljZSArKztcblx0XHRcdFxuXHRcdFx0JChcIiN0YWJDb250ZW50cyAuY29udGVudFNob3dcIikucmVtb3ZlQ2xhc3MoJ2NvbnRlbnRTaG93JykuYWRkQ2xhc3MoJ2NvbnRlbnRIaWRlJyk7XG5cdFx0XHQkKFwiI3RhYkNvbnRlbnRzIC5jb250ZW50SGlkZTpudGgtb2YtdHlwZShcIiArIGluZGljZSArIFwiKVwiKS5yZW1vdmVDbGFzcygnY29udGVudEhpZGUnKS5hZGRDbGFzcygnY29udGVudFNob3cnKTtcblx0XHR9KVxuXHRcdC5vbignY2xpY2snLCAnZGl2JywgZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdGlmKHNjcm9sbCA9PSB0cnVlKSB7XG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdCQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcblx0XHRcdFx0XHRzY3JvbGxUb3A6IDQ1MFxuXHRcdFx0XHR9LDUwMCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHQvL0VwaXNvZGUgU2VsZWN0XG5cblx0ZXBpc29kZVNlbGVjdChlcGlzb2RlU2xpZGVyOnN0cmluZyk6dm9pZCB7XG5cdFx0JChlcGlzb2RlU2xpZGVyKS5vbihcImNsaWNrXCIsIFwiLnNlYXNvblNlbGVjdCAuc2Vhc29uU3BhblwiLCBmdW5jdGlvbigpIHtcblx0XHRcdCQoXCIjc2Vhc29uU2VsZWN0XCIpLnJlbW92ZUNsYXNzKFwic2Vhc29uU2VsZWN0XCIpLmFkZENsYXNzKFwic2Vhc29uU2VsZWN0T3BlblwiKTtcblx0XHRcdCQoXCIuc2Vhc29uSGlkZVwiKS5yZW1vdmVDbGFzcyhcInNlYXNvbkhpZGVcIikuYWRkQ2xhc3MoXCJzZWFzb25TaG93XCIpO1xuXHRcdH0pXG5cdFx0Lm9uKFwiY2xpY2tcIiwgXCIuc2Vhc29uU2VsZWN0T3BlbiAuc2Vhc29uU3BhblwiLCBmdW5jdGlvbigpIHtcblx0XHRcdCQoXCIjc2Vhc29uU2VsZWN0XCIpLnJlbW92ZUNsYXNzKFwic2Vhc29uU2VsZWN0T3BlblwiKS5hZGRDbGFzcyhcInNlYXNvblNlbGVjdFwiKTtcblx0XHRcdCQoXCIuc2Vhc29uU2hvd1wiKS5yZW1vdmVDbGFzcyhcInNlYXNvblNob3dcIikuYWRkQ2xhc3MoXCJzZWFzb25IaWRlXCIpO1xuXHRcdFx0XG5cdFx0XHR2YXIgaW5kaWNlID0gJCh0aGlzKS5wYXJlbnQoKTtcblx0XHRcdGluZGljZS5yZW1vdmVDbGFzcyhcInNlYXNvbkhpZGVcIikuYWRkQ2xhc3MoXCJzZWFzb25TaG93XCIpO1xuXHRcdFx0XG5cdFx0XHR2YXIgaW5kaWNlU2hvdyA9ICQodGhpcykucGFyZW50KCkuaW5kZXgoKTtcblx0XHRcdGluZGljZVNob3cgKys7XG5cdFx0XHRcblx0XHRcdCQoXCIjZXBpc29kZURpdiAuc2Vhc29uR3JvdXBTaG93XCIpLnJlbW92ZUNsYXNzKFwic2Vhc29uR3JvdXBTaG93XCIpLmFkZENsYXNzKFwic2Vhc29uR3JvdXBIaWRlXCIpO1xuXHRcdFx0JChcIiNlcGlzb2RlRGl2IC5jb250ZW50R3JvdXA6bnRoLW9mLXR5cGUoXCIgKyBpbmRpY2VTaG93ICsgXCIpXCIpLnJlbW92ZUNsYXNzKFwic2Vhc29uR3JvdXBIaWRlXCIpLmFkZENsYXNzKFwic2Vhc29uR3JvdXBTaG93XCIpO1xuXHRcdFx0XG5cdFx0XHRpZigkKFwiI2VwaXNvZGVEaXYgLmNvbnRlbnRHcm91cDpudGgtb2YtdHlwZShcIiArIGluZGljZVNob3cgKyBcIilcIikud2lkdGgoKSA+ICQoXCIjZXBpc29kZURpdlwiKS53aWR0aCgpKSB7XG5cdFx0XHRcdCQoXCIjZXBpc29kZURpdlwiKS5maW5kKCcubmV4dEhpZGUnKS5yZW1vdmVDbGFzcygnbmV4dEhpZGUnKS5hZGRDbGFzcygnbmV4dFNob3cnKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHQkKFwiI2VwaXNvZGVEaXZcIikuZmluZCgnLm5leHRTaG93JykucmVtb3ZlQ2xhc3MoJ25leHRTaG93JykuYWRkQ2xhc3MoJ25leHRIaWRlJyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvL0VwaXNvZGUgU2VsZWN0IENsb3NlXG5cblx0XHQkKGVwaXNvZGVTbGlkZXIpLm9uKFwibW91c2VsZWF2ZVwiLCBcIi5zZWFzb25TZWxlY3RPcGVuXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGluZGV4Q2xvc2UgPSAkKFwiI2VwaXNvZGVEaXYgLnNlYXNvbkdyb3VwU2hvd1wiKS5pbmRleCgpO1xuXHRcdFx0aW5kZXhDbG9zZSsrO1xuXG5cdFx0XHQkKFwiI3NlYXNvblNlbGVjdFwiKS5yZW1vdmVDbGFzcyhcInNlYXNvblNlbGVjdE9wZW5cIikuYWRkQ2xhc3MoXCJzZWFzb25TZWxlY3RcIik7XG5cdFx0XHQkKFwiLnNlYXNvblNob3dcIikucmVtb3ZlQ2xhc3MoXCJzZWFzb25TaG93XCIpLmFkZENsYXNzKFwic2Vhc29uSGlkZVwiKTtcblx0XHRcdCQoXCIuc2Vhc29uSGlkZTpudGgtb2YtdHlwZShcIiArIGluZGV4Q2xvc2UgKyBcIilcIikucmVtb3ZlQ2xhc3MoXCJzZWFzb25IaWRlXCIpLmFkZENsYXNzKFwic2Vhc29uU2hvd1wiKTtcblx0XHR9KTtcblx0fVxuXHRcblx0ZGlzYWJsZUVuYWJsZSgpOnZvaWQge1xuXHRcdCQoXCIjY29tbWVudElucHV0XCIpLmtleXVwKGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGNvbW1lbnRCZWZvcmUgPSAkKHRoaXMpLnZhbCgpO1xuXHRcdFx0dmFyIGNoZWNrQ29tbWVudEJlZm9yZSA9IChjb21tZW50QmVmb3JlIGFzIGFueSkudHJpbSgpO1xuXG5cdFx0XHRpZihjaGVja0NvbW1lbnRCZWZvcmUgPT0gJycpIHtcblx0XHRcdFx0Ly8kKCcjY29tbWVudFN1Ym1pdCcpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0XHRcdCQoJyNjb21tZW50U3VibWl0JykuYXR0cignZGlzYWJsZWQnKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHQkKCcjY29tbWVudFN1Ym1pdCcpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn0iLCIvKiBcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiB8IENvcHlyaWdodCAoYykgMjAxNC0yMDE1IEF0b21vLmNvbS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiB8IEAgQXV0aG9yXHQ6IERhbmllbCBSaW9zLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKi9cblxuY2xhc3MgQWRtaW5NZW51IHtcbiAgICAvL1NldCB0aGUgbWVudSBvcGVuIGFuZCBjbG9zZVxuXG5cdHRvZ2dsZU1lbnUoaGVhZGVyOnN0cmluZyk6dm9pZCB7XG5cdFx0JChoZWFkZXIpLm9uKFwiY2xpY2tcIiwgXCIuY2xvc2VNZW51XCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcyhcImNsb3NlTWVudVwiKS5hZGRDbGFzcyhcIm9wZW5NZW51XCIpO1xuXHRcdFx0JChcIi5tZW51T3BlbmVkXCIpLnJlbW92ZUNsYXNzKFwibWVudU9wZW5lZFwiKS5hZGRDbGFzcyhcIm1lbnVDbG9zZWRcIik7XG5cdFx0XHQkKFwic2VjdGlvbltpZCQ9J0ludGVyZmFjZSddXCIpLnJlbW92ZUNsYXNzKFwiYm9keU1lbnVPcGVuZWRcIikuYWRkQ2xhc3MoXCJib2R5TWVudUNsb3NlZFwiKTtcblx0XHR9KTtcblx0XHQkKGhlYWRlcikub24oXCJjbGlja1wiLCBcIi5vcGVuTWVudVwiLCBmdW5jdGlvbigpIHtcblx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoXCJvcGVuTWVudVwiKS5hZGRDbGFzcyhcImNsb3NlTWVudVwiKTtcblx0XHRcdCQoXCIubWVudUNsb3NlZFwiKS5yZW1vdmVDbGFzcyhcIm1lbnVDbG9zZWRcIikuYWRkQ2xhc3MoXCJtZW51T3BlbmVkXCIpO1xuXHRcdFx0JChcInNlY3Rpb25baWQkPSdJbnRlcmZhY2UnXVwiKS5yZW1vdmVDbGFzcyhcImJvZHlNZW51Q2xvc2VkXCIpLmFkZENsYXNzKFwiYm9keU1lbnVPcGVuZWRcIik7XG5cdFx0fSk7XG5cdH1cblxuXHQvL01lbnUgYWNjb3JkaW9uXG5cblx0bWVudUFjY29yZGlvbihtZW51OnN0cmluZyk6dm9pZCB7XG5cdFx0JChtZW51KS5maW5kKFwiI3VsTWVudSA+IC5pdGVtTWVudSA+IC5zdWJNZW51SXRlbXNcIikuaGlkZSgpO1xuXG5cdFx0JChtZW51KS5vbihcImNsaWNrXCIsIFwiI3VsTWVudSAuaXRlbU1lbnVPcGVuXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0JCh0aGlzKS5maW5kKFwiLnN1Yk1lbnVJdGVtc1wiKS5zbGlkZVVwKFwibm9ybWFsXCIpO1xuXHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcyhcIml0ZW1NZW51T3BlblwiKS5hZGRDbGFzcyhcIml0ZW1NZW51Q2xvc2VcIik7XG5cdFx0fSk7XG5cdFx0XG5cdFx0JChtZW51KS5vbihcImNsaWNrXCIsIFwiI3VsTWVudSAuaXRlbU1lbnVDbG9zZVwiLCBmdW5jdGlvbigpIHtcblx0XHRcdCQoXCIjdWxNZW51ID4gbGlcIikuZmluZChcIi5zdWJNZW51SXRlbXNcIikuc2xpZGVVcChcIm5vcm1hbFwiKTtcblx0XHRcdCQoXCIjdWxNZW51ID4gbGlcIikubmV4dCgpLnJlbW92ZUNsYXNzKFwiaXRlbU1lbnVPcGVuXCIpLmFkZENsYXNzKFwiaXRlbU1lbnVDbG9zZVwiKTtcblx0XHRcdFxuXHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcyhcIml0ZW1NZW51Q2xvc2VcIikuYWRkQ2xhc3MoXCJpdGVtTWVudU9wZW5cIik7XG5cdFx0XHQkKHRoaXMpLmZpbmQoXCIuc3ViTWVudUl0ZW1zXCIpLnNsaWRlRG93bihcIm5vcm1hbFwiKTtcblx0XHR9KTtcblx0fVxufSIsIi8qIFxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG5jbGFzcyBBZG1pbk90aGVycyB7XG4gICAgLy9TaG93IHRoZSBhZHZhbmNlZCBvcHRpb25zXG5cblx0YWR2YW5jZWRPcHRpb25zKGJ1dHRvbjpzdHJpbmcsIHNob3c6c3RyaW5nKTp2b2lkIHtcblx0XHQkKGJ1dHRvbikub24oXCJjbGlja1wiLCBcIi5zZWFyY2hBZHZhbmNlZENsb3NlXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcyhcInNlYXJjaEFkdmFuY2VkQ2xvc2VcIikuYWRkQ2xhc3MoXCJzZWFyY2hBZHZhbmNlZE9wZW5cIik7XG5cdFx0XHQkKHNob3cpLnJlbW92ZUNsYXNzKFwiYWR2YW5jZWRTZWFyY2hIaWRlXCIpLmFkZENsYXNzKFwiYWR2YW5jZWRTZWFyY2hTaG93XCIpO1xuXHRcdH0pO1xuXHRcdFxuXHRcdCQoYnV0dG9uKS5vbihcImNsaWNrXCIsIFwiLnNlYXJjaEFkdmFuY2VkT3BlblwiLCBmdW5jdGlvbigpIHtcblx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoXCJzZWFyY2hBZHZhbmNlZE9wZW5cIikuYWRkQ2xhc3MoXCJzZWFyY2hBZHZhbmNlZENsb3NlXCIpO1xuXHRcdFx0JChzaG93KS5yZW1vdmVDbGFzcyhcImFkdmFuY2VkU2VhcmNoU2hvd1wiKS5hZGRDbGFzcyhcImFkdmFuY2VkU2VhcmNoSGlkZVwiKTtcblx0XHR9KTtcblx0fVxuXG5cdC8vVXBsb2FkXG5cblx0c2hvd1NlbGVjdGVkRmlsZShkaXY6c3RyaW5nKTp2b2lkIHtcblx0XHQkKGRpdikub24oJ2NoYW5nZScsICcuaW5wdXRJbWFnZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKTtcblx0XHRcdHZhciBmaWxlcyA9ICR0aGlzLnByb3AoJ2ZpbGVzJyk7XG5cdFx0XHR2YXIgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cblx0XHRcdGZpbGVSZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgaW1hZ2VTZWxlY3RlZCA9IGZpbGVSZWFkZXIucmVzdWx0O1xuXHRcdFx0XHQkdGhpcy5uZXh0KCcuZmlsZUlucHV0TGFiZWwnKS5yZW1vdmVDbGFzcygnZmlsZUlucHV0TGFiZWwnKS5hZGRDbGFzcygnc2VsZWN0ZWRJbnB1dExhYmVsJyk7XG5cdFx0XHRcdCR0aGlzLm5leHQoJy5zZWxlY3RlZElucHV0TGFiZWwnKS5maW5kKCdpbWcnKS5hdHRyKCdzcmMnLCBpbWFnZVNlbGVjdGVkKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRmaWxlUmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZXNbMF0pO1xuXHRcdH0pXG5cdFx0Lm9uKCdjaGFuZ2UnLCAnLmlucHV0VmlkZW8nLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyk7XG5cdFx0XHR2YXIgZmlsZXMgPSAkdGhpcy5wcm9wKCdmaWxlcycpO1xuXHRcdFx0dmFyIGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXHRcdFx0XG5cdFx0XHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtmaWxlc1swXV0sIHt0eXBlOiBmaWxlcy50eXBlfSk7XG5cdFx0XHR2YXIgdmlkZW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbGVjdGVkVmlkZW9cIik7XG5cdFx0XHR2YXIgdXJsID0gKFVSTCB8fCB3ZWJraXRVUkwpLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuXHRcdFx0dmlkZW8uc3JjID0gdXJsO1xuXHRcdFx0ZmlsZVJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihmaWxlc1swXSk7XG5cdFx0fSk7XG5cdH1cbn0iLCIvKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG4vL0NoYW5nZSBjbGFzcyBvZiBoZWFkZXIgb2YgYWxsIHBhZ2VcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHRvcERpdiA9ICQoJyN0b3BEaXYnKTtcblxuICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+PSAzMDApIHtcbiAgICAgICAgICAgIHRvcERpdi5yZW1vdmVDbGFzcygndG9wRGl2JykuYWRkQ2xhc3MoJ3RvcERpdkZpeGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0b3BEaXYucmVtb3ZlQ2xhc3MoJ3RvcERpdkZpeGVkJykuYWRkQ2xhc3MoJ3RvcERpdicpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKCcjZm9vdGVyJykub24oXCJjbGlja1wiLCBcIiN0b3BEaXZcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgICAgIH0sNTAwKTtcbiAgICB9KTtcbn0pOyIsIi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIHZhciBwYXJhbGxheCA9IG5ldyBQYXJhbGxheCgpO1xuICAgIHZhciBzbGlkZSA9IG5ldyBTbGlkZSgpO1xuICAgIHZhciB3YXRjaGxpc3QgPSBuZXcgV2F0Y2hsaXN0KCk7XG4gICAgdmFyIGRldGFpbHMgPSBuZXcgRGV0YWlscygpO1xuICAgIHZhciB1c2VyT3RoZXJzID0gbmV3IFVzZXJPdGhlcnMoKTtcblxuICAgIC8vTm90IGNvbm5lY3RlZFxuXG4gICAgJCh0aGlzKS5vbignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHBhcmFsbGF4LnBhcmFsbGF4SG9tZSgpO1xuICAgIH0pO1xuXG4gICAgdXNlck90aGVycy50YWJTZWxlY3QodHJ1ZSk7XG5cbiAgICAvL0Nvbm5lY3RlZFxuXG4gICAgaWYoJCgnI2NvbnRlbnRTbGlkZXIgI2NoYW5nZURpdicpLmxlbmd0aCkge1xuICAgICAgICB2YXIgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKHNsaWRlLnNsaWRlSW5kZXgoKSwgNTAwMCk7XG5cbiAgICAgICAgc2xpZGUuY2hhbmdlSW5kZXgoJyNjb250ZW50U2xpZGVyJyk7XG4gICAgfVxuXG4gICAgJCgnI2ltYWdlRGl2IGRpdicpLm9uKCdjbGljaycsICcuYWRkV2F0Y2hMaXN0Jywgd2F0Y2hsaXN0LmFkZFdhdGNoTGlzdEluZGV4KTtcbiAgICAkKCcjaW1hZ2VEaXYgZGl2Jykub24oJ2NsaWNrJywgJy5yZW1vdmVXYXRjaExpc3QnLCB3YXRjaGxpc3QucmVtb3ZlV2F0Y2hMaXN0SW5kZXgpO1xuXG4gICAgJCgnLmNvbnRlbnRHcm91cFNjcm9sbCcpLm9uKCdjbGljaycsICcuY29udGVudCAuYWRkV2F0Y2hMaXN0Jywgd2F0Y2hsaXN0LmFkZFdhdGNoTGlzdEluZGV4KTtcbiAgICAkKCcuY29udGVudEdyb3VwU2Nyb2xsJykub24oJ2NsaWNrJywgJy5jb250ZW50IC5yZW1vdmVXYXRjaExpc3QnLCB3YXRjaGxpc3QucmVtb3ZlV2F0Y2hMaXN0SW5kZXgpO1xuXG4gICAgLy8kKCcuY29udGVudEdyb3VwU2Nyb2xsJykub24oJ2NsaWNrJywgJy5jb250ZW50JywgZGV0YWlscy5zaG93RGV0YWlscyk7XG4gICAgLy8kKCcuY29udGVudENvbnRhaW5lcicpLm9uKCdjbGljaycsICcuY2xvc2VCdXR0b24nLCBkZXRhaWxzLmNsb3NlRGV0YWlscyk7XG59KTsiLCIvKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAvL2FkbWluU2NyaXB0LnRvZ2dsZU1lbnUoXCIjaGVhZGVyXCIpO1xuICAgIC8vYWRtaW5TY3JpcHQubWVudUFjY29yZGlvbihcIi5tZW51T3BlbmVkXCIpO1xuICAgIFxuICAgIC8vRHluYW1pYyBtaW5pbXVtIHBhZ2UgaGVpZ2h0XG4gICAgXG4gICAgJChcImJvZHkgPiBzZWN0aW9uXCIpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICAgICAkKFwiLmludGVyZmFjZVwiKS5jc3MoJ21pbi1oZWlnaHQnICwgKCQoZG9jdW1lbnQpLmhlaWdodCgpIC0gNzApICsgJ3B4Jyk7XG4gICAgfSk7XG4gICAgJChcIiNoZWFkZXJcIikub24oJ2NsaWNrJywgJyNzZXR0aW5nc09wZW4nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnI2NvbmZpZ0JhcicpLnRvZ2dsZUNsYXNzKCdjb25maWdCYXJPcGVuJyk7XG4gICAgfSk7XG59KTsiLCIvKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG4vL0ltcG9ydCBhbGwgY2xhc3NlcyBhbmQgY29uZmlnc1xuXG5pbXBvcnQgJy4vY29uZmlnL2NvbmZpZyc7XG5cbi8vQWpheCBzY3JpcHRzXG5cbmltcG9ydCAnLi9jbGFzc2VzL2FqYXgvYWpheC5jbGFzcyc7XG5pbXBvcnQgJy4vY2xhc3Nlcy9hamF4L2RldGFpbHMuY2xhc3MnO1xuaW1wb3J0ICcuL2NsYXNzZXMvYWpheC9jb21tZW50cy5jbGFzcyc7XG5pbXBvcnQgJy4vY2xhc3Nlcy9hamF4L2ZvbGxvdy5jbGFzcyc7XG5pbXBvcnQgJy4vY2xhc3Nlcy9hamF4L3dhdGNobGlzdC5jbGFzcyc7XG5cbi8vVXNlciBzY3JpcHRzXG5cbmltcG9ydCAnLi9jbGFzc2VzL3VzZXIvbG9naW4uY2xhc3MnO1xuaW1wb3J0ICcuL2NsYXNzZXMvdXNlci9wYXJhbGxheC5jbGFzcyc7XG5pbXBvcnQgJy4vY2xhc3Nlcy91c2VyL3NsaWRlLmNsYXNzJztcbmltcG9ydCAnLi9jbGFzc2VzL3VzZXIvb3RoZXJzLmNsYXNzJztcblxuLy9BZG1pbiBzY3JpcHRzXG5cbmltcG9ydCAnLi9jbGFzc2VzL2FkbWluL21lbnUuY2xhc3MnO1xuaW1wb3J0ICcuL2NsYXNzZXMvYWRtaW4vb3RoZXJzLmNsYXNzJztcblxuLy9DcmVhdGUgdGhlIGV2ZW50c1xuXG5pbXBvcnQgJy4vZXZlbnRzL2FsbCc7XG5pbXBvcnQgJy4vZXZlbnRzL2luZGV4JztcbmltcG9ydCAnLi9ldmVudHMvYWRtaW4nOyIsIi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIC8vQ2xvc2UgdGhlIG1lc3NhZ2UgZGlzcGxheWVkIHdoZW4gaGFzIHNvbWUgZXJyb3JcblxuICAgIHZhciBvdGhlcnMgPSBuZXcgVXNlck90aGVycygpO1xuICAgIHZhciBsb2dpbiA9IG5ldyBMb2dpbigpO1xuXG4gICAgbG9naW4uaW5wdXRFcnJvcignLnVzZXJEaXYnKTtcbiAgICBvdGhlcnMuY2xvc2VNZXNzYWdlKCcudXNlckVycm9yJywgJyNlcnJvck1zZ0Nsb3NlJyk7XG59KTsiXX0=
