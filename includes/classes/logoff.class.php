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
	
	class LogOff extends Connect {
		public $logOffUser;
		
		public function disconnect($page, $base, $userSession, $userRestore) {
			$pdo = $this -> getConnection();

			if($page != 'logoff') {
				try{
					$userQuery = $pdo -> prepare("SELECT * FROM user WHERE user_id = :session AND active = 'no'");
					$userQuery -> bindValue(":session", $userSession);
					
					if($userQuery -> execute()) {
						$userVerify = $userQuery -> rowCount();
						$userInfo = $userQuery -> fetch(PDO::FETCH_ASSOC);
						
						if($userVerify == 1) {
							header("Location:" . $base . langCode('logoff_link'));
							$this -> logOffUser = true;
						}
					}
				}
				catch(PDOException $error) {
					echo $error -> getMessage();
				}
			}
			elseif($page == 'logoff') {
				$unSetLogin = $pdo -> prepare("DELETE FROM user_restore WHERE location = :loc");
				$unSetLogin -> bindValue(":loc", $userRestore);

				if($unSetLogin -> execute()) {
					$this -> logOffUser = true;
				}
			}
		}
	}
?>