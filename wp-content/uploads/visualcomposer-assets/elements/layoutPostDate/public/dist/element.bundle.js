(self.vcvWebpackJsonp4x=self.vcvWebpackJsonp4x||[]).push([["element"],{"./layoutPostDate/index.js":function(e,t,s){"use strict";var o=s("./node_modules/vc-cake/index.js"),a=s.n(o),n=s("./node_modules/@babel/runtime/helpers/esm/extends.js"),l=s("./node_modules/@babel/runtime/helpers/esm/classCallCheck.js"),u=s("./node_modules/@babel/runtime/helpers/esm/createClass.js"),c=s("./node_modules/@babel/runtime/helpers/esm/inherits.js"),i=s("./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js"),r=s("./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js"),p=s("./node_modules/react/index.js");function d(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var s,o=(0,r.default)(e);if(t){var a=(0,r.default)(this).constructor;s=Reflect.construct(o,arguments,a)}else s=o.apply(this,arguments);return(0,i.default)(this,s)}}var m=function(e){(0,c.default)(s,e);var t=d(s);function s(){return(0,l.default)(this,s),t.apply(this,arguments)}return(0,u.default)(s,[{key:"render",value:function(){var e=this.props,t=e.id,s=e.atts,o=e.editor,a=s.output,l=s.customClass,u=s.metaCustomId,c=s.extraDataAttributes,i=["vce-layouts-post-date-container"],r=this.getExtraDataAttributes(c);l&&i.push(l),u&&(r.id=u);var d=this.applyDO("all");return p.createElement("div",(0,n.default)({className:i.join(" ")},o,r),p.createElement("div",(0,n.default)({className:"vce-layouts-post-date vce",id:"el-"+t},d),a))}}]),s}((0,o.getService)("api").elementComponent);(0,a().getService("cook").add)(s("./layoutPostDate/settings.json"),(function(e){e.add(m)}),{css:s("./node_modules/raw-loader/index.js!./layoutPostDate/styles.css"),mixins:{}})},"./node_modules/raw-loader/index.js!./layoutPostDate/styles.css":function(e){e.exports=""},"./layoutPostDate/settings.json":function(e){"use strict";e.exports=JSON.parse('{"tag":{"type":"string","access":"protected","value":"layoutPostDate"},"output":{"type":"htmleditor","access":"public","value":"<p>\x3c!-- wp:vcv-gutenberg-blocks/dynamic-field-block {\\"value\\":\\"post_date\\"} --\x3e\x3c!-- /wp:vcv-gutenberg-blocks/dynamic-field-block --\x3e</p>","options":{"onlyDynamic":true,"dynamicField":true}},"designOptions":{"type":"designOptions","access":"public","value":[],"options":{"label":"Design Options"}},"advancedTab":{"type":"group","access":"protected","value":["htmlAttributes","customAttributes","customCSS"],"options":{"label":"Advanced","isSections":true}},"metaEditFormTabs":{"type":"group","access":"protected","value":["contentTab","designTab","advancedTab"]},"relatedTo":{"type":"group","access":"protected","value":["General"]},"customClass":{"type":"string","access":"public","value":"","options":{"label":"Extra class name","description":"Add an extra class name to the element and refer to it from the custom CSS option."}},"metaCustomId":{"type":"customId","access":"public","value":"","options":{"label":"Element ID","description":"Apply a unique ID to the element to link it directly by using #your_id (for element ID use lowercase input only)."}},"htmlAttributes":{"type":"group","access":"public","value":["metaCustomId","customClass"],"options":{"label":"HTML Attributes"}},"customCSS":{"type":"group","access":"public","value":["styleEditor"],"options":{"label":"Custom CSS","tooltip":"Add custom CSS to the element using the [element-id] placeholder."}},"styleEditor":{"type":"styleEditor","access":"public","value":[],"options":[]},"customAttributes":{"type":"group","access":"public","value":["extraDataAttributes"],"options":{"label":"Custom Attributes"}},"extraDataAttributes":{"type":"string","access":"public","value":"","options":{"label":"Extra Data Attributes","description":"Add data attributes to your element (ex. data-name=\\"John Lennon\\" data-age=\\"28\\")"}},"designTab":{"type":"group","access":"protected","options":{"label":"Design","isSections":true},"value":["designOptions"]},"contentTab":{"type":"group","access":"protected","options":{"label":"Content","isSections":true},"value":["contentSection"]},"contentSection":{"type":"group","access":"protected","options":{"label":"Content"},"value":["output"]}}')}},[["./layoutPostDate/index.js"]]]);