const epxress = require('express');
const hp_jwt  = require('../../validate/token.js');
const Article = require('../../sql/MySql/views/articleDao');

const router = epxress.Router();

/******************************get请求***************************/
/**
 * 删除文章
 */
router.get('/article/delete',(req,res,next)=>{
    let data = req.query;
    // 先检查用户权限
    let token = hp_jwt.validateToken(req.headers.token);
    // 判断是否登录
    if(token === null) {
        res.status(401).send('请您登录,/article/delete');
    }
    // 判断是否为自己的文章
    else if(token.id === req.uid){  
        Article.deleteOne(
            data.id,
            (err,data)=>{
                if(err) {
                    next(err);
                }
                res.status(200).json(data);
            }
        )
    } else {
        res.status(403).send('无权限,/article/delete');
    }
})

/************************服务器报错*************************************/
router.use((err,req,res,next)=>{
    if(err) {
        console.log(err);
        res.status(500).json(err); 
    }
})
module.exports = router;
