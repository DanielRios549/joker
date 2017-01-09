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
		
		//file
		
		if($cookieLang == 'en_US') {
			$setLang = 'English';
			$selectedEn = ' selected';
		}
		elseif($cookieLang == 'pt_BR') {
			$setLang = 'Português';
			$selectedPt = ' selected';
		}

		$thisLang = $langClass -> langSelect($cookieLang);
	}
	
	//If the user is connected

	elseif(isset($userSession)) {
		//file
		
		if($cookieLang == 'en_US') {
			$setLang = 'English';
			$selectedEn = ' selected';
		}
		elseif($cookieLang == 'pt_BR') {
			$setLang = 'Português';
			$selectedPt = ' selected';
		}
		
		$thisLang = $langClass -> langSelect($cookieLang);
	}

	//function used to write the texts

	function langCode($name) {
		global $thisLang;
		global $cookieLang;
		
		$langName = $thisLang[$name][$cookieLang];
		
		return $langName;
	}
?>