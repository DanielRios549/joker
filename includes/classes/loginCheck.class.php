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
	
	class LoginCheck extends Connect {
		public $loginUser;
		public $loginUserRestore;
		
		public function check($userSession, $userRestore) {
			$pdo = $this -> getConnection();

			if($userSession != '') {
				try {
					$userQuery = $pdo -> prepare("SELECT * FROM user WHERE user_id = :session AND active = 'yes'");
					$userQuery -> bindValue(":session", $userSession);
					
					if($userQuery -> execute()) {
						if($userQuery -> rowCount() !== 1) {
							$user = false;
						}
						elseif($userQuery -> rowCount() == 1) {
							$user = true;
						}
						$this -> loginUser = $user;
					}
				}
				catch(PDOException $error) {
					echo $error -> getMessage();
				}
			}
			elseif($userRestore != '') {
				try {
					$userQuery = $pdo -> prepare("SELECT * FROM user_restore WHERE location = :session");
					$userQuery -> bindValue(":session", $userRestore);
					
					if($userQuery -> execute()) {
						if($userQuery -> rowCount() !== 1) {
							$userRestore = false;
						}
						elseif($userQuery -> rowCount() == 1) {
							$userRestore = true;
						}
						$this -> loginUserRestore = $userRestore;
					}
				}
				catch(PDOException $error) {
					echo $error -> getMessage();
				}
			}
		}
	}
?>