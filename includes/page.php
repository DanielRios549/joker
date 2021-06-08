<?php
/* 
 ***************************************************************
 | Copyright (c) 2014-2021 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
	if(!isset($baseUrl)) {
		$base = '../';
		require $base . '404.php';
	}
	
	if(ADMIN_PAGE == 'no') {
		$title = new TitleFile();
		$menu = new Menu();
	}
	elseif(ADMIN_PAGE == 'yes') {
		$title = new AdminTitleFile();
		$menu = new AdminMenu();
	}
	
	$titleFile = $title -> Title($loginCheck);
	
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
		$menu5 = $menu -> menu5();
		
		$menuGroup1 = $menu -> menuGroup1();
		$menuGroup2 = $menu -> menuGroup2();
		$menuGroup3 = $menu -> menuGroup3();
		$menuGroup4 = $menu -> menuGroup4();
		$menuGroup5 = $menu -> menuGroup5();
		
		$subMenu1_1 = $menu -> subMenu1_1();
		$subMenu2_1 = $menu -> subMenu2_1();
		$subMenu2_2 = $menu -> subMenu2_2();
		$subMenu3_1 = $menu -> subMenu3_1();
		$subMenu3_2 = $menu -> subMenu3_2();
		$subMenu4_1 = $menu -> subMenu4_1();
		$subMenu4_2 = $menu -> subMenu4_2();
		$subMenu5_1 = $menu -> subMenu5_1();
		$subMenu5_2 = $menu -> subMenu5_2();
	}
?>