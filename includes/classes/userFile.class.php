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
	
	class BodyFile {
		public $file;
		public $page;
		
		public function File(){
			$page = THIS_PAGE;
			
			if ($page == 'index') {
				$file = 'index.html';
			}
			elseif ($page == 'login') {
				$file = 'login.html';
			}
			elseif ($page == 'logoff') {
				$file = 'logoff.html';
			}
			elseif ($page == 'title') {
				$file = 'title.html';
			}
			elseif ($page == 'watch') {
				$file = 'watch.html';
			}
			elseif ($page == 'profile') {
				$file = 'profile.html';
			}
			elseif ($page == 'settings') {
				$file = 'settings.html';
			}
			elseif ($page == 'category') {
				$file = 'category.html';
			}
			elseif ($page == 'search') {
				$file = 'search.html';
			}
			elseif ($page == '403') {
				$file = '403.html';
			}
			elseif ($page == '404') {
				$file = '404.html';
			}
			return $file;
		}
	}
?>