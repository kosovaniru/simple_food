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
    $('.header-hidden').toggleClass('active'); 
  
    if ($('.header-hidden').hasClass('active')) {
      $('body').addClass('lock'); 
    } else { 
      $('body').removeClass('lock'); 
    }
  }),

  $('.menu-filter__hidden-btn').on('click', function () {
    $('.menu-filter').toggleClass('active'); 

    if ($('.menu-filter').hasClass('active')) {
      $('body').addClass('lock'); 
    } else { 
      $('body').removeClass('lock'); 
    }
  });

  $('.header-hidden__burger').on('click', function () {
    $('.header-hidden').removeClass('active');
    $('body').removeClass('lock');
  })

  $('.header-hidden__burger').on('click', function () {
  $('.menu-filter').removeClass('active');
  $('body').removeClass('lock');
  })

  $(document).on('click', function (event) {
    if (
      !$('.header-hidden').is(event.target) &&
      $('.header-hidden').has(event.target).length === 0 &&
      !$('.header-burger').is(event.target) && 
      $('.header-burger').has(event.target).length === 0 &&
      !$('.menu-filter').is(event.target) &&
      $('.menu-filter').has(event.target).length === 0 &&
      !$('.menu-filter__hidden-btn').is(event.target) &&
      $('.menu-filter__hidden-btn').has(event.target).length === 0
    ) {
      $('.header-hidden').removeClass('active');
      $('.menu-filter').removeClass('active');
      $('body').removeClass('lock')
    }
  });

  $('.menu-filter__range').ionRangeSlider({
    type: "double",
    onStart: updateInputs,
    onFinish: updateInputs,
    onChange: updateInputs,
  });

  instance = $('.menu-filter__range').data("ionRangeSlider");

  var instance,
  min = 100,
  max = 1000,
  from = 150,
  to = 700;

  function updateInputs (data) {
    from = data.from;
      to = data.to;

      $('.menu-filter__input--from').prop("value", from);
      $('.menu-filter__input--to').prop("value", to);
  }

  $('.menu-filter__input--from').on("input", function () {
    var val = $(this).prop("value");
    
    if (val < min) {
        val = min;
    } else if (val > to) {
        val = to;
    }
    
    instance.update({
        from: val
    });


  $('.menu-filter__input--to').on("input", function () {
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

$(window).on('load resize', function() {
  if ($(window).width() < 775) {
    $('.sales-list:not(.slick-initialized)').slick({
      arrows: false,
      dots: true,
      infinite: true,
      speed: 100,
      slidesToShow: 1
    });
  } else {
    $(".sales-list.slick-initialized").slick("unslick");
  }
});
})


const mixer = mixitup('.categories-content')