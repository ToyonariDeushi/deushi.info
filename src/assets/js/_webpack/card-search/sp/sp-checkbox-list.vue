<template>
    <ul class="slideWindow_list">
        <li class="slideWindow_list_item" v-for="item in uiData" v-if=!checkHide(item.isHide)>
            <ks-checkbox :data="item" :model="$root.getDataByName(item.name)" :inidata="$root.getInitData()" :onChange="onChange_handler"></ks-checkbox>
        </li>
    </ul>
</template>
<style scoped>
    
</style>
<script>
    import KSCheckbox from "_components/ks-checkbox";
    export default {
        props: { "gname": String ,"uiData":Array,"model":Object,"onChange":null},
        data() {
            return {
                initD: this.$root.getInitData(),
            }
        }, 
        methods: {
            checkHide(hideArray) {
                if (!hideArray) return false;
                var isHide = _.find(hideArray, function (arr, key) {
                    var find = _.find(arr, function (value) {
                        return value == this.initD[key];
                    }.bind(this))
                    return find;
                }.bind(this))
                return isHide;
            },
            onChange_handler(){
                if(this.onChange) this.onChange();
            }
        },
        components: {
            "ks-checkbox": KSCheckbox
        },
    }
</script>