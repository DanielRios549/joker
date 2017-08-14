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
	
	//If the user is logged
	
	if($loginCheck == true) {
		$userConnected = $_SESSION['user_id'];
		$userSettingsPage = getLink('settings', false);
		
		$btnChange = langCode('settings_change');
		$btnCancel = langCode('settings_cancel');

		//Get the user information
		try {
			$userSelect = $pdo -> prepare("SELECT * FROM user WHERE user_id = :user");
			$userSelect -> bindValue(":user", $userConnected);
			$userSelect -> execute();
		}
		catch(PDOException $error) {
			echo $error -> getMessage();
		}
		
		if($userSelect -> rowCount() == 1) {
			$userArray = $userSelect -> fetch(PDO::FETCH_ASSOC);
			
			$nameSeparated = strpos($userArray['name'], ' ');
			$firstName = substr($userArray['name'], 0, $nameSeparated);
			
			$secondName = substr($userArray['name'], $nameSeparated + 1);
			
			$userConf = array (
				'name' => $userArray['name'],
				'first-name' => $firstName,
				'last-name' => $secondName,
				'username' => $userArray['username'],
				'email' => $userArray['email'],
				'password' => $userArray['password'],
				'premium' => $userArray['premium'],
				'lang' => $userArray['lang'],
				'user-agent' => $_SESSION['USER_AGENT'],
				'user-address' => $_SESSION['USER_ADDRESS']
			);
		}
		
		//Define the tabs
		
		if(!isset($_GET['tab'])) {
			$tab01 = true;
			$menuLink1Class = 'menuLinkSelected';
			$menuLink2Class = 'menuLink';
			$menuLink3Class = 'menuLink';
			
			$sectionHeader = langCode('settings_section_header_info');
			define('SETTINGS_TITLE' , langCode('settings_section_header_info'));
		}
		elseif(isset($_GET['tab'])) {
			$tab = $_GET['tab'];
			
			//Info Tab
			
			if($tab == 'info') {
				$menuLink1Class = 'menuLinkSelected';
				$menuLink2Class = 'menuLink';
				$menuLink3Class = 'menuLink';
				
				$sectionHeader = langCode('settings_section_header_info');
				define('SETTINGS_TITLE' , langCode('settings_section_header_info'));
			}
			
			//Password Tab
			
			if($tab == 'lang') {
				$menuLink1Class = 'menuLink';
				$menuLink2Class = 'menuLinkSelected';
				$menuLink3Class = 'menuLink';
				
				$sectionHeader = langCode('settings_section_header_lang');
				define('SETTINGS_TITLE' , langCode('settings_section_header_lang'));
			}
			
			//Delete Tab
			
			if($tab == 'delete') {
				$menuLink1Class = 'menuLink';
				$menuLink2Class = 'menuLink';
				$menuLink3Class = 'menuLinkSelected';
				
				$sectionHeader = langCode('settings_section_header_delete');
				define('SETTINGS_TITLE' , langCode('settings_section_header_delete'));
			}
		}
		
		//Define if the some setting were modified
		
		$optionEdited = @$_GET['edited'];
		
		$linkInfoName = 'linkInfoName';
		$linkInfoUserName = 'linkInfoUserName';
		$linkInfoEmail = 'linkInfoEmail';
		$linkInfoPassword = 'linkInfoPassword';
		$linkInfoLang = 'linkInfoLang';
		
		$linkInfoSpanName = langCode('settings_edit');
		$linkInfoSpanUserName = langCode('settings_edit');
		$linkInfoSpanEmail = langCode('settings_edit');
		$linkInfoSpanPassword = langCode('settings_edit');
		$linkInfoSpanLang = langCode('settings_edit');
		
		if(isset($optionEdited)) {
			if($optionEdited == 'name') {
				$linkInfoName = 'linkInfoEdited';
				$linkInfoSpanName = langCode('settings_saved');
			}
			elseif($optionEdited == 'username') {
				$linkInfoUserName = 'linkInfoEdited';
				$linkInfoSpanUserName = langCode('settings_saved');
			}
			elseif($optionEdited == 'email') {
				$linkInfoEmail = 'linkInfoEdited';
				$linkInfoSpanEmail = langCode('settings_saved');
			}
			elseif($optionEdited == 'password') {
				$linkInfoPassword = 'linkInfoEdited';
				$linkInfoSpanPassword = langCode('settings_saved');
			}
			elseif($optionEdited == 'lang') {
				$linkInfoLang = 'linkInfoEdited';
				$linkInfoSpanLang = langCode('settings_saved');
			}
		}
		
		//Define the user lang
		
		if($userConf['lang'] == 'pt_BR') {
			$userLangEn = '';
			$userLangPt = 'selected';
		}
		elseif($userConf['lang'] == 'en_US') {
			$userLangEn = 'selected';
			$userLangPt = '';
		}
		
		//If exist the go get
		
		if(isset($_GET['go'])) {
			
			//If the go get was the name
			
			if($_GET['go'] == 'setName') {
				$nameChangeFirst = @$_POST['setNameFirst'];
				$nameChangeLast = @$_POST['setNameLast'];
				
				$nameChangeFull = $nameChangeFirst . " " . $nameChangeLast;
				
				if($nameChangeFull == $userConf['name']) {
					echo "<script>history.go(-1);</script>";
				}
				else {
					try {
						$updateQuery = $pdo -> prepare("UPDATE user SET name = :nameChange WHERE user_id = :userConnected");
						$updateQuery -> bindValue(":nameChange", $nameChangeFull);
						$updateQuery -> bindValue(":userConnected", $userConnected);
						
						if($updateQuery -> execute()) {
							$_SESSION['name'] = $nameChangeFull;
							echo "<script>location.href='" . $userSettingsPage . "?tab=info&edited=name';</script>";
						}
					}
					catch(PDOException $error) {
						echo $error -> getMessage();
					}
				}
			}
			
			//If the go get were the username
			
			if($_GET['go'] == 'setUserName') {
				$userNameChange = @$_POST['setUserName'];
				
				if($userNameChange == $userConf['username']) {
					echo "<script>history.go(-1);</script>";
				}
				else {
					try {
						$updateQuery = $pdo -> prepare("UPDATE user SET username = :username WHERE user_id = :userConnected");
						$updateQuery -> bindValue(":username", $userNameChange);
						$updateQuery -> bindValue(":userConnected", $userConnected);
						
						if($updateQuery -> execute()) {
							$_SESSION['username'] = $userNameChange;
							echo "<script>location.href='" . $userSettingsPage . "?tab=info&edited=username';</script>";
						}
					}
					catch(PDOException $error) {
						echo $error -> getMessage();
					}
				}
			}
			
			//If the go get were the username
			
			if($_GET['go'] == 'setEmail') {
				$userEmailChange = @$_POST['setEmail'];
				
				if($userEmailChange == $userConf['email']) {
					echo "<script>history.go(-1);</script>";
				}
				else {
					try {
						$updateQuery = $pdo -> prepare("UPDATE user SET email = :email WHERE user_id = :userConnected");
						$updateQuery -> bindValue(":email", $userEmailChange);
						$updateQuery -> bindValue(":userConnected", $userConnected);
						
						if($updateQuery -> execute()) {
							$_SESSION['username'] = $userNameChange;
							echo "<script>location.href='" . $userSettingsPage . "?tab=info&edited=email';</script>";
						}
					}
					catch(PDOException $error) {
						echo $error -> getMessage();
					}
				}
			}
			
			//If the go get were the username
			
			if($_GET['go'] == 'setPassword') {
				$userCurrentPassword = sha1(@$_POST['setSenha'] . '1658998fgt66951f8e41f51hju885g5r1g51w25f21r5g4f');
				$userNewPassword = sha1(@$_POST['setSenha2'] . '1658998fgt66951f8e41f51hju885g5r1g51w25f21r5g4f');
				$userNewPassword2 = sha1(@$_POST['setSenha3'] . '1658998fgt66951f8e41f51hju885g5r1g51w25f21r5g4f');
				
				if(($userCurrentPassword !== $userConf['password']) or ($userNewPassword !== $userNewPassword2)) {
					if($userCurrentPassword == $userNewPassword2) {
						echo "<script>history.go(-1);</script>";
					}
				}
				elseif(($userCurrentPassword == $userConf['password']) and ($userNewPassword == $userNewPassword2)) {
					if($userCurrentPassword !== $userNewPassword2) {
						$updateQuery = $pdo -> prepare("UPDATE user SET password = :newPass WHERE user_id = :userConnected");
						$updateQuery -> bindValue(":newPass", $userNewPassword2);
						$updateQuery -> bindValue(":userConnected", $userConnected);
						
						if($updateQuery -> execute()) {
							$_SESSION['password'] = $userNewPassword2;
							echo "<script>location.href='" . $userSettingsPage . "?tab=info&edited=password';</script>";
						}
					}
				}
			}
			
			//If the go get were the lang
			
			if($_GET['go'] == 'setLang') {
				$userLangChange = @$_POST['langSelectUser'];
				
				if($userLangChange == $userConf['lang']) {
					echo "<script>history.go(-1);</script>";
				}
				else {
					$updateQuery = $pdo -> prepare("UPDATE user SET lang = :langChange WHERE user_id = :userConnected");
					$updateQuery -> bindValue(":langChange", $userLangChange);
					$updateQuery -> bindValue(":userConnected", $userConnected);
					
					if($updateQuery -> execute()) {
                        $_SESSION['lang'] = $userLangChange;
						echo "<script>location.href='" . $userSettingsPage . "?tab=lang&edited=lang';</script>";
					}
				}
			}
		}
	}
?>