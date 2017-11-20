/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

//Import all classes and configs

import {Config} from './classes/config.class';

//Ajax scripts

import {Ajax} from './classes/ajax/ajax.class';
import {Details} from './classes/ajax/details.class';
import {Comments} from './classes/ajax/comments.class';
import {Follow} from './classes/ajax/follow.class';
import {Watchlist} from './classes/ajax/watchlist.class';

//User scripts

import {Login} from './classes/user/login.class';
import {Parallax} from './classes/user/parallax.class';
import {Slide} from './classes/user/slide.class';
import {UserOthers} from './classes/user/others.class';

//Admin scripts

import {AdminMenu} from './classes/admin/menu.class';
import {AdminOthers} from './classes/admin/others.class';

//Create the events

import {} from './events/all';
import {Index} from './events/index';
import {} from './events/admin';

var test = {
    'name': 'Daniel',
    'surName': 'Rios',
    'fullName' : function() {
        return this;
    },
    'fullName2': () => {
        return this;
    }
}