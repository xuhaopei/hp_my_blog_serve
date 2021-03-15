const epxress = require('express');
const hp_jwt  = require('../../validate/token.js');
const Calenderplan = require('../../sql/MySql/views/calenderplanDao');

const router = epxress.Router();

/**post请求**/
// 添加一篇文章
router.post('/article/add',(req,res,next)=>{

    let data = req.body;
    // 先检查用户权限
    let token = hp_jwt.validateToken(req.headers.token);
    // 判断是否登录
    if(token === null) {
        res.status(401).json('请您登录,/article/add');
    }
    else {  
        Calenderplan.addOne(
            data.uid, data.date, data.gridData,
            (err,data)=>{
                if(err) {
                    next(err);
                }
                res.status(200).json(data);
            }
        )
    }
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