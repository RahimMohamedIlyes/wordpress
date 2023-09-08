(function () {
  vcv.on('basicMenuReady', function () {
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

  vcv.on('ready', function () {
    vcv.trigger('basicMenuReady')
  })
})()
