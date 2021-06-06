<?php
/* 
 ***************************************************************
 | Copyright (c) 2014-2021 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/	
	if(!isset($baseCon)) {
		require '../_redirect.php';
		header("Location:" . $base . "404");
	}
	
	require_once 'classes/connect.class.php';

	$connection = new Connect(DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_CHARSET, THIS_PAGE);

	$connect = $connection -> getConnection();
	$pdo = $connect;

	//print_r($connection);
?>