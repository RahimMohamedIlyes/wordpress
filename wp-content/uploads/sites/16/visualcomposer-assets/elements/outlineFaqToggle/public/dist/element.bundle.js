(self.vcvWebpackJsonp4x=self.vcvWebpackJsonp4x||[]).push([["element"],{"./outlineFaqToggle/index.js":function(e,t,o){"use strict";var n=o("./node_modules/vc-cake/index.js"),l=o.n(n),a=o("./node_modules/@babel/runtime/helpers/esm/extends.js"),i=o("./node_modules/@babel/runtime/helpers/esm/classCallCheck.js"),s=o("./node_modules/@babel/runtime/helpers/esm/createClass.js"),r=o("./node_modules/@babel/runtime/helpers/esm/inherits.js"),c=o("./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js"),u=o("./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js"),g=o("./node_modules/react/index.js"),d=o("./node_modules/classnames/index.js"),p=o.n(d),v=o("./node_modules/react-dom/server.browser.js");function f(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var o,n=(0,u.default)(e);if(t){var l=(0,u.default)(this).constructor;o=Reflect.construct(n,arguments,l)}else o=n.apply(this,arguments);return(0,c.default)(this,o)}}var m=function(e){(0,r.default)(o,e);var t=f(o);function o(){return(0,i.default)(this,o),t.apply(this,arguments)}return(0,s.default)(o,[{key:"getContent",value:function(){var e=this.props.atts,t=e.textBlock,o=e.titleText,n=e.elementTag;return g.createElement("div",{className:"vce-outline-faq-toggle-inner"},g.createElement("div",{className:"vce-outline-faq-toggle-title"},g.createElement(n,{className:"vce-outline-faq-toggle-title-text","aria-controls":"".concat(e.tag,"-").concat(this.props.id),"aria-expanded":"false"},g.createElement("i",{className:"vce-outline-faq-toggle-icon"}),o)),g.createElement("div",{className:"vce-outline-faq-toggle-text-block",role:"region",id:"".concat(e.tag,"-").concat(this.props.id)},t))}},{key:"render",value:function(){var e=this.props,t=e.id,o=e.atts,n=e.editor,l=o.shape,i=o.customHoverColors,s=o.metaCustomId,r=o.customClass,c=["vce-outline-faq-toggle"],u={};"string"==typeof r&&r&&c.push(r);var d=this.getMixinData("color");d&&c.push("vce-outline-faq-toggle-color--".concat(d.selector)),"square"!==l&&c.push("vce-outline-faq-toggle-shape--".concat(l)),i&&(d=this.getMixinData("hoverColor"))&&c.push("vce-outline-faq-toggle-hover-color--".concat(d.selector)),s&&(u.id=s);var f=this.applyDO("margin padding border background animation");c=p()(c);var m=this.getContent(),b=(0,v.renderToStaticMarkup)(m);return g.createElement("div",(0,a.default)({className:c},n,u),g.createElement("div",(0,a.default)({className:"vce-outline-faq-toggle-wrapper vce",id:"el-"+t},f),g.createElement("div",{className:"vcvhelper","data-vcvs-html":b},m)))}}]),o}(l().getService("api").elementComponent);(0,l().getService("cook").add)(o("./outlineFaqToggle/settings.json"),(function(e){e.add(m)}),{css:o("./node_modules/raw-loader/index.js!./outlineFaqToggle/styles.css"),editorCss:o("./node_modules/raw-loader/index.js!./outlineFaqToggle/editor.css"),mixins:{color:{mixin:o("./node_modules/raw-loader/index.js!./outlineFaqToggle/cssMixins/color.pcss")},hoverColor:{mixin:o("./node_modules/raw-loader/index.js!./outlineFaqToggle/cssMixins/hoverColor.pcss")}}},"")},"./node_modules/raw-loader/index.js!./outlineFaqToggle/cssMixins/color.pcss":function(e){e.exports=".vce-outline-faq-toggle-color--$selector {\n  @if $color != false {\n    .vce-outline-faq-toggle-icon {\n      border: 2px solid $color;\n    }\n\n    .vce-outline-faq-toggle-icon::before,\n    .vce-outline-faq-toggle-icon::after {\n      background-color: $color;\n    }\n  }\n}"},"./node_modules/raw-loader/index.js!./outlineFaqToggle/cssMixins/hoverColor.pcss":function(e){e.exports=".vce-outline-faq-toggle-hover-color--$selector {\n  @if $hoverColor != false {\n    .vce-outline-faq-toggle-title:hover {\n      .vce-outline-faq-toggle-icon {\n        border: 2px solid $hoverColor;\n      }\n\n      .vce-outline-faq-toggle-icon::before,\n      .vce-outline-faq-toggle-icon::after {\n        background-color: $hoverColor;\n      }\n    }\n  }\n}"},"./node_modules/raw-loader/index.js!./outlineFaqToggle/editor.css":function(e){e.exports=".vce-outline-faq-toggle {\n  min-height: 1em;\n}\n.vce-outline-faq-toggle .vce-outline-faq-toggle-text-block > vcvhelper > *:last-child, .vce-outline-faq-toggle .vce-outline-faq-toggle-text-block > .vcvhelper > *:last-child {\n  margin-bottom: 0;\n}\n\n.vce-outline-faq-toggle .vce-outline-faq-toggle-text-block > vcvhelper > *:first-child, .vce-outline-faq-toggle .vce-outline-faq-toggle-text-block > .vcvhelper > *:first-child {\n  margin-top: 0;\n}"},"./node_modules/raw-loader/index.js!./outlineFaqToggle/styles.css":function(e){e.exports='.vce-outline-faq-toggle .vce-outline-faq-toggle-text-block > *:last-child {\n  margin-bottom: 0;\n}\n\n.vce-outline-faq-toggle .vce-outline-faq-toggle-text-block > *:first-child {\n  margin-top: 0;\n}\n\n.vce-outline-faq-toggle-title {\n  padding-left: 33px;\n  position: relative;\n  cursor: pointer;\n}\n\n.rtl .vce-outline-faq-toggle-title ,\n[dir="rlt"] .vce-outline-faq-toggle-title  {\n  padding-left: initial;\n  padding-right: 33px;\n}\n\n.vce-outline-faq-toggle-title-text {\n  position: relative;\n}\n\n.vce-outline-faq-toggle-icon {\n  position: absolute;\n  left: -33px;\n  top: 50%;\n  -webkit-transform: translate(0, -50%);\n          transform: translate(0, -50%);\n  height: 22px;\n  width: 22px;\n  transition: background-color .2s ease-in-out, border .2s ease-in-out;\n}\n\n.rtl .vce-outline-faq-toggle-icon ,\n[dir="rlt"] .vce-outline-faq-toggle-icon  {\n  left: auto;\n  right: -33px;\n}\n\n.vce-outline-faq-toggle-icon::before,\n.vce-outline-faq-toggle-icon::after {\n  content: \'\';\n  display: block;\n  position: absolute;\n  box-sizing: border-box;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  left: 50%;\n  top: 50%;\n  transition: background-color .2s ease-in-out, opacity .2s ease-in-out;\n}\n\n.vce-outline-faq-toggle-icon::before {\n  height: 2px;\n  width: 10px;\n}\n\n.vce-outline-faq-toggle-icon::after {\n  height: 10px;\n  width: 2px;\n  opacity: 1;\n}\n\n.vce-outline-faq-toggle-state--opened .vce-outline-faq-toggle-icon::after {\n  opacity: 0;\n}\n\n.vce-outline-faq-toggle-text-block {\n  padding-left: 33px;\n}\n\n.vce-outline-faq-toggle-shape--rounded .vce-outline-faq-toggle-icon {\n  border-radius: 5px;\n}\n\n.vce-outline-faq-toggle-shape--round .vce-outline-faq-toggle-icon {\n  border-radius: 50%;\n}\n\n.vce-outline-faq-toggle-inner > :nth-child(even) {\n  display: none;\n}\n'},"./outlineFaqToggle/settings.json":function(e){"use strict";e.exports=JSON.parse('{"groups":{"type":"string","access":"protected","value":"Buttons"},"titleText":{"type":"string","access":"public","value":"What is frequently asked questions?","options":{"label":"Title text","dynamicField":true}},"elementTag":{"type":"dropdown","access":"public","value":"h3","options":{"label":"Element tag","values":[{"label":"h1","value":"h1"},{"label":"h2","value":"h2"},{"label":"h3","value":"h3"},{"label":"h4","value":"h4"},{"label":"h5","value":"h5"},{"label":"h6","value":"h6"},{"label":"p","value":"p"},{"label":"div","value":"div"}]}},"textBlock":{"type":"htmleditor","access":"public","value":"<p>Frequently asked questions (FAQ) or Questions and Answers (Q&A), are listed questions and answers, all supposed to be commonly asked in some context, and pertaining to a particular topic.</p>","options":{"label":"Text block","inline":true,"dynamicField":true,"skinToggle":"darkTextSkin"}},"darkTextSkin":{"type":"toggleSmall","access":"public","value":false},"iconColor":{"type":"color","access":"public","value":"#3E3D3D","options":{"label":"Color","cssMixin":{"mixin":"color","property":"color","namePattern":"[\\\\da-f]+"}}},"shape":{"type":"buttonGroup","access":"public","value":"square","options":{"label":"Shape","values":[{"label":"Square","value":"square","icon":"vcv-ui-icon-attribute-shape-square"},{"label":"Rounded","value":"rounded","icon":"vcv-ui-icon-attribute-shape-rounded"},{"label":"Round","value":"round","icon":"vcv-ui-icon-attribute-shape-round"}]}},"customHoverColors":{"type":"toggle","access":"public","value":false,"options":{"label":"Custom hover colors"}},"iconHoverColor":{"type":"color","access":"public","value":"#2e2e2e","options":{"label":"Hover color","cssMixin":{"mixin":"hoverColor","property":"hoverColor","namePattern":"[\\\\da-f]+"},"onChange":{"rules":{"customHoverColors":{"rule":"toggle"}},"actions":[{"action":"toggleVisibility"}]}}},"designOptions":{"type":"designOptions","access":"public","value":{},"options":{"label":"Design Options"}},"editFormTab1":{"type":"group","access":"protected","value":["titleText","elementTag","textBlock","iconColor","shape","customHoverColors","iconHoverColor","metaCustomId","customClass"],"options":{"label":"General"}},"metaEditFormTabs":{"type":"group","access":"protected","value":["editFormTab1","designOptions"]},"relatedTo":{"type":"group","access":"protected","value":["General"]},"customClass":{"type":"string","access":"public","value":"","options":{"label":"Extra class name","description":"Add an extra class name to the element and refer to it from the custom CSS option."}},"metaCustomId":{"type":"customId","access":"public","value":"","options":{"label":"Element ID","description":"Apply a unique ID to the element to link it directly by using #your_id (for element ID use lowercase input only)."}},"sharedAssetsLibrary":{"access":"protected","type":"string","value":{"libraries":[{"libsNames":["faqToggle"]}]}},"metaPublicJs":{"access":"protected","type":"string","value":{"libraries":[{"libPaths":"public/dist/outlineFaqToggle.min.js"}]}},"tag":{"access":"protected","type":"string","value":"outlineFaqToggle"}}')}},[["./outlineFaqToggle/index.js"]]]);