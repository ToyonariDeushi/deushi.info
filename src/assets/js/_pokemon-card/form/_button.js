/**
 * KSButton
 */
;(function ($) {

    //--------------------------------------------------------

    var DISABLED_CLASS = "disabled";
    var $this;

    /**
     * @class KSButton
     * @param option
     * @returns {$.fn.KSButton}
     * @constructor
     */
    $.fn.KSButton = function (option) {
        $this = $(this);
        //this._isEnabled = true;
        this.onClick = null;
        if (option && option.onClick) this.onClick = option.onClick;

        /**
         * マウスアップ
         */
        $(this).on("mouseup", $.proxy(function () {
            if (this.onClick)  this.onClick();
        }, this));

        /**
         * disabled切り替え
         *
         * @method setEnabled
         * @param isEnabled {boolean}  disabledにしたい場合はfalse
         */
        this.setEnabled = function (isEnabled) {
            if (isEnabled) {
                $(this).removeClass(DISABLED_CLASS);
            } else {
                $(this).addClass(DISABLED_CLASS);
            }
            //this._isEnabled= isEnabled
            return this
        };

        return this;
    }

})(jQuery);
