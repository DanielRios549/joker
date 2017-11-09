/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
//Functions for all pages
$(document).ready(function () {
    //Change class of header of all page
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
var userScript = /** @class */ (function () {
    function userScript() {
    }
    /**
     * hide the replies
     */
    userScript.prototype.hideReply = function (div) {
        $(div).on("click", ".noHide", function () {
            $(this).removeClass("noHide").addClass("hide");
        })
            .on("click", ".hide", function () {
            $(this).removeClass("hide").addClass("noHide");
        });
    };
    //Close Message
    userScript.prototype.closeMessage = function (errorDiv, errorBtn) {
        $(errorDiv).on("click", errorBtn, function () {
            $(this).parent().remove();
            //location.href = history.go(-1);
        });
    };
    //Tab Select
    userScript.prototype.tabSelect = function (IsScroll) {
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
    userScript.prototype.episodeSelect = function (episodeSlider) {
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
    //Effect of external index
    userScript.prototype.parallaxExternalHome = function () {
        var sliderImg = $('#descImage > img');
        if ($(this).scrollTop() < 450) {
            $(sliderImg).css("top", (window.pageYOffset / 2) + 'px');
        }
    };
    //Effect of internal index
    userScript.prototype.parallaxInternalHome = function () {
        var sliderImg = $('#contentSlider > article > div > img');
        if ($(this).scrollTop() < 300) {
            $(sliderImg).css("top", (window.pageYOffset / 2) + 'px');
        }
    };
    userScript.prototype.slideIndex = function () {
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
    userScript.prototype.changeIndex = function (slider) {
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
    userScript.prototype.parallaxHeaderUser = function () {
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
    userScript.prototype.parallaxImg = function () {
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
    userScript.prototype.parallaxName = function () {
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
    userScript.prototype.inputError = function (parentDiv) {
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
    userScript.prototype.secureLogoff = function (url) {
        if (!document.cookie.match('login')) {
            location.replace(url + 'logoff');
        }
    };
    userScript.prototype.disableEnable = function () {
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
    userScript.prototype.posterParalax = function (image) {
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
    return userScript;
}());
