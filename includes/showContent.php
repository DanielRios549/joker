<?php
/* 
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
	if(!isset($baseUrl)) {
		require '../_redirect.php';
		header("Location:" . $base . "404");
	}
	
	//Content for all pages

	$contentClass = new ShowContentClass();
	$contentPagesLink = $baseUrl . langCode('title_link') . '?id=';

	//Content for index
	
	if(THIS_PAGE == 'index') {
		$contentClass -> showContent($contentArray['contentCategory'], $contentArray['dateAdd'], $contentArray['querySearch'], '', $_SESSION['user_id']);
		
		$showContent = $contentClass -> contentInfo;
		$addRow = $contentClass -> contentRow;
		$showContentName = $contentClass -> contentName;
		$totalSearch = $contentClass -> contentTotal;

		//print_r($addRow);
	}
	
	//Content for search
	
	if(THIS_PAGE == 'search') {
		if(!isset($searchQuery)) {
			header("Location:" . $baseUrl);
		}
		elseif(isset($searchQuery)) {
			if($searchQuery == '') {
				header("Location:" . $baseUrl);
			}
			else {
				$contentClass -> showContent($contentArray['contentCategory'], $contentArray['dateAdd'], $contentArray['querySearch'],  '', $_SESSION['user_id']);
				
				$showContent = $contentClass -> contentInfo;
				$addRow = $contentClass -> contentRow;
				$totalSearch = $contentClass -> contentTotal;

				//print_r($addRow);
			}
		}
	}
	
	//Content for category
	
	if(THIS_PAGE == 'category') {
		if(!isset($categoryQuery)) {
			header("Location:" . $baseUrl);
		}
		elseif(isset($categoryQuery)) {
			if($categoryQuery == '') {
				header("Location:" . $baseUrl);
			}
			else {
				$contentClass -> showContent($contentArray['contentCategory'], $contentArray['dateAdd'], $contentArray['querySearch'], $contentArray['page'], $_SESSION['user_id']);
				
				$showContent = $contentClass -> contentInfo;
				$addRow = $contentClass -> contentRow;
				$totalSearch = $contentClass -> contentTotal;
				$categoryName = $contentClass -> categoryTitle;

				//print_r($addRow);

				if($totalSearch <= 1) {
					$movieFoundText = langCode('admin_found');
					$movieText = lcfirst(langCode('movie'));
				}
				else {
					$movieFoundText = langCode('admin_found_2');
					$movieText = lcfirst(langCode('movies'));
				}
			}
		}
	}
?>