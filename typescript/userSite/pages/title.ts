/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

class Title {
    constructor() {
        var userOthers = new UserOthers();
        var watchlist = new Watchlist();
        var comments = new Comments();

        userOthers.tabSelect(false);
        userOthers.hideReply(".commentGroup");
        userOthers.episodeSelect("#seasonBrowse");
            
        $('#contentSortcuts').on('click', '.addWatchList', watchlist.addWatchList);
        $('#contentSortcuts').on('click', '.removeWatchList', watchlist.removeWatchList);
    
        $('#commentFormDiv').on('click', '#commentSubmit', comments.makeComment);
        $('#commentOptionsDiv').on('click', '#buttonEdit', comments.editComment);
        $('#commentOptionsDiv').on('click', '#buttonDelete', comments.deleteComment);
    
        userOthers.disableEnable();
        //posterParalax('#contentImage');
    }
}