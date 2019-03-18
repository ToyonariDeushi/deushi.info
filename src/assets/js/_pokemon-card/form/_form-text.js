/**
 * ======================================================
 *
 * formtext
 *
 * ======================================================
 */
;(function($){

    var DISABLED_CLASS = "disabled";

    /**
     * フォームテキスト用 (Jquery plugin)
     * @class KSFormText
     * @param option
     * @returns {$.fn.KSFormText}
     * @constructor
     */
    $.fn.KSFormText = function (option) {

        this._isEnabled = true;

        if (!$(this).hasClass("KSFormText")) throw new Error("KSFormTextクラスに対して設定して下さい");

        /**
         * disabled切り替え
         * @method setDisabled
         * @param isDisabled{boolean} disabledにしたい場合true
         */
        this.setEnabled = function (isEnabled) {
            if (isEnabled) {
                $(this).removeClass(DISABLED_CLASS);
            } else {
                $(this).addClass(DISABLED_CLASS);
            }
            this._isEnabled = isEnabled;
            return this;
        };

        return (this);
    }
})(jQuery);


