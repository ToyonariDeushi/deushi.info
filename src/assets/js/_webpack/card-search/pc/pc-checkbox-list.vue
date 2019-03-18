<template>
    <ul :class="getColumnClass()">
        <li v-for="item in $root.getUiGroupByName(gname)" v-if=!checkHide(item.isHide) :key="item.name">
            <ks-checkbox :data="item" :model="$root.getDataByName(item.name)" :inidata="$root.getInitData()" :onChange="onChange_handler" ></ks-checkbox>
        </li>
    </ul>
</template>

<script>
    import KSCheckbox from "_components/ks-checkbox";
    export default {
        props: { 'column': Number, "gname": String, "onChange": null },
        data() {
            return {
                uiData: this.item,
                initD: this.$root.getInitData()
            }
        },
        methods: {
            checkHide(hideArray) {
                if (!hideArray) return false;
                var isHide = _.find(hideArray, function (arr, key) {
                    // console.log("-- val2", arr, "  key=", key, this.initD[key])
                    var find = _.find(arr, function (value) {
                        return value == this.initD[key];
                    }.bind(this))
                    return find;
                }.bind(this))
                // console.log("isHide", isHide)
                return isHide;
            },
            onChange_handler(name) {
                // console.log('onChange_handler');
                if (this.onChange) this.onChange();
            },
            getColumnClass() {
                return "ListColumn" + this.column;
            }
        },
        components: {
            "ks-checkbox": KSCheckbox
        },
    }
</script>