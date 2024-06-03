import{j as u}from"./jsx-dev-runtime-CEwsr3ay.js";import{T as U,D as V,d as I,C as O,A as H,e as J}from"./index-rDY4iNTK.js";import{S as t}from"./StyledSelect-PkvvsB1k.js";import{s as K}from"./StyledSelect.schema-DhcoFnWe.js";import"./index-Bx7zHvXC.js";import"./iframe-sToUBdDa.js";import"../sb-preview/runtime.js";import"./index-C8qaIH5S.js";import"./mapValues-CATVCxTF.js";import"./extends-CTlStxOy.js";import"./index-OYpLZbVD.js";import"./index-C-I6vmrZ.js";import"./index-CgLK7uth.js";import"./index-DrFu-skq.js";import"./styled-CRBqG0hL.js";import"./index-s910cWeq.js";import"./jsx-runtime-D0l8YCyG.js";import"./Select-BOuRzbyi.js";import"./useFormControl-B9B9te7b.js";import"./isMuiElement-BPlPyW_H.js";import"./FormLabel-C3k4Jmrw.js";import"./index-bRUDMPgR.js";import"./Modal-rg8K5v9N.js";import"./Typography-B0eRT172.js";import"./Box-BYOjMODv.js";import"./ownerWindow-DvT1GKkC.js";import"./createChainedFunction-BO_9K8Jh.js";import"./exactProp-Bprm7WAE.js";import"./useControlled-BYMvB0Sq.js";import"./useId-Cewg4eI_.js";import"./createSvgIcon-CzBHBzEh.js";import"./GlobalStyles-DhD8qGYX.js";import"./ButtonBase-CJx3UMbi.js";import"./Divider-rt28LJEe.js";import"./createSvgIcon-Dq0TKmNE.js";const{useArgs:r}=__STORYBOOK_MODULE_PREVIEW_API__,De={title:"Общие компоненты/Поля ввода/select",component:t,tags:["autodocs"],parameters:{docs:{page:()=>u.jsxDEV(u.Fragment,{children:[u.jsxDEV(U,{},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledSelect/StyledSelect.stories.tsx",lineNumber:23,columnNumber:11},void 0),u.jsxDEV(V,{},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledSelect/StyledSelect.stories.tsx",lineNumber:24,columnNumber:11},void 0),u.jsxDEV("h2",{children:"JSON Schema"},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledSelect/StyledSelect.stories.tsx",lineNumber:25,columnNumber:11},void 0),u.jsxDEV(I,{language:"json",code:JSON.stringify(K,null,2)},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledSelect/StyledSelect.stories.tsx",lineNumber:26,columnNumber:11},void 0),u.jsxDEV(O,{},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledSelect/StyledSelect.stories.tsx",lineNumber:30,columnNumber:11},void 0),u.jsxDEV(H,{},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledSelect/StyledSelect.stories.tsx",lineNumber:31,columnNumber:11},void 0),u.jsxDEV(J,{},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledSelect/StyledSelect.stories.tsx",lineNumber:32,columnNumber:11},void 0)]},void 0,!0,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledSelect/StyledSelect.stories.tsx",lineNumber:22,columnNumber:9},void 0),description:{component:`тип - select
<p>Основан на https://mui.com/material-ui/react-select/</p>`}}}},o={name:"select (базовый вид)",args:{inputtype:"select",name:"select",value:"",placeholder:"Выберете пункт",onChange:()=>{},options:[{value:"first",label:"Первый",disabled:!0},{value:"second",label:"Второй",disabled:!1},{value:"third",label:"Третий",disabled:!1},{value:"fourth",label:"Четвёртый",disabled:!1},{value:"fifth",label:"Пятый",disabled:!1}]},render:function(e){const[,n]=r();function a(l){n({value:l.target.value})}return u.jsxDEV(t,{inputtype:"select",name:e.name,value:e.value,placeholder:e.placeholder,onChange:a,options:e.options,error:e.error,helperInfo:e.helperInfo,status:e.status,heading:e.heading,dividerTop:e.dividerTop,dividerBottom:e.dividerBottom},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledSelect/StyledSelect.stories.tsx",lineNumber:101,columnNumber:7},this)}},i={name:"select (отключенный)",args:{inputtype:"select",name:"select",value:"",placeholder:"Выберете пункт",onChange:()=>{},options:[{value:"first",label:"Первый",disabled:!0},{value:"second",label:"Второй",disabled:!1},{value:"third",label:"Третий",disabled:!1},{value:"fourth",label:"Четвёртый",disabled:!1},{value:"fifth",label:"Пятый",disabled:!1}],disabled:!0},render:function(e){const[,n]=r();function a(l){n({value:l.target.value})}return u.jsxDEV(t,{inputtype:"select",name:e.name,value:e.value,placeholder:e.placeholder,onChange:a,options:e.options,disabled:e.disabled},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledSelect/StyledSelect.stories.tsx",lineNumber:164,columnNumber:7},this)}},d={name:"select (с заголовком)",args:{inputtype:"select",name:"select",value:"",placeholder:"Выберете пункт",onChange:()=>{},options:[{value:"first",label:"Первый",disabled:!0},{value:"second",label:"Второй",disabled:!1},{value:"third",label:"Третий",disabled:!1},{value:"fourth",label:"Четвёртый",disabled:!1},{value:"fifth",label:"Пятый",disabled:!1}],heading:"Заголовок"},render:function(e){const[,n]=r();function a(l){n({value:l.target.value})}return u.jsxDEV(t,{inputtype:"select",name:e.name,value:e.value,placeholder:e.placeholder,onChange:a,options:e.options,heading:e.heading},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledSelect/StyledSelect.stories.tsx",lineNumber:222,columnNumber:7},this)}},c={name:"select (ошибка)",args:{inputtype:"select",name:"select",value:"",placeholder:"Выберете пункт",onChange:()=>{},options:[{value:"first",label:"Первый",disabled:!0},{value:"second",label:"Второй",disabled:!1},{value:"third",label:"Третий",disabled:!1},{value:"fourth",label:"Четвёртый",disabled:!1},{value:"fifth",label:"Пятый",disabled:!1}],error:"Ошибка!"},render:function(e){const[,n]=r();function a(l){n({value:l.target.value})}return u.jsxDEV(t,{inputtype:"select",name:e.name,value:e.value,placeholder:e.placeholder,onChange:a,options:e.options,error:e.error},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledSelect/StyledSelect.stories.tsx",lineNumber:280,columnNumber:7},this)}},p={name:"select (статус)",args:{inputtype:"select",name:"select",value:"",placeholder:"Выберете пункт",onChange:()=>{},options:[{value:"first",label:"Первый",disabled:!0},{value:"second",label:"Второй",disabled:!1},{value:"third",label:"Третий",disabled:!1},{value:"fourth",label:"Четвёртый",disabled:!1},{value:"fifth",label:"Пятый",disabled:!1}],status:"warning"},render:function(e){const[,n]=r();function a(l){n({value:l.target.value})}return u.jsxDEV(t,{inputtype:"select",name:e.name,value:e.value,placeholder:e.placeholder,onChange:a,options:e.options,status:e.status},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledSelect/StyledSelect.stories.tsx",lineNumber:338,columnNumber:7},this)}},m={name:"select (вспомогательная информация)",args:{inputtype:"select",name:"select",value:"",placeholder:"Выберете пункт",onChange:()=>{},options:[{value:"first",label:"Первый",disabled:!0},{value:"second",label:"Второй",disabled:!1},{value:"third",label:"Третий",disabled:!1},{value:"fourth",label:"Четвёртый",disabled:!1},{value:"fifth",label:"Пятый",disabled:!1}],helperInfo:{text:"Вспомогательный текст и",link:{type:"external",path:"https://www.google.com/",text:"ссылка"}}},render:function(e){const[,n]=r();function a(l){n({value:l.target.value})}return u.jsxDEV(t,{inputtype:"select",name:e.name,value:e.value,placeholder:e.placeholder,onChange:a,options:e.options,helperInfo:e.helperInfo},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledSelect/StyledSelect.stories.tsx",lineNumber:403,columnNumber:7},this)}},f={name:"select (разделители)",args:{inputtype:"select",name:"select",value:"",placeholder:"Выберете пункт",onChange:()=>{},options:[{value:"first",label:"Первый",disabled:!0},{value:"second",label:"Второй",disabled:!1},{value:"third",label:"Третий",disabled:!1},{value:"fourth",label:"Четвёртый",disabled:!1},{value:"fifth",label:"Пятый",disabled:!1}],dividerTop:!0,dividerBottom:!0},render:function(e){const[,n]=r();function a(l){n({value:l.target.value})}return u.jsxDEV(t,{inputtype:"select",name:e.name,value:e.value,placeholder:e.placeholder,onChange:a,options:e.options,dividerTop:e.dividerTop,dividerBottom:e.dividerBottom},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledSelect/StyledSelect.stories.tsx",lineNumber:462,columnNumber:7},this)}};var v,h,b;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: "select (базовый вид)",
  args: {
    inputtype: "select",
    name: "select",
    value: "",
    placeholder: "Выберете пункт",
    onChange: () => {},
    options: [{
      value: "first",
      label: "Первый",
      disabled: true
    }, {
      value: "second",
      label: "Второй",
      disabled: false
    }, {
      value: "third",
      label: "Третий",
      disabled: false
    }, {
      value: "fourth",
      label: "Четвёртый",
      disabled: false
    }, {
      value: "fifth",
      label: "Пятый",
      disabled: false
    }]

    // heading: "This is header",
    // dividerTop: true,
    // dividerBottom: true,
    // error: "Ошибка!",
    // status: "warning",
    // helperInfo: {
    //   text: "Вспомогательный текст и",
    //   link: {
    //     type: "external",
    //     path: "https://www.google.com/",
    //     text: "ссылка",
    //   },
    // },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    function onChange(evt: SelectChangeEvent) {
      updateArgs({
        value: evt.target.value
      });
    }
    return <StyledSelect inputtype="select" name={args.name} value={args.value} placeholder={args.placeholder} onChange={onChange} options={args.options} error={args.error} helperInfo={args.helperInfo} status={args.status} heading={args.heading} dividerTop={args.dividerTop} dividerBottom={args.dividerBottom} />;
  }
}`,...(b=(h=o.parameters)==null?void 0:h.docs)==null?void 0:b.source}}};var g,y,S;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: "select (отключенный)",
  args: {
    inputtype: "select",
    name: "select",
    value: "",
    placeholder: "Выберете пункт",
    onChange: () => {},
    options: [{
      value: "first",
      label: "Первый",
      disabled: true
    }, {
      value: "second",
      label: "Второй",
      disabled: false
    }, {
      value: "third",
      label: "Третий",
      disabled: false
    }, {
      value: "fourth",
      label: "Четвёртый",
      disabled: false
    }, {
      value: "fifth",
      label: "Пятый",
      disabled: false
    }],
    disabled: true
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    function onChange(evt: SelectChangeEvent) {
      updateArgs({
        value: evt.target.value
      });
    }
    return <StyledSelect inputtype="select" name={args.name} value={args.value} placeholder={args.placeholder} onChange={onChange} options={args.options} disabled={args.disabled} />;
  }
}`,...(S=(y=i.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};var E,C,B;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
  name: "select (с заголовком)",
  args: {
    inputtype: "select",
    name: "select",
    value: "",
    placeholder: "Выберете пункт",
    onChange: () => {},
    options: [{
      value: "first",
      label: "Первый",
      disabled: true
    }, {
      value: "second",
      label: "Второй",
      disabled: false
    }, {
      value: "third",
      label: "Третий",
      disabled: false
    }, {
      value: "fourth",
      label: "Четвёртый",
      disabled: false
    }, {
      value: "fifth",
      label: "Пятый",
      disabled: false
    }],
    heading: "Заголовок"
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    function onChange(evt: SelectChangeEvent) {
      updateArgs({
        value: evt.target.value
      });
    }
    return <StyledSelect inputtype="select" name={args.name} value={args.value} placeholder={args.placeholder} onChange={onChange} options={args.options} heading={args.heading} />;
  }
}`,...(B=(C=d.parameters)==null?void 0:C.docs)==null?void 0:B.source}}};var D,A,N;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`{
  name: "select (ошибка)",
  args: {
    inputtype: "select",
    name: "select",
    value: "",
    placeholder: "Выберете пункт",
    onChange: () => {},
    options: [{
      value: "first",
      label: "Первый",
      disabled: true
    }, {
      value: "second",
      label: "Второй",
      disabled: false
    }, {
      value: "third",
      label: "Третий",
      disabled: false
    }, {
      value: "fourth",
      label: "Четвёртый",
      disabled: false
    }, {
      value: "fifth",
      label: "Пятый",
      disabled: false
    }],
    error: "Ошибка!"
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    function onChange(evt: SelectChangeEvent) {
      updateArgs({
        value: evt.target.value
      });
    }
    return <StyledSelect inputtype="select" name={args.name} value={args.value} placeholder={args.placeholder} onChange={onChange} options={args.options} error={args.error} />;
  }
}`,...(N=(A=c.parameters)==null?void 0:A.docs)==null?void 0:N.source}}};var x,_,F;p.parameters={...p.parameters,docs:{...(x=p.parameters)==null?void 0:x.docs,source:{originalSource:`{
  name: "select (статус)",
  args: {
    inputtype: "select",
    name: "select",
    value: "",
    placeholder: "Выберете пункт",
    onChange: () => {},
    options: [{
      value: "first",
      label: "Первый",
      disabled: true
    }, {
      value: "second",
      label: "Второй",
      disabled: false
    }, {
      value: "third",
      label: "Третий",
      disabled: false
    }, {
      value: "fourth",
      label: "Четвёртый",
      disabled: false
    }, {
      value: "fifth",
      label: "Пятый",
      disabled: false
    }],
    status: "warning"
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    function onChange(evt: SelectChangeEvent) {
      updateArgs({
        value: evt.target.value
      });
    }
    return <StyledSelect inputtype="select" name={args.name} value={args.value} placeholder={args.placeholder} onChange={onChange} options={args.options} status={args.status} />;
  }
}`,...(F=(_=p.parameters)==null?void 0:_.docs)==null?void 0:F.source}}};var w,j,k;m.parameters={...m.parameters,docs:{...(w=m.parameters)==null?void 0:w.docs,source:{originalSource:`{
  name: "select (вспомогательная информация)",
  args: {
    inputtype: "select",
    name: "select",
    value: "",
    placeholder: "Выберете пункт",
    onChange: () => {},
    options: [{
      value: "first",
      label: "Первый",
      disabled: true
    }, {
      value: "second",
      label: "Второй",
      disabled: false
    }, {
      value: "third",
      label: "Третий",
      disabled: false
    }, {
      value: "fourth",
      label: "Четвёртый",
      disabled: false
    }, {
      value: "fifth",
      label: "Пятый",
      disabled: false
    }],
    helperInfo: {
      text: "Вспомогательный текст и",
      link: {
        type: "external",
        path: "https://www.google.com/",
        text: "ссылка"
      }
    }
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    function onChange(evt: SelectChangeEvent) {
      updateArgs({
        value: evt.target.value
      });
    }
    return <StyledSelect inputtype="select" name={args.name} value={args.value} placeholder={args.placeholder} onChange={onChange} options={args.options} helperInfo={args.helperInfo} />;
  }
}`,...(k=(j=m.parameters)==null?void 0:j.docs)==null?void 0:k.source}}};var R,P,T;f.parameters={...f.parameters,docs:{...(R=f.parameters)==null?void 0:R.docs,source:{originalSource:`{
  name: "select (разделители)",
  args: {
    inputtype: "select",
    name: "select",
    value: "",
    placeholder: "Выберете пункт",
    onChange: () => {},
    options: [{
      value: "first",
      label: "Первый",
      disabled: true
    }, {
      value: "second",
      label: "Второй",
      disabled: false
    }, {
      value: "third",
      label: "Третий",
      disabled: false
    }, {
      value: "fourth",
      label: "Четвёртый",
      disabled: false
    }, {
      value: "fifth",
      label: "Пятый",
      disabled: false
    }],
    dividerTop: true,
    dividerBottom: true
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    function onChange(evt: SelectChangeEvent) {
      updateArgs({
        value: evt.target.value
      });
    }
    return <StyledSelect inputtype="select" name={args.name} value={args.value} placeholder={args.placeholder} onChange={onChange} options={args.options} dividerTop={args.dividerTop} dividerBottom={args.dividerBottom} />;
  }
}`,...(T=(P=f.parameters)==null?void 0:P.docs)==null?void 0:T.source}}};const Ae=["Primary","PrimaryDisabled","PrimaryHeading","PrimaryError","PrimaryStatus","PrimaryHelper","PrimaryDividers"];export{o as Primary,i as PrimaryDisabled,f as PrimaryDividers,c as PrimaryError,d as PrimaryHeading,m as PrimaryHelper,p as PrimaryStatus,Ae as __namedExportsOrder,De as default};
