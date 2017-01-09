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
		$contentPage = @$_GET['id'];

		//If doesn't exist the id get
		
		if(!isset($contentPage)) {
			header("Location:" . $baseUrl . "404");
		}

		//If exist the id get

        elseif($contentPage == '') {
			header("Location:" . $baseUrl . "404");
		}
		else {
            try {
				$contentVerify = $pdo -> prepare("SELECT content_id, type FROM content WHERE content_id = :contentPage AND active = 'yes'");
				$contentVerify -> bindValue(":contentPage", $contentPage);

				if($contentVerify -> execute()) {
					$contentTrue = $contentVerify -> fetch(PDO::FETCH_ASSOC);
				}
			}
			catch(PDOException $error) {
				echo $error -> getMessage();
			}

			//verify if the content exits
			
            if($contentVerify -> rowCount() !== 1) {
				header("Location:" . $baseUrl . "404");
			}
			elseif($contentVerify -> rowCount() == 1) {

                //set The values for movies

                if($contentTrue['type'] == 'movie') {
                    $contentQuery = $pdo -> prepare("SELECT content_id, $cookieLang FROM content WHERE content_id = :content");
					$contentQuery -> bindValue(":content", $contentPage);

					if($contentQuery -> execute()) {
						$contentFetch = $contentQuery -> fetch(PDO::FETCH_ASSOC);
						
						$divisorPosition = strpos($contentFetch[$cookieLang], "|");

						$contentData = array (
							'content_id' => $contentFetch['content_id'],
							'name' => substr($contentFetch[$cookieLang], 0, $divisorPosition),
							'synopsis' => substr($contentFetch[$cookieLang], $divisorPosition + 1)
						);
						//print_r($contentData);

                        define('WATCH_TITLE' , $contentData['name']);
				        $contentType = $contentTrue['type'];
                        $contentId = $contentData['content_id'];
                        $contentSynopsis = $contentData['synopsis'];

                        $dataSeason = 'none';
                        $dataEpisode = 'none';
					}
                }

                //set The values for series

                elseif($contentTrue['type'] == 'serie') {
		            $contentReference = @$_GET['e'];

                    if(!isset($contentReference)) {
                        header("Location:" . $baseUrl . "404");
                    }
                    else {
                        if($contentReference == '') {
                            header("Location:" . $baseUrl . "404");
                        }
                        else {
                            $contentQuery = $pdo -> prepare("SELECT c.content_id, e.episode_id, e.season, e.episode, e.$cookieLang FROM content AS c INNER JOIN content_episodes AS e ON c.content_id = e.episode_ref WHERE e.episode_id = :contentReference AND c.content_id = :content AND e.active = 'yes'");
                            $contentQuery -> bindValue(":content", $contentPage);
                            $contentQuery -> bindValue(":contentReference", $contentReference);

                            if($contentQuery -> execute()) {
                                if($contentQuery -> rowCount() == 0) {
                                    header("Location:" . $baseUrl . "404");
                                }
                                elseif($contentQuery -> rowCount() == 1) {
                                    $contentFetch = $contentQuery -> fetch(PDO::FETCH_ASSOC);
                                    
                                    $divisorPosition = strpos($contentFetch[$cookieLang], "|");

                                    $contentData = array (
                                        'content_id' => $contentFetch['content_id'],
                                        'episode_id' => $contentFetch['episode_id'],
                                        'season' => $contentFetch['season'],
                                        'episode' => $contentFetch['episode'],
                                        'name' => substr($contentFetch[$cookieLang], 0, $divisorPosition),
                                        'synopsis' => substr($contentFetch[$cookieLang], $divisorPosition + 1)
                                    );
                                    //print_r($contentData);

                                    define('WATCH_TITLE' , $contentData['name']);
                                    $contentType = $contentTrue['type'];
                                    $contentId = $contentData['content_id'];
                                    $episodeId = $contentData['episode_id'];
                                    $contentSynopsis = $contentData['synopsis'];

                                    require 'getEpisodes.php';
                                    
                                    $dataSeason = $contentData['season'];
                                    $dataEpisode = $contentData['episode'];
                                    $contentFolder = $mediaImageFolder . 'series/' . $contentData['content_id'];
					                $contentWatchLink = $baseUrl . langCode('watch_link') . "?id=" . $contentId . "&e=". $firstEpisode['episode_id'];
                                }
                            }
                        }
                    }
                }
            }
        }
    }
?>