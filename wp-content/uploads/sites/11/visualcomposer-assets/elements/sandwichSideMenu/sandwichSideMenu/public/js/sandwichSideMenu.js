/* eslint-disable */
(function () {
  vcv.on('ready', function () {
    var sandwichSideMenus = document.querySelectorAll("[data-vce-sandwich-side-menu]");
    var settings = {
      modalSelector: "[data-vce-sandwich-side-menu-modal]",
      openSelector: "[data-vce-sandwich-side-menu-open-button]",
      closeSelector: "[data-vce-sandwich-side-menu-close-button]",
      activeAttribute: "data-vcv-sandwich-side-menu-visible"
    };

    sandwichSideMenus.forEach(function(menu) {
      new window.vcvSandwichModal({
        container: menu
      });
      settings.container = menu
      new window.vcvSandwichModal(settings);
    });
  });
})();
/* eslint-enable */
