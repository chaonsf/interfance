
module.exports={
        receiving(_this){
           
            const stream=_this.ctx.req;
            let data='';
            stream.on('data',(chunk)=>{
                data+=chunk;
            })
            stream.on('end',()=>{
                think.logger.info("接收到的流:",data)
                const shuju=JSON.parse(data);
                return shuju
            })
            stream.on('error',(err)=>{
                throw new Error(err.message)
            })
        }
}