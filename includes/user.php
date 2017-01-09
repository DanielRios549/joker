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

	$loginMethod = false;

	//Access to Classes
		
	$sigin = new Sigin();
	$login = new Login();

	//Do the normal login

	if($loginCheck == false) {
		if($loginRestore == false) {
			$siginSubmit = @$_POST['siginSubmit'];
			$userSubmit = @$_POST['loginSubmit'];
			
			//Access the functions of login and sigin
			
			$siginUser = $sigin -> siginUser(ADMIN_PAGE, $_POST, $_FILES, $siginSubmit);
			$loginUser = $login -> loginUser('normal', $_POST, $userSubmit, $imageDir, $baseUrl, $sessionAddress, $sessionAgent, $sessionToDB, $cookieLang);
			
			//Display the error on login or sigin
			
			$error = array('userErrorNone', 'The Error is display here', '#2cafec');
			
			if(isset($siginSubmit)) {
				$error = $sigin -> showError;
			}
			if(isset($userSubmit)) {
				$error = $login -> showError;
			}
			
			$showError = $error[0];
			$errorMsg = $error[1];
			
			if(isset($_GET['n'])) {
				if($_GET['n'] == '1') {
					$showError = "newAccountCreatedDisplay";
					$errorMsg = "Conta ativada";
				}
				elseif($_GET['n'] == '2') {
					$showError = "userErrorDisplay";
					$errorMsg = "Conta não ativada";
				}
			}
		}

		//Restore the use connected
	
		elseif($loginRestore == true) {
			$loginUser = $login -> loginUser('restore', false, false, $imageDir, $baseUrl, $sessionAddress, $sessionAgent, $sessionToDB, $cookieLang);
		}
	}
?>