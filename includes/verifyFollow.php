<?php
/* 
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 *****
*/
    if(!isset($baseUrl)) {
		require '../_redirect.php';
		header("Location:" . $base . "404");
	}
	else {
		$followVerifyClass = new VerifyFollow();
		$followVerifyClass -> verify($followId, $userId);
		$followAction = $followVerifyClass -> getCheck();
	}
 ?>