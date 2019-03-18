"use strict";
//= include ./_pokemon-card/_ks-component.js

var PTC = PTC || {};
PTC.API_DOMAIN = "";
PTC.SERVER_TIME="";
PTC.API_EVENT_DOMAIN ="";
//開発時API
if (location.href.indexOf("localhost") != -1) {
    PTC.API_DOMAIN = "http://staging.pokemon-card.com";
    PTC.API_EVENT_DOMAIN = "http://localhost:"+location.port;
}

/**
 * グローバルメニューにカレントを当てる
 */
PTC.setCurrentGlobalMenu = function () {
    //第二回層で判定
    var categoryList = ["about", "rules", "products",  "event", "https://map.pokemon-card.com/", "card-search", "deck"];
    // var categoryList = ["products", "https://map.pokemon-card.com/", "calendar", "card-search", "event", "rules", "about", "deck"];
    var href = location.href;
    var category = href.split(location.host)[1].split("/")[1];
    //console.log("category " + category)
    _.each(categoryList, $.proxy(function (val, index) {
        //console.log(val, index)
        if (val == category) {
            var targetList = $(".GlobalMenuList_item")[index];
            $(targetList).addClass("current");
            return;
        }
    }, this));
};

/**
 * 指定ターゲットまでスクロール
 * @param $target
 */
PTC.scrollTo = function (ypos, $target) {
    var pos = ypos | 0;
    if ($target && $target.offset()) pos = $target.offset().top;
    $("html,body").animate({scrollTop: pos}, {duration: 'fast', easing: 'swing'});
};

/**
 * 外部ドメインリンクとPDFにtarget blankを設定する
 */
PTC.setBlankLink = function () {
    _.each($("a"), function (a, b) {
        if (!$(a)) return;
        var href = $(a).attr("href");
        if (!href) return;
        //PDFなら
        if (href.indexOf(".pdf") != -1 || href.indexOf(".PDF") != -1) {
            $(a).attr("target", "_blank");
            //console.log("add blank", href)
        }
        //外部ドメインなら
        if (href.slice(0, 4) == "http" && href.indexOf(location.host) == -1) {
            $(a).attr("target", "_blank");
            //console.log("add blank", href)
        }
    })
};

/**
 * 画像プリロード
 * @param image_path
 */
PTC.preLoad = function (image_path) {
    $("<img>").attr("src", image_path);
};

/**
 * カード詳細ポップアップをセット
 * .popup-card-detailクラスがついているリンクを別ウィンで開くように設定する
 */
// PTC.setCardDetailPopupWindow = function (width, height) {
//     var w = width | 780;
//     var h = height | 700;
//     $('.popup-card-detail').on("click", function () {
//         window.open(this.href, '_blank', 'width=' + w + ',height=' + h + ',resizable=yes,scrollbars=yes,menubar=no,toolbar=no');
//         return false;
//     });
// };

/**
 * モーダルウィンドウを閉じる
 */
PTC.closeModalWindow = function () {
    $("#ModalArea").remove();
};


/**
 * js-linkクラスがついているものをリンク化する
 * @type {*}
 */
PTC.setJsLink = $.proxy(function(){
    $('.js-link').on('click', function(e){
        //伝播をストップ
        e.stopPropagation();
        e.preventDefault();

        //リンクを取得して飛ばす
        location.href = $(this).attr('data-url');
    })
},this);

/**
 * HTMLエスケープ
 * @param {*} string 
 */
PTC.escapeHtml=function (string) {
    if(typeof string !== 'string') {
      return string;
    }
    return string.replace(/[&'`"<>]/g, function(match) {
      return {
        '&': '&amp;',
        "'": '&#x27;',
        '`': '&#x60;',
        '"': '&quot;',
        '<': '&lt;',
        '>': '&gt;',
      }[match]
    });
}
  
//----------------------------------------------
// トップページの PICKUP エリアの VIDEO MODAL 表示
//----------------------------------------------
// const videoContainer   = document.querySelector('.js-video-container');
// const videoModalCloseButton   = document.querySelector('.js-close-modal');

// const toggleVideoModal = () => {
//     const videoModal   = document.querySelector('.js-video-modal');
//     const videoPlayer   = document.querySelector('#js-youtube-player');
//     let hasModalClassName = videoModal.classList.contains('js-show-modal');
//     if (!hasModalClassName) {
//         videoModal.classList.add('js-show-modal');
//       } else {
//         videoModal.classList.remove('js-show-modal');
//         if ( videoPlayer ) {
//           let iframeSrc = videoPlayer.src;
//           videoPlayer.src = iframeSrc;
//         }
//     }
// }

// videoContainer.addEventListener('click', toggleVideoModal);
// videoModalCloseButton.addEventListener('click', toggleVideoModal);


// const changeLabelColor = () => {
//   const tags = document.querySelectorAll(".Calendar_Label");
//   tags.forEach(tag => {
//       if (tag.innerHTML === "商品") {
//           tag.style.backgroundColor = "#FE2501";
//       }	else if (tag.innerHTML === "コラム") {
//           tag.style.backgroundColor = "#FEBF02";
//       }	else if (tag.innerHTML === "キャンペーン") {
//           tag.style.backgroundColor = "#027C00";
//       }	else if (tag.innerHTML === "イベント") {
//           tag.style.backgroundColor = "#102CE2";
//       }
//   });
// }

// changeLabelColor();

/**
 * 初期化
 */
PTC.setBlankLink();
PTC.setCurrentGlobalMenu();
