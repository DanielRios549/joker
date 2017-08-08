<?php
/* 
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
	if(!isset($baseUrl)) {
		require '../_redirect.php';
		header("Location:" . $base);
	}
    else {
        //Get the info
        
        $userAddress = $_SERVER['REMOTE_ADDR'];
        $userAgent = $_SERVER['HTTP_USER_AGENT'];

        $userBrowser = getBrowserName($userAgent);

        if($userBrowser == 'Other') {
            $allowRestoreLogin = false;
        }
        else {
            $allowRestoreLogin = true;
        }

        //Create the sessions to use
        
		$sessionAddress = sha1($userAddress . 'fjhbfsehfuiosjcoihwaiEpwdmiud93ur89wry9is0ugvs098');
        $sessionAgent = sha1($userBrowser . 'sdfgd15d151320325cvdecveve6126523361561eddefe');

        $sessionToDB = sha1($sessionAddress . $sessionAgent);

        //echo $sessionToDB;
    }
?>