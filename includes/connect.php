<?php
/* 
 ***************************************************************
 | Copyright (c) 2014-2021 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/	
	if(!isset($baseCon)) {
		$base = '../';
		require $base . '404.php';
	}
	
	require_once 'classes/connect.class.php';

	$connection = new Connect();
	//$connection -> connect();

	$connect = $connection -> getConnection();
	$pdo = $connect;

	//print_r($connection);
?>