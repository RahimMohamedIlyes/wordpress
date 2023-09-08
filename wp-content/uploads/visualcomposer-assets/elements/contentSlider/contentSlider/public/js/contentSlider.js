(function ($) {
  window.vcv.on('ready', function (type, id, options, tag) {
    if (options && options.changedAttribute) {
      const attr = options.changedAttribute
      if (attr === 'designOptions' || attr === 'metaCustomId' || attr === 'customClass') {
        return
      }
    }

    // Do actions only if updated contentSlider/contentSlide
    if (tag && ['contentSlide', 'contentSlider'].indexOf(tag) === -1) {
      return
    }
    let sliders = []
    let slider
    if (id && (!tag || tag === 'contentSlider')) {
      slider = document.querySelector('.vce-content-slider[data-vcv-element="' + id + '"]')
      if (slider) {
        sliders.push(slider)
      }
    } else if (tag === 'contentSlide') {
      const sliderTab = document.querySelector('.vce-content-slide[data-vcv-element="' + id + '"]')
      if (sliderTab) {
        slider = sliderTab.closest('.vce-content-slider')
        sliders.push(slider)
      }
    } else {
      // Global INIT
      sliders = Array.prototype.slice.call(document.querySelectorAll('.vce-content-slider'))
    }
    if (sliders.length) {
      sliders.forEach(function (slider) {
        if (!slider) {
          return
        }
        const sliderId = slider.id
        let slides = slider.querySelector('.vce-content-slider-slides')
        let initialSlide = 0
        const slideItems = $(slides).find('.slick-track').first().children(':not(.slick-cloned)')
        slideItems.each(function (index, slide) {
          if (slider.dataset.vcvSlickKeepActiveSlide === 'true' && slide.classList.contains('slick-active')) {
            initialSlide = index
          }
          slide.dataset.vceSlickSliderId = sliderId
        })
        let autoplay = slider.dataset.vceSlickAutoplay === 'true'
        if (Object.prototype.hasOwnProperty.call(slider.dataset, 'data-vce-slick-autoplay-delay')) {
          autoplay = true
        }
        const prevArrow = slider.querySelector('.vce-content-slider-prev-arrow') || ''
        const nextArrow = slider.querySelector('.vce-content-slider-next-arrow') || ''
        const settings = {
          autoplay: autoplay,
          autoplaySpeed: slider.dataset.vceSlickAutoplayDelay || 10000,
          fade: slider.dataset.vceSlickEffect === 'fade',
          arrows: true,
          prevArrow: prevArrow,
          nextArrow: nextArrow,
          initialSlide: initialSlide,
          respondTo: 'slider',
          swipe: true,
          swipeToSlide: true,
          touchMove: true,
          adaptiveHeight: true
        }
        slides = $(slides)
        if (slides.hasClass('slick-initialized')) {
          slides.vcSlick && slides.vcSlick('unslick')
          slides.removeClass('slick-initialized')
          slides.find('.vc-slick-item').each(function () {
            $(this).attr('style', '')
          })
        }
        if (slides.vcSlick && slides.vcSlick(settings) && slides.vcSlick('slickFilter', function () { return this.id && this.dataset.vceSlickSliderId === sliderId })
        ) {
          slideItems.each(function (index, slide) {
            const resizeObserver = new window.ResizeObserver(function () {
              slides.vcSlick('setPosition')
            })
            resizeObserver.observe(slide)
          })
          slider.setAttribute('data-vcv-slick-initialized', 'true')
        }
      })
    }
  })
})(window.jQuery)
