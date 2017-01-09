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

    if($loginCheck == true) {
        $sqlQuery = "SELECT * FROM user WHERE user_id = :user";
        $queryUser = $connect -> prepare($sqlQuery);
        $queryUser -> bindValue(":user", $userId);
        
        if($queryUser -> execute()) {
            $setStyle = $queryUser -> fetch(PDO::FETCH_ASSOC);
            $style = $setStyle['style'];
        }
        
        
        if($style == 'D') {
            $userStyleMode = 'day';
        }
        elseif($style == 'N') {
            $userStyleMode = 'night';
        }
    }
?>