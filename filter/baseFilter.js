const hp_jwt = require('../validate/token');

module.exports = function (req, res, next) {
    let url = req.url;

    // 针对get请求 做处理
    let length = url.indexOf('?');
    url = (length == -1) ? url : url.substring(0, length);

    switch (url) {
        // 这些不需要验证token
        case '/user/login':
            next();
            break;
        case '/user/register':
            next();
            break;
        case '/Directory/getAllDirectory':
            next();
            break;
        case '/Article/find':
            next();
            break;
        case '/Article/findAll':
            next();
            break;
        case '/Article/query':
            next();
            break;
        // 其它默认需要验证token
        default:
            let token = req.headers.token;
            if (hp_jwt.validateToken(token) == false) {
                res.status(401);
                res.json('出错了呀~');
                return;
            }
            next();

    }
}