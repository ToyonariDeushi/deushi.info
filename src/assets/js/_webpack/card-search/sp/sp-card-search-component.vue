<template>
    <div class="SidebarArea js-show">
        <div class="indicator"></div>
        <div class="SearchBoxArea SearchBar_section">
            <div class="SearchBoxArea_title">
                キーワード
            </div>
            <div class="SearchBoxArea_body">
                <ks-text-input :name="'keyword'" :placeholder="'ポケモン名・技名など'" :model="$root.getDataByName('keyword')"></ks-text-input>
            </div>
        </div>
        <div class="SearchBoxArea SearchBar_section">
            <div class="SearchBoxArea_title">
                レギュレーション
            </div>
            <div class="SearchBoxArea_body">
                <ks-select :data="$root.getUiDataByName('regulation_sidebar_form')" :model="$root.getDataByName('regulation_sidebar_form')"></ks-select>
            </div>
        </div>
        <ks-slide-up-down :active="isCollapseOpen" :duration="250">
            <!-- <slide-up-down ref="slideUpDown" :active="isCollapseOpen" :duration="250"> -->
            <div class="collapseArea ">
                <div class=" collapseArea_inner">
                    <div class="SearchBoxArea specialArea " v-if="se_ta!=''">
                        <div class="title">
                            <template v-if="se_ta=='pokemon'">
                                ポケモンの条件
                            </template>
                            <template v-else-if="se_ta=='trainer'">
                                トレーナーズの条件
                            </template>
                            <template v-else-if="se_ta=='energy'">
                                エネルギーの条件
                            </template>
                        </div>
                    </div>
                    <ul>
                        <!-- 
                        ====================================================================================
                        ポケモンの特性
                        ====================================================================================
                        -->
                        <template v-if="setaProp == 'pokemon'">
                            <li class="SearchBoxArea" key="group-pokemon-type">
                                <sp-slide-checkbox-group :gname="'group-pokemon-type'" ref="group-pokemon-type">
                                    <template slot="title">進化</template>
                                </sp-slide-checkbox-group>
                            </li>
                            <li class="SearchBoxArea" key="group-ability">
                                <sp-slide-checkbox-group :gname="'group-ability'" ref="group-ability">
                                    <template slot="title">ポケモンの種類</template>
                                </sp-slide-checkbox-group>
                            </li>
                            <li class="SearchBoxArea" key="group-special-ability">
                                <sp-slide-checkbox-group :gname="'group-special-ability'" ref="group-special-ability">
                                    <template slot="title">特別なポケモン</template>
                                </sp-slide-checkbox-group>
                            </li>
                            <li class=" SearchBoxArea " key="sc_ab_special">
                                <div class="SearchBoxArea_title ">
                                    特性
                                </div>
                                <div class="SearchBoxArea_body">
                                    <ks-select :data="$root.getUiDataByName('sc_ab_special')" :model="$root.getDataByName('sc_ab_special')"></ks-select>
                                </div>
                            </li>
                            <li class="SearchBoxArea" key="group-pm-type">
                                <sp-slide-checkbox-group :gname="'group-pm-type'" ref="group-pm-type">
                                    <template slot="title">タイプ</template>
                                </sp-slide-checkbox-group>
                            </li>
                            <li class="SearchBoxArea" key="group-weak-type">
                                <sp-slide-checkbox-group :gname="'group-weak-type'" ref="group-weak-type">
                                    <template slot="title">弱点</template>
                                </sp-slide-checkbox-group>
                            </li>
                            <li class="SearchBoxArea" key="group-regist-type">
                                <sp-slide-checkbox-group :gname="'group-regist-type'" ref="group-regist-type">
                                    <template slot="title">抵抗力</template>
                                </sp-slide-checkbox-group>
                            </li>
                            <li class="SearchBoxArea" key="group-ab-type">
                                <sp-slide-checkbox-group :gname="'group-ab-type'" ref="group-ab-type">
                                    <template slot="title">ワザのエネルギー</template>
                                </sp-slide-checkbox-group>
                            </li>
                            <li class="SearchBoxArea">
                                <div class="SearchBoxArea_title">HP</div>
                                <div class="SearchBoxArea_body ">
                                    <div class="SearchBarSelect ">
                                        <!-- HP下限 -->
                                        <ks-select v-bind:data="$root.getUiDataByName('sc_hp_s')" :model="$root.getDataByName('sc_hp_s')"></ks-select>
                                        <div>
                                            <div class="FromLabel">
                                                ～
                                            </div>
                                        </div>
                                        <!-- HP上限 -->
                                        <ks-select v-bind:data="$root.getUiDataByName('sc_hp_e')" :model="$root.getDataByName('sc_hp_e')"></ks-select>
                                    </div>
                                </div>
                            </li>
                            <li class="SearchBoxArea">
                                <div class="SearchBoxArea_title ">にげるエネルギー</div>
                                <div class="SearchBoxArea_body ">
                                    <div class="SearchBarSelect ">
                                        <!-- にげる下限-->
                                        <ks-select v-bind:data="$root.getUiDataByName('sc_run_away_s')" :model="$root.getDataByName('sc_run_away_s')"></ks-select>
                                        <div class="FromLabel">
                                            ～
                                        </div>
                                        <!-- にげる上限 -->
                                        <ks-select v-bind:data="$root.getUiDataByName('sc_run_away_e')" :model="$root.getDataByName('sc_run_away_e')"></ks-select>
                                    </div>
                                </div>
                            </li>
                        </template>
                        <!--
                        ====================================================================================
                        トレーナーズの種類
                        ====================================================================================
                        -->
                        <template v-if="setaProp == 'trainer'">
                            <li class="SearchBoxArea" key="group-trainers">
                                <sp-slide-checkbox-group :gname="'group-trainers'" ref="group-trainers">
                                    <template slot="title">トレーナーズの種類</template>
                                </sp-slide-checkbox-group>
                            </li>
                            <li class="SearchBoxArea" key="group-special-trainers">
                                <sp-slide-checkbox-group :gname="'group-special-trainers'" ref="group-special-trainers">
                                    <template slot="title">特別なトレーナーズ
                                    </template>
                                </sp-slide-checkbox-group>
                            </li>
                        </template>
                        <!--
                        ====================================================================================
                        エネルギーの種類
                        ====================================================================================
                        -->
                        <template v-if="setaProp=='energy'">
                            <li class="SearchBoxArea" key="group-energy">
                                <sp-slide-checkbox-group :gname="'group-energy'" ref="group-energy">
                                    <template slot="title">エネルギーの種類</template>
                                </sp-slide-checkbox-group>
                            </li>
                            <li class="SearchBoxArea" key="group-special-energy">
                                <sp-slide-checkbox-group :gname="'group-special-energy'" ref="group-special-energy">
                                    <template slot="title">特別なエネルギー</template>
                                </sp-slide-checkbox-group>
                            </li>
                        </template>
                    </ul>
                    <div class="SearchBoxArea_group">
                        <div class=" SearchBoxArea ">
                            <div class="SearchBoxArea_title ">
                                商品名
                            </div>
                            <div class="SearchBoxArea_body">
                                <sp-slide-radio-group :name="'pg'">
                                </sp-slide-radio-group>
                            </div>
                        </div>
                        <div class="SearchBoxArea">
                            <div class="SearchBoxArea_title ">
                                イラストレーター名
                            </div>
                            <div class="SearchBoxArea_body">
                                <ks-text-input :name="'illust'" :model="$root.getDataByName('illust')"></ks-text-input>
                            </div>
                        </div>
                        <div class=" SearchBoxArea ">
                            <div class="SearchBoxArea_body">
                                <sp-slide-checkbox-group :gname="'group-rare'" ref="group-rare">
                                    <template slot="title">レアリティ</template>
                                </sp-slide-checkbox-group>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ks-slide-up-down>
        <!-- </slide-up-down> -->
        <!-- 条件を追加する -->
        <ks-slide-up-down :active="!isCollapseOpen" :duration="250">
            <section class="SearchBar_section" id="AddFilterArea">
                <div class="AddFilterButton collapseButton" @click="onCollapseClick">
                    <img src="/assets/images/event/icon-plus.svg" alt="">
                    <span>
                        条件を追加する
                    </span>
                </div>
            </section>
        </ks-slide-up-down>

        <section class="SearchBar_section SidebarArea_footer">
            <div class="conditionClearArea">
                <div id="conditionClearButton" @click="onClearClick">
                    <span>
                        条件<br />クリア
                    </span>
                </div>
            </div>
            <div class="searchButtonArea">
                <div class="Button Button-texture Button-responsive Button-eventSearch-sp" @click="onSeachButtonClick">
                    <span class="bebel">
                        <i class="pcg pcg-search"></i>検索
                    </span>
                </div>
            </div>
        </section>
    </div>
</template>
<style scoped>
    .SearchBoxArea_group {
        border-top: solid 1px #ccc;
        margin-top: 16px;
        padding-top: 16px;
        box-sizing: border-box;
    }

    #conditionClearButton {
        span {
            display: block;
            width: 100%;
            border-radius: 4px;
            padding: 10px 0;
            box-sizing: border-box;
            background-color: #f1f1f1;
        }

        &:active {
            span {
                background-color: #ccc;
            }
        }
    }

    .SearchBoxArea {
        margin-bottom: 10px;
    }

    .SearchBarSelect {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
    }

    .FromLabel {
        color: #aaa;
        margin: 0 4px;
    }

    .KSSelect {
        flex: 1;
    }

    .collapseArea {
        margin-left: 16px;
        margin-right: 16px;

        .collapseArea_inner {
            margin-bottom: 20px;
        }

        .specialArea {
            border-top: solid 1px #ccc;
            padding-top: 12px;
            margin-top: 12px;
        }
    }
</style>
<script>
    import Vue from "vue";
    import KSTextInput from "_components/ks-text-input";
    import KSRadio from "_components/ks-radio";
    import KSSelect from "_components/ks-select";
    import SPRadioList from "./sp-radio-list";
    import SPSlideCheckboxGroup from "./sp-slide-checkbox-group";
    import SPSlideRadioGroup from "./sp-slide-radio-group";
    import KSSlideUpDown from '_components/ks-slide-up-down';
    import SlideUpDown from "vue-slide-up-down";
    export default {
        data() {
            return {
                isCollapseOpen: false,
                setaProp: null
            }
        },
        computed: {
            se_ta() {
                return this.$root.getDataByName('se_ta');
            }
        },
        watch: {
            se_ta() {
                // const el = this.$refs.slideUpDown.$el;
                // el.style.height = "auto";
                this.changeSeta(this.se_ta);
                return;
            }
        },
        methods: {
            changeSeta(seta) {
                this.setaProp = seta;
            },
            onCollapseClick() {
                this.isCollapseOpen = true;
            }
            //条件クリア
            , onClearClick() {
                _.each(this.$root.initData, function (value, key, obj) {
                    var item = {
                        key: key
                    }
                    this.clear(item);
                }, this)

                // this.$refs["group-pokemon-type"].checkCount();
                // this.$refs["group-ability"].checkCount();
                // this.$refs["group-special-ability"].checkCount();
                // this.$refs["group-pm-type"].checkCount();
                // this.$refs["group-weak-type"].checkCount();
                // this.$refs["group-regist-type"].checkCount();
                // this.$refs["group-ab-type"].checkCount();
                // this.$refs["group-trainers"].checkCount();
                // this.$refs["group-special-trainers"].checkCount();
                // this.$refs["group-special-energy"].checkCount();
                this.$refs["group-rare"].checkCount();

                // console.log('this',this.$root.initData);

                //リクエスト
                setTimeout(function () {
                    PTC.searchRequest();
                }.bind(this), 10);
                $("html,body").animate({ scrollTop: 0 });
            },
            //検索タップ
            onSeachButtonClick() {
                PTC.searchRequest();
                // 検索結果へスクロール
                //※イベントなどがあってcollapseが開くと、位置がずれるためcollapseが開いた後に移動するために遅延させる
                setTimeout(function () {
                    //TODO jqueryなしにしたい
                    $("html,body").animate({ scrollTop: $('.SearchResultArea').offset().top - 74 });
                }, 360)
            },
            clear(item) {
                switch (item.key) {
                    case "regulation_sidebar_form":
                        Vue.set(window.vueApp.initData, item.key, "all");
                        break;
                    case "sc_hp_s":
                    case "sc_hp_e":
                    case "sc_run_away_e":
                    case "se_ta":
                    case "pg":
                    case "keyword":
                    case "illust":
                        Vue.set(window.vueApp.initData, item.key, "");
                        break;
                    case "sc_run_away_s"://逃げるエネルギー下限
                        Vue.set(window.vueApp.initData, item.key, "0");
                        break;
                    default:
                        Vue.set(window.vueApp.initData, item.key, 0);
                }
            },
        },
        components: {
            "ks-text-input": KSTextInput,
            "ks-radio": KSRadio,
            "ks-select": KSSelect,
            "sp-radio-list": SPRadioList,
            "sp-slide-checkbox-group": SPSlideCheckboxGroup,
            "sp-slide-radio-group": SPSlideRadioGroup,
            'ks-slide-up-down': KSSlideUpDown,
            'slide-up-down': SlideUpDown,
        }
    }
</script>