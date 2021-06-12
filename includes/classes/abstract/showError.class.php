<?php
/* 
 ***************************************************************
 | Copyright (c) 2021-2021 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
    abstract class ShowError {
        public static function notFound($method = 'query') {
            define ('ERROR_PAGE', '404');
            global $baseUrl, $imageDir, $styleDir;
            $baseDir = __DIR__ . '/../../../';
            
            if($method == 'admin') {
                global $adminCheck, $loginCheck, $thisDomain, $titleFile, $allCategories, $contentDir, $firstName;
                require $baseDir . 'layout/globalHead.html';
                require $baseDir . 'layout/header.html';
                require $baseDir . 'layout/404.html';
                require $baseDir . 'layout/footer.html';
            }
            elseif($method == 'query') {
                require $baseDir . 'layout/404.html';
            }
        }
    }

    //The error page is the only that needs the path access verification in the end
    
    if(!isset($baseCon)) {
		$base = '../../../';
		require $base . '404.php';
    }
?>