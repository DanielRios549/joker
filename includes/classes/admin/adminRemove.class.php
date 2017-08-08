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
    
    class AdminRemove extends Connect {
        public function remove($page, $url) {
			$pdo = $this -> getConnection();

            $getRemove = (int) isset($_GET['removed']) ? $_GET['removed'] : 0;

            $userDir = $url . 'images/user/' . $getRemove;

            if($page == 'admin_users_manager') {
                $removeType = 'User';
                $getUser = $pdo -> prepare("SELECT * FROM user WHERE user_id = :user");
                $getUser -> bindValue(':user', $getRemove);
                $getUser -> execute();

                if($getUser -> rowCount() == 1) {
                    $user = $getUser -> fetch(PDO::FETCH_ASSOC);
                    $userName = $user['username'];

                    $removeIndentifyer = $userName;

                    //Prepare to remove the use, remove the foreign datas before

                    try {
                        $pdo -> beginTransaction();

                        /*$removeReply = $pdo -> prepare("DELETE FROM comment_reply WHERE user = ?");
                        $removeReply -> execute($getRemove);

                        $removeComment = $pdo -> prepare("DELETE FROM comment WHERE user = ?");
                        $removeComment -> execute($getRemove);

                        $removeFollow = $pdo -> prepare("DELETE FROM follow WHERE user = ?");
                        $removeFollow -> execute($getRemove);

                        $removeFollow2 = $pdo -> prepare("DELETE FROM follow WHERE follow = ?");
                        $removeFollow2 -> execute($getRemove);

                        $removeRestore = $pdo -> prepare("DELETE FROM user_restore WHERE user_id = ?");
                        $removeRestore -> execute($getRemove);

                        $removeWatched = $pdo -> prepare("DELETE FROM watched WHERE user = ?");
                        $removeWatched -> execute($getRemove);

                        $removeWatchlist = $pdo -> prepare("DELETE FROM watchlist WHERE user_id = ?");
                        $removeWatchlist -> execute($getRemove);

                        $removeUser = $pdo -> prepare("DELETE FROM user WHERE user_id = ?");
                        $removeUser -> execute($getRemove);

                        if($pdo -> commit()) {
                            if($removeUser -> rowCount() == 0) {
                                echo alert("Sintax ok, but there is an error to delete the user " . $removeIndentifyer);
                            }
                            elseif($removeUser -> rowCount() == 1) {
                                echo alert($removeType . ' ' . $removeIndentifyer . ' ' .  'Removed, id ' . $getRemove);
                            }
                        }
                        else {
                            $pdo -> rollBack();
                            echo alert('Sintax Error to remove the user ' . $removeIndentifyer);
                        }*/

                        system('/bin/rm -rf ' . escapeshellarg($userDir));

                        //echo alert($userDir);

                        echo script('history.go(-2)');
                    }
                    catch(PDOException $error) {
                        $pdo -> rollBack();
                        echo $error -> getMessage();
                    }
                }
            }
        }
    }
?>