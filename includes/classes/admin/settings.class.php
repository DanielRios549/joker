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

		public function getConfigSet() {
			$pdo = $this -> getConnection();
			//global $thisUrl;

			$getValues = $pdo -> query("SELECT * FROM config");
			
			if($getValues -> execute()) {
				$results = $getValues -> fetchAll(PDO::FETCH_ASSOC);
				return $results;
			}
		}
	}
?>