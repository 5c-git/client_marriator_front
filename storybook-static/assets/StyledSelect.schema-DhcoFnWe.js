const e="select",t="http://json-schema.org/draft-07/schema#",r="Schema for Select",n="object",i={inputtype:{type:"string",const:"select"},name:{type:"string"},value:{type:"string"},placeholder:{type:"string"},options:{type:"array",items:{type:"object",properties:{value:{type:"string"},label:{type:"string"},disabled:{type:"boolean"}},required:["value","label","disabled"]}},disabled:{type:"boolean",const:!0},validation:{type:"string",enum:["none","default"]},heading:{type:"string"},error:{type:"string"},status:{type:"string",const:"warning"},dividerTop:{type:"boolean",const:!0},dividerBottom:{type:"boolean",const:!0},helperInfo:{type:"object",minProperties:1,properties:{text:{type:"string"},link:{type:"object",properties:{text:{type:"string"},path:{type:"string"},type:{type:"string",enum:["internal","external"]}},required:["text","path","type"]}},additionalProperties:!1}},p=["inputtype","name","value","placeholder","options","validation"],s={$id:e,$schema:t,title:r,type:n,properties:i,required:p};export{s};
