$(function () {

    this.isActive = false;
    this.activeClass = "isActive";

    //ハンバーガー
    this.HamburgerButton = ".HamburgerButton";
    this.GlobalMenuArea = ".GlobalMenuArea";
    this.GlobalMenuList = ".GlobalMenuList";

    //検索
    this.SearchButton = ".SearchButton";
    this.SearchFloat = ".SearchArea_header";
    this.SearchFloat_inner = ".SearchArea_inner";

    /**
     * フロート開閉
     */
    this.onChangeActive = function (target) {
        //ターゲットがあれば開く
        switch (target) {
            case "search":
                if (!$(this.SearchFloat).hasClass(this.activeClass)) {
                    $(this.SearchButton).addClass(this.activeClass);
                    $(this.SearchFloat).addClass(this.activeClass);
                    $(this.SearchFloat).css("height", $("body").innerHeight()-$(".Header").outerHeight())
                } else {
                    this.closeFloats();
                }
                break;
            case "hamburger":
                if (!$(this.HamburgerButton).hasClass(this.activeClass)) {
                    $(this.HamburgerButton).addClass(this.activeClass);
                    $(this.GlobalMenuArea).addClass(this.activeClass);
                } else {
                    this.closeFloats();
                }
                break;
            default :
                this.closeFloats();
        }
    };

    /**
     * すべて閉じる
     */
    this.closeFloats = function () {
        $(this.SearchButton).removeClass(this.activeClass);
        $(this.HamburgerButton).removeClass(this.activeClass);
        $(this.GlobalMenuArea).removeClass(this.activeClass);
        $(this.SearchFloat).removeClass(this.activeClass);
    }

    /**
     * SPとPCのレイアウト切り替わりタイミングで閉じる
     */
    $("body").on(KS.ON_BREAK_POINT, $.proxy(function (e, isSP) {
        this.isActive = false;
        this.closeFloats();
    }, this));

    //-----------------------------------------
    // ハンバーガー関連
    //-----------------------------------------
    /**
     * ハンバーガークリック設定
     */
    $(this.HamburgerButton).on("click", $.proxy(function () {
        this.isActive = !this.isActive;
        this.onChangeActive("hamburger");
    }, this));

    /**
     * 背景がクリックされたら閉じる
     */
    $(this.GlobalMenuArea).on("click", $.proxy(function () {
        this.isActive = false;
        this.closeFloats();
    }, this));

    /**
     * フロート内がクリックされても閉じないようにする
     */
    $(this.GlobalMenuList).on("click", $.proxy(function (e) {
        e.stopPropagation();
    }, this));

    //-----------------------------------------
    // 検索関連
    //-----------------------------------------
    $(this.SearchButton).on("click", $.proxy(function () {
        this.isActive = !this.isActive;
        this.onChangeActive("search");
    }, this));

    /**
     * 背景がクリックされたら閉じる
     */
    $(this.SearchFloat).on("click", $.proxy(function () {
        this.isActive = false;
        this.closeFloats();
    }, this));

    /**
     * フロート内がクリックされても閉じないようにする
     */
    $(this.SearchFloat_inner).on("click", $.proxy(function (e) {
        e.stopPropagation();
    }, this));


});
