(self.vcvWebpackJsonp4x=self.vcvWebpackJsonp4x||[]).push([["element"],{"./newsPostGrid/index.js":function(e,t,n){"use strict";var s=n("./node_modules/vc-cake/index.js"),o=n("./node_modules/@babel/runtime/helpers/esm/extends.js"),i=n("./node_modules/@babel/runtime/helpers/esm/classCallCheck.js"),r=n("./node_modules/@babel/runtime/helpers/esm/createClass.js"),a=n("./node_modules/@babel/runtime/helpers/esm/inherits.js"),c=n("./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js"),l=n("./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js"),p=n("./node_modules/react/index.js"),d=n("./node_modules/lodash/lodash.js"),g=n.n(d);function u(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,s=(0,l.default)(e);if(t){var o=(0,l.default)(this).constructor;n=Reflect.construct(s,arguments,o)}else n=s.apply(this,arguments);return(0,c.default)(this,n)}}var m=(0,s.getService)("api"),v=(0,s.getService)("cook"),f=(0,s.getService)("dataProcessor"),h=function(e){(0,a.default)(s,e);var t=u(s);function s(e){var n;return(0,i.default)(this,s),(n=t.call(this,e)).state={shortcode:"",shortcodeContent:n.spinnerHTML()},n.ref=p.createRef(),n.btnRef=p.createRef(),n.debounceRequest=g().debounce(n.requestToServer,750),n}return(0,r.default)(s,[{key:"componentDidMount",value:function(){this.requestToServer()}},{key:"componentDidUpdate",value:function(e){(0,g().isEqual)(this.props.atts,e.atts)||this.debounceRequest()}},{key:"componentwillUnmount",value:function(){this.serverRequest&&(this.serverRequest.cancelled=!0)}},{key:"getItemContent",value:function(e){var t=document.createElement("div");return t.classList.add("vce-posts-grid-item"),t.innerHTML=e,this.props.atts.toggleButton?t.querySelector(".vce-post-link").innerHTML=this.btnRef.current.innerHTML.trim():t.querySelector(".vce-post-link").remove(),t.outerHTML.trim()}},{key:"requestToServer",value:function(){var e=this;if(this.props.atts.gridItem&&this.props.atts.sourceItem){var t=v.get(this.props.atts.gridItem),s=v.get(this.props.atts.sourceItem),o=t.render(null,!1),i=s.render(null,!1),r=n("./node_modules/react-dom/server.browser.js"),a=n("./node_modules/striptags/src/striptags.js");this.ref&&this.ref.current&&(this.ref.current.innerHTML=this.spinnerHTML());var c=r.renderToStaticMarkup(o),l=this.getItemContent(c);this.serverRequest=f.appServerRequest({"vcv-action":"elements:posts_grid:adminNonce","vcv-nonce":window.vcvNonce,"vcv-content":l,"vcv-source-id":window.vcvSourceID,"vcv-atts":{source:encodeURIComponent(JSON.stringify({tag:this.props.atts.sourceItem.tag,value:a(r.renderToStaticMarkup(i))})),unique_id:this.props.id,excerpt:this.props.atts.atts_excerpt?"1":"0",excerpt_length:this.props.atts.atts_excerpt_length,pagination:this.props.atts.atts_pagination?"1":"0",pagination_color:this.props.atts.atts_pagination_color,pagination_per_page:this.props.atts.atts_pagination_per_page,filter:this.props.atts.filtersToggle,filter_atts:encodeURIComponent(JSON.stringify(this.props.atts.filterItem))}}).then((function(t){if(e.serverRequest&&e.serverRequest.cancelled)e.serverRequest=null;else{var n=e.getResponse(t);n&&n.status,e.ref&&e.ref.current&&(e.ref.current.setAttribute("data-vcvs-html",n.shortcode),e.ref.current.innerHTML=n.shortcodeContent||"Failed to render the post grid")}}))}}},{key:"render",value:function(){var e=this.props,t=e.id,n=e.atts,s=e.editor,i=n.customClass,r=n.metaCustomId,a=["vce vce-posts-grid-wrapper vce-news-grid-wrapper"],c=["vce-posts-grid-container vce-news-grid-container"],l={},d=this.getMixinData("postsGridGap");d&&a.push("vce-posts-grid--gap-".concat(d.selector)),(d=this.getMixinData("postsGridColumns"))&&a.push("vce-posts-grid--columns-".concat(d.selector)),(d=this.getMixinData("postsGridPaginationColor"))&&a.push("vce-posts-grid-pagination--color-".concat(d.selector)),i&&c.push(i),r&&(l.id=r);var g=this.applyDO("all"),u=v.get(this.props.atts.button).render(null,!1);return p.createElement("div",(0,o.default)({className:c.join(" ")},l,s),p.createElement("div",(0,o.default)({className:a.join(" "),id:"el-"+t},g),p.createElement("div",{className:"vcvhelper",ref:this.ref}),p.createElement("div",{className:"vcvhelper",ref:this.btnRef,style:{height:"0",visibility:"hidden"}},u)))}}]),s}(m.elementComponent);(0,(0,s.getService)("cook").add)(n("./newsPostGrid/settings.json"),(function(e){e.add(h)}),{css:n("./node_modules/raw-loader/index.js!./newsPostGrid/styles.css"),editorCss:n("./node_modules/raw-loader/index.js!./newsPostGrid/editor.css"),mixins:{postsGridColumns:{mixin:n("./node_modules/raw-loader/index.js!./newsPostGrid/cssMixins/postsGridColumns.pcss")},postsGridGap:{mixin:n("./node_modules/raw-loader/index.js!./newsPostGrid/cssMixins/postsGridGap.pcss")},postsGridPaginationColor:{mixin:n("./node_modules/raw-loader/index.js!./newsPostGrid/cssMixins/postsGridPaginationColor.pcss")}}})},"./node_modules/raw-loader/index.js!./newsPostGrid/cssMixins/postsGridColumns.pcss":function(e){e.exports="@media (min-width: 544px) {\n.vce-news-grid-container.vce-posts-grid-container {\n    .vce-posts-grid--columns-$selector {\n      .vce-posts-grid-item {\n        @if $columns != false {\n          -webkit-flex: 0 0 calc(100% / $columns);\n              -ms-flex: 0 0 calc(100% / $columns);\n                  flex: 0 0 calc(100% / $columns);\n        }\n      }\n    }\n  }\n}\n"},"./node_modules/raw-loader/index.js!./newsPostGrid/cssMixins/postsGridGap.pcss":function(e){e.exports=".vce-news-grid-container.vce-posts-grid-container {\n  .vce-posts-grid--gap-$selector {\n    .vce-posts-grid-list {\n      @if $gap != false {\n        margin-left: calc(-$(gap)px / 2);\n        margin-right: calc(-$(gap)px / 2);\n        margin-bottom: -$(gap)px;\n      }\n    }\n    .vce-posts-grid-item {\n      @if $gap != false {\n        padding-left: calc($(gap)px / 2);\n        padding-right: calc($(gap)px / 2);\n        margin-bottom: $(gap)px;\n      }\n    }\n  }\n}"},"./node_modules/raw-loader/index.js!./newsPostGrid/cssMixins/postsGridPaginationColor.pcss":function(e){e.exports=".vce-news-grid-container.vce-posts-grid-container {\n  .vce-posts-grid-pagination--color-$selector {\n    .vce-posts-grid-pagination-item {\n        @if $baseColor != false {\n          background-color: $baseColor;\n          &:hover {\n          background-color: color($baseColor shade(10%));\n        }\n      }\n    }\n    .vce-posts-grid-pagination-item.vce-state--active {\n      @if $activeColor != false {\n        background-color: $activeColor;\n        &:hover {\n          background-color: color($activeColor shade(10%));\n        }\n      }\n    }\n  }\n}\n"},"./node_modules/raw-loader/index.js!./newsPostGrid/editor.css":function(e){e.exports=".vce-news-grid-container {\n  min-height: 1em;\n}\n"},"./node_modules/raw-loader/index.js!./newsPostGrid/styles.css":function(e){e.exports=".vce-news-grid-container.vce-posts-grid-container .vce-posts-grid-wrapper {\n  overflow: hidden;\n}\n.vce-news-grid-container.vce-posts-grid-container .vce-posts-grid-list {\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -ms-flex-direction: row;\n      -webkit-flex-direction: row;\n          flex-direction: row;\n  -ms-flex-pack: start;\n      -webkit-justify-content: flex-start;\n          justify-content: flex-start;\n  -ms-flex-align: stretch;\n      -webkit-align-items: stretch;\n          align-items: stretch;\n  -ms-flex-line-pack: start;\n      -webkit-align-content: flex-start;\n          align-content: flex-start;\n  -ms-flex-wrap: wrap;\n      -webkit-flex-wrap: wrap;\n          flex-wrap: wrap;\n}\n.vce-news-grid-container.vce-posts-grid-container .vce-posts-grid-item {\n  -ms-flex: 0 0 100%;\n      -webkit-flex: 0 0 100%;\n          flex: 0 0 100%;\n  max-width: 100%;\n  box-sizing: border-box;\n  display: block;\n  overflow: hidden;\n  position: relative;\n  border: none;\n}\n.vce-news-grid-container.vce-posts-grid-container .vce-posts-grid-pagination {\n  margin: 30px 0 12px;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -ms-flex-pack: center;\n      -webkit-justify-content: center;\n          justify-content: center;\n  -ms-flex-align: center;\n      -webkit-align-items: center;\n          align-items: center;\n}\n.vce-news-grid-container.vce-posts-grid-container .vce-posts-grid-pagination .vce-posts-grid-pagination-item {\n  display: inline-block;\n  border-radius: 50%;\n  margin: 15px 5px;\n  height: 10px;\n  width: 10px;\n  text-decoration: none;\n  line-height: 30px;\n  box-shadow: none;\n  border: 0;\n  outline: none;\n  transition: background 0.2s ease-in-out;\n  font-size: 0;\n}\n.vce-news-grid-container.vce-posts-grid-container .vce-posts-grid-pagination .vce-posts-grid-pagination-item:hover,\n.vce-news-grid-container.vce-posts-grid-container .vce-posts-grid-pagination .vce-posts-grid-pagination-item:focus {\n  text-decoration: none;\n  box-shadow: none;\n  border: 0;\n  outline: none;\n}\n.vce-news-grid-container.vce-posts-grid-container .vce-posts-grid-pagination .vce-posts-grid-pagination-item.vce-state--active {\n  width: 14px;\n  height: 14px;\n}\n.vce-news-grid-container.vce-posts-grid-container .vce-posts-grid-pagination-rest-items {\n  padding: 0 18px;\n}\n"},"./newsPostGrid/settings.json":function(e){"use strict";e.exports=JSON.parse('{"tag":{"access":"protected","type":"string","value":"newsPostGrid"},"relatedTo":{"type":"group","access":"protected","value":["General"]},"gap":{"type":"number","access":"public","value":"10","options":{"label":"Gap","description":"Enter the gap in pixels (example: 5).","cssMixin":{"mixin":"postsGridGap","property":"gap","namePattern":"[\\\\d\\\\-]+"}}},"atts_excerpt":{"type":"toggle","access":"public","value":false,"options":{"label":"Custom excerpt length"}},"atts_excerpt_length":{"type":"string","access":"public","value":"","options":{"label":"Excerpt length","description":"Limit the post grid excerpt length.","placeholder":"55","onChange":{"rules":{"atts_excerpt":{"rule":"toggle"}},"actions":[{"action":"toggleVisibility"}]}}},"columns":{"type":"number","access":"public","value":"1","options":{"label":"Number of columns","cssMixin":{"mixin":"postsGridColumns","property":"columns","namePattern":"[\\\\d\\\\-]+"}}},"toggleButton":{"type":"toggle","access":"public","value":true,"options":{"label":"Show button"}},"atts_pagination":{"type":"toggle","access":"public","value":false,"options":{"label":"Enable paging","description":"Divide your post grid into pages and control the maximum number of posts per page."}},"atts_pagination_per_page":{"type":"string","access":"public","value":"10","options":{"label":"Items per page"}},"atts_pagination_color":{"type":"color","access":"public","value":"#ffce00","options":{"label":"Inactive page color","cssMixin":{"mixin":"postsGridPaginationColor","property":"baseColor","namePattern":"[\\\\da-f]+"}}},"atts_pagination_active_color":{"type":"color","access":"public","value":"#e6b900","options":{"label":"Active page color","cssMixin":{"mixin":"postsGridPaginationColor","property":"activeColor","namePattern":"[\\\\da-f]+"}}},"filtersToggle":{"type":"toggle","access":"public","value":false,"options":{"label":"Enable filters","description":"Display content by categories, tags, and other taxonomies."}},"filterItem":{"type":"element","access":"public","value":{"tag":"postGridFilter"},"options":{"category":"_postsGridFilters","label":"Filters","tooltip":"Specify what filters will be displayed within the grid.","onChange":{"rules":{"filtersToggle":{"rule":"toggle"}},"actions":[{"action":"toggleSectionVisibility"}]}}},"editFormTab1":{"type":"group","access":"protected","value":["columns","gap","atts_excerpt","atts_excerpt_length","atts_pagination","filtersToggle","toggleButton","metaCustomId","customClass"],"options":{"label":"General"}},"pagination":{"type":"group","access":"protected","value":["atts_pagination_per_page","atts_pagination_color","atts_pagination_active_color"],"options":{"label":"Pagination","tooltip":"Specify how many items will be displayed within the page.","onChange":{"rules":{"atts_pagination":{"rule":"toggle"}},"actions":[{"action":"toggleSectionVisibility"}]}}},"sourceItem":{"type":"element","access":"public","value":{"tag":"postsGridDataSourcePost"},"options":{"category":"_postsGridSources","_fixElementDownload":[{"tag":"postsGrid"},{"tag":"postsGridDataSourcePost"},{"tag":"postsGridDataSourcePage"},{"tag":"postsGridDataSourceCustomPostType"},{"tag":"postsGridDataSourceListOfIds"}],"label":"Data Source","tooltip":"Specify the type of content to display in the Post grid element.","replaceView":"dropdown","merge":{"attributes":[{"key":"attsOffset","type":"string"},{"key":"attsLimit","type":"string"}]}}},"gridItem":{"type":"element","access":"public","value":{"tag":"newsPostGridItem"},"options":{"_category":"postsGridItems","tabLabel":"Grid Item","tooltip":"Modify existing parameters of a single grid item of the chosen grid element."}},"button":{"type":"element","access":"public","value":{"tag":"growShadowButton","buttonText":"Read more"},"options":{"category":"Button","tabLabel":"Button","merge":{"attributes":[{"key":"alignment","type":"string"},{"key":"buttonText","type":"string"}]},"exclude":["buttonUrl"],"onChange":{"rules":{"toggleButton":{"rule":"toggle"}},"actions":[{"action":"toggleSectionVisibility"}]}}},"designOptions":{"type":"designOptions","access":"public","value":{},"options":{"label":"Design Options"}},"metaEditFormTabs":{"type":"group","access":"protected","value":["editFormTab1","filterItem","sourceItem","pagination","gridItem","button","designOptions"]},"metaCustomId":{"type":"customId","access":"public","value":"","options":{"label":"Element ID","description":"Apply a unique ID to the element to link it directly by using #your_id (for element ID use lowercase input only)."}},"customClass":{"type":"string","access":"public","value":"","options":{"label":"Extra class name","description":"Add an extra class name to the element and refer to it from the custom CSS option."}}}')}},[["./newsPostGrid/index.js"]]]);