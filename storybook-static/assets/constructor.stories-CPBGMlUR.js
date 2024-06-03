import{j as l}from"./jsx-dev-runtime-CEwsr3ay.js";import{T as X,d as Z}from"./index-rDY4iNTK.js";import{h as D,d as N,H as w,u as ee,g as te,o as re,c as ne,a as ae,b as ie}from"./constructor-B65uS_Aq.js";import{a as y,r as h}from"./index-Bx7zHvXC.js";import{c as oe,a as ue,b as se,u as k,d as le,e as pe,f as de}from"./Divider-rt28LJEe.js";import{A as ce}from"./StyledFileInput-6dBZ88IO.js";import"./iframe-sToUBdDa.js";import"../sb-preview/runtime.js";import"./index-C8qaIH5S.js";import"./mapValues-CATVCxTF.js";import"./extends-CTlStxOy.js";import"./index-OYpLZbVD.js";import"./index-C-I6vmrZ.js";import"./index-CgLK7uth.js";import"./index-DrFu-skq.js";import"./index-zmhHS-aW.js";import"./StyledSelect-PkvvsB1k.js";import"./styled-CRBqG0hL.js";import"./index-s910cWeq.js";import"./jsx-runtime-D0l8YCyG.js";import"./Select-BOuRzbyi.js";import"./useFormControl-B9B9te7b.js";import"./isMuiElement-BPlPyW_H.js";import"./FormLabel-C3k4Jmrw.js";import"./index-bRUDMPgR.js";import"./Modal-rg8K5v9N.js";import"./Typography-B0eRT172.js";import"./Box-BYOjMODv.js";import"./ownerWindow-DvT1GKkC.js";import"./createChainedFunction-BO_9K8Jh.js";import"./exactProp-Bprm7WAE.js";import"./useControlled-BYMvB0Sq.js";import"./useId-Cewg4eI_.js";import"./createSvgIcon-CzBHBzEh.js";import"./GlobalStyles-DhD8qGYX.js";import"./ButtonBase-CJx3UMbi.js";import"./createSvgIcon-Dq0TKmNE.js";import"./StyledCheckbox-D2xzBR1Q.js";import"./FormControlLabel-BiPubNfy.js";import"./Checkbox-BMVk0THL.js";import"./SwitchBase-CoUSwA0z.js";import"./StyledCheckboxMultiple-D8YDjOmK.js";import"./FormGroup-BxHtxDe0.js";import"./StyledRadioButton-ClYV54z8.js";import"./StyledPhotoCheckbox-CawrYxtK.js";import"./Button-CxQubZvY.js";import"./StyledTextField-TowtTnS_.js";const{makeDecorator:me,addons:j}=__STORYBOOK_MODULE_PREVIEW_API__;var b="storybook/react-router-v6",ye="reactRouter",p={CLEAR:`${b}/clear`,NAVIGATION:`${b}/navigation`,STORY_LOADED:`${b}/story-loaded`,ROUTE_MATCHES:`${b}/route-matches`,ACTION_INVOKED:`${b}/action_invoked`,ACTION_SETTLED:`${b}/action_settled`,LOADER_INVOKED:`${b}/loader_invoked`,LOADER_SETTLED:`${b}/loader_settled`},U=y.createContext([]),B=y.createContext(void 0);function fe(){let[e,r]=h.useState([]),t=se;return t.Provider._context=new Proxy(t.Provider._context??{},{set(n,a,o){return a==="_currentValue"&&o!==void 0&&r(i=>o.matches.length>i.length?o.matches:i),Reflect.set(n,a,o)}}),e}function he(e){let r={};return e.forEach((t,n)=>{if(t instanceof File){r[n]={filename:t.name,filesize:t.size,filetype:t.type};return}r[n]=t}),r}async function O(e){let r=e.clone(),t=r.headers.get("content-type")||"",n;switch(!0){case t.startsWith("text"):n=await r.text();break;case t.startsWith("application/json"):n=await r.json();break;case t.startsWith("multipart/form-data"):case t.startsWith("application/x-www-form-urlencoded"):{n=he(await r.formData());break}}return n}var q=()=>{let e=h.useRef(0);return h.useCallback(async(r,t)=>{e.current++;let n=`${r}_${e.current}`;switch(r){case p.ACTION_INVOKED:{let{request:a,params:o,context:i}=t,d={url:a.url,method:a.method,body:await O(a)};return{key:n,type:r,data:{params:o,request:d,context:i}}}case p.ACTION_SETTLED:return{key:n,type:r,data:t};case p.LOADER_INVOKED:{let{request:a,params:o,context:i}=t,d={url:a.url,method:a.method,body:await O(a)};return{key:n,type:r,data:{params:o,request:d,context:i}}}case p.LOADER_SETTLED:return{key:n,type:r,data:t}}},[])};function be(){let e=j.getChannel(),r=q();return h.useCallback(t=>async function(n){if(t===void 0)return;e.emit(p.ACTION_INVOKED,await r(p.ACTION_INVOKED,n));let a=await t(n);return e.emit(p.ACTION_SETTLED,await r(p.ACTION_SETTLED,a)),a},[e,r])}function ge(){let e=j.getChannel(),r=q();return h.useCallback(t=>async function(n){if(t===void 0)return;e.emit(p.LOADER_INVOKED,await r(p.LOADER_INVOKED,n));let a=await t(n);return e.emit(p.LOADER_SETTLED,await r(p.LOADER_SETTLED,a)),a},[e,r])}function ve(){let e=be(),r=ge(),t=h.useCallback(n=>n.map(a=>{let{action:o,loader:i,children:d,lazy:s}=a,c={...a};return s&&(c.lazy=async function(){let u=await s(),m={...u};return u.action&&(m.action=e(u.action)),u.loader&&(m.loader=r(u.loader)),m}),o&&(c.action=e(o)),i&&(c.loader=r(i)),d&&(c.children=t(d)),c}),[e,r]);return t}var $=()=>{let e=y.useContext(B);if(e===void 0)throw new Error("useStory should be used inside <StoryContext>");return e};function H(e,r,t=0){return e.length===1&&(e[0].children===void 0||e[0].children.length===0)?[{...e[0],element:r}]:e.findIndex(n=>n.useStoryElement)!==-1?e.map(n=>n.useStoryElement?{...n,element:r}:n):e.map(n=>n.children?{...n,children:H(n.children,r)}:n)}var P;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(P||(P={}));function Ee(e,r){if(e===!1||e===null||typeof e>"u")throw new Error(r)}function xe(e,r){if(!e){typeof console<"u"&&console.warn(r);try{throw new Error(r)}catch{}}}var T;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(T||(T={}));function C(e,r){r===void 0&&(r={});let t=e;t.endsWith("*")&&t!=="*"&&!t.endsWith("/*")&&(xe(!1,'Route path "'+t+'" will be treated as if it were '+('"'+t.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+t.replace(/\*$/,"/*")+'".')),t=t.replace(/\*$/,"/*"));let n=t.startsWith("/")?"/":"",a=i=>i==null?"":typeof i=="string"?i:String(i),o=t.split(/\/+/).map((i,d,s)=>{if(d===s.length-1&&i==="*")return a(r["*"]);let c=i.match(/^:([\w-]+)(\??)$/);if(c){let[,u,m]=c,g=r[u];return Ee(m==="?"||g!=null,'Missing ":'+u+'" param'),a(g)}return i.replace(/\?$/g,"")}).filter(i=>!!i);return n+o.join("/")}var M=["post","put","patch","delete"];new Set(M);var De=["get",...M];new Set(De);function Ne({navigationHistory:e,location:r,routes:t}){if(e!==void 0){let u=[],m,g=Object.values(e);for(let v=0;v<g.length;v++){let{path:x,pathParams:A,searchParams:W,hash:z,state:G,isInitialLocation:Y}=g[v];Y&&(m=v);let S=_(t),Q=(typeof x=="function"?x(S,A??{}):x)??S;u.push({pathname:C(Q??"/",A),search:new URLSearchParams(W).toString(),hash:z,state:G})}return m??(m=u.length-1),{initialEntries:u,initialIndex:m}}let{path:n,pathParams:a,searchParams:o,hash:i,state:d}=r??{},s=_(t),c=(typeof n=="function"?n(s,a??{}):n)??s;return{initialEntries:[{pathname:C(c,a),search:new URLSearchParams(o).toString(),hash:i,state:d}],initialIndex:0}}function _(e=[],r="/"){if(e.length!==1)return r;let t=e[0],n=we(r,t.path);return t.children===void 0||t.children.length===0?n:_(t.children,n)}function we(e,r=""){let t=["","/"],n=e.split("/").filter(o=>!t.includes(o)),a=r.split("/").filter(o=>!t.includes(o));return"/"+[...n,...a].join("/")}function f(e,r){return Object.prototype.hasOwnProperty.call(e,r)}function _e(e){return arguments.length===0?[]:Array.isArray(e)?e:[e]}function ke(e){var r;return e===void 0?[{path:"/"}]:typeof e=="string"?[{path:e}]:(e=_e(e),e.length===1&&((r=e[0]).path??(r.path="/")),e)}var F=()=>y.useContext(U);function je(e){let r={};return e.forEach((t,n)=>{let a=r[n];if(typeof a=="string"){r[n]=[a,t];return}if(Array.isArray(a)){r[n]=[...a,t];return}r[n]=t}),r}var Ae=()=>{let e=k(),r=e.pathname;return e.search.length>0&&(r+=`?${e.search}`),e.hash.length>0&&(r+=`#${e.hash}`),r},Se=()=>{let e=h.useRef(0),r=k(),t=le(),[n]=pe(),a=de(),o=F(),i=je(n),d=Ae(),s=o.map(u=>{let m={path:u.route.path};return Object.keys(u.params).length>0&&(m.params=u.params),m}),c={url:d,path:r.pathname,routeParams:t,searchParams:i,hash:r.hash,routeState:r.state,routeMatches:s};return u=>{e.current++;let m=`${u}_${e.current}`;switch(u){case p.STORY_LOADED:return{key:m,type:u,data:c};case p.NAVIGATION:return{key:m,type:u,data:{...c,navigationType:a}};case p.ROUTE_MATCHES:return{key:m,type:u,data:{matches:s}}}}};function K(){let{renderStory:e,storyContext:r}=$(),t=j.getChannel(),n=k(),a=F(),o=Se(),i=h.useRef(),d=h.useRef(),s=h.useRef(),c=i.current!==void 0,u=c&&n.key!==i.current;return u&&d.current!==n.key&&(t.emit(p.NAVIGATION,o(p.NAVIGATION)),d.current=n.key),u&&a.length>0&&a!==s.current&&t.emit(p.ROUTE_MATCHES,o(p.ROUTE_MATCHES)),!c&&a.length>0&&(t.emit(p.STORY_LOADED,o(p.STORY_LOADED)),i.current=n.key,s.current=a),s.current=a,y.createElement(y.Fragment,null,e(r))}K.displayName="RouterLogger";function Oe(){let{addonParameters:e={}}=$(),{hydrationData:r,routing:t,navigationHistory:n,location:a}=e,o=ve(),i=h.useMemo(()=>{let d=ke(t),s=o(d),c=H(s,y.createElement(K,null)),{initialEntries:u,initialIndex:m}=Ne({navigationHistory:n,location:a,routes:c});return oe(c,{initialEntries:u,initialIndex:m,hydrationData:r})},[o,r,a,n,t]);return y.createElement(ue,{router:i,fallbackElement:y.createElement(Pe,null)})}function Pe(){return y.createElement("p",null,"Performing initial data load")}var Te=({renderStory:e,storyContext:r,addonParameters:t})=>{let n=fe();return y.createElement(B.Provider,{value:{renderStory:e,storyContext:r,addonParameters:t}},y.createElement(U.Provider,{value:n},y.createElement(Oe,null)))};function Ce(e){if(y.isValidElement(e))return!0;switch(!0){case y.isValidElement(e):case typeof e=="string":case typeof e=="number":case typeof e=="boolean":case e===null:case e===void 0:case(e instanceof Object&&f(e,Symbol.iterator)):return!0}return!1}function Ie(e){return Ce(e)?{element:e}:e}function Re(e={}){let r=["location","navigationHistory","routing"];if(Object.keys(e??{}).some(n=>r.includes(n)))return e;let t={routing:{},location:{},hydrationData:void 0};if(f(e,"routePath")&&(t.location.path=e.routePath,t.routing.path=e.routePath),f(e,"routeParams")&&(t.location.pathParams=e.routeParams),f(e,"routeState")&&(t.location.state=e.routeState),f(e,"routeHandle")&&(t.routing.handle=e.routeHandle),f(e,"searchParams")&&(t.location.searchParams=e.searchParams),f(e,"browserPath")&&(t.location.path=e.browserPath),f(e,"loader")&&(t.routing.loader=e.loader),f(e,"action")&&(t.routing.action=e.action),f(e,"errorElement")&&(t.routing.errorElement=e.errorElement),f(e,"hydrationData")&&(t.hydrationData=e.hydrationData),f(e,"shouldRevalidate")&&(t.routing.shouldRevalidate=e.shouldRevalidate),f(e,"routeId")&&(t.routing.id=e.routeId),f(e,"outlet")){let n=Ie(e.outlet);n.path??(n.path=""),t.routing.children=[n]}return t.routing.useStoryElement=!0,t}var Ve=me({name:"withRouter",parameterName:ye,wrapper:(e,r,{parameters:t})=>{let n=Re(t);return y.createElement(Te,{renderStory:e,storyContext:r,addonParameters:n})}});const Le="http://json-schema.org/draft-07/schema#",Ue="inputs",Be="array",qe=1,$e={anyOf:[{type:"object",properties:{inputtype:{type:"string",const:"text"},name:{type:"string"},value:{type:"string"},placeholder:{type:"string"},validation:{type:"string",enum:["none","default"]},disabled:{type:"boolean",const:!0},heading:{type:"string"},error:{type:"string"},status:{type:"string",const:"warning"},dividerTop:{type:"boolean",const:!0},dividerBottom:{type:"boolean",const:!0},helperInfo:{type:"object",minProperties:1,properties:{text:{type:"string"},link:{type:"object",properties:{text:{type:"string"},path:{type:"string"},type:{type:"string",enum:["internal","external"]}},required:["text","path","type"]}},additionalProperties:!1}},required:["inputtype","name","value","placeholder","validation"]},{type:"object",properties:{inputtype:{type:"string",const:"select"},name:{type:"string"},value:{type:"string"},placeholder:{type:"string"},options:{type:"array",items:{type:"object",properties:{value:{type:"string"},label:{type:"string"},disabled:{type:"boolean"}},required:["value","label","disabled"]}},disabled:{type:"boolean",const:!0},validation:{type:"string",enum:["none","default"]},heading:{type:"string"},error:{type:"string"},status:{type:"string",const:"warning"},dividerTop:{type:"boolean",const:!0},dividerBottom:{type:"boolean",const:!0},helperInfo:{type:"object",minProperties:1,properties:{text:{type:"string"},link:{type:"object",properties:{text:{type:"string"},path:{type:"string"},type:{type:"string",enum:["internal","external"]}},required:["text","path","type"]}},additionalProperties:!1}},required:["inputtype","name","value","placeholder","options","validation"]},{type:"object",properties:{inputtype:{type:"string",const:"radio"},name:{type:"string"},value:{type:"string"},validation:{type:"string",enum:["none","default"]},heading:{type:"string"},error:{type:"string"},status:{type:"string",const:"warning"},dividerTop:{type:"boolean",const:!0},dividerBottom:{type:"boolean",const:!0},helperInfo:{type:"object",minProperties:1,properties:{text:{type:"string"},link:{type:"object",properties:{text:{type:"string"},path:{type:"string"},type:{type:"string",enum:["internal","external"]}},required:["text","path","type"]}},additionalProperties:!1},options:{type:"array",minItems:1,items:{type:"object",properties:{value:{type:"string"},label:{type:"string"},disabled:{type:"boolean"},icon:{type:"string",enum:["telegram","viber","whatsapp"]}},required:["value","label","disabled"]}}},required:["inputtype","name","value","options","validation"]},{type:"object",properties:{inputtype:{type:"string",const:"checkboxMultiple"},name:{type:"string"},value:{type:"array",items:{type:"string"}},validation:{type:"string",enum:["none","default"]},heading:{type:"string"},error:{type:"string"},status:{type:"string",const:"warning"},dividerTop:{type:"boolean",const:!0},dividerBottom:{type:"boolean",const:!0},helperInfo:{type:"object",minProperties:1,properties:{text:{type:"string"},link:{type:"object",properties:{text:{type:"string"},path:{type:"string"},type:{type:"string",enum:["internal","external"]}},required:["text","path","type"]}},additionalProperties:!1},options:{type:"array",minItems:1,items:{type:"object",properties:{value:{type:"string"},label:{type:"string"},disabled:{type:"boolean"}},required:["value","label","disabled"]}}},required:["inputtype","name","value","options","validation"]},{type:"object",properties:{inputtype:{type:"string",const:"photoCheckbox"},name:{type:"string"},value:{type:"array",items:{type:"string"}},validation:{type:"string",enum:["none","default"]},heading:{type:"string"},error:{type:"string"},status:{type:"string",const:"warning"},dividerTop:{type:"boolean",const:!0},dividerBottom:{type:"boolean",const:!0},helperInfo:{type:"object",minProperties:1,properties:{text:{type:"string"},link:{type:"object",properties:{text:{type:"string"},path:{type:"string"},type:{type:"string",enum:["internal","external"]}},required:["text","path","type"]}},additionalProperties:!1},options:{type:"array",minItems:1,items:{type:"object",properties:{value:{type:"string"},label:{type:"string"},disabled:{type:"boolean"},img:{type:"string"},text:{type:"string"},details:{type:"object",properties:{text:{type:"string"},details:{type:"string"},img:{type:"string"},link:{type:"object",properties:{text:{type:"string"},path:{type:"string"},type:{type:"string",enum:["internal","external"]}},required:["text","path","type"]}},required:["text","details","img"]}},required:["value","label","disabled","img"]}}},required:["inputtype","name","value","options","validation"]},{type:"object",properties:{inputtype:{type:"string",const:"checkbox"},name:{type:"string"},value:{type:"boolean"},label:{type:"string"},validation:{type:"string",enum:["none","checked","unchecked"]},heading:{type:"string"},error:{type:"string"},status:{type:"string",const:"warning"},disabled:{type:"boolean",const:!0},dividerTop:{type:"boolean",const:!0},dividerBottom:{type:"boolean",const:!0},helperInfo:{type:"object",minProperties:1,properties:{text:{type:"string"},link:{type:"object",properties:{text:{type:"string"},path:{type:"string"},type:{type:"string",enum:["internal","external"]}},required:["text","path","type"]}},additionalProperties:!1}},required:["inputtype","name","value","label","validation"]},{type:"object",properties:{inputtype:{type:"string",const:"file"},name:{type:"string"},value:{type:"string"},placeholder:{type:"string"},validation:{type:"string",enum:["none","default"]},url:{type:"string"},disabled:{type:"boolean",const:!0},heading:{type:"string"},error:{type:"string"},status:{type:"string",const:"warning"},dividerTop:{type:"boolean",const:!0},dividerBottom:{type:"boolean",const:!0},drawerInfo:{type:"object",minProperties:1,properties:{text:{type:"string"},images:{type:"array",items:{type:"string"}}},additionalProperties:!1},helperInfo:{type:"object",minProperties:1,properties:{text:{type:"string"},link:{type:"object",properties:{text:{type:"string"},path:{type:"string"},type:{type:"string",enum:["internal","external"]}},required:["text","path","type"]}},additionalProperties:!1}},required:["inputtype","name","value","placeholder","validation","url"]}]},J={$schema:Le,title:Ue,type:Be,minItems:qe,items:$e},He=new ce,I=He.compile(J),Me=({data:e})=>{const{control:r,handleSubmit:t,setError:n,setValue:a,trigger:o,getValues:i,formState:{errors:d}}=ee({defaultValues:te(e),resolver:re(ne(ae(e))),mode:"onChange"});return h.useEffect(()=>{e.length>0&&e.forEach(s=>{s.error!==void 0&&n(s.name,{type:"custom",message:s.error})})},[e,n]),l.jsxDEV("form",{onSubmit:t(s=>{console.log(s)}),style:{display:"grid",rowGap:"16px"},children:[ie(e,d,r,a,o,()=>{console.log(i())}),l.jsxDEV("button",{type:"submit",children:"submit"},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/constructor/constructor.stories.tsx",lineNumber:69,columnNumber:7},void 0)]},void 0,!0,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/constructor/constructor.stories.tsx",lineNumber:56,columnNumber:5},void 0)},Fe=({url:e})=>{const[r,t]=h.useState(void 0);return h.useEffect(()=>{fetch(e).then(n=>n.json()).then(n=>{I(n)?(console.log("JSON SCHEMA VALID"),t(n)):(console.log(I.errors),alert("Полученный JSON объект не соответствует схеме!"))})},[e]),r!==null&&r===void 0?l.jsxDEV("p",{children:"Загрузка..."},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/constructor/constructor.stories.tsx",lineNumber:92,columnNumber:12},void 0):r===null?l.jsxDEV("p",{children:"Данные не соответствуют JSON Schema"},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/constructor/constructor.stories.tsx",lineNumber:96,columnNumber:12},void 0):l.jsxDEV(Me,{data:r},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/constructor/constructor.stories.tsx",lineNumber:99,columnNumber:10},void 0)},Ut={title:"Конструктор Форм",component:Fe,tags:["autodocs"],decorators:[Ve],parameters:{docs:{page:()=>l.jsxDEV(l.Fragment,{children:[l.jsxDEV(X,{},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/constructor/constructor.stories.tsx",lineNumber:111,columnNumber:11},void 0),l.jsxDEV("h2",{children:"Ресурсы:"},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/constructor/constructor.stories.tsx",lineNumber:112,columnNumber:11},void 0),l.jsxDEV("p",{children:l.jsxDEV("a",{href:"https://transform.tools",target:"_blank",rel:"noreferrer",children:"Transform"},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/constructor/constructor.stories.tsx",lineNumber:114,columnNumber:13},void 0)},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/constructor/constructor.stories.tsx",lineNumber:113,columnNumber:11},void 0),l.jsxDEV("p",{children:l.jsxDEV("a",{href:"https://json-schema-faker.js.org/",target:"_blank",rel:"noreferrer",children:"JSON Schema to mock JSON"},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/constructor/constructor.stories.tsx",lineNumber:119,columnNumber:13},void 0)},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/constructor/constructor.stories.tsx",lineNumber:118,columnNumber:11},void 0),l.jsxDEV("h2",{children:"Моковые запросы"},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/constructor/constructor.stories.tsx",lineNumber:128,columnNumber:11},void 0),l.jsxDEV("p",{children:["ФИО","  "," ",l.jsxDEV("strong",{children:"/fio"},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/constructor/constructor.stories.tsx",lineNumber:130,columnNumber:23},void 0)]},void 0,!0,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/constructor/constructor.stories.tsx",lineNumber:129,columnNumber:11},void 0),l.jsxDEV("p",{children:["Машины","  "," ",l.jsxDEV("strong",{children:"/auto"},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/constructor/constructor.stories.tsx",lineNumber:133,columnNumber:26},void 0)]},void 0,!0,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/constructor/constructor.stories.tsx",lineNumber:132,columnNumber:11},void 0),l.jsxDEV("h3",{children:"Объект формы после успешного сабмита можно посмотреть в браузерной консоли, как и ошибки валидации JSON схемы"},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/constructor/constructor.stories.tsx",lineNumber:136,columnNumber:11},void 0),l.jsxDEV("h2",{children:"JSON Schema"},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/constructor/constructor.stories.tsx",lineNumber:141,columnNumber:11},void 0),l.jsxDEV(Z,{language:"json",code:JSON.stringify(J,null,2)},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/constructor/constructor.stories.tsx",lineNumber:142,columnNumber:11},void 0)]},void 0,!0,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/constructor/constructor.stories.tsx",lineNumber:110,columnNumber:9},void 0)}}},E={name:"Конструктор",args:{url:"/auto"},parameters:{msw:{handlers:[D.get("/auto",async()=>(await N(2e3),w.json([{inputtype:"text",name:"place",value:"Воркута",validation:"none",placeholder:"Куда доставить автомобиль?",error:"В данный город доставка не осуществляется"},{inputtype:"radio",value:"",name:"radio",validation:"default",options:[{value:"winter",label:"Зима",disabled:!1},{value:"spring",label:"Весна",disabled:!1},{value:"summer",label:"Лето",disabled:!1},{value:"authum",label:"Осень",disabled:!1}]},{inputtype:"checkbox",validation:"unchecked",name:"radioOne",value:!1,label:"Моё доверенное лицо"},{inputtype:"checkboxMultiple",name:"chckbox",validation:"default",value:[],options:[{value:"winter",label:"Зима",disabled:!1},{value:"spring",label:"Весна",disabled:!1},{value:"summer",label:"Лето",disabled:!1},{value:"authum",label:"Осень",disabled:!1}]},{inputtype:"select",name:"developer",value:"Volkswagen",placeholder:"Выберете марку",validation:"default",options:[{value:"mercedes",label:"Мерседес",disabled:!1},{value:"audi",label:"Ауди",disabled:!1},{value:"vas",label:"АвтоВаз",disabled:!0},{value:"Volkswagen",label:"Фольксваген",disabled:!1}],status:"warning"},{inputtype:"select",name:"modelType",value:"",placeholder:"Выберете модель",validation:"default",options:[{value:"S-Class",label:"S-Class",disabled:!1},{value:"audiA4",label:"Ауди A4",disabled:!1},{value:"vesta",label:"Веста",disabled:!0},{value:"Passat",label:"Пассат",disabled:!1}]}]))),D.get("/fio",async()=>(await N(2e3),w.json([{inputtype:"text",name:"firstName",value:"",validation:"default",placeholder:"Укажите имя"},{inputtype:"text",name:"middleName",value:"",validation:"default",placeholder:"Укажите отчество"},{inputtype:"text",name:"lastName",value:"",validation:"default",placeholder:"Укажите фамилию"},{inputtype:"text",name:"funnyName",value:"Косой",validation:"none",placeholder:"Укажите кличку"},{inputtype:"select",name:"gender",value:"",placeholder:"Укажите пол",validation:"default",options:[{value:"male",label:"мужской",disabled:!1},{value:"female",label:"женский",disabled:!1},{value:"transgender",label:"Трансгендер",disabled:!0}],heading:"Неинклюзивное поле"}]))),D.get("/file",async()=>(await N(2e3),w.json([{inputtype:"file",name:"filee",value:"",url:"https://api.escuelajs.co/api/v1/files/upload",placeholder:"Приложи документ",validation:"default"}])))]}}};var R,V,L;E.parameters={...E.parameters,docs:{...(R=E.parameters)==null?void 0:R.docs,source:{originalSource:`{
  name: "Конструктор",
  args: {
    url: "/auto"
  },
  parameters: {
    msw: {
      handlers: [http.get("/auto", async () => {
        await delay(2000);
        return HttpResponse.json([{
          inputtype: "text",
          name: "place",
          value: "Воркута",
          validation: "none",
          placeholder: "Куда доставить автомобиль?",
          error: "В данный город доставка не осуществляется"
        }, {
          inputtype: "radio",
          value: "",
          name: "radio",
          validation: "default",
          options: [{
            value: "winter",
            label: "Зима",
            disabled: false
          }, {
            value: "spring",
            label: "Весна",
            disabled: false
          }, {
            value: "summer",
            label: "Лето",
            disabled: false
          }, {
            value: "authum",
            label: "Осень",
            disabled: false
          }]
        }, {
          inputtype: "checkbox",
          validation: "unchecked",
          name: "radioOne",
          value: false,
          label: "Моё доверенное лицо"
        }, {
          inputtype: "checkboxMultiple",
          name: "chckbox",
          validation: "default",
          value: [],
          options: [{
            value: "winter",
            label: "Зима",
            disabled: false
          }, {
            value: "spring",
            label: "Весна",
            disabled: false
          }, {
            value: "summer",
            label: "Лето",
            disabled: false
          }, {
            value: "authum",
            label: "Осень",
            disabled: false
          }]
        }, {
          inputtype: "select",
          name: "developer",
          value: "Volkswagen",
          placeholder: "Выберете марку",
          validation: "default",
          options: [{
            value: "mercedes",
            label: "Мерседес",
            disabled: false
          }, {
            value: "audi",
            label: "Ауди",
            disabled: false
          }, {
            value: "vas",
            label: "АвтоВаз",
            disabled: true
          }, {
            value: "Volkswagen",
            label: "Фольксваген",
            disabled: false
          }],
          status: "warning"
        }, {
          inputtype: "select",
          name: "modelType",
          value: "",
          placeholder: "Выберете модель",
          validation: "default",
          options: [{
            value: "S-Class",
            label: "S-Class",
            disabled: false
          }, {
            value: "audiA4",
            label: "Ауди A4",
            disabled: false
          }, {
            value: "vesta",
            label: "Веста",
            disabled: true
          }, {
            value: "Passat",
            label: "Пассат",
            disabled: false
          }]
        }]);
      }), http.get("/fio", async () => {
        await delay(2000);
        return HttpResponse.json([{
          inputtype: "text",
          name: "firstName",
          value: "",
          validation: "default",
          placeholder: "Укажите имя"
        }, {
          inputtype: "text",
          name: "middleName",
          value: "",
          validation: "default",
          placeholder: "Укажите отчество"
        }, {
          inputtype: "text",
          name: "lastName",
          value: "",
          validation: "default",
          placeholder: "Укажите фамилию"
        }, {
          inputtype: "text",
          name: "funnyName",
          value: "Косой",
          validation: "none",
          placeholder: "Укажите кличку"
        }, {
          inputtype: "select",
          name: "gender",
          value: "",
          placeholder: "Укажите пол",
          validation: "default",
          options: [{
            value: "male",
            label: "мужской",
            disabled: false
          }, {
            value: "female",
            label: "женский",
            disabled: false
          }, {
            value: "transgender",
            label: "Трансгендер",
            disabled: true
          }],
          heading: "Неинклюзивное поле"
        }]);
      }), http.get("/file", async () => {
        await delay(2000);
        return HttpResponse.json([{
          inputtype: "file",
          name: "filee",
          value: "",
          // error: "ошибка!",
          url: "https://api.escuelajs.co/api/v1/files/upload",
          placeholder: "Приложи документ",
          validation: "default"
        }]);
      })]
    }
  }
}`,...(L=(V=E.parameters)==null?void 0:V.docs)==null?void 0:L.source}}};const Bt=["Primary"];export{E as Primary,Bt as __namedExportsOrder,Ut as default};
