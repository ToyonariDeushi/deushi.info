<!-- 内部的にはselectのタブUI -->
<template>
    <label class="KSSelectTab" :class="{'js-open': isShowDropdown}">
        <div class="KSSelectTab_inner">
            <select class="KSSelectTab_select" :name=listdata.name :title=listdata.label v-model=selected key=data.name>
                <option v-for="listItem in listdata.list" :value=listItem.value>{{listItem.key}}</option>
            </select>
            <ul class="KSSelectTab_tabs">
                <li v-for="listItem in listdata.list" :data-value=listItem.value class="KSSelectTab_tabs_item" :class="{ 'js-current':currentCheck(listItem.value)}"
                    v-on:click=onListClick(listItem.value)>{{listItem.key}}</li>
            </ul>
        </div>
    </label>
</template>

<style scoped>
    .KSSelectTab {
        select {
            display: none;
        }

        .KSSelectTab_tabs {
            display: flex;

            li {
                flex: 1;
                text-align: center;
            }
        }

        .KSSelectTab_tabs_item {
            cursor: pointer;
            font-size: 12px;
            padding: 14px 0;
            border: solid 1px #ddd;
            border-bottom: none;
            margin: 0 2px;
            box-sizing: border-box;

            &:first-child {
                margin-left: 0;
            }

            &:last-child {
                margin-right: 0
            }

            &.js-current {
                font-weight: bold;
                margin-bottom: -2px;
                transition: background-color .2s ease-out, border .2s ease-out;
                border-top: solid 3px #0075C2;
                pointer-events: none;
                background-color: #E5E7E9;
            }
        }
    }
</style>
<script>
    import Vue from "vue";
    export default {
        props: ['listdata', 'bind', "onChange"],
        data() {
            return {
                isShowDropdown: false,
                selected: this.bind,
            }
        },
        computed: {
            getCurrentLabel() {
                var find = _.find(this.listdata.list, function (d) {
                    return d.value == this.selected;
                }, this);
                return find.key;
            }
        },
        watch: {
            bind() {
                this.selected = this.bind;
            }
        },
        methods: {
            currentCheck: function (value) {
                return value == this.selected;
            },
            onClick: function () {
                this.isShowDropdown = !this.isShowDropdown;
            },
            close: function () {
                this.isShowDropdown = false;
            },
            onListClick: function (value) {
                Vue.set(window.vueApp.initData, this.listdata.name, value);
                this.selected = value;//TODO 
                this.onChange_handler();
            },
            onChange_handler: function () {
                this.$emit("on-change",this.selected);
                //TODO　$emitにしたい
                if (this.onChange) this.onChange(this.selected);
            }
        }
    }
</script>