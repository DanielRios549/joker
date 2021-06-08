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
	
	elseif($loginCheck == true) {
        if((THIS_PAGE == 'title') or (THIS_PAGE == 'watch') or (THIS_PAGE == 'admin_series_manager')) {
            //Get season number

            try {
                $getSeasons = $pdo -> prepare("SELECT COUNT(DISTINCT season) FROM content_episodes WHERE episode_ref = :content AND active = 'yes'");
                $getSeasons -> bindValue(":content", $contentPage);
                
                if($getSeasons -> execute()) {
                    $contentEpisodes = $getSeasons -> fetch(PDO::FETCH_ASSOC);

                    $seasonNumber = $contentEpisodes['COUNT(DISTINCT season)'];

                    if($seasonNumber < 2) {
                        $contentTime = $seasonNumber . ' ' . langCode('season');
                    }
                    else {
                        $contentTime = $seasonNumber . ' ' . langCode('seasons');
                    }
                }
            }
            catch(PDOException $error) {
                $error -> getMessage();
            }

            $contentToFetch = $contentPage;
        }
        else {
            $contentToFetch = @$contentScroll;
        }

        //Get episodes number

        try {
            $getEpisodes = $pdo -> prepare("SELECT season, episode_id, episode, $cookieLang FROM content_episodes WHERE episode_ref = :content AND active = 'yes' ORDER BY season ASC, episode ASC");
            $getEpisodes -> bindValue(":content", $contentToFetch);

            if($getEpisodes -> execute()) {
                $episodesList = $getEpisodes -> fetchAll(PDO::FETCH_ASSOC | PDO::FETCH_GROUP);
            }
            //print_r($episodesList);
        }
        catch(PDOException $error) {
            $error -> getMessage();
        }

        //Define the folder for series

        $firstEpisodeIndex = array_keys($episodesList);
        $firstEpisodeAll = @$episodesList[$firstEpisodeIndex[0]];
        $firstEpisode = $firstEpisodeAll[0];

        //print_r($firstEpisode);
    }
?>