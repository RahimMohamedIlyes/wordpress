"use strict";(self.vcvWebpackJsonp4x=self.vcvWebpackJsonp4x||[]).push([["element"],{"./addon/exportImport/index.js":function(e,t,r){var n=r("./node_modules/react/index.js"),a=r("./node_modules/react-dom/index.js"),o=r("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),s=r("./node_modules/@babel/runtime/helpers/esm/classCallCheck.js"),i=r("./node_modules/@babel/runtime/helpers/esm/createClass.js"),c=r("./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js"),l=r("./node_modules/@babel/runtime/helpers/esm/inherits.js"),u=r("./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js"),d=r("./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js"),m=r("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),p=r("./node_modules/@babel/runtime/regenerator/index.js"),v=r.n(p);function f(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"==typeof e)return h(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return h(e,t)}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,a=function(){};return{s:a,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,s=!0,i=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return s=e.done,e},e:function(e){i=!0,o=e},f:function(){try{s||null==r.return||r.return()}finally{if(i)throw o}}}}function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function g(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=(0,d.default)(e);if(t){var a=(0,d.default)(this).constructor;r=Reflect.construct(n,arguments,a)}else r=n.apply(this,arguments);return(0,u.default)(this,r)}}var y=(0,r("./node_modules/vc-cake/index.js").getService)("dataProcessor"),b=function(e){(0,l.default)(a,e);var t,r=g(a);function a(e){var t;return(0,s.default)(this,a),t=r.call(this,e),(0,m.default)((0,c.default)(t),"getJsonFromString",(function(e){var t=e.match(/(\{"\w+".*\})/g);return!!t&&t[0]})),t.state={importing:!1,statusMessages:[],importingDone:!1,importRequestDone:!1,errorMessage:""},t.handleImportClick=t.handleImportClick.bind((0,c.default)(t)),t}return(0,i.default)(a,[{key:"componentWillUnmount",value:function(){this.serverProgressRequest.cancelled=!0,this.serverImportRequest.cancelled=!0}},{key:"handleImportClick",value:function(e){e&&e.preventDefault();var t=document.querySelector('input[name="vcv-file-id"]'),r=t&&t.value;if(r){this.setState({importing:!0}),document.querySelector(".vcv-start-import-inner").outerHTML="",this.createServerImportRequest(r);var n=this,a=window.setInterval((function(){if(void 0!==n.initialMediaUploadLength){var e=window.VCV_I18N&&window.VCV_I18N(),t=e&&e.skipImportMedia?e.skipImportMedia:"The server cannot process some media files. This can happen if the the server is busy or does not have enough resources to complete the task. Right now we skipped problem medias. But you can increase server resources and try to import again. List of medias that have issue below";if(n.initialMediaUploadLength===n.currentMediaUploadLength)n.currentMediaUploadCounter=n.currentMediaUploadLength;else if(n.currentMediaUploadCounter===n.currentMediaUploadLength&&0!==n.mediaListToProcess.length){var r,o={importRequestDone:!0},s=t,i=f(n.mediaListToProcess);try{for(i.s();!(r=i.n()).done;){s+=" <br>"+r.value.uploadPath}}catch(c){i.e(c)}finally{i.f()}o.errorMessage=s,n.setState(o),n.setState({importingDone:!0}),clearInterval(a)}else n.currentMediaUploadCounter=n.currentMediaUploadLength}}),18e4)}}},{key:"createServerImportRequest",value:function(e){var t=this;this.serverImportRequest=y.appAdminServerRequest({"vcv-action":"vcv:addon:exportImport:beginImport:adminNonce","vcv-nonce":window.vcvNonce,"vcv-time":window.vcvAjaxTime,"vcv-file-id":e}).then((function(e){if(t.serverImportRequest&&t.serverImportRequest.cancelled)t.serverImportRequest=null;else{var r;try{r=JSON.parse(e),t.templateName=r.templateName,t.templateLink=r.templateLink}catch(p){console.warn("Failed to parse, no valid json.",p);var n=t.getJsonFromString(e);r=JSON.parse(n)}var a={importRequestDone:!0},o=r&&r.message;o&&(a.errorMessage=o),t.setState(a);var s=r&&r.statusMessages;s&&t.setState({statusMessages:s});var i=window.VCV_I18N&&window.VCV_I18N(),c=i&&i.importUpdatingMediaProcess?i.importUpdatingMediaProcess:"Updating media data...",l=i&&i.importMediaUpdateLeft?i.importMediaUpdateLeft:"files left";if(0!==r.mediaListToProcess.length){t.initialMediaUploadLength=r.mediaListToProcess.length,s.push(c+' <strong class="vcv-media-update-count">'+r.mediaListToProcess.length+"</strong> "+l),t.setState({statusMessages:s}),t.mediaListToProcess=r.mediaListToProcess;var u,d=f(r.mediaListToProcess);try{for(d.s();!(u=d.n()).done;){var m=u.value;t.parallelMediaUpdate(m)}}catch(v){d.e(v)}finally{d.f()}}else t.setState({importingDone:!0})}}))}},{key:"parallelMediaUpdate",value:(t=(0,o.default)(v().mark((function e(t,r){var n=this;return v().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e){n.updateSingleMediaData(t.mediaId,t.uploadPath)}));case 2:case"end":return e.stop()}}),e)}))),function(e,r){return t.apply(this,arguments)})},{key:"updateSingleMediaData",value:function(e,t){var r=this;this.serverProgressRequest=y.appAdminServerRequest({"vcv-action":"vcv:addon:exportImport:generateAttachmentMeta:adminNonce","vcv-nonce":window.vcvNonce,"vcv-time":window.vcvAjaxTime,"vcv-media-id":e,"vcv-upload-path":t}).then((function(t){if(r.serverProgressRequest&&r.serverProgressRequest.cancelled)r.serverProgressRequest=null;else{var n=document.getElementsByClassName("vcv-media-update-count");if(n[0]){var a=parseInt(n[0].innerHTML);a-=1,n[0].innerHTML=a,0===a&&r.setState({importingDone:!0})}var o,s=f(r.mediaListToProcess);try{for(s.s();!(o=s.n()).done;){var i=o.value;e===i.mediaId&&(r.mediaListToProcess.splice(r.mediaListToProcess.indexOf(i),1),r.currentMediaUploadLength=r.mediaListToProcess.length)}}catch(c){s.e(c)}finally{s.f()}}}))}},{key:"getBackButton",value:function(){var e=window.VCV_I18N&&window.VCV_I18N(),t=e&&e.backToImport?e.backToImport:"Back to import",r=e&&e.importDoneText?e.importDoneText:"Import Done. Go to ";return n.createElement("p",{className:"description"},n.createElement("p",{className:"description"},r," ",n.createElement("a",{href:this.templateLink},this.templateName)),n.createElement("a",{href:window.vcvBackToImportLink,key:"vcvGoBackButton"},t))}},{key:"getStatusMessages",value:function(){var e=window.VCV_I18N&&window.VCV_I18N(),t=e?e.startingImportProcess:"Starting import process...",r=[];return r.push(n.createElement("p",{key:"vcvImportStatusFirstMessage",className:"description"},t)),this.state.statusMessages.forEach((function(e,t){r.push(n.createElement("p",{key:"vcvImportStatusMessage".concat(t),className:"description",dangerouslySetInnerHTML:{__html:e}}))})),this.state.errorMessage&&r.push(n.createElement("p",{key:"vcvImportErrorMessage",className:"description"},n.createElement("strong",{dangerouslySetInnerHTML:{__html:this.state.errorMessage}}))),this.state.importingDone&&r.push(this.getBackButton()),r}},{key:"render",value:function(){var e=window.VCV_I18N&&window.VCV_I18N(),t=e?e.continueImport:"Continue importing",r=n.createElement(n.Fragment,null,n.createElement("p",{className:"submit"},n.createElement("input",{type:"submit",name:"submit",id:"vcv-submit",className:"button vcv-dashboard-button vcv-dashboard-button--save vcv-dashboard-button--inline",value:t,onClick:this.handleImportClick})));return this.state.importing?this.getStatusMessages():r}}]),a}(n.Component),I=document.querySelector("#vcv-import-container");I&&a.render(n.createElement(b,null),I)}},[["./addon/exportImport/index.js"]]]);