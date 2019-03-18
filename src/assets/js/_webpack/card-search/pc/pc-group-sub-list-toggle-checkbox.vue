<template>
    <div class="groupSubList groupSubList-toggle" :class="{'js-open':isOpen}">
        <div class="subTitle" @click.stop="onClick()">
            <div class="mainText">
                <slot name="sub-title"> </slot>
            </div>
            <transition name="state">
                <div class="status" v-if="checkedCount">
                    <div class="status_inner">
                        <span class="pcg pcg-check"></span>
                        <span class="number">{{checkedCount}}</span>件 : 選択中
                    </div>
                </div>
            </transition>
        </div>
        <ks-slide-up-down :active="isOpen" :duration="250">
            <div class="subBody">
                <pc-checkbox-list :column=column :gname="gname" :onChange="onChnageUi"></pc-checkbox-list>
            </div>
        </ks-slide-up-down>
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
            margin-right: 16px;
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

    import KSSlideUpDown from '_components/ks-slide-up-down'
    import PCCheckboxList from "./pc-checkbox-list";
    export default {
        props: ["active", "onChange", "gname", "column"],
        data() {
            return {
                isOpen: false,
            }
        },
        created() {
            this.isOpen = this.openCheckByGroupName() || this.active;
        },
        computed: {
            checkedCount() {
                var names = _.pluck(this.$root.getUiGroupByName(this.gname), "name")
                // console.log("まずはnameをすべて取得", names)
                var filter = _.filter(names, function (item) {
                    var data = this.$root.getDataByName(item);
                    // console.log(item, data);
                    return this.$root.getDataByName(item);
                }, this)

                return filter.length;
            },
        },
        methods: {
            onClick: function () {
                this.isOpen = !this.isOpen;
                if (this.onChange) this.onChange(this.isOpen);
            },
            openCheckByGroupName() {
                var names = _.pluck(this.$root.getUiGroupByName(this.gname), "name")
                // console.log("まずはnameをすべて取得", names)
                var find = _.find(names, function (item) {
                    var data = this.$root.getDataByName(item);
                    // console.log(item, data);
                    return this.$root.getDataByName(item);
                }, this)
                if (find) return true;
                return false;
            },
            //検索開始
            onChnageUi() {
                PTC.searchRequest();
            }
        }
        , components: {
            'ks-slide-up-down': KSSlideUpDown,
            'pc-checkbox-list': PCCheckboxList,
        }
    }
</script>