/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
//Service worker init
//import {Index} from './pages/index';
/*if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
        console.log('ServiceWorker registration successful');
        /*new ShowNotification(
            'Joker',
            'ServiceWorker registration successful',
            'ServiceWorker'
        );
    })
    .catch(function(error) {
        console.log('ServiceWorker registration failed', error);
    });
    navigator.serviceWorker.oncontrollerchange = function() {
        console.log('Refresh to see the newest content');
    }
}*/
//Change class of header of all page
$(document).ready(function () {
    var thisPage = $('main').attr('data-page');
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
    if (thisPage == 'index')
        new Index();
    if (thisPage == 'title')
        new Title();
});
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
var Config = /** @class */ (function () {
    function Config() {
        this.baseUrl = $('head').attr('data-url');
        this.cookieId = $('head').attr('data-cookie');
        //var intervalLogoff:number = setInterval(userScript.secureLogoff(baseUrl), 250);
    }
    return Config;
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
var ShowNotification = /** @class */ (function () {
    function ShowNotification(type, message, tag) {
        Notification.requestPermission(function (result) {
            if (result === 'granted') {
                navigator.serviceWorker.ready.then(function (registration) {
                    registration.showNotification(type, {
                        body: message,
                        icon: 'images/favicon.png',
                        //vibrate: [200, 100, 200, 100, 200, 100, 200],
                        tag: tag
                    });
                });
            }
        });
    }
    return ShowNotification;
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
var Parallax = /** @class */ (function () {
    function Parallax() {
    }
    //Effect of external index
    Parallax.prototype.parallaxHome = function () {
        var parallaxOut = '#descImage > img';
        var parallaxIn = '#contentSlider > article > div > img';
        if ($(document).scrollTop() < 450) {
            $(parallaxOut).css("top", (window.pageYOffset / 2) + 'px');
            $(parallaxIn).css("top", (window.pageYOffset / 2) + 'px');
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
            //clearInterval(intervalId);
            $('.changeShow').removeClass('changeShow').addClass('changeHide');
            $(this).removeClass('changeHide').addClass('changeShow');
            var indice = $(this).index();
            indice++;
            $('#imageDiv .imageShow').removeClass('imageShow').addClass('imageHide');
            $('#imageDiv div:nth-of-type(' + indice + ')').removeClass('imageHide').addClass('imageShow');
        });
        //Previous button
        $(slider).on('click', '#previousImage', function () {
            //clearInterval(intervalId);
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
            //clearInterval(intervalId);
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
var Index = /** @class */ (function () {
    function Index() {
        var parallax = new Parallax();
        var slide = new Slide();
        var watchlist = new Watchlist();
        var details = new Details();
        var userOthers = new UserOthers();
        //Not connected
        $(document).on('scroll', function () {
            parallax.parallaxHome();
        });
        userOthers.tabSelect(false);
        //Connected
        if ($('#contentSlider #changeDiv').length) {
            //var intervalId = setInterval(slide.slideIndex, 5000);
            slide.changeIndex('#contentSlider');
        }
        $('#imageDiv div').on('click', '.addWatchList', watchlist.addWatchListIndex);
        $('#imageDiv div').on('click', '.removeWatchList', watchlist.removeWatchListIndex);
        $('.contentGroupScroll').on('click', '.content .addWatchList', watchlist.addWatchListIndex);
        $('.contentGroupScroll').on('click', '.content .removeWatchList', watchlist.removeWatchListIndex);
        $('.contentGroupScroll').on('click', '.content', details.showDetails);
        $('.contentContainer').on('click', '.closeButton', details.closeDetails);
    }
    return Index;
}());
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
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
var Title = /** @class */ (function () {
    function Title() {
        var userOthers = new UserOthers();
        var watchlist = new Watchlist();
        var comments = new Comments();
        userOthers.tabSelect(false);
        userOthers.hideReply(".commentGroup");
        userOthers.episodeSelect("#seasonBrowse");
        $('#contentSortcuts').on('click', '.addWatchList', watchlist.addWatchList);
        $('#contentSortcuts').on('click', '.removeWatchList', watchlist.removeWatchList);
        $('#commentFormDiv').on('click', '#commentSubmit', comments.makeComment);
        $('#commentOptionsDiv').on('click', '#buttonEdit', comments.editComment);
        $('#commentOptionsDiv').on('click', '#buttonDelete', comments.deleteComment);
        userOthers.disableEnable();
        //posterParalax('#contentImage');
    }
    return Title;
}());
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
        _super.prototype.getPage.call(this, contentLink, "body=true", function (data) {
            var filter = $(data).children();
            //console.log(data);
            $('.titleDetailsOpen').find('.sectionContent').html(filter);
            new Title();
        });
        _super.prototype.changeUrl.call(this, contentLink);
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
            //super.changeUrl(linkToBack);
            $('title').empty().text(titleToBack);
        });
        _super.prototype.changeUrl.call(this, linkToBack);
    };
    return Details;
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
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
var Watchlist = /** @class */ (function (_super) {
    __extends(Watchlist, _super);
    function Watchlist() {
        return _super !== null && _super.apply(this, arguments) || this;
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
}(Ajax));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXJTY3JpcHQudHMiLCJjbGFzc2VzL2NvbmZpZy5jbGFzcy50cyIsImNsYXNzZXMvbG9naW4uY2xhc3MudHMiLCJjbGFzc2VzL25vdGlmaWNhdGlvbnMuY2xhc3MudHMiLCJjbGFzc2VzL290aGVycy5jbGFzcy50cyIsImNsYXNzZXMvcGFyYWxsYXguY2xhc3MudHMiLCJjbGFzc2VzL3NsaWRlLmNsYXNzLnRzIiwicGFnZXMvaW5kZXgudHMiLCJwYWdlcy9sb2dpbi50cyIsInBhZ2VzL3RpdGxlLnRzIiwiY2xhc3Nlcy9hamF4L2FqYXguY2xhc3MudHMiLCJjbGFzc2VzL2FqYXgvY29tbWVudHMuY2xhc3MudHMiLCJjbGFzc2VzL2FqYXgvZGV0YWlscy5jbGFzcy50cyIsImNsYXNzZXMvYWpheC9mb2xsb3cuY2xhc3MudHMiLCJjbGFzc2VzL2FqYXgvd2F0Y2hsaXN0LmNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztFQUtFO0FBRUYscUJBQXFCO0FBRXJCLHNDQUFzQztBQUV0Qzs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFFSCxvQ0FBb0M7QUFFcEMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNkLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFM0MsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUU7UUFDbkIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3pELENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZ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O1lBQ0wsQ0FBQztZQUNELElBQUksQ0FBQyxDQUFDO2dCQUNGLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNuQixDQUFDO1FBQ0wsQ0FBQyxDQUFDO1FBQ0YsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFDTCxnQkFBQztBQUFELENBckdBLEFBcUdDLENBckd1QixJQUFJLEdBcUczQiIsImZpbGUiOiJ1c2VyU2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiB8IENvcHlyaWdodCAoYykgMjAxNC0yMDE1IEF0b21vLmNvbS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiB8IEAgQXV0aG9yXHQ6IERhbmllbCBSaW9zLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKi9cblxuLy9TZXJ2aWNlIHdvcmtlciBpbml0XG5cbi8vaW1wb3J0IHtJbmRleH0gZnJvbSAnLi9wYWdlcy9pbmRleCc7XG5cbi8qaWYoJ3NlcnZpY2VXb3JrZXInIGluIG5hdmlnYXRvcikge1xuICAgIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLnJlZ2lzdGVyKCdzdy5qcycpLnRoZW4oZnVuY3Rpb24ocmVnaXN0cmF0aW9uKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdTZXJ2aWNlV29ya2VyIHJlZ2lzdHJhdGlvbiBzdWNjZXNzZnVsJyk7XG4gICAgICAgIC8qbmV3IFNob3dOb3RpZmljYXRpb24oXG4gICAgICAgICAgICAnSm9rZXInLFxuICAgICAgICAgICAgJ1NlcnZpY2VXb3JrZXIgcmVnaXN0cmF0aW9uIHN1Y2Nlc3NmdWwnLFxuICAgICAgICAgICAgJ1NlcnZpY2VXb3JrZXInXG4gICAgICAgICk7XG4gICAgfSlcbiAgICAuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1NlcnZpY2VXb3JrZXIgcmVnaXN0cmF0aW9uIGZhaWxlZCcsIGVycm9yKTtcbiAgICB9KTtcbiAgICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5vbmNvbnRyb2xsZXJjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1JlZnJlc2ggdG8gc2VlIHRoZSBuZXdlc3QgY29udGVudCcpO1xuICAgIH1cbn0qL1xuXG4vL0NoYW5nZSBjbGFzcyBvZiBoZWFkZXIgb2YgYWxsIHBhZ2VcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgbGV0IHRoaXNQYWdlID0gJCgnbWFpbicpLmF0dHIoJ2RhdGEtcGFnZScpO1xuXG4gICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHRvcERpdiA9ICQoJyN0b3BEaXYnKTtcblxuICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+PSAzMDApIHtcbiAgICAgICAgICAgIHRvcERpdi5yZW1vdmVDbGFzcygndG9wRGl2JykuYWRkQ2xhc3MoJ3RvcERpdkZpeGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0b3BEaXYucmVtb3ZlQ2xhc3MoJ3RvcERpdkZpeGVkJykuYWRkQ2xhc3MoJ3RvcERpdicpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKCcjZm9vdGVyJykub24oXCJjbGlja1wiLCBcIiN0b3BEaXZcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgICAgIH0sNTAwKTtcbiAgICB9KTtcbiAgICBpZih0aGlzUGFnZSA9PSAnaW5kZXgnKVxuICAgICAgICBuZXcgSW5kZXgoKTtcbiAgICBpZih0aGlzUGFnZSA9PSAndGl0bGUnKVxuICAgICAgICBuZXcgVGl0bGUoKTtcbn0pO1xuIiwiLypcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiB8IENvcHlyaWdodCAoYykgMjAxNC0yMDE1IEF0b21vLmNvbS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiB8IEAgQXV0aG9yXHQ6IERhbmllbCBSaW9zLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKi9cblxuY2xhc3MgQ29uZmlnIHtcbiAgICBwdWJsaWMgYmFzZVVybDpzdHJpbmcgPSAkKCdoZWFkJykuYXR0cignZGF0YS11cmwnKTtcbiAgICBwdWJsaWMgY29va2llSWQ6c3RyaW5nID0gJCgnaGVhZCcpLmF0dHIoJ2RhdGEtY29va2llJyk7XG4gICAgXG4gICAgLy92YXIgaW50ZXJ2YWxMb2dvZmY6bnVtYmVyID0gc2V0SW50ZXJ2YWwodXNlclNjcmlwdC5zZWN1cmVMb2dvZmYoYmFzZVVybCksIDI1MCk7XG59IiwiLypcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiB8IENvcHlyaWdodCAoYykgMjAxNC0yMDE1IEF0b21vLmNvbS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiB8IEAgQXV0aG9yXHQ6IERhbmllbCBSaW9zLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKi9cblxuY2xhc3MgTG9naW4ge1xuICAgIGlucHV0RXJyb3IocGFyZW50RGl2OnN0cmluZyk6dm9pZCB7XG5cdFx0JChwYXJlbnREaXYpLm9uKCdmb2N1c291dCcsICcuaW5wdXRUZXh0JywgZnVuY3Rpb24oKSB7XG5cdFx0XHRpZigoJCh0aGlzKSBhcyBhbnkpLnZhbCgpLmxlbmd0aCA8IDEpIHtcblx0XHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygnaW5wdXRUZXh0JykuYWRkQ2xhc3MoJ2lucHV0VGV4dEVycm9yJyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0XG5cdFx0JChwYXJlbnREaXYpLm9uKCdmb2N1c291dCcsICcuaW5wdXRUZXh0RXJyb3InLCBmdW5jdGlvbigpIHtcblx0XHRcdGlmKCgkKHRoaXMpIGFzIGFueSkudmFsKCkubGVuZ3RoID49IDEpIHtcblx0XHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygnaW5wdXRUZXh0RXJyb3InKS5hZGRDbGFzcygnaW5wdXRUZXh0Jyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRzZWN1cmVMb2dvZmYodXJsKTp2b2lkIHtcblx0XHRpZighZG9jdW1lbnQuY29va2llLm1hdGNoKCdsb2dpbicpKSB7XG5cdFx0XHRsb2NhdGlvbi5yZXBsYWNlKHVybCArICdsb2dvZmYnKTtcblx0XHR9XG5cdH1cbn0iLCIvKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG5jbGFzcyBTaG93Tm90aWZpY2F0aW9uIHtcbiAgICBwdWJsaWMgY29uc3RydWN0b3IodHlwZTpzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgdGFnOiBzdHJpbmcpIHtcbiAgICAgICAgTm90aWZpY2F0aW9uLnJlcXVlc3RQZXJtaXNzaW9uKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gJ2dyYW50ZWQnKSB7XG4gICAgICAgICAgICAgICAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIucmVhZHkudGhlbihmdW5jdGlvbihyZWdpc3RyYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0cmF0aW9uLnNob3dOb3RpZmljYXRpb24odHlwZSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogbWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdpbWFnZXMvZmF2aWNvbi5wbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy92aWJyYXRlOiBbMjAwLCAxMDAsIDIwMCwgMTAwLCAyMDAsIDEwMCwgMjAwXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogdGFnXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59IiwiLypcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiB8IENvcHlyaWdodCAoYykgMjAxNC0yMDE1IEF0b21vLmNvbS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiB8IEAgQXV0aG9yXHQ6IERhbmllbCBSaW9zLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKi9cblxuY2xhc3MgVXNlck90aGVycyB7XG4gICAgLyoqXG5cdCAqIGhpZGUgdGhlIHJlcGxpZXNcblx0ICovXG4gICAgXG4gICAgaGlkZVJlcGx5KGRpdjpzdHJpbmcpOnZvaWQge1xuXHRcdCQoZGl2KS5vbihcImNsaWNrXCIsIFwiLm5vSGlkZVwiLCBmdW5jdGlvbigpIHtcblx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoXCJub0hpZGVcIikuYWRkQ2xhc3MoXCJoaWRlXCIpO1xuXHRcdH0pXG5cdFx0Lm9uKFwiY2xpY2tcIiwgXCIuaGlkZVwiLCBmdW5jdGlvbigpIHtcblx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpLmFkZENsYXNzKFwibm9IaWRlXCIpO1xuXHRcdH0pO1xuICAgIH1cbiAgICAvL0Nsb3NlIE1lc3NhZ2VcblxuXHRjbG9zZU1lc3NhZ2UoZXJyb3JEaXY6c3RyaW5nLCBlcnJvckJ0bjpzdHJpbmcpOnZvaWQge1xuXHRcdCQoZXJyb3JEaXYpLm9uKFwiY2xpY2tcIiwgZXJyb3JCdG4sIGZ1bmN0aW9uKCkge1xuXHRcdFx0JCh0aGlzKS5wYXJlbnQoKS5yZW1vdmUoKTtcblx0XHRcdC8vbG9jYXRpb24uaHJlZiA9IGhpc3RvcnkuZ28oLTEpO1xuXHRcdH0pO1xuXHR9XG5cblx0Ly9UYWIgU2VsZWN0XG5cblx0dGFiU2VsZWN0KElzU2Nyb2xsOmJvb2xlYW4pOnZvaWQge1xuXHRcdHZhciBzY3JvbGwgPSBJc1Njcm9sbCA/IElzU2Nyb2xsIDogZmFsc2U7XG5cblx0XHQkKFwiI3RhYkhlYWRlclwiKS5vbihcImNsaWNrXCIsIFwiLnRhYlwiLCBmdW5jdGlvbigpIHtcblx0XHRcdCQoXCIjdGFiSGVhZGVyIC50YWJTZWxlY3RlZFwiKS5yZW1vdmVDbGFzcyhcInRhYlNlbGVjdGVkXCIpLmFkZENsYXNzKFwidGFiXCIpO1xuXHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcyhcInRhYlwiKS5hZGRDbGFzcyhcInRhYlNlbGVjdGVkXCIpO1xuXHRcdFx0XG5cdFx0XHR2YXIgaW5kaWNlID0gJCh0aGlzKS5pbmRleCgpO1xuXHRcdFx0aW5kaWNlICsrO1xuXHRcdFx0XG5cdFx0XHQkKFwiI3RhYkNvbnRlbnRzIC5jb250ZW50U2hvd1wiKS5yZW1vdmVDbGFzcygnY29udGVudFNob3cnKS5hZGRDbGFzcygnY29udGVudEhpZGUnKTtcblx0XHRcdCQoXCIjdGFiQ29udGVudHMgLmNvbnRlbnRIaWRlOm50aC1vZi10eXBlKFwiICsgaW5kaWNlICsgXCIpXCIpLnJlbW92ZUNsYXNzKCdjb250ZW50SGlkZScpLmFkZENsYXNzKCdjb250ZW50U2hvdycpO1xuXHRcdH0pXG5cdFx0Lm9uKCdjbGljaycsICdkaXYnLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0aWYoc2Nyb2xsID09IHRydWUpIHtcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0JCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuXHRcdFx0XHRcdHNjcm9sbFRvcDogNDUwXG5cdFx0XHRcdH0sNTAwKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdC8vRXBpc29kZSBTZWxlY3RcblxuXHRlcGlzb2RlU2VsZWN0KGVwaXNvZGVTbGlkZXI6c3RyaW5nKTp2b2lkIHtcblx0XHQkKGVwaXNvZGVTbGlkZXIpLm9uKFwiY2xpY2tcIiwgXCIuc2Vhc29uU2VsZWN0IC5zZWFzb25TcGFuXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0JChcIiNzZWFzb25TZWxlY3RcIikucmVtb3ZlQ2xhc3MoXCJzZWFzb25TZWxlY3RcIikuYWRkQ2xhc3MoXCJzZWFzb25TZWxlY3RPcGVuXCIpO1xuXHRcdFx0JChcIi5zZWFzb25IaWRlXCIpLnJlbW92ZUNsYXNzKFwic2Vhc29uSGlkZVwiKS5hZGRDbGFzcyhcInNlYXNvblNob3dcIik7XG5cdFx0fSlcblx0XHQub24oXCJjbGlja1wiLCBcIi5zZWFzb25TZWxlY3RPcGVuIC5zZWFzb25TcGFuXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0JChcIiNzZWFzb25TZWxlY3RcIikucmVtb3ZlQ2xhc3MoXCJzZWFzb25TZWxlY3RPcGVuXCIpLmFkZENsYXNzKFwic2Vhc29uU2VsZWN0XCIpO1xuXHRcdFx0JChcIi5zZWFzb25TaG93XCIpLnJlbW92ZUNsYXNzKFwic2Vhc29uU2hvd1wiKS5hZGRDbGFzcyhcInNlYXNvbkhpZGVcIik7XG5cdFx0XHRcblx0XHRcdHZhciBpbmRpY2UgPSAkKHRoaXMpLnBhcmVudCgpO1xuXHRcdFx0aW5kaWNlLnJlbW92ZUNsYXNzKFwic2Vhc29uSGlkZVwiKS5hZGRDbGFzcyhcInNlYXNvblNob3dcIik7XG5cdFx0XHRcblx0XHRcdHZhciBpbmRpY2VTaG93ID0gJCh0aGlzKS5wYXJlbnQoKS5pbmRleCgpO1xuXHRcdFx0aW5kaWNlU2hvdyArKztcblx0XHRcdFxuXHRcdFx0JChcIiNlcGlzb2RlRGl2IC5zZWFzb25Hcm91cFNob3dcIikucmVtb3ZlQ2xhc3MoXCJzZWFzb25Hcm91cFNob3dcIikuYWRkQ2xhc3MoXCJzZWFzb25Hcm91cEhpZGVcIik7XG5cdFx0XHQkKFwiI2VwaXNvZGVEaXYgLmNvbnRlbnRHcm91cDpudGgtb2YtdHlwZShcIiArIGluZGljZVNob3cgKyBcIilcIikucmVtb3ZlQ2xhc3MoXCJzZWFzb25Hcm91cEhpZGVcIikuYWRkQ2xhc3MoXCJzZWFzb25Hcm91cFNob3dcIik7XG5cdFx0XHRcblx0XHRcdGlmKCQoXCIjZXBpc29kZURpdiAuY29udGVudEdyb3VwOm50aC1vZi10eXBlKFwiICsgaW5kaWNlU2hvdyArIFwiKVwiKS53aWR0aCgpID4gJChcIiNlcGlzb2RlRGl2XCIpLndpZHRoKCkpIHtcblx0XHRcdFx0JChcIiNlcGlzb2RlRGl2XCIpLmZpbmQoJy5uZXh0SGlkZScpLnJlbW92ZUNsYXNzKCduZXh0SGlkZScpLmFkZENsYXNzKCduZXh0U2hvdycpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdCQoXCIjZXBpc29kZURpdlwiKS5maW5kKCcubmV4dFNob3cnKS5yZW1vdmVDbGFzcygnbmV4dFNob3cnKS5hZGRDbGFzcygnbmV4dEhpZGUnKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vRXBpc29kZSBTZWxlY3QgQ2xvc2VcblxuXHRcdCQoZXBpc29kZVNsaWRlcikub24oXCJtb3VzZWxlYXZlXCIsIFwiLnNlYXNvblNlbGVjdE9wZW5cIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgaW5kZXhDbG9zZSA9ICQoXCIjZXBpc29kZURpdiAuc2Vhc29uR3JvdXBTaG93XCIpLmluZGV4KCk7XG5cdFx0XHRpbmRleENsb3NlKys7XG5cblx0XHRcdCQoXCIjc2Vhc29uU2VsZWN0XCIpLnJlbW92ZUNsYXNzKFwic2Vhc29uU2VsZWN0T3BlblwiKS5hZGRDbGFzcyhcInNlYXNvblNlbGVjdFwiKTtcblx0XHRcdCQoXCIuc2Vhc29uU2hvd1wiKS5yZW1vdmVDbGFzcyhcInNlYXNvblNob3dcIikuYWRkQ2xhc3MoXCJzZWFzb25IaWRlXCIpO1xuXHRcdFx0JChcIi5zZWFzb25IaWRlOm50aC1vZi10eXBlKFwiICsgaW5kZXhDbG9zZSArIFwiKVwiKS5yZW1vdmVDbGFzcyhcInNlYXNvbkhpZGVcIikuYWRkQ2xhc3MoXCJzZWFzb25TaG93XCIpO1xuXHRcdH0pO1xuXHR9XG5cdFxuXHRkaXNhYmxlRW5hYmxlKCk6dm9pZCB7XG5cdFx0JChcIiNjb21tZW50SW5wdXRcIikua2V5dXAoZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgY29tbWVudEJlZm9yZSA9ICQodGhpcykudmFsKCk7XG5cdFx0XHR2YXIgY2hlY2tDb21tZW50QmVmb3JlID0gKGNvbW1lbnRCZWZvcmUgYXMgYW55KS50cmltKCk7XG5cblx0XHRcdGlmKGNoZWNrQ29tbWVudEJlZm9yZSA9PSAnJykge1xuXHRcdFx0XHQvLyQoJyNjb21tZW50U3VibWl0JykuYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcblx0XHRcdFx0JCgnI2NvbW1lbnRTdWJtaXQnKS5hdHRyKCdkaXNhYmxlZCcpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdCQoJyNjb21tZW50U3VibWl0JykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufSIsIi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmNsYXNzIFBhcmFsbGF4IHtcbiAgICAvL0VmZmVjdCBvZiBleHRlcm5hbCBpbmRleFxuXG5cdHBhcmFsbGF4SG9tZSgpOnZvaWQge1xuXHRcdHZhciBwYXJhbGxheE91dDpzdHJpbmcgPSAnI2Rlc2NJbWFnZSA+IGltZyc7XG5cdFx0dmFyIHBhcmFsbGF4SW46c3RyaW5nID0gJyNjb250ZW50U2xpZGVyID4gYXJ0aWNsZSA+IGRpdiA+IGltZyc7XG5cblx0XHRpZiAoJChkb2N1bWVudCkuc2Nyb2xsVG9wKCkgPCA0NTApIHtcblx0XHRcdCQocGFyYWxsYXhPdXQpLmNzcyhcInRvcFwiICwgKHdpbmRvdy5wYWdlWU9mZnNldCAvIDIpICsgJ3B4Jyk7XG5cdFx0XHQkKHBhcmFsbGF4SW4pLmNzcyhcInRvcFwiICwgKHdpbmRvdy5wYWdlWU9mZnNldCAvIDIpICsgJ3B4Jyk7XG5cdFx0fVxuXHR9XG5cblx0cGFyYWxsYXhIZWFkZXJVc2VyKCk6dm9pZCB7XG5cdFx0Ly9FZmZlY3Qgb2YgaGVhZGVyIG9mIHByb2ZpbGUgcGFnZVxuXG5cdFx0dmFyIGltZ0RpdiA9ICQoJyN1c2VySGVhZGVySW1nJyk7XG5cblx0XHRpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA8IDIxMCkge1xuXHRcdFx0JChpbWdEaXYpLmNzcyhcInRvcFwiICwgKHdpbmRvdy5wYWdlWU9mZnNldCAvIDIuNikgKyAncHgnKTtcblx0XHR9XG5cblx0XHQvL0NoYW5nZSBjbGFzcyBvZiBoZWFkZXIgb2YgcHJvZmlsZSBwYWdlXG5cblx0XHR2YXIgdXNlckhlYWRlciA9ICQoJyN1c2VySGVhZGVyJyk7XG5cdFx0dmFyIHVzZXJIZWFkZXJJbWcgPSAkKCcjdXNlckhlYWRlckltZycpO1xuXG5cdFx0aWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPj0gMjEwKSB7XG5cdFx0XHR1c2VySGVhZGVyLnJlbW92ZUNsYXNzKCd1c2VySGVhZGVyJyk7XG5cdFx0XHR1c2VySGVhZGVyLmFkZENsYXNzKCd1c2VySGVhZGVyRml4ZWQnKTtcblx0XHRcdHVzZXJIZWFkZXJJbWcucmVtb3ZlQ2xhc3MoJ3VzZXJIZWFkZXJJbWcnKTtcblx0XHRcdHVzZXJIZWFkZXJJbWcuYWRkQ2xhc3MoJ3VzZXJIZWFkZXJJbWdGaXhlZCcpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHVzZXJIZWFkZXIucmVtb3ZlQ2xhc3MoJ3VzZXJIZWFkZXJGaXhlZCcpO1xuXHRcdFx0dXNlckhlYWRlci5hZGRDbGFzcygndXNlckhlYWRlcicpO1xuXHRcdFx0dXNlckhlYWRlckltZy5yZW1vdmVDbGFzcygndXNlckhlYWRlckltZ0ZpeGVkJyk7XG5cdFx0XHR1c2VySGVhZGVySW1nLmFkZENsYXNzKCd1c2VySGVhZGVySW1nJyk7XG5cdFx0fVxuXHR9XG5cblx0cGFyYWxsYXhJbWcoKTp2b2lkIHtcblx0XHQvL0VmZmVjdCBvZiB1c2VyIGltYWdlIG9mIHByb2ZpbGUgcGFnZVxuXG5cdFx0dmFyIGltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VySW1nRmlndXJlJyk7XG5cblx0XHRpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA8IDIxMCkge1xuXHRcdFx0aW1nLnN0eWxlLndpZHRoID0gKDE1MCAtICQodGhpcykuc2Nyb2xsVG9wKCkgLyAyLjEpICsgJ3B4Jztcblx0XHRcdGltZy5zdHlsZS5oZWlnaHQgPSAoMTUwIC0gJCh0aGlzKS5zY3JvbGxUb3AoKSAvIDIuMSkgKyAncHgnO1xuXHRcdFx0aW1nLnN0eWxlLmxlZnQgPSAoMCArICQodGhpcykuc2Nyb2xsVG9wKCkgLyA0LjIpICsgJ3B4Jztcblx0XHRcdGltZy5zdHlsZS50b3AgPSAoLTEyMCArICQodGhpcykuc2Nyb2xsVG9wKCkgLyA1LjIpICsgJ3B4Jztcblx0XHR9XG5cblx0XHQvL0NoYW5nZSBjbGFzcyBvZiB1c2VyIGltYWdlIG9mIHByb2ZpbGUgcGFnZVxuXG5cdFx0dmFyIHVzZXJJbWcgPSAkKCcjdXNlckltZ0ZpZ3VyZScpO1xuXG5cdFx0aWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPj0gMjEwKSB7XG5cdFx0XHR1c2VySW1nLnJlbW92ZUNsYXNzKCd1c2VySW1nRmlndXJlJyk7XG5cdFx0XHR1c2VySW1nLmFkZENsYXNzKCd1c2VySW1nRmlndXJlRml4ZWQnKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR1c2VySW1nLnJlbW92ZUNsYXNzKCd1c2VySW1nRmlndXJlRml4ZWQnKTtcblx0XHRcdHVzZXJJbWcuYWRkQ2xhc3MoJ3VzZXJJbWdGaWd1cmUnKTtcblx0XHR9XG5cdH1cblxuXHRwYXJhbGxheE5hbWUoKTp2b2lkIHtcblx0XHQvL0VmZmVjdCBvZiB1c2VyIG5hbWUgb2YgcHJvZmlsZSBwYWdlXG5cblx0XHR2YXIgbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyTmFtZURpdicpO1xuXG5cdFx0aWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPCAyMTApIHtcblx0XHRcdG5hbWUuc3R5bGUubGVmdCA9ICgyMjAgLSAkKHRoaXMpLnNjcm9sbFRvcCgpIC8gMy43NSkgKyAncHgnO1xuXHRcdH1cblxuXHRcdC8vQ2hhbmdlIGNsYXNzIG9mIHVzZXIgbmFtZSBkaXZcblxuXHRcdHZhciB1c2VyTmFtZSA9ICQoJyN1c2VyTmFtZURpdicpO1xuXG5cdFx0aWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPj0gMjEwKSB7XG5cdFx0XHR1c2VyTmFtZS5yZW1vdmVDbGFzcygndXNlck5hbWVEaXYnKTtcblx0XHRcdHVzZXJOYW1lLmFkZENsYXNzKCd1c2VyTmFtZURpdkZpeGVkJyk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dXNlck5hbWUucmVtb3ZlQ2xhc3MoJ3VzZXJOYW1lRGl2Rml4ZWQnKTtcblx0XHRcdHVzZXJOYW1lLmFkZENsYXNzKCd1c2VyTmFtZURpdicpO1xuXHRcdH1cblx0fVxuXG5cdHBvc3RlclBhcmFsYXgoaW1hZ2U6c3RyaW5nKTp2b2lkIHtcblx0XHR2YXIgJHBvc3RlciA9ICQoaW1hZ2UpO1xuXHRcdHZhciAkc2hpbmUgPSAkcG9zdGVyLmZpbmQoJy5zaGluZScpO1xuXHRcdHZhciAkbGF5ZXIgPSAkcG9zdGVyLmZpbmQoJypbY2xhc3MqPVwibGF5ZXItXCJdJyk7XG5cdFx0dmFyIHcgPSAkcG9zdGVyLndpZHRoKCk7XG5cdFx0dmFyIGggPSAkcG9zdGVyLmhlaWdodCgpO1xuXG5cdFx0JHBvc3Rlci5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24oZSkge1xuXHRcdFx0JCgnLm1haW5TZWN0aW9uJykuY3NzKHtcblx0XHRcdFx0J3RyYW5zZm9ybS1zdHlsZSc6ICdwcmVzZXJ2ZS0zZCcsXG5cdFx0XHRcdCd0cmFuc2Zvcm0nOiAncGVyc3BlY3RpdmUoMTAwMHB4KSdcblx0XHRcdH0pLFxuXHRcdFx0JCgnI2ltYWdlQmFjaycpLmNzcyh7XG5cdFx0XHRcdCd0b3AnOiAnMCdcblx0XHRcdH0pO1xuXG5cdFx0XHQvL3ZhciBvZmZzZXRYID0gMC41IC0gZS5wYWdlWCAvIHc7IC8vIGN1cnNvciBob3Jcblx0XHRcdC8vdmFyIG9mZnNldFkgPSAwLjUgLSBlLnBhZ2VZIC8gaDsgLy8gY3Vyc29yIHZlcnRcblx0XHRcdHZhciBvZmZzZXRYID0gMC41IC0gZS5wYWdlWCAvIHc7IC8vIGN1cnNvciBob3Jcblx0XHRcdHZhciBvZmZzZXRZID0gMC41IC0gZS5wYWdlWSAvIGg7IC8vIGN1cnNvciB2ZXJ0XG5cdFx0XHR2YXIgZHggPSBlLnBhZ2VYIC0gdyAvIDI7IC8vIHBvc3RlciBjZW50ZXIgaG9yXG5cdFx0XHR2YXIgZHkgPSBlLnBhZ2VZIC0gaCAvIDI7IC8vIHBvc3RlciBjZW50ZXIgdmVydFxuXHRcdFx0dmFyIHRoZXRhID0gTWF0aC5hdGFuMihkeSwgZHgpOyAvLyBhbmdsZSBiL3cgY3Vyc29yIGFuZCBwb3N0ZXIgY2VudGVyIGluIFJBRFxuXHRcdFx0dmFyIGFuZ2xlID0gdGhldGEgKiAxODAgLyBNYXRoLlBJIC0gOTA7IC8vIGNvbnZlcnQgcmFkIHRvIGRlZ3JlZXNcblx0XHRcdHZhciBvZmZzZXRQb3N0ZXIgPSAkcG9zdGVyLmRhdGEoJ29mZnNldCcpO1xuXHRcdFx0dmFyIHRyYW5zZm9ybVBvc3RlciA9ICd0cmFuc2xhdGVZKCcgKyAtb2Zmc2V0WCAqIG9mZnNldFBvc3RlciArICdweCkgcm90YXRlWCgnICsgKC1vZmZzZXRZICogb2Zmc2V0UG9zdGVyKSArICdkZWcpIHJvdGF0ZVkoJyArIChvZmZzZXRYICogKG9mZnNldFBvc3RlciAqIDIpKSArICdkZWcpJztcblx0XHRcdCRwb3N0ZXIuY3NzKCd0cmFuc2Zvcm0nLCB0cmFuc2Zvcm1Qb3N0ZXIpO1xuXG5cdFx0XHRpZiAoYW5nbGUgPCAwKSB7XG5cdFx0XHRcdGFuZ2xlID0gYW5nbGUgKyAzNjA7XG5cdFx0XHR9XG5cblx0XHRcdCRzaGluZS5jc3MoJ2JhY2tncm91bmQnLCAnbGluZWFyLWdyYWRpZW50KCcgKyBhbmdsZSArICdkZWcsIHJnYmEoMCwgMCwgMCwnICsgZS5wYWdlWSAvIGggKyAnKSAwJSxyZ2JhKDAsIDAsIDAsIDApIDgwJSknKTtcblx0XHRcdFxuXHRcdFx0JGxheWVyLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyk7XG5cdFx0XHRcdHZhciBvZmZzZXRMYXllciA9ICR0aGlzLmRhdGEoJ29mZnNldCcpIHx8IDA7XG5cdFx0XHRcdHZhciB0cmFuc2Zvcm1MYXllciA9ICd0cmFuc2xhdGVYKCcgKyBvZmZzZXRYICogb2Zmc2V0TGF5ZXIgKyAncHgpIHRyYW5zbGF0ZVkoJyArIG9mZnNldFkgKiBvZmZzZXRMYXllciArICdweCknO1xuXHRcdFx0XHRcblx0XHRcdFx0JHRoaXMuY3NzKCd0cmFuc2Zvcm0nLCB0cmFuc2Zvcm1MYXllcik7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxufSIsIi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmNsYXNzIFNsaWRlIHtcbiAgICBzbGlkZUluZGV4KCk6dm9pZCB7XG5cdFx0aWYoJCh0aGlzKS5zY3JvbGxUb3AoKSA8IDIwMCkge1xuXHRcdFx0aWYoKCQoJy5pbWFnZVNob3cnKSBhcyBhbnkpLm5leHQoKS5zaXplKCkpIHtcblx0XHRcdFx0JCgnLmltYWdlU2hvdycpLnJlbW92ZUNsYXNzKCdpbWFnZVNob3cnKS5hZGRDbGFzcygnaW1hZ2VIaWRlJykubmV4dCgpLnJlbW92ZUNsYXNzKCdpbWFnZUhpZGUnKS5hZGRDbGFzcygnaW1hZ2VTaG93Jyk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0KCQoJy5pbWFnZVNob3cnKSBhcyBhbnkpLnJlbW92ZUNsYXNzKCdpbWFnZVNob3cnKS5hZGRDbGFzcygnaW1hZ2VIaWRlJyk7XG5cdFx0XHRcdCQoJyNjb250ZW50U2xpZGVyICNpbWFnZURpdiBkaXY6bnRoLW9mLXR5cGUoMSknKS5yZW1vdmVDbGFzcygnaW1hZ2VIaWRlJykuYWRkQ2xhc3MoJ2ltYWdlU2hvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZigoJCgnLmNoYW5nZVNob3cnKSBhcyBhbnkpLm5leHQoKS5zaXplKCkpIHtcblx0XHRcdFx0JCgnLmNoYW5nZVNob3cnKS5yZW1vdmVDbGFzcygnY2hhbmdlU2hvdycpLmFkZENsYXNzKCdjaGFuZ2VIaWRlJykubmV4dCgpLnJlbW92ZUNsYXNzKCdjaGFuZ2VIaWRlJykuYWRkQ2xhc3MoJ2NoYW5nZVNob3cnKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHQkKCcuY2hhbmdlU2hvdycpLnJlbW92ZUNsYXNzKCdjaGFuZ2VTaG93JykuYWRkQ2xhc3MoJ2NoYW5nZUhpZGUnKTtcblx0XHRcdFx0JCgnI2NvbnRlbnRTbGlkZXIgI2NoYW5nZURpdiBkaXY6bnRoLW9mLXR5cGUoMSknKS5yZW1vdmVDbGFzcygnY2hhbmdlSGlkZScpLmFkZENsYXNzKCdjaGFuZ2VTaG93Jyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Y2hhbmdlSW5kZXgoc2xpZGVyOnN0cmluZyk6dm9pZCB7XG5cdFx0Ly9JbmRleCBidXR0b25zXG5cblx0XHQkKHNsaWRlcikub24oJ2NsaWNrJywgJy5jaGFuZ2VIaWRlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHQvL2NsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XG5cblx0XHRcdCQoJy5jaGFuZ2VTaG93JykucmVtb3ZlQ2xhc3MoJ2NoYW5nZVNob3cnKS5hZGRDbGFzcygnY2hhbmdlSGlkZScpO1xuXHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygnY2hhbmdlSGlkZScpLmFkZENsYXNzKCdjaGFuZ2VTaG93Jyk7XG5cblx0XHRcdHZhciBpbmRpY2UgPSAkKHRoaXMpLmluZGV4KCk7XG5cdFx0XHRpbmRpY2UgKys7XG5cblx0XHRcdCQoJyNpbWFnZURpdiAuaW1hZ2VTaG93JykucmVtb3ZlQ2xhc3MoJ2ltYWdlU2hvdycpLmFkZENsYXNzKCdpbWFnZUhpZGUnKTtcblx0XHRcdCQoJyNpbWFnZURpdiBkaXY6bnRoLW9mLXR5cGUoJyArIGluZGljZSArICcpJykucmVtb3ZlQ2xhc3MoJ2ltYWdlSGlkZScpLmFkZENsYXNzKCdpbWFnZVNob3cnKTtcblx0XHR9KTtcblxuXHRcdC8vUHJldmlvdXMgYnV0dG9uXG5cblx0XHQkKHNsaWRlcikub24oJ2NsaWNrJywgJyNwcmV2aW91c0ltYWdlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHQvL2NsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XG5cblx0XHRcdGlmKCgkKCcuaW1hZ2VTaG93JykgYXMgYW55KS5wcmV2KCkuc2l6ZSgpKSB7XG5cdFx0XHRcdCQoJy5pbWFnZVNob3cnKS5yZW1vdmVDbGFzcygnaW1hZ2VTaG93JykuYWRkQ2xhc3MoJ2ltYWdlSGlkZScpLnByZXYoKS5yZW1vdmVDbGFzcygnaW1hZ2VIaWRlJykuYWRkQ2xhc3MoJ2ltYWdlU2hvdycpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdCQoJy5pbWFnZVNob3cnKS5yZW1vdmVDbGFzcygnaW1hZ2VTaG93JykuYWRkQ2xhc3MoJ2ltYWdlSGlkZScpO1xuXHRcdFx0XHQkKCcjY29udGVudFNsaWRlciAjaW1hZ2VEaXYgZGl2Omxhc3QtY2hpbGQnKS5yZW1vdmVDbGFzcygnaW1hZ2VIaWRlJykuYWRkQ2xhc3MoJ2ltYWdlU2hvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgaW5kaWNlID0gJCh0aGlzKS5wYXJlbnQoKS5maW5kKCcjaW1hZ2VEaXYgLmltYWdlU2hvdycpLmluZGV4KCcjaW1hZ2VEaXYgZGl2Jyk7XG5cdFx0XHRpbmRpY2UgKys7XG5cblx0XHRcdCQoJyNjaGFuZ2VEaXYgZGl2JykucmVtb3ZlQ2xhc3MoJ2NoYW5nZVNob3cnKS5hZGRDbGFzcygnY2hhbmdlSGlkZScpO1xuXHRcdFx0JCgnI2NoYW5nZURpdiBkaXY6bnRoLW9mLXR5cGUoJyArIGluZGljZSArICcpJykucmVtb3ZlQ2xhc3MoJ2NoYW5nZUhpZGUnKS5hZGRDbGFzcygnY2hhbmdlU2hvdycpO1xuXHRcdH0pO1xuXG5cdFx0Ly9OZXh0IGJ1dHRvblxuXG5cdFx0JChzbGlkZXIpLm9uKCdjbGljaycsICcjbmV4dEltYWdlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHQvL2NsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XG5cblx0XHRcdGlmKCgkKCcuaW1hZ2VTaG93JykgYXMgYW55KS5uZXh0KCkuc2l6ZSgpKSB7XG5cdFx0XHRcdCQoJy5pbWFnZVNob3cnKS5yZW1vdmVDbGFzcygnaW1hZ2VTaG93JykuYWRkQ2xhc3MoJ2ltYWdlSGlkZScpLm5leHQoKS5yZW1vdmVDbGFzcygnaW1hZ2VIaWRlJykuYWRkQ2xhc3MoJ2ltYWdlU2hvdycpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdCQoJy5pbWFnZVNob3cnKS5yZW1vdmVDbGFzcygnaW1hZ2VTaG93JykuYWRkQ2xhc3MoJ2ltYWdlSGlkZScpO1xuXHRcdFx0XHQkKCcjY29udGVudFNsaWRlciAjaW1hZ2VEaXYgZGl2Om50aC1vZi10eXBlKDEpJykucmVtb3ZlQ2xhc3MoJ2ltYWdlSGlkZScpLmFkZENsYXNzKCdpbWFnZVNob3cnKTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGluZGljZSA9ICQodGhpcykucGFyZW50KCkuZmluZCgnI2ltYWdlRGl2IC5pbWFnZVNob3cnKS5pbmRleCgnI2ltYWdlRGl2IGRpdicpO1xuXHRcdFx0aW5kaWNlICsrO1xuXG5cdFx0XHQkKCcjY2hhbmdlRGl2IGRpdicpLnJlbW92ZUNsYXNzKCdjaGFuZ2VTaG93JykuYWRkQ2xhc3MoJ2NoYW5nZUhpZGUnKTtcblx0XHRcdCQoJyNjaGFuZ2VEaXYgZGl2Om50aC1vZi10eXBlKCcgKyBpbmRpY2UgKyAnKScpLnJlbW92ZUNsYXNzKCdjaGFuZ2VIaWRlJykuYWRkQ2xhc3MoJ2NoYW5nZVNob3cnKTtcblx0XHR9KTtcblx0fVxufSIsIi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmNsYXNzIEluZGV4IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdmFyIHBhcmFsbGF4ID0gbmV3IFBhcmFsbGF4KCk7XG4gICAgICAgIHZhciBzbGlkZSA9IG5ldyBTbGlkZSgpO1xuICAgICAgICB2YXIgd2F0Y2hsaXN0ID0gbmV3IFdhdGNobGlzdCgpO1xuICAgICAgICB2YXIgZGV0YWlscyA9IG5ldyBEZXRhaWxzKCk7XG4gICAgICAgIHZhciB1c2VyT3RoZXJzID0gbmV3IFVzZXJPdGhlcnMoKTtcblxuICAgICAgICAvL05vdCBjb25uZWN0ZWRcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBwYXJhbGxheC5wYXJhbGxheEhvbWUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdXNlck90aGVycy50YWJTZWxlY3QoZmFsc2UpO1xuXG4gICAgICAgIC8vQ29ubmVjdGVkXG5cbiAgICAgICAgaWYoJCgnI2NvbnRlbnRTbGlkZXIgI2NoYW5nZURpdicpLmxlbmd0aCkge1xuICAgICAgICAgICAgLy92YXIgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKHNsaWRlLnNsaWRlSW5kZXgsIDUwMDApO1xuXG4gICAgICAgICAgICBzbGlkZS5jaGFuZ2VJbmRleCgnI2NvbnRlbnRTbGlkZXInKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJyNpbWFnZURpdiBkaXYnKS5vbignY2xpY2snLCAnLmFkZFdhdGNoTGlzdCcsIHdhdGNobGlzdC5hZGRXYXRjaExpc3RJbmRleCk7XG4gICAgICAgICQoJyNpbWFnZURpdiBkaXYnKS5vbignY2xpY2snLCAnLnJlbW92ZVdhdGNoTGlzdCcsIHdhdGNobGlzdC5yZW1vdmVXYXRjaExpc3RJbmRleCk7XG5cbiAgICAgICAgJCgnLmNvbnRlbnRHcm91cFNjcm9sbCcpLm9uKCdjbGljaycsICcuY29udGVudCAuYWRkV2F0Y2hMaXN0Jywgd2F0Y2hsaXN0LmFkZFdhdGNoTGlzdEluZGV4KTtcbiAgICAgICAgJCgnLmNvbnRlbnRHcm91cFNjcm9sbCcpLm9uKCdjbGljaycsICcuY29udGVudCAucmVtb3ZlV2F0Y2hMaXN0Jywgd2F0Y2hsaXN0LnJlbW92ZVdhdGNoTGlzdEluZGV4KTtcblxuICAgICAgICAkKCcuY29udGVudEdyb3VwU2Nyb2xsJykub24oJ2NsaWNrJywgJy5jb250ZW50JywgZGV0YWlscy5zaG93RGV0YWlscyk7XG4gICAgICAgICQoJy5jb250ZW50Q29udGFpbmVyJykub24oJ2NsaWNrJywgJy5jbG9zZUJ1dHRvbicsIGRldGFpbHMuY2xvc2VEZXRhaWxzKTtcbiAgICB9XG59IiwiLypcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiB8IENvcHlyaWdodCAoYykgMjAxNC0yMDE1IEF0b21vLmNvbS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiB8IEAgQXV0aG9yXHQ6IERhbmllbCBSaW9zLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKi9cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgLy9DbG9zZSB0aGUgbWVzc2FnZSBkaXNwbGF5ZWQgd2hlbiBoYXMgc29tZSBlcnJvclxuXG4gICAgdmFyIG90aGVycyA9IG5ldyBVc2VyT3RoZXJzKCk7XG4gICAgdmFyIGxvZ2luID0gbmV3IExvZ2luKCk7XG5cbiAgICBsb2dpbi5pbnB1dEVycm9yKCcudXNlckRpdicpO1xuICAgIG90aGVycy5jbG9zZU1lc3NhZ2UoJy51c2VyRXJyb3InLCAnI2Vycm9yTXNnQ2xvc2UnKTtcbn0pOyIsIi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmNsYXNzIFRpdGxlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdmFyIHVzZXJPdGhlcnMgPSBuZXcgVXNlck90aGVycygpO1xuICAgICAgICB2YXIgd2F0Y2hsaXN0ID0gbmV3IFdhdGNobGlzdCgpO1xuICAgICAgICB2YXIgY29tbWVudHMgPSBuZXcgQ29tbWVudHMoKTtcblxuICAgICAgICB1c2VyT3RoZXJzLnRhYlNlbGVjdChmYWxzZSk7XG4gICAgICAgIHVzZXJPdGhlcnMuaGlkZVJlcGx5KFwiLmNvbW1lbnRHcm91cFwiKTtcbiAgICAgICAgdXNlck90aGVycy5lcGlzb2RlU2VsZWN0KFwiI3NlYXNvbkJyb3dzZVwiKTtcbiAgICAgICAgICAgIFxuICAgICAgICAkKCcjY29udGVudFNvcnRjdXRzJykub24oJ2NsaWNrJywgJy5hZGRXYXRjaExpc3QnLCB3YXRjaGxpc3QuYWRkV2F0Y2hMaXN0KTtcbiAgICAgICAgJCgnI2NvbnRlbnRTb3J0Y3V0cycpLm9uKCdjbGljaycsICcucmVtb3ZlV2F0Y2hMaXN0Jywgd2F0Y2hsaXN0LnJlbW92ZVdhdGNoTGlzdCk7XG4gICAgXG4gICAgICAgICQoJyNjb21tZW50Rm9ybURpdicpLm9uKCdjbGljaycsICcjY29tbWVudFN1Ym1pdCcsIGNvbW1lbnRzLm1ha2VDb21tZW50KTtcbiAgICAgICAgJCgnI2NvbW1lbnRPcHRpb25zRGl2Jykub24oJ2NsaWNrJywgJyNidXR0b25FZGl0JywgY29tbWVudHMuZWRpdENvbW1lbnQpO1xuICAgICAgICAkKCcjY29tbWVudE9wdGlvbnNEaXYnKS5vbignY2xpY2snLCAnI2J1dHRvbkRlbGV0ZScsIGNvbW1lbnRzLmRlbGV0ZUNvbW1lbnQpO1xuICAgIFxuICAgICAgICB1c2VyT3RoZXJzLmRpc2FibGVFbmFibGUoKTtcbiAgICAgICAgLy9wb3N0ZXJQYXJhbGF4KCcjY29udGVudEltYWdlJyk7XG4gICAgfVxufSIsIi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmNsYXNzIEFqYXgge1xuICAgIHB1YmxpYyBhamF4RmlsZTpzdHJpbmcgPSAnYWpheC9hamF4UmVxdWlzaXRpb25zLnBocCc7XG4gICAgXG4gICAgLy9mdW5jdGlvbiBmb3Igc2ltcGxlIGFqYXgsIHdpdGhvdXQgc2VudCBhbmQgcmVjZWl2ZWQgZGF0YXMsIGlmIHlvdSB3YW50IHRvIHJlY2VpdmUgYW5kL29yIHNlbmQgZGF0YXMsIGNyZWF0ZSBhbm90ZXIgb25lXG5cbiAgICBjaGFuZ2VVcmwodXJsOnN0cmluZyk6dm9pZCB7XG4gICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKHt9LCAnJywgdXJsKTtcbiAgICB9XG5cbiAgICBnZXRQYWdlKHBhZ2U6c3RyaW5nLCBwYXJhbWV0ZXJzOnN0cmluZywgY2FsbGJhY2s6YW55KTp2b2lkIHtcbiAgICAgICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgXG4gICAgICAgIHJlcXVlc3Qub3BlbignUE9TVCcsIHBhZ2UsIHRydWUpO1xuICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LXR5cGVcIiwgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIik7XG5cbiAgICAgICAgcmVxdWVzdC5vbnByb2dyZXNzID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAkKCcuYWpheFJlcGxhY2UnKS5hZGRDbGFzcygnbG9hZGluZycpO1xuICAgICAgICAgICAgdmFyIHBlcmNlbnQgPSAoZS5sb2FkZWQgLyBlLnRvdGFsKSAqIDEwMDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgJCgnLmxvYWRpbmc6YmVmb3JlJykuY3NzKHtcbiAgICAgICAgICAgICAgICB3aWR0aDogcGVyY2VudCArICclJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA+PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgPCA0MDApIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhyZXF1ZXN0LnJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdVbmV4cGVjdGVkIHN0YXR1cyBjb2RlICcgKyByZXF1ZXN0LnN0YXR1cyArICcgZm9yICcgKyBwYWdlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2FsbGJhY2soJ2Vycm9yIGJlZm9yZSBzZWRpbmcnKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVxdWVzdC5zZW5kKHBhcmFtZXRlcnMpO1xuICAgIH1cblxuICAgIGFqYXgobWV0aG9kOnN0cmluZywgYWN0aW9uOnN0cmluZywgZGF0YUlkLCBiZWZvcmUsIG5vdERvbmUsIGRvbmUpOnZvaWQge1xuICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB2YXIgdXJsID0gdGhpcy5hamF4RmlsZSArICc/YWpheEFjdGlvbj0nICsgYWN0aW9uICsgJyZhamF4SWQ9JyArIGRhdGFJZDtcbiAgICAgICAgXG4gICAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbm90RG9uZTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVxdWVzdC5vcGVuKG1ldGhvZCwgdXJsKTtcbiAgICAgICAgXG4gICAgICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPj0gMjAwICYmIHJlcXVlc3Quc3RhdHVzIDwgNDAwKSB7XG4gICAgICAgICAgICAgICAgZG9uZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vdERvbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3Quc2VuZCgpO1xuICAgIH1cbn0iLCIvKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG5jbGFzcyBDb21tZW50cyBleHRlbmRzIEFqYXgge1xuICAgIG1ha2VDb21tZW50KCk6dm9pZCB7XG4gICAgICAgIHZhciBjb21tZW50ID0gJChcIiNjb21tZW50SW5wdXRcIikudmFsKCk7XG4gICAgICAgIHZhciBjaGVja0NvbW1lbnQgPSAoY29tbWVudCBhcyBhbnkpLnRyaW0oKTtcbiAgICAgICAgXG4gICAgICAgIGlmKGNoZWNrQ29tbWVudCA9PSAnJykge1xuICAgICAgICAgICAgYWxlcnQoJ1R5cGUgYSBjb21tZW50Jyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXG4gICAgICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICAgICAgICByZXF1ZXN0Lm9wZW4oJ1BPU1QnLCB0aGlzLmFqYXhGaWxlICsgJz9hamF4QWN0aW9uPW1ha2VDb21tZW50JmFqYXhJZD0nICsgJHRoaXMuYXR0cignZGF0YS1pZCcpKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC10eXBlXCIsIFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIpO1xuXG4gICAgICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBhbGVydChcIkNvbW1lbnQgbm90IG1hZGVcIik7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICQoJyNjb21tZW50c0RpdiAjY29tbWVudEZvcm1EaXYnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAkKCcjY29tbWVudHNEaXYnKS5wcmVwZW5kKCc8ZGl2IGlkPVwidXNlckNvbW1lbnRcIj48aW1nIHNyYz1cIicgKyBiYXNlVXJsICsgJ2ltYWdlcy91c2VyLycgKyAkdGhpcy5hdHRyKCdkYXRhLXVzZXJpZCcpICsgJy9wcm9maWxlLmpwZ1wiLz48ZGl2IGlkPVwicmlnaHREaXZcIj48ZGl2IGlkPVwiY29tbWVudFNwYW5EaXZcIj48c3BhbiBpZD1cImNvbW1lbnRTcGFuXCI+JyArIGNvbW1lbnQgKyAnPC9zcGFuPjwvZGl2PjxkaXYgaWQ9XCJjb21tZW50T3B0aW9uc0RpdlwiPjxkaXYgaWQ9XCJidXR0b25FZGl0XCIgY2xhc3M9XCJidXR0b25cIiBkYXRhLWlkPVwiJyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSArICdcIj48L2Rpdj48ZGl2IGlkPVwiYnV0dG9uRGVsZXRlXCIgY2xhc3M9XCJidXR0b25cIiBkYXRhLXVzZXJpZD1cIicgKyAkdGhpcy5hdHRyKCdkYXRhLXVzZXJpZCcpICsgJ1wiIGRhdGEtaWQ9XCInICsgJHRoaXMuYXR0cignZGF0YS1pZCcpICsgJ1wiPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICQoJyN1c2VyQ29tbWVudCcpLm9uKCdjbGljaycsICcjYnV0dG9uRGVsZXRlJywgdGhpcy5kZWxldGVDb21tZW50KCkpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmVxdWVzdC5zZW5kKFwiY29tbWVudD1cIiArIGNvbW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZWRpdENvbW1lbnQoKTp2b2lkIHtcbiAgICAgICAgYWxlcnQoJ0NvbW1pbmcgc29vbicpO1xuICAgIH1cblxuICAgIGRlbGV0ZUNvbW1lbnQoKTp2b2lkIHtcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcblxuICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICAgIHJlcXVlc3Qub3BlbignUE9TVCcsIHRoaXMuYWpheEZpbGUgKyAnP2FqYXhBY3Rpb249ZGVsZXRlQ29tbWVudCZhamF4SWQ9JyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSk7XG5cbiAgICAgICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhbGVydChcIkNvbW1lbnQgbm90IGRlbGV0ZWRcIik7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQoJyNjb21tZW50c0RpdiAjdXNlckNvbW1lbnQnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICQoJyNjb21tZW50c0RpdicpLnByZXBlbmQoJzxkaXYgaWQ9XCJjb21tZW50Rm9ybURpdlwiPjx0ZXh0YXJlYSBjb2xzPVwiMTBcIiByb3dzPVwiM1wiIG1heC1jb2xzPVwiMTBcIiBpZD1cImNvbW1lbnRJbnB1dFwiIHBsYWNlaG9sZGVyPVwiTGVhdmUgeW91ciBjb21tZW50XCI+PC90ZXh0YXJlYT48ZGl2IGlkPVwiYnV0dG9uc0RpdlwiPjxidXR0b24gaWQ9XCJjb21tZW50U3VibWl0XCIgZGF0YS11c2VyaWQ9XCInICsgJHRoaXMuYXR0cignZGF0YS11c2VyaWQnKSArICdcIiBkYXRhLWlkPVwiJyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSArICdcIiBkaXNhYmxlZD1cImRpc2FibGVkXCI+Q29tZW50YXI8L2J1dHRvbj48L2Rpdj48L2Rpdj4nKTtcbiAgICAgICAgICAgICQoJyNjb21tZW50Rm9ybURpdicpLm9uKCdjbGljaycsICcjY29tbWVudFN1Ym1pdCcsIHRoaXMubWFrZUNvbW1lbnQoKSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZUVuYWJsZSgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlcXVlc3Quc2VuZCgpO1xuICAgIH1cbn0iLCIvKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG5jbGFzcyBEZXRhaWxzIGV4dGVuZHMgQWpheCB7XG4gICAgc2hvd0RldGFpbHMoZXZlbnQ/OmFueSk6dm9pZCB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHZhciBjb250ZW50TGluazpzdHJpbmcgPSAkKHRoaXMpLmZpbmQoJy5jb250ZW50TGluaycpLmF0dHIoJ2hyZWYnKTtcbiAgICAgICAgdmFyIGNvbnRlbnRMaW5rVG9CYWNrOnN0cmluZyA9ICQodGhpcykuZmluZCgnLmNvbnRlbnRMaW5rJykuYXR0cignZGF0YS11cmwnKTtcbiAgICAgICAgdmFyIGNvbnRlbnRUaXRsZVRvQmFjazpzdHJpbmcgPSAkKHRoaXMpLmZpbmQoJy5jb250ZW50TGluaycpLmF0dHIoJ2RhdGEtdGl0bGUnKTtcbiAgICAgICAgJCgnLmNsb3NlQnV0dG9uJykuYXR0cignZGF0YS11cmwnLCBjb250ZW50TGlua1RvQmFjayk7XG4gICAgICAgICQoJy5jbG9zZUJ1dHRvbicpLmF0dHIoJ2RhdGEtdGl0bGUnLCBjb250ZW50VGl0bGVUb0JhY2spO1xuXG4gICAgICAgIHZhciBhbGxjb250YWluZXJEaXYgPSAkKCcuY29udGVudENvbnRhaW5lciAudGl0bGVEZXRhaWxzT3BlbicpO1xuICAgICAgICB2YXIgYWxsY29udGVudERpdiA9ICQoJy5jb250ZW50Q29udGFpbmVyIC5jb250ZW50RGl2IC5jb250ZW50T3BlbicpO1xuICAgICAgICBcbiAgICAgICAgdmFyIGNvbnRlbnREaXYgPSAkKHRoaXMpOy8vY29udGVudFxuICAgICAgICB2YXIgcGFyZW50RGl2ID0gY29udGVudERpdi5wYXJlbnQoKTsvL2NvbnRlbnRHcm91cFxuICAgICAgICB2YXIgY29udGFpbmVyRGl2ID0gcGFyZW50RGl2LnBhcmVudCgpLnBhcmVudCgpOy8vY29udGVudENvbnRhaW5lclxuXG4gICAgICAgIGFsbGNvbnRhaW5lckRpdi5maW5kKCcuc2VjdGlvbkNvbnRlbnQgYXJ0aWNsZScpLnJlbW92ZSgpO1xuXG4gICAgICAgIGFsbGNvbnRhaW5lckRpdi5yZW1vdmVDbGFzcygndGl0bGVEZXRhaWxzT3BlbicpLmFkZENsYXNzKCd0aXRsZURldGFpbHMnKTtcbiAgICAgICAgYWxsY29udGVudERpdi5yZW1vdmVDbGFzcygnY29udGVudE9wZW4nKS5hZGRDbGFzcygnY29udGVudCcpO1xuICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdjb250ZW50JykuYWRkQ2xhc3MoJ2NvbnRlbnRPcGVuJyk7XG4gICAgICAgIFxuICAgICAgICBjb250YWluZXJEaXYuZmluZCgnLnRpdGxlRGV0YWlscycpLnJlbW92ZUNsYXNzKCd0aXRsZURldGFpbHMnKS5hZGRDbGFzcygndGl0bGVEZXRhaWxzT3BlbicpO1xuICAgICAgICBcbiAgICAgICAgaWYocGFyZW50RGl2LmF0dHIoJ2NsYXNzJykgPT0gJ2NvbnRlbnRHcm91cCcpIHtcbiAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IGNvbnRhaW5lckRpdi5maW5kKCcudGl0bGVEZXRhaWxzT3BlbicpLm9mZnNldCgpLnRvcCAtIDE1MFxuICAgICAgICAgICAgfSw1MDApO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyLmdldFBhZ2UoY29udGVudExpbmssIFwiYm9keT10cnVlXCIsIGZ1bmN0aW9uKGRhdGE6YW55KSB7XG4gICAgICAgICAgICB2YXIgZmlsdGVyOmFueSA9ICQoZGF0YSkuY2hpbGRyZW4oKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAkKCcudGl0bGVEZXRhaWxzT3BlbicpLmZpbmQoJy5zZWN0aW9uQ29udGVudCcpLmh0bWwoZmlsdGVyKTtcbiAgICAgICAgICAgIG5ldyBUaXRsZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgc3VwZXIuY2hhbmdlVXJsKGNvbnRlbnRMaW5rKTtcbiAgICB9XG5cbiAgICBjbG9zZURldGFpbHMoKTp2b2lkIHtcbiAgICAgICAgdmFyIGNvbnRhaW5lckRpdiA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkucGFyZW50KCk7Ly9jb250ZW50Q29udGFpbmVyXG4gICAgICAgIHZhciBhbGxjb250YWluZXJEaXYgPSAkKCcuY29udGVudENvbnRhaW5lciAudGl0bGVEZXRhaWxzT3BlbicpO1xuICAgICAgICB2YXIgYWxsY29udGVudERpdiA9ICQoJy5jb250ZW50Q29udGFpbmVyIC5jb250ZW50RGl2IGRpdicpO1xuICAgICAgICB2YXIgb2Zmc2V0RGV0YWlsc0RpdiA9IGNvbnRhaW5lckRpdi5vZmZzZXQoKS50b3A7XG4gICAgICAgIHZhciBsaW5rVG9CYWNrID0gJCh0aGlzKS5hdHRyKCdkYXRhLXVybCcpO1xuICAgICAgICB2YXIgdGl0bGVUb0JhY2sgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtdGl0bGUnKTtcblxuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICBzY3JvbGxUb3A6IG9mZnNldERldGFpbHNEaXZcbiAgICAgICAgfSw1MDAsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYWxsY29udGFpbmVyRGl2LnJlbW92ZUNsYXNzKCd0aXRsZURldGFpbHNPcGVuJykuYWRkQ2xhc3MoJ3RpdGxlRGV0YWlscycpO1xuICAgICAgICAgICAgJCgnLnRpdGxlRGV0YWlscycpLmZpbmQoJy5zZWN0aW9uQ29udGVudCBhcnRpY2xlJykucmVtb3ZlKCk7XG4gICAgICAgICAgICAkKCcudGl0bGVEZXRhaWxzT3BlbicpLmZpbmQoJy5zZWN0aW9uQ29udGVudCBhcnRpY2xlJykucmVtb3ZlKCk7XG4gICAgICAgICAgICBhbGxjb250ZW50RGl2LmZpbmQoJy5jb250ZW50T3BlbicpLnJlbW92ZUNsYXNzKCdjb250ZW50T3BlbicpLmFkZENsYXNzKCdjb250ZW50Jyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vc3VwZXIuY2hhbmdlVXJsKGxpbmtUb0JhY2spO1xuICAgICAgICAgICAgJCgndGl0bGUnKS5lbXB0eSgpLnRleHQodGl0bGVUb0JhY2spO1xuICAgICAgICB9KTtcblxuICAgICAgICBzdXBlci5jaGFuZ2VVcmwobGlua1RvQmFjayk7XG4gICAgfVxufSIsIi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmNsYXNzIEZvbGxvdyBleHRlbmRzIEFqYXgge1xuICAgIGZvbGxvd1VzZXIoKTp2b2lkIHtcbiAgICAgICAgdmFyIGJ1dHRvbiA9ICQodGhpcyk7XG5cbiAgICAgICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgICByZXF1ZXN0Lm9wZW4oJ1BPU1QnLCB0aGlzLmFqYXhGaWxlICsgJz9hamF4QWN0aW9uPWZvbGxvdyZhamF4SWQ9JyArICQoYnV0dG9uKS5hdHRyKCdkYXRhLWlkJykpO1xuXG4gICAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYWxlcnQoJ0Vycm9yJyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlVGV4dCk7XG5cbiAgICAgICAgICAgICQoYnV0dG9uKS5hdHRyKFwiaWRcIiwgZGF0YS5jaGFuZ2UpO1xuICAgICAgICAgICAgJChidXR0b24pLmZpbmQoXCIuYnV0dG9uU3BhblwiKS5odG1sKGRhdGEud3JpdGUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlcXVlc3Quc2VuZCgpO1xuICAgIH1cblxuICAgIHVuZm9sbG93VXNlcigpOnZvaWQge1xuICAgICAgICB2YXIgYnV0dG9uID0gJCh0aGlzKTtcblxuICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICAgIHJlcXVlc3Qub3BlbignUE9TVCcsIHRoaXMuYWpheEZpbGUgKyAnP2FqYXhBY3Rpb249dW5mb2xsb3cmYWpheElkPScgKyAkKGJ1dHRvbikuYXR0cignZGF0YS1pZCcpKTtcblxuICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGFsZXJ0KCdFcnJvcicpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZVRleHQpO1xuXG4gICAgICAgICAgICAkKGJ1dHRvbikuYXR0cihcImlkXCIsIGRhdGEuY2hhbmdlKTtcbiAgICAgICAgICAgICQoYnV0dG9uKS5maW5kKFwiLmJ1dHRvblNwYW5cIikuaHRtbChkYXRhLndyaXRlKTsgXG4gICAgICAgIH07XG5cbiAgICAgICAgcmVxdWVzdC5zZW5kKCk7XG4gICAgfVxuXG4gICAgYWpheExpbmsoZXZlbnQsIHVybCk6dm9pZCB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmKHVybCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHZhciBsaW5rVG8gPSB1cmw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgbGlua1RvOmFueSA9ICQodGhpcykuYXR0cignaHJlZicpO1xuICAgICAgICB9XG4gICAgICAgICQoZG9jdW1lbnQpLm9mZignc2Nyb2xsJyk7XG5cbiAgICAgICAgdGhpcy5nZXRQYWdlKGxpbmtUbywgXCJib2R5PXRydWVcIiwgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIC8vJCgnLmFqYXhSZXBsYWNlJykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTtcbiAgICAgICAgICAgICQoJy5hamF4UmVwbGFjZScpLmh0bWwoZGF0YSk7XG5cbiAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IDBcbiAgICAgICAgICAgIH0sNTAwKTtcblxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VVcmwobGlua1RvKTtcblxuICAgICAgICAgICAgJCgnI21lbnVCdElucHV0JykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcblxuICAgICAgICAgICAgaWYobGlua1RvID09IGJhc2VVcmwpIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59IiwiLypcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiB8IENvcHlyaWdodCAoYykgMjAxNC0yMDE1IEF0b21vLmNvbS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiB8IEAgQXV0aG9yXHQ6IERhbmllbCBSaW9zLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKi9cblxuY2xhc3MgV2F0Y2hsaXN0IGV4dGVuZHMgQWpheCB7XG4gICAgYWRkV2F0Y2hMaXN0KCk6dm9pZCB7XG4gICAgICAgIHZhciBkYXRhSWQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtaWQnKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYWpheChcbiAgICAgICAgICAgICdQT1NUJyxcbiAgICAgICAgICAgICdhZGRXYXRjaExpc3QnLFxuICAgICAgICAgICAgZGF0YUlkLFxuICAgICAgICAgICAgJycsXG4gICAgICAgICAgICAnJyxcbiAgICAgICAgICAgICQoJy5hZGRXYXRjaExpc3QnKS5yZW1vdmVDbGFzcygnYWRkV2F0Y2hMaXN0JykuYWRkQ2xhc3MoJ3JlbW92ZVdhdGNoTGlzdCcpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVtb3ZlV2F0Y2hMaXN0KCk6dm9pZCB7XG4gICAgICAgIHZhciBkYXRhSWQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtaWQnKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYWpheChcbiAgICAgICAgICAgICdQT1NUJyxcbiAgICAgICAgICAgICdyZW1vdmVXYXRjaExpc3QnLFxuICAgICAgICAgICAgZGF0YUlkLFxuICAgICAgICAgICAgJycsXG4gICAgICAgICAgICAnJyxcbiAgICAgICAgICAgICQoJy5yZW1vdmVXYXRjaExpc3QnKS5yZW1vdmVDbGFzcygncmVtb3ZlV2F0Y2hMaXN0JykuYWRkQ2xhc3MoJ2FkZFdhdGNoTGlzdCcpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgYWRkV2F0Y2hMaXN0SW5kZXgoKTp2b2lkIHtcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgdmFyIGRhdGFJZCA9ICQodGhpcykuYXR0cignZGF0YS1pZCcpO1xuXG4gICAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHZhciB1cmwgPSB0aGlzLmFqYXhGaWxlICsgJz9hamF4QWN0aW9uPWFkZFdhdGNoTGlzdCZhamF4SWQ9JyArIGRhdGFJZDtcbiAgICAgICAgXG4gICAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYWxlcnQoJ0Vycm9yJyk7XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3Qub3BlbignUE9TVCcsIHVybCk7XG4gICAgICAgIFxuICAgICAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2VUZXh0KTtcblxuICAgICAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID49IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyA8IDQwMCkge1xuICAgICAgICAgICAgICAgIGlmKCQoJyN3YXRjaExpc3REaXYnKS5sZW5ndGggPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLm1haW5TZWN0aW9uJykucHJlcGVuZCgnPGFydGljbGUgaWQ9XCJ3YXRjaExpc3REaXZcIiBjbGFzcz1cImNvbnRlbnRDb250YWluZXJcIj48cCBjbGFzcz1cImNvbnRlbnREaXZIZWFkZXJcIj4nICsgZGF0YS50aXRsZSArICc8L3A+PGRpdiBjbGFzcz1cImNvbnRlbnREaXZcIj48ZGl2IGNsYXNzPVwiY29udGVudEdyb3VwU2Nyb2xsXCI+PC9kaXY+PC9kaXY+PC9hcnRpY2xlPicpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKCR0aGlzLmF0dHIoJ2RhdGEtdHlwZScpID09ICdtb3ZpZScpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpbmtUeXBlID0gJ21vdmllcyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoJHRoaXMuYXR0cignZGF0YS10eXBlJykgPT0gJ3NlcmllJykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGlua1R5cGUgPSAnc2VyaWVzJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAkdGhpcy5yZW1vdmVDbGFzcygnYWRkV2F0Y2hMaXN0JykuYWRkQ2xhc3MoJ3JlbW92ZVdhdGNoTGlzdCcpO1xuXG4gICAgICAgICAgICAgICAgJCgnI3dhdGNoTGlzdERpdiAuY29udGVudEdyb3VwU2Nyb2xsJykucHJlcGVuZCgnPGRpdiBjbGFzcz1cImNvbnRlbnRcIiBkYXRhLWlkPVwiJyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSAgKyAnXCI+PGEgY2xhc3M9XCJjb250ZW50TGlua1wiIGhyZWY9XCInICsgYmFzZVVybCArICd0aXRsZT9pZD0nICsgJHRoaXMuYXR0cignZGF0YS1pZCcpICsgJ1wiPjxmaWd1cmUgY2xhc3M9XCJjb250ZW50RmlndXJlXCI+PGltZyBzcmM9XCIvam9rZXIvaW1hZ2VzL21lZGlhLycgKyBsaW5rVHlwZSArICcvJyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSArICcvaW1hZ2UuanBnXCIvPjxmaWdjYXB0aW9uPjwvZmlnY2FwdGlvbj48L2ZpZ3VyZT48L2E+PGRpdiBjbGFzcz1cInJlbW92ZVdhdGNoTGlzdFwiIGRhdGEtdHlwZT1cIicgKyBsaW5rVHlwZSArICdcIiBkYXRhLWlkPVwiJyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSArICdcIj48L2Rpdj48L2Rpdj4nKTtcblxuICAgICAgICAgICAgICAgICQoJy5jb250ZW50RGl2IGRpdiAuYWRkV2F0Y2hMaXN0W2RhdGEtaWQ9XCInICsgJHRoaXMuYXR0cignZGF0YS1pZCcpICsgJ1wiXScpLnJlbW92ZUNsYXNzKCdhZGRXYXRjaExpc3QnKS5hZGRDbGFzcygncmVtb3ZlV2F0Y2hMaXN0Jyk7XG4gICAgICAgICAgICAgICAgJCgnI2ltYWdlRGl2IGRpdiBzcGFuW2RhdGEtaWQ9XCInICsgJHRoaXMuYXR0cignZGF0YS1pZCcpICsgJ1wiXScpLnJlbW92ZUNsYXNzKCdhZGRXYXRjaExpc3QnKS5hZGRDbGFzcygncmVtb3ZlV2F0Y2hMaXN0Jyk7XG5cbiAgICAgICAgICAgICAgICAkKCcjY29udGVudFNvcnRjdXRzJykuZmluZCgnLmFkZFdhdGNoTGlzdCcpLnJlbW92ZUNsYXNzKCdhZGRXYXRjaExpc3QnKS5hZGRDbGFzcygncmVtb3ZlV2F0Y2hMaXN0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydCgnRXJyb3InKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmVxdWVzdC5zZW5kKCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlV2F0Y2hMaXN0SW5kZXgoKTp2b2lkIHtcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgdmFyIGRhdGFJZCA9ICQodGhpcykuYXR0cignZGF0YS1pZCcpO1xuXG4gICAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHZhciB1cmwgPSB0aGlzLmFqYXhGaWxlICsgJz9hamF4QWN0aW9uPXJlbW92ZVdhdGNoTGlzdCZhamF4SWQ9JyArIGRhdGFJZDtcbiAgICAgICAgXG4gICAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYWxlcnQoJ0Vycm9yJyk7XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3Qub3BlbignUE9TVCcsIHVybCk7XG4gICAgICAgIFxuICAgICAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID49IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyA8IDQwMCkge1xuICAgICAgICAgICAgICAgICQoJyN3YXRjaExpc3REaXYgZGl2W2RhdGEtaWQ9XCInICsgJHRoaXMuYXR0cignZGF0YS1pZCcpICsgJ1wiXScpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICQoJy5jb250ZW50RGl2IGRpdiAucmVtb3ZlV2F0Y2hMaXN0W2RhdGEtaWQ9XCInICsgJHRoaXMuYXR0cignZGF0YS1pZCcpICsgJ1wiXScpLnJlbW92ZUNsYXNzKCdyZW1vdmVXYXRjaExpc3QnKS5hZGRDbGFzcygnYWRkV2F0Y2hMaXN0Jyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgJCgnI2ltYWdlRGl2IHNwYW5bZGF0YS1pZD1cIicgKyAkdGhpcy5hdHRyKCdkYXRhLWlkJykgKyAnXCJdJykucmVtb3ZlQ2xhc3MoJ3JlbW92ZVdhdGNoTGlzdCcpLmFkZENsYXNzKCdhZGRXYXRjaExpc3QnKTtcblxuICAgICAgICAgICAgICAgICQoJyNjb250ZW50U29ydGN1dHMnKS5maW5kKCcucmVtb3ZlV2F0Y2hMaXN0JykucmVtb3ZlQ2xhc3MoJ3JlbW92ZVdhdGNoTGlzdCcpLmFkZENsYXNzKCdhZGRXYXRjaExpc3QnKTtcblxuICAgICAgICAgICAgICAgIGlmKCQudHJpbSgkKCcjd2F0Y2hMaXN0RGl2IC5jb250ZW50R3JvdXBTY3JvbGwnKS5odG1sKCkpID09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJyN3YXRjaExpc3REaXYnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydCgnRXJyb3InKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmVxdWVzdC5zZW5kKCk7XG4gICAgfVxufSJdfQ==
