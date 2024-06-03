import{j as u}from"./jsx-dev-runtime-CEwsr3ay.js";import{T as Z,D as $,d as ee,C as ne,A as te,e as ae}from"./index-rDY4iNTK.js";import{S as r}from"./StyledTextField-TowtTnS_.js";import{s as ue}from"./StyledTextField.schema-B4U4qk2a.js";import"./index-Bx7zHvXC.js";import"./iframe-sToUBdDa.js";import"../sb-preview/runtime.js";import"./index-C8qaIH5S.js";import"./mapValues-CATVCxTF.js";import"./extends-CTlStxOy.js";import"./index-OYpLZbVD.js";import"./index-C-I6vmrZ.js";import"./index-CgLK7uth.js";import"./index-DrFu-skq.js";import"./Typography-B0eRT172.js";import"./index-s910cWeq.js";import"./Box-BYOjMODv.js";import"./styled-CRBqG0hL.js";import"./jsx-runtime-D0l8YCyG.js";import"./Divider-rt28LJEe.js";import"./Select-BOuRzbyi.js";import"./useFormControl-B9B9te7b.js";import"./isMuiElement-BPlPyW_H.js";import"./FormLabel-C3k4Jmrw.js";import"./index-bRUDMPgR.js";import"./Modal-rg8K5v9N.js";import"./ownerWindow-DvT1GKkC.js";import"./createChainedFunction-BO_9K8Jh.js";import"./exactProp-Bprm7WAE.js";import"./useControlled-BYMvB0Sq.js";import"./useId-Cewg4eI_.js";import"./createSvgIcon-CzBHBzEh.js";import"./GlobalStyles-DhD8qGYX.js";const{useArgs:o}=__STORYBOOK_MODULE_PREVIEW_API__,Le={title:"Общие компоненты/Поля ввода/text",component:r,tags:["autodocs"],parameters:{docs:{page:()=>u.jsxDEV(u.Fragment,{children:[u.jsxDEV(Z,{},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledTextField/StyledTextField.stories.tsx",lineNumber:22,columnNumber:11},void 0),u.jsxDEV($,{},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledTextField/StyledTextField.stories.tsx",lineNumber:23,columnNumber:11},void 0),u.jsxDEV("h2",{children:"JSON Schema"},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledTextField/StyledTextField.stories.tsx",lineNumber:24,columnNumber:11},void 0),u.jsxDEV(ee,{language:"json",code:JSON.stringify(ue,null,2)},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledTextField/StyledTextField.stories.tsx",lineNumber:25,columnNumber:11},void 0),u.jsxDEV(ne,{},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledTextField/StyledTextField.stories.tsx",lineNumber:29,columnNumber:11},void 0),u.jsxDEV(te,{},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledTextField/StyledTextField.stories.tsx",lineNumber:30,columnNumber:11},void 0),u.jsxDEV(ae,{},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledTextField/StyledTextField.stories.tsx",lineNumber:31,columnNumber:11},void 0)]},void 0,!0,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledTextField/StyledTextField.stories.tsx",lineNumber:21,columnNumber:9},void 0),description:{component:`тип - text
<p>Основан на https://mui.com/material-ui/react-text-field/</p>`}}}},i={name:"text (базовый вид)",args:{inputtype:"text",name:"text",value:"",placeholder:"Текстовое поле",validation:"none",onChange:()=>{}},render:function(e){const[,n]=o();function t(a){n({value:a.target.value})}return u.jsxDEV(r,{inputtype:"text",name:e.name,placeholder:e.placeholder,value:e.value,onChange:t,validation:e.validation},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledTextField/StyledTextField.stories.tsx",lineNumber:60,columnNumber:7},this)}},s={name:"text (ошибка)",args:{inputtype:"text",name:"text",value:"",placeholder:"Текстовое поле",error:"Ошибка!",validation:"none",onChange:()=>{}},render:function(e){const[,n]=o();function t(a){n({value:a.target.value})}return u.jsxDEV(r,{inputtype:"text",name:e.name,placeholder:e.placeholder,value:e.value,onChange:t,error:e.error,validation:e.validation},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledTextField/StyledTextField.stories.tsx",lineNumber:91,columnNumber:7},this)}},d={name:"text (вспомогательный текст)",args:{inputtype:"text",name:"text",value:"",placeholder:"Текстовое поле",onChange:()=>{},validation:"none",helperInfo:{text:"Вспомогательный текст"}},render:function(e){const[,n]=o();function t(a){n({value:a.target.value})}return u.jsxDEV(r,{inputtype:"text",name:e.name,placeholder:e.placeholder,value:e.value,onChange:t,helperInfo:e.helperInfo,validation:e.validation},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledTextField/StyledTextField.stories.tsx",lineNumber:125,columnNumber:7},this)}},p={name:"text (вспомогательная ссылка)",args:{inputtype:"text",name:"text",value:"",placeholder:"Текстовое поле",onChange:()=>{},validation:"none",helperInfo:{link:{type:"external",path:"https://www.google.com/",text:"Ссылка"}}},render:function(e){const[,n]=o();function t(a){n({value:a.target.value})}return u.jsxDEV(r,{inputtype:"text",name:e.name,placeholder:e.placeholder,value:e.value,onChange:t,helperInfo:e.helperInfo,validation:e.validation},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledTextField/StyledTextField.stories.tsx",lineNumber:163,columnNumber:7},this)}},m={name:"text (вспомогательные текст и ссылка)",args:{inputtype:"text",name:"text",value:"",placeholder:"Текстовое поле",onChange:()=>{},validation:"none",helperInfo:{text:"Вспомогательный текст и",link:{type:"external",path:"https://www.google.com/",text:"ссылка"}}},render:function(e){const[,n]=o();function t(a){n({value:a.target.value})}return u.jsxDEV(r,{inputtype:"text",name:e.name,placeholder:e.placeholder,value:e.value,onChange:t,helperInfo:e.helperInfo,validation:e.validation},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledTextField/StyledTextField.stories.tsx",lineNumber:202,columnNumber:7},this)}},c={name:"text (вспомогательные текст и ссылка и ошибка)",args:{inputtype:"text",name:"text",value:"",placeholder:"Текстовое поле",onChange:()=>{},error:"Ошибка!",validation:"none",helperInfo:{text:"Вспомогательный текст и",link:{type:"external",path:"https://www.google.com/",text:"ссылка"}}},render:function(e){const[,n]=o();function t(a){n({value:a.target.value})}return u.jsxDEV(r,{inputtype:"text",name:e.name,placeholder:e.placeholder,value:e.value,onChange:t,error:e.error,helperInfo:e.helperInfo,validation:e.validation},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledTextField/StyledTextField.stories.tsx",lineNumber:242,columnNumber:7},this)}},v={name:"text (статус поля)",args:{inputtype:"text",name:"text",value:"",placeholder:"Текстовое поле",onChange:()=>{},validation:"none",status:"warning"},render:function(e){const[,n]=o();function t(a){n({value:a.target.value})}return u.jsxDEV(r,{inputtype:"text",name:e.name,placeholder:e.placeholder,value:e.value,onChange:t,status:e.status,validation:e.validation},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledTextField/StyledTextField.stories.tsx",lineNumber:275,columnNumber:7},this)}},g={name:"text (отключенное поле)",args:{inputtype:"text",name:"text",value:"",placeholder:"Текстовое поле",onChange:()=>{},validation:"none",disabled:!0},render:function(e){const[,n]=o();function t(a){n({value:a.target.value})}return u.jsxDEV(r,{inputtype:"text",name:e.name,placeholder:e.placeholder,value:e.value,onChange:t,disabled:e.disabled,validation:e.validation},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledTextField/StyledTextField.stories.tsx",lineNumber:307,columnNumber:7},this)}},h={name:"text (заполненное поле)",args:{inputtype:"text",name:"text",value:"заполненное поле",placeholder:"Текстовое поле",validation:"none",onChange:()=>{}},render:function(e){const[,n]=o();function t(a){n({value:a.target.value})}return u.jsxDEV(r,{inputtype:"text",name:e.name,placeholder:e.placeholder,value:e.value,onChange:t,validation:e.validation},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledTextField/StyledTextField.stories.tsx",lineNumber:338,columnNumber:7},this)}},x={name:"text (заголовок)",args:{inputtype:"text",name:"text",value:"",placeholder:"Текстовое поле",validation:"none",onChange:()=>{},heading:"Заголовок поля"},render:function(e){const[,n]=o();function t(a){n({value:a.target.value})}return u.jsxDEV(r,{inputtype:"text",name:e.name,placeholder:e.placeholder,value:e.value,onChange:t,heading:e.heading,validation:e.validation},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledTextField/StyledTextField.stories.tsx",lineNumber:369,columnNumber:7},this)}},y={name:"text (разделители)",args:{inputtype:"text",name:"text",value:"",placeholder:"Текстовое поле",validation:"none",onChange:()=>{},dividerTop:!0,dividerBottom:!0,inputStyles:{marginLeft:"16px"}},render:function(e){const[,n]=o();function t(a){n({value:a.target.value})}return u.jsxDEV(r,{inputtype:"text",name:e.name,placeholder:e.placeholder,value:e.value,onChange:t,validation:e.validation,dividerTop:e.dividerTop,dividerBottom:e.dividerBottom,inputStyles:e.inputStyles},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledTextField/StyledTextField.stories.tsx",lineNumber:405,columnNumber:7},this)}};var f,E,C;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: "text (базовый вид)",
  args: {
    inputtype: "text",
    name: "text",
    value: "",
    placeholder: "Текстовое поле",
    validation: "none",
    onChange: () => {}
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    function onChange(evt: React.ChangeEvent<HTMLInputElement>) {
      updateArgs({
        value: evt.target.value
      });
    }
    return <StyledTextField inputtype="text" name={args.name} placeholder={args.placeholder} value={args.value} onChange={onChange} validation={args.validation} />;
  }
}`,...(C=(E=i.parameters)==null?void 0:E.docs)==null?void 0:C.source}}};var T,F,A;s.parameters={...s.parameters,docs:{...(T=s.parameters)==null?void 0:T.docs,source:{originalSource:`{
  name: "text (ошибка)",
  args: {
    inputtype: "text",
    name: "text",
    value: "",
    placeholder: "Текстовое поле",
    error: "Ошибка!",
    validation: "none",
    onChange: () => {}
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    function onChange(evt: React.ChangeEvent<HTMLInputElement>) {
      updateArgs({
        value: evt.target.value
      });
    }
    return <StyledTextField inputtype="text" name={args.name} placeholder={args.placeholder} value={args.value} onChange={onChange} error={args.error} validation={args.validation} />;
  }
}`,...(A=(F=s.parameters)==null?void 0:F.docs)==null?void 0:A.source}}};var S,D,N;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: "text (вспомогательный текст)",
  args: {
    inputtype: "text",
    name: "text",
    value: "",
    placeholder: "Текстовое поле",
    onChange: () => {},
    validation: "none",
    helperInfo: {
      text: "Вспомогательный текст"
    }
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    function onChange(evt: React.ChangeEvent<HTMLInputElement>) {
      updateArgs({
        value: evt.target.value
      });
    }
    return <StyledTextField inputtype="text" name={args.name} placeholder={args.placeholder} value={args.value} onChange={onChange} helperInfo={args.helperInfo} validation={args.validation} />;
  }
}`,...(N=(D=d.parameters)==null?void 0:D.docs)==null?void 0:N.source}}};var B,_,b;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`{
  name: "text (вспомогательная ссылка)",
  args: {
    inputtype: "text",
    name: "text",
    value: "",
    placeholder: "Текстовое поле",
    onChange: () => {},
    validation: "none",
    helperInfo: {
      link: {
        type: "external",
        path: "https://www.google.com/",
        text: "Ссылка"
      }
    }
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    function onChange(evt: React.ChangeEvent<HTMLInputElement>) {
      updateArgs({
        value: evt.target.value
      });
    }
    return <StyledTextField inputtype="text" name={args.name} placeholder={args.placeholder} value={args.value} onChange={onChange} helperInfo={args.helperInfo} validation={args.validation} />;
  }
}`,...(b=(_=p.parameters)==null?void 0:_.docs)==null?void 0:b.source}}};var w,I,R;m.parameters={...m.parameters,docs:{...(w=m.parameters)==null?void 0:w.docs,source:{originalSource:`{
  name: "text (вспомогательные текст и ссылка)",
  args: {
    inputtype: "text",
    name: "text",
    value: "",
    placeholder: "Текстовое поле",
    onChange: () => {},
    validation: "none",
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
    function onChange(evt: React.ChangeEvent<HTMLInputElement>) {
      updateArgs({
        value: evt.target.value
      });
    }
    return <StyledTextField inputtype="text" name={args.name} placeholder={args.placeholder} value={args.value} onChange={onChange} helperInfo={args.helperInfo} validation={args.validation} />;
  }
}`,...(R=(I=m.parameters)==null?void 0:I.docs)==null?void 0:R.source}}};var k,P,j;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  name: "text (вспомогательные текст и ссылка и ошибка)",
  args: {
    inputtype: "text",
    name: "text",
    value: "",
    placeholder: "Текстовое поле",
    onChange: () => {},
    error: "Ошибка!",
    validation: "none",
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
    function onChange(evt: React.ChangeEvent<HTMLInputElement>) {
      updateArgs({
        value: evt.target.value
      });
    }
    return <StyledTextField inputtype="text" name={args.name} placeholder={args.placeholder} value={args.value} onChange={onChange} error={args.error} helperInfo={args.helperInfo} validation={args.validation} />;
  }
}`,...(j=(P=c.parameters)==null?void 0:P.docs)==null?void 0:j.source}}};var V,L,U;v.parameters={...v.parameters,docs:{...(V=v.parameters)==null?void 0:V.docs,source:{originalSource:`{
  name: "text (статус поля)",
  args: {
    inputtype: "text",
    name: "text",
    value: "",
    placeholder: "Текстовое поле",
    onChange: () => {},
    validation: "none",
    status: "warning"
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    function onChange(evt: React.ChangeEvent<HTMLInputElement>) {
      updateArgs({
        value: evt.target.value
      });
    }
    return <StyledTextField inputtype="text" name={args.name} placeholder={args.placeholder} value={args.value} onChange={onChange} status={args.status} validation={args.validation} />;
  }
}`,...(U=(L=v.parameters)==null?void 0:L.docs)==null?void 0:U.source}}};var M,H,O;g.parameters={...g.parameters,docs:{...(M=g.parameters)==null?void 0:M.docs,source:{originalSource:`{
  name: "text (отключенное поле)",
  args: {
    inputtype: "text",
    name: "text",
    value: "",
    placeholder: "Текстовое поле",
    onChange: () => {},
    validation: "none",
    disabled: true
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    function onChange(evt: React.ChangeEvent<HTMLInputElement>) {
      updateArgs({
        value: evt.target.value
      });
    }
    return <StyledTextField inputtype="text" name={args.name} placeholder={args.placeholder} value={args.value} onChange={onChange} disabled={args.disabled} validation={args.validation} />;
  }
}`,...(O=(H=g.parameters)==null?void 0:H.docs)==null?void 0:O.source}}};var J,K,W;h.parameters={...h.parameters,docs:{...(J=h.parameters)==null?void 0:J.docs,source:{originalSource:`{
  name: "text (заполненное поле)",
  args: {
    inputtype: "text",
    name: "text",
    value: "заполненное поле",
    placeholder: "Текстовое поле",
    validation: "none",
    onChange: () => {}
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    function onChange(evt: React.ChangeEvent<HTMLInputElement>) {
      updateArgs({
        value: evt.target.value
      });
    }
    return <StyledTextField inputtype="text" name={args.name} placeholder={args.placeholder} value={args.value} onChange={onChange} validation={args.validation} />;
  }
}`,...(W=(K=h.parameters)==null?void 0:K.docs)==null?void 0:W.source}}};var Y,q,z;x.parameters={...x.parameters,docs:{...(Y=x.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  name: "text (заголовок)",
  args: {
    inputtype: "text",
    name: "text",
    value: "",
    placeholder: "Текстовое поле",
    validation: "none",
    onChange: () => {},
    heading: "Заголовок поля"
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    function onChange(evt: React.ChangeEvent<HTMLInputElement>) {
      updateArgs({
        value: evt.target.value
      });
    }
    return <StyledTextField inputtype="text" name={args.name} placeholder={args.placeholder} value={args.value} onChange={onChange} heading={args.heading} validation={args.validation} />;
  }
}`,...(z=(q=x.parameters)==null?void 0:q.docs)==null?void 0:z.source}}};var G,Q,X;y.parameters={...y.parameters,docs:{...(G=y.parameters)==null?void 0:G.docs,source:{originalSource:`{
  name: "text (разделители)",
  args: {
    inputtype: "text",
    name: "text",
    value: "",
    placeholder: "Текстовое поле",
    validation: "none",
    onChange: () => {},
    dividerTop: true,
    dividerBottom: true,
    inputStyles: {
      marginLeft: "16px"
    }
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    function onChange(evt: React.ChangeEvent<HTMLInputElement>) {
      updateArgs({
        value: evt.target.value
      });
    }
    return <StyledTextField inputtype="text" name={args.name} placeholder={args.placeholder} value={args.value} onChange={onChange} validation={args.validation} dividerTop={args.dividerTop} dividerBottom={args.dividerBottom} inputStyles={args.inputStyles} />;
  }
}`,...(X=(Q=y.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};const Ue=["Primary","PrimaryError","PrimaryText","PrimaryLink","PrimaryTextLink","PrimaryTextLinkError","PrimaryTextStatus","PrimaryTextDisabled","PrimaryTextValue","PrimaryTextheading","PrimaryDividers"];export{i as Primary,y as PrimaryDividers,s as PrimaryError,p as PrimaryLink,d as PrimaryText,g as PrimaryTextDisabled,m as PrimaryTextLink,c as PrimaryTextLinkError,v as PrimaryTextStatus,h as PrimaryTextValue,x as PrimaryTextheading,Ue as __namedExportsOrder,Le as default};
