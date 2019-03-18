<!-- TODO -->
<template>
    <div>

        <!-- debug -->
        <!-- <div v-if="isShow">
            thisPage {{thisPage}} <br>
            maxPage {{maxPage}}<br>
            startPage {{startPage}}<br>
            endPage {{endPage}}<br>
            loopMax{{loopMax}}
        </div> -->

        <transition name="main">

            <div v-if="isShow">
                <nav class="Pagination">
                    <ul>
                        <!--前のページ-->
                        <li v-if="thisPage > 1">
                            <div class="prev" @click.stop="onPaginationRequest(preCount)"><span class="label">前のページ</span></div>
                        </li>
                        <!-- ページネーション -->
                        <li v-for="item in list">
                            <template v-if="item.isCurrent">
                                <span class="current">{{item.count}}</span>
                            </template>
                            <template v-else>
                                <div @click.stop="onPaginationRequest(item.count)">
                                    {{item.count}}</div>
                            </template>
                        </li>
                        <!-- 次のページ    -->
                        <li v-if="thisPage < maxPage">
                            <div class="next" @click.stop="onPaginationRequest(nextCount)"><span class="label">次のページ</span></div>
                        </li>
                    </ul>

                    <div v-if="maxPage>5" class="information">
                        [全 <span class="AllNum">{{maxPage}}</span>ページ]
                    </div>
                </nav>
            </div>
        </transition>
    </div>
</template>

<style scoped>
    .main-enter-active,
    .main-leave-active {
        transition: opacity .3s ease-out;
    }
    .main-enter,
    .main-leave-to {
        opacity: 0;
    }

    li {
        cursor: pointer;

        .current {
            cursor: default;
        }
    }
</style>
<script>
    export default {
        data() {
            return {
                data: null,
                list: null,
                isShow: false,
                thisPage: 0,
                loopMax: 0,
                startPage: 0,
                endPage: 0,
            }
        },
        computed: {
            preCount() {
                return this.thisPage - 1;
            },
            nextCount() {
                return this.thisPage + 1;
            }
        },
        created() {
            PTC.cardSearchStart_handlers.push(this.onSearchStart_handler.bind(this))
            PTC.cardSearchComplete_handlers.push(this.onSearchComplete_handler.bind(this));
            PTC.cardSearchError_handlers.push(this.onSearchError_handler.bind(this))
            PTC.cardSearchEnd_handlers.push(this.onSearchEnd_handler.bind(this))
        },
        methods: {
            onPaginationRequest(count) {
                // console.log('', count);
                PTC.paginationRequest(count);

            },
            hidePagination() {
                this.isShow = false;
                this.list = [];
            },
            onSearchStart_handler() {
            },
            onSearchError_handler() {
            },
            onSearchEnd_handler() {
            },
            onSearchComplete_handler(response) {

                this.hidePagination();
                var cardList = response.cardList;
                if (cardList.length > 0) {
                    this.maxPage = response.maxPage;
                    this.thisPage = response.thisPage;
                    this.loopMax = Math.min(5, this.maxPage);
                    this.startPage = Math.min(this.thisPage - 2, this.maxPage - this.loopMax + 1);
                    this.startPage = (this.startPage < 1) ? 1 : this.startPage;
                    this.endPage = this.startPage + this.loopMax - 1;
                    this.list = _.times(this.loopMax, function (count) {
                        var count = this.startPage + count;
                        var nombre = count + 1;
                        var isCurrent = (count == this.thisPage);
                        return { count: count, nombre: nombre, isCurrent: isCurrent };
                    }, this)
                    this.isShow = true;
                }
            }
        }
    }
</script>