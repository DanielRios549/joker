<?php
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
	if(!defined('THIS_PAGE')) {
		require '../_redirect.php';
		header("Location:" . $base . "404");
	}

	$currentServerUrl  = 'http://' . $_SERVER['HTTP_HOST'] . '/';

	$thisUrl = 'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
	
	$baseCon = true;

	require 'connect.php';

	require 'importComponents.php';
	
	require 'install.php';

	$getConfig = new GetConfig();
    
    $allowNewUser = $getConfig -> configQuery('allowNewUser');

	$baseUrl = $currentServerUrl . $getConfig -> configQuery('baseUrl');

	$atomoBaseUrl = $getConfig -> configQuery('atomoBaseUrl');

	$adminDir = $baseUrl . $getConfig -> configQuery('adminDir');

	$adminLayoutDir = $getConfig -> configQuery('adminLayoutDir');

	$layoutDir = $getConfig -> configQuery('layoutDir');

	$imageDir = $baseUrl . $getConfig -> configQuery('imageDir');

	$styleDir = $baseUrl . $getConfig -> configQuery('styleDir');

	$scriptDir = $baseUrl . $getConfig -> configQuery('scriptDir');

	$fontDir = $baseUrl . $getConfig -> configQuery('fontDir');
	
	$mediaImageFolder = $getConfig -> configQuery('mediaImageFolder');
	
	$streamPlayer = $getConfig -> configQuery('streamPlayer');
	
	$livePlayer = $getConfig -> configQuery('livePlayer');
	
	require 'common.php';
?>
