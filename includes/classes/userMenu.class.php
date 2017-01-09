<?php
/* 
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
	if(!isset($baseCon)) {
		require '../../_redirect.php';
		header("Location:" . $base . "404");
	}
	
	class Menu {
		public $page;
		public $menu;
		public $menu_on;
		
		public function menu0() {
			$menu_on = 'Selected';
			$page = THIS_PAGE;
			
			if ($page == 'index') {
				$menu = $menu_on;
			}
			else {
				$menu = '';
			}
			return $menu;
		}
		public function menu1() {
			$menu_on = 'Selected';
			$page = THIS_PAGE;
			
			if ($page == 'about') {
				$menu = $menu_on;
			}
			else {
				$menu = '';
			}
			return $menu;
		}
	}
?>