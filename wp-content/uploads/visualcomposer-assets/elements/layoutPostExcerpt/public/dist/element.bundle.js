(self.vcvWebpackJsonp4x=self.vcvWebpackJsonp4x||[]).push([["element"],{"./layoutPostExcerpt/index.js":function(e,t,s){"use strict";var o=s("./node_modules/vc-cake/index.js"),n=s("./node_modules/@babel/runtime/helpers/esm/extends.js"),a=s("./node_modules/@babel/runtime/helpers/esm/classCallCheck.js"),l=s("./node_modules/@babel/runtime/helpers/esm/createClass.js"),r=s("./node_modules/@babel/runtime/helpers/esm/inherits.js"),u=s("./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js"),c=s("./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js"),i=s("./node_modules/react/index.js");function p(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var s,o=(0,c.default)(e);if(t){var n=(0,c.default)(this).constructor;s=Reflect.construct(o,arguments,n)}else s=o.apply(this,arguments);return(0,u.default)(this,s)}}var d=function(e){(0,r.default)(s,e);var t=p(s);function s(){return(0,a.default)(this,s),t.apply(this,arguments)}return(0,l.default)(s,[{key:"render",value:function(){var e=this.props,t=e.id,s=e.atts,o=e.editor,a=s.output,l=s.customClass,r=s.metaCustomId,u=s.extraDataAttributes,c=["vce-layouts-post-excerpt-container"],p=this.getExtraDataAttributes(u);l&&c.push(l),r&&(p.id=r);var d=this.applyDO("all");return i.createElement("div",(0,n.default)({className:c.join(" ")},o,p),i.createElement("div",(0,n.default)({className:"vce-layouts-post-excerpt vce",id:"el-"+t},d),a))}}]),s}((0,o.getService)("api").elementComponent),m=(0,o.getStorage)("hubElements"),b=function(){(0,(0,o.getService)("cook").add)(s("./layoutPostExcerpt/settings.json"),(function(e){e.add(d)}),{css:s("./node_modules/raw-loader/index.js!./layoutPostExcerpt/styles.css"),mixins:{}})},y=function(){var e=m.state("elementTeasers").get(),t=e[0].elements.findIndex((function(e){return"Post Excerpt"===e.name}));t>-1&&e[0].elements[t]&&(e[0].elements[t].disabledOnHub=!0,m.state("elementTeasers").set(e))},f=void 0!==window.VCV_UPDATE_ACTIONS,v=window.VCV_EDITOR_TYPE?window.VCV_EDITOR_TYPE():"default";"vcv_layouts"===v||f?(b(),(0,o.getStorage)("settings").state("layoutType").onChange((function(e){var t,s;"postTemplate"===e?(b(),t=m.state("elementTeasers").get(),(s=t[0].elements.findIndex((function(e){return"Post Excerpt"===e.name})))>-1&&t[0].elements[s]&&(delete t[0].elements[s].disabledOnHub,m.state("elementTeasers").set(t))):((0,o.getStorage)("elementSettings").trigger("remove","layoutPostExcerpt"),y())}))):"template"===v||"default"===v?b():m.state("elementTeasers").onChange((function e(){window.setTimeout((function(){y()}),500),m.state("elementTeasers").ignoreChange(e)}))},"./node_modules/raw-loader/index.js!./layoutPostExcerpt/styles.css":function(e){e.exports=""},"./layoutPostExcerpt/settings.json":function(e){"use strict";e.exports=JSON.parse('{"tag":{"type":"string","access":"protected","value":"layoutPostExcerpt"},"output":{"type":"htmleditor","access":"public","value":"<p>\x3c!-- wp:vcv-gutenberg-blocks/dynamic-field-block {\\"value\\":\\"post_excerpt\\"} --\x3e\x3c!-- /wp:vcv-gutenberg-blocks/dynamic-field-block --\x3e</p>","options":{"onlyDynamic":true,"dynamicField":true}},"designOptions":{"type":"designOptions","access":"public","value":[],"options":{"label":"Design Options"}},"advancedTab":{"type":"group","access":"protected","value":["htmlAttributes","customAttributes","customCSS"],"options":{"label":"Advanced","isSections":true}},"metaEditFormTabs":{"type":"group","access":"protected","value":["contentTab","designTab","advancedTab"]},"relatedTo":{"type":"group","access":"protected","value":["General"]},"customClass":{"type":"string","access":"public","value":"","options":{"label":"Extra class name","description":"Add an extra class name to the element and refer to it from the custom CSS option."}},"metaCustomId":{"type":"customId","access":"public","value":"","options":{"label":"Element ID","description":"Apply a unique ID to the element to link it directly by using #your_id (for element ID use lowercase input only)."}},"htmlAttributes":{"type":"group","access":"public","value":["metaCustomId","customClass"],"options":{"label":"HTML Attributes"}},"customCSS":{"type":"group","access":"public","value":["styleEditor"],"options":{"label":"Custom CSS","tooltip":"Add custom CSS to the element using the [element-id] placeholder."}},"styleEditor":{"type":"styleEditor","access":"public","value":[],"options":[]},"customAttributes":{"type":"group","access":"public","value":["extraDataAttributes"],"options":{"label":"Custom Attributes"}},"extraDataAttributes":{"type":"string","access":"public","value":"","options":{"label":"Extra Data Attributes","description":"Add data attributes to your element (ex. data-name=\\"John Lennon\\" data-age=\\"28\\")"}},"designTab":{"type":"group","access":"protected","options":{"label":"Design","isSections":true},"value":["designOptions"]},"contentTab":{"type":"group","access":"protected","options":{"label":"Content","isSections":true},"value":["contentSection"]},"contentSection":{"type":"group","access":"protected","options":{"label":"Content"},"value":["output"]}}')}},[["./layoutPostExcerpt/index.js"]]]);