/**
 * =================================================================================
 *
 * textInput
 *
 * =================================================================================
 */
;
(function ($) {

    var FORM_TEXT = "KSFormText";
    var INPUT_TEXT_CLASS = "KSTextInput_text";
    var INVALID_MESSAGE_CLASS = "KSText-alert";
    var DISABLED_CLASS = "disabled";

    /**
     * テキストインプット用 (Jquery plugin)
     * @class KSTextInput
     * @param option
     * @returns {$.fn.KSTextInput}
     * @constructor
     */
    $.fn.KSTextInput = function (option) {

        /**
         * クリックイベント名
         * @event ON_CLICK_EVENT
         */
        this.ON_CLICK_EVENT = "ON_CLICK_EVENT";

        /**
         * テキスト変更イベント名
         * @event ON_CHANGE_EVENT
         */
        this.ON_CHANGE_EVENT = "ON_CHANGE_EVENT";

        var formText = $(this).find("." + FORM_TEXT);
        this.input = $(this).find("." + INPUT_TEXT_CLASS);
        this.alert = $(this).find("." + INVALID_MESSAGE_CLASS);
        this.alert.hide();
        this._isInvalid = false;
        this._isEnabled = true;
        if (option && option.onChange) {
            this.onChange = option.onChange;
        }

        /**
         * テキスト変更イベント
         */
        this.input[0].addEventListener("input", $.proxy(function (event) {
            this.trigger(this.ON_CHANGE_EVENT);
            if (this.onChange) this.onChange();
        }, this));

        /**
         * クリックイベント
         */
        this.input.bind("click", this, function (e) {
            var _this = e.data;
            _this.trigger(_this.ON_CLICK_EVENT);
        });

        /**
         * isInvalid ゲッター
         *
         * @method isInvalid
         * @returns {boolean}
         */
        this.isInvalid = function () {
            return this._isInvalid
        };

        /**
         * invalidメッセージ表示切り替え
         *
         * @method showInvalidMessage
         * @param isShow {boolean}  表示したい場合true
         */
        this.showInvalidMessage = function (isShow) {
            if (this.alert) {
                if (isShow) {
                    this._isInvalid = true;
                    $(this.alert).show();
                } else {
                    this._isInvalid = false;
                    $(this.alert).hide();
                }
            }
        };

        /**
         * 空かどうか
         * @returns {boolean}
         */
        this.isEmpty = function () {
            var val = this.getValue();
            if (!val) return true;
            val = val.replace(/\n/g, "");
            return val == ""
        };

        /**
         * 値取得
         *
         * @method getValue
         * @returns {*}
         */
        this.getValue = function () {
            if (this.input) return this.input.val();
        };

        /**
         * 値設定
         *
         * @method setValue
         * @param str {string} 表示したい文字列
         */
        this.setValue = function (str) {
            if (this.input) this.input.val(str);
            return this;
        };

        /**
         * disabled切り替え
         * @param isEnabled{boolean}
         */
        this.setEnabled = function (isEnabled) {
            this._isEnabled = isEnabled;
            if (!this._isEnabled) {
                if (this)$(this).addClass(DISABLED_CLASS);
                if (formText)formText.addClass(DISABLED_CLASS);
                if (this.input) this.input.attr("disabled", true)
            } else {
                if (this)$(this).removeClass(DISABLED_CLASS);
                if (formText)formText.removeClass(DISABLED_CLASS);
                if (this.input)this.input.attr("disabled", false)
            }
            return this;
        };

        this.getEnabled = function () {
            return this._isEnabled;
        };

        //TODO これsetValueと被ってるのでなくしたい
        this.setText = function (string) {
            this.input.val(string);
            return this;
        };

        /**
         * アラートカラーリング切り替え
         * @param isAlert
         */
        this.setAlert = function (isAlert) {
            if (isAlert) {
                $(this).addClass("KSTextInput-alert");
            } else {
                $(this).removeClass("KSTextInput-alert");
            }
        };

        return (this);
    }

})(jQuery);
