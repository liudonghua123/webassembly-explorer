(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();const _t="modulepreload",ct=function(t){return"/webassembly-explorer/"+t},Ce={},Y=function(e,n,s){let i=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),_=a?.nonce||a?.getAttribute("nonce");i=Promise.allSettled(n.map(c=>{if(c=ct(c),c in Ce)return;Ce[c]=!0;const l=c.endsWith(".css"),d=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${d}`))return;const o=document.createElement("link");if(o.rel=l?"stylesheet":_t,l||(o.as="script"),o.crossOrigin="",o.href=c,_&&o.setAttribute("nonce",_),document.head.appendChild(o),l)return new Promise((f,u)=>{o.addEventListener("load",f),o.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(a){const _=new Event("vite:preloadError",{cancelable:!0});if(_.payload=a,window.dispatchEvent(_),!_.defaultPrevented)throw a}return i.then(a=>{for(const _ of a||[])_.status==="rejected"&&r(_.reason);return e().catch(r)})};var me,y,Je,V,Pe,Ke,Ze,ye,ae,ee,Qe,We,ke,Ae,ue={},fe=[],ut=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,he=Array.isArray;function F(t,e){for(var n in e)t[n]=e[n];return t}function Ie(t){t&&t.parentNode&&t.parentNode.removeChild(t)}function Xe(t,e,n){var s,i,r,a={};for(r in e)r=="key"?s=e[r]:r=="ref"?i=e[r]:a[r]=e[r];if(arguments.length>2&&(a.children=arguments.length>3?me.call(arguments,2):n),typeof t=="function"&&t.defaultProps!=null)for(r in t.defaultProps)a[r]===void 0&&(a[r]=t.defaultProps[r]);return le(t,a,s,i,null)}function le(t,e,n,s,i){var r={type:t,props:e,key:n,ref:s,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:i??++Je,__i:-1,__u:0};return i==null&&y.vnode!=null&&y.vnode(r),r}function ge(t){return t.children}function _e(t,e){this.props=t,this.context=e}function Z(t,e){if(e==null)return t.__?Z(t.__,t.__i+1):null;for(var n;e<t.__k.length;e++)if((n=t.__k[e])!=null&&n.__e!=null)return n.__e;return typeof t.type=="function"?Z(t):null}function ft(t){if(t.__P&&t.__d){var e=t.__v,n=e.__e,s=[],i=[],r=F({},e);r.__v=e.__v+1,y.vnode&&y.vnode(r),Ee(t.__P,r,e,t.__n,t.__P.namespaceURI,32&e.__u?[n]:null,s,n??Z(e),!!(32&e.__u),i),r.__v=e.__v,r.__.__k[r.__i]=r,nt(s,r,i),e.__e=e.__=null,r.__e!=n&&Ye(r)}}function Ye(t){if((t=t.__)!=null&&t.__c!=null)return t.__e=t.__c.base=null,t.__k.some(function(e){if(e!=null&&e.__e!=null)return t.__e=t.__c.base=e.__e}),Ye(t)}function Le(t){(!t.__d&&(t.__d=!0)&&V.push(t)&&!de.__r++||Pe!=y.debounceRendering)&&((Pe=y.debounceRendering)||Ke)(de)}function de(){try{for(var t,e=1;V.length;)V.length>e&&V.sort(Ze),t=V.shift(),e=V.length,ft(t)}finally{V.length=de.__r=0}}function et(t,e,n,s,i,r,a,_,c,l,d){var o,f,u,x,k,U,w,b=s&&s.__k||fe,O=e.length;for(c=dt(n,e,b,c,O),o=0;o<O;o++)(u=n.__k[o])!=null&&(f=u.__i!=-1&&b[u.__i]||ue,u.__i=o,U=Ee(t,u,f,i,r,a,_,c,l,d),x=u.__e,u.ref&&f.ref!=u.ref&&(f.ref&&Be(f.ref,null,u),d.push(u.ref,u.__c||x,u)),k==null&&x!=null&&(k=x),(w=!!(4&u.__u))||f.__k===u.__k?(c=tt(u,c,t,w),w&&f.__e&&(f.__e=null)):typeof u.type=="function"&&U!==void 0?c=U:x&&(c=x.nextSibling),u.__u&=-7);return n.__e=k,c}function dt(t,e,n,s,i){var r,a,_,c,l,d=n.length,o=d,f=0;for(t.__k=new Array(i),r=0;r<i;r++)(a=e[r])!=null&&typeof a!="boolean"&&typeof a!="function"?(typeof a=="string"||typeof a=="number"||typeof a=="bigint"||a.constructor==String?a=t.__k[r]=le(null,a,null,null,null):he(a)?a=t.__k[r]=le(ge,{children:a},null,null,null):a.constructor===void 0&&a.__b>0?a=t.__k[r]=le(a.type,a.props,a.key,a.ref?a.ref:null,a.__v):t.__k[r]=a,c=r+f,a.__=t,a.__b=t.__b+1,_=null,(l=a.__i=pt(a,n,c,o))!=-1&&(o--,(_=n[l])&&(_.__u|=2)),_==null||_.__v==null?(l==-1&&(i>d?f--:i<d&&f++),typeof a.type!="function"&&(a.__u|=4)):l!=c&&(l==c-1?f--:l==c+1?f++:(l>c?f--:f++,a.__u|=4))):t.__k[r]=null;if(o)for(r=0;r<d;r++)(_=n[r])!=null&&!(2&_.__u)&&(_.__e==s&&(s=Z(_)),st(_,_));return s}function tt(t,e,n,s){var i,r;if(typeof t.type=="function"){for(i=t.__k,r=0;i&&r<i.length;r++)i[r]&&(i[r].__=t,e=tt(i[r],e,n,s));return e}t.__e!=e&&(s&&(e&&t.type&&!e.parentNode&&(e=Z(t)),n.insertBefore(t.__e,e||null)),e=t.__e);do e=e&&e.nextSibling;while(e!=null&&e.nodeType==8);return e}function pt(t,e,n,s){var i,r,a,_=t.key,c=t.type,l=e[n],d=l!=null&&(2&l.__u)==0;if(l===null&&_==null||d&&_==l.key&&c==l.type)return n;if(s>(d?1:0)){for(i=n-1,r=n+1;i>=0||r<e.length;)if((l=e[a=i>=0?i--:r++])!=null&&!(2&l.__u)&&_==l.key&&c==l.type)return a}return-1}function De(t,e,n){e[0]=="-"?t.setProperty(e,n??""):t[e]=n==null?"":typeof n!="number"||ut.test(e)?n:n+"px"}function ie(t,e,n,s,i){var r,a;e:if(e=="style")if(typeof n=="string")t.style.cssText=n;else{if(typeof s=="string"&&(t.style.cssText=s=""),s)for(e in s)n&&e in n||De(t.style,e,"");if(n)for(e in n)s&&n[e]==s[e]||De(t.style,e,n[e])}else if(e[0]=="o"&&e[1]=="n")r=e!=(e=e.replace(Qe,"$1")),a=e.toLowerCase(),e=a in t||e=="onFocusOut"||e=="onFocusIn"?a.slice(2):e.slice(2),t.l||(t.l={}),t.l[e+r]=n,n?s?n[ee]=s[ee]:(n[ee]=We,t.addEventListener(e,r?Ae:ke,r)):t.removeEventListener(e,r?Ae:ke,r);else{if(i=="http://www.w3.org/2000/svg")e=e.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(e!="width"&&e!="height"&&e!="href"&&e!="list"&&e!="form"&&e!="tabIndex"&&e!="download"&&e!="rowSpan"&&e!="colSpan"&&e!="role"&&e!="popover"&&e in t)try{t[e]=n??"";break e}catch{}typeof n=="function"||(n==null||n===!1&&e[4]!="-"?t.removeAttribute(e):t.setAttribute(e,e=="popover"&&n==1?"":n))}}function Me(t){return function(e){if(this.l){var n=this.l[e.type+t];if(e[ae]==null)e[ae]=We++;else if(e[ae]<n[ee])return;return n(y.event?y.event(e):e)}}}function Ee(t,e,n,s,i,r,a,_,c,l){var d,o,f,u,x,k,U,w,b,O,N,q,te,G,Q,P=e.type;if(e.constructor!==void 0)return null;128&n.__u&&(c=!!(32&n.__u),r=[_=e.__e=n.__e]),(d=y.__b)&&d(e);e:if(typeof P=="function")try{if(w=e.props,b=P.prototype&&P.prototype.render,O=(d=P.contextType)&&s[d.__c],N=d?O?O.props.value:d.__:s,n.__c?U=(o=e.__c=n.__c).__=o.__E:(b?e.__c=o=new P(w,N):(e.__c=o=new _e(w,N),o.constructor=P,o.render=ht),O&&O.sub(o),o.state||(o.state={}),o.__n=s,f=o.__d=!0,o.__h=[],o._sb=[]),b&&o.__s==null&&(o.__s=o.state),b&&P.getDerivedStateFromProps!=null&&(o.__s==o.state&&(o.__s=F({},o.__s)),F(o.__s,P.getDerivedStateFromProps(w,o.__s))),u=o.props,x=o.state,o.__v=e,f)b&&P.getDerivedStateFromProps==null&&o.componentWillMount!=null&&o.componentWillMount(),b&&o.componentDidMount!=null&&o.__h.push(o.componentDidMount);else{if(b&&P.getDerivedStateFromProps==null&&w!==u&&o.componentWillReceiveProps!=null&&o.componentWillReceiveProps(w,N),e.__v==n.__v||!o.__e&&o.shouldComponentUpdate!=null&&o.shouldComponentUpdate(w,o.__s,N)===!1){e.__v!=n.__v&&(o.props=w,o.state=o.__s,o.__d=!1),e.__e=n.__e,e.__k=n.__k,e.__k.some(function(j){j&&(j.__=e)}),fe.push.apply(o.__h,o._sb),o._sb=[],o.__h.length&&a.push(o);break e}o.componentWillUpdate!=null&&o.componentWillUpdate(w,o.__s,N),b&&o.componentDidUpdate!=null&&o.__h.push(function(){o.componentDidUpdate(u,x,k)})}if(o.context=N,o.props=w,o.__P=t,o.__e=!1,q=y.__r,te=0,b)o.state=o.__s,o.__d=!1,q&&q(e),d=o.render(o.props,o.state,o.context),fe.push.apply(o.__h,o._sb),o._sb=[];else do o.__d=!1,q&&q(e),d=o.render(o.props,o.state,o.context),o.state=o.__s;while(o.__d&&++te<25);o.state=o.__s,o.getChildContext!=null&&(s=F(F({},s),o.getChildContext())),b&&!f&&o.getSnapshotBeforeUpdate!=null&&(k=o.getSnapshotBeforeUpdate(u,x)),G=d!=null&&d.type===ge&&d.key==null?rt(d.props.children):d,_=et(t,he(G)?G:[G],e,n,s,i,r,a,_,c,l),o.base=e.__e,e.__u&=-161,o.__h.length&&a.push(o),U&&(o.__E=o.__=null)}catch(j){if(e.__v=null,c||r!=null)if(j.then){for(e.__u|=c?160:128;_&&_.nodeType==8&&_.nextSibling;)_=_.nextSibling;r[r.indexOf(_)]=null,e.__e=_}else{for(Q=r.length;Q--;)Ie(r[Q]);$e(e)}else e.__e=n.__e,e.__k=n.__k,j.then||$e(e);y.__e(j,e,n)}else r==null&&e.__v==n.__v?(e.__k=n.__k,e.__e=n.__e):_=e.__e=mt(n.__e,e,n,s,i,r,a,c,l);return(d=y.diffed)&&d(e),128&e.__u?void 0:_}function $e(t){t&&(t.__c&&(t.__c.__e=!0),t.__k&&t.__k.some($e))}function nt(t,e,n){for(var s=0;s<n.length;s++)Be(n[s],n[++s],n[++s]);y.__c&&y.__c(e,t),t.some(function(i){try{t=i.__h,i.__h=[],t.some(function(r){r.call(i)})}catch(r){y.__e(r,i.__v)}})}function rt(t){return typeof t!="object"||t==null||t.__b>0?t:he(t)?t.map(rt):t.constructor!==void 0?null:F({},t)}function mt(t,e,n,s,i,r,a,_,c){var l,d,o,f,u,x,k,U=n.props||ue,w=e.props,b=e.type;if(b=="svg"?i="http://www.w3.org/2000/svg":b=="math"?i="http://www.w3.org/1998/Math/MathML":i||(i="http://www.w3.org/1999/xhtml"),r!=null){for(l=0;l<r.length;l++)if((u=r[l])&&"setAttribute"in u==!!b&&(b?u.localName==b:u.nodeType==3)){t=u,r[l]=null;break}}if(t==null){if(b==null)return document.createTextNode(w);t=document.createElementNS(i,b,w.is&&w),_&&(y.__m&&y.__m(e,r),_=!1),r=null}if(b==null)U===w||_&&t.data==w||(t.data=w);else{if(r=b=="textarea"&&w.defaultValue!=null?null:r&&me.call(t.childNodes),!_&&r!=null)for(U={},l=0;l<t.attributes.length;l++)U[(u=t.attributes[l]).name]=u.value;for(l in U)u=U[l],l=="dangerouslySetInnerHTML"?o=u:l=="children"||l in w||l=="value"&&"defaultValue"in w||l=="checked"&&"defaultChecked"in w||ie(t,l,null,u,i);for(l in w)u=w[l],l=="children"?f=u:l=="dangerouslySetInnerHTML"?d=u:l=="value"?x=u:l=="checked"?k=u:_&&typeof u!="function"||U[l]===u||ie(t,l,u,U[l],i);if(d)_||o&&(d.__html==o.__html||d.__html==t.innerHTML)||(t.innerHTML=d.__html),e.__k=[];else if(o&&(t.innerHTML=""),et(e.type=="template"?t.content:t,he(f)?f:[f],e,n,s,b=="foreignObject"?"http://www.w3.org/1999/xhtml":i,r,a,r?r[0]:n.__k&&Z(n,0),_,c),r!=null)for(l=r.length;l--;)Ie(r[l]);_&&b!="textarea"||(l="value",b=="progress"&&x==null?t.removeAttribute("value"):x!=null&&(x!==t[l]||b=="progress"&&!x||b=="option"&&x!=U[l])&&ie(t,l,x,U[l],i),l="checked",k!=null&&k!=t[l]&&ie(t,l,k,U[l],i))}return t}function Be(t,e,n){try{if(typeof t=="function"){var s=typeof t.__u=="function";s&&t.__u(),s&&e==null||(t.__u=t(e))}else t.current=e}catch(i){y.__e(i,n)}}function st(t,e,n){var s,i;if(y.unmount&&y.unmount(t),(s=t.ref)&&(s.current&&s.current!=t.__e||Be(s,null,e)),(s=t.__c)!=null){if(s.componentWillUnmount)try{s.componentWillUnmount()}catch(r){y.__e(r,e)}s.base=s.__P=null}if(s=t.__k)for(i=0;i<s.length;i++)s[i]&&st(s[i],e,n||typeof t.type!="function");n||Ie(t.__e),t.__c=t.__=t.__e=void 0}function ht(t,e,n){return this.constructor(t,n)}function gt(t,e,n){var s,i,r,a;e==document&&(e=document.documentElement),y.__&&y.__(t,e),i=(s=!1)?null:e.__k,r=[],a=[],Ee(e,t=e.__k=Xe(ge,null,[t]),i||ue,ue,e.namespaceURI,i?null:e.firstChild?me.call(e.childNodes):null,r,i?i.__e:e.firstChild,s,a),nt(r,t,a)}me=fe.slice,y={__e:function(t,e,n,s){for(var i,r,a;e=e.__;)if((i=e.__c)&&!i.__)try{if((r=i.constructor)&&r.getDerivedStateFromError!=null&&(i.setState(r.getDerivedStateFromError(t)),a=i.__d),i.componentDidCatch!=null&&(i.componentDidCatch(t,s||{}),a=i.__d),a)return i.__E=i}catch(_){t=_}throw t}},Je=0,_e.prototype.setState=function(t,e){var n;n=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=F({},this.state),typeof t=="function"&&(t=t(F({},n),this.props)),t&&F(n,t),t!=null&&this.__v&&(e&&this._sb.push(e),Le(this))},_e.prototype.forceUpdate=function(t){this.__v&&(this.__e=!0,t&&this.__h.push(t),Le(this))},_e.prototype.render=ge,V=[],Ke=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,Ze=function(t,e){return t.__v.__b-e.__v.__b},de.__r=0,ye=Math.random().toString(8),ae="__d"+ye,ee="__a"+ye,Qe=/(PointerCapture)$|Capture$/i,We=0,ke=Me(!1),Ae=Me(!0);var pe,A,xe,Oe,Se=0,ot=[],S=y,Re=S.__b,Te=S.__r,Ne=S.diffed,Fe=S.__c,je=S.unmount,He=S.__;function it(t,e){S.__h&&S.__h(A,t,Se||e),Se=0;var n=A.__H||(A.__H={__:[],__h:[]});return t>=n.__.length&&n.__.push({}),n.__[t]}function R(t){return Se=1,wt(at,t)}function wt(t,e,n){var s=it(pe++,2);if(s.t=t,!s.__c&&(s.__=[at(void 0,e),function(_){var c=s.__N?s.__N[0]:s.__[0],l=s.t(c,_);c!==l&&(s.__N=[l,s.__[1]],s.__c.setState({}))}],s.__c=A,!A.__f)){var i=function(_,c,l){if(!s.__c.__H)return!0;var d=s.__c.__H.__.filter(function(f){return f.__c});if(d.every(function(f){return!f.__N}))return!r||r.call(this,_,c,l);var o=s.__c.props!==_;return d.some(function(f){if(f.__N){var u=f.__[0];f.__=f.__N,f.__N=void 0,u!==f.__[0]&&(o=!0)}}),r&&r.call(this,_,c,l)||o};A.__f=!0;var r=A.shouldComponentUpdate,a=A.componentWillUpdate;A.componentWillUpdate=function(_,c,l){if(this.__e){var d=r;r=void 0,i(_,c,l),r=d}a&&a.call(this,_,c,l)},A.shouldComponentUpdate=i}return s.__N||s.__}function ze(t,e){var n=it(pe++,3);!S.__s&&yt(n.__H,e)&&(n.__=t,n.u=e,A.__H.__h.push(n))}function bt(){for(var t;t=ot.shift();){var e=t.__H;if(t.__P&&e)try{e.__h.some(ce),e.__h.some(Ue),e.__h=[]}catch(n){e.__h=[],S.__e(n,t.__v)}}}S.__b=function(t){A=null,Re&&Re(t)},S.__=function(t,e){t&&e.__k&&e.__k.__m&&(t.__m=e.__k.__m),He&&He(t,e)},S.__r=function(t){Te&&Te(t),pe=0;var e=(A=t.__c).__H;e&&(xe===A?(e.__h=[],A.__h=[],e.__.some(function(n){n.__N&&(n.__=n.__N),n.u=n.__N=void 0})):(e.__h.some(ce),e.__h.some(Ue),e.__h=[],pe=0)),xe=A},S.diffed=function(t){Ne&&Ne(t);var e=t.__c;e&&e.__H&&(e.__H.__h.length&&(ot.push(e)!==1&&Oe===S.requestAnimationFrame||((Oe=S.requestAnimationFrame)||vt)(bt)),e.__H.__.some(function(n){n.u&&(n.__H=n.u),n.u=void 0})),xe=A=null},S.__c=function(t,e){e.some(function(n){try{n.__h.some(ce),n.__h=n.__h.filter(function(s){return!s.__||Ue(s)})}catch(s){e.some(function(i){i.__h&&(i.__h=[])}),e=[],S.__e(s,n.__v)}}),Fe&&Fe(t,e)},S.unmount=function(t){je&&je(t);var e,n=t.__c;n&&n.__H&&(n.__H.__.some(function(s){try{ce(s)}catch(i){e=i}}),n.__H=void 0,e&&S.__e(e,n.__v))};var Ve=typeof requestAnimationFrame=="function";function vt(t){var e,n=function(){clearTimeout(s),Ve&&cancelAnimationFrame(e),setTimeout(t)},s=setTimeout(n,35);Ve&&(e=requestAnimationFrame(n))}function ce(t){var e=A,n=t.__c;typeof n=="function"&&(t.__c=void 0,n()),A=e}function Ue(t){var e=A;t.__c=t.__(),A=e}function yt(t,e){return!t||t.length!==e.length||e.some(function(n,s){return n!==t[s]})}function at(t,e){return typeof e=="function"?e(t):e}var lt=function(t,e,n,s){var i;e[0]=0;for(var r=1;r<e.length;r++){var a=e[r++],_=e[r]?(e[0]|=a?1:2,n[e[r++]]):e[++r];a===3?s[0]=_:a===4?s[1]=Object.assign(s[1]||{},_):a===5?(s[1]=s[1]||{})[e[++r]]=_:a===6?s[1][e[++r]]+=_+"":a?(i=t.apply(_,lt(t,_,n,["",null])),s.push(i),_[0]?e[0]|=2:(e[r-2]=0,e[r]=i)):s.push(_)}return s},qe=new Map;function xt(t){var e=qe.get(this);return e||(e=new Map,qe.set(this,e)),(e=lt(this,e.get(t)||(e.set(t,e=function(n){for(var s,i,r=1,a="",_="",c=[0],l=function(f){r===1&&(f||(a=a.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?c.push(0,f,a):r===3&&(f||a)?(c.push(3,f,a),r=2):r===2&&a==="..."&&f?c.push(4,f,0):r===2&&a&&!f?c.push(5,0,!0,a):r>=5&&((a||!f&&r===5)&&(c.push(r,0,a,i),r=6),f&&(c.push(r,f,0,i),r=6)),a=""},d=0;d<n.length;d++){d&&(r===1&&l(),l(d));for(var o=0;o<n[d].length;o++)s=n[d][o],r===1?s==="<"?(l(),c=[c],r=3):a+=s:r===4?a==="--"&&s===">"?(r=1,a=""):a=s+a[0]:_?s===_?_="":a+=s:s==='"'||s==="'"?_=s:s===">"?(l(),r=1):r&&(s==="="?(r=5,i=a,a=""):s==="/"&&(r<5||n[d][o+1]===">")?(l(),r===3&&(c=c[0]),r=c,(c=c[0]).push(2,0,r),r=0):s===" "||s==="	"||s===`
`||s==="\r"?(l(),r=2):a+=s),r===3&&a==="!--"&&(r=4,c=c[0])}return l(),c}(t)),e),arguments,[])).length>1?e:e[0]}const T=xt.bind(Xe);function kt(t,e,n,s){const i=e==="stdin"?[]:["-i","/public/test.txt"];switch(t){case"wasmer":return`import { init, runWasix } from "@wasmer/sdk";

await init();

const module = await WebAssembly.compile(wasmBytes);
const encoder = new TextEncoder();
const mount = ${e==="stdin"?"{}":`{
  "/public": { "test.txt": encoder.encode(testInput) }
}`};
const stdin = ${e==="stdin"?"encoder.encode(testInput)":'""'};

const instance = await runWasix(module, { args, mount, stdin });
const result = await instance.wait();
console.log(result.stdout);`;case"browserWasiShim":return e==="stdin"?`import { WASI, File, OpenFile, ConsoleStdout } from "@bjorn3/browser_wasi_shim";

// 创建 WASI 实例 (stdin 输入)
const wasi = new WASI(
  ['./linecount'],
  [],
  [
    new OpenFile(new File(new TextEncoder().encode(testInput))),
    ConsoleStdout.lineBuffered((text) => console.log(text)),
    ConsoleStdout.lineBuffered((text) => console.warn(text)),
  ]
);

// 加载并运行 WASM
const { instance } = await WebAssembly.instantiate(wasmBytes, {
  wasi_snapshot_preview1: wasi.wasiImport,
});

wasi.start(instance);`:`import { WASI, File, OpenFile, ConsoleStdout, PreopenDirectory } from "@bjorn3/browser_wasi_shim";

// 获取文件内容 (fetch)
const fileResponse = await fetch('${n}');
const fileData = new Uint8Array(await fileResponse.arrayBuffer());

// 解析目录和文件名
const parts = '${n}'.split('/');
const fileName = parts.pop();
const dirPath = parts.join('/') || '.';

// 创建 WASI 实例 (文件输入)
const wasi = new WASI(
  ['./linecount', '-i', '${n}'],
  [],
  [
    new OpenFile(new File([])), // stdin
    ConsoleStdout.lineBuffered((text) => console.log(text)),
    ConsoleStdout.lineBuffered((text) => console.warn(text)),
    new PreopenDirectory(dirPath, [[fileName, new File(fileData)]]),
  ]
);

// 加载并运行 WASM
const { instance } = await WebAssembly.instantiate(wasmBytes, {
  wasi_snapshot_preview1: wasi.wasiImport,
});

wasi.start(instance);`;case"wasmRunner":return`// 使用原生 WebAssembly API 运行 WASI 程序
const args = ${JSON.stringify(i)};
const encoder = new TextEncoder();
const argBuffers = args.map(arg => encoder.encode(arg + '\\0'));
const totalArgSize = argBuffers.reduce((sum, buf) => sum + buf.length, 0);

const importObject = {
  wasi_snapshot_preview1: {
    args_sizes_get: (argc, argv_buf_size) => {
      new Uint32Array(memory.buffer, argc, 1)[0] = args.length;
      new Uint32Array(memory.buffer, argv_buf_size, 1)[0] = totalArgSize;
      return 0;
    },
    args_get: (argv, argv_buf) => {
      const argvArray = new Uint32Array(memory.buffer, argv, args.length);
      let offset = 0;
      for (let i = 0; i < args.length; i++) {
        argvArray[i] = argv_buf + offset;
        const buf = argBuffers[i];
        new Uint8Array(memory.buffer, argv_buf + offset, buf.length).set(buf);
        offset += buf.length;
      }
      return 0;
    },
    environ_sizes_get: (count, size) => {
      new Uint32Array(memory.buffer, count, 1)[0] = 0;
      new Uint32Array(memory.buffer, size, 1)[0] = 0;
      return 0;
    },
    environ_get: () => 0,
    proc_exit: (code) => { throw new Error(\`Process exited: \${code}\`); },
    clock_time_get: (id, precision, buf) => {
      new BigUint64Array(memory.buffer, buf, 1)[0] = BigInt(Date.now()) * BigInt(1000000);
      return 0;
    },
    clock_res_get: () => 0,
    random_get: (buf, len) => { crypto.getRandomValues(new Uint8Array(memory.buffer, buf, len)); return 0; },
    fd_write: (fd, iovs_ptr, iovs_len, nwritten_ptr) => {
      if (fd === 1) {
        let total = 0;
        for (let i = 0; i < iovs_len; i++) {
          const ptr = new Uint32Array(memory.buffer, iovs_ptr + i * 8, 1)[0];
          const len = new Uint32Array(memory.buffer, iovs_ptr + i * 8 + 4, 1)[0];
          stdoutData += new TextDecoder().decode(new Uint8Array(memory.buffer, ptr, len));
          total += len;
        }
        new Uint32Array(memory.buffer, nwritten_ptr, 1)[0] = total;
        return 0;
      }
      return 0;
    },
    fd_read: ${e==="stdin"?`(fd, iovs_ptr, iovs_len, nread_ptr) => {
      if (fd === 0) {
        let total = 0;
        for (let i = 0; i < iovs_len; i++) {
          const ptr = new Uint32Array(memory.buffer, iovs_ptr + i * 8, 1)[0];
          const len = new Uint32Array(memory.buffer, iovs_ptr + i * 8 + 4, 1)[0];
          const dest = new Uint8Array(memory.buffer, ptr, len);
          const toRead = Math.min(len, stdinBuffer.length - stdinOffset);
          for (let j = 0; j < toRead; j++) dest[j] = stdinBuffer[stdinOffset + j];
          stdinOffset += toRead;
          total += toRead;
        }
        new Uint32Array(memory.buffer, nread_ptr, 1)[0] = total;
        return 0;
      }
      return 0;
    }`:"() => 0"},
    fd_close: () => 0,
    fd_seek: () => 0,
    fd_fdstat_get: () => 0,
    fd_filestat_get: () => 0,
    fd_prestat_get: () => 0,
    fd_prestat_dir_name: () => 0,
    path_open: () => 0,
    path_filestat_get: () => 0,
    fd_advise: () => 0,
    fd_allocate: () => 0,
    fd_datasync: () => 0,
    fd_fdstat_set_flags: () => 0,
    fd_fdstat_set_rights: () => 0,
    fd_filestat_set_size: () => 0,
    fd_filestat_set_times: () => 0,
    fd_pread: () => 0,
    fd_pwrite: () => 0,
    fd_readdir: () => 0,
    fd_renumber: () => 0,
    fd_sync: () => 0,
    fd_tell: () => 0,
    path_create_directory: () => 0,
    path_filestat_set_times: () => 0,
    path_link: () => 0,
    path_readlink: () => 0,
    path_remove_directory: () => 0,
    path_rename: () => 0,
    path_symlink: () => 0,
    path_unlink_file: () => 0,
    poll_oneoff: () => 0,
    sched_yield: () => 0,
    sock_accept: () => 0,
    sock_recv: () => 0,
    sock_send: () => 0,
    sock_shutdown: () => 0,
  },
};

let stdoutData = '';
let memory = null;${e==="stdin"?`
let stdinBuffer = new TextEncoder().encode(testInput);
let stdinOffset = 0;`:""}

const { instance } = await WebAssembly.instantiate(wasmBytes, importObject);
memory = instance.exports.memory;

instance.exports._start();
console.log(stdoutData);`}}const Ge={wasmer:{name:"@wasmer/sdk",description:"官方 Wasmer SDK",features:["本地 WASM","WASI/WASIX 支持","需要 COOP/COEP"]},browserWasiShim:{name:"@bjorn3/browser_wasi_shim",description:"纯浏览器 WASI shim 实现",features:["无需服务端","轻量级","浏览器运行"]},wasmRunner:{name:"WASM Runner (原生)",description:"原生 WebAssembly API",features:["零依赖","最轻量","跨平台兼容"]}},At=`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char* argv[]) {
    FILE* input = stdin;
    FILE* output = stdout;
    char* input_path = NULL;
    char* output_path = NULL;

    // 解析参数 (-i input_file, -o output_file)
    for (int i = 1; i < argc; i++) {
        if (strcmp(argv[i], "-i") == 0 && i + 1 < argc) {
            input_path = argv[++i];
            input = fopen(input_path, "r");
        } else if (strcmp(argv[i], "-o") == 0 && i + 1 < argc) {
            output_path = argv[++i];
            output = fopen(output_path, "w");
        }
    }

    if (!input) {
        fprintf(stderr, "Error opening input\\n");
        return 1;
    }

    // 统计行数
    long lines = 0;
    int last_ch = 0;
    int ch;

    while ((ch = fgetc(input)) != EOF) {
        if (ch == '\\n') lines++;
        last_ch = ch;
    }
    if (last_ch != '\\n' && last_ch != 0) lines++;

    fprintf(output, "%ld\\n", lines);

    if (input_path) fclose(input);
    if (output_path) fclose(output);

    return 0;
}`;function $t(){const[t,e]=R("wasmRunner"),[n,s]=R("stdin"),[i,r]=R("public/test.txt"),[a,_]=R(`Hello, World!
This is line 2
And line 3`),[c,l]=R(null),[d,o]=R(!1),[f,u]=R(null),[x,k]=R(null),[U,w]=R(!1),[b,O]=R("");ze(()=>{N(),e("wasmer")},[]),ze(()=>{const g=kt(t,n,i);O(g)},[t,n,i,a]);async function N(){o(!0),k(null);try{const g=await fetch("linecount.wasm");if(!g.ok)throw new Error("Failed to load WASM file. Please compile linecount.c first.");const m=await g.arrayBuffer();l(new Uint8Array(m)),w(!0)}catch(g){k(g.message),w(!1)}o(!1)}async function q(){o(!0),k(null),u(null);try{let g="",m=null,M=null,L=0,E=null,I=0,v=-1;const B=n==="stdin"?[]:["-i",i];if(n==="stdin")M=new TextEncoder().encode(a);else{const p=await fetch(`/${i}`);if(p.ok){const h=await p.arrayBuffer();E=new Uint8Array(h)}}const H=new TextEncoder,J=B.map(p=>H.encode(p+"\0")),X=J.reduce((p,h)=>p+h.length,0),ne={wasi_snapshot_preview1:{args_sizes_get:(p,h)=>(new Uint32Array(m.buffer,p,1)[0]=B.length,new Uint32Array(m.buffer,h,1)[0]=X,0),args_get:(p,h)=>{const $=new Uint32Array(m.buffer,p,B.length);let C=0;for(let W=0;W<B.length;W++){$[W]=h+C;const D=J[W];new Uint8Array(m.buffer,h+C,D.length).set(D),C+=D.length}return 0},environ_sizes_get:(p,h)=>(new Uint32Array(m.buffer,p,1)[0]=0,new Uint32Array(m.buffer,h,1)[0]=0,0),environ_get:()=>0,proc_exit:p=>{throw new Error(`Process exited: ${p}`)},fd_write:(p,h,$,C)=>{if(p===1){let W=0;for(let D=0;D<$;D++){const K=new Uint32Array(m.buffer,h+D*8,1)[0],z=new Uint32Array(m.buffer,h+D*8+4,1)[0];g+=new TextDecoder().decode(new Uint8Array(m.buffer,K,z)),W+=z}new Uint32Array(m.buffer,C,1)[0]=W,u({stdout:g.trim(),stderr:""})}return 0},fd_read:(p,h,$,C)=>{const W=n==="stdin"?M:p===v?E:null,D=n==="stdin"?L:p===v?I:0;if(W){let K=0;for(let z=0;z<$;z++){const we=new Uint32Array(m.buffer,h+z*8,1)[0],be=new Uint32Array(m.buffer,h+z*8+4,1)[0],ve=new Uint8Array(m.buffer,we,be),se=Math.min(be,W.length-D);for(let oe=0;oe<se;oe++)ve[oe]=W[D+oe];n==="stdin"?L+=se:I+=se,K+=se}return new Uint32Array(m.buffer,C,1)[0]=K,0}return 0},fd_seek:(p,h,$,C)=>{if(p===v&&E){let W;if($===0)W=h;else if($===1)W=I+h;else if($===2)W=E.length+h;else return-1;return I=W,C&&(new Uint32Array(m.buffer,C,1)[0]=I),0}return 0},fd_close:p=>(p===v&&(v=-1),0),fd_fdstat_get:(p,h)=>{const $=new Uint8Array(m.buffer,h,24);return p===0||p===1||p===2?$[0]=2:(p===3||p===v)&&($[0]=1),0},fd_filestat_get:(p,h)=>(p===v&&E&&(new BigUint64Array(m.buffer,h,6)[5]=BigInt(E.length)),0),fd_prestat_get:(p,h)=>p===3?(new Uint8Array(m.buffer,h,1)[0]=1,new Uint32Array(m.buffer,h+4,1)[0]=1,0):8,fd_prestat_dir_name:(p,h,$)=>p===3&&$>0?(new Uint8Array(m.buffer,h,1)[0]=46,0):8,path_open:(p,h,$,C,W,D,K,z,we)=>{const ve=new TextDecoder().decode(new Uint8Array(m.buffer,$,C)).split("/").pop();return n==="argument"&&E&&ve===i.split("/").pop()?(v=4,new Uint32Array(m.buffer,we,1)[0]=v,0):-1},path_filestat_get:(p,h,$,C,W)=>p===v&&E?(new BigUint64Array(m.buffer,W,6)[5]=BigInt(E.length),0):-1,clock_time_get:(p,h,$)=>(new BigUint64Array(m.buffer,$,1)[0]=BigInt(Date.now())*BigInt(1e6),0),clock_res_get:()=>0,random_get:(p,h)=>(crypto.getRandomValues(new Uint8Array(m.buffer,p,h)),0),fd_advise:()=>0,fd_allocate:()=>0,fd_datasync:()=>0,fd_fdstat_set_flags:()=>0,fd_fdstat_set_rights:()=>0,fd_filestat_set_size:()=>0,fd_filestat_set_times:()=>0,fd_pread:()=>0,fd_pwrite:()=>0,fd_readdir:()=>0,fd_renumber:()=>0,fd_sync:()=>0,fd_tell:()=>0,path_create_directory:()=>0,path_filestat_set_times:()=>0,path_link:()=>0,path_readlink:()=>0,path_remove_directory:()=>0,path_rename:()=>0,path_symlink:()=>0,path_unlink_file:()=>0,poll_oneoff:()=>0,sched_yield:()=>0,sock_accept:()=>0,sock_recv:()=>0,sock_send:()=>0,sock_shutdown:()=>0}},{instance:re}=await WebAssembly.instantiate(c.buffer,ne);m=re.exports.memory,re.exports._start()}catch(g){k(`WASM Runner Error: ${g.message}`)}o(!1)}async function te(){o(!0),k(null),u(null);try{const{WASI:g,File:m,OpenFile:M,ConsoleStdout:L,PreopenDirectory:E}=await Y(async()=>{const{WASI:v,File:B,OpenFile:H,ConsoleStdout:J,PreopenDirectory:X}=await import("./index-DlF0zFmt.js");return{WASI:v,File:B,OpenFile:H,ConsoleStdout:J,PreopenDirectory:X}},[]);let I="";if(n==="stdin"){const v=new g(["./linecount"],[],[new M(new m(new TextEncoder().encode(a))),L.lineBuffered(H=>{I+=H,u({stdout:I.trim(),stderr:""})}),L.lineBuffered(()=>{})]),{instance:B}=await WebAssembly.instantiate(c.buffer,{wasi_snapshot_preview1:v.wasiImport});v.start(B)}else{const v=await fetch(`/${i}`);if(!v.ok)throw new Error(`Failed to fetch file: ${i}`);const B=new Uint8Array(await v.arrayBuffer()),H=i.split("/"),J=H.pop(),X=H.join("/")||".",ne=new g(["./linecount","-i",i],[],[new M(new m([])),L.lineBuffered(p=>{I+=p,u({stdout:I.trim(),stderr:""})}),L.lineBuffered(()=>{}),new E(X,[[J,new m(B)]])]),{instance:re}=await WebAssembly.instantiate(c.buffer,{wasi_snapshot_preview1:ne.wasiImport});ne.start(re)}}catch(g){k(`Browser WASI Shim Error: ${g.message}`)}o(!1)}async function G(){if(window.__WASMER_INITIALIZED__)return;const{init:g,initializeLogger:m}=await Y(async()=>{const{init:I,initializeLogger:v}=await import("./index-CavDQnhK.js");return{init:I,initializeLogger:v}},[]),{default:M}=await Y(async()=>{const{default:I}=await import("./wasmer_js_bg-BXjoki3b.js");return{default:I}},[]),{default:L}=await Y(async()=>{const{default:I}=await import("./index-CyyMDdgM.js");return{default:I}},[]),E="/webassembly-explorer/";await g({module:`${E}${M.replace(/^\//,"")}`,sdkUrl:new URL(`${E}${L.replace(/^\//,"")}`,window.location.origin).href}),m("debug"),window.__WASMER_INITIALIZED__=!0}async function Q(){o(!0),k(null),u(null);try{await G();const{runWasix:g}=await Y(async()=>{const{runWasix:B}=await import("./index-CavDQnhK.js");return{runWasix:B}},[]),m=await WebAssembly.compile(c),M=n==="stdin"?[]:["-i","/public/test.txt"],L={};if(n!=="stdin"){const B=new TextEncoder;L["/public"]={"test.txt":B.encode(a)}}const E=n==="stdin"?new TextEncoder().encode(a):"",v=await(await g(m,{args:M,mount:L,stdin:E})).wait();v.ok?u({stdout:v.stdout||"",stderr:""}):k(`Exit code: ${v.code}
${v.stderr||""}`)}catch(g){k(`Wasmer Error: ${g.message}`),console.error(g)}o(!1)}async function P(){switch(t){case"wasmer":await Q();break;case"browserWasiShim":await te();break;case"wasmRunner":await q();break}}const j=Ge[t];return T`
    <div class="space-y-8">
      <header class="text-center space-y-4">
        <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          WASI WebAssembly Demo
        </h1>
        <p class="text-slate-400 text-lg">在浏览器中运行 WASI 目标 WebAssembly 程序</p>
      </header>

      <div class="grid lg:grid-cols-2 gap-8">
        <div class="space-y-6">
          <!-- Library Selector -->
          <div class="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700">
            <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
              选择运行库
            </h2>
            <div class="grid gap-3">
              ${Object.entries(Ge).map(([g,m])=>T`
                <button
                  key=${g}
                  onclick=${()=>e(g)}
                  class="p-4 rounded-xl border-2 transition-all duration-200 text-left ${t===g?"border-blue-500 bg-blue-500/20":"border-slate-600 bg-slate-700/50 hover:border-slate-500"}"
                >
                  <div class="font-semibold text-lg">${m.name}</div>
                  <div class="text-slate-400 text-sm mt-1">${m.description}</div>
                  <div class="flex flex-wrap gap-2 mt-2">
                    ${m.features.map(M=>T`
                      <span class="px-2 py-0.5 bg-slate-600/50 rounded text-xs">${M}</span>
                    `)}
                  </div>
                </button>
              `)}
            </div>
          </div>

          <!-- Input Method -->
          <div class="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700">
            <h2 class="text-xl font-semibold mb-4">输入方式</h2>
            <div class="flex gap-2 mb-4">
              <button
                onclick=${()=>s("stdin")}
                class="px-4 py-2 rounded-lg transition-colors ${n==="stdin"?"bg-blue-600 text-white":"bg-slate-700 text-slate-300 hover:bg-slate-600"}"
              >
                Stdin
              </button>
              <button
                onclick=${()=>s("argument")}
                class="px-4 py-2 rounded-lg transition-colors ${n==="argument"?"bg-blue-600 text-white":"bg-slate-700 text-slate-300 hover:bg-slate-600"}"
              >
                Argument (-i file)
              </button>
            </div>

            ${n==="stdin"?T`
              <textarea
                value=${a}
                oninput=${g=>_(g.target.value)}
                placeholder="输入要统计行数的文本..."
                class="w-full h-32 p-4 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              ></textarea>
              <p class="text-slate-500 text-sm mt-2">
                当前行数: ${(a.match(/\n/g)||[]).length+(a?1:0)}
              </p>
            `:T`
              <input
                type="text"
                value=${i}
                oninput=${g=>r(g.target.value)}
                placeholder="输入文件路径 (如: public/test.txt)"
                class="w-full p-4 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
              <p class="text-slate-500 text-sm mt-2">
                使用 -i 参数指定输入文件
              </p>
            `}
          </div>

          <!-- Run Button -->
          <button
            onclick=${P}
            disabled=${!U||d}
            class="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            ${d?T`
              <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              运行中...
            `:T`
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              运行 WebAssembly
            `}
          </button>

          <!-- Result -->
          ${f&&T`
            <div class="bg-green-900/30 border border-green-700 rounded-2xl p-6">
              <h3 class="text-green-400 font-semibold mb-3 flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                执行结果
              </h3>
              <div class="font-mono bg-slate-900/50 rounded-lg p-4">
                <pre class="text-green-300 whitespace-pre-wrap">${f.stdout}</pre>
              </div>
            </div>
          `}

          ${x&&T`
            <div class="bg-red-900/30 border border-red-700 rounded-2xl p-6">
              <h3 class="text-red-400 font-semibold mb-3 flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                错误
              </h3>
              <pre class="text-red-300 font-mono text-sm whitespace-pre-wrap">${x}</pre>
            </div>
          `}
        </div>

        <div class="space-y-6">
          <!-- Generated Code -->
          <div class="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700">
            <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
              </svg>
              ${j.name} 代码
            </h2>
            <div class="bg-slate-900 rounded-xl p-4 overflow-auto max-h-80">
              <pre class="text-sm font-mono text-slate-300"><code>${b}</code></pre>
            </div>
          </div>

          <!-- C Code -->
          <div class="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700">
            <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
              </svg>
              C 源代码
            </h2>
            <div class="bg-slate-900 rounded-xl p-4 overflow-auto max-h-80">
              <pre class="text-sm font-mono text-slate-300"><code>${At}</code></pre>
            </div>
          </div>

          <!-- Compile Instructions -->
          <div class="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700">
            <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              编译命令
            </h2>
            <div class="bg-slate-900 rounded-xl p-4 font-mono text-sm space-y-1">
              <p class="text-cyan-300"># npm run compile</p>
              <p class="text-green-400 mt-2"># 或手动编译:</p>
              <p class="text-yellow-400 mt-2">wasm32-wasip1-clang --target=wasm32 \</p>
              <p class="text-slate-400">&nbsp;&nbsp;--sysroot "C:\Users\admin\apps\wasi-sdk-33.0-x86_64-windows\share\wasi-sysroot" \</p>
              <p class="text-slate-400">&nbsp;&nbsp;-O2 -c src/linecount.c -o linecount.o</p>
              <p class="text-yellow-400 mt-2">wasm-ld \</p>
              <p class="text-slate-400">&nbsp;&nbsp;-L "wasi-sysroot/lib/wasm32-wasip1" \</p>
              <p class="text-slate-400">&nbsp;&nbsp;wasi-sysroot/lib/wasm32-wasip1/crt1.o linecount.o \</p>
              <p class="text-slate-400">&nbsp;&nbsp;-lc -lclang_rt.builtins --export-all --export-dynamic \</p>
              <p class="text-slate-400">&nbsp;&nbsp;-o public/linecount.wasm</p>
            </div>
          </div>
        </div>
      </div>

      <footer class="text-center text-slate-500 text-sm mt-8">
        <p>WASI Demo - 使用不同 JavaScript 库在浏览器中运行 WebAssembly</p>
      </footer>
    </div>
  `}gt(T`<${$t} />`,document.getElementById("app"));
