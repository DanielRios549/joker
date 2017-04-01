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
        global $imageDir;
        
        if((isset($type)) and (isset($id))) {
            if(($type != '') and ($id != '')) {
                if($type == 'userProfile') {
                    $link = $baseUrl . langCode('profile_link') . "?id=" . $id;
                }
                elseif($type == 'userImage') {
                    $link = $imageDir . 'user/' . $id . '/profile.jpg';
                }
                elseif($type == 'title') {
                    $link = $baseUrl . langCode('title_link') .'?id=' . $id;
                }
                elseif($type == 'watchMovie') {
                    $link = $baseUrl . langCode('watch_link') .'?id=' . $id;
                }
                elseif($type == 'watchSerie') {
                    $link = $baseUrl . langCode('watch_link') . '?id=' . $id . '&e=';//$firstEpisode['episode_id'];
                }
                elseif($type == 'category') {
                    $link = $baseUrl . langCode('category_link') . '?c=' . categoryId($id);
                }
            }
        }
        return $link;
    }
?>