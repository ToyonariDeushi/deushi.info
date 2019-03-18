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

//= include ./_util.js
//= include ./_resize.js
//= include ./form/_button.js
//= include ./form/_textarea.js
//= include ./form/_select.js
//= include ./form/_checkbox.js
//= include ./form/_radio.js
//= include ./form/_text-input.js
//= include ./form/_form-text.js
//= include ./form/_dropdown.js
//= include ./_header.js
//= include ./_table.js
//= include ./_date-selector.js
//= include ./_date-picker.js
//= include ./_tabs.js


KS.init();