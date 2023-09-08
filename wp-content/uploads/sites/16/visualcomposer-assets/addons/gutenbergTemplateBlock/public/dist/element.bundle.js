"use strict";(self.vcvWebpackJsonp4x=self.vcvWebpackJsonp4x||[]).push([["element"],{"./addon/gutenbergTemplateBlock/index.js":function(e,t,n){var l=n("./node_modules/@babel/runtime/helpers/esm/classCallCheck.js"),a=n("./node_modules/@babel/runtime/helpers/esm/createClass.js"),o=n("./node_modules/@babel/runtime/helpers/esm/inherits.js"),r=n("./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js"),c=n("./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js"),s=n("./node_modules/react/index.js");function i(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,l=(0,c.default)(e);if(t){var a=(0,c.default)(this).constructor;n=Reflect.construct(l,arguments,a)}else n=l.apply(this,arguments);return(0,r.default)(this,n)}}var u=window.wp.element.Component,p=window.wp.data,m=p.dispatch,d=p.select,L=window.VCV_CUSTOM_TEMPLATES&&window.VCV_CUSTOM_TEMPLATES(),v=function(e){(0,o.default)(n,e);var t=i(n);function n(){return(0,l.default)(this,n),t.apply(this,arguments)}return(0,a.default)(n,[{key:"getTemplateName",value:function(e,t){if(e&&e.length)for(var n=0;n<e.length;n++){var l=e[n];if(l.group){var a=l.group.values;if(a&&a.length){var o=this.getTemplateName(a,t);if(o)return o}}else{var r=l.value||"none";if(parseInt(r)===parseInt(t))return l}}return null}},{key:"handleOpenSidebar",value:function(){m&&(d("core/edit-widgets")?m("core/interface").enableComplementaryArea("core/edit-widgets","edit-widgets/block-inspector"):m("core/edit-post").openGeneralSidebar("edit-post/block"))}},{key:"render",value:function(){var e=!1,t=this.props.attributes.vcwbTemplate||"none",n="No template chosen";if("none"!==t){var l=this.getTemplateName(L,t);n=l?"Edit '".concat(l.label,"' or choose another template"):"Chosen template not found",e=!0}return s.createElement("div",{className:"vcv-template-placeholder"},s.createElement("div",{className:"vcv-template-placeholder-head"},s.createElement("svg",{width:"60px",height:"45px",viewBox:"0 0 60 45",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},s.createElement("g",{fill:"#BFC5CB",fillRule:"nonzero"},s.createElement("path",{d:"M44.3319058,0 L30,8.37451235 L15.6680942,0 L0,9.15474642 L0,27.4707412 L30,45 L60,27.4707412 L60,9.15474642 L44.3319058,0 Z M44.3319058,3.13394018 L55.9785867,9.94148244 L44.3319058,16.7490247 L32.6788009,9.94148244 L44.3319058,3.13394018 Z M17.0107066,19.0962289 L28.6573876,12.2886866 L28.6573876,25.9037711 L17.0107066,32.7113134 L17.0107066,19.0962289 Z M31.3426124,12.2886866 L42.9892934,19.0962289 L42.9892934,32.7113134 L31.3426124,25.9037711 L31.3426124,12.2886866 Z M15.6680942,3.13394018 L27.3147752,9.94148244 L15.6680942,16.7490247 L4.02141328,9.94148244 L15.6680942,3.13394018 Z M2.67880086,25.9037711 L2.67880086,12.2886866 L14.3254818,19.0962289 L14.3254818,32.7113134 L2.67880086,25.9037711 Z M30,41.8660598 L18.3533191,35.0585176 L30,28.2509753 L41.6466809,35.0585176 L30,41.8660598 Z M57.3211991,12.2886866 L57.3211991,25.9037711 L45.6680942,32.7113134 L45.6680942,19.0962289 L57.3211991,12.2886866 Z"})))),s.createElement("div",{className:"vcv-template-placeholder-button-container"},s.createElement("button",{type:"button",className:"vcv-template-placeholder-button",onMouseDown:this.handleOpenSidebar},e?"Edit Template":"Choose Template")),s.createElement("div",{className:"vcv-template-placeholder-footer"},n))}}]),n}(u),w=window.wp.element.Fragment,f=window.wp.blockEditor.InspectorControls,h=window.wp.components.PanelBody,b=window.wp.compose.createHigherOrderComponent,g=window.wp.hooks.addFilter,E=window.VCV_CUSTOM_TEMPLATES&&window.VCV_CUSTOM_TEMPLATES();g("editor.BlockEdit","vcv-gutenberg-blocks/my-control",b((function(e){var t=function e(t){var n=[];return t&&t.length&&t.forEach((function(t,l){if(t.group){var a=t.group,o=a.values,r=a.label;o&&n.push(React.createElement("optgroup",{label:r,key:"vcwb-custom-template-group-".concat(l)},e(o)))}else{var c=t.value||"none";n.push(React.createElement("option",{value:c,key:"vcwb-custom-template-group-".concat(l,"-").concat(t.value)},t.label))}})),n};return function(n){if(a=n.name,["vcv-gutenberg-blocks/template-block"].includes(a)&&n.isSelected){var l=n.attributes.vcwbTemplate||"none";return React.createElement(w,null,React.createElement(e,n),React.createElement(f,null,React.createElement(h,{title:"Choose your template"},React.createElement("select",{name:"template-select",id:"vcwb-template-select",value:l,style:{width:"100%"},onChange:function(e){var t=e&&e.currentTarget&&e&&e.currentTarget.value;n.setAttributes({vcwbTemplate:t})}},t(E)))))}var a;return React.createElement(e,n)}}),"addMyCustomBlockControls"));var T=window.wp.element.createElement;(0,window.wp.blocks.registerBlockType)("vcv-gutenberg-blocks/template-block",{title:"Visual Composer Template Block",icon:T("svg",{width:24,height:18,viewBox:"0 0 24 18"},T("path",{d:"M17.7327623,0 L12,3.34980494 L6.26723769,0 L0,3.66189857 L0,10.9882965 L12,18 L24,10.9882965 L24,3.66189857 L17.7327623,0 Z M17.7327623,1.25357607 L22.3914347,3.97659298 L17.7327623,6.69960988 L13.0715203,3.97659298 L17.7327623,1.25357607 Z M6.80428266,7.63849155 L11.462955,4.91547464 L11.462955,10.3615085 L6.80428266,13.0845254 L6.80428266,7.63849155 Z M12.537045,4.91547464 L17.1957173,7.63849155 L17.1957173,13.0845254 L12.537045,10.3615085 L12.537045,4.91547464 Z M6.26723769,1.25357607 L10.9259101,3.97659298 L6.26723769,6.69960988 L1.60856531,3.97659298 L6.26723769,1.25357607 Z M1.07152034,10.3615085 L1.07152034,4.91547464 L5.73019272,7.63849155 L5.73019272,13.0845254 L1.07152034,10.3615085 Z M12,16.7464239 L7.34132762,14.023407 L12,11.3003901 L16.6586724,14.023407 L12,16.7464239 Z M22.9284797,4.91547464 L22.9284797,10.3615085 L18.2672377,13.0845254 L18.2672377,7.63849155 L22.9284797,4.91547464 Z"})),category:"layout",attributes:{vcwbTemplate:{type:"string"}},edit:v,save:function(){return null}})}},[["./addon/gutenbergTemplateBlock/index.js"]]]);