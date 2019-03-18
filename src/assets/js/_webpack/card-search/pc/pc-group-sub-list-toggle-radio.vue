<template>
    <div class="groupSubList groupSubList-toggle" :class="{'js-open':isOpen}">
        <div class="subTitle" @click.stop="onClick()">
            <div class="mainText">
                <slot name="sub-title"> </slot>
            </div>
            <transition name="state">
                <div class="status" v-if="isSelected">
                    <div class="status_inner">
                        <span class="pcg pcg-check"></span>
                        <span class="number"> {{selectedTitle}}</span> : 選択中
                    </div>
                </div>
            </transition>
        </div>
        <!-- <ks-slide-up-down :active="isOpen" :duration="250"> -->
        <slide-up-down :active="isOpen" :duration="250">
            <div class="subBody">
                <ks-radio :name="gname" :column=column :model="$root.getDataByName(gname)" :onChange="onChnageUi"></ks-radio>
            </div>
        </slide-up-down>
    <!-- </ks-slide-up-down> -->
    </div>
</template>

<style scoped>
    .state-enter-active,
    .state-leave-active {
        transition: opacity .25s;
    }

    .state-enter,
    .state-leave-to {
        opacity: 0;
    }

    .subTitle {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .mainText {
            margin-right: 14px;
        }
    }

    .status {
        flex: 1;
        margin-left: auto;
        margin-right: 30px;
        text-align: right;

        .status_inner {
            display: inline-block;
            font-weight: normal;
            padding: 2px 12px 2px 28px;
            border-radius: 10px;
            font-size: 10px;
            line-height: 16px;
            background-color: rgba(0, 117, 194, 1);
            color: #fff;
            position: relative;

            .pcg {
                font-size: 11px;
                position: absolute;
                top: 50%;
                left: 10px;
                transform: translateY(-50%);
                color: #fff;
            }

            .number {
                font-weight: bold;
            }
        }
    }
</style>
<script>
    // import KSSlideUpDown from '_components/ks-slide-up-down';
    import SlideUpDown from 'vue-slide-up-down';
    import PCCheckboxList from "./pc-checkbox-list";
    import KSRadio from "_components/ks-radio";
    export default {
        props: ["active", "onChange", "gname", "column"],
        data() {
            return {
                isOpen: false,
            };
        },
        created() {
            this.isOpen = this.active;
        },
        computed: {
            isSelected() {
                var value = this.$root.initData[this.gname];
                return value !== "";
            },
            selectedTitle() {
                var value = this.$root.initData[this.gname];
                var list = this.$root.getUiDataByName(this.gname).list
                var find = _.find(list, function (item) {
                    return item.value == value;
                }, this)
                if (find) return find.label;
                return "";
            },
            title() {
                return this.$root.getUiGroupByName(this.gname);
            }

        },
        methods: {
            onClick: function () {
                this.isOpen = !this.isOpen;
                if (this.onChange) this.onChange(this.isOpen);
            },
            //指定なし、以外ならtrue
            hasSelected() {
                var value = this.$root.initData[this.gname];
                var list = this.$root.getUiDataByName(this.gname).list;
                var find = _.find(list, function (item) {
                    return item.value == value;
                }, this);

                if (find && find.value != "") {
                    return true;
                }
                return false;
            },
            //検索開始
            onChnageUi() {
                PTC.searchRequest();
            }
        }
        , components: {
            // 'ks-slide-up-down': KSSlideUpDown,
            'slide-up-down': SlideUpDown,
            'pc-checkbox-list': PCCheckboxList,
            'ks-radio': KSRadio,
        }
    }
</script>