/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

class Index {
    index() {
        this.details();
        this.paralax();
        this.tabSelect();
        this.slide();
        this.watchlist();
    }

    details() {
        var details = new Details();

        $('.contentGroup').on('click', '.content', details.showDetails);
        $('.contentGroupScroll').on('click', '.content', details.showDetails);
        $('.contentContainer').on('click', '.closeButton', details.closeDetails);
    }

    paralax() {
        var parallax = new Parallax();

        $(document).on('scroll', function() {
            parallax.parallaxHome();
        });
    }

    tabSelect() {
        var userOthers = new UserOthers();
        userOthers.tabSelect(false);
    }

    slide() {
        var slide = new Slide();
        
        if($('#contentSlider #changeDiv').length) {
            //var intervalId = setInterval(slide.slideIndex, 5000);

            slide.changeIndex('#contentSlider');
        }
    }

    watchlist() {
        var watchlist = new Watchlist();
        
        $('#imageDiv div').on('click', '.addWatchList', watchlist.addWatchListIndex);
        $('#imageDiv div').on('click', '.removeWatchList', watchlist.removeWatchListIndex);

        $('.contentGroupScroll').on('click', '.content .addWatchList', watchlist.addWatchListIndex);
        $('.contentGroupScroll').on('click', '.content .removeWatchList', watchlist.removeWatchListIndex);
    }
}