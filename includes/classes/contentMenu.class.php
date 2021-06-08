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
	
	class ContentMenu extends Connect {
		public $contentHide;
		
		public function showMenu($category) {
			$pdo = $this -> getConnection();

			//$pdo = parent::connection;

			if($category !== false) {
				$query = "SELECT * FROM content WHERE category = :category AND active = 'yes' ORDER BY content_id DESC LIMIT 20";
				
				try {
					$content = $pdo -> prepare($query);
					$content -> bindValue(":category", $category, PDO::PARAM_STR);
					$content -> execute();
				}
				catch(PDOException $error) {
					echo $error -> getMessage();
				}
			}
			
			if($content -> rowCount() == 0){
				$hide = true;
			}
			else {
				$hide = false;
			}
			
			$this -> contentHide = $hide;
		}
	}
?>