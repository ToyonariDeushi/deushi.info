<?php

// 現在の言語を設定
/////mb_language("ja");
// 内部文字コードを設定
/////mb_internal_encoding("UTF-8");
/*
// DB host
$db_host = "mysql007.phy.heteml.lan";
// DB name
$db_name = "_db_deushi";
// db user
$db_login = "_db_deushi";
// Db password
$db_pwd = "xmz4kzin8ub2";
*/

//$db_con = mysql_connect($db_host, $db_login, $db_pwd) or die("Cannot connect to DB!");
//mysql_select_db($db_name, $db_con) or die("Cannot select DB!");
//mysql_query('SET NAMES utf8', $db_con);

/*
// 定数定義
$DB_HOST = 'mysql007.phy.heteml.lan'; // データベースのホスト名
$DB_NAME = '_db_deushi';              // データベース名
$DB_USER = '_db_deushi';              // データベースのユーザー名
$DB_PAWD = 'xmz4kzin8ub2';            // データベースのパスワード

$AES_KEY_STR = 'H3a5Aa3pCvGm';        // 暗号化・復号化のキー文字列

// E_NOTICE(注意メッセージ)以外の全てのエラーを表示する
//error_resporting(E_ALL & ˜E_NOTICE);

// データベースに接続する
$pdo = new PDO("mysql:host={$DB_HOST};dbname={$DB_NAME};charset=utf8", $DB_USER, $DB_PAWD);
*/

$author = "出牛 豊成";

$keyword_list = array(
"出牛",
"豊成",
$author
);

$connect = "";
foreach ( $keyword_list as $value ) {
	$keywords .= $connect.$value;
	$connect = ",";
}

$description = "このサイトは出牛による個人的なサイトです。";
$SITE_TITLE = "ハイパーうしろぐ";
$REQUEST_URL = "http://".$_SERVER["HTTP_HOST"].$_SERVER["REQUEST_URI"];
$DOCUMENT_ROOT_URL = "https://".$_SERVER["HTTP_HOST"]."/";
$ROBOTS = "index,follow";
$fbAppId = "365468850844568";
$VERSION = "20190311";



// ポケカからの移植
/*
$url = $_SERVER['HTTP_HOST'];
$path = $_SERVER['REQUEST_URI'];
$path = strtok($path, '?');
$filename = dirname(__FILE__) .'/_www1'.$path;
$path_parts = pathinfo($filename);
if(!isset($path_parts['extension'])){
    $buf = $filename."index.html";
    if (!file_exists($buf)){
        $buf = $filename."index.php";
    }
    $filename = $buf;
    $path_parts = pathinfo($filename);
}
if (file_exists($filename)) {
    if($path_parts['extension'] == "php" || $path_parts['extension'] == "html" ){
        include $filename;
    }else if($path_parts['extension'] == "gif"){
        header('Content-type: image/gif');
        readfile($filename);
    }else if($path_parts['extension'] == "png"){
        header('Content-type: image/png');
        readfile($filename);
    }else if($path_parts['extension'] == "jpg"){
        header('Content-type: image/jpeg');
        readfile($filename);
    }else if($path_parts['extension'] == "css"){
        header('Content-Type: text/css; charset=utf-8');
        readfile($filename);
    }else if($path_parts['extension'] == "js"){
        header('Content-Type: text/javascript');
        readfile($filename);
    }
} else {
    $redirectUrl = "/404.html";
    header("HTTP/1.0 404 Not Found");
    if($path_parts['extension'] == "php" || $path_parts['extension'] == "html" ){
        header("Location: $redirectUrl");
    }
}
*/
?>
