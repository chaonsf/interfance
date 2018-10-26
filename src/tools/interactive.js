const way_crypto=require('./encrypt');
const md5=require('md5');
module.exports= class{
     constructor(cfg){
         //传入所需要的配置
         this.cfg=cfg
     }
     makeSign(text){
         return md5(text+this.cfg.KEY).toLocaleLowerCase().replace("-","");
     }
    async fetchData(param,url){
        if(typeof param !=='string'){
            param=JSON.stringify(param)
        }
        let key=this.cfg.KEY;
        let iv=this.cfg.IV;
        let encryptData=way_crypto.encypt(param,key,iv);
        let requestToken=this.makeSign(param);
        url=url||this.cfg.URL;
        let data=await think.fetch(url,{
            method:"POST",
            body:encryptData,
            headers:{
                'Content-Type':'application/json',
                "REQUEST_TOKEN": requestToken
            }
        }).then(res=>res.text()).then(text=>JSON.parse(way_crypto.decrtpt(text,key,iv)))
        .catch(ex=>{
            think.logger.error(ex);
            return {
                RETURN_CODE: 99,
                RETURN_MESSAGE:"交互异常"
             }
        });
        return data
    }

}