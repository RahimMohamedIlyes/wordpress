(function () {
  window.vcvBasicMenu = function (options) {
    this.menu = options.menu
    if (!this.menu) {
      return
    }
    const resizeElement = this.menu.querySelector('.vce-basic-menu')

    if (this.menu.getAttribute('data-vce-basic-menu-to-sandwich') === 'false') {
      this.menu.removeAttribute('data-vcv-basic-menu-collapsed')
      resizeObserver.unobserve(resizeElement)
      return
    }
    this.menu.setAttribute('data-vcv-basic-menu-loading', 'true')
    resizeObserver.observe(resizeElement)
    if (window.document.fonts && window.document.fonts.ready) {
      document.fonts.ready.then(handleMenuSize.bind(this, true), handleMenuSize.bind(this, true))
    } else {
      this.menu.removeAttribute('data-vcv-basic-menu-loading')
    }
  }

  function handleMenuSize (fontsLoaded) {
    const menu = this.menu
    const menuInner = menu.querySelector('.vce-basic-menu-inner') // Element with DO
    let items = menu.querySelectorAll('.vce-basic-menu nav > ul > li')
    const menuRect = menuInner.getBoundingClientRect()
    let itemsWidth = 0

    const sandwichMenuContainer = menu.querySelector('.vce-sandwich-menu-container')
    if (sandwichMenuContainer && sandwichMenuContainer.getAttribute('data-vcv-sandwich-menu-visible')) {
      this.menu.removeAttribute('data-vcv-basic-menu-loading')
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
    if (fontsLoaded) {
      this.menu.removeAttribute('data-vcv-basic-menu-loading')
    }
  }

  const resizeObserver = new window.ResizeObserver(entries => {
    for (const entry of entries) {
      if (entry.contentBoxSize) {
        handleMenuSize(false)
      }
    }
  })
})()
