//----------------------------------------------
// トップページの PICKUP エリアの VIDEO MODAL 表示
//----------------------------------------------
var videoContainer   = document.querySelector('.js-video-container');
var videoModalCloseButton   = document.querySelector('.js-close-modal');

var toggleVideoModal = function() {
    var videoModal   = document.querySelector('.js-video-modal');
    var videoPlayer   = document.querySelector('#js-youtube-player');
    var hasModalClassName = videoModal.classList.contains('js-show-modal');
    if (!hasModalClassName) {
        videoModal.classList.add('js-show-modal');
        document.body.style.overflow = 'hidden';
      } else {
        videoModal.classList.remove('js-show-modal');
        document.body.style.overflow = 'visible';
        if ( videoPlayer ) {
          var iframeSrc = videoPlayer.src;
          videoPlayer.src = iframeSrc;
        }
    }
}

if (videoContainer != null) {
  videoContainer.addEventListener('click', toggleVideoModal);
}
if (videoModalCloseButton != null) {
  videoModalCloseButton.addEventListener('click', toggleVideoModal);
}
