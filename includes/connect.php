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
	
	require_once 'classes/connect.class.php';

	$connection = new Connect();

	$connect = $connection -> getConnection();
	$pdo = $connect;

	//print_r($connection);
?>