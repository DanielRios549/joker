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
	function alert($message) {
		return "<script>alert('" . $message . "');</script>";
	}
	function script($message) {
		return "<script>" . $message . "</script>";
	}
?>