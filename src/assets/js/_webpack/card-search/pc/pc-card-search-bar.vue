<template>
    <!-- <ks-slide-up-down :active="isLoaded"> -->
    <div class="CardSearchBar" :class="{'js-show':isLoaded,'js-fixed':isFixed}">
        <div class="CardSearchBar_inner" :class="{'js-fixed':isFixed}">
            <div class="CardSearchBar_body">
                <!-- 件数 -->
                <div id="AllCountArea" :class="{'loading':isSearchProgress}">
                    <div class="indicator"></div>
                    <div>
                        <span class="allCount">
                            <span class="num Text-fjalla" id="AllCountNum">{{totalCount}}</span>
                            <div class="label">件</div>
                        </span>
                    </div>
                </div>

                <!-- テキスト検索 -->
                <div class="CardSearchBar_section SearchBoxArea">
                    <ks-text-input :name="'keyword'" :placeholder="'名前やテキスト'" :model="$root.getDataByName('keyword')"
                        :icon="'header-search'"
                        :onChange="onChangeUi" :maxLength="64"></ks-text-input>
                </div>

                <!-- カードの種類 -->
                <div class="CardSearchBar_section">
                    <ks-dropdown :listdata="$root.getUiDataByName('se_ta')" :bind="$root.getDataByName('se_ta')"
                        :onChange="onChangeUi"></ks-dropdown>
                </div>

                <!-- レギュレーション-->
                <div class="CardSearchBar_section ">
                    <ks-dropdown :listdata="$root.getUiDataByName('regulation_sidebar_form')" :bind="$root.getDataByName('regulation_sidebar_form')"
                        :onChange="onChangeUi"></ks-dropdown>
                </div>

                <!-- 条件追加 -->
                <div id="AddFilterArea">
                    <div ref="AddFilterButton" class="AddFilterButton" @click.prevent="onClickAddFilterButton" :class="{'js-active':toggleAddFilter}">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scpoed>
    .AddFilterButton {
        cursor: pointer;
        overflow: hidden;
        height: 44px;
        width: 96px;
        background-position: 0 0;
        background-size: cover;
        background-repeat: no-repeat;
        background-image: url("/assets/images/card-search/btn-add-condition.png?v=1");

        &:hover {
            background-position: 0 -44px;
        }

        &.js-active {
            background-position: 0 -88px;

            &:hover {
                background-position: 0 -88px;
            }
        }
    }
</style>
<script>
    import KSDropdown from "_components/ks-dropdown";
    import KSRadio from "_components/ks-radio";
    import KSCheckbox from "_components/ks-checkbox";
    import KSSelect from "_components/ks-select";
    import KSTextInput from "_components/ks-text-input";
    import KSSlideUpDown from '_components/ks-slide-up-down';
    export default {
        props: ["fixed", "open"],
        data() {
            return {
                isLoaded: false,
                isFixed: this.fixed,
                isSearchProgress: false,
                searchCount: 0,
                toggleAddFilter: this.open,
                countInterval: null,
            }
        },
        created() {
            PTC.cardSearchStart_handlers.push(this.onSearchStart_handler.bind(this))
            PTC.cardSearchComplete_handlers.push(this.onSearchComplete_handler.bind(this));
            PTC.cardSearchEnd_handlers.push(this.onSearchEnd_handler.bind(this))
        },
        mounted() {
            this.isLoaded = true;
        },

        watch: {
            fixed: function () {
                this.isFixed = this.fixed;
            },
            open() {
                this.toggleAddFilter = this.open;
            }
        },
        computed: {
            totalCount() {
                return this.searchCount;
            }
        },
        methods: {

            getButton() {
                return this.$refs.AddFilterButton;
            },
            //追加条件クリック
            onClickAddFilterButton() {
                this.toggleAddFilter = !this.toggleAddFilter
                this.$emit('event-add-filter-toggle', this.toggleAddFilter)
            },
            onSearchStart_handler() {
                this.isSearchProgress = true;
            },
            onSearchEnd_handler() {
                this.isSearchProgress = false;
            },
            /**
             * 検索完了
             */
            onSearchComplete_handler(response) {
                var cardList = response.cardList;
                // console.log('', this.searchCount, response.hitCnt);
                this.setCountInterval(response.hitCnt);
                // if (cardList.length == 0) {
                //     //エンプティーチェック
                //     this.searchCount = 0;
                // } else {
                //     this.searchCount = response.hitCnt;
                // }
            },
            setCountInterval(targetCount) {

                this.clearCountInterval();
                var startCount = this.searchCount;
                var diff = targetCount - startCount;
                var step = Math.ceil(diff / 40);
                if (step == 0) {
                    this.searchCount = targetCount;
                    this.clearCountInterval();
                } else {
                    this.countInterval = setInterval(function () {
                        this.searchCount += step;
                        // console.log('this.searchCount', this.searchCount, targetCount, diff, step);
                        if (diff > 0) {
                            if (this.searchCount >= targetCount) {
                                this.searchCount = targetCount;
                                this.clearCountInterval();
                            }
                        } else if (diff < 0) {
                            if (this.searchCount <= targetCount) {
                                // console.log('-');
                                this.searchCount = targetCount;
                                this.clearCountInterval();
                            }
                        } else {
                            this.searchCount = targetCount;
                            this.clearCountInterval();
                        }
                    }.bind(this), 1000 / 60)
                }
            },
            clearCountInterval() {

                clearInterval(this.countInterval);
            },
            onChangeUi() {
                //検索開始
                setTimeout(function () {
                    PTC.searchRequest();
                }.bind(this), 10)
            }
        },
        components: {
            'ks-dropdown': KSDropdown,
            'ks-radio': KSRadio,
            'ks-select': KSSelect,
            'ks-checkbox': KSCheckbox,
            'ks-text-input': KSTextInput,
            'ks-slide-up-down': KSSlideUpDown
        }
    }
</script>