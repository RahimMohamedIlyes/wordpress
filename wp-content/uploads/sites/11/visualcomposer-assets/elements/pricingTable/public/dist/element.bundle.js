(self.vcvWebpackJsonp4x=self.vcvWebpackJsonp4x||[]).push([["element"],{"./pricingTable/index.js":function(e,o,n){"use strict";var l=n("./node_modules/vc-cake/index.js"),t=n.n(l),i=n("./node_modules/@babel/runtime/helpers/esm/extends.js"),r=n("./node_modules/@babel/runtime/helpers/esm/classCallCheck.js"),c=n("./node_modules/@babel/runtime/helpers/esm/createClass.js"),s=n("./node_modules/@babel/runtime/helpers/esm/inherits.js"),a=n("./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js"),p=n("./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js"),u=n("./node_modules/react/index.js");function d(e){var o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,l=(0,p.default)(e);if(o){var t=(0,p.default)(this).constructor;n=Reflect.construct(l,arguments,t)}else n=l.apply(this,arguments);return(0,a.default)(this,n)}}var b=t().getService("api"),g=t().getService("cook"),v=function(e){(0,s.default)(n,e);var o=d(n);function n(){return(0,r.default)(this,n),o.apply(this,arguments)}return(0,c.default)(n,[{key:"render",value:function(){var e=this.props,o=e.id,n=e.atts,l=e.editor,t=n.title,r=n.price,c=n.description,s=n.addButton,a=n.button,p=n.shape,d=n.hover,b=n.metaCustomId,v=n.customClass,f=r.input,m=r.select,x="vce-pricing-table",h="vce-pricing-table-block vce",y={};"string"==typeof v&&v&&(x+=" ".concat(v)),b&&(y.id=b),"rounded"===p&&(h+=" vce-pricing-table-block-shape--rounded");var k=this.applyDO("all"),C=this.getMixinData("titleColor");C&&(h+=" vce-pricing-table-block-title-color--".concat(C.selector)),(C=this.getMixinData("fillColor"))&&(h+=" vce-pricing-table-block-fill-color--".concat(C.selector)),(C=this.getMixinData("outlineColor"))&&(h+=" vce-pricing-table-block-outline-color--".concat(C.selector)),d?((C=this.getMixinData("fillHoverColor"))&&(h+=" vce-pricing-table-block-hover-fill-color--".concat(C.selector)),(C=this.getMixinData("outlineHoverColor"))&&(h+=" vce-pricing-table-block-hover-outline-color--".concat(C.selector))):h+=" vce-pricing-table-block-hover--default";var T="";if(s){var j=g.get(a);T=j?j.render(null,!1):null}var _="",$="";return m&&0===m.indexOf("_")?$=u.createElement("sup",{className:"vce-pricing-table-currency"},m.replace("_","")):m&&(_=u.createElement("sup",{className:"vce-pricing-table-currency"},m.replace("_",""))),u.createElement("div",(0,i.default)({className:x},l,y),u.createElement("div",(0,i.default)({className:h,id:"el-"+o},k),u.createElement("h3",{className:"vce-pricing-table-title"},t),u.createElement("div",{className:"vce-pricing-table-price"},u.createElement("p",null,_,f,$)),u.createElement("div",{className:"vce-pricing-table-description"},c),u.createElement("div",{className:"vce-pricing-table-button"},T)))}}]),n}(b.elementComponent);(0,t().getService("cook").add)(n("./pricingTable/settings.json"),(function(e){e.add(v)}),{css:n("./node_modules/raw-loader/index.js!./pricingTable/styles.css"),editorCss:n("./node_modules/raw-loader/index.js!./pricingTable/editor.css"),mixins:{titleColor:{mixin:n("./node_modules/raw-loader/index.js!./pricingTable/cssMixins/titleColor.pcss")},fillColor:{mixin:n("./node_modules/raw-loader/index.js!./pricingTable/cssMixins/fillColor.pcss")},outlineColor:{mixin:n("./node_modules/raw-loader/index.js!./pricingTable/cssMixins/outlineColor.pcss")},fillHoverColor:{mixin:n("./node_modules/raw-loader/index.js!./pricingTable/cssMixins/fillHoverColor.pcss")},outlineHoverColor:{mixin:n("./node_modules/raw-loader/index.js!./pricingTable/cssMixins/outlineHoverColor.pcss")}}},"")},"./node_modules/raw-loader/index.js!./pricingTable/cssMixins/fillColor.pcss":function(e){e.exports=".vce-pricing-table-block {\n  &-fill-color--$selector {\n    @if $color != false {\n      background-color: $color;\n    }\n  }\n}\n\n.vce-pricing-table-block-hover--default.vce-pricing-table-block {\n  &-fill-color--$selector:hover {\n    @if $color != false {\n      background-color: color($color shade(10%));\n    }\n  }\n}"},"./node_modules/raw-loader/index.js!./pricingTable/cssMixins/fillHoverColor.pcss":function(e){e.exports=".vce-pricing-table-block {\n  &-hover-fill-color--$selector:hover {\n    @if $color != false {\n      background-color: $color;\n    }\n  }\n}"},"./node_modules/raw-loader/index.js!./pricingTable/cssMixins/outlineColor.pcss":function(e){e.exports=".vce-pricing-table-block {\n  &-outline-color--$selector {\n    @if $color != false {\n      border-color: $color;\n    }\n  }\n}\n\n.vce-pricing-table-block-hover--default.vce-pricing-table-block {\n  &-outline-color--$selector:hover {\n    @if $color != false {\n      border-color: color($color shade(10%));\n    }\n  }\n}"},"./node_modules/raw-loader/index.js!./pricingTable/cssMixins/outlineHoverColor.pcss":function(e){e.exports=".vce-pricing-table-block {\n  &-hover-outline-color--$selector:hover {\n\t@if $color != false {\n\t  border-color: $color;\n\t}\n  }\n}"},"./node_modules/raw-loader/index.js!./pricingTable/cssMixins/titleColor.pcss":function(e){e.exports=".vce-pricing-table-block {\n  &-title-color--$selector {\n    h3 {\n      @if $color != false {\n        color: $color;\n      }\n    }\n\n    .vce-pricing-table-price {\n      @if $color != false {\n        color: $color;\n      }\n    }\n  }\n}"},"./node_modules/raw-loader/index.js!./pricingTable/editor.css":function(e){e.exports=".vce-pricing-table {\n  min-height: 1em;\n}\n"},"./node_modules/raw-loader/index.js!./pricingTable/styles.css":function(e){e.exports=".vce-pricing-table {\n  width: 100%;\n  max-width: 100%;\n  box-sizing: border-box;\n}\n.vce-pricing-table * {\n  box-sizing: border-box;\n}\n.vce-pricing-table .vce-button--style-basic-wrapper {\n  margin-bottom: 0;\n}\n.vce-pricing-table .vce-pricing-table-button .vce {\n  margin-bottom: 0;\n}\n.vce-pricing-table-block {\n  background-color: transparent;\n  border-color: transparent;\n  border-style: solid;\n  border-width: 3px;\n  padding: 30px;\n  text-align: center;\n  transition: background 0.5s ease, border 0.5s ease;\n}\n.vce-pricing-table-block-shape--rounded {\n  border-radius: 5px;\n  -webkit-transform: translateZ(0);\n          transform: translateZ(0);\n  overflow: hidden;\n}\n.vce-pricing-table-block-style--fill {\n  background-color: #f5f5f5;\n}\n.vce-pricing-table-block-hover-style--fill:hover {\n  background-color: #d9d9d9;\n}\n.vce-pricing-table-block-style--outline {\n  border-color: #f5f5f5;\n}\n.vce-pricing-table-block-hover-style--outline:hover {\n  border-color: #d9d9d9;\n}\n.vce-pricing-table-block .vce-pricing-table-title {\n  text-align: center;\n}\n.vce-pricing-table-block .vce-pricing-table-price {\n  border-top: 2px solid rgba(0, 0, 0, 0.1);\n  border-bottom: 2px solid rgba(0, 0, 0, 0.1);\n  margin: 30px 0;\n  padding: 27px 0;\n}\n.vce-pricing-table-block .vce-pricing-table-price p {\n  line-height: normal;\n  margin: 0;\n  text-align: center;\n  font-size: 60px;\n  font-weight: 700;\n}\n.vce-pricing-table-block .vce-pricing-table-price .vce-pricing-table-currency {\n  font-size: 0.6em;\n}\n.vce-pricing-table-block .vce-pricing-table-description {\n  line-height: 2em;\n}\n.vce-pricing-table-block .vce-pricing-table-button {\n  margin: 0 auto;\n}\n"},"./pricingTable/settings.json":function(e){"use strict";e.exports=JSON.parse('{"title":{"type":"string","access":"public","value":"Business Package","options":{"label":"Table title","dynamicField":true}},"price":{"type":"inputSelect","access":"public","value":{"input":"89,00","select":"$_"},"options":{"type":"currency","label":"Price","values":[],"dynamicField":true}},"titleColor":{"type":"color","access":"public","value":"#3f3f3f","options":{"label":"Title and price color","cssMixin":{"mixin":"titleColor","property":"color","namePattern":"[\\\\da-f]+"}}},"description":{"type":"htmleditor","access":"public","value":"<p style=\\"text-align: center;\\"><span style=\\"color: #888888;\\">Unlimited access</span><br /><span style=\\"color: #888888;\\">Online support</span><br /><span style=\\"color: #888888;\\">Intelligent reports</span><br /><span style=\\"color: #888888;\\">500 GB storage</span><br /><span style=\\"color: #888888;\\">Unlimited bandwidth</span></p>","options":{"label":"Content","description":"Content for pricing table.","inline":true,"dynamicField":true,"skinToggle":"darkTextSkin"}},"darkTextSkin":{"type":"toggleSmall","access":"public","value":false},"addButton":{"type":"toggle","access":"public","value":true,"options":{"label":"Add a button"}},"button":{"type":"element","access":"public","value":{"tag":"basicButton","alignment":"center","buttonText":"Choose Plan","shape":"round","background":"#3c5de3","color":"#ffffff","toggleCustomHover":true,"hoverBackground":"#2c4cce","hoverColor":"#ffffff"},"options":{"category":"Button","tabLabel":"Button","merge":{"attributes":[{"key":"alignment","type":"string"},{"key":"buttonText","type":"string"},{"key":"buttonUrl","type":"object"}]},"onChange":{"rules":{"addButton":{"rule":"toggle"}},"actions":[{"action":"toggleSectionVisibility"}]}}},"shape":{"type":"buttonGroup","access":"public","value":"square","options":{"label":"Shape","values":[{"label":"Square","value":"square","icon":"vcv-ui-icon-attribute-shape-square"},{"label":"Rounded","value":"rounded","icon":"vcv-ui-icon-attribute-shape-rounded"}]}},"fillColor":{"type":"color","access":"public","value":"#ededed","options":{"label":"Fill color","cssMixin":{"mixin":"fillColor","property":"color","namePattern":"[\\\\da-f]+"}}},"outlineColor":{"type":"color","access":"public","value":"","options":{"label":"Outline color","cssMixin":{"mixin":"outlineColor","property":"color","namePattern":"[\\\\da-f]+"}}},"hover":{"type":"toggle","access":"public","value":false,"options":{"label":"Hover","description":"Different color or style on hover"}},"fillHoverColor":{"type":"color","access":"public","value":"","options":{"label":"Hover fill color","cssMixin":{"mixin":"fillHoverColor","property":"color","namePattern":"[\\\\da-f]+"},"onChange":{"rules":{"hover":{"rule":"toggle"}},"actions":[{"action":"toggleVisibility"}]}}},"outlineHoverColor":{"type":"color","access":"public","value":"","options":{"label":"Outline hover color","cssMixin":{"mixin":"outlineHoverColor","property":"color","namePattern":"[\\\\da-f]+"},"onChange":{"rules":{"hover":{"rule":"toggle"}},"actions":[{"action":"toggleVisibility"}]}}},"designOptions":{"type":"designOptions","access":"public","value":{},"options":{"label":"Design Options"}},"editFormTab1":{"type":"group","access":"protected","value":["title","price","titleColor","description","addButton","shape","fillColor","outlineColor","hover","fillHoverColor","outlineHoverColor","metaCustomId","customClass"],"options":{"label":"General"}},"metaEditFormTabs":{"type":"group","access":"protected","value":["editFormTab1","button","designOptions"]},"relatedTo":{"type":"group","access":"protected","value":["General"]},"customClass":{"type":"string","access":"public","value":"","options":{"label":"Extra class name","description":"Add an extra class name to the element and refer to it from the custom CSS option."}},"metaCustomId":{"type":"customId","access":"public","value":"","options":{"label":"Element ID","description":"Apply a unique ID to the element to link it directly by using #your_id (for element ID use lowercase input only)."}},"tag":{"access":"protected","type":"string","value":"pricingTable"}}')}},[["./pricingTable/index.js"]]]);