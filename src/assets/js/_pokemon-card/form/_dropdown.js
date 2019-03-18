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


