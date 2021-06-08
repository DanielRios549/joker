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
    
    if((isset($_GET['active'])) and (isset($_GET['activeId']))) {
        $userToActive = $_GET['active'];
        $userToActiveCrypt = $_GET['activeId'];
        
        if($userToActiveCrypt !== sha1($userToActive . 'mifirofrpo95ui8u74ht7giti9t86856ntntg')) {
            header("Location:" .  $baseUrl . "404");
        }
        else {
            try {
                $query = $pdo -> prepare("UPDATE user SET active = 'yes' WHERE email = :email");
                $query -> bindValue(":email", $userToActive);
                
                if($query -> execute()) {
                    header("Location:" .  $baseUrl . getLink('login', false) . "?n=1");
                }
                else {
                    header("Location:" .  $baseUrl . getLink('login', false) . "?n=2");
                }
            }
            catch(PDOException $error) {
                echo $error -> getMessage();
            }
        }
    }
?>