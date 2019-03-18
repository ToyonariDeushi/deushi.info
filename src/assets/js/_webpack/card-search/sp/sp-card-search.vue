<template>
    <div>
        <div class="MainArea">
            <transition name="main">
                <div class="ContentsArea" v-if="isCreated">
                    <!-- 検索内容通知エリア -->
                    <sp-card-search-notification></sp-card-search-notification>
                    <!-- タブ -->
                    <ks-select-tab :listdata="$root.getUiDataByName('se_ta')" :bind="$root.getDataByName('se_ta')" @on-change="onTabChange"></ks-select-tab>
                    <!-- 検索コンポネント -->
                    <sp-card-search-component ref="searchComponent"></sp-card-search-component>
                    <!-- 検索結果 -->
                    <sp-card-search-result></sp-card-search-result>
                    <!-- トップに戻る -->
                    <sp-card-search-back-to-top></sp-card-search-back-to-top>
                </div>
            </transition>
        </div>

    </div>
</template>
<style>
    .main-enter-active,
    .main-leave-active {
        transition: opacity .5s;
    }

    .main-enter,
    .main-leave-to {
        opacity: 0;
    }
</style>
<script>

    import KSSelectTab from "_components/ks-select-tab";
    import SpCardSearchResult from "./sp-card-search-result";
    import SpCardSearchComponent from "./sp-card-search-component";
    import BackToTop from "./sp-card-searh-back-to-top";
    import SPCardSearchNotification from "./sp-card-search-notification";
    export default {

        data() {
            return {
                toggleAddFilter: false,
                isFixed: false,
                isProgress: false,
                isMounted: false,
                isCreated:false
            }
        },
        created() {
            this.isCreated =true;
            PTC.cardSearchStart_handlers.push(this.onSearchStart_handler.bind(this))
            PTC.cardSearchComplete_handlers.push(this.onSearchComplete_handler.bind(this));
            PTC.cardSearchError_handlers.push(this.onSearchError_handler.bind(this))
            PTC.cardSearchEnd_handlers.push(this.onSearchEnd_handler.bind(this))
        },

        mounted() {

            this.isMounted = true;
            //-------------------------------------
            //検索開始
            //-------------------------------------
            PTC.searchRequest();
        },
        methods: {
            onSearchStart_handler() {
                this.isProgress = true;
            },
            onSearchError_handler() {
            },
            onSearchEnd_handler() {
                this.isProgress = false;
            },
            onSearchComplete_handler(response) {
            },
            onTabChange(value){
                // console.log("tab changed",value)
            }
        },
        components: {
            'ks-select-tab': KSSelectTab,
            'sp-card-search-component': SpCardSearchComponent,
            "sp-card-search-result": SpCardSearchResult,
            "sp-card-search-back-to-top": BackToTop,
            "sp-card-search-notification": SPCardSearchNotification
        }
    }
</script>