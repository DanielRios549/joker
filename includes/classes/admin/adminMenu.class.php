<?php
/* 
 ***************************************************************
 | Copyright (c) 2014-2021 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
	if(!isset($baseCon)) {
		$base = '../../../';
		require $base . '404.php';
	}
	class AdminMenu {
		public $page;
		public $menu;
		public $menuGroup;
		public $menu_on;
		
		public function menu0() {
			$menu_on = 'Active';
			$page = THIS_PAGE;
			
			if ($page == 'admin_home') {
				$menu = $menu_on;
			}
			else {
				$menu = '';
			}
			return $menu;
		}
		public function menu1() {
			$menu_on = 'Active';
			$page = MENU_GROUP;
			
			if ($page == 'feedback') {
				$menu = $menu_on;
			}
			else {
				$menu = '';
			}
			return $menu;
		}
		public function menu2() {
			$menu_on = 'Active';
			$page = MENU_GROUP;
			
			if ($page == 'user') {
				$menu = $menu_on;
			}
			else {
				$menu = '';
			}
			return $menu;
		}
		public function menu3() {
			$menu_on = 'Active';
			$page = MENU_GROUP;
			
			if ($page == 'movie') {
				$menu = $menu_on;
			}
			else {
				$menu = '';
			}
			return $menu;
		}
		public function menu4() {
			$menu_on = 'Active';
			$page = MENU_GROUP;
			
			if ($page == 'serie') {
				$menu = $menu_on;
			}
			else {
				$menu = '';
			}
			return $menu;
		}
		public function menu5() {
			$menu_on = 'Active';
			$page = MENU_GROUP;
			
			if ($page == 'live') {
				$menu = $menu_on;
			}
			else {
				$menu = '';
			}
			return $menu;
		}
		public function menuGroup1() {
			$menuGroup_on = 'Open';
			$menuGroup_off = 'Close';
			$page = MENU_GROUP;
			
			if ($page == 'feedback') {
				$menuGroup = $menuGroup_on;
			}
			else {
				$menuGroup = $menuGroup_off;
			}
			return $menuGroup;
		}
		public function menuGroup2() {
			$menuGroup_on = 'Open';
			$menuGroup_off = 'Close';
			$page = MENU_GROUP;
			
			if ($page == 'user') {
				$menuGroup = $menuGroup_on;
			}
			else {
				$menuGroup = $menuGroup_off;
			}
			return $menuGroup;
		}
		public function menuGroup3() {
			$menuGroup_on = 'Open';
			$menuGroup_off = 'Close';
			$page = MENU_GROUP;
			
			if ($page == 'movie') {
				$menuGroup = $menuGroup_on;
			}
			else {
				$menuGroup = $menuGroup_off;
			}
			return $menuGroup;
		}
		public function menuGroup4() {
			$menuGroup_on = 'Open';
			$menuGroup_off = 'Close';
			$page = MENU_GROUP;
			
			if ($page == 'serie') {
				$menuGroup = $menuGroup_on;
			}
			else {
				$menuGroup = $menuGroup_off;
			}
			return $menuGroup;
		}
		public function menuGroup5() {
			$menuGroup_on = 'Open';
			$menuGroup_off = 'Close';
			$page = MENU_GROUP;
			
			if ($page == 'live') {
				$menuGroup = $menuGroup_on;
			}
			else {
				$menuGroup = $menuGroup_off;
			}
			return $menuGroup;
		}
		public function subMenu1_1() {
			$page = THIS_PAGE;
			
			if ($page == 'admin_feedback_manager') {
				$menu = 'Selected';
			}
			else {
				$menu = '';
			}
			return $menu;
		}
		public function subMenu2_1() {
			$page = THIS_PAGE;
			
			if ($page == 'admin_users_manager') {
				$menu = 'Selected';
			}
			else {
				$menu = '';
			}
			return $menu;
		}
		public function subMenu2_2() {
			$page = THIS_PAGE;
			
			if ($page == 'admin_users_add') {
				$menu = 'Selected';
			}
			else {
				$menu = '';
			}
			return $menu;
		}
		public function subMenu3_1() {
			$page = THIS_PAGE;
			
			if ($page == 'admin_movies_manager') {
				$menu = 'Selected';
			}
			else {
				$menu = '';
			}
			return $menu;
		}
		public function subMenu3_2() {
			$page = THIS_PAGE;
			
			if ($page == 'admin_movies_add') {
				$menu = 'Selected';
			}
			else {
				$menu = '';
			}
			return $menu;
		}
		public function subMenu4_1() {
			$page = THIS_PAGE;
			
			if ($page == 'admin_series_manager') {
				$menu = 'Selected';
			}
			else {
				$menu = '';
			}
			return $menu;
		}
		public function subMenu4_2() {
			$page = THIS_PAGE;
			
			if ($page == 'admin_series_add') {
				$menu = 'Selected';
			}
			else {
				$menu = '';
			}
			return $menu;
		}
		public function subMenu5_1() {
			$page = THIS_PAGE;
			
			if ($page == 'admin_lives_manager') {
				$menu = 'Selected';
			}
			else {
				$menu = '';
			}
			return $menu;
		}
		public function subMenu5_2() {
			$page = THIS_PAGE;
			
			if ($page == 'admin_lives_add') {
				$menu = 'Selected';
			}
			else {
				$menu = '';
			}
			return $menu;
		}
	}
?>