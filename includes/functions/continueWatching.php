<?php
/* 
 ***************************************************************
 | Copyright (c) 2014-2021 Atomo.com. All rights reserved.
 | @ Author : Daniel Rios.
 ***************************************************************
*/
     if(!isset($baseCon)) {
		$base = '../../';
		require $base . '404.php';
	}
     
     function continueWatching($id) {
          global $pdo, $userId, $continues;

          try {
               $continueQuery = $pdo -> prepare("SELECT content, type, content_episode, percent FROM watched WHERE user = :user");
               $continueQuery -> bindValue(":user", $userId);
     
               if($continueQuery -> execute()) {
                    $continues = $continueQuery -> fetchAll(PDO::FETCH_ASSOC | PDO::FETCH_GROUP);
               }
          }
          catch(PDOException $error) {
               echo $error -> getMessage();
          }
          //print_r($continues);

          if(array_key_exists($id, $continues)) {
               return true;
          }
          else {
               return false;
          }
     }
?>