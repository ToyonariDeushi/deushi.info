<!-- TODO カオスみが深いなので整理したい -->

<template>
  <div ref="container" :class="{'js-mounted':isCreated,'js-displaynone':isDispNone}" :style="{'height':hei, 'overflow': 'hidden','transition-duration': this.duration + 'ms' }">
    <slot v-show="active">
    </slot>
  </div>
</template>

<style scpoed>
  .js-mounted {
    transition-property: 'height';
  }

  .js-displaynone {
    display: none;
  }
</style>
<script>

  export default {

    props: {
      active: Boolean,
      duration: {
        type: Number,
        default: 500
      },
      tag: {
        type: String,
        default: 'div'
      }
    },

    data: () => ({
      scrollHeight: 0,
      isFirst: true,
      isMounted: false,
      isCreated: false,
      slideDownComplete: false,
      slideUpStart: false,
      isDisplayNone: false,
      fadeoutTimeout: null
    }),

    created() {
      this.isCreated = true;
    },
    watch: {
      active() {
        this.layout()
      }
    },

    mounted() {
      window.addEventListener('resize', this.layout)

      this.layout()

      this.$nextTick(() => {
        this.isMounted = true;
      })
    },

    destroyed() {
      window.removeEventListener('resize', this.layout)
    },

    computed: {
      isDispNone() {
        return this.isDisplayNone;
      },
      slideDownComp() {
        return this.slideDownComplete;
      },
      slideUpStarted() {
        return this.slideUpStart;
      },
      hei() {
        const heightSize = (this.active || this.slideUpStarted) ? this.scrollHeight : 0
        
        var h = this.isMounted ? heightSize + 'px' : 'auto'
        if (this.slideDownComp) {
          h = "auto";
        }
        return h;
      },
      style() {
        const heightSize = this.active ? this.scrollHeight : 0

        var obj = {
          overflow: 'hidden',
          'transition-property': 'height',
          'transition-duration': this.duration + 'ms'
        }

        return obj;
      }
    },

    methods: {
      layout() {

        clearTimeout(this.fadeoutTimeout);
        const { container } = this.$refs;

        if (this.active) {
          // this.slideUpStart = false;
          this.isDisplayNone = false;
          setTimeout(function () {
            this.scrollHeight = container.scrollHeight
            if (this.isFirst) {
              this.isFirst = false;
              this.slideDownComplete = true;
            } else {
              setTimeout(function () {
                //開ききったらheight autoにする
                this.slideDownComplete = true;
              }.bind(this), this.duration + 15);
            }
          }.bind(this), 10);
        } else {
          if (this.isFirst) {
            this.isFirst = false;
            this.isDisplayNone = true;
            // this.slideUpStart = true;
          } else {
            // this.isDisplayNone = false;
            this.slideUpStart = true
            this.slideDownComplete = false;
            setTimeout(function () {
              this.slideUpStart = false;
            }.bind(this), 10);

            //締まりきったとき
            this.fadeoutTimeout = setTimeout(function () {
              this.isDisplayNone = false;
            }.bind(this), this.duration + 10);

          }
        }
      }
    }
  }
</script>