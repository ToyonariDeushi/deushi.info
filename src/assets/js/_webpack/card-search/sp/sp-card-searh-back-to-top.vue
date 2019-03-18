<template>
    <div class="backToComponent " :class="{'js-show':isShow}">
        <a class="backToComponentButton" href="javascript:void(0);" @click.stop="scrollToTop">
            <i class="pcg pcg-search"></i>
            検索条件の変更
        </a>
    </div>
</template>

<style scoped>
    //検索条件の変更
    .backToComponent {
        position: fixed;
        bottom: -58px;
        left: 50%;
        transform: translateX(-50%);
        transition: bottom .15s ease-out;

        &.js-show {
            bottom: 20px;
            transition: bottom .1s ease-out;
        }

        /* 検索条件の変更ボタン */
        .backToComponentButton {
            /* @include break-no; */
            white-space: nowrap;
            text-decoration: none;
            cursor: pointer;
            box-sizing: border-box;
            padding: 15px 24px;
            background: rgba(0, 0, 0, 0.8);
            border-radius: 14px;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;

            i {
                padding-right: 6px;
            }
        }
    }
</style>

<script>

    export default {

        data() {
            return {
                isShow: false
            }
        },


        mounted() {

            window.addEventListener("onload", this.checkShowBackToComponentButton.bind(this))
            window.addEventListener("scroll", this.checkShowBackToComponentButton.bind(this))
            window.addEventListener("resize", this.checkShowBackToComponentButton.bind(this))

        },
        methods: {
            // 下部ボタンだすかどうか
            checkShowBackToComponentButton() {
                var triggerTopY = $(".SidebarArea").outerHeight() + $(".SidebarArea").offset().top - 180;
                var triggerBottomY = $(".Footer").offset().top - 90;
                var currentTopY = $(window).scrollTop();
                var currentBottomY = currentTopY + $(window).outerHeight();
                if (triggerTopY < currentTopY && currentBottomY < triggerBottomY) {
                    this.isShow = true
                } else {
                    this.isShow = false
                }
            },
            //上に戻る
            scrollToTop() {
                $("html,body").animate({ scrollTop: 0 });
            }
        }

    }
</script>