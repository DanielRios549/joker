<?php
/*
 ***************************************************************
 | Copyright (c) 2014-2021 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
	if(!defined('THIS_PAGE')) {
		$base = '../';
		require $base . '404.php';
	}
	else {

		$thisProtocol = isset($_SERVER["HTTPS"]) ? 'https://' : 'http://';

		$thisDomain = $thisProtocol . $_SERVER['SERVER_NAME'] . '/';

		// Database information, for the site to connect and install before that.

		define ('DB_NAME', 'joker');

		define ('DB_USER', 'root');

		define ('DB_PASSWORD', '');

		define ('DB_HOST', 'localhost');

		define ('DB_CHARSET', 'utf8');

		//Keeps hierarchy if the page is not the installer

		if (THIS_PAGE != 'install') {
			$baseCon = true;  # Used to validate the components files, they are called before setting up

			require_once 'connect.php';

			require_once 'importComponents.php';

			$getConfig = new GetConfig();

			$baseUrl = $thisDomain . $getConfig -> configQuery('subFolder');
			
			$adminDir = $baseUrl . 'admin/';

			$imageDir = $baseUrl . 'images/';

			$styleDir = $baseUrl . 'css/';

			$scriptDir = $baseUrl . 'javascript/';

			$fontDir = $baseUrl . 'fonts/';

			$layoutDir = @$base . 'layout/';

			$adminLayoutDir = @$base . '../layout/admin/';

			$allowNewUser = $getConfig -> configQuery('allowNewUser');

			$allowSaveLogin = $getConfig -> configQuery('allowSaveLogin');

			$verificationEmail = $getConfig -> configQuery('verificationEmail');

			$directPath = $getConfig -> configQuery('directPath');

			$mediaImageFolder = $getConfig -> configQuery('mediaImageFolder');

			$userImageFolder = $getConfig -> configQuery('userImageFolder');

			$streamPlayer = $getConfig -> configQuery('streamPlayer');

			$livePlayer = $getConfig -> configQuery('livePlayer');

			require_once 'common.php';
		}
	}
?>
