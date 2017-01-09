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
	
	class TitleFile {
		public $title;
		public $page;
		
		public function Title($login){
			$page = THIS_PAGE;
			
			if ($page == 'index') {
				if($login == false) {
					$title = langCode('index_title');
				}
				else {
					$title = langCode('home_title');
				}
			}
			elseif ($page == 'login') {
				$title = langCode('login_title');
			}
			elseif ($page == 'logoff') {
				$title = langCode('logoff_title');
			}
			elseif ($page == 'title') {
				$title = CONTENT_TITLE;
			}
			elseif ($page == 'watch') {
				$title = WATCH_TITLE;
			}
			elseif ($page == 'profile') {
				$title = PROFILE_TITLE;
			}
			elseif ($page == 'settings') {
				$title = SETTINGS_TITLE;
			}
			elseif ($page == 'category') {
				$title = CATEGORY_TITLE;
			}
			elseif ($page == 'search') {
				$title = langCode('search_title') . ' - ' . SEARCH_TITLE;
			}
			elseif ($page == '403') {
				$title = langCode('error_403_title');
			}
			elseif ($page == '404') {
				$title = langCode('error_404_title');
			}
			return $title;
		}
	}
?>