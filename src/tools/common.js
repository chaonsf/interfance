const path=require('path');
const fs = require('fs');
const FormData=require('form-data');
module.exports={
    isNullOrEmptyString(data, ...args) {
        for(let arg of args) {
            if (!data[arg] || data[arg] == "") {
                 throw new Error(arg + "参数传递有误")
            }
        }
    },
    async isNullSession(_this){
         let session=await _this.session("user")
         if(!session){
             setTimeout(()=>{
                _this.redirect("/login/index")
             },3000)
             throw new Error("session过期，请重新登陆")
         }
    },
    async readSession(_this,key){
        let session=await _this.session("user");
        if(!session){
            think.logger.info("session过期")
            return false
        }else{
            let value=session[key];
            return value
        }
    },
    base64_decode(data){
        let separator=think.parsed("separator");
        let array=data.split(separator)
        let arr=[]
        for(let i=0;i<array.length;i++){
            let buffer=Buffer.from(array[i],"base64");
            let result=buffer.toString();
            arr.push(result)
        }
       return arr
     },
     //传输图片过来的处理,返回文件的路径
     fileImage(that,thing){
         const file=that.file(thing);
         think.logger.info("传过来的"+thing+"文件:",file);
        let formData=new FormData()
         for(let i=0;i<file.length;i++){
             let random=(Math.random()*100).toFixed(2);
            let  filepath = path.join(think.ROOT_PATH, 'runtime/upload/'+random+file[i].name);
             let  buff=fs.createReadStream(filepath);
             formData.append(thing,buff)
            let boff= think.isExist(path.dirname(filepath))
            if(!boff){
                think.mkdir(path.dirname(filepath));
            }
             let data=fs.readFileSync(file[i].path);
             fs.writeFileSync(filepath,data)
         }
         return formData
         
     },
     makeFormData(obj,formData){
            for(let i in obj){
                formData.append(i,obj[i])
            }
            return formData
       }
}