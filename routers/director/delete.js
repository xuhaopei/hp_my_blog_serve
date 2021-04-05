const epxress = require('express');
const hp_jwt  = require('../../validate/token.js');
const Article = require('../../sql/MySql/views/articleDao');
const Directory = require('../../sql/MySql/views/directoryDao');

const router = epxress.Router();

/******************************get请求***************************/
/**
 * 删除目录
 */
router.get('/director/delete',(req,res,next)=>{
    let data = req.query;
    // 先检查用户权限
    let token = hp_jwt.validateToken(req.headers.token);
    // 判断是否登录
    if(token === null) {
        res.status(401).send('请您登录,/director/delete');
    }
    // 判断是否为自己的目录
    else if(token.id === data.uid){  
        // 删目录
        Directory.deleteOne(data.id,(err,data)=>{
            if(err) {
                next(err); 
            }
            res.status(200);
            res.json(data);
            // // 删文章
            // Article.deleteOne(data.articleId,(err,data)=>{
            //     res.status(200);
            //     res.json(data);
            // })
        })
    } else {
        res.status(403).send('无权限,/director/delete');
    }
    let array = req.body;
})

/************************服务器报错*************************************/
router.use((err,req,res,next)=>{
    if(err) {
        console.log(err);
        res.status(500).json(err); 
    }
})
module.exports = router;
