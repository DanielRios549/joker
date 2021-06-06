<?php
/* 
 ***************************************************************
 | Copyright (c) 2014-2021 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
	if(!isset($baseCon)) {
		require '../../_redirect.php';
        header("Location:" . $base . "404");
	}
	
	class Login extends Connect {
		public $showError;
		
		public function loginUser($data, $submit, $image, $base, $address, $agent, $session, $lang) {
            $pdo = $this -> getConnection();

            if(isset($submit)) {
                //Login Inputs
        
                $user = @$data['loginUser'];
                $password = @$data['loginPassword'];
                $restore = @$data['loginRestore'];

                //Verify if there are empty inputs
            
                if(($user == '') or ($password == '')) {
                    $show = 'userErrorDisplay';
                    $msg = langCode('login_error_input_empty');
                    
                    $errorPos = array($show, $msg);
                }
                else {
                    //Get the user and password from the input
                
                    $userLogin = $user;
                    $userPassword = sha1($password . '1658998fgt66951f8e41f51hju885g5r1g51w25f21r5g4f');
                    
                    //Indentify the user on the datasabe.

                    try {
                        $loginEmail = $pdo -> prepare("SELECT * FROM user WHERE email = :login AND password = :password");
                        $loginEmail -> bindValue(":login", $userLogin, PDO::PARAM_STR);
                        $loginEmail -> bindValue(":password", $userPassword, PDO::PARAM_STR);
                        $loginEmail -> execute();
                    }
                    catch(PDOException $error) {
                        echo $error -> getMessage();
                    }
                    
                    //If exist the login get, the login will be do or will be return a error.
                    
                    if($loginEmail -> rowCount() == 0) {
                        $show = 'userErrorDisplay';
                        $msg = langCode('loing_error_invalid_datas');
                        
                        $errorPos = array($show, $msg);
                    }
                    elseif($loginEmail -> rowCount() == 1) {
                        $data = $loginEmail -> fetch(PDO::FETCH_ASSOC);
                        
                        if($data['active'] == 'no') {
                            $show = 'userErrorDisplay';
                            $msg = langCode('login_error_account_not_active');

                            $errorPos = array($show, $msg);
                        }
                        elseif($data['active'] == 'yes') {
                            $_SESSION['user_id'] = $data['user_id'];
                            $_SESSION['name'] = $data['name'];
                            $_SESSION['username'] = $data['username'];
                            $_SESSION['image'] = $image . 'user/' . $data['user_id'] . '/profile.jpg';
                            $_SESSION['USER_ADDRESS'] = $address;
                            $_SESSION['USER_AGENT'] = $agent;
                            
                            session_regenerate_id();
                            
                            if($data['lang'] != $lang) {
                                $_SESSION['lang'] = $data['lang'];
                            }

                            if($restore == true) {
                                try {
                                    $rememberToken = sha1($session . 'jndkdlglor85784y33bfd7374jgk049jndeu3yrw97wq9389');
                                    
                                    $verifyToken = $pdo -> prepare("SELECT * FROM user_restore WHERE location = :session");
                                    $verifyToken -> bindValue(":session", $rememberToken);
                                    $verifyToken -> execute();
                                    
                                    if($verifyToken -> rowCount() == 0) {
                                        $setRememberLogin = $pdo -> prepare("INSERT INTO user_restore(user, location, session) VALUES (:user, :loginInfo, :session)");
                                        $setRememberLogin -> bindValue(":user", $_SESSION['user_id']);
                                        $setRememberLogin -> bindValue(":loginInfo", $rememberToken);
                                        $setRememberLogin -> bindValue(":session", session_id());
                                        
                                        if($setRememberLogin -> execute()) {
                                            setcookie("rememberLogin", $session, time() + 3600 * 24 * 30);
                                        }
                                    }
                                }
                                catch(PDOException $error) {
                                    echo $error -> getMessage();
                                }
                            }
                            
                            header("Location:" .  $base);
                        }
                    }
                }
                
                //Show the Error
                
                if(isset($errorPos)) {
                    $error = $errorPos;
                    $this -> showError = $error;
                }
            }
        }
        
        public function restoreUser($data, $submit, $image, $base, $address, $agent, $session, $lang) {
            $rememberToken = sha1($session . 'jndkdlglor85784y33bfd7374jgk049jndeu3yrw97wq9389');
            
            //Get the connected user
    
            try {
                $loginRestore = $pdo -> prepare("SELECT user_id FROM user_restore WHERE location = :restore");
                $loginRestore -> bindValue(":restore", $rememberToken, PDO::PARAM_STR);
    
                if($loginRestore -> execute()) {
                    $userRestored = $loginRestore -> fetch(PDO::FETCH_ASSOC);
                }
            }
            catch(PDOException $error) {
                echo $error -> getMessage();
            }
    
            try {
                $loginRestore = $pdo -> prepare("SELECT * FROM user WHERE user_id = :restore");
                $loginRestore -> bindValue(":restore", $userRestored['user_id'], PDO::PARAM_STR);
                $loginRestore -> execute();
            }
            catch(PDOException $error) {
                echo $error -> getMessage();
            }
    
            //If exist the login get, the login will be do or will be return a error.
                    
            if($loginRestore -> rowCount() == 0) {
                $show = 'userErrorDisplay';
                $msg = langCode('login_error_restore_session');
                
                $errorPos = array($show, $msg);
    
                header($base . getLink('logoff', false));
            }
            elseif($loginRestore -> rowCount() == 1) {
                $data = $loginRestore -> fetch(PDO::FETCH_ASSOC);
                
                if($data['active'] == 'no') {
                    header("Location: " . $base . getLink('logoff', false));
                }
                elseif($data['active'] == 'yes') {
                    $_SESSION['user_id'] = $data['user_id'];
                    $_SESSION['name'] = $data['name'];
                    $_SESSION['username'] = $data['username'];
                    $_SESSION['image'] = $image . 'user/' . $data['user_id'] . '/profile.jpg';
                    $_SESSION['USER_AGENT'] = sha1(getBrowserName($_SERVER['HTTP_USER_AGENT']) . 'sdfgd15d151320325cvdecveve6126523361561eddefe');
                    $_SESSION['USER_ADDRESS'] = sha1($_SERVER['REMOTE_ADDR'] . 'fjhbfsehfuiosjcoihwaiEpwdmiud93ur89wry9is0ugvs098');
                    
                    session_regenerate_id();
    
                    if($data['lang'] != $lang) {
                        $_SESSION['lang'] = $data['lang'];
                    }
    
                    header("Location:" .  $base);
                }
            }
        }
	}
?>