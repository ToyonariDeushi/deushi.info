<template>
    <div class="notification" :class="{'js-show':isShow}">
        <div class="notification_inner " @click="close">
            <div class="blinking">
                {{text}}
            </div>
            <div class="close-button">
                <span class="pcg pcg-cross"></span>
            </div>
        </div>
    </div>
</template>

<style scoped>
    /* 点滅 */
    .blinking {
        animation: blink .25s ease-out infinite alternate;
    }

    @keyframes blink {
        0% {
            opacity: 0.7;
        }

        100% {
            opacity: 1;
        }
    }

    .notification {
        position: fixed;
        top: 0;
        z-index: 230;
        left: 0;
        width: 100%;

        .notification_inner {
            overflow: hidden;
            display: flex;
            padding: 13px;
            padding-right: 30px;
            box-sizing: border-box;
            align-items: center;
            position: absolute;
            font-weight: bold;
            transition: top .25s ease-out;
            top: -70px;
            color: #fff;
            font-size: 12px;
            left: 0;
            width: 100%;
            height: 60px;
            background-color: rgba(0, 117, 194, 0.9);

            .close-button {
                font-size: 18px;
                position: absolute;
                right: 10px;
                top: 20px;
            }
        }

        &.js-show {

            .notification_inner {
                top: 0;
                transition: top .25s ease-out;
            }
        }
    }
</style>
<script>

    export default {

        data() {
            return {
                text: "",
                isShow: false,
                timer: null,
                showTimer: null,
                request: null
            }
        },
        mounted() {
            PTC.cardSearchStart_handlers.push(this.onSearchStart_handler.bind(this))
            PTC.cardSearchComplete_handlers.push(this.onSearchComplete_handler.bind(this));
            PTC.cardSearchError_handlers.push(this.onSearchError_handler.bind(this))
            PTC.cardSearchEnd_handlers.push(this.onSearchEnd_handler.bind(this))
        }
        ,
        methods: {
            onSearchStart_handler(req) {
                // console.log('resu', req);
                this.request = req;//保持していおく
                this.close();
            },
            onSearchError_handler() {
            },
            onSearchEnd_handler() {
            },
            onSearchComplete_handler(response) {
                var result = [];

                _.each(this.request, function (param, key) {
                    // console.log('--',param,"/",key);

                    var ui;
                    var value = this.$root.getDataByName(key);
                    var find
                    var label;

                    switch (key) {
                        case "regulation_sidebar_form":
                            //レギュレーションは無視？
                            // if (value != "all") {
                            ui = this.$root.getUiDataByName(key);
                            var list = ui.list;
                            find = _.find(list, function (item) {
                                return item.value == value;
                            }.bind(this));
                            if (find) label = "レギュレーション:" + find.key;
                            // }
                            break;
                        case "se_ta":
                            ui = this.$root.getUiDataByName(key);
                            var list = ui.list;
                            find = _.find(list, function (item) {
                                return item.value == value;
                            }.bind(this));
                            if (find) label = find.key;
                            break;
                        case "sc_ab_special"://特性
                            ui = this.$root.getUiDataByName(key);
                            var list = ui.list;
                            find = _.find(list, function (item) {
                                return item.value == value;
                            }.bind(this));
                            if (find) label = ui.label + ":" +find.key;
                            break;
                        case "sc_hp_s":
                        case "sc_hp_e":
                        case "sc_run_away_e":
                            ui = this.$root.getUiDataByName(key);
                            var list = ui.list;
                            find = _.find(list, function (item) {
                                return item.value == value;
                            }.bind(this));
                            if (find) label = ui.label + ":" + find.value;
                            break;
                        case "sc_run_away_s"://逃げるエネルギー下限
                            //値が0ならなにもしない
                            if (value != 0) {
                                ui = this.$root.getUiDataByName(key);
                                var list = ui.list;
                                find = _.find(list, function (item) {
                                    return item.value == value;
                                }.bind(this));
                                if (find) label = ui.label + ":" + find.value;
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
                        case "illust":
                            ui = this.$root.getUiDataByName(key)
                            find = this.$root.getDataByName(key);
                            if (find) label = ui.label + ":" + value;
                            break;
                        default:
                            //TODO すべてのキーを羅列したい
                            find = this.$root.getUiDataByName(key);
                            if (find) {
                                //グループ名があれば足す
                                var groupLabel = find.hasOwnProperty("groupLabel") ? find.groupLabel + ":" : "";
                                label = groupLabel + find.label;
                            }
                            break;
                    }

                    // console.log('-------[', key, "] /", find, "/", value);

                    if (find && value !== "") {
                        // console.log("[ " + key, "/", value, "/", label + " ]")
                        result.push(label)

                    }
                }, this)

                // console.log("-----", this.request)
                // console.log("-----", result.join(", "))
                var val = result.join(", ");
                this.text = val; //(val=="") ?"見つかりませんでした" : val;

                this.isShow = true;

                this.setHideTimer();
            },
            setHideTimer() {
                this.clearTimer();
                this.timer = setTimeout(function () {
                    this.close();
                }.bind(this), 5000);
            },
            close() {
                this.clearTimer();
                this.isShow = false;
            },
            clearTimer() {
                if (this.timer) {
                    clearTimeout(this.timer);
                    this.timer = null;

                }
            }
        },

    }
</script>