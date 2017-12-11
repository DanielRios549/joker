/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

class Index {
    constructor() {
        var parallax = new Parallax();
        var slide = new Slide();
        var watchlist = new Watchlist();
        var details = new Details();
        var userOthers = new UserOthers();

        //Not connected

        $(document).on('scroll', function() {
            parallax.parallaxHome();
        });

        userOthers.tabSelect(false);

        //Connected

        if($('#contentSlider #changeDiv').length) {
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
}