//スライダ共通インポート
//= include ./_slider-common.js

//-----------------------------------------
// スライダ
//-----------------------------------------
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
                centerPadding: '0px',
                variableWidth: false
                , adaptiveHeight: true
            }
        }
    ]
    }
);
//-----------------------------------------
// 背景切り替え機能
//-----------------------------------------
this.initSliderBg = function () {
    /**
     * スライド背景を変更
     * @type {*}
     */
    this.changeSliderBg = $.proxy(function () {
        if (KS.config.isSP) {
            $(".SliderWrapper").css("background-image", "");
        } else {
            //var currentIndex = $('.slider').slick('slickCurrentSlide');
            var imageURL = $(".slick-current").find("img").attr("src");
            if (!imageURL) imageURL = $(".slick-current").find("a").find("img").attr("data-lazy");
            if (imageURL) {
                imageURL = imageURL.slice("/assets/images/index/slides/");
                var bgImagePath = imageURL.replace(/\.png/, "-bg.png").replace(/\.jpg/, "-bg.jpg");
                $(".SliderWrapper").css("background-image", "url('" + bgImagePath + "')");
            }
        }
    }, this);
    this.changeSliderBg();

    /**
     * スライドが変更完了した
     */
    slick.on('afterChange', $.proxy(function () {
        this.changeSliderBg();
    }, this));

    /**
     * SPとPCのレイアウト切り替わり
     */
    $("body").on(KS.ON_BREAK_POINT, $.proxy(function (e, isSP) {
        this.changeSliderBg();
    }, this));

};

//-----------------------------------------
// スライド背景切り替え機監視スタート
//-----------------------------------------
this.initSliderBg();

//-----------------------------------------
//リサイズ監視スタート
//-----------------------------------------
this.sliderResizeStart(1680, 1040);

