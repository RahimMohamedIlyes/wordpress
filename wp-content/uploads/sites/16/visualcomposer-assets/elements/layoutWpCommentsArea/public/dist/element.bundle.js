(self.vcvWebpackJsonp4x=self.vcvWebpackJsonp4x||[]).push([["element"],{"./layoutWpCommentsArea/index.js":function(n,e,t){"use strict";var o=t("./node_modules/vc-cake/index.js"),c=t("./node_modules/@babel/runtime/helpers/esm/extends.js"),m=t("./node_modules/@babel/runtime/helpers/esm/classCallCheck.js"),a=t("./node_modules/@babel/runtime/helpers/esm/createClass.js"),s=t("./node_modules/@babel/runtime/helpers/esm/get.js"),v=t("./node_modules/@babel/runtime/helpers/esm/inherits.js"),r=t("./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js"),i=t("./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js"),l=t("./node_modules/react/index.js"),d=t("./node_modules/lodash/lodash.js");function p(n){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(n){return!1}}();return function(){var t,o=(0,i.default)(n);if(e){var c=(0,i.default)(this).constructor;t=Reflect.construct(o,arguments,c)}else t=o.apply(this,arguments);return(0,r.default)(this,t)}}var u=function(n){(0,v.default)(t,n);var e=p(t);function t(n){var o;return(0,m.default)(this,t),(o=e.call(this,n)).delayedShortcodeUpdate=(0,d.debounce)(o.updateShortcodeElement,500),o.vcvComments=l.createRef(),o}return(0,a.default)(t,[{key:"updateShortcodeElement",value:function(){this.vcvComments&&this.vcvComments.current&&(0,s.default)((0,i.default)(t.prototype),"updateShortcodeToHtml",this).call(this,"[vcwb_layout_comments_area]",this.vcvComments.current)}},{key:"componentDidMount",value:function(){this.vcvComments&&this.vcvComments.current&&(0,s.default)((0,i.default)(t.prototype),"updateShortcodeToHtml",this).call(this,"[vcwb_layout_comments_area]",this.vcvComments.current)}},{key:"getPlaceholder",value:function(){var n=window.VCV_I18N&&window.VCV_I18N(),e=n?n.commentsAreaPlaceholderText:"Define a comments area for a post or page layout.";return l.createElement("div",{className:"vce-layouts-wp-comments-area-placeholder"},l.createElement("svg",{className:"vcv-placeholder-wp-logo",xmlns:"http://www.w3.org/2000/svg",width:"100px",height:"100px",viewBox:"0 0 100 100",version:"1.1"},l.createElement("g",{id:"Page-1",stroke:"none",strokeWidth:"1",fill:"none",fillRule:"evenodd"},l.createElement("g",{id:"content-area-placeholder",transform:"translate(-273.000000, -163.000000)",fill:"#363636",fillRule:"nonzero"},l.createElement("g",{id:"wordpress",transform:"translate(273.000000, 163.000000)"},l.createElement("path",{d:"M29.6941966,30.6088117 L24.2181507,30.6088117 L39.1473641,73 L47.5051895,49.0087871 L41.0252832,30.6088117 L35.2475476,30.6088117 L35.2475476,26.5695214 L60.8331435,26.5695214 L60.8331435,30.6088117 L54.8416556,30.6088117 L69.7706474,73 L75.1370483,57.5953384 C82.1766977,37.8590197 69.3672869,31.7110837 69.3672869,27.306446 C69.3672869,22.9018084 72.9219986,19.3313285 77.3066895,19.3313285 C77.5439213,19.3313285 77.7742864,19.3442336 78,19.3653713 C70.5705019,12.3203096 60.5524967,8 49.5290804,8 C35.1252769,8 22.4376938,15.3750312 15,26.5695214 L29.6937536,26.5695214 L29.6937536,30.6088117 L29.6941966,30.6088117 L29.6941966,30.6088117 Z",id:"Path"}),l.createElement("path",{d:"M8,50.2960376 C8,66.2023154 16.9125177,80.0184874 30,87 L11.3089674,34 C9.17979956,39.003654 8,44.5115332 8,50.2960376 Z",id:"Path"}),l.createElement("path",{d:"M86.6159225,29 C87.2097203,32.5512272 87.0299629,36.5425868 86.1187636,40.5494805 L86.2838922,40.5494805 L85.656182,42.371246 L85.656182,42.371246 C85.2842549,43.6866904 84.8159104,45.0323025 84.2839526,46.3545009 L70,87 C83.0899291,79.9061007 92,65.899533 92,49.7771779 C92,42.222434 90.0419521,35.1328122 86.6159225,29 Z",id:"Path"}),l.createElement("path",{d:"M37,89.9939809 C41.0254069,91.2945503 45.3191742,92 49.7790905,92 C54.0330351,92 58.1367599,91.359645 62,90.1718328 L49.8797533,56 L37,89.9939809 Z",id:"Path"}),l.createElement("path",{d:"M85.3551915,14.6446178 C75.9114892,5.2008944 63.355254,0 49.9997766,0 C36.6442992,0 24.0882875,5.2008944 14.6445851,14.6446178 C5.20088279,24.0883413 0,36.6443811 0,50.0001117 C0,63.3556189 5.20088279,75.9116587 14.6445851,85.3553822 C24.0882875,94.7991056 36.6445226,100 50,100 C63.3554774,100 75.9114892,94.7991056 85.3554149,85.3553822 C94.7991172,75.9116587 100,63.3553956 100,50.0001117 C100,36.6443811 94.7988938,24.0883413 85.3551915,14.6446178 Z M49.9997766,96.4728719 C24.3746566,96.4728719 3.52712018,75.625289 3.52712018,50.0001117 C3.52712018,24.3749344 24.3746566,3.52712806 49.9997766,3.52712806 C75.6248967,3.52712806 96.4724331,24.3749344 96.4724331,50.0001117 C96.4724331,75.625289 75.6251201,96.4728719 49.9997766,96.4728719 Z",id:"Shape"}))))),l.createElement("p",{className:"vcv-placeholder-description"},e))}},{key:"render",value:function(){var n=this.props,e=n.id,t=n.atts,o=n.editor,m=t.customClass,a=t.metaCustomId,s=["vce-layouts-wp-comments-area-container"],v={};m&&s.push(m),a&&(v.id=a);var r=this.applyDO("all");return l.createElement("div",(0,c.default)({className:s.join(" ")},v,o),l.createElement("div",(0,c.default)({className:"vce vce-layouts-wp-comments-area-wrapper",id:"el-"+e},r),l.createElement("div",{className:"vcvhelper",ref:this.vcvComments,"data-vcvs-html":"[vcwb_layout_comments_area]"},this.getPlaceholder())))}}]),t}((0,o.getService)("api").elementComponent),f=(0,o.getStorage)("hubElements"),h=function(){(0,(0,o.getService)("cook").add)(t("./layoutWpCommentsArea/settings.json"),(function(n){n.add(u)}),{css:t("./node_modules/raw-loader/index.js!./layoutWpCommentsArea/styles.css"),editorCss:t("./node_modules/raw-loader/index.js!./layoutWpCommentsArea/editor.css"),mixins:{}})},g=function(){var n=f.state("elementTeasers").get(),e=n[0].elements.findIndex((function(n){return"Comments Area"===n.name}));e>-1&&n[0].elements[e]&&(n[0].elements[e].disabledOnHub=!0,f.state("elementTeasers").set(n))},b=void 0!==window.VCV_UPDATE_ACTIONS;"vcv_layouts"===(window.VCV_EDITOR_TYPE?window.VCV_EDITOR_TYPE():"default")||b?(h(),(0,o.getStorage)("settings").state("layoutType").onChange((function(n){var e,t;"postTemplate"===n?(h(),e=f.state("elementTeasers").get(),(t=e[0].elements.findIndex((function(n){return"Comments Area"===n.name})))>-1&&e[0].elements[t]&&(delete e[0].elements[t].disabledOnHub,f.state("elementTeasers").set(e))):((0,o.getStorage)("elementSettings").trigger("remove","layoutWpCommentsArea"),g())}))):f.state("elementTeasers").onChange((function n(){window.setTimeout((function(){g()}),500),f.state("elementTeasers").ignoreChange(n)}))},"./node_modules/raw-loader/index.js!./layoutWpCommentsArea/editor.css":function(n){n.exports='.vce-layouts-wp-comments-area-wrapper {\n  min-height: 1em;\n}\n\n[data-vcv-element-disable-interaction="true"].vce-layouts-wp-comments-area-container::after {\n  content: "";\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 999;\n}\n'},"./node_modules/raw-loader/index.js!./layoutWpCommentsArea/styles.css":function(n){n.exports="@import url('https://fonts.googleapis.com/css2?family=Montserrat&family=Roboto&display=swap');\n\n.vcv-comments-area#vcv-comments {\n  padding: 40px;\n  background-color: #f4f4f4;\n  overflow-wrap: break-word;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  max-width: 1170px;\n  margin: auto;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .vcv-comments-title,\n.vcv-comments-area#vcv-comments .vcv-comments-container .vcv-comment-reply-title,\n.vcv-comments-area#vcv-comments .vcv-comments-container .vcv-comment-author,\n.vcv-comments-area#vcv-comments .vcv-comments-container .vcv-comment-reply a,\n.vcv-comments-area#vcv-comments .vcv-comments-container .comment-form-comment label,\n.vcv-comments-area#vcv-comments .vcv-comments-container .comment-form-author label,\n.vcv-comments-area#vcv-comments .vcv-comments-container .comment-form-email label,\n.vcv-comments-area#vcv-comments .vcv-comments-container .comment-form-url label,\n.vcv-comments-area#vcv-comments .vcv-comments-container #cancel-comment-reply-link {\n  color: #444;\n  font-family: Montserrat, sans-serif;\n  font-size: 30px;\n  font-weight: 400;\n  font-style: normal;\n  letter-spacing: 0;\n  line-height: 1.2;\n  margin: 0 0 5px 0;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .vcv-comments-subtitle,\n.vcv-comments-area#vcv-comments .vcv-comments-container .vcv-comment-metadata a,\n.vcv-comments-area#vcv-comments .vcv-comments-container .vcv-comment-metadata .vcv-comment-awaiting-moderation,\n.vcv-comments-area#vcv-comments .vcv-comments-container .vcv-comment-content p,\n.vcv-comments-area#vcv-comments .vcv-comments-container .comment-notes,\n.vcv-comments-area#vcv-comments .vcv-comments-container .comment-form textarea,\n.vcv-comments-area#vcv-comments .vcv-comments-container .comment-form input,\n.vcv-comments-area#vcv-comments .vcv-comments-container .comment-form-cookies-consent label,\n.vcv-comments-area#vcv-comments .vcv-comments-container .wpgdprc-checkbox label,\n.vcv-comments-area#vcv-comments .vcv-comments-container .logged-in-as a {\n  color: #666;\n  font-family: Roboto, sans-serif;\n  font-size: 14px;\n  font-weight: 400;\n  font-style: normal;\n  letter-spacing: 0;\n  line-height: 1.6;\n  margin: 0 0 40px 0;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .vcv-comments-list {\n  list-style: none;\n  margin: 0 0 55px 0;\n  padding: 0;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .vcv-comments-list li {\n  margin: 0;\n  padding: 25px 0 0;\n  border-top: 1px solid #ddd;\n  line-height: 1.6;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .vcv-comments-list li.comment:first-child {\n  padding-top: 0;\n  border-top: 0;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .vcv-comments-list ol {\n  border-top: 1px solid #ddd;\n  padding: 25px 0 0;\n  margin-left: 100px;\n  list-style: none;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .vcv-comment-body {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  margin-bottom: 25px;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .vcv-author-avatar img {\n  border-radius: 50%;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .vcv-author-avatar {\n  margin-top: 10px;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .vcv-comment-wrapper {\n  margin-left: 20px;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .vcv-comment-author {\n  font-size: 22px;\n  font-style: italic;\n  line-height: 1.4;\n  margin: 0;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .vcv-comment-author cite {\n  all: inherit;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .vcv-comment-author a {\n  font-size: inherit;\n  color: #2b4b80;\n  text-decoration: none;\n  transition: color .2s ease-in-out;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .vcv-comment-author a:hover {\n  color: #113b7f;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .vcv-comment-metadata {\n  font-size: 14px;\n  font-style: italic;\n  margin-bottom: 10px;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .vcv-comment-metadata a {\n  color: #777;\n  font-style: italic;\n  margin: 0;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .vcv-comment-metadata .vcv-comment-awaiting-moderation {\n  color: #777;\n  font-style: normal;\n  margin: 0 0 0 5px;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .vcv-comment-metadata a {\n  text-decoration: none;\n  box-shadow: none;\n  border-bottom: 1px solid transparent;\n  transition: all .4s ease;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .vcv-comment-metadata a:hover {\n  border-bottom-color: #777;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .logged-in-as {\n  text-align: left;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .logged-in-as a {\n  color: #2b4b80;\n  font-size: 17px;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .logged-in-as a:hover {\n  text-decoration: underline;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .vcv-comment-content p {\n  font-size: 17px;\n  margin: 0 0 30px 0;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .vcv-comment-reply a {\n  display: inline-block;\n  color: #2b4b80;\n  font-size: 17px;\n  line-height: 1.6;\n  margin: 0;\n  padding: 0;\n  text-decoration: none;\n  box-shadow: none;\n  border-bottom: 1px solid transparent;\n  transition: all .4s ease;\n  background-color: transparent;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .vcv-comment-reply a:hover {\n  border-bottom-color: #2b4b80;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .vcv-comment-reply-title {\n  line-height: 1.1;\n  margin: 0 0 3px 0;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .vcv-comment-reply-title::before {\n  display: none;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .vcv-comment-reply-title small {\n  font-size: 65%;\n  font-weight: 400;\n  line-height: 1;\n  color: #777;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .vcv-no-comments {\n  margin: 0;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .vcv-comment-reply-title #cancel-comment-reply-link,\n.vcv-comments-area#vcv-comments .vcv-comments-container .vcv-comment-reply-title #cancel-comment-reply-link:hover,\n.vcv-comments-area#vcv-comments .vcv-comments-container .vcv-comment-reply-title #cancel-comment-reply-link:focus {\n  color: #2b4b80;\n  font-size: 19.5px;\n  text-decoration: none;\n  box-shadow: none;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .comment-respond {\n  background: transparent;\n  border: none;\n  padding: 0;\n  margin: 0;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .comment-form p {\n  margin: 0 0 30px;\n  line-height: 1.6;\n  max-width: 100%;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .comment-form .comment-notes {\n  font-size: 14px;\n  margin-bottom: 25px;\n  text-align: left;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .comment-form .form-submit {\n  margin-bottom: 15px;\n  text-align: left;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .comment-form .comment-form-comment {\n  margin: 0 0 20px;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .comment-form-comment label,\n.vcv-comments-area#vcv-comments .vcv-comments-container .comment-form-author label,\n.vcv-comments-area#vcv-comments .vcv-comments-container .comment-form-email label,\n.vcv-comments-area#vcv-comments .vcv-comments-container .comment-form-url label {\n  font-size: 17px;\n  color: #666;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container span.required {\n  color: #2b4b80;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .comment-form-comment {\n  margin: 0 0 20px;\n  line-height: 1.6;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .comment-form textarea,\n.vcv-comments-area#vcv-comments .vcv-comments-container .comment-form input {\n  width: 100%;\n  padding: 10px;\n  font-size: 14px;\n  border: 1px solid #dadada;\n  box-shadow: none;\n  line-height: inherit;\n  margin: 0;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .comment-form textarea {\n  height: 170px;\n  resize: none;\n  overflow: auto;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .comment-form input {\n  padding: 0 10px;\n  height: 40px;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .comment-form input[type=\"checkbox\"] {\n  -webkit-appearance: checkbox;\n  width: auto;\n  height: auto;\n  padding: 0;\n  margin: 4px 0 0;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .comment-form input[type=\"checkbox\"]::before {\n  display: none;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .comment-form textarea:focus,\n.vcv-comments-area#vcv-comments .vcv-comments-container .comment-form input:focus {\n  border-color: #dadada;\n  outline: none;\n  outline-offset: none;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .comment-form-cookies-consent label,\n.vcv-comments-area#vcv-comments .vcv-comments-container .wpgdprc-checkbox label {\n  display: inline-block;\n  max-width: 100%;\n  margin-bottom: 5px;\n  font-weight: 700;\n  font-size: 17px;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .comment-form-cookies-consent,\n.vcv-comments-area#vcv-comments .vcv-comments-container .wpgdprc-checkbox {\n  clear: both;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .form-submit input[type=submit] {\n  display: inline-block;\n  width: auto;\n  height: auto;\n  border-radius: 0;\n  border: none;\n  background-color: #2b4b80;\n  color: #fff;\n  font-family: Montserrat, sans-serif;\n  font-size: 16px;\n  font-weight: 400;\n  font-style: normal;\n  letter-spacing: 0;\n  line-height: 1;\n  text-transform: none;\n  margin-top: 0;\n  margin-bottom: 0;\n  padding: 15px 40px;\n  cursor: pointer;\n  text-decoration: none;\n  box-shadow: none;\n  transition: background .2s ease-in-out;\n}\n\n.vcv-comments-area#vcv-comments .vcv-comments-container .form-submit input[type=submit]:hover {\n  background-color: #113b7f;\n  color: #fff;\n  text-decoration: none;\n  box-shadow: none;\n}\n\n@media only screen and (min-width: 768px) {\n  .vcv-comments-area#vcv-comments .vcv-comments-container .comment-form .comment-form-author,\n  .vcv-comments-area#vcv-comments .vcv-comments-container .comment-form .comment-form-email,\n  .vcv-comments-area#vcv-comments .vcv-comments-container .comment-form .comment-form-url,\n  .vcv-comments-area#vcv-comments .vcv-comments-container .comment-form .comment-subscription-form,\n  .vcv-comments-area#vcv-comments .vcv-comments-container .comment-form .form-submit {\n    width: 32%;\n    float: left;\n    margin-left: 2%;\n  }\n\n  .vcv-comments-area#vcv-comments .vcv-comments-container .comment-form .comment-form-author,\n  .vcv-comments-area#vcv-comments .vcv-comments-container .comment-form .form-submit {\n    margin-left: 0;\n  }\n}\n\n.vce-layouts-wp-comments-area-placeholder {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  height: 500px;\n  background-color: rgba(182, 182, 182, 0.2);\n  border-radius: 5px;\n}\n\n.vce-layouts-wp-comments-area-placeholder .vcv-placeholder-wp-logo {\n  margin: 0 0 20px;\n}\n\n.vce-layouts-wp-comments-area-placeholder .vcv-placeholder-description {\n  max-width: 380px;\n  margin: 0;\n  padding: 0 20px;\n  text-align: center;\n  letter-spacing: 1px;\n  font: italic 13px/24px 'Roboto', Arial, sans-serif;\n  color: #a3a3a3;\n}\n"},"./layoutWpCommentsArea/settings.json":function(n){"use strict";n.exports=JSON.parse('{"tag":{"type":"string","access":"protected","value":"layoutWpCommentsArea"},"designOptions":{"type":"designOptions","access":"public","value":{},"options":{"label":"Design Options"}},"editFormTab1":{"type":"group","access":"protected","value":["metaCustomId","customClass"],"options":{"label":"General"}},"metaEditFormTabs":{"type":"group","access":"protected","value":["editFormTab1","designOptions"]},"relatedTo":{"type":"group","access":"protected","value":["General"]},"customClass":{"type":"string","access":"public","value":"","options":{"label":"Extra class name","description":"Add an extra class name to the element and refer to it from the custom CSS option."}},"metaCustomId":{"type":"customId","access":"public","value":"","options":{"label":"Element ID","description":"Apply a unique ID to the element to link it directly by using #your_id (for element ID use lowercase input only)."}},"metaElementLimit":{"type":"number","access":"public","value":1},"metaDisableInteractionInEditor":{"type":"toggle","access":"protected","value":true}}')}},[["./layoutWpCommentsArea/index.js"]]]);