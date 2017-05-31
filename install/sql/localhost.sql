-- phpMyAdmin SQL Dump
-- version 4.6.6
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 25, 2017 at 08:44 PM
-- Server version: 5.7.17-0ubuntu0.16.04.1
-- PHP Version: 7.0.15-0ubuntu0.16.04.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `joker`
--
CREATE DATABASE IF NOT EXISTS `joker` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `joker`;

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `comment_id` int(11) NOT NULL,
  `content` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `comment` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`comment_id`, `content`, `user`, `comment`) VALUES
(3, 4, 3, 'Nossa, ficou show'),
(4, 4, 2, 'Já vi melhores'),
(29, 4, 1, 'Teste');

-- --------------------------------------------------------

--
-- Table structure for table `comment_reply`
--

CREATE TABLE `comment_reply` (
  `reply_id` int(11) NOT NULL,
  `comment` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `reply` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comment_reply`
--

INSERT INTO `comment_reply` (`reply_id`, `comment`, `user`, `reply`) VALUES
(1, 3, 2, 'Tbm gostei'),
(2, 3, 3, 'Opinião é opinião, a minha é que tá uma bosta.Opinião é opinião, a minha é que tá uma bosta.Opinião é opinião, a minha é que tá uma bosta.Opinião é opinião, a minha é que tá uma bosta.Opinião é opinião, a minha é que tá uma bosta.Opinião é opinião, a minha é que tá uma bosta.Opinião é opinião, a minha é que tá uma bosta.Opinião é opinião, a minha é que tá uma bosta'),
(3, 4, 1, 'O melhor de todos');

-- --------------------------------------------------------

--
-- Table structure for table `config`
--

CREATE TABLE `config` (
  `config_id` int(11) NOT NULL,
  `name` varchar(5000) NOT NULL,
  `value` varchar(5000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `config`
--

INSERT INTO `config` (`config_id`, `name`, `value`) VALUES
(1, 'baseUrl', 'joker/'),
(2, 'atomoBaseUrl', 'Atomo/'),
(3, 'adminDir', 'admin/'),
(4, 'adminLayoutDir', '../layout/admin/'),
(6, 'layoutDir', 'layout/'),
(8, 'imageDir', 'images/'),
(9, 'styleDir', 'css/'),
(10, 'scriptDir', 'javascript/'),
(11, 'fontDir', 'fonts/'),
(14, 'mediaFolder', '/joker/media/'),
(15, 'mediaImageFolder', '/joker/images/media/'),
(18, 'allowNewUser', 'true'),
(19, 'player', 'joker');

-- --------------------------------------------------------

--
-- Table structure for table `config_admin`
--

CREATE TABLE `config_admin` (
  `config_id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `value` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `config_admin`
--

INSERT INTO `config_admin` (`config_id`, `user`, `name`, `value`) VALUES
(1, 1, 'menu_style', 'opened'),
(2, 1, 'items_per_page', '10');

-- --------------------------------------------------------

--
-- Table structure for table `content`
--

CREATE TABLE `content` (
  `content_id` int(11) NOT NULL,
  `active` enum('no','yes') NOT NULL DEFAULT 'no',
  `producer` varchar(200) NOT NULL,
  `director` varchar(100) NOT NULL,
  `category` enum('animation','science','action','suspense','terror','drama','fantasy','spirit','music','comedy','sport','romance','police','war','documentary','indenpendent') NOT NULL,
  `type` enum('movie','serie') NOT NULL,
  `feature` enum('no','yes') NOT NULL DEFAULT 'no',
  `duration` varchar(13) NOT NULL,
  `age` enum('L','10','12','14','16','18') NOT NULL,
  `date` varchar(10) NOT NULL,
  `date_add` date NOT NULL,
  `en_US` varchar(5000) NOT NULL,
  `pt_BR` varchar(5000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `content`
--

INSERT INTO `content` (`content_id`, `active`, `producer`, `director`, `category`, `type`, `feature`, `duration`, `age`, `date`, `date_add`, `en_US`, `pt_BR`) VALUES
(1, 'yes', 'Walt Disney', 'Stieve Spilber', 'animation', 'movie', 'yes', '1 hr 27 min', 'L', '1940', '2016-01-29', 'Pinochio|Pinocchio synopsis example', 'Pinóquio|Exemplo de sinopse do pinóquio'),
(2, 'yes', 'Gabriel Guedes', 'Daniel rios', 'science', 'movie', 'yes', '1 hr 25 min', '18', '2006-2015', '2016-01-05', 'Back to the future|Back to the future synopsis example', 'De volta par ao futuro|Exemplo de sinopse do de folta para o futuro'),
(3, 'yes', 'Pixar Pictures', 'Christopher Crown', 'animation', 'movie', 'no', '1 hr 50 min', '10', '1985', '2015-12-16', 'Big Buck Bunny|Bunny synopsis example', 'Grande Coelho Bunny|Exemplo de sinopse do Bunny'),
(4, 'yes', 'Warner Pictures', 'Paul Walker', 'documentary', 'serie', 'yes', 'N/D', '16', '2003-2009', '2016-01-04', 'Tears of steel|Tears synopsis example', 'Lágrimas de aço|Exemplo de sinopse do Lágrimas de Aço'),
(30, 'yes', 'Teste da Vincci', 'Daniel\'s Gray', 'drama', 'serie', 'no', 'N/D', 'L', '2010-2015', '2016-10-17', 'Da Vinces\'s Name|Da Vince\'s Synopsis', 'Nome Da Vince|Sinópse Da Vince');

-- --------------------------------------------------------

--
-- Table structure for table `content_episodes`
--

CREATE TABLE `content_episodes` (
  `episode_id` int(11) NOT NULL,
  `active` enum('yes','no') NOT NULL DEFAULT 'yes',
  `episode_ref` int(11) NOT NULL,
  `season` int(3) NOT NULL,
  `episode` int(3) NOT NULL,
  `en_US` varchar(5000) NOT NULL,
  `pt_BR` varchar(5000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `content_episodes`
--

INSERT INTO `content_episodes` (`episode_id`, `active`, `episode_ref`, `season`, `episode`, `en_US`, `pt_BR`) VALUES
(1, 'yes', 4, 1, 1, 'Episode 1.1 Title|Episode 1.1 Synopsis', 'Episódio 1.1 Título|Episódio 1.1 Sinópse'),
(2, 'yes', 4, 1, 3, 'Episode 1.3 Title|Episode 1.3 Synopsis', 'Episódio 1.3 Título|Episódio 1.3 Sinópse'),
(4, 'yes', 4, 1, 4, 'Episode 1.4 Title|Episode 1.4 Synopsis', 'Episódio 1.4 Título|Episódio 1.4 Sinópse'),
(6, 'yes', 4, 2, 1, 'Episode 2.1 Title|Episode 2.1 Synopsis', 'Episódio 2.1 Título|Episódio 2.1 Sinópse'),
(7, 'yes', 4, 1, 2, 'Episode 1.2 Title|Episode 1.2 Synopsis', 'Episódio 1.2 Título|Episódio 1.2 Sinópse'),
(9, 'yes', 4, 1, 5, 'Episode 1.5 Title|Episode 1.5 Synopsis', 'Episódio 1.5 Título|Episódio 1.5 Sinópse'),
(10, 'yes', 4, 2, 2, 'Episode 2.2 Title|Episode 2.2 Synopsis', 'Episódio 2.2 Título|Episódio 2.2 Sinópse'),
(27, 'yes', 30, 1, 1, 'Episode Title|Episode Synopsis', 'Título do episódio|Sinopse do episódio'),
(48, 'yes', 30, 1, 2, 'Episode Title2|Episode Synopsis2', 'Título do episódio2|Sinopse do episódio2'),
(50, 'yes', 30, 2, 1, 'Episode Title3.1|Episode Synopsis3.1', 'Título do episódio3.1|Sinopse do episódio3.1');

-- --------------------------------------------------------

--
-- Table structure for table `email`
--

CREATE TABLE `email` (
  `email_id` int(11) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `content` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `email`
--

INSERT INTO `email` (`email_id`, `subject`, `content`) VALUES
(1, 'test', 'content of test email');

-- --------------------------------------------------------

--
-- Table structure for table `follow`
--

CREATE TABLE `follow` (
  `follow_id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `follow` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `follow`
--

INSERT INTO `follow` (`follow_id`, `user`, `follow`) VALUES
(11, 2, 1),
(55, 2, 3),
(59, 1, 2),
(60, 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `language`
--

CREATE TABLE `language` (
  `language_id` int(11) NOT NULL,
  `name` varchar(5000) NOT NULL,
  `en_US` varchar(5000) NOT NULL,
  `pt_BR` varchar(5000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `language`
--

INSERT INTO `language` (`language_id`, `name`, `en_US`, `pt_BR`) VALUES
(1, 'lang_name', 'English', 'Português'),
(2, 'lang', 'en', 'pt'),
(3, 'charset', 'UTF-8', 'UTF-8'),
(4, 'langs', 'Languages', 'Idiomas'),
(5, 'en', 'English', 'Inglês'),
(6, 'pt', 'Portuguese', 'Português'),
(7, 'meta_description', 'StreaMovie - Watch the best Movies.', 'StreaMovie - Assista aos melhores filmes.'),
(8, 'input_search', 'Search', 'Pesquisar'),
(9, 'index_title', 'StreaMovie - Watch the best Movies', 'StreaMovie - Assista aos melhores filmes'),
(10, 'home_hover', 'Go to home page', 'Ir para página inicial'),
(11, 'home_title', 'Home Page', 'Página inicial'),
(12, 'home', 'Home Page', 'Página inicial'),
(13, 'about_hover', 'Go to about page', 'Ir para página sobre'),
(14, 'about_link', 'about', 'sobre'),
(15, 'about_title', 'About Us', 'Sobre nós'),
(16, 'about', 'About', 'Sobre'),
(17, 'advertise_hover', 'Go to advertise page', 'Ir para página anuncie'),
(18, 'advertise_link', 'advertise', 'anuncie'),
(19, 'advertise_title', 'Advertise your project', 'Anuncie seu projeto'),
(20, 'advertise', 'Advertise', 'Anuncie'),
(21, 'jobs_hover', 'Go to jobs page', 'Ir para página trabalhe'),
(22, 'jobs_link', 'jobs', 'trabalhe'),
(23, 'jobs_title', 'Jobs with our team', 'Trabalhe conosco'),
(24, 'job', 'Jobs', 'Trabalhe'),
(25, 'contact_hover', 'Go to contact page', 'Ir para página contato'),
(26, 'contact_link', 'contact', 'contato'),
(27, 'contact_title', 'Contact Us', 'Contate agente'),
(28, 'contact', 'Contact', 'Contato'),
(29, 'footer_right', 'All rigth reserved.', 'Todos os direitos reservados'),
(30, 'login_link', 'login', 'entrar'),
(31, 'login_title', 'Log in or create your account', 'Entre ou crie sua conta'),
(32, 'login', 'Login', 'Entrar'),
(33, 'profile', 'Profile', 'Perfil'),
(34, 'settings', 'Settings', 'Configurações'),
(35, 'logoff', 'Logoff', 'Sair'),
(36, 'movies_link', 'movies', 'filmes'),
(37, 'movies_title', 'All Movies', 'Todos os Filmes'),
(38, 'movie', 'Movie', 'Filme'),
(39, 'movies', 'Movies', 'Filmes'),
(40, 'series_link', 'series', 'series'),
(41, 'series_title', 'All Movies', 'Todos os Filmes'),
(42, 'series', 'Series', 'Séries'),
(43, 'settings_link', 'settings', 'configuracoes'),
(44, 'settings_user_connected', 'Settings', 'Configurações'),
(45, 'search_link', 'search', 'busca'),
(46, 'search_title', 'Search', 'Busca'),
(47, 'error_403_title', 'No access', 'Sem acesso'),
(48, 'error_404_title', 'Page not found', 'Página não encontrada'),
(49, 'accounts', 'Accounts', 'Contas'),
(50, 'nav_menu', 'Browse', 'Navegar'),
(51, 'watch_link', 'watch', 'assistir'),
(52, 'title_link', 'title', 'titulo'),
(53, 'category_link', 'category', 'categoria'),
(54, 'recent_add', 'Recently added', 'Adicionados recentemente'),
(55, 'details', 'Details', 'Detalhes'),
(56, 'science', 'Science', 'Ciência'),
(57, 'action', 'Action', 'Ação'),
(58, 'fantasy', 'Fantasy', 'Fantasia'),
(59, 'terror', 'Terror', 'Terror'),
(60, 'suspense', 'Suspense', 'Suspense'),
(61, 'drama', 'Drama', 'Drama'),
(62, 'spirit', 'Spirit', 'Esperitualidade'),
(63, 'music', 'Music', 'Musical'),
(64, 'sport', 'Sports', 'Esportes'),
(65, 'romance', 'Romance', 'Romance'),
(66, 'police', 'Polices', 'Policiais'),
(67, 'war', 'War', 'Guerra'),
(68, 'independent', 'Independent', 'Independente'),
(69, 'animation', 'Animation', 'Animação'),
(70, 'documentary', 'Documentary', 'Documentário'),
(71, 'comedy', 'Comedy', 'Comédia'),
(72, 'seasons', 'Seasons', 'Temporadas'),
(73, 'season', 'Season', 'Temporada'),
(74, 'epidoses', 'Episodes', 'Episódios'),
(75, 'episode', 'Episode', 'Episódio'),
(76, 'use_list', 'My List', 'Minha Lista'),
(77, 'results', 'Results', 'Resultados'),
(78, 'for', 'for', 'para'),
(79, 'play', 'Play', 'Play'),
(80, 'trailer', 'Trailer', 'Trailer'),
(81, 'watch_list', 'watchlist', 'lista'),
(82, 'view_more', 'View More', 'Ver Mais'),
(83, 'apresentation_text', 'Have available thousands of unlimi.ted movies and series.', 'Tenha a disposição milhares de filmes ilimitado.'),
(84, 'category_presentation', 'The best exprience for all the users, premium option coming soon.', 'A melhor esperiência para todos os usuários, em breve opção Premium.'),
(85, 'login_legend', 'Enter with your account', 'Entre com sua conta'),
(86, 'login_user_placeholder', 'Type your email', 'Digite o seu e-mail'),
(87, 'login_password_placeholder', 'Type your password', 'Digite a sua senha'),
(88, 'login_submit', 'Login In', 'Fazer Login'),
(89, 'sigin_legend', 'Create your account', 'Crie sua conta'),
(90, 'sigin_first_name_placeholder', 'Type your first name', 'Digite o seu primeiro nome'),
(91, 'sigin_last_name_placeholder', 'Type your last name', 'Digite o seu último nome'),
(92, 'sigin_username_placeholder', 'Choose your username', 'Escolha um nome de usuário'),
(93, 'sigin_email_placeholder', 'Type your email', 'Type o seu email'),
(94, 'sigin_password_placeholder', 'Choose your password', 'Escolha sua senha'),
(95, 'sigin_password_placeholder_2', 'Write the password again', 'Digite a senha denovo'),
(96, 'sigin_submit', 'Create Account', 'Criar conta'),
(97, 'block_sigin', 'We are working on this website, in the future, you will can creat a account.', 'Nós estamos trabalhando nesse site, no futuro, você poderá criar uma conta.'),
(98, 'in_category', 'in the category', 'na categoria'),
(99, 'episodes', 'Episodes', 'Episódios'),
(100, 'profile_link', 'profile', 'perfil'),
(101, 'settings_info', 'General', 'Geral'),
(102, 'settings_lang', 'Language', 'Idioma'),
(103, 'settings_delete', 'Delete', 'Deletar'),
(104, 'settings_section_header_info', 'Account Details Settings', 'Configurações de Detalhes da conta'),
(105, 'settings_section_header_lang', 'Language Settings', 'Configurações de  Idioma'),
(106, 'settings_section_header_delete', 'Detele your account', 'Exclua sua conta'),
(107, 'settings_edit', 'Edit', 'Editar'),
(108, 'settings_saved', 'Changes Saved', 'Mudanças Salvas'),
(109, 'settings_name', 'Name', 'Nome'),
(110, 'settings_username', 'Username', 'Nome de usuário'),
(111, 'settings_email', 'Email', 'E-mail'),
(112, 'settings_password', 'Password', 'Senha'),
(113, 'settings_delete_account', 'Delete Account', 'Excluir conta'),
(114, 'settings_account_lang', 'Account Language', 'Idioma da Conta'),
(115, 'settings_complete_name', 'Full Name', 'Nome Completo'),
(116, 'settings_current_password', 'Current Password', 'Senha Atual'),
(117, 'settings_new_password', 'New Password', 'Nova Senha'),
(118, 'settings_repeat_new_password', 'Re-type New Password', 'Repita a Nova Senha'),
(119, 'settings_change', 'Change', 'Mudar'),
(120, 'settings_cancel', 'Cancel', 'Cancelar'),
(121, 'settings_first', 'First', 'Primeiro'),
(122, 'settings_last', 'Last', 'Último'),
(123, 'admin_add', 'Add', 'Adicionar'),
(124, 'admin_advanced_search', 'Advanced Search', 'Pesquisa Avançada'),
(125, 'admin_home_hover', 'Go to admin home page', 'Ir para página admin incial'),
(126, 'admin_home_link', 'home', 'home'),
(127, 'admin_home', 'Home', 'Início'),
(128, 'admin_feedback_manager_hover', 'Manage the feedbacks', 'Gerenciar os feedbacks'),
(129, 'admin_feedback_manager_link', 'feedback/manager', 'feedback/gerenciar'),
(130, 'admin_feedback', 'Feedback', 'Feedback'),
(131, 'admin_users_manager_hover', 'Manage the Users', 'Gerenciar os usuários'),
(132, 'admin_users_manager_link', 'users/manager', 'usuarios/gerenciar'),
(133, 'admin_users', 'Users', 'Usuários'),
(134, 'admin_users_add_hover', 'Add Users', 'Adicionar usuários'),
(135, 'admin_users_add_link', 'users/add', 'usuarios/adicionar'),
(136, 'admin_movies_manager_hover', 'Manage the movies', 'Gerenciar os filmes'),
(137, 'admin_movies_manager_link', 'movies/manager', 'filmes/gerenciar'),
(138, 'admin_movies_add_hover', 'Add movies', 'Adicionar filmes'),
(139, 'admin_movies_add_link', 'movies/add', 'filmes/adicionar'),
(140, 'admin_series_manager_hover', 'Manage series', 'Gerenciar as séries'),
(141, 'admin_series_manager_link', 'series/manager', 'series/gerenciar'),
(142, 'admin_series_add_hover', 'Add series', 'Adicionar séries'),
(143, 'admin_series_add_link', 'series/add', 'series/adicionar'),
(144, 'admin_edit', 'Edit', 'Editar'),
(145, 'admin_found', 'Was found', 'Foi encontrado'),
(146, 'admin_found_2', 'Were found', 'Foram encontrados'),
(147, 'admin_manage', 'Manage', 'Gerenciar'),
(148, 'admin_manager', 'Manager', 'Gerenciador'),
(154, 'logoff_title', 'Disconnecting', 'Desconectando'),
(155, 'logoff_link', 'logoff', 'sair'),
(156, 'logoff', 'Logoff', 'Sair'),
(157, 'logoff_info', 'Disconnecting', 'Desconectando'),
(158, 'related', 'Related', 'Relacionados'),
(159, 'coming_soon', 'Coming soon', 'Em breve'),
(160, 'ajax_title', 'Testing json title', 'Tatando o titulo front end'),
(161, 'remember_login', 'Remenber me', 'Continuar conectado'),
(162, 'login_error_input_empty', 'Fill in all fields to login', 'Preencha todos os campos para entrar'),
(163, 'loing_error_invalid_datas', 'Invalid datas, type the corrects', 'Dados inválidos, confirme seus dados por favor'),
(164, 'login_error_account_not_active', 'Account not active. Check your email to active it', 'Conta não ativada. Entre no seu email para ativá-la'),
(165, 'login_error_restore_session', 'We found an error to restore your session', 'Ouve um erro ao restaurar sua sessão'),
(166, 'sigin_error_user_exists', 'This user already exists, choose other username, please', 'Esse usuário já está cadastrado, escolha outro nome de usuário, por favor'),
(167, 'sigin_error_email_exists', 'This email already exists, choose other email, please', 'Esse email já está cadastrado, escolha outro email, por favor'),
(168, 'sigin_error_pass_not_equals', 'Type the same password in the two fields', 'As senhas são diferentes, digite a mesma senha nos dois campos'),
(169, 'sigin_success_email_sent', 'Account created, verify your email to active your account', 'Você agora está cadastrado, verifique o seu email para ativar sua conta'),
(170, 'sigin_success_email_not_sent', 'Account created, but your verification email it was not sent', 'Você agora está cadastrado, mas tivemos um problema ao enviar o email'),
(171, 'of_producer', 'of producer', 'do produtor'),
(172, 'people', 'people', 'pessoas'),
(173, 'follow', 'Follow', 'Seguir'),
(174, 'following', 'Following', 'Seguindo'),
(175, 'my', 'my', 'minha'),
(176, 'my_2', 'my', 'meu'),
(177, 'comment', 'comment', 'commentário'),
(178, 'comments', 'comments', 'comentários'),
(179, 'replies', 'replies', 'comentários'),
(180, 'admin_episodes_add_hover', 'Add more Episodes for a serie', 'Adicionar mais episódios para uma série'),
(181, 'admin_episodes_add_link', 'episodes/add', 'episodios/adicionar'),
(182, 'admin_episodes_manager_link', 'episodes/manager', 'episodios/gerenciar'),
(183, 'admin_episodes_manager_hover', 'Manager episodes', 'Gerenciar episódios'),
(184, 'continue', 'Continue', 'Continuar');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `active` enum('no','yes') NOT NULL DEFAULT 'no',
  `name` varchar(60) NOT NULL,
  `username` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(40) NOT NULL,
  `category` enum('user','admin') NOT NULL DEFAULT 'user',
  `premium` enum('no','yes') NOT NULL DEFAULT 'no',
  `lang` enum('pt_BR','en_US') NOT NULL DEFAULT 'pt_BR',
  `style` enum('D','N') NOT NULL DEFAULT 'D'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `active`, `name`, `username`, `email`, `password`, `category`, `premium`, `lang`, `style`) VALUES
(1, 'yes', 'Daniel Rios', 'DanielRios54', 'danielrios.flamengo@gmail.com', '97ce58a4a7b39373aadeb73c3dfdc7fc204c6655', 'admin', 'yes', 'en_US', 'N'),
(2, 'yes', 'Daniel Reis', 'DanielFla', 'daniel_fla@live.com', 'e5d79a4ffb899191b9f69439ab3e947b2b0acbf1', 'user', 'no', 'pt_BR', 'D'),
(3, 'yes', 'Teste 01', 'teste01', 'email.teste@email.com', 'e5d79a4ffb899191b9f69439ab3e947b2b0acbf1', 'user', 'no', 'pt_BR', 'D');

-- --------------------------------------------------------

--
-- Table structure for table `user_restore`
--

CREATE TABLE `user_restore` (
  `restore_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `location` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_restore`
--

INSERT INTO `user_restore` (`restore_id`, `user_id`, `location`) VALUES
(254, 1, 'a89e47cd3c3444f28f0b37d5430c8fa248893406'),
(255, 1, 'c0f83d8b5ab296b9cefcee0985d3540429cdda76');

-- --------------------------------------------------------

--
-- Table structure for table `watched`
--

CREATE TABLE `watched` (
  `watched_id` int(11) NOT NULL,
  `content` int(11) NOT NULL,
  `continueContent` int(11) NOT NULL,
  `percent` tinyint(2) NOT NULL,
  `user` int(11) NOT NULL,
  `type` enum('movie','serie') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `watched`
--

INSERT INTO `watched` (`watched_id`, `content`, `continueContent`, `percent`, `user`, `type`) VALUES
(3, 4, 7, 33, 1, 'serie'),
(4, 1, 1, 75, 1, 'movie');

-- --------------------------------------------------------

--
-- Table structure for table `watchlist`
--

CREATE TABLE `watchlist` (
  `wish_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `watchlist`
--

INSERT INTO `watchlist` (`wish_id`, `user_id`, `content_id`) VALUES
(411, 2, 2),
(413, 2, 3),
(414, 3, 3),
(459, 1, 30),
(461, 1, 2),
(462, 1, 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `content` (`content`),
  ADD KEY `user` (`user`);

--
-- Indexes for table `comment_reply`
--
ALTER TABLE `comment_reply`
  ADD PRIMARY KEY (`reply_id`),
  ADD KEY `comment` (`comment`),
  ADD KEY `user` (`user`);

--
-- Indexes for table `config`
--
ALTER TABLE `config`
  ADD PRIMARY KEY (`config_id`);

--
-- Indexes for table `config_admin`
--
ALTER TABLE `config_admin`
  ADD PRIMARY KEY (`config_id`),
  ADD KEY `user` (`user`);

--
-- Indexes for table `content`
--
ALTER TABLE `content`
  ADD PRIMARY KEY (`content_id`);

--
-- Indexes for table `content_episodes`
--
ALTER TABLE `content_episodes`
  ADD PRIMARY KEY (`episode_id`),
  ADD KEY `episode_ref` (`episode_ref`);

--
-- Indexes for table `email`
--
ALTER TABLE `email`
  ADD PRIMARY KEY (`email_id`);

--
-- Indexes for table `follow`
--
ALTER TABLE `follow`
  ADD PRIMARY KEY (`follow_id`),
  ADD KEY `user` (`user`),
  ADD KEY `follow` (`follow`);

--
-- Indexes for table `language`
--
ALTER TABLE `language`
  ADD PRIMARY KEY (`language_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_restore`
--
ALTER TABLE `user_restore`
  ADD PRIMARY KEY (`restore_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `watched`
--
ALTER TABLE `watched`
  ADD PRIMARY KEY (`watched_id`),
  ADD KEY `user` (`user`),
  ADD KEY `content` (`content`),
  ADD KEY `continueContent` (`continueContent`);

--
-- Indexes for table `watchlist`
--
ALTER TABLE `watchlist`
  ADD PRIMARY KEY (`wish_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `content_id` (`content_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT for table `comment_reply`
--
ALTER TABLE `comment_reply`
  MODIFY `reply_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `config`
--
ALTER TABLE `config`
  MODIFY `config_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `config_admin`
--
ALTER TABLE `config_admin`
  MODIFY `config_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `content`
--
ALTER TABLE `content`
  MODIFY `content_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT for table `content_episodes`
--
ALTER TABLE `content_episodes`
  MODIFY `episode_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
--
-- AUTO_INCREMENT for table `email`
--
ALTER TABLE `email`
  MODIFY `email_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `follow`
--
ALTER TABLE `follow`
  MODIFY `follow_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;
--
-- AUTO_INCREMENT for table `language`
--
ALTER TABLE `language`
  MODIFY `language_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=185;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `user_restore`
--
ALTER TABLE `user_restore`
  MODIFY `restore_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=256;
--
-- AUTO_INCREMENT for table `watched`
--
ALTER TABLE `watched`
  MODIFY `watched_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `watchlist`
--
ALTER TABLE `watchlist`
  MODIFY `wish_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=463;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`content`) REFERENCES `content` (`content_id`),
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`user`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `comment_reply`
--
ALTER TABLE `comment_reply`
  ADD CONSTRAINT `comment_reply_ibfk_1` FOREIGN KEY (`comment`) REFERENCES `comment` (`comment_id`),
  ADD CONSTRAINT `comment_reply_ibfk_2` FOREIGN KEY (`user`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `config_admin`
--
ALTER TABLE `config_admin`
  ADD CONSTRAINT `config_admin_ibfk_1` FOREIGN KEY (`user`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `content_episodes`
--
ALTER TABLE `content_episodes`
  ADD CONSTRAINT `content_episodes_ibfk_1` FOREIGN KEY (`episode_ref`) REFERENCES `content` (`content_id`);

--
-- Constraints for table `follow`
--
ALTER TABLE `follow`
  ADD CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`user`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`follow`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `user_restore`
--
ALTER TABLE `user_restore`
  ADD CONSTRAINT `user_restore_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `watched`
--
ALTER TABLE `watched`
  ADD CONSTRAINT `watched_ibfk_1` FOREIGN KEY (`user`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `watched_ibfk_2` FOREIGN KEY (`content`) REFERENCES `content` (`content_id`),
  ADD CONSTRAINT `watched_ibfk_3` FOREIGN KEY (`continueContent`) REFERENCES `content_episodes` (`episode_id`);

--
-- Constraints for table `watchlist`
--
ALTER TABLE `watchlist`
  ADD CONSTRAINT `watchlist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `watchlist_ibfk_2` FOREIGN KEY (`content_id`) REFERENCES `content` (`content_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
