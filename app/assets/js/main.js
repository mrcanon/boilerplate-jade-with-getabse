(function ($) {
  'use strict';
  // **********************************************************************//
  // ! Init variables global
  // **********************************************************************//

  var $body = $('body'),
    $header = $('#header');

  // **********************************************************************//
  // ! Breakpoint website
  // **********************************************************************//
  var breakpoint = {
    m: 768,
    l: 992,
    xl: 1200
  };

  // **********************************************************************//
  // ! Check device mobile (http://detectmobilebrowsers.com)
  // **********************************************************************//
  var isMobile = {
    Android: function() {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };

  // **********************************************************************//
  // ! Show/hide menu on device mobile
  // **********************************************************************//
  var toggleMenuMobile = function () {
    var $headerMenu = $('#header-menu', '#header');
    $headerMenu.on('click', function() {
      var $this = $(this),
        $icon = $this.find('i'),
        $target = $($this.attr('href'));

      $icon
        .toggleClass('fa-bars')
        .toggleClass('fa-times');
      $target.slideToggle(500);

      return false;
    });
  };

  // **********************************************************************//
  // ! Reset style when resize
  // **********************************************************************//
  var resetStyle = function () {
    var $iconMenu = $('#header-menu', '#header').find('i'),
      $headerNav = $('#header-nav', '#header'),
      $footerNav = $('#footer-menu', '#footer'),
      widthDevice = $(window).width();

    if(widthDevice >= breakpoint.l) {
      $iconMenu.removeClass('fa-times').addClass('fa-bars');
      $headerNav
        .removeAttr('style')
        .find('.sub-menu').removeAttr('style').end()
        .find('.menu-item-has-children').removeClass('is-active');

      $footerNav
        .removeAttr('style')
        .find('.sub-menu').removeAttr('style').end()
        .find('.menu-item-has-children').removeClass('is-active');
    }
  };

  // **********************************************************************//
  // ! Slider swiper
  // **********************************************************************//
  var sliderSwiper = function () {
    var $sliders = $('.swiper-container');

    // Check exit owl element
    if($sliders.length > 0) {
      new Swiper('.swiper-container', {
        autoplay: 5000,
        autoplayDisableOnInteraction: false,
        centeredSlides: true,
        loop: true,
        nextButton: '.swiper-arrow-next',
        pagination: '.swiper-pagination',
        paginationClickable: true,
        prevButton: '.swiper-arrow-prev',
        slidesPerView: 'auto',
        spaceBetween: 0,
        speed: 600
      });
    }
  };

  // **********************************************************************//
  // ! Show/hide menu has sub menu
  // **********************************************************************//
  var toggleSubMenu = function(element, position) {
    var $menuLink = $(element);
    $menuLink.on('click', '> a', function () {
      var $this = $(this),
        $target = $this.next(),
        $parent = $this.parent(),
        widthDevie = $(window).width(),
        mediaQuery = position === 'footer' ? breakpoint.m : breakpoint.l;
      console.log(mediaQuery);
      if(widthDevie < mediaQuery) {
        $parent.toggleClass('is-active');
        $target.slideToggle(500);
      }
      return false;
    });
  };

  // **********************************************************************//
  // ! Scroll to item
  // **********************************************************************//
  var scrollTo = function () {
    var $scrollItem = $('[data-action="scroll"]');

    $scrollItem.on('click', function (e) {
      e.preventDefault();
      var $target = $($(this).attr('href')) || $('#' + $(this).data('target')),
        offset = parseInt($(this).data('offset')) || 0;
      $('html, body').animate({
        scrollTop: $target.offset().top - offset
      }, 800);
    });
  };

  // **********************************************************************//
  // ! Check hash
  // **********************************************************************//
  var scrollToHash = function () {
    var $target = $(window.location.hash),
      offset = $header.outerHeight();

    if($target.length > 0) {
      $('html, body').animate({
        scrollTop: $target.offset().top - offset
      }, 800);
    }
  };

  // **********************************************************************//
  // ! Back step contact form
  // **********************************************************************//
  var backStepContact = function () {
    var $btnBack = $('#btn-back', '#contact');
    $btnBack.on('click', function () {
      $(this).parents('form').removeClass('failed');
      return false;
    })
  };

  // **********************************************************************//
  // ! Window load
  // **********************************************************************//
  $(window).on('load', function() {
    scrollToHash();
  });

  // **********************************************************************//
  // ! Window resize
  // **********************************************************************//
  $(window).on('resize', function() {
    resetStyle();
  });

  // **********************************************************************//
  // ! Window scroll
  // **********************************************************************//
  $(window).on('scroll', function() {

  });

  // **********************************************************************//
  // ! window dome ready
  // **********************************************************************//
  $(document).on('ready', function () {
    toggleMenuMobile();
    resetStyle();
    sliderSwiper();
    toggleSubMenu('#header .menu-item-has-children', 'header');
    toggleSubMenu('#footer .menu-item-has-children','footer');
    scrollTo();
    backStepContact();
  });
})(jQuery);
