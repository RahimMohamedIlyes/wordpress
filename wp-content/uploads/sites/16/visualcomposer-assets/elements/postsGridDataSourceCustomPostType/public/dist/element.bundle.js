(window.vcvWebpackJsonp4x=window.vcvWebpackJsonp4x||[]).push([[0],{"./postsGridDataSourceCustomPostType/index.js":function(t,e,s){"use strict";s.r(e);var o=s("./node_modules/vc-cake/index.js"),r=s.n(o),a=s("./node_modules/@babel/runtime/helpers/classCallCheck.js"),n=s.n(a),c=s("./node_modules/@babel/runtime/helpers/createClass.js"),i=s.n(c),p=s("./node_modules/@babel/runtime/helpers/inherits.js"),u=s.n(p),l=s("./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"),d=s.n(l),y=s("./node_modules/@babel/runtime/helpers/getPrototypeOf.js"),m=s.n(y),f=s("./node_modules/react/index.js"),v=s.n(f);function b(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var s,o=m()(t);if(e){var r=m()(this).constructor;s=Reflect.construct(o,arguments,r)}else s=o.apply(this,arguments);return d()(this,s)}}var h=function(t){u()(s,t);var e=b(s);function s(){return n()(this,s),e.apply(this,arguments)}return i()(s,[{key:"render",value:function(){var t=this.props.atts,e=t.attsPostType,s=t.attsPostTypeTerms,o=t.attsLimit,r=t.attsOffset,a="post_type=".concat(e,"&post_status=publish,inherit");return s.vcvCustomPostTypeTaxonomy&&(a+="&taxonomy=".concat(s.vcvCustomPostTypeTaxonomy)),s.vcvCustomPostTypeCategory&&(a+="&category=".concat(s.vcvCustomPostTypeCategory)),o&&o.length&&(a+="&posts_per_page=".concat(o=o>0?o>1e3?1e3:o:1e3)),r&&r.length&&(a+="&offset=".concat(r=r>0?r:0)),v.a.createElement("div",null,a)}}]),s}(r.a.getService("api").elementComponent);(0,r.a.getService("cook").add)(s("./postsGridDataSourceCustomPostType/settings.json"),(function(t){t.add(h)}),{css:!1,editorCss:!1},"")},"./postsGridDataSourceCustomPostType/settings.json":function(t){t.exports=JSON.parse('{"attsPostType":{"type":"dropdown","access":"public","value":"","options":{"label":"Select post type","global":"vcvPostsGridSourcePostTypes"}},"attsPostTypeTerms":{"type":"ajaxForm","access":"public","value":"","options":{"label":"Select taxonomy","action":"vcv:customPostTypeTerms:form","onChange":{"rules":{"attsPostType":{"rule":"true"},"attsPostTypeTerms":{"rule":"true"}},"actions":[{"action":"fieldMethod","options":{"method":"requestToServer"}}]}}},"attsOffset":{"type":"string","access":"public","value":"","options":{"label":"Offset","description":"Display the grid by excluding the first x number of posts."}},"attsLimit":{"type":"string","access":"public","value":"","options":{"label":"Limit","placeholder":"5","description":"Limit the number of posts displayed. The default is 5 posts."}},"postsGridDataSource":{"type":"group","access":"protected","value":["attsPostType","attsPostTypeTerms","attsOffset","attsLimit"],"options":{"label":"Posts Grid"}},"metaEditFormTabs":{"type":"group","access":"protected","value":["postsGridDataSource"]},"sourceItem":{"type":"string","access":"public","value":"Custom Post Type","options":{"label":"Data Source","tooltip":"Specify the type of content to display in the Post grid element."}},"metaBackendLabels":{"type":"group","access":"protected","value":[{"value":["sourceItem"]}]},"tag":{"access":"protected","type":"string","value":"postsGridDataSourceCustomPostType"}}')}},[["./postsGridDataSourceCustomPostType/index.js"]]]);