(function ($, win) {
  'use strict';

  var Share = $.share = (function () {
    var
      maxHeightArray = [],

      $window = null,
      winWidth = 0,
      widthFlg = false,

      $dropDown = null,
      $dropDownList = null,
      $global_nav = null,
      $menuButton = null,
      $contentAccordion = null,
      $btnAccordion = null;


    function init() {
      $window = $(window);
      winWidth = $window.width();
      widthFlg = (winWidth > 767) ? false : true;


      // --------------------------------------
      //  variable
      // --------------------------------------
      $dropDown = $('.dropdown');
      $dropDownList = $('.dropdown_list');
      $menuButton = $('.btn_menu');
      $global_nav = $('.global_nav');

      // --------------------------------------
      //  functions
      // --------------------------------------
      setPageTopPosition();
      removeHoverCSSRule();
      resetCSS();
      dropdown();
      smoothScroll();
      navFixed();
      menuButton();
      getMaxHeightMenuAccordion();
      accordioMenuSP();

      $window.on('resize', function () {
        winWidth = $window.width();
        widthFlg = (winWidth > 767) ? false : true;
        resetCSS();
        getMaxHeightMenuAccordion();
        accordioMenuSP();
      });
    }

    // --------------------------------------
    //  Get Max Height Menu Accordion
    // --------------------------------------
    function getMaxHeightMenuAccordion() {
      $('.global_nav_item').each(function (index, el) {
        if(widthFlg) {
          var $this = $(this).find('.global_nav_content');
          var maxHeightTemp = $this.height();
          maxHeightArray.push(maxHeightTemp);
        }
      });
    }
    // --------------------------------------
    //  button menu
    // --------------------------------------
    function menuButton() {
      $menuButton.on('click', function (e) {
        e.preventDefault();
        $(this).stop()
          .toggleClass('open')
          .attr('aria-pressed', 'true');
        if($(this).hasClass('btn_menu_push')) {
          menuPull();
        } else {
          if($(this).hasClass('open')) {
            if($global_nav.hasClass('global_nav_right')) {
              $('.global_nav_right')
                .addClass('show')
                .closest('html').css('overflow', 'hidden');
              $('.overlay').fadeIn(300);
            } else {
              $global_nav.closest('.header').addClass('header_show_global_nav');
            }
          } else {
            $(this)
              .attr('aria-pressed', 'false')
              .closest('.header').removeClass('header_show_global_nav');
            $('.global_nav_right')
              .removeClass('show')
              .closest('html').removeAttr('style');
            $('.overlay').removeAttr('style');
          }
        }
      });
      closeMenu();
    }
    // --------------------------------------
    //  Menu Pull
    // --------------------------------------
    function menuPull() {
      if($('.btn_menu').hasClass('open')) {
        $('.global_nav_push').addClass('show');
        $('.overlay').fadeIn(300);
        $('body')
          .addClass('body_push')
          .parent('html').css('overflow', 'hidden');
      } else {
        $('.btn_menu').attr('aria-pressed', 'false');
        $('.overlay').removeAttr('style');
        $('.global_nav_push').removeClass('show');
        $('body')
          .removeClass('body_push')
          .parent('html').removeAttr('style');
      }
    }
    // --------------------------------------
    //  Close Menu
    // --------------------------------------
    function closeMenu() {
      $('.overlay').on('click', function (e) {
        e.preventDefault();
        $('.btn_menu').attr('aria-pressed', 'false');
        $('.overlay').removeAttr('style');
        $('.global_nav_push, .global_nav_right').removeClass('show');
        $('body')
          .removeClass('body_push')
          .parent('html').removeAttr('style');
      });
    }
    // --------------------------------------
    //  Dropdown Menu
    // --------------------------------------
    function dropdown() {
      $dropDown.off().on({
        'mouseenter': function () {
          if(!widthFlg) {
            $(this).find($dropDownList).stop().velocity('fadeIn');
          }
        },
        'mouseleave': function () {
          if(!widthFlg) {
            $(this).find($dropDownList).velocity('fadeOut', 100);
            $('.dropdown_list_item').removeAttr('style');
          }
        }
      });
    }
    // --------------------------------------
    //  Accordion Menu SP
    // --------------------------------------
    function accordioMenuSP() {
      $('.global_nav_item').each(function (index, el) {
        var $item = $(this).find('.global_nav_accordion');
        var pos = $(this).index();
        if(widthFlg) {
          if(!$item.hasClass('active')) {
            $(this).find('.global_nav_content').css('max-height', '0');
          } else {
            $item.next('.global_nav_content').css({
              'max-height': maxHeightArray[pos]
            });
          }
          $item.off().on('click', function (e) {
            e.preventDefault();
            var $this = $(this);
            $this.stop().toggleClass('active');
            $this.parent().siblings()
              .find('.global_nav_accordion').removeClass('active')
              .next('.global_nav_content').css('max-height', 0);
            if($this.hasClass('active')) {
              $this.next('.global_nav_content').css({
                'max-height': maxHeightArray[pos]
              });
            } else {
              $this.removeClass('active');
              $this.next('.global_nav_content').css({
                'max-height': '0'
              });
            }
          });
        }
      });
    }

    // --------------------------------------
    //  Nav Fixed
    // --------------------------------------
    function navFixed() {
      $window.scroll(function () {
        var $header = $(".header");
        var heightHeader = $header.height();
        $header.css('top', -heightHeader);
        if($window.scrollTop() > 100) {
          $header
            .addClass('fixed')
            .css('top', 0);
        } else {
          $header
            .removeClass('fixed')
            .removeAttr('style');
        }
      });
    }

    function setPageTopPosition() {
      $window.on({
        'scroll': function () {
          if($window.scrollTop() > 100) {
            $('#back_top > a').addClass('visible');
          } else {
            $('#back_top > a').removeClass('visible');
          }
          if($window.scrollTop() + $window.height() - $('footer').offset().top > 0) {
            $('#back_top > a').addClass('fixed');
          } else {
            $('#back_top > a').removeClass('fixed');
          }
        }
      });
    }
    // --------------------------------------
    //  Smooth Scroll
    // --------------------------------------
    function smoothScroll() {
      $('a[href^="#"]').on("click", function (e) {
        e.preventDefault();
        var h = $(this).attr("href");
        var t = $(h == "#" || h === "" ? 'body' : h);
        var p = t.offset().top;
        $('html,body').velocity("scroll", {
          duration: 500,
          easing: 'easeInBack',
          offset: p
        });
        return false;
      });
    }
    // --------------------------------------
    //  Reset CSS
    // --------------------------------------
    function resetCSS() {
      if(widthFlg) {
        $('.dropdown_list, .dropdown_list_item, .overlay, html').removeAttr('style');
      } else {
        $('.global_nav_content').removeAttr('style');
      }
    }

    // --------------------------------------
    //  Remove Hover on SP
    // --------------------------------------
    function removeHoverCSSRule() {
      if('createTouch' in document) {
        try {
          var ignore = /:hover/;
          for(var i = 0; i < document.styleSheets.length; i++) {
            var sheet = document.styleSheets[i];
            if(!sheet.cssRules) {
              continue;
            }
            for(var j = sheet.cssRules.length - 1; j >= 0; j--) {
              var rule = sheet.cssRules[j];
              if(rule.type === CSSRule.STYLE_RULE && ignore.test(rule.selectorText)) {
                sheet.deleteRule(j);
              }
            }
          }
        } catch(e) {}
      }
    }

    return {
      init: init
    };

  })();
  $(Share.init);

})(jQuery, window);
