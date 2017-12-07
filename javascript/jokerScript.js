/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
//Service worker init
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(function (registration) {
        console.log('ServiceWorker registration successful');
    })
        .catch(function (error) {
        console.log('ServiceWorker registration failed', error);
    });
    navigator.serviceWorker.oncontrollerchange = function () {
        console.log('Refresh to see the newest content');
    };
}
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
    var IndexEvents = new Index();
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
        userOthers.tabSelect(true);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cGVzY3JpcHQvam9rZXJTY3JpcHQudHMiLCJ0eXBlc2NyaXB0L3BhZ2VzL2FkbWluLnRzIiwidHlwZXNjcmlwdC9wYWdlcy9pbmRleC50cyIsInR5cGVzY3JpcHQvcGFnZXMvbG9naW4udHMiLCJ0eXBlc2NyaXB0L2NsYXNzZXMvY29uZmlnLmNsYXNzLnRzIiwidHlwZXNjcmlwdC9jbGFzc2VzL2FkbWluL21lbnUuY2xhc3MudHMiLCJ0eXBlc2NyaXB0L2NsYXNzZXMvYWRtaW4vb3RoZXJzLmNsYXNzLnRzIiwidHlwZXNjcmlwdC9jbGFzc2VzL2FqYXgvYWpheC5jbGFzcy50cyIsInR5cGVzY3JpcHQvY2xhc3Nlcy9hamF4L2NvbW1lbnRzLmNsYXNzLnRzIiwidHlwZXNjcmlwdC9jbGFzc2VzL2FqYXgvZGV0YWlscy5jbGFzcy50cyIsInR5cGVzY3JpcHQvY2xhc3Nlcy9hamF4L2ZvbGxvdy5jbGFzcy50cyIsInR5cGVzY3JpcHQvY2xhc3Nlcy9hamF4L3dhdGNobGlzdC5jbGFzcy50cyIsInR5cGVzY3JpcHQvY2xhc3Nlcy91c2VyL2xvZ2luLmNsYXNzLnRzIiwidHlwZXNjcmlwdC9jbGFzc2VzL3VzZXIvb3RoZXJzLmNsYXNzLnRzIiwidHlwZXNjcmlwdC9jbGFzc2VzL3VzZXIvcGFyYWxsYXguY2xhc3MudHMiLCJ0eXBlc2NyaXB0L2NsYXNzZXMvdXNlci9zbGlkZS5jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7RUFLRTtBQUVGLHFCQUFxQjtBQUVyQixFQUFFLENBQUEsQ0FBQyxlQUFlLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQztJQUM5QixTQUFTLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBUyxZQUFZO1FBQ2hFLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUNBQXVDLENBQUMsQ0FBQztJQUN6RCxDQUFDLENBQUM7U0FDRCxLQUFLLENBQUMsVUFBUyxLQUFLO1FBQ2pC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QVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNqRyxDQUFDO1lBRUQsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNsRixNQUFNLEVBQUcsQ0FBQztZQUVWLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDckUsQ0FBQyxDQUFDLDZCQUE2QixHQUFHLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2xHLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUNGLFlBQUM7QUFBRCxDQTdFQSxBQTZFQyxJQUFBIiwiZmlsZSI6Impva2VyU2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiB8IENvcHlyaWdodCAoYykgMjAxNC0yMDE1IEF0b21vLmNvbS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiB8IEAgQXV0aG9yXHQ6IERhbmllbCBSaW9zLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKi9cblxuLy9TZXJ2aWNlIHdvcmtlciBpbml0XG5cbmlmKCdzZXJ2aWNlV29ya2VyJyBpbiBuYXZpZ2F0b3IpIHtcbiAgICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWdpc3Rlcignc3cuanMnKS50aGVuKGZ1bmN0aW9uKHJlZ2lzdHJhdGlvbikge1xuICAgICAgICBjb25zb2xlLmxvZygnU2VydmljZVdvcmtlciByZWdpc3RyYXRpb24gc3VjY2Vzc2Z1bCcpO1xuICAgIH0pXG4gICAgLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdTZXJ2aWNlV29ya2VyIHJlZ2lzdHJhdGlvbiBmYWlsZWQnLCBlcnJvcik7XG4gICAgfSk7XG4gICAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIub25jb250cm9sbGVyY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdSZWZyZXNoIHRvIHNlZSB0aGUgbmV3ZXN0IGNvbnRlbnQnKTtcbiAgICB9XG59XG5cbi8vQ2hhbmdlIGNsYXNzIG9mIGhlYWRlciBvZiBhbGwgcGFnZVxuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdG9wRGl2ID0gJCgnI3RvcERpdicpO1xuXG4gICAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID49IDMwMCkge1xuICAgICAgICAgICAgdG9wRGl2LnJlbW92ZUNsYXNzKCd0b3BEaXYnKS5hZGRDbGFzcygndG9wRGl2Rml4ZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRvcERpdi5yZW1vdmVDbGFzcygndG9wRGl2Rml4ZWQnKS5hZGRDbGFzcygndG9wRGl2Jyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoJyNmb290ZXInKS5vbihcImNsaWNrXCIsIFwiI3RvcERpdlwiLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICBzY3JvbGxUb3A6IDBcbiAgICAgICAgfSw1MDApO1xuICAgIH0pO1xuICAgIHZhciBJbmRleEV2ZW50cyA9IG5ldyBJbmRleCgpO1xufSk7XG4iLCIvKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAvL2FkbWluU2NyaXB0LnRvZ2dsZU1lbnUoXCIjaGVhZGVyXCIpO1xuICAgIC8vYWRtaW5TY3JpcHQubWVudUFjY29yZGlvbihcIi5tZW51T3BlbmVkXCIpO1xuICAgIFxuICAgIC8vRHluYW1pYyBtaW5pbXVtIHBhZ2UgaGVpZ2h0XG4gICAgXG4gICAgJChcImJvZHkgPiBzZWN0aW9uXCIpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICAgICAkKFwiLmludGVyZmFjZVwiKS5jc3MoJ21pbi1oZWlnaHQnICwgKCQoZG9jdW1lbnQpLmhlaWdodCgpIC0gNzApICsgJ3B4Jyk7XG4gICAgfSk7XG4gICAgJChcIiNoZWFkZXJcIikub24oJ2NsaWNrJywgJyNzZXR0aW5nc09wZW4nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnI2NvbmZpZ0JhcicpLnRvZ2dsZUNsYXNzKCdjb25maWdCYXJPcGVuJyk7XG4gICAgfSk7XG59KTsiLCIvKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG5jbGFzcyBJbmRleCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHZhciBwYXJhbGxheCA9IG5ldyBQYXJhbGxheCgpO1xuICAgICAgICB2YXIgc2xpZGUgPSBuZXcgU2xpZGUoKTtcbiAgICAgICAgdmFyIHdhdGNobGlzdCA9IG5ldyBXYXRjaGxpc3QoKTtcbiAgICAgICAgdmFyIGRldGFpbHMgPSBuZXcgRGV0YWlscygpO1xuICAgICAgICB2YXIgdXNlck90aGVycyA9IG5ldyBVc2VyT3RoZXJzKCk7XG5cbiAgICAgICAgLy9Ob3QgY29ubmVjdGVkXG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcGFyYWxsYXgucGFyYWxsYXhIb21lKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHVzZXJPdGhlcnMudGFiU2VsZWN0KHRydWUpO1xuXG4gICAgICAgIC8vQ29ubmVjdGVkXG5cbiAgICAgICAgaWYoJCgnI2NvbnRlbnRTbGlkZXIgI2NoYW5nZURpdicpLmxlbmd0aCkge1xuICAgICAgICAgICAgLy92YXIgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKHNsaWRlLnNsaWRlSW5kZXgsIDUwMDApO1xuXG4gICAgICAgICAgICBzbGlkZS5jaGFuZ2VJbmRleCgnI2NvbnRlbnRTbGlkZXInKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJyNpbWFnZURpdiBkaXYnKS5vbignY2xpY2snLCAnLmFkZFdhdGNoTGlzdCcsIHdhdGNobGlzdC5hZGRXYXRjaExpc3RJbmRleCk7XG4gICAgICAgICQoJyNpbWFnZURpdiBkaXYnKS5vbignY2xpY2snLCAnLnJlbW92ZVdhdGNoTGlzdCcsIHdhdGNobGlzdC5yZW1vdmVXYXRjaExpc3RJbmRleCk7XG5cbiAgICAgICAgJCgnLmNvbnRlbnRHcm91cFNjcm9sbCcpLm9uKCdjbGljaycsICcuY29udGVudCAuYWRkV2F0Y2hMaXN0Jywgd2F0Y2hsaXN0LmFkZFdhdGNoTGlzdEluZGV4KTtcbiAgICAgICAgJCgnLmNvbnRlbnRHcm91cFNjcm9sbCcpLm9uKCdjbGljaycsICcuY29udGVudCAucmVtb3ZlV2F0Y2hMaXN0Jywgd2F0Y2hsaXN0LnJlbW92ZVdhdGNoTGlzdEluZGV4KTtcblxuICAgICAgICAkKCcuY29udGVudEdyb3VwU2Nyb2xsJykub24oJ2NsaWNrJywgJy5jb250ZW50JywgZGV0YWlscy5zaG93RGV0YWlscyk7XG4gICAgICAgICQoJy5jb250ZW50Q29udGFpbmVyJykub24oJ2NsaWNrJywgJy5jbG9zZUJ1dHRvbicsIGRldGFpbHMuY2xvc2VEZXRhaWxzKTtcbiAgICB9XG59IiwiLypcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiB8IENvcHlyaWdodCAoYykgMjAxNC0yMDE1IEF0b21vLmNvbS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiB8IEAgQXV0aG9yXHQ6IERhbmllbCBSaW9zLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKi9cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgLy9DbG9zZSB0aGUgbWVzc2FnZSBkaXNwbGF5ZWQgd2hlbiBoYXMgc29tZSBlcnJvclxuXG4gICAgdmFyIG90aGVycyA9IG5ldyBVc2VyT3RoZXJzKCk7XG4gICAgdmFyIGxvZ2luID0gbmV3IExvZ2luKCk7XG5cbiAgICBsb2dpbi5pbnB1dEVycm9yKCcudXNlckRpdicpO1xuICAgIG90aGVycy5jbG9zZU1lc3NhZ2UoJy51c2VyRXJyb3InLCAnI2Vycm9yTXNnQ2xvc2UnKTtcbn0pOyIsIi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmNsYXNzIENvbmZpZyB7XG4gICAgcHVibGljIGJhc2VVcmw6c3RyaW5nID0gJCgnaGVhZCcpLmF0dHIoJ2RhdGEtdXJsJyk7XG4gICAgcHVibGljIGNvb2tpZUlkOnN0cmluZyA9ICQoJ2hlYWQnKS5hdHRyKCdkYXRhLWNvb2tpZScpO1xuICAgIFxuICAgIC8vdmFyIGludGVydmFsTG9nb2ZmOm51bWJlciA9IHNldEludGVydmFsKHVzZXJTY3JpcHQuc2VjdXJlTG9nb2ZmKGJhc2VVcmwpLCAyNTApO1xufSIsIi8qIFxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG5jbGFzcyBBZG1pbk1lbnUge1xuICAgIC8vU2V0IHRoZSBtZW51IG9wZW4gYW5kIGNsb3NlXG5cblx0dG9nZ2xlTWVudShoZWFkZXI6c3RyaW5nKTp2b2lkIHtcblx0XHQkKGhlYWRlcikub24oXCJjbGlja1wiLCBcIi5jbG9zZU1lbnVcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKFwiY2xvc2VNZW51XCIpLmFkZENsYXNzKFwib3Blbk1lbnVcIik7XG5cdFx0XHQkKFwiLm1lbnVPcGVuZWRcIikucmVtb3ZlQ2xhc3MoXCJtZW51T3BlbmVkXCIpLmFkZENsYXNzKFwibWVudUNsb3NlZFwiKTtcblx0XHRcdCQoXCJzZWN0aW9uW2lkJD0nSW50ZXJmYWNlJ11cIikucmVtb3ZlQ2xhc3MoXCJib2R5TWVudU9wZW5lZFwiKS5hZGRDbGFzcyhcImJvZHlNZW51Q2xvc2VkXCIpO1xuXHRcdH0pO1xuXHRcdCQoaGVhZGVyKS5vbihcImNsaWNrXCIsIFwiLm9wZW5NZW51XCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcyhcIm9wZW5NZW51XCIpLmFkZENsYXNzKFwiY2xvc2VNZW51XCIpO1xuXHRcdFx0JChcIi5tZW51Q2xvc2VkXCIpLnJlbW92ZUNsYXNzKFwibWVudUNsb3NlZFwiKS5hZGRDbGFzcyhcIm1lbnVPcGVuZWRcIik7XG5cdFx0XHQkKFwic2VjdGlvbltpZCQ9J0ludGVyZmFjZSddXCIpLnJlbW92ZUNsYXNzKFwiYm9keU1lbnVDbG9zZWRcIikuYWRkQ2xhc3MoXCJib2R5TWVudU9wZW5lZFwiKTtcblx0XHR9KTtcblx0fVxuXG5cdC8vTWVudSBhY2NvcmRpb25cblxuXHRtZW51QWNjb3JkaW9uKG1lbnU6c3RyaW5nKTp2b2lkIHtcblx0XHQkKG1lbnUpLmZpbmQoXCIjdWxNZW51ID4gLml0ZW1NZW51ID4gLnN1Yk1lbnVJdGVtc1wiKS5oaWRlKCk7XG5cblx0XHQkKG1lbnUpLm9uKFwiY2xpY2tcIiwgXCIjdWxNZW51IC5pdGVtTWVudU9wZW5cIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHQkKHRoaXMpLmZpbmQoXCIuc3ViTWVudUl0ZW1zXCIpLnNsaWRlVXAoXCJub3JtYWxcIik7XG5cdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKFwiaXRlbU1lbnVPcGVuXCIpLmFkZENsYXNzKFwiaXRlbU1lbnVDbG9zZVwiKTtcblx0XHR9KTtcblx0XHRcblx0XHQkKG1lbnUpLm9uKFwiY2xpY2tcIiwgXCIjdWxNZW51IC5pdGVtTWVudUNsb3NlXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0JChcIiN1bE1lbnUgPiBsaVwiKS5maW5kKFwiLnN1Yk1lbnVJdGVtc1wiKS5zbGlkZVVwKFwibm9ybWFsXCIpO1xuXHRcdFx0JChcIiN1bE1lbnUgPiBsaVwiKS5uZXh0KCkucmVtb3ZlQ2xhc3MoXCJpdGVtTWVudU9wZW5cIikuYWRkQ2xhc3MoXCJpdGVtTWVudUNsb3NlXCIpO1xuXHRcdFx0XG5cdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKFwiaXRlbU1lbnVDbG9zZVwiKS5hZGRDbGFzcyhcIml0ZW1NZW51T3BlblwiKTtcblx0XHRcdCQodGhpcykuZmluZChcIi5zdWJNZW51SXRlbXNcIikuc2xpZGVEb3duKFwibm9ybWFsXCIpO1xuXHRcdH0pO1xuXHR9XG59IiwiLyogXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmNsYXNzIEFkbWluT3RoZXJzIHtcbiAgICAvL1Nob3cgdGhlIGFkdmFuY2VkIG9wdGlvbnNcblxuXHRhZHZhbmNlZE9wdGlvbnMoYnV0dG9uOnN0cmluZywgc2hvdzpzdHJpbmcpOnZvaWQge1xuXHRcdCQoYnV0dG9uKS5vbihcImNsaWNrXCIsIFwiLnNlYXJjaEFkdmFuY2VkQ2xvc2VcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKFwic2VhcmNoQWR2YW5jZWRDbG9zZVwiKS5hZGRDbGFzcyhcInNlYXJjaEFkdmFuY2VkT3BlblwiKTtcblx0XHRcdCQoc2hvdykucmVtb3ZlQ2xhc3MoXCJhZHZhbmNlZFNlYXJjaEhpZGVcIikuYWRkQ2xhc3MoXCJhZHZhbmNlZFNlYXJjaFNob3dcIik7XG5cdFx0fSk7XG5cdFx0XG5cdFx0JChidXR0b24pLm9uKFwiY2xpY2tcIiwgXCIuc2VhcmNoQWR2YW5jZWRPcGVuXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcyhcInNlYXJjaEFkdmFuY2VkT3BlblwiKS5hZGRDbGFzcyhcInNlYXJjaEFkdmFuY2VkQ2xvc2VcIik7XG5cdFx0XHQkKHNob3cpLnJlbW92ZUNsYXNzKFwiYWR2YW5jZWRTZWFyY2hTaG93XCIpLmFkZENsYXNzKFwiYWR2YW5jZWRTZWFyY2hIaWRlXCIpO1xuXHRcdH0pO1xuXHR9XG5cblx0Ly9VcGxvYWRcblxuXHRzaG93U2VsZWN0ZWRGaWxlKGRpdjpzdHJpbmcpOnZvaWQge1xuXHRcdCQoZGl2KS5vbignY2hhbmdlJywgJy5pbnB1dEltYWdlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXHRcdFx0dmFyIGZpbGVzID0gJHRoaXMucHJvcCgnZmlsZXMnKTtcblx0XHRcdHZhciBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuXHRcdFx0ZmlsZVJlYWRlci5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBpbWFnZVNlbGVjdGVkID0gZmlsZVJlYWRlci5yZXN1bHQ7XG5cdFx0XHRcdCR0aGlzLm5leHQoJy5maWxlSW5wdXRMYWJlbCcpLnJlbW92ZUNsYXNzKCdmaWxlSW5wdXRMYWJlbCcpLmFkZENsYXNzKCdzZWxlY3RlZElucHV0TGFiZWwnKTtcblx0XHRcdFx0JHRoaXMubmV4dCgnLnNlbGVjdGVkSW5wdXRMYWJlbCcpLmZpbmQoJ2ltZycpLmF0dHIoJ3NyYycsIGltYWdlU2VsZWN0ZWQpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGZpbGVSZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlc1swXSk7XG5cdFx0fSlcblx0XHQub24oJ2NoYW5nZScsICcuaW5wdXRWaWRlbycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKTtcblx0XHRcdHZhciBmaWxlcyA9ICR0aGlzLnByb3AoJ2ZpbGVzJyk7XG5cdFx0XHR2YXIgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cdFx0XHRcblx0XHRcdHZhciBibG9iID0gbmV3IEJsb2IoW2ZpbGVzWzBdXSwge3R5cGU6IGZpbGVzLnR5cGV9KTtcblx0XHRcdHZhciB2aWRlbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VsZWN0ZWRWaWRlb1wiKTtcblx0XHRcdHZhciB1cmwgPSAoVVJMIHx8IHdlYmtpdFVSTCkuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG5cdFx0XHR2aWRlby5zcmMgPSB1cmw7XG5cdFx0XHRmaWxlUmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGZpbGVzWzBdKTtcblx0XHR9KTtcblx0fVxufSIsIi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmNsYXNzIEFqYXgge1xuICAgIHB1YmxpYyBhamF4RmlsZTpzdHJpbmcgPSAnYWpheC9hamF4UmVxdWlzaXRpb25zLnBocCc7XG4gICAgXG4gICAgLy9mdW5jdGlvbiBmb3Igc2ltcGxlIGFqYXgsIHdpdGhvdXQgc2VudCBhbmQgcmVjZWl2ZWQgZGF0YXMsIGlmIHlvdSB3YW50IHRvIHJlY2VpdmUgYW5kL29yIHNlbmQgZGF0YXMsIGNyZWF0ZSBhbm90ZXIgb25lXG5cbiAgICBjaGFuZ2VVcmwodXJsOnN0cmluZyk6dm9pZCB7XG4gICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKHt9LCAnJywgdXJsKTtcbiAgICB9XG5cbiAgICBnZXRQYWdlKHBhZ2U6c3RyaW5nLCBwYXJhbWV0ZXJzOnN0cmluZywgY2FsbGJhY2s6YW55KTp2b2lkIHtcbiAgICAgICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgXG4gICAgICAgIHJlcXVlc3Qub3BlbignUE9TVCcsIHBhZ2UsIHRydWUpO1xuICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LXR5cGVcIiwgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIik7XG5cbiAgICAgICAgcmVxdWVzdC5vbnByb2dyZXNzID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAkKCcuYWpheFJlcGxhY2UnKS5hZGRDbGFzcygnbG9hZGluZycpO1xuICAgICAgICAgICAgdmFyIHBlcmNlbnQgPSAoZS5sb2FkZWQgLyBlLnRvdGFsKSAqIDEwMDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgJCgnLmxvYWRpbmc6YmVmb3JlJykuY3NzKHtcbiAgICAgICAgICAgICAgICB3aWR0aDogcGVyY2VudCArICclJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA+PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgPCA0MDApIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhyZXF1ZXN0LnJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdVbmV4cGVjdGVkIHN0YXR1cyBjb2RlICcgKyByZXF1ZXN0LnN0YXR1cyArICcgZm9yICcgKyBwYWdlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2FsbGJhY2soJ2Vycm9yIGJlZm9yZSBzZWRpbmcnKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVxdWVzdC5zZW5kKHBhcmFtZXRlcnMpO1xuICAgIH1cblxuICAgIGFqYXgobWV0aG9kOnN0cmluZywgYWN0aW9uOnN0cmluZywgZGF0YUlkLCBiZWZvcmUsIG5vdERvbmUsIGRvbmUpOnZvaWQge1xuICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB2YXIgdXJsID0gdGhpcy5hamF4RmlsZSArICc/YWpheEFjdGlvbj0nICsgYWN0aW9uICsgJyZhamF4SWQ9JyArIGRhdGFJZDtcbiAgICAgICAgXG4gICAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbm90RG9uZTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVxdWVzdC5vcGVuKG1ldGhvZCwgdXJsKTtcbiAgICAgICAgXG4gICAgICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPj0gMjAwICYmIHJlcXVlc3Quc3RhdHVzIDwgNDAwKSB7XG4gICAgICAgICAgICAgICAgZG9uZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vdERvbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3Quc2VuZCgpO1xuICAgIH1cbn0iLCIvKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG5jbGFzcyBDb21tZW50cyBleHRlbmRzIEFqYXgge1xuICAgIG1ha2VDb21tZW50KCk6dm9pZCB7XG4gICAgICAgIHZhciBjb21tZW50ID0gJChcIiNjb21tZW50SW5wdXRcIikudmFsKCk7XG4gICAgICAgIHZhciBjaGVja0NvbW1lbnQgPSAoY29tbWVudCBhcyBhbnkpLnRyaW0oKTtcbiAgICAgICAgXG4gICAgICAgIGlmKGNoZWNrQ29tbWVudCA9PSAnJykge1xuICAgICAgICAgICAgYWxlcnQoJ1R5cGUgYSBjb21tZW50Jyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXG4gICAgICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICAgICAgICByZXF1ZXN0Lm9wZW4oJ1BPU1QnLCB0aGlzLmFqYXhGaWxlICsgJz9hamF4QWN0aW9uPW1ha2VDb21tZW50JmFqYXhJZD0nICsgJHRoaXMuYXR0cignZGF0YS1pZCcpKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC10eXBlXCIsIFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIpO1xuXG4gICAgICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBhbGVydChcIkNvbW1lbnQgbm90IG1hZGVcIik7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICQoJyNjb21tZW50c0RpdiAjY29tbWVudEZvcm1EaXYnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAkKCcjY29tbWVudHNEaXYnKS5wcmVwZW5kKCc8ZGl2IGlkPVwidXNlckNvbW1lbnRcIj48aW1nIHNyYz1cIicgKyBiYXNlVXJsICsgJ2ltYWdlcy91c2VyLycgKyAkdGhpcy5hdHRyKCdkYXRhLXVzZXJpZCcpICsgJy9wcm9maWxlLmpwZ1wiLz48ZGl2IGlkPVwicmlnaHREaXZcIj48ZGl2IGlkPVwiY29tbWVudFNwYW5EaXZcIj48c3BhbiBpZD1cImNvbW1lbnRTcGFuXCI+JyArIGNvbW1lbnQgKyAnPC9zcGFuPjwvZGl2PjxkaXYgaWQ9XCJjb21tZW50T3B0aW9uc0RpdlwiPjxkaXYgaWQ9XCJidXR0b25FZGl0XCIgY2xhc3M9XCJidXR0b25cIiBkYXRhLWlkPVwiJyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSArICdcIj48L2Rpdj48ZGl2IGlkPVwiYnV0dG9uRGVsZXRlXCIgY2xhc3M9XCJidXR0b25cIiBkYXRhLXVzZXJpZD1cIicgKyAkdGhpcy5hdHRyKCdkYXRhLXVzZXJpZCcpICsgJ1wiIGRhdGEtaWQ9XCInICsgJHRoaXMuYXR0cignZGF0YS1pZCcpICsgJ1wiPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICQoJyN1c2VyQ29tbWVudCcpLm9uKCdjbGljaycsICcjYnV0dG9uRGVsZXRlJywgdGhpcy5kZWxldGVDb21tZW50KCkpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmVxdWVzdC5zZW5kKFwiY29tbWVudD1cIiArIGNvbW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZWRpdENvbW1lbnQoKTp2b2lkIHtcbiAgICAgICAgYWxlcnQoJ0NvbW1pbmcgc29vbicpO1xuICAgIH1cblxuICAgIGRlbGV0ZUNvbW1lbnQoKTp2b2lkIHtcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcblxuICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICAgIHJlcXVlc3Qub3BlbignUE9TVCcsIHRoaXMuYWpheEZpbGUgKyAnP2FqYXhBY3Rpb249ZGVsZXRlQ29tbWVudCZhamF4SWQ9JyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSk7XG5cbiAgICAgICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhbGVydChcIkNvbW1lbnQgbm90IGRlbGV0ZWRcIik7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQoJyNjb21tZW50c0RpdiAjdXNlckNvbW1lbnQnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICQoJyNjb21tZW50c0RpdicpLnByZXBlbmQoJzxkaXYgaWQ9XCJjb21tZW50Rm9ybURpdlwiPjx0ZXh0YXJlYSBjb2xzPVwiMTBcIiByb3dzPVwiM1wiIG1heC1jb2xzPVwiMTBcIiBpZD1cImNvbW1lbnRJbnB1dFwiIHBsYWNlaG9sZGVyPVwiTGVhdmUgeW91ciBjb21tZW50XCI+PC90ZXh0YXJlYT48ZGl2IGlkPVwiYnV0dG9uc0RpdlwiPjxidXR0b24gaWQ9XCJjb21tZW50U3VibWl0XCIgZGF0YS11c2VyaWQ9XCInICsgJHRoaXMuYXR0cignZGF0YS11c2VyaWQnKSArICdcIiBkYXRhLWlkPVwiJyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSArICdcIiBkaXNhYmxlZD1cImRpc2FibGVkXCI+Q29tZW50YXI8L2J1dHRvbj48L2Rpdj48L2Rpdj4nKTtcbiAgICAgICAgICAgICQoJyNjb21tZW50Rm9ybURpdicpLm9uKCdjbGljaycsICcjY29tbWVudFN1Ym1pdCcsIHRoaXMubWFrZUNvbW1lbnQoKSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZUVuYWJsZSgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlcXVlc3Quc2VuZCgpO1xuICAgIH1cbn0iLCIvKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG5jbGFzcyBEZXRhaWxzIGV4dGVuZHMgQWpheCB7XG4gICAgc2hvd0RldGFpbHMoZXZlbnQ/OmFueSk6dm9pZCB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHZhciBjb250ZW50TGluazpzdHJpbmcgPSAkKHRoaXMpLmZpbmQoJy5jb250ZW50TGluaycpLmF0dHIoJ2hyZWYnKTtcbiAgICAgICAgdmFyIGNvbnRlbnRMaW5rVG9CYWNrOnN0cmluZyA9ICQodGhpcykuZmluZCgnLmNvbnRlbnRMaW5rJykuYXR0cignZGF0YS11cmwnKTtcbiAgICAgICAgdmFyIGNvbnRlbnRUaXRsZVRvQmFjazpzdHJpbmcgPSAkKHRoaXMpLmZpbmQoJy5jb250ZW50TGluaycpLmF0dHIoJ2RhdGEtdGl0bGUnKTtcbiAgICAgICAgJCgnLmNsb3NlQnV0dG9uJykuYXR0cignZGF0YS11cmwnLCBjb250ZW50TGlua1RvQmFjayk7XG4gICAgICAgICQoJy5jbG9zZUJ1dHRvbicpLmF0dHIoJ2RhdGEtdGl0bGUnLCBjb250ZW50VGl0bGVUb0JhY2spO1xuXG4gICAgICAgIHZhciBhbGxjb250YWluZXJEaXYgPSAkKCcuY29udGVudENvbnRhaW5lciAudGl0bGVEZXRhaWxzT3BlbicpO1xuICAgICAgICB2YXIgYWxsY29udGVudERpdiA9ICQoJy5jb250ZW50Q29udGFpbmVyIC5jb250ZW50RGl2IC5jb250ZW50T3BlbicpO1xuICAgICAgICBcbiAgICAgICAgdmFyIGNvbnRlbnREaXYgPSAkKHRoaXMpOy8vY29udGVudFxuICAgICAgICB2YXIgcGFyZW50RGl2ID0gY29udGVudERpdi5wYXJlbnQoKTsvL2NvbnRlbnRHcm91cFxuICAgICAgICB2YXIgY29udGFpbmVyRGl2ID0gcGFyZW50RGl2LnBhcmVudCgpLnBhcmVudCgpOy8vY29udGVudENvbnRhaW5lclxuXG4gICAgICAgIGFsbGNvbnRhaW5lckRpdi5maW5kKCcuc2VjdGlvbkNvbnRlbnQgYXJ0aWNsZScpLnJlbW92ZSgpO1xuXG4gICAgICAgIGFsbGNvbnRhaW5lckRpdi5yZW1vdmVDbGFzcygndGl0bGVEZXRhaWxzT3BlbicpLmFkZENsYXNzKCd0aXRsZURldGFpbHMnKTtcbiAgICAgICAgYWxsY29udGVudERpdi5yZW1vdmVDbGFzcygnY29udGVudE9wZW4nKS5hZGRDbGFzcygnY29udGVudCcpO1xuICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdjb250ZW50JykuYWRkQ2xhc3MoJ2NvbnRlbnRPcGVuJyk7XG4gICAgICAgIFxuICAgICAgICBjb250YWluZXJEaXYuZmluZCgnLnRpdGxlRGV0YWlscycpLnJlbW92ZUNsYXNzKCd0aXRsZURldGFpbHMnKS5hZGRDbGFzcygndGl0bGVEZXRhaWxzT3BlbicpO1xuICAgICAgICBcbiAgICAgICAgaWYocGFyZW50RGl2LmF0dHIoJ2NsYXNzJykgPT0gJ2NvbnRlbnRHcm91cCcpIHtcbiAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IGNvbnRhaW5lckRpdi5maW5kKCcudGl0bGVEZXRhaWxzT3BlbicpLm9mZnNldCgpLnRvcCAtIDE1MFxuICAgICAgICAgICAgfSw1MDApO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyLmdldFBhZ2UoY29udGVudExpbmssIFwiYm9keT10cnVlXCIsIGZ1bmN0aW9uKGRhdGE6YW55KSB7XG4gICAgICAgICAgICB2YXIgZmlsdGVyOmFueSA9ICQoZGF0YSkuY2hpbGRyZW4oKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAkKCcudGl0bGVEZXRhaWxzT3BlbicpLmZpbmQoJy5zZWN0aW9uQ29udGVudCcpLmh0bWwoZmlsdGVyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHN1cGVyLmNoYW5nZVVybChjb250ZW50TGluayk7XG4gICAgfVxuXG4gICAgY2xvc2VEZXRhaWxzKCk6dm9pZCB7XG4gICAgICAgIHZhciBjb250YWluZXJEaXYgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnBhcmVudCgpOy8vY29udGVudENvbnRhaW5lclxuICAgICAgICB2YXIgYWxsY29udGFpbmVyRGl2ID0gJCgnLmNvbnRlbnRDb250YWluZXIgLnRpdGxlRGV0YWlsc09wZW4nKTtcbiAgICAgICAgdmFyIGFsbGNvbnRlbnREaXYgPSAkKCcuY29udGVudENvbnRhaW5lciAuY29udGVudERpdiBkaXYnKTtcbiAgICAgICAgdmFyIG9mZnNldERldGFpbHNEaXYgPSBjb250YWluZXJEaXYub2Zmc2V0KCkudG9wO1xuICAgICAgICB2YXIgbGlua1RvQmFjayA9ICQodGhpcykuYXR0cignZGF0YS11cmwnKTtcbiAgICAgICAgdmFyIHRpdGxlVG9CYWNrID0gJCh0aGlzKS5hdHRyKCdkYXRhLXRpdGxlJyk7XG5cbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9wOiBvZmZzZXREZXRhaWxzRGl2XG4gICAgICAgIH0sNTAwLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGFsbGNvbnRhaW5lckRpdi5yZW1vdmVDbGFzcygndGl0bGVEZXRhaWxzT3BlbicpLmFkZENsYXNzKCd0aXRsZURldGFpbHMnKTtcbiAgICAgICAgICAgICQoJy50aXRsZURldGFpbHMnKS5maW5kKCcuc2VjdGlvbkNvbnRlbnQgYXJ0aWNsZScpLnJlbW92ZSgpO1xuICAgICAgICAgICAgJCgnLnRpdGxlRGV0YWlsc09wZW4nKS5maW5kKCcuc2VjdGlvbkNvbnRlbnQgYXJ0aWNsZScpLnJlbW92ZSgpO1xuICAgICAgICAgICAgYWxsY29udGVudERpdi5maW5kKCcuY29udGVudE9wZW4nKS5yZW1vdmVDbGFzcygnY29udGVudE9wZW4nKS5hZGRDbGFzcygnY29udGVudCcpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL3N1cGVyLmNoYW5nZVVybChsaW5rVG9CYWNrKTtcbiAgICAgICAgICAgICQoJ3RpdGxlJykuZW1wdHkoKS50ZXh0KHRpdGxlVG9CYWNrKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc3VwZXIuY2hhbmdlVXJsKGxpbmtUb0JhY2spO1xuICAgIH1cbn0iLCIvKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG5jbGFzcyBGb2xsb3cgZXh0ZW5kcyBBamF4IHtcbiAgICBmb2xsb3dVc2VyKCk6dm9pZCB7XG4gICAgICAgIHZhciBidXR0b24gPSAkKHRoaXMpO1xuXG4gICAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgICAgcmVxdWVzdC5vcGVuKCdQT1NUJywgdGhpcy5hamF4RmlsZSArICc/YWpheEFjdGlvbj1mb2xsb3cmYWpheElkPScgKyAkKGJ1dHRvbikuYXR0cignZGF0YS1pZCcpKTtcblxuICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGFsZXJ0KCdFcnJvcicpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZVRleHQpO1xuXG4gICAgICAgICAgICAkKGJ1dHRvbikuYXR0cihcImlkXCIsIGRhdGEuY2hhbmdlKTtcbiAgICAgICAgICAgICQoYnV0dG9uKS5maW5kKFwiLmJ1dHRvblNwYW5cIikuaHRtbChkYXRhLndyaXRlKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXF1ZXN0LnNlbmQoKTtcbiAgICB9XG5cbiAgICB1bmZvbGxvd1VzZXIoKTp2b2lkIHtcbiAgICAgICAgdmFyIGJ1dHRvbiA9ICQodGhpcyk7XG5cbiAgICAgICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgICByZXF1ZXN0Lm9wZW4oJ1BPU1QnLCB0aGlzLmFqYXhGaWxlICsgJz9hamF4QWN0aW9uPXVuZm9sbG93JmFqYXhJZD0nICsgJChidXR0b24pLmF0dHIoJ2RhdGEtaWQnKSk7XG5cbiAgICAgICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhbGVydCgnRXJyb3InKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2VUZXh0KTtcblxuICAgICAgICAgICAgJChidXR0b24pLmF0dHIoXCJpZFwiLCBkYXRhLmNoYW5nZSk7XG4gICAgICAgICAgICAkKGJ1dHRvbikuZmluZChcIi5idXR0b25TcGFuXCIpLmh0bWwoZGF0YS53cml0ZSk7IFxuICAgICAgICB9O1xuXG4gICAgICAgIHJlcXVlc3Quc2VuZCgpO1xuICAgIH1cblxuICAgIGFqYXhMaW5rKGV2ZW50LCB1cmwpOnZvaWQge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZih1cmwgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgbGlua1RvID0gdXJsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIGxpbmtUbzphbnkgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcbiAgICAgICAgfVxuICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ3Njcm9sbCcpO1xuXG4gICAgICAgIHRoaXMuZ2V0UGFnZShsaW5rVG8sIFwiYm9keT10cnVlXCIsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAvLyQoJy5hamF4UmVwbGFjZScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG4gICAgICAgICAgICAkKCcuYWpheFJlcGxhY2UnKS5odG1sKGRhdGEpO1xuXG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgICAgICAgICB9LDUwMCk7XG5cbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVXJsKGxpbmtUbyk7XG5cbiAgICAgICAgICAgICQoJyNtZW51QnRJbnB1dCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG5cbiAgICAgICAgICAgIGlmKGxpbmtUbyA9PSBiYXNlVXJsKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufSIsIi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmNsYXNzIFdhdGNobGlzdCB7XG4gICAgYWRkV2F0Y2hMaXN0KCk6dm9pZCB7XG4gICAgICAgIHZhciBkYXRhSWQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtaWQnKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYWpheChcbiAgICAgICAgICAgICdQT1NUJyxcbiAgICAgICAgICAgICdhZGRXYXRjaExpc3QnLFxuICAgICAgICAgICAgZGF0YUlkLFxuICAgICAgICAgICAgJycsXG4gICAgICAgICAgICAnJyxcbiAgICAgICAgICAgICQoJy5hZGRXYXRjaExpc3QnKS5yZW1vdmVDbGFzcygnYWRkV2F0Y2hMaXN0JykuYWRkQ2xhc3MoJ3JlbW92ZVdhdGNoTGlzdCcpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVtb3ZlV2F0Y2hMaXN0KCk6dm9pZCB7XG4gICAgICAgIHZhciBkYXRhSWQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtaWQnKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYWpheChcbiAgICAgICAgICAgICdQT1NUJyxcbiAgICAgICAgICAgICdyZW1vdmVXYXRjaExpc3QnLFxuICAgICAgICAgICAgZGF0YUlkLFxuICAgICAgICAgICAgJycsXG4gICAgICAgICAgICAnJyxcbiAgICAgICAgICAgICQoJy5yZW1vdmVXYXRjaExpc3QnKS5yZW1vdmVDbGFzcygncmVtb3ZlV2F0Y2hMaXN0JykuYWRkQ2xhc3MoJ2FkZFdhdGNoTGlzdCcpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgYWRkV2F0Y2hMaXN0SW5kZXgoKTp2b2lkIHtcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgdmFyIGRhdGFJZCA9ICQodGhpcykuYXR0cignZGF0YS1pZCcpO1xuXG4gICAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHZhciB1cmwgPSB0aGlzLmFqYXhGaWxlICsgJz9hamF4QWN0aW9uPWFkZFdhdGNoTGlzdCZhamF4SWQ9JyArIGRhdGFJZDtcbiAgICAgICAgXG4gICAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYWxlcnQoJ0Vycm9yJyk7XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3Qub3BlbignUE9TVCcsIHVybCk7XG4gICAgICAgIFxuICAgICAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2VUZXh0KTtcblxuICAgICAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID49IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyA8IDQwMCkge1xuICAgICAgICAgICAgICAgIGlmKCQoJyN3YXRjaExpc3REaXYnKS5sZW5ndGggPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLm1haW5TZWN0aW9uJykucHJlcGVuZCgnPGFydGljbGUgaWQ9XCJ3YXRjaExpc3REaXZcIiBjbGFzcz1cImNvbnRlbnRDb250YWluZXJcIj48cCBjbGFzcz1cImNvbnRlbnREaXZIZWFkZXJcIj4nICsgZGF0YS50aXRsZSArICc8L3A+PGRpdiBjbGFzcz1cImNvbnRlbnREaXZcIj48ZGl2IGNsYXNzPVwiY29udGVudEdyb3VwU2Nyb2xsXCI+PC9kaXY+PC9kaXY+PC9hcnRpY2xlPicpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKCR0aGlzLmF0dHIoJ2RhdGEtdHlwZScpID09ICdtb3ZpZScpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpbmtUeXBlID0gJ21vdmllcyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoJHRoaXMuYXR0cignZGF0YS10eXBlJykgPT0gJ3NlcmllJykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGlua1R5cGUgPSAnc2VyaWVzJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAkdGhpcy5yZW1vdmVDbGFzcygnYWRkV2F0Y2hMaXN0JykuYWRkQ2xhc3MoJ3JlbW92ZVdhdGNoTGlzdCcpO1xuXG4gICAgICAgICAgICAgICAgJCgnI3dhdGNoTGlzdERpdiAuY29udGVudEdyb3VwU2Nyb2xsJykucHJlcGVuZCgnPGRpdiBjbGFzcz1cImNvbnRlbnRcIiBkYXRhLWlkPVwiJyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSAgKyAnXCI+PGEgY2xhc3M9XCJjb250ZW50TGlua1wiIGhyZWY9XCInICsgYmFzZVVybCArICd0aXRsZT9pZD0nICsgJHRoaXMuYXR0cignZGF0YS1pZCcpICsgJ1wiPjxmaWd1cmUgY2xhc3M9XCJjb250ZW50RmlndXJlXCI+PGltZyBzcmM9XCIvam9rZXIvaW1hZ2VzL21lZGlhLycgKyBsaW5rVHlwZSArICcvJyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSArICcvaW1hZ2UuanBnXCIvPjxmaWdjYXB0aW9uPjwvZmlnY2FwdGlvbj48L2ZpZ3VyZT48L2E+PGRpdiBjbGFzcz1cInJlbW92ZVdhdGNoTGlzdFwiIGRhdGEtdHlwZT1cIicgKyBsaW5rVHlwZSArICdcIiBkYXRhLWlkPVwiJyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSArICdcIj48L2Rpdj48L2Rpdj4nKTtcblxuICAgICAgICAgICAgICAgICQoJy5jb250ZW50RGl2IGRpdiAuYWRkV2F0Y2hMaXN0W2RhdGEtaWQ9XCInICsgJHRoaXMuYXR0cignZGF0YS1pZCcpICsgJ1wiXScpLnJlbW92ZUNsYXNzKCdhZGRXYXRjaExpc3QnKS5hZGRDbGFzcygncmVtb3ZlV2F0Y2hMaXN0Jyk7XG4gICAgICAgICAgICAgICAgJCgnI2ltYWdlRGl2IGRpdiBzcGFuW2RhdGEtaWQ9XCInICsgJHRoaXMuYXR0cignZGF0YS1pZCcpICsgJ1wiXScpLnJlbW92ZUNsYXNzKCdhZGRXYXRjaExpc3QnKS5hZGRDbGFzcygncmVtb3ZlV2F0Y2hMaXN0Jyk7XG5cbiAgICAgICAgICAgICAgICAkKCcjY29udGVudFNvcnRjdXRzJykuZmluZCgnLmFkZFdhdGNoTGlzdCcpLnJlbW92ZUNsYXNzKCdhZGRXYXRjaExpc3QnKS5hZGRDbGFzcygncmVtb3ZlV2F0Y2hMaXN0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydCgnRXJyb3InKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmVxdWVzdC5zZW5kKCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlV2F0Y2hMaXN0SW5kZXgoKTp2b2lkIHtcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgdmFyIGRhdGFJZCA9ICQodGhpcykuYXR0cignZGF0YS1pZCcpO1xuXG4gICAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHZhciB1cmwgPSB0aGlzLmFqYXhGaWxlICsgJz9hamF4QWN0aW9uPXJlbW92ZVdhdGNoTGlzdCZhamF4SWQ9JyArIGRhdGFJZDtcbiAgICAgICAgXG4gICAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYWxlcnQoJ0Vycm9yJyk7XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3Qub3BlbignUE9TVCcsIHVybCk7XG4gICAgICAgIFxuICAgICAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID49IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyA8IDQwMCkge1xuICAgICAgICAgICAgICAgICQoJyN3YXRjaExpc3REaXYgZGl2W2RhdGEtaWQ9XCInICsgJHRoaXMuYXR0cignZGF0YS1pZCcpICsgJ1wiXScpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICQoJy5jb250ZW50RGl2IGRpdiAucmVtb3ZlV2F0Y2hMaXN0W2RhdGEtaWQ9XCInICsgJHRoaXMuYXR0cignZGF0YS1pZCcpICsgJ1wiXScpLnJlbW92ZUNsYXNzKCdyZW1vdmVXYXRjaExpc3QnKS5hZGRDbGFzcygnYWRkV2F0Y2hMaXN0Jyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgJCgnI2ltYWdlRGl2IHNwYW5bZGF0YS1pZD1cIicgKyAkdGhpcy5hdHRyKCdkYXRhLWlkJykgKyAnXCJdJykucmVtb3ZlQ2xhc3MoJ3JlbW92ZVdhdGNoTGlzdCcpLmFkZENsYXNzKCdhZGRXYXRjaExpc3QnKTtcblxuICAgICAgICAgICAgICAgICQoJyNjb250ZW50U29ydGN1dHMnKS5maW5kKCcucmVtb3ZlV2F0Y2hMaXN0JykucmVtb3ZlQ2xhc3MoJ3JlbW92ZVdhdGNoTGlzdCcpLmFkZENsYXNzKCdhZGRXYXRjaExpc3QnKTtcblxuICAgICAgICAgICAgICAgIGlmKCQudHJpbSgkKCcjd2F0Y2hMaXN0RGl2IC5jb250ZW50R3JvdXBTY3JvbGwnKS5odG1sKCkpID09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJyN3YXRjaExpc3REaXYnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydCgnRXJyb3InKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmVxdWVzdC5zZW5kKCk7XG4gICAgfVxufSIsIi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmNsYXNzIExvZ2luIHtcbiAgICBpbnB1dEVycm9yKHBhcmVudERpdjpzdHJpbmcpOnZvaWQge1xuXHRcdCQocGFyZW50RGl2KS5vbignZm9jdXNvdXQnLCAnLmlucHV0VGV4dCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYoKCQodGhpcykgYXMgYW55KS52YWwoKS5sZW5ndGggPCAxKSB7XG5cdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2lucHV0VGV4dCcpLmFkZENsYXNzKCdpbnB1dFRleHRFcnJvcicpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdFxuXHRcdCQocGFyZW50RGl2KS5vbignZm9jdXNvdXQnLCAnLmlucHV0VGV4dEVycm9yJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRpZigoJCh0aGlzKSBhcyBhbnkpLnZhbCgpLmxlbmd0aCA+PSAxKSB7XG5cdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2lucHV0VGV4dEVycm9yJykuYWRkQ2xhc3MoJ2lucHV0VGV4dCcpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0c2VjdXJlTG9nb2ZmKHVybCk6dm9pZCB7XG5cdFx0aWYoIWRvY3VtZW50LmNvb2tpZS5tYXRjaCgnbG9naW4nKSkge1xuXHRcdFx0bG9jYXRpb24ucmVwbGFjZSh1cmwgKyAnbG9nb2ZmJyk7XG5cdFx0fVxuXHR9XG59IiwiLypcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiB8IENvcHlyaWdodCAoYykgMjAxNC0yMDE1IEF0b21vLmNvbS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiB8IEAgQXV0aG9yXHQ6IERhbmllbCBSaW9zLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKi9cblxuY2xhc3MgVXNlck90aGVycyB7XG4gICAgLyoqXG5cdCAqIGhpZGUgdGhlIHJlcGxpZXNcblx0ICovXG4gICAgXG4gICAgaGlkZVJlcGx5KGRpdjpzdHJpbmcpOnZvaWQge1xuXHRcdCQoZGl2KS5vbihcImNsaWNrXCIsIFwiLm5vSGlkZVwiLCBmdW5jdGlvbigpIHtcblx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoXCJub0hpZGVcIikuYWRkQ2xhc3MoXCJoaWRlXCIpO1xuXHRcdH0pXG5cdFx0Lm9uKFwiY2xpY2tcIiwgXCIuaGlkZVwiLCBmdW5jdGlvbigpIHtcblx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpLmFkZENsYXNzKFwibm9IaWRlXCIpO1xuXHRcdH0pO1xuICAgIH1cbiAgICAvL0Nsb3NlIE1lc3NhZ2VcblxuXHRjbG9zZU1lc3NhZ2UoZXJyb3JEaXY6c3RyaW5nLCBlcnJvckJ0bjpzdHJpbmcpOnZvaWQge1xuXHRcdCQoZXJyb3JEaXYpLm9uKFwiY2xpY2tcIiwgZXJyb3JCdG4sIGZ1bmN0aW9uKCkge1xuXHRcdFx0JCh0aGlzKS5wYXJlbnQoKS5yZW1vdmUoKTtcblx0XHRcdC8vbG9jYXRpb24uaHJlZiA9IGhpc3RvcnkuZ28oLTEpO1xuXHRcdH0pO1xuXHR9XG5cblx0Ly9UYWIgU2VsZWN0XG5cblx0dGFiU2VsZWN0KElzU2Nyb2xsOmJvb2xlYW4pOnZvaWQge1xuXHRcdHZhciBzY3JvbGwgPSBJc1Njcm9sbCA/IElzU2Nyb2xsIDogZmFsc2U7XG5cblx0XHQkKFwiI3RhYkhlYWRlclwiKS5vbihcImNsaWNrXCIsIFwiLnRhYlwiLCBmdW5jdGlvbigpIHtcblx0XHRcdCQoXCIjdGFiSGVhZGVyIC50YWJTZWxlY3RlZFwiKS5yZW1vdmVDbGFzcyhcInRhYlNlbGVjdGVkXCIpLmFkZENsYXNzKFwidGFiXCIpO1xuXHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcyhcInRhYlwiKS5hZGRDbGFzcyhcInRhYlNlbGVjdGVkXCIpO1xuXHRcdFx0XG5cdFx0XHR2YXIgaW5kaWNlID0gJCh0aGlzKS5pbmRleCgpO1xuXHRcdFx0aW5kaWNlICsrO1xuXHRcdFx0XG5cdFx0XHQkKFwiI3RhYkNvbnRlbnRzIC5jb250ZW50U2hvd1wiKS5yZW1vdmVDbGFzcygnY29udGVudFNob3cnKS5hZGRDbGFzcygnY29udGVudEhpZGUnKTtcblx0XHRcdCQoXCIjdGFiQ29udGVudHMgLmNvbnRlbnRIaWRlOm50aC1vZi10eXBlKFwiICsgaW5kaWNlICsgXCIpXCIpLnJlbW92ZUNsYXNzKCdjb250ZW50SGlkZScpLmFkZENsYXNzKCdjb250ZW50U2hvdycpO1xuXHRcdH0pXG5cdFx0Lm9uKCdjbGljaycsICdkaXYnLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0aWYoc2Nyb2xsID09IHRydWUpIHtcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0JCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuXHRcdFx0XHRcdHNjcm9sbFRvcDogNDUwXG5cdFx0XHRcdH0sNTAwKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdC8vRXBpc29kZSBTZWxlY3RcblxuXHRlcGlzb2RlU2VsZWN0KGVwaXNvZGVTbGlkZXI6c3RyaW5nKTp2b2lkIHtcblx0XHQkKGVwaXNvZGVTbGlkZXIpLm9uKFwiY2xpY2tcIiwgXCIuc2Vhc29uU2VsZWN0IC5zZWFzb25TcGFuXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0JChcIiNzZWFzb25TZWxlY3RcIikucmVtb3ZlQ2xhc3MoXCJzZWFzb25TZWxlY3RcIikuYWRkQ2xhc3MoXCJzZWFzb25TZWxlY3RPcGVuXCIpO1xuXHRcdFx0JChcIi5zZWFzb25IaWRlXCIpLnJlbW92ZUNsYXNzKFwic2Vhc29uSGlkZVwiKS5hZGRDbGFzcyhcInNlYXNvblNob3dcIik7XG5cdFx0fSlcblx0XHQub24oXCJjbGlja1wiLCBcIi5zZWFzb25TZWxlY3RPcGVuIC5zZWFzb25TcGFuXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0JChcIiNzZWFzb25TZWxlY3RcIikucmVtb3ZlQ2xhc3MoXCJzZWFzb25TZWxlY3RPcGVuXCIpLmFkZENsYXNzKFwic2Vhc29uU2VsZWN0XCIpO1xuXHRcdFx0JChcIi5zZWFzb25TaG93XCIpLnJlbW92ZUNsYXNzKFwic2Vhc29uU2hvd1wiKS5hZGRDbGFzcyhcInNlYXNvbkhpZGVcIik7XG5cdFx0XHRcblx0XHRcdHZhciBpbmRpY2UgPSAkKHRoaXMpLnBhcmVudCgpO1xuXHRcdFx0aW5kaWNlLnJlbW92ZUNsYXNzKFwic2Vhc29uSGlkZVwiKS5hZGRDbGFzcyhcInNlYXNvblNob3dcIik7XG5cdFx0XHRcblx0XHRcdHZhciBpbmRpY2VTaG93ID0gJCh0aGlzKS5wYXJlbnQoKS5pbmRleCgpO1xuXHRcdFx0aW5kaWNlU2hvdyArKztcblx0XHRcdFxuXHRcdFx0JChcIiNlcGlzb2RlRGl2IC5zZWFzb25Hcm91cFNob3dcIikucmVtb3ZlQ2xhc3MoXCJzZWFzb25Hcm91cFNob3dcIikuYWRkQ2xhc3MoXCJzZWFzb25Hcm91cEhpZGVcIik7XG5cdFx0XHQkKFwiI2VwaXNvZGVEaXYgLmNvbnRlbnRHcm91cDpudGgtb2YtdHlwZShcIiArIGluZGljZVNob3cgKyBcIilcIikucmVtb3ZlQ2xhc3MoXCJzZWFzb25Hcm91cEhpZGVcIikuYWRkQ2xhc3MoXCJzZWFzb25Hcm91cFNob3dcIik7XG5cdFx0XHRcblx0XHRcdGlmKCQoXCIjZXBpc29kZURpdiAuY29udGVudEdyb3VwOm50aC1vZi10eXBlKFwiICsgaW5kaWNlU2hvdyArIFwiKVwiKS53aWR0aCgpID4gJChcIiNlcGlzb2RlRGl2XCIpLndpZHRoKCkpIHtcblx0XHRcdFx0JChcIiNlcGlzb2RlRGl2XCIpLmZpbmQoJy5uZXh0SGlkZScpLnJlbW92ZUNsYXNzKCduZXh0SGlkZScpLmFkZENsYXNzKCduZXh0U2hvdycpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdCQoXCIjZXBpc29kZURpdlwiKS5maW5kKCcubmV4dFNob3cnKS5yZW1vdmVDbGFzcygnbmV4dFNob3cnKS5hZGRDbGFzcygnbmV4dEhpZGUnKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vRXBpc29kZSBTZWxlY3QgQ2xvc2VcblxuXHRcdCQoZXBpc29kZVNsaWRlcikub24oXCJtb3VzZWxlYXZlXCIsIFwiLnNlYXNvblNlbGVjdE9wZW5cIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgaW5kZXhDbG9zZSA9ICQoXCIjZXBpc29kZURpdiAuc2Vhc29uR3JvdXBTaG93XCIpLmluZGV4KCk7XG5cdFx0XHRpbmRleENsb3NlKys7XG5cblx0XHRcdCQoXCIjc2Vhc29uU2VsZWN0XCIpLnJlbW92ZUNsYXNzKFwic2Vhc29uU2VsZWN0T3BlblwiKS5hZGRDbGFzcyhcInNlYXNvblNlbGVjdFwiKTtcblx0XHRcdCQoXCIuc2Vhc29uU2hvd1wiKS5yZW1vdmVDbGFzcyhcInNlYXNvblNob3dcIikuYWRkQ2xhc3MoXCJzZWFzb25IaWRlXCIpO1xuXHRcdFx0JChcIi5zZWFzb25IaWRlOm50aC1vZi10eXBlKFwiICsgaW5kZXhDbG9zZSArIFwiKVwiKS5yZW1vdmVDbGFzcyhcInNlYXNvbkhpZGVcIikuYWRkQ2xhc3MoXCJzZWFzb25TaG93XCIpO1xuXHRcdH0pO1xuXHR9XG5cdFxuXHRkaXNhYmxlRW5hYmxlKCk6dm9pZCB7XG5cdFx0JChcIiNjb21tZW50SW5wdXRcIikua2V5dXAoZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgY29tbWVudEJlZm9yZSA9ICQodGhpcykudmFsKCk7XG5cdFx0XHR2YXIgY2hlY2tDb21tZW50QmVmb3JlID0gKGNvbW1lbnRCZWZvcmUgYXMgYW55KS50cmltKCk7XG5cblx0XHRcdGlmKGNoZWNrQ29tbWVudEJlZm9yZSA9PSAnJykge1xuXHRcdFx0XHQvLyQoJyNjb21tZW50U3VibWl0JykuYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcblx0XHRcdFx0JCgnI2NvbW1lbnRTdWJtaXQnKS5hdHRyKCdkaXNhYmxlZCcpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdCQoJyNjb21tZW50U3VibWl0JykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufSIsIi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmNsYXNzIFBhcmFsbGF4IHtcbiAgICAvL0VmZmVjdCBvZiBleHRlcm5hbCBpbmRleFxuXG5cdHBhcmFsbGF4SG9tZSgpOnZvaWQge1xuXHRcdHZhciBwYXJhbGxheE91dDpzdHJpbmcgPSAnI2Rlc2NJbWFnZSA+IGltZyc7XG5cdFx0dmFyIHBhcmFsbGF4SW46c3RyaW5nID0gJyNjb250ZW50U2xpZGVyID4gYXJ0aWNsZSA+IGRpdiA+IGltZyc7XG5cblx0XHRpZiAoJChkb2N1bWVudCkuc2Nyb2xsVG9wKCkgPCA0NTApIHtcblx0XHRcdCQocGFyYWxsYXhPdXQpLmNzcyhcInRvcFwiICwgKHdpbmRvdy5wYWdlWU9mZnNldCAvIDIpICsgJ3B4Jyk7XG5cdFx0XHQkKHBhcmFsbGF4SW4pLmNzcyhcInRvcFwiICwgKHdpbmRvdy5wYWdlWU9mZnNldCAvIDIpICsgJ3B4Jyk7XG5cdFx0fVxuXHR9XG5cblx0cGFyYWxsYXhIZWFkZXJVc2VyKCk6dm9pZCB7XG5cdFx0Ly9FZmZlY3Qgb2YgaGVhZGVyIG9mIHByb2ZpbGUgcGFnZVxuXG5cdFx0dmFyIGltZ0RpdiA9ICQoJyN1c2VySGVhZGVySW1nJyk7XG5cblx0XHRpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA8IDIxMCkge1xuXHRcdFx0JChpbWdEaXYpLmNzcyhcInRvcFwiICwgKHdpbmRvdy5wYWdlWU9mZnNldCAvIDIuNikgKyAncHgnKTtcblx0XHR9XG5cblx0XHQvL0NoYW5nZSBjbGFzcyBvZiBoZWFkZXIgb2YgcHJvZmlsZSBwYWdlXG5cblx0XHR2YXIgdXNlckhlYWRlciA9ICQoJyN1c2VySGVhZGVyJyk7XG5cdFx0dmFyIHVzZXJIZWFkZXJJbWcgPSAkKCcjdXNlckhlYWRlckltZycpO1xuXG5cdFx0aWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPj0gMjEwKSB7XG5cdFx0XHR1c2VySGVhZGVyLnJlbW92ZUNsYXNzKCd1c2VySGVhZGVyJyk7XG5cdFx0XHR1c2VySGVhZGVyLmFkZENsYXNzKCd1c2VySGVhZGVyRml4ZWQnKTtcblx0XHRcdHVzZXJIZWFkZXJJbWcucmVtb3ZlQ2xhc3MoJ3VzZXJIZWFkZXJJbWcnKTtcblx0XHRcdHVzZXJIZWFkZXJJbWcuYWRkQ2xhc3MoJ3VzZXJIZWFkZXJJbWdGaXhlZCcpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHVzZXJIZWFkZXIucmVtb3ZlQ2xhc3MoJ3VzZXJIZWFkZXJGaXhlZCcpO1xuXHRcdFx0dXNlckhlYWRlci5hZGRDbGFzcygndXNlckhlYWRlcicpO1xuXHRcdFx0dXNlckhlYWRlckltZy5yZW1vdmVDbGFzcygndXNlckhlYWRlckltZ0ZpeGVkJyk7XG5cdFx0XHR1c2VySGVhZGVySW1nLmFkZENsYXNzKCd1c2VySGVhZGVySW1nJyk7XG5cdFx0fVxuXHR9XG5cblx0cGFyYWxsYXhJbWcoKTp2b2lkIHtcblx0XHQvL0VmZmVjdCBvZiB1c2VyIGltYWdlIG9mIHByb2ZpbGUgcGFnZVxuXG5cdFx0dmFyIGltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VySW1nRmlndXJlJyk7XG5cblx0XHRpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA8IDIxMCkge1xuXHRcdFx0aW1nLnN0eWxlLndpZHRoID0gKDE1MCAtICQodGhpcykuc2Nyb2xsVG9wKCkgLyAyLjEpICsgJ3B4Jztcblx0XHRcdGltZy5zdHlsZS5oZWlnaHQgPSAoMTUwIC0gJCh0aGlzKS5zY3JvbGxUb3AoKSAvIDIuMSkgKyAncHgnO1xuXHRcdFx0aW1nLnN0eWxlLmxlZnQgPSAoMCArICQodGhpcykuc2Nyb2xsVG9wKCkgLyA0LjIpICsgJ3B4Jztcblx0XHRcdGltZy5zdHlsZS50b3AgPSAoLTEyMCArICQodGhpcykuc2Nyb2xsVG9wKCkgLyA1LjIpICsgJ3B4Jztcblx0XHR9XG5cblx0XHQvL0NoYW5nZSBjbGFzcyBvZiB1c2VyIGltYWdlIG9mIHByb2ZpbGUgcGFnZVxuXG5cdFx0dmFyIHVzZXJJbWcgPSAkKCcjdXNlckltZ0ZpZ3VyZScpO1xuXG5cdFx0aWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPj0gMjEwKSB7XG5cdFx0XHR1c2VySW1nLnJlbW92ZUNsYXNzKCd1c2VySW1nRmlndXJlJyk7XG5cdFx0XHR1c2VySW1nLmFkZENsYXNzKCd1c2VySW1nRmlndXJlRml4ZWQnKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR1c2VySW1nLnJlbW92ZUNsYXNzKCd1c2VySW1nRmlndXJlRml4ZWQnKTtcblx0XHRcdHVzZXJJbWcuYWRkQ2xhc3MoJ3VzZXJJbWdGaWd1cmUnKTtcblx0XHR9XG5cdH1cblxuXHRwYXJhbGxheE5hbWUoKTp2b2lkIHtcblx0XHQvL0VmZmVjdCBvZiB1c2VyIG5hbWUgb2YgcHJvZmlsZSBwYWdlXG5cblx0XHR2YXIgbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyTmFtZURpdicpO1xuXG5cdFx0aWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPCAyMTApIHtcblx0XHRcdG5hbWUuc3R5bGUubGVmdCA9ICgyMjAgLSAkKHRoaXMpLnNjcm9sbFRvcCgpIC8gMy43NSkgKyAncHgnO1xuXHRcdH1cblxuXHRcdC8vQ2hhbmdlIGNsYXNzIG9mIHVzZXIgbmFtZSBkaXZcblxuXHRcdHZhciB1c2VyTmFtZSA9ICQoJyN1c2VyTmFtZURpdicpO1xuXG5cdFx0aWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPj0gMjEwKSB7XG5cdFx0XHR1c2VyTmFtZS5yZW1vdmVDbGFzcygndXNlck5hbWVEaXYnKTtcblx0XHRcdHVzZXJOYW1lLmFkZENsYXNzKCd1c2VyTmFtZURpdkZpeGVkJyk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dXNlck5hbWUucmVtb3ZlQ2xhc3MoJ3VzZXJOYW1lRGl2Rml4ZWQnKTtcblx0XHRcdHVzZXJOYW1lLmFkZENsYXNzKCd1c2VyTmFtZURpdicpO1xuXHRcdH1cblx0fVxuXG5cdHBvc3RlclBhcmFsYXgoaW1hZ2U6c3RyaW5nKTp2b2lkIHtcblx0XHR2YXIgJHBvc3RlciA9ICQoaW1hZ2UpO1xuXHRcdHZhciAkc2hpbmUgPSAkcG9zdGVyLmZpbmQoJy5zaGluZScpO1xuXHRcdHZhciAkbGF5ZXIgPSAkcG9zdGVyLmZpbmQoJypbY2xhc3MqPVwibGF5ZXItXCJdJyk7XG5cdFx0dmFyIHcgPSAkcG9zdGVyLndpZHRoKCk7XG5cdFx0dmFyIGggPSAkcG9zdGVyLmhlaWdodCgpO1xuXG5cdFx0JHBvc3Rlci5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24oZSkge1xuXHRcdFx0JCgnLm1haW5TZWN0aW9uJykuY3NzKHtcblx0XHRcdFx0J3RyYW5zZm9ybS1zdHlsZSc6ICdwcmVzZXJ2ZS0zZCcsXG5cdFx0XHRcdCd0cmFuc2Zvcm0nOiAncGVyc3BlY3RpdmUoMTAwMHB4KSdcblx0XHRcdH0pLFxuXHRcdFx0JCgnI2ltYWdlQmFjaycpLmNzcyh7XG5cdFx0XHRcdCd0b3AnOiAnMCdcblx0XHRcdH0pO1xuXG5cdFx0XHQvL3ZhciBvZmZzZXRYID0gMC41IC0gZS5wYWdlWCAvIHc7IC8vIGN1cnNvciBob3Jcblx0XHRcdC8vdmFyIG9mZnNldFkgPSAwLjUgLSBlLnBhZ2VZIC8gaDsgLy8gY3Vyc29yIHZlcnRcblx0XHRcdHZhciBvZmZzZXRYID0gMC41IC0gZS5wYWdlWCAvIHc7IC8vIGN1cnNvciBob3Jcblx0XHRcdHZhciBvZmZzZXRZID0gMC41IC0gZS5wYWdlWSAvIGg7IC8vIGN1cnNvciB2ZXJ0XG5cdFx0XHR2YXIgZHggPSBlLnBhZ2VYIC0gdyAvIDI7IC8vIHBvc3RlciBjZW50ZXIgaG9yXG5cdFx0XHR2YXIgZHkgPSBlLnBhZ2VZIC0gaCAvIDI7IC8vIHBvc3RlciBjZW50ZXIgdmVydFxuXHRcdFx0dmFyIHRoZXRhID0gTWF0aC5hdGFuMihkeSwgZHgpOyAvLyBhbmdsZSBiL3cgY3Vyc29yIGFuZCBwb3N0ZXIgY2VudGVyIGluIFJBRFxuXHRcdFx0dmFyIGFuZ2xlID0gdGhldGEgKiAxODAgLyBNYXRoLlBJIC0gOTA7IC8vIGNvbnZlcnQgcmFkIHRvIGRlZ3JlZXNcblx0XHRcdHZhciBvZmZzZXRQb3N0ZXIgPSAkcG9zdGVyLmRhdGEoJ29mZnNldCcpO1xuXHRcdFx0dmFyIHRyYW5zZm9ybVBvc3RlciA9ICd0cmFuc2xhdGVZKCcgKyAtb2Zmc2V0WCAqIG9mZnNldFBvc3RlciArICdweCkgcm90YXRlWCgnICsgKC1vZmZzZXRZICogb2Zmc2V0UG9zdGVyKSArICdkZWcpIHJvdGF0ZVkoJyArIChvZmZzZXRYICogKG9mZnNldFBvc3RlciAqIDIpKSArICdkZWcpJztcblx0XHRcdCRwb3N0ZXIuY3NzKCd0cmFuc2Zvcm0nLCB0cmFuc2Zvcm1Qb3N0ZXIpO1xuXG5cdFx0XHRpZiAoYW5nbGUgPCAwKSB7XG5cdFx0XHRcdGFuZ2xlID0gYW5nbGUgKyAzNjA7XG5cdFx0XHR9XG5cblx0XHRcdCRzaGluZS5jc3MoJ2JhY2tncm91bmQnLCAnbGluZWFyLWdyYWRpZW50KCcgKyBhbmdsZSArICdkZWcsIHJnYmEoMCwgMCwgMCwnICsgZS5wYWdlWSAvIGggKyAnKSAwJSxyZ2JhKDAsIDAsIDAsIDApIDgwJSknKTtcblx0XHRcdFxuXHRcdFx0JGxheWVyLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyk7XG5cdFx0XHRcdHZhciBvZmZzZXRMYXllciA9ICR0aGlzLmRhdGEoJ29mZnNldCcpIHx8IDA7XG5cdFx0XHRcdHZhciB0cmFuc2Zvcm1MYXllciA9ICd0cmFuc2xhdGVYKCcgKyBvZmZzZXRYICogb2Zmc2V0TGF5ZXIgKyAncHgpIHRyYW5zbGF0ZVkoJyArIG9mZnNldFkgKiBvZmZzZXRMYXllciArICdweCknO1xuXHRcdFx0XHRcblx0XHRcdFx0JHRoaXMuY3NzKCd0cmFuc2Zvcm0nLCB0cmFuc2Zvcm1MYXllcik7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxufSIsIi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmNsYXNzIFNsaWRlIHtcbiAgICBzbGlkZUluZGV4KCk6dm9pZCB7XG5cdFx0aWYoJCh0aGlzKS5zY3JvbGxUb3AoKSA8IDIwMCkge1xuXHRcdFx0aWYoKCQoJy5pbWFnZVNob3cnKSBhcyBhbnkpLm5leHQoKS5zaXplKCkpIHtcblx0XHRcdFx0JCgnLmltYWdlU2hvdycpLnJlbW92ZUNsYXNzKCdpbWFnZVNob3cnKS5hZGRDbGFzcygnaW1hZ2VIaWRlJykubmV4dCgpLnJlbW92ZUNsYXNzKCdpbWFnZUhpZGUnKS5hZGRDbGFzcygnaW1hZ2VTaG93Jyk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0KCQoJy5pbWFnZVNob3cnKSBhcyBhbnkpLnJlbW92ZUNsYXNzKCdpbWFnZVNob3cnKS5hZGRDbGFzcygnaW1hZ2VIaWRlJyk7XG5cdFx0XHRcdCQoJyNjb250ZW50U2xpZGVyICNpbWFnZURpdiBkaXY6bnRoLW9mLXR5cGUoMSknKS5yZW1vdmVDbGFzcygnaW1hZ2VIaWRlJykuYWRkQ2xhc3MoJ2ltYWdlU2hvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZigoJCgnLmNoYW5nZVNob3cnKSBhcyBhbnkpLm5leHQoKS5zaXplKCkpIHtcblx0XHRcdFx0JCgnLmNoYW5nZVNob3cnKS5yZW1vdmVDbGFzcygnY2hhbmdlU2hvdycpLmFkZENsYXNzKCdjaGFuZ2VIaWRlJykubmV4dCgpLnJlbW92ZUNsYXNzKCdjaGFuZ2VIaWRlJykuYWRkQ2xhc3MoJ2NoYW5nZVNob3cnKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHQkKCcuY2hhbmdlU2hvdycpLnJlbW92ZUNsYXNzKCdjaGFuZ2VTaG93JykuYWRkQ2xhc3MoJ2NoYW5nZUhpZGUnKTtcblx0XHRcdFx0JCgnI2NvbnRlbnRTbGlkZXIgI2NoYW5nZURpdiBkaXY6bnRoLW9mLXR5cGUoMSknKS5yZW1vdmVDbGFzcygnY2hhbmdlSGlkZScpLmFkZENsYXNzKCdjaGFuZ2VTaG93Jyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Y2hhbmdlSW5kZXgoc2xpZGVyOnN0cmluZyk6dm9pZCB7XG5cdFx0Ly9JbmRleCBidXR0b25zXG5cblx0XHQkKHNsaWRlcikub24oJ2NsaWNrJywgJy5jaGFuZ2VIaWRlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHQvL2NsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XG5cblx0XHRcdCQoJy5jaGFuZ2VTaG93JykucmVtb3ZlQ2xhc3MoJ2NoYW5nZVNob3cnKS5hZGRDbGFzcygnY2hhbmdlSGlkZScpO1xuXHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygnY2hhbmdlSGlkZScpLmFkZENsYXNzKCdjaGFuZ2VTaG93Jyk7XG5cblx0XHRcdHZhciBpbmRpY2UgPSAkKHRoaXMpLmluZGV4KCk7XG5cdFx0XHRpbmRpY2UgKys7XG5cblx0XHRcdCQoJyNpbWFnZURpdiAuaW1hZ2VTaG93JykucmVtb3ZlQ2xhc3MoJ2ltYWdlU2hvdycpLmFkZENsYXNzKCdpbWFnZUhpZGUnKTtcblx0XHRcdCQoJyNpbWFnZURpdiBkaXY6bnRoLW9mLXR5cGUoJyArIGluZGljZSArICcpJykucmVtb3ZlQ2xhc3MoJ2ltYWdlSGlkZScpLmFkZENsYXNzKCdpbWFnZVNob3cnKTtcblx0XHR9KTtcblxuXHRcdC8vUHJldmlvdXMgYnV0dG9uXG5cblx0XHQkKHNsaWRlcikub24oJ2NsaWNrJywgJyNwcmV2aW91c0ltYWdlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHQvL2NsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XG5cblx0XHRcdGlmKCgkKCcuaW1hZ2VTaG93JykgYXMgYW55KS5wcmV2KCkuc2l6ZSgpKSB7XG5cdFx0XHRcdCQoJy5pbWFnZVNob3cnKS5yZW1vdmVDbGFzcygnaW1hZ2VTaG93JykuYWRkQ2xhc3MoJ2ltYWdlSGlkZScpLnByZXYoKS5yZW1vdmVDbGFzcygnaW1hZ2VIaWRlJykuYWRkQ2xhc3MoJ2ltYWdlU2hvdycpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdCQoJy5pbWFnZVNob3cnKS5yZW1vdmVDbGFzcygnaW1hZ2VTaG93JykuYWRkQ2xhc3MoJ2ltYWdlSGlkZScpO1xuXHRcdFx0XHQkKCcjY29udGVudFNsaWRlciAjaW1hZ2VEaXYgZGl2Omxhc3QtY2hpbGQnKS5yZW1vdmVDbGFzcygnaW1hZ2VIaWRlJykuYWRkQ2xhc3MoJ2ltYWdlU2hvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgaW5kaWNlID0gJCh0aGlzKS5wYXJlbnQoKS5maW5kKCcjaW1hZ2VEaXYgLmltYWdlU2hvdycpLmluZGV4KCcjaW1hZ2VEaXYgZGl2Jyk7XG5cdFx0XHRpbmRpY2UgKys7XG5cblx0XHRcdCQoJyNjaGFuZ2VEaXYgZGl2JykucmVtb3ZlQ2xhc3MoJ2NoYW5nZVNob3cnKS5hZGRDbGFzcygnY2hhbmdlSGlkZScpO1xuXHRcdFx0JCgnI2NoYW5nZURpdiBkaXY6bnRoLW9mLXR5cGUoJyArIGluZGljZSArICcpJykucmVtb3ZlQ2xhc3MoJ2NoYW5nZUhpZGUnKS5hZGRDbGFzcygnY2hhbmdlU2hvdycpO1xuXHRcdH0pO1xuXG5cdFx0Ly9OZXh0IGJ1dHRvblxuXG5cdFx0JChzbGlkZXIpLm9uKCdjbGljaycsICcjbmV4dEltYWdlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHQvL2NsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XG5cblx0XHRcdGlmKCgkKCcuaW1hZ2VTaG93JykgYXMgYW55KS5uZXh0KCkuc2l6ZSgpKSB7XG5cdFx0XHRcdCQoJy5pbWFnZVNob3cnKS5yZW1vdmVDbGFzcygnaW1hZ2VTaG93JykuYWRkQ2xhc3MoJ2ltYWdlSGlkZScpLm5leHQoKS5yZW1vdmVDbGFzcygnaW1hZ2VIaWRlJykuYWRkQ2xhc3MoJ2ltYWdlU2hvdycpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdCQoJy5pbWFnZVNob3cnKS5yZW1vdmVDbGFzcygnaW1hZ2VTaG93JykuYWRkQ2xhc3MoJ2ltYWdlSGlkZScpO1xuXHRcdFx0XHQkKCcjY29udGVudFNsaWRlciAjaW1hZ2VEaXYgZGl2Om50aC1vZi10eXBlKDEpJykucmVtb3ZlQ2xhc3MoJ2ltYWdlSGlkZScpLmFkZENsYXNzKCdpbWFnZVNob3cnKTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGluZGljZSA9ICQodGhpcykucGFyZW50KCkuZmluZCgnI2ltYWdlRGl2IC5pbWFnZVNob3cnKS5pbmRleCgnI2ltYWdlRGl2IGRpdicpO1xuXHRcdFx0aW5kaWNlICsrO1xuXG5cdFx0XHQkKCcjY2hhbmdlRGl2IGRpdicpLnJlbW92ZUNsYXNzKCdjaGFuZ2VTaG93JykuYWRkQ2xhc3MoJ2NoYW5nZUhpZGUnKTtcblx0XHRcdCQoJyNjaGFuZ2VEaXYgZGl2Om50aC1vZi10eXBlKCcgKyBpbmRpY2UgKyAnKScpLnJlbW92ZUNsYXNzKCdjaGFuZ2VIaWRlJykuYWRkQ2xhc3MoJ2NoYW5nZVNob3cnKTtcblx0XHR9KTtcblx0fVxufSJdfQ==
