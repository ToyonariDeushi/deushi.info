/**
 * =================================================================================
 *
 * radio
 *
 * =================================================================================
 */
;
(function ($) {

    var RADIO_INPUT = "KSRadioInput";
    var DISABLED_CLASS = "disabled";

    /**
     * ラジオボタン用 (Jquery plugin)
     * @class KSRadioButton
     * @param option
     * @returns {$.fn.KSRadioButton}
     * @constructor
     */
    $.fn.KSRadioButton = function (option) {

        /**
         * チェックボックス変更された時に配信されるイベント
         * @event ON_CHANGE_EVENT
         */
        this.ON_CHANGE_EVENT = "ON_CHANGE_EVENT";

        this.isEnable = false;
        this._isChecked = false;

        if (!$(this).hasClass("KSRadioButton")) throw new Error("KSRadioButtonクラスに対して設定して下さい")
        this.inputTag = $(this).find("." + RADIO_INPUT);
        this._isChecked = this.inputTag.is(":checked");


        /**
         * onClickがあれば
         */
        if (option && option.onClick) this.onClick = option.onClick;

        /**
         * グループネームがあれば設定
         */
        if (option && option.groupName) {
            this.inputTag.attr("name", option.groupName)
        }

        /**
         * idがあればinputタグに設定
         */
        if (option && option.id) {
            this.inputTag.attr("id", option.id)
        }

        /**
         * クリックイベント
         */
        this.inputTag.bind("click", this, function (e) {
            var _this = e.data;
            _this.inputTag.prop('checked');
            _this._isChecked = _this.inputTag.prop('checked');
            _this.trigger("ON_CHANGE_EVENT");
            if (_this.onClick) _this.onClick(_this,_this._isChecked);
        });

        /**
         * checked 状態
         * @method setChecked
         * @param isChecked
         * @returns {$.fn.KSCheckBox}
         */
        this.setChecked = function (isChecked) {
            if (this.inputTag) this.inputTag.prop("checked", isChecked);
            this._isChecked = isChecked;
            return this;
        };

        /**
         * nameタグを設定
         * @param groupName
         */
        this.setGroupName = function (groupName) {
            this.inputTag.attr("name", groupName)
        };

        /**
         * checked状態を取得
         *
         * @method getChecked
         * @returns {boolean}
         */
        this.getChecked = function () {
            this._isChecked = this.inputTag.is(":checked");
            return this._isChecked;
        };

        /**
         * disabled切り替え
         * @method isEnable
         * @param isDisabled{boolean} disabledにしたい場合false
         */
        this.setEnable = function (isEnable) {
            if (!isEnable) {
                $(this).addClass(DISABLED_CLASS);
                if (this.inputTag) this.inputTag.attr("disabled", true);
            } else {
                $(this).removeClass(DISABLED_CLASS);
                if (this.inputTag) this.inputTag.removeAttr("disabled");
            }
            this.isEnable = isEnable;
            return this;
        };

        /**
         * inputのnameを取得
         * @returns {*}
         */
        this.getName = function(){
            return $(this).find("input").attr("name");
        };

        /**
         * valueの値を取得
         * @returns {*}
         */
        this.getValue = function(){
            return $(this).find("input").attr("value");
        };

        return (this);
    }
})(jQuery);


