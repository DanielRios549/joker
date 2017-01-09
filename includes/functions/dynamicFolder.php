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
	
	function getDynamicFolder($type, $imageFolder) {
		global $contentClass;
		
		if($contentClass -> contentHide == false) {
			if($type == 'movie') {
				$folder = $imageFolder . 'movies/';
			}
			elseif($type == 'serie') {
				$folder = $imageFolder . 'series/';
			}
		}
		return $folder;
	}
?>