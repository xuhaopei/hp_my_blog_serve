// 引入模块依赖
const jwt = require('jsonwebtoken');

class Token{
    constructor(){
        this.privateKey = 'xhp';
        this.validateTime =  60*60*24*30;              // 设置token时间为30天 60*60 * 24 * 30 
    };
    // 根据data创建token
    createToken(data){
        let token = null;
        token = jwt.sign(
            {data:data},
            this.privateKey,
            {expiresIn:this.validateTime}
        );
        return token;
    };
    // 解析token
    validateToken(token) {
        let result = null;
        try {
            let decoded = jwt.verify(token, this.privateKey);
            result = decoded;
        } catch(err) {
            result = null;
        }
        return result;
    }

}
let hp_jwt = new Token();
module.exports = hp_jwt;