<?php
    if(!empty($_GET['name'])) {
        if($loginCheck == true) {
            $song_name = preg_replace( '#[^-\w]#', '', $_GET['name'] );
            $song_file = "{$_SERVER['DOCUMENT_ROOT']}/members/files/{$song_name}.mp3";
            if( file_exists($song_file)) {
                header('Cache-Control: public');
                header('Content-Description: File Transfer' );
                header("Content-Disposition: attachment; filename={$song_file}");
                header('Content-Type: application/mp3');
                header('Content-Transfer-Encoding: binary');
                readfile($song_file);
                exit;
            }
        }
    }
    die("ERROR: invalid song or you don't have permissions to download it.");
?>