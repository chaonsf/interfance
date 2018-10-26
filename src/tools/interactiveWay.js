
const requestParse=require('./interactive')
module.exports={
      async request(param,url){
            let json
          try {
             json=think.parsed('back');  
          } catch (error) {
             throw error  
          }
          let request=new requestParse(json);
          let result=await request.fetchData(param,url);
          return result
      }
}