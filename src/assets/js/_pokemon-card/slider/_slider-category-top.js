//スライダ共通インポート
//= include ./_slider-common.js

// -----------------------------------------
// スライダ
// -----------------------------------------
var slickNum = $('.slider_item').length;
console.log(slickNum);
if(slickNum > 1) {
    var slick = $('.slider').slick(
        {
            infiniteLoop: true
            , slideMargin: 20
            , touchEnabled: true
            , autoplay: true
            , autoplaySpeed: slideTime
            , adaptiveHeight: true
            , variableWidth: true
            , centerMode: true
            , dots: true
            //, lazyLoad: 'progressive'
            , responsive: [
            {
                //SPの場合
                breakpoint: KS.config.WIDTH_RESPONSIVE,
                settings: {
                    slidesToShow: 1,
                    infinite: true,
                    arrows: false,
                    centerPadding: '0px'
                    , variableWidth: false
                    , adaptiveHeight: true
                }
            }
        ]
        }
    );
} else {
    var slick = $('.slider').slick(
        {
            infiniteLoop: false
            , slideMargin: 20
            , touchEnabled: true
            , autoplay: true
            , autoplaySpeed: slideTime
            , adaptiveHeight: true
            , variableWidth: true
            , centerMode: true
            , dots: true
            //, lazyLoad: 'progressive'
            , responsive: [
            {
                //SPの場合
                breakpoint: KS.config.WIDTH_RESPONSIVE,
                settings: {
                    slidesToShow: 1,
                    infinite: false,
                    arrows: false,
                    centerPadding: '0px'
                    , variableWidth: false
                    , adaptiveHeight: true
                }
            }
        ]
        }
    );
}

//-----------------------------------------
//リサイズ監視スタート
//-----------------------------------------
this.sliderResizeStart(1360, 584);

//-----------------------------------------
// SP時、スライドの高さが変わった場合の、メインエリア上部のマージンを変更
//-----------------------------------------
this.setMainAreaResizeListener = function () {
    var mainAreaYpos_timer;
    this.setMainAreaYpos = function () {
        //タイマー実行
        clearTimeout(mainAreaYpos_timer);
        mainAreaYpos_timer = setTimeout(this.resizeSlider, 120);
    };
    this.resizeSlider = function(){
        //console.log("tiemr")
        var margin = 48;
        var top = $(".SliderArea").offset().top;
        if (KS.config.isSP) {
            var height = ($("html").width() * 584) / 1360;
            $(".MainArea").css("margin-top", (height + top + margin) + "px");
        } else {
            $(".MainArea").css("margin-top", "");
        }
    };
    /**
     * スライドが変更完了した
     */
    slick.on('afterChange', $.proxy(function () {
        this.resizeSlider();
    }, this));

    $("body").on(KS.ON_RESIZE, $.proxy(function () {
        this.resizeSlider();
        this.setMainAreaYpos();
    }, this));
    this.setMainAreaYpos();
}

this.setMainAreaResizeListener();
