<?php
/* 
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
	if(!isset($baseCon)) {
		require '../_redirect.php';
		header("Location:" . $base . "404");
	}

	$functionsDir = 'functions/';
	$interfacesDir = 'interfaces/';
    $classesDir = 'classes/';

	//import the functions
	
	require_once $functionsDir . 'categoryId.php';
	require_once $functionsDir . 'dynamicFolder.php';
	require_once $functionsDir . 'links.php';
	require_once $functionsDir . 'getBrowser.php';
	require_once $functionsDir . 'getEnumOptions.php';
	require_once $functionsDir . 'continueWatching.php';
	require_once $functionsDir . 'alert.php';

	//import the interfaces
	
	require_once $interfacesDir . 'verify.interface.php';

	//Import the  classes
	
	require_once $classesDir . 'getConfig.class.php';
    require_once $classesDir . 'install.class.php';
	require_once $classesDir . 'lang.class.php';
	require_once $classesDir . 'loginCheck.class.php';
	require_once $classesDir . 'premiumCheck.class.php';
	require_once $classesDir . 'adminCheck.class.php';
	require_once $classesDir . 'logoff.class.php';
    require_once $classesDir . 'login.class.php';
	require_once $classesDir . 'sigin.class.php';
	require_once $classesDir . 'contentMenu.class.php';
	require_once $classesDir . 'showContent.class.php';
	require_once $classesDir . 'verifyContent.class.php';
	require_once $classesDir . 'verifyFollow.class.php';
	require_once $classesDir . 'userTitle.class.php';
	require_once $classesDir . 'userMenu.class.php';
    require_once $classesDir . 'abstract/dash.class.php';
	require_once $classesDir . 'admin/adminTitle.class.php';
	require_once $classesDir . 'admin/adminMenu.class.php';
	require_once $classesDir . 'admin/adminCreate.class.php';
    require_once $classesDir . 'admin/adminShowTable.class.php';
    require_once $classesDir . 'admin/adminEdit.class.php';
?>