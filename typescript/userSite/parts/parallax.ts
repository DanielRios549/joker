/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

class Parallax {
    //Effect of external index

	parallaxHome():void {
		var parallaxOut:string = '#descImage > img';
		var parallaxIn:string = '#contentSlider > article > div > img';

		if ($(document).scrollTop() < 450) {
			$(parallaxOut).css("top" , (window.pageYOffset / 2) + 'px');
			$(parallaxIn).css("top" , (window.pageYOffset / 2) + 'px');
		}
	}

	parallaxHeaderUser():void {
		//Effect of header of profile page

		if ($(document).scrollTop() < 210) {
			var imgDiv = $('#userHeaderImg');
			$(imgDiv).css("top" , (window.pageYOffset / 2.6) + 'px');
		}

		//Change class of header of profile page

		var userHeader = $('#userHeader');
		var userHeaderImg = $('#userHeaderImg');

		if ($(document).scrollTop() >= 210) {
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

	parallaxImg():void {
		//Effect of user image of profile page

		var img = document.getElementById('userImgFigure');

		if ($(document).scrollTop() < 210) {
			img.style.width = (150 - $(document).scrollTop() / 2.9) + 'px';
			img.style.height = (150 - $(document).scrollTop() / 2.9) + 'px';
			img.style.left = (0 + $(document).scrollTop() / 4.9) + 'px';
			img.style.top = (-120 + $(document).scrollTop() / 5.7) + 'px';
		}

		//Change class of user image of profile page

		var userImg = $('#userImgFigure');

		if ($(document).scrollTop() >= 210) {
			userImg.removeClass('userImgFigure');
			userImg.addClass('userImgFigureFixed');
		}
		else {
			userImg.removeClass('userImgFigureFixed');
			userImg.addClass('userImgFigure');
		}
	}

	parallaxName():void {
		//Effect of user name of profile page

		var name = document.getElementById('userNameDiv');

		if ($(document).scrollTop() < 210) {
			name.style.left = (220 - $(document).scrollTop() / 3.75) + 'px';
		}

		//Change class of user name div

		var userName = $('#userNameDiv');

		if ($(document).scrollTop() >= 210) {
			userName.removeClass('userNameDiv');
			userName.addClass('userNameDivFixed');
		}
		else {
			userName.removeClass('userNameDivFixed');
			userName.addClass('userNameDiv');
		}
	}

	posterParalax(image:string):void {
		var $poster = $(image);
		var $shine = $poster.find('.shine');
		var $layer = $poster.find('*[class*="layer-"]');
		var w = $poster.width();
		var h = $poster.height();

		$poster.on('mousemove', function(e) {
			$('.mainSection').css({
				'transform-style': 'preserve-3d',
				'transform': 'perspective(1000px)'
			}),
			$('#imageBack').css({
				'top': '0'
			});

			//var offsetX = 0.5 - e.pageX / w; // cursor hor
			//var offsetY = 0.5 - e.pageY / h; // cursor vert
			var offsetX = 0.5 - e.pageX / w; // cursor hor
			var offsetY = 0.5 - e.pageY / h; // cursor vert
			var dx = e.pageX - w / 2; // poster center hor
			var dy = e.pageY - h / 2; // poster center vert
			var theta = Math.atan2(dy, dx); // angle b/w cursor and poster center in RAD
			var angle = theta * 180 / Math.PI - 90; // convert rad to degrees
			var offsetPoster = $poster.data('offset');
			var transformPoster = 'translateY(' + -offsetX * offsetPoster + 'px) rotateX(' + (-offsetY * offsetPoster) + 'deg) rotateY(' + (offsetX * (offsetPoster * 2)) + 'deg)';
			$poster.css('transform', transformPoster);

			if (angle < 0) {
				angle = angle + 360;
			}

			$shine.css('background', 'linear-gradient(' + angle + 'deg, rgba(0, 0, 0,' + e.pageY / h + ') 0%,rgba(0, 0, 0, 0) 80%)');
			
			$layer.each(function() {
				var $this = $(this);
				var offsetLayer = $this.data('offset') || 0;
				var transformLayer = 'translateX(' + offsetX * offsetLayer + 'px) translateY(' + offsetY * offsetLayer + 'px)';
				
				$this.css('transform', transformLayer);
			});
		});
	}
}