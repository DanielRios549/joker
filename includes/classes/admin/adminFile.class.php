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
	class AdminBodyFile {
		public $file;
		public $page;
		
		public function File(){
			$page = THIS_PAGE;
			
			if ($page == 'admin_home') {
				$file = 'index.html';
			}
			elseif ($page == 'admin_feedback_manager') {
				$file = 'feedbackManager.html';
			}
			elseif ($page == 'admin_users_manager') {
				$file = 'usersManager.html';
			}
			elseif ($page == 'admin_users_add') {
				$file = 'usersAdd.html';
			}
			elseif ($page == 'admin_movies_manager') {
				$file = 'moviesManager.html';
			}
			elseif ($page == 'admin_movies_add') {
				$file = 'moviesAdd.html';
			}
			elseif ($page == 'admin_series_manager') {
				$file = 'seriesManager.html';
			}
			elseif ($page == 'admin_episodes_manager') {
				$file = 'episodesManager.html';
			}
			elseif ($page == 'admin_series_add') {
				$file = 'seriesAdd.html';
			}
			elseif ($page == 'admin_episodes_add') {
				$file = 'episodesAdd.html';
			}
			return $file;
		}
	}
?>