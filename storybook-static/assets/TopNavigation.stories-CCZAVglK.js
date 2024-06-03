import{j as u}from"./jsx-dev-runtime-CEwsr3ay.js";import{T as h,D as y,C as k,A as _,e as P}from"./index-rDY4iNTK.js";import{T as j}from"./TopNavigation-jZdIrWSB.js";import"./index-Bx7zHvXC.js";import"./iframe-sToUBdDa.js";import"../sb-preview/runtime.js";import"./index-C8qaIH5S.js";import"./mapValues-CATVCxTF.js";import"./extends-CTlStxOy.js";import"./index-OYpLZbVD.js";import"./index-C-I6vmrZ.js";import"./index-CgLK7uth.js";import"./index-DrFu-skq.js";import"./styled-CRBqG0hL.js";import"./index-s910cWeq.js";import"./jsx-runtime-D0l8YCyG.js";import"./createSvgIcon-Dq0TKmNE.js";import"./createSvgIcon-CzBHBzEh.js";import"./ownerWindow-DvT1GKkC.js";import"./Typography-B0eRT172.js";import"./Box-BYOjMODv.js";import"./createChainedFunction-BO_9K8Jh.js";import"./isMuiElement-BPlPyW_H.js";import"./useId-Cewg4eI_.js";import"./useControlled-BYMvB0Sq.js";import"./ButtonBase-CJx3UMbi.js";import"./Button-CxQubZvY.js";const ru={title:"Общие компоненты/TopNavigation",component:j,tags:["autodocs"],parameters:{docs:{page:()=>u.jsxDEV(u.Fragment,{children:[u.jsxDEV(h,{},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/TopNavigation/TopNavigation.stories.tsx",lineNumber:14,columnNumber:11},void 0),u.jsxDEV(y,{},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/TopNavigation/TopNavigation.stories.tsx",lineNumber:15,columnNumber:11},void 0),u.jsxDEV(k,{},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/TopNavigation/TopNavigation.stories.tsx",lineNumber:16,columnNumber:11},void 0),u.jsxDEV(_,{},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/TopNavigation/TopNavigation.stories.tsx",lineNumber:17,columnNumber:11},void 0),u.jsxDEV(P,{},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/TopNavigation/TopNavigation.stories.tsx",lineNumber:18,columnNumber:11},void 0)]},void 0,!0,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/TopNavigation/TopNavigation.stories.tsx",lineNumber:13,columnNumber:9},void 0)}}},a={name:"TopNavigation (базовый вид)",args:{header:{text:"Текст заголовка",bold:!1}}},e={name:"TopNavigation (жирный текст)",args:{header:{text:"Текст заголовка",bold:!0}}},o={name:"TopNavigation (лейбл)",args:{header:{text:"Текст заголовка",bold:!1},label:"Лейбл"}},r={name:"TopNavigation (кнопка назад)",args:{header:{text:"Текст заголовка",bold:!1},label:"Лейбл",backAction:()=>{}}},n={name:"TopNavigation (кнопка-действие)",args:{header:{text:"Текст заголовка",bold:!1},label:"Лейбл",buttonAction:{text:"Действие",action:()=>{}}}},t={name:"TopNavigation (все элементы)",args:{header:{text:"Текст заголовка",bold:!1},label:"Лейбл",backAction:()=>{},buttonAction:{text:"Действие",action:()=>{}}}};var i,s,m;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  name: "TopNavigation (базовый вид)",
  args: {
    header: {
      text: "Текст заголовка",
      bold: false
    }
    // label: "Шаг 1",
    // backAction: () => {},
    // buttonAction: {
    //   text: "+Добавить",
    //   action: () => {},
    // },
  }
}`,...(m=(s=a.parameters)==null?void 0:s.docs)==null?void 0:m.source}}};var c,p,l;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: "TopNavigation (жирный текст)",
  args: {
    header: {
      text: "Текст заголовка",
      bold: true
    }
    // label: "Шаг 1",
    // backAction: () => {},
    // buttonAction: {
    //   text: "+Добавить",
    //   action: () => {},
    // },
  }
}`,...(l=(p=e.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var d,b,g;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`{
  name: "TopNavigation (лейбл)",
  args: {
    header: {
      text: "Текст заголовка",
      bold: false
    },
    label: "Лейбл"
    // backAction: () => {},
    // buttonAction: {
    //   text: "+Добавить",
    //   action: () => {},
    // },
  }
}`,...(g=(b=o.parameters)==null?void 0:b.docs)==null?void 0:g.source}}};var N,A,f;r.parameters={...r.parameters,docs:{...(N=r.parameters)==null?void 0:N.docs,source:{originalSource:`{
  name: "TopNavigation (кнопка назад)",
  args: {
    header: {
      text: "Текст заголовка",
      bold: false
    },
    label: "Лейбл",
    backAction: () => {}
    // buttonAction: {
    //   text: "+Добавить",
    //   action: () => {},
    // },
  }
}`,...(f=(A=r.parameters)==null?void 0:A.docs)==null?void 0:f.source}}};var x,v,T;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  name: "TopNavigation (кнопка-действие)",
  args: {
    header: {
      text: "Текст заголовка",
      bold: false
    },
    label: "Лейбл",
    // backAction: () => {},
    buttonAction: {
      text: "Действие",
      action: () => {}
    }
  }
}`,...(T=(v=n.parameters)==null?void 0:v.docs)==null?void 0:T.source}}};var E,B,D;t.parameters={...t.parameters,docs:{...(E=t.parameters)==null?void 0:E.docs,source:{originalSource:`{
  name: "TopNavigation (все элементы)",
  args: {
    header: {
      text: "Текст заголовка",
      bold: false
    },
    label: "Лейбл",
    backAction: () => {},
    buttonAction: {
      text: "Действие",
      action: () => {}
    }
  }
}`,...(D=(B=t.parameters)==null?void 0:B.docs)==null?void 0:D.source}}};const nu=["Primary","PrimaryBold","PrimaryLabel","PrimaryBack","PrimaryAction","PrimaryAll"];export{a as Primary,n as PrimaryAction,t as PrimaryAll,r as PrimaryBack,e as PrimaryBold,o as PrimaryLabel,nu as __namedExportsOrder,ru as default};
