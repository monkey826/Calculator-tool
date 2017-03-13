var wijmo;define(["./wijmo.widget","./wijmo.wijutil"],function(){var e=this.__extends||function(e,t){function r(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);r.prototype=t.prototype,e.prototype=new r};(function(t){(function(n){var r=jQuery,i="wijaccordion",s={accordionClass:"wijmo-wijaccordion",accordionTopClass:"wijmo-wijaccordion-top",accordionBottomClass:"wijmo-wijaccordion-bottom",accordionLeftClass:"wijmo-wijaccordion-left",accordionRightClass:"wijmo-wijaccordion-right",headerClass:"wijmo-wijaccordion-header",contentClass:"wijmo-wijaccordion-content",contentActiveClass:"wijmo-wijaccordion-content-active",iconsClass:"wijmo-wijaccordion-icons",horizontalClass:"ui-helper-horizontal"},o=function(n){function i(){n.apply(this,arguments)}return e(i,n),i.prototype._setOption=function(e,t){var r=this.options;if(r[e]!==t)switch(e){case"selectedIndex":this.activate(t);break;case"event":this._unbindLiveEvents(),this.options.event=t,this._bindLiveEvents();break;case"header":this._handleHeaderChange(t,r.header);break;case"animated":break;case"expandDirection":this._onDirectionChange(t,!0,r.expandDirection);break;default:}n.prototype._setOption.call(this,e,t)},i.prototype._handleHeaderChange=function(e,t){var n=this.options.wijCSS,r=this.element.find(t),i=[n.wijaccordionHeader,s.headerClass,n.stateActive,this._triangleIconOpened].join(" "),o=[n.wijaccordionContent,s.contentClass,n.content,n.wijaccordionContentActive,s.contentActiveClass].join(" ");r.removeClass(i),r.siblings("."+s.contentClass).removeClass(o),this._initHeaders(e)},i.prototype._initHeaders=function(e){var t=this.options,n=e?e:t.header,r=this.element.find(n);r.each(jQuery.proxy(this._initHeader,this))},i.prototype._initHeader=function(e,n){var i=this.options,o=i.wijCSS,u=this.element.data(this.wijRightToLeft),a=r(n),f=r(a.next()[0]),l=[s.headerClass,o.wijaccordionHeader].join(" "),c=[o.stateDefault,o.stateActive,this._headerCornerOpened].join(" "),h=[s.contentActiveClass,o.wijaccordionContentActive,this._contentCornerOpened].join(" "),p=[o.stateDefault,o.cornerAll].join(" "),d=[s.contentClass,o.wijaccordionContent,o.content].join(" "),v;u&&(a.remove(),a.insertAfter(f)),a.addClass(l).attr("role","tab"),f.attr("role","tabpanel"),v=f.attr("style"),v&&f.data("origStyle",f.attr("style")),a.find("> a").length===0&&a.wrapInner('<a href="#"></a>'),a.find("> ."+t.getCSSSelector(o.icon)).length===0&&r("<span></span>").addClass(o.icon).insertBefore(r("> a",a)[0]),e===i.selectedIndex?(a.addClass(c).attr({"aria-expanded":"true",tabIndex:0}),a.find("> ."+t.getCSSSelector(o.icon)).addClass(this._triangleIconOpened),f.addClass(h).wijTriggerVisibility()):(a.addClass(p).attr({"aria-expanded":"false",tabIndex:-1}),a.find("> .ui-icon").addClass(this._triangleIconClosed),f.hide()),f.addClass(d);for(;;){if(a.parent().hasClass(s.accordionClass))break;a.unwrap()}},i.prototype._layout=function(){var e=this,t=e.options,n=[s.accordionClass,t.wijCSS.wijaccordion,t.wijCSS.widget,s.iconsClass,t.wijCSS.wijaccordionIcons,t.wijCSS.helperClearFix].join(" ");e.element.addClass(n),e._isDisabled()&&e.element.addClass(t.wijCSS.stateDisabled),e._onDirectionChange(t.expandDirection,!1),e._initHeaders(),e._getHeaders().length>0&&e.element.attr("role","tablist"),r(window).on("resize."+e.widgetEventPrefix,function(t){e._adjustAccordion()}),(t.expandDirection==="left"||t.expandDirection==="right")&&e._adjustAccordion(),e._getDefaultLayoutSetting(t.expandDirection)},i.prototype._initState=function(){this.wijRightToLeft="rightToLeft"},i.prototype._create=function(){window.wijmoApplyWijTouchUtilEvents&&(r=window.wijmoApplyWijTouchUtilEvents(r)),this._initState(),this._layout(),n.prototype._create.call(this)},i.prototype._init=function(){this._bindLiveEvents()},i.prototype._adjustAccordion=function(){var e=this.options,t,n,i,o,u,a;if(e.expandDirection==="top"||e.expandDirection==="bottom")return;t=this._getHeaders(),n=r("."+s.contentClass,this.element),i=n.parent().width(),o=parseInt(n.css("paddingLeft"),10)+parseInt(n.css("paddingRight"),10)+parseInt(n.css("borderRightWidth"),10)+parseInt(n.css("borderLeftWidth"),10),u=r("."+s.headerClass,this.element).outerWidth(!0),a=i-t.length*u-2-o,n.width(a)},i.prototype._getDefaultLayoutSetting=function(e){var t=r("."+s.contentClass,this.element);e==="top"||e==="bottom"?this._defaultLayoutSetting={paddingTop:t.css("paddingTop"),paddingBottom:t.css("paddingBottom")}:this._defaultLayoutSetting={paddingLeft:t.css("paddingLeft"),paddingRight:t.css("paddingRight"),width:t.width()}},i.prototype.destroy=function(){var e=this.options,t=this.element.data("rightToLeft"),i,o,u,a,f,l,c,h="";i=[e.wijCSS.wijaccordion,s.accordionClass,e.wijCSS.widget,e.wijCSS.wijaccordionIcons,e.wijCSS.helperClearFix,s.horizontalClass,this._alignmentClass,s.iconsClass,e.wijCSS.stateDisabled].join(" "),o=[s.headerClass,e.wijCSS.wijaccordionHeader,e.wijCSS.stateDefault,e.wijCSS.stateActive,e.wijCSS.cornerAll,this._headerCornerOpened].join(" "),u=[s.contentActiveClass,e.wijCSS.wijaccordionContentActive,this._contentCornerOpened,s.contentClass,e.wijCSS.wijaccordionContent,e.wijCSS.content].join(" "),this._unbindLiveEvents(),a=this._getHeaders(),r.each(a,function(e,n){f=r(n),t?(l=f.prev(),l.insertAfter(f)):l=f.next(),f.removeClass(o).removeAttr("aria-expanded").removeAttr("tabIndex").removeAttr("role"),f.attr("class")===""&&f.removeAttr("class"),c=f.find("> a").html(),f.html(c),l.show(),h=l.data("origStyle"),h?l.attr("style",h):l.removeAttr("style"),l.removeClass(u).removeAttr("role"),l.attr("class")===""&&l.removeAttr("class")}),this.element.removeClass(i).removeAttr("role"),this.element.attr("class")===""&&this.element.removeAttr("class"),r(window).off("resize.wijaccordion"),n.prototype.destroy.call(this)},i.prototype._getHeaders=function(){var e=this.options,t=this.element.data(this.wijRightToLeft),n=[],i,o,u=this.element.find(e.header);if(!(u.length>0&&!r(u[0]).hasClass(s.headerClass)&&r(u[0]).hasClass(s.contentClass)))return u;for(i=0;i<u.length;i+=1)o=t?r(u[i]).next("."+s.headerClass):r(u[i]).prev("."+s.headerClass),o.length>0&&n.push(o[0]);return r(n)},i.prototype.refresh=function(){this._adjustAccordion()},i.prototype.activate=function(e){var t=this.options,n=this._getHeaders(),i,s=r(jQuery.grep(n.get(),function(e){return r(e).hasAllClasses(t.wijCSS.stateActive)}));typeof e=="number"?i=r(n[e]):typeof e=="string"?(e=parseInt(e,0),i=r(n[e])):(i=r(e),e=n.index(e));if(i.hasAllClasses(t.wijCSS.stateDisabled))return!1;if(i.hasAllClasses(t.wijCSS.stateActive))if(t.requireOpenedPane){if(s.length===i.length&&s.index()===i.index())return!1}else s=i,i=r(null);else t.requireOpenedPane||(s=r(null));return s.length===0&&i.length===0?!1:this._activateLayout(s,i)},i.prototype._activateLayout=function(e,t){var n=this.options,r=this.element.data(this.wijRightToLeft),i,o,u=[n.wijCSS.stateActive,this._headerCornerOpened].join(" "),a=[n.wijCSS.stateDefault,n.wijCSS.cornerAll].join(" ");return i=r?t.prev("."+s.contentClass):t.next("."+s.contentClass),o=r?e.prev("."+s.contentClass):e.next("."+s.contentClass),e.removeClass(u).addClass(a).attr({"aria-expanded":"false",tabIndex:-1}).find("> .ui-icon").removeClass(this._triangleIconOpened).addClass(this._triangleIconClosed),t.removeClass("ui-corner-all").addClass(u).attr({"aria-expanded":"true",tabIndex:0}).find("> .ui-icon").removeClass(this._triangleIconClosed).addClass(this._triangleIconOpened),this._activateAnimate(i,o,e,t)},i.prototype._activateAnimate=function(e,t,n,i){var o=this.options,u,a=this._getHeaders(),f=r.wijmo.wijaccordion.animations,l=[o.wijCSS.wijaccordionContentActive,s.contentActiveClass].join(" "),c=l+" "+this._contentCornerOpened,h,p,d,v,m,g,y;return p=a.index(i),d=a.index(n),o.expandDirection==="left"||o.expandDirection==="right"?h=this._defaultLayoutSetting.width:h=parseInt(e.css("width")),this._trigger("beforeSelectedIndexChanged",null,{newIndex:p,prevIndex:d})?(o.animated?(u={toShow:e,toHide:t,complete:jQuery.proxy(function(){t.removeClass(l),e.addClass(l).wijTriggerVisibility(),t.css("display",""),e.css("display",""),this._adjustContentSize(e,h),this._trigger("selectedIndexChanged",null,{newIndex:p,prevIndex:d})},this),horizontal:this.element.hasClass(s.horizontalClass),rightToLeft:this.element.data(this.wijRightToLeft),down:p>d,autoHeight:o.autoHeight||o.fillSpace,defaultLayoutSetting:this._defaultLayoutSetting},v=o.animated,m=o.duration,r.isFunction(v)&&(o.animated=v(u)),r.isFunction(m)&&(o.duration=m(u)),g=o.duration,y=o.animated,y&&!f[y]&&!r.easing[y]&&(y="slide"),f[y]||(f[y]=function(e){this.slide(e,{easing:y,duration:g||700})}),f[y](u)):(n.length>0&&t.hide().removeClass(l),i.length>0&&e.show().addClass(c).wijTriggerVisibility(),this._adjustContentSize(e,h),this._trigger("selectedIndexChanged",null,{newIndex:p,prevIndex:d})),this.options.selectedIndex=p,!0):!1},i.prototype._adjustContentSize=function(e,t){var n=this.options;n.expandDirection==="left"||n.expandDirection==="right"?(e.css("height",""),t&&e.width(t)):e.css("width","")},i.prototype._bindLiveEvents=function(){var e=this,t=this.options,n="."+s.headerClass,i=e.widgetEventPrefix;this.element.on(t.event+"."+i,n,jQuery.proxy(this._onHeaderClick,this)).on("keydown."+i,n,jQuery.proxy(this._onHeaderKeyDown,this)).on("mouseenter."+i,n,function(){r(this).addClass(t.wijCSS.stateHover)}).on("mouseleave."+i,n,function(){r(this).removeClass(t.wijCSS.stateHover)}).on("focus."+i,n,function(){r(this).addClass(t.wijCSS.stateFocus)}).on("blur."+i,n,function(){r(this).removeClass(t.wijCSS.stateFocus)})},i.prototype._unbindLiveEvents=function(){this.element.off("."+this.widgetEventPrefix,"."+s.headerClass)},i.prototype._onHeaderClick=function(e){return this._isDisabled()||this.activate(e.currentTarget),!1},i.prototype._onHeaderKeyDown=function(e){if(this._isDisabled()||e.altKey||e.ctrlKey)return!1;if(!r.ui)return!1;var n,i=this.element.find("."+s.headerClass+"."+this.options.wijCSS.stateFocus),o,u;if(i.length<0)return!1;n=t.getKeyCodeEnum(),u=this._getHeaders(),o=r("."+s.headerClass,this.element).index(i);switch(e.keyCode){case n.RIGHT:case n.DOWN:if(u[o+1])return u[o+1].focus(),!1;break;case n.LEFT:case n.UP:if(u[o-1])return u[o-1].focus(),!1;break;case n.SPACE:case n.ENTER:this.activate(e.currentTarget),e.preventDefault()}return!0},i.prototype._onDirectionChange=function(e,t,n){typeof n=="undefined"&&(n=null);var i,o,u,a,f,l,c=this.options;t&&(o=this.element.find("."+s.headerClass+"."+this._headerCornerOpened),o.removeClass(this._headerCornerOpened),u=this.element.find("."+s.contentClass+"."+this._contentCornerOpened),u.removeClass(this._contentCornerOpened),a=this.element.find("."+this._triangleIconOpened),f=this.element.find("."+this._triangleIconClosed),a.removeClass(this._triangleIconOpened),f.removeClass(this._triangleIconClosed)),n!==null&&this.element.removeClass(s.accordionClass+"-"+n);switch(e){case"top":this._headerCornerOpened=c.wijCSS.cornerBottom,this._contentCornerOpened=c.wijCSS.cornerTop,this._triangleIconOpened=c.wijCSS.iconArrowUp,this._triangleIconClosed=c.wijCSS.iconArrowRight,i=!0,this.element.removeClass(s.horizontalClass),this._alignmentClass=[s.accordionTopClass,c.wijCSS.wijaccordionTop].join(" ");break;case"right":this._headerCornerOpened=c.wijCSS.cornerLeft,this._contentCornerOpened=c.wijCSS.cornerRight,this._triangleIconOpened=c.wijCSS.iconArrowRight,this._triangleIconClosed=c.wijCSS.iconArrowDown,i=!1,this.element.addClass(s.horizontalClass),this._alignmentClass=[s.accordionRightClass,c.wijCSS.wijaccordionRight].join(" ");break;case"left":this._headerCornerOpened=c.wijCSS.cornerRight,this._contentCornerOpened=c.wijCSS.cornerLeft,this._triangleIconOpened=c.wijCSS.iconArrowLeft,this._triangleIconClosed=c.wijCSS.iconArrowDown,i=!0,this.element.addClass(s.horizontalClass),this._alignmentClass=[s.accordionLeftClass,c.wijCSS.wijaccordionLeft].join(" ");break;default:this._headerCornerOpened=c.wijCSS.cornerTop,this._contentCornerOpened=c.wijCSS.cornerBottom,this._triangleIconOpened=c.wijCSS.iconArrowDown,this._triangleIconClosed=c.wijCSS.iconArrowRight,i=!1,this.element.removeClass(s.horizontalClass),this._alignmentClass=[s.accordionBottomClass,c.wijCSS.wijaccordionBottom].join(" ")}this.element.addClass(this._alignmentClass),l=this.element.data(this.wijRightToLeft),this.element.data(this.wijRightToLeft,i),t&&(a.addClass(this._triangleIconOpened),f.addClass(this._triangleIconClosed),o.addClass(this._headerCornerOpened),u.addClass(this._contentCornerOpened)),t&&i!==l&&this.element.children("."+s.headerClass).each(function(){var e=r(this),t;i?(t=e.next("."+s.contentClass),e.remove(),e.insertAfter(t)):(t=e.prev("."+s.contentClass),e.remove(),e.insertBefore(t))})},i}(t.wijmoWidget);n.wijaccordion=o;var u=function(){function e(){this.wijCSS={wijaccordion:"",wijaccordionTop:"",wijaccordionBottom:"",wijaccordionLeft:"",wijaccordionRight:"",wijaccordionHeader:"",wijaccordionContent:"",wijaccordionContentActive:"",wijaccordionIcons:""},this.wijMobileCSS={header:"ui-header ui-bar-a",content:"ui-body ui-body-b"},this.initSelector=":jqmData(role='wijaccordion')",this.animated="slide",this.duration=null,this.event="click",this.expandDirection="bottom",this.header="> li > :first-child,> :not(li):even",this.requireOpenedPane=!0,this.selectedIndex=0,this.beforeSelectedIndexChanged=null,this.selectedIndexChanged=null}return e}();o.prototype.options=r.extend(!0,{},t.wijmoWidget.prototype.options,new u),r.wijmo.registerWidget(i,o.prototype);var a=function(){function e(){}return e.prototype._parseWidth=function(e){var t=(""+e).match(/^([\d+-.]+)(.*)$/);return{value:t?+t[1]:0,unit:t?t[2]||"px":"px"}},e.prototype.slide=function(e,t){var n,i,s=r.wijmo.wijaccordion.animations,o=e.toShow.css("overflow"),u=0,a={},f={},l,c=e.horizontal?["width","paddingLeft","paddingRight"]:["height","paddingTop","paddingBottom"],h,p=e.toShow;e=r.extend({easing:"swing",duration:300},e,t),e.horizontal?(n={width:"show"},i={width:"hide"}):(n={height:"show"},i={height:"hide"});if(!e.toHide.length){e.toShow.stop(!0,!0).animate(n,e);return}if(!e.toShow.length){e.toHide.stop(!0,!0).animate(i,e);return}e.horizontal?(h=p[0].style.height,p.height(parseInt(p.parent().height().toString(),10)-parseInt(p.css("paddingTop"),10)-parseInt(p.css("paddingBottom"),10)-(parseInt(p.css("borderTopWidth"),10)||0)-(parseInt(p.css("borderBottomWidth"),10)||0))):(h=p[0].style.width,p.width(parseInt(p.parent().width().toString(),10)-parseInt(p.css("paddingLeft"),10)-parseInt(p.css("paddingRight"),10)-(parseInt(p.css("borderLeftWidth"),10)||0)-(parseInt(p.css("borderRightWidth"),10)||0))),r.each(c,function(t,n){f[n]="hide",!e.horizontal&&n==="height"?a[n]=s._parseWidth(e.toShow.css(n)):a[n]=s._parseWidth(e.defaultLayoutSetting[n])}),e.horizontal?l={width:0,overflow:"hidden"}:l={height:0,overflow:"hidden"},e.toShow.css(l).stop(!0,!0).show(),e.toHide.filter(":hidden").each(e.complete).end().filter(":visible").stop(!0,!0).animate(f,{step:function(t,n){var i;r.inArray(n.prop,c)&&(u=n.end-n.start===0?0:(n.now-n.start)/(n.end-n.start)),i=u*a[n.prop].value,i<0&&(i=0),e.toShow[0].style[n.prop]=i+a[n.prop].unit},duration:e.duration,easing:e.easing,complete:function(){e.autoHeight||e.toShow.css(e.horizontal?"width":"height",""),e.toShow.css(e.horizontal?"height":"width",h),r.each(["paddingLeft","paddingRight","paddingTop","paddingBottom"],function(t,n){e.toShow.css(n,"")}),e.toShow.css({overflow:o}),e.complete()}})},e.prototype.bounceslide=function(e){this.slide(e,{easing:e.down?"easeOutBounce":"swing",duration:e.down?1e3:200})},e}();r.extend(r.wijmo.wijaccordion,{animations:a.prototype})})(t.accordion||(t.accordion={}));var n=t.accordion})(wijmo||(wijmo={}))});