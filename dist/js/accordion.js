(function ($, win) {
  'use strict';

  var Accordion = $.accordion = (function () {
    var
      $accordionButton = null,
      $accordionContent = null;


    function init() {
      $accordionButton = $('.btn_accordion');
      $accordionContent = $('.container_accordion');
      accordion();
    }

    function accordion() {
      $accordionButton.each(function (index, el) {
        $(this).on('click', function () {
          var $this = $(this);
          var heightHeader = $('.header').height();
          $this.stop().toggleClass('active');
          $this.siblings().removeClass('active').next('.container_accordion').slideUp();
          if($this.hasClass('active')) {
            $this.next('.container_accordion').stop().slideDown(function () {
              var tempPos = $this.offset().top;
              var curPos = tempPos - heightHeader;
              $('html, body').velocity("scroll", {
                duration: 500,
                easing: 'easeInBack',
                offset: curPos
              });
              return false;
            });
          } else {
            $this.removeClass('active');
            $this.next('.container_accordion').stop().slideUp();
          }
        });
      });
    }
    return {
      init: init
    };

  })();
  $(Accordion.init);

})(jQuery, window);
