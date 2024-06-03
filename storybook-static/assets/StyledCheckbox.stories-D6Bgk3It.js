import{j as u}from"./jsx-dev-runtime-CEwsr3ay.js";import{T as K,D as M,d as W,C as Y,A as q,e as z}from"./index-rDY4iNTK.js";import{S as a}from"./StyledCheckbox-D2xzBR1Q.js";import{s as G}from"./StyledCheckbox.schema-sMf8LeNL.js";import"./index-Bx7zHvXC.js";import"./iframe-sToUBdDa.js";import"../sb-preview/runtime.js";import"./index-C8qaIH5S.js";import"./mapValues-CATVCxTF.js";import"./extends-CTlStxOy.js";import"./index-OYpLZbVD.js";import"./index-C-I6vmrZ.js";import"./index-CgLK7uth.js";import"./index-DrFu-skq.js";import"./Typography-B0eRT172.js";import"./index-s910cWeq.js";import"./Box-BYOjMODv.js";import"./styled-CRBqG0hL.js";import"./jsx-runtime-D0l8YCyG.js";import"./Divider-rt28LJEe.js";import"./FormControlLabel-BiPubNfy.js";import"./useFormControl-B9B9te7b.js";import"./Checkbox-BMVk0THL.js";import"./SwitchBase-CoUSwA0z.js";import"./ButtonBase-CJx3UMbi.js";import"./useControlled-BYMvB0Sq.js";import"./createSvgIcon-CzBHBzEh.js";const{useArgs:t}=__STORYBOOK_MODULE_PREVIEW_API__,Ce={title:"Общие компоненты/Поля ввода/checkbox",component:a,tags:["autodocs"],parameters:{docs:{page:()=>u.jsxDEV(u.Fragment,{children:[u.jsxDEV(K,{},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledCheckbox/StyledCheckbox.stories.tsx",lineNumber:22,columnNumber:11},void 0),u.jsxDEV(M,{},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledCheckbox/StyledCheckbox.stories.tsx",lineNumber:23,columnNumber:11},void 0),u.jsxDEV("h2",{children:"JSON Schema"},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledCheckbox/StyledCheckbox.stories.tsx",lineNumber:24,columnNumber:11},void 0),u.jsxDEV(W,{language:"json",code:JSON.stringify(G,null,2)},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledCheckbox/StyledCheckbox.stories.tsx",lineNumber:25,columnNumber:11},void 0),u.jsxDEV(Y,{},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledCheckbox/StyledCheckbox.stories.tsx",lineNumber:29,columnNumber:11},void 0),u.jsxDEV(q,{},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledCheckbox/StyledCheckbox.stories.tsx",lineNumber:30,columnNumber:11},void 0),u.jsxDEV(z,{},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledCheckbox/StyledCheckbox.stories.tsx",lineNumber:31,columnNumber:11},void 0)]},void 0,!0,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledCheckbox/StyledCheckbox.stories.tsx",lineNumber:21,columnNumber:9},void 0),description:{component:`тип - checkbox
<p>Основан на https://mui.com/material-ui/react-checkbox/</p>`}}}},i={name:"checkbox",args:{inputtype:"checkbox",validation:"none",name:"radio",value:!1,label:"Моё доверенное лицо",onChange:()=>{}},render:function(e){const[,n]=t();return u.jsxDEV(a,{inputtype:e.inputtype,value:e.value,name:e.name,label:e.label,error:e.error,validation:e.validation,status:e.status,disabled:e.disabled,dividerBottom:e.dividerBottom,dividerTop:e.dividerTop,heading:e.heading,helperInfo:e.helperInfo,onChange:r=>{n({value:r.target.checked})}},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledCheckbox/StyledCheckbox.stories.tsx",lineNumber:73,columnNumber:7},this)}},d={name:"checkbox (заполненный)",args:{inputtype:"checkbox",name:"radio",value:!0,validation:"none",label:"Моё доверенное лицо",onChange:()=>{}},render:function(e){const[,n]=t();return u.jsxDEV(a,{inputtype:e.inputtype,value:e.value,name:e.name,label:e.label,error:e.error,validation:e.validation,status:e.status,disabled:e.disabled,dividerBottom:e.dividerBottom,dividerTop:e.dividerTop,heading:e.heading,helperInfo:e.helperInfo,onChange:r=>{n({value:r.target.checked})}},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledCheckbox/StyledCheckbox.stories.tsx",lineNumber:125,columnNumber:7},this)}},s={name:"checkbox (ошибка)",args:{inputtype:"checkbox",name:"radio",value:!1,validation:"none",label:"Моё доверенное лицо",onChange:()=>{},error:"Ошибка!"},render:function(e){const[,n]=t();return u.jsxDEV(a,{inputtype:e.inputtype,value:e.value,name:e.name,label:e.label,error:e.error,validation:e.validation,status:e.status,disabled:e.disabled,dividerBottom:e.dividerBottom,dividerTop:e.dividerTop,heading:e.heading,helperInfo:e.helperInfo,onChange:r=>{n({value:r.target.checked})}},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledCheckbox/StyledCheckbox.stories.tsx",lineNumber:177,columnNumber:7},this)}},l={name:"checkbox (статус)",args:{inputtype:"checkbox",name:"radio",value:!0,validation:"none",label:"Моё доверенное лицо",onChange:()=>{},status:"warning"},render:function(e){const[,n]=t();return u.jsxDEV(a,{inputtype:e.inputtype,value:e.value,name:e.name,label:e.label,error:e.error,status:e.status,validation:e.validation,disabled:e.disabled,dividerBottom:e.dividerBottom,dividerTop:e.dividerTop,heading:e.heading,helperInfo:e.helperInfo,onChange:r=>{n({value:r.target.checked})}},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledCheckbox/StyledCheckbox.stories.tsx",lineNumber:229,columnNumber:7},this)}},p={name:"checkbox (отключенный)",args:{inputtype:"checkbox",name:"radio",value:!1,validation:"none",label:"Моё доверенное лицо",onChange:()=>{},disabled:!0},render:function(e){const[,n]=t();return u.jsxDEV(a,{inputtype:e.inputtype,value:e.value,name:e.name,label:e.label,error:e.error,status:e.status,disabled:e.disabled,validation:e.validation,dividerBottom:e.dividerBottom,dividerTop:e.dividerTop,heading:e.heading,helperInfo:e.helperInfo,onChange:r=>{n({value:r.target.checked})}},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledCheckbox/StyledCheckbox.stories.tsx",lineNumber:281,columnNumber:7},this)}},c={name:"checkbox (заголовок)",args:{inputtype:"checkbox",name:"radio",value:!1,validation:"none",label:"Моё доверенное лицо",onChange:()=>{},heading:"Заголовок"},render:function(e){const[,n]=t();return u.jsxDEV(a,{inputtype:e.inputtype,value:e.value,name:e.name,label:e.label,error:e.error,status:e.status,validation:e.validation,disabled:e.disabled,dividerBottom:e.dividerBottom,dividerTop:e.dividerTop,heading:e.heading,helperInfo:e.helperInfo,onChange:r=>{n({value:r.target.checked})}},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledCheckbox/StyledCheckbox.stories.tsx",lineNumber:333,columnNumber:7},this)}},m={name:"checkbox (вспомогательный текст)",args:{inputtype:"checkbox",name:"radio",value:!1,validation:"none",label:"Моё доверенное лицо",onChange:()=>{},helperInfo:{text:"Текст"}},render:function(e){const[,n]=t();return u.jsxDEV(a,{inputtype:e.inputtype,value:e.value,name:e.name,label:e.label,error:e.error,validation:e.validation,status:e.status,disabled:e.disabled,dividerBottom:e.dividerBottom,dividerTop:e.dividerTop,heading:e.heading,helperInfo:e.helperInfo,onChange:r=>{n({value:r.target.checked})}},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledCheckbox/StyledCheckbox.stories.tsx",lineNumber:385,columnNumber:7},this)}},h={name:"checkbox (вспомогательный текст и ссылка)",args:{inputtype:"checkbox",name:"radio",value:!1,validation:"none",label:"Моё доверенное лицо",onChange:()=>{},helperInfo:{text:"Текст и ",link:{type:"external",path:"https://www.google.com/",text:"cсылка"}}},render:function(e){const[,n]=t();return u.jsxDEV(a,{inputtype:e.inputtype,value:e.value,name:e.name,label:e.label,error:e.error,validation:e.validation,status:e.status,disabled:e.disabled,dividerBottom:e.dividerBottom,dividerTop:e.dividerTop,heading:e.heading,helperInfo:e.helperInfo,onChange:r=>{n({value:r.target.checked})}},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledCheckbox/StyledCheckbox.stories.tsx",lineNumber:437,columnNumber:7},this)}},v={name:"checkbox (разделители)",args:{inputtype:"checkbox",name:"radio",value:!1,validation:"none",label:"Моё доверенное лицо",onChange:()=>{},dividerBottom:!0,dividerTop:!0},render:function(e){const[,n]=t();return u.jsxDEV(a,{inputtype:e.inputtype,value:e.value,validation:e.validation,name:e.name,label:e.label,error:e.error,status:e.status,disabled:e.disabled,dividerBottom:e.dividerBottom,dividerTop:e.dividerTop,heading:e.heading,helperInfo:e.helperInfo,onChange:r=>{n({value:r.target.checked})}},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledCheckbox/StyledCheckbox.stories.tsx",lineNumber:489,columnNumber:7},this)}};var g,b,x;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: "checkbox",
  args: {
    inputtype: "checkbox",
    validation: "none",
    name: "radio",
    value: false,
    label: "Моё доверенное лицо",
    onChange: () => {}
    // error: "Ошибка!",
    // status: "warning",
    // disabled: true,

    // heading: "Заголовок раздела с радиокнопками",

    // dividerBottom: true,
    // dividerTop: true,

    // helperInfo: {
    //   text: "Текст и ",
    //   link: {
    //     type: "external",
    //     path: "https://www.google.com/",
    //     text: "cсылка",
    //   },
    // },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return <StyledCheckbox inputtype={args.inputtype} value={args.value} name={args.name} label={args.label} error={args.error} validation={args.validation} status={args.status} disabled={args.disabled} dividerBottom={args.dividerBottom} dividerTop={args.dividerTop} heading={args.heading} helperInfo={args.helperInfo} onChange={evt => {
      updateArgs({
        value: evt.target.checked
      });
    }} />;
  }
}`,...(x=(b=i.parameters)==null?void 0:b.docs)==null?void 0:x.source}}};var y,f,k;d.parameters={...d.parameters,docs:{...(y=d.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: "checkbox (заполненный)",
  args: {
    inputtype: "checkbox",
    name: "radio",
    value: true,
    validation: "none",
    label: "Моё доверенное лицо",
    onChange: () => {}
    // error: "Ошибка!",
    // status: "warning",
    // disabled: true,

    // heading: "Заголовок раздела с радиокнопками",

    // dividerBottom: true,
    // dividerTop: true,

    // helperInfo: {
    //   text: "Текст и ",
    //   link: {
    //     type: "external",
    //     path: "https://www.google.com/",
    //     text: "cсылка",
    //   },
    // },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return <StyledCheckbox inputtype={args.inputtype} value={args.value} name={args.name} label={args.label} error={args.error} validation={args.validation} status={args.status} disabled={args.disabled} dividerBottom={args.dividerBottom} dividerTop={args.dividerTop} heading={args.heading} helperInfo={args.helperInfo} onChange={evt => {
      updateArgs({
        value: evt.target.checked
      });
    }} />;
  }
}`,...(k=(f=d.parameters)==null?void 0:f.docs)==null?void 0:k.source}}};var E,C,B;s.parameters={...s.parameters,docs:{...(E=s.parameters)==null?void 0:E.docs,source:{originalSource:`{
  name: "checkbox (ошибка)",
  args: {
    inputtype: "checkbox",
    name: "radio",
    value: false,
    validation: "none",
    label: "Моё доверенное лицо",
    onChange: () => {},
    error: "Ошибка!"
    // status: "warning",
    // disabled: true,

    // heading: "Заголовок раздела с радиокнопками",

    // dividerBottom: true,
    // dividerTop: true,

    // helperInfo: {
    //   text: "Текст и ",
    //   link: {
    //     type: "external",
    //     path: "https://www.google.com/",
    //     text: "cсылка",
    //   },
    // },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return <StyledCheckbox inputtype={args.inputtype} value={args.value} name={args.name} label={args.label} error={args.error} validation={args.validation} status={args.status} disabled={args.disabled} dividerBottom={args.dividerBottom} dividerTop={args.dividerTop} heading={args.heading} helperInfo={args.helperInfo} onChange={evt => {
      updateArgs({
        value: evt.target.checked
      });
    }} />;
  }
}`,...(B=(C=s.parameters)==null?void 0:C.docs)==null?void 0:B.source}}};var A,D,S;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`{
  name: "checkbox (статус)",
  args: {
    inputtype: "checkbox",
    name: "radio",
    value: true,
    validation: "none",
    label: "Моё доверенное лицо",
    onChange: () => {},
    // error: "Ошибка!",
    status: "warning"
    // disabled: true,

    // heading: "Заголовок раздела с радиокнопками",

    // dividerBottom: true,
    // dividerTop: true,

    // helperInfo: {
    //   text: "Текст и ",
    //   link: {
    //     type: "external",
    //     path: "https://www.google.com/",
    //     text: "cсылка",
    //   },
    // },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return <StyledCheckbox inputtype={args.inputtype} value={args.value} name={args.name} label={args.label} error={args.error} status={args.status} validation={args.validation} disabled={args.disabled} dividerBottom={args.dividerBottom} dividerTop={args.dividerTop} heading={args.heading} helperInfo={args.helperInfo} onChange={evt => {
      updateArgs({
        value: evt.target.checked
      });
    }} />;
  }
}`,...(S=(D=l.parameters)==null?void 0:D.docs)==null?void 0:S.source}}};var w,T,N;p.parameters={...p.parameters,docs:{...(w=p.parameters)==null?void 0:w.docs,source:{originalSource:`{
  name: "checkbox (отключенный)",
  args: {
    inputtype: "checkbox",
    name: "radio",
    value: false,
    validation: "none",
    label: "Моё доверенное лицо",
    onChange: () => {},
    // error: "Ошибка!",
    // status: "warning",
    disabled: true

    // heading: "Заголовок раздела с радиокнопками",

    // dividerBottom: true,
    // dividerTop: true,

    // helperInfo: {
    //   text: "Текст и ",
    //   link: {
    //     type: "external",
    //     path: "https://www.google.com/",
    //     text: "cсылка",
    //   },
    // },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return <StyledCheckbox inputtype={args.inputtype} value={args.value} name={args.name} label={args.label} error={args.error} status={args.status} disabled={args.disabled} validation={args.validation} dividerBottom={args.dividerBottom} dividerTop={args.dividerTop} heading={args.heading} helperInfo={args.helperInfo} onChange={evt => {
      updateArgs({
        value: evt.target.checked
      });
    }} />;
  }
}`,...(N=(T=p.parameters)==null?void 0:T.docs)==null?void 0:N.source}}};var I,_,R;c.parameters={...c.parameters,docs:{...(I=c.parameters)==null?void 0:I.docs,source:{originalSource:`{
  name: "checkbox (заголовок)",
  args: {
    inputtype: "checkbox",
    name: "radio",
    value: false,
    validation: "none",
    label: "Моё доверенное лицо",
    onChange: () => {},
    // error: "Ошибка!",
    // status: "warning",
    // disabled: true,

    heading: "Заголовок"

    // dividerBottom: true,
    // dividerTop: true,

    // helperInfo: {
    //   text: "Текст и ",
    //   link: {
    //     type: "external",
    //     path: "https://www.google.com/",
    //     text: "cсылка",
    //   },
    // },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return <StyledCheckbox inputtype={args.inputtype} value={args.value} name={args.name} label={args.label} error={args.error} status={args.status} validation={args.validation} disabled={args.disabled} dividerBottom={args.dividerBottom} dividerTop={args.dividerTop} heading={args.heading} helperInfo={args.helperInfo} onChange={evt => {
      updateArgs({
        value: evt.target.checked
      });
    }} />;
  }
}`,...(R=(_=c.parameters)==null?void 0:_.docs)==null?void 0:R.source}}};var j,P,U;m.parameters={...m.parameters,docs:{...(j=m.parameters)==null?void 0:j.docs,source:{originalSource:`{
  name: "checkbox (вспомогательный текст)",
  args: {
    inputtype: "checkbox",
    name: "radio",
    value: false,
    validation: "none",
    label: "Моё доверенное лицо",
    onChange: () => {},
    // error: "Ошибка!",
    // status: "warning",
    // disabled: true,

    // heading: "Заголовок",

    // dividerBottom: true,
    // dividerTop: true,

    helperInfo: {
      text: "Текст"
      // link: {
      //   type: "external",
      //   path: "https://www.google.com/",
      //   text: "cсылка",
      // },
    }
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return <StyledCheckbox inputtype={args.inputtype} value={args.value} name={args.name} label={args.label} error={args.error} validation={args.validation} status={args.status} disabled={args.disabled} dividerBottom={args.dividerBottom} dividerTop={args.dividerTop} heading={args.heading} helperInfo={args.helperInfo} onChange={evt => {
      updateArgs({
        value: evt.target.checked
      });
    }} />;
  }
}`,...(U=(P=m.parameters)==null?void 0:P.docs)==null?void 0:U.source}}};var V,F,O;h.parameters={...h.parameters,docs:{...(V=h.parameters)==null?void 0:V.docs,source:{originalSource:`{
  name: "checkbox (вспомогательный текст и ссылка)",
  args: {
    inputtype: "checkbox",
    name: "radio",
    value: false,
    validation: "none",
    label: "Моё доверенное лицо",
    onChange: () => {},
    // error: "Ошибка!",
    // status: "warning",
    // disabled: true,

    // heading: "Заголовок",

    // dividerBottom: true,
    // dividerTop: true,

    helperInfo: {
      text: "Текст и ",
      link: {
        type: "external",
        path: "https://www.google.com/",
        text: "cсылка"
      }
    }
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return <StyledCheckbox inputtype={args.inputtype} value={args.value} name={args.name} label={args.label} error={args.error} validation={args.validation} status={args.status} disabled={args.disabled} dividerBottom={args.dividerBottom} dividerTop={args.dividerTop} heading={args.heading} helperInfo={args.helperInfo} onChange={evt => {
      updateArgs({
        value: evt.target.checked
      });
    }} />;
  }
}`,...(O=(F=h.parameters)==null?void 0:F.docs)==null?void 0:O.source}}};var L,H,J;v.parameters={...v.parameters,docs:{...(L=v.parameters)==null?void 0:L.docs,source:{originalSource:`{
  name: "checkbox (разделители)",
  args: {
    inputtype: "checkbox",
    name: "radio",
    value: false,
    validation: "none",
    label: "Моё доверенное лицо",
    onChange: () => {},
    // error: "Ошибка!",
    // status: "warning",
    // disabled: true,

    // heading: "Заголовок",

    dividerBottom: true,
    dividerTop: true

    // helperInfo: {
    //   text: "Текст и ",
    //   link: {
    //     type: "external",
    //     path: "https://www.google.com/",
    //     text: "cсылка",
    //   },
    // },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return <StyledCheckbox inputtype={args.inputtype} value={args.value} validation={args.validation} name={args.name} label={args.label} error={args.error} status={args.status} disabled={args.disabled} dividerBottom={args.dividerBottom} dividerTop={args.dividerTop} heading={args.heading} helperInfo={args.helperInfo} onChange={evt => {
      updateArgs({
        value: evt.target.checked
      });
    }} />;
  }
}`,...(J=(H=v.parameters)==null?void 0:H.docs)==null?void 0:J.source}}};const Be=["Primary","PrimaryChecked","PrimaryError","PrimaryStatus","PrimaryDisabled","PrimaryHeading","PrimaryText","PrimaryTextAndLink","PrimaryTextDividers"];export{i as Primary,d as PrimaryChecked,p as PrimaryDisabled,s as PrimaryError,c as PrimaryHeading,l as PrimaryStatus,m as PrimaryText,h as PrimaryTextAndLink,v as PrimaryTextDividers,Be as __namedExportsOrder,Ce as default};
