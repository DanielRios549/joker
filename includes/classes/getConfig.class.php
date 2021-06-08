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
	
	class GetConfig extends Connect {
		public $selectValue;

		public function configQuery($config) {
			$pdo = $this -> getConnection();
			$table = $this -> getConfigTable();
			
			try {
				$setConfig = $pdo -> prepare("SELECT name, value FROM $table WHERE name = :config");
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
