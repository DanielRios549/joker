/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

export class Config {
    public baseUrl:string = $('head').attr('data-url');
    public cookieId:string = $('head').attr('data-cookie');
    
    //var intervalLogoff:number = setInterval(userScript.secureLogoff(baseUrl), 250);
}