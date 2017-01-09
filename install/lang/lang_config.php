<?php
/* 
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

$lang = @$_POST['installLangSelect'];
$selectedEn = '';
$selectedPt = '';

	//is the coockie exist?
	if (!$_COOKIE ['installLang']){
		setcookie("installLang" , "pt_BR");
		echo "<script>window.location.href='';</script>";
	}
	
	//cookie modify
	if ($lang == 'en_US'){
		setcookie("installLang" , "en_US");
		echo "<script>window.location.href='';</script>";
	}
	elseif ($lang == 'pt_BR'){
		setcookie("installLang" , "pt_BR");
		echo "<script>window.location.href='';</script>";
	}
	
	//file
	if ($_COOKIE ['installLang'] == 'en_US') {
		require 'locales/en_US.php';
		$selectedEn = ' selected';
	}
	elseif ($_COOKIE ['installLang'] == 'pt_BR'){
		require 'locales/pt_BR.php';
		$selectedPt = ' selected';
	}
?>