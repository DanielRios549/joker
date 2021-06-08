<?php
/* 
 ***************************************************************
 | Copyright (c) 2014-2021 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
	if(!isset($baseCon)) {
		$base = '../../../';
		require $base . '404.php';
	}

	class AdminShow extends Connect {
		public $contentRow;
		public $totalContents;
		public $totalPages;
		public $pageStart;
		public $linkPage;
		public $itemsLimit;
		public $itemsOrder;
		public $itemEdit;
		public $editOpions;
		public $closeChange;
		public $itemRemove;
		public $itemEpisode;
		public $editEpisodeOpions;

		//Get the user
		
		public function content($page, $type, $lang) {
			$pdo = $this -> getConnection();
			global $thisDomain;

			//all manager pages

			if($type == 'manager') {
				$getLimit = (int) isset($_GET['l']) ? $_GET['l'] : 10;
				$getOrder = (int) isset($_GET['o']) ? $_GET['o'] : 1;
				$getPage = (int) isset($_GET['p']) ? $_GET['p'] : 1;
				$getEdit = (int) isset($_GET['edit']) ? $_GET['edit'] : 0;
				$getRemove = (int) isset($_GET['remove']) ? $_GET['remove'] : 0;
				$getEpisode = (int) isset($_GET['ep']) ? $_GET['ep'] : 0;

				$this -> itemEdit = $getEdit;
				$this -> itemRemove = $getRemove;
				$this -> itemEpisode = $getEpisode;
				$positionUrl = strpos($thisDomain, '?');

				//Get the limit items and order, both are in the same form 

				if((($getLimit == '') or ($getOrder == '')) or (($getLimit > 100) or ($getOrder > 4))) {
					$limit = 10;
					$order = 1;
					$this -> linkPage = "?p=";
					$newUrl = substr($thisDomain, 0, $positionUrl);
				}
				elseif(($getLimit == 10) and ($getOrder == 1)) {
					$limit = 10;
					$order = 1;
					$this -> linkPage = "?p=";
					$newUrl = substr($thisDomain, 0, $positionUrl);
				}
				else {
					$limit = $getLimit;
					$order = $getOrder;

					if($page == 'admin_series_manager') {
						$this -> linkPage = "?l=" . $limit . "&o=" . $order . "&p=";
						$newUrl = substr($thisDomain, 0, $positionUrl) . "?l=" . $limit . "&o=" . $order . "&p=" . $getPage;
					}
					else {
						$this -> linkPage = "?l=" . $limit . "&o=" . $order . "&p=";
						$newUrl = substr($thisDomain, 0, $positionUrl) . "?l=" . $limit . "&o=" . $order . "&p=" . $getPage;
					}
				}

				$this -> closeChange = $newUrl;

				//Corret the order to query

				if($order == 1) {
					$orderQuery = "ASC";
					$column = 'id';
				}
				elseif($order == 2) {
					$orderQuery = "DESC";
					$column = 'id';
				}
				elseif($order == 3) {
					$orderQuery = "ASC";
					$column = 'name';
				}
				elseif($order == 4) {
					$orderQuery = "DESC";
					$column = 'name';
				}

				//Get the page number

				if($getPage == '') {
					$start = 1;
				}
				else {
					$start = $getPage;
				}
				
				$pageNumber = ($start - 1) * $limit;

				if($page == 'admin_feedback_manager') {
					if($column == 'id') {
						$columnName = 'email_id';
					}
					elseif($column == 'name') {
						$columnName = 'subject';
					}
					$queryPage = "SELECT * FROM email ORDER BY $columnName $orderQuery LIMIT $pageNumber, $limit";
					$count = "SELECT * FROM email";
				}
				elseif($page == 'admin_users_manager') {
					if($column == 'id') {
						$columnName = 'user_id';
					}
					elseif($column == 'name') {
						$columnName = 'name';
					}
					$queryPage = "SELECT * FROM user ORDER BY $columnName $orderQuery LIMIT $pageNumber, $limit";
					$count = "SELECT * FROM user";
					$queryEdit = "SELECT * FROM user WHERE user_id = $getEdit";
				}
				elseif($page == 'admin_movies_manager') {
					if($column == 'id') {
						$columnName = 'content_id';
					}
					elseif($column == 'name') {
						$columnName = $lang;
					}
					$queryPage = "SELECT * FROM content WHERE type = 'movie' ORDER BY $columnName $orderQuery LIMIT $pageNumber, $limit";
					$count = "SELECT * FROM content WHERE type = 'movie'";
					$queryEdit = "SELECT * FROM content WHERE content_id = $getEdit";
				}
				elseif($page == 'admin_series_manager') {
					if($column == 'id') {
						$columnName = 'content_id';
					}
					elseif($column == 'name') {
						$columnName = $lang;
					}
					$queryPage = "SELECT * FROM content WHERE type = 'serie' ORDER BY $columnName $orderQuery LIMIT $pageNumber, $limit";
					$count = "SELECT * FROM content WHERE type = 'serie'";
					$queryEdit = "SELECT * FROM content WHERE content_id = $getEdit";

					//The episodes are inside Series section

					if($getEpisode >= 1) {
						$episodesQuery = $pdo -> query("SELECT content_episodes.season, content_episodes.* FROM content_episodes WHERE episode_ref = $getEpisode ORDER BY season, episode");

						if($episodesQuery -> execute()) {
							$allContentEpisodes = $episodesQuery -> fetchAll(PDO::FETCH_ASSOC | PDO::FETCH_GROUP);
							$this -> editEpisodeOpions = $allContentEpisodes;
						}
					}
				}
				elseif($page == 'admin_lives_manager') {
					if($column == 'id') {
						$columnName = 'content_id';
					}
					elseif($column == 'name') {
						$columnName = 'producer';
					}
					$queryPage = "SELECT * FROM content WHERE type = 'live' ORDER BY $columnName $orderQuery";
					$count = "SELECT * FROM content WHERE type = 'live'";
					$queryEdit = "SELECT * FROM content WHERE type = 'live' AND content_id = $getEdit";
				}

				//Make the Edit Query

				if($getEdit >= 1) {
					try {
						$edit = $pdo -> query($queryEdit);

						if($edit -> execute()) {
							$options = $edit -> fetch(PDO::FETCH_ASSOC);
							$this -> editOpions = $options;
						}

						//print_r($options);
					}
					catch(PDOException $error) {
						echo $error -> getMessage();
					}
				}

				//Make the query for all manager pages

				try {
					$query = $pdo -> query($queryPage);
					$queryCount = $pdo -> query($count);

					if($query -> execute()) {
						$content = $query -> fetchAll(PDO::FETCH_ASSOC);
					}

					//print_r($content);

					if($queryCount -> execute()) {
						$total = $queryCount -> rowCount();
						$pages = ceil($total / $limit);

						$this -> contentRow = $content;
						$this -> totalContents = $total;
						$this -> totalPages = $pages;

						$this -> itemsLimit = $limit;
						$this -> itemsOrder = $order;
						$this -> pageStart = $start;
					}
				}
				catch(PDOException $error) {
					echo $error -> getMessage();
				}
			}

			//All add pages

			elseif($type == 'add') {
				if($page == 'admin_home') {
					try {
						$query = $pdo -> query("SELECT * FROM email");
					}
					catch(PDOException $error) {
						echo $error -> getMessage();
					}
				}
				elseif($page == 'admin_users_add') {
					try {
						$query = $pdo -> query("SELECT * FROM email");
					}
					catch(PDOException $error) {
						echo $error -> getMessage();
					}
				}
				elseif($page == 'admin_movies_add') {
					try {
						$query = $pdo -> query("SELECT * FROM email");
					}
					catch(PDOException $error) {
						echo $error -> getMessage();
					}
				}
				elseif($page == 'admin_series_add') {
					try {
						$query = $pdo -> query("SELECT * FROM email");
						$queryCount = $pdo -> query("SELECT * FROM email");
					}
					catch(PDOException $error) {
						echo $error -> getMessage();
					}
				}
			}
		}
		public function getTotal($table, $type) {
			$pdo = $this -> getConnection();
			
			if($type == false) {
				$query = "SELECT * FROM $table";
			}
			else {
				$query = "SELECT * FROM $table WHERE type = '$type'";
			}

			$totalQuery = $pdo -> query($query);
			
			if($totalQuery -> execute()) {
				$total = $totalQuery -> rowCount();
				$this -> totalContents = $total;
			}
		}
	}
?>