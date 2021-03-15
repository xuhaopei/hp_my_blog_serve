const epxress = require('express');
const hp_jwt  = require('../../validate/token.js');
const User = require('../../sql/MySql/views/userDao');

const router = epxress.Router();

/******************************get请求***************************/
// 查询用户信息
router.get('/user/queryOne',(req,res,next)=>{
    let query = req.query;
    let id = query.id;
    User.queryById(id,(err,data)=>{
        if(err) {
            next(err); 
        }
        else if(data.length === 0) {
            res.status(404);
            res.send('用户不存在,/user/queryOne');
        }
        else {
            res.status(200);
            res.json(data[0]);
        }
    })

})

/**************************post请求******************************/
/**
 * 用户登录
 */
 router.post('/user/login',(req,res,next)=>{
    let data = req.body;
    
    User.queryByUserNameAndPassword(data.email,data.password,(err,data)=>{
        if(err) {
            next(err); 
        } else if(data.length === 0) { 
            res.status(404).send('用户不存在');
        } else {
            let token = hp_jwt.createToken({
                id : data[0].id,
                authority:data[0].authority,
            });
            res.status(200);     
            res.send({token,user:data[0]});
            return next();
        }
    })
})

/************************服务器报错*************************************/
router.use((err,req,res,next)=>{
    if(err) {
        console.log(err);
        res.status(500).json(err); 
    }
})
module.exports = router;
