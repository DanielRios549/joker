<?php
/* 
 ***************************************************************
 | Copyright (c) 2014-2021 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
	if(!isset($baseCon)) {
		$base = '../../../';
		require $base . '404.php';
	}

     abstract class dash {
          private $dashXml;
          
          public function start() {
               $this -> dashXml .= '<?xml version="1.0" encoding="UTF-8" ?>';
          }
          
          public function addMdp($type, $startTime, $duration) {
               $this -> dashXml .= 'teste';
          }
     }
?>