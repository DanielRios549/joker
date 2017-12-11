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
    // Get the page and instance the pages classes
    var thisPage = $('main').attr('data-page');
    var index = new Index();
    var profile = new Profile();
    var title = new Title();
    //Make the header be fixed when scrolling down, actually with no use
    $(window).on('scroll', function () {
        var topDiv = $('#topDiv');
        if ($(this).scrollTop() >= 300) {
            topDiv.removeClass('topDiv').addClass('topDivFixed');
        }
        else {
            topDiv.removeClass('topDivFixed').addClass('topDiv');
        }
    });
    //Show the "Go to top" buuton when scrolling down
    $('#footer').on("click", "#topDiv", function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });
    //Add the events according the page
    if (thisPage == 'index') {
        index.index();
    }
    else if (thisPage == 'title') {
        title.title();
    }
    else if (thisPage == 'profile') {
        profile.follow();
        $(this).on('scroll', function () {
            profile.parallax();
        });
    }
    else if (thisPage == 'category' || 'search') {
        index.details();
    }
});
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
var Index = /** @class */ (function () {
    function Index() {
    }
    Index.prototype.index = function () {
        this.details();
        this.paralax();
        this.tabSelect();
        this.slide();
        this.watchlist();
    };
    Index.prototype.details = function () {
        var details = new Details();
        $('.contentGroup').on('click', '.content', details.showDetails);
        $('.contentGroupScroll').on('click', '.content', details.showDetails);
        $('.contentContainer').on('click', '.closeButton', details.closeDetails);
    };
    Index.prototype.paralax = function () {
        var parallax = new Parallax();
        $(document).on('scroll', function () {
            parallax.parallaxHome();
        });
    };
    Index.prototype.tabSelect = function () {
        var userOthers = new UserOthers();
        userOthers.tabSelect(false);
    };
    Index.prototype.slide = function () {
        var slide = new Slide();
        if ($('#contentSlider #changeDiv').length) {
            //var intervalId = setInterval(slide.slideIndex, 5000);
            slide.changeIndex('#contentSlider');
        }
    };
    Index.prototype.watchlist = function () {
        var watchlist = new Watchlist();
        $('#imageDiv div').on('click', '.addWatchList', watchlist.addWatchListIndex);
        $('#imageDiv div').on('click', '.removeWatchList', watchlist.removeWatchListIndex);
        $('.contentGroupScroll').on('click', '.content .addWatchList', watchlist.addWatchListIndex);
        $('.contentGroupScroll').on('click', '.content .removeWatchList', watchlist.removeWatchListIndex);
    };
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
var Profile = /** @class */ (function () {
    function Profile() {
    }
    Profile.prototype.profile = function () {
        this.parallax();
        this.follow();
    };
    Profile.prototype.parallax = function () {
        var parallax = new Parallax();
        parallax.parallaxHeaderUser();
        parallax.parallaxImg();
        parallax.parallaxName();
    };
    Profile.prototype.follow = function () {
        var follow = new Follow();
        $('#userHeader').on('click', '#followUser', follow.followUser);
        $('#userHeader').on('click', '#unfollowUser', follow.unfollowUser);
    };
    return Profile;
}());
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
var Title = /** @class */ (function () {
    function Title() {
    }
    Title.prototype.title = function () {
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
    };
    return Title;
}());
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
        if ($(document).scrollTop() < 210) {
            var imgDiv = $('#userHeaderImg');
            $(imgDiv).css("top", (window.pageYOffset / 2.6) + 'px');
        }
        //Change class of header of profile page
        var userHeader = $('#userHeader');
        var userHeaderImg = $('#userHeaderImg');
        if ($(document).scrollTop() >= 210) {
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
        if ($(document).scrollTop() < 210) {
            img.style.width = (150 - $(document).scrollTop() / 2.9) + 'px';
            img.style.height = (150 - $(document).scrollTop() / 2.9) + 'px';
            img.style.left = (0 + $(document).scrollTop() / 4.9) + 'px';
            img.style.top = (-120 + $(document).scrollTop() / 5.7) + 'px';
        }
        //Change class of user image of profile page
        var userImg = $('#userImgFigure');
        if ($(document).scrollTop() >= 210) {
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
        if ($(document).scrollTop() < 210) {
            name.style.left = (220 - $(document).scrollTop() / 3.75) + 'px';
        }
        //Change class of user name div
        var userName = $('#userNameDiv');
        if ($(document).scrollTop() >= 210) {
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
            var titleEvents = new Title();
            titleEvents.title();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXJTY3JpcHQudHMiLCJwYWdlcy9pbmRleC50cyIsInBhZ2VzL2xvZ2luLnRzIiwicGFnZXMvcHJvZmlsZS50cyIsInBhZ2VzL3RpdGxlLnRzIiwicGFydHMvY29uZmlnLnRzIiwicGFydHMvbG9naW4udHMiLCJwYXJ0cy9ub3RpZmljYXRpb25zLnRzIiwicGFydHMvb3RoZXJzLnRzIiwicGFydHMvcGFyYWxsYXgudHMiLCJwYXJ0cy9zbGlkZS50cyIsInBhcnRzL2FqYXgvYWpheC50cyIsInBhcnRzL2FqYXgvY29tbWVudHMudHMiLCJwYXJ0cy9hamF4L2RldGFpbHMudHMiLCJwYXJ0cy9hamF4L2ZvbGxvdy50cyIsInBhcnRzL2FqYXgvd2F0Y2hsaXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztFQUtFO0FBRUYscUJBQXFCO0FBRXJCLHNDQUFzQztBQUV0Qzs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFFSCxvQ0FBb0M7QUFFcEMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNkLDhDQUE4QztJQUU5QyxJQUFJLFFBQVEsR0FBVSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xELElBQUksS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7SUFDeEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUM1QixJQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO0lBRXhCLG9FQUFvRTtJQUVwRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRTtRQUNuQixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFMUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDN0IsTUFBTSxDQUFDLFdB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QUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3pFLENBQUMsQ0FBQyw0Q0FBNEMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFFdkksQ0FBQyxDQUFDLDBCQUEwQixHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUVySCxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBRXZHLEVBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLG1DQUFtQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUM3RCxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2hDLENBQUM7WUFDTCxDQUFDO1lBQ0QsSUFBSSxDQUFDLENBQUM7Z0JBQ0YsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ25CLENBQUM7UUFDTCxDQUFDLENBQUM7UUFDRixPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FyR0EsQUFxR0MsQ0FyR3VCLElBQUksR0FxRzNCIiwiZmlsZSI6InVzZXJTY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG4vL1NlcnZpY2Ugd29ya2VyIGluaXRcblxuLy9pbXBvcnQge0luZGV4fSBmcm9tICcuL3BhZ2VzL2luZGV4JztcblxuLyppZignc2VydmljZVdvcmtlcicgaW4gbmF2aWdhdG9yKSB7XG4gICAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIucmVnaXN0ZXIoJ3N3LmpzJykudGhlbihmdW5jdGlvbihyZWdpc3RyYXRpb24pIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1NlcnZpY2VXb3JrZXIgcmVnaXN0cmF0aW9uIHN1Y2Nlc3NmdWwnKTtcbiAgICAgICAgLypuZXcgU2hvd05vdGlmaWNhdGlvbihcbiAgICAgICAgICAgICdKb2tlcicsXG4gICAgICAgICAgICAnU2VydmljZVdvcmtlciByZWdpc3RyYXRpb24gc3VjY2Vzc2Z1bCcsXG4gICAgICAgICAgICAnU2VydmljZVdvcmtlcidcbiAgICAgICAgKTtcbiAgICB9KVxuICAgIC5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZygnU2VydmljZVdvcmtlciByZWdpc3RyYXRpb24gZmFpbGVkJywgZXJyb3IpO1xuICAgIH0pO1xuICAgIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLm9uY29udHJvbGxlcmNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnUmVmcmVzaCB0byBzZWUgdGhlIG5ld2VzdCBjb250ZW50Jyk7XG4gICAgfVxufSovXG5cbi8vQ2hhbmdlIGNsYXNzIG9mIGhlYWRlciBvZiBhbGwgcGFnZVxuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAvLyBHZXQgdGhlIHBhZ2UgYW5kIGluc3RhbmNlIHRoZSBwYWdlcyBjbGFzc2VzXG5cbiAgICBsZXQgdGhpc1BhZ2U6c3RyaW5nID0gJCgnbWFpbicpLmF0dHIoJ2RhdGEtcGFnZScpO1xuICAgIGxldCBpbmRleCA9IG5ldyBJbmRleCgpO1xuICAgIGxldCBwcm9maWxlID0gbmV3IFByb2ZpbGUoKTtcbiAgICBsZXQgdGl0bGUgPSBuZXcgVGl0bGUoKTtcblxuICAgIC8vTWFrZSB0aGUgaGVhZGVyIGJlIGZpeGVkIHdoZW4gc2Nyb2xsaW5nIGRvd24sIGFjdHVhbGx5IHdpdGggbm8gdXNlXG5cbiAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdG9wRGl2ID0gJCgnI3RvcERpdicpO1xuXG4gICAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID49IDMwMCkge1xuICAgICAgICAgICAgdG9wRGl2LnJlbW92ZUNsYXNzKCd0b3BEaXYnKS5hZGRDbGFzcygndG9wRGl2Rml4ZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRvcERpdi5yZW1vdmVDbGFzcygndG9wRGl2Rml4ZWQnKS5hZGRDbGFzcygndG9wRGl2Jyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vU2hvdyB0aGUgXCJHbyB0byB0b3BcIiBidXV0b24gd2hlbiBzY3JvbGxpbmcgZG93blxuXG4gICAgJCgnI2Zvb3RlcicpLm9uKFwiY2xpY2tcIiwgXCIjdG9wRGl2XCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgIHNjcm9sbFRvcDogMFxuICAgICAgICB9LDUwMCk7XG4gICAgfSk7XG5cbiAgICAvL0FkZCB0aGUgZXZlbnRzIGFjY29yZGluZyB0aGUgcGFnZVxuXG4gICAgaWYodGhpc1BhZ2UgPT0gJ2luZGV4Jykge1xuICAgICAgICBpbmRleC5pbmRleCgpO1xuICAgIH1cbiAgICBlbHNlIGlmKHRoaXNQYWdlID09ICd0aXRsZScpIHtcbiAgICAgICAgdGl0bGUudGl0bGUoKTtcbiAgICB9XG4gICAgZWxzZSBpZih0aGlzUGFnZSA9PSAncHJvZmlsZScpIHtcbiAgICAgICAgcHJvZmlsZS5mb2xsb3coKTtcblxuICAgICAgICAkKHRoaXMpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHByb2ZpbGUucGFyYWxsYXgoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2UgaWYodGhpc1BhZ2UgPT0gJ2NhdGVnb3J5JyB8fCAnc2VhcmNoJykge1xuICAgICAgICBpbmRleC5kZXRhaWxzKCk7XG4gICAgfVxufSk7XG4iLCIvKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG5jbGFzcyBJbmRleCB7XG4gICAgaW5kZXgoKSB7XG4gICAgICAgIHRoaXMuZGV0YWlscygpO1xuICAgICAgICB0aGlzLnBhcmFsYXgoKTtcbiAgICAgICAgdGhpcy50YWJTZWxlY3QoKTtcbiAgICAgICAgdGhpcy5zbGlkZSgpO1xuICAgICAgICB0aGlzLndhdGNobGlzdCgpO1xuICAgIH1cblxuICAgIGRldGFpbHMoKSB7XG4gICAgICAgIHZhciBkZXRhaWxzID0gbmV3IERldGFpbHMoKTtcblxuICAgICAgICAkKCcuY29udGVudEdyb3VwJykub24oJ2NsaWNrJywgJy5jb250ZW50JywgZGV0YWlscy5zaG93RGV0YWlscyk7XG4gICAgICAgICQoJy5jb250ZW50R3JvdXBTY3JvbGwnKS5vbignY2xpY2snLCAnLmNvbnRlbnQnLCBkZXRhaWxzLnNob3dEZXRhaWxzKTtcbiAgICAgICAgJCgnLmNvbnRlbnRDb250YWluZXInKS5vbignY2xpY2snLCAnLmNsb3NlQnV0dG9uJywgZGV0YWlscy5jbG9zZURldGFpbHMpO1xuICAgIH1cblxuICAgIHBhcmFsYXgoKSB7XG4gICAgICAgIHZhciBwYXJhbGxheCA9IG5ldyBQYXJhbGxheCgpO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHBhcmFsbGF4LnBhcmFsbGF4SG9tZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB0YWJTZWxlY3QoKSB7XG4gICAgICAgIHZhciB1c2VyT3RoZXJzID0gbmV3IFVzZXJPdGhlcnMoKTtcbiAgICAgICAgdXNlck90aGVycy50YWJTZWxlY3QoZmFsc2UpO1xuICAgIH1cblxuICAgIHNsaWRlKCkge1xuICAgICAgICB2YXIgc2xpZGUgPSBuZXcgU2xpZGUoKTtcbiAgICAgICAgXG4gICAgICAgIGlmKCQoJyNjb250ZW50U2xpZGVyICNjaGFuZ2VEaXYnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vdmFyIGludGVydmFsSWQgPSBzZXRJbnRlcnZhbChzbGlkZS5zbGlkZUluZGV4LCA1MDAwKTtcblxuICAgICAgICAgICAgc2xpZGUuY2hhbmdlSW5kZXgoJyNjb250ZW50U2xpZGVyJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3YXRjaGxpc3QoKSB7XG4gICAgICAgIHZhciB3YXRjaGxpc3QgPSBuZXcgV2F0Y2hsaXN0KCk7XG4gICAgICAgIFxuICAgICAgICAkKCcjaW1hZ2VEaXYgZGl2Jykub24oJ2NsaWNrJywgJy5hZGRXYXRjaExpc3QnLCB3YXRjaGxpc3QuYWRkV2F0Y2hMaXN0SW5kZXgpO1xuICAgICAgICAkKCcjaW1hZ2VEaXYgZGl2Jykub24oJ2NsaWNrJywgJy5yZW1vdmVXYXRjaExpc3QnLCB3YXRjaGxpc3QucmVtb3ZlV2F0Y2hMaXN0SW5kZXgpO1xuXG4gICAgICAgICQoJy5jb250ZW50R3JvdXBTY3JvbGwnKS5vbignY2xpY2snLCAnLmNvbnRlbnQgLmFkZFdhdGNoTGlzdCcsIHdhdGNobGlzdC5hZGRXYXRjaExpc3RJbmRleCk7XG4gICAgICAgICQoJy5jb250ZW50R3JvdXBTY3JvbGwnKS5vbignY2xpY2snLCAnLmNvbnRlbnQgLnJlbW92ZVdhdGNoTGlzdCcsIHdhdGNobGlzdC5yZW1vdmVXYXRjaExpc3RJbmRleCk7XG4gICAgfVxufSIsIi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIC8vQ2xvc2UgdGhlIG1lc3NhZ2UgZGlzcGxheWVkIHdoZW4gaGFzIHNvbWUgZXJyb3JcblxuICAgIHZhciBvdGhlcnMgPSBuZXcgVXNlck90aGVycygpO1xuICAgIHZhciBsb2dpbiA9IG5ldyBMb2dpbigpO1xuXG4gICAgbG9naW4uaW5wdXRFcnJvcignLnVzZXJEaXYnKTtcbiAgICBvdGhlcnMuY2xvc2VNZXNzYWdlKCcudXNlckVycm9yJywgJyNlcnJvck1zZ0Nsb3NlJyk7XG59KTsiLCIvKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG5jbGFzcyBQcm9maWxlIHtcbiAgICBwcm9maWxlKCkge1xuICAgICAgICB0aGlzLnBhcmFsbGF4KCk7XG4gICAgICAgIHRoaXMuZm9sbG93KCk7XG4gICAgfVxuICAgIFxuICAgIHBhcmFsbGF4KCkge1xuICAgICAgICB2YXIgcGFyYWxsYXggPSBuZXcgUGFyYWxsYXgoKTtcbiAgICAgICAgXG4gICAgICAgIHBhcmFsbGF4LnBhcmFsbGF4SGVhZGVyVXNlcigpO1xuICAgICAgICBwYXJhbGxheC5wYXJhbGxheEltZygpO1xuICAgICAgICBwYXJhbGxheC5wYXJhbGxheE5hbWUoKTtcbiAgICB9XG5cbiAgICBmb2xsb3coKSB7XG4gICAgICAgIHZhciBmb2xsb3cgPSBuZXcgRm9sbG93KCk7XG5cbiAgICAgICAgJCgnI3VzZXJIZWFkZXInKS5vbignY2xpY2snLCAnI2ZvbGxvd1VzZXInLCBmb2xsb3cuZm9sbG93VXNlcik7XG4gICAgICAgICQoJyN1c2VySGVhZGVyJykub24oJ2NsaWNrJywgJyN1bmZvbGxvd1VzZXInLCBmb2xsb3cudW5mb2xsb3dVc2VyKTtcbiAgICB9XG59XG5cbiIsIi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmNsYXNzIFRpdGxlIHtcbiAgICB0aXRsZSgpIHtcbiAgICAgICAgdmFyIHVzZXJPdGhlcnMgPSBuZXcgVXNlck90aGVycygpO1xuICAgICAgICB2YXIgd2F0Y2hsaXN0ID0gbmV3IFdhdGNobGlzdCgpO1xuICAgICAgICB2YXIgY29tbWVudHMgPSBuZXcgQ29tbWVudHMoKTtcblxuICAgICAgICB1c2VyT3RoZXJzLnRhYlNlbGVjdChmYWxzZSk7XG4gICAgICAgIHVzZXJPdGhlcnMuaGlkZVJlcGx5KFwiLmNvbW1lbnRHcm91cFwiKTtcbiAgICAgICAgdXNlck90aGVycy5lcGlzb2RlU2VsZWN0KFwiI3NlYXNvbkJyb3dzZVwiKTtcbiAgICAgICAgICAgIFxuICAgICAgICAkKCcjY29udGVudFNvcnRjdXRzJykub24oJ2NsaWNrJywgJy5hZGRXYXRjaExpc3QnLCB3YXRjaGxpc3QuYWRkV2F0Y2hMaXN0KTtcbiAgICAgICAgJCgnI2NvbnRlbnRTb3J0Y3V0cycpLm9uKCdjbGljaycsICcucmVtb3ZlV2F0Y2hMaXN0Jywgd2F0Y2hsaXN0LnJlbW92ZVdhdGNoTGlzdCk7XG4gICAgXG4gICAgICAgICQoJyNjb21tZW50Rm9ybURpdicpLm9uKCdjbGljaycsICcjY29tbWVudFN1Ym1pdCcsIGNvbW1lbnRzLm1ha2VDb21tZW50KTtcbiAgICAgICAgJCgnI2NvbW1lbnRPcHRpb25zRGl2Jykub24oJ2NsaWNrJywgJyNidXR0b25FZGl0JywgY29tbWVudHMuZWRpdENvbW1lbnQpO1xuICAgICAgICAkKCcjY29tbWVudE9wdGlvbnNEaXYnKS5vbignY2xpY2snLCAnI2J1dHRvbkRlbGV0ZScsIGNvbW1lbnRzLmRlbGV0ZUNvbW1lbnQpO1xuICAgIFxuICAgICAgICB1c2VyT3RoZXJzLmRpc2FibGVFbmFibGUoKTtcbiAgICAgICAgLy9wb3N0ZXJQYXJhbGF4KCcjY29udGVudEltYWdlJyk7XG4gICAgfVxufSIsIi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmNsYXNzIENvbmZpZyB7XG4gICAgcHVibGljIGJhc2VVcmw6c3RyaW5nID0gJCgnaGVhZCcpLmF0dHIoJ2RhdGEtdXJsJyk7XG4gICAgcHVibGljIGNvb2tpZUlkOnN0cmluZyA9ICQoJ2hlYWQnKS5hdHRyKCdkYXRhLWNvb2tpZScpO1xuICAgIFxuICAgIC8vdmFyIGludGVydmFsTG9nb2ZmOm51bWJlciA9IHNldEludGVydmFsKHVzZXJTY3JpcHQuc2VjdXJlTG9nb2ZmKGJhc2VVcmwpLCAyNTApO1xufSIsIi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmNsYXNzIExvZ2luIHtcbiAgICBpbnB1dEVycm9yKHBhcmVudERpdjpzdHJpbmcpOnZvaWQge1xuXHRcdCQocGFyZW50RGl2KS5vbignZm9jdXNvdXQnLCAnLmlucHV0VGV4dCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYoKCQodGhpcykgYXMgYW55KS52YWwoKS5sZW5ndGggPCAxKSB7XG5cdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2lucHV0VGV4dCcpLmFkZENsYXNzKCdpbnB1dFRleHRFcnJvcicpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdFxuXHRcdCQocGFyZW50RGl2KS5vbignZm9jdXNvdXQnLCAnLmlucHV0VGV4dEVycm9yJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRpZigoJCh0aGlzKSBhcyBhbnkpLnZhbCgpLmxlbmd0aCA+PSAxKSB7XG5cdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2lucHV0VGV4dEVycm9yJykuYWRkQ2xhc3MoJ2lucHV0VGV4dCcpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0c2VjdXJlTG9nb2ZmKHVybCk6dm9pZCB7XG5cdFx0aWYoIWRvY3VtZW50LmNvb2tpZS5tYXRjaCgnbG9naW4nKSkge1xuXHRcdFx0bG9jYXRpb24ucmVwbGFjZSh1cmwgKyAnbG9nb2ZmJyk7XG5cdFx0fVxuXHR9XG59IiwiLypcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiB8IENvcHlyaWdodCAoYykgMjAxNC0yMDE1IEF0b21vLmNvbS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiB8IEAgQXV0aG9yXHQ6IERhbmllbCBSaW9zLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKi9cblxuY2xhc3MgU2hvd05vdGlmaWNhdGlvbiB7XG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHR5cGU6c3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcsIHRhZzogc3RyaW5nKSB7XG4gICAgICAgIE5vdGlmaWNhdGlvbi5yZXF1ZXN0UGVybWlzc2lvbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09ICdncmFudGVkJykge1xuICAgICAgICAgICAgICAgIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLnJlYWR5LnRoZW4oZnVuY3Rpb24ocmVnaXN0cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdHJhdGlvbi5zaG93Tm90aWZpY2F0aW9uKHR5cGUsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IG1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnaW1hZ2VzL2Zhdmljb24ucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdmlicmF0ZTogWzIwMCwgMTAwLCAyMDAsIDEwMCwgMjAwLCAxMDAsIDIwMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWc6IHRhZ1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufSIsIi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmNsYXNzIFVzZXJPdGhlcnMge1xuICAgIC8qKlxuXHQgKiBoaWRlIHRoZSByZXBsaWVzXG5cdCAqL1xuICAgIFxuICAgIGhpZGVSZXBseShkaXY6c3RyaW5nKTp2b2lkIHtcblx0XHQkKGRpdikub24oXCJjbGlja1wiLCBcIi5ub0hpZGVcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKFwibm9IaWRlXCIpLmFkZENsYXNzKFwiaGlkZVwiKTtcblx0XHR9KVxuXHRcdC5vbihcImNsaWNrXCIsIFwiLmhpZGVcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKFwiaGlkZVwiKS5hZGRDbGFzcyhcIm5vSGlkZVwiKTtcblx0XHR9KTtcbiAgICB9XG4gICAgLy9DbG9zZSBNZXNzYWdlXG5cblx0Y2xvc2VNZXNzYWdlKGVycm9yRGl2OnN0cmluZywgZXJyb3JCdG46c3RyaW5nKTp2b2lkIHtcblx0XHQkKGVycm9yRGl2KS5vbihcImNsaWNrXCIsIGVycm9yQnRuLCBmdW5jdGlvbigpIHtcblx0XHRcdCQodGhpcykucGFyZW50KCkucmVtb3ZlKCk7XG5cdFx0XHQvL2xvY2F0aW9uLmhyZWYgPSBoaXN0b3J5LmdvKC0xKTtcblx0XHR9KTtcblx0fVxuXG5cdC8vVGFiIFNlbGVjdFxuXG5cdHRhYlNlbGVjdChJc1Njcm9sbDpib29sZWFuKTp2b2lkIHtcblx0XHR2YXIgc2Nyb2xsID0gSXNTY3JvbGwgPyBJc1Njcm9sbCA6IGZhbHNlO1xuXG5cdFx0JChcIiN0YWJIZWFkZXJcIikub24oXCJjbGlja1wiLCBcIi50YWJcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHQkKFwiI3RhYkhlYWRlciAudGFiU2VsZWN0ZWRcIikucmVtb3ZlQ2xhc3MoXCJ0YWJTZWxlY3RlZFwiKS5hZGRDbGFzcyhcInRhYlwiKTtcblx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoXCJ0YWJcIikuYWRkQ2xhc3MoXCJ0YWJTZWxlY3RlZFwiKTtcblx0XHRcdFxuXHRcdFx0dmFyIGluZGljZSA9ICQodGhpcykuaW5kZXgoKTtcblx0XHRcdGluZGljZSArKztcblx0XHRcdFxuXHRcdFx0JChcIiN0YWJDb250ZW50cyAuY29udGVudFNob3dcIikucmVtb3ZlQ2xhc3MoJ2NvbnRlbnRTaG93JykuYWRkQ2xhc3MoJ2NvbnRlbnRIaWRlJyk7XG5cdFx0XHQkKFwiI3RhYkNvbnRlbnRzIC5jb250ZW50SGlkZTpudGgtb2YtdHlwZShcIiArIGluZGljZSArIFwiKVwiKS5yZW1vdmVDbGFzcygnY29udGVudEhpZGUnKS5hZGRDbGFzcygnY29udGVudFNob3cnKTtcblx0XHR9KVxuXHRcdC5vbignY2xpY2snLCAnZGl2JywgZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdGlmKHNjcm9sbCA9PSB0cnVlKSB7XG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdCQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcblx0XHRcdFx0XHRzY3JvbGxUb3A6IDQ1MFxuXHRcdFx0XHR9LDUwMCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHQvL0VwaXNvZGUgU2VsZWN0XG5cblx0ZXBpc29kZVNlbGVjdChlcGlzb2RlU2xpZGVyOnN0cmluZyk6dm9pZCB7XG5cdFx0JChlcGlzb2RlU2xpZGVyKS5vbihcImNsaWNrXCIsIFwiLnNlYXNvblNlbGVjdCAuc2Vhc29uU3BhblwiLCBmdW5jdGlvbigpIHtcblx0XHRcdCQoXCIjc2Vhc29uU2VsZWN0XCIpLnJlbW92ZUNsYXNzKFwic2Vhc29uU2VsZWN0XCIpLmFkZENsYXNzKFwic2Vhc29uU2VsZWN0T3BlblwiKTtcblx0XHRcdCQoXCIuc2Vhc29uSGlkZVwiKS5yZW1vdmVDbGFzcyhcInNlYXNvbkhpZGVcIikuYWRkQ2xhc3MoXCJzZWFzb25TaG93XCIpO1xuXHRcdH0pXG5cdFx0Lm9uKFwiY2xpY2tcIiwgXCIuc2Vhc29uU2VsZWN0T3BlbiAuc2Vhc29uU3BhblwiLCBmdW5jdGlvbigpIHtcblx0XHRcdCQoXCIjc2Vhc29uU2VsZWN0XCIpLnJlbW92ZUNsYXNzKFwic2Vhc29uU2VsZWN0T3BlblwiKS5hZGRDbGFzcyhcInNlYXNvblNlbGVjdFwiKTtcblx0XHRcdCQoXCIuc2Vhc29uU2hvd1wiKS5yZW1vdmVDbGFzcyhcInNlYXNvblNob3dcIikuYWRkQ2xhc3MoXCJzZWFzb25IaWRlXCIpO1xuXHRcdFx0XG5cdFx0XHR2YXIgaW5kaWNlID0gJCh0aGlzKS5wYXJlbnQoKTtcblx0XHRcdGluZGljZS5yZW1vdmVDbGFzcyhcInNlYXNvbkhpZGVcIikuYWRkQ2xhc3MoXCJzZWFzb25TaG93XCIpO1xuXHRcdFx0XG5cdFx0XHR2YXIgaW5kaWNlU2hvdyA9ICQodGhpcykucGFyZW50KCkuaW5kZXgoKTtcblx0XHRcdGluZGljZVNob3cgKys7XG5cdFx0XHRcblx0XHRcdCQoXCIjZXBpc29kZURpdiAuc2Vhc29uR3JvdXBTaG93XCIpLnJlbW92ZUNsYXNzKFwic2Vhc29uR3JvdXBTaG93XCIpLmFkZENsYXNzKFwic2Vhc29uR3JvdXBIaWRlXCIpO1xuXHRcdFx0JChcIiNlcGlzb2RlRGl2IC5jb250ZW50R3JvdXA6bnRoLW9mLXR5cGUoXCIgKyBpbmRpY2VTaG93ICsgXCIpXCIpLnJlbW92ZUNsYXNzKFwic2Vhc29uR3JvdXBIaWRlXCIpLmFkZENsYXNzKFwic2Vhc29uR3JvdXBTaG93XCIpO1xuXHRcdFx0XG5cdFx0XHRpZigkKFwiI2VwaXNvZGVEaXYgLmNvbnRlbnRHcm91cDpudGgtb2YtdHlwZShcIiArIGluZGljZVNob3cgKyBcIilcIikud2lkdGgoKSA+ICQoXCIjZXBpc29kZURpdlwiKS53aWR0aCgpKSB7XG5cdFx0XHRcdCQoXCIjZXBpc29kZURpdlwiKS5maW5kKCcubmV4dEhpZGUnKS5yZW1vdmVDbGFzcygnbmV4dEhpZGUnKS5hZGRDbGFzcygnbmV4dFNob3cnKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHQkKFwiI2VwaXNvZGVEaXZcIikuZmluZCgnLm5leHRTaG93JykucmVtb3ZlQ2xhc3MoJ25leHRTaG93JykuYWRkQ2xhc3MoJ25leHRIaWRlJyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvL0VwaXNvZGUgU2VsZWN0IENsb3NlXG5cblx0XHQkKGVwaXNvZGVTbGlkZXIpLm9uKFwibW91c2VsZWF2ZVwiLCBcIi5zZWFzb25TZWxlY3RPcGVuXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGluZGV4Q2xvc2UgPSAkKFwiI2VwaXNvZGVEaXYgLnNlYXNvbkdyb3VwU2hvd1wiKS5pbmRleCgpO1xuXHRcdFx0aW5kZXhDbG9zZSsrO1xuXG5cdFx0XHQkKFwiI3NlYXNvblNlbGVjdFwiKS5yZW1vdmVDbGFzcyhcInNlYXNvblNlbGVjdE9wZW5cIikuYWRkQ2xhc3MoXCJzZWFzb25TZWxlY3RcIik7XG5cdFx0XHQkKFwiLnNlYXNvblNob3dcIikucmVtb3ZlQ2xhc3MoXCJzZWFzb25TaG93XCIpLmFkZENsYXNzKFwic2Vhc29uSGlkZVwiKTtcblx0XHRcdCQoXCIuc2Vhc29uSGlkZTpudGgtb2YtdHlwZShcIiArIGluZGV4Q2xvc2UgKyBcIilcIikucmVtb3ZlQ2xhc3MoXCJzZWFzb25IaWRlXCIpLmFkZENsYXNzKFwic2Vhc29uU2hvd1wiKTtcblx0XHR9KTtcblx0fVxuXHRcblx0ZGlzYWJsZUVuYWJsZSgpOnZvaWQge1xuXHRcdCQoXCIjY29tbWVudElucHV0XCIpLmtleXVwKGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGNvbW1lbnRCZWZvcmUgPSAkKHRoaXMpLnZhbCgpO1xuXHRcdFx0dmFyIGNoZWNrQ29tbWVudEJlZm9yZSA9IChjb21tZW50QmVmb3JlIGFzIGFueSkudHJpbSgpO1xuXG5cdFx0XHRpZihjaGVja0NvbW1lbnRCZWZvcmUgPT0gJycpIHtcblx0XHRcdFx0Ly8kKCcjY29tbWVudFN1Ym1pdCcpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0XHRcdCQoJyNjb21tZW50U3VibWl0JykuYXR0cignZGlzYWJsZWQnKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHQkKCcjY29tbWVudFN1Ym1pdCcpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn0iLCIvKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG5jbGFzcyBQYXJhbGxheCB7XG4gICAgLy9FZmZlY3Qgb2YgZXh0ZXJuYWwgaW5kZXhcblxuXHRwYXJhbGxheEhvbWUoKTp2b2lkIHtcblx0XHR2YXIgcGFyYWxsYXhPdXQ6c3RyaW5nID0gJyNkZXNjSW1hZ2UgPiBpbWcnO1xuXHRcdHZhciBwYXJhbGxheEluOnN0cmluZyA9ICcjY29udGVudFNsaWRlciA+IGFydGljbGUgPiBkaXYgPiBpbWcnO1xuXG5cdFx0aWYgKCQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpIDwgNDUwKSB7XG5cdFx0XHQkKHBhcmFsbGF4T3V0KS5jc3MoXCJ0b3BcIiAsICh3aW5kb3cucGFnZVlPZmZzZXQgLyAyKSArICdweCcpO1xuXHRcdFx0JChwYXJhbGxheEluKS5jc3MoXCJ0b3BcIiAsICh3aW5kb3cucGFnZVlPZmZzZXQgLyAyKSArICdweCcpO1xuXHRcdH1cblx0fVxuXG5cdHBhcmFsbGF4SGVhZGVyVXNlcigpOnZvaWQge1xuXHRcdC8vRWZmZWN0IG9mIGhlYWRlciBvZiBwcm9maWxlIHBhZ2VcblxuXHRcdGlmICgkKGRvY3VtZW50KS5zY3JvbGxUb3AoKSA8IDIxMCkge1xuXHRcdFx0dmFyIGltZ0RpdiA9ICQoJyN1c2VySGVhZGVySW1nJyk7XG5cdFx0XHQkKGltZ0RpdikuY3NzKFwidG9wXCIgLCAod2luZG93LnBhZ2VZT2Zmc2V0IC8gMi42KSArICdweCcpO1xuXHRcdH1cblxuXHRcdC8vQ2hhbmdlIGNsYXNzIG9mIGhlYWRlciBvZiBwcm9maWxlIHBhZ2VcblxuXHRcdHZhciB1c2VySGVhZGVyID0gJCgnI3VzZXJIZWFkZXInKTtcblx0XHR2YXIgdXNlckhlYWRlckltZyA9ICQoJyN1c2VySGVhZGVySW1nJyk7XG5cblx0XHRpZiAoJChkb2N1bWVudCkuc2Nyb2xsVG9wKCkgPj0gMjEwKSB7XG5cdFx0XHR1c2VySGVhZGVyLnJlbW92ZUNsYXNzKCd1c2VySGVhZGVyJyk7XG5cdFx0XHR1c2VySGVhZGVyLmFkZENsYXNzKCd1c2VySGVhZGVyRml4ZWQnKTtcblx0XHRcdHVzZXJIZWFkZXJJbWcucmVtb3ZlQ2xhc3MoJ3VzZXJIZWFkZXJJbWcnKTtcblx0XHRcdHVzZXJIZWFkZXJJbWcuYWRkQ2xhc3MoJ3VzZXJIZWFkZXJJbWdGaXhlZCcpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHVzZXJIZWFkZXIucmVtb3ZlQ2xhc3MoJ3VzZXJIZWFkZXJGaXhlZCcpO1xuXHRcdFx0dXNlckhlYWRlci5hZGRDbGFzcygndXNlckhlYWRlcicpO1xuXHRcdFx0dXNlckhlYWRlckltZy5yZW1vdmVDbGFzcygndXNlckhlYWRlckltZ0ZpeGVkJyk7XG5cdFx0XHR1c2VySGVhZGVySW1nLmFkZENsYXNzKCd1c2VySGVhZGVySW1nJyk7XG5cdFx0fVxuXHR9XG5cblx0cGFyYWxsYXhJbWcoKTp2b2lkIHtcblx0XHQvL0VmZmVjdCBvZiB1c2VyIGltYWdlIG9mIHByb2ZpbGUgcGFnZVxuXG5cdFx0dmFyIGltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VySW1nRmlndXJlJyk7XG5cblx0XHRpZiAoJChkb2N1bWVudCkuc2Nyb2xsVG9wKCkgPCAyMTApIHtcblx0XHRcdGltZy5zdHlsZS53aWR0aCA9ICgxNTAgLSAkKGRvY3VtZW50KS5zY3JvbGxUb3AoKSAvIDIuOSkgKyAncHgnO1xuXHRcdFx0aW1nLnN0eWxlLmhlaWdodCA9ICgxNTAgLSAkKGRvY3VtZW50KS5zY3JvbGxUb3AoKSAvIDIuOSkgKyAncHgnO1xuXHRcdFx0aW1nLnN0eWxlLmxlZnQgPSAoMCArICQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpIC8gNC45KSArICdweCc7XG5cdFx0XHRpbWcuc3R5bGUudG9wID0gKC0xMjAgKyAkKGRvY3VtZW50KS5zY3JvbGxUb3AoKSAvIDUuNykgKyAncHgnO1xuXHRcdH1cblxuXHRcdC8vQ2hhbmdlIGNsYXNzIG9mIHVzZXIgaW1hZ2Ugb2YgcHJvZmlsZSBwYWdlXG5cblx0XHR2YXIgdXNlckltZyA9ICQoJyN1c2VySW1nRmlndXJlJyk7XG5cblx0XHRpZiAoJChkb2N1bWVudCkuc2Nyb2xsVG9wKCkgPj0gMjEwKSB7XG5cdFx0XHR1c2VySW1nLnJlbW92ZUNsYXNzKCd1c2VySW1nRmlndXJlJyk7XG5cdFx0XHR1c2VySW1nLmFkZENsYXNzKCd1c2VySW1nRmlndXJlRml4ZWQnKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR1c2VySW1nLnJlbW92ZUNsYXNzKCd1c2VySW1nRmlndXJlRml4ZWQnKTtcblx0XHRcdHVzZXJJbWcuYWRkQ2xhc3MoJ3VzZXJJbWdGaWd1cmUnKTtcblx0XHR9XG5cdH1cblxuXHRwYXJhbGxheE5hbWUoKTp2b2lkIHtcblx0XHQvL0VmZmVjdCBvZiB1c2VyIG5hbWUgb2YgcHJvZmlsZSBwYWdlXG5cblx0XHR2YXIgbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyTmFtZURpdicpO1xuXG5cdFx0aWYgKCQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpIDwgMjEwKSB7XG5cdFx0XHRuYW1lLnN0eWxlLmxlZnQgPSAoMjIwIC0gJChkb2N1bWVudCkuc2Nyb2xsVG9wKCkgLyAzLjc1KSArICdweCc7XG5cdFx0fVxuXG5cdFx0Ly9DaGFuZ2UgY2xhc3Mgb2YgdXNlciBuYW1lIGRpdlxuXG5cdFx0dmFyIHVzZXJOYW1lID0gJCgnI3VzZXJOYW1lRGl2Jyk7XG5cblx0XHRpZiAoJChkb2N1bWVudCkuc2Nyb2xsVG9wKCkgPj0gMjEwKSB7XG5cdFx0XHR1c2VyTmFtZS5yZW1vdmVDbGFzcygndXNlck5hbWVEaXYnKTtcblx0XHRcdHVzZXJOYW1lLmFkZENsYXNzKCd1c2VyTmFtZURpdkZpeGVkJyk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dXNlck5hbWUucmVtb3ZlQ2xhc3MoJ3VzZXJOYW1lRGl2Rml4ZWQnKTtcblx0XHRcdHVzZXJOYW1lLmFkZENsYXNzKCd1c2VyTmFtZURpdicpO1xuXHRcdH1cblx0fVxuXG5cdHBvc3RlclBhcmFsYXgoaW1hZ2U6c3RyaW5nKTp2b2lkIHtcblx0XHR2YXIgJHBvc3RlciA9ICQoaW1hZ2UpO1xuXHRcdHZhciAkc2hpbmUgPSAkcG9zdGVyLmZpbmQoJy5zaGluZScpO1xuXHRcdHZhciAkbGF5ZXIgPSAkcG9zdGVyLmZpbmQoJypbY2xhc3MqPVwibGF5ZXItXCJdJyk7XG5cdFx0dmFyIHcgPSAkcG9zdGVyLndpZHRoKCk7XG5cdFx0dmFyIGggPSAkcG9zdGVyLmhlaWdodCgpO1xuXG5cdFx0JHBvc3Rlci5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24oZSkge1xuXHRcdFx0JCgnLm1haW5TZWN0aW9uJykuY3NzKHtcblx0XHRcdFx0J3RyYW5zZm9ybS1zdHlsZSc6ICdwcmVzZXJ2ZS0zZCcsXG5cdFx0XHRcdCd0cmFuc2Zvcm0nOiAncGVyc3BlY3RpdmUoMTAwMHB4KSdcblx0XHRcdH0pLFxuXHRcdFx0JCgnI2ltYWdlQmFjaycpLmNzcyh7XG5cdFx0XHRcdCd0b3AnOiAnMCdcblx0XHRcdH0pO1xuXG5cdFx0XHQvL3ZhciBvZmZzZXRYID0gMC41IC0gZS5wYWdlWCAvIHc7IC8vIGN1cnNvciBob3Jcblx0XHRcdC8vdmFyIG9mZnNldFkgPSAwLjUgLSBlLnBhZ2VZIC8gaDsgLy8gY3Vyc29yIHZlcnRcblx0XHRcdHZhciBvZmZzZXRYID0gMC41IC0gZS5wYWdlWCAvIHc7IC8vIGN1cnNvciBob3Jcblx0XHRcdHZhciBvZmZzZXRZID0gMC41IC0gZS5wYWdlWSAvIGg7IC8vIGN1cnNvciB2ZXJ0XG5cdFx0XHR2YXIgZHggPSBlLnBhZ2VYIC0gdyAvIDI7IC8vIHBvc3RlciBjZW50ZXIgaG9yXG5cdFx0XHR2YXIgZHkgPSBlLnBhZ2VZIC0gaCAvIDI7IC8vIHBvc3RlciBjZW50ZXIgdmVydFxuXHRcdFx0dmFyIHRoZXRhID0gTWF0aC5hdGFuMihkeSwgZHgpOyAvLyBhbmdsZSBiL3cgY3Vyc29yIGFuZCBwb3N0ZXIgY2VudGVyIGluIFJBRFxuXHRcdFx0dmFyIGFuZ2xlID0gdGhldGEgKiAxODAgLyBNYXRoLlBJIC0gOTA7IC8vIGNvbnZlcnQgcmFkIHRvIGRlZ3JlZXNcblx0XHRcdHZhciBvZmZzZXRQb3N0ZXIgPSAkcG9zdGVyLmRhdGEoJ29mZnNldCcpO1xuXHRcdFx0dmFyIHRyYW5zZm9ybVBvc3RlciA9ICd0cmFuc2xhdGVZKCcgKyAtb2Zmc2V0WCAqIG9mZnNldFBvc3RlciArICdweCkgcm90YXRlWCgnICsgKC1vZmZzZXRZICogb2Zmc2V0UG9zdGVyKSArICdkZWcpIHJvdGF0ZVkoJyArIChvZmZzZXRYICogKG9mZnNldFBvc3RlciAqIDIpKSArICdkZWcpJztcblx0XHRcdCRwb3N0ZXIuY3NzKCd0cmFuc2Zvcm0nLCB0cmFuc2Zvcm1Qb3N0ZXIpO1xuXG5cdFx0XHRpZiAoYW5nbGUgPCAwKSB7XG5cdFx0XHRcdGFuZ2xlID0gYW5nbGUgKyAzNjA7XG5cdFx0XHR9XG5cblx0XHRcdCRzaGluZS5jc3MoJ2JhY2tncm91bmQnLCAnbGluZWFyLWdyYWRpZW50KCcgKyBhbmdsZSArICdkZWcsIHJnYmEoMCwgMCwgMCwnICsgZS5wYWdlWSAvIGggKyAnKSAwJSxyZ2JhKDAsIDAsIDAsIDApIDgwJSknKTtcblx0XHRcdFxuXHRcdFx0JGxheWVyLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyk7XG5cdFx0XHRcdHZhciBvZmZzZXRMYXllciA9ICR0aGlzLmRhdGEoJ29mZnNldCcpIHx8IDA7XG5cdFx0XHRcdHZhciB0cmFuc2Zvcm1MYXllciA9ICd0cmFuc2xhdGVYKCcgKyBvZmZzZXRYICogb2Zmc2V0TGF5ZXIgKyAncHgpIHRyYW5zbGF0ZVkoJyArIG9mZnNldFkgKiBvZmZzZXRMYXllciArICdweCknO1xuXHRcdFx0XHRcblx0XHRcdFx0JHRoaXMuY3NzKCd0cmFuc2Zvcm0nLCB0cmFuc2Zvcm1MYXllcik7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxufSIsIi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmNsYXNzIFNsaWRlIHtcbiAgICBzbGlkZUluZGV4KCk6dm9pZCB7XG5cdFx0aWYoJCh0aGlzKS5zY3JvbGxUb3AoKSA8IDIwMCkge1xuXHRcdFx0aWYoKCQoJy5pbWFnZVNob3cnKSBhcyBhbnkpLm5leHQoKS5zaXplKCkpIHtcblx0XHRcdFx0JCgnLmltYWdlU2hvdycpLnJlbW92ZUNsYXNzKCdpbWFnZVNob3cnKS5hZGRDbGFzcygnaW1hZ2VIaWRlJykubmV4dCgpLnJlbW92ZUNsYXNzKCdpbWFnZUhpZGUnKS5hZGRDbGFzcygnaW1hZ2VTaG93Jyk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0KCQoJy5pbWFnZVNob3cnKSBhcyBhbnkpLnJlbW92ZUNsYXNzKCdpbWFnZVNob3cnKS5hZGRDbGFzcygnaW1hZ2VIaWRlJyk7XG5cdFx0XHRcdCQoJyNjb250ZW50U2xpZGVyICNpbWFnZURpdiBkaXY6bnRoLW9mLXR5cGUoMSknKS5yZW1vdmVDbGFzcygnaW1hZ2VIaWRlJykuYWRkQ2xhc3MoJ2ltYWdlU2hvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZigoJCgnLmNoYW5nZVNob3cnKSBhcyBhbnkpLm5leHQoKS5zaXplKCkpIHtcblx0XHRcdFx0JCgnLmNoYW5nZVNob3cnKS5yZW1vdmVDbGFzcygnY2hhbmdlU2hvdycpLmFkZENsYXNzKCdjaGFuZ2VIaWRlJykubmV4dCgpLnJlbW92ZUNsYXNzKCdjaGFuZ2VIaWRlJykuYWRkQ2xhc3MoJ2NoYW5nZVNob3cnKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHQkKCcuY2hhbmdlU2hvdycpLnJlbW92ZUNsYXNzKCdjaGFuZ2VTaG93JykuYWRkQ2xhc3MoJ2NoYW5nZUhpZGUnKTtcblx0XHRcdFx0JCgnI2NvbnRlbnRTbGlkZXIgI2NoYW5nZURpdiBkaXY6bnRoLW9mLXR5cGUoMSknKS5yZW1vdmVDbGFzcygnY2hhbmdlSGlkZScpLmFkZENsYXNzKCdjaGFuZ2VTaG93Jyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Y2hhbmdlSW5kZXgoc2xpZGVyOnN0cmluZyk6dm9pZCB7XG5cdFx0Ly9JbmRleCBidXR0b25zXG5cblx0XHQkKHNsaWRlcikub24oJ2NsaWNrJywgJy5jaGFuZ2VIaWRlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHQvL2NsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XG5cblx0XHRcdCQoJy5jaGFuZ2VTaG93JykucmVtb3ZlQ2xhc3MoJ2NoYW5nZVNob3cnKS5hZGRDbGFzcygnY2hhbmdlSGlkZScpO1xuXHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygnY2hhbmdlSGlkZScpLmFkZENsYXNzKCdjaGFuZ2VTaG93Jyk7XG5cblx0XHRcdHZhciBpbmRpY2UgPSAkKHRoaXMpLmluZGV4KCk7XG5cdFx0XHRpbmRpY2UgKys7XG5cblx0XHRcdCQoJyNpbWFnZURpdiAuaW1hZ2VTaG93JykucmVtb3ZlQ2xhc3MoJ2ltYWdlU2hvdycpLmFkZENsYXNzKCdpbWFnZUhpZGUnKTtcblx0XHRcdCQoJyNpbWFnZURpdiBkaXY6bnRoLW9mLXR5cGUoJyArIGluZGljZSArICcpJykucmVtb3ZlQ2xhc3MoJ2ltYWdlSGlkZScpLmFkZENsYXNzKCdpbWFnZVNob3cnKTtcblx0XHR9KTtcblxuXHRcdC8vUHJldmlvdXMgYnV0dG9uXG5cblx0XHQkKHNsaWRlcikub24oJ2NsaWNrJywgJyNwcmV2aW91c0ltYWdlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHQvL2NsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XG5cblx0XHRcdGlmKCgkKCcuaW1hZ2VTaG93JykgYXMgYW55KS5wcmV2KCkuc2l6ZSgpKSB7XG5cdFx0XHRcdCQoJy5pbWFnZVNob3cnKS5yZW1vdmVDbGFzcygnaW1hZ2VTaG93JykuYWRkQ2xhc3MoJ2ltYWdlSGlkZScpLnByZXYoKS5yZW1vdmVDbGFzcygnaW1hZ2VIaWRlJykuYWRkQ2xhc3MoJ2ltYWdlU2hvdycpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdCQoJy5pbWFnZVNob3cnKS5yZW1vdmVDbGFzcygnaW1hZ2VTaG93JykuYWRkQ2xhc3MoJ2ltYWdlSGlkZScpO1xuXHRcdFx0XHQkKCcjY29udGVudFNsaWRlciAjaW1hZ2VEaXYgZGl2Omxhc3QtY2hpbGQnKS5yZW1vdmVDbGFzcygnaW1hZ2VIaWRlJykuYWRkQ2xhc3MoJ2ltYWdlU2hvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgaW5kaWNlID0gJCh0aGlzKS5wYXJlbnQoKS5maW5kKCcjaW1hZ2VEaXYgLmltYWdlU2hvdycpLmluZGV4KCcjaW1hZ2VEaXYgZGl2Jyk7XG5cdFx0XHRpbmRpY2UgKys7XG5cblx0XHRcdCQoJyNjaGFuZ2VEaXYgZGl2JykucmVtb3ZlQ2xhc3MoJ2NoYW5nZVNob3cnKS5hZGRDbGFzcygnY2hhbmdlSGlkZScpO1xuXHRcdFx0JCgnI2NoYW5nZURpdiBkaXY6bnRoLW9mLXR5cGUoJyArIGluZGljZSArICcpJykucmVtb3ZlQ2xhc3MoJ2NoYW5nZUhpZGUnKS5hZGRDbGFzcygnY2hhbmdlU2hvdycpO1xuXHRcdH0pO1xuXG5cdFx0Ly9OZXh0IGJ1dHRvblxuXG5cdFx0JChzbGlkZXIpLm9uKCdjbGljaycsICcjbmV4dEltYWdlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHQvL2NsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XG5cblx0XHRcdGlmKCgkKCcuaW1hZ2VTaG93JykgYXMgYW55KS5uZXh0KCkuc2l6ZSgpKSB7XG5cdFx0XHRcdCQoJy5pbWFnZVNob3cnKS5yZW1vdmVDbGFzcygnaW1hZ2VTaG93JykuYWRkQ2xhc3MoJ2ltYWdlSGlkZScpLm5leHQoKS5yZW1vdmVDbGFzcygnaW1hZ2VIaWRlJykuYWRkQ2xhc3MoJ2ltYWdlU2hvdycpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdCQoJy5pbWFnZVNob3cnKS5yZW1vdmVDbGFzcygnaW1hZ2VTaG93JykuYWRkQ2xhc3MoJ2ltYWdlSGlkZScpO1xuXHRcdFx0XHQkKCcjY29udGVudFNsaWRlciAjaW1hZ2VEaXYgZGl2Om50aC1vZi10eXBlKDEpJykucmVtb3ZlQ2xhc3MoJ2ltYWdlSGlkZScpLmFkZENsYXNzKCdpbWFnZVNob3cnKTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGluZGljZSA9ICQodGhpcykucGFyZW50KCkuZmluZCgnI2ltYWdlRGl2IC5pbWFnZVNob3cnKS5pbmRleCgnI2ltYWdlRGl2IGRpdicpO1xuXHRcdFx0aW5kaWNlICsrO1xuXG5cdFx0XHQkKCcjY2hhbmdlRGl2IGRpdicpLnJlbW92ZUNsYXNzKCdjaGFuZ2VTaG93JykuYWRkQ2xhc3MoJ2NoYW5nZUhpZGUnKTtcblx0XHRcdCQoJyNjaGFuZ2VEaXYgZGl2Om50aC1vZi10eXBlKCcgKyBpbmRpY2UgKyAnKScpLnJlbW92ZUNsYXNzKCdjaGFuZ2VIaWRlJykuYWRkQ2xhc3MoJ2NoYW5nZVNob3cnKTtcblx0XHR9KTtcblx0fVxufSIsIi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmNsYXNzIEFqYXgge1xuICAgIHB1YmxpYyBhamF4RmlsZTpzdHJpbmcgPSAnYWpheC9hamF4UmVxdWlzaXRpb25zLnBocCc7XG4gICAgXG4gICAgLy9mdW5jdGlvbiBmb3Igc2ltcGxlIGFqYXgsIHdpdGhvdXQgc2VudCBhbmQgcmVjZWl2ZWQgZGF0YXMsIGlmIHlvdSB3YW50IHRvIHJlY2VpdmUgYW5kL29yIHNlbmQgZGF0YXMsIGNyZWF0ZSBhbm90ZXIgb25lXG5cbiAgICBjaGFuZ2VVcmwodXJsOnN0cmluZyk6dm9pZCB7XG4gICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKHt9LCAnJywgdXJsKTtcbiAgICB9XG5cbiAgICBnZXRQYWdlKHBhZ2U6c3RyaW5nLCBwYXJhbWV0ZXJzOnN0cmluZywgY2FsbGJhY2s6YW55KTp2b2lkIHtcbiAgICAgICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgXG4gICAgICAgIHJlcXVlc3Qub3BlbignUE9TVCcsIHBhZ2UsIHRydWUpO1xuICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LXR5cGVcIiwgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIik7XG5cbiAgICAgICAgcmVxdWVzdC5vbnByb2dyZXNzID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAkKCcuYWpheFJlcGxhY2UnKS5hZGRDbGFzcygnbG9hZGluZycpO1xuICAgICAgICAgICAgdmFyIHBlcmNlbnQgPSAoZS5sb2FkZWQgLyBlLnRvdGFsKSAqIDEwMDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgJCgnLmxvYWRpbmc6YmVmb3JlJykuY3NzKHtcbiAgICAgICAgICAgICAgICB3aWR0aDogcGVyY2VudCArICclJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA+PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgPCA0MDApIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhyZXF1ZXN0LnJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdVbmV4cGVjdGVkIHN0YXR1cyBjb2RlICcgKyByZXF1ZXN0LnN0YXR1cyArICcgZm9yICcgKyBwYWdlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2FsbGJhY2soJ2Vycm9yIGJlZm9yZSBzZWRpbmcnKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVxdWVzdC5zZW5kKHBhcmFtZXRlcnMpO1xuICAgIH1cblxuICAgIGFqYXgobWV0aG9kOnN0cmluZywgYWN0aW9uOnN0cmluZywgZGF0YUlkLCBiZWZvcmUsIG5vdERvbmUsIGRvbmUpOnZvaWQge1xuICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB2YXIgdXJsID0gdGhpcy5hamF4RmlsZSArICc/YWpheEFjdGlvbj0nICsgYWN0aW9uICsgJyZhamF4SWQ9JyArIGRhdGFJZDtcbiAgICAgICAgXG4gICAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbm90RG9uZTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVxdWVzdC5vcGVuKG1ldGhvZCwgdXJsKTtcbiAgICAgICAgXG4gICAgICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPj0gMjAwICYmIHJlcXVlc3Quc3RhdHVzIDwgNDAwKSB7XG4gICAgICAgICAgICAgICAgZG9uZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vdERvbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3Quc2VuZCgpO1xuICAgIH1cbn0iLCIvKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG5jbGFzcyBDb21tZW50cyBleHRlbmRzIEFqYXgge1xuICAgIG1ha2VDb21tZW50KCk6dm9pZCB7XG4gICAgICAgIHZhciBjb21tZW50ID0gJChcIiNjb21tZW50SW5wdXRcIikudmFsKCk7XG4gICAgICAgIHZhciBjaGVja0NvbW1lbnQgPSAoY29tbWVudCBhcyBhbnkpLnRyaW0oKTtcbiAgICAgICAgXG4gICAgICAgIGlmKGNoZWNrQ29tbWVudCA9PSAnJykge1xuICAgICAgICAgICAgYWxlcnQoJ1R5cGUgYSBjb21tZW50Jyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXG4gICAgICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICAgICAgICByZXF1ZXN0Lm9wZW4oJ1BPU1QnLCB0aGlzLmFqYXhGaWxlICsgJz9hamF4QWN0aW9uPW1ha2VDb21tZW50JmFqYXhJZD0nICsgJHRoaXMuYXR0cignZGF0YS1pZCcpKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC10eXBlXCIsIFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIpO1xuXG4gICAgICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBhbGVydChcIkNvbW1lbnQgbm90IG1hZGVcIik7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICQoJyNjb21tZW50c0RpdiAjY29tbWVudEZvcm1EaXYnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAkKCcjY29tbWVudHNEaXYnKS5wcmVwZW5kKCc8ZGl2IGlkPVwidXNlckNvbW1lbnRcIj48aW1nIHNyYz1cIicgKyBiYXNlVXJsICsgJ2ltYWdlcy91c2VyLycgKyAkdGhpcy5hdHRyKCdkYXRhLXVzZXJpZCcpICsgJy9wcm9maWxlLmpwZ1wiLz48ZGl2IGlkPVwicmlnaHREaXZcIj48ZGl2IGlkPVwiY29tbWVudFNwYW5EaXZcIj48c3BhbiBpZD1cImNvbW1lbnRTcGFuXCI+JyArIGNvbW1lbnQgKyAnPC9zcGFuPjwvZGl2PjxkaXYgaWQ9XCJjb21tZW50T3B0aW9uc0RpdlwiPjxkaXYgaWQ9XCJidXR0b25FZGl0XCIgY2xhc3M9XCJidXR0b25cIiBkYXRhLWlkPVwiJyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSArICdcIj48L2Rpdj48ZGl2IGlkPVwiYnV0dG9uRGVsZXRlXCIgY2xhc3M9XCJidXR0b25cIiBkYXRhLXVzZXJpZD1cIicgKyAkdGhpcy5hdHRyKCdkYXRhLXVzZXJpZCcpICsgJ1wiIGRhdGEtaWQ9XCInICsgJHRoaXMuYXR0cignZGF0YS1pZCcpICsgJ1wiPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICQoJyN1c2VyQ29tbWVudCcpLm9uKCdjbGljaycsICcjYnV0dG9uRGVsZXRlJywgdGhpcy5kZWxldGVDb21tZW50KCkpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmVxdWVzdC5zZW5kKFwiY29tbWVudD1cIiArIGNvbW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZWRpdENvbW1lbnQoKTp2b2lkIHtcbiAgICAgICAgYWxlcnQoJ0NvbW1pbmcgc29vbicpO1xuICAgIH1cblxuICAgIGRlbGV0ZUNvbW1lbnQoKTp2b2lkIHtcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcblxuICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICAgIHJlcXVlc3Qub3BlbignUE9TVCcsIHRoaXMuYWpheEZpbGUgKyAnP2FqYXhBY3Rpb249ZGVsZXRlQ29tbWVudCZhamF4SWQ9JyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSk7XG5cbiAgICAgICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhbGVydChcIkNvbW1lbnQgbm90IGRlbGV0ZWRcIik7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQoJyNjb21tZW50c0RpdiAjdXNlckNvbW1lbnQnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICQoJyNjb21tZW50c0RpdicpLnByZXBlbmQoJzxkaXYgaWQ9XCJjb21tZW50Rm9ybURpdlwiPjx0ZXh0YXJlYSBjb2xzPVwiMTBcIiByb3dzPVwiM1wiIG1heC1jb2xzPVwiMTBcIiBpZD1cImNvbW1lbnRJbnB1dFwiIHBsYWNlaG9sZGVyPVwiTGVhdmUgeW91ciBjb21tZW50XCI+PC90ZXh0YXJlYT48ZGl2IGlkPVwiYnV0dG9uc0RpdlwiPjxidXR0b24gaWQ9XCJjb21tZW50U3VibWl0XCIgZGF0YS11c2VyaWQ9XCInICsgJHRoaXMuYXR0cignZGF0YS11c2VyaWQnKSArICdcIiBkYXRhLWlkPVwiJyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSArICdcIiBkaXNhYmxlZD1cImRpc2FibGVkXCI+Q29tZW50YXI8L2J1dHRvbj48L2Rpdj48L2Rpdj4nKTtcbiAgICAgICAgICAgICQoJyNjb21tZW50Rm9ybURpdicpLm9uKCdjbGljaycsICcjY29tbWVudFN1Ym1pdCcsIHRoaXMubWFrZUNvbW1lbnQoKSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZUVuYWJsZSgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlcXVlc3Quc2VuZCgpO1xuICAgIH1cbn0iLCIvKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG5jbGFzcyBEZXRhaWxzIGV4dGVuZHMgQWpheCB7XG4gICAgc2hvd0RldGFpbHMoZXZlbnQ/OmFueSk6dm9pZCB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHZhciBjb250ZW50TGluazpzdHJpbmcgPSAkKHRoaXMpLmZpbmQoJy5jb250ZW50TGluaycpLmF0dHIoJ2hyZWYnKTtcbiAgICAgICAgdmFyIGNvbnRlbnRMaW5rVG9CYWNrOnN0cmluZyA9ICQodGhpcykuZmluZCgnLmNvbnRlbnRMaW5rJykuYXR0cignZGF0YS11cmwnKTtcbiAgICAgICAgdmFyIGNvbnRlbnRUaXRsZVRvQmFjazpzdHJpbmcgPSAkKHRoaXMpLmZpbmQoJy5jb250ZW50TGluaycpLmF0dHIoJ2RhdGEtdGl0bGUnKTtcbiAgICAgICAgJCgnLmNsb3NlQnV0dG9uJykuYXR0cignZGF0YS11cmwnLCBjb250ZW50TGlua1RvQmFjayk7XG4gICAgICAgICQoJy5jbG9zZUJ1dHRvbicpLmF0dHIoJ2RhdGEtdGl0bGUnLCBjb250ZW50VGl0bGVUb0JhY2spO1xuXG4gICAgICAgIHZhciBhbGxjb250YWluZXJEaXYgPSAkKCcuY29udGVudENvbnRhaW5lciAudGl0bGVEZXRhaWxzT3BlbicpO1xuICAgICAgICB2YXIgYWxsY29udGVudERpdiA9ICQoJy5jb250ZW50Q29udGFpbmVyIC5jb250ZW50RGl2IC5jb250ZW50T3BlbicpO1xuICAgICAgICBcbiAgICAgICAgdmFyIGNvbnRlbnREaXYgPSAkKHRoaXMpOy8vY29udGVudFxuICAgICAgICB2YXIgcGFyZW50RGl2ID0gY29udGVudERpdi5wYXJlbnQoKTsvL2NvbnRlbnRHcm91cFxuICAgICAgICB2YXIgY29udGFpbmVyRGl2ID0gcGFyZW50RGl2LnBhcmVudCgpLnBhcmVudCgpOy8vY29udGVudENvbnRhaW5lclxuXG4gICAgICAgIGFsbGNvbnRhaW5lckRpdi5maW5kKCcuc2VjdGlvbkNvbnRlbnQgYXJ0aWNsZScpLnJlbW92ZSgpO1xuXG4gICAgICAgIGFsbGNvbnRhaW5lckRpdi5yZW1vdmVDbGFzcygndGl0bGVEZXRhaWxzT3BlbicpLmFkZENsYXNzKCd0aXRsZURldGFpbHMnKTtcbiAgICAgICAgYWxsY29udGVudERpdi5yZW1vdmVDbGFzcygnY29udGVudE9wZW4nKS5hZGRDbGFzcygnY29udGVudCcpO1xuICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdjb250ZW50JykuYWRkQ2xhc3MoJ2NvbnRlbnRPcGVuJyk7XG4gICAgICAgIFxuICAgICAgICBjb250YWluZXJEaXYuZmluZCgnLnRpdGxlRGV0YWlscycpLnJlbW92ZUNsYXNzKCd0aXRsZURldGFpbHMnKS5hZGRDbGFzcygndGl0bGVEZXRhaWxzT3BlbicpO1xuICAgICAgICBcbiAgICAgICAgaWYocGFyZW50RGl2LmF0dHIoJ2NsYXNzJykgPT0gJ2NvbnRlbnRHcm91cCcpIHtcbiAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IGNvbnRhaW5lckRpdi5maW5kKCcudGl0bGVEZXRhaWxzT3BlbicpLm9mZnNldCgpLnRvcCAtIDE1MFxuICAgICAgICAgICAgfSw1MDApO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyLmdldFBhZ2UoY29udGVudExpbmssIFwiYm9keT10cnVlXCIsIGZ1bmN0aW9uKGRhdGE6YW55KSB7XG4gICAgICAgICAgICB2YXIgZmlsdGVyOmFueSA9ICQoZGF0YSkuY2hpbGRyZW4oKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAkKCcudGl0bGVEZXRhaWxzT3BlbicpLmZpbmQoJy5zZWN0aW9uQ29udGVudCcpLmh0bWwoZmlsdGVyKTtcbiAgICAgICAgICAgIHZhciB0aXRsZUV2ZW50cyA9IG5ldyBUaXRsZSgpO1xuICAgICAgICAgICAgdGl0bGVFdmVudHMudGl0bGUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHN1cGVyLmNoYW5nZVVybChjb250ZW50TGluayk7XG4gICAgfVxuXG4gICAgY2xvc2VEZXRhaWxzKCk6dm9pZCB7XG4gICAgICAgIHZhciBjb250YWluZXJEaXYgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnBhcmVudCgpOy8vY29udGVudENvbnRhaW5lclxuICAgICAgICB2YXIgYWxsY29udGFpbmVyRGl2ID0gJCgnLmNvbnRlbnRDb250YWluZXIgLnRpdGxlRGV0YWlsc09wZW4nKTtcbiAgICAgICAgdmFyIGFsbGNvbnRlbnREaXYgPSAkKCcuY29udGVudENvbnRhaW5lciAuY29udGVudERpdiBkaXYnKTtcbiAgICAgICAgdmFyIG9mZnNldERldGFpbHNEaXYgPSBjb250YWluZXJEaXYub2Zmc2V0KCkudG9wO1xuICAgICAgICB2YXIgbGlua1RvQmFjayA9ICQodGhpcykuYXR0cignZGF0YS11cmwnKTtcbiAgICAgICAgdmFyIHRpdGxlVG9CYWNrID0gJCh0aGlzKS5hdHRyKCdkYXRhLXRpdGxlJyk7XG5cbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9wOiBvZmZzZXREZXRhaWxzRGl2XG4gICAgICAgIH0sNTAwLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGFsbGNvbnRhaW5lckRpdi5yZW1vdmVDbGFzcygndGl0bGVEZXRhaWxzT3BlbicpLmFkZENsYXNzKCd0aXRsZURldGFpbHMnKTtcbiAgICAgICAgICAgICQoJy50aXRsZURldGFpbHMnKS5maW5kKCcuc2VjdGlvbkNvbnRlbnQgYXJ0aWNsZScpLnJlbW92ZSgpO1xuICAgICAgICAgICAgJCgnLnRpdGxlRGV0YWlsc09wZW4nKS5maW5kKCcuc2VjdGlvbkNvbnRlbnQgYXJ0aWNsZScpLnJlbW92ZSgpO1xuICAgICAgICAgICAgYWxsY29udGVudERpdi5maW5kKCcuY29udGVudE9wZW4nKS5yZW1vdmVDbGFzcygnY29udGVudE9wZW4nKS5hZGRDbGFzcygnY29udGVudCcpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL3N1cGVyLmNoYW5nZVVybChsaW5rVG9CYWNrKTtcbiAgICAgICAgICAgICQoJ3RpdGxlJykuZW1wdHkoKS50ZXh0KHRpdGxlVG9CYWNrKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc3VwZXIuY2hhbmdlVXJsKGxpbmtUb0JhY2spO1xuICAgIH1cbn0iLCIvKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG5jbGFzcyBGb2xsb3cgZXh0ZW5kcyBBamF4IHtcbiAgICBmb2xsb3dVc2VyKCk6dm9pZCB7XG4gICAgICAgIHZhciBidXR0b24gPSAkKHRoaXMpO1xuXG4gICAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgICAgcmVxdWVzdC5vcGVuKCdQT1NUJywgdGhpcy5hamF4RmlsZSArICc/YWpheEFjdGlvbj1mb2xsb3cmYWpheElkPScgKyAkKGJ1dHRvbikuYXR0cignZGF0YS1pZCcpKTtcblxuICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGFsZXJ0KCdFcnJvcicpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZVRleHQpO1xuXG4gICAgICAgICAgICAkKGJ1dHRvbikuYXR0cihcImlkXCIsIGRhdGEuY2hhbmdlKTtcbiAgICAgICAgICAgICQoYnV0dG9uKS5maW5kKFwiLmJ1dHRvblNwYW5cIikuaHRtbChkYXRhLndyaXRlKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXF1ZXN0LnNlbmQoKTtcbiAgICB9XG5cbiAgICB1bmZvbGxvd1VzZXIoKTp2b2lkIHtcbiAgICAgICAgdmFyIGJ1dHRvbiA9ICQodGhpcyk7XG5cbiAgICAgICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgICByZXF1ZXN0Lm9wZW4oJ1BPU1QnLCB0aGlzLmFqYXhGaWxlICsgJz9hamF4QWN0aW9uPXVuZm9sbG93JmFqYXhJZD0nICsgJChidXR0b24pLmF0dHIoJ2RhdGEtaWQnKSk7XG5cbiAgICAgICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhbGVydCgnRXJyb3InKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2VUZXh0KTtcblxuICAgICAgICAgICAgJChidXR0b24pLmF0dHIoXCJpZFwiLCBkYXRhLmNoYW5nZSk7XG4gICAgICAgICAgICAkKGJ1dHRvbikuZmluZChcIi5idXR0b25TcGFuXCIpLmh0bWwoZGF0YS53cml0ZSk7IFxuICAgICAgICB9O1xuXG4gICAgICAgIHJlcXVlc3Quc2VuZCgpO1xuICAgIH1cblxuICAgIGFqYXhMaW5rKGV2ZW50LCB1cmwpOnZvaWQge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZih1cmwgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgbGlua1RvID0gdXJsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIGxpbmtUbzphbnkgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcbiAgICAgICAgfVxuICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ3Njcm9sbCcpO1xuXG4gICAgICAgIHRoaXMuZ2V0UGFnZShsaW5rVG8sIFwiYm9keT10cnVlXCIsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAvLyQoJy5hamF4UmVwbGFjZScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG4gICAgICAgICAgICAkKCcuYWpheFJlcGxhY2UnKS5odG1sKGRhdGEpO1xuXG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgICAgICAgICB9LDUwMCk7XG5cbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVXJsKGxpbmtUbyk7XG5cbiAgICAgICAgICAgICQoJyNtZW51QnRJbnB1dCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG5cbiAgICAgICAgICAgIGlmKGxpbmtUbyA9PSBiYXNlVXJsKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufSIsIi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmNsYXNzIFdhdGNobGlzdCBleHRlbmRzIEFqYXgge1xuICAgIGFkZFdhdGNoTGlzdCgpOnZvaWQge1xuICAgICAgICB2YXIgZGF0YUlkID0gJCh0aGlzKS5hdHRyKCdkYXRhLWlkJyk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmFqYXgoXG4gICAgICAgICAgICAnUE9TVCcsXG4gICAgICAgICAgICAnYWRkV2F0Y2hMaXN0JyxcbiAgICAgICAgICAgIGRhdGFJZCxcbiAgICAgICAgICAgICcnLFxuICAgICAgICAgICAgJycsXG4gICAgICAgICAgICAkKCcuYWRkV2F0Y2hMaXN0JykucmVtb3ZlQ2xhc3MoJ2FkZFdhdGNoTGlzdCcpLmFkZENsYXNzKCdyZW1vdmVXYXRjaExpc3QnKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbW92ZVdhdGNoTGlzdCgpOnZvaWQge1xuICAgICAgICB2YXIgZGF0YUlkID0gJCh0aGlzKS5hdHRyKCdkYXRhLWlkJyk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmFqYXgoXG4gICAgICAgICAgICAnUE9TVCcsXG4gICAgICAgICAgICAncmVtb3ZlV2F0Y2hMaXN0JyxcbiAgICAgICAgICAgIGRhdGFJZCxcbiAgICAgICAgICAgICcnLFxuICAgICAgICAgICAgJycsXG4gICAgICAgICAgICAkKCcucmVtb3ZlV2F0Y2hMaXN0JykucmVtb3ZlQ2xhc3MoJ3JlbW92ZVdhdGNoTGlzdCcpLmFkZENsYXNzKCdhZGRXYXRjaExpc3QnKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGFkZFdhdGNoTGlzdEluZGV4KCk6dm9pZCB7XG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgIHZhciBkYXRhSWQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtaWQnKTtcblxuICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB2YXIgdXJsID0gdGhpcy5hamF4RmlsZSArICc/YWpheEFjdGlvbj1hZGRXYXRjaExpc3QmYWpheElkPScgKyBkYXRhSWQ7XG4gICAgICAgIFxuICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGFsZXJ0KCdFcnJvcicpO1xuICAgICAgICB9O1xuICAgICAgICByZXF1ZXN0Lm9wZW4oJ1BPU1QnLCB1cmwpO1xuICAgICAgICBcbiAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlVGV4dCk7XG5cbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA+PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgPCA0MDApIHtcbiAgICAgICAgICAgICAgICBpZigkKCcjd2F0Y2hMaXN0RGl2JykubGVuZ3RoID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5tYWluU2VjdGlvbicpLnByZXBlbmQoJzxhcnRpY2xlIGlkPVwid2F0Y2hMaXN0RGl2XCIgY2xhc3M9XCJjb250ZW50Q29udGFpbmVyXCI+PHAgY2xhc3M9XCJjb250ZW50RGl2SGVhZGVyXCI+JyArIGRhdGEudGl0bGUgKyAnPC9wPjxkaXYgY2xhc3M9XCJjb250ZW50RGl2XCI+PGRpdiBjbGFzcz1cImNvbnRlbnRHcm91cFNjcm9sbFwiPjwvZGl2PjwvZGl2PjwvYXJ0aWNsZT4nKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZigkdGhpcy5hdHRyKCdkYXRhLXR5cGUnKSA9PSAnbW92aWUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsaW5rVHlwZSA9ICdtb3ZpZXMnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKCR0aGlzLmF0dHIoJ2RhdGEtdHlwZScpID09ICdzZXJpZScpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpbmtUeXBlID0gJ3Nlcmllcyc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgJHRoaXMucmVtb3ZlQ2xhc3MoJ2FkZFdhdGNoTGlzdCcpLmFkZENsYXNzKCdyZW1vdmVXYXRjaExpc3QnKTtcblxuICAgICAgICAgICAgICAgICQoJyN3YXRjaExpc3REaXYgLmNvbnRlbnRHcm91cFNjcm9sbCcpLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJjb250ZW50XCIgZGF0YS1pZD1cIicgKyAkdGhpcy5hdHRyKCdkYXRhLWlkJykgICsgJ1wiPjxhIGNsYXNzPVwiY29udGVudExpbmtcIiBocmVmPVwiJyArIGJhc2VVcmwgKyAndGl0bGU/aWQ9JyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSArICdcIj48ZmlndXJlIGNsYXNzPVwiY29udGVudEZpZ3VyZVwiPjxpbWcgc3JjPVwiL2pva2VyL2ltYWdlcy9tZWRpYS8nICsgbGlua1R5cGUgKyAnLycgKyAkdGhpcy5hdHRyKCdkYXRhLWlkJykgKyAnL2ltYWdlLmpwZ1wiLz48ZmlnY2FwdGlvbj48L2ZpZ2NhcHRpb24+PC9maWd1cmU+PC9hPjxkaXYgY2xhc3M9XCJyZW1vdmVXYXRjaExpc3RcIiBkYXRhLXR5cGU9XCInICsgbGlua1R5cGUgKyAnXCIgZGF0YS1pZD1cIicgKyAkdGhpcy5hdHRyKCdkYXRhLWlkJykgKyAnXCI+PC9kaXY+PC9kaXY+Jyk7XG5cbiAgICAgICAgICAgICAgICAkKCcuY29udGVudERpdiBkaXYgLmFkZFdhdGNoTGlzdFtkYXRhLWlkPVwiJyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSArICdcIl0nKS5yZW1vdmVDbGFzcygnYWRkV2F0Y2hMaXN0JykuYWRkQ2xhc3MoJ3JlbW92ZVdhdGNoTGlzdCcpO1xuICAgICAgICAgICAgICAgICQoJyNpbWFnZURpdiBkaXYgc3BhbltkYXRhLWlkPVwiJyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSArICdcIl0nKS5yZW1vdmVDbGFzcygnYWRkV2F0Y2hMaXN0JykuYWRkQ2xhc3MoJ3JlbW92ZVdhdGNoTGlzdCcpO1xuXG4gICAgICAgICAgICAgICAgJCgnI2NvbnRlbnRTb3J0Y3V0cycpLmZpbmQoJy5hZGRXYXRjaExpc3QnKS5yZW1vdmVDbGFzcygnYWRkV2F0Y2hMaXN0JykuYWRkQ2xhc3MoJ3JlbW92ZVdhdGNoTGlzdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ0Vycm9yJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3Quc2VuZCgpO1xuICAgIH1cblxuICAgIHJlbW92ZVdhdGNoTGlzdEluZGV4KCk6dm9pZCB7XG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgIHZhciBkYXRhSWQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtaWQnKTtcblxuICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB2YXIgdXJsID0gdGhpcy5hamF4RmlsZSArICc/YWpheEFjdGlvbj1yZW1vdmVXYXRjaExpc3QmYWpheElkPScgKyBkYXRhSWQ7XG4gICAgICAgIFxuICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGFsZXJ0KCdFcnJvcicpO1xuICAgICAgICB9O1xuICAgICAgICByZXF1ZXN0Lm9wZW4oJ1BPU1QnLCB1cmwpO1xuICAgICAgICBcbiAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA+PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgPCA0MDApIHtcbiAgICAgICAgICAgICAgICAkKCcjd2F0Y2hMaXN0RGl2IGRpdltkYXRhLWlkPVwiJyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSArICdcIl0nKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAkKCcuY29udGVudERpdiBkaXYgLnJlbW92ZVdhdGNoTGlzdFtkYXRhLWlkPVwiJyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSArICdcIl0nKS5yZW1vdmVDbGFzcygncmVtb3ZlV2F0Y2hMaXN0JykuYWRkQ2xhc3MoJ2FkZFdhdGNoTGlzdCcpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICQoJyNpbWFnZURpdiBzcGFuW2RhdGEtaWQ9XCInICsgJHRoaXMuYXR0cignZGF0YS1pZCcpICsgJ1wiXScpLnJlbW92ZUNsYXNzKCdyZW1vdmVXYXRjaExpc3QnKS5hZGRDbGFzcygnYWRkV2F0Y2hMaXN0Jyk7XG5cbiAgICAgICAgICAgICAgICAkKCcjY29udGVudFNvcnRjdXRzJykuZmluZCgnLnJlbW92ZVdhdGNoTGlzdCcpLnJlbW92ZUNsYXNzKCdyZW1vdmVXYXRjaExpc3QnKS5hZGRDbGFzcygnYWRkV2F0Y2hMaXN0Jyk7XG5cbiAgICAgICAgICAgICAgICBpZigkLnRyaW0oJCgnI3dhdGNoTGlzdERpdiAuY29udGVudEdyb3VwU2Nyb2xsJykuaHRtbCgpKSA9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAkKCcjd2F0Y2hMaXN0RGl2JykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ0Vycm9yJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3Quc2VuZCgpO1xuICAgIH1cbn0iXX0=
