/**
 * =================================================================================
 *
 * select
 *
 * =================================================================================
 */
;(function($){

    var FORM_TEXT         = "KSFormText";
    var SELECT_TEXT_CLASS = "KSSelect_text";
    var DISABLED_CLASS    = "disabled";

    /**
     * セレクト用 (Jquery plugin)
     * @class KSSelect
     * @param option
     * @returns {$.fn.KSSelect}
     * @constructor
     */
    $.fn.KSSelect = function(option){

        /**
         * セレクトが変更された時に配信されるイベント
         * @event ON_CHANGE_EVENT
         */
        this.ON_CHANGE_EVENT = "ON_CHANGE_EVENT";

        this.selectText = $(this).find("." + SELECT_TEXT_CLASS);
        this.formText = $(this).find("." + FORM_TEXT);
        this.indicator = $(this).find(".indicator");
        this.onChange = null;
        if(option && option.onChange) this.onChange = option.onChange;

        /**
         * change event
         */
        this.selectText.bind("change", this, function (e) {
            var self = e.data;
            self.trigger(self.ON_CHANGE_EVENT);
            if(self.onChange) self.onChange(self.getValue());
        });

        /**
         * リスト消去
         * @method clearList
         */
        this.clearList = function () {
            this.selectText.empty();
        };

        /**
         * selectに、optionタグ追加
         * @method addList
         * @param val {string} optionタグのvalue
         * @param name {string} optionタグの中身
         * @param prepend {boolean} trueだとリストの前に追加
         * @return 追加されたoption要素
         */
        this.addList = function (val, name, prepend) {
            var pre = prepend || false;
            if (pre) {
                 this.selectText.prepend("<option value=" + val + ">" + name + "</option>");
                return $(this).find("option")[0]
            } else {
                this.selectText.append("<option value=" + val + ">" + name + "</option>");
                var options =  $(this).find("option");
                return options[options.length -1]
            }
        };

        /**
         * 選択されている値を返す
         *  @method getValue
         * @returns {*}
         */
        this.getValue = function () {
            if (this.selectText) return this.selectText.val();
            else return null
        };

        /**
         * 選択されているindexを返す
         * @method getSelectedIndex
         * @returns {*}
         */
        this.getSelectedIndex = function () {
            if (this.selectText.get(0)) return this.selectText.get(0).selectedIndex;
        };

        /**
         * 指定したvalueのoptionを選択状態にする
         * optionリスト内にvalueが存在しなければなにもしない
         * @method selectByValue
         * @param val {string}
         */
        this.selectByValue = function (val, option) {
            var valArray = [];
            var options = this.selectText.children();
            for (var i = 0; i < options.length; i++) {
                valArray.push(options.eq(i).val());
            }
            if (valArray.indexOf(val) != -1) {
                this.selectText.val(val);
                var isSilent = (option && option.silent);
                if (!isSilent) {
                    this.trigger(this.ON_CHANGE_EVENT);
                    if (this.onChange) this.onChange(this.getValue());
                }
                return true;
            } else {
                return false
            }
        };

        /**
         * disabled切り替え
         * @method setEnabled
         */
        this.setEnabled = function (isEnabled) {
            if (isEnabled) {
                if (this) this.removeClass(DISABLED_CLASS);
                if (this.formText)   this.formText.removeClass(DISABLED_CLASS);
                if (this.selectText) this.selectText.removeClass(DISABLED_CLASS);
                if (this.selectText) this.selectText.attr(DISABLED_CLASS, false);
            } else {
                if (this) this.addClass(DISABLED_CLASS);
                if (this.formText)  this.formText.addClass(DISABLED_CLASS);
                if (this.selectText)this.selectText.addClass(DISABLED_CLASS);
                if (this.selectText)this.selectText.attr(DISABLED_CLASS, true);
            }
            return this;
        };

        /**
         * インジケータ表示切替
         * @param isShow
         */
        this.showIndicator = function (isShow) {
            if (this.indicator) {
                if (isShow) {
                    this.indicator.show();
                } else {
                    this.indicator.hide();
                }
            }
        };

        /**
         * アラートモード
         * @param isAlert
         */
        this.setAlert = function (isAlert) {
            if (isAlert) {
                if (this) this.addClass("alert");
            } else {
                if (this) this.removeClass("alert");
            }
        };

        /**
         * selectのnameを取得
         * @returns {*}
         */
        this.getName = function(){
            return $(this).find("select").attr("name");
        };

        return (this);
    }
})(jQuery);


