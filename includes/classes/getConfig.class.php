<?php
/* 
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
	if(!isset($baseCon)) {
		require '../../_redirect.php';
		header("Location:" . $base . "404");
	}
	
	class GetConfig extends Connect {
		public $selectValue;
		
		public function configQuery($config) {
			$pdo = $this -> getConnection();
			
			try {
				$setConfig = $pdo -> prepare("SELECT name, value FROM config WHERE name = :config");
				$setConfig -> bindValue(":config", $config, PDO::PARAM_STR);
				
				if($setConfig -> execute()) {
					$selectArray = $setConfig -> fetch(PDO::FETCH_ASSOC);
					$selectValue = $selectArray['value'];
				}
				
				return $selectValue;
			}
			catch(PDOException $error) {
				echo $error -> getMessage();
			}
		}
	}
?>