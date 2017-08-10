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

    class SetConfig extends Connect {
		//Get the current values

		public function getConfigSet($type) {
			$pdo = $this -> getConnection();
			$table = $this -> getConfigTable();
			//global $thisUrl;

			$getValues = $pdo -> prepare("SELECT * FROM $table WHERE type = :type");
			$getValues -> bindValue(':type', $type);
			
			if($getValues -> execute()) {
				$results = $getValues -> fetchAll(PDO::FETCH_ASSOC);
				return $results;
			}
		}
		
		public function getPlayers($url) {
			$path = $url . 'player/';
			$dirs = array();
			$dir = dir($path);

			while (false !== ($entry = $dir -> read())) {
				if ($entry != '.' && $entry != '..') {
					if (is_dir($path . '/' .$entry)) {
							$dirs[] = array('name' => $entry);
					}
				}
			}

			return $dirs;
		}
	}
?>