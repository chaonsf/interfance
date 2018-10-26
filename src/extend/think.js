const fetchData=require('../tools/interactiveWay');
const requireParse=require('../tools/requestParse')
const readjson=require("../tools/readJson");
const common=require('../tools/common');
const stream=require('../tools/receivingStream')
const all=Object.assign(fetchData,requireParse,readjson,common,stream);
module.exports=all