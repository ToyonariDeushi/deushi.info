/**
 * ======================================================
 *
 * textarea
 *
 * ======================================================
 */
;
(function ($) {

    /**
     * テキストエリア用 (Jquery plugin)
     * @class KSTextArea
     * @param option
     * @returns {$.fn.KSTextArea}
     * @constructor
     */
    $.fn.KSTextArea = function (option) {

        /**
         * テキストが入力変更される時に配信されるイベント
         * @event ON_CHANGE_EVENT
         */
        this.ON_CHANGE_EVENT = "ON_CHANGE_EVENT";
        if (option && option.onChange) {
            this.onChange = option.onChange;
        }
        if (!$(this).hasClass("KSTextArea")) throw new Error("KSTextAreaクラスに対して設定して下さい");
        var $this = $(this);

        /**
         * テキスト入力変更イベント設定
         */
        $(this).keyup($.proxy(function () {
                this.trigger(this.ON_CHANGE_EVENT);
                if (this.onChange) this.onChange($this, this.getValue());
            }, this
        ));

        /**
         * 値設定
         *
         * @method setValue
         * @param str {String}
         */
        this.setValue = function (str) {
            return $this.val(str)
        };

        /**
         * 値取得
         *
         * @method getValue
         * @returns {string}
         */
        this.getValue = function () {
            return $this.val()
        };

        /**
         * 入力値が空か判断
         *
         * @method isEmpty
         * @returns {boolean}
         */
        this.isEmpty = function () {
            var val = this.getValue();
            val = val.replace(/\n/g, "");
            return val == ""
        };

        /**
         * アラートカラーリング切り替え
         * @param isAlert
         */
        this.setAlert = function (isAlert) {
            if (isAlert) {
                $this.addClass("KSTextArea-alert");
            } else {
                $this.removeClass("KSTextArea-alert");
            }
        };

        /**
         * disabled切り替え
         *
         * @method setEnabled
         * @param isEnabled {boolean}  disabledにしたい場合false
         */
        this.setEnabled = function (isEnabled) {
            if (isEnabled) {
                $this.attr("disabled", false)
            } else {
                $this.attr("disabled", true)
            }
            this._isEnabled = isEnabled;
            return this
        };
        return this;
    }

})(jQuery);
