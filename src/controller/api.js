const Base = require('./base.js');
module.exports = class extends Base {
     async  fileAction(){
           try {
               let data=this.post();
               console.log(typeof data)
               think.logger.info("传过来的参数:",data);
               let formData=think.fileImage(this,'image');
                 let midData=think.makeFormData(data,formData)
               think.logger.info("传给其他接口的formdata:",midData)
               let backData=await think.request(midData);
               this.json(backData)
         
           } catch (error) {
               think.logger.error(error.stack);
               this.json({
                   errorno:"99",
                   errmsg:error.message
               })
           }
       }
     async urlAction(){
         try {
             let data=this.post();
             think.logger.info("接收到传来的base64参数:",data)
             let result=think.base64_decode(data);
              let backData=await think.request(result);
              this.json(backData)

         } catch (error) {
            think.logger.error(error.stack);
            this.json({
                errorno:"99",
                errmsg:error.message
            })
         }
     }
 
};
