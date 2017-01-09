<?php
/* 
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
	if(!isset($baseCon)) {
		require '../../_redirect.php';
		header("Location:" . $base . "404");
	}
	
	class Install{
		public function configInstall(){
			$changeBaseUrl = @$_POST['baseUrl'];
			$changeAdminDir = @$_POST['adminDir'];
			$changeAdminLayoutDir = @$_POST['adminLayoutDir'];
			$changeLayoutDir = @$_POST['layoutDir'];
			$changeImageDir = @$_POST['imageDir'];
			$changeStyleDir = @$_POST['styleDir'];
			$changeScriptDir = @$_POST['scriptDir'];
			$changeFontDir = @$_POST['fontDir'];
			$changeDbHost = @$_POST['dbHost'];
			$changeDbUser = @$_POST['dbUser'];
			$changeDbPassword = @$_POST['dbPassword'];
			$changeDbName = @$_POST['dbName'];
		}
	}
?>