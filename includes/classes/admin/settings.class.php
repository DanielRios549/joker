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

    class Settings extends Connect {
		//Get the current values

		public function getConfig($type) {
			$pdo = $this -> getConnection();
			$table = $this -> getConfigTable();
			//global $thisDomain;

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

		public function setConfig($data) {
			$pdo = $this -> getConnection();
			$table = $this -> getConfigTable();
			$configKeys = array_keys($data);
			//print_r($configKeys);

			foreach ($configKeys as $key) {
				$setConfig = $pdo -> prepare("UPDATE $table set value = :value WHERE name = :column");
				$setConfig -> bindValue(":value", $data[$key]);
				$setConfig -> bindValue(":column", $key);
				$setConfig -> execute();
			}
			
			echo alert('Atualizado');
			echo script('history.go(-1)');
		}
	}
?>
