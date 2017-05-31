<?php
/* 
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
	
	if(!isset($baseUrl)) {
		require '../../_redirect.php';
		header("Location:" .  $base . "404");
	}
	
	$langClass = new Lang();

	$selectedEn = '';
	$selectedPt = '';
	
	$userSession = @$_SESSION['user_id'];
	$cookieLang = isset($_SESSION['lang']) ? $_SESSION['lang'] : 'en_US';
	
	//If the user isn't connected

	if(!isset($userSession)) {
		//cookie modify
		
		if(isset($_POST['langSelect'])) {
			$lang = $_POST['langSelect'];
			
			if ($lang == 'en_US') {
				$_SESSION['lang'] = "en_US";
				echo "<script>document.location.href='';</script>";
			}
			elseif ($lang == 'pt_BR') {
				$_SESSION['lang'] = "pt_BR";
				echo "<script>document.location.href='';</script>";
			}
		}
	}

	//Both cases
	
	if($cookieLang == 'en_US') {
		$setLang = 'English';
		$selectedEn = ' selected';
	}
	elseif($cookieLang == 'pt_BR') {
		$setLang = 'Português';
		$selectedPt = ' selected';
	}

	$thisLang = $langClass -> langSelect($cookieLang);
	$forceEnglish = $langClass -> langSelect('en_US');

	//function used to write the texts

	function langCode($name) {
		global $thisLang;
		global $forceEnglish;
		global $cookieLang;
		$langPrefer = $thisLang[$name][$cookieLang];

		if($langPrefer != '') {
			$langName = $langPrefer;
		}
		else {
			$langName = $forceEnglish[$name]['en_US'];
		}
		
		return $langName;
	}
	//echo langCode('test');
?>