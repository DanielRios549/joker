<?php
/*
 ***************************************************************
 | Copyright (c) 2014-2021 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
	if(!defined('THIS_PAGE')) {
		require '../_redirect.php';
		header("Location:" . $base . "404");
	}

	// Database information, for the site to connect and install before that.

	define ('DB_NAME', 'joker');

	define ('DB_USER', 'root');

	define ('DB_PASSWORD', '');

	define ('DB_HOST', 'localhost');

	define ('DB_CHARSET', 'utf8');

	//Keeps hierarchy if the page is not the installer

	if (THIS_PAGE != 'install') {

		$thisUrl = 'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];

		$baseCon = true;

		require 'connect.php';

		require 'importComponents.php';

		require 'install.php';

		$getConfig = new GetConfig();

		$allowNewUser = $getConfig -> configQuery('allowNewUser');

		$allowSaveLogin = $getConfig -> configQuery('allowSaveLogin');

		$baseUrl = $thisUrl . $getConfig -> configQuery('subFolder');

		$directPath = $getConfig -> configQuery('directPath');

		$adminDir = $baseUrl . $getConfig -> configQuery('adminDir');

		$adminLayoutDir = $getConfig -> configQuery('adminLayoutDir');

		$layoutDir = $getConfig -> configQuery('layoutDir');

		$imageDir = $baseUrl . $getConfig -> configQuery('imageDir');

		$styleDir = $baseUrl . $getConfig -> configQuery('styleDir');

		$scriptDir = $baseUrl . $getConfig -> configQuery('scriptDir');

		$fontDir = $baseUrl . $getConfig -> configQuery('fontDir');

		$verificationEmail = $getConfig -> configQuery('verificationEmail');

		$mediaImageFolder = $getConfig -> configQuery('mediaImageFolder');

		$userImageFolder = $getConfig -> configQuery('userImageFolder');

		$streamPlayer = $getConfig -> configQuery('streamPlayer');

		$livePlayer = $getConfig -> configQuery('livePlayer');

		require 'common.php';
	}
?>
