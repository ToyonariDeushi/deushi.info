/**
 * ----------------------------------------------------------------------------------------
 * リサイズ関連
 * ----------------------------------------------------------------------------------------
 */
$(document).ready($.proxy(function () {
    this.resize();
}, KS));

$(window).resize($.proxy(function () {
    this.resize();
}, KS));

/**
 * ========================================================================================
 * リサイズ
 * ========================================================================================
 */
KS.resize = function () {
    //if (KS.config.isResponsive) {
        var w = window.innerWidth;
        $("body").trigger(this.ON_RESIZE);
        if (w > this.config.WIDTH_RESPONSIVE) {
            //PC
            if (this.config.isSP) {
                //メディアクエリレイアウト変更イベント
                this.config.isSP = false;
                $("body").trigger(this.ON_BREAK_POINT, this.config.isSP);
            }
        } else {
            //SP
            if (!this.config.isSP) {
                //メディアクエリレイアウト変更イベント
                this.config.isSP = true;
                $("body").trigger(this.ON_BREAK_POINT, this.config.isSP);
            }
        //}
    }
};

KS.resize();
