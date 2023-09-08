/* eslint-disable */

/**
 * Creating an options object with data attributes, classes and event names necessary for
 * initializing tabs, accordion and accordion-autoplay plugins.
 *
 * Tabs, accordion and accordion-autoplay plugins gets initialized on vcv 'ready' global event.
 *
 * Minified version of this file is compiled via webpack:
 * 1. Enter the public folder where webpack file is located
 * cd tabsWithSlide/public
 * 2. To compile run following command
 * ../../../../node_modules/.bin/webpack --config=webpack.config.js -p
 */

(function () {
  var tabs
  var accordion
  var accordionAutoplay

  var options = {
    isSlider: true,
    tabsAndAccordion: true,
    dataAttr: '[data-vce-tabs]',
    clickEventSelector: 'click.vce.tabs.data-api',
    showEventSelector: 'show.vce.accordion hide.vce.accordion',
    accordionDropdownEventSelector: 'click.vce.accordion.data-api.dropdown',
    accordionHashChangeEvent: 'hashchange.vce.accordion',
    accordionClickEventSelector: 'click.vce.accordion.data-api',
    accordionReadyEventSelector: 'ready.vce.accordion',
    accordionAfterShowEventSelector: 'afterShow.vce.accordion',
    activeAttribute: 'data-vcv-active',
    activeTabAttribute: 'data-active-tab',
    openedAttribute: 'data-vcv-tabs-opened',
    animatingAttribute: 'data-vcv-animating',
    positionToActive: 'data-vcv-position-to-active',
    tabDataSelector: '[data-vce-tab]',
    accordionDataSelector: '[data-vce-accordion]',
    accordionContainer: 'vce.accordion',
    accordionPropertyName: 'vceAccordion',
    showTabSelector: 'show.vce.tab',
    hideTabSelector: 'hide.vce.tab',
    showAccordionSelector: 'show.vce.accordion',
    hideAccordionSelector: 'hide.vce.accordion',
    beforeShowAccordionSelector: 'beforeShow.vce.accordion',
    afterShowAccordionSelector: 'afterShow.vce.accordion',
    beforeHideAccordionSelector: 'beforeHide.vce.accordion',
    afterHideAccordionSelector: 'afterHide.vce.accordion',
    tabsDataSelector: 'vce.tabs',
    tabsSelector: '.vce-tabs-with-slide',
    tabsPropertyName: 'vceTabs',
    tabContainerSelector: '.vce-tabs-with-slide-list',
    tabsTitleSelector: '.vce-tabs-with-slide-tab-title',
    resizeSelector: '.vce-tabs-with-slide-resize-helper',
    sliderSelector: '.vce-tabs-with-slide-slider',
    slidePanelsSelector: '.vce-tabs-with-slide-panels',
    slidePanelSelector: '.vce-tabs-with-slide-panel',
    slidePanelTitleSelector: '.vce-tabs-with-slide-panel-title',
    slideInnerSelector: '.vce-tabs-with-slide-inner',
    slidePanelHeadingSelector: '> .vce-tabs-with-slide-panel > .vce-tabs-with-slide-tab-inner > .vce-tabs-with-slide-panel-heading [data-vce-accordion]',
    tabPanelBodySelector: '> .vce-tabs-with-slide-tab-inner > .vce-tabs-with-slide-panel-body',
    autoplayDataSelector: 'vce.tta.autoplay',
    autoplayTimerSelector: 'vce.tta.autoplay.timer',
    autoplayPropertyName: 'vceTtaAutoPlay',
    autoplaySelector: '[data-vce-tta-autoplay]',
    autoplayOnEventSelector: 'click.vce.tta.autoplay.data-api',
    getAccordionHashSelector: function (hash) {
      return '[data-vce-accordion][href="' + hash + '"],[data-vce-accordion][data-vce-target="' + hash + '"]'
    }
  }

  function initiatePlugins () {
    if (!window.vcvIsTabsWithSlideInitialized) {
      window.vcvIsTabsWithSlideInitialized = true
      tabs = new window.VcvTabs(options)
      tabs.init()
      accordion = new window.VcvAccordion(options)
      accordion.init()
      if (window.VcvAccordionAutoplay) {
        accordionAutoplay = new window.VcvAccordionAutoplay(options)
        accordionAutoplay.init()
      }
    } else if (window.vcvIsTabsWithSlideInitialized && tabs && accordion) {
      tabs.setActiveTab()
      accordion.setActiveTab('add')
      if (accordionAutoplay) {
        accordionAutoplay.startAutoPlay()
      }
    }
  }

  if (window.vcv) {
    window.vcv.on('ready', function (action, id) {
      var element = document.getElementById(`el-${id}`)
      if (element && element.dataset && element.dataset.vcvTtaTypeElement) {
        initiatePlugins()
      } else if (!action) {
        initiatePlugins()
      }
    })
  } else {
    initiatePlugins()
  }
})()
