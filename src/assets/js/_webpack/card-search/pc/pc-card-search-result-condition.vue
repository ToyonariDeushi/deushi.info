<template>
    <div>
        <ks-slide-up-down :active="list.length>0">
            <div class="search-condition-area">
                <div class="search-condition-header">
                    <div class="title">絞り込み条件</div>
                </div>
                <div class="search-condition-body">
                    <ul class="search-condition-list">
                        <!-- <transition-group tag="ul" class="search-condition-list" name="vue-anime-list"> -->
                        <li v-for="item in list">
                            <div class="tag" @click.stop="onClickTag(item)">
                                {{item.label}}
                            </div>
                        </li>
                        <!-- </transition-group> -->
                    </ul>
                </div>
                <div class="clear-button-area">
                    <div class="clear-button" @click="onClearClick">
                        条件クリア
                    </div>
                </div>
            </div>
        </ks-slide-up-down>
    </div>
</template>
<style>
    .search-condition-area {
        display: none;
        display: flex;
        font-size: 12px;
        margin-bottom: 20px;

        &.js-show {
            display: flex;
        }

        .title {
            white-space: nowrap;
            margin-right: 24px;
            padding: 0 10px;
            display: block;
            background-color: #AAA;
            color: #fff;
            font-size: 10px;
            font-weight: bold;
            position: relative;
            line-height: 24px;
            height: 24px;

            &:after {
                content: "";
                position: absolute;
                top: 0;
                right: -12px;
                width: 0;
                height: 0;
                border-left: 12px solid #aaa;
                border-top: 12px solid transparent;
                border-bottom: 12px solid transparent;
            }
        }
    }

    @mixin clearFix() {

        &:before,
        &:after {
            content: "";
            display: table;
            clear: both;
        }
    }

    .search-condition-list {
        @include clearFix;

        li {
            float: left;
            margin: 0 4px 6px 0;

            .tag {
                cursor: pointer;
                font-weight: bold;
                display: inline-block;
                background-color: #EBEBEB;
                padding: 4px 30px 4px 10px;
                position: relative;
                font-size: 9px;
                color: #333;
                letter-spacing: -1px;

                &:after {
                    font-family: "pokemoncard-font";
                    content: "\F803";
                    position: absolute;
                    top: 50%;
                    color: #333;
                    right: 10px;
                    font-size: 1em;
                    width: 1em;
                    height: 1em;
                    transform: translateY(-50%);
                    transition: transform .1s ease-out;
                }

                &:hover {
                    background-color: #ddd;
                    text-decoration: none;
                    color: #999;
                    transition: background-color .1s ease-in;
                    transition: transform .1s ease-out;

                    &:after {
                        color: #000;
                        transform: translate(0, -50%) rotate(90deg);
                        transition: transform .1s ease-out;
                    }
                }
            }
        }
    }

    .clear-button-area {
        margin-left: auto;
        font-weight: bold;
        font-size: 11px;

        .clear-button {
            padding: 4px 8px;
            box-sizing: border-box;
            border-radius: 4px;
            border: solid 1px #ddd;
            cursor: pointer;
            white-space: nowrap;

            &:hover {
                box-sizing: border-box;
                transition: background-color .1s ease-out;
                background-color: #ebebeb;
            }
        }
    }
</style>
<script>
    import Vue from "vue";
    import KSSlideUpDown from '_components/ks-slide-up-down';
    export default {
        data() {
            return {
                request: null,
                list: [],
                reqestTimer: null,
                isCreated: false
            }
        },
        created() {
            // console.log("[created]")
            this.isCreated = true;
            PTC.cardSearchStart_handlers.push(this.onSearchStart_handler.bind(this))
            PTC.cardSearchEnd_handlers.push(this.onSearchEnd_handler.bind(this))
        },
        watch: {
            request:function() {
                this.createUi();
            }
        },
        methods: {
            //オールクリア
            onClearClick() {
                _.each(this.list, function (item) {
                    //クリア
                    this.clear(item)
                }.bind(this));
                this.requestStart();
            },
            //クリック
            onClickTag(item) {
                console.log("clear", item)
                this.clear(item);
                this.$nextTick(function () {
                this.requestStart();
                }.bind(this))
            },

            clear(item) {
                // console.log('item', item);
                switch (item.key) {
                    case "regulation_sidebar_form":
                        Vue.set(window.vueApp.initData, item.key, "all");
                        break;
                    case "sc_hp_s":
                    case "sc_hp_e":
                    case "sc_run_away_e":
                    case "se_ta":
                    case "pg":
                    case "keyword":
                    case "illust":
                        Vue.set(window.vueApp.initData, item.key, "");
                        break;
                    case "sc_run_away_s"://逃げるエネルギー下限
                        Vue.set(window.vueApp.initData, item.key, "0");
                        break;
                    default:
                        Vue.set(window.vueApp.initData, item.key, 0);
                }
            },

            requestStart() {
                // console.log("[requestStart]")
                //TODO 遅らせずにやる方法はないか？
                if (this.reqestTimer) {
                    clearInterval(this.reqestTimer);
                    this.reqestTimer = null;
                }
                // console.log("dddd")
                this.reqestTimer = setTimeout(
                    function () {
                        PTC.searchRequest();
                    }.bind(this), 30
                )
            },
            onSearchStart_handler(req) {
                console.log('【req】', req);
                this.request = req;
                this.createUi();
            },
            onSearchEnd_handler() {
                console.log('end');
                // this.createUi();
            },
            createUi() {
                // this.list = [];
                var preList = [];
                //タグを生成
                _.each(this.request, function (param, key) {
                    // console.log('--',param,"/",key);

                    var ui;
                    var value = this.$root.getDataByName(key);
                    var find
                    var label;

                    switch (key) {
                        case "regulation_sidebar_form":
                            //レギュレーションは無視？
                            if (value != "all") {
                                ui = this.$root.getUiDataByName(key);
                                var list = ui.list;
                                find = _.find(list, function (item) {
                                    return item.value == value;
                                }.bind(this));
                                if (find) label = find.key;
                            }
                            break;
                        case "se_ta":
                            ui = this.$root.getUiDataByName(key);
                            var list = ui.list;
                            find = _.find(list, function (item) {
                                return item.value == value;
                            }.bind(this));
                            if (find) label = find.key;
                            break;
                        case "sc_hp_s":
                        case "sc_hp_e":
                        case "sc_run_away_e":
                            ui = this.$root.getUiDataByName(key);
                            var list = ui.list;
                            find = _.find(list, function (item) {
                                return item.value == value;
                            }.bind(this));
                            if (find) label = ui.label + " : " + find.value;
                            break;
                        case "sc_run_away_s"://逃げるエネルギー下限
                            //値が0ならなにもしない
                            if (value != 0) {
                                ui = this.$root.getUiDataByName(key);
                                var list = ui.list;
                                find = _.find(list, function (item) {
                                    return item.value == value;
                                }.bind(this));
                                if (find) label = ui.label + " : " + find.value;
                            }
                            break;

                        case "pg":
                            var list = this.$root.getUiDataByName(key).list;
                            find = _.find(list, function (item) {
                                return item.value == value;
                            }.bind(this))
                            if (find) label = find.label;
                            break;
                        case "keyword":
                            find = this.$root.getDataByName(key);
                            if (find) label = value;
                            break;
                        case "illust":
                            ui = this.$root.getUiDataByName(key)
                            find = this.$root.getDataByName(key);
                            if (find) label = ui.label + " : " + value;
                            break;
                        default:
                            //TODO すべてのキーを羅列したい
                            find = this.$root.getUiDataByName(key);
                            if (find) {
                                //グループ名があれば足す
                                var groupLabel = find.hasOwnProperty("groupLabel") ? find.groupLabel + " : " : "";
                                label = groupLabel + find.label;
                            }
                            break;
                    }

                    console.log('-------[', key, "] /", find, "/", value);

                    if (find && value !== "") {
                        // console.log("[ " + key, "/", value, "/", label + " ]")
                        preList.push({
                            "key": key,
                            "value": value,
                            "label": label,
                        })
                    }
                }, this);
                this.list = preList;

            }
        },
        components: {
            'ks-slide-up-down': KSSlideUpDown
        }
    }
</script>