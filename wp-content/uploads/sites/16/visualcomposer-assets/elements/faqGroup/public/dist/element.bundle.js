(self.vcvWebpackJsonp4x=self.vcvWebpackJsonp4x||[]).push([["element"],{"./faqGroup/index.js":function(e,o,r){"use strict";var n=r("./node_modules/vc-cake/index.js"),t=r.n(n),i=r("./node_modules/@babel/runtime/helpers/esm/extends.js"),a=r("./node_modules/@babel/runtime/helpers/esm/classCallCheck.js"),l=r("./node_modules/@babel/runtime/helpers/esm/createClass.js"),s=r("./node_modules/@babel/runtime/helpers/esm/inherits.js"),c=r("./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js"),p=r("./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js"),d=r("./node_modules/react/index.js"),u=r("./node_modules/classnames/index.js"),f=r.n(u);function m(e){var o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=(0,p.default)(e);if(o){var t=(0,p.default)(this).constructor;r=Reflect.construct(n,arguments,t)}else r=n.apply(this,arguments);return(0,c.default)(this,r)}}var v=function(e){(0,s.default)(r,e);var o=m(r);function r(){return(0,a.default)(this,r),o.apply(this,arguments)}return(0,l.default)(r,[{key:"render",value:function(){var e=this.props,o=e.atts,r=e.id,n=o.title,t=o.textBlock,i=["vce-faq-group-item"];i=f()(i);var a="tab-".concat(r),l="panel-".concat(r);return d.createElement("div",{className:i},d.createElement("div",{className:"vce-faq-group-item-heading",role:"tab",id:a,"aria-controls":l,"aria-expanded":!1,"aria-selected":!1},d.createElement("h3",{className:"vce-faq-group-item-heading-title"},n),d.createElement("div",{className:"vce-faq-group-item-icon"})),d.createElement("div",{className:"vce-faq-group-item-content",role:"tabpanel",id:l,"aria-labelledby":a,"aria-hidden":!0},t))}}]),r}(d.Component),g=r("./node_modules/react-dom/server.browser.js");function b(e){var o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=(0,p.default)(e);if(o){var t=(0,p.default)(this).constructor;r=Reflect.construct(n,arguments,t)}else r=n.apply(this,arguments);return(0,c.default)(this,r)}}var h=function(e){(0,s.default)(r,e);var o=b(r);function r(){return(0,a.default)(this,r),o.apply(this,arguments)}return(0,l.default)(r,[{key:"getContent",value:function(){var e=this,o=this.props.atts.faqItems;return(o.value?o.value:o).map((function(o,r){var n="".concat(e.props.id,"-").concat(r),t="vce-faq-group-item-".concat(n),a=o;return a.atts={},a.atts.title=o.title,a.atts.textBlock=o.textBlock,a.itemIndex=r,a.id=n,d.createElement(v,(0,i.default)({},a,{key:t}))}))}},{key:"render",value:function(){var e=this.props,o=e.id,r=e.atts,n=e.editor,t=r.shape,a=r.toggleAutoClose,l=r.customClass,s=r.metaCustomId,c=["vce","vce-faq-group-container"],p={},u={};l&&c.push(l),a&&(u["data-vce-faq-group-auto-close"]=!0),s&&(p.id=s);var m=this.getMixinData("fillColor");m&&c.push("vce-faq-group-fill-color--".concat(m.selector)),(m=this.getMixinData("fillHoverColor"))&&c.push("vce-faq-group-fill-hover-color--".concat(m.selector)),"none"!==t&&((m=this.getMixinData("borderColor"))&&c.push("vce-faq-group-border-color--".concat(m.selector)),(m=this.getMixinData("borderHoverColor"))&&c.push("vce-faq-group-border-hover-color--".concat(m.selector)),c.push("vce-faq-group-shape--".concat(t))),(m=this.getMixinData("iconColor"))&&c.push("vce-faq-group-icon-color--".concat(m.selector)),(m=this.getMixinData("iconHoverColor"))&&c.push("vce-faq-group-icon-hover-color--".concat(m.selector)),(m=this.getMixinData("titleColor"))&&c.push("vce-faq-group-title-color--".concat(m.selector)),c=f()(c);var v=this.applyDO("all"),b=this.getContent(),h=(0,g.renderToStaticMarkup)(b);return d.createElement("div",(0,i.default)({},n,{id:"el-".concat(o),className:c},v,u),d.createElement("div",(0,i.default)({className:"vce-faq-group"},p,{role:"tablist"}),d.createElement("div",{className:"vcvhelper","data-vcvs-html":h},b)))}}]),r}((0,n.getService)("api").elementComponent);(0,t().getService("cook").add)(r("./faqGroup/settings.json"),(function(e){e.add(h)}),{css:r("./node_modules/raw-loader/index.js!./faqGroup/styles.css"),editorCss:r("./node_modules/raw-loader/index.js!./faqGroup/editor.css"),mixins:{borderColor:{mixin:r("./node_modules/raw-loader/index.js!./faqGroup/cssMixins/borderColor.pcss")},borderHoverColor:{mixin:r("./node_modules/raw-loader/index.js!./faqGroup/cssMixins/borderHoverColor.pcss")},fillColor:{mixin:r("./node_modules/raw-loader/index.js!./faqGroup/cssMixins/fillColor.pcss")},fillHoverColor:{mixin:r("./node_modules/raw-loader/index.js!./faqGroup/cssMixins/fillHoverColor.pcss")},iconColor:{mixin:r("./node_modules/raw-loader/index.js!./faqGroup/cssMixins/iconColor.pcss")},iconHoverColor:{mixin:r("./node_modules/raw-loader/index.js!./faqGroup/cssMixins/iconHoverColor.pcss")},titleColor:{mixin:r("./node_modules/raw-loader/index.js!./faqGroup/cssMixins/titleColor.pcss")}}},"")},"./node_modules/raw-loader/index.js!./faqGroup/cssMixins/borderColor.pcss":function(e){e.exports=".vce-faq-group-border-color--$selector {\n  .vce-faq-group-item {\n    @if $borderColor != false {\n      border-color: $borderColor;\n    }\n  }\n  .vce-faq-group-item-content {\n    @if $borderColor != false {\n      border-color: $borderColor;\n    }\n  }\n}\n"},"./node_modules/raw-loader/index.js!./faqGroup/cssMixins/borderHoverColor.pcss":function(e){e.exports=".vce-faq-group-border-hover-color--$selector:hover {\n  .vce-faq-group-item {\n    @if $borderHoverColor != false {\n      border-color: $borderHoverColor;\n    }\n  }\n  .vce-faq-group-item-content {\n    @if $borderHoverColor != false {\n      border-color: $borderHoverColor;\n    }\n  }\n}\n"},"./node_modules/raw-loader/index.js!./faqGroup/cssMixins/fillColor.pcss":function(e){e.exports=".vce-faq-group-fill-color--$selector {\n  .vce-faq-group-item {\n    @if $fillColor != false {\n      background-color: $fillColor;\n    }\n  }\n}\n"},"./node_modules/raw-loader/index.js!./faqGroup/cssMixins/fillHoverColor.pcss":function(e){e.exports=".vce-faq-group-fill-hover-color--$selector {\n  .vce-faq-group-item:hover {\n    @if $fillHoverColor != false {\n      background-color: $fillHoverColor;\n    }\n  }\n}\n"},"./node_modules/raw-loader/index.js!./faqGroup/cssMixins/iconColor.pcss":function(e){e.exports=".vce-faq-group-icon-color--$selector {\n  .vce-faq-group-item-icon::before,\n  .vce-faq-group-item-icon::after {\n    @if $iconColor != false {\n      background-color: $iconColor;\n    }\n  }\n}\n"},"./node_modules/raw-loader/index.js!./faqGroup/cssMixins/iconHoverColor.pcss":function(e){e.exports=".vce-faq-group-icon-hover-color--$selector {\n  .vce-faq-group-item:hover {\n    .vce-faq-group-item-icon::before,\n    .vce-faq-group-item-icon::after {\n      @if $iconHoverColor != false {\n        background-color: $iconHoverColor;\n      }\n    }\n  }\n}\n"},"./node_modules/raw-loader/index.js!./faqGroup/cssMixins/titleColor.pcss":function(e){e.exports=".vce-faq-group-title-color--$selector {\n  .vce-faq-group-item-heading-title {\n    @if $titleColor != false {\n      color: $titleColor;\n    }\n  }\n}\n"},"./node_modules/raw-loader/index.js!./faqGroup/editor.css":function(e){e.exports=".vce-faq-group-container {\n  min-height: 1em;\n}\n\n.vce-faq-group-item-content > .vcvhelper > *:first-child {\n  margin-top: 0;\n  padding-top: 0;\n}\n\n.vce-faq-group-item-content > .vcvhelper > *:last-child {\n  margin-bottom: 0;\n  padding-bottom: 0;\n}\n"},"./node_modules/raw-loader/index.js!./faqGroup/styles.css":function(e){e.exports='.vce-faq-group-shape--rounded .vce-faq-group-item {\n  border-width: 1px;\n  border-style: solid;\n}\n.vce-faq-group-shape--rounded .vce-faq-group-item-content {\n  border-top-width: 1px;\n  border-top-style: solid;\n}\n\n.vce-faq-group-shape--rounded .vce-faq-group-item:first-child {\n  border-top-left-radius: 10px;\n  border-top-right-radius: 10px;\n}\n\n.vce-faq-group-shape--rounded .vce-faq-group-item:last-child {\n  border-bottom-left-radius: 10px;\n  border-bottom-right-radius: 10px;\n}\n\n.vce-faq-group-shape--square .vce-faq-group-item {\n  border-width: 1px;\n  border-style: solid;\n}\n\n.vce-faq-group-shape--square .vce-faq-group-item-content {\n  border-top-width: 1px;\n  border-top-style: solid;\n}\n\n.vce-faq-group-item {\n  margin-top: -1px;\n  transition: .2s border-color, .2s background-color;\n}\n\n.vce-faq-group .vce-faq-group-item:first-child {\n  margin-top: 0;\n}\n\n.vce-faq-group-item-heading {\n  padding: 13px 50px 13px 15px;\n  cursor: pointer;\n  position: relative;\n}\n\n.vce-faq-group .vce-faq-group-item-heading-title {\n  font-size: 18px;\n  margin: 0;\n  padding: 0;\n  line-height: 1.4;\n}\n\n.vce-faq-group-item-icon {\n  position: absolute;\n  right: 13px;\n  top: 0;\n  bottom: 0;\n  margin: auto;\n  height: 30px;\n  width: 30px;\n  transition: -webkit-transform .2s;\n  transition: transform .2s;\n  transition: transform .2s, -webkit-transform .2s;\n  will-change: transform;\n}\n\n.vce-faq-group-item--opened .vce-faq-group-item-icon {\n  -webkit-transform: rotate(45deg);\n          transform: rotate(45deg);\n}\n\n.vce-faq-group-item-icon::before,\n.vce-faq-group-item-icon::after {\n  content: \'\';\n  position: absolute;\n  width: 16px;\n  height: 2px;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  margin: auto;\n  transition: background-color .2s;\n}\n\n.vce-faq-group-item-icon::after {\n  width: 2px;\n  height: 16px;\n}\n\n.vce-faq-group-item-content {\n  display: none;\n  padding: 15px;\n  transition: .2s border-top-color;\n}\n\n.vce-faq-group-item-content > *:first-child {\n  margin-top: 0;\n  padding-top: 0;\n}\n\n.vce-faq-group-item-content > *:last-child {\n  margin-bottom: 0;\n  padding-bottom: 0;\n}\n\n.rtl.vce-faq-group-item-heading,\n[dir="rlt"].vce-faq-group-item-heading,\n.rtl .vce-faq-group-item-heading,\n[dir="rlt"] .vce-faq-group-item-heading {\n  padding-left: 50px;\n  padding-right: 15px;\n}\n\n.rtl.vce-faq-group-item-icon,\n[dir="rlt"].vce-faq-group-item-icon,\n.rtl .vce-faq-group-item-icon,\n[dir="rlt"] .vce-faq-group-item-icon {\n  right: auto;\n  left: 13px;\n}\n'},"./faqGroup/settings.json":function(e){"use strict";e.exports=JSON.parse('{"tag":{"access":"protected","type":"string","value":"faqGroup"},"shape":{"type":"dropdown","access":"public","value":"square","options":{"label":"Shape","values":[{"label":"None","value":"none"},{"label":"Square","value":"square"},{"label":"Rounded","value":"rounded"}]}},"borderColor":{"type":"color","access":"public","value":"#DFDFDF","options":{"label":"Border color","cssMixin":{"mixin":"borderColor","property":"borderColor","namePattern":"[\\\\da-f]+"},"onChange":{"rules":{"shape":{"rule":"valueIn","options":{"values":["square","rounded"]}}},"actions":[{"action":"toggleVisibility"}]}}},"borderHoverColor":{"type":"color","access":"public","value":"","options":{"label":"Border hover color","cssMixin":{"mixin":"borderHoverColor","property":"borderHoverColor","namePattern":"[\\\\da-f]+"},"onChange":{"rules":{"shape":{"rule":"valueIn","options":{"values":["square","rounded"]}}},"actions":[{"action":"toggleVisibility"}]}}},"fillColor":{"type":"color","access":"public","value":"","options":{"label":"Fill color","cssMixin":{"mixin":"fillColor","property":"fillColor","namePattern":"[\\\\da-f]+"}}},"fillHoverColor":{"type":"color","access":"public","value":"","options":{"label":"Fill hover color","cssMixin":{"mixin":"fillHoverColor","property":"fillHoverColor","namePattern":"[\\\\da-f]+"}}},"iconColor":{"type":"color","access":"public","value":"#606060","options":{"label":"Icon color","cssMixin":{"mixin":"iconColor","property":"iconColor","namePattern":"[\\\\da-f]+"}}},"iconHoverColor":{"type":"color","access":"public","value":"","options":{"label":"Icon hover color","cssMixin":{"mixin":"iconHoverColor","property":"iconHoverColor","namePattern":"[\\\\da-f]+"}}},"titleColor":{"type":"color","access":"public","value":"#606060","options":{"label":"Title color","cssMixin":{"mixin":"titleColor","property":"titleColor","namePattern":"[\\\\da-f]+"}}},"toggleAutoClose":{"type":"toggle","access":"public","value":true,"options":{"label":"Only one section opened at a time"}},"faqItems":{"type":"paramsGroup","access":"public","value":{"value":[{"title":"How to build a website?","textBlock":"<p>Web design encompasses many different skills and disciplines in the production and maintenance of websites. The different areas of web design include web graphic design; interface design; authoring, including standardised code and proprietary software; user experience design; and search engine optimization.</p>"},{"title":"How much does it cost to build a website?","textBlock":"<p>Web design encompasses many different skills and disciplines in the production and maintenance of websites. The different areas of web design include web graphic design; interface design; authoring, including standardised code and proprietary software; user experience design; and search engine optimization.</p>"}]},"options":{"label":"General","title":"FAQ group item","groupDefaultTile":"FAQ group item","settings":{"title":{"type":"string","access":"public","value":"FAQ group item","options":{"label":"Title","dynamicField":true}},"textBlock":{"type":"htmleditor","access":"public","value":"<p>Web design encompasses many different skills and disciplines in the production and maintenance of websites. The different areas of web design include web graphic design; interface design; authoring, including standardised code and proprietary software; user experience design; and search engine optimization.</p>","options":{"label":"Text block","inline":true,"dynamicField":true,"skinToggle":"darkTextSkin"}},"darkTextSkin":{"type":"toggleSmall","access":"public","value":false},"_paramGroupEditFormTab1":{"type":"group","access":"protected","value":["title","textBlock"],"options":{"label":"General"}},"metaEditFormTabs":{"type":"group","access":"protected","value":["_paramGroupEditFormTab1"]}}}},"customClass":{"type":"string","access":"public","value":"","options":{"label":"Extra class name","description":"Add an extra class name to the element and refer to it from the custom CSS option."}},"metaCustomId":{"type":"customId","access":"public","value":"","options":{"label":"Element ID","description":"Apply a unique ID to the element to link it directly by using #your_id (for element ID use lowercase input only)."}},"designOptions":{"type":"designOptions","access":"public","value":{},"options":{"label":"Design Options"}},"editFormTab1":{"type":"group","access":"protected","value":["shape","borderColor","borderHoverColor","fillColor","fillHoverColor","iconColor","iconHoverColor","titleColor","toggleAutoClose","faqItems","metaCustomId","customClass"],"options":{"label":"General"}},"relatedTo":{"type":"group","access":"protected","value":["General"]},"metaEditFormTabs":{"type":"group","access":"protected","value":["editFormTab1","designOptions"]},"metaPublicJs":{"access":"protected","type":"string","value":{"libraries":[{"libPaths":"public/dist/vcFaqGroup.min.js"}]}}}')}},[["./faqGroup/index.js"]]]);