/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

class Login {
    inputError(parentDiv:string):void {
		$(parentDiv).on('focusout', '.inputText', function() {
			if(($(this) as any).val().length < 1) {
				$(this).removeClass('inputText').addClass('inputTextError');
			}
		});
		
		$(parentDiv).on('focusout', '.inputTextError', function() {
			if(($(this) as any).val().length >= 1) {
				$(this).removeClass('inputTextError').addClass('inputText');
			}
		});
	}

	secureLogoff(url):void {
		if(!document.cookie.match('login')) {
			location.replace(url + 'logoff');
		}
	}
}