/* 
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

class AdminMenu {
    //Set the menu open and close

	toggleMenu(header:string):void {
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
	}

	//Menu accordion

	menuAccordion(menu:string):void {
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
	}
}