(self.vcvWebpackJsonp4x=self.vcvWebpackJsonp4x||[]).push([["element"],{"./growShadowButton/index.js":function(e,t,o){"use strict";var n=o("./node_modules/vc-cake/index.js"),r=o.n(n),s=o("./node_modules/@babel/runtime/helpers/esm/extends.js"),a=o("./node_modules/@babel/runtime/helpers/esm/classCallCheck.js"),l=o("./node_modules/@babel/runtime/helpers/esm/createClass.js"),i=o("./node_modules/@babel/runtime/helpers/esm/inherits.js"),c=o("./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js"),u=o("./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js"),d=o("./node_modules/react/index.js");function b(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var o,n=(0,u.default)(e);if(t){var r=(0,u.default)(this).constructor;o=Reflect.construct(n,arguments,r)}else o=n.apply(this,arguments);return(0,c.default)(this,o)}}var w=function(e){(0,i.default)(o,e);var t=b(o);function o(){return(0,a.default)(this,o),t.apply(this,arguments)}return(0,l.default)(o,[{key:"render",value:function(){var e=this.props,t=e.id,o=e.atts,n=e.editor,r=o.buttonUrl,a=o.buttonText,l=o.shape,i=o.alignment,c=o.customClass,u=o.metaCustomId,b=o.size,w=o.toggleStretchButton,p="vce-button--style-grow-shadow-container",g="vce-button--style-grow-shadow-wrapper vce",v="vce-button vce-button--style-grow-shadow",h={},m="button";r&&r.url&&(m="a",h={href:r.url,title:r.title,target:r.targetBlank?"_blank":void 0,rel:r.relNofollow?"nofollow":void 0});"string"==typeof c&&c&&(p+=" "+c),l&&(v+=" vce-button--style-grow-shadow--border-".concat(l)),i&&(p+=" vce-button--style-grow-shadow-container--align-".concat(i)),b&&(v+=" vce-button--style-grow-shadow--size-".concat(b)),w&&(g+=" vce-button--style-grow-shadow-wrapper--stretched");var y=this.getMixinData("basicColor");y&&(v+=" vce-button--style-grow-shadow--color-".concat(y.selector)),u&&(h.id=u);var f=this.applyDO("margin"),x=this.applyDO("padding border background animation");return d.createElement("div",(0,s.default)({className:p},n),d.createElement("span",(0,s.default)({className:g,id:"el-"+t},f),d.createElement(m,(0,s.default)({className:v},h,x),a)))}}]),o}(r().getService("api").elementComponent);(0,r().getService("cook").add)(o("./growShadowButton/settings.json"),(function(e){e.add(w)}),{css:o("./node_modules/raw-loader/index.js!./growShadowButton/styles.css"),editorCss:o("./node_modules/raw-loader/index.js!./growShadowButton/editor.css"),mixins:{basicColor:{mixin:o("./node_modules/raw-loader/index.js!./growShadowButton/cssMixins/basicColor.pcss")}}},"")},"./node_modules/raw-loader/index.js!./growShadowButton/cssMixins/basicColor.pcss":function(e){e.exports=".vce-button--style-grow-shadow-container a.vce-button.vce-button--style-grow-shadow.vce-button--style-grow-shadow--color-$selector,\n.vce-button--style-grow-shadow-container button.vce-button.vce-button--style-grow-shadow.vce-button--style-grow-shadow--color-$selector {\n  @if $color != false {\n    color: $color;\n  }\n\n  box-shadow: 0 3px 0 0 $hoverBackground;\n  background-image: linear-gradient(to bottom, $hoverBackground 50%, $background 50%);\n\n  &:hover {\n    @if $hoverColor != false {\n      color: $hoverColor;\n    }\n  }\n}\n"},"./node_modules/raw-loader/index.js!./growShadowButton/editor.css":function(e){e.exports=".vce-button--style-grow-shadow-container {\n  min-height: 1em;\n}\n"},"./node_modules/raw-loader/index.js!./growShadowButton/styles.css":function(e){e.exports='/* ----------------------------------------------\n * Grow Shadow Button\n * ---------------------------------------------- */\n.vce-button--style-grow-shadow-container--align-left {\n  text-align: left;\n}\n.vce-button--style-grow-shadow-container--align-right {\n  text-align: right;\n}\n.vce-button--style-grow-shadow-container--align-center {\n  text-align: center;\n}\n.vce-button--style-grow-shadow-wrapper {\n  display: inline-block;\n  vertical-align: top;\n  max-width: 100%;\n}\n.vce-button--style-grow-shadow-wrapper--stretched {\n  width: 100%;\n}\n.vce-button--style-grow-shadow-wrapper--stretched .vce-button--style-grow-shadow {\n  width: 100%;\n}\na.vce-button--style-grow-shadow,\nbutton.vce-button--style-grow-shadow {\n  background-color: transparent;\n  background-image: none;\n  border: none;\n  box-sizing: border-box;\n  cursor: pointer;\n  display: inline-block;\n  margin: 0;\n  max-width: 100%;\n  position: relative;\n  text-align: center;\n  text-decoration: none;\n  text-transform: none;\n  font-weight: normal;\n  letter-spacing: normal;\n  -webkit-font-smoothing: antialiased;\n  vertical-align: middle;\n  white-space: normal;\n  -ms-touch-action: manipulation;\n      touch-action: manipulation;\n  -webkit-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  line-height: normal;\n  border-radius: 0;\n  transition: all 0.2s ease-in-out;\n  background-size: 102% 200%;\n  background-position: 0 -100%;\n}\n\na.vce-button.vce-button--style-grow-shadow:hover,\nbutton.vce-button.vce-button--style-grow-shadow:hover,\n.vce-button--style-grow-shadow-wrapper a.vce-button.vce-button--style-grow-shadow:focus,\n.vce-button--style-grow-shadow-wrapper button.vce-button.vce-button--style-grow-shadow:focus {\n  text-decoration: none;\n  outline: none;\n  background-position: 0 0;\n  background-size: 102% 200%;\n}\n\nbutton.vce-button--style-grow-shadow {\n  -webkit-appearance: none;\n}\n\n.vce-button--style-grow-shadow-inner {\n  position: relative;\n  z-index: 1;\n  transition: none;\n}\n\n.vce-button--style-grow-shadow.vce-button--style-grow-shadow--size-small {\n  font-size: 11px;\n  padding: 10px 30px 7px;\n}\n.vce-button--style-grow-shadow.vce-button--style-grow-shadow--size-medium {\n  font-size: 16px;\n  padding: 15px 43px 12px;\n}\n.vce-button--style-grow-shadow.vce-button--style-grow-shadow--size-large {\n  font-size: 21px;\n  padding: 20px 56px 17px;\n}\na.vce-button--style-grow-shadow--border-rounded,\na.vce-button--style-grow-shadow--border-round,\na.vce-button--style-grow-shadow--border-square,\nbutton.vce-button--style-grow-shadow--border-rounded,\nbutton.vce-button--style-grow-shadow--border-round,\nbutton.vce-button--style-grow-shadow--border-square {\n  position: relative;\n  overflow: hidden;\n}\n.vce-button--style-grow-shadow--border-rounded,\na.vce-button--style-grow-shadow--border-rounded,\nbutton.vce-button--style-grow-shadow--border-rounded {\n  border-radius: 5px;\n}\n.vce-button--style-grow-shadow--border-round,\na.vce-button--style-grow-shadow--border-round,\nbutton.vce-button--style-grow-shadow--border-round {\n  border-radius: 4em;\n}\n.vce-button--style-grow-shadow--border-square,\na.vce-button--style-grow-shadow--border-square,\nbutton.vce-button--style-grow-shadow--border-square {\n  border-radius: 0;\n}\n.rtl.vce-button--style-grow-shadow,\n[dir="rlt"].vce-button--style-grow-shadow,\n.rtl .vce-button--style-grow-shadow,\n[dir="rlt"] .vce-button--style-grow-shadow {\n  direction: rtl;\n  unicode-bidi: embed;\n}\n.ltr.vce-button--style-grow-shadow,\n[dir="ltr"].vce-button--style-grow-shadow,\n.ltr .vce-button--style-grow-shadow,\n[dir="ltr"] .vce-button--style-grow-shadow {\n  direction: ltr;\n  unicode-bidi: normal;\n}\n'},"./growShadowButton/settings.json":function(e){"use strict";e.exports=JSON.parse('{"groups":{"type":"string","access":"protected","value":"Buttons"},"buttonUrl":{"type":"url","access":"public","value":{"url":"","title":"","targetBlank":false,"relNofollow":false},"options":{"label":"Link selection","description":"Opens the field to add a link to the element.","dynamicField":true}},"hoverColor":{"type":"color","access":"public","value":"#003254","options":{"label":"Title hover color","cssMixin":{"mixin":"basicColor","property":"hoverColor","namePattern":"[\\\\da-f]+"}}},"hoverBackground":{"type":"color","access":"public","value":"#e6b900","options":{"label":"Shadow color","cssMixin":{"mixin":"basicColor","property":"hoverBackground","namePattern":"[\\\\da-f]+"}}},"buttonText":{"type":"string","access":"public","value":"Read more","options":{"label":"Button text","dynamicField":true}},"color":{"type":"color","access":"public","value":"#003254","options":{"label":"Title color","cssMixin":{"mixin":"basicColor","property":"color","namePattern":"[\\\\da-f]+"}}},"background":{"type":"color","access":"public","value":"#FFCE00","options":{"label":"Background color","cssMixin":{"mixin":"basicColor","property":"background","namePattern":"[\\\\da-f]+"}}},"shape":{"type":"buttonGroup","access":"public","value":"round","options":{"label":"Shape","values":[{"label":"Square","value":"square","icon":"vcv-ui-icon-attribute-shape-square"},{"label":"Rounded","value":"rounded","icon":"vcv-ui-icon-attribute-shape-rounded"},{"label":"Round","value":"round","icon":"vcv-ui-icon-attribute-shape-round"}]}},"designOptions":{"type":"designOptions","access":"public","value":{},"options":{"label":"Design Options"}},"editFormTab1":{"type":"group","access":"protected","value":["buttonText","buttonUrl","alignment","shape","size","toggleStretchButton","color","background","hoverColor","hoverBackground","metaCustomId","customClass"],"options":{"label":"General"}},"metaEditFormTabs":{"type":"group","access":"protected","value":["editFormTab1","designOptions"]},"relatedTo":{"type":"group","access":"protected","value":["General","Buttons"]},"alignment":{"type":"buttonGroup","access":"public","value":"left","options":{"label":"Alignment","values":[{"label":"Left","value":"left","icon":"vcv-ui-icon-attribute-alignment-left"},{"label":"Center","value":"center","icon":"vcv-ui-icon-attribute-alignment-center"},{"label":"Right","value":"right","icon":"vcv-ui-icon-attribute-alignment-right"}]}},"size":{"type":"buttonGroup","access":"public","value":"medium","options":{"label":"Size","values":[{"label":"Small","value":"small","text":"S"},{"label":"Medium","value":"medium","text":"M"},{"label":"Large","value":"large","text":"L"}]}},"toggleStretchButton":{"type":"toggle","access":"public","value":false,"options":{"label":"Stretch"}},"customClass":{"type":"string","access":"public","value":"","options":{"label":"Extra class name","description":"Add an extra class name to the element and refer to it from the custom CSS option."}},"metaCustomId":{"type":"customId","access":"public","value":"","options":{"label":"Element ID","description":"Apply a unique ID to the element to link it directly by using #your_id (for element ID use lowercase input only)."}},"tag":{"access":"protected","type":"string","value":"growShadowButton"}}')}},[["./growShadowButton/index.js"]]]);