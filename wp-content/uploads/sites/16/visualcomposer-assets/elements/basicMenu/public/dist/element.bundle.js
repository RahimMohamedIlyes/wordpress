(self.vcvWebpackJsonp4x=self.vcvWebpackJsonp4x||[]).push([["element"],{"./basicMenu/index.js":function(e,n,o){"use strict";var t=o("./node_modules/vc-cake/index.js"),s=o("./node_modules/@babel/runtime/helpers/esm/extends.js"),a=o("./node_modules/@babel/runtime/helpers/esm/classCallCheck.js"),i=o("./node_modules/@babel/runtime/helpers/esm/createClass.js"),c=o("./node_modules/@babel/runtime/helpers/esm/get.js"),u=o("./node_modules/@babel/runtime/helpers/esm/inherits.js"),r=o("./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js"),l=o("./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js"),m=o("./node_modules/react/index.js");function b(e){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var o,t=(0,l.default)(e);if(n){var s=(0,l.default)(this).constructor;o=Reflect.construct(t,arguments,s)}else o=t.apply(this,arguments);return(0,r.default)(this,o)}}var d=(0,t.getService)("cook"),v=function(e){(0,u.default)(o,e);var n=b(o);function o(){return(0,a.default)(this,o),n.apply(this,arguments)}return(0,i.default)(o,[{key:"componentDidMount",value:function(){this.props.atts.menuSource&&((0,c.default)((0,l.default)(o.prototype),"updateShortcodeToHtml",this).call(this,'[vcv_menu key="'.concat(this.props.atts.menuSource,'"]'),this.ref),(0,t.env)("iframe").vcv.trigger("basicMenuReady"))}},{key:"componentWillUnmount",value:function(){this.ajax&&(this.ajax.cancelled=!0)}},{key:"componentDidUpdate",value:function(e){var n=this.props.atts.menuSource;n!==e.atts.menuSource&&((0,c.default)((0,l.default)(o.prototype),"updateShortcodeToHtml",this).call(this,'[vcv_menu key="'.concat(n,'"]'),this.ref),(0,t.env)("iframe").vcv.trigger("basicMenuReady"))}},{key:"validateSize",value:function(e){var n=new RegExp("^-?\\d*(\\.\\d{0,9})?("+["px","em","rem","%","vw","vh"].join("|")+")?$");return""===e||e.match(n)?e:null}},{key:"handleCreateMenuClick",value:function(e){!window.vcvCreateMenuUrl||0!==e.button&&1!==e.button||window.open(window.vcvCreateMenuUrl,"_blank")}},{key:"render",value:function(){var e=this,n=this.props,o=n.id,t=n.atts,a=n.editor,i=t.menu,c=t.fontSize,u=t.toggleMenuCustomHover,r=t.toggleCustomHoverUnderline,l=t.toggleSubmenuCustomHover,b=t.toggleSubmenuCustomBackgroundHover,v=t.toggleSubmenuSeparator,p=t.toggleSandwichMenu,g=t.menuSource,x=t.alignment,h=t.customClass,f=t.metaCustomId,y="vce-basic-menu-container",C="vce-basic-menu-inner vce",w="vce-basic-menu-wrapper",M={},k={};"string"==typeof h&&h&&(y+=" ".concat(h)),f&&(M.id=f);var S=this.getMixinData("menuTextColor");S&&(C+=" vce-basic-menu--style-text--color-".concat(S.selector)),u&&(S=this.getMixinData("menuTextHoverColor"))&&(C+=" vce-basic-menu--style-text--hover-color-".concat(S.selector)),r&&(S=this.getMixinData("underlineColor"))&&(C+=" vce-basic-menu--style-underline--color-".concat(S.selector)),(S=this.getMixinData("submenuTextColor"))&&(C+=" vce-basic-menu--style-sub-menu-text--color-".concat(S.selector)),l&&(S=this.getMixinData("submenuTextHoverColor"))&&(C+=" vce-basic-menu--style-sub-menu-text--hover-color-".concat(S.selector)),(S=this.getMixinData("submenuBackgroundColor"))&&(C+=" vce-basic-menu--style-sub-menu-background--color-".concat(S.selector)),b&&(S=this.getMixinData("submenuBackgroundHoverColor"))&&(C+=" vce-basic-menu--style-sub-menu-background--hover-color-".concat(S.selector)),(S=this.getMixinData("submenuOutlineColor"))&&(C+=" vce-basic-menu--style-sub-menu-outline--color-".concat(S.selector)),c&&(c=this.validateSize(c))&&(c=/^\d+$/.test(c)?c+"px":c,k.style={fontSize:c}),w+=" vce-basic-menu--alignment-".concat(x),v&&(C+=" vce-basic-menu--style-sub-menu-separator");var j="";if(p){var H=d.get(i);j=m.createElement("div",{className:"vce-basic-menu-sandwich-container"},H?H.render(null,!1):null)}var T=this.applyDO("margin padding border background animation"),_=null;return _=window.vcvWpMenus&&window.vcvWpMenus.length&&""!==window.vcvWpMenus[0].value?m.createElement("div",{className:"vcvhelper",ref:function(n){e.ref=n},"data-vcvs-html":'[vcv_menu key="'.concat(g,'"]')}):m.createElement("div",{className:"vcvhelper vcv-basic-menu-placeholder"},"You don’t have any menus yet. Create your first menu ",m.createElement("span",{onMouseDown:this.handleCreateMenuClick},"here"),"."),m.createElement("div",(0,s.default)({className:y},a,{id:"el-"+o,"data-vce-basic-menu":!0,"data-vce-basic-menu-to-sandwich":p}),m.createElement("div",(0,s.default)({className:C},M,T),m.createElement("div",(0,s.default)({className:"vce-basic-menu"},k),m.createElement("div",{className:w},_),m.createElement("div",{className:"vcvhelper vce-basic-menu-resize-helper-container"})),j))}}]),o}((0,t.getService)("api").elementComponent);(0,(0,t.getService)("cook").add)(o("./basicMenu/settings.json"),(function(e){e.add(v)}),{css:o("./node_modules/raw-loader/index.js!./basicMenu/styles.css"),editorCss:o("./node_modules/raw-loader/index.js!./basicMenu/editor.css"),mixins:{menuTextColor:{mixin:o("./node_modules/raw-loader/index.js!./basicMenu/cssMixins/menuTextColor.pcss")},menuTextHoverColor:{mixin:o("./node_modules/raw-loader/index.js!./basicMenu/cssMixins/menuTextHoverColor.pcss")},submenuBackgroundColor:{mixin:o("./node_modules/raw-loader/index.js!./basicMenu/cssMixins/submenuBackgroundColor.pcss")},submenuBackgroundHoverColor:{mixin:o("./node_modules/raw-loader/index.js!./basicMenu/cssMixins/submenuBackgroundHoverColor.pcss")},submenuOutlineColor:{mixin:o("./node_modules/raw-loader/index.js!./basicMenu/cssMixins/submenuOutlineColor.pcss")},submenuTextColor:{mixin:o("./node_modules/raw-loader/index.js!./basicMenu/cssMixins/submenuTextColor.pcss")},submenuTextHoverColor:{mixin:o("./node_modules/raw-loader/index.js!./basicMenu/cssMixins/submenuTextHoverColor.pcss")},underlineColor:{mixin:o("./node_modules/raw-loader/index.js!./basicMenu/cssMixins/underlineColor.pcss")}}})},"./node_modules/raw-loader/index.js!./basicMenu/cssMixins/menuTextColor.pcss":function(e){e.exports=".vce-basic-menu--style-text--color-$selector {\n  .vce-basic-menu nav > ul > li > a {\n    @if $color != false {\n      color: $color;\n    }\n    &:hover {\n      color: color($color tint(15%));\n    }\n  }\n}"},"./node_modules/raw-loader/index.js!./basicMenu/cssMixins/menuTextHoverColor.pcss":function(e){e.exports=".vce-basic-menu-inner.vce-basic-menu--style-text--hover-color-$selector {\n  .vce-basic-menu nav > ul > li > a {\n    &:hover {\n      color: $color;\n    }\n  }\n}"},"./node_modules/raw-loader/index.js!./basicMenu/cssMixins/submenuBackgroundColor.pcss":function(e){e.exports=".vce-basic-menu--style-sub-menu-background--color-$selector {\n  .vce-basic-menu .sub-menu {\n    background-color: $color;\n  }\n}"},"./node_modules/raw-loader/index.js!./basicMenu/cssMixins/submenuBackgroundHoverColor.pcss":function(e){e.exports=".vce-basic-menu--style-sub-menu-background--hover-color-$selector {\n  .vce-basic-menu  .sub-menu a:hover {\n    background: $color;\n\n    &::before {\n     opacity: 1;\n     border-color: $color;\n    }\n  }\n}"},"./node_modules/raw-loader/index.js!./basicMenu/cssMixins/submenuOutlineColor.pcss":function(e){e.exports=".vce-basic-menu--style-sub-menu-outline--color-$selector {\n  .vce-basic-menu  .sub-menu {\n    @if $color != false {\n      border-color: $color;\n    }\n  }\n\n  .vce-basic-menu ul .menu-item .sub-menu a {\n    border-color: $color;\n  }\n}"},"./node_modules/raw-loader/index.js!./basicMenu/cssMixins/submenuTextColor.pcss":function(e){e.exports=".vce-basic-menu--style-sub-menu-text--color-$selector {\n  .vce-basic-menu .sub-menu a {\n    @if $color != false {\n      color: $color;\n    }\n    &:hover {\n      color: color($color tint(15%));\n    }\n  }\n}"},"./node_modules/raw-loader/index.js!./basicMenu/cssMixins/submenuTextHoverColor.pcss":function(e){e.exports=".vce-basic-menu-inner.vce-basic-menu--style-sub-menu-text--hover-color-$selector {\n  .vce-basic-menu .sub-menu a {\n    @if $color != false {\n      &:hover {\n        color: $color;\n      }\n    }\n  }\n}"},"./node_modules/raw-loader/index.js!./basicMenu/cssMixins/underlineColor.pcss":function(e){e.exports=".vce-basic-menu--style-underline--color-$selector {\n  .vce-basic-menu nav > ul > li {\n    &:hover {\n      &::before {\n        @if $color != false {\n          background-color: $color;\n        }\n      }\n    }\n  }\n}"},"./node_modules/raw-loader/index.js!./basicMenu/editor.css":function(e){e.exports=".vce-basic-menu-container {\n  min-height: 1em;\n}\n\n.vcv-basic-menu-placeholder {\n  background-color: rgba(182,182,182,.2);\n  padding: 20px;\n  text-align: center;\n  letter-spacing: 1px;\n  font: italic 13px/24px Roboto,Arial,sans-serif;\n  color: #a3a3a3;\n  border-radius: 3em;\n}\n\n.vcv-basic-menu-placeholder span {\n  color: #2439A2;\n  border-bottom: 1px solid transparent;\n  transition: color .2s, border-color .2s;\n  cursor: pointer;\n}\n\n.vcv-basic-menu-placeholder span:hover {\n  color: #0f2077;\n  border-color: #0f2077;\n}\n"},"./node_modules/raw-loader/index.js!./basicMenu/styles.css":function(e){e.exports='/* ----------------------------------------------\n * Basic Button\n * ---------------------------------------------- */\n/* Basic Menu basic menu styles*/\n.vce-basic-menu-container .vce-basic-menu nav > ul > li::before {\n  content: \'\';\n  position: absolute;\n  top: initial;\n  left: 26px;\n  bottom: 10px;\n  width: calc(100% - (26px * 2));\n  height: 3px;\n  border-radius: 0;\n  margin: 0;\n  background-color: transparent;\n}\n.vce-basic-menu-container .vce-basic-menu nav > ul.menu > li.menu-item > a {\n  width: auto;\n}\n.vce-basic-menu-container .vce-basic-menu ul {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-wrap: wrap;\n      -ms-flex-wrap: wrap;\n          flex-wrap: wrap;\n  margin: 0;\n}\n.vce-basic-menu-container .vce-basic-menu ul .menu-item {\n  position: relative;\n  padding: 0;\n  margin: 0;\n  list-style: none;\n}\n.vce-basic-menu-container .vce-basic-menu ul .menu-item:not(:hover) > .sub-menu,\n.vce-basic-menu-container .vce-basic-menu ul .menu-item:not(:hover) > .sub-menu a {\n  padding: 0 !important;\n  margin: 0 !important;\n}\n\n.vce-basic-menu-container .vce-basic-menu ul .menu-item:hover > .sub-menu {\n  visibility: visible;\n  max-width: 10000px;\n  transition-delay: 0s;\n  top: 100%;\n}\n.vce-basic-menu-container .vce-basic-menu ul .menu-item:hover > .sub-menu > li > a {\n  width: 16em;\n  transition-delay: 0s;\n  padding: 16px 26px;\n}\n.vce-basic-menu-container .vce-basic-menu ul .menu-item > .sub-menu > li > a {\n  width: 0;\n  overflow: hidden;\n  padding: 0;\n  transition: padding 0s ease 0.25s, width 0s ease 0.25s, color 0.2s ease-in-out;\n}\n.vce-basic-menu-container .vce-basic-menu ul .menu-item > .sub-menu > li > a:hover {\n  overflow: visible;\n}\n.vce-basic-menu-container .vce-basic-menu ul .menu-item a {\n  display: inline-block;\n  position: relative;\n  padding: 16px 26px;\n  border: none;\n  box-shadow: none;\n  text-decoration: none;\n  text-transform: uppercase;\n  font-size: 1em;\n  line-height: 1;\n  transition: color 0.2s ease-in-out;\n}\n.vce-basic-menu-container .vce-basic-menu ul .sub-menu {\n  visibility: hidden;\n  max-width: 0;\n  position: absolute;\n  top: -1000%;\n  left: 26px;\n  z-index: 99999;\n  margin: 0;\n  padding: 0;\n  border-width: 1px;\n  border-style: solid;\n  transition: all 0s ease 0.25s;\n}\n.vce-basic-menu-container .vce-basic-menu ul .sub-menu a {\n  display: block;\n  font-size: 0.75em;\n}\n.vce-basic-menu-container .vce-basic-menu ul .sub-menu a::before {\n  content: \'\';\n  position: absolute;\n  top: -1px;\n  right: -1px;\n  bottom: -1px;\n  left: -1px;\n  background: transparent;\n  border: 1px solid transparent;\n  opacity: 0;\n  transition: opacity 0.2s ease-in-out;\n}\n.vce-basic-menu-container .vce-basic-menu ul .sub-menu .menu-item::before {\n  display: none;\n}\n.vce-basic-menu-container .vce-basic-menu ul .sub-menu .menu-item a {\n  padding: 16px 18px;\n}\n.vce-basic-menu-container .vce-basic-menu ul .sub-menu .sub-menu {\n  top: -1px;\n  left: 100%;\n}\n.vce-basic-menu-container .vce-basic-menu .vce-basic-menu-wrapper.vce-basic-menu--alignment-left .menu {\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n.vce-basic-menu-container .vce-basic-menu .vce-basic-menu-wrapper.vce-basic-menu--alignment-center .menu {\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.vce-basic-menu-container .vce-basic-menu .vce-basic-menu-wrapper.vce-basic-menu--alignment-right .menu {\n  -webkit-justify-content: flex-end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n.vce-basic-menu--style-sub-menu-separator .vce-basic-menu ul .sub-menu a {\n  border-bottom-width: 1px;\n  border-bottom-style: solid;\n}\n.vce-basic-menu--style-sub-menu-separator .vce-basic-menu ul .sub-menu .menu-item:last-child a {\n  border-bottom: none;\n}\n.vce-basic-menu-sandwich-container .vce-sandwich-menu-wrapper {\n  margin: 0;\n}\n[data-vce-basic-menu-to-sandwich="true"] .vce-basic-menu,\n[data-vce-basic-menu-to-sandwich="1"] .vce-basic-menu,\n[data-vce-basic-menu-to-sandwich="true"] .vce-basic-menu-sandwich-container,\n[data-vce-basic-menu-to-sandwich="1"] .vce-basic-menu-sandwich-container {\n  opacity: 0;\n}\n[data-vcv-basic-menu-collapsed="true"] .vce-basic-menu {\n  position: absolute;\n  pointer-events: none;\n  visibility: hidden;\n  opacity: 0;\n  height: 0;\n  margin: 0;\n}\n[data-vcv-basic-menu-collapsed="true"] .vce-basic-menu-sandwich-container {\n  display: block;\n  opacity: 1;\n}\n[data-vcv-basic-menu-collapsed="false"] .vce-basic-menu {\n  position: relative;\n  pointer-events: auto;\n  visibility: visible;\n  opacity: 1;\n  height: auto;\n}\n[data-vcv-basic-menu-collapsed="false"] .vce-basic-menu-sandwich-container {\n  display: none;\n}\n\n[data-vcv-basic-menu-loading="true"] .vce-basic-menu-wrapper,\n[data-vcv-basic-menu-loading="true"] .vce-sandwich-menu-wrapper {\n  opacity: 0;\n}\n\n.vce-basic-menu-container iframe.vce-basic-menu-resize-helper {\n  margin: 0;\n  padding: 0;\n  max-width: unset;\n  border: 0;\n}\n'},"./basicMenu/settings.json":function(e){"use strict";e.exports=JSON.parse('{"groups":{"type":"string","access":"protected","value":"Content"},"menuSource":{"type":"dropdown","access":"public","value":"","options":{"label":"Menu source","global":"vcvWpMenus","reloadAction":"menu","descriptionHTML":"Choose a menu or <a href=\'{vcvCreateMenuUrl}\' target=\'_blank\'>manage menu</a> in WordPress."}},"fontSize":{"type":"string","access":"public","value":"16px","options":{"label":"Font size"}},"alignment":{"type":"buttonGroup","access":"public","value":"left","options":{"label":"Alignment","values":[{"label":"Left","value":"left","icon":"vcv-ui-icon-attribute-alignment-left"},{"label":"Center","value":"center","icon":"vcv-ui-icon-attribute-alignment-center"},{"label":"Right","value":"right","icon":"vcv-ui-icon-attribute-alignment-right"}]}},"menuTextColor":{"type":"color","access":"public","value":"#3E3D3D","options":{"label":"Menu text color","cssMixin":{"mixin":"menuTextColor","property":"color","namePattern":"[\\\\da-f]+"}}},"toggleMenuCustomHover":{"type":"toggle","access":"public","value":false,"options":{"label":"Enable custom menu text hover color"}},"menuTextHoverColor":{"type":"color","access":"public","value":"#4A90E2","options":{"label":"Custom menu text hover color","cssMixin":{"mixin":"menuTextHoverColor","property":"color","namePattern":"[\\\\da-f]+"},"onChange":{"rules":{"toggleMenuCustomHover":{"rule":"toggle"}},"actions":[{"action":"toggleVisibility"}]}}},"toggleCustomHoverUnderline":{"type":"toggle","access":"public","value":false,"options":{"label":"Enable hover underline"}},"underlineColor":{"type":"color","access":"public","value":"#4A90E2","options":{"label":"Underline color","cssMixin":{"mixin":"underlineColor","property":"color","namePattern":"[\\\\da-f]+"},"onChange":{"rules":{"toggleCustomHoverUnderline":{"rule":"toggle"}},"actions":[{"action":"toggleVisibility"}]}}},"submenuTextColor":{"type":"color","access":"public","value":"#3E3D3D","options":{"label":"Submenu text color","cssMixin":{"mixin":"submenuTextColor","property":"color","namePattern":"[\\\\da-f]+"}}},"toggleSubmenuCustomHover":{"type":"toggle","access":"public","value":false,"options":{"label":"Enable custom submenu text hover color"}},"submenuTextHoverColor":{"type":"color","access":"public","value":"#4A90E2","options":{"label":"Custom submenu text hover color","cssMixin":{"mixin":"submenuTextHoverColor","property":"color","namePattern":"[\\\\da-f]+"},"onChange":{"rules":{"toggleSubmenuCustomHover":{"rule":"toggle"}},"actions":[{"action":"toggleVisibility"}]}}},"submenuBackgroundColor":{"type":"color","access":"public","value":"#ffffff","options":{"label":"Submenu background color","cssMixin":{"mixin":"submenuBackgroundColor","property":"color","namePattern":"[\\\\da-f]+"}}},"toggleSubmenuCustomBackgroundHover":{"type":"toggle","access":"public","value":false,"options":{"label":"Enable custom submenu background hover color"}},"submenuBackgroundHoverColor":{"type":"color","access":"public","value":"#4A90E2","options":{"label":"Custom submenu background hover color","cssMixin":{"mixin":"submenuBackgroundHoverColor","property":"color","namePattern":"[\\\\da-f]+"},"onChange":{"rules":{"toggleSubmenuCustomBackgroundHover":{"rule":"toggle"}},"actions":[{"action":"toggleVisibility"}]}}},"submenuOutlineColor":{"type":"color","access":"public","value":"#EDEDED","options":{"label":"Submenu outline color","cssMixin":{"mixin":"submenuOutlineColor","property":"color","namePattern":"[\\\\da-f]+"}}},"toggleSubmenuSeparator":{"type":"toggle","access":"public","value":false,"options":{"label":"Enable custom submenu separator"}},"toggleSandwichMenu":{"type":"toggle","access":"public","value":false,"options":{"label":"Enable sandwich menu","description":"Manage a source and design in the sandwich menu settings below."}},"menu":{"type":"element","access":"public","value":{"tag":"sandwichMenu"},"options":{"category":"","tabLabel":"Sandwich menu","onChange":{"rules":{"toggleSandwichMenu":{"rule":"toggle"}},"actions":[{"action":"toggleSectionVisibility"}]}}},"customClass":{"type":"string","access":"public","value":"","options":{"label":"Extra class name","description":"Add an extra class name to the element and refer to it from the custom CSS option."}},"metaCustomId":{"type":"customId","access":"public","value":"","options":{"label":"Element ID","description":"Apply a unique ID to the element to link it directly by using #your_id (for element ID use lowercase input only)."}},"designOptions":{"type":"designOptions","access":"public","value":{},"options":{"label":"Design Options"}},"editFormTab1":{"type":"group","access":"protected","value":["menuSource","fontSize","alignment","menuTextColor","toggleMenuCustomHover","menuTextHoverColor","toggleCustomHoverUnderline","underlineColor","submenuTextColor","toggleSubmenuCustomHover","submenuTextHoverColor","submenuBackgroundColor","toggleSubmenuCustomBackgroundHover","submenuBackgroundHoverColor","submenuOutlineColor","toggleSubmenuSeparator","toggleSandwichMenu","metaCustomId","customClass"],"options":{"label":"General"}},"metaEditFormTabs":{"type":"group","access":"protected","value":["editFormTab1","menu","designOptions"]},"relatedTo":{"type":"group","access":"protected","value":["General"]},"tag":{"access":"protected","type":"string","value":"basicMenu"},"metaPublicJs":{"access":"protected","type":"string","value":{"libraries":[{"rules":{"toggleSandwichMenu":{"rule":"toggle"}},"libPaths":"public/dist/basicMenu.min.js"}]}}}')}},[["./basicMenu/index.js"]]]);