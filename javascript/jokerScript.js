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
define("classes/config.class", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Config = /** @class */ (function () {
        function Config() {
            this.baseUrl = $('head').attr('data-url');
            this.cookieId = $('head').attr('data-cookie');
            //var intervalLogoff:number = setInterval(userScript.secureLogoff(baseUrl), 250);
        }
        return Config;
    }());
    exports.Config = Config;
});
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
define("classes/ajax/ajax.class", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.Ajax = Ajax;
});
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
define("classes/ajax/details.class", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.Details = Details;
});
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
define("classes/ajax/comments.class", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.Comments = Comments;
});
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
define("classes/ajax/follow.class", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.Follow = Follow;
});
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
define("classes/ajax/watchlist.class", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.Watchlist = Watchlist;
});
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
define("classes/user/login.class", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.Login = Login;
});
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
define("classes/user/parallax.class", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.Parallax = Parallax;
});
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
define("classes/user/slide.class", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.Slide = Slide;
});
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
define("classes/user/others.class", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.UserOthers = UserOthers;
});
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
define("classes/admin/menu.class", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.AdminMenu = AdminMenu;
});
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
define("classes/admin/others.class", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.AdminOthers = AdminOthers;
});
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
define("events/index", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Index;
    (function (Index) {
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
    })(Index = exports.Index || (exports.Index = {}));
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
define("jokerScript", ["require", "exports"], function (require, exports) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    var test = {
        'name': 'Daniel',
        'surName': 'Rios',
        'fullName': function () {
            return this;
        },
        'fullName2': function () {
            return _this;
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cGVzY3JpcHQvY2xhc3Nlcy9jb25maWcuY2xhc3MudHMiLCJ0eXBlc2NyaXB0L2NsYXNzZXMvYWpheC9hamF4LmNsYXNzLnRzIiwidHlwZXNjcmlwdC9jbGFzc2VzL2FqYXgvZGV0YWlscy5jbGFzcy50cyIsInR5cGVzY3JpcHQvY2xhc3Nlcy9hamF4L2NvbW1lbnRzLmNsYXNzLnRzIiwidHlwZXNjcmlwdC9jbGFzc2VzL2FqYXgvZm9sbG93LmNsYXNzLnRzIiwidHlwZXNjcmlwdC9jbGFzc2VzL2FqYXgvd2F0Y2hsaXN0LmNsYXNzLnRzIiwidHlwZXNjcmlwdC9jbGFzc2VzL3VzZXIvbG9naW4uY2xhc3MudHMiLCJ0eXBlc2NyaXB0L2NsYXNzZXMvdXNlci9wYXJhbGxheC5jbGFzcy50cyIsInR5cGVzY3JpcHQvY2xhc3Nlcy91c2VyL3NsaWRlLmNsYXNzLnRzIiwidHlwZXNjcmlwdC9jbGFzc2VzL3VzZXIvb3RoZXJzLmNsYXNzLnRzIiwidHlwZXNjcmlwdC9jbGFzc2VzL2FkbWluL21lbnUuY2xhc3MudHMiLCJ0eXBlc2NyaXB0L2NsYXNzZXMvYWRtaW4vb3RoZXJzLmNsYXNzLnRzIiwidHlwZXNjcmlwdC9ldmVudHMvYWxsLnRzIiwidHlwZXNjcmlwdC9ldmVudHMvaW5kZXgudHMiLCJ0eXBlc2NyaXB0L2V2ZW50cy9hZG1pbi50cyIsInR5cGVzY3JpcHQvam9rZXJTY3JpcHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7OztFQUtFOzs7O0lBRUY7UUFBQTtZQUNXLFlBQU8sR0FBVSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzVDLGFBQVEsR0FBVSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRXZELGlGQUFpRjtRQUNyRixDQUFDO1FBQUQsYUFBQztJQUFELENBTEEsQUFLQyxJQUFBO0lBTFksd0JBQU07O0FD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QUU7UUFDdEMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNqRCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDO0FDbkJIOzs7OztFQUtFOzs7SUFJRixpQkFxQ0M7O0lBVEQsSUFBSSxJQUFJLEdBQUc7UUFDUCxNQUFNLEVBQUUsUUFBUTtRQUNoQixTQUFTLEVBQUUsTUFBTTtRQUNqQixVQUFVLEVBQUc7WUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxXQUFXLEVBQUU7WUFDVCxNQUFNLENBQUMsS0FBSSxDQUFDO1FBQ2hCLENBQUM7S0FDSixDQUFBIiwiZmlsZSI6Impva2VyU2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiB8IENvcHlyaWdodCAoYykgMjAxNC0yMDE1IEF0b21vLmNvbS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiB8IEAgQXV0aG9yXHQ6IERhbmllbCBSaW9zLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKi9cblxuZXhwb3J0IGNsYXNzIENvbmZpZyB7XG4gICAgcHVibGljIGJhc2VVcmw6c3RyaW5nID0gJCgnaGVhZCcpLmF0dHIoJ2RhdGEtdXJsJyk7XG4gICAgcHVibGljIGNvb2tpZUlkOnN0cmluZyA9ICQoJ2hlYWQnKS5hdHRyKCdkYXRhLWNvb2tpZScpO1xuICAgIFxuICAgIC8vdmFyIGludGVydmFsTG9nb2ZmOm51bWJlciA9IHNldEludGVydmFsKHVzZXJTY3JpcHQuc2VjdXJlTG9nb2ZmKGJhc2VVcmwpLCAyNTApO1xufSIsIi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmV4cG9ydCBjbGFzcyBBamF4IHtcbiAgICBwdWJsaWMgYWpheEZpbGU6c3RyaW5nID0gJ2FqYXgvYWpheFJlcXVpc2l0aW9ucy5waHAnO1xuICAgIFxuICAgIC8vZnVuY3Rpb24gZm9yIHNpbXBsZSBhamF4LCB3aXRob3V0IHNlbnQgYW5kIHJlY2VpdmVkIGRhdGFzLCBpZiB5b3Ugd2FudCB0byByZWNlaXZlIGFuZC9vciBzZW5kIGRhdGFzLCBjcmVhdGUgYW5vdGVyIG9uZVxuXG4gICAgY2hhbmdlVXJsKHVybCk6dm9pZCB7XG4gICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKHt9LCAnJywgdXJsKTtcbiAgICB9XG5cbiAgICBnZXRQYWdlKHBhZ2U6c3RyaW5nLCBwYXJhbWV0ZXJzOmFueSwgY2FsbGJhY2s6YW55KTp2b2lkIHtcbiAgICAgICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgXG4gICAgICAgIHJlcXVlc3Qub3BlbignUE9TVCcsIHBhZ2UsIHRydWUpO1xuICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LXR5cGVcIiwgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIik7XG5cbiAgICAgICAgcmVxdWVzdC5vbnByb2dyZXNzID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAkKCcuYWpheFJlcGxhY2UnKS5hZGRDbGFzcygnbG9hZGluZycpO1xuICAgICAgICAgICAgdmFyIHBlcmNlbnQgPSAoZS5sb2FkZWQgLyBlLnRvdGFsKSAqIDEwMDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgJCgnLmxvYWRpbmc6YmVmb3JlJykuY3NzKHtcbiAgICAgICAgICAgICAgICB3aWR0aDogcGVyY2VudCArICclJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA+PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgPCA0MDApIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhyZXF1ZXN0LnJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdVbmV4cGVjdGVkIHN0YXR1cyBjb2RlICcgKyByZXF1ZXN0LnN0YXR1cyArICcgZm9yICcgKyBwYWdlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2FsbGJhY2soJ2Vycm9yIGJlZm9yZSBzZWRpbmcnKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVxdWVzdC5zZW5kKHBhcmFtZXRlcnMpO1xuICAgIH1cblxuICAgIGFqYXgobWV0aG9kOnN0cmluZywgYWN0aW9uOnN0cmluZywgZGF0YUlkLCBiZWZvcmUsIG5vdERvbmUsIGRvbmUpOnZvaWQge1xuICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB2YXIgdXJsID0gdGhpcy5hamF4RmlsZSArICc/YWpheEFjdGlvbj0nICsgYWN0aW9uICsgJyZhamF4SWQ9JyArIGRhdGFJZDtcbiAgICAgICAgXG4gICAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbm90RG9uZTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVxdWVzdC5vcGVuKG1ldGhvZCwgdXJsKTtcbiAgICAgICAgXG4gICAgICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPj0gMjAwICYmIHJlcXVlc3Quc3RhdHVzIDwgNDAwKSB7XG4gICAgICAgICAgICAgICAgZG9uZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vdERvbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3Quc2VuZCgpO1xuICAgIH1cbn0iLCIvKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG5leHBvcnQgY2xhc3MgRGV0YWlscyBleHRlbmRzIEFqYXgge1xuICAgIHNob3dEZXRhaWxzKGV2ZW50PzphbnkpOnZvaWQge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB2YXIgY29udGVudExpbmsgPSAkKHRoaXMpLmZpbmQoJy5jb250ZW50TGluaycpLmF0dHIoJ2hyZWYnKTtcbiAgICAgICAgdmFyIGNvbnRlbnRMaW5rVG9CYWNrID0gJCh0aGlzKS5maW5kKCcuY29udGVudExpbmsnKS5hdHRyKCdkYXRhLXVybCcpO1xuICAgICAgICB2YXIgY29udGVudFRpdGxlVG9CYWNrID0gJCh0aGlzKS5maW5kKCcuY29udGVudExpbmsnKS5hdHRyKCdkYXRhLXRpdGxlJyk7XG4gICAgICAgICQoJy5jbG9zZUJ1dHRvbicpLmF0dHIoJ2RhdGEtdXJsJywgY29udGVudExpbmtUb0JhY2spO1xuICAgICAgICAkKCcuY2xvc2VCdXR0b24nKS5hdHRyKCdkYXRhLXRpdGxlJywgY29udGVudFRpdGxlVG9CYWNrKTtcblxuICAgICAgICB2YXIgYWxsY29udGFpbmVyRGl2ID0gJCgnLmNvbnRlbnRDb250YWluZXIgLnRpdGxlRGV0YWlsc09wZW4nKTtcbiAgICAgICAgdmFyIGFsbGNvbnRlbnREaXYgPSAkKCcuY29udGVudENvbnRhaW5lciAuY29udGVudERpdiAuY29udGVudE9wZW4nKTtcbiAgICAgICAgXG4gICAgICAgIHZhciBjb250ZW50RGl2ID0gJCh0aGlzKTsvL2NvbnRlbnRcbiAgICAgICAgdmFyIHBhcmVudERpdiA9IGNvbnRlbnREaXYucGFyZW50KCk7Ly9jb250ZW50R3JvdXBcbiAgICAgICAgdmFyIGNvbnRhaW5lckRpdiA9IHBhcmVudERpdi5wYXJlbnQoKS5wYXJlbnQoKTsvL2NvbnRlbnRDb250YWluZXJcblxuICAgICAgICBhbGxjb250YWluZXJEaXYuZmluZCgnLnNlY3Rpb25Db250ZW50IGFydGljbGUnKS5yZW1vdmUoKTtcblxuICAgICAgICBhbGxjb250YWluZXJEaXYucmVtb3ZlQ2xhc3MoJ3RpdGxlRGV0YWlsc09wZW4nKS5hZGRDbGFzcygndGl0bGVEZXRhaWxzJyk7XG4gICAgICAgIGFsbGNvbnRlbnREaXYucmVtb3ZlQ2xhc3MoJ2NvbnRlbnRPcGVuJykuYWRkQ2xhc3MoJ2NvbnRlbnQnKTtcbiAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnY29udGVudCcpLmFkZENsYXNzKCdjb250ZW50T3BlbicpO1xuICAgICAgICBcbiAgICAgICAgY29udGFpbmVyRGl2LmZpbmQoJy50aXRsZURldGFpbHMnKS5yZW1vdmVDbGFzcygndGl0bGVEZXRhaWxzJykuYWRkQ2xhc3MoJ3RpdGxlRGV0YWlsc09wZW4nKTtcbiAgICAgICAgXG4gICAgICAgIGlmKHBhcmVudERpdi5hdHRyKCdjbGFzcycpID09ICdjb250ZW50R3JvdXAnKSB7XG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBjb250YWluZXJEaXYuZmluZCgnLnRpdGxlRGV0YWlsc09wZW4nKS5vZmZzZXQoKS50b3AgLSAxNTBcbiAgICAgICAgICAgIH0sNTAwKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdldFBhZ2UoY29udGVudExpbmssIFwiYm9keT10cnVlXCIsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciBmaWx0ZXI6YW55ID0gJChkYXRhKS5jaGlsZHJlbigpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICQoJy50aXRsZURldGFpbHNPcGVuJykuZmluZCgnLnNlY3Rpb25Db250ZW50JykuaHRtbChmaWx0ZXIpO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VVcmwoY29udGVudExpbmspO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjbG9zZURldGFpbHMoKTp2b2lkIHtcbiAgICAgICAgdmFyIGNvbnRhaW5lckRpdiA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkucGFyZW50KCk7Ly9jb250ZW50Q29udGFpbmVyXG4gICAgICAgIHZhciBhbGxjb250YWluZXJEaXYgPSAkKCcuY29udGVudENvbnRhaW5lciAudGl0bGVEZXRhaWxzT3BlbicpO1xuICAgICAgICB2YXIgYWxsY29udGVudERpdiA9ICQoJy5jb250ZW50Q29udGFpbmVyIC5jb250ZW50RGl2IGRpdicpO1xuICAgICAgICB2YXIgb2Zmc2V0RGV0YWlsc0RpdiA9IGNvbnRhaW5lckRpdi5vZmZzZXQoKS50b3A7XG4gICAgICAgIHZhciBsaW5rVG9CYWNrID0gJCh0aGlzKS5hdHRyKCdkYXRhLXVybCcpO1xuICAgICAgICB2YXIgdGl0bGVUb0JhY2sgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtdGl0bGUnKTtcblxuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICBzY3JvbGxUb3A6IG9mZnNldERldGFpbHNEaXZcbiAgICAgICAgfSw1MDAsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYWxsY29udGFpbmVyRGl2LnJlbW92ZUNsYXNzKCd0aXRsZURldGFpbHNPcGVuJykuYWRkQ2xhc3MoJ3RpdGxlRGV0YWlscycpO1xuICAgICAgICAgICAgJCgnLnRpdGxlRGV0YWlscycpLmZpbmQoJy5zZWN0aW9uQ29udGVudCBhcnRpY2xlJykucmVtb3ZlKCk7XG4gICAgICAgICAgICAkKCcudGl0bGVEZXRhaWxzT3BlbicpLmZpbmQoJy5zZWN0aW9uQ29udGVudCBhcnRpY2xlJykucmVtb3ZlKCk7XG4gICAgICAgICAgICBhbGxjb250ZW50RGl2LmZpbmQoJy5jb250ZW50T3BlbicpLnJlbW92ZUNsYXNzKCdjb250ZW50T3BlbicpLmFkZENsYXNzKCdjb250ZW50Jyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVXJsKGxpbmtUb0JhY2spO1xuICAgICAgICAgICAgJCgndGl0bGUnKS5lbXB0eSgpLnRleHQodGl0bGVUb0JhY2spO1xuICAgICAgICB9KTtcbiAgICB9XG59IiwiLypcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiB8IENvcHlyaWdodCAoYykgMjAxNC0yMDE1IEF0b21vLmNvbS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiB8IEAgQXV0aG9yXHQ6IERhbmllbCBSaW9zLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKi9cblxuZXhwb3J0IGNsYXNzIENvbW1lbnRzIGV4dGVuZHMgQWpheCB7XG4gICAgbWFrZUNvbW1lbnQoKTp2b2lkIHtcbiAgICAgICAgdmFyIGNvbW1lbnQgPSAkKFwiI2NvbW1lbnRJbnB1dFwiKS52YWwoKTtcbiAgICAgICAgdmFyIGNoZWNrQ29tbWVudCA9IChjb21tZW50IGFzIGFueSkudHJpbSgpO1xuICAgICAgICBcbiAgICAgICAgaWYoY2hlY2tDb21tZW50ID09ICcnKSB7XG4gICAgICAgICAgICBhbGVydCgnVHlwZSBhIGNvbW1lbnQnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgICAgICAgIHJlcXVlc3Qub3BlbignUE9TVCcsIHRoaXMuYWpheEZpbGUgKyAnP2FqYXhBY3Rpb249bWFrZUNvbW1lbnQmYWpheElkPScgKyAkdGhpcy5hdHRyKCdkYXRhLWlkJykpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LXR5cGVcIiwgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIik7XG5cbiAgICAgICAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwiQ29tbWVudCBub3QgbWFkZVwiKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJCgnI2NvbW1lbnRzRGl2ICNjb21tZW50Rm9ybURpdicpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICQoJyNjb21tZW50c0RpdicpLnByZXBlbmQoJzxkaXYgaWQ9XCJ1c2VyQ29tbWVudFwiPjxpbWcgc3JjPVwiJyArIGJhc2VVcmwgKyAnaW1hZ2VzL3VzZXIvJyArICR0aGlzLmF0dHIoJ2RhdGEtdXNlcmlkJykgKyAnL3Byb2ZpbGUuanBnXCIvPjxkaXYgaWQ9XCJyaWdodERpdlwiPjxkaXYgaWQ9XCJjb21tZW50U3BhbkRpdlwiPjxzcGFuIGlkPVwiY29tbWVudFNwYW5cIj4nICsgY29tbWVudCArICc8L3NwYW4+PC9kaXY+PGRpdiBpZD1cImNvbW1lbnRPcHRpb25zRGl2XCI+PGRpdiBpZD1cImJ1dHRvbkVkaXRcIiBjbGFzcz1cImJ1dHRvblwiIGRhdGEtaWQ9XCInICsgJHRoaXMuYXR0cignZGF0YS1pZCcpICsgJ1wiPjwvZGl2PjxkaXYgaWQ9XCJidXR0b25EZWxldGVcIiBjbGFzcz1cImJ1dHRvblwiIGRhdGEtdXNlcmlkPVwiJyArICR0aGlzLmF0dHIoJ2RhdGEtdXNlcmlkJykgKyAnXCIgZGF0YS1pZD1cIicgKyAkdGhpcy5hdHRyKCdkYXRhLWlkJykgKyAnXCI+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgJCgnI3VzZXJDb21tZW50Jykub24oJ2NsaWNrJywgJyNidXR0b25EZWxldGUnLCB0aGlzLmRlbGV0ZUNvbW1lbnQoKSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXF1ZXN0LnNlbmQoXCJjb21tZW50PVwiICsgY29tbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlZGl0Q29tbWVudCgpOnZvaWQge1xuICAgICAgICBhbGVydCgnQ29tbWluZyBzb29uJyk7XG4gICAgfVxuXG4gICAgZGVsZXRlQ29tbWVudCgpOnZvaWQge1xuICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXG4gICAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgICAgcmVxdWVzdC5vcGVuKCdQT1NUJywgdGhpcy5hamF4RmlsZSArICc/YWpheEFjdGlvbj1kZWxldGVDb21tZW50JmFqYXhJZD0nICsgJHRoaXMuYXR0cignZGF0YS1pZCcpKTtcblxuICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGFsZXJ0KFwiQ29tbWVudCBub3QgZGVsZXRlZFwiKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCgnI2NvbW1lbnRzRGl2ICN1c2VyQ29tbWVudCcpLnJlbW92ZSgpO1xuICAgICAgICAgICAgJCgnI2NvbW1lbnRzRGl2JykucHJlcGVuZCgnPGRpdiBpZD1cImNvbW1lbnRGb3JtRGl2XCI+PHRleHRhcmVhIGNvbHM9XCIxMFwiIHJvd3M9XCIzXCIgbWF4LWNvbHM9XCIxMFwiIGlkPVwiY29tbWVudElucHV0XCIgcGxhY2Vob2xkZXI9XCJMZWF2ZSB5b3VyIGNvbW1lbnRcIj48L3RleHRhcmVhPjxkaXYgaWQ9XCJidXR0b25zRGl2XCI+PGJ1dHRvbiBpZD1cImNvbW1lbnRTdWJtaXRcIiBkYXRhLXVzZXJpZD1cIicgKyAkdGhpcy5hdHRyKCdkYXRhLXVzZXJpZCcpICsgJ1wiIGRhdGEtaWQ9XCInICsgJHRoaXMuYXR0cignZGF0YS1pZCcpICsgJ1wiIGRpc2FibGVkPVwiZGlzYWJsZWRcIj5Db21lbnRhcjwvYnV0dG9uPjwvZGl2PjwvZGl2PicpO1xuICAgICAgICAgICAgJCgnI2NvbW1lbnRGb3JtRGl2Jykub24oJ2NsaWNrJywgJyNjb21tZW50U3VibWl0JywgdGhpcy5tYWtlQ29tbWVudCgpKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5kaXNhYmxlRW5hYmxlKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVxdWVzdC5zZW5kKCk7XG4gICAgfVxufSIsIi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmV4cG9ydCBjbGFzcyBGb2xsb3cgZXh0ZW5kcyBBamF4IHtcbiAgICBmb2xsb3dVc2VyKCk6dm9pZCB7XG4gICAgICAgIHZhciBidXR0b24gPSAkKHRoaXMpO1xuXG4gICAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgICAgcmVxdWVzdC5vcGVuKCdQT1NUJywgdGhpcy5hamF4RmlsZSArICc/YWpheEFjdGlvbj1mb2xsb3cmYWpheElkPScgKyAkKGJ1dHRvbikuYXR0cignZGF0YS1pZCcpKTtcblxuICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGFsZXJ0KCdFcnJvcicpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZVRleHQpO1xuXG4gICAgICAgICAgICAkKGJ1dHRvbikuYXR0cihcImlkXCIsIGRhdGEuY2hhbmdlKTtcbiAgICAgICAgICAgICQoYnV0dG9uKS5maW5kKFwiLmJ1dHRvblNwYW5cIikuaHRtbChkYXRhLndyaXRlKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXF1ZXN0LnNlbmQoKTtcbiAgICB9XG5cbiAgICB1bmZvbGxvd1VzZXIoKTp2b2lkIHtcbiAgICAgICAgdmFyIGJ1dHRvbiA9ICQodGhpcyk7XG5cbiAgICAgICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgICByZXF1ZXN0Lm9wZW4oJ1BPU1QnLCB0aGlzLmFqYXhGaWxlICsgJz9hamF4QWN0aW9uPXVuZm9sbG93JmFqYXhJZD0nICsgJChidXR0b24pLmF0dHIoJ2RhdGEtaWQnKSk7XG5cbiAgICAgICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhbGVydCgnRXJyb3InKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2VUZXh0KTtcblxuICAgICAgICAgICAgJChidXR0b24pLmF0dHIoXCJpZFwiLCBkYXRhLmNoYW5nZSk7XG4gICAgICAgICAgICAkKGJ1dHRvbikuZmluZChcIi5idXR0b25TcGFuXCIpLmh0bWwoZGF0YS53cml0ZSk7IFxuICAgICAgICB9O1xuXG4gICAgICAgIHJlcXVlc3Quc2VuZCgpO1xuICAgIH1cblxuICAgIGFqYXhMaW5rKGV2ZW50LCB1cmwpOnZvaWQge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZih1cmwgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgbGlua1RvID0gdXJsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIGxpbmtUbzphbnkgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcbiAgICAgICAgfVxuICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ3Njcm9sbCcpO1xuXG4gICAgICAgIHRoaXMuZ2V0UGFnZShsaW5rVG8sIFwiYm9keT10cnVlXCIsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAvLyQoJy5hamF4UmVwbGFjZScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG4gICAgICAgICAgICAkKCcuYWpheFJlcGxhY2UnKS5odG1sKGRhdGEpO1xuXG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgICAgICAgICB9LDUwMCk7XG5cbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVXJsKGxpbmtUbyk7XG5cbiAgICAgICAgICAgICQoJyNtZW51QnRJbnB1dCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG5cbiAgICAgICAgICAgIGlmKGxpbmtUbyA9PSBiYXNlVXJsKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufSIsIi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmV4cG9ydCBjbGFzcyBXYXRjaGxpc3Qge1xuICAgIGFkZFdhdGNoTGlzdCgpOnZvaWQge1xuICAgICAgICB2YXIgZGF0YUlkID0gJCh0aGlzKS5hdHRyKCdkYXRhLWlkJyk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmFqYXgoXG4gICAgICAgICAgICAnUE9TVCcsXG4gICAgICAgICAgICAnYWRkV2F0Y2hMaXN0JyxcbiAgICAgICAgICAgIGRhdGFJZCxcbiAgICAgICAgICAgICcnLFxuICAgICAgICAgICAgJycsXG4gICAgICAgICAgICAkKCcuYWRkV2F0Y2hMaXN0JykucmVtb3ZlQ2xhc3MoJ2FkZFdhdGNoTGlzdCcpLmFkZENsYXNzKCdyZW1vdmVXYXRjaExpc3QnKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbW92ZVdhdGNoTGlzdCgpOnZvaWQge1xuICAgICAgICB2YXIgZGF0YUlkID0gJCh0aGlzKS5hdHRyKCdkYXRhLWlkJyk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmFqYXgoXG4gICAgICAgICAgICAnUE9TVCcsXG4gICAgICAgICAgICAncmVtb3ZlV2F0Y2hMaXN0JyxcbiAgICAgICAgICAgIGRhdGFJZCxcbiAgICAgICAgICAgICcnLFxuICAgICAgICAgICAgJycsXG4gICAgICAgICAgICAkKCcucmVtb3ZlV2F0Y2hMaXN0JykucmVtb3ZlQ2xhc3MoJ3JlbW92ZVdhdGNoTGlzdCcpLmFkZENsYXNzKCdhZGRXYXRjaExpc3QnKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGFkZFdhdGNoTGlzdEluZGV4KCk6dm9pZCB7XG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgIHZhciBkYXRhSWQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtaWQnKTtcblxuICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB2YXIgdXJsID0gdGhpcy5hamF4RmlsZSArICc/YWpheEFjdGlvbj1hZGRXYXRjaExpc3QmYWpheElkPScgKyBkYXRhSWQ7XG4gICAgICAgIFxuICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGFsZXJ0KCdFcnJvcicpO1xuICAgICAgICB9O1xuICAgICAgICByZXF1ZXN0Lm9wZW4oJ1BPU1QnLCB1cmwpO1xuICAgICAgICBcbiAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlVGV4dCk7XG5cbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA+PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgPCA0MDApIHtcbiAgICAgICAgICAgICAgICBpZigkKCcjd2F0Y2hMaXN0RGl2JykubGVuZ3RoID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5tYWluU2VjdGlvbicpLnByZXBlbmQoJzxhcnRpY2xlIGlkPVwid2F0Y2hMaXN0RGl2XCIgY2xhc3M9XCJjb250ZW50Q29udGFpbmVyXCI+PHAgY2xhc3M9XCJjb250ZW50RGl2SGVhZGVyXCI+JyArIGRhdGEudGl0bGUgKyAnPC9wPjxkaXYgY2xhc3M9XCJjb250ZW50RGl2XCI+PGRpdiBjbGFzcz1cImNvbnRlbnRHcm91cFNjcm9sbFwiPjwvZGl2PjwvZGl2PjwvYXJ0aWNsZT4nKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZigkdGhpcy5hdHRyKCdkYXRhLXR5cGUnKSA9PSAnbW92aWUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsaW5rVHlwZSA9ICdtb3ZpZXMnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKCR0aGlzLmF0dHIoJ2RhdGEtdHlwZScpID09ICdzZXJpZScpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpbmtUeXBlID0gJ3Nlcmllcyc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgJHRoaXMucmVtb3ZlQ2xhc3MoJ2FkZFdhdGNoTGlzdCcpLmFkZENsYXNzKCdyZW1vdmVXYXRjaExpc3QnKTtcblxuICAgICAgICAgICAgICAgICQoJyN3YXRjaExpc3REaXYgLmNvbnRlbnRHcm91cFNjcm9sbCcpLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJjb250ZW50XCIgZGF0YS1pZD1cIicgKyAkdGhpcy5hdHRyKCdkYXRhLWlkJykgICsgJ1wiPjxhIGNsYXNzPVwiY29udGVudExpbmtcIiBocmVmPVwiJyArIGJhc2VVcmwgKyAndGl0bGU/aWQ9JyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSArICdcIj48ZmlndXJlIGNsYXNzPVwiY29udGVudEZpZ3VyZVwiPjxpbWcgc3JjPVwiL2pva2VyL2ltYWdlcy9tZWRpYS8nICsgbGlua1R5cGUgKyAnLycgKyAkdGhpcy5hdHRyKCdkYXRhLWlkJykgKyAnL2ltYWdlLmpwZ1wiLz48ZmlnY2FwdGlvbj48L2ZpZ2NhcHRpb24+PC9maWd1cmU+PC9hPjxkaXYgY2xhc3M9XCJyZW1vdmVXYXRjaExpc3RcIiBkYXRhLXR5cGU9XCInICsgbGlua1R5cGUgKyAnXCIgZGF0YS1pZD1cIicgKyAkdGhpcy5hdHRyKCdkYXRhLWlkJykgKyAnXCI+PC9kaXY+PC9kaXY+Jyk7XG5cbiAgICAgICAgICAgICAgICAkKCcuY29udGVudERpdiBkaXYgLmFkZFdhdGNoTGlzdFtkYXRhLWlkPVwiJyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSArICdcIl0nKS5yZW1vdmVDbGFzcygnYWRkV2F0Y2hMaXN0JykuYWRkQ2xhc3MoJ3JlbW92ZVdhdGNoTGlzdCcpO1xuICAgICAgICAgICAgICAgICQoJyNpbWFnZURpdiBkaXYgc3BhbltkYXRhLWlkPVwiJyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSArICdcIl0nKS5yZW1vdmVDbGFzcygnYWRkV2F0Y2hMaXN0JykuYWRkQ2xhc3MoJ3JlbW92ZVdhdGNoTGlzdCcpO1xuXG4gICAgICAgICAgICAgICAgJCgnI2NvbnRlbnRTb3J0Y3V0cycpLmZpbmQoJy5hZGRXYXRjaExpc3QnKS5yZW1vdmVDbGFzcygnYWRkV2F0Y2hMaXN0JykuYWRkQ2xhc3MoJ3JlbW92ZVdhdGNoTGlzdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ0Vycm9yJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3Quc2VuZCgpO1xuICAgIH1cblxuICAgIHJlbW92ZVdhdGNoTGlzdEluZGV4KCk6dm9pZCB7XG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgIHZhciBkYXRhSWQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtaWQnKTtcblxuICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB2YXIgdXJsID0gdGhpcy5hamF4RmlsZSArICc/YWpheEFjdGlvbj1yZW1vdmVXYXRjaExpc3QmYWpheElkPScgKyBkYXRhSWQ7XG4gICAgICAgIFxuICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGFsZXJ0KCdFcnJvcicpO1xuICAgICAgICB9O1xuICAgICAgICByZXF1ZXN0Lm9wZW4oJ1BPU1QnLCB1cmwpO1xuICAgICAgICBcbiAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA+PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgPCA0MDApIHtcbiAgICAgICAgICAgICAgICAkKCcjd2F0Y2hMaXN0RGl2IGRpdltkYXRhLWlkPVwiJyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSArICdcIl0nKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAkKCcuY29udGVudERpdiBkaXYgLnJlbW92ZVdhdGNoTGlzdFtkYXRhLWlkPVwiJyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSArICdcIl0nKS5yZW1vdmVDbGFzcygncmVtb3ZlV2F0Y2hMaXN0JykuYWRkQ2xhc3MoJ2FkZFdhdGNoTGlzdCcpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICQoJyNpbWFnZURpdiBzcGFuW2RhdGEtaWQ9XCInICsgJHRoaXMuYXR0cignZGF0YS1pZCcpICsgJ1wiXScpLnJlbW92ZUNsYXNzKCdyZW1vdmVXYXRjaExpc3QnKS5hZGRDbGFzcygnYWRkV2F0Y2hMaXN0Jyk7XG5cbiAgICAgICAgICAgICAgICAkKCcjY29udGVudFNvcnRjdXRzJykuZmluZCgnLnJlbW92ZVdhdGNoTGlzdCcpLnJlbW92ZUNsYXNzKCdyZW1vdmVXYXRjaExpc3QnKS5hZGRDbGFzcygnYWRkV2F0Y2hMaXN0Jyk7XG5cbiAgICAgICAgICAgICAgICBpZigkLnRyaW0oJCgnI3dhdGNoTGlzdERpdiAuY29udGVudEdyb3VwU2Nyb2xsJykuaHRtbCgpKSA9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAkKCcjd2F0Y2hMaXN0RGl2JykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ0Vycm9yJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3Quc2VuZCgpO1xuICAgIH1cbn0iLCIvKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG5leHBvcnQgY2xhc3MgTG9naW4ge1xuICAgIGlucHV0RXJyb3IocGFyZW50RGl2OnN0cmluZyk6dm9pZCB7XG5cdFx0JChwYXJlbnREaXYpLm9uKCdmb2N1c291dCcsICcuaW5wdXRUZXh0JywgZnVuY3Rpb24oKSB7XG5cdFx0XHRpZigoJCh0aGlzKSBhcyBhbnkpLnZhbCgpLmxlbmd0aCA8IDEpIHtcblx0XHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygnaW5wdXRUZXh0JykuYWRkQ2xhc3MoJ2lucHV0VGV4dEVycm9yJyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0XG5cdFx0JChwYXJlbnREaXYpLm9uKCdmb2N1c291dCcsICcuaW5wdXRUZXh0RXJyb3InLCBmdW5jdGlvbigpIHtcblx0XHRcdGlmKCgkKHRoaXMpIGFzIGFueSkudmFsKCkubGVuZ3RoID49IDEpIHtcblx0XHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygnaW5wdXRUZXh0RXJyb3InKS5hZGRDbGFzcygnaW5wdXRUZXh0Jyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRzZWN1cmVMb2dvZmYodXJsKTp2b2lkIHtcblx0XHRpZighZG9jdW1lbnQuY29va2llLm1hdGNoKCdsb2dpbicpKSB7XG5cdFx0XHRsb2NhdGlvbi5yZXBsYWNlKHVybCArICdsb2dvZmYnKTtcblx0XHR9XG5cdH1cbn0iLCIvKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG5leHBvcnQgY2xhc3MgUGFyYWxsYXgge1xuICAgIC8vRWZmZWN0IG9mIGV4dGVybmFsIGluZGV4XG5cblx0cGFyYWxsYXhIb21lKCk6dm9pZCB7XG5cdFx0dmFyIHBhcmFsbGF4SW46c3RyaW5nID0gJyNkZXNjSW1hZ2UgPiBpbWcnO1xuXHRcdHZhciBwYXJhbGxheE91dDpzdHJpbmcgPSAnI2NvbnRlbnRTbGlkZXIgPiBhcnRpY2xlID4gZGl2ID4gaW1nJztcblxuXHRcdGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpIDwgNDUwKSB7XG5cdFx0XHQvLyQocGFyYWxsYXhJbikuY3NzKFwidG9wXCIgLCAod2luZG93LnBhZ2VZT2Zmc2V0IC8gMikgKyAncHgnKTtcblx0XHRcdCQocGFyYWxsYXhPdXQpLmNzcyhcInRvcFwiICwgKHdpbmRvdy5wYWdlWU9mZnNldCAvIDIpICsgJ3B4Jyk7XG5cdFx0fVxuXHR9XG5cblx0cGFyYWxsYXhIZWFkZXJVc2VyKCk6dm9pZCB7XG5cdFx0Ly9FZmZlY3Qgb2YgaGVhZGVyIG9mIHByb2ZpbGUgcGFnZVxuXG5cdFx0dmFyIGltZ0RpdiA9ICQoJyN1c2VySGVhZGVySW1nJyk7XG5cblx0XHRpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA8IDIxMCkge1xuXHRcdFx0JChpbWdEaXYpLmNzcyhcInRvcFwiICwgKHdpbmRvdy5wYWdlWU9mZnNldCAvIDIuNikgKyAncHgnKTtcblx0XHR9XG5cblx0XHQvL0NoYW5nZSBjbGFzcyBvZiBoZWFkZXIgb2YgcHJvZmlsZSBwYWdlXG5cblx0XHR2YXIgdXNlckhlYWRlciA9ICQoJyN1c2VySGVhZGVyJyk7XG5cdFx0dmFyIHVzZXJIZWFkZXJJbWcgPSAkKCcjdXNlckhlYWRlckltZycpO1xuXG5cdFx0aWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPj0gMjEwKSB7XG5cdFx0XHR1c2VySGVhZGVyLnJlbW92ZUNsYXNzKCd1c2VySGVhZGVyJyk7XG5cdFx0XHR1c2VySGVhZGVyLmFkZENsYXNzKCd1c2VySGVhZGVyRml4ZWQnKTtcblx0XHRcdHVzZXJIZWFkZXJJbWcucmVtb3ZlQ2xhc3MoJ3VzZXJIZWFkZXJJbWcnKTtcblx0XHRcdHVzZXJIZWFkZXJJbWcuYWRkQ2xhc3MoJ3VzZXJIZWFkZXJJbWdGaXhlZCcpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHVzZXJIZWFkZXIucmVtb3ZlQ2xhc3MoJ3VzZXJIZWFkZXJGaXhlZCcpO1xuXHRcdFx0dXNlckhlYWRlci5hZGRDbGFzcygndXNlckhlYWRlcicpO1xuXHRcdFx0dXNlckhlYWRlckltZy5yZW1vdmVDbGFzcygndXNlckhlYWRlckltZ0ZpeGVkJyk7XG5cdFx0XHR1c2VySGVhZGVySW1nLmFkZENsYXNzKCd1c2VySGVhZGVySW1nJyk7XG5cdFx0fVxuXHR9XG5cblx0cGFyYWxsYXhJbWcoKTp2b2lkIHtcblx0XHQvL0VmZmVjdCBvZiB1c2VyIGltYWdlIG9mIHByb2ZpbGUgcGFnZVxuXG5cdFx0dmFyIGltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VySW1nRmlndXJlJyk7XG5cblx0XHRpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA8IDIxMCkge1xuXHRcdFx0aW1nLnN0eWxlLndpZHRoID0gKDE1MCAtICQodGhpcykuc2Nyb2xsVG9wKCkgLyAyLjEpICsgJ3B4Jztcblx0XHRcdGltZy5zdHlsZS5oZWlnaHQgPSAoMTUwIC0gJCh0aGlzKS5zY3JvbGxUb3AoKSAvIDIuMSkgKyAncHgnO1xuXHRcdFx0aW1nLnN0eWxlLmxlZnQgPSAoMCArICQodGhpcykuc2Nyb2xsVG9wKCkgLyA0LjIpICsgJ3B4Jztcblx0XHRcdGltZy5zdHlsZS50b3AgPSAoLTEyMCArICQodGhpcykuc2Nyb2xsVG9wKCkgLyA1LjIpICsgJ3B4Jztcblx0XHR9XG5cblx0XHQvL0NoYW5nZSBjbGFzcyBvZiB1c2VyIGltYWdlIG9mIHByb2ZpbGUgcGFnZVxuXG5cdFx0dmFyIHVzZXJJbWcgPSAkKCcjdXNlckltZ0ZpZ3VyZScpO1xuXG5cdFx0aWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPj0gMjEwKSB7XG5cdFx0XHR1c2VySW1nLnJlbW92ZUNsYXNzKCd1c2VySW1nRmlndXJlJyk7XG5cdFx0XHR1c2VySW1nLmFkZENsYXNzKCd1c2VySW1nRmlndXJlRml4ZWQnKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR1c2VySW1nLnJlbW92ZUNsYXNzKCd1c2VySW1nRmlndXJlRml4ZWQnKTtcblx0XHRcdHVzZXJJbWcuYWRkQ2xhc3MoJ3VzZXJJbWdGaWd1cmUnKTtcblx0XHR9XG5cdH1cblxuXHRwYXJhbGxheE5hbWUoKTp2b2lkIHtcblx0XHQvL0VmZmVjdCBvZiB1c2VyIG5hbWUgb2YgcHJvZmlsZSBwYWdlXG5cblx0XHR2YXIgbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyTmFtZURpdicpO1xuXG5cdFx0aWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPCAyMTApIHtcblx0XHRcdG5hbWUuc3R5bGUubGVmdCA9ICgyMjAgLSAkKHRoaXMpLnNjcm9sbFRvcCgpIC8gMy43NSkgKyAncHgnO1xuXHRcdH1cblxuXHRcdC8vQ2hhbmdlIGNsYXNzIG9mIHVzZXIgbmFtZSBkaXZcblxuXHRcdHZhciB1c2VyTmFtZSA9ICQoJyN1c2VyTmFtZURpdicpO1xuXG5cdFx0aWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPj0gMjEwKSB7XG5cdFx0XHR1c2VyTmFtZS5yZW1vdmVDbGFzcygndXNlck5hbWVEaXYnKTtcblx0XHRcdHVzZXJOYW1lLmFkZENsYXNzKCd1c2VyTmFtZURpdkZpeGVkJyk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dXNlck5hbWUucmVtb3ZlQ2xhc3MoJ3VzZXJOYW1lRGl2Rml4ZWQnKTtcblx0XHRcdHVzZXJOYW1lLmFkZENsYXNzKCd1c2VyTmFtZURpdicpO1xuXHRcdH1cblx0fVxuXG5cdHBvc3RlclBhcmFsYXgoaW1hZ2UpOnZvaWQge1xuXHRcdHZhciAkcG9zdGVyID0gJChpbWFnZSk7XG5cdFx0dmFyICRzaGluZSA9ICRwb3N0ZXIuZmluZCgnLnNoaW5lJyk7XG5cdFx0dmFyICRsYXllciA9ICRwb3N0ZXIuZmluZCgnKltjbGFzcyo9XCJsYXllci1cIl0nKTtcblx0XHR2YXIgdyA9ICRwb3N0ZXIud2lkdGgoKTtcblx0XHR2YXIgaCA9ICRwb3N0ZXIuaGVpZ2h0KCk7XG5cblx0XHQkcG9zdGVyLm9uKCdtb3VzZW1vdmUnLCBmdW5jdGlvbihlKSB7XG5cdFx0XHQkKCcubWFpblNlY3Rpb24nKS5jc3Moe1xuXHRcdFx0XHQndHJhbnNmb3JtLXN0eWxlJzogJ3ByZXNlcnZlLTNkJyxcblx0XHRcdFx0J3RyYW5zZm9ybSc6ICdwZXJzcGVjdGl2ZSgxMDAwcHgpJ1xuXHRcdFx0fSksXG5cdFx0XHQkKCcjaW1hZ2VCYWNrJykuY3NzKHtcblx0XHRcdFx0J3RvcCc6ICcwJ1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vdmFyIG9mZnNldFggPSAwLjUgLSBlLnBhZ2VYIC8gdzsgLy8gY3Vyc29yIGhvclxuXHRcdFx0Ly92YXIgb2Zmc2V0WSA9IDAuNSAtIGUucGFnZVkgLyBoOyAvLyBjdXJzb3IgdmVydFxuXHRcdFx0dmFyIG9mZnNldFggPSAwLjUgLSBlLnBhZ2VYIC8gdzsgLy8gY3Vyc29yIGhvclxuXHRcdFx0dmFyIG9mZnNldFkgPSAwLjUgLSBlLnBhZ2VZIC8gaDsgLy8gY3Vyc29yIHZlcnRcblx0XHRcdHZhciBkeCA9IGUucGFnZVggLSB3IC8gMjsgLy8gcG9zdGVyIGNlbnRlciBob3Jcblx0XHRcdHZhciBkeSA9IGUucGFnZVkgLSBoIC8gMjsgLy8gcG9zdGVyIGNlbnRlciB2ZXJ0XG5cdFx0XHR2YXIgdGhldGEgPSBNYXRoLmF0YW4yKGR5LCBkeCk7IC8vIGFuZ2xlIGIvdyBjdXJzb3IgYW5kIHBvc3RlciBjZW50ZXIgaW4gUkFEXG5cdFx0XHR2YXIgYW5nbGUgPSB0aGV0YSAqIDE4MCAvIE1hdGguUEkgLSA5MDsgLy8gY29udmVydCByYWQgdG8gZGVncmVlc1xuXHRcdFx0dmFyIG9mZnNldFBvc3RlciA9ICRwb3N0ZXIuZGF0YSgnb2Zmc2V0Jyk7XG5cdFx0XHR2YXIgdHJhbnNmb3JtUG9zdGVyID0gJ3RyYW5zbGF0ZVkoJyArIC1vZmZzZXRYICogb2Zmc2V0UG9zdGVyICsgJ3B4KSByb3RhdGVYKCcgKyAoLW9mZnNldFkgKiBvZmZzZXRQb3N0ZXIpICsgJ2RlZykgcm90YXRlWSgnICsgKG9mZnNldFggKiAob2Zmc2V0UG9zdGVyICogMikpICsgJ2RlZyknO1xuXHRcdFx0JHBvc3Rlci5jc3MoJ3RyYW5zZm9ybScsIHRyYW5zZm9ybVBvc3Rlcik7XG5cblx0XHRcdGlmIChhbmdsZSA8IDApIHtcblx0XHRcdFx0YW5nbGUgPSBhbmdsZSArIDM2MDtcblx0XHRcdH1cblxuXHRcdFx0JHNoaW5lLmNzcygnYmFja2dyb3VuZCcsICdsaW5lYXItZ3JhZGllbnQoJyArIGFuZ2xlICsgJ2RlZywgcmdiYSgwLCAwLCAwLCcgKyBlLnBhZ2VZIC8gaCArICcpIDAlLHJnYmEoMCwgMCwgMCwgMCkgODAlKScpO1xuXHRcdFx0XG5cdFx0XHQkbGF5ZXIuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKTtcblx0XHRcdFx0dmFyIG9mZnNldExheWVyID0gJHRoaXMuZGF0YSgnb2Zmc2V0JykgfHwgMDtcblx0XHRcdFx0dmFyIHRyYW5zZm9ybUxheWVyID0gJ3RyYW5zbGF0ZVgoJyArIG9mZnNldFggKiBvZmZzZXRMYXllciArICdweCkgdHJhbnNsYXRlWSgnICsgb2Zmc2V0WSAqIG9mZnNldExheWVyICsgJ3B4KSc7XG5cdFx0XHRcdFxuXHRcdFx0XHQkdGhpcy5jc3MoJ3RyYW5zZm9ybScsIHRyYW5zZm9ybUxheWVyKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG59IiwiLypcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiB8IENvcHlyaWdodCAoYykgMjAxNC0yMDE1IEF0b21vLmNvbS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiB8IEAgQXV0aG9yXHQ6IERhbmllbCBSaW9zLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKi9cblxuZXhwb3J0IGNsYXNzIFNsaWRlIHtcbiAgICBzbGlkZUluZGV4KCk6dm9pZCB7XG5cdFx0aWYoJCh0aGlzKS5zY3JvbGxUb3AoKSA8IDIwMCkge1xuXHRcdFx0aWYoKCQoJy5pbWFnZVNob3cnKSBhcyBhbnkpLm5leHQoKS5zaXplKCkpIHtcblx0XHRcdFx0JCgnLmltYWdlU2hvdycpLnJlbW92ZUNsYXNzKCdpbWFnZVNob3cnKS5hZGRDbGFzcygnaW1hZ2VIaWRlJykubmV4dCgpLnJlbW92ZUNsYXNzKCdpbWFnZUhpZGUnKS5hZGRDbGFzcygnaW1hZ2VTaG93Jyk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0KCQoJy5pbWFnZVNob3cnKSBhcyBhbnkpLnJlbW92ZUNsYXNzKCdpbWFnZVNob3cnKS5hZGRDbGFzcygnaW1hZ2VIaWRlJyk7XG5cdFx0XHRcdCQoJyNjb250ZW50U2xpZGVyICNpbWFnZURpdiBkaXY6bnRoLW9mLXR5cGUoMSknKS5yZW1vdmVDbGFzcygnaW1hZ2VIaWRlJykuYWRkQ2xhc3MoJ2ltYWdlU2hvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZigoJCgnLmNoYW5nZVNob3cnKSBhcyBhbnkpLm5leHQoKS5zaXplKCkpIHtcblx0XHRcdFx0JCgnLmNoYW5nZVNob3cnKS5yZW1vdmVDbGFzcygnY2hhbmdlU2hvdycpLmFkZENsYXNzKCdjaGFuZ2VIaWRlJykubmV4dCgpLnJlbW92ZUNsYXNzKCdjaGFuZ2VIaWRlJykuYWRkQ2xhc3MoJ2NoYW5nZVNob3cnKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHQkKCcuY2hhbmdlU2hvdycpLnJlbW92ZUNsYXNzKCdjaGFuZ2VTaG93JykuYWRkQ2xhc3MoJ2NoYW5nZUhpZGUnKTtcblx0XHRcdFx0JCgnI2NvbnRlbnRTbGlkZXIgI2NoYW5nZURpdiBkaXY6bnRoLW9mLXR5cGUoMSknKS5yZW1vdmVDbGFzcygnY2hhbmdlSGlkZScpLmFkZENsYXNzKCdjaGFuZ2VTaG93Jyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Y2hhbmdlSW5kZXgoc2xpZGVyKTp2b2lkIHtcblx0XHQvL0luZGV4IGJ1dHRvbnNcblxuXHRcdCQoc2xpZGVyKS5vbignY2xpY2snLCAnLmNoYW5nZUhpZGUnLCBmdW5jdGlvbigpIHtcblx0XHRcdGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XG5cblx0XHRcdCQoJy5jaGFuZ2VTaG93JykucmVtb3ZlQ2xhc3MoJ2NoYW5nZVNob3cnKS5hZGRDbGFzcygnY2hhbmdlSGlkZScpO1xuXHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygnY2hhbmdlSGlkZScpLmFkZENsYXNzKCdjaGFuZ2VTaG93Jyk7XG5cblx0XHRcdHZhciBpbmRpY2UgPSAkKHRoaXMpLmluZGV4KCk7XG5cdFx0XHRpbmRpY2UgKys7XG5cblx0XHRcdCQoJyNpbWFnZURpdiAuaW1hZ2VTaG93JykucmVtb3ZlQ2xhc3MoJ2ltYWdlU2hvdycpLmFkZENsYXNzKCdpbWFnZUhpZGUnKTtcblx0XHRcdCQoJyNpbWFnZURpdiBkaXY6bnRoLW9mLXR5cGUoJyArIGluZGljZSArICcpJykucmVtb3ZlQ2xhc3MoJ2ltYWdlSGlkZScpLmFkZENsYXNzKCdpbWFnZVNob3cnKTtcblx0XHR9KTtcblxuXHRcdC8vUHJldmlvdXMgYnV0dG9uXG5cblx0XHQkKHNsaWRlcikub24oJ2NsaWNrJywgJyNwcmV2aW91c0ltYWdlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRjbGVhckludGVydmFsKGludGVydmFsSWQpO1xuXG5cdFx0XHRpZigoJCgnLmltYWdlU2hvdycpIGFzIGFueSkucHJldigpLnNpemUoKSkge1xuXHRcdFx0XHQkKCcuaW1hZ2VTaG93JykucmVtb3ZlQ2xhc3MoJ2ltYWdlU2hvdycpLmFkZENsYXNzKCdpbWFnZUhpZGUnKS5wcmV2KCkucmVtb3ZlQ2xhc3MoJ2ltYWdlSGlkZScpLmFkZENsYXNzKCdpbWFnZVNob3cnKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHQkKCcuaW1hZ2VTaG93JykucmVtb3ZlQ2xhc3MoJ2ltYWdlU2hvdycpLmFkZENsYXNzKCdpbWFnZUhpZGUnKTtcblx0XHRcdFx0JCgnI2NvbnRlbnRTbGlkZXIgI2ltYWdlRGl2IGRpdjpsYXN0LWNoaWxkJykucmVtb3ZlQ2xhc3MoJ2ltYWdlSGlkZScpLmFkZENsYXNzKCdpbWFnZVNob3cnKTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGluZGljZSA9ICQodGhpcykucGFyZW50KCkuZmluZCgnI2ltYWdlRGl2IC5pbWFnZVNob3cnKS5pbmRleCgnI2ltYWdlRGl2IGRpdicpO1xuXHRcdFx0aW5kaWNlICsrO1xuXG5cdFx0XHQkKCcjY2hhbmdlRGl2IGRpdicpLnJlbW92ZUNsYXNzKCdjaGFuZ2VTaG93JykuYWRkQ2xhc3MoJ2NoYW5nZUhpZGUnKTtcblx0XHRcdCQoJyNjaGFuZ2VEaXYgZGl2Om50aC1vZi10eXBlKCcgKyBpbmRpY2UgKyAnKScpLnJlbW92ZUNsYXNzKCdjaGFuZ2VIaWRlJykuYWRkQ2xhc3MoJ2NoYW5nZVNob3cnKTtcblx0XHR9KTtcblxuXHRcdC8vTmV4dCBidXR0b25cblxuXHRcdCQoc2xpZGVyKS5vbignY2xpY2snLCAnI25leHRJbWFnZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0Y2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcblxuXHRcdFx0aWYoKCQoJy5pbWFnZVNob3cnKSBhcyBhbnkpLm5leHQoKS5zaXplKCkpIHtcblx0XHRcdFx0JCgnLmltYWdlU2hvdycpLnJlbW92ZUNsYXNzKCdpbWFnZVNob3cnKS5hZGRDbGFzcygnaW1hZ2VIaWRlJykubmV4dCgpLnJlbW92ZUNsYXNzKCdpbWFnZUhpZGUnKS5hZGRDbGFzcygnaW1hZ2VTaG93Jyk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0JCgnLmltYWdlU2hvdycpLnJlbW92ZUNsYXNzKCdpbWFnZVNob3cnKS5hZGRDbGFzcygnaW1hZ2VIaWRlJyk7XG5cdFx0XHRcdCQoJyNjb250ZW50U2xpZGVyICNpbWFnZURpdiBkaXY6bnRoLW9mLXR5cGUoMSknKS5yZW1vdmVDbGFzcygnaW1hZ2VIaWRlJykuYWRkQ2xhc3MoJ2ltYWdlU2hvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgaW5kaWNlID0gJCh0aGlzKS5wYXJlbnQoKS5maW5kKCcjaW1hZ2VEaXYgLmltYWdlU2hvdycpLmluZGV4KCcjaW1hZ2VEaXYgZGl2Jyk7XG5cdFx0XHRpbmRpY2UgKys7XG5cblx0XHRcdCQoJyNjaGFuZ2VEaXYgZGl2JykucmVtb3ZlQ2xhc3MoJ2NoYW5nZVNob3cnKS5hZGRDbGFzcygnY2hhbmdlSGlkZScpO1xuXHRcdFx0JCgnI2NoYW5nZURpdiBkaXY6bnRoLW9mLXR5cGUoJyArIGluZGljZSArICcpJykucmVtb3ZlQ2xhc3MoJ2NoYW5nZUhpZGUnKS5hZGRDbGFzcygnY2hhbmdlU2hvdycpO1xuXHRcdH0pO1xuXHR9XG59IiwiLypcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiB8IENvcHlyaWdodCAoYykgMjAxNC0yMDE1IEF0b21vLmNvbS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiB8IEAgQXV0aG9yXHQ6IERhbmllbCBSaW9zLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKi9cblxuZXhwb3J0IGNsYXNzIFVzZXJPdGhlcnMge1xuICAgIC8qKlxuXHQgKiBoaWRlIHRoZSByZXBsaWVzXG5cdCAqL1xuICAgIFxuICAgIGhpZGVSZXBseShkaXY6c3RyaW5nKTp2b2lkIHtcblx0XHQkKGRpdikub24oXCJjbGlja1wiLCBcIi5ub0hpZGVcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKFwibm9IaWRlXCIpLmFkZENsYXNzKFwiaGlkZVwiKTtcblx0XHR9KVxuXHRcdC5vbihcImNsaWNrXCIsIFwiLmhpZGVcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKFwiaGlkZVwiKS5hZGRDbGFzcyhcIm5vSGlkZVwiKTtcblx0XHR9KTtcbiAgICB9XG4gICAgLy9DbG9zZSBNZXNzYWdlXG5cblx0Y2xvc2VNZXNzYWdlKGVycm9yRGl2OnN0cmluZywgZXJyb3JCdG46c3RyaW5nKTp2b2lkIHtcblx0XHQkKGVycm9yRGl2KS5vbihcImNsaWNrXCIsIGVycm9yQnRuLCBmdW5jdGlvbigpIHtcblx0XHRcdCQodGhpcykucGFyZW50KCkucmVtb3ZlKCk7XG5cdFx0XHQvL2xvY2F0aW9uLmhyZWYgPSBoaXN0b3J5LmdvKC0xKTtcblx0XHR9KTtcblx0fVxuXG5cdC8vVGFiIFNlbGVjdFxuXG5cdHRhYlNlbGVjdChJc1Njcm9sbDpib29sZWFuKTp2b2lkIHtcblx0XHR2YXIgc2Nyb2xsID0gSXNTY3JvbGwgPyBJc1Njcm9sbCA6IGZhbHNlO1xuXG5cdFx0JChcIiN0YWJIZWFkZXJcIikub24oXCJjbGlja1wiLCBcIi50YWJcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHQkKFwiI3RhYkhlYWRlciAudGFiU2VsZWN0ZWRcIikucmVtb3ZlQ2xhc3MoXCJ0YWJTZWxlY3RlZFwiKS5hZGRDbGFzcyhcInRhYlwiKTtcblx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoXCJ0YWJcIikuYWRkQ2xhc3MoXCJ0YWJTZWxlY3RlZFwiKTtcblx0XHRcdFxuXHRcdFx0dmFyIGluZGljZSA9ICQodGhpcykuaW5kZXgoKTtcblx0XHRcdGluZGljZSArKztcblx0XHRcdFxuXHRcdFx0JChcIiN0YWJDb250ZW50cyAuY29udGVudFNob3dcIikucmVtb3ZlQ2xhc3MoJ2NvbnRlbnRTaG93JykuYWRkQ2xhc3MoJ2NvbnRlbnRIaWRlJyk7XG5cdFx0XHQkKFwiI3RhYkNvbnRlbnRzIC5jb250ZW50SGlkZTpudGgtb2YtdHlwZShcIiArIGluZGljZSArIFwiKVwiKS5yZW1vdmVDbGFzcygnY29udGVudEhpZGUnKS5hZGRDbGFzcygnY29udGVudFNob3cnKTtcblx0XHR9KVxuXHRcdC5vbignY2xpY2snLCAnZGl2JywgZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdGlmKHNjcm9sbCA9PSB0cnVlKSB7XG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdCQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcblx0XHRcdFx0XHRzY3JvbGxUb3A6IDQ1MFxuXHRcdFx0XHR9LDUwMCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHQvL0VwaXNvZGUgU2VsZWN0XG5cblx0ZXBpc29kZVNlbGVjdChlcGlzb2RlU2xpZGVyOnN0cmluZyk6dm9pZCB7XG5cdFx0JChlcGlzb2RlU2xpZGVyKS5vbihcImNsaWNrXCIsIFwiLnNlYXNvblNlbGVjdCAuc2Vhc29uU3BhblwiLCBmdW5jdGlvbigpIHtcblx0XHRcdCQoXCIjc2Vhc29uU2VsZWN0XCIpLnJlbW92ZUNsYXNzKFwic2Vhc29uU2VsZWN0XCIpLmFkZENsYXNzKFwic2Vhc29uU2VsZWN0T3BlblwiKTtcblx0XHRcdCQoXCIuc2Vhc29uSGlkZVwiKS5yZW1vdmVDbGFzcyhcInNlYXNvbkhpZGVcIikuYWRkQ2xhc3MoXCJzZWFzb25TaG93XCIpO1xuXHRcdH0pXG5cdFx0Lm9uKFwiY2xpY2tcIiwgXCIuc2Vhc29uU2VsZWN0T3BlbiAuc2Vhc29uU3BhblwiLCBmdW5jdGlvbigpIHtcblx0XHRcdCQoXCIjc2Vhc29uU2VsZWN0XCIpLnJlbW92ZUNsYXNzKFwic2Vhc29uU2VsZWN0T3BlblwiKS5hZGRDbGFzcyhcInNlYXNvblNlbGVjdFwiKTtcblx0XHRcdCQoXCIuc2Vhc29uU2hvd1wiKS5yZW1vdmVDbGFzcyhcInNlYXNvblNob3dcIikuYWRkQ2xhc3MoXCJzZWFzb25IaWRlXCIpO1xuXHRcdFx0XG5cdFx0XHR2YXIgaW5kaWNlID0gJCh0aGlzKS5wYXJlbnQoKTtcblx0XHRcdGluZGljZS5yZW1vdmVDbGFzcyhcInNlYXNvbkhpZGVcIikuYWRkQ2xhc3MoXCJzZWFzb25TaG93XCIpO1xuXHRcdFx0XG5cdFx0XHR2YXIgaW5kaWNlU2hvdyA9ICQodGhpcykucGFyZW50KCkuaW5kZXgoKTtcblx0XHRcdGluZGljZVNob3cgKys7XG5cdFx0XHRcblx0XHRcdCQoXCIjZXBpc29kZURpdiAuc2Vhc29uR3JvdXBTaG93XCIpLnJlbW92ZUNsYXNzKFwic2Vhc29uR3JvdXBTaG93XCIpLmFkZENsYXNzKFwic2Vhc29uR3JvdXBIaWRlXCIpO1xuXHRcdFx0JChcIiNlcGlzb2RlRGl2IC5jb250ZW50R3JvdXA6bnRoLW9mLXR5cGUoXCIgKyBpbmRpY2VTaG93ICsgXCIpXCIpLnJlbW92ZUNsYXNzKFwic2Vhc29uR3JvdXBIaWRlXCIpLmFkZENsYXNzKFwic2Vhc29uR3JvdXBTaG93XCIpO1xuXHRcdFx0XG5cdFx0XHRpZigkKFwiI2VwaXNvZGVEaXYgLmNvbnRlbnRHcm91cDpudGgtb2YtdHlwZShcIiArIGluZGljZVNob3cgKyBcIilcIikud2lkdGgoKSA+ICQoXCIjZXBpc29kZURpdlwiKS53aWR0aCgpKSB7XG5cdFx0XHRcdCQoXCIjZXBpc29kZURpdlwiKS5maW5kKCcubmV4dEhpZGUnKS5yZW1vdmVDbGFzcygnbmV4dEhpZGUnKS5hZGRDbGFzcygnbmV4dFNob3cnKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHQkKFwiI2VwaXNvZGVEaXZcIikuZmluZCgnLm5leHRTaG93JykucmVtb3ZlQ2xhc3MoJ25leHRTaG93JykuYWRkQ2xhc3MoJ25leHRIaWRlJyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvL0VwaXNvZGUgU2VsZWN0IENsb3NlXG5cblx0XHQkKGVwaXNvZGVTbGlkZXIpLm9uKFwibW91c2VsZWF2ZVwiLCBcIi5zZWFzb25TZWxlY3RPcGVuXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGluZGV4Q2xvc2UgPSAkKFwiI2VwaXNvZGVEaXYgLnNlYXNvbkdyb3VwU2hvd1wiKS5pbmRleCgpO1xuXHRcdFx0aW5kZXhDbG9zZSsrO1xuXG5cdFx0XHQkKFwiI3NlYXNvblNlbGVjdFwiKS5yZW1vdmVDbGFzcyhcInNlYXNvblNlbGVjdE9wZW5cIikuYWRkQ2xhc3MoXCJzZWFzb25TZWxlY3RcIik7XG5cdFx0XHQkKFwiLnNlYXNvblNob3dcIikucmVtb3ZlQ2xhc3MoXCJzZWFzb25TaG93XCIpLmFkZENsYXNzKFwic2Vhc29uSGlkZVwiKTtcblx0XHRcdCQoXCIuc2Vhc29uSGlkZTpudGgtb2YtdHlwZShcIiArIGluZGV4Q2xvc2UgKyBcIilcIikucmVtb3ZlQ2xhc3MoXCJzZWFzb25IaWRlXCIpLmFkZENsYXNzKFwic2Vhc29uU2hvd1wiKTtcblx0XHR9KTtcblx0fVxuXHRcblx0ZGlzYWJsZUVuYWJsZSgpOnZvaWQge1xuXHRcdCQoXCIjY29tbWVudElucHV0XCIpLmtleXVwKGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGNvbW1lbnRCZWZvcmUgPSAkKHRoaXMpLnZhbCgpO1xuXHRcdFx0dmFyIGNoZWNrQ29tbWVudEJlZm9yZSA9IChjb21tZW50QmVmb3JlIGFzIGFueSkudHJpbSgpO1xuXG5cdFx0XHRpZihjaGVja0NvbW1lbnRCZWZvcmUgPT0gJycpIHtcblx0XHRcdFx0Ly8kKCcjY29tbWVudFN1Ym1pdCcpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0XHRcdCQoJyNjb21tZW50U3VibWl0JykuYXR0cignZGlzYWJsZWQnKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHQkKCcjY29tbWVudFN1Ym1pdCcpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn0iLCIvKiBcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiB8IENvcHlyaWdodCAoYykgMjAxNC0yMDE1IEF0b21vLmNvbS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiB8IEAgQXV0aG9yXHQ6IERhbmllbCBSaW9zLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKi9cblxuZXhwb3J0IGNsYXNzIEFkbWluTWVudSB7XG4gICAgLy9TZXQgdGhlIG1lbnUgb3BlbiBhbmQgY2xvc2VcblxuXHR0b2dnbGVNZW51KGhlYWRlcjpzdHJpbmcpOnZvaWQge1xuXHRcdCQoaGVhZGVyKS5vbihcImNsaWNrXCIsIFwiLmNsb3NlTWVudVwiLCBmdW5jdGlvbigpIHtcblx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoXCJjbG9zZU1lbnVcIikuYWRkQ2xhc3MoXCJvcGVuTWVudVwiKTtcblx0XHRcdCQoXCIubWVudU9wZW5lZFwiKS5yZW1vdmVDbGFzcyhcIm1lbnVPcGVuZWRcIikuYWRkQ2xhc3MoXCJtZW51Q2xvc2VkXCIpO1xuXHRcdFx0JChcInNlY3Rpb25baWQkPSdJbnRlcmZhY2UnXVwiKS5yZW1vdmVDbGFzcyhcImJvZHlNZW51T3BlbmVkXCIpLmFkZENsYXNzKFwiYm9keU1lbnVDbG9zZWRcIik7XG5cdFx0fSk7XG5cdFx0JChoZWFkZXIpLm9uKFwiY2xpY2tcIiwgXCIub3Blbk1lbnVcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKFwib3Blbk1lbnVcIikuYWRkQ2xhc3MoXCJjbG9zZU1lbnVcIik7XG5cdFx0XHQkKFwiLm1lbnVDbG9zZWRcIikucmVtb3ZlQ2xhc3MoXCJtZW51Q2xvc2VkXCIpLmFkZENsYXNzKFwibWVudU9wZW5lZFwiKTtcblx0XHRcdCQoXCJzZWN0aW9uW2lkJD0nSW50ZXJmYWNlJ11cIikucmVtb3ZlQ2xhc3MoXCJib2R5TWVudUNsb3NlZFwiKS5hZGRDbGFzcyhcImJvZHlNZW51T3BlbmVkXCIpO1xuXHRcdH0pO1xuXHR9XG5cblx0Ly9NZW51IGFjY29yZGlvblxuXG5cdG1lbnVBY2NvcmRpb24obWVudTpzdHJpbmcpOnZvaWQge1xuXHRcdCQobWVudSkuZmluZChcIiN1bE1lbnUgPiAuaXRlbU1lbnUgPiAuc3ViTWVudUl0ZW1zXCIpLmhpZGUoKTtcblxuXHRcdCQobWVudSkub24oXCJjbGlja1wiLCBcIiN1bE1lbnUgLml0ZW1NZW51T3BlblwiLCBmdW5jdGlvbigpIHtcblx0XHRcdCQodGhpcykuZmluZChcIi5zdWJNZW51SXRlbXNcIikuc2xpZGVVcChcIm5vcm1hbFwiKTtcblx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoXCJpdGVtTWVudU9wZW5cIikuYWRkQ2xhc3MoXCJpdGVtTWVudUNsb3NlXCIpO1xuXHRcdH0pO1xuXHRcdFxuXHRcdCQobWVudSkub24oXCJjbGlja1wiLCBcIiN1bE1lbnUgLml0ZW1NZW51Q2xvc2VcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHQkKFwiI3VsTWVudSA+IGxpXCIpLmZpbmQoXCIuc3ViTWVudUl0ZW1zXCIpLnNsaWRlVXAoXCJub3JtYWxcIik7XG5cdFx0XHQkKFwiI3VsTWVudSA+IGxpXCIpLm5leHQoKS5yZW1vdmVDbGFzcyhcIml0ZW1NZW51T3BlblwiKS5hZGRDbGFzcyhcIml0ZW1NZW51Q2xvc2VcIik7XG5cdFx0XHRcblx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoXCJpdGVtTWVudUNsb3NlXCIpLmFkZENsYXNzKFwiaXRlbU1lbnVPcGVuXCIpO1xuXHRcdFx0JCh0aGlzKS5maW5kKFwiLnN1Yk1lbnVJdGVtc1wiKS5zbGlkZURvd24oXCJub3JtYWxcIik7XG5cdFx0fSk7XG5cdH1cbn0iLCIvKiBcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiB8IENvcHlyaWdodCAoYykgMjAxNC0yMDE1IEF0b21vLmNvbS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiB8IEAgQXV0aG9yXHQ6IERhbmllbCBSaW9zLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKi9cblxuZXhwb3J0IGNsYXNzIEFkbWluT3RoZXJzIHtcbiAgICAvL1Nob3cgdGhlIGFkdmFuY2VkIG9wdGlvbnNcblxuXHRhZHZhbmNlZE9wdGlvbnMoYnV0dG9uOnN0cmluZywgc2hvdzpzdHJpbmcpOnZvaWQge1xuXHRcdCQoYnV0dG9uKS5vbihcImNsaWNrXCIsIFwiLnNlYXJjaEFkdmFuY2VkQ2xvc2VcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKFwic2VhcmNoQWR2YW5jZWRDbG9zZVwiKS5hZGRDbGFzcyhcInNlYXJjaEFkdmFuY2VkT3BlblwiKTtcblx0XHRcdCQoc2hvdykucmVtb3ZlQ2xhc3MoXCJhZHZhbmNlZFNlYXJjaEhpZGVcIikuYWRkQ2xhc3MoXCJhZHZhbmNlZFNlYXJjaFNob3dcIik7XG5cdFx0fSk7XG5cdFx0XG5cdFx0JChidXR0b24pLm9uKFwiY2xpY2tcIiwgXCIuc2VhcmNoQWR2YW5jZWRPcGVuXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcyhcInNlYXJjaEFkdmFuY2VkT3BlblwiKS5hZGRDbGFzcyhcInNlYXJjaEFkdmFuY2VkQ2xvc2VcIik7XG5cdFx0XHQkKHNob3cpLnJlbW92ZUNsYXNzKFwiYWR2YW5jZWRTZWFyY2hTaG93XCIpLmFkZENsYXNzKFwiYWR2YW5jZWRTZWFyY2hIaWRlXCIpO1xuXHRcdH0pO1xuXHR9XG5cblx0Ly9VcGxvYWRcblxuXHRzaG93U2VsZWN0ZWRGaWxlKGRpdjpzdHJpbmcpOnZvaWQge1xuXHRcdCQoZGl2KS5vbignY2hhbmdlJywgJy5pbnB1dEltYWdlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXHRcdFx0dmFyIGZpbGVzID0gJHRoaXMucHJvcCgnZmlsZXMnKTtcblx0XHRcdHZhciBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuXHRcdFx0ZmlsZVJlYWRlci5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBpbWFnZVNlbGVjdGVkID0gZmlsZVJlYWRlci5yZXN1bHQ7XG5cdFx0XHRcdCR0aGlzLm5leHQoJy5maWxlSW5wdXRMYWJlbCcpLnJlbW92ZUNsYXNzKCdmaWxlSW5wdXRMYWJlbCcpLmFkZENsYXNzKCdzZWxlY3RlZElucHV0TGFiZWwnKTtcblx0XHRcdFx0JHRoaXMubmV4dCgnLnNlbGVjdGVkSW5wdXRMYWJlbCcpLmZpbmQoJ2ltZycpLmF0dHIoJ3NyYycsIGltYWdlU2VsZWN0ZWQpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGZpbGVSZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlc1swXSk7XG5cdFx0fSlcblx0XHQub24oJ2NoYW5nZScsICcuaW5wdXRWaWRlbycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKTtcblx0XHRcdHZhciBmaWxlcyA9ICR0aGlzLnByb3AoJ2ZpbGVzJyk7XG5cdFx0XHR2YXIgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cdFx0XHRcblx0XHRcdHZhciBibG9iID0gbmV3IEJsb2IoW2ZpbGVzWzBdXSwge3R5cGU6IGZpbGVzLnR5cGV9KTtcblx0XHRcdHZhciB2aWRlbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VsZWN0ZWRWaWRlb1wiKTtcblx0XHRcdHZhciB1cmwgPSAoVVJMIHx8IHdlYmtpdFVSTCkuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG5cdFx0XHR2aWRlby5zcmMgPSB1cmw7XG5cdFx0XHRmaWxlUmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGZpbGVzWzBdKTtcblx0XHR9KTtcblx0fVxufSIsIi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbi8vQ2hhbmdlIGNsYXNzIG9mIGhlYWRlciBvZiBhbGwgcGFnZVxuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdG9wRGl2ID0gJCgnI3RvcERpdicpO1xuXG4gICAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID49IDMwMCkge1xuICAgICAgICAgICAgdG9wRGl2LnJlbW92ZUNsYXNzKCd0b3BEaXYnKS5hZGRDbGFzcygndG9wRGl2Rml4ZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRvcERpdi5yZW1vdmVDbGFzcygndG9wRGl2Rml4ZWQnKS5hZGRDbGFzcygndG9wRGl2Jyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoJyNmb290ZXInKS5vbihcImNsaWNrXCIsIFwiI3RvcERpdlwiLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICBzY3JvbGxUb3A6IDBcbiAgICAgICAgfSw1MDApO1xuICAgIH0pO1xufSk7IiwiLypcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiB8IENvcHlyaWdodCAoYykgMjAxNC0yMDE1IEF0b21vLmNvbS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiB8IEAgQXV0aG9yXHQ6IERhbmllbCBSaW9zLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKi9cblxuZXhwb3J0IG5hbWVzcGFjZSBJbmRleCB7XG4gICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBwYXJhbGxheCA9IG5ldyBQYXJhbGxheCgpO1xuICAgICAgICB2YXIgc2xpZGUgPSBuZXcgU2xpZGUoKTtcbiAgICAgICAgdmFyIHdhdGNobGlzdCA9IG5ldyBXYXRjaGxpc3QoKTtcbiAgICAgICAgdmFyIGRldGFpbHMgPSBuZXcgRGV0YWlscygpO1xuICAgICAgICB2YXIgdXNlck90aGVycyA9IG5ldyBVc2VyT3RoZXJzKCk7XG4gICAgXG4gICAgICAgIC8vTm90IGNvbm5lY3RlZFxuICAgIFxuICAgICAgICAkKHRoaXMpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHBhcmFsbGF4LnBhcmFsbGF4SG9tZSgpO1xuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgdXNlck90aGVycy50YWJTZWxlY3QodHJ1ZSk7XG4gICAgXG4gICAgICAgIC8vQ29ubmVjdGVkXG4gICAgXG4gICAgICAgIGlmKCQoJyNjb250ZW50U2xpZGVyICNjaGFuZ2VEaXYnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHZhciBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoc2xpZGUuc2xpZGVJbmRleCgpLCA1MDAwKTtcbiAgICBcbiAgICAgICAgICAgIHNsaWRlLmNoYW5nZUluZGV4KCcjY29udGVudFNsaWRlcicpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgICQoJyNpbWFnZURpdiBkaXYnKS5vbignY2xpY2snLCAnLmFkZFdhdGNoTGlzdCcsIHdhdGNobGlzdC5hZGRXYXRjaExpc3RJbmRleCk7XG4gICAgICAgICQoJyNpbWFnZURpdiBkaXYnKS5vbignY2xpY2snLCAnLnJlbW92ZVdhdGNoTGlzdCcsIHdhdGNobGlzdC5yZW1vdmVXYXRjaExpc3RJbmRleCk7XG4gICAgXG4gICAgICAgICQoJy5jb250ZW50R3JvdXBTY3JvbGwnKS5vbignY2xpY2snLCAnLmNvbnRlbnQgLmFkZFdhdGNoTGlzdCcsIHdhdGNobGlzdC5hZGRXYXRjaExpc3RJbmRleCk7XG4gICAgICAgICQoJy5jb250ZW50R3JvdXBTY3JvbGwnKS5vbignY2xpY2snLCAnLmNvbnRlbnQgLnJlbW92ZVdhdGNoTGlzdCcsIHdhdGNobGlzdC5yZW1vdmVXYXRjaExpc3RJbmRleCk7XG4gICAgXG4gICAgICAgIC8vJCgnLmNvbnRlbnRHcm91cFNjcm9sbCcpLm9uKCdjbGljaycsICcuY29udGVudCcsIGRldGFpbHMuc2hvd0RldGFpbHMpO1xuICAgICAgICAvLyQoJy5jb250ZW50Q29udGFpbmVyJykub24oJ2NsaWNrJywgJy5jbG9zZUJ1dHRvbicsIGRldGFpbHMuY2xvc2VEZXRhaWxzKTtcbiAgICB9KTtcbn0iLCIvKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAvL2FkbWluU2NyaXB0LnRvZ2dsZU1lbnUoXCIjaGVhZGVyXCIpO1xuICAgIC8vYWRtaW5TY3JpcHQubWVudUFjY29yZGlvbihcIi5tZW51T3BlbmVkXCIpO1xuICAgIFxuICAgIC8vRHluYW1pYyBtaW5pbXVtIHBhZ2UgaGVpZ2h0XG4gICAgXG4gICAgJChcImJvZHkgPiBzZWN0aW9uXCIpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICAgICAkKFwiLmludGVyZmFjZVwiKS5jc3MoJ21pbi1oZWlnaHQnICwgKCQoZG9jdW1lbnQpLmhlaWdodCgpIC0gNzApICsgJ3B4Jyk7XG4gICAgfSk7XG4gICAgJChcIiNoZWFkZXJcIikub24oJ2NsaWNrJywgJyNzZXR0aW5nc09wZW4nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnI2NvbmZpZ0JhcicpLnRvZ2dsZUNsYXNzKCdjb25maWdCYXJPcGVuJyk7XG4gICAgfSk7XG59KTsiLCIvKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG4vL0ltcG9ydCBhbGwgY2xhc3NlcyBhbmQgY29uZmlnc1xuXG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi9jbGFzc2VzL2NvbmZpZy5jbGFzcyc7XG5cbi8vQWpheCBzY3JpcHRzXG5cbmltcG9ydCB7QWpheH0gZnJvbSAnLi9jbGFzc2VzL2FqYXgvYWpheC5jbGFzcyc7XG5pbXBvcnQge0RldGFpbHN9IGZyb20gJy4vY2xhc3Nlcy9hamF4L2RldGFpbHMuY2xhc3MnO1xuaW1wb3J0IHtDb21tZW50c30gZnJvbSAnLi9jbGFzc2VzL2FqYXgvY29tbWVudHMuY2xhc3MnO1xuaW1wb3J0IHtGb2xsb3d9IGZyb20gJy4vY2xhc3Nlcy9hamF4L2ZvbGxvdy5jbGFzcyc7XG5pbXBvcnQge1dhdGNobGlzdH0gZnJvbSAnLi9jbGFzc2VzL2FqYXgvd2F0Y2hsaXN0LmNsYXNzJztcblxuLy9Vc2VyIHNjcmlwdHNcblxuaW1wb3J0IHtMb2dpbn0gZnJvbSAnLi9jbGFzc2VzL3VzZXIvbG9naW4uY2xhc3MnO1xuaW1wb3J0IHtQYXJhbGxheH0gZnJvbSAnLi9jbGFzc2VzL3VzZXIvcGFyYWxsYXguY2xhc3MnO1xuaW1wb3J0IHtTbGlkZX0gZnJvbSAnLi9jbGFzc2VzL3VzZXIvc2xpZGUuY2xhc3MnO1xuaW1wb3J0IHtVc2VyT3RoZXJzfSBmcm9tICcuL2NsYXNzZXMvdXNlci9vdGhlcnMuY2xhc3MnO1xuXG4vL0FkbWluIHNjcmlwdHNcblxuaW1wb3J0IHtBZG1pbk1lbnV9IGZyb20gJy4vY2xhc3Nlcy9hZG1pbi9tZW51LmNsYXNzJztcbmltcG9ydCB7QWRtaW5PdGhlcnN9IGZyb20gJy4vY2xhc3Nlcy9hZG1pbi9vdGhlcnMuY2xhc3MnO1xuXG4vL0NyZWF0ZSB0aGUgZXZlbnRzXG5cbmltcG9ydCB7fSBmcm9tICcuL2V2ZW50cy9hbGwnO1xuaW1wb3J0IHtJbmRleH0gZnJvbSAnLi9ldmVudHMvaW5kZXgnO1xuaW1wb3J0IHt9IGZyb20gJy4vZXZlbnRzL2FkbWluJztcblxudmFyIHRlc3QgPSB7XG4gICAgJ25hbWUnOiAnRGFuaWVsJyxcbiAgICAnc3VyTmFtZSc6ICdSaW9zJyxcbiAgICAnZnVsbE5hbWUnIDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgJ2Z1bGxOYW1lMic6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufSJdfQ==
