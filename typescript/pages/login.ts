/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

$(document).ready(function() {
    //Close the message displayed when has some error

    var others = new UserOthers();
    var login = new Login();

    login.inputError('.userDiv');
    others.closeMessage('.userError', '#errorMsgClose');
});