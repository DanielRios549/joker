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
	
	if(ADMIN_PAGE == 'no') {
		$title = new TitleFile();
		$file = new BodyFile();
		$menu = new Menu();
	}
	elseif(ADMIN_PAGE == 'yes') {
		$title = new AdminTitleFile();
		$file = new AdminBodyFile();
		$menu = new AdminMenu();
	}
	
	$titleFile = $title -> Title($loginCheck);
	$bodyFile = $file -> File();
	
	if(ADMIN_PAGE == 'no') {
		$menu0 = $menu -> menu0();
		$menu1 = $menu -> menu1();
	}
	elseif(ADMIN_PAGE == 'yes') {
		$menu0 = $menu -> menu0();
		$menu1 = $menu -> menu1();
		$menu2 = $menu -> menu2();
		$menu3 = $menu -> menu3();
		$menu4 = $menu -> menu4();
		
		$menuGroup1 = $menu -> menuGroup1();
		$menuGroup2 = $menu -> menuGroup2();
		$menuGroup3 = $menu -> menuGroup3();
		$menuGroup4 = $menu -> menuGroup4();
		
		$subMenu1_1 = $menu -> subMenu1_1();
		$subMenu2_1 = $menu -> subMenu2_1();
		$subMenu2_2 = $menu -> subMenu2_2();
		$subMenu3_1 = $menu -> subMenu3_1();
		$subMenu3_2 = $menu -> subMenu3_2();
		$subMenu4_1 = $menu -> subMenu4_1();
		$subMenu4_2 = $menu -> subMenu4_2();
		$subMenu4_3 = $menu -> subMenu4_3();
		$subMenu4_4 = $menu -> subMenu4_4();
	}
?>