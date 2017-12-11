/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
$(document).ready(function () {
    //var userScript = new userScript();
    var adminOthers = new AdminOthers();
    $('.formAdd').on('click', '.openFieldset', function () {
        $(this).toggleClass('fieldsetOpen');
    })
        .on('click', '.openFieldsetVideo', function () {
        /*var video = document.getElementById("selectedVideo");

        if(!video.paused) {
            video.pause();
        }*/
    });
    //userScript.closeMessage('.userError', '#errorMsgClose');
    adminOthers.showSelectedFile('.formFieldset');
    adminOthers.advancedOptions("#managerOptions", "#advancedSearchDiv");
    adminOthers.showSelectedFile('.formFieldset');
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkbWluU2NyaXB0LnRzIiwicGFnZXMvYWRtaW4udHMiLCJwYXJ0cy9tZW51LnRzIiwicGFydHMvb3RoZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztFQUtFO0FBRUYsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNkLG9DQUFvQztJQUNwQyxJQUFJLFdBQVcsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO0lBRXBDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRTtRQUN2QyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3hDLENBQUMsQ0FBQztTQUNELEVBQUUsQ0FBQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUU7UUFDL0I7Ozs7V0FJRztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsMERBQTBEO0lBQzFELFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUM5QyxXQUFXLENBQUMsZUFBZSxDQUFDLGlCQUFpQixFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFDckUsV0FBVyxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ2xELENBQUMsQ0FBQyxDQUFDO0FDMUJIOzs7OztFQUtFO0FBRUYsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNkLG9DQUFvQztJQUNwQywyQ0FBMkM7SUFFM0MsNkJBQTZCO0lBRTdCLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUMzRSxDQUFDLENBQUMsQ0FBQztJQUNILENBQUMsQ0FBQyxT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QUFDLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLENBQUM7Z0JBQzNGLEtBQUssQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQztZQUMxRSxDQUFDLENBQUMsQ0FBQztZQUVILFVBQVUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDO2FBQ0QsRUFBRSxDQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUU7WUFDNUIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BCLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDaEMsSUFBSSxVQUFVLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztZQUVsQyxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO1lBQ3BELElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDckQsSUFBSSxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksU0FBUyxDQUFDLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRW5ELEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ2hCLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFDRixrQkFBQztBQUFELENBNUNBLEFBNENDLElBQUEiLCJmaWxlIjoiYWRtaW5TY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAvL3ZhciB1c2VyU2NyaXB0ID0gbmV3IHVzZXJTY3JpcHQoKTtcbiAgICB2YXIgYWRtaW5PdGhlcnMgPSBuZXcgQWRtaW5PdGhlcnMoKTtcblxuICAgICQoJy5mb3JtQWRkJykub24oJ2NsaWNrJywgJy5vcGVuRmllbGRzZXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnZmllbGRzZXRPcGVuJyk7XG4gICAgfSlcbiAgICAub24oJ2NsaWNrJywgJy5vcGVuRmllbGRzZXRWaWRlbycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAvKnZhciB2aWRlbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VsZWN0ZWRWaWRlb1wiKTtcblxuICAgICAgICBpZighdmlkZW8ucGF1c2VkKSB7XG4gICAgICAgICAgICB2aWRlby5wYXVzZSgpO1xuICAgICAgICB9Ki9cbiAgICB9KTtcblxuICAgIC8vdXNlclNjcmlwdC5jbG9zZU1lc3NhZ2UoJy51c2VyRXJyb3InLCAnI2Vycm9yTXNnQ2xvc2UnKTtcbiAgICBhZG1pbk90aGVycy5zaG93U2VsZWN0ZWRGaWxlKCcuZm9ybUZpZWxkc2V0Jyk7XG4gICAgYWRtaW5PdGhlcnMuYWR2YW5jZWRPcHRpb25zKFwiI21hbmFnZXJPcHRpb25zXCIsIFwiI2FkdmFuY2VkU2VhcmNoRGl2XCIpO1xuICAgIGFkbWluT3RoZXJzLnNob3dTZWxlY3RlZEZpbGUoJy5mb3JtRmllbGRzZXQnKTtcbn0pOyIsIi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIC8vYWRtaW5TY3JpcHQudG9nZ2xlTWVudShcIiNoZWFkZXJcIik7XG4gICAgLy9hZG1pblNjcmlwdC5tZW51QWNjb3JkaW9uKFwiLm1lbnVPcGVuZWRcIik7XG4gICAgXG4gICAgLy9EeW5hbWljIG1pbmltdW0gcGFnZSBoZWlnaHRcbiAgICBcbiAgICAkKFwiYm9keSA+IHNlY3Rpb25cIikucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICQoXCIuaW50ZXJmYWNlXCIpLmNzcygnbWluLWhlaWdodCcgLCAoJChkb2N1bWVudCkuaGVpZ2h0KCkgLSA3MCkgKyAncHgnKTtcbiAgICB9KTtcbiAgICAkKFwiI2hlYWRlclwiKS5vbignY2xpY2snLCAnI3NldHRpbmdzT3BlbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcjY29uZmlnQmFyJykudG9nZ2xlQ2xhc3MoJ2NvbmZpZ0Jhck9wZW4nKTtcbiAgICB9KTtcbn0pOyIsIi8qIFxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIHwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgQXRvbW8uY29tLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIHwgQCBBdXRob3JcdDogRGFuaWVsIFJpb3MuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qL1xuXG5jbGFzcyBBZG1pbk1lbnUge1xuICAgIC8vU2V0IHRoZSBtZW51IG9wZW4gYW5kIGNsb3NlXG5cblx0dG9nZ2xlTWVudShoZWFkZXI6c3RyaW5nKTp2b2lkIHtcblx0XHQkKGhlYWRlcikub24oXCJjbGlja1wiLCBcIi5jbG9zZU1lbnVcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKFwiY2xvc2VNZW51XCIpLmFkZENsYXNzKFwib3Blbk1lbnVcIik7XG5cdFx0XHQkKFwiLm1lbnVPcGVuZWRcIikucmVtb3ZlQ2xhc3MoXCJtZW51T3BlbmVkXCIpLmFkZENsYXNzKFwibWVudUNsb3NlZFwiKTtcblx0XHRcdCQoXCJzZWN0aW9uW2lkJD0nSW50ZXJmYWNlJ11cIikucmVtb3ZlQ2xhc3MoXCJib2R5TWVudU9wZW5lZFwiKS5hZGRDbGFzcyhcImJvZHlNZW51Q2xvc2VkXCIpO1xuXHRcdH0pO1xuXHRcdCQoaGVhZGVyKS5vbihcImNsaWNrXCIsIFwiLm9wZW5NZW51XCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcyhcIm9wZW5NZW51XCIpLmFkZENsYXNzKFwiY2xvc2VNZW51XCIpO1xuXHRcdFx0JChcIi5tZW51Q2xvc2VkXCIpLnJlbW92ZUNsYXNzKFwibWVudUNsb3NlZFwiKS5hZGRDbGFzcyhcIm1lbnVPcGVuZWRcIik7XG5cdFx0XHQkKFwic2VjdGlvbltpZCQ9J0ludGVyZmFjZSddXCIpLnJlbW92ZUNsYXNzKFwiYm9keU1lbnVDbG9zZWRcIikuYWRkQ2xhc3MoXCJib2R5TWVudU9wZW5lZFwiKTtcblx0XHR9KTtcblx0fVxuXG5cdC8vTWVudSBhY2NvcmRpb25cblxuXHRtZW51QWNjb3JkaW9uKG1lbnU6c3RyaW5nKTp2b2lkIHtcblx0XHQkKG1lbnUpLmZpbmQoXCIjdWxNZW51ID4gLml0ZW1NZW51ID4gLnN1Yk1lbnVJdGVtc1wiKS5oaWRlKCk7XG5cblx0XHQkKG1lbnUpLm9uKFwiY2xpY2tcIiwgXCIjdWxNZW51IC5pdGVtTWVudU9wZW5cIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHQkKHRoaXMpLmZpbmQoXCIuc3ViTWVudUl0ZW1zXCIpLnNsaWRlVXAoXCJub3JtYWxcIik7XG5cdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKFwiaXRlbU1lbnVPcGVuXCIpLmFkZENsYXNzKFwiaXRlbU1lbnVDbG9zZVwiKTtcblx0XHR9KTtcblx0XHRcblx0XHQkKG1lbnUpLm9uKFwiY2xpY2tcIiwgXCIjdWxNZW51IC5pdGVtTWVudUNsb3NlXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0JChcIiN1bE1lbnUgPiBsaVwiKS5maW5kKFwiLnN1Yk1lbnVJdGVtc1wiKS5zbGlkZVVwKFwibm9ybWFsXCIpO1xuXHRcdFx0JChcIiN1bE1lbnUgPiBsaVwiKS5uZXh0KCkucmVtb3ZlQ2xhc3MoXCJpdGVtTWVudU9wZW5cIikuYWRkQ2xhc3MoXCJpdGVtTWVudUNsb3NlXCIpO1xuXHRcdFx0XG5cdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKFwiaXRlbU1lbnVDbG9zZVwiKS5hZGRDbGFzcyhcIml0ZW1NZW51T3BlblwiKTtcblx0XHRcdCQodGhpcykuZmluZChcIi5zdWJNZW51SXRlbXNcIikuc2xpZGVEb3duKFwibm9ybWFsXCIpO1xuXHRcdH0pO1xuXHR9XG59IiwiLyogXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gfCBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBBdG9tby5jb20uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gfCBAIEF1dGhvclx0OiBEYW5pZWwgUmlvcy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiovXG5cbmNsYXNzIEFkbWluT3RoZXJzIHtcbiAgICAvL1Nob3cgdGhlIGFkdmFuY2VkIG9wdGlvbnNcblxuXHRhZHZhbmNlZE9wdGlvbnMoYnV0dG9uOnN0cmluZywgc2hvdzpzdHJpbmcpOnZvaWQge1xuXHRcdCQoYnV0dG9uKS5vbihcImNsaWNrXCIsIFwiLnNlYXJjaEFkdmFuY2VkQ2xvc2VcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKFwic2VhcmNoQWR2YW5jZWRDbG9zZVwiKS5hZGRDbGFzcyhcInNlYXJjaEFkdmFuY2VkT3BlblwiKTtcblx0XHRcdCQoc2hvdykucmVtb3ZlQ2xhc3MoXCJhZHZhbmNlZFNlYXJjaEhpZGVcIikuYWRkQ2xhc3MoXCJhZHZhbmNlZFNlYXJjaFNob3dcIik7XG5cdFx0fSk7XG5cdFx0XG5cdFx0JChidXR0b24pLm9uKFwiY2xpY2tcIiwgXCIuc2VhcmNoQWR2YW5jZWRPcGVuXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcyhcInNlYXJjaEFkdmFuY2VkT3BlblwiKS5hZGRDbGFzcyhcInNlYXJjaEFkdmFuY2VkQ2xvc2VcIik7XG5cdFx0XHQkKHNob3cpLnJlbW92ZUNsYXNzKFwiYWR2YW5jZWRTZWFyY2hTaG93XCIpLmFkZENsYXNzKFwiYWR2YW5jZWRTZWFyY2hIaWRlXCIpO1xuXHRcdH0pO1xuXHR9XG5cblx0Ly9VcGxvYWRcblxuXHRzaG93U2VsZWN0ZWRGaWxlKGRpdjpzdHJpbmcpOnZvaWQge1xuXHRcdCQoZGl2KS5vbignY2hhbmdlJywgJy5pbnB1dEltYWdlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXHRcdFx0dmFyIGZpbGVzID0gJHRoaXMucHJvcCgnZmlsZXMnKTtcblx0XHRcdHZhciBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuXHRcdFx0ZmlsZVJlYWRlci5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBpbWFnZVNlbGVjdGVkID0gZmlsZVJlYWRlci5yZXN1bHQ7XG5cdFx0XHRcdCR0aGlzLm5leHQoJy5maWxlSW5wdXRMYWJlbCcpLnJlbW92ZUNsYXNzKCdmaWxlSW5wdXRMYWJlbCcpLmFkZENsYXNzKCdzZWxlY3RlZElucHV0TGFiZWwnKTtcblx0XHRcdFx0JHRoaXMubmV4dCgnLnNlbGVjdGVkSW5wdXRMYWJlbCcpLmZpbmQoJ2ltZycpLmF0dHIoJ3NyYycsIGltYWdlU2VsZWN0ZWQpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGZpbGVSZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlc1swXSk7XG5cdFx0fSlcblx0XHQub24oJ2NoYW5nZScsICcuaW5wdXRWaWRlbycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKTtcblx0XHRcdHZhciBmaWxlcyA9ICR0aGlzLnByb3AoJ2ZpbGVzJyk7XG5cdFx0XHR2YXIgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cdFx0XHRcblx0XHRcdHZhciBibG9iID0gbmV3IEJsb2IoW2ZpbGVzWzBdXSwge3R5cGU6IGZpbGVzLnR5cGV9KTtcblx0XHRcdHZhciB2aWRlbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VsZWN0ZWRWaWRlb1wiKTtcblx0XHRcdHZhciB1cmwgPSAoVVJMIHx8IHdlYmtpdFVSTCkuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG5cdFx0XHR2aWRlby5zcmMgPSB1cmw7XG5cdFx0XHRmaWxlUmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGZpbGVzWzBdKTtcblx0XHR9KTtcblx0fVxufSJdfQ==
