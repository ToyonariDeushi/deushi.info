<div class="articleList">
<?php for ($i = 0; $i < 10; $i++) {?>
                <article class="articleList-item">
                    <a href="<?php echo $DOCUMENT_ROOT_URL; ?>article.html">
                        <div class="articleList-media">
                            <img src="<?php echo $DOCUMENT_ROOT_URL; ?>assets/images/sample-thum.jpg" alt="">
                        </div>
                        <div class="articleList-content">
                            <div class="articleList-meta">
                                <time datetime="2019-01-01" class="articleList-date">2019.01.01</time>
                                <span class="articleList-category">趣味</span>
                            </div>
                            <h2 class="articleList-title">それも今とうとうその永続ようというもののために行きですた。しかるに場合に意味帰りはよほどその解釈ででまでが行きがみるでからは相違立てるんないから、まだにも申し上げたなました。</h2>
                        </div>
                        <div class="articleList-footer">
                            <span class="articleList-status">NEW</span>
                        </div>
                    </a>
                </article>
<?php } ?>
            </div>
            <div class="pageNation">
                <div class="pageNation__prev-active"><a href="<?php echo $DOCUMENT_ROOT_URL; ?>">前の10件を見る</a></div>
                <div class="pageNation__next-active"><a href="<?php echo $DOCUMENT_ROOT_URL; ?>">次の10件を見る</a></div>
            </div>
<?php
/*
            <div class="pageNation">
                <div class="pageNation__prev">前の10件を見る</div>
                <div class="pageNation__next">次の10件を見る</div>
            </div>
*/
?>
