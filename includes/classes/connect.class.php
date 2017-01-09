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
		private $host;
		private $user;
		private $pass;
		private $name;
		private $type;
		private $connection;
		
		public function __construct() {
			/*
			$dbHost = 'mysql.hostinger.com.br';
			$dbUser = 'u886954183_atomo';
			$dbPassword = '93982984';
			$dbName = 'u886954183_movie';
			$dbType = 'mysql';
			*/
			$dbHost = '127.0.0.1';
			$dbUser = 'root';
			$dbPassword = 'cftwy';
			$dbName = 'joker';
			$dbType = 'mysql';

			$this -> host = $dbHost;
			$this -> user = $dbUser;
			$this -> pass = $dbPassword;
			$this -> name = $dbName;
			$this -> type = $dbType;

			$this -> connectionPDO($this -> host, $this -> user, $this -> pass, $this -> name, $this -> type);
		}
		private function connectionPDO($host, $user, $pass, $name, $type) {
			try {
				$selectDb = $type . ":host=" . $host . ";dbname=" . $name;
				$con = new PDO($selectDb, $user, $pass);
				$con -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				$con -> exec("SET CHARACTER SET utf8");
				
				$this -> connection = $con;
				
				//var_dump($con);
			}
			catch(PDOException $error) {
				echo 'error';
				echo "<html><head><meta charset='UTF-8'/><style>.dbError{font:2em Calibri, sans-serif;color:#464646}.dbError .dbErrorSpan{font:2em CalibriItatic, sans-serif;color:#464646}</style></head><body><p class='dbError'>"
				. $error -> getMessage() . "</p><br/><p class='dbError'>DB ERROR: Não foi possível conectar com o servidor no host<span class='dbErrorSpan'>"
				. $host . "</span></p></body><html>";
			}
		}
		
		public function getConnection() {
			return $this -> connection;
		}
		public function getDatabase() {
			return $this -> name;
		}
	}
?>