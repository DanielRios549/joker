/* 
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

$(document).ready(function() {
	adminScript.toggleMenu("#header");
	//adminScript.menuAccordion(".menuOpened");
    
    //Dynamic minimum page height
    
    $("body > section").ready(function() {
        $(".interface").css('min-height' , ($(document).height() - 70) + 'px');
	});
	$("#header").on('click', '#settingsOpen', function() {
		$('#configBar').toggleClass('configBarOpen');
	});
});

var adminScript = {
	//Set the menu open and close

	toggleMenu: function(header) {
		$(header).on("click", ".closeMenu", function() {
			$(this).removeClass("closeMenu").addClass("openMenu");
			$(".menuOpened").removeClass("menuOpened").addClass("menuClosed");
			$("section[id$='Interface']").removeClass("bodyMenuOpened").addClass("bodyMenuClosed");
		});
		$(header).on("click", ".openMenu", function() {
			$(this).removeClass("openMenu").addClass("closeMenu");
			$(".menuClosed").removeClass("menuClosed").addClass("menuOpened");
			$("section[id$='Interface']").removeClass("bodyMenuClosed").addClass("bodyMenuOpened");
		});
	},

	//Menu accordion

	menuAccordion: function(menu) {
		$(menu).find("#ulMenu > .itemMenu > .subMenuItems").hide();

		$(menu).on("click", "#ulMenu .itemMenuOpen", function() {
			$(this).find(".subMenuItems").slideUp("normal");
			$(this).removeClass("itemMenuOpen").addClass("itemMenuClose");
		});
		
		$(menu).on("click", "#ulMenu .itemMenuClose", function() {
			$("#ulMenu > li").find(".subMenuItems").slideUp("normal");
			$("#ulMenu > li").next().removeClass("itemMenuOpen").addClass("itemMenuClose");
			
			$(this).removeClass("itemMenuClose").addClass("itemMenuOpen");
			$(this).find(".subMenuItems").slideDown("normal");
		});
	},

	//Show the advanced options

	advancedOptions: function(button, show) {
		$(button).on("click", ".searchAdvancedClose", function() {
			$(this).removeClass("searchAdvancedClose").addClass("searchAdvancedOpen");
			$(show).removeClass("advancedSearchHide").addClass("advancedSearchShow");
		});
		
		$(button).on("click", ".searchAdvancedOpen", function() {
			$(this).removeClass("searchAdvancedOpen").addClass("searchAdvancedClose");
			$(show).removeClass("advancedSearchShow").addClass("advancedSearchHide");
		});
	},

	//Upload

	showSelectedFile: function(div) {
		$(div).on('change', '.inputImage', function() {
			var $this = $(this);
			var files = $this.prop('files');
			var fileReader = new FileReader();

			fileReader.addEventListener('load', function() {
				var imageSelected = fileReader.result;
				$this.next('.fileInputLabel').removeClass('fileInputLabel').addClass('selectedInputLabel');
				$this.next('.selectedInputLabel').find('img').attr('src', imageSelected);
			});

			fileReader.readAsDataURL(files[0]);
		})
		.on('change', '.inputVideo', function() {
			var $this = $(this);
			var files = $this.prop('files');
			var fileReader = new FileReader();
			
			var blob = new Blob([files[0]], {type: files.type});
			var video = document.getElementById("selectedVideo");
			var url = (URL || webkitURL).createObjectURL(blob);

			video.src = url;
			fileReader.readAsArrayBuffer(files[0]);
		});
	}
};