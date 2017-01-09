<?php
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

/*
sass --no-cache css/sass/userSite/style.scss:css/userStyle.css --style compressed
																	   compact
																	   expanded

sass --no-cache css/sass/adminSite/style.scss:css/adminStyle.css --style compressed
																		 compact
																		 expanded
	
*/
	if(!defined('THIS_PAGE')) {
		require '../_redirect.php';
		header("Location:" . $base . "404");
	}
	
	$baseCon = true;

	require 'connect.php';

	require 'importComponents.php';
	
	require 'install.php';

	$getConfig = new GetConfig();
    
    $allowNewUser = $getConfig -> configQuery('allowNewUser');

	$baseUrl = $getConfig -> configQuery('baseUrl');

	$atomoBaseUrl = $getConfig -> configQuery('atomoBaseUrl');

	$adminDir = $baseUrl . $getConfig -> configQuery('adminDir');

	$adminLayoutDir = $getConfig -> configQuery('adminLayoutDir');

	$layoutDir = $getConfig -> configQuery('layoutDir');

	$imageDir = $baseUrl . $getConfig -> configQuery('imageDir');

	$styleDir = $baseUrl . $getConfig -> configQuery('styleDir');

	$scriptDir = $baseUrl . $getConfig -> configQuery('scriptDir');

	$fontDir = $baseUrl . $getConfig -> configQuery('fontDir');
	
	$mediaImageFolder = $getConfig -> configQuery('mediaImageFolder');
	
	require 'common.php';
?>
