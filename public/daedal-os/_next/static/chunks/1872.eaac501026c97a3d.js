!function(){"use strict";let e;let s={camera:{far:400,fov:30,near:.1},color:"hsl(225, 40%, 20%)",colorCycleSpeed:10,forceAnimate:!0,hh:50,hue:225,lightness:20,material:{options:{fog:!1,wireframe:!1}},saturation:40,shininess:35,waveHeight:20,waveSpeed:.25,ww:50},t={gyroControls:!1,mouseControls:!1,mouseEase:!1,touchControls:!1},a=["/daedal-os/System/Vanta.js/three.min.js","/daedal-os/System/Vanta.js/vanta.waves.min.js"];globalThis.addEventListener("message",({data:o})=>{if("undefined"!=typeof WebGLRenderingContext){if("init"===o)globalThis.importScripts(...a);else if(o instanceof DOMRect){let{width:s,height:t}=o;null==e||e.renderer.setSize(s,t),null==e||e.resize()}else{let{canvas:a,config:i,devicePixelRatio:n}=o,{VANTA:{current:r=e,WAVES:l}={}}=globalThis;if(!a||!l)return;r&&r.destroy();try{e=l({...i||s,...t,canvas:a,devicePixelRatio:n})}catch(e){globalThis.postMessage({message:null==e?void 0:e.message,type:"[error]"})}}}},{passive:!0})}(),_N_E={};