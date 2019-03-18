<template>
    <!-- TODO 汎用化 -->
    <ul class="slideWindow_list">
        <li class="slideWindow_list_item" v-for="data in $root.getUiDataByName(name).list">
            <label class="KSRadioButton" @click.stop>
                <input type="radio" class="KSRadioInput" :name=data.name v-model=formModel :value="data.value" key=data.name
                    @change="onChange_handler">
                <span class="KSRadio"></span>
                <span class="KSFormText">{{data.label}}</span>
            </label>
        </li>
    </ul>
</template>
<script>

    import Vue from "vue";

    export default {
        props: ['name', 'data', 'model', "onChange"],
        data() {
            return {
                formModel: this.model
            }
        },
        watch: {
            model() {
                this.formModel = this.model;
                this.onChange_handler();
            }
        },
        methods: {
            onChange_handler() {
                // console.log('onCHange', this.name,this.formModel);
                    // console.log("aa",window.vueApp.initData[this.name],this.formModel)
                // if (window.vueApp.initData[this.name] != this.formModel) {
                    Vue.set(window.vueApp.initData, this.name, this.formModel)
                    if (this.onChange) this.onChange(this.name, this.$root.initData[this.name])
                // }
            }
        }
    }
</script>