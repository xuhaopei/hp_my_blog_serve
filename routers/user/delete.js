const epxress = require('express');
const hp_jwt = require('../../validate/token.js');
const User = require('../../sql/MySql/views/userDao');

const router = epxress.Router();

/******************************get请求***************************/
/**
 * 删除用户
 */
router.post('/user/delete', (req, res, next) => {
    let data = req.body;
    // 先检查用户权限
    let token = hp_jwt.validateToken(req.headers.token);
    // 判断是否登录
    if (token === null) {
        res.status(401).json('请您登录,/user/delete');
    } 
    if (token.data.authority !== 1) {
        res.status(403).json('无权限,/user/delete');
    }
    User.deleteOne(data.ids.join(","), (err, data) => {
        if (err) {
            next(err);
        } else if (data.length === 0) {
            res.status(404);
            res.send('用户不存在,/user/delete');
        } else {
            res.status(200);
            res.json(data[0]);
        }
    })
})

/************************服务器报错*************************************/
router.use((err, req, res, next) => {
    if (err) {
        console.log(err);
        res.status(500).json(err);
    }
})
module.exports = router;