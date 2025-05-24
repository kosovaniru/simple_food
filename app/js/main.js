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
    if ($(window).width() < 768) {
      $('.resturants__list:not(.slick-initialized)').slick({
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
      {
        breakpoint: 560, 
        settings: {
          slidesToShow: 1, 
          arrows: false,
          dots: true,
        }
      },
    ]
  });

  function toggleBodyLock(lock) {
    if (lock) {
      $('body').addClass('lock');
    } else {
      $('body').removeClass('lock')
    }
  }

  function closeMenus() {
    $('.header-hidden--main').removeClass('active');
    $('.menu-filter').removeClass('active');
    toggleBodyLock(false);
  }
  
  $('.header__burger').on('click', function () {
    $('.header-hidden--main').toggleClass('active');
    toggleBodyLock($('.header-hidden--main').hasClass('active'));
  });

  $('.catalog__hidden-btn').on('click', function () {
    $('.menu-filter').toggleClass('active');
    toggleBodyLock($('.menu-filter').hasClass('active'));
  });

  $('.header-hidden__burger').on('click', function () {
    closeMenus();
  })

  $(document).on('click', function (event) {
    if (
      !$(event.target).closest('.header-hidden--main, .header__burger, .menu-filter, .catalog__hidden-btn').length
    ) {
      closeMenus();
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

var myCarousel = new Carousel($("#burgerCarousel")[0], {
  preload: 2,
  dots: true
});

$("[data-fancybox='gallery']").fancybox({
  Thumbs: false,
  Toolbar: false,
  closeButton:
    '<button class="carousel__button fancybox__button--close" tabindex="0" data-fancybox-close="" title="Close">' +
    '<svg viewBox="0 0 24 24" role="img" tabindex="-1" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M20 20L4 4m16 0L4 20"></path></svg></button>',
  Carousel: {
    Dots: true,
    on: {
      change: function (that) {
        myCarousel.slideTo(myCarousel.findPageForSlide(that.page), {
          friction: 0,
        });
      }
    }
  }
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
document.addEventListener('DOMContentLoaded', ()=> {
  const categoriesContent = document.querySelector('.categories__content');

  if (categoriesContent) {
    const mixer = mixitup('.categories__content')
  }
})

// const myCarousel = new Carousel(document.querySelector("#burgerCarousel"), {
//   preload: 2,
//   Dots: true
// });

// Fancybox.bind('[data-fancybox="gallery"]', {
//   Thumbs: false,
//   Toolbar: false,

//   closeButton: '<button class="carousel__button fancybox__button--close" tabindex="0" data-fancybox-close="" title="Close"><svg viewBox="0 0 24 24" role="img" tabindex="-1" xmlns="http://www.w3.org/2000/svg"><path d="M20 20L4 4m16 0L4 20"></path></svg></button>',
//   Carousel: {
//     Dots: true,
//     on: {
//       change: (that) => {
//         myCarousel.slideTo(myCarousel.findPageForSlide(that.page), {
//           friction: 0,
//         })
//       }
//     }
//   } 
// });