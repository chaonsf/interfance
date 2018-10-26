const fs=require('fs');
const path=require('path');
module.exports={
      readjson(){
           let json=JSON.parse(fs.readFileSync(path.join(__dirname,'../../config.json'), 'utf8')); 
           return json
      },
      parsed(key){
          let json=this.readjson();
          let name;
          if(key){
             name=json[key]
          }else{
              name=json
          }
          return name
      }
}