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
	elseif ($adminCheck == true) {
		//Set the home page for each section
		
		$sectionHome1 = getLink('feedback_manager', false);
		$sectionHome2 = getLink('users_manager', false);
		$sectionHome3 = getLink('movies_manager', false);
		$sectionHome4 = getLink('series_manager', false);
		$sectionHome5 = getLink('lives_manager', false);

		if(MENU_GROUP == 'feedback') {
			$sectionHome = getLink(MENU_GROUP . '_manager', false);
		}
		else {
			$sectionHome = getLink(MENU_GROUP . 's_manager', false);
		}

		//Make the settings inside the congig table

		$getConfig = new Settings();

		$textSettings = $getConfig -> getConfig('text');

		$boolSettings = $getConfig -> getConfig('bool');

		$selectSettings = $getConfig -> getConfig('select');

		$avaliableBoolean = array(0 => 'no', 1 => 'yes');

		$avaliablePlayers = $getConfig -> getPlayers($directPath);

		//print_r($boolSettings);

		//Set the new configs

		$setConfigGet =  $_GET['go'] ?? false;

		if($setConfigGet == 'config') {
			$setConfig = new Settings();

			$setConfig -> setConfig($_POST);
		}

		$homeUsers = new AdminShow();
		$homeUsers -> getTotal('user', false);
		$usersTotal = $homeUsers -> totalContents;
		
		$homeMovies = new AdminShow();
		$homeMovies -> getTotal('content', 'movie');
		$moviesTotal = $homeMovies -> totalContents;
		
		$homeSeries = new AdminShow();
		$homeSeries -> getTotal('content', 'serie');
		$seriesTotal = $homeSeries -> totalContents;
		
		$homeLives = new AdminShow();
		$homeLives -> getTotal('content', 'live');
		$livesTotal = $homeLives -> totalContents;

		//Get options of user to make the select

		$userActive = getEnum('user', 'active');
		$userCategories = getEnum('user', 'category');
		$userPremium = getEnum('user', 'premium');
		$userLang = getEnum('user', 'lang');

		//Get options of content to make the select

		$contentActive = getEnum('content', 'active');
		$contentCategories = getEnum('content', 'category');
		$contentAges = getEnum('content', 'age');
		$contentFeature = getEnum('content', 'feature');

		//Get the enum for episodes

		$episodeActive = getEnum('content_episodes', 'active');

		$getSeries = $pdo -> query("SELECT content_id, $cookieLang FROM content WHERE type = 'serie'");

		if($getSeries -> execute()) {
			$allSeries = $getSeries -> fetchAll(PDO::FETCH_ASSOC);
		}

		//print_r($allSeries);

		if(MENU_GROUP == 'user') {
			$selectFormFile = 'userSelect.html';
			$pageType = langCode('users');
			$addPageLink = getLink('users_add', false);
		}
		elseif(THIS_PAGE != 'admin_episodes_manager') {
			$selectFormFile = 'contentSelect.html';

			if(THIS_PAGE == 'admin_movies_manager') {
				$pageType = langCode('movies');
				$addPageLink = getLink('movies_add', false);
			}
			elseif(THIS_PAGE == 'admin_series_manager') {
				$pageType = langCode('series');
				$addPageLink = getLink('series_add', false);
			}
			elseif(THIS_PAGE == 'admin_lives_manager') {
				$pageType = langCode('lives');
				$addPageLink = getLink('lives_add', false);
			}
		}
		else {
			$selectFormFile = 'episodeSelect.html';
			$pageType = langCode('episodes');
		}

		//All manager pages

		if(PAGE_TYPE == 'manager') {
			$classManager = new AdminShow();
			$classManager -> content(THIS_PAGE, PAGE_TYPE, $cookieLang);

			$pageActive = $classManager -> pageStart;
			$completeLink = $classManager -> linkPage;
			$getLimit = $classManager -> itemsLimit;
			$getOrder = $classManager -> itemsOrder;
			$editRow = $classManager -> itemEdit;
			$removeRow = $classManager -> itemRemove;
			$episodeRow = $classManager -> itemEpisode;

			$addRow = $classManager -> contentRow;
			$totalRows = $classManager -> totalContents;
			$totalPages = $classManager -> totalPages;
			$setNewUrl = $classManager -> closeChange;

			if($editRow >= 1) {
				$keyEdit = $classManager -> editOpions;
			}
			if($removeRow >= 1) {
				//$keyRemove = $classManager -> removeOpiton;
			}
			if(@$_GET['edited'] >=  1) {
				$classEdit = new AdminEdit();
				$classEdit -> edit(THIS_PAGE, $_POST);
			}
			if(@$_GET['removed'] >=  1) {
				$classRemove = new AdminRemove();
				$classRemove -> remove(THIS_PAGE, $directPath);
			}

			//print_r($addRow);

			if($totalRows >= 1) {
				if($totalRows == 1) {
					$foundHeaderText = langCode('admin_found');
				}
				elseif($totalRows > 1) {
					$foundHeaderText = langCode('admin_found_2');
				}

				$getKeys = array_keys($addRow[0]);

				//print_r($getKeys);

				//Set the values of each page

				if($totalRows >= 1) {
					if(THIS_PAGE != 'admin_feedback_manager') {
						$current1 = $getKeys[0];
						$current2 = $getKeys[2];
						$current3 = $getKeys[3];
						$current4 = $getKeys[4];

						if(array_key_exists($cookieLang, $addRow[0])) {
							$divisorData = true;
						}
						else {
							$divisorData = false;
						}
					}
				}
			}
			elseif($totalRows == 0) {
				$foundHeaderText = langCode('admin_found');
			}

			//Edit link

			if(($getLimit == 10) and ($pageActive == 1) and($getOrder == 1)) {
				$linkEdit = "?edit=";
				$linkRemove = "?remove=";
				$linkEpisode = "?ep=";
			}
			elseif(($getLimit != 10) or ($pageActive != 1) or ($getOrder != 1)) {
				$linkEdit = $completeLink . $pageActive . "&edit=";
				$linkRemove = $completeLink . $pageActive . "&remove=";
				$linkEpisode = $completeLink . $pageActive . "&ep=";
			}
			else {
				$linkEdit = $completeLink . $pageActive . "&edit=";
				$linkRemove = $completeLink . $pageActive . "&remove=";
				$linkEpisode = $completeLink . $pageActive . "&ep=";
			}

			//Get the selected limit

			if($getLimit == 1) {
				$selectedPageLimit1 = "selected";
			}
			elseif($getLimit == 2) {
				$selectedPageLimit2 = "selected";
			}
			elseif($getLimit == 3) {
				$selectedPageLimit3 = "selected";
			}
			elseif($getLimit == 10) {
				$selectedPageLimit10 = "selected";
			}
			elseif($getLimit == 20) {
				$selectedPageLimit20 = "selected";
			}
			elseif($getLimit == 50) {
				$selectedPageLimit50 = "selected";
			}
			elseif($getLimit == 100) {
				$selectedPageLimit100 = "selected";
			}

			//Get the selected order

			if($getOrder == 1) {
				$selectedOrder1 = "selected";
			}
			elseif($getOrder == 2) {
				$selectedOrder2 = "selected";
			}
			elseif($getOrder == 3) {
				$selectedOrder3 = "selected";
			}
			elseif($getOrder == 4) {
				$selectedOrder4 = "selected";
			}

			//Get the Episodes

			if($episodeRow >= 1) {
				$contentPage = $episodeRow;
				require 'getEpisodes.php';

				//print_r($episodesList);
			}
		}

		//All create pages

		elseif(PAGE_TYPE == 'add') {
			if(THIS_PAGE == 'admin_users_add') {
				$createUserClass = new Sigin();
				$createSubmit = @$_GET['go'];

				$createUserClass -> siginUser($directPath, $verificationEmail, ADMIN_PAGE, $_POST, $_FILES, $createSubmit);

				//Display the error on login or sigin

				$error = array('userErrorNone', 'The Error is display here', '#2cafec');

				if(isset($createSubmit)) {
					$error = $createUserClass -> showError;
				}

				$showError = $error[0];
				$errorMsg = $error[1];
			}
			elseif(THIS_PAGE == 'admin_episodes_add') {
				$classCreate = new AdminCreate();

				$addSubmit = @$_GET['go'];
				$episodeContent = @$_POST['serie'];
				$seasonNumber = @$_POST['seasonNumber'];
				$episodeNumber = @$_POST['episodeNumber'];

				if(isset($addSubmit)) {
					$classCreate -> contentEpisode($directPath, $episodeContent, $_POST, $_FILES, $seasonNumber, $episodeNumber, true);

					$error = $classCreate -> showError;
					$showError = $error[0];
					$errorMsg = $error[1];
				}
			}
			else {
				$classCreate = new AdminCreate();
				$addSubmit = @$_GET['go'];

				$classCreate -> content($directPath, THIS_PAGE, $_POST, $_FILES, $addSubmit);

				//Display the error

				$error = array('userErrorNone', 'The Error is display here', '#2cafec');

				if(isset($addSubmit)) {
					$error = $classCreate -> showError;
				}

				$showError = $error[0];
				$errorMsg = $error[1];
			}
		}
	}
?>
