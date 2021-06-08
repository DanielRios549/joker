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

    class VerifyFollow extends Connect implements Verify {
        private $chech;

        public function verify($follow, $user) {
            $pdo = $this -> getConnection();
			
			//General Pages
			
			if(($follow != false) and ($user != false)) {
				try {
					$query = $pdo -> prepare("SELECT * FROM follow WHERE follow = :follow AND user = :user");
					$query -> bindValue(":follow", $follow);
					$query -> bindValue(":user", $user);
					$query -> execute();
				}
				catch(PDOException $error) {
					echo $error -> getMessage();
				}
				
				if($query -> rowCount() == 1) {
					$followCheck = "unfollow";
				}
				else {
					$followCheck = "follow";
				}
				
				$this -> check = $followCheck;
			}
        }
        public function getCheck() {
            return $this -> check;
        }
    }
?>