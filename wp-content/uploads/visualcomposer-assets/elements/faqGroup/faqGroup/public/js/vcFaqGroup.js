/* global vcv */

(function ($) {
  const collapseSpeed = 200
  const toggleSection = function (title, content, activeClass) {
    title.toggleClass(activeClass)
    content.slideToggle(collapseSpeed)

    content.attr('aria-hidden', function (_, attr) { return !(attr === 'true') })
    title.attr('aria-expanded', function (_, attr) { return !(attr === 'true') })
    title.attr('aria-selected', function (_, attr) { return !(attr === 'true') })
  }

  $.fn.vceFaqGroupCollapsible = function (settings, destroy) {
    if (!settings || !settings.itemSelector || !settings.titleSelector || !settings.contentSelector || !settings.activeClass) {
      return this
    }
    const faqContainer = this // eslint-disable-line
    const items = faqContainer.find(settings.itemSelector)

    if (destroy) {
      items.each(function () {
        const element = $(this)
        const title = element.find(settings.titleSelector)
        title.off('click', handleClick)
      })
      return this
    }

    let autoClose = false
    if (settings.autoCloseAttr) {
      autoClose = !!this.attr(settings.autoCloseAttr)
    }

    const handleClick = function (e) {
      const clickedTitle = $(e.currentTarget)
      const clickedPanel = clickedTitle.siblings(settings.contentSelector)

      if (autoClose) {
        const activeHeadings = faqContainer.find('.' + settings.activeClass)
        activeHeadings.each(function () {
          const heading = $(this)
          if (clickedTitle.attr('id') !== heading.attr('id')) {
            const panel = heading.siblings(settings.contentSelector)
            toggleSection(heading, panel, settings.activeClass)
          }
        })
      }
      toggleSection(clickedTitle, clickedPanel, settings.activeClass)
    }

    items.each(function () {
      const element = $(this)
      const title = element.find(settings.titleSelector)

      title.on('click', handleClick)
    })

    return this
  }
})(window.jQuery);

(function ($) {
  vcv.on('ready', function (action, id) {
    let faqGroupElements = []
    const settings = {
      itemSelector: '.vce-faq-group-item',
      titleSelector: '.vce-faq-group-item-heading',
      contentSelector: '.vce-faq-group-item-content',
      activeClass: 'vce-faq-group-item--opened',
      autoCloseAttr: 'data-vce-faq-group-auto-close'
    }

    if (id) {
      faqGroupElements = $('.vce-faq-group-container#el-' + id)

      faqGroupElements.each(function () {
        const item = $(this)
        item.vceFaqGroupCollapsible(settings, true)
      })
    } else {
      faqGroupElements = $('.vce-faq-group-container')
    }

    faqGroupElements.each(function () {
      const item = $(this)
      item.vceFaqGroupCollapsible(settings)
    })
  })
})(window.jQuery)
