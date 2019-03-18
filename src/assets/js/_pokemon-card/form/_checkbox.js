
/**
 * =================================================================================
 *
 * checkbox
 *
 * =================================================================================
 */
;(function($){

    var CHECK_INPUT    = "KSCheckBoxInput";
    var DISABLED_CLASS = "disabled";

    /**
     * チェックボックス用 (Jquery plugin)
     * @class KSCheckBox
     * @param option
     * @returns {$.fn.KSCheckBox}
     * @constructor
     */
    $.fn.KSCheckBox = function (option) {

        /**
         * チェックイベント
         * @type ON_CLICK
         */
        this.ON_CLICK ="ON_CLICK";

        this.isEnabled = true;
        this._isChecked = false;

        if (!$(this).hasClass("KSCheckBox")) throw new Error("KSCheckBoxクラスに対して設定して下さい");
        this.inputTag = $(this).find("." + CHECK_INPUT);
        this._isChecked =  this.inputTag.is(":checked");
        if(option && option.onClick) this.onClick = option.onClick;

        /**
         * クリックイベント
         */
        this.inputTag.bind("click", this, function (e) {
            var _this = e.data;
            if (!_this.isEnabled) return;
            _this.inputTag.prop('checked');
            _this._isChecked = _this.inputTag.prop('checked');
            _this.trigger("ON_CLICK");
            if(_this.onClick) _this.onClick(_this,_this._isChecked);
        });

        /**
         * checked 状態
         * @param isChecked
         * @returns {$.fn.KSCheckBox}
         */
        this.setChecked = function (isChecked,isSilent) {
            if ( this.inputTag) this.inputTag.prop("checked", isChecked);
            this._isChecked = isChecked;
            if(!isSilent&& this.onClick) this.onClick(this, this._isChecked);
            return this;
        };

        this.getChecked = function () {
            this._isChecked = this.inputTag.is(":checked");
            return this._isChecked;
        };

        /**
         * disabled切り替え
         *
         * @method setEnabled
         * @param isEnabled{boolean} disabledにしたい場合false
         */
        this.setEnabled = function (isEnabled) {
            if (isEnabled) {
                $(this).removeClass(DISABLED_CLASS);
                if (this.inputTag) this.inputTag.removeAttr("disabled");
            } else {
                $(this).addClass(DISABLED_CLASS);
                if (this.inputTag) this.inputTag.attr("disabled", true);
            }
            this.isEnabled = isEnabled;
            return this;
        };

        /**
         * Indeterminate状態切り替え
         *
         * @param isIndeterminate {boolean}
         */
        this.setIndeterminate = function (isIndeterminate) {
            this.inputTag.prop("indeterminate", isIndeterminate);
            if(this.onClick) this.onClick(this, this._isChecked);
        };

        /**
         * inputのname属性を取得
         */
        this.getName = function(){
            return $(this).find("input").attr("name");
        };

        this.show = function(){
            //console.log("show")
            $(this).show();
        }
        this.hide = function(){
            //console.log("hide")
            $(this).hide();
        }
        return (this);
    }
})(jQuery);
