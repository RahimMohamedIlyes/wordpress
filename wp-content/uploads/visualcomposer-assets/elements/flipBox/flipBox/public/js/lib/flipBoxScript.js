(function ($) {
  if (typeof window.vceFlipBox !== 'undefined') {
    return
  }

  function setFlipBoxPerspective (flipBox) {
    flipBox.each(function () {
      const $this = $(this)
      const width = $this.width()
      const perspective = width * 4 + 'px'

      $this.css('perspective', perspective)
    })
  }

  function setFlipBoxHeight (flipBox) {
    flipBox.each(function () {
      const $this = $(this)
      const flipBoxInner = $this.find('.vce-flip-box-inner')

      const frontHeight = $this.find('.vce-flip-box-front-inner').outerHeight()
      const backHeight = $this.find('.vce-flip-box-back-inner').outerHeight()
      const flipBoxHeight = (frontHeight > backHeight) ? frontHeight : backHeight

      flipBoxInner.css('min-height', (flipBoxHeight || 0) + 'px')
    })
  }

  function prepareFlipBox () {
    const flipBox = $('.vce-flip-box')

    if (flipBox) {
      setFlipBoxHeight(flipBox)
      setFlipBoxPerspective(flipBox)
    }
  }

  prepareFlipBox()
  window.addEventListener('resize', prepareFlipBox)
  window.vceFlipBox = prepareFlipBox
})(window.jQuery)
