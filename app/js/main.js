$(function() {
  $('.catalog__food-select').styler();

  $('.clients-slider').slick({
    dots: true,
    infinite: false,
    prevArrow: $('.clients-nav__btn--prev'),
    nextArrow: $('.clients-nav__btn--next'),
    appendDots: $('.dots-wrap'),
    responsive: [
      {
        breakpoint: 560, 
        settings: {
          dots: false
        }
      }
    ]
  });

  $(window).on('load resize', function() {
    if ($(window).width() < 775) {
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

  $(document).on('click', function (event) {
    if (
      !$mobileMenu.is(event.target) &&
      $mobileMenu.has(event.target).length === 0 &&
      !$burger.is(event.target) && 
      $burger.has(event.target).length === 0
    ) {
      $mobileMenu.removeClass('active');
      $bodyLock.removeClass('lock')
    }
  });

  $('.catalog__range').ionRangeSlider({
    type: "double",
    onStart: updateInputs,
    onFinish: updateInputs,
    onChange: updateInputs,
  });

  instance = $('.catalog__range').data("ionRangeSlider");

  var instance,
  min = 100,
  max = 1000,
  from = 150,
  to = 700;

  function updateInputs (data) {
    from = data.from;
      to = data.to;

      $('.catalog__input--from').prop("value", from);
      $('.catalog__input--to').prop("value", to);
  }

  $('.catalog__input--from').on("input", function () {
    var val = $(this).prop("value");
    
    if (val < min) {
        val = min;
    } else if (val > to) {
        val = to;
    }
    
    instance.update({
        from: val
    });


  $('.catalog__input--to').on("input", function () {
      var val = $(this).prop("value");

      if (val < from) {
          val = from;
      } else if (val > max) {
          val = max;
      }
      
      instance.update({
          to: val
      });
  });
})
});


const mixer = mixitup('.categories-content')