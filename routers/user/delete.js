const epxress = require('express');
const hp_jwt  = require('../../validate/token.js');
const User = require('../../sql/MySql/views/userDao');

const router = epxress.Router();

/******************************get请求***************************/
/**
 * 删除用户
 */
router.get('/user/delete',(req,res,next)=>{
    let query = req.query;
    let id = query.id;
    User.deleteOne(id,(err,data)=>{
        if(err) {
            next(err); 
        }
        else if(data.length === 0) {
            res.status(404);
            res.send('用户不存在,/user/delete');
        }
        else {
            res.status(200);
            res.json(data[0]);
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
