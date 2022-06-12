const crypto=require("crypto");

const salt="VeryUniqueLinesOfTextForMyProject";

module.exports=function(password){
    if( typeof password!== "string"){
        return null;
    }
    return crypto

    .createHmac('sha256', salt) 
    .update(password)  
    .digest('hex'); 
}


