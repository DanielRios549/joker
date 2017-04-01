<?php
/* 
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author : Daniel Rios.
 ***************************************************************
*/
     if(!isset($baseUrl)) {
		require '../_redirect.php';
		header("Location:" .  $base . "404");
	}
     try {
          $continueQuery = $pdo -> prepare("SELECT content, type, continueContent, percent FROM watched WHERE user = :user");
          $continueQuery -> bindValue(":user", $userId);

          if($continueQuery -> execute()) {
               $continues = $continueQuery -> fetchAll(PDO::FETCH_ASSOC | PDO::FETCH_GROUP);
          }
     }
     catch(PDOException $error) {
          echo $error -> getMessage();
     }
     //print_r($continues);
?>