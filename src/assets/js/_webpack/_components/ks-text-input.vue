<template>
    <!-- TODO iconなど汎用化されていない -->
    <label class="KSTextInput " :class="getClasses" :style="getStyle" >
        <input type="text" class="KSTextInput_text" :placeholder="placeholder" :name="inputName" :maxlength="maxLength"
            v-model="formModel" @input="onInput" @focus="onFocus" @blur="onBlur">
        <div class="error-tip-area" v-if="isMaxLength">
            <span class="error-tip" v-show="isFocus">
                これ以上入力できません
            </span>
        </div>
    </label>
</template>
<style scoped>
    .isError {}

    .error-tip-area {
        position: absolute;
        top: -32px;
        left: 0px;

        .error-tip {
            background-color: #0075C2;
            color: #fff;
            height: 18px;
            line-height: 18px;
            border-radius: 4px 4px 0 0;
            padding: 3px 6px;
            box-sizing: border-box;
            font-size: 10px;
            font-weight: bold;
            width: 100%;
        }

    }
</style>
<script>

    import Vue from "vue";
    export default {
        props: {
            "name": String,
            "model": String,
            "onChange": Function,
            "styles": {
                type: String,
                default: ""
            },
            "icon": {
                type: String,
                default: ""
            },
            "placeholder": {
                type: String,
                default: ""
            },
            "size": {
                type: String,
                default: ""//small or middle 
            },
            "maxLength": {
                type: Number,
                default: 1024
            }
        },
        data() {
            return {
                inputName: this.name,
                formModel: this.model,
                beforeTime: 0,
                timer: null,
                isFocus: false
            }
        }
        , watch: {
            model() {
                this.formModel = this.model;
            }
        },
        computed: {

            getStyle() {
                var styles="";
                if (this.styles!="") {
                    styles =  this.styles;
                }
                return styles;
            },
            getClasses() {
                var classes = [];
                if (this.isMaxLength) {
                    classes.push("isError")
                }
                if (this.hasIconClass) {
                    classes.push(this.iconClass)
                }
                if (this.size == "middle" || this.size == "small") {
                    classes.push("KSTextInput-" + this.size);
                }
                return classes.join(" ")
            },
            hasIconClass() {
                if (this.icon == "") {
                    return false;
                }
                return true;
            },
            iconClass() {
                if (this.icon == "") {
                    return "";
                }
                return "icon-" + this.icon;
            },
            isMaxLength() {
                return (this.maxLength <= this.formModel.length);
            }
        },
        methods: {

            onFocus() {
                // console.log('focus');
                this.isFocus = true;

            },
            onBlur() {
                this.isFocus = false;
                // console.log('blur');

            },
            onChange_handler() {
                if (this.onChange) this.onChange();
            },
            onInput() {
                this.clearTimer();
                var waitTime = 500;
                var now = (new Date()).getTime();
                var diff = (now - this.beforeTime);
                if (this.formModel.length == 1) {
                    // console.log('1文字は送信しない');
                    return;
                }
                if (waitTime < diff) {
                    Vue.set(window.vueApp.initData, this.inputName, this.formModel);
                    this.onChange_handler();
                } else {
                    // console.log('前回の入力から一定時間経過していなかったら一定時間待って再度送信するかチェック');
                    this.timer = setTimeout(function () {
                        this.onInput();
                    }.bind(this), waitTime + 10)
                }
                //入力時間アップデート
                this.beforeTime = now;

            },
            clearTimer() {
                if (this.timer) {
                    clearTimeout(this.timer);
                    this.timer = null;
                }
            },
        }
    }
</script>