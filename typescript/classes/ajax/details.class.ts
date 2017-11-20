/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

export class Details extends Ajax {
    showDetails(event?:any):void {
        event.preventDefault();
        var contentLink = $(this).find('.contentLink').attr('href');
        var contentLinkToBack = $(this).find('.contentLink').attr('data-url');
        var contentTitleToBack = $(this).find('.contentLink').attr('data-title');
        $('.closeButton').attr('data-url', contentLinkToBack);
        $('.closeButton').attr('data-title', contentTitleToBack);

        var allcontainerDiv = $('.contentContainer .titleDetailsOpen');
        var allcontentDiv = $('.contentContainer .contentDiv .contentOpen');
        
        var contentDiv = $(this);//content
        var parentDiv = contentDiv.parent();//contentGroup
        var containerDiv = parentDiv.parent().parent();//contentContainer

        allcontainerDiv.find('.sectionContent article').remove();

        allcontainerDiv.removeClass('titleDetailsOpen').addClass('titleDetails');
        allcontentDiv.removeClass('contentOpen').addClass('content');
        $(this).removeClass('content').addClass('contentOpen');
        
        containerDiv.find('.titleDetails').removeClass('titleDetails').addClass('titleDetailsOpen');
        
        if(parentDiv.attr('class') == 'contentGroup') {
            $('html, body').animate({
                scrollTop: containerDiv.find('.titleDetailsOpen').offset().top - 150
            },500);
        }
        this.getPage(contentLink, "body=true", function(data) {
            var filter:any = $(data).children();
            //console.log(data);
            $('.titleDetailsOpen').find('.sectionContent').html(filter);
            this.changeUrl(contentLink);
        });
    }

    closeDetails():void {
        var containerDiv = $(this).parent().parent().parent();//contentContainer
        var allcontainerDiv = $('.contentContainer .titleDetailsOpen');
        var allcontentDiv = $('.contentContainer .contentDiv div');
        var offsetDetailsDiv = containerDiv.offset().top;
        var linkToBack = $(this).attr('data-url');
        var titleToBack = $(this).attr('data-title');

        $('html, body').animate({
            scrollTop: offsetDetailsDiv
        },500, function() {
            allcontainerDiv.removeClass('titleDetailsOpen').addClass('titleDetails');
            $('.titleDetails').find('.sectionContent article').remove();
            $('.titleDetailsOpen').find('.sectionContent article').remove();
            allcontentDiv.find('.contentOpen').removeClass('contentOpen').addClass('content');
            
            this.changeUrl(linkToBack);
            $('title').empty().text(titleToBack);
        });
    }
}