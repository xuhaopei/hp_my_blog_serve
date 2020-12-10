// 引入模块依赖
const jwt = require('jsonwebtoken');
// 创建 token 类

function Token(){
    this.privateKey = 'xhp';
    this.validateTime = 60*60*24*365;              // 设置token时间为一个小时 * 24 * 365
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
    let result = null;
    try {
        let decoded = jwt.verify(token, this.privateKey);
        result = decoded;
    } catch(err) {
        result = null;
    }
    return result;
}

let hp_jwt = new Token();
module.exports = hp_jwt;