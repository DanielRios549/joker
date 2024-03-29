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
	
	class PremiumCheck extends Connect {
		public $premiumUser;
		
		public function check($login, $userSession) {
			$pdo = $this -> getConnection();

			if($login == false) {
				$premium = false;
			}
			elseif($login == true) {
				try {
					$userQuery = $pdo -> prepare("SELECT * FROM user WHERE user_id = :session");
					$userQuery -> bindValue(":session", $userSession);
					
					if($userQuery -> execute()) {
						$fetchUser = $userQuery -> fetch(PDO::FETCH_ASSOC);
						$userCategory = $fetchUser['premium'];
						
						if($userCategory == 'no') {
							$premium = false;
						}
						elseif($userCategory == 'yes') {
							$premium = true;
						}
						else {
							$premium = false;
						}
					}
				}
				catch(PDOException $error) {
					echo $error -> getMessage();
				}
			}
			$this -> premiumUser = $premium;
		}
	}
?>