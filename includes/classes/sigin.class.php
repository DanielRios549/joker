<?php
/* 
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
	if(!isset($baseCon)) {
		require '../../_redirect.php';
		header("Location:" . $base . "404");
	}
	
	class Sigin extends Connect {
		public $showError;
		
		public function siginUser($url, $verification, $admin, $data, $file, $submit) {
            $pdo = $this -> getConnection();
            global $cookieLang;

			if(isset($submit)) {
                if($admin == 'no') {
                    if($verification == 'yes') {
                        $active = 'no';
                    }
                    elseif($verification == 'no') {
                        $active = 'yes';
                    }

                    $category = 'user';
                    $premium = 'no';
                    $lang = $cookieLang;

                    //Sigin Imputs
		
                    $firstName = addslashes($data['siginFirstName']);
                    $lastName = addslashes($data['siginLastName']);
                    $userName = addslashes($data['siginUserName']);
                    $email = addslashes($data['siginEmail']);
                    $password = addslashes($data['siginPassword']);
                    $password2 = addslashes($data['siginPassword2']);

                    $image = '';
                    $coverImage = '';
                }
                elseif($admin == 'yes') {
                    //Create Selects

                    $active = @$data['active'];
                    $category = @$data['category'];
                    $premium = @$data['premium'];
                    $lang = @$data['lang'];

                    //Create Imputs
                
                    $firstName = @$data['firstName'];
                    $lastName = @$data['lastName'];
                    $userName = @$data['userName'];
                    $email = @$data['email'];
                    $password = @$data['password'];
                    $password2 = @$data['password2'];

                    //Files
                    
                    $image = @$_FILES['userImage'];
                    $coverImage = @$_FILES['userCoverImage'];
                }
                
                //Verify if there are empty inputs
                
                if(($firstName == '') or ($lastName == '') or ($userName == '') or ($email == '') or ($password == '') or ($password2 == '')) {
                    $show = 'userErrorDisplay';
					$msg = langCode('login_error_input_empty');
                    
                    $errorPos = array($show, $msg);
                }
                else {
                    //Get the user datas from the input
				
                    $newUserName = $firstName . ' ' . $lastName;
                    $newUserNick = $userName;
                    $newUserEmail = $email;
                    $newUserPassword = $password;
                    $newUserPassword2 = $password2;
                    $newUserCryptPassword = sha1($newUserPassword2 . '1658998fgt66951f8e41f51hju885g5r1g51w25f21r5g4f');
                    
                    //Verify if the user exist
				
                    if(($newUserNick !== '') and ($newUserEmail !== '')) {
                        //Verify if the username already exists
                        
                        try {
                            $verifySigin1 = $pdo -> prepare("SELECT * FROM user WHERE username = :username");
                            $verifySigin1 -> bindValue(":username", $newUserNick, PDO::PARAM_STR);
                            $verifySigin1 -> execute();
                            $siginNick = $verifySigin1 -> rowCount();
                        }
                        catch(PDOException $error) {
                            echo $error -> getMessage();
                        }
                        
                        //Verify if the email already exists
                        
                        try {
                            $verifySigin2 = $pdo -> prepare("SELECT * FROM user WHERE email = :email");
                            $verifySigin2 -> bindValue(":email", $newUserEmail, PDO::PARAM_STR);
                            $verifySigin2 -> execute();
                            $siginEmail = $verifySigin2 -> rowCount();
                        }
                        catch(PDOException $error) {
                            echo $error -> getMessage();
                        }
                    }
                    
                    //Verify the two passwords input
                    
                    if(($newUserPassword !== '') and ($newUserPassword2 !== '')) {
                        if(($newUserPassword) !== ($newUserPassword2)) {
                            $vPassword = false;
                        }
                        else {
                            $vPassword = true;
                        }
                    }
                    
                    //If exist the sigin get, the sigin will be do or will be return a error.
                    
                    if($siginNick == 1) {
                        $show = 'userErrorDisplay';
                        $msg = langCode('sigin_error_user_exists');
                    }
                    elseif($siginEmail == 1) {
                        $show = 'userErrorDisplay';
                        $msg = langCode('sigin_error_email_exists');
                    }
                    elseif($vPassword == false) {
                        $show = 'userErrorDisplay';
                        $msg = langCode('sigin_error_pass_not_equals');
                    }
                    elseif(($siginNick == 0) and ($siginEmail == 0) and ($vPassword == true)) {
                        try {
                            $insertPrepare = $pdo -> prepare("INSERT INTO user(name, username, email, password, active, category, premium, lang) 
                            VALUES (:name, :username, :email, :password, :active, :category, :premium, :lang)");
                            
                            $insertPrepare -> bindValue(":name", $newUserName, PDO::PARAM_STR);
                            $insertPrepare -> bindValue(":username", $newUserNick, PDO::PARAM_STR);
                            $insertPrepare -> bindValue(":email", $newUserEmail, PDO::PARAM_STR);
                            $insertPrepare -> bindValue(":password", $newUserCryptPassword, PDO::PARAM_STR);

                            $insertPrepare -> bindValue(":active", $active, PDO::PARAM_STR);
                            $insertPrepare -> bindValue(":category", $category, PDO::PARAM_STR);
                            $insertPrepare -> bindValue(":premium", $premium, PDO::PARAM_STR);
                            $insertPrepare -> bindValue(":lang", $lang, PDO::PARAM_STR);
                        }
                        catch(PDOException $error) {
                            echo $error -> getMessage();
                        }

                        //Do the complements if the user was created

                        if($insertPrepare -> execute()) {
                            $userDirQuery = $pdo -> prepare("SELECT * FROM user WHERE email = :newEmail");
                            $userDirQuery -> bindValue(":newEmail", $newUserEmail, PDO::PARAM_STR);
                            
                            if($userDirQuery -> execute()) {
                                //Make the user directory and copy the commoms images
                                
                                $userDirData = $userDirQuery -> fetch(PDO::FETCH_ASSOC);

                                $userDir = $url . 'images/user/' . $userDirData['user_id'];

                                if($admin == 'no') {
                                    system('mkdir ' . $userDir);

                                    $copyImageProfile = copy('images/user/profile.jpg' , $userDir . '/profile.jpg');
                                    $copyImageCover = copy('images/user/cover.jpg' , $userDir . '/cover.jpg');
                                }
                                elseif($admin == 'yes') {
                                    system('mkdir ' . $userDir);

                                    //Upload the image if exists or copy the default 

                                    if($image['name'] != '') {
                                        $imageExtension = strtolower(substr($image['name'], -4));
                                        $imageName = "profile" . $imageExtension;
                                        move_uploaded_file($image['tmp_name'], $userDir . "/" . $imageName);
                                    }
                                    else {
                                        $copyImageProfile = copy('../images/user/profile.jpg' , $userDir . '/profile.jpg');
                                    }

                                    //Upload the cover image if exists or copy the default

                                    if($coverImage['name'] != '') {
                                        $coverImageExtension = strtolower(substr($coverImage['name'], -4));
                                        $coverImageName = "cover" . $coverImageExtension;
                                        move_uploaded_file($coverImage['tmp_name'], $userDir . "/" . $coverImageName);
                                    }
                                    else {
                                        $copyImageCover = copy('../images/user/cover.jpg' , $userDir . '/cover.jpg');
                                    }
                                }
                                system('chmod -R 770 ' . $url . 'images/user/*');

                                //Send the email if necessary

                                if($verification == 'yes') {
                                    $newUserCryptEmail = sha1($newUserEmail . 'mifirofrpo95ui8u74ht7giti9t86856ntntg');
                                    $subjectEmail = 'Ative sua conta';
                                    $messageEmail = 'Vc se cadastrou para ter uma conta no nosso site de filmes www.streamovie.com.br, agora você tem que ativar sua conta. Para isso, clique no link: www.streamovie.com.br/?active=' . $newUserEmail . '&activeId=' . $newUserCryptEmail;
                                    $headerEmail = 'contato.atomo@gmail.com';

                                    if(mail($newUserEmail, $subjectEmail, $messageEmail, $headerEmail)) {
                                        $show = 'newAccountCreatedDisplay';
                                        $msg = langCode('sigin_success_email_sent');
                                    }
                                    else {
                                        $show = 'newAccountCreatedDisplay';
                                        $msg = langCode('sigin_success_email_not_sent');
                                    }
                                }
                                elseif($verification == 'no') {
                                    $show = 'newAccountCreatedDisplay';
                                    $msg = 'Account Created';
                                }
                            }
                        }
                    }
                    
                    $errorPos = array($show, $msg);
                }
                
                //Show the Error
                
                if(isset($errorPos)) {
                    $this -> showError = $errorPos;
                }
            }
		}
	}
?>