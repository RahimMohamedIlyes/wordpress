(self.vcvWebpackJsonp4x=self.vcvWebpackJsonp4x||[]).push([["element"],{"./sidePostGrid/index.js":function(e,t,i){"use strict";var n=i("./node_modules/vc-cake/index.js"),s=i("./node_modules/@babel/runtime/helpers/esm/extends.js"),o=i("./node_modules/@babel/runtime/helpers/esm/classCallCheck.js"),r=i("./node_modules/@babel/runtime/helpers/esm/createClass.js"),a=i("./node_modules/@babel/runtime/helpers/esm/inherits.js"),c=i("./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js"),l=i("./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js"),p=i("./node_modules/react/index.js"),d=i("./node_modules/lodash/lodash.js"),g=i.n(d),u=i("./node_modules/vc-helpers/lib/index.js");function v(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var i,n=(0,l.default)(e);if(t){var s=(0,l.default)(this).constructor;i=Reflect.construct(n,arguments,s)}else i=n.apply(this,arguments);return(0,c.default)(this,i)}}var m=(0,n.getService)("api"),b=(0,n.getService)("cook"),f=(0,n.getService)("dataProcessor"),h=function(e){(0,a.default)(n,e);var t=v(n);function n(e){var i;return(0,o.default)(this,n),(i=t.call(this,e)).state={shortcode:"",shortcodeContent:i.spinnerHTML()},i.ref=p.createRef(),i.btnRef=p.createRef(),i.debounceRequest=g().debounce(i.requestToServer,750),i}return(0,r.default)(n,[{key:"componentDidMount",value:function(){this.requestToServer()}},{key:"componentDidUpdate",value:function(e){(0,g().isEqual)(this.props.atts,e.atts)||this.debounceRequest()}},{key:"componentwillUnmount",value:function(){this.serverRequest&&(this.serverRequest.cancelled=!0)}},{key:"getItemContent",value:function(e){var t=document.createElement("div");return t.classList.add("vce-posts-grid-item"),t.innerHTML=e,this.props.atts.toggleButton?t.querySelector(".vce-post-link").innerHTML=this.btnRef.current.innerHTML.trim():t.querySelector(".vce-post-link").remove(),t.outerHTML.trim()}},{key:"requestToServer",value:function(){var e=this;if(this.props.atts.gridItem&&this.props.atts.sourceItem){var t=b.get(this.props.atts.gridItem),n=b.get(this.props.atts.sourceItem),s=t.render(null,!1),o=n.render(null,!1),r=i("./node_modules/react-dom/server.browser.js"),a=i("./node_modules/striptags/src/striptags.js");this.ref&&this.ref.current&&(this.ref.current.innerHTML=this.spinnerHTML());var c=r.renderToStaticMarkup(s),l=this.getItemContent(c);this.serverRequest=f.appServerRequest({"vcv-action":"elements:posts_grid:adminNonce","vcv-nonce":window.vcvNonce,"vcv-content":l,"vcv-source-id":window.vcvSourceID,"vcv-atts":{source:encodeURIComponent(JSON.stringify({tag:this.props.atts.sourceItem.tag,value:a(r.renderToStaticMarkup(o))})),unique_id:this.props.id,excerpt:this.props.atts.atts_excerpt?"1":"0",excerpt_length:this.props.atts.atts_excerpt_length,pagination:this.props.atts.atts_pagination?"1":"0",pagination_color:this.props.atts.atts_pagination_color,pagination_per_page:this.props.atts.atts_pagination_per_page,filter:this.props.atts.filtersToggle,filter_atts:encodeURIComponent(JSON.stringify(this.props.atts.filterItem))}}).then((function(t){if(e.serverRequest&&e.serverRequest.cancelled)e.serverRequest=null;else{var i=e.getResponse(t);i&&i.status,e.ref&&e.ref.current&&(e.ref.current.setAttribute("data-vcvs-html",i.shortcode),e.ref.current.innerHTML=i.shortcodeContent||"Failed to render the post grid")}}))}}},{key:"render",value:function(){var e=this.props,t=e.id,i=e.atts,n=e.editor,o=i.customClass,r=i.metaCustomId,a=i.gap,c=i.columns,l=i.activeColor,d=i.extraDataAttributes,g=["vce-posts-grid-container vce-side-grid-container"],v="".concat(a,"px"),m=i.atts_pagination_color,f=i.atts_pagination_active_color,h={gapPx:v,columns:c,paginationColor:m,paginationActiveColor:f,paginationColorHover:this.getColorShade(-.1,m),paginationActiveColorHover:this.getColorShade(-.1,f),activeColor:l},y=(0,u.setCssVariables)(h),x=this.getExtraDataAttributes(d);o&&g.push(o),r&&(x.id=r);var w=this.applyDO("all"),_=b.get(this.props.atts.button).render(null,!1);return p.createElement("div",(0,s.default)({className:g.join(" ")},x,n,{style:y}),p.createElement("div",(0,s.default)({className:["vce vce-posts-grid-wrapper vce-side-grid-wrapper"].join(" "),id:"el-"+t},w),p.createElement("div",{className:"vcvhelper",ref:this.ref}),p.createElement("div",{className:"vcvhelper",ref:this.btnRef,style:{height:"0",visibility:"hidden"}},_)))}}]),n}(m.elementComponent);(0,(0,n.getService)("cook").add)(i("./sidePostGrid/settings.json"),(function(e){e.add(h)}),{css:i("./node_modules/raw-loader/index.js!./sidePostGrid/styles.css"),editorCss:i("./node_modules/raw-loader/index.js!./sidePostGrid/editor.css"),mixins:{}})},"./node_modules/raw-loader/index.js!./sidePostGrid/editor.css":function(e){e.exports=".vce-side-grid-container {\n  min-height: 1em;\n}\n"},"./node_modules/raw-loader/index.js!./sidePostGrid/styles.css":function(e){e.exports=".vce-posts-grid-container.vce-side-grid-container {\n  --gapPx: 10px;\n  --columns: 1;\n  --paginationColor: #ffce00;\n  --paginationActiveColor: #e6b900;\n  --paginationColorHover: #f2c300;\n  --paginationActiveColorHover: #dab000;\n}\n.vce-side-grid-container.vce-posts-grid-container .vce-posts-grid-wrapper {\n  overflow: hidden;\n}\n.vce-side-grid-container.vce-posts-grid-container .vce-posts-grid-list {\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -ms-flex-direction: row;\n      -webkit-flex-direction: row;\n          flex-direction: row;\n  -ms-flex-pack: start;\n      -webkit-justify-content: flex-start;\n          justify-content: flex-start;\n  -ms-flex-align: stretch;\n      -webkit-align-items: stretch;\n          align-items: stretch;\n  -ms-flex-line-pack: start;\n      -webkit-align-content: flex-start;\n          align-content: flex-start;\n  -ms-flex-wrap: wrap;\n      -webkit-flex-wrap: wrap;\n          flex-wrap: wrap;\n}\n.vce-side-grid-container.vce-posts-grid-container .vce-posts-grid-item {\n  -ms-flex: 0 0 100%;\n      -webkit-flex: 0 0 100%;\n          flex: 0 0 100%;\n  max-width: 100%;\n  box-sizing: border-box;\n  display: block;\n  overflow: hidden;\n  position: relative;\n  border: none;\n}\n.vce-side-grid-container.vce-posts-grid-container .vce-posts-grid-pagination {\n  margin: 30px 0 12px;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -ms-flex-pack: center;\n      -webkit-justify-content: center;\n          justify-content: center;\n  -ms-flex-align: center;\n      -webkit-align-items: center;\n          align-items: center;\n}\n.vce-side-grid-container.vce-posts-grid-container .vce-posts-grid-pagination .vce-posts-grid-pagination-item {\n  display: inline-block;\n  border-radius: 50%;\n  margin: 15px 5px;\n  height: 10px;\n  width: 10px;\n  text-decoration: none;\n  line-height: 30px;\n  box-shadow: none;\n  border: 0;\n  outline: none;\n  transition: background 0.2s ease-in-out;\n  font-size: 0;\n}\n.vce-side-grid-container.vce-posts-grid-container .vce-posts-grid-pagination .vce-posts-grid-pagination-item:hover,\n.vce-side-grid-container.vce-posts-grid-container .vce-posts-grid-pagination .vce-posts-grid-pagination-item:focus {\n  text-decoration: none;\n  box-shadow: none;\n  border: 0;\n  outline: none;\n}\n.vce-side-grid-container.vce-posts-grid-container .vce-posts-grid-pagination .vce-posts-grid-pagination-item.vce-state--active {\n  width: 14px;\n  height: 14px;\n}\n.vce-side-grid-container.vce-posts-grid-container .vce-posts-grid-pagination-rest-items {\n  padding: 0 18px;\n}\n.vce-side-grid-container.vce-posts-grid-container .vce.vce-posts-grid-wrapper.vce-side-grid-wrapper .vce-posts-grid-pagination-item {\n    background-color: var(--paginationColor);\n}\n.vce-side-grid-container.vce-posts-grid-container .vce.vce-posts-grid-wrapper.vce-side-grid-wrapper .vce-posts-grid-pagination-item:hover {\n    background-color: var(--paginationColorHover);\n}\n.vce-side-grid-container.vce-posts-grid-container .vce.vce-posts-grid-wrapper.vce-side-grid-wrapper .vce-posts-grid-pagination-item.vce-state--active {\n    background-color: var(--paginationActiveColor);\n}\n.vce-side-grid-container.vce-posts-grid-container .vce.vce-posts-grid-wrapper.vce-side-grid-wrapper .vce-posts-grid-pagination-item.vce-state--active:hover {\n    background-color: var(--paginationActiveColorHover);\n}\n.vce-side-grid-container.vce-posts-grid-container .vce.vce-posts-grid-wrapper.vce-side-grid-wrapper .vce-posts-grid-list {\n    margin-left: calc(calc(var(--gapPx) * -1) / 2);\n    margin-right: calc(calc(var(--gapPx) * -1) / 2);\n    margin-bottom: calc(var(--gapPx) * -1);\n}\n.vce-side-grid-container.vce-posts-grid-container .vce.vce-posts-grid-wrapper.vce-side-grid-wrapper .vce-posts-grid-item {\n    padding-left: calc(var(--gapPx) / 2);\n    padding-right: calc(var(--gapPx) / 2);\n    margin-bottom: var(--gapPx);\n}\n@media (min-width: 544px) {\n    .vce-side-grid-container.vce-posts-grid-container .vce.vce-posts-grid-wrapper.vce-side-grid-wrapper .vce-posts-grid-item {\n        -webkit-flex: 0 0 calc(100% / var(--columns));\n        -ms-flex: 0 0 calc(100% / var(--columns));\n        flex: 0 0 calc(100% / var(--columns));\n    }\n}\n"},"./sidePostGrid/settings.json":function(e){"use strict";e.exports=JSON.parse('{"tag":{"access":"protected","type":"string","value":"sidePostGrid"},"relatedTo":{"type":"group","access":"protected","value":["General"]},"gap":{"type":"number","access":"public","value":"10","options":{"label":"Gap","description":"Enter the gap in pixels (example: 5)."}},"atts_excerpt":{"type":"toggle","access":"public","value":false,"options":{"label":"Custom excerpt length"}},"atts_excerpt_length":{"type":"string","access":"public","value":"","options":{"label":"Excerpt length","description":"Limit the post grid excerpt length.","placeholder":"55","onChange":{"rules":{"atts_excerpt":{"rule":"toggle"}},"actions":[{"action":"toggleVisibility"}]}}},"columns":{"type":"number","access":"public","value":"1","options":{"label":"Number of columns"}},"toggleButton":{"type":"toggle","access":"public","value":true,"options":{"label":"Show button"}},"atts_pagination":{"type":"toggle","access":"public","value":false,"options":{"label":"Enable paging","description":"Divide your post grid into pages and control the maximum number of posts per page."}},"atts_pagination_per_page":{"type":"string","access":"public","value":"10","options":{"label":"Items per page"}},"atts_pagination_color":{"type":"color","access":"public","value":"#ffce00","options":{"label":"Inactive page color"}},"atts_pagination_active_color":{"type":"color","access":"public","value":"#e6b900","options":{"label":"Active page color"}},"filtersToggle":{"type":"toggle","access":"public","value":false,"options":{"label":"Enable filters","description":"Display content by categories, tags, and other taxonomies."}},"filterItem":{"type":"element","access":"public","value":{"tag":"postGridFilter"},"options":{"category":"_postsGridFilters","label":"Filters","tooltip":"Specify what filters will be displayed within the grid.","onChange":{"rules":{"filtersToggle":{"rule":"toggle"}},"actions":[{"action":"toggleSectionVisibility"}]}}},"editFormTab1":{"type":"group","access":"protected","value":["atts_excerpt","atts_excerpt_length","atts_pagination","filtersToggle","toggleButton"],"options":{"label":"General"}},"pagination":{"type":"group","access":"protected","value":["atts_pagination_per_page","atts_pagination_color","atts_pagination_active_color"],"options":{"label":"Pagination","tooltip":"Specify how many items will be displayed within the page.","onChange":{"rules":{"atts_pagination":{"rule":"toggle"}},"actions":[{"action":"toggleSectionVisibility"}]}}},"sourceItem":{"type":"element","access":"public","value":{"tag":"postsGridDataSourcePost"},"options":{"category":"_postsGridSources","_fixElementDownload":[{"tag":"postsGrid"},{"tag":"postsGridDataSourcePost"},{"tag":"postsGridDataSourcePage"},{"tag":"postsGridDataSourceCustomPostType"},{"tag":"postsGridDataSourceListOfIds"}],"label":"Data Source","tooltip":"Specify the type of content to display in the Post grid element.","replaceView":"dropdown","merge":{"attributes":[{"key":"attsOffset","type":"string"},{"key":"attsLimit","type":"string"}]}}},"gridItem":{"type":"element","access":"public","value":{"tag":"sidePostGridItem"},"options":{"_category":"postsGridItems","tabLabel":"Grid Item","tooltip":"Modify existing parameters of a single grid item of the chosen grid element."}},"button":{"type":"element","access":"public","value":{"tag":"growShadowButton","buttonText":"Read more"},"options":{"category":"Button","tabLabel":"Button","merge":{"attributes":[{"key":"alignment","type":"string"},{"key":"buttonText","type":"string"}]},"exclude":["buttonUrl"],"onChange":{"rules":{"toggleButton":{"rule":"toggle"}},"actions":[{"action":"toggleSectionVisibility"}]}}},"designOptions":{"type":"designOptions","access":"public","value":[],"options":{"label":"Design Options"}},"advancedTab":{"type":"group","access":"protected","value":["htmlAttributes","customAttributes","customCSS"],"options":{"label":"Advanced","isSections":true}},"metaEditFormTabs":{"type":"group","access":"protected","value":["editFormTab1","filterItem","sourceItem","pagination","gridItem","button","designTab","advancedTab"]},"metaCustomId":{"type":"customId","access":"public","value":"","options":{"label":"Element ID","description":"Apply a unique ID to the element to link it directly by using #your_id (for element ID use lowercase input only)."}},"customClass":{"type":"string","access":"public","value":"","options":{"label":"Extra class name","description":"Add an extra class name to the element and refer to it from the custom CSS option."}},"htmlAttributes":{"type":"group","access":"public","value":["metaCustomId","customClass"],"options":{"label":"HTML Attributes"}},"customCSS":{"type":"group","access":"public","value":["styleEditor"],"options":{"label":"Custom CSS","tooltip":"Add custom CSS to the element using the [element-id] placeholder."}},"styleEditor":{"type":"styleEditor","access":"public","value":[],"options":[]},"customAttributes":{"type":"group","access":"public","value":["extraDataAttributes"],"options":{"label":"Custom Attributes"}},"extraDataAttributes":{"type":"string","access":"public","value":"","options":{"label":"Extra Data Attributes","description":"Add data attributes to your element (ex. data-name=\\"John Lennon\\" data-age=\\"28\\")"}},"designTab":{"type":"group","access":"protected","options":{"label":"Design","isSections":true},"value":["styleSection","designOptions"]},"styleSection":{"type":"group","access":"protected","options":{"label":"Style"},"value":["columns","gap"]}}')}},[["./sidePostGrid/index.js"]]]);