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
    
    //Get Name

    function categoryName($id) {

        if($id == 16585) {
            $category = 'animation';
        }
        elseif($id == 65325) {
            $category = 'science';
        }
        elseif($id == 25458) {
            $category = 'action';
        }
        elseif($id == 28958) {
            $category = 'suspense';
        }
        elseif($id == 98874) {
            $category = 'terror';
        }
        elseif($id == 65632) {
            $category = 'drama';
        }
        elseif($id == 57495) {
            $category = 'fantasy';
        }
        elseif($id == 98523) {
            $category = 'spirit';
        }
        elseif($id == 45698) {
            $category = 'music';
        }
        elseif($id == 25569) {
            $category = 'comedy';
        }
        elseif($id == 65326) {
            $category = 'sport';
        }
        elseif($id == 23659) {
            $category = 'romance';
        }
        elseif($id == 52526) {
            $category = 'police';
        }
        elseif($id == 75632) {
            $category = 'war';
        }
        elseif($id == 45656) {
            $category = 'documentary';
        }
        elseif($id == 32358) {
            $category = 'independent';
        }
        
        return $category;
    }

    //Get Id
    
    function categoryId($name) {

        if($name == 'animation') {
            $category = 16585;
        }
        elseif($name == 'science') {
            $category = 65325;
        }
        elseif($name == 'action') {
            $category = 25458;
        }
        elseif($name == 'suspense') {
            $category = 28958;
        }
        elseif($name == 'terror') {
            $category = 98874;
        }
        elseif($name == 'drama') {
            $category = 65632;
        }
        elseif($name == 'fantasy') {
            $category = 57495;
        }
        elseif($name == 'spirit') {
            $category = 98523;
        }
        elseif($name == 'music') {
            $category = 45698;
        }
        elseif($name == 'comedy') {
            $category = 25569;
        }
        elseif($name == 'sport') {
            $category = 65326;
        }
        elseif($name == 'romance') {
            $category = 23659;
        }
        elseif($name == 'police') {
            $category = 52526;
        }
        elseif($name == 'war') {
            $category = 75632;
        }
        elseif($name == 'documentary') {
            $category = 45656;
        }
        elseif($name == 'independent') {
            $category = 32358;
        }
        
        return $category;
    }
?>