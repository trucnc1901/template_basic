(function ($, win) {
  'use strict';

  var Modal = $.modal = (function () {
    var
      $modalButton = null,
      $modalContent = null;


    function init() {
      $modalButton = $('.btn_modal');
      $modalContent = $('.modal');
      modal();
    }

    function modal() {
      $modalButton.off().on('click', function (e) {
        var id = $(this).attr('id');
        $(this).stop().toggleClass('open');
        if($(this).hasClass('open')) {
          $(this).closest('html').find('.modal.' + id).addClass('modal_show').find('.modal_container').addClass('show');
          $('.modal_overlay').fadeIn(300);
          $('body').append('<div class="modal_overlay"></div>');
          closeModal();
        } else {
          $(this).closest('html').find('.modal.' + id).removeClass('modal_show').find('.modal_container').removeClass('show');
          $('.modal_overlay').remove();
        }
      });

    }

    function closeModal() {
      $('.modal_overlay, .modal_close').off().on('click', function (e) {
        e.preventDefault();
        $modalButton.removeClass('open');
        $modalContent.removeClass('modal_show').find('.modal_container').removeClass('show');
        $('.modal_overlay').remove();
      });
    }
    return {
      init: init
    };

  })();
  $(Modal.init);

})(jQuery, window);
