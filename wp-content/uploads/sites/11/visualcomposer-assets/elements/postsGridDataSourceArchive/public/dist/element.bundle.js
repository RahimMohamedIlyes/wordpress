"use strict";(self.vcvWebpackJsonp4x=self.vcvWebpackJsonp4x||[]).push([["element"],{"./postsGridDataSourceArchive/index.js":function(e,t,s){var o=s("./node_modules/@babel/runtime/helpers/esm/classCallCheck.js"),r=s("./node_modules/@babel/runtime/helpers/esm/createClass.js"),a=s("./node_modules/@babel/runtime/helpers/esm/inherits.js"),n=s("./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js"),i=s("./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js"),c=s("./node_modules/react/index.js"),u=s("./node_modules/vc-cake/index.js");function l(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var s,o=(0,i.default)(e);if(t){var r=(0,i.default)(this).constructor;s=Reflect.construct(o,arguments,r)}else s=o.apply(this,arguments);return(0,n.default)(this,s)}}var p=function(e){(0,a.default)(s,e);var t=l(s);function s(){return(0,o.default)(this,s),t.apply(this,arguments)}return(0,r.default)(s,[{key:"render",value:function(){var e=this.props.atts.attsLimit,t="post_type=post&post_status=publish";return e=e&&e.length?e>0?e>1e3?1e3:e:1e3:5,t+="&posts_per_page=".concat(e),c.createElement("div",null,t)}}]),s}(s.n(u)().getService("api").elementComponent),d=function(){(0,(0,u.getService)("cook").add)(s("./postsGridDataSourceArchive/settings.json"),(function(e){e.add(p)}),{css:!1,editorCss:!1},"")};"vcv_layouts"===(window.VCV_EDITOR_TYPE?window.VCV_EDITOR_TYPE():"default")&&(d(),(0,u.getStorage)("settings").state("layoutType").onChange((function(e){"archiveTemplate"===e?d():(0,u.getStorage)("elementSettings").trigger("remove","postsGridDataSourceArchive")})))},"./postsGridDataSourceArchive/settings.json":function(e){e.exports=JSON.parse('{"attsLimit":{"type":"string","access":"public","value":"","options":{"label":"Limit","placeholder":"5","description":"Limit the number of posts displayed. The default is 5 posts."}},"postsGridDataSource":{"type":"group","access":"protected","value":["attsLimit"],"options":{"label":"Posts Grid"}},"metaEditFormTabs":{"type":"group","access":"protected","value":["postsGridDataSource"]},"sourceItem":{"type":"string","access":"public","value":"DynamicArchive","options":{"label":"Data Source","tooltip":"Specify the type of content to display in the Post grid element."}},"metaBackendLabels":{"type":"group","access":"protected","value":[{"value":["sourceItem"]}]},"tag":{"access":"protected","type":"string","value":"postsGridDataSourceArchive"}}')}},[["./postsGridDataSourceArchive/index.js"]]]);