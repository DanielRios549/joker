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
	
	class LoginCheck extends Connect {
		public $loginUser;
		public $loginUserRestore;
		
		public function check($userSession, $userRestore) {
			$pdo = $this -> getConnection();

			if($userSession != false) {
				try {
					$userQuery = $pdo -> prepare("SELECT * FROM user WHERE user_id = :session AND active = 'yes'");
					$userQuery -> bindValue(":session", $userSession);
					$userQuery -> execute();
					
					if($userQuery -> rowCount() !== 1) {
						$user = false;
					}
					elseif($userQuery -> rowCount() == 1) {
						$user = true;
					}
					$this -> loginUser = $user;
				}
				catch(PDOException $error) {
					echo $error -> getMessage();
				}
			}
			elseif($userRestore != false) {
				$rememberCookie = isset($_COOKIE['rememberLogin']) ? $_COOKIE['rememberLogin'] : false;
				$rememberToken = sha1($rememberCookie . 'jndkdlglor85784y33bfd7374jgk049jndeu3yrw97wq9389');
				
				if($rememberCookie == false) {
					$this -> loginUserRestore = false;
				}
				elseif($rememberCookie != $userRestore) {
					$this -> loginUserRestore = false;
				}
				else {
					 try {
						$verifyToken = $pdo -> prepare("SELECT * FROM user_restore WHERE location = :location");
						$verifyToken -> bindValue(":location", $rememberToken);
						$verifyToken -> execute();
						
						if($verifyToken -> rowCount() != 1) {
							$userRestore = false;
						}
						elseif($verifyToken -> rowCount() == 1) {
							$userRestore = true;
						}
						$this -> loginUserRestore = $userRestore;
					}

					catch(PDOException $error) {
						echo $error -> getMessage();
					}
				}
			}
		}
	}
?>