<template>
    <div class="SearchResultArea " :class="{'js-show':!isProgress}">
        <div class="SearchResultTextBox">
            <div class="ResultText">
                検索結果
                <span class="HitNum Text-fjalla">
                    {{hitCount}}
                </span>
                件
            </div>
            <!--nページ中nページ目-->
            <div class="result-tag" v-show="hitCount">
                <span>{{maxPage}}</span>ページ中
                <span>{{thisPage}}</span>ページ目
            </div>
        </div>
        <!-- 検索結果画像一覧 -->
        <section class="Section " id="SearchResultListArea">
            <!-- カード リスト-->
            <ul class="SearchResultList-box">
                <li v-for="item in cardList" class="List_item" :key="item.showId + Math.floor(Math.random()*10000)">
                    <sp-result-card :item="item"></sp-result-card>
                </li>
                <!-- 次のページ    -->
                <li v-if="isNeedNext" class="List_item">
                    <div class="nextButton" @click.stop="onPaginationRequest(nextCount)">
                        <div>
                            次のページ
                        </div>
                        <div class="pcg pcg-arrow-rigth"></div>
                    </div>
                </li>
            </ul>
            <section v-if="cardList.length==0 && !isProgress" class="Layout-center Text-empty SearchResultArea_statusArea">
                見つかりませんでした
            </section>
            <!-- ページネーション -->
            <div class="Layout PaginationArea">
                <pagination></pagination>
            </div>
        </section>
    </div>
</template>
<style scoped>
    .SearchResultTextBox {
        padding-top: 20px;
        display: flex;
        align-items: baseline;

        .result-tag {
            margin-left: auto;
            font-size: 12px;
            color: #999;
            margin-right: 13px;
        }
    }

    .ResultText {
        margin-left: 16px;
        margin-right: 16px;
        font-size: 1.4rem;
        padding-bottom: 10px;

        .HitNum {
            font-size: 24px;
        }
    }

    .nextButton {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        width: 100%;
        height: 100%;
        background-color: #fff;
        cursor: pointer;
        transition: background-color .2s ease-in;
        font-size: 1.3em;
        box-sizing: border-box;
        color: #bbb;
        border: solid 2px #f3f3f3;

        .pcg {
            font-size: 0.9em;
            padding-left: 6px;
            transition: padding-left .2s ease-in;
        }

        &:active {
            color: #666;
            background-color: #f3f3f3;
            transition: all .15s ease-out;
            border-color: #cfcfcf;

            .pcg {
                font-size: 0.9em;
                transition: padding-left .1s ease-out;
                padding-left: 20px;
            }
        }
    }
</style>
<script>

    import SpResultCard from "./sp-card-search-result-card.vue"
    import Pagination from "../card-search-pagination.vue"
    export default {
        data() {
            return {
                hitCount: 0,
                regulation: "",
                cardList: [],
                thisPage: 0,
                maxPage: 0,
                isProgress: false
            }
        },
        created() {
            PTC.cardSearchStart_handlers.push(this.onSearchStart_handler.bind(this))
            PTC.cardSearchComplete_handlers.push(this.onSearchComplete_handler.bind(this));
            PTC.cardSearchEnd_handlers.push(this.onSearchEnd_handler.bind(this))
        },

        computed: {
            isNeedNext() {
                return this.thisPage < this.maxPage
            },
            nextCount() {
                return this.thisPage + 1;
            }
        },
        methods: {
            //ページネーションリクエスト
            onPaginationRequest(count) {
                PTC.paginationRequest(count);
            },

            onSearchStart_handler() {
                this.isProgress = true;
            },
            onSearchEnd_handler() {
                this.isProgress = false;
            },
            onSearchComplete_handler(response) {
                var cardList = response.cardList;
                if (cardList.length == 0) {
                    //エンプティーチェック
                    this.maxPage = 0;
                    this.thisPage = 0;
                    this.hitCount = 0;
                } else {
                    this.hitCount = response.hitCnt;
                    this.maxPage = response.maxPage;
                    this.thisPage = response.thisPage;
                    var regulation = response.regulation;
                    //カードの描画
                    _.each(cardList, function (obj, i) {
                        obj.url = "/card-search/details.php/card/" + obj.cardID + "/regu/" + regulation;
                        obj.imageUrl = PTC.API_DOMAIN + obj.cardThumbFile;
                        obj.showId = "card-show-id" + i;
                    }.bind(this));
                }
                this.cardList = cardList;
            }
        },
        components: {
            "sp-result-card": SpResultCard,
            "pagination": Pagination
        }
    }
</script>