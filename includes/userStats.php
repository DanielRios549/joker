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
	
	if($loginCheck == true) {
		$userConnected = $_SESSION['user_id'];
	}
	
	try {
		$userPage = @$_GET['id'];
		$userVerify = $pdo -> prepare("SELECT * FROM user WHERE user_id = :userPage");
		$userVerify -> bindValue(":userPage", $userPage);
		$userVerify -> execute();
	}
	catch(PDOException $error) {
		echo $error -> getMessage();
	}

	//If doesn't exist the id get
	
	if(!isset($userPage)) {
		if($loginCheck == false) {
			header("Location:" . $baseUrl . getLink('login'));
		}
		elseif($loginCheck == true) {
			header("Location:" . getLink('profile', $userConnected));
		}
	}
	
	//If exist the id get
	
	if(isset($userPage)) {
		if($userVerify -> rowCount() !== 1) {
			ShowError::notFound();
		}
		elseif($userVerify -> rowCount() == 1) {
            //if(($userPage == 1) and ($userConnected != 1)) {
				//ShowError::notFound();
            //}
			$userData = $userVerify -> fetch(PDO::FETCH_ASSOC);
			
			$userFolder = $imageDir . 'user/' . $userData['user_id'];
			
			$imageProfile = $userFolder . '/profile.jpg';
			$imageCover = $userFolder . '/cover.jpg';
			$userName = $userData['name'];
			define('PROFILE_TITLE' , $userName);
		}
	}
	
	//Verify if the page is the logged user's page
	
	if((isset($userPage)) and (isset($userConnected))) {
		if($userPage == $userConnected) {
			$loggedUserPage = true;

			$followAction = 'unfollow';
		}
		else {
			$loggedUserPage = false;

			//Check if the user is followed by the connected user

			try {
				$checkFollow = $pdo -> prepare("SELECT follow_id FROM follow WHERE user = :user AND follow = :follow");
				$checkFollow -> bindValue(":user", $userConnected);
				$checkFollow -> bindValue(":follow", $userPage);

				if($checkFollow -> execute()) {
					$checkNumber = $checkFollow -> rowCount();

					if($checkNumber != 1) {
						if(($checkNumber > 1) or ($checkNumber == 0)) {
							$userFollowed = false;
							$buttonText = langCode('follow');
							$buttonFollowAction = "followUser";
						}
					}
					elseif($checkNumber == 1) {
						$userFollowed = true;
						$buttonText = langCode('following');
						$buttonFollowAction = "unfollowUser";
					}
				}
			}
			catch(PDOException $error) {
				echo $error -> getMessage();
			}
		}
		try {
			$getFollowers = $pdo -> prepare("SELECT u.user_id, u.name, u.username FROM follow AS f INNER JOIN user AS u ON f.follow = u.user_id WHERE f.user = :user");
			$getFollowers -> bindValue(":user", $userPage);

			if($getFollowers -> execute()) {
				$followersFound = $getFollowers -> fetchAll(PDO::FETCH_ASSOC);
				//print_r($followersFound);
			}
		}
		catch(PDOException $error) {
			echo $error -> getMessage();
		}
	}
?>