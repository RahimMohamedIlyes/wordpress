(self.vcvWebpackJsonp4x=self.vcvWebpackJsonp4x||[]).push([["element"],{"./postsGrid/index.js":function(e,t,s){"use strict";var o=s("./node_modules/vc-cake/index.js"),n=s.n(o),i=s("./node_modules/@babel/runtime/helpers/esm/extends.js"),a=s("./node_modules/@babel/runtime/helpers/esm/classCallCheck.js"),r=s("./node_modules/@babel/runtime/helpers/esm/createClass.js"),l=s("./node_modules/@babel/runtime/helpers/esm/inherits.js"),c=s("./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js"),p=s("./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js"),d=s("./node_modules/react/index.js"),u=s("./node_modules/lodash/lodash.js"),g=s.n(u);function m(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var s,o=(0,p.default)(e);if(t){var n=(0,p.default)(this).constructor;s=Reflect.construct(o,arguments,n)}else s=o.apply(this,arguments);return(0,c.default)(this,s)}}var f=function(e){(0,l.default)(n,e);var t=m(n);function n(e){var s;return(0,a.default)(this,n),(s=t.call(this,e)).state={shortcode:"",shortcodeContent:s.spinnerHTML()},s.debounceRequest=g().debounce(s.requestToServer,750),s}return(0,r.default)(n,[{key:"componentDidMount",value:function(){this.requestToServer()}},{key:"componentDidUpdate",value:function(e){(0,g().isEqual)(this.props.atts,e.atts)||this.debounceRequest()}},{key:"componentwillUnmount",value:function(){this.serverRequest&&(this.serverRequest.cancelled=!0)}},{key:"requestToServer",value:function(){var e=this;if(this.props.atts.gridItem&&this.props.atts.sourceItem){var t=(0,o.getService)("dataProcessor"),n=(0,o.getService)("cook"),i=n.get(this.props.atts.gridItem),a=n.get(this.props.atts.sourceItem),r=i.render(null,!1),l=a.render(null,!1),c=s("./node_modules/react-dom/server.browser.js"),p=s("./node_modules/striptags/src/striptags.js");this.ref&&(this.ref.innerHTML=this.spinnerHTML()),this.serverRequest=t.appServerRequest({"vcv-action":"elements:posts_grid:adminNonce","vcv-nonce":window.vcvNonce,"vcv-content":c.renderToStaticMarkup(r),"vcv-source-id":window.vcvSourceID,"vcv-atts":{source:encodeURIComponent(JSON.stringify({tag:this.props.atts.sourceItem.tag,value:p(c.renderToStaticMarkup(l))})),unique_id:this.props.id,excerpt:this.props.atts.atts_excerpt?"1":"0",excerpt_length:this.props.atts.atts_excerpt_length,pagination:this.props.atts.atts_pagination?"1":"0",pagination_color:this.props.atts.atts_pagination_color,pagination_per_page:this.props.atts.atts_pagination_per_page,filter:this.props.atts.filtersToggle,filter_atts:encodeURIComponent(JSON.stringify(this.props.atts.filterItem))}}).then((function(t){if(e.serverRequest&&e.serverRequest.cancelled)e.serverRequest=null;else{var s=e.getResponse(t);s&&s.status,e.ref&&(e.ref.setAttribute("data-vcvs-html",s.shortcode),e.ref.innerHTML=s.shortcodeContent||"Failed to render the post grid")}}))}}},{key:"render",value:function(){var e=this,t=this.props,s=t.id,o=t.atts,n=t.editor,a=o.customClass,r=o.metaCustomId,l=["vce vce-posts-grid-wrapper"],c=["vce-posts-grid-container"],p={},u=this.getMixinData("postsGridGap");u&&l.push("vce-posts-grid--gap-".concat(u.selector)),(u=this.getMixinData("postsGridColumns"))&&l.push("vce-posts-grid--columns-".concat(u.selector)),(u=this.getMixinData("postsGridPaginationColor"))&&l.push("vce-posts-grid-pagination--color-".concat(u.selector)),a&&c.push(a),r&&(p.id=r);var g=this.applyDO("all");return d.createElement("div",(0,i.default)({className:c.join(" ")},p,n),d.createElement("div",(0,i.default)({className:l.join(" "),id:"el-"+s},g),d.createElement("div",{className:"vcvhelper",ref:function(t){e.ref=t}})))}}]),n}((0,o.getService)("api").elementComponent);(0,n().getService("cook").add)(s("./postsGrid/settings.json"),(function(e){e.add(f)}),{css:s("./node_modules/raw-loader/index.js!./postsGrid/styles.css"),editorCss:s("./node_modules/raw-loader/index.js!./postsGrid/editor.css"),mixins:{postsGridColumns:{mixin:s("./node_modules/raw-loader/index.js!./postsGrid/cssMixins/postsGridColumns.pcss")},postsGridGap:{mixin:s("./node_modules/raw-loader/index.js!./postsGrid/cssMixins/postsGridGap.pcss")},postsGridPaginationColor:{mixin:s("./node_modules/raw-loader/index.js!./postsGrid/cssMixins/postsGridPaginationColor.pcss")}}},"")},"./node_modules/raw-loader/index.js!./postsGrid/cssMixins/postsGridColumns.pcss":function(e){e.exports="@media (min-width: 544px) {\n  .vce-posts-grid--columns-$selector {\n    .vce-posts-grid-item {\n      @if $columns != false {\n        -webkit-flex: 0 0 calc(100% / $columns);\n            -ms-flex: 0 0 calc(100% / $columns);\n                flex: 0 0 calc(100% / $columns);\n        max-width: calc(100% / $columns);\n      }\n    }\n  }\n}\n\n"},"./node_modules/raw-loader/index.js!./postsGrid/cssMixins/postsGridGap.pcss":function(e){e.exports=".vce-posts-grid--gap-$selector {\n  .vce-posts-grid-list {\n    @if $gap != false {\n      margin-left: calc(-$(gap)px / 2);\n      margin-right: calc(-$(gap)px / 2);\n      margin-bottom: -$(gap)px;\n    }\n  }\n  .vce-posts-grid-item {\n    @if $gap != false {\n      padding-left: calc($(gap)px / 2);\n      padding-right: calc($(gap)px / 2);\n      margin-bottom: $(gap)px;\n    }\n  }\n}\n"},"./node_modules/raw-loader/index.js!./postsGrid/cssMixins/postsGridPaginationColor.pcss":function(e){e.exports=".vce-posts-grid-pagination--color-$selector {\n  .vce-posts-grid-pagination-item {\n    @if $baseColor != false {\n      background-color: $baseColor;\n      &:hover {\n        background-color: color($baseColor shade(10%));\n      }\n    }\n\n    @if $baseTextColor != false {\n      color: $baseTextColor;\n\n      &:hover,\n      &:focus {\n        color: $baseTextColor;\n      }\n    }\n  }\n  .vce-posts-grid-pagination-item.vce-state--active {\n    @if $activeColor != false {\n      background-color: $activeColor;\n      &:hover {\n        background-color: color($activeColor shade(10%));\n      }\n    }\n\n    @if $activeTextColor != false {\n      color: $activeTextColor;\n\n      &:hover,\n      &:focus {\n        color: $activeTextColor;\n      }\n    }\n  }\n}\n"},"./node_modules/raw-loader/index.js!./postsGrid/editor.css":function(e){e.exports=".vce-posts-grid-container {\n  min-height: 1em;\n}\n"},"./node_modules/raw-loader/index.js!./postsGrid/styles.css":function(e){e.exports=".vce-posts-grid-wrapper {\n  overflow: hidden;\n}\n\n.vce-posts-grid-container .vce-posts-grid-list {\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: row;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  -webkit-align-items: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  -webkit-align-content: flex-start;\n      -ms-flex-line-pack: start;\n          align-content: flex-start;\n  -webkit-flex-wrap: wrap;\n      -ms-flex-wrap: wrap;\n          flex-wrap: wrap;\n}\n\n.vce-posts-grid-container .vce-posts-grid-item {\n  -webkit-flex: 0 0 100%;\n      -ms-flex: 0 0 100%;\n          flex: 0 0 100%;\n  max-width: 100%;\n  box-sizing: border-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  overflow: hidden;\n  position: relative;\n  border: none;\n}\n\n.vce-posts-grid-container .vce-posts-grid-pagination {\n  text-align: center;\n  margin: 30px 0 12px;\n  font-style: italic;\n}\n\n.vce-posts-grid-container .vce-posts-grid-pagination .vce-posts-grid-pagination-item {\n  display: inline-block;\n  border-radius: 50%;\n  margin: 3px 7px;\n  height: 30px;\n  width: 30px;\n  text-decoration: none;\n  line-height: 30px;\n  box-shadow: none;\n  border: 0;\n  outline: none;\n  transition: background .2s ease-in-out;\n}\n\n.vce-posts-grid-container .vce-posts-grid-pagination .vce-posts-grid-pagination-item:hover {\n  text-decoration: none;\n  box-shadow: none;\n  border: 0;\n  outline: none;\n}\n\n.vce-posts-grid-container .vce-posts-grid-pagination .vce-posts-grid-pagination-item:focus {\n  text-decoration: none;\n  box-shadow: none;\n  border: 0;\n  outline: none;\n}\n\n.vce-posts-grid-container .vce-posts-grid-pagination-rest-items {\n  padding: 0 18px;\n}"},"./postsGrid/settings.json":function(e){"use strict";e.exports=JSON.parse('{"gap":{"type":"number","access":"public","value":"10","options":{"label":"Gap","description":"Enter the gap in pixels (example: 5).","cssMixin":{"mixin":"postsGridGap","property":"gap","namePattern":"[\\\\d\\\\-]+"}}},"atts_excerpt":{"type":"toggle","access":"public","value":false,"options":{"label":"Custom excerpt length"}},"atts_excerpt_length":{"type":"string","access":"public","value":"","options":{"label":"Excerpt length","description":"Limit the post grid excerpt length.","placeholder":"55","onChange":{"rules":{"atts_excerpt":{"rule":"toggle"}},"actions":[{"action":"toggleVisibility"}]}}},"columns":{"type":"number","access":"public","value":"3","options":{"label":"Number of columns","cssMixin":{"mixin":"postsGridColumns","property":"columns","namePattern":"[\\\\d\\\\-]+"}}},"atts_pagination":{"type":"toggle","access":"public","value":false,"options":{"label":"Enable paging","description":"Divide your post grid into pages and control the maximum number of posts per page."}},"atts_pagination_per_page":{"type":"string","access":"public","value":"10","options":{"label":"Items per page"}},"atts_pagination_color":{"type":"color","access":"public","value":"#EEE","options":{"label":"Inactive page color","cssMixin":{"mixin":"postsGridPaginationColor","property":"baseColor","namePattern":"[\\\\da-f]+"}}},"atts_pagination_active_color":{"type":"color","access":"public","value":"#557CBF","options":{"label":"Active page color","cssMixin":{"mixin":"postsGridPaginationColor","property":"activeColor","namePattern":"[\\\\da-f]+"}}},"atts_pagination_text_color":{"type":"color","access":"public","value":"#3d3d3d","options":{"label":"Inactive text color","cssMixin":{"mixin":"postsGridPaginationColor","property":"baseTextColor","namePattern":"[\\\\da-f]+"}}},"atts_pagination_active_text_color":{"type":"color","access":"public","value":"#FFF","options":{"label":"Active text color","cssMixin":{"mixin":"postsGridPaginationColor","property":"activeTextColor","namePattern":"[\\\\da-f]+"}}},"editFormTab1":{"type":"group","access":"protected","value":["columns","gap","atts_excerpt","atts_excerpt_length","atts_pagination","filtersToggle","metaCustomId","customClass"],"options":{"label":"General"}},"filtersToggle":{"type":"toggle","access":"public","value":false,"options":{"label":"Enable filters","description":"Display content by categories, tags, and other taxonomies."}},"pagination":{"type":"group","access":"protected","value":["atts_pagination_per_page","atts_pagination_color","atts_pagination_active_color","atts_pagination_text_color","atts_pagination_active_text_color"],"options":{"label":"Pagination","tooltip":"Specify how many items will be displayed within the page.","onChange":{"rules":{"atts_pagination":{"rule":"toggle"}},"actions":[{"action":"toggleSectionVisibility"}]}}},"filterItem":{"type":"element","access":"public","value":{"tag":"postGridFilter"},"options":{"category":"_postsGridFilters","label":"Filters","tooltip":"Specify what filters will be displayed within the grid.","onChange":{"rules":{"filtersToggle":{"rule":"toggle"}},"actions":[{"action":"toggleSectionVisibility"}]}}},"sourceItem":{"type":"element","access":"public","value":{"tag":"postsGridDataSourcePost"},"options":{"category":"_postsGridSources","_fixElementDownload":[{"tag":"postsGridDataSourcePost"},{"tag":"postsGridDataSourcePage"},{"tag":"postsGridDataSourceCustomPostType"},{"tag":"postsGridDataSourceListOfIds"}],"label":"Data Source","tooltip":"Specify the type of content to display in the Post grid element.","replaceView":"dropdown","merge":{"attributes":[{"key":"attsOffset","type":"string"},{"key":"attsLimit","type":"string"}]}}},"gridItem":{"type":"element","access":"public","value":{"tag":"postsGridItemPostDescription"},"options":{"_category":"postsGridItems","tabLabel":"Grid Item","tooltip":"Modify existing parameters of a single grid item of the chosen grid element."}},"designOptions":{"type":"designOptions","access":"public","value":{},"options":{"label":"Design Options"}},"metaEditFormTabs":{"type":"group","access":"protected","value":["editFormTab1","filterItem","sourceItem","pagination","gridItem","designOptions"]},"relatedTo":{"type":"group","access":"protected","value":["General"]},"metaCustomId":{"type":"customId","access":"public","value":"","options":{"label":"Element ID","description":"Apply a unique ID to the element to link it directly by using #your_id (for element ID use lowercase input only)."}},"customClass":{"type":"string","access":"public","value":"","options":{"label":"Extra class name","description":"Add an extra class name to the element and refer to it from the custom CSS option."}},"tag":{"access":"protected","type":"string","value":"postsGrid"}}')}},[["./postsGrid/index.js"]]]);