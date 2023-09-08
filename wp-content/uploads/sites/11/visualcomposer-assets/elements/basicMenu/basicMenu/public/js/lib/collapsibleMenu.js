(function () {
  window.vcvBasicMenu = function (options) {
    const menu = options.menu
    if (!menu) {
      return
    }
    const resizeElement = menu.querySelector('.vce-basic-menu')
    const resizeObserver = new window.ResizeObserver((entries) => {
      handleMenuSize()
    })

    if (menu.getAttribute('data-vce-basic-menu-to-sandwich') === 'false') {
      menu.removeAttribute('data-vcv-basic-menu-collapsed')
      resizeObserver.unobserve(resizeElement)
      return
    }

    menu.setAttribute('data-vcv-basic-menu-loading', 'true')
    resizeObserver.observe(resizeElement)
    if (window.document.fonts && window.document.fonts.ready) {
      document.fonts.ready.then((value) => {
        if (value && value.status === 'loaded') {
          handleMenuSize()
        }
      })
    } else {
      menu.removeAttribute('data-vcv-basic-menu-loading')
    }

    function handleMenuSize () {
      const menuInner = menu.querySelector('.vce-basic-menu-inner') // Element with DO
      let items = menu.querySelectorAll('.vce-basic-menu nav > ul > li')
      const menuRect = menuInner.getBoundingClientRect()
      let itemsWidth = 0

      const sandwichMenuContainer = menu.querySelector('.vce-sandwich-menu-container')
      if (sandwichMenuContainer && sandwichMenuContainer.getAttribute('data-vcv-sandwich-menu-visible')) {
        menu.removeAttribute('data-vcv-basic-menu-loading')
        return
      }

      items = [].slice.call(items)
      items.forEach(function (item) {
        const itemRect = item.getBoundingClientRect()
        itemsWidth += itemRect.width
      })

      if (itemsWidth > menuRect.width) {
        if (menu.getAttribute('data-vcv-basic-menu-collapsed') !== 'true') {
          menu.setAttribute('data-vcv-basic-menu-collapsed', 'true')
        }
      } else {
        if (menu.getAttribute('data-vcv-basic-menu-collapsed') !== 'false') {
          menu.setAttribute('data-vcv-basic-menu-collapsed', 'false')
        }
      }
      menu.removeAttribute('data-vcv-basic-menu-loading')
    }
  }
})()
