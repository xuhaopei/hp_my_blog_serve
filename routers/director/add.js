const epxress = require('express');
const hp_jwt  = require('../../validate/token.js');
const Directory = require('../../sql/MySql/views/directoryDao');

const router = epxress.Router();

/**post请求**/
// 添加一个目录
router.post('/directory/add',(req,res,next)=>{

    let data = req.body;
    // 先检查用户权限
    let token = hp_jwt.validateToken(req.headers.token);
    // 判断是否登录
    if(token === null) {
        res.status(401).json('请您登录,/article/add');
    }
    else {  
        // 创建目录，顺便更新目录。
        Directory.addOne(
            data.pid,data.path,data.name,data.articleId,data.uid,
            (err,newData)=>{
                if(err) {
                    next(err); 
                }
                Directory.updateOne(
                    newData.insertId,
                    data.path + '/' +  newData.insertId,
                    (err,data)=>{
                        if(err) {
                            next(err); 
                        }
                        console.log(data)
                        res.status(200);
                        res.json(data);
                    }
                )
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