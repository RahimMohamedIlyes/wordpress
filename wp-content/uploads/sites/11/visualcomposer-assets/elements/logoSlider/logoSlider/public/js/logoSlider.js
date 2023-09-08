(function ($) {
  var initSlider = function (sliders) {
    if (sliders.length) {
      sliders.each(function () {
        var slider = $(this);
        var dots = slider.parent().find('.vce-logo-slider-dots');
        var prevArrow = slider.find('.vce-logo-slider-prev-arrow') || '';
        var nextArrow = slider.find('.vce-logo-slider-next-arrow') || '';
        var settings = {
          autoplay: slider[0].dataset.slickAutoplay === 'on',
          autoplaySpeed: slider[0].dataset.slickAutoplayDelay,
          arrows: slider[0].dataset.slickArrows === 'on',
          prevArrow: prevArrow,
          nextArrow: nextArrow,
          appendDots: dots,
          dots: slider[0].dataset.slickDots === 'on',
          infinite: slider[0].dataset.slickInfinite === 'on',
          slidesToShow: 5,
          slidesToScroll: 1,
          respondTo: 'slider',
          responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 4
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 554,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1
              }
            }
          ]
        };

        var slidesToShow = slider[ 0 ].dataset.slickSlidesToShow;

        if (slidesToShow) {
          var responsive = slidesToShow.split(' ');
          if (responsive.length === 1) {
            var slides = parseInt(responsive[0])
            settings.slidesToShow = slides > 0 ? slides : 1;
            delete settings.responsive;
          } else if (responsive.length > 1) {
            for (var r = 0; r < responsive.length; r++) {
              var slides = parseInt(responsive[r])
              if (r === 0) {
                settings.slidesToShow = slides > 0 ? slides : 1;
              } else {
                settings.responsive[r - 1].settings.slidesToShow = slides > 0 ? slides : 1;
              }
            }
          }
        }

        if (slider.hasClass('slick-initialized') && slider[0].slick && slider[0].slick.unslick) {
          slider.vcSlick && slider.vcSlick('unslick');
        }
        slider.vcSlick && slider.vcSlick(settings);
      });
    }
  };

  window.vcv.on('ready', function (action, id) {
    var sliders = '';
    if (id) {
      sliders = $('.vce-logo-slider#el-' + id + ' .vce-logo-slider-list');
    } else {
      sliders = $('.vce-logo-slider-list');
    }
    initSlider(sliders);
  })
})(window.jQuery);
