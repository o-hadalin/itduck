function $(t){const{slidesToShow:e,slidesToScroll:n,loop:s}=t.config,{isStatic:i,totalSlides:a}=t,o=[],r=a-1;for(let c=0;c<a;c+=n){const l=c+e-1;if(l>r)if(s){const u=l-a;o.push([c,u])}else{const u=r-e+1,p=o.length-1;(o.length===0||o.length>0&&o[p][0]!==u)&&o.push([u,r]);break}else o.push([c,l]);if(i)break}return o}function E(t){const{totalSlides:e}=t,{loop:n}=t.config,s=$(t),i=[],a=s.length-1;for(let o=0;o<s.length;o++){let r,c;n?(r=o===a?0:o+1,c=o===0?a:o-1):(r=o===a?a:o+1,c=o===0?0:o-1);const l=s[o][0],x=s[r][0],u=s[c][0];let p=x-l;x<l&&(p+=e);let w=l-u;u>l&&(w+=e),i.push({page:s[o],next:{stateIndex:r,moveSlides:p},prev:{stateIndex:c,moveSlides:w}})}return i}const h="start",b="end";function q(t){const{slidesToScroll:e,slidesToShow:n}=t.config,{totalSlides:s,config:i}=t;if(s<n&&(i.slidesToShow=s),!(s<=n)&&(e>n&&(i.slidesToScroll=n),s<e+n)){const a=s-n;i.slidesToScroll=a}}class X{constructor(e,n){this.config=n,this.totalSlides=e,this.isTransitioning=!1,C(this,e,n)}next(e=1){if(this.isTransitioning||this.isStatic)return;const{stateIndex:n}=this;let s=0,i=n;for(let a=0;a<e;a++){const o=this.states[i];s+=o.next.moveSlides,i=o.next.stateIndex}if(i!==n)return this.stateIndex=i,[n,s]}prev(e=1){if(this.isTransitioning||this.isStatic)return;const{stateIndex:n}=this;let s=0,i=n;for(let a=0;a<e;a++){const o=this.states[i];s+=o.prev.moveSlides,i=o.prev.stateIndex}if(i!==n)return this.stateIndex=i,[n,s]}}function C(t,e,n){t.stateIndex=0,q(t),t.isStatic=e<=n.slidesToShow,t.states=E(t)}function F(t,e){const n=requestAnimationFrame;if(!t.config.loop)A(t);else{y(t),t.offset=-1*e,f(t),N(t,e);const s=()=>{n(()=>{m(t),n(()=>{t.offset=0,f(t),T(t)})})};t.isDragging?d()?t.track.addEventListener("touchend",s,{once:!0}):t.track.addEventListener("pointerup",s,{once:!0}):n(s)}}function z(t,e){const n=requestAnimationFrame;t.config.loop?(t.offset=-1*e,f(t),setTimeout(()=>{G(t,e),y(t),t.offset=0,f(t),n(()=>{n(()=>{m(t),T(t)})})},t.config.transitionDuration)):A(t)}function T(t){if(t.onSlideCbs){const e=t.states[t.stateIndex],[n,s]=e.page;t.onSlideCbs.forEach(i=>i(t.stateIndex,n,s))}}function A(t){t.offset=-1*t.states[t.stateIndex].page[0],f(t),T(t)}function N(t,e){const n=t.slides.length;for(let s=0;s<e;s++){const i=t.slides[n-1];t.track.prepend(i)}}function G(t,e){for(let n=0;n<e;n++)t.track.append(t.slides[0])}function f(t){const{track:e,offset:n,dragged:s}=t;n===0?e.style.transform=`translate3d(${s}px,0px,0px)`:e.style.transform=`translate3d(  calc( ${s}px + ${n} * (var(--slide-width) + ${t.config.slideGap})),0px,0px)`}function m(t){t.track.style.transitionDuration=`${t.config.transitionDuration}ms`}function y(t){t.track.style.transitionDuration="0ms"}const v=10,d=()=>"ontouchstart"in window;function B(t){const e=this,n=e.slider;n.isTransitioning||(n.dragged=0,e.isScrolled=!1,e.startMouseClientX="touches"in t?t.touches[0].clientX:t.clientX,"touches"in t||(t.target||e).setPointerCapture(t.pointerId),y(n),M(e,"addEventListener"))}function D(t){const e=this,n="touches"in t?t.touches[0].clientX:t.clientX,s=e.slider.dragged=n-e.startMouseClientX,i=Math.abs(s);i>5&&(e.slider.isDragging=!0),i>15&&t.preventDefault(),e.slider.dragged=s,f(e.slider),!e.isScrolled&&e.slider.config.loop&&s>v&&(e.isScrolled=!0,e.slider.prev())}function S(){const t=this,e=t.slider.dragged;t.slider.isDragging=!1,M(t,"removeEventListener"),t.slider.dragged=0,f(t.slider),m(t.slider),t.isScrolled||(e<-1*v?t.slider.next():e>v&&t.slider.prev())}const O=t=>t.preventDefault();function W(t){const e=t.track;e.slider=t;const n=d()?"touchstart":"pointerdown";e.addEventListener(n,B),e.addEventListener("click",s=>{(t.isTransitioning||t.isDragging)&&(s.preventDefault(),s.stopImmediatePropagation(),s.stopPropagation())},{capture:!0}),e.addEventListener("dragstart",O)}function M(t,e){t[e]("contextmenu",S),d()?(t[e]("touchend",S),t[e]("touchmove",D)):(t[e]("pointerup",S),t[e]("pointermove",D))}function H(t){const e=t.config;if(!e.enableAutoplay)return;const n=e.autoplayDirection==="to left"?"next":"prev";t.autoplayTimer=setInterval(()=>{t[n]()},e.autoplayInterval),e.stopAutoplayOnInteraction&&t.el.addEventListener(d()?"touchstart":"mousedown",()=>{clearInterval(t.autoplayTimer)},{once:!0})}const I={slideGap:"20px",slidesToScroll:1,slidesToShow:1,loop:!0,enableAutoplay:!1,stopAutoplayOnInteraction:!0,autoplayInterval:3e3,autoplayDirection:"to left",enablePagination:!0,transitionDuration:300,transitionTimingFunction:"ease",draggable:!0};function L(t){const e={...I};for(const n in t)if(window.matchMedia(n).matches){const s=t[n];for(const i in s)e[i]=s[i]}return e}function R(t){const e=t.el.querySelector(".blaze-prev"),n=t.el.querySelector(".blaze-next");e&&(e.onclick=()=>{t.prev()}),n&&(n.onclick=()=>{t.next()})}function U(t){if(!t.config.enablePagination||t.isStatic)return;const e=t.el.querySelector(".blaze-pagination");if(!e)return;t.paginationButtons=[];const n=t.states.length;for(let s=0;s<n;s++){const i=document.createElement("button");t.paginationButtons.push(i),i.textContent=1+s+"",i.ariaLabel=`${s+1} of ${n}`,e.append(i),i.slider=t,i.index=s,i.onclick=_}t.paginationButtons[0].classList.add("active")}function _(){const t=this.index,e=this.slider,n=e.stateIndex,s=e.config.loop,i=Math.abs(t-n),a=e.states.length-i,r=i>e.states.length/2&&s;t>n?r?e.prev(a):e.next(i):r?e.next(a):e.prev(i)}function g(t,e=t.config.transitionDuration){t.isTransitioning=!0,setTimeout(()=>{t.isTransitioning=!1},e)}class j extends X{constructor(e,n){const s=e.querySelector(".blaze-track"),i=s.children,a=n?L(n):{...I};super(i.length,a),this.config=a,this.el=e,this.track=s,this.slides=i,this.offset=0,this.dragged=0,this.isDragging=!1,this.el.blazeSlider=this,this.passedConfig=n;const o=this;s.slider=o,k(a,o);let r=!1,c=0;window.addEventListener("resize",()=>{if(c===0){c=window.innerWidth;return}const l=window.innerWidth;c!==l&&(c=l,r||(r=!0,setTimeout(()=>{o.refresh(),r=!1},200)))})}next(e){if(this.isTransitioning)return;const n=super.next(e);if(!n){g(this);return}const[s,i]=n;P(this,s),g(this),z(this,i)}prev(e){if(this.isTransitioning)return;const n=super.prev(e);if(!n){g(this);return}const[s,i]=n;P(this,s),g(this),F(this,i)}stopAutoplay(){clearInterval(this.autoplayTimer)}destroy(){var e;this.track.removeEventListener(d()?"touchstart":"pointerdown",B),this.stopAutoplay(),(e=this.paginationButtons)==null||e.forEach(n=>n.remove()),this.el.classList.remove("static"),this.el.classList.remove(h)}refresh(){const e=this.passedConfig?L(this.passedConfig):{...I};this.destroy(),k(e,this)}onSlide(e){return this.onSlideCbs||(this.onSlideCbs=new Set),this.onSlideCbs.add(e),()=>this.onSlideCbs.delete(e)}}function P(t,e){const n=t.el.classList,s=t.stateIndex,i=t.paginationButtons;t.config.loop||(s===0?n.add(h):n.remove(h),s===t.states.length-1?n.add(b):n.remove(b)),i&&t.config.enablePagination&&(i[e].classList.remove("active"),i[s].classList.add("active"))}function k(t,e){const n=e.track;e.slides=n.children,e.offset=0,e.config=t,C(e,e.totalSlides,t),t.loop||e.el.classList.add(h),t.enableAutoplay&&!t.loop&&(t.enableAutoplay=!1),n.style.transitionProperty="transform",n.style.transitionTimingFunction=e.config.transitionTimingFunction,n.style.transitionDuration=`${e.config.transitionDuration}ms`;const{slidesToShow:s,slideGap:i}=e.config;e.el.style.setProperty("--slides-to-show",s+""),e.el.style.setProperty("--slide-gap",i),e.isStatic?e.el.classList.add("static"):t.draggable&&W(e),U(e),H(e),R(e),f(e)}export{j as B};
//# sourceMappingURL=vendor-dc46b456.js.map
