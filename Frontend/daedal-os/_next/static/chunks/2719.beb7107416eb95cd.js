"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2719],{10753:function(A,e,i){var a=i(8897),o=i(10508),r=i(67278);let t=(0,o.ZP)(a.m.li)(["display:flex;min-width:0;overflow:hidden;place-content:center;position:relative;width:",";&::before{background-color:",";background-image:",";border-bottom:",';bottom:0;content:"";height:',";margin:",";position:absolute;transition-duration:0.1s;transition-property:",";width:",";z-index:-1;}&:hover{&::before{background-color:",";height:100%;margin:0;width:100%;}}&:active{&::before{background-color:",";}}figure{align-items:center;display:flex;margin-bottom:",";margin-left:4px;padding:4px;figcaption{color:",";font-size:",";margin:0 4px;overflow-x:hidden;text-overflow:ellipsis;white-space:nowrap;}picture{height:",";position:relative;top:1px;width:",";}}> ","{align-items:center;display:flex;figure{width:100%;}}"],({theme:A})=>A.sizes.taskbar.entry.maxWidth,({$foreground:A,$progress:e,theme:i})=>A?e&&e>0&&e<100?i.colors.taskbar.foregroundProgress:i.colors.taskbar.foreground:"",({$progress:A,theme:e})=>A&&A>0&&A<100?`linear-gradient(to right, ${e.colors.progressBackground} 0% ${A}%, transparent ${A}% 100%)`:"",({$progress:A,theme:e})=>`
        ${e.sizes.taskbar.entry.borderSize} solid ${A&&A>0&&A<100?e.colors.progress:e.colors.highlight}
      `,({$foreground:A})=>A?"100%":0,({$foreground:A})=>A?"":"0 4px",({$foreground:A})=>A?"all":"width",({$foreground:A})=>A?"100%":"calc(100% - 8px)",({$foreground:A,theme:e})=>A?e.colors.taskbar.foregroundHover:e.colors.taskbar.hover,({$foreground:A,theme:e})=>A?e.colors.taskbar.activeForeground:e.colors.taskbar.active,({theme:A})=>A.sizes.taskbar.entry.borderSize,({theme:A})=>A.colors.text,({theme:A})=>A.sizes.taskbar.entry.fontSize,({theme:A})=>A.sizes.taskbar.entry.iconSize,({theme:A})=>A.sizes.taskbar.entry.iconSize,r.Z);e.Z=t},22719:function(A,e,i){i.r(e),i.d(e,{default:function(){return C}});var a=i(85893),o=i(67294),r=i(5152),t=i.n(r),n=i(51526),s=i(10753),l=i(10508),g=i(97836),c=()=>{let{sizes:{taskbar:A}}=(0,l.Fg)();return{animate:"active",exit:"initial",initial:"initial",transition:{duration:g.Nb.WINDOW},variants:{active:{width:A.entry.maxWidth},initial:{width:0}}}},d=i(64146),u=i(67318),h=i(58437),b=i(76488),p=i(67278),k=i(46581),m=i(6484);let f=t()(()=>i.e(4534,"high").then(i.bind(i,14534)),{loadableGenerated:{webpack:()=>[14534]}});var C=(0,o.memo)(({icon:A,id:e,title:i})=>{let r=(0,u.Z)(e),{foregroundId:t,setForegroundId:l}=(0,b.k)(),C=e===t,{linkElement:E,minimize:v,processes:{[e]:B}}=(0,h.z)(),{minimized:w,progress:z}=B||{},Q=(0,o.useCallback)(A=>{A&&E(e,"taskbarEntry",A)},[e,E]),[x,R]=(0,o.useState)(!1),S=()=>R(!1),M=(0,o.useMemo)(()=>(0,m.G6)()?g.Yj:{},[]);return(0,a.jsxs)(s.Z,{$foreground:C,$progress:z,onClick:S,onMouseEnter:()=>R(!0),onMouseLeave:S,...c(),...(0,d.Z)(e),children:[(0,a.jsx)(n.M,{initial:!1,presenceAffectsLayout:!1,children:x&&(0,a.jsx)(f,{id:e})}),(0,a.jsx)(p.Z,{ref:Q,onClick:()=>{(w||C)&&v(e),l(C?r:e)},...M,...(0,m.PS)(i),children:(0,a.jsxs)("figure",{children:[(0,a.jsx)(k.Z,{alt:i,imgSize:16,src:A}),(0,a.jsx)("figcaption",{children:i})]})})]})})},64146:function(A,e,i){i.d(e,{Z:function(){return l}});var a=i(67294),o=i(23561),r=i(7502),t=i(58437),n=i(97836),s=i(76488),l=A=>{let{contextMenu:e}=(0,r.H)(),{onClose:i,onMaximize:l,onMinimize:g}=(0,o.Z)(A),{processes:{[A]:c}}=(0,t.z)(),{setForegroundId:d}=(0,s.k)(),{allowResizing:u=!0,componentWindow:h,hideMaximizeButton:b,hideMinimizeButton:p,maximized:k,minimized:m}=c||{},f=(0,a.useCallback)(()=>{d(A),null==h||h.focus(n.eS)},[h,A,d]);return(0,a.useMemo)(()=>null==e?void 0:e(()=>{let A=k||m,e=!b||!p;return[e&&{action:()=>{m?g():l(),f()},disabled:!A,icon:A?"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABnRSTlMAAAAAAABupgeRAAAAOklEQVR4AWMYVmA2BiBN/6JFi3DKrcUAEEGcGnZiAIggTg1HwQCNDSSpp+H8hQtoiECAXMcADMMbAABMtF75qvi0qwAAAABJRU5ErkJggg==":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAJElEQVR42mNABaPA09PzPzZMsaFk20x/A2D8gTIAE9Mp+kYBAJPzT5+OMe9rAAAAAElFTkSuQmCC",label:"Restore"},!p&&{action:g,disabled:m,icon:m?"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGElEQVR42mMYPGAUjAJPT8//+DCNDRgFAPTaHaFVv24VAAAAAElFTkSuQmCC":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAIUlEQVR42mMYPGAUjIIDBw78x4cJGnDu3Ln/+DB+3aMAAPFzNUFuAVJEAAAAAElFTkSuQmCC",label:"Minimize"},!b&&{action:()=>{l(),f()},disabled:A||!u,icon:A?"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAHklEQVR42mOgEhgFnp6e//Fh+hmALj5UDBj4QBwFANQKUXn4YyGJAAAAAElFTkSuQmCC":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAR0lEQVR42u3IoRHAMAzFUO+/gllKG5IgD2DujX4vC8ikMO9ORHb9xN1FWWc8Q5R15jt1gs/22jrBZxGhE3yWmaKsU1Wi7EIfHneIsXEKuhAAAAAASUVORK5CYII=",label:"Maximize"},e&&n.Os,{action:i,icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABnRSTlMAAAAAAABupgeRAAAAMElEQVR4AWMgEoyC2TCAwsYPFqMCouzZCQPEOmzvnj0QRJTqo6iAgOoLMIDCHsYAACjTO7/gCQlBAAAAAElFTkSuQmCC",label:"Close"}].filter(Boolean)}),[u,e,f,b,p,k,m,i,l,g])}},23561:function(A,e,i){var a=i(67294),o=i(67318),r=i(58437),t=i(76488),n=i(86178),s=i(97836);e.Z=A=>{let e=(0,o.Z)(A),{setForegroundId:i,removeFromStack:l}=(0,t.k)(),{closeWithTransition:g,maximize:c,minimize:d}=(0,r.z)(),u=(0,n.R)(),h=(0,a.useCallback)(()=>{d(A),i(e)},[A,d,e,i]),b=(0,a.useCallback)(()=>{var e,i;c(A),null===(i=u.current[A])||void 0===i||null===(e=i.componentWindow)||void 0===e||e.focus(s.eS)},[A,c,u]);return{onClose:(0,a.useCallback)(()=>{l(A),g(A),i(e)},[g,A,e,l,i]),onMaximize:b,onMinimize:h}}},67318:function(A,e,i){var a=i(58437),o=i(76488);e.Z=A=>{let{stackOrder:e=[]}=(0,o.k)(),{processes:i}=(0,a.z)();return e.find(e=>{var a;return e!==A&&!(null==i?void 0:null===(a=i[e])||void 0===a?void 0:a.minimized)})||""}}}]);