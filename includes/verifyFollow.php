<?php
/* 
 ***************************************************************
 | Copyright (c) 2014-2021 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 *****
*/
    if(!isset($baseUrl)) {
		$base = '../';
		require $base . '404.php';
	}
	else {
		$followVerifyClass = new VerifyFollow();
		$followVerifyClass -> verify($followId, $userId);
		$followAction = $followVerifyClass -> getCheck();
	}
 ?>