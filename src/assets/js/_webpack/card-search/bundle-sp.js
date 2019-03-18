import Vue from "vue";
import SpCardSearch from "./sp/sp-card-search";

window.vueApp = new Vue({
    el: '#CardSearchApp',
    data () {
        return {
            uiData: PTC.master.uiData,
            initData: PTC.master.initData
        };
    },
    watch: {
        initData () { 
             console.log('initi !!!!');
        }
    },
    template: `
        <sp-card-search></sp-card-search>
    `,
    created () {
        //データ下準備
        _.each(this.uiData, function (value, key) {
            this.uiData[key].name = key;
        }.bind(this));
        _.each(PTC.master.isHide, function (value, key) {
            this.uiData[key]["isHide"] = value;
        }, this);
    },
   
    methods: {
        getInitData () {
            return this.initData;
        },
        getGroupByName (groupName) {
            return _.filter(this.initData, function (data) {
                return data.group == groupName;
            });
        },
        getDataByName (dataName) {
            return this.initData[dataName];
        },
        getCheckboxValueByName (dataName) {
            var find = this.getDataByName(dataName);
            return find.value;
        },
        getUiDataByName (uiDataName) {
            return this.uiData[uiDataName];
        },
        getUiGroupByName (uiGroupName) {
            return _.filter(this.uiData, function (uiData) {
                return uiData.group == uiGroupName;
            });
        },
        setValue (dataName, value) {
            this.initData[dataName].value = value;
        },

    },
    components: {
        'sp-card-search': SpCardSearch,
    }
});
