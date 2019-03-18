"use strict";
var KS = KS || {};
KS = {
    config: {
        isSP: false
        , WIDTH_RESPONSIVE: 844
    }
    , ON_BREAK_POINT: "ON_BREAK_POINT"
    , ON_RE_LAYOUT: "ON_RE_LAYOUT"
    , ON_RESIZE: "ON_RESIZE"
    , $tabs: null
    , $tabsObj: null
    , $checkboxes: null
    , $selects: null
    , $tables: null

    , init: function (option) {

        this.$tabs = [];
        this.$tabsObj = {};
        this.$selects = [];
        this.$checkboxes = [];
        this.$tables = [];

        //if (option && !option.isResponsive) {
        //    console.log("responsive", option.isResponsive)
        //    this.config.isResponsive = false;
        //}
        /**
         * ========================================================================================
         * ページ内に有るタブ切り替え設定
         * ex) #tab1_cont2 が選択された状態にする場合
         *     var tab = KS.getTabById("YOUR_TAB_ID");
         *     tab.tabSwitch($("[href=#tab1_cont2]"));
         * ========================================================================================
         */
        var tabs = $(".KSTab");
        _.each(tabs, $.proxy(function (list) {
            var $tab = $(list).KSTab();
            this.$tabs.push($tab);
            //IDがあればkeyとして保持
            var id = $(list).attr("id");
            if (id) {
                this.$tabsObj[id] = $tab;
            }
        }, this));

        var selects = $(".KSSelect");
        _.each(selects, $.proxy(function (list) {
            var $select = $(list).KSSelect();
            this.$selects.push($select);
        }, this));

        var checkboxes = $(".KSCheckBox");
        _.each(checkboxes, $.proxy(function (list) {
            var $checkbox = $(list).KSCheckBox();
            this.$checkboxes.push($checkbox);
        }, this));

    }
    //タブをIDで取得
    , getTabById: function (id) {
        return _.find(this.$tabsObj, function (val, key) {
            return key == id;
        })
    }
};

/**
 * URLパラメータを取得
 * @method getURLParamsObject
 */
KS.getURLParamsObject = function () {
    var vars = null;
    var hash;
    var index = window.location.href.indexOf('?');
    if (index != -1) {
        vars = {};
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            if (hash[0] != "") vars[hash[0]] = decodeURI(hash[1]);
        }
    }
    return vars;
};
/**
 * URLパラメータをオブジェクト配列で取得
 * @method getURLParamArray
 */
KS.getURLParamArray =function(){
    var result ;
    var hash;
    var index = window.location.href.indexOf('?');
    if (index != -1) {
        result =[];
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            var obj = {};
            obj[hash[0]] =  decodeURI(hash[1]);
            result.push(obj);
        }
    }
    return result;
}

/**
 * objectをurl param形式にする
 *
 * @method convertObjectToURLParams
 * @param obj {Object}
 */
KS.convertObjectToURLParams = function (obj) {
    var param_str = null;
    if (obj != null && obj != undefined) {
        param_str = _.map(_.keys(obj).sort(), function (key) {
            return key + '=' + obj[key];
        }).join('&');
    }
    ;
    return param_str
}

/**
 * URLパラメータ形式stringをobjectに変換
 *
 * @method convertObjectByURLParam
 * @param query_str
 * @returns {*}
 */
KS.convertObjectByURLParam = function (query_str) {
    var obj;
    if (query_str) {
        obj = {}
        var hashes = query_str.split('&');
        for (var i = 0; i < hashes.length; i++) {
            var hash = hashes[i].split('=');
            if (hash[0] != "") obj[hash[0]] = hash[1];
        }
    }
    return obj;
};

/**
 * ゼロパディング。
 * 指定桁数になるように左側に0を埋めた数値文字列を返す
 *
 * @method zeroPadding
 * @param num {number} 数値
 * @param row  {number} 何桁にしたいか
 * @returns {string}
 */
KS.zeroPadding = function (num, row) {
    var len = String(num).length;
    var diff = row - len;
    if (diff <= 0) return String(num);
    var zeros = "";
    for (var i = 0; i < diff; i++) {
        zeros += "0"
    }
    return zeros + String(num)
};


/**
 * 改行や空白スペースを削除して空文字かどうかチェックする
 * @param str
 * @returns {boolean}
 */
KS.isEmpty = function (str) {
    if (!str) return true;
    var val = str;
    val = val.replace(/\n|\s+/g, "");
    return val == ""
}

/**
 * 特殊文字("<"と">")をHTMLエンティティに変換する
 * @param str
 */
KS.encodeHtmlSpecialChars = function (str) {
    if (!str) {
        return null
    }
    return str.replace(/[<>]/g, function ($0) {
        if ($0 == "<")  return '&lt;';
        if ($0 == ">")  return '&gt;';
    });
};

/**
 * 特殊なHTMLエンティティ("<"と">")を文字に戻す
 * @param str
 */
KS.decodeHtmlSpecialChars = function (str) {
    return str.replace(/&(gt|lt);/ig, function ($0, $1) {
        if (/^gt$/i.test($1))   return ">";
        if (/^lt$/i.test($1))   return "<";
    });
};


KS.UA = (function(u){
    return {
        Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1 && u.indexOf("tablet pc") == -1)
        || u.indexOf("ipad") != -1
        || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
        || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
        || u.indexOf("kindle") != -1
        || u.indexOf("silk") != -1
        || u.indexOf("playbook") != -1,
        Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
        || u.indexOf("iphone") != -1
        || u.indexOf("ipod") != -1
        || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
        || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
        || u.indexOf("blackberry") != -1
    }
})(window.navigator.userAgent.toLowerCase());
/**
 * ----------------------------------------------------------------------------------------
 * リサイズ関連
 * ----------------------------------------------------------------------------------------
 */
$(document).ready($.proxy(function () {
    this.resize();
}, KS));

$(window).resize($.proxy(function () {
    this.resize();
}, KS));

/**
 * ========================================================================================
 * リサイズ
 * ========================================================================================
 */
KS.resize = function () {
    //if (KS.config.isResponsive) {
        var w = window.innerWidth;
        $("body").trigger(this.ON_RESIZE);
        if (w > this.config.WIDTH_RESPONSIVE) {
            //PC
            if (this.config.isSP) {
                //メディアクエリレイアウト変更イベント
                this.config.isSP = false;
                $("body").trigger(this.ON_BREAK_POINT, this.config.isSP);
            }
        } else {
            //SP
            if (!this.config.isSP) {
                //メディアクエリレイアウト変更イベント
                this.config.isSP = true;
                $("body").trigger(this.ON_BREAK_POINT, this.config.isSP);
            }
        //}
    }
};

KS.resize();

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



/**
 * =================================================================================
 *
 * dropdown
 * 
 *  <label class="KSDropdown">
 *      <div class="KSDropdown_inner">
 *          <div class="KDDropdown_button">ボタン</div>
 *          <select class="KSDropdown_select" name="xxxxxx">
 *              <option value="">default</option>
 *          </select>
 *      </div>
 *  </label>    
 *
 * =================================================================================
 */
// ; (function ($) {

//     var DROP_DOWN_INNER = "KSDropdown_inner";
//     var DROP_DOWN_BUTTON_CLASS = "KSDropdown_button";
//     var DROP_DOWN_CLASS = "KSDropdown_dropdown";
//     var DROP_DOWN_ITEM_CLASS = "KSDropdown_dropdown_item";
//     var DISABLED_CLASS = "disabled";
//     /**
//      * セレクトをDropdown化する (Jquery plugin)
//      * @class KSDropdown
//      * @param option
//      * @returns {$.fn.KSDropdown}
//      * @constructor
//      */
//     $.fn.KSDrowdown = function (option) {

//         this.$el = $(this);
//         this.isOpen = false;
//         this.$inner = this.$el.find("." + DROP_DOWN_INNER);
//         this.$select = this.$el.find("select");
//         this.$button
//         this.$dropdown;
//         this.onClick_handler = null;
//         this.onChange_handler = null;
//         if (option && option.onChange) this.onChange_handler = option.onChange;
//         if (option && option.onClick) this.onClick_handler = option.onClick;

//         /**
//          * 初期化
//          */
//         this.init = function () {

//             //----------------------------
//             //ボタン設定
//             //----------------------------
//             this.$inner.append("<div class='" + DROP_DOWN_BUTTON_CLASS + "'>");
//             this.$button = this.$el.find("." + DROP_DOWN_BUTTON_CLASS);
//             this.$button.on("click", function () {
//                 if (!this.isOpen) {
//                     this.open();
//                 } else {
//                     this.close();
//                 }
//             }.bind(this));

//             //----------------------------
//             //動的にhtmlドロップダウンリスト作成
//             //----------------------------
//             this.createDropdown();

//             //----------------------------
//             //リスト以外クリック設定
//             //----------------------------
//             $(window).on("click", function (e) {
//                 var find = $(e.target).closest(".KSDropdown");
//                 var isListClick = find.length;
//                 if (isListClick == 0) {
//                     // console.log('リスト以外クリック設定');
//                     //閉じる
//                     this.close();
//                 } else {
//                     var isSelf = ($(find)[0] == this.$el[0])
//                     // console.log('isSelf',isSelf);
//                     if (!isSelf) {
//                         //TODO 未テスト
//                         //自身以外のdropdownがクリックされたら閉じる
//                         this.close();
//                     }

//                 }
//             }.bind(this))

//             //----------------------------
//             //最初の選択状態をセット
//             //----------------------------
//             this.selectByValue(this.getValue(), true);

//             /**
//              * リストクリックチェンジ
//              */
//             this.$select.bind("change", function (e) {
//                 console.log('select changed');
//             }.bind(this));
//         }


//         /**
//          * ドロップダウンを作成
//          * TODO 未テスト
//          */
//         this.createDropdown = function () {
//             if (this.$dropdown) {
//                 //あれば消す
//                 this.$dropdown.off("click", this.onClickDropdownItem)
//                 $("." + DROP_DOWN_CLASS).delete();
//                 this.$dropdown = null;
//             }
//             this.$inner.append("<ul class='" + DROP_DOWN_CLASS + "'>");
//             this.$dropdown = this.$el.find("." + DROP_DOWN_CLASS);
//             _.each(this.$el.find("option"), function (opt, i) {
//                 var $opt = $(opt);
//                 this.$el.find(".KSDropdown_dropdown").append("<li class='" + DROP_DOWN_ITEM_CLASS + "' data-value=" + $opt.attr("value") + ">" + $opt.html() + "</li>");
//             }.bind(this));

//             //----------------------------
//             //リストクリック設定
//             //----------------------------
//             this.$dropdown.on("click", this.onClickDropdownItem.bind(this));
//         }

//         this.onClickDropdownItem = function (e) {
//             var value = $(e.target).data("value");
//             this.selectByValue(value);
//             e.preventDefault();
//         }

//         /**
//         * selectのnameを取得
//         * @returns {*}
//         */
//         this.getName = function () {
//             return this.$select.attr("name");
//         };


//         /**
//         * valueにより選択状態にする
//         * @param {*} value 
//         */
//         this.selectByValue = function (value, isSirent) {
//             if (value != undefined) {
//                 console.log("onChange_handler", value)
//                 this.changeButtonTextByValue(value);
//                 this.selectHtmlDropDownByValue(value);
//                 this.selectOptionByValue(value);
//                 if (this.onChange_handler && !isSirent) this.onChange_handler(value);
//             }
//             this.close();
//         }

//         /**
//         * valueによってボタンのテキストを変更
//         * @param {*} value 
//         */
//         this.changeButtonTextByValue = function (value) {
//             var find = _.find(this.$el.find("." + DROP_DOWN_ITEM_CLASS), function (item) {
//                 return value == $(item).data("value");
//             }.bind(this));
//             this.$button.html($(find).html());
//         }

//         /**
//          * 動的にhtmlで作成したドロップダウンの カレントを変更
//          */
//         this.selectHtmlDropDownByValue = function (value) {
//             _.each(this.$el.find("." + DROP_DOWN_ITEM_CLASS), function (item) {
//                 var targetValue = $(item).data("value");
//                 if (targetValue == value) {
//                     $(item).addClass("js-current");
//                 } else {
//                     $(item).removeClass("js-current");
//                 }
//             }.bind(this));
//         }

//         /**
//          * dropdown開く
//          */
//         this.open = function () {
//             if (!this.isOpen) {
//                 // console.log('[open]');
//                 this.isOpen = true;
//                 this.$el.addClass("js-open");
//                 this.$dropdown.css("top", this.$button.outerHeight());
//                 this.$dropdown.hide();
//                 this.$dropdown.slideToggle(200);
//             }
//         }

//         /**
//          * dropdown閉じる
//          */
//         this.close = function () {
//             if (this.isOpen) {
//                 // console.log('[close]');
//                 this.isOpen = false;
//                 this.$el.removeClass("js-open");
//                 this.$dropdown.slideToggle(200);
//             }
//         }

//         /**
//          * selectに、optionタグ追加
//          * @method addList
//          * @param val {string} optionタグのvalue
//          * @param name {string} optionタグの中身
//          * @param prepend {boolean} trueだとリストの前に追加
//          * @return 追加されたoption要素
//          */
//         this.addList = function (val, name, prepend) {
//             var pre = prepend || false;
//             if (pre) {
//                 this.$select.prepend("<option value=" + val + ">" + name + "</option>");
//                 return $(this).find("option")[0]
//             } else {
//                 this.$select.append("<option value=" + val + ">" + name + "</option>");
//                 var options = $(this).find("option");
//                 return options[options.length - 1]
//             }
//             this.createDropdown();
//         };

//         /**
//          * 選択されている値を返す
//          *  @method getValue
//          * @returns {*}
//          */
//         this.getValue = function () {
//             if (this.$select) return this.$select.val();
//             else return null
//         };

//         /**
//          * 選択されているindexを返す
//          * @method getSelectedIndex
//          * @returns {*}
//          */
//         // this.getSelectedIndex = function () {
//         //     if (this.$select.get(0)) return this.$select.get(0).selectedIndex;
//         // };

//         /**
//          * 指定したvalueのoptionを選択状態にする
//          * optionリスト内にvalueが存在しなければなにもしない
//          * @method selectOptionByValue
//          * @param val {string}
//          */
//         this.selectOptionByValue = function (val, option) {
//             var valArray = [];
//             var options = this.$select.children();

//             for (var i = 0; i < options.length; i++) {
//                 valArray.push(options.eq(i).val());
//             }
//             if (valArray.indexOf(val) != -1) {
//                 this.$select.val(val);
//                 var isSilent = (option && option.silent);
//                 if (!isSilent) {
//                     if (this.onChange) this.onChange(this.getValue());
//                 }
//                 return true;
//             } else {
//                 return false
//             }
//         };

//         this.init();
//         return (this);
//     }
// })(jQuery);



$(function () {

    this.isActive = false;
    this.activeClass = "isActive";

    //ハンバーガー
    this.HamburgerButton = ".HamburgerButton";
    this.GlobalMenuArea = ".GlobalMenuArea";
    this.GlobalMenuList = ".GlobalMenuList";

    //検索
    this.SearchButton = ".SearchButton";
    this.SearchFloat = ".SearchArea_header";
    this.SearchFloat_inner = ".SearchArea_inner";

    /**
     * フロート開閉
     */
    this.onChangeActive = function (target) {
        //ターゲットがあれば開く
        switch (target) {
            case "search":
                if (!$(this.SearchFloat).hasClass(this.activeClass)) {
                    $(this.SearchButton).addClass(this.activeClass);
                    $(this.SearchFloat).addClass(this.activeClass);
                    $(this.SearchFloat).css("height", $("body").innerHeight()-$(".Header").outerHeight())
                } else {
                    this.closeFloats();
                }
                break;
            case "hamburger":
                if (!$(this.HamburgerButton).hasClass(this.activeClass)) {
                    $(this.HamburgerButton).addClass(this.activeClass);
                    $(this.GlobalMenuArea).addClass(this.activeClass);
                } else {
                    this.closeFloats();
                }
                break;
            default :
                this.closeFloats();
        }
    };

    /**
     * すべて閉じる
     */
    this.closeFloats = function () {
        $(this.SearchButton).removeClass(this.activeClass);
        $(this.HamburgerButton).removeClass(this.activeClass);
        $(this.GlobalMenuArea).removeClass(this.activeClass);
        $(this.SearchFloat).removeClass(this.activeClass);
    }

    /**
     * SPとPCのレイアウト切り替わりタイミングで閉じる
     */
    $("body").on(KS.ON_BREAK_POINT, $.proxy(function (e, isSP) {
        this.isActive = false;
        this.closeFloats();
    }, this));

    //-----------------------------------------
    // ハンバーガー関連
    //-----------------------------------------
    /**
     * ハンバーガークリック設定
     */
    $(this.HamburgerButton).on("click", $.proxy(function () {
        this.isActive = !this.isActive;
        this.onChangeActive("hamburger");
    }, this));

    /**
     * 背景がクリックされたら閉じる
     */
    $(this.GlobalMenuArea).on("click", $.proxy(function () {
        this.isActive = false;
        this.closeFloats();
    }, this));

    /**
     * フロート内がクリックされても閉じないようにする
     */
    $(this.GlobalMenuList).on("click", $.proxy(function (e) {
        e.stopPropagation();
    }, this));

    //-----------------------------------------
    // 検索関連
    //-----------------------------------------
    $(this.SearchButton).on("click", $.proxy(function () {
        this.isActive = !this.isActive;
        this.onChangeActive("search");
    }, this));

    /**
     * 背景がクリックされたら閉じる
     */
    $(this.SearchFloat).on("click", $.proxy(function () {
        this.isActive = false;
        this.closeFloats();
    }, this));

    /**
     * フロート内がクリックされても閉じないようにする
     */
    $(this.SearchFloat_inner).on("click", $.proxy(function (e) {
        e.stopPropagation();
    }, this));


});

/**
 * ----------------------------------------------------------------------------------------
 * @module テーブル
 * ----------------------------------------------------------------------------------------
 */

(function ($) {

    /**
     * テーブル
     */
    $.fn.KSTable = function (option) {

        //if (!$(this).get(0)) {
        //    console.error("ERROR KSTable");
        //    return
        //}
        //
        ///**
        // * タブ初期化
        // */
        //this.init = function () {
        //    /**
        //     * --------------------------------------------------------
        //     * スクロール化
        //     * --------------------------------------------------------
        //     */
        //    if ($(this).find("KSTable")) {
        //        $(this).find("KSTable").css("width", "600px");
        //        console.log("スクロール化")
        //        new IScroll($(this), {
        //            scrollX: true
        //            , scrollY: false
        //            , click: true
        //            , resizeScrollbars: true
        //            //, scrollbars: 'custom'
        //        });
        //    }
        //};
        //
        ///**
        // * 初期化
        // */
        //this.init();
        //
        //return (this);
    }
})(jQuery);


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



KS.init();

var PTC = PTC || {};
PTC.API_DOMAIN = "";
PTC.SERVER_TIME="";
PTC.API_EVENT_DOMAIN ="";
//開発時API
if (location.href.indexOf("localhost") != -1) {
    PTC.API_DOMAIN = "http://staging.pokemon-card.com";
    PTC.API_EVENT_DOMAIN = "http://localhost:"+location.port;
}

/**
 * グローバルメニューにカレントを当てる
 */
PTC.setCurrentGlobalMenu = function () {
    //第二回層で判定
    var categoryList = ["about", "rules", "products",  "event", "https://map.pokemon-card.com/", "card-search", "deck"];
    // var categoryList = ["products", "https://map.pokemon-card.com/", "calendar", "card-search", "event", "rules", "about", "deck"];
    var href = location.href;
    var category = href.split(location.host)[1].split("/")[1];
    //console.log("category " + category)
    _.each(categoryList, $.proxy(function (val, index) {
        //console.log(val, index)
        if (val == category) {
            var targetList = $(".GlobalMenuList_item")[index];
            $(targetList).addClass("current");
            return;
        }
    }, this));
};

/**
 * 指定ターゲットまでスクロール
 * @param $target
 */
PTC.scrollTo = function (ypos, $target) {
    var pos = ypos | 0;
    if ($target && $target.offset()) pos = $target.offset().top;
    $("html,body").animate({scrollTop: pos}, {duration: 'fast', easing: 'swing'});
};

/**
 * 外部ドメインリンクとPDFにtarget blankを設定する
 */
PTC.setBlankLink = function () {
    _.each($("a"), function (a, b) {
        if (!$(a)) return;
        var href = $(a).attr("href");
        if (!href) return;
        //PDFなら
        if (href.indexOf(".pdf") != -1 || href.indexOf(".PDF") != -1) {
            $(a).attr("target", "_blank");
            //console.log("add blank", href)
        }
        //外部ドメインなら
        if (href.slice(0, 4) == "http" && href.indexOf(location.host) == -1) {
            $(a).attr("target", "_blank");
            //console.log("add blank", href)
        }
    })
};

/**
 * 画像プリロード
 * @param image_path
 */
PTC.preLoad = function (image_path) {
    $("<img>").attr("src", image_path);
};

/**
 * カード詳細ポップアップをセット
 * .popup-card-detailクラスがついているリンクを別ウィンで開くように設定する
 */
// PTC.setCardDetailPopupWindow = function (width, height) {
//     var w = width | 780;
//     var h = height | 700;
//     $('.popup-card-detail').on("click", function () {
//         window.open(this.href, '_blank', 'width=' + w + ',height=' + h + ',resizable=yes,scrollbars=yes,menubar=no,toolbar=no');
//         return false;
//     });
// };

/**
 * モーダルウィンドウを閉じる
 */
PTC.closeModalWindow = function () {
    $("#ModalArea").remove();
};


/**
 * js-linkクラスがついているものをリンク化する
 * @type {*}
 */
PTC.setJsLink = $.proxy(function(){
    $('.js-link').on('click', function(e){
        //伝播をストップ
        e.stopPropagation();
        e.preventDefault();

        //リンクを取得して飛ばす
        location.href = $(this).attr('data-url');
    })
},this);

/**
 * HTMLエスケープ
 * @param {*} string 
 */
PTC.escapeHtml=function (string) {
    if(typeof string !== 'string') {
      return string;
    }
    return string.replace(/[&'`"<>]/g, function(match) {
      return {
        '&': '&amp;',
        "'": '&#x27;',
        '`': '&#x60;',
        '"': '&quot;',
        '<': '&lt;',
        '>': '&gt;',
      }[match]
    });
}
  
//----------------------------------------------
// トップページの PICKUP エリアの VIDEO MODAL 表示
//----------------------------------------------
// const videoContainer   = document.querySelector('.js-video-container');
// const videoModalCloseButton   = document.querySelector('.js-close-modal');

// const toggleVideoModal = () => {
//     const videoModal   = document.querySelector('.js-video-modal');
//     const videoPlayer   = document.querySelector('#js-youtube-player');
//     let hasModalClassName = videoModal.classList.contains('js-show-modal');
//     if (!hasModalClassName) {
//         videoModal.classList.add('js-show-modal');
//       } else {
//         videoModal.classList.remove('js-show-modal');
//         if ( videoPlayer ) {
//           let iframeSrc = videoPlayer.src;
//           videoPlayer.src = iframeSrc;
//         }
//     }
// }

// videoContainer.addEventListener('click', toggleVideoModal);
// videoModalCloseButton.addEventListener('click', toggleVideoModal);


// const changeLabelColor = () => {
//   const tags = document.querySelectorAll(".Calendar_Label");
//   tags.forEach(tag => {
//       if (tag.innerHTML === "商品") {
//           tag.style.backgroundColor = "#FE2501";
//       }	else if (tag.innerHTML === "コラム") {
//           tag.style.backgroundColor = "#FEBF02";
//       }	else if (tag.innerHTML === "キャンペーン") {
//           tag.style.backgroundColor = "#027C00";
//       }	else if (tag.innerHTML === "イベント") {
//           tag.style.backgroundColor = "#102CE2";
//       }
//   });
// }

// changeLabelColor();

/**
 * 初期化
 */
PTC.setBlankLink();
PTC.setCurrentGlobalMenu();
