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

	class LogOff extends Connect {
		public $logOffUser;

		public function disconnect($page, $url, $userSession, $userRestore) {
			$pdo = $this -> getConnection();

			if($page != 'logoff') {
				try {
					$userQuery = $pdo -> prepare("SELECT * FROM user WHERE user_id = :session AND active = 'no'");
					$userQuery -> bindValue(":session", $userSession);

					if($userQuery -> execute()) {
						$userVerify = $userQuery -> rowCount();
						//$userInfo = $userQuery -> fetch(PDO::FETCH_ASSOC);

						if($userVerify == 1) {
							//header("Location:" . $url);
							$this -> logOffUser = true;
						}
					}
				}
				catch(PDOException $error) {
					echo $error -> getMessage();
				}
			}
			elseif($page == 'logoff') {
				$rememberCookie = isset($_COOKIE['rememberLogin']) ? $_COOKIE['rememberLogin'] : false;
				$rememberToken = sha1($rememberCookie . 'jndkdlglor85784y33bfd7374jgk049jndeu3yrw97wq9389');

				$unSetLogin = $pdo -> prepare("DELETE FROM user_restore WHERE location = :loc");
				$unSetLogin -> bindValue(":loc", $rememberToken);

				if($unSetLogin -> execute()) {
					$this -> logOffUser = true;
				}
			}
		}
	}
?>
