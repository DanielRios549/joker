<?php
/*
 ***************************************************************
 | Copyright (c) 2015-2021 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
	define ('THIS_PAGE' , 'install');
	
	require '../includes/config.php';

	require 'lang/lang_config.php';

	require 'class/install.class.php';
	
	require 'layout/header.html';
	
	require 'layout/install.html';
	
	require 'layout/footer.html';
?>