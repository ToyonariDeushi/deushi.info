/**
 * ----------------------------------------------------------------------------------------
 * @module タブ
 * ----------------------------------------------------------------------------------------
 */

(function ($) {

    /**
     * タブ
     */
    $.fn.KSTab = function (option) {

        if (!$(this).get(0)) {
            console.error("ERROR KSTabクラス内に要素を入れてください");
            return
        }

        /**
         * onClickがあれば保持
         */
        if (option && option.onClick) this.onClick = option.onClick;

        /**
         * タブ初期化
         */
        this.init = function () {

            /**
             * --------------------------------------------------------
             * タブをクリックした時の処理
             * --------------------------------------------------------
             */
            $(this).find('.KSTab_item a').on("click", $.proxy(function (event) {
                //#があればタブとして処理。なければaタグとして処理
                var url = $(event.target).closest("a").attr("href");
                var isTab = (url.indexOf("#") != -1);
                if (isTab) {
                    this.tabSwitch(event.currentTarget);
                    event.preventDefault();
                }
                this.touchAction(event);
            }, this));

            /**
             * --------------------------------------------------------
             * タブをタッチした時の処理
             * --------------------------------------------------------
             */
            var touchStartPoint = {};

            /**
             * タッチスタート
             */
            $(this).find('.KSTab_item a').on("touchstart", $.proxy(function (event) {
                //-----------------------------------------
                // タッチスタート位置を保持
                //-----------------------------------------
                touchStartPoint = this.getTouchPosition(event);
            }, this));

            /**
             * タッチエンド
             */
            $(this).find('.KSTab_item a').on("touchend", $.proxy(function (event) {
                //-----------------------------------------
                //タッチスタート位置とタッチエンド位置を比較し1px以下ならタッチしたとみなす
                //-----------------------------------------
                var touchObj = this.getTouchPosition(event);
                if (Math.abs(touchStartPoint.x - touchObj.x) < 1) {
                    //#があればタブとして処理。なければaタグとして処理
                    var url = $(event.target).closest("a").attr("href");
                    var isBlank = ($(event.target).closest("a").attr("target") == "_blank");
                    var isTab = (url.indexOf("#") != -1);
                    if (isTab) {
                        this.tabSwitch(event.currentTarget);
                        event.preventDefault();
                    } else {
                        if (isBlank) {
                            window.open().location.href = url;
                        } else {
                            location.href = url;
                        }
                    }
                    this.touchAction(event);
                }
                touchStartPoint = {};
            }, this));

            /**
             * タッチクリック共通アクション
             */
            this.touchAction = $.proxy(function (event) {
                //インデックスを取得
                var allList = $(this).find(".KSTab_list").find(".KSTab_item");
                var targetList = $(event.currentTarget).parent();
                var index = $(allList).index(targetList);
                //クリックハンドラあれば実行
                if (this.onClick) this.onClick(index, event.currentTarget);
            }, this);

            /**
             * タッチイベントから座標を取得
             */
            this.getTouchPosition = $.proxy(function (event) {
                var touchObj = event.changedTouches || event.originalEvent.changedTouches;
                touchObj = touchObj[0];
                return {x: touchObj.pageX, y: touchObj.pageY};
            }, this);

            /**
             * --------------------------------------------------------
             * リストの幅を計算して動的に設定
             * --------------------------------------------------------
             */
            var innerWidth = 0;
            var lists = $(this).find(".KSTab_list").find("li");
            _.each(lists, $.proxy(function (li) {
                var liw = $(li).outerWidth();
                innerWidth += liw + 8;
            }, this));
            $(this).find(".KSTab_list").width(innerWidth + "px");

            /**
             * --------------------------------------------------------
             * スクロール化
             * --------------------------------------------------------
             */
            new IScroll($(this).get(0), {
                scrollX: true
                , scrollY: false
                , click: false
                , tap: true
                //, preventDefault: false
                //, eventPassthrough: false
                , resizeScrollbars: true
                , scrollbars: 'custom'
            });
        };
        /**
         * タブの切替
         * @param target
         */
        this.tabSwitch = function (target) {
            if (!target) return;
            var tabId = $(target).attr("href").toString();
            if (tabId.indexOf("#") != -1) {
                //タブ切り替え
                var tab = $(target).parent();
                tab.addClass("current");//自身にcurrentクラス当てる
                tab.siblings().removeClass("current");//自分以外の兄弟要素のcurrentクラス消す

                //コンテンツ切り替え
                var content = $(tabId);
                content.addClass("current");//自身にcurrentクラス当てる
                content.siblings().removeClass("current");//自分以外の兄弟要素のcurrentクラス消す
            }
        };

        /**
         * 初期化
         */
        this.init();

        return (this);
    }
})(jQuery);

// window.addEventListener('load', () => {
//     const tags = document.querySelectorAll(".Calendar_Label");
//     tags.forEach(tag => {
//         if (tag.innerHTML === "商品") {
//             tag.style.backgroundColor = "#FE2501";
//         }	else if (tag.innerHTML === "コラム") {
//             tag.style.backgroundColor = "#FEBF02";
//         }	else if (tag.innerHTML === "キャンペーン") {
//             tag.style.backgroundColor = "#027C00";
//         }	else if (tag.innerHTML === "イベント") {
//             tag.style.backgroundColor = "#102CE2";
//         }
//     });
// });
