<template>
    <div>
        <!-- 検索バー -->
        <card-search-bar ref="searchbar" @event-add-filter-toggle="onToggleAddFilter" :fixed="isFixed" :open="toggleAddFilter"></card-search-bar>
        <!-- 検索結果 -->
        <card-search-result></card-search-result>
        <!-- 検索バー 条件追加ドロップダウン -->
        <card-search-bar-dropdown ref="dropdownMenu" @event-add-filter-toggle="onToggleAddFilter" :open="toggleAddFilter"
            :fixed="isFixed"></card-search-bar-dropdown>
    </div>
</template>
<script>

    import CardSearchBar from "./pc-card-search-bar";
    import CardSearchBarDropdown from "./pc-card-search-bar-dropdown";
    import CardSearchResult from "./pc-card-search-result";
    import SlideUpDown from "vue-slide-up-down";
    export default {

        data() {
            return {
                toggleAddFilter: false,
                isFixed: false
            }
        },
        mounted() {
            window.addEventListener('scroll', this.fixedCheck.bind(this))
            window.addEventListener('resize', this.fixedCheck.bind(this))
            window.addEventListener('load', this.fixedCheck.bind(this))
            this.fixedCheck();

            //-----------------------------------------
            //パネル外側クリック、で閉じる判定
            //-----------------------------------------
            window.addEventListener("click", function (e) {
                // console.log('e',e);
                var dropdown = this.$refs.dropdownMenu.$el;
                var addFilterButton = this.$refs.searchbar.getButton();
                // console.log('ドロップダウンがくりっくされたか', dropdown.contains(e.target));
                // console.log('addFilterButtonがくりっくされたか', addFilterButton.contains(e.target));

                // if (!this.toggleAddFilter) return;
                //クリックされたものは、ドロップダウンボタンでもパネルでもない場合
                if (!dropdown.contains(e.target) && !addFilterButton.contains(e.target)) {
                    // console.log('パネル外側クリック、で閉じる判定');
                    // this.$emit('close');
                    this.toggleAddFilter = false;
                }
            }.bind(this));
            //-------------------------------------
            //検索開始
            //-------------------------------------
            PTC.searchRequest();
        },
        methods: {
            onToggleAddFilter(isOpen) {
                this.toggleAddFilter = isOpen;
            },
            fixedCheck() {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                var myMain = document.getElementsByClassName("CardSearchBar")[0];
                var rect = myMain.getBoundingClientRect();
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                var baseTop = rect.top + scrollTop;

                //固定開始位置より後にスクロールされた場合
                if (scrollTop > baseTop) {
                    //固定開始位置以前にスクロールされた場合
                    this.isFixed = true;
                } else {
                    this.isFixed = false;
                }
            },

        },
        components: {
            'card-search-bar': CardSearchBar,
            'card-search-bar-dropdown': CardSearchBarDropdown,
            'card-search-result': CardSearchResult,
            'slide-up-down': SlideUpDown
        }
    }
</script>