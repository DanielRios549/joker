/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

export class Slide {
    slideIndex():void {
		if($(this).scrollTop() < 200) {
			if(($('.imageShow') as any).next().size()) {
				$('.imageShow').removeClass('imageShow').addClass('imageHide').next().removeClass('imageHide').addClass('imageShow');
			}
			else {
				($('.imageShow') as any).removeClass('imageShow').addClass('imageHide');
				$('#contentSlider #imageDiv div:nth-of-type(1)').removeClass('imageHide').addClass('imageShow');
			}

			if(($('.changeShow') as any).next().size()) {
				$('.changeShow').removeClass('changeShow').addClass('changeHide').next().removeClass('changeHide').addClass('changeShow');
			}
			else {
				$('.changeShow').removeClass('changeShow').addClass('changeHide');
				$('#contentSlider #changeDiv div:nth-of-type(1)').removeClass('changeHide').addClass('changeShow');
			}
		}
	}

	changeIndex(slider):void {
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

			if(($('.imageShow') as any).prev().size()) {
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

			if(($('.imageShow') as any).next().size()) {
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
}