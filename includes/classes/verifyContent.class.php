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

	class VerifyContentHome extends Connect implements Verify {
		private $check;
		
		public function verify($contentId, $user) {
			$pdo = $this -> getConnection();
			
			//General Pages
			
			if(($contentId != false) and ($user != false)) {
				try {
					$query = $pdo -> prepare("SELECT * FROM watchlist WHERE content = :id AND user = :user");
					$query -> bindValue(":id", $contentId);
					$query -> bindValue(":user", $user);
					$query -> execute();
				}
				catch(PDOException $error) {
					echo $error -> getMessage();
				}
				
				if($query -> rowCount() == 1) {
					$watchCheck = "removeWatchList";
				}
				else {
					$watchCheck = "addWatchList";
				}
				
				$this -> check = $watchCheck;
			}
		}
		public function getCheck() {
			return $this -> check;
		}
	}
?>