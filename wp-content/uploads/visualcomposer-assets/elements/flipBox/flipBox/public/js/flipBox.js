(function () {
  window.vcv.on('ready', function () {
    const timeout = setTimeout(() => {
      window.vceFlipBox()
      clearTimeout(timeout)
    }, 0)
  })

  window.vcv.on('reInit', () => {
    const timeout = setTimeout(() => {
      window.vceFlipBox()
      clearTimeout(timeout)
    }, 0)
  })
})()
