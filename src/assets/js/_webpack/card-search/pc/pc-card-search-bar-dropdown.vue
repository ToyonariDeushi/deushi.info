<template>
    <div class="AddFilterDropDownWrapper" @click.prevent="onClickBg" v-show="open">
        <div class="AddFilterDropDown" :class="{'js-open':open}" @click.stop :style="{'top':dropdownTop+'px','height':dropdownHeight+'px'}">
            <div class="AddFilterDropDown_inner">
                <div class="AddFilterDropDown_group" v-if="$root.getDataByName('se_ta') != ''">
                    <div class=" AddFilterDropDown_group_head">
                        <div v-if="$root.getDataByName('se_ta')=='pokemon'">
                            ポケモンの条件
                        </div>
                        <div v-else-if="$root.getDataByName('se_ta')=='trainer'">
                            トレーナーズの条件
                        </div>
                        <div v-else-if="$root.getDataByName('se_ta')=='energy'">
                            エネルギーの条件
                        </div>
                    </div>
                    <div class="AddFilterDropDown_group_body">
                        <!--  ====================================================================================
                        ポケモンの条件
                        ==================================================================================== -->
                        <template v-if="$root.getDataByName('se_ta') == 'pokemon'">
                            <div class="groupSubList">
                                <div class="subTitle">
                                    <span>進化</span>
                                </div>
                                <div class="subBody">
                                    <checkbox-list :column=5 :gname="'group-pokemon-type'" :onChange="onChnageUi">
                                    </checkbox-list>
                                </div>
                            </div>
                            <div class="groupSubList">
                                <div class="subTitle">
                                    <span>ポケモンの種類</span>
                                </div>
                                <div class="subBody">
                                    <checkbox-list :column=5 :gname="'group-ability'" :onChange="onChnageUi">
                                    </checkbox-list>
                                </div>
                            </div>
                            <div class="groupSubList">
                                <div class="subTitle">
                                    <span>特別なポケモン</span>
                                </div>
                                <div class="subBody">
                                    <checkbox-list :column=5 :gname="'group-special-ability'" :onChange="onChnageUi">
                                    </checkbox-list>
                                </div>
                            </div>
                            <div class="groupSubList">
                                <div class="subTitle">
                                    <span>特性</span>
                                </div>
                                <div class="subBody">
                                    <checkbox-list :column=4 :gname="'group-pokemon-ability-special'" :onChange="onChnageUi">
                                    </checkbox-list>
                                </div>
                            </div>
                            <div class="groupSubList">
                                <div class="subTitle">
                                    <span>タイプ</span>
                                </div>
                                <div class="subBody">
                                    <checkbox-list :column=6 :gname="'group-pm-type'" :onChange="onChnageUi">
                                    </checkbox-list>
                                </div>
                            </div>
                            <div class="groupSubList">
                                <div class="subTitle">
                                    <span>弱点</span>
                                </div>
                                <div class="subBody">
                                    <checkbox-list :column=6 :gname="'group-weak-type'" :onChange="onChnageUi">
                                    </checkbox-list>
                                </div>
                            </div>
                            <div class="groupSubList">
                                <div class="subTitle">
                                    <span>抵抗力</span>
                                </div>
                                <div class="subBody">
                                    <checkbox-list :column=6 :gname="'group-regist-type'" :onChange="onChnageUi">
                                    </checkbox-list>
                                </div>
                            </div>
                            <div class="groupSubList">
                                <div class="subTitle">
                                    <span>ワザのエネルギー</span>
                                </div>
                                <div class="subBody">
                                    <checkbox-list :column=6 :gname="'group-ab-type'" :onChange="onChnageUi">
                                    </checkbox-list>
                                </div>
                            </div>
                        </template>

                        <!--  ====================================================================================
                        トレーナーズの種類
                        ====================================================================================  -->
                        <template v-if="$root.getDataByName('se_ta') == 'trainer'">
                            <div class="groupSubList">
                                <div class="subTitle">
                                    <span>トレーナーズの種類</span>
                                </div>
                                <div class="subBody">
                                    <checkbox-list :column=4 :gname="'group-trainers'" :onChange="onChnageUi">
                                    </checkbox-list>
                                </div>
                            </div>
                            <div class="groupSubList">
                                <div class="subTitle">
                                    <span>特別なトレーナーズ</span>
                                </div>
                                <div class="subBody">
                                    <checkbox-list :column=4 :gname="'group-special-trainers'" :onChange="onChnageUi">
                                    </checkbox-list>
                                </div>
                            </div>
                        </template>

                        <!--  ====================================================================================
                        エネルギーの種類
                        ====================================================================================  -->
                        <template v-if="$root.getDataByName('se_ta') == 'energy'">
                            <div class="groupSubList">
                                <div class="subTitle">
                                    <span>エネルギーの種類</span>
                                </div>
                                <div class="subBody">
                                    <checkbox-list :column=4 :gname="'group-energy'" :onChange="onChnageUi">
                                    </checkbox-list>
                                </div>
                            </div>
                            <div class="groupSubList">
                                <div class="subTitle">
                                    <span>特別なエネルギー</span>
                                </div>
                                <div class="subBody">
                                    <checkbox-list :column=4 :gname="'group-special-energy'" :onChange="onChnageUi">
                                    </checkbox-list>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>

                <div class="AddFilterDropDown_group" v-if="$root.getDataByName('se_ta') == 'pokemon'">
                    <div class="AddFilterDropDown_group_head">HP</div>
                    <div class="AddFilterDropDown_group_body">
                        <div class="SearchBarSelect AddFilterDropDown_group_body_inner">
                            <!-- HP下限 -->
                            <ks-select :data="$root.getUiDataByName('sc_hp_s')" :model="$root.getDataByName('sc_hp_s')"
                                :onChange="onChnageUi"></ks-select>
                            <div class="FromLabel">
                                <span>～</span>
                            </div>
                            <!-- HP上限 -->
                            <ks-select :data="$root.getUiDataByName('sc_hp_e')" :model="$root.getDataByName('sc_hp_e')"
                                :onChange="onChnageUi"></ks-select>
                        </div>
                    </div>
                </div>

                <div class="AddFilterDropDown_group" v-if="$root.getDataByName('se_ta') == 'pokemon'">
                    <div class="AddFilterDropDown_group_head">にげるエネルギー</div>
                    <div class="AddFilterDropDown_group_body">
                        <div class="SearchBarSelect AddFilterDropDown_group_body_inner">
                            <!-- にげる下限-->
                            <ks-select :data="$root.getUiDataByName('sc_run_away_s')" :model="$root.getDataByName('sc_run_away_s')"
                                :onChange="onChnageUi"></ks-select>
                            <div class="FromLabel">
                                <span>～</span>
                            </div>
                            <!-- にげる上限 -->
                            <ks-select :data="$root.getUiDataByName('sc_run_away_e')" :model="$root.getDataByName('sc_run_away_e')"
                                :onChange="onChnageUi"></ks-select>
                        </div>
                    </div>
                </div>

                <div class="AddFilterDropDown_group">
                    <div class=" AddFilterDropDown_group_head">カードの種類</div>
                    <div class="AddFilterDropDown_group_body">
                        <pc-group-sub-list-toggle-radio :column=2 :gname="'pg'" :onChange="onToggleChange">
                            <template slot="sub-title">
                                商品名
                            </template>
                        </pc-group-sub-list-toggle-radio>
                        <div class="groupSubList ">
                            <div class="subTitle">
                                <span>レアリティ</span>
                            </div>
                            <div class="subBody">
                                <checkbox-list :column=4 :gname="'group-rare'" :onChange="onChnageUi"> </checkbox-list>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="AddFilterDropDown_group">
                    <div class=" AddFilterDropDown_group_head">イラストレーター名</div>
                    <div class="AddFilterDropDown_group_body">
                        <div class="groupSubList ">
                            <div class="subBody">
                                <ks-text-input :name="'illust'" :size="'middle'" :style="'width:50%;display:block;'"
                                    :model="$root.getDataByName('illust')" :onChange="onChnageUi"></ks-text-input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .AddFilterDropDown_group_head {
        white-space: nowrap;
    }

    .AddFilterDropDown_inner {
        overflow: hidden;
    }
</style>
<script>
    import KSDropdown from "_components/ks-dropdown";
    import KSRadio from "_components/ks-radio";
    import KSCheckbox from "_components/ks-checkbox";
    import KSSelect from "_components/ks-select";
    import CheckboxList from "./pc-checkbox-list";
    import PCGroupSubListToggleCheckbox from "./pc-group-sub-list-toggle-checkbox";
    import PCGroupSubListToggleRadio from "./pc-group-sub-list-toggle-radio";
    import KSSlideUpDown from '_components/ks-slide-up-down'
    import KSTextInput from '_components/ks-text-input'
    export default {
        props: ["open", "fixed"],
        data() {
            return {
                dropdownTop: 0,
                isFixed: false,
                interval: null,
                dropdownHeight: 0,
                resizeTimeout: null
            }
        },
        watch: {
            open: function (val) {
                if (open) {
                    //TODO これやりたくない
                    if (this.resizeTimeout) {
                        clearTimeout(this.resizeTimeout);
                        this.resizeTimeout = null;
                    }
                    this.resizeTimeout = setTimeout(function () {
                        this.resizeDropdownHeight();
                    }.bind(this), 50)
                }

            }
            , fixed: function (val) {
                this.isFixed = this.fixed;
                //TODO これやりたくない
                if (this.resizeTimeout) {
                    clearTimeout(this.resizeTimeout);
                    this.resizeTimeout = null;
                }
                this.resizeTimeout = setTimeout(function () {
                    this.resizeDropdownHeight();
                }.bind(this), 50);
            }
        },
        mounted() {
            document.addEventListener("scroll", this.resizeDropdownHeight.bind(this))
        },
        methods: {
            onClickBg() {
                this.$emit('event-add-filter-toggle', false);
            },
            /**
             * 何かしらのトグルが開閉した
             */
            onToggleChange(isOpen) {
                // this.resizeDropdownHeight();
            },
            openCheckByGroupName(name) {

                var names = _.pluck(this.$root.getUiGroupByName(name), "name")
                // console.log("まずはnameをすべて取得", names)
                var find = _.find(names, function (item) {
                    var data = this.$root.getDataByName(item);
                    // console.log(item, data);
                    return this.$root.getDataByName(item);
                }, this)
                if (find) return true;
                return false;
            },
            /**
             * ドロップダウン高さ設定
             */
            resizeDropdownHeight() {

                if (!this.open) {
                    this.dropdownHeight = 0;
                    return;
                }
                //TOP設定
                var t = ($(".CardSearchBar").offset().top + $(".CardSearchBar").outerHeight()) - $(window).scrollTop();

                //固定されていたら
                if (this.isFixed) {
                    t = $(".CardSearchBar").outerHeight() - 6;
                }
                // console.log('isFixed', this.isFixed);
                // console.log('t', t);
                this.dropdownTop = t;
                setTimeout(
                    this.setOpenInterval.bind(this), 10
                )
            }

            , setOpenInterval() {
                //高さ 徐々に広がる設定
                this.clearInterval();

                this.interval = setInterval(function () {
                    var targetTop = this.offsetTop("AddFilterDropDown")
                    // console.log("targetTop" + targetTop)
                    var targetH = $(window).innerHeight() + $(window).scrollTop() - targetTop - 60;
                    // 下辺位置の判断。コンテンツ自体の高さと、ブラウザ下部からの位置の比較
                    var ph = document.getElementsByClassName("AddFilterDropDown_inner")[0].clientHeight;
                    // console.log("targetH= ", targetH, "  ph=" + ph);
                    targetH = Math.max(100, Math.min(targetH, ph));
                    var currentH = document.getElementsByClassName("AddFilterDropDown")[0].clientHeight;
                    var h = currentH + (targetH - currentH) * 0.2;
                    this.dropdownHeight = h;

                    if (Math.abs(targetH - h) < 3) {
                        this.dropdownHeight = targetH;
                        // this.clearInterval();
                    }
                }.bind(this), 1000 / 60);

            },
            /**
            * ドロップダウン開くinterval削除
            */
            clearInterval() {
                if (this.interval) {
                    clearInterval(this.interval);
                    this.interval = null;
                }
            },

            offsetTop(className) {
                var target = document.getElementsByClassName(className)[0];
                var rect = target.getBoundingClientRect();
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                var top = rect.top + scrollTop;
                return top;
            }
            //検索開始
            , onChnageUi() {
                PTC.searchRequest();
            }
        },
        components: {
            'ks-dropdown': KSDropdown,
            'ks-radio': KSRadio,
            'ks-select': KSSelect,
            'ks-checkbox': KSCheckbox,
            'pc-group-sub-list-toggle-checkbox': PCGroupSubListToggleCheckbox,
            'pc-group-sub-list-toggle-radio': PCGroupSubListToggleRadio,
            'checkbox-list': CheckboxList,
            'ks-text-input': KSTextInput
        }
    }
</script>