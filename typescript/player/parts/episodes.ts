/* 
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

function episodeSelectPlayer() {
	$("#seasonSelect").ready(function() {
		$(this).on("click", "#openSelector #openSpan", function() {
			$(".seasonGroupShow").removeClass("seasonGroupShow").addClass("seasonGroupHide");
			$("#seasonSelect").removeClass("seasonSelectHide").addClass("seasonSelectShow");

			/*var parentHeight = 0;
			$(this).parent().parent().parent().parent()
			.find('#seasonSelect .season').each(function() {
				parentHeight += $(this).outerHeight();
			});
			$(this).parent().parent().parent().parent().css({
				'height': parentHeight + 'px'
			});*/
		});
		$(this).on("click", ".seasonSelectShow .season", function() {
			$(".seasonSelectShow").removeClass("seasonSelectShow").addClass("seasonSelectHide");
			$(".seasonNameShow").removeClass("seasonNameShow").addClass("seasonNameHide");

			indiceShow = $(this).index();
			indiceShow ++;

			$("#episodeSelect #seasonGroup" + indiceShow).removeClass("seasonGroupHide").addClass("seasonGroupShow");
			$("#episodeSelect #seasonName" + indiceShow).removeClass("seasonNameHide").addClass("seasonNameShow");

			$(".episodeOpen").removeClass("episodeOpen").addClass("episodeClose");
			$(".episodeClose:nth-of-type(1)").removeClass("episodeClose").addClass("episodeOpen");

			//$('#episodesDiv').removeAttr('style');
		});
	});
	$("#episodeList").on("click", ".seasonGroupShow .episodeClose", function() {
		$(".seasonGroupShow .episodeOpen").removeClass("episodeOpen").addClass("episodeClose");
		$(this).removeClass("episodeClose").addClass("episodeOpen");
	});

	/*$('#episodesDiv').on('mouseout', function() {
		$(this).removeAttr('style');
	});*/
}