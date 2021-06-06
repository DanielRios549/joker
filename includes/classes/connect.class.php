<?php
/* 
 ***************************************************************
 | Copyright (c) 2014-2021 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
	if(!isset($baseCon)) {
		require '../../_redirect.php';
		header("Location:" . $base . "404");
	}
	
	class Connect {
		private $name;
		private $connection;
		private $config;
		
		public function __construct() {
			$name = DB_NAME;
			$user = DB_USER;
			$pass = DB_PASSWORD;
			$host = DB_HOST;
			$charset = DB_CHARSET;
			$config = 'config';

			try {
				$selectDb = "mysql:host=$host;dbname=$name";
				$con = new PDO($selectDb, $user, $pass);
				$con -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				$con -> exec("SET CHARACTER SET $charset");

				$this -> connection = $con;
				$this -> config = $config;
				$this -> name = $name;
				
				//print_r($con);
			}
			catch(PDOException $error) {
				header("Location:" . "install");
			}
		}
		public function getConnection() {
			return $this -> connection;
		}
		public function getConfigTable() {
			return $this -> config;
		}
		public function getDatabase() {
			return $this -> name;
		}
	}
?>
