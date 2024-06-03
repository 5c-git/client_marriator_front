import{j as r}from"./jsx-dev-runtime-CEwsr3ay.js";import{u as s,T as a}from"./Typography-B0eRT172.js";import{B as u}from"./Box-BYOjMODv.js";import{D as o,L as d}from"./Divider-rt28LJEe.js";import{F as m}from"./FormGroup-BxHtxDe0.js";import{F as c}from"./FormControlLabel-BiPubNfy.js";import{C as p}from"./Checkbox-BMVk0THL.js";const x=e=>{const t=s();return r.jsxDEV(u,{sx:e.styles,children:[e.dividerTop?r.jsxDEV(o,{sx:{marginBottom:"16px"}},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledCheckboxMultiple/StyledCheckboxMultiple.tsx",lineNumber:51,columnNumber:27},void 0):null,r.jsxDEV(u,{sx:e.inputStyles,children:[e.heading||e.error||e.helperInfo?r.jsxDEV(u,{sx:{marginBottom:"12px"},children:[e.heading?r.jsxDEV(a,{component:"p",variant:"Bold_14",sx:{color:e.error?t.palette.Red:t.palette.Black},children:e.heading},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledCheckboxMultiple/StyledCheckboxMultiple.tsx",lineNumber:61,columnNumber:15},void 0):null,e.error?r.jsxDEV(a,{component:"p",variant:"Reg_12",sx:{color:t.palette.Red},children:e.error},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledCheckboxMultiple/StyledCheckboxMultiple.tsx",lineNumber:75,columnNumber:15},void 0):null,e.helperInfo?r.jsxDEV(a,{component:"p",variant:"Reg_12",sx:{color:t.palette.Corp_1},children:[e.helperInfo.text," ",e.helperInfo.link?r.jsxDEV(r.Fragment,{children:e.helperInfo.link.type==="internal"?r.jsxDEV(d,{style:{textDecorationLine:"underline"},to:e.helperInfo.link.path,children:e.helperInfo.link.text},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledCheckboxMultiple/StyledCheckboxMultiple.tsx",lineNumber:98,columnNumber:23},void 0):r.jsxDEV("a",{style:{textDecorationLine:"underline"},href:e.helperInfo.link.path,children:e.helperInfo.link.text},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledCheckboxMultiple/StyledCheckboxMultiple.tsx",lineNumber:107,columnNumber:23},void 0)},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledCheckboxMultiple/StyledCheckboxMultiple.tsx",lineNumber:96,columnNumber:19},void 0):null]},void 0,!0,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledCheckboxMultiple/StyledCheckboxMultiple.tsx",lineNumber:87,columnNumber:15},void 0):null]},void 0,!0,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledCheckboxMultiple/StyledCheckboxMultiple.tsx",lineNumber:55,columnNumber:11},void 0):null,r.jsxDEV(m,{children:e.options.map(n=>r.jsxDEV(c,{disabled:!!n.disabled,sx:{marginLeft:"-6px"},control:r.jsxDEV(p,{name:e.name,value:n.value,checked:e.value.includes(n.value),onChange:i=>{const l=[...e.value];i.target.checked?l.push(i.target.value):l.splice(l.indexOf(i.target.value),1),e.onChange(l),e.onImmediateChange()},size:"small",sx:{padding:"4px"},color:e.error?"error":e.status==="warning"?"warning":"corp"},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledCheckboxMultiple/StyledCheckboxMultiple.tsx",lineNumber:132,columnNumber:17},void 0),label:n.label},n.value,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledCheckboxMultiple/StyledCheckboxMultiple.tsx",lineNumber:125,columnNumber:13},void 0))},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledCheckboxMultiple/StyledCheckboxMultiple.tsx",lineNumber:123,columnNumber:9},void 0)]},void 0,!0,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledCheckboxMultiple/StyledCheckboxMultiple.tsx",lineNumber:53,columnNumber:7},void 0),e.dividerBottom?r.jsxDEV(o,{sx:{marginTop:"16px"}},void 0,!1,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledCheckboxMultiple/StyledCheckboxMultiple.tsx",lineNumber:164,columnNumber:30},void 0):null]},void 0,!0,{fileName:"/Users/andrey/Documents/work/client_marriator_front/app/shared/ui/StyledCheckboxMultiple/StyledCheckboxMultiple.tsx",lineNumber:50,columnNumber:5},void 0)};x.__docgenInfo={description:"",methods:[],displayName:"StyledCheckboxMultiple",props:{inputtype:{required:!0,tsType:{name:"literal",value:'"checkboxMultiple"'},description:""},name:{required:!0,tsType:{name:"string"},description:""},value:{required:!0,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},options:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  value: string;
  label: string;
  disabled: boolean;
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"disabled",value:{name:"boolean",required:!0}}]}}],raw:`{
  value: string;
  label: string;
  disabled: boolean;
}[]`},description:""},validation:{required:!1,tsType:{name:"union",raw:'"default" | "none"',elements:[{name:"literal",value:'"default"'},{name:"literal",value:'"none"'}]},description:""},heading:{required:!1,tsType:{name:"string"},description:""},error:{required:!1,tsType:{name:"string"},description:""},status:{required:!1,tsType:{name:"literal",value:'"warning"'},description:""},helperInfo:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  text?: string;
  link?: {
    text: string;
    path: string;
    type: "external" | "internal";
  };
}`,signature:{properties:[{key:"text",value:{name:"string",required:!1}},{key:"link",value:{name:"signature",type:"object",raw:`{
  text: string;
  path: string;
  type: "external" | "internal";
}`,signature:{properties:[{key:"text",value:{name:"string",required:!0}},{key:"path",value:{name:"string",required:!0}},{key:"type",value:{name:"union",raw:'"external" | "internal"',elements:[{name:"literal",value:'"external"'},{name:"literal",value:'"internal"'}],required:!0}}]},required:!1}}]}},description:""},dividerTop:{required:!1,tsType:{name:"literal",value:"true"},description:""},dividerBottom:{required:!1,tsType:{name:"literal",value:"true"},description:""},styles:{required:!1,tsType:{name:"SxProps",elements:[{name:"Theme"}],raw:"SxProps<Theme>"},description:""},inputStyles:{required:!1,tsType:{name:"SxProps",elements:[{name:"Theme"}],raw:"SxProps<Theme>"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(values: string[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"string"}],raw:"string[]"},name:"values"}],return:{name:"void"}}},description:""},onImmediateChange:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};export{x as S};
