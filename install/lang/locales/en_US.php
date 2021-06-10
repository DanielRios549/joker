<?php
/* 
 ***************************************************************
 | Copyright (c) 2014-2021 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
	if(!defined('THIS_PAGE')) {
		$base = '../../';
		require $base . '404.php';
	}

	/* Languages configs */
	
	define ('LANG' , 'en');
	define ('LOCALE' , 'en_US');
	define ('CHARSET' , 'UTF-8');
	
	/* Languages countries */
	
	define ('LANGS' , 'Languages');
	define ('EN_US' , 'English');
	define ('PT_BR' , 'Portuguese');
	
	/* Install Page */
		
	define ('SUB_FOLDER' , 'Type bellow the subfolder where the site is located. Leave empty if it is on root');
	define ('INSTALL', 'Install');
	define ('START', 'Continue');
	define ('INFO', 'You are about to install Joker database.');
	define ('DATABASE_INFO', 'According to the config file, the database will be called');
?>
