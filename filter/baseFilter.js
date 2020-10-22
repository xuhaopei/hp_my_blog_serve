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
        case apiRouter.articleServilce.find:
            next();
            break;
        case apiRouter.articleServilce.findSome:
            next();
            break;        
        case apiRouter.articleServilce.findNear:
            next();
            break;
        case apiRouter.articleServilce.findLike:
            next();
            break;
        case apiRouter.articleServilce.findLikeSum:
            next();
            break;
        case apiRouter.articleServilce.findSum:
            next();
            break;
        case apiRouter.files.uploadImage:
            next();
            break;
        // 其它默认需要验证token
        default:
            if (hp_jwt.validateToken(req.headers.token) == false) {
                res.status(401);
                res.json('你没有权限查看，请您登录~');
                console.log('劫持了丫.', url);
                return;
            }
            next();
    }
}