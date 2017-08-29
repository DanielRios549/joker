<?php
/* 
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
	if(!isset($baseCon)) {
		require '../../../_redirect.php';
		header("Location:" . $base . "404");
	}
	class AdminTitleFile {
		public $title;
		public $page;
		
		public function Title(){
			$page = THIS_PAGE;
			
			if ($page == 'admin_home') {
				$title = langCode('admin_home');
			}
			elseif ($page == 'admin_feedback_manager') {
				$title = langCode('admin_manage') . ' ' . langCode('feedback');
			}
			elseif ($page == 'admin_users_manager') {
				$title = langCode('admin_manage') . ' ' . langCode('users');
			}
			elseif ($page == 'admin_users_add') {
				$title = langCode('admin_add') . ' ' . langCode('users');
			}
			elseif ($page == 'admin_movies_manager') {
				$title = langCode('admin_manage') . ' ' . langCode('movies');
			}
			elseif ($page == 'admin_movies_add') {
				$title = langCode('admin_add') . ' ' . langCode('movies');
			}
			elseif ($page == 'admin_series_manager') {
				$title = langCode('admin_manage') . ' ' . langCode('series');
			}
			elseif ($page == 'admin_episodes_manager') {
				$title = langCode('admin_manage') . ' ' . langCode('episodes');
			}
			elseif ($page == 'admin_series_add') {
				$title = langCode('admin_add') . ' ' . langCode('series');
			}
			elseif ($page == 'admin_episodes_add') {
				$title = langCode('admin_add') . ' ' . langCode('episodes');
			}
			elseif ($page == 'admin_episodes_add') {
				$title = langCode('admin_add') . ' ' . langCode('episodes');
			}
			elseif ($page == 'admin_lives_manager') {
				$title = langCode('admin_manager') . ' ' . langCode('lives');
			}
			elseif ($page == 'admin_lives_add') {
				$title = langCode('admin_add') . ' ' . langCode('lives');
			}
			return $title;
		}
	}
?>