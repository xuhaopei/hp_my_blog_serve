// 引入模块依赖
const jwt = require('jsonwebtoken');
// 创建 token 类

function Token(){
    this.privateKey = 'xhp';
    this.validateTime = 60*60;
}
Token.prototype.createToken = function(data){
    let token = jwt.sign(
        {data:data},
        this.privateKey,
        {expiresIn:this.validateTime}
    );
    return token;
}
Token.prototype.validateToken = function(token){
    let result = false;
    try {
        let decoded = jwt.verify(token, this.privateKey);
        result = true;
    } catch(err) {
        // err
        result = false;
    }
    return result;
}

let hp_jwt = new Token();
module.exports = hp_jwt;