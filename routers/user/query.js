const epxress = require('express');
const hp_jwt = require('../../validate/token.js');
const User = require('../../sql/MySql/views/userDao');

const router = epxress.Router();

/******************************get请求***************************/
// 查询用户信息
router.get('/user/queryOne', (req, res, next) => {
    let query = req.query;
    let id = query.id;
    User.queryById(id, (err, data) => {
        if (err) {
            next(err);
        } else if (data.length === 0) {
            res.status(404);
            res.send('用户不存在,/user/queryOne');
        } else {
            delete data[0].password;
            res.status(200);
            res.json(data[0]);
        }
    })

})

// 分页查询用户信息
router.get('/user/queryMore', (req, res, next) => {
    let query = req.query;
    let start = query.start;
    let end = query.end;
    // 先检查用户权限
    let token = hp_jwt.validateToken(req.headers.token);
    // 判断是否登录
    if (token === null) {
        res.status(401).json('请您登录,/user/queryMore');
    } else if (token.data.authority !== 1) {
        res.status(403).json('无权限,/user/queryMore');
    }
    User.queryMore(start, end, (err, data) => {
        if (err) {
            next(err);
        } else if (data.length === 0) {
            res.status(404);
            res.send('用户不存在,/article/queryLike');
        } else {
            res.status(200);
            res.json(data);
        }
    })
})
// 查询用户信息总数量。
router.get('/user/querySum',(req,res,next)=>{
    User.queryMoreSum((err,data)=>{
        if(err) {
            next(err); 
        }
        else {
            let token = hp_jwt.validateToken(req.headers.token);
            if(token && token.data.authority === 1) {
            } else {
                data = canCross(data,token);
            }
            if(data.length === 0) {
                res.status(404);
                res.send('用户不存在,/user/querySum');
            }
            res.status(200);
            res.json(data[0]['COUNT(*)']);
        }
    })
})

/**************************post请求******************************/
/**
 * 用户登录
 */
router.post('/user/login', (req, res, next) => {
    let data = req.body;

    User.queryByUserNameAndPassword(data.email, data.password, (err, data) => {
        if (err) {
            next(err);
        } else if (data.length === 0) {
            res.status(404).send('用户不存在');
        } else {
            let token = hp_jwt.createToken({
                id: data[0].id,
                authority: data[0].authority,
            });
            res.status(200);
            res.send({
                token,
                user: data[0]
            });
            return next();
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