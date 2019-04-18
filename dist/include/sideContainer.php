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
            <li><a href="<?php echo $DOCUMENT_ROOT_URL; ?>">趣味（0）</a></li>
            <li><a href="<?php echo $DOCUMENT_ROOT_URL; ?>">育児（0）</a></li>
            <li><a href="<?php echo $DOCUMENT_ROOT_URL; ?>">仕事（0）</a></li>
            <li><a href="<?php echo $DOCUMENT_ROOT_URL; ?>">猫（0）</a></li>
            <li><a href="<?php echo $DOCUMENT_ROOT_URL; ?>">レビュー（0）</a></li>
            <li><a href="<?php echo $DOCUMENT_ROOT_URL; ?>">未分類（1）</a></li>
        </ul>
    </div>
    <div class="subContainer__recentPosts">
        <h2 class="subContainer__recentPosts-title">最近の記事</h2>
        <ul class="recentPosts-list">
            <li class="recentPosts-item">
                <a href="<?php echo $DOCUMENT_ROOT_URL; ?>article/prologue.html">
                    <div class="recentPosts-wrap">
                        <div class="recentPosts-media">
                            <img src="<?php echo $DOCUMENT_ROOT_URL; ?>assets/images/mv-prologue.jpg" alt="サムネイル">
                        </div>
                        <div class="recentPosts-content">
                            <div class="recentPosts-title">過去にもブログサイトをやっていたことはありますが、忙しさゆえ、サイトを閉鎖してしまいました。あれから数年、ようやく重たい腰を上げ、新たにブログサイトを立ち上げることとなりました（祝）</div>
                            <div class="recentPosts-meta">
                                <time datetime="2019-03-29" class="recentPosts-date">2019.03.29</time>
                                <span class="recentPosts-category">未分類</span>
                            </div>
                        </div>
                    </div>
                </a>
            </li>
        </ul>
    </div>
    <div class="subContainer__archivePosts">
        <h2 class="subContainer__archivePosts-title">アーカイブ</h2>
        <select class="subContainer__archivePosts-list">
            <option value="" selected="selected">選択▼</option>
            <option value="<?php echo $DOCUMENT_ROOT_URL; ?>">2019年01月</option>
            <option value="<?php echo $DOCUMENT_ROOT_URL; ?>">2018年12月</option>
            <option value="<?php echo $DOCUMENT_ROOT_URL; ?>">2018年11月</option>
            <option value="<?php echo $DOCUMENT_ROOT_URL; ?>">2018年10月</option>
            <option value="<?php echo $DOCUMENT_ROOT_URL; ?>">2018年09月</option>
        </select>
    </div>
</aside>
