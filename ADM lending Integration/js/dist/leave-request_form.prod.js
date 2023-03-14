"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var MyQueue=[];function ShowMyMessage(e,t){function i(){0==$(".MyAlertsClass").length&&setTimeout(function(){var e,t,n,a,o,r;0!=MyQueue.length&&(e=MyQueue[0][0],t=MyQueue[0][1],n=String.fromCharCode.apply(null,Date.now().toString().split("").map(function(e){return parseInt(e)+65})),a=$("<div/>",{id:n,class:"modal fade MyAlertsClass",role:"dialog","aria-hidden":"true"}),o=$("<div/>",{class:"modal-dialog"}),(r=$("<div/>",{class:"alert alert-"+t})).append(e),o.append(r),a.append(o),$("body").append(a),$("#"+n).modal("show"),$("#"+n).on("hidden.bs.modal",function(e){$("#"+n).remove(),i()}),MyQueue.shift())},500)}t=t||"light",MyQueue.push([e,t]),1==MyQueue.length&&i()}function clickFix(){$(".irs").on("click",function(e){var t,n,a,o,r=$(this).offset(),i=e.pageX-r.left,s=e.pageY-r.top;$(this).next().data("ionRangeSlider")&&(s>$(this).height()/2+25||(!(t=$(this).next().data("ionRangeSlider").options.values.length)||(n=$(this).width())&&(a=Math.ceil(i*(t-1)/n-.5),(o=$(this).next()).is(e.target)||0!==o.has(e.target).length||($(o).data("ionRangeSlider").update({from:a}),console.log(a)))))})}$(document).ready(function(){var r=document.querySelector(".hamburger"),i=document.querySelector(".menu"),e=document.querySelector(".scrollcontent"),t=document.querySelector(".menu-top_arrow");document.querySelectorAll(".menu-item"),document.querySelectorAll(".menu-link"),document.querySelector("body"),document.querySelector(".header-logo");function n(){i.classList.add("menu-active"),e.classList.add("scrollcontent_active"),$(".hamburger").css("opacity","0")}function s(){i.classList.remove("menu-active"),e.classList.remove("scrollcontent_active"),$(".hamburger").css("opacity","1")}function b(e,t,n){var a,o;e&&(n=n||"html, body",(a=$(n)).on("mousedown wheel DOMMouseScroll mousewheel keyup touchmove",function(){a.stop()}),!1!==(o=function(e,t){try{var n=document.querySelector(e),a=document.querySelector(t);if(!n||!a)return!1;for(var o=0;n&&!n.isEqualNode(a);)o+=n.offsetTop,n=n.offsetParent;return o}catch(e){return!1}}(e,n))?a.animate({scrollTop:o-30},t,function(){a.off("mousedown wheel DOMMouseScroll mousewheel keyup touchmove")}):a.off("mousedown wheel DOMMouseScroll mousewheel keyup touchmove"))}r.addEventListener("click",function(e){($(i).hasClass("menu-active")?s:n)()}),document.addEventListener("click",function(e){var t=e.target,n=t==i||i.contains(t),a=t==r,o=i.classList.contains("menu-active");n||a||!o||s()}),t.addEventListener("click",function(e){e.stopPropagation(),s()}),$(".btn-scroll").click(function(){b($(this).attr("href"),1500),$(window).width()<=845&&s()}),$(function(){$(".btn-scroll").click(function(){$(".btn-scroll").not(this).removeClass("active-anchor"),$(this).toggleClass("active-anchor")})}),$(window).scroll(function(){var t=$(window).scrollTop();$("section").each(function(e){$(this).position().top<=t&&($(".btn-scroll").not(this).removeClass("active-anchor"),$(".btn-scroll").eq(e).addClass("active-anchor"))})}),jQuery(function(e){e("#user-phone").inputmask({mask:"+7 (999) 999-99-99",showMaskOnHover:!1}),e("#user-phone-modal").inputmask({mask:"+7 (999) 999-99-99",showMaskOnHover:!1}),e("#user-phone_packForm").inputmask({mask:"+7 (999) 999-99-99",showMaskOnHover:!1})});for(var a=document.querySelectorAll(".Flying_Placeholder"),o=0;o<a.length;o++)!function(e){var t=a[e].querySelector("label"),n=a[e].querySelector("input, textarea, select");$(t).click(function(e){n.focus()}),$(n).on("focus",function(){$(t).addClass("focus")}),$(n).on("blur",function(){$(this).val()&&0!=$(this).val().trim().length||$(t).removeClass("focus")}),$(n).on("change",function(){$(n).val()&&0!=$(n).val().trim().length?$(t).addClass("focus"):$(t).removeClass("focus")}),$(n).val()&&0!=$(n).val().trim().length?$(t).addClass("focus"):$(t).removeClass("focus")}(o);function c(e){var t,n,o,r;if(arguments.length<1)return 1;for(t=1,n=arguments.length;t<n;t++)if(o=[],r=[],!function e(t,n){var a;if(isNaN(t)&&isNaN(n)&&"number"==typeof t&&"number"==typeof n)return 1;if(t===n)return 1;if("function"==typeof t&&"function"==typeof n||t instanceof Date&&n instanceof Date||t instanceof RegExp&&n instanceof RegExp||t instanceof String&&n instanceof String||t instanceof Number&&n instanceof Number)return t.toString()===n.toString();if(t instanceof Object&&n instanceof Object&&!t.isPrototypeOf(n)&&!n.isPrototypeOf(t)&&t.constructor===n.constructor&&t.prototype===n.prototype&&!(-1<o.indexOf(t)||-1<r.indexOf(n))){for(a in n){if(n.hasOwnProperty(a)!==t.hasOwnProperty(a))return;if(_typeof(n[a])!==_typeof(t[a]))return}for(a in t){if(n.hasOwnProperty(a)!==t.hasOwnProperty(a))return;if(_typeof(n[a])!==_typeof(t[a]))return;switch(_typeof(t[a])){case"object":case"function":if(o.push(t),r.push(n),!e(t[a],n[a]))return;o.pop(),r.pop();break;default:if(t[a]!==n[a])return}}return 1}}(e,arguments[t]))return;return 1}$(window).on("swipeleft",function(e){e.stopPropagation(),s()}),$(window).on("swiperight",function(e){e.stopPropagation(),n()}),$(document).ready(function(){$(".table_accordion_header_1").click(function(){$(".table_accordion_body_1").slideToggle(500),"none"==$(this).find(".table_accordion_btn .fa-chevron-down").css("display")?($(this).find(".table_accordion_btn .fa-chevron-down").css("display","block"),$(this).find(".table_accordion_btn .fa-chevron-up").css("display","none")):($(this).find(".table_accordion_btn .fa-chevron-down").css("display","none"),$(this).find(".table_accordion_btn .fa-chevron-up").css("display","block"))})}),$(document).ready(function(){$(".table_accordion_header_2").click(function(){$(".table_accordion_body_2").slideToggle(500),"none"==$(this).find(".table_accordion_btn .fa-chevron-down").css("display")?($(this).find(".table_accordion_btn .fa-chevron-down").css("display","block"),$(this).find(".table_accordion_btn .fa-chevron-up").css("display","none")):($(this).find(".table_accordion_btn .fa-chevron-down").css("display","none"),$(this).find(".table_accordion_btn .fa-chevron-up").css("display","block"))})}),$(document).ready(function(){$(".table_accordion_header_3").click(function(){$(".table_accordion_body_3").slideToggle(500),"none"==$(this).find(".table_accordion_btn .fa-chevron-down").css("display")?($(this).find(".table_accordion_btn .fa-chevron-down").css("display","block"),$(this).find(".table_accordion_btn .fa-chevron-up").css("display","none")):($(this).find(".table_accordion_btn .fa-chevron-down").css("display","none"),$(this).find(".table_accordion_btn .fa-chevron-up").css("display","block"))})}),$(document).ready(function(){$(window).width()<767?$(".table_accordion_body").css("display","none"):$(".table_accordion_body").css("display","block")}),Array.prototype.unique=function(){for(var e=this.concat(),t=0;t<e.length;++t)for(var n=t+1;n<e.length;++n)c(e[t],e[n])&&e.splice(n--,1);return e};Array.prototype.unique=function(){for(var e=this.concat(),t=0;t<e.length;++t)for(var n=t+1;n<e.length;++n)c(e[t],e[n])&&e.splice(n--,1);return e};var Y,l,d=[];function u(){0==d.length&&$(".my_file_upload").val(""),0==d.length?$(".upload-button").html("Прикрепить файл с перечнем услуг/товаров"):$(".upload-button").html("Добавить файл с перечнем услуг/товаров"),$(".preloads").empty();for(var e=0;e<d.length;e++)!function(e){var t=$("<div/>",{class:"p_text"}),n=$("<div/>",{class:"p_close",ind:e}),a=$("<div/>",{class:"p_preview"}),o=$("<div/>",{class:"p_item"});t.append(d[e].name);var r=new FileReader;r.onload=function(e){$(a).css("background-image","url("+e.target.result+")")},r.readAsDataURL(d[e]),n.append("×"),n.click(function(e){d.splice(e.target.getAttribute("ind"),1),u()}),o.append(t),o.append(a),o.append(n),$(".preloads").append(o)}(e)}function f(e,t){var n=this,p="S3_OptionsWrap",h="S3_Option",a="S3_MainDisplay",o="S3_Arrow",r="S3_MainDisplay_n_ArrowWrap",i="S3_Placeholder",m="S3_EachValueWrapper",v="hide",l=!1,s=!1,c=!0,d=!0,_=!1,y=!1,u="";function f(e,t){var n,a,o=(o=e.outerHTML.replace(/(\r\n|\n|\r)/gm,"")).replace(/^<([a-z]*)(.*?)>(.*)<\/\1>$/gi,"<"+t+"$2>$3</"+t+">");return n=o,(a=document.createElement("div")).innerHTML=n,a.childNodes}t&&(t.optionsWrapClass&&(p=t.optionsWrapClass),t.mainDisplayClass&&(a=t.mainDisplayClass),t.arrowClass&&(o=t.arrowClass),t.mDisplay_n_ArrowWrapClass&&(r=t.mDisplay_n_ArrowWrapClass),t.placeholderClass&&(i=t.placeholderClass),t.eachValueWrapperClass&&(m=t.eachValueWrapperClass),t.hiddenOptionsWrapClass&&(v=t.hiddenOptionsWrapClass),l=!0===t.multipleChoiсe,s=!0===t.allowNullChoice,c=!1!==t.focusWhenHover,d=!1!==t.hideOnDisplayClick,_=!0===t.hidePlaceholderWhenShow,y=!0===t.addEachValueAsDiv,t.placeholderText&&(u=t.placeholderText));var g=e,$=f(g,"div");Y($).attr("select3","");var b=Y($).find("option");Y($).empty();var k=document.createElement("div");Y(k).attr("class",a),Y(k).attr("tabindex",0);var w=document.createElement("div");Y(w).attr("class",p);var S=document.createElement("div");Y(S).attr("class",i),Y(S).append(u);var C=document.createEvent("Event");C.initEvent("select3ValueChanged",!0,!0);var x=document.createEvent("Event");x.initEvent("select3Shown",!0,!0);var q=document.createEvent("Event");q.initEvent("select3Hidden",!0,!0);var M=[];function A(e){var t,n;e<0||e>b.length-1||(t="."+p+" ."+h+"[select3-index = '"+(e+1)+"']",(n=Y($).find(t)[0])&&(D(n),!1===H&&O(e)))}function O(e){var t;e<0||e>b.length-1||(t="."+p+" ."+h+"[select3-index = '"+(e+1)+"']",Y($).find(t)[0].focus())}n.CheckOnIndex=function(e){A(e)};var E="";function z(){var e="",t="",n=[],a=[],o=M.slice(0);o.sort(function(e,t){return e-t});for(var r=0;r<o.length;r++){var i,s,c=o[r],l="."+p+" ."+h+"[select3-index = '"+(c+1)+"']",d=Y($).find(l)[0];Y(d).hasClass(v)||(e+=""==e?d.innerHTML:", "+d.innerHTML,s="undefined"!=_typeof(i=Y(d).attr("value"))&&0!=i?i:d.innerHTML,t+=""==t?s:", "+s,n.push(s),a.push(c))}if(E=t,Y(k).empty(),Y(k).attr("value",""),y)for(var u=0;u<n.length;u++){var f=document.createElement("div");Y(f).attr("class",m),Y(f).attr("select3-option-index",a[u]+1),Y(f).append(n[u]),Y(k).append(f)}else Y(k).append(e);Y(k).attr("value",t),$.data("select3-value",t),!1===_&&Y(S).removeClass(v),(t||e)&&Y(S).addClass(v)}n.Value=function(){return E};var T=null;function D(e){var t,n,a;Y(e).hasClass(v)||-1!=(n="undefined"!=_typeof(t=Y(e).attr("select3-index"))&&0!=t?t-1:-1)&&(0==(a=0==M.length||-1==M.indexOf(n))?(!0===s||!0===l&&1<M.length)&&(Y(e).removeAttr("checked"),M.splice(M.indexOf(n),1),z(),j(),$[0].dispatchEvent(C)):1==a&&(!1===l&&Y(e).parent().children().removeAttr("checked"),e.setAttribute("checked",""),!1===l&&(M=[]),M.push(n),z(),j(),$[0].dispatchEvent(C)))}for(var Z=0;Z<b.length;Z++){var P=f(b[Z],"div");Y(P).addClass(h),Y(P).attr("select3-option","true"),Y(P).attr("tabindex",0),Y(P).attr("select3-index",Z+1),Y(P).on("focus",function(){T=this}),c&&Y(P).on("mouseenter",function(){this.focus()});var F=Y(P).attr("value");"undefined"!=_typeof(F)&&0!=F||Y(P).attr("value",P[0].innerHTML),Y(P).on("click",function(){D(this)}),Y(w).append(P)}var L=document.createElement("div");Y(L).attr("class",r);var H,N=document.createElement("div");function W(){var e=!1!==H;H=!1,Y(w).removeClass(v),Y(N).removeClass(v),Y(k).removeClass(v),O(0==M.length?0:M[M.length-1]),!0===_&&Y(S).addClass(v),!0==e&&$[0].dispatchEvent(x)}function j(){var e=!0!==H;H=!0,Y(w).addClass(v),Y(N).addClass(v),Y(k).addClass(v),!0==e&&$[0].dispatchEvent(q),!0===_&&(E||Y(S).removeClass(v))}function I(){(1==H?W:j)()}Y(N).attr("class",o),Y(L).append(N),Y(L).append(S),n.Show=function(){W()},n.Hide=function(){j()},n.Toggle=function(){I()},n.OptsCount=function(){return b.length},n.SelectedIndex=function(){if(!1===l){var e="."+p+" ."+h+"[checked]",t=Y($).find(e)[0];if(!t)return-1;var n=Y(t).attr("select3-index");return"undefined"!=_typeof(n)&&0!=n?n-1:-1}if(!0===l){var a="."+p+" ."+h+"[checked]",o=Y($).find(a);if(0==o.length)return[];for(var r=[],i=0;i<o.length;i++){var s=o[i],c=Y(s).attr("select3-index");"undefined"!=_typeof(c)&&0!=c&&r.push(c-1)}return r}},n.HideOnIndex=function(e){var t,n,a,o;(t=e)<0||t>b.length-1||(n="."+p+" ."+h+"[select3-index = '"+(t+1)+"']",(a=Y($).find(n)[0])&&("undefined"!=_typeof(o=Y(a).attr("checked"))&&0!=o?(Y(a).addClass(v),Y(a).removeAttr("checked"),z(),$[0].dispatchEvent(C)):Y(a).addClass(v)))},n.ShowOnIndex=function(e){var t,n,a;(t=e)<0||t>b.length-1||(n="."+p+" ."+h+"[select3-index = '"+(t+1)+"']",(a=Y($).find(n)[0])&&Y(a).removeClass(v))},Y(N).on("click",function(e){e.stopPropagation(),I()}),Y(L).append(k),Y($).append(L),Y($).append(w),j(),Y(L).on("click",function(){(d?I:W)()}),Y(g).parent().append($),$=Y(g).parent().find("."+r).parent(),Y(g).remove(),document.addEventListener("click",function(e){var t=e.target;t==$[0]||$[0].contains(t)||j()}),$.attr("tabindex","0"),$.on("keydown",function(e){var t,n,a;1==H?"9"==e.keyCode?(W(),e.stopPropagation(),e.preventDefault()):"13"!=e.keyCode&&"38"!=e.keyCode&&"37"!=e.keyCode&&"40"!=e.keyCode&&"39"!=e.keyCode||W():0==H&&("13"!=e.keyCode||"undefined"!=_typeof(t=Y(T).attr("select3-index"))&&0!=t&&A(t-1),"38"!=e.keyCode&&"37"!=e.keyCode||"undefined"!=_typeof(n=Y(T).attr("select3-index"))&&0!=n&&O(n-1-1),"40"!=e.keyCode&&"39"!=e.keyCode||"undefined"!=_typeof(a=Y(T).attr("select3-index"))&&0!=a&&O(a-1+1))});for(var Q="."+h+"[checked]",R=w.querySelectorAll(Q),V=0;V<R.length;V++){var J,U=R[V],X=Y(U).attr("checked");"undefined"==_typeof(X)||0==X||"undefined"!=_typeof(J=Y(U).attr("select3-index"))&&0!=J&&A(J-1)}Y($).data("select3",this)}function k(e,t,n,a){var o,r,i=document.querySelector(e);o=e,r=document.querySelector(o),$(r).removeClass("error"),$(r).parent().find(".myTooltip").remove();var s=$(i).val()||$(i).select3("value");return!(s=s?s.trim():null)||0==s.length?!t||void p(e,"обязательное поле"):!n||(n.test(s)||void p(e,a))}function p(e,t){var n=document.querySelector(e);$(n).addClass("error");var a=$("<div/>",{class:"myTooltip"});a.append(t),$(n).parent().append(a)}function h(n){return $.each(d,function(e,t){n.append("files"+e,t)}),n}$('input[type="file"]').change(function(){for(var e=0;e<this.files.length;e++)d.push(this.files[e]);d=d.unique(),$(".my_file_upload").val("123"),u()}),u(),Y=jQuery,l={init:function(e){return this.each(function(){new f(this,e)})},show:function(){return this.each(function(){var e=Y(this).data("select3");e&&e.Show()})},hide:function(){return this.each(function(){var e=Y(this).data("select3");e&&e.Hide()})},toggle:function(){return this.each(function(){var e=Y(this).data("select3");e&&e.Toggle()})},value:function(){var e=Y(this[0]).data("select3");if(e)return e.Value()},select:function(){return this.each(function(e){var t=Y(this).data("select3");t&&t.CheckOnIndex(e)})},selected:function(){var e=Y(this[0]).data("select3");if(e)return e.SelectedIndex()},hideOpt:function(e){var t=Y(this[0]).data("select3");if(t)return t.HideOnIndex(e)},showOpt:function(e){var t=Y(this[0]).data("select3");if(t)return t.ShowOnIndex(e)}},Y.fn.select3=function(e){return l[e]?l[e].apply(this,Array.prototype.slice.call(arguments,1)):"object"!==_typeof(e)&&e?void Y.error("Метод с именем "+e+" не существует для jQuery.select3"):l.init.apply(this,arguments)},$(".contact_way").select3({allowNullChoice:!0,"multipleChoiсe":!0,hidePlaceholderWhenShow:!0,addEachValueAsDiv:!0,focusWhenHover:!1,placeholderText:"Как связаться?"}),$("[type='tel']").each(function(){$(this).data("_1stFocus",!0)}),$("[type='tel']").on("focus",function(){var e;!0===$(this).data("_1stFocus")&&($(this).data("_1stFocus",!1),e=this,setTimeout(function(){$(e).parent().find(".contact_way").select3("show"),$(e).focus()},500))});var w={"leave-request":{successCallback:function(e){console.log(JSON.stringify(e));var t=e.leadid?"Номер Вашей заявки "+e.leadid+". ":"";e.leadid||console.log("Не удалось получить id лида"),ShowMyMessage("Спасибо за заявку! "+t+"В ближайшее время наш менеджер свяжется с Вами для уточнения деталей.",""),e.leadid&&$("#budget-calculation .leave-request__btn").html(t)},buttonSelector:".leave-request__btn",fields:[{post_name:"files",callback:h,callbackFormData:!0},{post_name:"my_file_upload",html_name:"my_file_upload"},{post_name:"site",html_name:"site-name",required:!0,regex:/^(http(s)?:\/\/)?([a-zA-Z0-9\u0410-\u044f\u0401\u0451]{1}[-a-zA-Z0-9\u0410-\u044f\u0401\u0451]{0,254}[a-zA-Z0-9\u0410-\u044f\u0401\u0451]{1}[.]{0,1}){1,}[.]{1}([a-zA-Z0-9\u0420\u0424\u0440\u0444]{1}[-a-zA-Z0-9\u0420\u0424\u0440\u0444]{0,6}[a-zA-Z0-9\u0420\u0424\u0440\u0444]{1}){1}([:/?#]{1}([-a-zA-Z0-9\u0410-\u044f\u0401\u0451@:%_+.~#?&/=$!*'()\[\],]{0,})){0,}$/i,errorMessage:"сайт заполнен неверно"},{post_name:"name",html_name:"user-name",required:!0},{post_name:"region",html_name:"region-name",required:!0},{post_name:"field-activity",html_name:"field-activity",required:!0},{post_name:"product",html_name:"product-name",required:!0},{post_name:"phone",html_name:"user-phone",required:!0,regex:/^(\+7|7|8)+(([0-9,\s,\-,\(,\)]){10,16})$/,errorMessage:"телефон заполнен неверно"},{post_name:"way_to_contact",html_name:"leave-request-contact_way",dependence:"user-phone"},{post_name:"comment",html_name:"site-problem",required:!1}]},"leave-request-modal":{successCallback:function(e){console.log(JSON.stringify(e));var t=e.leadid?"Номер Вашей заявки "+e.leadid+". ":"";e.leadid||console.log("Не удалось получить id лида"),ShowMyMessage("Спасибо за заявку! "+t+"В ближайшее время наш менеджер свяжется с Вами для уточнения деталей.",""),e.leadid&&$("#calculateTheCostModal .leave-request-modal__btn").html(t)},modalSelector:"#calculateTheCostModal",buttonSelector:".leave-request-modal__btn",fields:[{post_name:"files",callback:h,callbackFormData:!0},{post_name:"my_file_upload",html_name:"my_file_upload"},{post_name:"site",html_name:"site-name-modal",required:!0,regex:/^(http(s)?:\/\/)?([a-zA-Z0-9\u0410-\u044f\u0401\u0451]{1}[-a-zA-Z0-9\u0410-\u044f\u0401\u0451]{0,254}[a-zA-Z0-9\u0410-\u044f\u0401\u0451]{1}[.]{0,1}){1,}[.]{1}([a-zA-Z0-9\u0420\u0424\u0440\u0444]{1}[-a-zA-Z0-9\u0420\u0424\u0440\u0444]{0,6}[a-zA-Z0-9\u0420\u0424\u0440\u0444]{1}){1}([:/?#]{1}([-a-zA-Z0-9\u0410-\u044f\u0401\u0451@:%_+.~#?&/=$!*'()\[\],]{0,})){0,}$/i,errorMessage:"сайт заполнен неверно"},{post_name:"name",html_name:"user-name-modal",required:!0},{post_name:"region",html_name:"region-name-modal",required:!0},{post_name:"field-activity",html_name:"field-activity-modal",required:!0},{post_name:"product",html_name:"product-name-modal",required:!0},{post_name:"phone",html_name:"user-phone-modal",required:!0,regex:/^(\+7|7|8)+(([0-9,\s,\-,\(,\)]){10,16})$/,errorMessage:"телефон заполнен неверно"},{post_name:"way_to_contact",html_name:"leave-request-contact_way-modal",dependence:"user-phone-modal"},{post_name:"comment",html_name:"site-problem-modal",required:!1}]},package_form:{successCallback:function(e){console.log(JSON.stringify(e));var t=e.leadid?"Номер Вашей заявки "+e.leadid+". ":"";e.leadid||console.log("Не удалось получить id лида"),ShowMyMessage("Спасибо за заявку! "+t+"В ближайшее время наш менеджер свяжется с Вами для уточнения деталей.",""),e.leadid&&$("#ModalPackage .button.popup-form__btn").html(t)},modalSelector:"#ModalPackage",buttonSelector:".button.popup-form__btn",fields:[{post_name:"name",html_name:"user-name_packForm",required:!0},{post_name:"site",html_name:"user-linksite_packForm",required:!0,regex:/^(http(s)?:\/\/)?([a-zA-Z0-9\u0410-\u044f\u0401\u0451]{1}[-a-zA-Z0-9\u0410-\u044f\u0401\u0451]{0,254}[a-zA-Z0-9\u0410-\u044f\u0401\u0451]{1}[.]{0,1}){1,}[.]{1}([a-zA-Z0-9\u0420\u0424\u0440\u0444]{1}[-a-zA-Z0-9\u0420\u0424\u0440\u0444]{0,6}[a-zA-Z0-9\u0420\u0424\u0440\u0444]{1}){1}([:/?#]{1}([-a-zA-Z0-9\u0410-\u044f\u0401\u0451@:%_+.~#?&/=$!*'()\[\],]{0,})){0,}$/i,errorMessage:"сайт заполнен неверно"},{post_name:"mail",html_name:"user-mail_packForm",required:!0,regex:/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,errorMessage:"некорректный e-mail"},{post_name:"phone",html_name:"user-phone_packForm",required:!1,regex:/^(\+7|7|8)+(([0-9,\s,\-,\(,\)]){10,16})$/,errorMessage:"телефон заполнен неверно"},{post_name:"way_to_contact",html_name:"contact-way_packForm",dependence:"user-phone_packForm"},{post_name:"tariffs",html_name:"tariffs",required:!0}]}};for(var m in w)(function(){var g="#"+m;if(0===$(g).length)return console.log("Внутренняя ошибка. Не существует указанного в массиве forms id формы");$(g).submit(function(e){e.stopPropagation(),e.preventDefault();var t=$(this).attr("id"),n=w[t],a=!0,o=!0;for(var r in n.fields){var i,s,c=n.fields[r];c&&c.html_name&&(i=c.html_name,s=g+" [name='"+i+"']",(c.required||c.regex)&&(k(s,c.required,c.regex,c.errorMessage)||(a=!1,o&&(o=!1,b(s,500,n.modalSelector+" .modal-dialog")))))}if(a){var l=new FormData;for(var r in n.fields){var d,u,f,p,h=n.fields[r];if(h&&h.post_name){if(h.dependence){var m=h.dependence,v=g+" [name='"+m+"']",_=$(v).is(":checkbox")&&$(v).is(":checked").toString()||!$(v).is(":checkbox")&&$(v).val()||$(v).select3("value");if(!_||0==_.length)continue}if(!h.html_name&&!h.callback)return void console.log("Ошибка. Нужно указать или html_name, или callback. Не указано ни то, ни другое");if(h.html_name&&h.callback)return void console.log("Ошибка. Нужно указать или html_name или callback. Но указаны оба");h.callback?h.callbackFormData?l=h.callback(l):(d=h.callback())&&l.append(h.post_name,d):h.html_name&&(u=h.html_name,f=g+" [name='"+u+"']",(p=(p=$(f).is(":checkbox")&&$(f).is(":checked").toString()||!$(f).is(":checkbox")&&$(f).val()||$(f).select3("value"))&&p.toString().trim())&&l.append(h.post_name,p))}}l.append("formId",t),l.append("c",S[t]),l.append("k",C[t]);var y=$(this).find(n.buttonSelector);$(y).html("Форма отправлена"),$(y).prop("disabled",!0),$.ajax({type:"POST",url:"./ajax/rest.php",data:l,cache:!1,processData:!1,contentType:!1,dataType:"json",success:function(e){if("true"!=e.success)return"false"==e.success?(console.log(JSON.stringify(e)),"external_error"==e.error_type&&ShowMyMessage(e.error_message,"danger"),$(y).html("Отправить заявку"),void $(y).prop("disabled",!1)):void console.log("Не удалось распознать ответ сервера: \n"+JSON.stringify(e));n.successCallback(e)},error:function(e,t,n){$(y).html("Отправить заявку"),$(y).prop("disabled",!1),ShowMyMessage("Не удалось отправить заявку. Попробуйте еще раз через некоторое время или свяжитесь с нами по контактному номеру","danger"),console.log("ajaxError xhr:",e),console.log("ajaxError status:",t),console.log("ajaxError error:",n);var a="Ошибка выполнения запроса: \n["+e.status+" "+t+"] "+n+" \n "+e.responseText+"<br>"+e.responseJSON;console.log("ajaxError:",a)}})}})})();var S=[],C=[];for(var m in w){var v="#"+m;if(0===$(v).length)return void console.log("Внутренняя ошибка. Не существует указанного в массиве forms id формы");S[m]=0,document.querySelector(v).addEventListener("click",function(e){S[$(this).attr("id")]+=1},!0),C[m]=0,document.querySelector(v).addEventListener("keydown",function(e){C[$(this).attr("id")]+=1},!0)}function _(){var e=$("#tariffs").data("from");void 0!==("undefined"==typeof data?"undefined":_typeof(data))&&void 0!==_typeof(data.tariffs)&&void 0!==_typeof(data.tariffs[e])&&void 0!==_typeof(data.tariffs[e].name)&&data.tariffs[e].name}$("#tariffs").ionRangeSlider({skin:"big",grid:!0,values:function(){for(var e=[],t=0;t<data.tariffs.length;t++)e.push(data.tariffs[t].name);return e}(),onStart:clickFix,onUpdate:clickFix}),_(),$("#tariff").on("change",function(){_()})}).scroll(),$(document).ready(function(){var t,n;t="tariffId",n="#tariffs",$(document).ready(function(){$(".button-table").click(function(){var e=$(this).attr(t);$(n).data("is-programmatically-set",!0),$(n).data("ionRangeSlider").update({from:e})})})});