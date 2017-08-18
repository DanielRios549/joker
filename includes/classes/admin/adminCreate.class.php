<?php
/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
	if(!isset($baseCon)) {
		require '../../../_redirect.php';
		header("Location:" . $base . "404");
	}

    class AdminCreate extends Connect {
        private $imageDir;
        private $videoDir;
        public $showError;

        public function content($url, $page, $data, $file, $submit) {
            $pdo = $this -> getConnection();

            if(isset($submit)) {
<<<<<<< HEAD
            	//Selects
=======
            	//Selectes
>>>>>>> 6dfffad0f8c1419f805d75579d817ed16c9f2671

				$active = @$data['active'];
				$feature = @$data['feature'];
				$age = @$data['age'];
				$category = @$data['category'];

				//Inputs

				$liveUrl = @$data['liveUrl'];
				$producer = @$data['producerName'];
				$director = @$data['directorName'];
				$date = @$data['date'];
				$titleEn = @$data['titleEn'];
				$synEn = @$data['synEn'];
				$titlePt = @$data['titlePt'];
				$synPt = @$data['synPt'];

				$en = $titleEn . "|" . $synEn;
				$pt = $titlePt . "|" . $synPt;

				//Files

				$image = @$file['contentImage'];
				$backImage = @$file['backImage'];
				$video = @$file['contentVideo'];

                $duration = 'N/D';

                //Verify if there are empty inputs

                /****************************************
                A problem is showing text fields empty when select a vidoe file
                ****************************************/

                if(($producer == '') or ($director == '') or ($date == '') or ($titleEn == '') or ($synEn == '') or ($titlePt == '') or ($synPt == '')) {
                    $show = 'userErrorDisplay';
					$msg = 'Fill in all fields, please';

                    $errorPos = array($show, $msg);
                }
                else {
                    //Verify the type

                    if($page == 'admin_movies_add') {
                        $type = 'movie';
                    }
                    elseif($page == 'admin_series_add') {
                        $type = 'serie';
                    }
                    elseif($page == 'admin_lives_add') {
                        $type = 'live';
                    }

                    //Verify if the content exist

                    try {
                        $verifyContent = $pdo -> prepare("SELECT * FROM content WHERE en_US = :en OR pt_BR = :pt");
                        $verifyContent -> bindValue(":en", $en, PDO::PARAM_STR);
                        $verifyContent -> bindValue(":pt", $pt, PDO::PARAM_STR);
                        $verifyContent -> execute();
                        $contentVerified = $verifyContent -> rowCount();
                    }
                    catch(PDOException $error) {
                        echo $error -> getMessage();
                    }

                    //If exist the sigin get, the sigin will be do or will be return a error.

                    if($contentVerified == 1) {
                        $show = 'userErrorDisplay';
                        $msg = 'This ' . $type . ' already exists';
                    }
                    elseif($contentVerified == 0) {
                        try {
                            date_default_timezone_set('America/Sao_Paulo');
                            $insertPrepare = $pdo -> prepare("INSERT INTO content(producer, director, date, en_US, pt_BR, active, feature, type, duration, category, date_add, link)
                            VALUES (:producer, :director, :date, :en, :pt, :active, :feature, :type, :duration, :category, :date_add, :link)");

                            $insertPrepare -> bindValue(":producer", $producer, PDO::PARAM_STR);
                            $insertPrepare -> bindValue(":director", $director, PDO::PARAM_STR);
                            $insertPrepare -> bindValue(":date", $date, PDO::PARAM_STR);
                            $insertPrepare -> bindValue(":en", $en, PDO::PARAM_STR);
                            $insertPrepare -> bindValue(":pt", $pt, PDO::PARAM_STR);

                            $insertPrepare -> bindValue(":active", $active, PDO::PARAM_STR);
                            $insertPrepare -> bindValue(":feature", $feature, PDO::PARAM_STR);
                            $insertPrepare -> bindValue(":type", $type, PDO::PARAM_STR);
                            $insertPrepare -> bindValue(":duration", $duration, PDO::PARAM_STR);
                            $insertPrepare -> bindValue(":category", $category, PDO::PARAM_STR);
                            $insertPrepare -> bindValue(":date_add", date('Y-m-d'));
                            $insertPrepare -> bindValue(":link", $liveUrl, PDO::PARAM_STR);
                        }
                        catch(PDOException $error) {
                            echo $error -> getMessage();
                        }

                        //Do the complements if the contente has been created

                        if($insertPrepare -> execute()) {
                            $contentrDirQuery = $pdo -> prepare("SELECT * FROM content WHERE en_US = :en");
                            $contentrDirQuery -> bindValue(":en", $en, PDO::PARAM_STR);

                            if($contentrDirQuery -> execute()) {
                                //Make the user directory and copy the images and video

                                $contentDirData = $contentrDirQuery -> fetch(PDO::FETCH_ASSOC);

                                $contentImageDir = $url . 'images/media/' . $type . "s/" . $contentDirData['content_id'];
                                $this -> imageDir = $contentImageDir;
                                mkdir($contentImageDir);

								if ($type != 'live') {
									$contentVideoDir = $url . 'media/' . $type . "s/" . $contentDirData['content_id'];
	                                $this -> videoDir = $contentVideoDir;
									mkdir($contentVideoDir);
								}

                                //Upload Image if exists or copy the default

                                if($image['name'] != '') {
                                    $imageExtension = strtolower(substr($image['name'], -4));
                                    $imageName = "image" . $imageExtension;
                                    move_uploaded_file($image['tmp_name'], $contentImageDir . "/" . $imageName);
                                }
                                else {
                                    copy('../images/media/image.jpg' , $contentImageDir . '/image.jpg');
                                }

                                //Upload Background Image if exists or copy the default

                                if($backImage['name'] != '') {
                                    $backImageExtension = strtolower(substr($backImage['name'], -4));
                                    $backImageName = "background" . $backImageExtension;
                                    move_uploaded_file($backImage['tmp_name'], $contentImageDir . "/" . $backImageName);
                                }
                                else {
                                    copy('../images/media/background.jpg' , $contentImageDir . '/background.jpg');
                                }

								system('chmod -R 770 ' . $contentImageDir);

                                //Upload video if exists or copy the default

                                if($type == 'movie') {
                                    if($video['name'] != '') {
                                        $videoExtension = strtolower(substr($video['name'], -4));
                                        $videoName = "video" . $videoExtension;
                                        move_uploaded_file($video['tmp_name'], $contentVideoDir . "/" . $videoName);
                                    }
                                    else {
                                        copy('../media/video.mp4' , $contentVideoDir . '/video.mp4');
                                    }

                                    $this -> createDashVideo($contentVideoDir);

                                    system('chmod -R 770 ' . $contentVideoDir);
                                    $msg = 'Movie Added';
                                }
                                elseif($type == 'serie') {
                                    //$this -> contentEpisode($contentDirData['content_id'], $data, $file, 1 , 1, true, false);
                                    system('chmod -R 770 ' . $contentVideoDir);

                                    $msg = 'Serie Added, now you need to add episodes';
                                }
								elseif($type == 'live') {
									$msg = 'Live Added';
								}

                                $show = 'newAccountCreatedDisplay';
                            }
                        }
                    }

                    $errorPos = array($show, $msg);
                }

                //Show the Error

                if(isset($errorPos)) {
                    $this -> showError = $errorPos;
                }
            }
        }
        public function contentEpisode($url, $content, $data, $file, $season, $episode, $message) {
            $pdo = $this -> getConnection();

            //inputs

            $active = isset($data['active']) ? $data['active'] : 'no';
            $episodeUS = @$data['episodeTitleUS'] . "|" . @$data['episodeSynUS'];
            $episodeBR = @$data['episodeTitleBR'] . "|" . @$data['episodeSynBR'];

            //Files

            $firstImage = @$file['firstImage'];
            $firstVideo = @$file['firstVideo'];

            $getContent = $pdo -> prepare("SELECT * FROM content WHERE content_id = :content");
            $getContent -> bindValue(":content", $content);
            $getContent-> execute();

            if($getContent -> rowCount() == 1) {
                $getEpisode = $pdo -> prepare("SELECT * FROM content_episodes WHERE episode_ref = :content AND season = :season AND episode = :episode");
                $getEpisode -> bindValue(":content", $content);
                $getEpisode -> bindValue(":season", $season);
                $getEpisode -> bindValue(":episode", $episode);
                $getEpisode -> execute();

                if($getEpisode -> rowCount() == 0) {
                    $addEpisode = $pdo -> prepare("INSERT INTO content_episodes(active, episode_ref, season, episode, en_US, pt_BR)
                    VALUES (:active, :content, :season, :episode, :episodeUS, :episodeBR)");

                    $addEpisode -> bindValue(":active", $active);
                    $addEpisode -> bindValue(":content", $content);
                    $addEpisode -> bindValue(":season", $season);
                    $addEpisode -> bindValue(":episode", $episode);
                    $addEpisode -> bindValue(":episodeUS", $episodeUS);
                    $addEpisode -> bindValue(":episodeBR", $episodeBR);
                    $addEpisode -> execute();

                    if($addEpisode -> rowCount() == 1)  {
                        $episodeImageParentDir = $url . "images/media/series/" . $content;
                        $episodeVideoParentDir = $url . "media/series/" . $content;
                        $episodeAddDir = "/season" . $season;
                        $episodeAddDir2 = "/episode" . $episode;

                        //system('/bin/mkdir ' . $episodeImageParentDir);
                        //system('/bin/mkdir ' . $episodeImageParentDir . $episodeAddDir);
                        //system('/bin/mkdir ' . $episodeImageParentDir . $episodeAddDir . $episodeAddDir2);
                        mkdir($episodeImageParentDir . $episodeAddDir . $episodeAddDir2, 770);

                        //system('/bin/mkdir ' . $episodeVideoParentDir);
                        //system('/bin/mkdir ' . $episodeVideoParentDir . $episodeAddDir);
                        //system('/bin/mkdir ' . $episodeVideoParentDir . $episodeAddDir . $episodeAddDir2);
                        mkdir($episodeVideoParentDir . $episodeAddDir . $episodeAddDir2, 770);

                        $episodeImageDir = $episodeImageParentDir . $episodeAddDir . $episodeAddDir2;
                        $episodeVideoDir = $episodeVideoParentDir . $episodeAddDir . $episodeAddDir2;

                        //Episode Image

                        if($firstImage['name'] != '') {
                            $imageExtension = strtolower(substr($firstImage['name'], -4));
                            $imageName = "image" . $imageExtension;
                            move_uploaded_file($firstImage['tmp_name'], $episodeImageDir . "/" . $imageName);
                        }
                        else {
                            copy('../images/media/episodeImage.jpg', $episodeImageDir . '/image.jpg');
                        }

                        //Episode Video

                        if($firstVideo['name'] != '') {
                            $videoExtension = strtolower(substr($firstVideo['name'], -4));
                            $videoName = "video" . $videoExtension;
                            move_uploaded_file($firstVideo['tmp_name'], $episodeVideoDir . "/" . $videoName);
                        }
                        else {
                            copy('../media/video.mp4', $episodeVideoDir . '/video.mp4');
                        }

                        $this -> createDashVideo($episodeVideoDir);

                        if($message == true) {
                            $msg = 'Episode Added';
                            $show = 'newAccountCreatedDisplay';
                        }
                    }
                    else {
                        if($message == true) {
                            $msg = "Error to add the episode";
                            $show = 'newAccountCreatedDisplay';
                        }
                    }
                }
                elseif($getEpisode -> rowCount() >= 1) {
                    if($message == true) {
                        $msg = "Episode Already Exist";
                        $show = 'newAccountCreatedDisplay';
                    }
                }
            }

            //Show the Error

            if($message == true) {
                $errorPos = array($show, $msg);
                $this -> showError = $errorPos;
            }
        }

        //function used as complement for 2 above

        private function createDashVideo($dir) {
            $openFolder = 'cd ' . $dir;
            $MP4BoxDecode = $openFolder . ' && MP4Box -dash-profile dashavc264:live -dash 4000 -frag 4000 -segment-name video_0/segment video.mp4 -out output_dash.mpd';

            system($MP4BoxDecode);
            unlink($dir . '/video.mp4');
            $this -> fixMPDFile($dir);
        }
        private function fixMPDFile($dir) {
            //system('/bin/mv ' . $dir . '/output_dash.mpd ' . $dir . '/output_dash.xml');
            rename($dir . '/output_dash.mpd', $dir . '/output_dash.xml');

            $elementToRemove = 'ContentComponent';
            $xmlFileToLoad   = $dir . '/output_dash.xml';
            $xmlFileToSave   = $dir . '/output_dash.mpd';

            $dom = new DOMDocument();
            $dom -> load($xmlFileToLoad);

            $matchingElements = $dom -> getElementsByTagName($elementToRemove);
            $totalMatches     = $matchingElements -> length;

            $elementsToDelete = array();

            for ($i = 0; $i < $totalMatches; $i++) {
                $elementsToDelete[] = $matchingElements -> item($i);
            }

            foreach ( $elementsToDelete as $elementToDelete ) {
                $elementToDelete -> parentNode -> removeChild($elementToDelete);
            }

            $dom -> save($xmlFileToSave);

            unlink($dir . '/output_dash.xml');
        }
    }
?>
