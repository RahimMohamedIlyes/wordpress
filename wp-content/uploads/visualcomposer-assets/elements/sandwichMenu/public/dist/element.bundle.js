(self.vcvWebpackJsonp4x=self.vcvWebpackJsonp4x||[]).push([["element"],{"./sandwichMenu/index.js":function(e,n,t){"use strict";var o=t("./node_modules/vc-cake/index.js"),i=t.n(o),a=t("./node_modules/@babel/runtime/helpers/esm/extends.js"),c=t("./node_modules/@babel/runtime/helpers/esm/classCallCheck.js"),l=t("./node_modules/@babel/runtime/helpers/esm/createClass.js"),s=t("./node_modules/@babel/runtime/helpers/esm/get.js"),r=t("./node_modules/@babel/runtime/helpers/esm/inherits.js"),u=t("./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js"),d=t("./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js"),h=t("./node_modules/react/index.js"),p=t("./node_modules/vc-helpers/lib/index.js"),v={sandwichBold:{html:h.createElement("g",null,h.createElement("rect",{x:"0",y:"0",width:"24",height:"4"}),h.createElement("rect",{x:"0",y:"8",width:"24",height:"4"}),h.createElement("rect",{x:"0",y:"16",width:"24",height:"4"})),height:20},sandwichRegular:{html:h.createElement("g",null,h.createElement("rect",{x:"0",y:"0",width:"24",height:"3"}),h.createElement("rect",{x:"0",y:"8",width:"24",height:"3"}),h.createElement("rect",{x:"0",y:"16",width:"24",height:"3"})),height:19},sandwichThin:{html:h.createElement("g",null,h.createElement("rect",{x:"0",y:"0",width:"24",height:"2"}),h.createElement("rect",{x:"0",y:"8",width:"24",height:"2"}),h.createElement("rect",{x:"0",y:"16",width:"24",height:"2"})),height:18},sandwichRight:{html:h.createElement("g",null,h.createElement("rect",{x:"0",y:"0",width:"24",height:"3"}),h.createElement("rect",{x:"5",y:"8",width:"19",height:"3"}),h.createElement("rect",{x:"0",y:"16",width:"24",height:"3"})),height:19},sandwichLeft:{html:h.createElement("g",null,h.createElement("rect",{x:"0",y:"0",width:"14",height:"3"}),h.createElement("rect",{x:"0",y:"8",width:"24",height:"3"}),h.createElement("polygon",{points:"0 16 19 16 19 19 0 19"})),height:19}},m={closeBold:h.createElement("polygon",{points:"10 7.17157288 2.92893219 0.100505063 0.100505063 2.92893219 7.17157288 10 0.100505063 17.0710678 2.92893219 19.8994949 10 12.8284271 17.0710678 19.8994949 19.8994949 17.0710678 12.8284271 10 19.8994949 2.92893219 17.0710678 0.100505063"}),closeRegular:h.createElement("polygon",{points:"9.5 7.38888889 2.11111111 0 0 2.11111111 7.38888889 9.5 0 16.8888889 2.11111111 19 9.5 11.6111111 16.8888889 19 19 16.8888889 11.6111111 9.5 19 2.11111111 16.8888889 1.76780781e-15"}),closeThin:h.createElement("polygon",{points:"10 8.58578644 2.22182541 0.807611845 0.807611845 2.22182541 8.58578644 10 0.807611845 17.7781746 2.22182541 19.1923882 10 11.4142136 17.7781746 19.1923882 19.1923882 17.7781746 11.4142136 10 19.1923882 2.22182541 17.7781746 0.807611845 10 8.58578644"})};function b(e){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var t,o=(0,d.default)(e);if(n){var i=(0,d.default)(this).constructor;t=Reflect.construct(o,arguments,i)}else t=o.apply(this,arguments);return(0,u.default)(this,t)}}var g=function(e){(0,r.default)(t,e);var n=b(t);function t(){return(0,c.default)(this,t),n.apply(this,arguments)}return(0,l.default)(t,[{key:"componentDidMount",value:function(){var e=this.props.atts.menuSource;e&&(0,s.default)((0,d.default)(t.prototype),"updateShortcodeToHtml",this).call(this,'[vcv_sandwich_menu key="'.concat(e,'"]'),this.ref)}},{key:"componentDidUpdate",value:function(e){var n=this.props.atts.menuSource;e.atts.menuSource!==n&&(0,s.default)((0,d.default)(t.prototype),"updateShortcodeToHtml",this).call(this,'[vcv_sandwich_menu key="'.concat(n,'"]'),this.ref)}},{key:"getMenuIcon",value:function(){var e=this.props.atts.sandwichStyle,n=v[e],t=n&&n.html,o=n&&n.height,i="0 0 24 ".concat(o);return h.createElement("svg",{width:"24px",height:"".concat(o,"px"),viewBox:i},t)}},{key:"getCloseIcon",value:function(){var e=this.props.atts.sandwichStyle.replace("sandwich","close");"closeRight"!==e&&"closeLeft"!==e||(e="closeRegular");var n=m[e];return h.createElement("svg",{width:"20px",height:"20px",viewBox:"0 0 20 20"},n)}},{key:"validateSize",value:function(e){var n=new RegExp("^-?\\d*(\\.\\d{0,9})?("+["px","em","rem","%","vw","vh"].join("|")+")?$");return""===e||e.match(n)?e:null}},{key:"handleCreateMenuClick",value:function(e){!window.vcvCreateMenuUrl||0!==e.button&&1!==e.button||window.open(window.vcvCreateMenuUrl,"_blank")}},{key:"render",value:function(){var e=this,n=this.props,t=n.id,o=n.atts,i=n.editor,c=o.shape,l=o.toggleCloseColor,s=o.toggleCustomHover,r=o.fontSize,u=o.menuSource,d=o.alignment,v=o.customClass,m=o.metaCustomId,b=o.iconColor,g=o.iconHoverColor,w=o.closeIconColor,f=o.closeIconHoverColor,y=o.linkColor,x=o.linkHoverColor,C=o.overlayBackground,k=o.shapeColor,E=o.shapeHoverColor,S=o.extraDataAttributes,H="vce-sandwich-menu-wrapper vce",M="vce-sandwich-menu",j=this.getExtraDataAttributes(S),D={};s||(g=this.getColorShade(.25,b),f=this.getColorShade(.25,w),E=this.getColorShade(.15,k),x=this.getColorShade(.25,y)),l||(w=b,f=g),"none"===c&&(k="transparent",E=" transparent");var I={alignment:d,iconColor:b,iconHoverColor:g,closeIconColor:w,closeIconHoverColor:f,linkColor:y,linkHoverColor:x,overlayBackground:C,shapeColor:k,shapeHoverColor:E},_=(0,p.setCssVariables)(I);"string"==typeof v&&v&&(H+=" ".concat(v)),m&&(j.id=m),"none"!==c&&(H+=" vce-sandwich-menu-shape--".concat(c)),r&&(r=this.validateSize(r))&&(r=/^\d+$/.test(r)?r+"px":r,D.style={fontSize:r}),M+=" vce-sandwich-menu--alignment-".concat(d);var A=this.applyDO("animation"),R=this.applyDO("margin"),T=this.applyDO("padding border background"),z=null;return z=window.vcvWpMenus&&window.vcvWpMenus.length&&""!==window.vcvWpMenus[0].value?h.createElement("div",{className:"vcvhelper",ref:function(n){e.ref=n},"data-vcvs-html":'[vcv_sandwich_menu key="'.concat(u,'"]')}):h.createElement("div",{className:"vcvhelper vcv-sandwich-menu-placeholder"},h.createElement("div",{className:"vcv-sandwich-menu-placeholder-inner"},"You don’t have any menus yet. Create your first menu ",h.createElement("span",{onMouseDown:this.handleCreateMenuClick},"here"),".")),h.createElement("div",(0,a.default)({className:H},i,{id:"el-"+t,"data-vce-sandwich-menu":!0},R,{style:_}),h.createElement("div",(0,a.default)({className:M},j),h.createElement("button",(0,a.default)({className:"vce-sandwich-menu-open-button"},A,T,{"aria-label":"Open menu","data-vce-sandwich-menu-open-button":!0}),h.createElement("span",{className:"vce-sandwich-menu-open-button-inner"},this.getMenuIcon())),h.createElement("div",{className:"vce-sandwich-menu-container","data-vce-sandwich-menu-modal":!0},h.createElement("button",(0,a.default)({className:"vce-sandwich-menu-close-button"},T,{"aria-label":"Close menu","data-vce-sandwich-menu-close-button":!0}),h.createElement("span",{className:"vce-sandwich-menu-close-button-inner"},this.getCloseIcon())),h.createElement("div",{className:"vce-sandwich-menu-scroll-container"},h.createElement("div",(0,a.default)({className:"vce-sandwich-menu-inner"},D),z)))))}}]),t}(i().getService("api").elementComponent);(0,i().getService("cook").add)(t("./sandwichMenu/settings.json"),(function(e){e.add(g)}),{css:t("./node_modules/raw-loader/index.js!./sandwichMenu/styles.css"),editorCss:t("./node_modules/raw-loader/index.js!./sandwichMenu/editor.css")},"")},"./node_modules/raw-loader/index.js!./sandwichMenu/editor.css":function(e){e.exports=".vcv-sandwich-menu-placeholder {\n  padding: 20px;\n  text-align: center;\n  letter-spacing: 1px;\n  font: italic 13px/24px Roboto,Arial,sans-serif;\n  color: #bdbdbd;\n  border-radius: 3em;\n  height: 100%;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin: 30px;\n}\n\n.vcv-sandwich-menu-placeholder span {\n  color: #fff;\n  border-bottom: 1px solid transparent;\n  transition: border-color .2s;\n  cursor: pointer;\n}\n\n.vcv-sandwich-menu-placeholder span:hover {\n  border-color: #fff;\n}\n"},"./node_modules/raw-loader/index.js!./sandwichMenu/styles.css":function(e){e.exports='.vce-sandwich-menu {\n  text-align: var(--alignment);\n}\n\nbutton.vce-sandwich-menu-close-button,\nbutton.vce-sandwich-menu-open-button {\n  display: inline-block;\n  border: 0;\n  padding: 0;\n  line-height: normal;\n  box-shadow: none;\n  text-decoration: none;\n  position: relative;\n  vertical-align: top;\n  transition: background-color .2s ease-in-out;\n}\n\nbutton.vce-sandwich-menu-close-button:not(:hover):not(:active),\nbutton.vce-sandwich-menu-open-button:not(:hover):not(:active),\nbutton.vce-sandwich-menu-close-button:hover {\n  background: transparent;\n}\n\nbutton.vce-sandwich-menu-close-button svg,\nbutton.vce-sandwich-menu-open-button svg {\n  transition: fill .2s ease-in-out;\n}\n\nbutton.vce-sandwich-menu-close-button:hover,\nbutton.vce-sandwich-menu-close-button:focus,\nbutton.vce-sandwich-menu-close-button:active,\nbutton.vce-sandwich-menu-open-button:hover,\nbutton.vce-sandwich-menu-open-button:focus,\nbutton.vce-sandwich-menu-open-button:active{\n  box-shadow: none;\n  text-decoration: none;\n  outline: 0;\n}\n\nbutton.vce-sandwich-menu-close-button {\n  position: absolute;\n  top: 30px;\n  right: 30px;\n  z-index: 1;\n}\n\n.rtl button.vce-sandwich-menu-close-button,\n[dir="rlt"] button.vce-sandwich-menu-close-button {\n  right: auto;\n  left: 30px;\n}\n\n.vce-sandwich-menu-close-button .vce-sandwich-menu-close-button-inner,\n.vce-sandwich-menu-open-button .vce-sandwich-menu-open-button-inner {\n  display: inline-block;\n  position: relative;\n  vertical-align: top;\n  height: 24px;\n  width: 24px;\n}\n\n.vce-sandwich-menu-close-button svg,\n.vce-sandwich-menu-open-button svg {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  margin: auto;\n}\n\n.vce-sandwich-menu-shape--square button.vce-sandwich-menu-open-button {\n  padding: 18px;\n}\n\n.vce-sandwich-menu-shape--rounded button.vce-sandwich-menu-open-button {\n  padding: 18px;\n  border-radius: 5px;\n}\n\n.vce-sandwich-menu-shape--round button.vce-sandwich-menu-open-button {\n  padding: 18px;\n  border-radius: 50%;\n}\n\n/* Modal Base CSS */\n\n.vce-sandwich-menu-container {\n  position: fixed;\n  overflow: hidden;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  top: 0;\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity 0.2s ease-in-out;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  word-wrap: break-word;\n  z-index: -999;\n  -webkit-font-smoothing: antialiased;\n}\n\n.vce-sandwich-menu-container[data-vcv-sandwich-menu-visible] {\n  opacity: 1;\n  visibility: visible;\n  z-index: 9998;\n}\n\n.vce-sandwich-menu-scroll-container {\n  overflow: auto;\n  height: 100%;\n  max-width: 100%;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  width: 100%;\n}\n\n.vce-sandwich-menu-inner {\n  position: relative;\n  min-height: calc(100% - 40px);\n  margin: 20px;\n  text-align: center;\n  background-size: cover;\n  overflow: hidden;\n  padding: 15px 0;\n  box-sizing: border-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-flex-shrink: 0;\n      -ms-flex-negative: 0;\n          flex-shrink: 0;\n  -webkit-flex-grow: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  line-height: 2;\n  font-size: 22px;\n}\n\n.vce-sandwich-menu-inner nav ul {\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n}\n\n.vce-sandwich-menu-inner nav li.menu-item {\n  list-style-type: none;\n  padding: 0;\n  font-size: 1em;\n  line-height: 2;\n  margin: 0;\n}\n\n.vce-sandwich-menu-inner nav > ul > .menu-item {\n  font-weight: bold;\n}\n\n.vce-sandwich-menu-inner nav > ul > .menu-item-has-children > .sub-menu > .menu-item {\n  font-size: .8em;\n  line-height: 2;\n}\n\n.vce-sandwich-menu-inner nav > ul > .menu-item-has-children > .sub-menu > .menu-item > .sub-menu > .menu-item {\n  font-size: .75em;\n  line-height: 2;\n}\n\n.vce-sandwich-menu-inner nav .menu-item-has-children > ul {\n  margin: 12px 0;\n}\n\n.vce-sandwich-menu-inner nav li.menu-item::before,\n.vce-sandwich-menu-inner nav li.menu-item::after {\n  display: none;\n}\n\n.vce-sandwich-menu-inner nav li.menu-item a {\n  box-shadow: none;\n  border-bottom: 0;\n}\n.vce-sandwich-menu-inner nav li.menu-item a:hover {\n  box-shadow: none;\n  border-bottom: 0;\n}\n\n.vce-sandwich-menu-wrapper .vce-sandwich-menu-container button.vce-sandwich-menu-close-button svg {\n    fill: var(--closeIconColor);\n}\n.vce-sandwich-menu-wrapper .vce-sandwich-menu .vce-sandwich-menu-container button.vce-sandwich-menu-close-button:hover svg {\n    fill: var(--closeIconHoverColor);\n}\n.vce-sandwich-menu-wrapper .vce-sandwich-menu-open-button svg,\n.vce-sandwich-menu-wrapper .vce-sandwich-menu-close-button svg {\n    fill: var(--iconColor);\n}\n.vce-sandwich-menu-wrapper button.vce-sandwich-menu-open-button:hover svg,\n.vce-sandwich-menu-wrapper button.vce-sandwich-menu-close-button:hover svg {\n    fill: var(--iconHoverColor);\n}\n.vce-sandwich-menu-wrapper .vce-sandwich-menu-inner li.menu-item a {\n    color: var(--linkColor);\n}\n.vce-sandwich-menu-wrapper .vce-sandwich-menu-inner li.menu-item a:hover,\n.vce-sandwich-menu-wrapper .vce-sandwich-menu-inner li.menu-item.current-menu-item > a {\n    color: var(--linkHoverColor);\n}\n.vce-sandwich-menu-wrapper .vce-sandwich-menu-container {\n    background-color: var(--overlayBackground);\n}\n.vce-sandwich-menu-wrapper button.vce-sandwich-menu-open-button:not(:hover):not(:active) {\n    background-color: var(--shapeColor);\n}\n.vce-sandwich-menu-wrapper button.vce-sandwich-menu-open-button:hover {\n    background-color: var(--shapeHoverColor);\n}\n'},"./sandwichMenu/settings.json":function(e){"use strict";e.exports=JSON.parse('{"menuSource":{"type":"dropdown","access":"public","value":"","options":{"label":"Menu source","global":"vcvWpMenus","reloadAction":"menu","descriptionHTML":"Choose a menu or <a href=\'{vcvCreateMenuUrl}\' target=\'_blank\'>manage menu</a> in WordPress."}},"sandwichStyle":{"type":"buttonGroup","access":"public","value":"sandwichRegular","options":{"label":"Sandwich style","values":[{"label":"Bold","value":"sandwichBold","icon":"vcv-ui-icon-attribute-sandwich-bold"},{"label":"Regular","value":"sandwichRegular","icon":"vcv-ui-icon-attribute-sandwich-regular"},{"label":"Thin","value":"sandwichThin","icon":"vcv-ui-icon-attribute-sandwich-thin"},{"label":"Right","value":"sandwichRight","icon":"vcv-ui-icon-attribute-sandwich-right"},{"label":"Left","value":"sandwichLeft","icon":"vcv-ui-icon-attribute-sandwich-left"}]}},"fontSize":{"type":"string","access":"public","value":"22px","options":{"label":"Font size"}},"alignment":{"type":"buttonGroup","access":"public","value":"left","options":{"label":"Alignment","values":[{"label":"Left","value":"left","icon":"vcv-ui-icon-attribute-alignment-left"},{"label":"Center","value":"center","icon":"vcv-ui-icon-attribute-alignment-center"},{"label":"Right","value":"right","icon":"vcv-ui-icon-attribute-alignment-right"}]}},"iconColor":{"type":"color","access":"public","value":"#EDEDED","options":{"label":"Icon color"}},"toggleCloseColor":{"type":"toggle","access":"public","value":false,"options":{"label":"Custom close icon color"}},"closeIconColor":{"type":"color","access":"public","value":"#EDEDED","options":{"label":"Close icon color","onChange":{"rules":{"toggleCloseColor":{"rule":"toggle"}},"actions":[{"action":"toggleVisibility"}]}}},"shape":{"type":"dropdown","access":"public","value":"none","options":{"label":"Shape","values":[{"label":"None","value":"none"},{"label":"Square","value":"square"},{"label":"Rounded","value":"rounded"},{"label":"Round","value":"round"}]}},"shapeColor":{"type":"color","access":"public","value":"#4D8FCC","options":{"label":"Shape color","onChange":{"rules":{"shape":{"rule":"!value","options":{"value":"none"}}},"actions":[{"action":"toggleVisibility"}]}}},"overlayBackground":{"type":"color","access":"public","value":"rgba(33,33,33,.9)","options":{"label":"Overlay background color"}},"linkColor":{"type":"color","access":"public","value":"#EDEDED","options":{"label":"Link color"}},"toggleCustomHover":{"type":"toggle","access":"public","value":false,"options":{"label":"Add a hover effect"}},"iconHoverColor":{"type":"color","access":"public","value":"#f2f2f2","options":{"label":"Icon hover color","onChange":{"rules":{"toggleCustomHover":{"rule":"toggle"}},"actions":[{"action":"toggleVisibility"}]}}},"closeIconHoverColor":{"type":"color","access":"public","value":"#f2f2f2","options":{"label":"Close icon hover color","onChange":{"rules":{"toggleCloseColor":{"rule":"toggle"},"toggleCustomHover":{"rule":"toggle"}},"actions":[{"action":"toggleVisibility"}]}}},"shapeHoverColor":{"type":"color","access":"public","value":"#68a0d4","options":{"label":"Shape hover color","onChange":{"rules":{"toggleCustomHover":{"rule":"toggle"},"shape":{"rule":"!value","options":{"value":"none"}}},"actions":[{"action":"toggleVisibility"}]}}},"linkHoverColor":{"type":"color","access":"public","value":"#f2f2f2","options":{"label":"Link hover color","onChange":{"rules":{"toggleCustomHover":{"rule":"toggle"}},"actions":[{"action":"toggleVisibility"}]}}},"designOptions":{"type":"designOptions","access":"public","value":[],"options":{"label":"Design Options"}},"advancedTab":{"type":"group","access":"protected","value":["htmlAttributes","customAttributes","customCSS"],"options":{"label":"Advanced","isSections":true}},"contentSection":{"type":"group","access":"protected","options":{"label":"Content"},"value":["menuSource"]},"contentTab":{"type":"group","access":"protected","options":{"label":"Content","isSections":true},"value":["contentSection"]},"metaEditFormTabs":{"type":"group","access":"protected","value":["contentTab","designTab","advancedTab"]},"relatedTo":{"type":"group","access":"protected","value":["General"]},"customClass":{"type":"string","access":"public","value":"","options":{"label":"Extra class name","description":"Add an extra class name to the element and refer to it from the custom CSS option."}},"metaCustomId":{"type":"customId","access":"public","value":"","options":{"label":"Element ID","description":"Apply a unique ID to the element to link it directly by using #your_id (for element ID use lowercase input only)."}},"tag":{"access":"protected","type":"string","value":"sandwichMenu"},"metaPublicJs":{"access":"protected","type":"string","value":{"libraries":[{"libPaths":"public/dist/sandwichMenu.min.js"}]}},"sharedAssetsLibrary":{"access":"protected","type":"string","value":{"libraries":[{"libsNames":["menuToggle"]}]}},"htmlAttributes":{"type":"group","access":"public","value":["metaCustomId","customClass"],"options":{"label":"HTML Attributes"}},"customCSS":{"type":"group","access":"public","value":["styleEditor"],"options":{"label":"Custom CSS","tooltip":"Add custom CSS to the element using the [element-id] placeholder."}},"styleEditor":{"type":"styleEditor","access":"public","value":[],"options":[]},"customAttributes":{"type":"group","access":"public","value":["extraDataAttributes"],"options":{"label":"Custom Attributes"}},"extraDataAttributes":{"type":"string","access":"public","value":"","options":{"label":"Extra Data Attributes","description":"Add data attributes to your element (ex. data-name=\\"John Lennon\\" data-age=\\"28\\")"}},"styleSection":{"type":"group","access":"protected","options":{"label":"Style"},"value":["sandwichStyle","fontSize","alignment","iconColor","toggleCloseColor","closeIconColor","shape","shapeColor","overlayBackground","linkColor","toggleCustomHover","iconHoverColor","closeIconHoverColor","shapeHoverColor","linkHoverColor"]},"designTab":{"type":"group","access":"protected","options":{"label":"Design","isSections":true},"value":["styleSection","designOptions"]}}')}},[["./sandwichMenu/index.js"]]]);