<?php
/* 
 ***************************************************************
 | Copyright (c) 2014-2021 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
     if(!isset($baseCon)) {
		$base = '../../';
		require $base . '404.php';
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