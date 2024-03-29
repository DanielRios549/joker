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
	
	class AdminCheck extends Connect {
		public $adminUser;
		
		public function check($login, $userSession) {
			$pdo = $this -> getConnection();

			if($login == false) {
				$admin = false;
			}
			elseif($login == true) {
				try {
					$userQuery = $pdo -> prepare("SELECT * FROM user WHERE user_id = :session");
					$userQuery -> bindValue(":session", $userSession);
					
					if($userQuery -> execute()) {
						$fetchUser = $userQuery -> fetch(PDO::FETCH_ASSOC);
						$userCategory = $fetchUser['category'];
						
						if($userCategory == 'user') {
							$admin = false;
						}
						elseif($userCategory == 'admin') {
							$admin = true;
						}
						else {
							$admin = false;
						}
					}
				}
				catch(PDOException $error) {
					echo $error -> getMessage();
				}
			}
			$this -> adminUser = $admin;
		}
	}
?>