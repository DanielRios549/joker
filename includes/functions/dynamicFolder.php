<?php
/* 
 ***************************************************************
 | Copyright (c) 2014-2021 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
	if(!isset($baseCon)) {
		$base = '../../';
		require $base . '404.php';
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
			elseif($type == 'live') {
				$folder = $imageFolder . 'lives/';
			}
		}
		return $folder;
	}
?>