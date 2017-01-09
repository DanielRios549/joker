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
    
    class Lang extends Connect {
        
        public function langSelect($setLang) {
            $pdo = $this -> getConnection();
            
            try {
                $query = $pdo -> query("SELECT name, $setLang FROM language ORDER BY language_id ASC");
                
                if($query -> execute()) {
                    $row = $query -> fetchAll(PDO::FETCH_ASSOC | PDO::FETCH_UNIQUE);
                    
                    //print_r ($row);
                }
            }
            catch(PDOException $error) {
                echo $error -> getMessage();
            }
            return $row;
        }
    }
?>