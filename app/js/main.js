$(function() {
  $('.catalog__food-select, .product__input-field').styler();

  $('.clients__slider').slick({
    dots: true,
    infinite: false,
    prevArrow: $('.slider-nav__btn--prev'),
    nextArrow: $('.slider-nav__btn--next'),
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

  $(".product__star, .tabs__comments-star").rateYo({
    starWidth: "16px",
    normalFill: "#C1C1C1",
    ratedFill: "#FFB800",
    readOnly: true,
    starSvg: '<svg><use xlink:href="images/sprite.svg#star"></use></svg>'
  }),

  $(".comments-form__star").rateYo ({
    starWidth: "16px",
    normalFill: "#C1C1C1",
    ratedFill: "#FFB800",
    starSvg: '<svg><use xlink:href="images/sprite.svg#star"></use></svg>'
  })

  $('.interest__slider').slick({
    arrows: true,
    slidesToShow: 4, 
    slidesToScroll: 1,
    infinite: false,
    prevArrow: $('.slider-nav__btn--prev'),
    nextArrow: $('.slider-nav__btn--next'),
    responsive: [
      {
        breakpoint: 1230, 
        settings: {
          slidesToShow: 4, 
        }
      },
      {
        breakpoint: 992, 
        settings: {
          slidesToShow: 3, 
        }
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 2, 
          dots: true,
          arrows: false
        }
      },
    ]
  });
  
  $('.header__burger').on('click', function () {
    $('.header-hidden--main').toggleClass('active'); 
  
    if ($('.header-hidden--main').hasClass('active')) {
      $('body').addClass('lock'); 
    } else { 
      $('body').removeClass('lock'); 
    }
  }),

  $('.catalog__hidden-btn').on('click', function () {
    $('.menu-filter').toggleClass('active'); 

    if ($('.menu-filter').hasClass('active')) {
      $('body').addClass('lock'); 
    } else { 
      $('body').removeClass('lock'); 
    }
  });

  $('.header-hidden__burger').on('click', function () {
    $('.header-hidden--main').removeClass('active');
    $('body').removeClass('lock');
  })

  $('.header-hidden__burger').on('click', function () {
  $('.menu-filter').removeClass('active');
  $('body').removeClass('lock');
  })

  $(document).on('click', function (event) {
    if (
      !$('.header-hidden--main').is(event.target) &&
      $('.header-hidden--main').has(event.target).length === 0 &&
      !$('.header__burger').is(event.target) && 
      $('.header-burger').has(event.target).length === 0 &&
      !$('.menu-filter').is(event.target) &&
      $('.menu-filter').has(event.target).length === 0 &&
      !$('.catalog__hidden-btn').is(event.target) &&
      $('.catalog__hidden-btn').has(event.target).length === 0
    ) {
      $('.header-hidden--main').removeClass('active');
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
    $('.sales__list:not(.slick-initialized)').slick({
      arrows: false,
      dots: true,
      infinite: true,
      speed: 100,
      slidesToShow: 1
    });
  } else {
    $(".sales__list.slick-initialized").slick("unslick");
  }
});

$('.product__slider').slick({
  dots: false,
  infinite: false,
  slidesToShow: 1,
  prevArrow: $('.product-nav__btn--prev'),
  nextArrow: $('.product-nav__btn--next'),
  responsive: [
    {
      breakpoint: 992, 
      settings: {
        arrow: false
      }
    }
  ]
});

$('.product__slider').on('afterChange', function () {
  Fancybox.bind("[data-fancybox='gallery']");
});

$('.tabs__top-link').on('click', function(e) {
  e.preventDefault();
  $('.tabs__top-link').removeClass('tabs__top-link--active');
  $(this).addClass('tabs__top-link--active');
  $('.tabs__content-item').removeClass('tabs__content-item--active');
  $($(this).attr('href')).addClass('tabs__content-item--active');
});

Fancybox.bind("[data-fancybox='gallery']", {
  Thumbs: {
    autoStart: true, 
  },
  Toolbar: {
    display: ["zoom", "close"],
  },
  animationEffect: "zoom-in-out",
});

})


const mixer = mixitup('.categories__content')