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
	
	class Connect {
		private $name;
		private $connection;
		private $config;
		
		public function __construct() {
			$url = 	$_SERVER['HTTP_HOST'];

			if(($url == 'localhost') or ($url == '127.0.0.1')) {
				$name = 'joker';
				$user = 'root';
				$pass = 'cftwy549';
				$host = '127.0.0.1';
				$config = 'config_dev';
			}
			else {
				$name = 'joker';
				$user = 'root';
				$pass = 'atomoinc2014';
				$host = 'localhost';
				$config = 'config_prod';
			}

			try {
				$selectDb = "mysql:host=" . $host . ";dbname=" . $name;
				$con = new PDO($selectDb, $user, $pass);
				$con -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				$con -> exec("SET CHARACTER SET utf8");

				$this -> connection = $con;
				$this -> config = $config;
				$this -> name = $name;
				
				//print_r($con);
			}
			catch(PDOException $error) {
				//echo 'PDO Error';
				echo "<html><head><meta charset='UTF-8'/><style>.dbError{font:2em Calibri, sans-serif;color:#464646}.dbError .dbErrorSpan{font:2em CalibriItatic, sans-serif;color:#464646}</style></head><body><p class='dbError'>"
				. $error -> getMessage() . "</p><br/><p class='dbError'>DB ERROR: Não foi possível conectar com o servidor no host<span class='dbErrorSpan'>"
				. $host . "</span></p></body><html>";
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
