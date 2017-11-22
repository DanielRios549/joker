/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

$(document).ready(function() {
    //adminScript.toggleMenu("#header");
    //adminScript.menuAccordion(".menuOpened");
    
    //Dynamic minimum page height
    
    $("body > section").ready(function() {
        $(".interface").css('min-height' , ($(document).height() - 70) + 'px');
    });
    $("#header").on('click', '#settingsOpen', function() {
        $('#configBar').toggleClass('configBarOpen');
    });
});