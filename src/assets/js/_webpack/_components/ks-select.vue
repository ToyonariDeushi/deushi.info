<template>
    <label class="KSSelect">
        <div class="KSSelect_inner">
            <select class="KSSelect_text" :name=data.name :title=data.label @click.stop @change="onChange_handler" v-model=formModel
                key=data.name>
                <option v-for="data in data.list" :value=data.value :selected=data.selected>{{data.key}}</option>
            </select>
        </div>
    </label>
</template>

<script>
     import Vue from "vue";
    export default {
        props: ['data', 'model','onChange'],
        data() {
            return {
                formModel: this.model
            }
        },
        watch: {
            model() {
                this.formModel = this.model
            }
        },
        methods: {
            onChange_handler: function () {
                Vue.set(window.vueApp.initData, this.data.name, this.formModel);
                // PTC.searchRequest();
                if(this.onChange)this.onChange();
            }
        }
    }
</script>