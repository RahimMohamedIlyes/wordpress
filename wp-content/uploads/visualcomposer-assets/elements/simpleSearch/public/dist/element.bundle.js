(self.vcvWebpackJsonp4x=self.vcvWebpackJsonp4x||[]).push([["element"],{"./simpleSearch/index.js":function(e,t,n){"use strict";var o=n("./node_modules/vc-cake/index.js"),r=n.n(o),i=n("./node_modules/@babel/runtime/helpers/esm/extends.js"),c=n("./node_modules/@babel/runtime/helpers/esm/classCallCheck.js"),s=n("./node_modules/@babel/runtime/helpers/esm/createClass.js"),l=n("./node_modules/@babel/runtime/helpers/esm/inherits.js"),a=n("./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js"),p=n("./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js"),u=n("./node_modules/react/index.js"),d=n("./node_modules/vc-helpers/lib/index.js");function h(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,o=(0,p.default)(e);if(t){var r=(0,p.default)(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return(0,a.default)(this,n)}}var m=function(e){(0,l.default)(n,e);var t=h(n);function n(){return(0,c.default)(this,n),t.apply(this,arguments)}return(0,s.default)(n,[{key:"validateSize",value:function(e){var t=new RegExp("^-?\\d*(\\.\\d{0,9})?("+["px","em","rem","%","vw","vh"].join("|")+")?$");return""===e||e.match(t)?e:null}},{key:"getIcon",value:function(){return u.createElement("button",{className:"vce-simple-search-icon-container vce-simple-search-button",type:"submit","aria-label":"Search"},u.createElement("svg",{className:"vce-simple-search-icon",width:"32px",height:"32px",viewBox:"0 0 32 32",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},u.createElement("g",{fill:"#000000",fillRule:"nonzero"},u.createElement("path",{d:"M31.2168494,27.435073 L24.2650133,20.4833648 C24.2280674,20.4464189 24.1847295,20.4205951 24.1461216,20.386206 C25.5140145,18.3112276 26.3123782,15.8274154 26.3123782,13.1563169 C26.3123782,5.89024897 20.4221292,0 13.1561891,0 C5.89024897,0 0,5.89024897 0,13.1561891 C0,20.4220013 5.89012113,26.3123782 13.1560612,26.3123782 C15.8272875,26.3123782 18.3109719,25.5140145 20.3859503,24.1461216 C20.4203394,24.1846016 20.4460353,24.2279395 20.4829812,24.2648854 L27.4349452,31.2168494 C28.4792739,32.2610502 30.1723929,32.2610502 31.2168494,31.2168494 C32.2610502,30.1725207 32.2610502,28.4794017 31.2168494,27.435073 Z M13.1561891,21.7515421 C8.40896162,21.7515421 4.56070824,17.9032887 4.56070824,13.1561891 C4.56070824,8.40896162 8.40908946,4.56070824 13.1561891,4.56070824 C17.9031609,4.56070824 21.7515421,8.40908946 21.7515421,13.1561891 C21.7515421,17.9032887 17.9031609,21.7515421 13.1561891,21.7515421 Z",id:"Shape"}))))}},{key:"render",value:function(){var e=this.props,t=e.id,n=e.atts,o=e.editor,r=n.iconPosition,c=n.shape,s=n.placeholderText,l=n.width,a=n.fontSize,p=n.customClass,h=n.metaCustomId,m=n.alignment,v=n.borderColor,b=n.borderHoverColor,g=n.borderWidth,f=n.iconColor,x=n.iconHoverColor,C=n.placeholderColor,y=n.textColor,S=n.extraDataAttributes,w="vce-simple-search",k=this.getExtraDataAttributes(S),E={alignment:m,borderColor:v,borderHoverColor:b,borderWidthPx:"".concat(g,"px"),iconColor:f,iconHoverColor:x,placeholderColor:C,textColor:y},D=(0,d.setCssVariables)(E),j=this.getMixinData("iconColor");j&&(w+=" vce-simple-search-icon-color--".concat(j.selector)),(j=this.getMixinData("iconHoverColor"))&&(w+=" vce-simple-search-icon-hover-color--".concat(j.selector)),(j=this.getMixinData("textColor"))&&(w+=" vce-simple-search-text-color--".concat(j.selector)),(j=this.getMixinData("borderWidth"))&&j.borderWidth&&parseInt(j.borderWidth)>0&&(w+=" vce-simple-search-border-width--".concat(j.selector),(j=this.getMixinData("borderColor"))&&(w+=" vce-simple-search-border-color--".concat(j.selector)),(j=this.getMixinData("borderHoverColor"))&&(w+=" vce-simple-search-border-hover-color--".concat(j.selector))),(j=this.getMixinData("placeholderColor"))&&(w+=" vce-simple-search-placeholder-color--".concat(j.selector)),"left-center"===r?w+=" vce-simple-search-icon-position--left":"right-center"===r&&(w+=" vce-simple-search-icon-position--right"),c&&"square"!==c&&(w+=" vce-simple-search-shape--".concat(c)),p&&(w+=" ".concat(p)),h&&(k.id=h),l&&(l=this.validateSize(l))&&(l=/^\d+$/.test(l)?l+"px":l,k.style||(k.style={}),k.style.maxWidth=l),a&&(a=this.validateSize(a))&&(a=/^\d+$/.test(a)?a+"px":a,k.style||(k.style={}),k.style.fontSize=a);var _=this.applyDO("margin animation"),A=this.applyDO("padding border background"),I=window.VCV_SITE_URL&&window.VCV_SITE_URL();return u.createElement("div",(0,i.default)({className:"vce-simple-search-container",id:"el-"+t},o,{style:D}),u.createElement("form",(0,i.default)({action:I,className:"vce-simple-search-container-inner vce"},_),u.createElement("div",(0,i.default)({className:w},k),u.createElement("input",(0,i.default)({title:s,type:"search",name:"s",className:"vce-simple-search-input",placeholder:s},A)),this.getIcon())))}}]),n}(r().getService("api").elementComponent);(0,r().getService("cook").add)(n("./simpleSearch/settings.json"),(function(e){e.add(m)}),{css:n("./node_modules/raw-loader/index.js!./simpleSearch/styles.css"),editorCss:n("./node_modules/raw-loader/index.js!./simpleSearch/editor.css"),mixins:{}})},"./node_modules/raw-loader/index.js!./simpleSearch/editor.css":function(e){e.exports=".vce-simple-search-container {\n  min-height: 1em;\n}\n"},"./node_modules/raw-loader/index.js!./simpleSearch/styles.css":function(e){e.exports=".vce-simple-search-container {\n  --alignment: left;\n  --borderColor: rgba(152,152,152,.2);\n  --borderHoverColor: rgba(152,152,152,.5);\n  --borderWidthPx: 2px;\n  --iconColor: rgba(152,152,152,.2);\n  --iconHoverColor: rgba(152,152,152,.5);\n  --placeholderColor: #C1C1C1;\n  --textColor: rgba(152,152,152,1);\n  text-align: var(--alignment);\n}\n\n.vce-simple-search-container-inner {\n  padding: 0;\n  margin-top: 0;\n  margin-left: 0;\n  margin-right: 0;\n}\n\n.vce-simple-search {\n  display: -webkit-inline-flex;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  position: relative;\n  font-size: 12px;\n  width: 100%;\n}\n\n.vce-simple-search.vce-simple-search-shape--round input.vce-simple-search-input {\n  border-radius: 4em;\n}\n\n.vce-simple-search.vce-simple-search-shape--rounded input.vce-simple-search-input {\n  border-radius: 5px;\n}\n\n.vce-simple-search-container input.vce-simple-search-input {\n  border-radius: 0;\n  padding: 8px 45px 8px 17px;\n  box-shadow: none;\n  outline: none;\n  background-color: transparent;\n  border-style: solid;\n  transition: background-color .2s, border .2s;\n  border-width: 0;\n  -webkit-flex-grow: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  width: 0;\n}\n\n.vce-simple-search-container input.vce-simple-search-input:focus,\n.vce-simple-search-container input.vce-simple-search-input:hover {\n  outline: none;\n}\n\n.vce-simple-search-container input.vce-simple-search-input:focus::-webkit-input-placeholder {\n  color: transparent;\n}\n.vce-simple-search-container input.vce-simple-search-input:focus::-moz-placeholder {\n  color: transparent;\n}\n.vce-simple-search-container input.vce-simple-search-input:focus:-ms-input-placeholder {\n  color: transparent;\n}\n.vce-simple-search-container input.vce-simple-search-input:focus:-moz-placeholder {\n  color: transparent;\n}\n\nbutton.vce-simple-search-icon-container {\n  position: absolute;\n  width: 45px;\n  top: 0;\n  bottom: 0;\n  transition: background-color .2s;\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n  box-shadow: none;\n  -webkit-appearance: none;\n  text-decoration: none;\n  border: 0;\n  background-color: transparent;\n}\n\nbutton.vce-simple-search-icon-container:hover,\nbutton.vce-simple-search-icon-container:focus {\n  outline: none;\n}\n\n.vce-simple-search-icon-position--left button.vce-simple-search-icon-container {\n  left: 0;\n}\n.vce-simple-search-icon-position--right button.vce-simple-search-icon-container {\n  right: 0;\n}\n\n.vce-simple-search-icon {\n  position: absolute;\n  width: 16px;\n  height: 16px;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-60%, -55%);\n          transform: translate(-60%, -55%);\n}\n\n.vce-simple-search-icon > g {\n  transition: fill .2s;\n}\n\n/* ==== icon position ==== */\n.vce-simple-search.vce-simple-search-icon-position--left input.vce-simple-search-input {\n  padding: 8px 17px 8px 45px;\n}\n\n.vce-simple-search.vce-simple-search-icon-position--left .vce-simple-search-icon {\n  -webkit-transform: translate(-50%, -55%);\n          transform: translate(-50%, -55%);\n}\n\n.vce-simple-search input.vce-simple-search-input {\n  border-color: var(--borderColor);\n}\n\n.vce-simple-search:hover input.vce-simple-search-input,\n.vce-simple-search:focus input.vce-simple-search-input,\n.vce-simple-search input.vce-simple-search-input:focus {\n  border-color: var(--borderHoverColor);\n}\n\n.vce-simple-search input.vce-simple-search-input {\n  border-width: var(--borderWidthPx);\n}\n\n.vce-simple-search.vce-simple-search-icon-position--left .vce-simple-search-icon-container {\n  left: var(--borderWidthPx);\n}\n\n.vce-simple-search.vce-simple-search-icon-position--right .vce-simple-search-icon-container {\n  right: var(--borderWidthPx);\n}\n\n.vce-simple-search .vce-simple-search-icon > g {\n  fill: var(--iconColor);\n}\n\n.vce-simple-search:hover .vce-simple-search-icon > g,\n.vce-simple-search .vce-simple-search-input:focus ~ .vce-simple-search-icon-container .vce-simple-search-icon > g {\n  fill: var(--iconHoverColor);\n}\n\n.vce-simple-search input.vce-simple-search-input::-webkit-input-placeholder {\n  color: var(--placeholderColor);\n}\n.vce-simple-search input.vce-simple-search-input::-moz-placeholder {\n  color: var(--placeholderColor);\n}\n.vce-simple-search input.vce-simple-search-input:-ms-input-placeholder {\n  color: var(--placeholderColor);\n}\n.vce-simple-search input.vce-simple-search-input:-moz-placeholder {\n  color: var(--placeholderColor);\n}\n\n.vce-simple-search .vce-simple-search-input {\n  color: var(--textColor);\n}\n"},"./simpleSearch/settings.json":function(e){"use strict";e.exports=JSON.parse('{"tag":{"access":"protected","type":"string","value":"simpleSearch"},"relatedTo":{"type":"group","access":"protected","value":["General"]},"iconColor":{"type":"color","access":"public","value":"rgba(152,152,152,.2)","options":{"label":"Icon color"}},"iconHoverColor":{"type":"color","access":"public","value":"rgba(152,152,152,.5)","options":{"label":"Icon hover color"}},"iconPosition":{"type":"buttonGroup","access":"public","value":"right-center","options":{"label":"Icon position","values":[{"label":"Left center","value":"left-center","icon":"vcv-ui-icon-attribute-background-position-left-center"},{"label":"Right center","value":"right-center","icon":"vcv-ui-icon-attribute-background-position-right-center"}]}},"shape":{"type":"buttonGroup","access":"public","value":"round","options":{"label":"Input shape","values":[{"label":"Square","value":"square","icon":"vcv-ui-icon-attribute-shape-square"},{"label":"Rounded","value":"rounded","icon":"vcv-ui-icon-attribute-shape-rounded"},{"label":"Round","value":"round","icon":"vcv-ui-icon-attribute-shape-round"}]}},"borderColor":{"type":"color","access":"public","value":"rgba(152,152,152,.2)","options":{"label":"Border color"}},"borderHoverColor":{"type":"color","access":"public","value":"rgba(152,152,152,.5)","options":{"label":"Border hover color"}},"borderWidth":{"type":"number","access":"public","value":"2","options":{"min":"0","label":"Border width","description":"Enter border width in px."}},"placeholderText":{"type":"string","access":"public","value":"Search","options":{"label":"Placeholder text","dynamicField":true}},"placeholderColor":{"type":"color","access":"public","value":"#C1C1C1","options":{"label":"Placeholder text color"}},"textColor":{"type":"color","access":"public","value":"rgba(152,152,152,1)","options":{"label":"Input text color"}},"width":{"type":"string","access":"public","value":"290px","options":{"label":"Width","description":"Enter width in pixels or percentages (example: 200px)."}},"fontSize":{"type":"string","access":"public","value":"12px","options":{"label":"Font size"}},"alignment":{"type":"buttonGroup","access":"public","value":"left","options":{"label":"Alignment","values":[{"label":"Left","value":"left","icon":"vcv-ui-icon-attribute-alignment-left"},{"label":"Center","value":"center","icon":"vcv-ui-icon-attribute-alignment-center"},{"label":"Right","value":"right","icon":"vcv-ui-icon-attribute-alignment-right"}]}},"customClass":{"type":"string","access":"public","value":"","options":{"label":"Extra class name","description":"Add an extra class name to the element and refer to it from the custom CSS option."}},"metaCustomId":{"type":"customId","access":"public","value":"","options":{"label":"Element ID","description":"Apply a unique ID to the element to link it directly by using #your_id (for element ID use lowercase input only)."}},"designOptions":{"type":"designOptions","access":"public","value":{"device":{"all":{"backgroundColor":""}}},"options":{"label":"Design Options"}},"advancedTab":{"type":"group","access":"protected","value":["htmlAttributes","customAttributes","customCSS"],"options":{"label":"Advanced","isSections":true}},"metaEditFormTabs":{"type":"group","access":"protected","value":["contentTab","designTab","advancedTab"]},"htmlAttributes":{"type":"group","access":"public","value":["metaCustomId","customClass"],"options":{"label":"HTML Attributes"}},"customCSS":{"type":"group","access":"public","value":["styleEditor"],"options":{"label":"Custom CSS","tooltip":"Add custom CSS to the element using the [element-id] placeholder."}},"styleEditor":{"type":"styleEditor","access":"public","value":[],"options":[]},"customAttributes":{"type":"group","access":"public","value":["extraDataAttributes"],"options":{"label":"Custom Attributes"}},"extraDataAttributes":{"type":"string","access":"public","value":"","options":{"label":"Extra Data Attributes","description":"Add data attributes to your element (ex. data-name=\\"John Lennon\\" data-age=\\"28\\")"}},"designTab":{"type":"group","access":"protected","options":{"label":"Design","isSections":true},"value":["styleSection","designOptions"]},"styleSection":{"type":"group","access":"protected","options":{"label":"Style"},"value":["fontSize","placeholderColor","textColor","width","alignment","shape","iconColor","iconHoverColor","iconPosition","borderWidth","borderColor","borderHoverColor"]},"contentTab":{"type":"group","access":"protected","options":{"label":"Content","isSections":true},"value":["contentSection"]},"contentSection":{"type":"group","access":"protected","options":{"label":"Content"},"value":["placeholderText"]}}')}},[["./simpleSearch/index.js"]]]);