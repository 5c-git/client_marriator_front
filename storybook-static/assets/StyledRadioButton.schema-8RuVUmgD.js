const e="radio",t="http://json-schema.org/draft-07/schema#",i="Schema for radio input",r="object",n={inputtype:{type:"string",const:"radio"},name:{type:"string"},value:{type:"string"},validation:{type:"string",enum:["none","default"]},heading:{type:"string"},error:{type:"string"},status:{type:"string",const:"warning"},dividerTop:{type:"boolean",const:!0},dividerBottom:{type:"boolean",const:!0},helperInfo:{type:"object",minProperties:1,properties:{text:{type:"string"},link:{type:"object",properties:{text:{type:"string"},path:{type:"string"},type:{type:"string",enum:["internal","external"]}},required:["text","path","type"]}},additionalProperties:!1},options:{type:"array",minItems:1,items:{type:"object",properties:{value:{type:"string"},label:{type:"string"},disabled:{type:"boolean"},icon:{type:"string",enum:["telegram","viber","whatsapp"]}},required:["value","label","disabled"]}}},p=["inputtype","name","value","options","validation"],s={$id:e,$schema:t,title:i,type:r,properties:n,required:p};export{s};
