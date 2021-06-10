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
	else {
		session_name('login');
		session_start([
			'cookie_lifetime' => 86400 * 30
		]);

		//Define the language

		require 'lang/langConfig.php';

		//Get the session info

		require 'sessionInfo.php';

		//Verify if the user is connected, configure the stats and identify if is a user or a admin

		require 'connectUser.php';

		//Get the HTML file

		if(!defined('NO_LAYOUT_PAGE')) {
			$bodyFile = basename($_SERVER['PHP_SELF'],'.php') . '.html';
		}
		else if(NO_LAYOUT_PAGE == 'yes') {
			$bodyFile = '404.html';
		}

		if($loginCheck == true) {
			//Verify if the session is invalid to device

			if(($_SESSION['USER_ADDRESS'] !== $sessionAddress) or ($_SESSION['USER_AGENT'] !== $sessionAgent)) {
				header("Location:" . getLink('logoff', false));
			}

			if($premiumCheck == true) {
				require 'premiumUser.php';
			}

			if(THIS_PAGE == 'login') {
				header("Location:" . $baseUrl);
			}

			$userId = @$_SESSION['user_id'];
			$endFirstName = strpos($_SESSION['name'], ' ');
			$firstName = substr($_SESSION['name'], 0, $endFirstName);
		}
		else {
			//Create user or do the login

			require 'user.php';
		}

		//Active the user

		require 'activeUser.php';

		//Check the user style

		//Configure the Stats in profile page

		if(THIS_PAGE == 'profile') {
			require 'userStats.php';
		}

		//Configure the settings page

		if(THIS_PAGE == 'settings') {
			require 'userSettings.php';
		}

		//Configure the title page

		if(THIS_PAGE == 'title') {
			require 'titleSettings.php';
		}

		//Configure the watch page

		if(THIS_PAGE == 'watch') {
			require 'watchSettings.php';
		}

		//Import the body file. Head, Header and Footer are onlys, but the body not

		if(ADMIN_PAGE == 'no') {
			if((CONNECTED_PAGE == 'yes') and ($loginCheck == false)) {
				header("Location:" . $baseUrl . 'login_link');
			}
			if(THIS_PAGE == 'category') {
				$categoryQuery = @$_GET['c'];

				if(!isset($categoryQuery) or $categoryQuery == '') {
					ShowError::notFound('query');
				}
				else {
					DEFINE('CATEGORY_TITLE' , langCode(categoryName($categoryQuery)));
				}
			}
			if(THIS_PAGE == 'search') {
				$searchQuery = @$_GET['q'];

				if(!isset($searchQuery) or $searchQuery == '') {
					ShowError::notFound('query');
				}
				else {
					DEFINE('SEARCH_TITLE' , $searchQuery);
				}
			}

			//Make the array for header and index content sections

			$allCategories = getEnum('content', 'category');
			$firstSections = array('watchlist', 'recent_add');
			$allSections = array_merge($firstSections, $allCategories);

			//print_r($allSections);

			//Define if the page show only the body or no

			$onlyBody = $_POST['body'] ?? false;

			//Configure the titles and menus

			require 'page.php';

			//Define the layout file

			$contentDir = @$base . 'includes/';
			require $layoutDir . 'body.html';
		}
		elseif(ADMIN_PAGE == 'yes') {
			if($adminCheck == false) {
				ShowError::notFound('admin');
			}
			elseif($adminCheck == true) {
				require 'admin.php';

				//Configure the titles and menus

				require 'page.php';

				$contentDir = @$base . '../includes/';
				
				require $adminLayoutDir . 'body.html';
			}
		}
		//$forceFinalError = new FakeClass();
	}
?>
