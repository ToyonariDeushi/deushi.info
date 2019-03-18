<template>
    <label class="KSCheckBox" :class=checkTypeIcon @click.stop>
        <input type="checkbox" class="KSCheckBoxInput" :name=data.name v-model=formModel key=data.name @change="onChange_handler">
        <span class="KSCheck"></span>
        <span class="KSFormText">{{data.label}}</span>
    </label>
</template>
<script>
    import Vue from "vue";
    export default {
        props: ['data', 'model', "inidata" ,"onChange"],
        data() {
            return {
                formModel: this.model,
                initD: this.inidata,
                uiData: this.data
            }
        },
        watch: {
            model() {
                const isDiff = this.model!==this.formModel;
                this.formModel = this.model;
                //差が会えればハンドラ実行
                // if(isDiff)this.onChange_handler();
            }
        },
        computed: {

            //属性アイコンが必要か？
            checkTypeIcon() {
                var typeLabels = [
                    "grass",//草
                    "fire",//炎
                    "water",//水
                    "electric",//雷
                    "psychic",//超
                    "fighting",//闘
                    "dark",//悪
                    "steel",//鋼
                    "fairy",//フェアリー
                    "dragon",//ドラゴン
                    "none",//無色
                    "void",//なし
                ];
                var find = _.find(typeLabels, function (type) {
                    return this.data.name.indexOf(type) != -1;
                }.bind(this));
                var returnValue = null;
                if (find) returnValue = "SearchIcon-" + find;
                return returnValue;
            }
        },
        methods: {
            getData() {
                return this.initD[this.uiData.name];
            },
            onChange_handler() {
                Vue.set(window.vueApp.initData, this.data.name, this.formModel);
                if (this.onChange) this.onChange(this.data.name, this.formModel);
            },
        }
    }
</script>