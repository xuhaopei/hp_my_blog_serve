const hp_jwt  = require('../validate/token');

module.exports = function(req, res, next){
    let url = req.url;
    if(url !== '/user/login') {
        let token = req.headers.token;
        console.log(token)
        if(hp_jwt.validateToken(token) == false) {
            res.status(401);
            console.log('?????');
            return;
            //res.send('无效的身份，请重新登录');
        }
    }

    next();
}