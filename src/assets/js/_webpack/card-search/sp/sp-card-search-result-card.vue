<template>
    <div class="List_item_inner" :class="{'js-loaded':isLoaded,'js-landscape':isLandscape}">
        <a @click="onClickImage" href="javascript:void(0)" :id="item.showId">
            <!-- 動的にimg入れる -->
        </a>
    </div>
</template>

<script>
    export default {
        props: ["item"],
        data() {
            return {
                data: this.item
                , isLoaded: false
                , image: null
                , isLandscape: false
            }
        },
        created() {
            this.image = new Image();
            this.image.alt = this.item.cardNameAltText;
            this.image.onload = this.onLoaded.bind(this)
            this.image.src = this.item.imageUrl;

        },
        destroyed() {
            this.image.onload = null;
            this.image = null;
            this.isLoaded = false;
        },
        methods: {
            onLoaded() {
                var width = this.image.width;
                var height = this.image.height;
                if (width > height) {
                    this.isLandscape = true;
                }
                var target = document.getElementById(this.item.showId);
                if (target) {
                    target.appendChild(this.image);
                    this.isLoaded = true;
                }
            },
            onClickImage() {
                var w = 780;
                var h = 700;
                window.open(this.data.url, '_blank', 'width=' + w + ',height=' + h + ',resizable=yes,scrollbars=yes,menubar=no,toolbar=no');
            },
        }
    }
</script>