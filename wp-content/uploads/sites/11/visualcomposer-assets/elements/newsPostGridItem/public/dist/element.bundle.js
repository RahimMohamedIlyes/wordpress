(self.vcvWebpackJsonp4x=self.vcvWebpackJsonp4x||[]).push([["element"],{"./newsPostGridItem/index.js":function(e,t,n){"use strict";var o=n("./node_modules/vc-cake/index.js"),i=n.n(o),s=n("./node_modules/@babel/runtime/helpers/esm/classCallCheck.js"),r=n("./node_modules/@babel/runtime/helpers/esm/createClass.js"),c=n("./node_modules/@babel/runtime/helpers/esm/inherits.js"),a=n("./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js"),l=n("./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js"),d=n("./node_modules/react/index.js");function p(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,o=(0,l.default)(e);if(t){var i=(0,l.default)(this).constructor;n=Reflect.construct(o,arguments,i)}else n=o.apply(this,arguments);return(0,a.default)(this,n)}}var m=function(e){(0,c.default)(o,e);var t=p(o);function o(){return(0,s.default)(this,o),t.apply(this,arguments)}return(0,r.default)(o,[{key:"render",value:function(){var e=n("./node_modules/classnames/index.js"),t=this.props.atts,o=t.padding,i=t.imageAlignment,s=t.toggleDate,r=t.toggleAuthor,c=e({"vce-post-description":!0,"vce-post-description--full":o});i&&(c=c.concat(" vce-post-description--image-alignment-".concat(i)));var a=this.getMixinData("titleColor");a&&(c=c.concat(" vce-post-description--title-color-".concat(a.selector))),(a=this.getMixinData("excerptColor"))&&(c=c.concat(" vce-post-description--excerpt-color-".concat(a.selector))),(a=this.getMixinData("backgroundColor"))&&(c=c.concat(" vce-post-description--background-color-".concat(a.selector))),(a=this.getMixinData("authorColor"))&&(c=c.concat(" vce-post-description--author-color-".concat(a.selector))),(a=this.getMixinData("metaColor"))&&(c=c.concat(" vce-post-description--meta-color-".concat(a.selector)));var l=s||r?d.createElement("span",null,"Posted "):null,p=s?d.createElement("span",{className:"vce-post-description--meta-date"},"on ",d.createElement("time",{dateTime:"{{post_date_gmt}}"},"{{post_date}}"," ")):null,m=r?d.createElement("span",{className:"vce-post-description--meta-author"},"by ",d.createElement("a",{className:"vce-post-description--author",href:"{{post_author_url}}",title:"{{post_author}}",target:"_blank",rel:"noreferrer"},"{{post_author}}")):null,u=l||p||m?d.createElement("p",{className:"vce-post-description--meta"},l,p,m):null;return d.createElement("article",{className:"vce-posts-grid-item-inner{{custom_featured_image_hasimage_class_news_post_grid_item}}"},d.createElement("div",{className:c},d.createElement("div",{className:"vce-post-description--image",style:{backgroundImage:"url({{featured_image_url}})"}},d.createElement("a",{href:"{{post_permalink}}","aria-label":"{{post_title}}"})),d.createElement("div",{className:"vce-post-description--content"},u,d.createElement("h3",{className:"vce-post-description--title"},d.createElement("a",{href:"{{post_permalink}}"},"{{post_title}}")),"{{simple_post_description_excerpt}}",d.createElement("a",{href:"{{post_permalink}}",className:"vce-post-link"}))))}}]),o}(i().getService("api").elementComponent);(0,i().getService("cook").add)(n("./newsPostGridItem/settings.json"),(function(e){e.add(m)}),{css:n("./node_modules/raw-loader/index.js!./newsPostGridItem/styles.css"),editorCss:!1,mixins:{authorColor:{mixin:n("./node_modules/raw-loader/index.js!./newsPostGridItem/cssMixins/authorColor.pcss")},titleColor:{mixin:n("./node_modules/raw-loader/index.js!./newsPostGridItem/cssMixins/titleColor.pcss")},excerptColor:{mixin:n("./node_modules/raw-loader/index.js!./newsPostGridItem/cssMixins/excerptColor.pcss")},backgroundColor:{mixin:n("./node_modules/raw-loader/index.js!./newsPostGridItem/cssMixins/backgroundColor.pcss")},metaColor:{mixin:n("./node_modules/raw-loader/index.js!./newsPostGridItem/cssMixins/metaColor.pcss")}}})},"./node_modules/raw-loader/index.js!./newsPostGridItem/cssMixins/authorColor.pcss":function(e){e.exports=".vce-news-grid-container.vce-posts-grid-container {\n  .vce-post-description--author-color-$selector {\n    .vce-post-description--author {\n      color: $authorColor;\n    }\n  }\n}\n"},"./node_modules/raw-loader/index.js!./newsPostGridItem/cssMixins/backgroundColor.pcss":function(e){e.exports=".vce-news-grid-container.vce-posts-grid-container {\n  .vce-post-description.vce-post-description--background-color-$selector {\n    background-color: $backgroundColor;\n  }\n}\n"},"./node_modules/raw-loader/index.js!./newsPostGridItem/cssMixins/excerptColor.pcss":function(e){e.exports=".vce-news-grid-container.vce-posts-grid-container {\n  .vce-post-description--excerpt-color-$selector {\n    .vce-post-description--excerpt {\n      color: $excerptColor;\n    }\n  }\n}"},"./node_modules/raw-loader/index.js!./newsPostGridItem/cssMixins/metaColor.pcss":function(e){e.exports=".vce-news-grid-container.vce-posts-grid-container {\n  .vce-post-description--meta-color-$selector {\n    .vce-post-description--meta {\n      color: $metaColor;\n    }\n  }\n}\n"},"./node_modules/raw-loader/index.js!./newsPostGridItem/cssMixins/titleColor.pcss":function(e){e.exports=".vce-news-grid-container.vce-posts-grid-container {\n  .vce-post-description--title-color-$selector {\n    .vce-post-description--title {\n      color: $titleColor;\n    }\n  }\n}\n"},"./node_modules/raw-loader/index.js!./newsPostGridItem/styles.css":function(e){e.exports='/* ----------------------------------------------\n * Post Description\n * ---------------------------------------------- */\n.vce-news-grid-container.vce-posts-grid-container a {\n  text-decoration: none;\n  text-shadow: none;\n  box-shadow: none;\n  border: none;\n}\n.vce-news-grid-container.vce-posts-grid-container .vce-posts-grid-item .vce-post-description {\n  margin: 0;\n}\n.vce-news-grid-container.vce-posts-grid-container .vce-post-description {\n  box-sizing: border-box;\n  border: none;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -ms-flex-direction: column;\n      -webkit-flex-direction: column;\n          flex-direction: column;\n  overflow: hidden;\n  position: relative;\n  width: 100%;\n}\n.vce-news-grid-container.vce-posts-grid-container .vce-post-description * {\n  box-sizing: border-box;\n}\n.vce-news-grid-container.vce-posts-grid-container .vce-post-description--image {\n  position: relative;\n  -ms-flex: 0 0 35%;\n      -webkit-flex: 0 0 35%;\n          flex: 0 0 35%;\n  max-width: 100%;\n  padding-top: 56.25%;\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center;\n}\n.vce-news-grid-container.vce-posts-grid-container .vce-post-description--image a {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n.vce-news-grid-container.vce-posts-grid-container .vce-post-description--content {\n  -ms-flex: 0 0 65%;\n      -webkit-flex: 0 0 65%;\n          flex: 0 0 65%;\n  padding: 20px 0;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -ms-flex-direction: column;\n      -webkit-flex-direction: column;\n          flex-direction: column;\n  -ms-flex-align: start;\n      -webkit-align-items: flex-start;\n          align-items: flex-start;\n}\n.vce-news-grid-container.vce-posts-grid-container .vce-posts-grid-item-inner .vce-post-description--full .vce-post-description--content {\n  padding: 20px;\n}\n.vce-news-grid-container.vce-posts-grid-container .vce-post-description--title {\n  margin: 0;\n}\n.vce-news-grid-container.vce-posts-grid-container .vce-post-description--title a {\n  color: inherit;\n}\n.vce-news-grid-container.vce-posts-grid-container .vce-post-description--meta {\n  font-size: 13px;\n  margin-bottom: 10px;\n}\n.vce-news-grid-container.vce-posts-grid-container .vce-post-description--title {\n  font-size: 25px;\n  font-weight: 500;\n  padding: 0;\n  margin: 0 0 20px;\n  line-height: 1;\n  word-break: break-all;\n  letter-spacing: 2px;\n}\n.vce-news-grid-container.vce-posts-grid-container .vce-post-description--excerpt p {\n  margin: 0 0 30px;\n  font-size: 14px;\n}\n.vce-news-grid-container.vce-posts-grid-container .vce-post-link {\n  display: block;\n  width: 100%;\n}\n.vce-news-grid-container.vce-posts-grid-container .vce-news-post-grid-item--no-image .vce-post-description--image {\n  display: none;\n}\n.vce-news-grid-container.vce-posts-grid-container .vce-news-post-grid-item--no-image .vce-post-description--content {\n  -ms-flex: 0 0 100%;\n      -webkit-flex: 0 0 100%;\n          flex: 0 0 100%;\n  padding: 0;\n}\n/*RTL support. */\n.rtl.vce-post-description,\n[dir="rtl"].vce-post-description,\n.rtl .vce-post-description,\n[dir="rtl"] .vce-post-description {\n  direction: rtl;\n  unicode-bidi: embed;\n}\n.rtl.vce-post-description--content,\n[dir="rtl"].vce-post-description--content,\n.rtl .vce-post-description--content,\n[dir="rtl"] .vce-post-description--content {\n  text-align: right;\n}\n.ltr.vce-post-description,\n[dir="ltr"].vce-post-description,\n.ltr .vce-post-description,\n[dir="ltr"] .vce-post-description {\n  direction: ltr;\n  unicode-bidi: normal;\n}\n.ltr.vce-post-description--content,\n[dir="ltr"].vce-post-description--content,\n.ltr .vce-post-description--content,\n[dir="ltr"] .vce-post-description--content {\n  text-align: left;\n}\n'},"./newsPostGridItem/settings.json":function(e){"use strict";e.exports=JSON.parse('{"tag":{"access":"protected","type":"string","value":"newsPostGridItem"},"groups":{"type":"string","access":"protected","value":"Buttons"},"toggleDate":{"type":"toggle","access":"public","value":true,"options":{"label":"Show date"}},"toggleAuthor":{"type":"toggle","access":"public","value":true,"options":{"label":"Show author name"}},"excerptColor":{"type":"color","access":"public","value":"#4e4e4e","options":{"label":"Excerpt color","cssMixin":{"mixin":"excerptColor","property":"excerptColor","namePattern":"[\\\\da-f]+"}}},"titleColor":{"type":"color","access":"public","value":"#003254","options":{"label":"Title color","cssMixin":{"mixin":"titleColor","property":"titleColor","namePattern":"[\\\\da-f]+"}}},"padding":{"type":"toggle","access":"public","value":false,"options":{"label":"Content spacing","description":"Set automatic right and left spacing for title and excerpt grid items."}},"backgroundColor":{"type":"color","access":"public","value":"","options":{"label":"Background color","cssMixin":{"mixin":"backgroundColor","property":"backgroundColor","namePattern":"[\\\\da-f]+"},"onChange":{"rules":{"padding":{"rule":"toggle"}},"actions":[{"action":"toggleVisibility"}]}}},"authorColor":{"type":"color","access":"public","value":"#ffce00","options":{"label":"Author color","cssMixin":{"mixin":"authorColor","property":"authorColor","namePattern":"[\\\\da-f]+"},"onChange":{"rules":{"toggleAuthor":{"rule":"toggle"}},"actions":[{"action":"toggleVisibility"}]}}},"metaColor":{"type":"color","access":"public","value":"#d7dfe4","options":{"label":"Meta color","cssMixin":{"mixin":"metaColor","property":"metaColor","namePattern":"[\\\\da-f]+"}}},"editFormTab1":{"type":"group","access":"protected","value":["toggleDate","toggleAuthor","titleColor","categoryColor","excerptColor","authorColor","metaColor","padding","backgroundColor"],"options":{"label":"Post Description"}},"metaEditFormTabs":{"type":"group","access":"protected","value":["editFormTab1"]}}')}},[["./newsPostGridItem/index.js"]]]);