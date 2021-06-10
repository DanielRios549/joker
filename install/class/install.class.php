<?php
/* 
 ***************************************************************
 | Copyright (c) 2015-2021 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/
    if(!defined('THIS_PAGE')) {
		$base = '../../';
		require $base . '404.php';
    }

    class Install {
        private $redirect;
        private $subFolder;
        private $create;
        private $insert;

        public function __construct($user, $pass, $host, $name) {
            $siteUrl = $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
            $baseSiteUrl = $_SERVER['HTTP_HOST'] . '/install/';
            $domainUrl = isset($_SERVER["HTTPS"]) ? 'https://' : 'http://';

            if ($baseSiteUrl != $siteUrl) {
                $explodeUrl = strpos($_SERVER['REQUEST_URI'], '/', 1);
                $subFolder = substr($_SERVER['REQUEST_URI'], 1, $explodeUrl);

                $this -> subFolder = $subFolder;
                $this -> redirect = $domainUrl . $_SERVER['SERVER_NAME'] . '/' . $subFolder;
            }
            else {
                $this -> subFolder = '';
                $this -> redirect =  $domainUrl . $_SERVER['SERVER_NAME'];
            }

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
                        content_episode int(11) DEFAULT NULL,
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
                    (7, 'text', 'mediaImageFolder', 'images/media/'),
                    (8, 'text', 'userImageFolder', 'images/user/'),
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
            $insert = $this -> insert -> prepare("INSERT INTO language (name, en_US, pt_BR) VALUES
                ('lang_name', 'English', 'Português'),
                ('lang', 'en', 'pt'),
                ('charset', :charset, :charset),
                ('langs', 'Languages', 'Idiomas'),
                ('en', 'English', 'Inglês'),
                ('pt', 'Portuguese', 'Português'),
                ('meta_description', 'Joker - Watch the best Movies.', 'Joker - Assista aos melhores filmes.'),
                ('input_search', 'Search', 'Pesquisar'),
                ('index_title', 'Joker - Watch the best Movies', 'Joker - Assista aos melhores filmes'),
                ('home_hover', 'Go to home page', 'Ir para página inicial'),
                ('home_title', 'Home Page', 'Página inicial'),
                ('home', 'Home Page', 'Página inicial'),
                ('about_hover', 'Go to about page', 'Ir para página sobre'),
                ('about_title', 'About Us', 'Sobre nós'),
                ('about', 'About', 'Sobre'),
                ('advertise_hover', 'Go to advertise page', 'Ir para página anuncie'),
                ('advertise_title', 'Advertise your project', 'Anuncie seu projeto'),
                ('advertise', 'Advertise', 'Anuncie'),
                ('jobs_hover', 'Go to jobs page', 'Ir para página trabalhe'),
                ('jobs_title', 'Jobs with our team', 'Trabalhe conosco'),
                ('job', 'Jobs', 'Trabalhe'),
                ('contact_hover', 'Go to contact page', 'Ir para página contato'),
                ('contact_title', 'Contact Us', 'Contate agente'),
                ('contact', 'Contact', 'Contato'),
                ('footer_right', 'All rigth reserved.', 'Todos os direitos reservados'),
                ('login_title', 'Log in or create your account', 'Entre ou crie sua conta'),
                ('login', 'Login or Create an account', 'Entre ou crie uma conta'),
                ('profile', 'Profile', 'Perfil'),
                ('settings', 'Settings', 'Configurações'),
                ('logoff', 'Logoff', 'Sair'),
                ('movies_title', 'All Movies', 'Todos os Filmes'),
                ('movies', 'Movies', 'Filmes'),
                ('series_title', 'All Movies', 'Todos os Filmes'),
                ('series', 'Series', 'Séries'),
                ('settings_user_connected', 'Settings', 'Configurações'),
                ('search_title', 'Search', 'Busca'),
                ('error_403_title', 'No access', 'Sem acesso'),
                ('error_404_title', 'Page not found', 'Página não encontrada'),
                ('accounts', 'Accounts', 'Contas'),
                ('nav_menu', 'Browse', 'Navegar'),
                ('recent_add', 'Recently added', 'Adicionados recentemente'),
                ('details', 'Details', 'Detalhes'),
                ('science', 'Science', 'Ciência'),
                ('action', 'Action', 'Ação'),
                ('fantasy', 'Fantasy', 'Fantasia'),
                ('terror', 'Terror', 'Terror'),
                ('suspense', 'Suspense', 'Suspense'),
                ('drama', 'Drama', 'Drama'),
                ('spirit', 'Spirit', 'Esperitualidade'),
                ('music', 'Music', 'Musical'),
                ('sport', 'Sports', 'Esportes'),
                ('romance', 'Romance', 'Romance'),
                ('police', 'Polices', 'Policiais'),
                ('war', 'War', 'Guerra'),
                ('independent', 'Independent', 'Independente'),
                ('animation', 'Animation', 'Animação'),
                ('documentary', 'Documentary', 'Documentário'),
                ('comedy', 'Comedy', 'Comédia'),
                ('seasons', 'Seasons', 'Temporadas'),
                ('season', 'Season', 'Temporada'),
                ('epidoses', 'Episodes', 'Episódios'),
                ('episode', 'Episode', 'Episódio'),
                ('use_list', 'My List', 'Minha Lista'),
                ('results', 'Results', 'Resultados'),
                ('for', 'for', 'para'),
                ('play', 'Play', 'Play'),
                ('trailer', 'Trailer', 'Trailer'),
                ('watch_list', 'watchlist', 'lista'),
                ('view_more', 'View More', 'Ver Mais'),
                ('apresentation_text', 'Have available thousands of unlimi.ted movies and series.', 'Tenha a disposição milhares de filmes ilimitado.'),
                ('category_presentation', 'The best exprience for all the users, premium option coming soon.', 'A melhor esperiência para todos os usuários, em breve opção Premium.'),
                ('login_legend', 'Enter with your account', 'Entre com sua conta'),
                ('login_user_placeholder', 'Type your email', 'Digite o seu e-mail'),
                ('login_password_placeholder', 'Type your password', 'Digite a sua senha'),
                ('login_submit', 'Login In', 'Fazer Login'),
                ('sigin_legend', 'Create your account', 'Crie sua conta'),
                ('sigin_first_name_placeholder', 'Type your first name', 'Digite o seu primeiro nome'),
                ('sigin_last_name_placeholder', 'Type your last name', 'Digite o seu último nome'),
                ('sigin_username_placeholder', 'Choose your username', 'Escolha um nome de usuário'),
                ('sigin_email_placeholder', 'Type your email', 'Type o seu email'),
                ('sigin_password_placeholder', 'Choose your password', 'Escolha sua senha'),
                ('sigin_password_placeholder_2', 'Write the password again', 'Digite a senha denovo'),
                ('sigin_submit', 'Create Account', 'Criar conta'),
                ('block_sigin', 'We are working on this website, in the future, you will can creat a account.', 'Nós estamos trabalhando nesse site, no futuro, você poderá criar uma conta.'),
                ('in_category', 'in the category', 'na categoria'),
                ('episodes', 'Episodes', 'Episódios'),
                ('settings_info', 'General', 'Geral'),
                ('settings_lang', 'Language', 'Idioma'),
                ('settings_delete', 'Delete', 'Deletar'),
                ('settings_section_header_info', 'Account Details Settings', 'Configurações de Detalhes da conta'),
                ('settings_section_header_lang', 'Language Settings', 'Configurações de  Idioma'),
                ('settings_section_header_delete', 'Detele your account', 'Exclua sua conta'),
                ('settings_edit', 'Edit', 'Editar'),
                ('settings_saved', 'Changes Saved', 'Mudanças Salvas'),
                ('settings_name', 'Name', 'Nome'),
                ('settings_username', 'Username', 'Nome de usuário'),
                ('settings_email', 'Email', 'E-mail'),
                ('settings_password', 'Password', 'Senha'),
                ('settings_delete_account', 'Delete Account', 'Excluir conta'),
                ('settings_account_lang', 'Account Language', 'Idioma da Conta'),
                ('settings_complete_name', 'Full Name', 'Nome Completo'),
                ('settings_current_password', 'Current Password', 'Senha Atual'),
                ('settings_new_password', 'New Password', 'Nova Senha'),
                ('settings_repeat_new_password', 'Re-type New Password', 'Repita a Nova Senha'),
                ('settings_change', 'Change', 'Mudar'),
                ('settings_cancel', 'Cancel', 'Cancelar'),
                ('settings_first', 'First', 'Primeiro'),
                ('settings_last', 'Last', 'Último'),
                ('admin_add', 'Add', 'Adicionar'),
                ('admin_advanced_search', 'Advanced Search', 'Pesquisa Avançada'),
                ('admin_home_hover', 'Go to admin home page', 'Ir para página admin incial'),
                ('admin_home', 'Home', 'Início'),
                ('admin_feedback_manager_hover', 'Manage the feedbacks', 'Gerenciar os feedbacks'),
                ('feedback', 'Feedback', 'Feedback'),
                ('admin_users_manager_hover', 'Manage the Users', 'Gerenciar os usuários'),
                ('users', 'Users', 'Usuários'),
                ('admin_users_add_hover', 'Add Users', 'Adicionar usuários'),
                ('admin_movies_manager_hover', 'Manage the movies', 'Gerenciar os filmes'),
                ('admin_movies_add_hover', 'Add movies', 'Adicionar filmes'),
                ('admin_series_manager_hover', 'Manage series', 'Gerenciar as séries'),
                ('admin_series_add_hover', 'Add series', 'Adicionar séries'),
                ('admin_edit', 'Edit', 'Editar'),
                ('admin_found', 'Was found', 'Foi encontrado'),
                ('admin_found_2', 'Were found', 'Foram encontrados'),
                ('admin_manage', 'Manage', 'Gerenciar'),
                ('admin_manager', 'Manager', 'Gerenciador'),
                ('logoff_title', 'Disconnecting', 'Desconectando'),
                ('logoff', 'Logoff', 'Sair'),
                ('logoff_info', 'Disconnecting', 'Desconectando'),
                ('related', 'Related', 'Relacionados'),
                ('coming_soon', 'Coming soon', 'Em breve'),
                ('ajax_title', 'Testing json title', 'Tatando o titulo front end'),
                ('remember_login', 'Remenber me', 'Continuar conectado'),
                ('login_error_input_empty', 'Fill in all fields to login', 'Preencha todos os campos para entrar'),
                ('loing_error_invalid_datas', 'Invalid datas, type the corrects', 'Dados inválidos, confirme seus dados por favor'),
                ('login_error_account_not_active', 'Account not active. Check your email to active it', 'Conta não ativada. Entre no seu email para ativá-la'),
                ('login_error_restore_session', 'We found an error to restore your session', 'Ouve um erro ao restaurar sua sessão'),
                ('sigin_error_user_exists', 'This user already exists, choose other username, please', 'Esse usuário já está cadastrado, escolha outro nome de usuário, por favor'),
                ('sigin_error_email_exists', 'This email already exists, choose other email, please', 'Esse email já está cadastrado, escolha outro email, por favor'),
                ('sigin_error_pass_not_equals', 'Type the same password in the two fields', 'As senhas são diferentes, digite a mesma senha nos dois campos'),
                ('sigin_success_email_sent', 'Account created, verify your email to active your account', 'Você agora está cadastrado, verifique o seu email para ativar sua conta'),
                ('sigin_success_email_not_sent', 'Account created, but your verification email it was not sent', 'Você agora está cadastrado, mas tivemos um problema ao enviar o email'),
                ('of_producer', 'of producer', 'do produtor'),
                ('people', 'people', 'pessoas'),
                ('follow', 'Follow', 'Seguir'),
                ('following', 'Following', 'Seguindo'),
                ('my', 'my', 'minha'),
                ('my_2', 'my', 'meu'),
                ('comment', 'comment', 'commentário'),
                ('comments', 'comments', 'comentários'),
                ('replies', 'replies', 'comentários'),
                ('admin_episodes_add_hover', 'Add more Episodes for a serie', 'Adicionar mais episódios para uma série'),
                ('admin_episodes_manager_hover', 'Manager episodes', 'Gerenciar episódios'),
                ('continue', 'Continue', 'Continuar'),
                ('test', 'English here!', ''),
                ('attention', 'Attention', 'Atenção'),
                ('remove_alert', 'You will delete all the content in database, and all the files, such as images and vídeos.', 'Você está prestes a excluir o conteúdo do banco de dados, assim como todas as coisas relacionadas a ele, e os arquivos, tais como iamgens e vídeos.'),
                ('remove_alternative', 'As alternative, you can only disable, so it will still on database, but it won\'t be accessible, to do that, click in \"Cancel\" and \"Edit\"', 'Como alternativa, você pode desativar, assim ele continuará existindo, porém, não será acessível, se quiser fazer isso, clique em \"Cancelar\" e depois em \"Editar\"'),
                ('confirm', 'Confirm', 'Confirmar'),
                ('lives', 'Lives', 'Lives'),
                ('admin_lives_manager_hover', 'Manage the live streams', 'Gerenciar as lives'),
                ('admin_lives_add_hover', 'Add a Live', 'Adicionar uma Live'),
                ('user', 'User', 'Usuário'),
                ('movie', 'Movie', 'Filme'),
                ('serie', 'Serie', 'Série'),
                ('live', 'Live', 'Live'),
                ('feedbacks', 'Feedbacks', 'Feedbacks'),
                ('more_info', 'More Info', 'Mais informações'),
                ('manager', 'Manager', 'Gerenciador'),
                ('change', 'Change', 'Mudar'),
                ('add', 'Add', 'Adicionar'),
                ('episodes_add', 'Add Episode', 'Adicionar Episódio')
            ");
            $insert -> bindValue(':charset', DB_CHARSET);

            if($insert -> execute()) {
                $this -> userExample();
            }
        }
        private function userExample() {
            $insert = $this -> insert -> prepare("INSERT INTO user (active, name, username, email, password, category, premium, lang) VALUES
                ('yes', 'Admin Test', 'admin', 'admin@test.com', '58222d849301e66b7c7b52b81ec2ff773f53c4a3', 'admin', 'yes', 'en_US')
            ");
            if($insert -> execute()) {
                header("Location:" . $this -> redirect);
            }
        }
    }
?>