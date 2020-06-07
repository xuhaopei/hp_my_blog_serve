const epxress = require('express');
const jwt = require('jsonwebtoken');

const User = require('../sql/MongoDb/views/userDao');       // 引用mongoDB
//const User = require('../sql/MySql/views/userDao');

const router = epxress.Router();

router.post('/user/register',(req,res,next)=>{

    User.query(req.body.username,req.body.password,(err,data)=>{
        if(err) {
            next(err); 
        }
        if(data.length === 0) {
            return res.status(404).json(0);
        }
        for (const one of data) {
            console.log(one);
            let user = {
                userId     : one.userId,
                userName   : one.userName,
                email      : one.email,
                authority  : one.authority,
                creatDate  : one.creatDate
            }
            let token = jwt.sign(user,'xhp');
            res.status(201);
            return res.send({token,user});
        }
    })
})

router.post('/user/login',(req,res,next)=>{
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