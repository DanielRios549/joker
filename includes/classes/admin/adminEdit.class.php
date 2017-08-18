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

    class AdminEdit extends Connect {
		public function edit($page, $edit) {
			$pdo = $this -> getConnection();

			$getEdit = (int) isset($_GET['edited']) ? $_GET['edited'] : 0;

			//Make the query

			if($page == 'admin_users_manager') {
			    $editType = 'User';
			    $editIdentfyer = addslashes($edit['editUserName']);

				//Selects

			    $active = @$edit['active'];
			    $category = @$edit['category'];
			    $premium = @$edit['premium'];
			    $lang = @$edit['lang'];

				//Ipnut

				$name = @$edit['editName'];
			    $username = @$edit['editUserName'];
			    $email = @$edit['editEmail'];

			    $editRow = $pdo -> prepare("UPDATE user SET active = :active, category = :category, premium = :premium,
			    lang = :lang, name = :name, username = :username, email = :email
			    WHERE user_id = :user LIMIT 1");

			    $editRow -> bindValue(":active", $active);
			    $editRow -> bindValue(":category", $category);
			    $editRow -> bindValue(":premium", $premium);
			    $editRow -> bindValue(":lang", $lang);
			    $editRow -> bindValue(":name", $name);
			    $editRow -> bindValue(":username", $username);
			    $editRow -> bindValue(":email", $email);
			    $editRow -> bindValue(":user", $getEdit);

			    if($_SESSION['user_id'] == $getEdit) {
			        $_SESSION['name'] = $name;
			        $_SESSION['username'] = $username;
			    }
			}
			elseif($page != 'admin_episodes_manager') {
			    $editType = MENU_GROUP;
			    $editIdentfyer = addslashes($edit['editTitleUS']);

				//Selects

			    $active = @$edit['active'];
			    $feature = @$edit['feature'];
			    $age = @$edit['age'];
			    $category = @$edit['category'];

				//Inputs

				$liveUrl = @$edit['liveUrl'];
				$producer = @$edit['editProcuder'];
			    $director = @$edit['editDirector'];
			    $date = $edit['editDate'];
			    $langContentUS = @$edit['editTitleUS'] . '|' . @$edit['editSynUS'];
			    $langContentBR = @$edit['editTitleBR'] . '|' . @$edit['editSynBR'];

			    $editRow = $pdo -> prepare("UPDATE content SET active = :active, feature = :feature,
			    age = :age, category = :category, producer = :producer, director = :director, date = :date,
			    en_US = :langUS, pt_BR = :langBR, link = :link WHERE content_id = :content LIMIT 1");

			    $editRow -> bindValue(":active", $active);
			    $editRow -> bindValue(":feature", $feature);
			    $editRow -> bindValue(":age", $age);
			    $editRow -> bindValue(":category", $category);
			    $editRow -> bindValue(":producer", $producer);
			    $editRow -> bindValue(":director", $director);
			    $editRow -> bindValue(":date", $date);
			    $editRow -> bindValue(":langUS", $langContentUS);
			    $editRow -> bindValue(":langBR", $langContentBR);
			    $editRow -> bindValue(":link", $liveUrl);
			    $editRow -> bindValue(":content", $getEdit);
			}
			else {
			    $editType = 'Episode';
			    $editIdentfyer = addslashes($edit['editTitleUS']);

			    $active = @$edit['active'];
			    $season = @$edit['season'];
			    $episode = @$edit['episode'];
			    $langContentUS = @$edit['editTitleUS'] . '|' . @$edit['editSynUS'];
			    $langContentBR = @$edit['editTitleBR'] . '|' . @$edit['editSynBR'];

			    $editRow = $pdo -> prepare("UPDATE content_episodes SET active = :active, en_US = :langUS, pt_BR = :langBR
			    WHERE episode_id = :content LIMIT 1");

			    $editRow -> bindValue(":active", $active);
			    //$editRow -> bindValue(":season", $season);
			    //$editRow -> bindValue(":episode", $episode);
			    $editRow -> bindValue(":langUS", $langContentUS);
			    $editRow -> bindValue(":langBR", $langContentBR);
			    $editRow -> bindValue(":content", $getEdit);
			}

			//Execute the command to edit

			if($getEdit >= 1) {
			    try {
			        if($editRow -> execute()) {
			            echo alert($editType . ' ' . $editIdentfyer . ' ' .  'Edited, id ' . $getEdit);
			            echo script('history.go(-2)');
			            //echo "<script>alert('" . $editType . " \"" . $editIdentfyer . "\" Edited, id " . $getEdit . "');history.go(-2);</script>";
			        }
			    }
			    catch(PDOException $error) {
			        echo $error -> getMessage();
			    }
			}
		}
    }
?>
