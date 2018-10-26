//const setting=require("./interactiveSetting");
const crypto=require('crypto');
let algorithm={ ecb:'des-ecb',cbc:'des-cbc'};
module.exports={
     encypt(text,key,iv){
        let  clearEncoding = 'utf8';
        let cipherEncoding = 'base64';
         key=Buffer.from(key);
         iv=Buffer.from(iv?iv:0);
        let cipher = crypto.createCipheriv(algorithm.cbc, key, iv);
        cipher.setAutoPadding(true);
        var  crypt_text = cipher.update(text, clearEncoding, cipherEncoding);
        crypt_text += cipher.final(cipherEncoding);
        return crypt_text;
     },
     decrtpt(encrypt_text,key,iv){
        key=Buffer.from(key);
       iv=Buffer.from(iv?iv:0);
        var decipher = crypto.createDecipheriv(algorithm.cbc, key, iv);
            decipher.setAutoPadding(true);
            var txt = decipher.update(encrypt_text, 'base64', 'utf8');
            txt += decipher.final('utf8');
            return txt;
      }
}