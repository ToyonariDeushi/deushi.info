/**
 * =================================================================================
 *
 * 日付選択UI
 *
 * =================================================================================
 */


;(function($){

    var DATE_SELECTOR_TEXT_CLASS = "KSDateSelector_text";
    var DISABLED_CLASS = "disabled";

    $.fn.KSDateSelector = function (option) {

        this.ON_CHANGE_EVENT ="ON_CHANGE_EVENT";

        this.text = $(this).find("." + DATE_SELECTOR_TEXT_CLASS);
        this.text.attr("placeholder", "yyyy-mm-dd");
        this.year;
        this.month;
        this.day;
        this.week;
        this.hour;
        this.minute;
        this.second;
        this._isShowCalendar = false;

        /**
         * IDテキストインプット自動選択設定
         * TODO ゆくゆくはTextInputAutoFocusをなくす
         */
        var focusInputs = $(this.text);
        //new TextInputAutoFocus({el: focusInputs}).render();

        /**
         * テキスト変更イベント
         */
        this.input[0].addEventListener("input", $.proxy(function (event) {
            this.trigger(this.ON_CHANGE_EVENT);
            if (this.onChange) this.onChange();
        }, this));

        this.setValue = function (str) {
            this.text.attr("value", str)
        };

        /**
         * 今日の日付をセット
         */
        this.setToday = function () {
            var date = new Date();
            //年・月・日・曜日を取得する
            this.year = date.getFullYear();
            this.month = date.getMonth() + 1;
            this.week = date.getDay();
            this.day = date.getDate();
            var dateText = this.year + "-" + KS.zeroPadding(this.month, 2) + "-" + KS.zeroPadding(this.day, 2)
            this.text.attr("value",dateText)
            return this;
        }

        /**
         * 空かどうか
         * @returns {boolean}
         */
        this.isEmpty = function () {
            var val = this.getValue();
            val = val.replace(/\n/g, "");
            return val == ""
        };

        /**
         * UnixTimestampからセットする
         * @param unixtimestamp
         */
        this.setUnixTime = function (unixtimestamp) {
            var date = new Date(unixtimestamp * 1000);
            var m = moment(date)
            var result = m.format("YYYY-MM-DD");
            this.text.val(result);
        }

        /**
         * disabled切り替え
         * @param isDisabled
         */
        this.setDisabled = function (isDisabled) {
            if (isDisabled) {
                this.text.addClass(DISABLED_CLASS);
                this.text.attr("disabled", true);
            } else {
                this.text.removeClass(DISABLED_CLASS);
                this.text.attr("disabled", false);
            }
            return this;
        };

        /**
         * テキストエリアの値を取得
         * @returns {*}
         */
        this.getValue = function () {
            return this.text.val()
        };


        return (this);
    }
})(jQuery);


