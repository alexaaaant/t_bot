!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const r="https://www.the-village.ru";function o(e){fetch(e).then(e=>e.text()).then(e=>{(new DOMParser).parseFromString(e,"text/html")}).catch(e=>console.log(e))}var l={getArticles:function(e,t){fetch(`${r}/village/${e}`).then(e=>e.text()).then(n=>{let l=(new DOMParser).parseFromString(n,"text/html").getElementsByClassName("post-block-featured");l=[...l].slice(0,t);const c=new Map;l.forEach(e=>{const t=e.firstChild,n=t.children[1].firstChild.textContent;c.set(n,{link:`${r}${t.pathname}`,preamble:t.children[1].lastChild.textContent})});const s=document.getElementsByClassName("articles")[0];c.forEach((e,t)=>{const n=document.createElement("button");n.innerText=t,n.className="articles__item",n.onclick=()=>o(e.link),s.appendChild(n)}),document.getElementsByClassName("theme")[0].innerText=e}).catch(e=>console.log(e))},getArticle:o};const c="https://api.telegram.org/bot1048191428:AAE9Jn95v7z68Q5Nx-VxHXbPCejG1wn-Ypg",s=new Map;fetch(`${c}/getUpdates`).then(e=>e.json()).then(e=>{console.log(e),e.result.forEach(e=>{if(e.message){const{id:t,first_name:n}=e.message.chat;s.set(t,n)}})}).catch(e=>console.log(e)),l.getArticles("people",10)}]);