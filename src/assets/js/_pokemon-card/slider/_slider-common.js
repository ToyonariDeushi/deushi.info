//ローダーgifプリロード
//PTC.preLoad("/assets/images/ajax-loader.gif");


var slideTime = 2500;

/**
 * スライド高さをセットする
 * @imageW 実際の画像の幅
 * @imageH 実際の画像の高さ
 */
this.sliderResizeStart = function (imageW, imageH) {
    var timer;
    this.initSlideHeight = $.proxy(function () {
        //clearTimeout(timer);
        //timer = setTimeout(this.setSliderHeight, 100);
        this.setSliderHeight()
    }, this);
    this.setSliderHeight = function () {
        var height;
        //SP時
        if (KS.config.isSP) {
            height = ($("html").width() * imageH) / imageW;
            $('.slider_item').css("height", height + "px");
        } else {
            height = (imageH / 2)
            $('.slider_item').css("height", height + "px");
        }
        //console.log("height", height)
    };
    $("body").on(KS.ON_RESIZE, $.proxy(function () {
        this.initSlideHeight();
    }, this));
    this.initSlideHeight();
    this.setSliderHeight();
}
