import{P as n}from"./index-s910cWeq.js";import{c as I}from"./Box-BYOjMODv.js";import{r as a,a as M}from"./index-Bx7zHvXC.js";import{e as j,T as P,f as W,g as $,a as O,s as w,d as b,u as N,m as D,_ as L,c as U,b as _}from"./styled-CRBqG0hL.js";import{_ as u}from"./extends-CTlStxOy.js";import{j as A}from"./jsx-runtime-D0l8YCyG.js";const V=typeof window<"u"?a.useLayoutEffect:a.useEffect;function k(t){const{prototype:e={}}=t;return!!e.isReactComponent}function z(t,e,o,i,c){const r=t[e],p=c||e;if(r==null||typeof window>"u")return null;let s;return typeof r=="function"&&!k(r)&&(s="Did you accidentally provide a plain function component instead?"),s!==void 0?new Error(`Invalid ${i} \`${p}\` supplied to \`${o}\`. Expected an element type that can hold a ref. ${s} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const st=I(n.elementType,z),F=n.oneOfType([n.func,n.object]),it=F;function H(t,e){typeof t=="function"?t(e):t&&(t.current=e)}function ct(t){const e=a.useRef(t);return V(()=>{e.current=t}),a.useRef((...o)=>(0,e.current)(...o)).current}function pt(...t){return a.useMemo(()=>t.every(e=>e==null)?null:e=>{t.forEach(o=>{H(o,e)})},t)}const d={};function G(t,e){const o=a.useRef(d);return o.current===d&&(o.current=t(e)),o}const J=[];function Y(t){a.useEffect(t,J)}class f{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new f}start(e,o){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,o()},e)}}function ut(){const t=G(f.create).current;return Y(t.disposeEffect),t}function lt(){const t=j(W);return a.useDebugValue(t),t[P]||t}const ft=M.createContext(null);function Z(t){return $("MuiTypography",t)}O("MuiTypography",["root","h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","inherit","button","caption","overline","alignLeft","alignRight","alignCenter","alignJustify","noWrap","gutterBottom","paragraph"]);const q=["align","className","component","gutterBottom","noWrap","paragraph","variant","variantMapping"],K=t=>{const{align:e,gutterBottom:o,noWrap:i,paragraph:c,variant:r,classes:p}=t,s={root:["root",r,t.align!=="inherit"&&`align${b(e)}`,o&&"gutterBottom",i&&"noWrap",c&&"paragraph"]};return _(s,Z,p)},Q=w("span",{name:"MuiTypography",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:o}=t;return[e.root,o.variant&&e[o.variant],o.align!=="inherit"&&e[`align${b(o.align)}`],o.noWrap&&e.noWrap,o.gutterBottom&&e.gutterBottom,o.paragraph&&e.paragraph]}})(({theme:t,ownerState:e})=>u({margin:0},e.variant==="inherit"&&{font:"inherit"},e.variant!=="inherit"&&t.typography[e.variant],e.align!=="inherit"&&{textAlign:e.align},e.noWrap&&{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},e.gutterBottom&&{marginBottom:"0.35em"},e.paragraph&&{marginBottom:16})),T={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p",inherit:"p"},X={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},S=t=>X[t]||t,v=a.forwardRef(function(e,o){const i=N({props:e,name:"MuiTypography"}),c=S(i.color),r=D(u({},i,{color:c})),{align:p="inherit",className:s,component:h,gutterBottom:x=!1,noWrap:E=!1,paragraph:m=!1,variant:l="body1",variantMapping:g=T}=r,R=L(r,q),y=u({},r,{align:p,color:c,className:s,component:h,gutterBottom:x,noWrap:E,paragraph:m,variant:l,variantMapping:g}),C=h||(m?"p":g[l]||T[l])||"span",B=K(y);return A.jsx(Q,u({as:C,ref:o,ownerState:y,className:U(B.root,s)},R))});v.propTypes={align:n.oneOf(["center","inherit","justify","left","right"]),children:n.node,classes:n.object,className:n.string,component:n.elementType,gutterBottom:n.bool,noWrap:n.bool,paragraph:n.bool,sx:n.oneOfType([n.arrayOf(n.oneOfType([n.func,n.object,n.bool])),n.func,n.object]),variant:n.oneOfType([n.oneOf(["body1","body2","button","caption","h1","h2","h3","h4","h5","h6","inherit","overline","subtitle1","subtitle2"]),n.string]),variantMapping:n.object};const ht=v;export{ht as T,V as a,ct as b,pt as c,f as d,ft as e,ut as f,st as g,it as r,H as s,lt as u};
