const hp_jwt = require('../validate/token');
const apiRouter = require('../routers/baseRouter');

module.exports = function (req, res, next) {
    let url = req.url;
    // 针对get请求 做处理
    let length = url.indexOf('?');
    url = (length == -1) ? url : url.substring(0, length);
    switch (url) {
        // 这些不需要验证token
        case apiRouter.userService.add:
            next();
            break;
        case apiRouter.userService.find:
            next();
            break;
        case apiRouter.directoryService.findAll:
            next();
            break;
        case apiRouter.articleServilce.findAll:
            next();
            break;
        case apiRouter.articleServilce.find:
            next();
            break;
        case apiRouter.articleServilce.findLike:
            next();
            break;
        case apiRouter.files.uploadImage:
            next();
            break;
        // 其它默认需要验证token
        default:
            let token = req.headers.token;
            if (hp_jwt.validateToken(token) == false) {
                res.status(401);
                res.json('劫持出错了呀~');
                console.log('劫持了丫.');
                return;
            }
            next();

    }
}