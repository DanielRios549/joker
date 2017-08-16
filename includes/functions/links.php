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
    
    function getLink($type, $id) {
        global $baseUrl;
        global $adminDir;
        global $atomoBaseUrl;
        global $imageDir;
        
        if($type == 'userProfile') {
            $link = $baseUrl . 'profile?id=' . $id;
        }
        elseif($type == 'userImage') {
            $link = $imageDir . 'user/' . $id . '/profile.jpg';
        }
        elseif($type == 'watchMovie') {
            $link = $baseUrl . 'watch?id=' . $id;
        }
        elseif($type == 'watchSerie') {
            $link = $baseUrl . 'watch?id=' . $id . '&e=';
        }
        elseif($type == 'title') {
            $link = $baseUrl . 'title?id=' . $id;
        }
        elseif($type == 'watch') {
            $link = $baseUrl . 'watch';
        }
        elseif($type == 'category') {
            $link = $baseUrl . 'category?c=' . categoryId($id);
        }
        elseif($type == 'search') {
            $link = $baseUrl . 'search?q=' . $id;
        }
        elseif($type == 'profile') {
            $link = $baseUrl . 'profile?id=' . $id;
        }
        elseif($type == 'login') {
            $link = $baseUrl . 'login';
        }
        elseif($type == 'logoff') {
            $link = $baseUrl . 'logoff';
        }
        elseif($type == 'settings') {
            $link = $baseUrl . 'settings';
        }
        elseif($type == 'about') {
            $link = $atomoBaseUrl . 'about';
        }
        elseif($type == 'advertise') {
            $link = $atomoBaseUrl . 'advertise';
        }
        elseif($type == 'jobs') {
            $link = $atomoBaseUrl . 'jobs';
        }
        elseif($type == 'contact') {
            $link = $atomoBaseUrl . 'contact';
        }

        //Admin Pages

        
        elseif($type == 'feedback_manager') {
            $link = $adminDir . 'feedback/manager';
        }
        elseif($type == 'users_manager') {
            $link = $adminDir . 'users/manager';
        }
        elseif($type == 'users_add') {
            $link = $adminDir . 'users/add';
        }
        elseif($type == 'movies_manager') {
            $link = $adminDir . 'movies/manager';
        }
        elseif($type == 'movies_add') {
            $link = $adminDir . 'movies/add';
        }
        elseif($type == 'series_manager') {
            $link = $adminDir . 'series/manager';
        }
        elseif($type == 'series_add') {
            $link = $adminDir . 'series/add';
        }
        elseif($type == 'episodes_manager') {
            $link = $adminDir . 'series/manager/episodes';
        }
        elseif($type == 'episodes_add') {
            $link = $adminDir . 'series/add/episodes';
        }
        elseif($type == 'lives_manager') {
            $link = $adminDir . 'lives/manager';
        }
        elseif($type == 'lives_add') {
            $link = $adminDir . 'lives/add';
        }
        return $link;
    }
?>