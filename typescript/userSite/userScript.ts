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
    // Get the page and instance the pages classes

    let thisPage:string = $('main').attr('data-page');
    let index = new Index();
    let profile = new Profile();
    let title = new Title();

    //Make the header be fixed when scrolling down, actually with no use

    $(window).on('scroll', function() {
        var topDiv = $('#topDiv');

        if ($(this).scrollTop() >= 300) {
            topDiv.removeClass('topDiv').addClass('topDivFixed');
        }
        else {
            topDiv.removeClass('topDivFixed').addClass('topDiv');
        }
    });

    //Show the "Go to top" buuton when scrolling down

    $('#footer').on("click", "#topDiv", function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        },500);
    });

    //Add the events according the page

    if(thisPage == 'index') {
        index.index();
    }
    else if(thisPage == 'title') {
        title.title();
    }
    else if(thisPage == 'profile') {
        profile.follow();

        $(this).on('scroll', function() {
            profile.parallax();
        });
    }
    else if(thisPage == 'category' || 'search') {
        index.details();
    }
});
