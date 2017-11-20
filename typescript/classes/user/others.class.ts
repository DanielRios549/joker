/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

export class UserOthers {
    /**
	 * hide the replies
	 */
    
    hideReply(div:string):void {
		$(div).on("click", ".noHide", function() {
			$(this).removeClass("noHide").addClass("hide");
		})
		.on("click", ".hide", function() {
			$(this).removeClass("hide").addClass("noHide");
		});
    }
    //Close Message

	closeMessage(errorDiv:string, errorBtn:string):void {
		$(errorDiv).on("click", errorBtn, function() {
			$(this).parent().remove();
			//location.href = history.go(-1);
		});
	}

	//Tab Select

	tabSelect(IsScroll:boolean):void {
		var scroll = IsScroll ? IsScroll : false;

		$("#tabHeader").on("click", ".tab", function() {
			$("#tabHeader .tabSelected").removeClass("tabSelected").addClass("tab");
			$(this).removeClass("tab").addClass("tabSelected");
			
			var indice = $(this).index();
			indice ++;
			
			$("#tabContents .contentShow").removeClass('contentShow').addClass('contentHide');
			$("#tabContents .contentHide:nth-of-type(" + indice + ")").removeClass('contentHide').addClass('contentShow');
		})
		.on('click', 'div', function(event) {
			if(scroll == true) {
				event.preventDefault();
				$('html, body').animate({
					scrollTop: 450
				},500);
			}
		});
	}

	//Episode Select

	episodeSelect(episodeSlider:string):void {
		$(episodeSlider).on("click", ".seasonSelect .seasonSpan", function() {
			$("#seasonSelect").removeClass("seasonSelect").addClass("seasonSelectOpen");
			$(".seasonHide").removeClass("seasonHide").addClass("seasonShow");
		})
		.on("click", ".seasonSelectOpen .seasonSpan", function() {
			$("#seasonSelect").removeClass("seasonSelectOpen").addClass("seasonSelect");
			$(".seasonShow").removeClass("seasonShow").addClass("seasonHide");
			
			var indice = $(this).parent();
			indice.removeClass("seasonHide").addClass("seasonShow");
			
			var indiceShow = $(this).parent().index();
			indiceShow ++;
			
			$("#episodeDiv .seasonGroupShow").removeClass("seasonGroupShow").addClass("seasonGroupHide");
			$("#episodeDiv .contentGroup:nth-of-type(" + indiceShow + ")").removeClass("seasonGroupHide").addClass("seasonGroupShow");
			
			if($("#episodeDiv .contentGroup:nth-of-type(" + indiceShow + ")").width() > $("#episodeDiv").width()) {
				$("#episodeDiv").find('.nextHide').removeClass('nextHide').addClass('nextShow');
			}
			else {
				$("#episodeDiv").find('.nextShow').removeClass('nextShow').addClass('nextHide');
			}
		});

		//Episode Select Close

		$(episodeSlider).on("mouseleave", ".seasonSelectOpen", function() {
			var indexClose = $("#episodeDiv .seasonGroupShow").index();
			indexClose++;

			$("#seasonSelect").removeClass("seasonSelectOpen").addClass("seasonSelect");
			$(".seasonShow").removeClass("seasonShow").addClass("seasonHide");
			$(".seasonHide:nth-of-type(" + indexClose + ")").removeClass("seasonHide").addClass("seasonShow");
		});
	}
	
	disableEnable():void {
		$("#commentInput").keyup(function() {
			var commentBefore = $(this).val();
			var checkCommentBefore = (commentBefore as any).trim();

			if(checkCommentBefore == '') {
				//$('#commentSubmit').attr('disabled', true);
				$('#commentSubmit').attr('disabled');
			}
			else {
				$('#commentSubmit').removeAttr('disabled');
			}
		});
	}
}