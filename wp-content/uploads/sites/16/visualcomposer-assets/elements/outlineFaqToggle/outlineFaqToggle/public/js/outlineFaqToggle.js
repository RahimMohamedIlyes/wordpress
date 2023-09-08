/* global vcv */
(function ($) {
  vcv.on('ready', function () {
    $(function () {
      const collapsibleItems = $('.vce-outline-faq-toggle-inner')
      const settings = {
        titleSelector: '.vce-outline-faq-toggle-title',
        titleTextSelector: '.vce-outline-faq-toggle-title-text',
        contentSelector: '.vce-outline-faq-toggle-text-block',
        activeClass: 'vce-outline-faq-toggle-state--opened'
      }
      collapsibleItems.each(function () {
        const item = $(this)
        !item.data('vcvCollapsible') && item.collapsible(settings)
      })
    })
  })
})(window.jQuery)
