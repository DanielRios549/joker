/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

$(document).ready(function() {
    //var userScript = new userScript();
    var adminOthers = new AdminOthers();

    $('.formAdd').on('click', '.openFieldset', function() {
        $(this).toggleClass('fieldsetOpen');
    })
    .on('click', '.openFieldsetVideo', function() {
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