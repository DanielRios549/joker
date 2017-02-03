<?php
/* 
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
    define ('THIS_PAGE' , 'ajax');
    
    define ('ADMIN_PAGE' , 'both');
    
    require '../includes/config.php';
    
    $ajaxAction = isset($_GET['ajaxAction']) ? $_GET['ajaxAction'] : false;
    $ajaxId = isset($_GET['ajaxId']) ? $_GET['ajaxId'] : false;
    $userSessionId = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : false;
    
    if(($ajaxAction == false) or  ($ajaxId == false) or ($userSessionId == false)) {
        header("Location:" . $baseUrl. '404');
    }
    elseif(($ajaxAction != false) and  ($ajaxId != false) and ($userSessionId != false)) {
        //add the movie to watchlist
        
        if($ajaxAction == 'addWatchList') {
            if($ajaxId != false) {
                try {
                    $query = $pdo -> prepare("INSERT INTO watchlist (user_id, content_id) VALUES (:session, :ajax)");
                    $query -> bindValue(":session", $userSessionId);
                    $query -> bindValue(":ajax", $ajaxId);

                    if($query -> execute()) {
                        $title = ucfirst(langCode('my')) . ' ' . ucfirst(langCode('watch_list'));

                        $titleToSection = array('title' => $title);

                        $contentJson = json_encode($titleToSection);
                        echo $contentJson;

                    }
                }
                catch(PDOException $error) {
                    echo "<script>alert(" . $error -> getMessage() . ");</script>";
                }
            }
        }
        
        //remove the movie from watchlist
        
        elseif($ajaxAction == 'removeWatchList') {
            if($ajaxId != false) {
                try {
                    $query = $pdo -> prepare("DELETE FROM watchlist WHERE user_id = :session AND content_id = :ajax");
                    $query -> bindValue(":session", $userSessionId);
                    $query -> bindValue(":ajax", $ajaxId);
                    $query -> execute();
                }
                catch(PDOException $error) {
                    echo $error -> getMessage();
                }
            }
        }
        
        //change the user style, day or night
        
        elseif($ajaxAction == 'userStyle') {
            if($ajaxId == 'day') {
                $styleToSet = 'D';
            }
            elseif($ajaxId == 'night') {
                $styleToSet = 'N';
            }
            try {
                $query = $pdo -> prepare("UPDATE user SET style = :ajax WHERE user_id = :session");
                $query -> bindValue(":session", $userSessionId);
                $query -> bindValue(":ajax", $styleToSet);
                $query -> execute();
            }
            catch(PDOException $error) {
                echo $error -> getMessage();
            }
        }

        //follow user

        elseif($ajaxAction == 'follow') {
            if($ajaxId != false) {
                try {
                    $query = $pdo -> prepare("INSERT INTO follow (user, follow) VALUES (:session, :follow)");
                    $query -> bindValue(":session", $userSessionId);
                    $query -> bindValue(":follow", $ajaxId);

                    if($query -> execute()) {
                        $writeThis = langCode('following');
                        $chageThis = "unfollowUser";
                        
                        $contentArray = array('write' => $writeThis,
                                             'change' => $chageThis);

                        $contentJson = json_encode($contentArray);
                        echo $contentJson;
                    }
                }
                catch(PDOException $error) {
                    echo "<script>alert(" . $error -> getMessage() . ");</script>";
                }
            }
        }

        //unfollow user

        elseif($ajaxAction == 'unfollow') {
            if($ajaxId != false) {
                try {
                    $query = $pdo -> prepare("DELETE FROM follow WHERE user = :session AND follow = :unfollow");
                    $query -> bindValue(":session", $userSessionId);
                    $query -> bindValue(":unfollow", $ajaxId);

                    if($query -> execute()) {
                        $writeThis = langCode('follow');
                        $chageThis = "followUser";

                        $contentArray = array('write' => $writeThis,
                                             'change' => $chageThis);

                        $contentJson = json_encode($contentArray);
                        echo $contentJson;
                    }
                }
                catch(PDOException $error) {
                    echo "<script>alert(" . $error -> getMessage() . ");</script>";
                }
            }
        }

        //Make comment

        elseif($ajaxAction == 'makeComment') {
            if($ajaxId != false) {
                try {
                    $checkComment = $pdo -> prepare("SELECT * FROM comment WHERE content = :content AND user = :user");
                    $checkComment -> bindValue(":content", $ajaxId);
                    $checkComment -> bindValue(":user", $userSessionId);

                    if($checkComment -> execute()) {
                        if($checkComment -> rowCount() == 0) {
                            $makeComment = $pdo -> prepare("INSERT INTO comment (content, user, comment) 
                            VALUES (:content,:user,:comment)");

                            $makeComment -> bindValue(":content", $ajaxId);
                            $makeComment -> bindValue(":user", $userSessionId);
                            $makeComment -> bindValue(":comment", $_POST['comment']);
                            $makeComment -> execute();
                        }
                    }
                }
                catch(PDOException $error) {
                    $error -> getMessage();
                }
            }
        }

        //Edit comment

        elseif($ajaxAction == 'editComment') {
            if($ajaxId != false) {
                
            }
        }

        //Delete comment

        elseif($ajaxAction == 'deleteComment') {
            if($ajaxId != false) {
                try {
                    $checkComment = $pdo -> prepare("DELETE FROM comment WHERE content = :content AND user = :user");
                    $checkComment -> bindValue(":content", $ajaxId);
                    $checkComment -> bindValue(":user", $userSessionId);

                    $checkComment -> execute();
                }
                catch(PDOException $error) {
                    $error -> getMessage();
                }
            }
        }

        //What else

        else {
            header($baseUrl . '404');
        }
    }
?>