<template>
    <label class="KSDropdown" :class="{'js-open': isShowDropdown}">
        <div class="KSDropdown_inner">
            <select class="KSDropdown_select" :name=listdata.name :title=listdata.label v-model=selected key=data.name>
                <option v-for="listItem in listdata.list" :value=listItem.value>{{listItem.key}}</option>
            </select>
            <div class="KSDropdown_button" @click=onClick>{{getCurrentLabel}}</div>
            <div class="KSDropdown_cover" v-show="isShowDropdown" @click="close"></div>
            <ul ref="dropdown" class="KSDropdown_dropdown" :style="{'height':h, 'overflow': 'hidden','transition-duration':  '150ms' }">
                <li v-for="listItem in listdata.list" :data-value=listItem.value class="KSDropdown_dropdown_item"
                    :class="{ 'js-current':currentCheck(listItem.value)}" @click=onListClick(listItem.value)>{{listItem.key}}</li>
            </ul>
        </div>
    </label>
</template>
<style scoped>
    .KSDropdown {
        font-size: 14px;

        .KSDropdown_inner {
            position: relative;
        }

        //seletは非表示
        select {
            display: none;
        }

        //トグルボタン
        .KSDropdown_button {
            cursor: pointer;
            border: solid 2px #ddd;
            padding: 4px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fff;
            padding: 6px 30px 6px 20px;
            position: relative;

            &:hover {
                transition: border-color .2s ease-out;
                border-color: #b3bfc7;
            }

            &:after {
                font-family: "pokemoncard-font";
                content: "\F702";
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-45%);
                font-size: 14px;
                color: #C3C3C3;
            }
        }

        //可視リスト
        .KSDropdown_dropdown {
            // display: none;
            position: absolute;
            text-align: center;
            // top: jsから設定;
            left: 0;
            min-width: 100%;
            width: auto;
            background-color: #fff;
            z-index: 2;

            .KSDropdown_button {
                &:after {
                    color: #0075C2;
                }
            }

            .KSDropdown_dropdown_item {
                cursor: pointer;
                text-align: center;
                white-space: nowrap;
                border-bottom: solid 1px #C3C3C3;
                padding: 10px 0.5em;
                box-sizing: border-box;
                transition: background-color .15s ease-out;
                font-size: inherit;

                &:last-child {
                    border: none;
                }

                &:hover {
                    background-color: #ebebeb;
                }

                &.js-current {
                    pointer-events: none;
                    color: #fff;
                    background-color: #0075C2;
                }
            }
        }

        //open時
        &.js-open {
            .KSDropdown_inner {
                .KSDropdown_button {
                    border-color: #0075C2;
                }

                .KSDropdown_dropdown {
                    display: block;
                    box-shadow: 0 2px 3px 1px rgba(0, 0, 0, 0.1);
                }
            }
        }
    }

    .KSDropdown_cover {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1;
        background-color: rgba(0, 0, 0, 0);
        height: 100%;
    }
</style>
<script>
    import Vue from "vue";
    import KSSlideUpDown from '_components/ks-slide-up-down'
    export default {
        props: ['listdata', 'bind', 'onChange'],
        data() {
            return {
                isShowDropdown: false,
                selected: this.bind,
                h: "0px"
            }
        },
        computed: {
            getCurrentLabel() {
                var find = _.find(this.listdata.list, function (d) {
                    return d.value == this.selected;
                }, this);
                return find.key;
            }
        },
        watch: {
            bind() {
                this.selected = this.bind;
            }
        },
        created() {
            //----------------------------
            //リスト以外クリック設定
            //----------------------------
            window.addEventListener("click", function (e) {
                // console.log('e',e);

                if (!this.$el.contains(e.target)) {
                    // console.log('close');
                    // this.$emit('close');
                    this.close();
                }
            }.bind(this));
        },
        methods: {
            currentCheck: function (value) {
                return value == this.selected;
            },
            onClick: function () {
                this.isShowDropdown = !this.isShowDropdown;
                this.viewUpdate();
            },
            close: function () {
                this.isShowDropdown = false;
                this.viewUpdate();
            },

            viewUpdate() {
                if (this.isShowDropdown) {
                    const { dropdown } = this.$refs;
                    this.scrollHeight = dropdown.scrollHeight
                    // console.log('open', this.scrollHeight);
                    this.h = this.scrollHeight + "px";
                } else {
                    this.h = "0px";
                }
            },
            onListClick: function (value) {
                // this.bind = value;
                //TODO　$emitにしたい
                Vue.set(window.vueApp.initData, this.listdata.name, value);
                this.selected = value;//TODO 
                this.close();
                this.onChange_handler()

            },
            onChange_handler: function () {
                if (this.onChange) this.onChange();
            }
        },
        components: {
            'ks-slide-up-down': KSSlideUpDown
        }
    }
</script>