$(function() {
  $('.clients-slider').slick({
    dots: true,
    infinite: false,
    prevArrow: $('.clients-nav__arrow--prev'),
    nextArrow: $('.clients-nav__arrow--next'),
    appendDots: $('.dots-wrap')
  });

  $(window).on('load resize', function() {
    if ($(window).width() < 768) {
      $('.resturants:not(.slick-initialized)').slick({
        arrows: false,
        dots: true,
        infinite: true,
        speed: 100,
        slidesToShow: 1
      });
    } else {
      $(".resturants.slick-initialized").slick("unslick");
    }
  });

  $(window).scroll(function () {

    if ($(window).scrollTop() > 50) {
      $('.header__inner').addClass('sticky');
    } else {
      $('.header__inner').removeClass('sticky');
    }
  });

  $('.product-slider').slick({
    dots: true,
    arrows: true,
  });

  $(".product-content__star").rateYo({
    starWidth: "16px",
    normalFill: "#C1C1C1",
    ratedFill: "#FFB800",
    readOnly: true,
  })

  $('.interest-slider').slick({
    arrows: true,
    slidesToShow: 4, 
    slidesToScroll: 1,
    adaptiveHeight: true,
  });

  $('.header-burger').on('click', function () {
    console.log('Клік працює!');
  });

  const $burger = $('.header-burger'); 
  const $hiddenBurger =$('.header-hidden__burger')
  const $mobileMenu = $('.header-hidden'); 
  const $bodyLock = $('body');
  
  $burger.on('click', function () {
    $mobileMenu.toggleClass('active'); 
  
    if ($mobileMenu.hasClass('active')) {
      $bodyLock.addClass('lock'); 
    } else { 
      $bodyLock.removeClass('lock'); 
    }
  });

  $hiddenBurger.on('click', function () {
    $mobileMenu.removeClass('active');
    $bodyLock.removeClass('lock');
  })
});



const mixer = mixitup('.categories-content')