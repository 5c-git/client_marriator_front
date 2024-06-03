import{j as S}from"./jsx-dev-runtime-CEwsr3ay.js";import{g as I,a as L,k as g,s as x,d as l,h as $,u as E,_ as O,c as U,b as z}from"./styled-CRBqG0hL.js";import{c as B,B as V}from"./Box-BYOjMODv.js";import{_ as i}from"./extends-CTlStxOy.js";import{r as F}from"./index-Bx7zHvXC.js";import{P as e}from"./index-s910cWeq.js";import{j as y}from"./jsx-runtime-D0l8YCyG.js";function K(r){return I("MuiCircularProgress",r)}L("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const W=["className","color","disableShrink","size","style","thickness","value","variant"];let d=r=>r,_,j,D,N;const t=44,G=g(_||(_=d`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),Y=g(j||(j=d`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),Z=r=>{const{classes:s,variant:o,color:a,disableShrink:m}=r,u={root:["root",o,`color${l(a)}`],svg:["svg"],circle:["circle",`circle${l(o)}`,m&&"circleDisableShrink"]};return z(u,K,s)},q=x("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(r,s)=>{const{ownerState:o}=r;return[s.root,s[o.variant],s[`color${l(o.color)}`]]}})(({ownerState:r,theme:s})=>i({display:"inline-block"},r.variant==="determinate"&&{transition:s.transitions.create("transform")},r.color!=="inherit"&&{color:(s.vars||s).palette[r.color].main}),({ownerState:r})=>r.variant==="indeterminate"&&$(D||(D=d`
      animation: ${0} 1.4s linear infinite;
    `),G)),A=x("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(r,s)=>s.svg})({display:"block"}),H=x("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(r,s)=>{const{ownerState:o}=r;return[s.circle,s[`circle${l(o.variant)}`],o.disableShrink&&s.circleDisableShrink]}})(({ownerState:r,theme:s})=>i({stroke:"currentColor"},r.variant==="determinate"&&{transition:s.transitions.create("stroke-dashoffset")},r.variant==="indeterminate"&&{strokeDasharray:"80px, 200px",strokeDashoffset:0}),({ownerState:r})=>r.variant==="indeterminate"&&!r.disableShrink&&$(N||(N=d`
      animation: ${0} 1.4s ease-in-out infinite;
    `),Y)),w=F.forwardRef(function(s,o){const a=E({props:s,name:"MuiCircularProgress"}),{className:m,color:u="primary",disableShrink:M=!1,size:f=40,style:R,thickness:n=3.6,value:p=0,variant:k="indeterminate"}=a,T=O(a,W),c=i({},a,{color:u,disableShrink:M,size:f,thickness:n,value:p,variant:k}),h=Z(c),v={},b={},C={};if(k==="determinate"){const P=2*Math.PI*((t-n)/2);v.strokeDasharray=P.toFixed(3),C["aria-valuenow"]=Math.round(p),v.strokeDashoffset=`${((100-p)/100*P).toFixed(3)}px`,b.transform="rotate(-90deg)"}return y.jsx(q,i({className:U(h.root,m),style:i({width:f,height:f},b,R),ownerState:c,ref:o,role:"progressbar"},C,T,{children:y.jsx(A,{className:h.svg,ownerState:c,viewBox:`${t/2} ${t/2} ${t} ${t}`,children:y.jsx(H,{className:h.circle,style:v,ownerState:c,cx:t,cy:t,r:(t-n)/2,fill:"none",strokeWidth:n})})}))});w.propTypes={classes:e.object,className:e.string,color:e.oneOfType([e.oneOf(["inherit","primary","secondary","error","info","success","warning"]),e.string]),disableShrink:B(e.bool,r=>r.disableShrink&&r.variant&&r.variant!=="indeterminate"?new Error("MUI: You have provided the `disableShrink` prop with a variant other than `indeterminate`. This will have no effect."):null),size:e.oneOfType([e.number,e.string]),style:e.object,sx:e.oneOfType([e.arrayOf(e.oneOfType([e.func,e.object,e.bool])),e.func,e.object]),thickness:e.number,value:e.number,variant:e.oneOf(["determinate","indeterminate"])};const J=w,Q=g`
  from { opacity: 0 }
  to { opacity: 1 }
`,X=()=>S.jsxDEV(V,{sx:{position:"fixed",zIndex:1,top:0,left:0,display:"flex",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",backgroundColor:"rgba(17, 17, 17, 0.2)",animation:`${Q} 0.4s ease-in-out`},children:S.jsxDEV(J,{color:"corp"},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/Loader/Loader.tsx",lineNumber:24,columnNumber:5},void 0)},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/Loader/Loader.tsx",lineNumber:9,columnNumber:3},void 0);X.__docgenInfo={description:"",methods:[],displayName:"Loader"};export{X as L};
