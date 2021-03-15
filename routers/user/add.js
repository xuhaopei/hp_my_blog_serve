const epxress = require('express');
const hp_jwt  = require('../../validate/token.js');
const User = require('../../sql/MySql/views/userDao');

const router = epxress.Router();

/**post请求**/
/**
 * 注册新用户
 */
router.post('/user/register',(req,res,next)=>{

    let data = req.body;
    // 先判断邮箱是否已经被注册
    new Promise((resolve,reject)=>{
        User.queryByEmail(data.email,(err,data)=>{
            if(err) {
                reject(err);
            } else if (data.length > 0) {
                reject();
            } else if (data.length === 0) { 
                resolve();
            }
        })
    // 再进行注册
    }).then(()=>{
        User.addOne(
            data.userName,
            data.email,
            data.password,
            data.sex,
            JSON.stringify(data.school),
            JSON.stringify(data.major),
            data.class,
            (err,data)=>{
                if(err) {
                    next(err);
                }
                res.status(200).json(data);
            }
        )
    }).catch(()=>{
        res.status(403).send("该邮箱已经被注册");
    });
})

/**get请求**/

// 当调用api出现错误时，统一到这里处理;
router.use((err,req,res,next)=>{
    if(err) {
        console.log(err);
        res.status(500).json(err); 
    }
})
module.exports = router;