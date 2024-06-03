import{r as c}from"./index-Bx7zHvXC.js";import{c as E,R as y,a as b,O as g}from"./Divider-rt28LJEe.js";/**
 * @remix-run/router v1.16.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function u(){return u=Object.assign?Object.assign.bind():function(n){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(n[i]=o[i])}return n},u.apply(this,arguments)}var f;(function(n){n.Pop="POP",n.Push="PUSH",n.Replace="REPLACE"})(f||(f={}));function v(n,t){if(n===!1||n===null||typeof n>"u")throw new Error(t)}var p;(function(n){n.data="data",n.deferred="deferred",n.redirect="redirect",n.error="error"})(p||(p={}));function P(n){return n.index===!0}function R(n,t,o,i){return o===void 0&&(o=[]),i===void 0&&(i={}),n.map((d,e)=>{let a=[...o,e],l=typeof d.id=="string"?d.id:a.join("-");if(v(d.index!==!0||!d.children,"Cannot specify children on an index route"),v(!i[l],'Found a route id collision on id "'+l+`".  Route id's must be globally unique within Data Router usages`),P(d)){let r=u({},d,t(d),{id:l});return i[l]=r,r}else{let r=u({},d,t(d),{id:l,children:void 0});return i[l]=r,d.children&&(r.children=R(d.children,t,a,i)),r}})}const m=["post","put","patch","delete"];new Set(m);const w=["get",...m];new Set(w);/**
 * @remix-run/testing v2.9.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function S(n,t={}){return function({initialEntries:i,initialIndex:d,hydrationData:e,future:a}){let l=c.useRef(),r=c.useRef();if(l.current==null){r.current={future:{v3_fetcherPersist:(a==null?void 0:a.v3_fetcherPersist)===!0,v3_relativeSplatPath:(a==null?void 0:a.v3_relativeSplatPath)===!0,unstable_singleFetch:(a==null?void 0:a.unstable_singleFetch)===!0},manifest:{routes:{},entry:{imports:[],module:""},url:"",version:""},routeModules:{},isSpaMode:!1};let h=x(R(n,s=>s),t,r.current.manifest,r.current.routeModules);l.current=E(h,{initialEntries:i,initialIndex:d,hydrationData:e})}return c.createElement(y.Provider,{value:r.current},c.createElement(b,{router:l.current}))}}function x(n,t,o,i,d){return n.map(e=>{if(!e.id)throw new Error("Expected a route.id in @remix-run/testing processRoutes() function");let{loader:a,action:l}=e,r={id:e.id,path:e.path,index:e.index,Component:e.Component,ErrorBoundary:e.ErrorBoundary,action:l?s=>l({...s,context:t}):void 0,loader:a?s=>a({...s,context:t}):void 0,handle:e.handle,shouldRevalidate:e.shouldRevalidate},h={id:e.id,path:e.path,index:e.index,parentId:d,hasAction:e.action!=null,hasLoader:e.loader!=null,hasClientAction:!1,hasClientLoader:!1,hasErrorBoundary:e.ErrorBoundary!=null,module:"build/stub-path-to-module.js"};return o.routes[r.id]=h,i[e.id]={default:e.Component||g,ErrorBoundary:e.ErrorBoundary||void 0,handle:e.handle,links:e.links,meta:e.meta,shouldRevalidate:e.shouldRevalidate},e.children&&(r.children=x(e.children,t,o,i,r.id)),r})}export{S as c};
