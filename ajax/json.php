<?php
/* 
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
    define ('THIS_PAGE' , 'json');
    
    define ('ADMIN_PAGE' , 'both');
    
    require '../includes/config.php';
    
    $jsonAction = isset($_GET['jsonAction']) ? $_GET['jsonAction'] : false;
    $jsonId = isset($_GET['jsonId']) ? $_GET['jsonId'] : false;
    $userSessionId = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : false;
    
    if(($jsonAction == false) or  ($jsonId == false)) {
        header("Location:" . $baseUrl);
    }
    elseif(($jsonAction != false) and ($jsonId != false)) {
        if($jsonAction == 'pageInfo') {
            if($jsonId == 'index') {
                if($userSessionId != false) {
                    $thisPage = 'home_title';
                }
                else {
                    $thisPage = 'index_title';
                }
            }
            $pageTitle = langCode($thisPage);
                
            $pageArray = array("title" => $pageTitle,
                               "metaTag" => 'test');
            
            $pageJson = json_encode($pageArray);
            echo $pageJson;
        }
    }
?>