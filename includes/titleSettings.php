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

	//If the user is logged
	
	if($loginCheck == true) {
		$contentPage = isset($_GET['id']) ? $_GET['id'] : false;

		//If doesn't exist the id get
		
		if($contentPage == false) {
			ShowError::notFound();
		}

		//If exist the id get

		elseif($contentPage == '') {
			ShowError::notFound();
		}
		else {
			if($adminCheck == true) {
				$adminSufix = '';
			}
			elseif($adminCheck == false) {
				$adminSufix = "AND active = 'yes'";
			}
			try {
				$contentVerify = $pdo -> prepare("SELECT content_id, type FROM content WHERE content_id = :contentPage $adminSufix");
				$contentVerify -> bindValue(":contentPage", $contentPage);

				if($contentVerify -> execute()) {
					$contentTrue = $contentVerify -> fetch(PDO::FETCH_ASSOC);
				}
			}
			catch(PDOException $error) {
				echo $error -> getMessage();
			}
			
			if($contentVerify -> rowCount() !== 1) {
				ShowError::notFound();
			}
			elseif($contentVerify -> rowCount() == 1) {
				try {
					$contentQuery = $pdo -> prepare("SELECT content_id, producer, director, category, type, feature, duration, age, date, $cookieLang FROM content WHERE content_id = :content");
					$contentQuery -> bindValue(":content", $contentPage);

					if($contentQuery -> execute()) {
						$contentFetch = $contentQuery -> fetch(PDO::FETCH_ASSOC);
						
						$divisorPosition = strpos($contentFetch[$cookieLang], "|");

						$contentData = array (
							'content_id' => $contentFetch['content_id'],
							'producer' => $contentFetch['producer'],
							'director' => $contentFetch['director'],
							'category' => $contentFetch['category'],
							'type' => $contentFetch['type'],
							'feature' => $contentFetch['feature'],
							'duration' => $contentFetch['duration'],
							'age' => $contentFetch['age'],
							'date' => $contentFetch['date'],
							'name' => substr($contentFetch[$cookieLang], 0, $divisorPosition),
							'synopsis' => substr($contentFetch[$cookieLang], $divisorPosition + 1)
						);
						//print_r($contentData);
					}
				}
				catch(PDOException $error) {
					echo $error -> getMessage();
				}
				
				define('CONTENT_TITLE' , $contentData['name']);
				$contentId = $contentData['content_id'];
				$contentType = $contentData['type'];
				$contentAge = $contentData['age'];
				$contentProducer = $contentData['producer'];
				$contentSynopsis = $contentData['synopsis'];
				$contentYear = $contentData['date'];

				$contentProducerSearch = str_replace(' ', '+', $contentProducer);
				
				//Define the age
				
				if($contentAge == 'L') {
					$ageStyle = 'ageFree';
				}
				else {
					$ageStyle = 'age' . $contentAge;
				}
				
				//Define the type
				
				if($contentType == 'movie') {
					$contentTime = $contentData['duration'];
					
					//Define the folder for movies
				
					$contentFolder = $mediaImageFolder . 'movies/' . $contentData['content_id'];
					$contentWatchLink = getLink('watch', false) . "?id=" . $contentId;
				}
				elseif($contentType == 'live') {
					$contentTime = 'Live';

					$contentFolder = $mediaImageFolder . 'lives/' . $contentData['content_id'];
					$contentWatchLink = getLink('watch', false) . "?id=" . $contentId;
				}
				elseif($contentType == 'serie') {
					require 'getEpisodes.php';

					$contentFolder = $mediaImageFolder . 'series/' . $contentData['content_id'];
					$contentWatchLink = getLink('watch', false) . "?id=" . $contentId . "&e=". $firstEpisode['episode_id'];
				}
				
				//Define the category
				
				$contentCategory = langCode($contentData['category']);
				
				$imageContent = $contentFolder . "/image.jpg";
				$imageBackground = $contentFolder . "/background.jpg";
				
				//Define the watchlist button
				
				$watchListQuery = $pdo -> prepare("SELECT * FROM watchlist WHERE user = :session AND content = :contentPage");
				$watchListQuery -> bindValue(":session", $_SESSION['user_id']);
				$watchListQuery -> bindValue(":contentPage", $contentPage);
				$watchListQuery -> execute();
				
				if($watchListQuery -> rowCount() == 1) {
					$watchList = 'removeWatchList';
				}
				else {
					$watchList = 'addWatchList';
				}

				//check the connected comment

				try {
                    $checkComment = $pdo -> prepare("SELECT comment FROM comment WHERE content = :content AND user = :user");
                    $checkComment -> bindValue(":content", $contentId);
                    $checkComment -> bindValue(":user", $userId);

                    if($checkComment -> execute()) {
                        if($checkComment -> rowCount() == 1) {
                            $userComment = true;

							$showUserComment = $checkComment -> fetch(PDO::FETCH_ASSOC);

							//print_r($showUserComment);
                        }
						elseif($checkComment -> rowCount() == 0) {
                            $userComment = false;
                        }
                    }
                }
                catch(PDOException $error) {
                    $error -> getMessage();
                }

				//check if exists comments

				$getComment = $pdo -> prepare("SELECT c.comment_id, c.user AS user_comment, u.name AS comment_name, c.comment, r.user AS user_reply, ru.name AS reply_name, r.reply FROM comment AS c LEFT JOIN comment_reply AS r ON c.comment_id = r.comment LEFT JOIN user AS u ON c.user = u.user_id LEFT JOIN user AS ru ON r.user = ru.user_id WHERE c.content = :contentPage AND c.user != :user ORDER BY c.comment_id DESC, r.reply_id ASC");

				$getComment -> bindValue(":contentPage", $contentPage);
				$getComment -> bindValue(":user", $userId);

				if($getComment -> execute()) {
					if($getComment -> rowCount() == 0) {
						$existsComments = false;
					}
					else {
						$existsComments = true;

						$comments = $getComment -> fetchAll(PDO::FETCH_ASSOC | PDO::FETCH_GROUP);

						$commentArrayKeys = array_keys($comments);
						$commentKeys = implode(",", $commentArrayKeys);
						
						//print_r($comments);
					}
				}
			}
		}
	}
?>