<template>
    <!-- TODO 汎用化 -->
    <ul :class="getColumnClass()">
        <li v-for="data in $root.getUiDataByName(name).list">
            <label class="KSRadioButton" @click.stop>
                <input type="radio" class="KSRadioInput" :name=data.name v-model=formModel :value="data.value" key=data.name
                    @change="onChange_handler">
                <span class="KSRadio"></span>
                <span class="KSFormText">{{data.label}}</span>
            </label>
        </li>
    </ul>
</template>
<style>
.KSFormText{
    font-size:11px;
}
.ListColumn2{
  
}
</style>
<script>

    import Vue from "vue";

    export default {
        props: ['name', 'data', 'model', 'onChange',"column","font"],
        data() {
            return {
                formModel: this.model
            }
        },
        watch: {
            model() {
                this.formModel = this.model;
            }
        },
        methods: {
            onChange_handler() {
                Vue.set(window.vueApp.initData, this.name, this.formModel)
                if (this.onChange) this.onChange();
            },
            getColumnClass() {
                return "ListColumn" + this.column;
            }
        }
    }
</script>