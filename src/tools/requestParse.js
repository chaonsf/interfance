const md5=require('md5');
module.exports= {
    async encrypt(_this){
        let timestamp=_this.get("timestamp");
        let carrySign=_this.get("sign")
        let curtimestamp = Date.parse(new Date())/1000;
        let sign="";
        //let data=await this.parse(_this.ctx.req)
        let data=_this.post();
        think.logger.info("传过来的时间戳:",timestamp);
        think.logger.info("传过来的参数:",data)
        think.logger.info("传过来的签名:",carrySign)
        if(curtimestamp-5<=timestamp&&curtimestamp+5>=timestamp){
            let json=Buffer.from(JSON.stringify(data)).toString('base64');
            think.logger.info("base后:",json)
            let privateKey=think.parsed("before").privateKey;
            sign=md5(timestamp+json+privateKey).toLocaleLowerCase().replace("-","");
            think.logger.info("本地的签名：",sign)
             if(carrySign==sign){
                  think.logger.info("签名校验通过")
             }else{
                think.logger.error("签名校验不一致",carrySign)
                throw new Error("签名校验不一致")
             }
         }else{
              think.logger.error("报文时间戳校验错误:",timestamp)
             throw new Error("报文时间戳校验错误")
        }
         let json=data
        //let json=JSON.parse(data.toString());
         return json
    },
    parsePostBody(req,done){
       // var length = req.headers['content-length'] - 0;
        var arr = [];
        var chunks;
        req.on('data', buff => {
            arr.push(buff);
        });
    
        req.on('end', () => {
            chunks = Buffer.concat(arr);
          
            done(chunks);
        });
      },
    async parse(req){
        let that=this;
        function result(){
            return new Promise((resolve,reject)=>{
                that.parsePostBody(req,(data)=>{
                      resolve(data)
                })
            })
        }
        let data=await result();
        return data
    }
    
}