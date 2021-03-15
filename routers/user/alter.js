const epxress = require('express');
const hp_jwt  = require('../../validate/token.js');
const User = require('../../sql/MySql/views/userDao');

const router = epxress.Router();

/**************************post请求******************************/
/**
 * 修改用户信息
 */
router.post('/user/alert',(req,res,next)=>{
    let data = req.body;
    // 先检查用户权限
    let token = hp_jwt.validateToken(req.headers.token);
    // 判断是否登录
    if(token === null) {
        res.status(401).json('请您登录,/user/alert');
    }
    // 如果是管理员 或者 参数id与tokenid一致(用户修改自己)
    else if(token.authority == 0 || token.id == data.id) {  
        User.alertOne(
            data.id, data.userName, data.password, data.sex, data.school, data.major,
            (err,data)=>{
                if(err) {
                    next(err);
                }
                res.status(200).json(data);
            }
        )
    } 
    // 如果都不是 无权修改
    else {  
        res.status(403).json('无权限修改,/user/register');
    }

})
/******************************get请求***************************/


/************************服务器报错*************************************/
router.use((err,req,res,next)=>{
    if(err) {
        console.log(err);
        res.status(500).json(err); 
    }
})
module.exports = router;
