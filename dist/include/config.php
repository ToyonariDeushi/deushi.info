<?php

// 現在の言語を設定
mb_language("ja");
// 内部文字コードを設定
mb_internal_encoding("UTF-8");

// DB host
////$db_host = "mysql006.phy.heteml.lan";
// DB name
////$db_name = "_dbdeushi";
// db user
////$db_login = "_dbdeushi";
// Db password
////$db_pwd = "xmz4kz-in8ub2";

////$db_con = mysql_connect($db_host, $db_login, $db_pwd) or die("Cannot connect to DB!");
////mysql_select_db($db_name, $db_con) or die("Cannot select DB!");
////mysql_query('SET NAMES utf8', $db_con);

$keyword_list = array(
"test1",
"test2",
);

$connect = "";
foreach ( $keyword_list as $value ) {
	$keywords .= $connect.$value;
	$connect = ",";
}

$description ="test3";

$SITE_TITLE = "ハイパー牛ろぐ";

$REQUEST_URL = "http://".$_SERVER["HTTP_HOST"].$_SERVER["REQUEST_URI"];
$DOCUMENT_ROOT_URL = "http://".$_SERVER["HTTP_HOST"]."/";
$ROBOTS = "index,follow";
$ROBOTS = "noindex,nofollow";

$VERSION = "20190311";

?>
