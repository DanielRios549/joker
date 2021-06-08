<?php
/* 
 ***************************************************************
 | Copyright (c) 2015-2021 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
    if(!isset($baseCon)) {
        header("Location:" . "404");
    }

    class Install {
        private $subFolder;
        private $create;
        private $insert;

        public function __construct($user, $pass, $host, $name, $subFolder) {
            $this -> subFolder = $subFolder;
            try {
                $pdo = new PDO("mysql:host=$host", $user, $pass);
                $this -> create = $pdo;
                $this -> insert = $pdo;
                $query = $this -> create -> prepare("CREATE DATABASE IF NOT EXISTS $name COLLATE=utf8_general_ci");

                if ($query -> execute()) {
                    $useDB = $this -> create -> prepare("USE $name");

                    if ($useDB -> execute()) {
                        $this -> tables();
                    }
                }
            }
            catch (PDOException $error) {
                echo $error -> getMessage();
            }
        }

        private function tables() {
            echo "Adding Tables...";

            try {
                $tables = $this -> create -> exec("CREATE TABLE IF NOT EXISTS config (
                        config_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
                        type enum('text','bool','select') DEFAULT NULL,
                        name varchar(5000) NOT NULL,
                        value varchar(5000) NOT NULL
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
                    
                    CREATE TABLE IF NOT EXISTS config_admin (
                        config_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
                        user int(11) NOT NULL,
                        name varchar(100) NOT NULL,
                        value varchar(100) NOT NULL
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
                                
                    CREATE TABLE IF NOT EXISTS user (
                        user_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
                        active enum('no','yes') NOT NULL DEFAULT 'no',
                        name varchar(60) NOT NULL,
                        username varchar(60) NOT NULL,
                        email varchar(60) NOT NULL,
                        password varchar(40) NOT NULL,
                        category enum('user','admin') NOT NULL DEFAULT 'user',
                        premium enum('no','yes') NOT NULL DEFAULT 'no',
                        lang enum('pt_BR','en_US') NOT NULL DEFAULT 'en_US'
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

                    CREATE TABLE IF NOT EXISTS content (
                        content_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
                        active enum('no','yes') NOT NULL DEFAULT 'no',
                        producer varchar(200) NOT NULL,
                        director varchar(100) NOT NULL,
                        category enum('animation','science','action','suspense','terror','drama','fantasy','spirit','music','comedy','sport','romance','police','war','documentary','indenpendent') DEFAULT NULL,
                        type enum('movie','serie','live') NOT NULL,
                        feature enum('no','yes') NOT NULL DEFAULT 'no',
                        duration varchar(13) NOT NULL,
                        age enum('L','10','12','14','16','18') NOT NULL,
                        date varchar(10) NOT NULL,
                        date_add date NOT NULL,
                        en_US varchar(5000) NOT NULL,
                        pt_BR varchar(5000) NOT NULL,
                        link varchar(10) DEFAULT NULL
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

                    CREATE TABLE IF NOT EXISTS content_episodes (
                        episode_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
                        active enum('yes','no') NOT NULL DEFAULT 'yes',
                        episode_ref int(11) NOT NULL,
                        season int(3) NOT NULL,
                        episode int(3) NOT NULL,
                        en_US varchar(5000) NOT NULL,
                        pt_BR varchar(5000) NOT NULL
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

                    CREATE TABLE IF NOT EXISTS comment (
                        comment_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
                        content int(11) NOT NULL,
                        user int(11) NOT NULL,
                        comment varchar(1000) NOT NULL
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

                    CREATE TABLE IF NOT EXISTS comment_reply (
                        reply_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
                        comment int(11) NOT NULL,
                        user int(11) NOT NULL,
                        reply varchar(1000) NOT NULL
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
                    
                    CREATE TABLE IF NOT EXISTS follow (
                        follow_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
                        user int(11) NOT NULL,
                        follow int(11) NOT NULL
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

                    CREATE TABLE IF NOT EXISTS watched (
                        watched_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
                        content int(11) NOT NULL,
                        content_episode int(11) NOT NULL DEFAULT 0,
                        percent tinyint(2) NOT NULL,
                        user int(11) NOT NULL,
                        type enum('movie','serie') NOT NULL
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
                    
                    CREATE TABLE IF NOT EXISTS watchlist (
                        watch_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
                        user int(11) NOT NULL,
                        content int(11) NOT NULL
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
                    
                    CREATE TABLE IF NOT EXISTS email (
                        email_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
                        subject varchar(100) NOT NULL,
                        content longtext NOT NULL
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
                    
                    CREATE TABLE IF NOT EXISTS language (
                        language_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
                        name varchar(5000) NOT NULL,
                        en_US varchar(5000) NOT NULL,
                        pt_BR varchar(5000) NOT NULL
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
                    
                    CREATE TABLE IF NOT EXISTS user_restore (
                        restore_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
                        user int(11) NOT NULL,
                        location varchar(60) DEFAULT NULL
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;"
                );
                $this -> foreignKeys();
            }
            catch (PDOException $error) {
                echo $error -> getMessage();
            }
        }

        private function foreignKeys() {
            try {
                $key1 = $this -> create -> exec("ALTER TABLE config_admin ADD FOREIGN KEY (user) REFERENCES user(user_id);
                    ALTER TABLE content_episodes ADD FOREIGN KEY (episode_ref) REFERENCES content(content_id);
                    ALTER TABLE comment ADD FOREIGN KEY (content) REFERENCES content(content_id);
                    ALTER TABLE comment ADD FOREIGN KEY (user) REFERENCES user(user_id);
                    ALTER TABLE comment_reply ADD FOREIGN KEY (comment) REFERENCES comment(comment_id);
                    ALTER TABLE comment_reply ADD FOREIGN KEY (user) REFERENCES user(user_id);
                    ALTER TABLE follow ADD FOREIGN KEY (user) REFERENCES user(user_id);
                    ALTER TABLE follow ADD FOREIGN KEY (follow) REFERENCES user(user_id);
                    ALTER TABLE watched ADD FOREIGN KEY (content) REFERENCES content(content_id);
                    ALTER TABLE watched ADD FOREIGN KEY (content_episode) REFERENCES content_episodes(episode_id);
                    ALTER TABLE watched ADD FOREIGN KEY (user) REFERENCES user(user_id);
                    ALTER TABLE watchlist ADD FOREIGN KEY (user) REFERENCES user(user_id);
                    ALTER TABLE watchlist ADD FOREIGN KEY (content) REFERENCES content(content_id);
                    ALTER TABLE user_restore ADD FOREIGN KEY (user) REFERENCES user(user_id);
                ");
                $this -> configData();
            }
            catch (PDOException $error) {
                echo $error -> getMessage();
            }
        }

        private function configData() {
            try{
                $configs = $this -> insert -> prepare("INSERT INTO config (config_id, type, name, value) VALUES
                    (1, 'text', 'subFolder', :sub),
                    (2, 'bool', 'allowNewUser', 'yes'),
                    (3, 'bool', 'allowSaveLogin', 'no'),
                    (4, 'bool', 'verificationEmail', 'no'),
                    (5, 'text', 'directPath', '/opt/lampp/htdocs/joker/'),
                    (7, 'text', 'mediaImageFolder', '/images/media/'),
                    (8, 'text', 'userImageFolder', '/images/user/'),
                    (9, 'select', 'streamPlayer', 'joker'),
                    (10, 'select', 'livePlayer', 'dailymotion')
                ");
                $configs -> bindValue(':sub', $this -> subFolder);

                if($configs -> execute()) {
                    $this -> langData();
                }
            }
            catch (PDOException $error) {
                echo $error -> getMessage();
            }
        }

        private function langData() {
            //$insert = $create -> prepare("");

            //$insert -> execute();
            echo 'Reach the final!';
        }
    }
?>