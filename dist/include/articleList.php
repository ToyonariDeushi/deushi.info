<?php
include_once("include/config.php");

/*
$sql = "
SELECT * FROM article WHERE `id` = 1
";

$result = mysql_query($sql,$db_con);

$data = mysql_fetch_array($result) {

?>

<?php echo $data["id"]; ?>

<?php
}
*/




/*
$sql = "SELECT * FROM article";
$stmt = $db_host->query($sql);
foreach ($stmt as $row) {
    echo $row['id'];
}


*/

?>

<div class="articleList">
                <article class="articleList-item">
                    <a href="<?php echo $DOCUMENT_ROOT_URL; ?>article/prologue.html">
                        <div class="articleList-media">
                            <img src="<?php echo $DOCUMENT_ROOT_URL; ?>assets/images/mv-prologue.jpg" alt="サムネイル">
                        </div>
                        <div class="articleList-content">
                            <div class="articleList-meta">
                                <time datetime="2019-03-29" class="articleList-date">2019.03.29</time>
                                <span class="articleList-category">未分類</span>
                            </div>
                            <h2 class="articleList-title">過去にもブログサイトをやっていたことはありますが、忙しさゆえ、サイトを閉鎖してしまいました。あれから数年、ようやく重たい腰を上げ、新たにブログサイトを立ち上げることとなりました（祝）</h2>
                        </div>
                        <div class="articleList-footer">
                            <span class="articleList-status">NEW</span>
                        </div>
                    </a>
                </article>
            </div>
            <?php
            /*
            <div class="pageNation">
                <div class="pageNation__prev-active"><a href="<?php echo $DOCUMENT_ROOT_URL; ?>">前の10件を見る</a></div>
                <div class="pageNation__next-active"><a href="<?php echo $DOCUMENT_ROOT_URL; ?>">次の10件を見る</a></div>
            </div>
            */
            ?>
