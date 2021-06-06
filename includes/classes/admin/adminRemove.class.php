<?php
/*
 ***************************************************************
 | Copyright (c) 2014-2021 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
	if(!isset($baseCon)) {
		require '../../../_redirect.php';
		header("Location:" . $base . "404");
	}

    class AdminRemove extends Connect {
    	public function remove($page, $url) {
			$pdo = $this -> getConnection();

			$getRemove = (int) isset($_GET['removed']) ? $_GET['removed'] : 0;

			if($page == 'admin_users_manager') {
				$removeType = 'User';

				//Verify if the user exists

				$getUser = $pdo -> prepare("SELECT * FROM user WHERE user_id = :user");
				$getUser -> bindValue(':user', $getRemove);
				$getUser -> execute();

				if($getUser -> rowCount() == 1) {
					$user = $getUser -> fetch(PDO::FETCH_ASSOC);
					$userName = $user['username'];
					$userId = $user['user_id'];
					$deleteDir = $url . 'images/user/' . $userId;
					$removeIndentifyer = $userName;

					//Prepare to remove the use, remove the foreign datas before

					try {
						//Verify if there is replies from others users in this user's comments

						$replyFrom = $pdo -> prepare(
						"DELETE rp.* FROM user AS u
						INNER JOIN comment AS cm ON cm.user = u.user_id
						INNER JOIN comment_reply AS rp ON rp.comment = cm.comment_id
						WHERE u.user_id = :user");

						$replyFrom -> bindValue(':user', $userId);

						if($replyFrom -> execute()) {
							$pdo -> beginTransaction();

							$removeReply = $pdo -> exec("DELETE FROM comment_reply WHERE user = $getRemove");

							$removeComment = $pdo -> exec("DELETE FROM comment WHERE user = $getRemove");

							$removeFollow = $pdo -> exec("DELETE FROM follow WHERE user = $getRemove");

							$removeFollow2 = $pdo -> exec("DELETE FROM follow WHERE follow = $getRemove");

							$removeRestore = $pdo -> exec("DELETE FROM user_restore WHERE user = $getRemove");

							$removeWatched = $pdo -> exec("DELETE FROM watched WHERE user = $getRemove");

							$removeWatchlist = $pdo -> exec("DELETE FROM watchlist WHERE user_id = $getRemove");

							if($pdo -> commit()) {
								$removeUser = $pdo -> prepare("DELETE FROM user WHERE user_id = :user");
								$removeUser -> bindValue(':user', $getRemove);
								$removeUser -> execute();

								if($removeUser -> rowCount() == 0) {
									echo alert("Sintax ok, but the user " . $removeIndentifyer . " was not deleted");
								}
								elseif($removeUser -> rowCount() == 1) {
									system('/bin/rm -rf ' . escapeshellarg($deleteDir));
									echo alert($removeType . ' ' . $removeIndentifyer . ' ' .  'Removed, id ' . $userId);
								}
								echo script('history.go(-2)');
							}
							else {
								echo alert("Error to delete the user " . $removeIndentifyer);
								$pdo -> rollBack();
								echo script('history.go(-2)');
							}
						}
						else {
							echo alert("Error to delete a reply from user " . $removeIndentifyer);
							echo script('history.go(-2)');
						}
					}
					catch(PDOException $error) {
						$pdo -> rollBack();
						echo $error -> getMessage();
					}
				}
				else {
					echo script('history.go(-2)');
				}
			}
			else {
				$removeType = MENU_GROUP;
				$lang = $_SESSION['lang'];

				//Verify if the content exists

				$getContent = $pdo -> prepare("SELECT * FROM content WHERE content_id = :content");
				$getContent -> bindValue(':content', $getRemove);
				$getContent -> execute();

				if($getContent -> rowCount() == 1) {
					$content = $getContent -> fetch(PDO::FETCH_ASSOC);
					$divisorPosition = strpos($content[$lang], "|");

					$contentName = substr($content[$lang], 0, $divisorPosition);
					$contentId = $content['content_id'];
					$deleteDir = $url . 'images/media/' . $removeType . 's/' . $contentId;
					$deleteDir2 = $url . 'media/' . $removeType . 's/' . $contentId;
					$removeIndentifyer = $contentName;

					//Prepare to remove the use, remove the foreign datas before

					try {
						//Verify if there is replies from others users in this user's comments

						$replyFrom = $pdo -> prepare(
						"DELETE rp.* FROM content AS c
						INNER JOIN comment AS cm ON cm.content = c.content_id
						INNER JOIN comment_reply AS rp ON rp.comment = cm.comment_id
						WHERE c.content_id = :content");

						$replyFrom -> bindValue(':content', $contentId);

						if($replyFrom -> execute()) {
							$pdo -> beginTransaction();

							$removeReply = $pdo -> exec("DELETE FROM comment_reply WHERE comment = $getRemove");

							$removeComment = $pdo -> exec("DELETE FROM comment WHERE content = $getRemove");

							$removeEpisode = $pdo -> exec("DELETE FROM content_episodes WHERE episode_ref = $getRemove");

							$removeWatched = $pdo -> exec("DELETE FROM watched WHERE content = $getRemove");

							$removeWatchlist = $pdo -> exec("DELETE FROM watchlist WHERE content_id = $getRemove");

							if($pdo -> commit()) {
								$removeContent = $pdo -> prepare("DELETE FROM content WHERE content_id = :content");
								$removeContent -> bindValue(':content', $getRemove);
								$removeContent -> execute();

								if($removeContent -> rowCount() == 0) {
									echo alert("Sintax ok, but the " . $removeType . ' ' . $removeIndentifyer . " was not deleted");
								}
								elseif($removeContent -> rowCount() == 1) {
							    	system('/bin/rm -rf ' . escapeshellarg($deleteDir));
							    	system('/bin/rm -rf ' . escapeshellarg($deleteDir2));
							    	echo alert($removeType . ' ' . $removeIndentifyer . ' ' .  'Removed, id ' . $movieId);
								}
								echo script('history.go(-2)');
							}
							else {
								echo alert("Error to delete the " . $removeType . ' ' . $removeIndentifyer);
								$pdo -> rollBack();
								echo script('history.go(-2)');
							}
						}
						else {
							echo alert("Error to delete a reply from " . $removeType . ' ' . $removeIndentifyer);
							echo script('history.go(-2)');
						}
					}
					catch(PDOException $error) {
						$pdo -> rollBack();
						echo $error -> getMessage();
					}
				}
				else {
					echo script('history.go(-2)');
				}
			}
    	}
    }
?>
