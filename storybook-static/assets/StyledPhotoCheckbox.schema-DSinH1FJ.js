const t="photoCheckbox",e="http://json-schema.org/draft-07/schema#",i="Schema for photoCheckbox",r="object",p={inputtype:{type:"string",const:"photoCheckbox"},name:{type:"string"},value:{type:"array",items:{type:"string"}},validation:{type:"string",enum:["none","default"]},heading:{type:"string"},error:{type:"string"},status:{type:"string",const:"warning"},dividerTop:{type:"boolean",const:!0},dividerBottom:{type:"boolean",const:!0},helperInfo:{type:"object",minProperties:1,properties:{text:{type:"string"},link:{type:"object",properties:{text:{type:"string"},path:{type:"string"},type:{type:"string",enum:["internal","external"]}},required:["text","path","type"]}},additionalProperties:!1},options:{type:"array",minItems:1,items:{type:"object",properties:{value:{type:"string"},label:{type:"string"},disabled:{type:"boolean"},img:{type:"string"},text:{type:"string"},details:{type:"object",properties:{text:{type:"string"},details:{type:"string"},img:{type:"string"},link:{type:"object",properties:{text:{type:"string"},path:{type:"string"},type:{type:"string",enum:["internal","external"]}},required:["text","path","type"]}},required:["text","details","img"]}},required:["value","label","disabled","img"]}}},n=["inputtype","name","value","options","validation"],s={$id:t,$schema:e,title:i,type:r,properties:p,required:n};export{s};
