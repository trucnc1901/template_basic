(function ($, win) {
  'use strict';

  var Lightbox = $.lightbox = (function () {
    var
      $win,
      winWidth,
      minWidth = 960,

      slideIndex = 0,
      slideLength = 0,
      slideLengthBefore = 0,
      posWrapper = 0,
      widthWrapper = 0,
      widthSlide = 960,
      current = 0,

      $lightbox = null,
      $lightboxItem = null,
      $lightboxSlider = null,
      $lightboxWrapper = null,
      $lightboxSliderItem = null;


    function init() {
      $win = $(window);
      winWidth = $win.width();

      $lightbox = $('.lightbox');
      $lightboxItem = $('.lightbox_item');
      $lightboxSlider = $('.lightbox_slider');
      $lightboxWrapper = $('.lightbox_slider_wrapper');
      $lightboxSliderItem = $('.lightbox_slider_item');

      // Clone First and Last Slide Append to Wrapper.
      var firstSlide = $lightboxSlider.find(".lightbox_slider_item:first-child").clone();
      var lastSlide = $lightboxSlider.find(".lightbox_slider_item:last-child").clone();
      $lightboxWrapper
        .append(firstSlide)
        .prepend(lastSlide);
      slideLengthBefore = $lightboxSliderItem.length;
      slideLength = $('.lightbox_slider_item').length;

      lightbox();
      resize();
      $win.on('resize', function (e) {
        resize();
      });
    }

    function resize() {
      winWidth = $win.width();
      winWidth = winWidth < 767 ? winWidth : winWidth = widthSlide;
      $lightboxSlider.css({
        "width": winWidth + "px"
      });
      $lightboxWrapper.find(".lightbox_slider_item").css({
        "width": winWidth + "px"
      });
      posWrapper = -(slideIndex * winWidth + winWidth);
      $lightboxWrapper.css({
        "width": slideLength * winWidth + "px",
        "marginLeft": posWrapper + "px"
      });
    }

    function slideshow(next) {
      var nextPosition = checkPosition(next);
      $lightboxWrapper.animate({
        'marginLeft': nextPosition + 'px'
      }, 500);
      slideIndex = next;
      for(var i = 0; i < slideLengthBefore; i++) {
        $lightboxSliderItem.eq(i).removeClass('active')
      }
      $lightboxSliderItem.eq(slideIndex).addClass('active')
    }

    function paginationSlide() {
      $('.lightbox_slider_next, .lightbox_slider_prev')
        .off()
        .on('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          if($lightboxWrapper.is(":animated")) {
            return;
          }
          var next;
          if($(this).hasClass("lightbox_slider_next")) {
            next = (slideIndex + 1) > slideLengthBefore - 1 ? 0 : slideIndex + 1;
          } else {
            next = (slideIndex - 1) < 0 ? slideLengthBefore - 1 : slideIndex - 1;
          }
          slideshow(next);
        });
    }

    function checkPosition(next) {
      widthSlide = winWidth < 767 ? widthSlide = winWidth : widthSlide;
      var nextPosition = -(widthSlide * next + widthSlide);
      if(slideIndex === slideLengthBefore - 1 && next === 0) {
        $lightboxWrapper.css('marginLeft', 0);
        return -(widthSlide);
      } else if(slideIndex === 0 && next === slideLengthBefore - 1) {
        $lightboxWrapper.css({
          'marginLeft': -(slideLengthBefore * widthSlide + widthSlide) + 'px'
        });
        return -(slideLengthBefore * widthSlide);
      } else {
        return nextPosition;
      }
    }

    function lightbox() {
      $('.lightbox_item').each(function (index, el) {
        var $item = $(this);
        slideLength = $('.lightbox_slider_item').length;
        widthWrapper = slideLength * widthSlide;
        $lightboxWrapper.css('width', widthWrapper);
        $item.on('click', function (e) {
          e.preventDefault();
          var current = $(this).index();
          posWrapper = -(current * widthSlide) - widthSlide;
          var posWrapperSp = -(current * winWidth) - winWidth;
          if(winWidth > 767) {
            $lightboxWrapper.css({
              'marginLeft': posWrapper + 'px'
            });
          } else {
            $lightboxWrapper.css({
              'marginLeft': posWrapperSp + 'px'
            });
          }
          slideIndex = current;
          paginationSlide();

          $(this).stop().toggleClass('open');
          if($(this).hasClass('open')) {
            $(this).parent().next().addClass('lightbox_slider_show').find('.lightbox_slider_container').addClass('show');
            $('.lightbox_slider_overlay').fadeIn(300);
            $('body').append('<div class="lightbox_slider_overlay"></div>');
            closeLightBox();
          } else {
            $(this).closest('html').find('.lightbox_slider').removeClass('lightbox_slider_show').find('.lightbox_slider_container').removeClass('show');
            $('.lightbox_slider_overlay').remove();
          }
        });
      });
    }

    function closeLightBox() {
      $('.lightbox_slider_overlay').off().on('click', function (e) {
        e.preventDefault();
        $lightboxItem.removeClass('open');
        $lightboxSlider.removeClass('lightbox_slider_show').find('.lightbox_slider_container').removeClass('show');
        $('.lightbox_slider_overlay').remove();
        $lightboxWrapper.css('marginLeft', 0);
      });
    }
    return {
      init: init
    };

  })();
  $(Lightbox.init);

})(jQuery, window);
