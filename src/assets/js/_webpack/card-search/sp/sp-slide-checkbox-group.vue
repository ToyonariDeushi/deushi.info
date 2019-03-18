<template>
    <div class="sliderGroup">
        <div class="slideWindowOpenButton " :class="{'js-current':checkedCount}" @click.stop="onOpenClick">
            <slot name="title">
                <!-- タイトル入ります -->
            </slot>
            <div class="countArea">
                <span class="selectedNum">{{checkedCount}}</span>件選択中
            </div>
        </div>
        <div class="slideWindowArea" :class="{'js-open':isOpen}">
            <div class="slideWindow">
                <div class="slideWindow_header">
                    <div class="slideWindowButton_cancel">
                        <!-- キャンセル -->
                    </div>
                    <div class="slideWindowButton_title">
                        <span class="selectedNum">{{checkedCount}}</span>件選択中
                    </div>
                    <div class="slideWindowButton_submit" @click="onSubmitClick">決定</div>
                </div>
                <div class="slideWindow_body">
                    <sp-checkbox-list :gname="groupName" :uiData="$root.getUiGroupByName(groupName)" :onChange="onChange_handler">
                    </sp-checkbox-list>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    import KSRadio from "_components/ks-radio";
    import SPCheckboxList from "./sp-checkbox-list";
    export default {
        props: { "gname": String, "column": Number },
        data() {
            return {
                isCurrent: false,
                isOpen: false,
                checkedCount: 0,
                groupName: this.gname,
                uiData: null
            }
        },
        mounted() {
            this.uiData = this.$root.getUiGroupByName(this.gname);
            this.checkCount();
        },
        methods: {
            // clearButton(){
            //     this.checkedCount=0;
            // },
            onOpenClick() {
                this.isOpen = true;
            },
            onChange_handler() {
                this.checkCount();
            },
            checkCount() {
                var uiList = this.$root.getUiGroupByName(this.groupName);
                var list = _.filter(uiList, function (item) {
                    var val = this.$root.initData[item.name]
                    return val
                }, this);
                if (list) {
                    this.checkedCount = list.length;
                } else {
                    this.checkedCount = 0;
                }
            },
            onSubmitClick() {
                //TODO データ反映
                this.close();
            },
            close() {
                this.isOpen = false;
            }
        },
        components: {
            "ks-radio": KSRadio,
            "sp-checkbox-list": SPCheckboxList,
        }
    }
</script>