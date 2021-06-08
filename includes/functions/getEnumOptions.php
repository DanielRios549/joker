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

    function getEnum($t, $c) {
        global $pdo;
        global $connection;

        $database = $connection -> getDatabase();
		$table = $t;
		$column = $c;

		$resultTable = $pdo -> prepare("SELECT COLUMN_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = :database AND TABLE_NAME = :table AND COLUMN_NAME = :column");
        $resultTable -> bindValue(":database", $database);
        $resultTable -> bindValue(":table", $table);
        $resultTable -> bindValue(":column", $column);

        if($resultTable -> execute()) {
            $row = $resultTable -> fetch(PDO::FETCH_ASSOC);
            $enumList = explode(",", str_replace("'", "", substr($row['COLUMN_TYPE'], 5, (strlen($row['COLUMN_TYPE'])-6))));

            return $enumList;
        }
    }
?>