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

	class ShowContentClass extends Connect {
		public $contentInfo;
		public $contentRow;
		public $contentTotal;
		public $categoryTitle;
		public $contentHide;
		public $currentCategory;
		public $contentName;
		
		public function showContent($category, $date, $querySearch, $page, $user) {
			$pdo = $this -> getConnection();
			//General Pages
			
			if($querySearch == false) {
				
				//Index feature
				
				if($category == 'feature') {
					$query = $pdo -> query("SELECT * FROM content WHERE feature = 'yes' AND active = 'yes'");
				}
				
				//index watchlist
				
				elseif($category == 'watchlist') {
					$query = $pdo -> prepare("SELECT c.content_id, c.type FROM watchlist AS w INNER JOIN content AS c ON w.content_id = c.content_id WHERE w.user_id = :user  AND c.active = 'yes' ORDER BY w.wish_id DESC");
					$query -> bindValue(":user", $user);
				}
				
				//Index recently added
				
				elseif($date != false) {
					$query = $pdo -> query("SELECT * FROM content WHERE active = 'yes' ORDER BY date_add DESC LIMIT 20");
				}
				
				//Index categories
				
				elseif(($category != false) and ($page == false)) {
					$query = $pdo -> prepare("SELECT * FROM content WHERE category = :category AND active = 'yes' ORDER BY content_id DESC LIMIT 20");
					$query -> bindValue(":category", $category);
				}
				
				//Category pages
				
				elseif(($category !== false) and ($page == 'category')) {
                    $categoryId = categoryName($_GET['c']);
					$category = langCode($categoryId);

					$query = $pdo -> prepare("SELECT * FROM content WHERE category = :id AND active = 'yes' ORDER BY content_id");
					$query -> bindValue(":id", $categoryId);
				}
				try {
					$content = $query -> execute();
					$row = $query -> fetchAll(PDO::FETCH_ASSOC);
					$total = $query -> rowCount();
					//print_r($row);
				}
				catch(PDOException $error) {
					echo $error -> getMessage();
				}
				
				//define if the context exist or not
				
				if($total == 0) {
					$hide = true;
				}
				else {
					$hide = false;
				}
				
				$this -> contentInfo = $content;
				$this -> contentRow = $row;
				$this -> contentTotal = $total;
				$this -> contentHide = $hide;
				$this -> categoryTitle = $category;
			}
			
			//Search Page
			
			elseif($querySearch !== false) {
				try {
					if($category == 'name') {
						$query = $pdo -> query("SELECT content_id, type FROM content WHERE en_US LIKE '%" . $querySearch . "%' OR pt_BR LIKE '%" . $querySearch . "%'  OR producer LIKE '%" . $querySearch . "%' OR director LIKE '%" . $querySearch . "%' AND active = 'yes' ORDER BY date_add DESC");
					}
					elseif($category == 'producer') {
						$query = $pdo -> query("SELECT producer, director FROM content WHERE producer LIKE '%" . $querySearch . "%' OR director LIKE '%" . $querySearch . "%' AND active = 'yes' ORDER BY date_add DESC");
					}
					
					$content = $query -> execute();
					$row = $query -> fetchAll(PDO::FETCH_ASSOC);
					$total = $query -> rowCount();
				}
				catch(PDOException $error) {
					echo $error -> getMessage();
				}

				//define if the context exist or not
				
				if($total == 0){
					$hide = true;
				}
				else {
					$hide = false;
				}
				
				$this -> contentInfo = $content;
				$this -> contentRow = $row;
				$this -> contentTotal = $total;
				$this -> contentHide = $hide;
			}
		}
	}
?>