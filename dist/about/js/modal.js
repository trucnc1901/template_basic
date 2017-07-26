(function ($, win) {
  'use strict';

  var About = $.about = (function () {
    var
      $modalButton = null,
      $modalContent = null;


    function init() {
      $modalButton = $('.button_modal');
      $modalContent = $('.modal');
      modal();
      closeModal();
      loadPage();
    }

    function modal() {
      $modalButton.on('click', function (e) {
        e.preventDefault();
        $(this).stop().toggleClass('open');
        if($(this).hasClass('open')) {
          $modalContent
            .velocity({
              top: '0'
            }, {
              duration: 1000,
              // complete: effectRotate
            });

          $('.overlay').fadeIn(300);
        } else {
          $modalContent.velocity('reverse');
          $('.overlay').fadeOut(300);
        }
      });
    }

    function effectRotate() {
      $modalContent
        .velocity({
          p: {
            rotateZ: 0,
            borderRadius: '0',
            backgroundColor: "#fff"
          },
          o: {
            duration: 300,
          }
        })
        .velocity({
          p: {
            rotateZ: 360,
            borderRadius: '50%',
            backgroundColor: "#ff0000"
          },
          o: {
            complete: effectRotate,
            duration: 1000
          }
        });
    }

    function loadPage() {
      $('.effect').velocity("transition.slideLeftIn", {
          stagger: 350
        })
        .delay(750);
    }


    function closeModal() {
      $('.overlay, .modal_close').on('click', function (e) {
        e.preventDefault();
        $modalButton.removeClass('open');
        $modalContent.animate({
          top: '-100%'
        }, 500);
        $('.overlay').fadeOut(300);
      });
    }
    return {
      init: init
    };

  })();
  $(About.init);

})(jQuery, window);
