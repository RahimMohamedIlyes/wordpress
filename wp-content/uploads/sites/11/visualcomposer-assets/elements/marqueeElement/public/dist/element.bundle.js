(window.vcvWebpackJsonp4x=window.vcvWebpackJsonp4x||[]).push([[0],{"./marqueeElement/index.js":function(e,n,t){"use strict";t.r(n);var a=t("./node_modules/vc-cake/index.js"),i=t.n(a),l=t("./node_modules/@babel/runtime/helpers/extends.js"),r=t.n(l),o=t("./node_modules/@babel/runtime/helpers/classCallCheck.js"),s=t.n(o),c=t("./node_modules/@babel/runtime/helpers/createClass.js"),m=t.n(c),u=t("./node_modules/@babel/runtime/helpers/inherits.js"),d=t.n(u),p=t("./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"),v=t.n(p),g=t("./node_modules/@babel/runtime/helpers/getPrototypeOf.js"),f=t.n(g),b=t("./node_modules/react/index.js"),y=t.n(b);function h(e){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var t,a=f()(e);if(n){var i=f()(this).constructor;t=Reflect.construct(a,arguments,i)}else t=a.apply(this,arguments);return v()(this,t)}}var x=function(e){d()(t,e);var n=h(t);function t(){return s()(this,t),n.apply(this,arguments)}return m()(t,[{key:"validateSize",value:function(e){var n=new RegExp("^-?\\d*(\\.\\d{0,9})?("+["px","em","rem","%","vw","vh"].join("|")+")?$");return""===e||e.match(n)?e:null}},{key:"render",value:function(){var e=this.props,n=e.id,t=e.atts,a=e.editor,i=t.text,l=t.elementTag,o=t.font,s=t.fontSize,c=t.alignment,m=t.lineHeight,u=t.letterSpacing,d=t.link,p=t.colorType,v=t.direction,g=t.speed,f=t.customClass,b=t.metaCustomId,h="vce-marquee-element vce",x={},q="vce-marquee-element-inner",k={style:{}},w=l,E=i;if(d&&d.url){var S={href:d.url,title:d.title,target:d.targetBlank?"_blank":void 0,rel:d.relNofollow?"nofollow":void 0};E=y.a.createElement("a",r()({className:"vce-marquee-element-link"},S),E)}"string"==typeof f&&f&&(h+=" "+f),h+=" vce-marquee-element-direction--".concat(v),s&&(s=this.validateSize(s))&&(s=/^\d+$/.test(s)?s+"px":s,k.style.fontSize=s),m&&(m=this.validateSize(m))&&(k.style.lineHeight=m),u&&(u=this.validateSize(u))&&(u=/^\d+$/.test(u)?u+"px":u,k.style.letterSpacing=u),c&&(h+=" vce-marquee-element--align-".concat(c));var C=this.getMixinData("textColor");if(C)switch(p){case"gradient":h+=" vce-marquee-element--gradient-".concat(C.selector);break;case"color":h+=" vce-marquee-element--color-".concat(C.selector);break;default:console.warn("There was an issue assigning color type.")}if(g&&(C=this.getMixinData("animationDuration"),h+=" vce-marquee-element--duration-".concat(C.selector)),o&&"active"===o.status){var j=o.fontStyle?"regular"===o.fontStyle.style?"":o.fontStyle.style:null;k.style.fontWeight=o.fontStyle?o.fontStyle.weight:null,k.style.fontStyle=j}(C=this.getMixinData("fontFamily"))&&(h+=" vce-marquee-element--font-family-".concat(C.selector)),b&&(x.id=b);var F=this.applyDO("padding"),D=this.applyDO("margin background border animation");return y.a.createElement("div",r()({className:h},a,{id:"el-"+n},D),y.a.createElement("div",r()({className:"vce-marquee-element-wrapper"},x),y.a.createElement("div",r()({className:"vce-marquee-element--background"},k),y.a.createElement("div",{className:"vce-marquee-element-track"},y.a.createElement(w,r()({className:q},F),E),y.a.createElement(w,r()({className:q},F),E)),y.a.createElement(w,r()({className:q},F),E))))}}]),t}(i.a.getService("api").elementComponent);(0,i.a.getService("cook").add)(t("./marqueeElement/settings.json"),(function(e){e.add(x)}),{css:t("./node_modules/raw-loader/index.js!./marqueeElement/styles.css"),editorCss:t("./node_modules/raw-loader/index.js!./marqueeElement/editor.css"),mixins:{textColor:{mixin:t("./node_modules/raw-loader/index.js!./marqueeElement/cssMixins/textColor.pcss")},animationDuration:{mixin:t("./node_modules/raw-loader/index.js!./marqueeElement/cssMixins/animationDuration.pcss")},fontFamily:{mixin:t("./node_modules/raw-loader/index.js!./marqueeElement/cssMixins/fontFamily.pcss")}}},"")},"./marqueeElement/settings.json":function(e){e.exports=JSON.parse('{"designOptions":{"type":"designOptions","access":"public","value":{},"options":{"label":"Design Options"}},"editFormTab1":{"type":"group","access":"protected","value":["text","font","elementTag","colorType","color","gradientStart","gradientEnd","gradientAngle","fontSize","alignment","lineHeight","letterSpacing","direction","speed","link","metaCustomId","customClass"],"options":{"label":"General"}},"metaEditFormTabs":{"type":"group","access":"protected","value":["editFormTab1","designOptions"]},"relatedTo":{"type":"group","access":"protected","value":["General"]},"text":{"type":"string","access":"public","value":"The tag was first introduced in early versions of Microsoft\'s Internet Explorer.","options":{"label":"Title text","dynamicField":true}},"font":{"type":"googleFonts","access":"public","value":{"fontFamily":"Flamenco","fontStyle":{"weight":"400","style":"regular"},"status":"active","fontText":"The tag was first introduced in early versions of Microsoft\'s Internet Explorer."},"options":{"label":"","cssMixin":{"mixin":"fontFamily","property":"fontFamily","namePattern":"[a-z]+","valueKey":"fontFamily"}}},"elementTag":{"type":"dropdown","access":"public","value":"p","options":{"label":"Element tag","values":[{"label":"h1","value":"h1"},{"label":"h2","value":"h2"},{"label":"h3","value":"h3"},{"label":"h4","value":"h4"},{"label":"h5","value":"h5"},{"label":"h6","value":"h6"},{"label":"p","value":"p"},{"label":"div","value":"div"}]}},"colorType":{"type":"dropdown","access":"public","value":"color","options":{"label":"Gradient overlay type","values":[{"label":"Color","value":"color"},{"label":"Gradient","value":"gradient"}]}},"color":{"type":"color","access":"public","value":"","options":{"label":"Title color","cssMixin":{"mixin":"textColor","property":"color","namePattern":"[\\\\da-f]+"},"onChange":{"rules":{"colorType":{"rule":"value","options":{"value":"color"}}},"actions":[{"action":"toggleVisibility"}]}}},"gradientStart":{"type":"color","access":"public","value":" #FF7200","options":{"label":"Start color","cssMixin":{"mixin":"textColor","property":"gradientStart","namePattern":"[\\\\da-f]+"},"onChange":{"rules":{"colorType":{"rule":"value","options":{"value":"gradient"}}},"actions":[{"action":"toggleVisibility"}]}}},"gradientEnd":{"type":"color","access":"public","value":" #5C00FF","options":{"label":"End color","cssMixin":{"mixin":"textColor","property":"gradientEnd","namePattern":"[\\\\da-f]+"},"onChange":{"rules":{"colorType":{"rule":"value","options":{"value":"gradient"}}},"actions":[{"action":"toggleVisibility"}]}}},"gradientAngle":{"type":"range","access":"public","value":"45","options":{"label":"Gradient angle","cssMixin":{"mixin":"textColor","property":"gradientAngle","namePattern":"[\\\\d\\\\-]+"},"min":0,"max":180,"measurement":"°","onChange":{"rules":{"colorType":{"rule":"value","options":{"value":"gradient"}}},"actions":[{"action":"toggleVisibility"}]}}},"fontSize":{"type":"string","access":"public","value":"","options":{"label":"Font size"}},"alignment":{"type":"buttonGroup","access":"public","value":"left","options":{"label":"Alignment","values":[{"label":"Left","value":"left","icon":"vcv-ui-icon-attribute-alignment-left"},{"label":"Center","value":"center","icon":"vcv-ui-icon-attribute-alignment-center"},{"label":"Right","value":"right","icon":"vcv-ui-icon-attribute-alignment-right"}]}},"lineHeight":{"type":"string","access":"public","value":"","options":{"label":"Line height"}},"letterSpacing":{"type":"string","access":"public","value":"","options":{"label":"Letter spacing"}},"link":{"type":"url","access":"public","value":{"url":"","title":"","targetBlank":true,"relNofollow":false},"options":{"label":"Link selection","description":"Opens the field to add a link to the element.","dynamicField":true}},"direction":{"type":"dropdown","access":"public","value":"left","options":{"label":"Direction","values":[{"label":"Left","value":"left"},{"label":"Top","value":"top"},{"label":"Right","value":"right"},{"label":"Bottom","value":"bottom"}]}},"speed":{"type":"number","access":"public","value":"5000","options":{"label":"Speed (milliseconds)","cssMixin":{"mixin":"animationDuration","property":"animationDuration","namePattern":"[\\\\da-f]+"}}},"customClass":{"type":"string","access":"public","value":"","options":{"label":"Extra class name","description":"Add an extra class name to the element and refer to it from the custom CSS option."}},"metaCustomId":{"type":"customId","access":"public","value":"","options":{"label":"Element ID","description":"Apply a unique ID to the element to link it directly by using #your_id (for element ID use lowercase input only)."}},"tag":{"type":"string","access":"protected","value":"marqueeElement"}}')},"./node_modules/raw-loader/index.js!./marqueeElement/cssMixins/animationDuration.pcss":function(e,n){e.exports=".vce-marquee-element {\n  &--duration-$selector {\n    .vce-marquee-element-track {\n      @if $animationDuration != false {\n        -webkit-animation-duration: $(animationDuration)ms;\n                animation-duration: $(animationDuration)ms;\n      }\n    }\n  }\n}\n"},"./node_modules/raw-loader/index.js!./marqueeElement/cssMixins/fontFamily.pcss":function(e,n){e.exports=".vce-marquee-element--font-family-$selector {\n  .vce-marquee-element--background {\n    @if $fontFamily != false {\n      font-family: $fontFamily;\n    }\n  }\n}\n"},"./node_modules/raw-loader/index.js!./marqueeElement/cssMixins/textColor.pcss":function(e,n){e.exports=".vce-marquee-element {\n  &--color-$selector {\n    .vce-marquee-element-inner {\n      @if $color != false {\n        color: $color;\n      }\n    }\n  }\n  &--gradient-$selector {\n    .vce-marquee-element-inner {\n      @if $gradientStart != false {\n        background-image: linear-gradient($(gradientAngle)deg, $gradientStart, $gradientEnd);\n        background-clip: text;\n        -webkit-background-clip: text;\n        color: transparent;\n      }\n    }\n  }\n}\n"},"./node_modules/raw-loader/index.js!./marqueeElement/editor.css":function(e,n){e.exports=".vce-marquee-element {\n  min-height: 1em;\n}\n\n.vce-marquee-element-inner .medium-editor-placeholder {\n  background: inherit;\n  display: inline-block;\n}"},"./node_modules/raw-loader/index.js!./marqueeElement/styles.css":function(e,n){e.exports=".vce-marquee-element-inner {\n  margin: 0;\n  padding: 0;\n  max-width: 100%;\n}\n\n.vce-marquee-element--align-left {\n  text-align: left;\n}\n\n.vce-marquee-element--align-right {\n  text-align: right;\n}\n\n.vce-marquee-element--align-center {\n  text-align: center;\n}\n\n.vce-marquee-element .vce-marquee-element-link {\n  display: inline-block;\n  background: inherit;\n  color: inherit;\n  box-shadow: none;\n  max-width: 100%;\n}\n\n.vce-marquee-element .vce-marquee-element-link:hover,\n.vce-marquee-element .vce-marquee-element-link:focus {\n  box-shadow: none;\n}\n\n.vce-marquee-element--background {\n  overflow: hidden;\n  position: relative;\n}\n\n.vce-marquee-element-track {\n  display: block;\n  width: 200%;\n  position: absolute;\n  overflow: hidden;\n}\n\n.vce-marquee-element-direction--bottom .vce-marquee-element-track,\n.vce-marquee-element-direction--top .vce-marquee-element-track {\n  width: 100%;\n}\n\n.vce-marquee-element-direction--bottom .vce-marquee-element-track .vce-marquee-element-inner,\n.vce-marquee-element-direction--top .vce-marquee-element-track .vce-marquee-element-inner {\n  width: 100%;\n}\n\n.vce-marquee-element-direction--right .vce-marquee-element-track {\n  -webkit-animation: vcv-marquee-x 2000ms linear infinite;\n          animation: vcv-marquee-x 2000ms linear infinite;\n}\n\n.vce-marquee-element-direction--left .vce-marquee-element-track {\n  -webkit-animation: vcv-marquee-x 2000ms linear infinite;\n          animation: vcv-marquee-x 2000ms linear infinite;\n  animation-direction: reverse;\n}\n\n.vce-marquee-element-direction--bottom .vce-marquee-element-track {\n  -webkit-animation: vcv-marquee-y 2000ms linear infinite;\n          animation: vcv-marquee-y 2000ms linear infinite;\n}\n\n.vce-marquee-element-direction--top .vce-marquee-element-track {\n  -webkit-animation: vcv-marquee-y 2000ms linear infinite;\n          animation: vcv-marquee-y 2000ms linear infinite;\n  animation-direction: reverse;\n}\n\n.vce-marquee-element-track .vce-marquee-element-inner {\n  float: left;\n  width: 50%;\n}\n\n.vce-marquee-element--background > .vce-marquee-element-inner {\n  visibility: hidden;\n}\n\n@-webkit-keyframes vcv-marquee-x {\n  0% { left: -100%; }\n  100% { left: 0; }\n}\n\n@keyframes vcv-marquee-x {\n  0% { left: -100%; }\n  100% { left: 0; }\n}\n\n@-webkit-keyframes vcv-marquee-y {\n  0% { top: -100%; }\n  100% { top: 0; }\n}\n\n@keyframes vcv-marquee-y {\n  0% { top: -100%; }\n  100% { top: 0; }\n}"}},[["./marqueeElement/index.js"]]]);