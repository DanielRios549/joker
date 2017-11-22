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
    var IndexEvents = new Index();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cGVzY3JpcHQvam9rZXJTY3JpcHQudHMiLCJ0eXBlc2NyaXB0L2NsYXNzZXMvY29uZmlnLmNsYXNzLnRzIiwidHlwZXNjcmlwdC9wYWdlcy9hZG1pbi50cyIsInR5cGVzY3JpcHQvcGFnZXMvaW5kZXgudHMiLCJ0eXBlc2NyaXB0L3BhZ2VzL2xvZ2luLnRzIiwidHlwZXNjcmlwdC9jbGFzc2VzL2FkbWluL21lbnUuY2xhc3MudHMiLCJ0eXBlc2NyaXB0L2NsYXNzZXMvYWRtaW4vb3RoZXJzLmNsYXNzLnRzIiwidHlwZXNjcmlwdC9jbGFzc2VzL2FqYXgvYWpheC5jbGFzcy50cyIsInR5cGVzY3JpcHQvY2xhc3Nlcy9hamF4L2NvbW1lbnRzLmNsYXNzLnRzIiwidHlwZXNjcmlwdC9jbGFzc2VzL2FqYXgvZGV0YWlscy5jbGFzcy50cyIsInR5cGVzY3JpcHQvY2xhc3Nlcy9hamF4L2ZvbGxvdy5jbGFzcy50cyIsInR5cGVzY3JpcHQvY2xhc3Nlcy9hamF4L3dhdGNobGlzdC5jbGFzcy50cyIsInR5cGVzY3JpcHQvY2xhc3Nlcy91c2VyL2xvZ2luLmNsYXNzLnRzIiwidHlwZXNjcmlwdC9jbGFzc2VzL3VzZXIvb3RoZXJzLmNsYXNzLnRzIiwidHlwZXNjcmlwdC9jbGFzc2VzL3VzZXIvcGFyYWxsYXguY2xhc3MudHMiLCJ0eXBlc2NyaXB0L2NsYXNzZXMvdXNlci9zbGlkZS5jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7RUFLRTtBQUVGLG9DQUFvQztBQUVwQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ2QsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUU7UUFDbkIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FB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Q0E3RUEsQUE2RUMsSUFBQSIsImZpbGUiOiJqb2tlclNjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbi8vQ2hhbmdlIGNsYXNzIG9mIGhlYWRlciBvZiBhbGwgcGFnZVxuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdG9wRGl2ID0gJCgnI3RvcERpdicpO1xuXG4gICAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID49IDMwMCkge1xuICAgICAgICAgICAgdG9wRGl2LnJlbW92ZUNsYXNzKCd0b3BEaXYnKS5hZGRDbGFzcygndG9wRGl2Rml4ZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRvcERpdi5yZW1vdmVDbGFzcygndG9wRGl2Rml4ZWQnKS5hZGRDbGFzcygndG9wRGl2Jyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoJyNmb290ZXInKS5vbihcImNsaWNrXCIsIFwiI3RvcERpdlwiLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICBzY3JvbGxUb3A6IDBcbiAgICAgICAgfSw1MDApO1xuICAgIH0pO1xuICAgIHZhciBJbmRleEV2ZW50cyA9IG5ldyBJbmRleCgpO1xufSk7XG4iLCIvKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG5jbGFzcyBDb25maWcge1xuICAgIHB1YmxpYyBiYXNlVXJsOnN0cmluZyA9ICQoJ2hlYWQnKS5hdHRyKCdkYXRhLXVybCcpO1xuICAgIHB1YmxpYyBjb29raWVJZDpzdHJpbmcgPSAkKCdoZWFkJykuYXR0cignZGF0YS1jb29raWUnKTtcbiAgICBcbiAgICAvL3ZhciBpbnRlcnZhbExvZ29mZjpudW1iZXIgPSBzZXRJbnRlcnZhbCh1c2VyU2NyaXB0LnNlY3VyZUxvZ29mZihiYXNlVXJsKSwgMjUwKTtcbn0iLCIvKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAvL2FkbWluU2NyaXB0LnRvZ2dsZU1lbnUoXCIjaGVhZGVyXCIpO1xuICAgIC8vYWRtaW5TY3JpcHQubWVudUFjY29yZGlvbihcIi5tZW51T3BlbmVkXCIpO1xuICAgIFxuICAgIC8vRHluYW1pYyBtaW5pbXVtIHBhZ2UgaGVpZ2h0XG4gICAgXG4gICAgJChcImJvZHkgPiBzZWN0aW9uXCIpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICAgICAkKFwiLmludGVyZmFjZVwiKS5jc3MoJ21pbi1oZWlnaHQnICwgKCQoZG9jdW1lbnQpLmhlaWdodCgpIC0gNzApICsgJ3B4Jyk7XG4gICAgfSk7XG4gICAgJChcIiNoZWFkZXJcIikub24oJ2NsaWNrJywgJyNzZXR0aW5nc09wZW4nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnI2NvbmZpZ0JhcicpLnRvZ2dsZUNsYXNzKCdjb25maWdCYXJPcGVuJyk7XG4gICAgfSk7XG59KTsiLCIvKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG5jbGFzcyBJbmRleCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHZhciBwYXJhbGxheCA9IG5ldyBQYXJhbGxheCgpO1xuICAgICAgICB2YXIgc2xpZGUgPSBuZXcgU2xpZGUoKTtcbiAgICAgICAgdmFyIHdhdGNobGlzdCA9IG5ldyBXYXRjaGxpc3QoKTtcbiAgICAgICAgdmFyIGRldGFpbHMgPSBuZXcgRGV0YWlscygpO1xuICAgICAgICB2YXIgdXNlck90aGVycyA9IG5ldyBVc2VyT3RoZXJzKCk7XG5cbiAgICAgICAgLy9Ob3QgY29ubmVjdGVkXG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcGFyYWxsYXgucGFyYWxsYXhIb21lKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHVzZXJPdGhlcnMudGFiU2VsZWN0KHRydWUpO1xuXG4gICAgICAgIC8vQ29ubmVjdGVkXG5cbiAgICAgICAgaWYoJCgnI2NvbnRlbnRTbGlkZXIgI2NoYW5nZURpdicpLmxlbmd0aCkge1xuICAgICAgICAgICAgLy92YXIgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKHNsaWRlLnNsaWRlSW5kZXgsIDUwMDApO1xuXG4gICAgICAgICAgICBzbGlkZS5jaGFuZ2VJbmRleCgnI2NvbnRlbnRTbGlkZXInKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJyNpbWFnZURpdiBkaXYnKS5vbignY2xpY2snLCAnLmFkZFdhdGNoTGlzdCcsIHdhdGNobGlzdC5hZGRXYXRjaExpc3RJbmRleCk7XG4gICAgICAgICQoJyNpbWFnZURpdiBkaXYnKS5vbignY2xpY2snLCAnLnJlbW92ZVdhdGNoTGlzdCcsIHdhdGNobGlzdC5yZW1vdmVXYXRjaExpc3RJbmRleCk7XG5cbiAgICAgICAgJCgnLmNvbnRlbnRHcm91cFNjcm9sbCcpLm9uKCdjbGljaycsICcuY29udGVudCAuYWRkV2F0Y2hMaXN0Jywgd2F0Y2hsaXN0LmFkZFdhdGNoTGlzdEluZGV4KTtcbiAgICAgICAgJCgnLmNvbnRlbnRHcm91cFNjcm9sbCcpLm9uKCdjbGljaycsICcuY29udGVudCAucmVtb3ZlV2F0Y2hMaXN0Jywgd2F0Y2hsaXN0LnJlbW92ZVdhdGNoTGlzdEluZGV4KTtcblxuICAgICAgICAkKCcuY29udGVudEdyb3VwU2Nyb2xsJykub24oJ2NsaWNrJywgJy5jb250ZW50JywgZGV0YWlscy5zaG93RGV0YWlscyk7XG4gICAgICAgICQoJy5jb250ZW50Q29udGFpbmVyJykub24oJ2NsaWNrJywgJy5jbG9zZUJ1dHRvbicsIGRldGFpbHMuY2xvc2VEZXRhaWxzKTtcbiAgICB9XG59IiwiLypcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiB8IENvcHlyaWdodCAoYykgMjAxNC0yMDE1IEF0b21vLmNvbS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiB8IEAgQXV0aG9yXHQ6IERhbmllbCBSaW9zLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKi9cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgLy9DbG9zZSB0aGUgbWVzc2FnZSBkaXNwbGF5ZWQgd2hlbiBoYXMgc29tZSBlcnJvclxuXG4gICAgdmFyIG90aGVycyA9IG5ldyBVc2VyT3RoZXJzKCk7XG4gICAgdmFyIGxvZ2luID0gbmV3IExvZ2luKCk7XG5cbiAgICBsb2dpbi5pbnB1dEVycm9yKCcudXNlckRpdicpO1xuICAgIG90aGVycy5jbG9zZU1lc3NhZ2UoJy51c2VyRXJyb3InLCAnI2Vycm9yTXNnQ2xvc2UnKTtcbn0pOyIsIi8qIFxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG5jbGFzcyBBZG1pbk1lbnUge1xuICAgIC8vU2V0IHRoZSBtZW51IG9wZW4gYW5kIGNsb3NlXG5cblx0dG9nZ2xlTWVudShoZWFkZXI6c3RyaW5nKTp2b2lkIHtcblx0XHQkKGhlYWRlcikub24oXCJjbGlja1wiLCBcIi5jbG9zZU1lbnVcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKFwiY2xvc2VNZW51XCIpLmFkZENsYXNzKFwib3Blbk1lbnVcIik7XG5cdFx0XHQkKFwiLm1lbnVPcGVuZWRcIikucmVtb3ZlQ2xhc3MoXCJtZW51T3BlbmVkXCIpLmFkZENsYXNzKFwibWVudUNsb3NlZFwiKTtcblx0XHRcdCQoXCJzZWN0aW9uW2lkJD0nSW50ZXJmYWNlJ11cIikucmVtb3ZlQ2xhc3MoXCJib2R5TWVudU9wZW5lZFwiKS5hZGRDbGFzcyhcImJvZHlNZW51Q2xvc2VkXCIpO1xuXHRcdH0pO1xuXHRcdCQoaGVhZGVyKS5vbihcImNsaWNrXCIsIFwiLm9wZW5NZW51XCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcyhcIm9wZW5NZW51XCIpLmFkZENsYXNzKFwiY2xvc2VNZW51XCIpO1xuXHRcdFx0JChcIi5tZW51Q2xvc2VkXCIpLnJlbW92ZUNsYXNzKFwibWVudUNsb3NlZFwiKS5hZGRDbGFzcyhcIm1lbnVPcGVuZWRcIik7XG5cdFx0XHQkKFwic2VjdGlvbltpZCQ9J0ludGVyZmFjZSddXCIpLnJlbW92ZUNsYXNzKFwiYm9keU1lbnVDbG9zZWRcIikuYWRkQ2xhc3MoXCJib2R5TWVudU9wZW5lZFwiKTtcblx0XHR9KTtcblx0fVxuXG5cdC8vTWVudSBhY2NvcmRpb25cblxuXHRtZW51QWNjb3JkaW9uKG1lbnU6c3RyaW5nKTp2b2lkIHtcblx0XHQkKG1lbnUpLmZpbmQoXCIjdWxNZW51ID4gLml0ZW1NZW51ID4gLnN1Yk1lbnVJdGVtc1wiKS5oaWRlKCk7XG5cblx0XHQkKG1lbnUpLm9uKFwiY2xpY2tcIiwgXCIjdWxNZW51IC5pdGVtTWVudU9wZW5cIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHQkKHRoaXMpLmZpbmQoXCIuc3ViTWVudUl0ZW1zXCIpLnNsaWRlVXAoXCJub3JtYWxcIik7XG5cdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKFwiaXRlbU1lbnVPcGVuXCIpLmFkZENsYXNzKFwiaXRlbU1lbnVDbG9zZVwiKTtcblx0XHR9KTtcblx0XHRcblx0XHQkKG1lbnUpLm9uKFwiY2xpY2tcIiwgXCIjdWxNZW51IC5pdGVtTWVudUNsb3NlXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0JChcIiN1bE1lbnUgPiBsaVwiKS5maW5kKFwiLnN1Yk1lbnVJdGVtc1wiKS5zbGlkZVVwKFwibm9ybWFsXCIpO1xuXHRcdFx0JChcIiN1bE1lbnUgPiBsaVwiKS5uZXh0KCkucmVtb3ZlQ2xhc3MoXCJpdGVtTWVudU9wZW5cIikuYWRkQ2xhc3MoXCJpdGVtTWVudUNsb3NlXCIpO1xuXHRcdFx0XG5cdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKFwiaXRlbU1lbnVDbG9zZVwiKS5hZGRDbGFzcyhcIml0ZW1NZW51T3BlblwiKTtcblx0XHRcdCQodGhpcykuZmluZChcIi5zdWJNZW51SXRlbXNcIikuc2xpZGVEb3duKFwibm9ybWFsXCIpO1xuXHRcdH0pO1xuXHR9XG59IiwiLyogXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmNsYXNzIEFkbWluT3RoZXJzIHtcbiAgICAvL1Nob3cgdGhlIGFkdmFuY2VkIG9wdGlvbnNcblxuXHRhZHZhbmNlZE9wdGlvbnMoYnV0dG9uOnN0cmluZywgc2hvdzpzdHJpbmcpOnZvaWQge1xuXHRcdCQoYnV0dG9uKS5vbihcImNsaWNrXCIsIFwiLnNlYXJjaEFkdmFuY2VkQ2xvc2VcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKFwic2VhcmNoQWR2YW5jZWRDbG9zZVwiKS5hZGRDbGFzcyhcInNlYXJjaEFkdmFuY2VkT3BlblwiKTtcblx0XHRcdCQoc2hvdykucmVtb3ZlQ2xhc3MoXCJhZHZhbmNlZFNlYXJjaEhpZGVcIikuYWRkQ2xhc3MoXCJhZHZhbmNlZFNlYXJjaFNob3dcIik7XG5cdFx0fSk7XG5cdFx0XG5cdFx0JChidXR0b24pLm9uKFwiY2xpY2tcIiwgXCIuc2VhcmNoQWR2YW5jZWRPcGVuXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcyhcInNlYXJjaEFkdmFuY2VkT3BlblwiKS5hZGRDbGFzcyhcInNlYXJjaEFkdmFuY2VkQ2xvc2VcIik7XG5cdFx0XHQkKHNob3cpLnJlbW92ZUNsYXNzKFwiYWR2YW5jZWRTZWFyY2hTaG93XCIpLmFkZENsYXNzKFwiYWR2YW5jZWRTZWFyY2hIaWRlXCIpO1xuXHRcdH0pO1xuXHR9XG5cblx0Ly9VcGxvYWRcblxuXHRzaG93U2VsZWN0ZWRGaWxlKGRpdjpzdHJpbmcpOnZvaWQge1xuXHRcdCQoZGl2KS5vbignY2hhbmdlJywgJy5pbnB1dEltYWdlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXHRcdFx0dmFyIGZpbGVzID0gJHRoaXMucHJvcCgnZmlsZXMnKTtcblx0XHRcdHZhciBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuXHRcdFx0ZmlsZVJlYWRlci5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBpbWFnZVNlbGVjdGVkID0gZmlsZVJlYWRlci5yZXN1bHQ7XG5cdFx0XHRcdCR0aGlzLm5leHQoJy5maWxlSW5wdXRMYWJlbCcpLnJlbW92ZUNsYXNzKCdmaWxlSW5wdXRMYWJlbCcpLmFkZENsYXNzKCdzZWxlY3RlZElucHV0TGFiZWwnKTtcblx0XHRcdFx0JHRoaXMubmV4dCgnLnNlbGVjdGVkSW5wdXRMYWJlbCcpLmZpbmQoJ2ltZycpLmF0dHIoJ3NyYycsIGltYWdlU2VsZWN0ZWQpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGZpbGVSZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlc1swXSk7XG5cdFx0fSlcblx0XHQub24oJ2NoYW5nZScsICcuaW5wdXRWaWRlbycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKTtcblx0XHRcdHZhciBmaWxlcyA9ICR0aGlzLnByb3AoJ2ZpbGVzJyk7XG5cdFx0XHR2YXIgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cdFx0XHRcblx0XHRcdHZhciBibG9iID0gbmV3IEJsb2IoW2ZpbGVzWzBdXSwge3R5cGU6IGZpbGVzLnR5cGV9KTtcblx0XHRcdHZhciB2aWRlbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VsZWN0ZWRWaWRlb1wiKTtcblx0XHRcdHZhciB1cmwgPSAoVVJMIHx8IHdlYmtpdFVSTCkuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG5cdFx0XHR2aWRlby5zcmMgPSB1cmw7XG5cdFx0XHRmaWxlUmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGZpbGVzWzBdKTtcblx0XHR9KTtcblx0fVxufSIsIi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmNsYXNzIEFqYXgge1xuICAgIHB1YmxpYyBhamF4RmlsZTpzdHJpbmcgPSAnYWpheC9hamF4UmVxdWlzaXRpb25zLnBocCc7XG4gICAgXG4gICAgLy9mdW5jdGlvbiBmb3Igc2ltcGxlIGFqYXgsIHdpdGhvdXQgc2VudCBhbmQgcmVjZWl2ZWQgZGF0YXMsIGlmIHlvdSB3YW50IHRvIHJlY2VpdmUgYW5kL29yIHNlbmQgZGF0YXMsIGNyZWF0ZSBhbm90ZXIgb25lXG5cbiAgICBjaGFuZ2VVcmwodXJsOnN0cmluZyk6dm9pZCB7XG4gICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKHt9LCAnJywgdXJsKTtcbiAgICB9XG5cbiAgICBnZXRQYWdlKHBhZ2U6c3RyaW5nLCBwYXJhbWV0ZXJzOnN0cmluZywgY2FsbGJhY2s6YW55KTp2b2lkIHtcbiAgICAgICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgXG4gICAgICAgIHJlcXVlc3Qub3BlbignUE9TVCcsIHBhZ2UsIHRydWUpO1xuICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LXR5cGVcIiwgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIik7XG5cbiAgICAgICAgcmVxdWVzdC5vbnByb2dyZXNzID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAkKCcuYWpheFJlcGxhY2UnKS5hZGRDbGFzcygnbG9hZGluZycpO1xuICAgICAgICAgICAgdmFyIHBlcmNlbnQgPSAoZS5sb2FkZWQgLyBlLnRvdGFsKSAqIDEwMDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgJCgnLmxvYWRpbmc6YmVmb3JlJykuY3NzKHtcbiAgICAgICAgICAgICAgICB3aWR0aDogcGVyY2VudCArICclJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA+PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgPCA0MDApIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhyZXF1ZXN0LnJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdVbmV4cGVjdGVkIHN0YXR1cyBjb2RlICcgKyByZXF1ZXN0LnN0YXR1cyArICcgZm9yICcgKyBwYWdlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2FsbGJhY2soJ2Vycm9yIGJlZm9yZSBzZWRpbmcnKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVxdWVzdC5zZW5kKHBhcmFtZXRlcnMpO1xuICAgIH1cblxuICAgIGFqYXgobWV0aG9kOnN0cmluZywgYWN0aW9uOnN0cmluZywgZGF0YUlkLCBiZWZvcmUsIG5vdERvbmUsIGRvbmUpOnZvaWQge1xuICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB2YXIgdXJsID0gdGhpcy5hamF4RmlsZSArICc/YWpheEFjdGlvbj0nICsgYWN0aW9uICsgJyZhamF4SWQ9JyArIGRhdGFJZDtcbiAgICAgICAgXG4gICAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbm90RG9uZTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVxdWVzdC5vcGVuKG1ldGhvZCwgdXJsKTtcbiAgICAgICAgXG4gICAgICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPj0gMjAwICYmIHJlcXVlc3Quc3RhdHVzIDwgNDAwKSB7XG4gICAgICAgICAgICAgICAgZG9uZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vdERvbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3Quc2VuZCgpO1xuICAgIH1cbn0iLCIvKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG5jbGFzcyBDb21tZW50cyBleHRlbmRzIEFqYXgge1xuICAgIG1ha2VDb21tZW50KCk6dm9pZCB7XG4gICAgICAgIHZhciBjb21tZW50ID0gJChcIiNjb21tZW50SW5wdXRcIikudmFsKCk7XG4gICAgICAgIHZhciBjaGVja0NvbW1lbnQgPSAoY29tbWVudCBhcyBhbnkpLnRyaW0oKTtcbiAgICAgICAgXG4gICAgICAgIGlmKGNoZWNrQ29tbWVudCA9PSAnJykge1xuICAgICAgICAgICAgYWxlcnQoJ1R5cGUgYSBjb21tZW50Jyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXG4gICAgICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICAgICAgICByZXF1ZXN0Lm9wZW4oJ1BPU1QnLCB0aGlzLmFqYXhGaWxlICsgJz9hamF4QWN0aW9uPW1ha2VDb21tZW50JmFqYXhJZD0nICsgJHRoaXMuYXR0cignZGF0YS1pZCcpKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC10eXBlXCIsIFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIpO1xuXG4gICAgICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBhbGVydChcIkNvbW1lbnQgbm90IG1hZGVcIik7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICQoJyNjb21tZW50c0RpdiAjY29tbWVudEZvcm1EaXYnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAkKCcjY29tbWVudHNEaXYnKS5wcmVwZW5kKCc8ZGl2IGlkPVwidXNlckNvbW1lbnRcIj48aW1nIHNyYz1cIicgKyBiYXNlVXJsICsgJ2ltYWdlcy91c2VyLycgKyAkdGhpcy5hdHRyKCdkYXRhLXVzZXJpZCcpICsgJy9wcm9maWxlLmpwZ1wiLz48ZGl2IGlkPVwicmlnaHREaXZcIj48ZGl2IGlkPVwiY29tbWVudFNwYW5EaXZcIj48c3BhbiBpZD1cImNvbW1lbnRTcGFuXCI+JyArIGNvbW1lbnQgKyAnPC9zcGFuPjwvZGl2PjxkaXYgaWQ9XCJjb21tZW50T3B0aW9uc0RpdlwiPjxkaXYgaWQ9XCJidXR0b25FZGl0XCIgY2xhc3M9XCJidXR0b25cIiBkYXRhLWlkPVwiJyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSArICdcIj48L2Rpdj48ZGl2IGlkPVwiYnV0dG9uRGVsZXRlXCIgY2xhc3M9XCJidXR0b25cIiBkYXRhLXVzZXJpZD1cIicgKyAkdGhpcy5hdHRyKCdkYXRhLXVzZXJpZCcpICsgJ1wiIGRhdGEtaWQ9XCInICsgJHRoaXMuYXR0cignZGF0YS1pZCcpICsgJ1wiPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICQoJyN1c2VyQ29tbWVudCcpLm9uKCdjbGljaycsICcjYnV0dG9uRGVsZXRlJywgdGhpcy5kZWxldGVDb21tZW50KCkpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmVxdWVzdC5zZW5kKFwiY29tbWVudD1cIiArIGNvbW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZWRpdENvbW1lbnQoKTp2b2lkIHtcbiAgICAgICAgYWxlcnQoJ0NvbW1pbmcgc29vbicpO1xuICAgIH1cblxuICAgIGRlbGV0ZUNvbW1lbnQoKTp2b2lkIHtcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcblxuICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICAgIHJlcXVlc3Qub3BlbignUE9TVCcsIHRoaXMuYWpheEZpbGUgKyAnP2FqYXhBY3Rpb249ZGVsZXRlQ29tbWVudCZhamF4SWQ9JyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSk7XG5cbiAgICAgICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhbGVydChcIkNvbW1lbnQgbm90IGRlbGV0ZWRcIik7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQoJyNjb21tZW50c0RpdiAjdXNlckNvbW1lbnQnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICQoJyNjb21tZW50c0RpdicpLnByZXBlbmQoJzxkaXYgaWQ9XCJjb21tZW50Rm9ybURpdlwiPjx0ZXh0YXJlYSBjb2xzPVwiMTBcIiByb3dzPVwiM1wiIG1heC1jb2xzPVwiMTBcIiBpZD1cImNvbW1lbnRJbnB1dFwiIHBsYWNlaG9sZGVyPVwiTGVhdmUgeW91ciBjb21tZW50XCI+PC90ZXh0YXJlYT48ZGl2IGlkPVwiYnV0dG9uc0RpdlwiPjxidXR0b24gaWQ9XCJjb21tZW50U3VibWl0XCIgZGF0YS11c2VyaWQ9XCInICsgJHRoaXMuYXR0cignZGF0YS11c2VyaWQnKSArICdcIiBkYXRhLWlkPVwiJyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSArICdcIiBkaXNhYmxlZD1cImRpc2FibGVkXCI+Q29tZW50YXI8L2J1dHRvbj48L2Rpdj48L2Rpdj4nKTtcbiAgICAgICAgICAgICQoJyNjb21tZW50Rm9ybURpdicpLm9uKCdjbGljaycsICcjY29tbWVudFN1Ym1pdCcsIHRoaXMubWFrZUNvbW1lbnQoKSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZUVuYWJsZSgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlcXVlc3Quc2VuZCgpO1xuICAgIH1cbn0iLCIvKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG5jbGFzcyBEZXRhaWxzIGV4dGVuZHMgQWpheCB7XG4gICAgc2hvd0RldGFpbHMoZXZlbnQ/OmFueSk6dm9pZCB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHZhciBjb250ZW50TGluazpzdHJpbmcgPSAkKHRoaXMpLmZpbmQoJy5jb250ZW50TGluaycpLmF0dHIoJ2hyZWYnKTtcbiAgICAgICAgdmFyIGNvbnRlbnRMaW5rVG9CYWNrOnN0cmluZyA9ICQodGhpcykuZmluZCgnLmNvbnRlbnRMaW5rJykuYXR0cignZGF0YS11cmwnKTtcbiAgICAgICAgdmFyIGNvbnRlbnRUaXRsZVRvQmFjazpzdHJpbmcgPSAkKHRoaXMpLmZpbmQoJy5jb250ZW50TGluaycpLmF0dHIoJ2RhdGEtdGl0bGUnKTtcbiAgICAgICAgJCgnLmNsb3NlQnV0dG9uJykuYXR0cignZGF0YS11cmwnLCBjb250ZW50TGlua1RvQmFjayk7XG4gICAgICAgICQoJy5jbG9zZUJ1dHRvbicpLmF0dHIoJ2RhdGEtdGl0bGUnLCBjb250ZW50VGl0bGVUb0JhY2spO1xuXG4gICAgICAgIHZhciBhbGxjb250YWluZXJEaXYgPSAkKCcuY29udGVudENvbnRhaW5lciAudGl0bGVEZXRhaWxzT3BlbicpO1xuICAgICAgICB2YXIgYWxsY29udGVudERpdiA9ICQoJy5jb250ZW50Q29udGFpbmVyIC5jb250ZW50RGl2IC5jb250ZW50T3BlbicpO1xuICAgICAgICBcbiAgICAgICAgdmFyIGNvbnRlbnREaXYgPSAkKHRoaXMpOy8vY29udGVudFxuICAgICAgICB2YXIgcGFyZW50RGl2ID0gY29udGVudERpdi5wYXJlbnQoKTsvL2NvbnRlbnRHcm91cFxuICAgICAgICB2YXIgY29udGFpbmVyRGl2ID0gcGFyZW50RGl2LnBhcmVudCgpLnBhcmVudCgpOy8vY29udGVudENvbnRhaW5lclxuXG4gICAgICAgIGFsbGNvbnRhaW5lckRpdi5maW5kKCcuc2VjdGlvbkNvbnRlbnQgYXJ0aWNsZScpLnJlbW92ZSgpO1xuXG4gICAgICAgIGFsbGNvbnRhaW5lckRpdi5yZW1vdmVDbGFzcygndGl0bGVEZXRhaWxzT3BlbicpLmFkZENsYXNzKCd0aXRsZURldGFpbHMnKTtcbiAgICAgICAgYWxsY29udGVudERpdi5yZW1vdmVDbGFzcygnY29udGVudE9wZW4nKS5hZGRDbGFzcygnY29udGVudCcpO1xuICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdjb250ZW50JykuYWRkQ2xhc3MoJ2NvbnRlbnRPcGVuJyk7XG4gICAgICAgIFxuICAgICAgICBjb250YWluZXJEaXYuZmluZCgnLnRpdGxlRGV0YWlscycpLnJlbW92ZUNsYXNzKCd0aXRsZURldGFpbHMnKS5hZGRDbGFzcygndGl0bGVEZXRhaWxzT3BlbicpO1xuICAgICAgICBcbiAgICAgICAgaWYocGFyZW50RGl2LmF0dHIoJ2NsYXNzJykgPT0gJ2NvbnRlbnRHcm91cCcpIHtcbiAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IGNvbnRhaW5lckRpdi5maW5kKCcudGl0bGVEZXRhaWxzT3BlbicpLm9mZnNldCgpLnRvcCAtIDE1MFxuICAgICAgICAgICAgfSw1MDApO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyLmdldFBhZ2UoY29udGVudExpbmssIFwiYm9keT10cnVlXCIsIGZ1bmN0aW9uKGRhdGE6YW55KSB7XG4gICAgICAgICAgICB2YXIgZmlsdGVyOmFueSA9ICQoZGF0YSkuY2hpbGRyZW4oKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAkKCcudGl0bGVEZXRhaWxzT3BlbicpLmZpbmQoJy5zZWN0aW9uQ29udGVudCcpLmh0bWwoZmlsdGVyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHN1cGVyLmNoYW5nZVVybChjb250ZW50TGluayk7XG4gICAgfVxuXG4gICAgY2xvc2VEZXRhaWxzKCk6dm9pZCB7XG4gICAgICAgIHZhciBjb250YWluZXJEaXYgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnBhcmVudCgpOy8vY29udGVudENvbnRhaW5lclxuICAgICAgICB2YXIgYWxsY29udGFpbmVyRGl2ID0gJCgnLmNvbnRlbnRDb250YWluZXIgLnRpdGxlRGV0YWlsc09wZW4nKTtcbiAgICAgICAgdmFyIGFsbGNvbnRlbnREaXYgPSAkKCcuY29udGVudENvbnRhaW5lciAuY29udGVudERpdiBkaXYnKTtcbiAgICAgICAgdmFyIG9mZnNldERldGFpbHNEaXYgPSBjb250YWluZXJEaXYub2Zmc2V0KCkudG9wO1xuICAgICAgICB2YXIgbGlua1RvQmFjayA9ICQodGhpcykuYXR0cignZGF0YS11cmwnKTtcbiAgICAgICAgdmFyIHRpdGxlVG9CYWNrID0gJCh0aGlzKS5hdHRyKCdkYXRhLXRpdGxlJyk7XG5cbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9wOiBvZmZzZXREZXRhaWxzRGl2XG4gICAgICAgIH0sNTAwLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGFsbGNvbnRhaW5lckRpdi5yZW1vdmVDbGFzcygndGl0bGVEZXRhaWxzT3BlbicpLmFkZENsYXNzKCd0aXRsZURldGFpbHMnKTtcbiAgICAgICAgICAgICQoJy50aXRsZURldGFpbHMnKS5maW5kKCcuc2VjdGlvbkNvbnRlbnQgYXJ0aWNsZScpLnJlbW92ZSgpO1xuICAgICAgICAgICAgJCgnLnRpdGxlRGV0YWlsc09wZW4nKS5maW5kKCcuc2VjdGlvbkNvbnRlbnQgYXJ0aWNsZScpLnJlbW92ZSgpO1xuICAgICAgICAgICAgYWxsY29udGVudERpdi5maW5kKCcuY29udGVudE9wZW4nKS5yZW1vdmVDbGFzcygnY29udGVudE9wZW4nKS5hZGRDbGFzcygnY29udGVudCcpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL3N1cGVyLmNoYW5nZVVybChsaW5rVG9CYWNrKTtcbiAgICAgICAgICAgICQoJ3RpdGxlJykuZW1wdHkoKS50ZXh0KHRpdGxlVG9CYWNrKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc3VwZXIuY2hhbmdlVXJsKGxpbmtUb0JhY2spO1xuICAgIH1cbn0iLCIvKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG5jbGFzcyBGb2xsb3cgZXh0ZW5kcyBBamF4IHtcbiAgICBmb2xsb3dVc2VyKCk6dm9pZCB7XG4gICAgICAgIHZhciBidXR0b24gPSAkKHRoaXMpO1xuXG4gICAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgICAgcmVxdWVzdC5vcGVuKCdQT1NUJywgdGhpcy5hamF4RmlsZSArICc/YWpheEFjdGlvbj1mb2xsb3cmYWpheElkPScgKyAkKGJ1dHRvbikuYXR0cignZGF0YS1pZCcpKTtcblxuICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGFsZXJ0KCdFcnJvcicpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZVRleHQpO1xuXG4gICAgICAgICAgICAkKGJ1dHRvbikuYXR0cihcImlkXCIsIGRhdGEuY2hhbmdlKTtcbiAgICAgICAgICAgICQoYnV0dG9uKS5maW5kKFwiLmJ1dHRvblNwYW5cIikuaHRtbChkYXRhLndyaXRlKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXF1ZXN0LnNlbmQoKTtcbiAgICB9XG5cbiAgICB1bmZvbGxvd1VzZXIoKTp2b2lkIHtcbiAgICAgICAgdmFyIGJ1dHRvbiA9ICQodGhpcyk7XG5cbiAgICAgICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgICByZXF1ZXN0Lm9wZW4oJ1BPU1QnLCB0aGlzLmFqYXhGaWxlICsgJz9hamF4QWN0aW9uPXVuZm9sbG93JmFqYXhJZD0nICsgJChidXR0b24pLmF0dHIoJ2RhdGEtaWQnKSk7XG5cbiAgICAgICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhbGVydCgnRXJyb3InKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2VUZXh0KTtcblxuICAgICAgICAgICAgJChidXR0b24pLmF0dHIoXCJpZFwiLCBkYXRhLmNoYW5nZSk7XG4gICAgICAgICAgICAkKGJ1dHRvbikuZmluZChcIi5idXR0b25TcGFuXCIpLmh0bWwoZGF0YS53cml0ZSk7IFxuICAgICAgICB9O1xuXG4gICAgICAgIHJlcXVlc3Quc2VuZCgpO1xuICAgIH1cblxuICAgIGFqYXhMaW5rKGV2ZW50LCB1cmwpOnZvaWQge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZih1cmwgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgbGlua1RvID0gdXJsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIGxpbmtUbzphbnkgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcbiAgICAgICAgfVxuICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ3Njcm9sbCcpO1xuXG4gICAgICAgIHRoaXMuZ2V0UGFnZShsaW5rVG8sIFwiYm9keT10cnVlXCIsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAvLyQoJy5hamF4UmVwbGFjZScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG4gICAgICAgICAgICAkKCcuYWpheFJlcGxhY2UnKS5odG1sKGRhdGEpO1xuXG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgICAgICAgICB9LDUwMCk7XG5cbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVXJsKGxpbmtUbyk7XG5cbiAgICAgICAgICAgICQoJyNtZW51QnRJbnB1dCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG5cbiAgICAgICAgICAgIGlmKGxpbmtUbyA9PSBiYXNlVXJsKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufSIsIi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmNsYXNzIFdhdGNobGlzdCB7XG4gICAgYWRkV2F0Y2hMaXN0KCk6dm9pZCB7XG4gICAgICAgIHZhciBkYXRhSWQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtaWQnKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYWpheChcbiAgICAgICAgICAgICdQT1NUJyxcbiAgICAgICAgICAgICdhZGRXYXRjaExpc3QnLFxuICAgICAgICAgICAgZGF0YUlkLFxuICAgICAgICAgICAgJycsXG4gICAgICAgICAgICAnJyxcbiAgICAgICAgICAgICQoJy5hZGRXYXRjaExpc3QnKS5yZW1vdmVDbGFzcygnYWRkV2F0Y2hMaXN0JykuYWRkQ2xhc3MoJ3JlbW92ZVdhdGNoTGlzdCcpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVtb3ZlV2F0Y2hMaXN0KCk6dm9pZCB7XG4gICAgICAgIHZhciBkYXRhSWQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtaWQnKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYWpheChcbiAgICAgICAgICAgICdQT1NUJyxcbiAgICAgICAgICAgICdyZW1vdmVXYXRjaExpc3QnLFxuICAgICAgICAgICAgZGF0YUlkLFxuICAgICAgICAgICAgJycsXG4gICAgICAgICAgICAnJyxcbiAgICAgICAgICAgICQoJy5yZW1vdmVXYXRjaExpc3QnKS5yZW1vdmVDbGFzcygncmVtb3ZlV2F0Y2hMaXN0JykuYWRkQ2xhc3MoJ2FkZFdhdGNoTGlzdCcpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgYWRkV2F0Y2hMaXN0SW5kZXgoKTp2b2lkIHtcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgdmFyIGRhdGFJZCA9ICQodGhpcykuYXR0cignZGF0YS1pZCcpO1xuXG4gICAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHZhciB1cmwgPSB0aGlzLmFqYXhGaWxlICsgJz9hamF4QWN0aW9uPWFkZFdhdGNoTGlzdCZhamF4SWQ9JyArIGRhdGFJZDtcbiAgICAgICAgXG4gICAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYWxlcnQoJ0Vycm9yJyk7XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3Qub3BlbignUE9TVCcsIHVybCk7XG4gICAgICAgIFxuICAgICAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2VUZXh0KTtcblxuICAgICAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID49IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyA8IDQwMCkge1xuICAgICAgICAgICAgICAgIGlmKCQoJyN3YXRjaExpc3REaXYnKS5sZW5ndGggPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLm1haW5TZWN0aW9uJykucHJlcGVuZCgnPGFydGljbGUgaWQ9XCJ3YXRjaExpc3REaXZcIiBjbGFzcz1cImNvbnRlbnRDb250YWluZXJcIj48cCBjbGFzcz1cImNvbnRlbnREaXZIZWFkZXJcIj4nICsgZGF0YS50aXRsZSArICc8L3A+PGRpdiBjbGFzcz1cImNvbnRlbnREaXZcIj48ZGl2IGNsYXNzPVwiY29udGVudEdyb3VwU2Nyb2xsXCI+PC9kaXY+PC9kaXY+PC9hcnRpY2xlPicpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKCR0aGlzLmF0dHIoJ2RhdGEtdHlwZScpID09ICdtb3ZpZScpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpbmtUeXBlID0gJ21vdmllcyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoJHRoaXMuYXR0cignZGF0YS10eXBlJykgPT0gJ3NlcmllJykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGlua1R5cGUgPSAnc2VyaWVzJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAkdGhpcy5yZW1vdmVDbGFzcygnYWRkV2F0Y2hMaXN0JykuYWRkQ2xhc3MoJ3JlbW92ZVdhdGNoTGlzdCcpO1xuXG4gICAgICAgICAgICAgICAgJCgnI3dhdGNoTGlzdERpdiAuY29udGVudEdyb3VwU2Nyb2xsJykucHJlcGVuZCgnPGRpdiBjbGFzcz1cImNvbnRlbnRcIiBkYXRhLWlkPVwiJyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSAgKyAnXCI+PGEgY2xhc3M9XCJjb250ZW50TGlua1wiIGhyZWY9XCInICsgYmFzZVVybCArICd0aXRsZT9pZD0nICsgJHRoaXMuYXR0cignZGF0YS1pZCcpICsgJ1wiPjxmaWd1cmUgY2xhc3M9XCJjb250ZW50RmlndXJlXCI+PGltZyBzcmM9XCIvam9rZXIvaW1hZ2VzL21lZGlhLycgKyBsaW5rVHlwZSArICcvJyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSArICcvaW1hZ2UuanBnXCIvPjxmaWdjYXB0aW9uPjwvZmlnY2FwdGlvbj48L2ZpZ3VyZT48L2E+PGRpdiBjbGFzcz1cInJlbW92ZVdhdGNoTGlzdFwiIGRhdGEtdHlwZT1cIicgKyBsaW5rVHlwZSArICdcIiBkYXRhLWlkPVwiJyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSArICdcIj48L2Rpdj48L2Rpdj4nKTtcblxuICAgICAgICAgICAgICAgICQoJy5jb250ZW50RGl2IGRpdiAuYWRkV2F0Y2hMaXN0W2RhdGEtaWQ9XCInICsgJHRoaXMuYXR0cignZGF0YS1pZCcpICsgJ1wiXScpLnJlbW92ZUNsYXNzKCdhZGRXYXRjaExpc3QnKS5hZGRDbGFzcygncmVtb3ZlV2F0Y2hMaXN0Jyk7XG4gICAgICAgICAgICAgICAgJCgnI2ltYWdlRGl2IGRpdiBzcGFuW2RhdGEtaWQ9XCInICsgJHRoaXMuYXR0cignZGF0YS1pZCcpICsgJ1wiXScpLnJlbW92ZUNsYXNzKCdhZGRXYXRjaExpc3QnKS5hZGRDbGFzcygncmVtb3ZlV2F0Y2hMaXN0Jyk7XG5cbiAgICAgICAgICAgICAgICAkKCcjY29udGVudFNvcnRjdXRzJykuZmluZCgnLmFkZFdhdGNoTGlzdCcpLnJlbW92ZUNsYXNzKCdhZGRXYXRjaExpc3QnKS5hZGRDbGFzcygncmVtb3ZlV2F0Y2hMaXN0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydCgnRXJyb3InKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmVxdWVzdC5zZW5kKCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlV2F0Y2hMaXN0SW5kZXgoKTp2b2lkIHtcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgdmFyIGRhdGFJZCA9ICQodGhpcykuYXR0cignZGF0YS1pZCcpO1xuXG4gICAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHZhciB1cmwgPSB0aGlzLmFqYXhGaWxlICsgJz9hamF4QWN0aW9uPXJlbW92ZVdhdGNoTGlzdCZhamF4SWQ9JyArIGRhdGFJZDtcbiAgICAgICAgXG4gICAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYWxlcnQoJ0Vycm9yJyk7XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3Qub3BlbignUE9TVCcsIHVybCk7XG4gICAgICAgIFxuICAgICAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID49IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyA8IDQwMCkge1xuICAgICAgICAgICAgICAgICQoJyN3YXRjaExpc3REaXYgZGl2W2RhdGEtaWQ9XCInICsgJHRoaXMuYXR0cignZGF0YS1pZCcpICsgJ1wiXScpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICQoJy5jb250ZW50RGl2IGRpdiAucmVtb3ZlV2F0Y2hMaXN0W2RhdGEtaWQ9XCInICsgJHRoaXMuYXR0cignZGF0YS1pZCcpICsgJ1wiXScpLnJlbW92ZUNsYXNzKCdyZW1vdmVXYXRjaExpc3QnKS5hZGRDbGFzcygnYWRkV2F0Y2hMaXN0Jyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgJCgnI2ltYWdlRGl2IHNwYW5bZGF0YS1pZD1cIicgKyAkdGhpcy5hdHRyKCdkYXRhLWlkJykgKyAnXCJdJykucmVtb3ZlQ2xhc3MoJ3JlbW92ZVdhdGNoTGlzdCcpLmFkZENsYXNzKCdhZGRXYXRjaExpc3QnKTtcblxuICAgICAgICAgICAgICAgICQoJyNjb250ZW50U29ydGN1dHMnKS5maW5kKCcucmVtb3ZlV2F0Y2hMaXN0JykucmVtb3ZlQ2xhc3MoJ3JlbW92ZVdhdGNoTGlzdCcpLmFkZENsYXNzKCdhZGRXYXRjaExpc3QnKTtcblxuICAgICAgICAgICAgICAgIGlmKCQudHJpbSgkKCcjd2F0Y2hMaXN0RGl2IC5jb250ZW50R3JvdXBTY3JvbGwnKS5odG1sKCkpID09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJyN3YXRjaExpc3REaXYnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydCgnRXJyb3InKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmVxdWVzdC5zZW5kKCk7XG4gICAgfVxufSIsIi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmNsYXNzIExvZ2luIHtcbiAgICBpbnB1dEVycm9yKHBhcmVudERpdjpzdHJpbmcpOnZvaWQge1xuXHRcdCQocGFyZW50RGl2KS5vbignZm9jdXNvdXQnLCAnLmlucHV0VGV4dCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYoKCQodGhpcykgYXMgYW55KS52YWwoKS5sZW5ndGggPCAxKSB7XG5cdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2lucHV0VGV4dCcpLmFkZENsYXNzKCdpbnB1dFRleHRFcnJvcicpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdFxuXHRcdCQocGFyZW50RGl2KS5vbignZm9jdXNvdXQnLCAnLmlucHV0VGV4dEVycm9yJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRpZigoJCh0aGlzKSBhcyBhbnkpLnZhbCgpLmxlbmd0aCA+PSAxKSB7XG5cdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2lucHV0VGV4dEVycm9yJykuYWRkQ2xhc3MoJ2lucHV0VGV4dCcpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0c2VjdXJlTG9nb2ZmKHVybCk6dm9pZCB7XG5cdFx0aWYoIWRvY3VtZW50LmNvb2tpZS5tYXRjaCgnbG9naW4nKSkge1xuXHRcdFx0bG9jYXRpb24ucmVwbGFjZSh1cmwgKyAnbG9nb2ZmJyk7XG5cdFx0fVxuXHR9XG59IiwiLypcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiB8IENvcHlyaWdodCAoYykgMjAxNC0yMDE1IEF0b21vLmNvbS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiB8IEAgQXV0aG9yXHQ6IERhbmllbCBSaW9zLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKi9cblxuY2xhc3MgVXNlck90aGVycyB7XG4gICAgLyoqXG5cdCAqIGhpZGUgdGhlIHJlcGxpZXNcblx0ICovXG4gICAgXG4gICAgaGlkZVJlcGx5KGRpdjpzdHJpbmcpOnZvaWQge1xuXHRcdCQoZGl2KS5vbihcImNsaWNrXCIsIFwiLm5vSGlkZVwiLCBmdW5jdGlvbigpIHtcblx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoXCJub0hpZGVcIikuYWRkQ2xhc3MoXCJoaWRlXCIpO1xuXHRcdH0pXG5cdFx0Lm9uKFwiY2xpY2tcIiwgXCIuaGlkZVwiLCBmdW5jdGlvbigpIHtcblx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpLmFkZENsYXNzKFwibm9IaWRlXCIpO1xuXHRcdH0pO1xuICAgIH1cbiAgICAvL0Nsb3NlIE1lc3NhZ2VcblxuXHRjbG9zZU1lc3NhZ2UoZXJyb3JEaXY6c3RyaW5nLCBlcnJvckJ0bjpzdHJpbmcpOnZvaWQge1xuXHRcdCQoZXJyb3JEaXYpLm9uKFwiY2xpY2tcIiwgZXJyb3JCdG4sIGZ1bmN0aW9uKCkge1xuXHRcdFx0JCh0aGlzKS5wYXJlbnQoKS5yZW1vdmUoKTtcblx0XHRcdC8vbG9jYXRpb24uaHJlZiA9IGhpc3RvcnkuZ28oLTEpO1xuXHRcdH0pO1xuXHR9XG5cblx0Ly9UYWIgU2VsZWN0XG5cblx0dGFiU2VsZWN0KElzU2Nyb2xsOmJvb2xlYW4pOnZvaWQge1xuXHRcdHZhciBzY3JvbGwgPSBJc1Njcm9sbCA/IElzU2Nyb2xsIDogZmFsc2U7XG5cblx0XHQkKFwiI3RhYkhlYWRlclwiKS5vbihcImNsaWNrXCIsIFwiLnRhYlwiLCBmdW5jdGlvbigpIHtcblx0XHRcdCQoXCIjdGFiSGVhZGVyIC50YWJTZWxlY3RlZFwiKS5yZW1vdmVDbGFzcyhcInRhYlNlbGVjdGVkXCIpLmFkZENsYXNzKFwidGFiXCIpO1xuXHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcyhcInRhYlwiKS5hZGRDbGFzcyhcInRhYlNlbGVjdGVkXCIpO1xuXHRcdFx0XG5cdFx0XHR2YXIgaW5kaWNlID0gJCh0aGlzKS5pbmRleCgpO1xuXHRcdFx0aW5kaWNlICsrO1xuXHRcdFx0XG5cdFx0XHQkKFwiI3RhYkNvbnRlbnRzIC5jb250ZW50U2hvd1wiKS5yZW1vdmVDbGFzcygnY29udGVudFNob3cnKS5hZGRDbGFzcygnY29udGVudEhpZGUnKTtcblx0XHRcdCQoXCIjdGFiQ29udGVudHMgLmNvbnRlbnRIaWRlOm50aC1vZi10eXBlKFwiICsgaW5kaWNlICsgXCIpXCIpLnJlbW92ZUNsYXNzKCdjb250ZW50SGlkZScpLmFkZENsYXNzKCdjb250ZW50U2hvdycpO1xuXHRcdH0pXG5cdFx0Lm9uKCdjbGljaycsICdkaXYnLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0aWYoc2Nyb2xsID09IHRydWUpIHtcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0JCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuXHRcdFx0XHRcdHNjcm9sbFRvcDogNDUwXG5cdFx0XHRcdH0sNTAwKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdC8vRXBpc29kZSBTZWxlY3RcblxuXHRlcGlzb2RlU2VsZWN0KGVwaXNvZGVTbGlkZXI6c3RyaW5nKTp2b2lkIHtcblx0XHQkKGVwaXNvZGVTbGlkZXIpLm9uKFwiY2xpY2tcIiwgXCIuc2Vhc29uU2VsZWN0IC5zZWFzb25TcGFuXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0JChcIiNzZWFzb25TZWxlY3RcIikucmVtb3ZlQ2xhc3MoXCJzZWFzb25TZWxlY3RcIikuYWRkQ2xhc3MoXCJzZWFzb25TZWxlY3RPcGVuXCIpO1xuXHRcdFx0JChcIi5zZWFzb25IaWRlXCIpLnJlbW92ZUNsYXNzKFwic2Vhc29uSGlkZVwiKS5hZGRDbGFzcyhcInNlYXNvblNob3dcIik7XG5cdFx0fSlcblx0XHQub24oXCJjbGlja1wiLCBcIi5zZWFzb25TZWxlY3RPcGVuIC5zZWFzb25TcGFuXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0JChcIiNzZWFzb25TZWxlY3RcIikucmVtb3ZlQ2xhc3MoXCJzZWFzb25TZWxlY3RPcGVuXCIpLmFkZENsYXNzKFwic2Vhc29uU2VsZWN0XCIpO1xuXHRcdFx0JChcIi5zZWFzb25TaG93XCIpLnJlbW92ZUNsYXNzKFwic2Vhc29uU2hvd1wiKS5hZGRDbGFzcyhcInNlYXNvbkhpZGVcIik7XG5cdFx0XHRcblx0XHRcdHZhciBpbmRpY2UgPSAkKHRoaXMpLnBhcmVudCgpO1xuXHRcdFx0aW5kaWNlLnJlbW92ZUNsYXNzKFwic2Vhc29uSGlkZVwiKS5hZGRDbGFzcyhcInNlYXNvblNob3dcIik7XG5cdFx0XHRcblx0XHRcdHZhciBpbmRpY2VTaG93ID0gJCh0aGlzKS5wYXJlbnQoKS5pbmRleCgpO1xuXHRcdFx0aW5kaWNlU2hvdyArKztcblx0XHRcdFxuXHRcdFx0JChcIiNlcGlzb2RlRGl2IC5zZWFzb25Hcm91cFNob3dcIikucmVtb3ZlQ2xhc3MoXCJzZWFzb25Hcm91cFNob3dcIikuYWRkQ2xhc3MoXCJzZWFzb25Hcm91cEhpZGVcIik7XG5cdFx0XHQkKFwiI2VwaXNvZGVEaXYgLmNvbnRlbnRHcm91cDpudGgtb2YtdHlwZShcIiArIGluZGljZVNob3cgKyBcIilcIikucmVtb3ZlQ2xhc3MoXCJzZWFzb25Hcm91cEhpZGVcIikuYWRkQ2xhc3MoXCJzZWFzb25Hcm91cFNob3dcIik7XG5cdFx0XHRcblx0XHRcdGlmKCQoXCIjZXBpc29kZURpdiAuY29udGVudEdyb3VwOm50aC1vZi10eXBlKFwiICsgaW5kaWNlU2hvdyArIFwiKVwiKS53aWR0aCgpID4gJChcIiNlcGlzb2RlRGl2XCIpLndpZHRoKCkpIHtcblx0XHRcdFx0JChcIiNlcGlzb2RlRGl2XCIpLmZpbmQoJy5uZXh0SGlkZScpLnJlbW92ZUNsYXNzKCduZXh0SGlkZScpLmFkZENsYXNzKCduZXh0U2hvdycpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdCQoXCIjZXBpc29kZURpdlwiKS5maW5kKCcubmV4dFNob3cnKS5yZW1vdmVDbGFzcygnbmV4dFNob3cnKS5hZGRDbGFzcygnbmV4dEhpZGUnKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vRXBpc29kZSBTZWxlY3QgQ2xvc2VcblxuXHRcdCQoZXBpc29kZVNsaWRlcikub24oXCJtb3VzZWxlYXZlXCIsIFwiLnNlYXNvblNlbGVjdE9wZW5cIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgaW5kZXhDbG9zZSA9ICQoXCIjZXBpc29kZURpdiAuc2Vhc29uR3JvdXBTaG93XCIpLmluZGV4KCk7XG5cdFx0XHRpbmRleENsb3NlKys7XG5cblx0XHRcdCQoXCIjc2Vhc29uU2VsZWN0XCIpLnJlbW92ZUNsYXNzKFwic2Vhc29uU2VsZWN0T3BlblwiKS5hZGRDbGFzcyhcInNlYXNvblNlbGVjdFwiKTtcblx0XHRcdCQoXCIuc2Vhc29uU2hvd1wiKS5yZW1vdmVDbGFzcyhcInNlYXNvblNob3dcIikuYWRkQ2xhc3MoXCJzZWFzb25IaWRlXCIpO1xuXHRcdFx0JChcIi5zZWFzb25IaWRlOm50aC1vZi10eXBlKFwiICsgaW5kZXhDbG9zZSArIFwiKVwiKS5yZW1vdmVDbGFzcyhcInNlYXNvbkhpZGVcIikuYWRkQ2xhc3MoXCJzZWFzb25TaG93XCIpO1xuXHRcdH0pO1xuXHR9XG5cdFxuXHRkaXNhYmxlRW5hYmxlKCk6dm9pZCB7XG5cdFx0JChcIiNjb21tZW50SW5wdXRcIikua2V5dXAoZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgY29tbWVudEJlZm9yZSA9ICQodGhpcykudmFsKCk7XG5cdFx0XHR2YXIgY2hlY2tDb21tZW50QmVmb3JlID0gKGNvbW1lbnRCZWZvcmUgYXMgYW55KS50cmltKCk7XG5cblx0XHRcdGlmKGNoZWNrQ29tbWVudEJlZm9yZSA9PSAnJykge1xuXHRcdFx0XHQvLyQoJyNjb21tZW50U3VibWl0JykuYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcblx0XHRcdFx0JCgnI2NvbW1lbnRTdWJtaXQnKS5hdHRyKCdkaXNhYmxlZCcpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdCQoJyNjb21tZW50U3VibWl0JykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufSIsIi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmNsYXNzIFBhcmFsbGF4IHtcbiAgICAvL0VmZmVjdCBvZiBleHRlcm5hbCBpbmRleFxuXG5cdHBhcmFsbGF4SG9tZSgpOnZvaWQge1xuXHRcdHZhciBwYXJhbGxheE91dDpzdHJpbmcgPSAnI2Rlc2NJbWFnZSA+IGltZyc7XG5cdFx0dmFyIHBhcmFsbGF4SW46c3RyaW5nID0gJyNjb250ZW50U2xpZGVyID4gYXJ0aWNsZSA+IGRpdiA+IGltZyc7XG5cblx0XHRpZiAoJChkb2N1bWVudCkuc2Nyb2xsVG9wKCkgPCA0NTApIHtcblx0XHRcdCQocGFyYWxsYXhPdXQpLmNzcyhcInRvcFwiICwgKHdpbmRvdy5wYWdlWU9mZnNldCAvIDIpICsgJ3B4Jyk7XG5cdFx0XHQkKHBhcmFsbGF4SW4pLmNzcyhcInRvcFwiICwgKHdpbmRvdy5wYWdlWU9mZnNldCAvIDIpICsgJ3B4Jyk7XG5cdFx0fVxuXHR9XG5cblx0cGFyYWxsYXhIZWFkZXJVc2VyKCk6dm9pZCB7XG5cdFx0Ly9FZmZlY3Qgb2YgaGVhZGVyIG9mIHByb2ZpbGUgcGFnZVxuXG5cdFx0dmFyIGltZ0RpdiA9ICQoJyN1c2VySGVhZGVySW1nJyk7XG5cblx0XHRpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA8IDIxMCkge1xuXHRcdFx0JChpbWdEaXYpLmNzcyhcInRvcFwiICwgKHdpbmRvdy5wYWdlWU9mZnNldCAvIDIuNikgKyAncHgnKTtcblx0XHR9XG5cblx0XHQvL0NoYW5nZSBjbGFzcyBvZiBoZWFkZXIgb2YgcHJvZmlsZSBwYWdlXG5cblx0XHR2YXIgdXNlckhlYWRlciA9ICQoJyN1c2VySGVhZGVyJyk7XG5cdFx0dmFyIHVzZXJIZWFkZXJJbWcgPSAkKCcjdXNlckhlYWRlckltZycpO1xuXG5cdFx0aWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPj0gMjEwKSB7XG5cdFx0XHR1c2VySGVhZGVyLnJlbW92ZUNsYXNzKCd1c2VySGVhZGVyJyk7XG5cdFx0XHR1c2VySGVhZGVyLmFkZENsYXNzKCd1c2VySGVhZGVyRml4ZWQnKTtcblx0XHRcdHVzZXJIZWFkZXJJbWcucmVtb3ZlQ2xhc3MoJ3VzZXJIZWFkZXJJbWcnKTtcblx0XHRcdHVzZXJIZWFkZXJJbWcuYWRkQ2xhc3MoJ3VzZXJIZWFkZXJJbWdGaXhlZCcpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHVzZXJIZWFkZXIucmVtb3ZlQ2xhc3MoJ3VzZXJIZWFkZXJGaXhlZCcpO1xuXHRcdFx0dXNlckhlYWRlci5hZGRDbGFzcygndXNlckhlYWRlcicpO1xuXHRcdFx0dXNlckhlYWRlckltZy5yZW1vdmVDbGFzcygndXNlckhlYWRlckltZ0ZpeGVkJyk7XG5cdFx0XHR1c2VySGVhZGVySW1nLmFkZENsYXNzKCd1c2VySGVhZGVySW1nJyk7XG5cdFx0fVxuXHR9XG5cblx0cGFyYWxsYXhJbWcoKTp2b2lkIHtcblx0XHQvL0VmZmVjdCBvZiB1c2VyIGltYWdlIG9mIHByb2ZpbGUgcGFnZVxuXG5cdFx0dmFyIGltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VySW1nRmlndXJlJyk7XG5cblx0XHRpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA8IDIxMCkge1xuXHRcdFx0aW1nLnN0eWxlLndpZHRoID0gKDE1MCAtICQodGhpcykuc2Nyb2xsVG9wKCkgLyAyLjEpICsgJ3B4Jztcblx0XHRcdGltZy5zdHlsZS5oZWlnaHQgPSAoMTUwIC0gJCh0aGlzKS5zY3JvbGxUb3AoKSAvIDIuMSkgKyAncHgnO1xuXHRcdFx0aW1nLnN0eWxlLmxlZnQgPSAoMCArICQodGhpcykuc2Nyb2xsVG9wKCkgLyA0LjIpICsgJ3B4Jztcblx0XHRcdGltZy5zdHlsZS50b3AgPSAoLTEyMCArICQodGhpcykuc2Nyb2xsVG9wKCkgLyA1LjIpICsgJ3B4Jztcblx0XHR9XG5cblx0XHQvL0NoYW5nZSBjbGFzcyBvZiB1c2VyIGltYWdlIG9mIHByb2ZpbGUgcGFnZVxuXG5cdFx0dmFyIHVzZXJJbWcgPSAkKCcjdXNlckltZ0ZpZ3VyZScpO1xuXG5cdFx0aWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPj0gMjEwKSB7XG5cdFx0XHR1c2VySW1nLnJlbW92ZUNsYXNzKCd1c2VySW1nRmlndXJlJyk7XG5cdFx0XHR1c2VySW1nLmFkZENsYXNzKCd1c2VySW1nRmlndXJlRml4ZWQnKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR1c2VySW1nLnJlbW92ZUNsYXNzKCd1c2VySW1nRmlndXJlRml4ZWQnKTtcblx0XHRcdHVzZXJJbWcuYWRkQ2xhc3MoJ3VzZXJJbWdGaWd1cmUnKTtcblx0XHR9XG5cdH1cblxuXHRwYXJhbGxheE5hbWUoKTp2b2lkIHtcblx0XHQvL0VmZmVjdCBvZiB1c2VyIG5hbWUgb2YgcHJvZmlsZSBwYWdlXG5cblx0XHR2YXIgbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyTmFtZURpdicpO1xuXG5cdFx0aWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPCAyMTApIHtcblx0XHRcdG5hbWUuc3R5bGUubGVmdCA9ICgyMjAgLSAkKHRoaXMpLnNjcm9sbFRvcCgpIC8gMy43NSkgKyAncHgnO1xuXHRcdH1cblxuXHRcdC8vQ2hhbmdlIGNsYXNzIG9mIHVzZXIgbmFtZSBkaXZcblxuXHRcdHZhciB1c2VyTmFtZSA9ICQoJyN1c2VyTmFtZURpdicpO1xuXG5cdFx0aWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPj0gMjEwKSB7XG5cdFx0XHR1c2VyTmFtZS5yZW1vdmVDbGFzcygndXNlck5hbWVEaXYnKTtcblx0XHRcdHVzZXJOYW1lLmFkZENsYXNzKCd1c2VyTmFtZURpdkZpeGVkJyk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dXNlck5hbWUucmVtb3ZlQ2xhc3MoJ3VzZXJOYW1lRGl2Rml4ZWQnKTtcblx0XHRcdHVzZXJOYW1lLmFkZENsYXNzKCd1c2VyTmFtZURpdicpO1xuXHRcdH1cblx0fVxuXG5cdHBvc3RlclBhcmFsYXgoaW1hZ2U6c3RyaW5nKTp2b2lkIHtcblx0XHR2YXIgJHBvc3RlciA9ICQoaW1hZ2UpO1xuXHRcdHZhciAkc2hpbmUgPSAkcG9zdGVyLmZpbmQoJy5zaGluZScpO1xuXHRcdHZhciAkbGF5ZXIgPSAkcG9zdGVyLmZpbmQoJypbY2xhc3MqPVwibGF5ZXItXCJdJyk7XG5cdFx0dmFyIHcgPSAkcG9zdGVyLndpZHRoKCk7XG5cdFx0dmFyIGggPSAkcG9zdGVyLmhlaWdodCgpO1xuXG5cdFx0JHBvc3Rlci5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24oZSkge1xuXHRcdFx0JCgnLm1haW5TZWN0aW9uJykuY3NzKHtcblx0XHRcdFx0J3RyYW5zZm9ybS1zdHlsZSc6ICdwcmVzZXJ2ZS0zZCcsXG5cdFx0XHRcdCd0cmFuc2Zvcm0nOiAncGVyc3BlY3RpdmUoMTAwMHB4KSdcblx0XHRcdH0pLFxuXHRcdFx0JCgnI2ltYWdlQmFjaycpLmNzcyh7XG5cdFx0XHRcdCd0b3AnOiAnMCdcblx0XHRcdH0pO1xuXG5cdFx0XHQvL3ZhciBvZmZzZXRYID0gMC41IC0gZS5wYWdlWCAvIHc7IC8vIGN1cnNvciBob3Jcblx0XHRcdC8vdmFyIG9mZnNldFkgPSAwLjUgLSBlLnBhZ2VZIC8gaDsgLy8gY3Vyc29yIHZlcnRcblx0XHRcdHZhciBvZmZzZXRYID0gMC41IC0gZS5wYWdlWCAvIHc7IC8vIGN1cnNvciBob3Jcblx0XHRcdHZhciBvZmZzZXRZID0gMC41IC0gZS5wYWdlWSAvIGg7IC8vIGN1cnNvciB2ZXJ0XG5cdFx0XHR2YXIgZHggPSBlLnBhZ2VYIC0gdyAvIDI7IC8vIHBvc3RlciBjZW50ZXIgaG9yXG5cdFx0XHR2YXIgZHkgPSBlLnBhZ2VZIC0gaCAvIDI7IC8vIHBvc3RlciBjZW50ZXIgdmVydFxuXHRcdFx0dmFyIHRoZXRhID0gTWF0aC5hdGFuMihkeSwgZHgpOyAvLyBhbmdsZSBiL3cgY3Vyc29yIGFuZCBwb3N0ZXIgY2VudGVyIGluIFJBRFxuXHRcdFx0dmFyIGFuZ2xlID0gdGhldGEgKiAxODAgLyBNYXRoLlBJIC0gOTA7IC8vIGNvbnZlcnQgcmFkIHRvIGRlZ3JlZXNcblx0XHRcdHZhciBvZmZzZXRQb3N0ZXIgPSAkcG9zdGVyLmRhdGEoJ29mZnNldCcpO1xuXHRcdFx0dmFyIHRyYW5zZm9ybVBvc3RlciA9ICd0cmFuc2xhdGVZKCcgKyAtb2Zmc2V0WCAqIG9mZnNldFBvc3RlciArICdweCkgcm90YXRlWCgnICsgKC1vZmZzZXRZICogb2Zmc2V0UG9zdGVyKSArICdkZWcpIHJvdGF0ZVkoJyArIChvZmZzZXRYICogKG9mZnNldFBvc3RlciAqIDIpKSArICdkZWcpJztcblx0XHRcdCRwb3N0ZXIuY3NzKCd0cmFuc2Zvcm0nLCB0cmFuc2Zvcm1Qb3N0ZXIpO1xuXG5cdFx0XHRpZiAoYW5nbGUgPCAwKSB7XG5cdFx0XHRcdGFuZ2xlID0gYW5nbGUgKyAzNjA7XG5cdFx0XHR9XG5cblx0XHRcdCRzaGluZS5jc3MoJ2JhY2tncm91bmQnLCAnbGluZWFyLWdyYWRpZW50KCcgKyBhbmdsZSArICdkZWcsIHJnYmEoMCwgMCwgMCwnICsgZS5wYWdlWSAvIGggKyAnKSAwJSxyZ2JhKDAsIDAsIDAsIDApIDgwJSknKTtcblx0XHRcdFxuXHRcdFx0JGxheWVyLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyk7XG5cdFx0XHRcdHZhciBvZmZzZXRMYXllciA9ICR0aGlzLmRhdGEoJ29mZnNldCcpIHx8IDA7XG5cdFx0XHRcdHZhciB0cmFuc2Zvcm1MYXllciA9ICd0cmFuc2xhdGVYKCcgKyBvZmZzZXRYICogb2Zmc2V0TGF5ZXIgKyAncHgpIHRyYW5zbGF0ZVkoJyArIG9mZnNldFkgKiBvZmZzZXRMYXllciArICdweCknO1xuXHRcdFx0XHRcblx0XHRcdFx0JHRoaXMuY3NzKCd0cmFuc2Zvcm0nLCB0cmFuc2Zvcm1MYXllcik7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxufSIsIi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmNsYXNzIFNsaWRlIHtcbiAgICBzbGlkZUluZGV4KCk6dm9pZCB7XG5cdFx0aWYoJCh0aGlzKS5zY3JvbGxUb3AoKSA8IDIwMCkge1xuXHRcdFx0aWYoKCQoJy5pbWFnZVNob3cnKSBhcyBhbnkpLm5leHQoKS5zaXplKCkpIHtcblx0XHRcdFx0JCgnLmltYWdlU2hvdycpLnJlbW92ZUNsYXNzKCdpbWFnZVNob3cnKS5hZGRDbGFzcygnaW1hZ2VIaWRlJykubmV4dCgpLnJlbW92ZUNsYXNzKCdpbWFnZUhpZGUnKS5hZGRDbGFzcygnaW1hZ2VTaG93Jyk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0KCQoJy5pbWFnZVNob3cnKSBhcyBhbnkpLnJlbW92ZUNsYXNzKCdpbWFnZVNob3cnKS5hZGRDbGFzcygnaW1hZ2VIaWRlJyk7XG5cdFx0XHRcdCQoJyNjb250ZW50U2xpZGVyICNpbWFnZURpdiBkaXY6bnRoLW9mLXR5cGUoMSknKS5yZW1vdmVDbGFzcygnaW1hZ2VIaWRlJykuYWRkQ2xhc3MoJ2ltYWdlU2hvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZigoJCgnLmNoYW5nZVNob3cnKSBhcyBhbnkpLm5leHQoKS5zaXplKCkpIHtcblx0XHRcdFx0JCgnLmNoYW5nZVNob3cnKS5yZW1vdmVDbGFzcygnY2hhbmdlU2hvdycpLmFkZENsYXNzKCdjaGFuZ2VIaWRlJykubmV4dCgpLnJlbW92ZUNsYXNzKCdjaGFuZ2VIaWRlJykuYWRkQ2xhc3MoJ2NoYW5nZVNob3cnKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHQkKCcuY2hhbmdlU2hvdycpLnJlbW92ZUNsYXNzKCdjaGFuZ2VTaG93JykuYWRkQ2xhc3MoJ2NoYW5nZUhpZGUnKTtcblx0XHRcdFx0JCgnI2NvbnRlbnRTbGlkZXIgI2NoYW5nZURpdiBkaXY6bnRoLW9mLXR5cGUoMSknKS5yZW1vdmVDbGFzcygnY2hhbmdlSGlkZScpLmFkZENsYXNzKCdjaGFuZ2VTaG93Jyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Y2hhbmdlSW5kZXgoc2xpZGVyOnN0cmluZyk6dm9pZCB7XG5cdFx0Ly9JbmRleCBidXR0b25zXG5cblx0XHQkKHNsaWRlcikub24oJ2NsaWNrJywgJy5jaGFuZ2VIaWRlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHQvL2NsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XG5cblx0XHRcdCQoJy5jaGFuZ2VTaG93JykucmVtb3ZlQ2xhc3MoJ2NoYW5nZVNob3cnKS5hZGRDbGFzcygnY2hhbmdlSGlkZScpO1xuXHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygnY2hhbmdlSGlkZScpLmFkZENsYXNzKCdjaGFuZ2VTaG93Jyk7XG5cblx0XHRcdHZhciBpbmRpY2UgPSAkKHRoaXMpLmluZGV4KCk7XG5cdFx0XHRpbmRpY2UgKys7XG5cblx0XHRcdCQoJyNpbWFnZURpdiAuaW1hZ2VTaG93JykucmVtb3ZlQ2xhc3MoJ2ltYWdlU2hvdycpLmFkZENsYXNzKCdpbWFnZUhpZGUnKTtcblx0XHRcdCQoJyNpbWFnZURpdiBkaXY6bnRoLW9mLXR5cGUoJyArIGluZGljZSArICcpJykucmVtb3ZlQ2xhc3MoJ2ltYWdlSGlkZScpLmFkZENsYXNzKCdpbWFnZVNob3cnKTtcblx0XHR9KTtcblxuXHRcdC8vUHJldmlvdXMgYnV0dG9uXG5cblx0XHQkKHNsaWRlcikub24oJ2NsaWNrJywgJyNwcmV2aW91c0ltYWdlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHQvL2NsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XG5cblx0XHRcdGlmKCgkKCcuaW1hZ2VTaG93JykgYXMgYW55KS5wcmV2KCkuc2l6ZSgpKSB7XG5cdFx0XHRcdCQoJy5pbWFnZVNob3cnKS5yZW1vdmVDbGFzcygnaW1hZ2VTaG93JykuYWRkQ2xhc3MoJ2ltYWdlSGlkZScpLnByZXYoKS5yZW1vdmVDbGFzcygnaW1hZ2VIaWRlJykuYWRkQ2xhc3MoJ2ltYWdlU2hvdycpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdCQoJy5pbWFnZVNob3cnKS5yZW1vdmVDbGFzcygnaW1hZ2VTaG93JykuYWRkQ2xhc3MoJ2ltYWdlSGlkZScpO1xuXHRcdFx0XHQkKCcjY29udGVudFNsaWRlciAjaW1hZ2VEaXYgZGl2Omxhc3QtY2hpbGQnKS5yZW1vdmVDbGFzcygnaW1hZ2VIaWRlJykuYWRkQ2xhc3MoJ2ltYWdlU2hvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgaW5kaWNlID0gJCh0aGlzKS5wYXJlbnQoKS5maW5kKCcjaW1hZ2VEaXYgLmltYWdlU2hvdycpLmluZGV4KCcjaW1hZ2VEaXYgZGl2Jyk7XG5cdFx0XHRpbmRpY2UgKys7XG5cblx0XHRcdCQoJyNjaGFuZ2VEaXYgZGl2JykucmVtb3ZlQ2xhc3MoJ2NoYW5nZVNob3cnKS5hZGRDbGFzcygnY2hhbmdlSGlkZScpO1xuXHRcdFx0JCgnI2NoYW5nZURpdiBkaXY6bnRoLW9mLXR5cGUoJyArIGluZGljZSArICcpJykucmVtb3ZlQ2xhc3MoJ2NoYW5nZUhpZGUnKS5hZGRDbGFzcygnY2hhbmdlU2hvdycpO1xuXHRcdH0pO1xuXG5cdFx0Ly9OZXh0IGJ1dHRvblxuXG5cdFx0JChzbGlkZXIpLm9uKCdjbGljaycsICcjbmV4dEltYWdlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHQvL2NsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XG5cblx0XHRcdGlmKCgkKCcuaW1hZ2VTaG93JykgYXMgYW55KS5uZXh0KCkuc2l6ZSgpKSB7XG5cdFx0XHRcdCQoJy5pbWFnZVNob3cnKS5yZW1vdmVDbGFzcygnaW1hZ2VTaG93JykuYWRkQ2xhc3MoJ2ltYWdlSGlkZScpLm5leHQoKS5yZW1vdmVDbGFzcygnaW1hZ2VIaWRlJykuYWRkQ2xhc3MoJ2ltYWdlU2hvdycpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdCQoJy5pbWFnZVNob3cnKS5yZW1vdmVDbGFzcygnaW1hZ2VTaG93JykuYWRkQ2xhc3MoJ2ltYWdlSGlkZScpO1xuXHRcdFx0XHQkKCcjY29udGVudFNsaWRlciAjaW1hZ2VEaXYgZGl2Om50aC1vZi10eXBlKDEpJykucmVtb3ZlQ2xhc3MoJ2ltYWdlSGlkZScpLmFkZENsYXNzKCdpbWFnZVNob3cnKTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGluZGljZSA9ICQodGhpcykucGFyZW50KCkuZmluZCgnI2ltYWdlRGl2IC5pbWFnZVNob3cnKS5pbmRleCgnI2ltYWdlRGl2IGRpdicpO1xuXHRcdFx0aW5kaWNlICsrO1xuXG5cdFx0XHQkKCcjY2hhbmdlRGl2IGRpdicpLnJlbW92ZUNsYXNzKCdjaGFuZ2VTaG93JykuYWRkQ2xhc3MoJ2NoYW5nZUhpZGUnKTtcblx0XHRcdCQoJyNjaGFuZ2VEaXYgZGl2Om50aC1vZi10eXBlKCcgKyBpbmRpY2UgKyAnKScpLnJlbW92ZUNsYXNzKCdjaGFuZ2VIaWRlJykuYWRkQ2xhc3MoJ2NoYW5nZVNob3cnKTtcblx0XHR9KTtcblx0fVxufSJdfQ==
