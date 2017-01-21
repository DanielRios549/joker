/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

//Functions for all pages

$(document).ready(function() {
	selectMode('#selectMode');
    
	//Change class of header of all page

	$(window).on('scroll', function() {
		var header = $('#header');

		if ($(this).scrollTop() >= 300) {
			header.removeClass('header').addClass('headerFixed');
		}
		else {
			header.removeClass('headerFixed').addClass('header');
		}
	});
	
	$('#header').on("click", "#topDiv", function(event) {
		event.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		},500);
	});
});

//hide the replies

function hideReply(div) {
	$(div).on("click", ".noHide", function() {
		$(this).removeClass("noHide").addClass("hide");
	})
	.on("click", ".hide", function() {
		$(this).removeClass("hide").addClass("noHide");
	});
}

//Styles day and night

function selectMode(button) {
	$(button).on('click', '.selectDay', function() {
		$(this).removeClass('selectDay').addClass('selectNight');
		$('html > head > #styleMode').attr('href' , baseUrl + 'css/styleNight.css');
	});
	
	$(button).on('click', '.selectNight', function() {
		$(this).removeClass('selectNight').addClass('selectDay');
		$('html > head > #styleMode').attr('href' , baseUrl + 'css/styleDay.css');
	});
}

//Close Message

function closeMessage(errorDiv, errorBtn) {
	$(errorDiv).on("click", errorBtn, function() {
		$(this).parent().remove();
		location.href= history.go(-1);
	});
}

//Tab Select

function tabSelect(IsScroll) {
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

function episodeSelect(episodeSlider) {
	$(episodeSlider).on("click", ".seasonSelect .seasonSpan", function() {
		$("#seasonSelect").removeClass("seasonSelect").addClass("seasonSelectOpen");
		$(".seasonHide").removeClass("seasonHide").addClass("seasonShow");
	})
	.on("click", ".seasonSelectOpen .seasonSpan", function() {
		$("#seasonSelect").removeClass("seasonSelectOpen").addClass("seasonSelect");
		$(".seasonShow").removeClass("seasonShow").addClass("seasonHide");
		
		indice = $(this).parent();
		indice.removeClass("seasonHide").addClass("seasonShow");
		
		indiceShow = $(this).parent().index();
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

//Effect of external index

function parallaxExternalHome() {
	var sliderImg = $('#descImage > img');

	if ($(this).scrollTop() < 450) {
		$(sliderImg).css("top" , (window.pageYOffset / 2) + 'px');
	}
}

//Effect of internal index

function parallaxInternalHome() {
	var sliderImg = $('#contentSlider > div > div > img');

	if ($(this).scrollTop() < 300) {
		$(sliderImg).css("top" , (window.pageYOffset / 2) + 'px');
	}
}

function slideIndex() {
	if($(this).scrollTop() < 200) {
		if($('.imageShow').next().size()) {
			$('.imageShow').removeClass('imageShow').addClass('imageHide').next().removeClass('imageHide').addClass('imageShow');
		}
		else {
			$('.imageShow').removeClass('imageShow').addClass('imageHide');
			$('#contentSlider #imageDiv div:nth-of-type(1)').removeClass('imageHide').addClass('imageShow');
		}

		if($('.changeShow').next().size()) {
			$('.changeShow').removeClass('changeShow').addClass('changeHide').next().removeClass('changeHide').addClass('changeShow');
		}
		else {
			$('.changeShow').removeClass('changeShow').addClass('changeHide');
			$('#contentSlider #changeDiv div:nth-of-type(1)').removeClass('changeHide').addClass('changeShow');
		}
	}
}

function changeIndex(slider) {
	//Index buttons

	$(slider).on('click', '.changeHide', function() {
		clearInterval(intervalId);

		$('.changeShow').removeClass('changeShow').addClass('changeHide');
		$(this).removeClass('changeHide').addClass('changeShow');

		var indice = $(this).index();
		indice ++;

		$('#imageDiv .imageShow').removeClass('imageShow').addClass('imageHide');
		$('#imageDiv div:nth-of-type(' + indice + ')').removeClass('imageHide').addClass('imageShow');
	});

	//Previous button

	$(slider).on('click', '#previousImage', function() {
		clearInterval(intervalId);

		if($('.imageShow').prev().size()) {
			$('.imageShow').removeClass('imageShow').addClass('imageHide').prev().removeClass('imageHide').addClass('imageShow');
		}
		else {
			$('.imageShow').removeClass('imageShow').addClass('imageHide');
			$('#contentSlider #imageDiv div:last-child').removeClass('imageHide').addClass('imageShow');
		}

		var indice = $(this).parent().find('#imageDiv .imageShow').index('#imageDiv div');
		indice ++;

		$('#changeDiv div').removeClass('changeShow').addClass('changeHide');
		$('#changeDiv div:nth-of-type(' + indice + ')').removeClass('changeHide').addClass('changeShow');
	});

	//Next button

	$(slider).on('click', '#nextImage', function() {
		clearInterval(intervalId);

		if($('.imageShow').next().size()) {
			$('.imageShow').removeClass('imageShow').addClass('imageHide').next().removeClass('imageHide').addClass('imageShow');
		}
		else {
			$('.imageShow').removeClass('imageShow').addClass('imageHide');
			$('#contentSlider #imageDiv div:nth-of-type(1)').removeClass('imageHide').addClass('imageShow');
		}

		var indice = $(this).parent().find('#imageDiv .imageShow').index('#imageDiv div');
		indice ++;

		$('#changeDiv div').removeClass('changeShow').addClass('changeHide');
		$('#changeDiv div:nth-of-type(' + indice + ')').removeClass('changeHide').addClass('changeShow');
	});
}

function parallaxHeaderUser() {
	//Effect of header of profile page

	var imgDiv = $('#userHeaderImg');

	if ($(this).scrollTop() < 210) {
		$(imgDiv).css("top" , (window.pageYOffset / 2.6) + 'px');
	}

	//Change class of header of profile page

	var userHeader = $('#userHeader');
	var userHeaderImg = $('#userHeaderImg');

	if ($(this).scrollTop() >= 210) {
		userHeader.removeClass('userHeader');
		userHeader.addClass('userHeaderFixed');
		userHeaderImg.removeClass('userHeaderImg');
		userHeaderImg.addClass('userHeaderImgFixed');
	}
	else {
		userHeader.removeClass('userHeaderFixed');
		userHeader.addClass('userHeader');
		userHeaderImg.removeClass('userHeaderImgFixed');
		userHeaderImg.addClass('userHeaderImg');
	}
}

function parallaxImg() {
	//Effect of user image of profile page

	var img = document.getElementById('userImgFigure');

	if ($(this).scrollTop() < 210) {
		img.style.width = (150 - $(this).scrollTop() / 2.1) + 'px';
		img.style.height = (150 - $(this).scrollTop() / 2.1) + 'px';
		img.style.left = (0 + $(this).scrollTop() / 4.2) + 'px';
		img.style.top = (-120 + $(this).scrollTop() / 5.2) + 'px';
	}

	//Change class of user image of profile page

	var userImg = $('#userImgFigure');

	if ($(this).scrollTop() >= 210) {
		userImg.removeClass('userImgFigure');
		userImg.addClass('userImgFigureFixed');
	}
	else {
		userImg.removeClass('userImgFigureFixed');
		userImg.addClass('userImgFigure');
	}
}

function parallaxName() {
	//Effect of user name of profile page

	var name = document.getElementById('userNameDiv');

	if ($(this).scrollTop() < 210) {
		name.style.left = (220 - $(this).scrollTop() / 3.75) + 'px';
	}

	//Change class of user name div

	var userName = $('#userNameDiv');

	if ($(this).scrollTop() >= 210) {
		userName.removeClass('userNameDiv');
		userName.addClass('userNameDivFixed');
	}
	else {
		userName.removeClass('userNameDivFixed');
		userName.addClass('userNameDiv');
	}
}

function inputError(parentDiv) {
	$(parentDiv).on('focusout', '.inputText', function() {
		if($(this).val().length < 1) {
			$(this).removeClass('inputText').addClass('inputTextError');
		}
	});
	
	$(parentDiv).on('focusout', '.inputTextError', function() {
		if($(this).val().length >= 1) {
			$(this).removeClass('inputTextError').addClass('inputText');
		}
	});
}

function secureLogoff() {
	if(!document.cookie.match('PHPSESSID')) {
		window.location.replace(baseUrl + 'logoff');
	}
}

function disableEnable() {
	$("#commentInput").keyup(function() {
		var commentBefore = $(this).val();
		var checkCommentBefore = commentBefore.trim();

		if(checkCommentBefore == '') {
			$('#commentSubmit').attr('disabled', true);
		}
		else {
			$('#commentSubmit').removeAttr('disabled');
		}
	});
}

function showDetails(event) {
	event.preventDefault();
	
	var parentDiv = $(this).parent().parent().parent().parent().parent().parent().parent();
	var detailsDiv = $(parentDiv).find('.titleDetails');
	parentDiv.toggleClass('open');

	if(!$(detailsDiv).length) {
		parentDiv.append('<div class="titleDetails"></div');
	}
	else {
		detailsDiv.remove();
	}
}
	