(self.vcvWebpackJsonp4x=self.vcvWebpackJsonp4x||[]).push([["element"],{"./layoutContentArea/index.js":function(e,t,n){"use strict";var a=n("./node_modules/vc-cake/index.js"),s=n("./node_modules/@babel/runtime/helpers/esm/extends.js"),o=n("./node_modules/@babel/runtime/helpers/esm/classCallCheck.js"),r=n("./node_modules/@babel/runtime/helpers/esm/createClass.js"),l=n("./node_modules/@babel/runtime/helpers/esm/inherits.js"),c=n("./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js"),i=n("./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js"),u=n("./node_modules/react/index.js");function d(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=(0,i.default)(e);if(t){var s=(0,i.default)(this).constructor;n=Reflect.construct(a,arguments,s)}else n=a.apply(this,arguments);return(0,c.default)(this,n)}}var p=function(e){(0,l.default)(n,e);var t=d(n);function n(){return(0,o.default)(this,n),t.apply(this,arguments)}return(0,r.default)(n,[{key:"getPlaceholder",value:function(){var e=window.VCV_I18N&&window.VCV_I18N(),t=e?e.contentAreaPlaceholderText:"This is your content area placeholder - page or post content will be displayed here.";return u.createElement("div",{className:"vce-layouts-wp-content-area-placeholder"},u.createElement("p",{className:"vcv-placeholder-description"},t))}},{key:"render",value:function(){var e=this.props,t=e.id,n=e.atts,a=e.editor,o=n.customClass,r=n.metaCustomId,l=["vce-layouts-wp-content-area-container"],c={};o&&l.push(o),r&&(c.id=r);var i=this.applyDO("all");return u.createElement("div",(0,s.default)({className:l.join(" ")},c,a),u.createElement("div",(0,s.default)({className:"vce vce-layouts-wp-content-area-wrapper",id:"el-"+t},i),u.createElement("div",{className:"vcvhelper","data-vcvs-html":"{{vcwb-layout-content-area}}"},this.getPlaceholder())))}}]),n}((0,a.getService)("api").elementComponent),m=(0,a.getStorage)("hubElements"),f=function(){(0,(0,a.getService)("cook").add)(n("./layoutContentArea/settings.json"),(function(e){e.add(p)}),{css:n("./node_modules/raw-loader/index.js!./layoutContentArea/styles.css"),editorCss:n("./node_modules/raw-loader/index.js!./layoutContentArea/editor.css"),mixins:{}})},v=function(){var e=m.state("elementTeasers").get(),t=e[0].elements.findIndex((function(e){return"Content Area"===e.name}));t>-1&&e[0].elements[t]&&(e[0].elements[t].disabledOnHub=!0,m.state("elementTeasers").set(e))},b=void 0!==window.VCV_UPDATE_ACTIONS;"vcv_layouts"===(window.VCV_EDITOR_TYPE?window.VCV_EDITOR_TYPE():"default")||b?(f(),(0,a.getStorage)("settings").state("layoutType").onChange((function(e){var t,n;"postTemplate"===e?(f(),t=m.state("elementTeasers").get(),(n=t[0].elements.findIndex((function(e){return"Content Area"===e.name})))>-1&&t[0].elements[n]&&(delete t[0].elements[n].disabledOnHub,m.state("elementTeasers").set(t))):((0,a.getStorage)("elementSettings").trigger("remove","layoutContentArea"),v())}))):m.state("elementTeasers").onChange((function e(){window.setTimeout((function(){v()}),500),m.state("elementTeasers").ignoreChange(e)}))},"./node_modules/raw-loader/index.js!./layoutContentArea/editor.css":function(e){e.exports=".vcwb .vce-layouts-wp-content-area-wrapper {\n  min-height: 1em;\n}\n\n.vcwb .vce-layouts-wp-content-area-placeholder {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  height: 500px;\n  border-radius: 5px;\n  border: 2px dashed rgba(21, 24, 42, .6);\n}\n\n.vcwb .vce-layouts-wp-content-area-placeholder:hover {\n  border: 2px dashed rgba(21, 24, 42, 1);\n}\n\n.vcwb .vce-layouts-wp-content-area-placeholder p.vcv-placeholder-description {\n  padding: 9px 20px;\n  text-align: center;\n  letter-spacing: 1px;\n  font: italic 13px/22px 'Roboto', Arial, sans-serif;\n  color: #fff;\n  background-color: rgba(21, 24, 42, .6);\n  transition: all 0.2s ease-in-out;\n  border-radius: 5px;\n  margin: 10px;\n}\n\n.vcwb .vce-layouts-wp-content-area-placeholder:hover p.vcv-placeholder-description {\n  background-color: rgb(21, 24, 42);\n  transition: all 0.2s ease-in-out;\n}\n"},"./node_modules/raw-loader/index.js!./layoutContentArea/styles.css":function(e){e.exports=""},"./layoutContentArea/settings.json":function(e){"use strict";e.exports=JSON.parse('{"tag":{"type":"string","access":"protected","value":"layoutContentArea"},"designOptions":{"type":"designOptions","access":"public","value":{},"options":{"label":"Design Options"}},"editFormTab1":{"type":"group","access":"protected","value":["metaCustomId","customClass"],"options":{"label":"General"}},"metaEditFormTabs":{"type":"group","access":"protected","value":["editFormTab1","designOptions"]},"relatedTo":{"type":"group","access":"protected","value":["General"]},"customClass":{"type":"string","access":"public","value":"","options":{"label":"Extra class name","description":"Add an extra class name to the element and refer to it from the custom CSS option."}},"metaCustomId":{"type":"customId","access":"public","value":"","options":{"label":"Element ID","description":"Apply a unique ID to the element to link it directly by using #your_id (for element ID use lowercase input only)."}},"metaElementLimit":{"type":"number","access":"public","value":1}}')}},[["./layoutContentArea/index.js"]]]);