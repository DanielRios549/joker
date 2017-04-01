<?php
/* 
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
    if(!isset($baseCon)) {
		require '../_redirect.php';
		header("Location:" . $base . "404");
	}
     
     function continueWatching($id) {
          global $continues;

          if(array_key_exists($id, $continues)) {
               return true;
          }
          else {
               return false;
          }
     }
?>