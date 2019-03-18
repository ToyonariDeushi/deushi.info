<template>
    <div class="sliderGroup">
        <div class="slideWindowOpenButton " :class="{'js-current':isCurrent}" @click.stop="onOpenClick">
            <div class="innerText">
                {{title}}
            </div>
            <div class="countArea">
            </div>
        </div>
        <div class="slideWindowArea" :class="{'js-open':isOpen}">
            <div class="slideWindow">
                <div class="slideWindow_header">
                    <div class="slideWindowButton_cancel">
                        <!-- キャンセル -->
                    </div>
                    <div class="slideWindowButton_title">
                        {{title}}
                    </div>
                    <div class="slideWindowButton_submit" @click="onSubmitClick">決定</div>
                </div>
                <div class="slideWindow_body">
                    <sp-radio-list :name="name" :model="$root.getDataByName(name)" :onChange="onChange_handler"></sp-radio-list>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .slideWindowButton_title {
        overflow: hidden;
    }
</style>
<script>
    import KSRadio from "_components/ks-radio";
    import SPRadioList from "./sp-radio-list";
    export default {
        props: { "gname": String, "model": Object, "name": String },
        data() {
            return {
                isCurrent: false,
                isOpen: false,
                groupName: this.gname,
                formModel: this.model,
                title: " "
            }
        },
        watch: {
            model() {
                this.formModel = this.model;
            }
        },
        mounted() {
            this.setLabel();
        },
        computed: {
            checkedCount() {
                var list = _.filter(this.formModel, function (item) {
                    return item.value
                })
                return list.count;
            }
        },
        watch:{

        },
        methods: {
            onOpenClick() {
                this.isOpen = true;
            },
            onSubmitClick() {
                this.close();
            },
            onChange_handler() {
                this.setLabel();
            },
            setLabel() {
                var value = this.$root.getDataByName(this.name);
                var uiList = this.$root.getUiDataByName(this.name).list;
                var find = _.find(uiList, function (item) {
                    return item.value == value;
                }, this)

                if (value != "") {
                    this.isCurrent = true;
                } else {
                    this.isCurrent = false;
                }
                this.title = (!find.label || find.label === "") ? "--" : find.label;
            },
            close() {
                this.isOpen = false;
            }
        },
        components: {
            "ks-radio": KSRadio,
            "sp-radio-list": SPRadioList,
        }
    }
</script>