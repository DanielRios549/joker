<?php
/* 
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
	if(!isset($baseUrl)) {
		require '../_redirect.php';
		header("Location:" . $base . "404");
	}
	
	$sessionUser = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : '';

	//Verify if the user is connected
	
	$loginCheckClass = new LoginCheck();
	
	$loginCheckClass -> check($sessionUser, $sessionToDB);
	
	if(($loginCheckClass -> loginUser == false) and ($loginCheckClass -> loginUserRestore == false)) {
		$loginCheck = false;
		$loginRestore = false;
	}
	elseif($loginCheckClass -> loginUser == true) {
		$loginCheck = true;
		$loginRestore = false;
	}
	elseif($loginCheckClass -> loginUserRestore == true) {
		$loginCheck = false;
		$loginRestore = true;
	}
	
	//Verify if the user connected is premium
	
	$premiumCheckClass = new PremiumCheck();
	
	$premiumCheckClass -> check($loginCheck, $sessionUser);
	
	if($premiumCheckClass -> premiumUser == false) {
		$premiumCheck = false;
	}
	elseif($premiumCheckClass -> premiumUser == true) {
		$premiumCheck = true;
	}
	
	//Verify if the user is an admin
	
	$adminCheckClass = new AdminCheck();
	
	$adminCheckClass -> check($loginCheck, $sessionUser);
	
	if($adminCheckClass -> adminUser == false) {
		$adminCheck = false;
	}
	elseif($adminCheckClass -> adminUser == true) {
		$adminCheck = true;
	}
	
	//Desconnect the user

	$logOffClass = new LogOff();
	
	$logOffClass -> disconnect(THIS_PAGE, $baseUrl, $sessionUser, $sessionToDB);
	
	//Desconnect the user
	
	if($logOffClass -> logOffUser == true) {
		unset($_SESSION['user_id']);
		unset($_SESSION['name']);
		unset($_SESSION['username']);
		unset($_SESSION['image']);
		unset($_SESSION['USER_AGENT']);
		unset($_SESSION['USER_ADDRESS']);
		
		session_regenerate_id();
	}
?>