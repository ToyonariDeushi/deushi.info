<aside class="subContainer">
    <div class="subContainer__articleSearch">
        <form role="search" method="get" id="searchform" class="articleSearchForm" action="<?php echo $DOCUMENT_ROOT_URL; ?>">
            <input type="search" id="s" name="s" value="">
            <button type="submit" id="searchSubmit"><i class="fa fa-search"></i></button>
        </form>
    </div>
    <div class="subContainer__category">
        <h2 class="subContainer__category-title">カテゴリー</h2>
        <ul>
            <li><a href="<?php echo $DOCUMENT_ROOT_URL; ?>">趣味（10）</a></li>
            <li><a href="<?php echo $DOCUMENT_ROOT_URL; ?>">育児（20）</a></li>
            <li><a href="<?php echo $DOCUMENT_ROOT_URL; ?>">仕事（30）</a></li>
            <li><a href="<?php echo $DOCUMENT_ROOT_URL; ?>">猫（40）</a></li>
            <li><a href="<?php echo $DOCUMENT_ROOT_URL; ?>">レビュー（50）</a></li>
            <li><a href="<?php echo $DOCUMENT_ROOT_URL; ?>">未分類（60）</a></li>
        </ul>
    </div>
    <div class="subContainer__recentPosts">
        <h2 class="subContainer__recentPosts-title">最近の記事</h2>
        <ul class="recentPosts-list">
<?php
for ($i = 0; $i < 6; $i++) {
?>
            <li class="recentPosts-item">
                <a href="<?php echo $DOCUMENT_ROOT_URL; ?>article.html">
                    <div class="recentPosts-wrap">
                        <div class="recentPosts-media">
                            <img src="<?php echo $DOCUMENT_ROOT_URL; ?>assets/images/sample-thum.jpg" alt="">
                        </div>
                        <div class="recentPosts-content">
                            <div class="recentPosts-title">それも今とうとうその永続ようというもののために行きですた。しかるに場合に意味帰りはよほどその解釈ででまでが行きがみるでからは相違立てるんないから、まだにも申し上げたなました。</div>
                            <div class="recentPosts-meta">
                                <time datetime="2019-01-01" class="recentPosts-date">2019.01.01</time>
                                <span class="recentPosts-category">趣味</span>
                            </div>
                        </div>
                    </div>
                </a>
            </li>
<?php
}
?>
        </ul>
    </div>
    <div class="subContainer__archivePosts">
        <h2 class="subContainer__archivePosts-title">アーカイブ</h2>
        <select class="subContainer__archivePosts-list">
            <option value="" selected="selected">選択</option>
            <option value="<?php echo $DOCUMENT_ROOT_URL; ?>">2019年01月</option>
            <option value="<?php echo $DOCUMENT_ROOT_URL; ?>">2018年12月</option>
            <option value="<?php echo $DOCUMENT_ROOT_URL; ?>">2018年11月</option>
            <option value="<?php echo $DOCUMENT_ROOT_URL; ?>">2018年10月</option>
            <option value="<?php echo $DOCUMENT_ROOT_URL; ?>">2018年09月</option>
        </select>
    </div>
</aside>
