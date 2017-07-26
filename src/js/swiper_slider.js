(function ($, win) {
  'use strict';

  var Slider = $.slider = (function () {
    var
      $window = null,
      winWidth = 0,
      widthFlg = false;

    function init() {
      $window = $(window);
      winWidth = $window.width();
      widthFlg = (winWidth > 767) ? false : true;

      Slider();

    }

    function Slider() {
      var mySwiper = $('.swiper-container').swiper({
        loop: true,
        slidesPerView: 'auto',
        loopedSlides: 3,
        autoplay: 3000,
        speed: 800,
        centeredSlides: true,
        autoplayDisableOnInteraction: false,
        runCallbacksOnInit: true,
      });

      swiperThumbs(mySwiper, {
        element: 'slider_thumbnail',
        activeClass: 'is_active'
      });

      $('.slider_btn_next').click(function () {
        mySwiper.detachEvents();
        mySwiper.slideNext();
        mySwiper.attachEvents();
      });

      $('.slider_btn_prev').click(function () {
        mySwiper.detachEvents();
        mySwiper.slidePrev();
        mySwiper.attachEvents();
      });

      setWidthBackground();

      $(window).on('load resize', function () {
        winWidth = $window.width();
        widthFlg = (winWidth > 767) ? false : true;
        if(winWidth <= 1044) {
          mySwiper.params.slidesPerView = 1;
          mySwiper.params.centeredSlides = false;
          $('.slider_btn_next').removeAttr('style');
          $('.slider_btn_prev').removeAttr('style');
        } else {
          mySwiper.params.slidesPerView = 'auto';
          mySwiper.params.centeredSlides = true;
          setWidthBackground();
        }
        mySwiper.update();
      });
      $(window).trigger('load resize');
    }

    function setWidthBackground() {
      var widthWrapper = $('.slider').width();
      var widthWin = $(window).width();
      var widthOverlay = (widthWin - widthWrapper) / 2;
      $('.slider_btn_next').css({
        'width': widthOverlay,
        'right': -widthOverlay,
        'background-color': 'rgba(0, 0, 0, 0.3)'
      });
      $('.slider_btn_prev').css({
        'width': widthOverlay,
        'left': -widthOverlay,
        'background-color': 'rgba(0, 0, 0, 0.3)'
      });
    }

    return {
      init: init
    };

  })();
  $(Slider.init);

})(jQuery, window);
