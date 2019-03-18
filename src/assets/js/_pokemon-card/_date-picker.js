/**
 * =================================================================================
 *
 * datepicker
 *
 * =================================================================================
 */
/**
 * @module ks-component form
 */
;(function($){

    var FORM_TEXT             = "KSFormText";
    var INPUT_TEXT_CLASS      = "KSDatePicker_text";
    var INVALID_MESSAGE_CLASS = "KSForm_InvalidMessage";
    var DISABLED_CLASS        = "disabled";

    /**
     * 日付選択用  (Jquery plugin) Jquery UI 必須
     *
     * @class KSDatePicker
     * @param option
     * @returns {$.fn.KSDatePicker}
     * @constructor
     */
    $.fn.KSDatePicker = function (option) {

        if (!$(this).hasClass("KSDatePicker")) throw new Error("KSDatePickerクラスに対して設定して下さい");

        /**
         * クリックイベント名
         * @event ON_CLICK_EVENT
         */
        this.ON_CLICK_EVENT = "ON_CLICK_EVENT";

        /**
         * 変更イベント名
         * @event ON_CHANGE_EVENT
         */
        this.ON_CHANGE_EVENT = "ON_CHANGE_EVENT";

        /**
         * datepickerクローズイベント名
         * @event ON_CLOSE_DATE_PICKER
         */
        this.ON_CLOSE_DATE_PICKER = "ON_CLOSE_DATE_PICKER";
        this.ON_SELECT_DATE_PICKER = "ON_SELECT_DATE_PICKER";

        var formText = $(this).find("." + FORM_TEXT);
        this.input = $(this).find("." + INPUT_TEXT_CLASS);
        this.alert = $(this).find("." + INVALID_MESSAGE_CLASS);
        this.alert.hide();
        this._isInvalid = false;
        if (option && option.onChange) this.onChange = option.onChange;

        //-------------------------------------------------------
        // placeholderセット TODO クッキーで設定できるようにするか？
        //------------------------------------------------------
        this.dataFormat  ="yy/mm/dd";
        // this.input.attr("placeholder","yy"+this.dataFormat);

        //------------------------------------------------------
        //日本語化
        //------------------------------------------------------
        var ja = {
            closeText: "閉じる",
            prevText: "前",
            nextText: "次",
            currentText: "今日",
            monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            monthNamesShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            dayNames: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
            dayNamesShort: ["日", "月", "火", "水", "木", "金", "土"],
            dayNamesMin: ["日", "月", "火", "水", "木", "金", "土"],
            weekHeader: "週",
            dateFormat: this.dataFormat,
            firstDay: 0,
            isRTL: false,
            showMonthAfterYear: true,
            yearSuffix: "年"
        };
        //TODO サーバーに上げると何故かここがエラる
        //jQuery.datepicker.setDefaults(ja);

        var initObj = {
            dateFormat:this.dataFormat
            , onClose: $.proxy(function () {
                this.trigger(this.ON_CLOSE_DATE_PICKER);
            }, this)
            , onSelect: $.proxy(function () {
                //DatePickerが選択された際に実行
                this.trigger(this.ON_SELECT_DATE_PICKER);
                if (this.onChange)this.onChange()
            }, this)
            //, onChangeMonthYear: $.proxy(function () {
            //    //月や年移動をした際に実行
            //}, this)
            , beforeShow: $.proxy(function (input, inst) {
                //DatePickerが表示される直前に実行
                //中央表示にする
                var inputW = $(input).outerWidth();
                var divW = $(inst.dpDiv).outerWidth();
                var offsetLeft = (divW - inputW) / 2;
                inst.dpDiv.css({marginLeft: -offsetLeft + 'px'});
            }, this)
            //,minDate: 1//今日より前の日を選択不可
        };

        initObj = _.extend({},initObj,ja)
        if(option){
            initObj = _.extend({},initObj,option)
        }

        /**
         * Jquery UI datepicker利用
         */
        this.$datePicker = this.input.datepicker(initObj);

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
            var dateText = this.year + "-" + KS.zeroPadding(this.month, 2) + "-" + KS.zeroPadding(this.day, 2);
            //TODO フォーマット変えられるようにするかどうか
            this.input.datepicker("setDate", dateText);
            return this;
        };

        /**
         * UnixTimestampからセットする
         * @param unixtimestamp
         */
        //this.setUnixTime = function (unixtimestamp) {
        //    var date = new Date(unixtimestamp * 1000);
        //    var m = moment(date)
        //    var result = m.format("YYYY/MM/DD")
        //    //TODO フォーマット変えられるようにするかどうか
        //    this.input.datepicker("setDate", result);
        //};


        this.hide = function () { 
            this.input.datepicker("hide");
        }

        /**
         * 最小日を設定
         * @param {*} date 
         */
        this.setMinDate = function (date) { 
            this.input.datepicker( "option", "minDate", date );
        }

        /**
         * テキスト変更イベント
         */
        this.input[0].addEventListener("input", $.proxy(function (event) {
            //console.log("> ", event, this.ON_CHANGE_EVENT);
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
         * isEmpty ゲッター
         */
        this.isEmpty = function () {
            var val = this.getValue();
            val = val.replace(/\n/g, "");
            return val == ""
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
         * Dateオブジェクト取得
         *
         * @method getDate
         * @returns {*}
         */
        this.getDate = function(){
            return this.$datePicker.datepicker( 'getDate' );
        };

        /**
         * Date設定
         *
         * @method setDate
         * @param date
         * @returns {*}
         */
        this.setDate = function(date){
            return this.$datePicker.datepicker( 'setDate' ,date);
        };

        /**
         * disabled切り替え
         *
         * @method setDisabled
         * @param isDisabled{boolean}
         */
        this.setDisabled = function (isDisabled) {

            if (isDisabled) {
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

        return this;
    }
})(jQuery);


