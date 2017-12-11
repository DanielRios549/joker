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

$(document).ready(function() {
    let thisPage = $('main').attr('data-page');

    $(window).on('scroll', function() {
        var topDiv = $('#topDiv');

        if ($(this).scrollTop() >= 300) {
            topDiv.removeClass('topDiv').addClass('topDivFixed');
        }
        else {
            topDiv.removeClass('topDivFixed').addClass('topDiv');
        }
    });

    $('#footer').on("click", "#topDiv", function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        },500);
    });
    if(thisPage == 'index')
        new Index();
    if(thisPage == 'title')
        new Title();
});
