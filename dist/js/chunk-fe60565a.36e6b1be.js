(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fe60565a"],{"159b":function(t,e,n){var r=n("da84"),i=n("fdbc"),c=n("17c2"),o=n("9112");for(var a in i){var u=r[a],l=u&&u.prototype;if(l&&l.forEach!==c)try{o(l,"forEach",c)}catch(d){l.forEach=c}}},"17c2":function(t,e,n){"use strict";var r=n("b727").forEach,i=n("a640"),c=n("ae40"),o=i("forEach"),a=c("forEach");t.exports=o&&a?[].forEach:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}},"1dde":function(t,e,n){var r=n("d039"),i=n("b622"),c=n("2d00"),o=i("species");t.exports=function(t){return c>=51||!r((function(){var e=[],n=e.constructor={};return n[o]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},4160:function(t,e,n){"use strict";var r=n("23e7"),i=n("17c2");r({target:"Array",proto:!0,forced:[].forEach!=i},{forEach:i})},"691c":function(t,e,n){},"99af":function(t,e,n){"use strict";var r=n("23e7"),i=n("d039"),c=n("e8b5"),o=n("861d"),a=n("7b0b"),u=n("50c4"),l=n("8418"),d=n("65f0"),s=n("1dde"),f=n("b622"),p=n("2d00"),h=f("isConcatSpreadable"),m=9007199254740991,v="Maximum allowed index exceeded",g=p>=51||!i((function(){var t=[];return t[h]=!1,t.concat()[0]!==t})),b=s("concat"),T=function(t){if(!o(t))return!1;var e=t[h];return void 0!==e?!!e:c(t)},E=!g||!b;r({target:"Array",proto:!0,forced:E},{concat:function(t){var e,n,r,i,c,o=a(this),s=d(o,0),f=0;for(e=-1,r=arguments.length;e<r;e++)if(c=-1===e?o:arguments[e],T(c)){if(i=u(c.length),f+i>m)throw TypeError(v);for(n=0;n<i;n++,f++)n in c&&l(s,f,c[n])}else{if(f>=m)throw TypeError(v);l(s,f++,c)}return s.length=f,s}})},b6f6:function(t,e,n){"use strict";var r=n("691c"),i=n.n(r);i.a},c3fc:function(t,e,n){"use strict";n.d(e,"c",(function(){return i})),n.d(e,"f",(function(){return c})),n.d(e,"d",(function(){return o})),n.d(e,"e",(function(){return a})),n.d(e,"b",(function(){return u})),n.d(e,"a",(function(){return l})),n.d(e,"g",(function(){return d}));n("99af");var r=n("e799");function i(t){return r["a"].get(t)}function c(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:7;return r["a"].get("".concat(t,"?content=").concat(e,"&pageId=").concat(n,"&pageSize=").concat(i))}function o(t,e){return r["a"].get("".concat(t,"?content=").concat(e))}function a(t,e,n,i,c,o,a){var u=[e,n,i,c,o,a];return r["a"].post(t,u)}function u(t,e){return r["a"].get(t+"?id="+e)}function l(t,e){return r["a"].get(t+"?articleId="+e)}function d(t,e,n,i,c,o){var a=[e,n,i,c,o];return r["a"].post(t,a)}},f90c:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"ReadArticle"},domProps:{innerHTML:t._s(t.article.articleContent)},on:{contextmenu:function(e){return e.stopPropagation(),e.preventDefault(),t.showMenu(e)}}})},i=[],c=(n("4160"),n("159b"),n("9e1f"),n("450d"),n("6ed5")),o=n.n(c),a=(n("96cf"),n("1da1")),u=n("c3fc"),l={props:{articleCotent:{type:String,default:"文章内容不存在~"}},data:function(){return{article:this.articleCotent,articleH:68}},created:function(){},mounted:function(){this.readArticle(this.$route.params.Id)},beforeDestroy:function(){this.deleteArticleNav(),window.removeEventListener("scroll",this.changeTitleNavTop),setTimeout((function(){}),100)},methods:{deleteArticleNav:function(){var t=document.getElementById("ArticleTitleNav");t&&document.body.removeChild(t)},changeTitleNavTop:function(t){var e=document.getElementById("ArticleTitleNav"),n=this.articleH,r=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;if(r>n)e.style["top"]=0;else{var i=n-r;e.style["top"]=i+"px"}},createArticleTitleNav:function(t){var e=document.getElementById("ArticleTitleNav");e&&document.body.removeChild(e),e=document.createElement("nav"),e.setAttribute("id","ArticleTitleNav"),e.setAttribute("style","\n                position: fixed;\n                margin: 10px;\n                top:  ".concat(this.articleH,"px;\n                right: 0;\n                width: 220px;\n                box-shadow: 0px 0px 5px 5px rgb(146,146,144);\n                background:white;\n            "));var n=t.getElementsByTagName("*"),r=[];n.forEach((function(t){var e=t.nodeName;"H"===e[0]&&r.push(t)}));var i=0;r.forEach((function(t){var n=document.createElement("li");n.setAttribute("style"," margin:10px 0; ");var r=document.createElement("a");t.setAttribute("id","title_go"+i),r.setAttribute("href","#title_go"+i),r.innerText=t.innerText,n.appendChild(r),e.appendChild(n),i++})),window.addEventListener("scroll",this.changeTitleNavTop,!1),document.body.appendChild(e)},readArticle:function(t){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,Object(u["b"])("/Article/find",t).then((function(t){e.article=t.data})).catch((function(t){console.log(t)}));case 2:e.createArticleTitleNav(document.getElementById("ReadArticle"));case 3:case"end":return n.stop()}}),n)})))()},showMenu:function(t){var e=this,n=document.createElement("ul");n.setAttribute("id","HpNavItem_menu"),n.style["left"]=t.pageX-10+"px",n.style["top"]=t.pageY-10+"px",n.addEventListener("mouseleave",(function(t){n.parentNode.removeChild(n)}));var r=document.createElement("li");r.addEventListener("click",(function(){e.$router.push("/CreateArticle")}),!1),r.setAttribute("class"," g-navHref"),r.innerText="创建文章";var i=document.createElement("li");i.addEventListener("click",(function(){var t=e.$route.params.Id;e.$router.push("/EditArticle/"+t)}),!1),i.setAttribute("class"," g-navHref"),i.innerText="编辑文章";var c=document.createElement("li");c.addEventListener("click",(function(){o.a.confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var t=e.$route.params.Id;Object(u["a"])("/Article/delete",t).then((function(t){e.$router.push("/")}))})).catch((function(){}))}),!1),c.setAttribute("class"," g-navHref"),c.innerText="删除",n.appendChild(c),n.appendChild(i),n.appendChild(r),document.body.appendChild(n)}},deleteArticle1:function(t){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,Object(u["a"])("/Article/delete",t).then((function(t){e.$router.push("/")}));case 2:case"end":return n.stop()}}),n)})))()},watch:{$route:function(t,e){this.readArticle(this.$route.params.Id)}}},d=l,s=(n("b6f6"),n("2877")),f=Object(s["a"])(d,r,i,!1,null,"41304516",null);e["default"]=f.exports},fdbc:function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);
//# sourceMappingURL=chunk-fe60565a.36e6b1be.js.map