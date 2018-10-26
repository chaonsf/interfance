const Base = require('./base.js');
module.exports = class extends Base{
     async MapAction(){
        try {
            let midData=await think.encrypt(this);
            think.isNullOrEmptyString(midData,"pdpd_id")
            let arr={
                "SP_NAME":"SP_CBC_WEB_HOSPITAL_LIST",
                "DB_NAME":"DENTAL_SHOP",
                "m":"SELECT",
                "EHUSER":"CBC",
                "PDPD_ID":midData.pdpd_id
            }
            let returnMsg=await think.request(arr).then(ret=>{
                return {
                    errcode:"0",
                    errmsg:"ok",
                    result:ret

                }
            })
            think.logger.info("返回给前台的数据:",returnMsg)
            this.json(returMsg)
        } catch (error) {
            think.logger.error(error.stack)
            this.json({
                errcode:"999",
                errmsg:error.message 
            })
        }
     }
     async BillAction(){
        try {
            let midData=await think.encrypt(this);
            think.isNullOrEmptyString(midData,"meme_name","meme_cert_id_num","pdpd_id","back_url","uid")

            let arr={
                "SP_NAME":"SP_CBC_BILL_INFO_INSERT",
                "DB_NAME":"DENTAL_SHOP",
                "EHUSER":midData.meme_cert_id_num,
                "m":"INSERT",
                "CBC_SOURCE":midData.source
            }
            let shuju=Object.assign(arr,midData);
            let returnMsg=await think.request(shuju).then(ret=>{
                if(ret.RETURN_CODE==0){
                    /* 获取主机名和端口号 */
                    let host=this.header('host');
                    let href=host+"/unifiedPay/"+ret.CBC_BILL_ID;
                    return {
                        errcode:"0",
                        errmsg:"ok",
                        result:href
                    }
                }else{
                    return {
                        errcode:"999",
                        errmsg:ret.RETURN_MESSAGE
                    }
                }
            })
            think.logger.info("返回给前台的数据:",returnMsg)
            this.json(returnMsg)
           
            
        } catch (error) {
            think.logger.error(error.stack)
            this.json({
                errcode:"999",
                errmsg:error.message 
            })
        }
     }
}