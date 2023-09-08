(function () {
  window.vcv.on('basicMenuReady', function () {
    let menuTypeSandwich = document.querySelectorAll('[data-vce-basic-menu]')
    menuTypeSandwich = [].slice.call(menuTypeSandwich)
    if (menuTypeSandwich && menuTypeSandwich.length) {
      menuTypeSandwich.forEach(function (menu) {
        window.vcvBasicMenu({
          menu: menu
        })
      })
    }
  })

  window.vcv.on('ready', function () {
    window.vcv.trigger('basicMenuReady')
  })
})()
