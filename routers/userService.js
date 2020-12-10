const epxress = require('express');

//const User = require('../sql/MongoDb/views/userDao');       // 引用mongoDB
const User = require('../sql/MySql/views/userDao');
const hp_jwt  = require('../validate/token');
const apiRouter = require('./baseRouter');

const routerPath = apiRouter.userService;
const router = epxress.Router();

router.post(routerPath.find,(req,res,next)=>{
    
    User.query(req.body.username,req.body.password,(err,data)=>{
        if(err) {
            next(err); 
        }
        if(data.length === 0) {
            res.status(404).json('查无此人嗷');
            return next();
        }
        for (const one of data) {
            let user = {
                userId     : one.userId,
            }
            let token = hp_jwt.createToken(user);
            //res.setHeader('Access-Control-Allow-Credentials','true');
            //res.setHeader('Content-type','text/plain');
            //res.setHeader('Set-Cookie', ['name=xhp','Expires=Wed, 09 Jun 2021 10:18:14 GMT']);  
            res.status(200);     
            res.send({token,user});
            return next();
        }
    })
})

router.post(routerPath.add,(req,res,next)=>{
    return res.status(403).json('暂时不支持注册！');
    User.addOne(req.body.username,req.body.email,req.body.password,(err,data)=>{
        if(err) {
            next(err);
        }
        res.status(200).json(data);
    })
})
// 当调用api出现错误时，统一到这里处理;
router.use((err,req,res,next)=>{
    if(err) {
        console.log(err);
        res.status(500).json(err); 
    }
})


module.exports = router;