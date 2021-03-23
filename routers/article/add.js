const epxress = require('express');
const hp_jwt  = require('../../validate/token.js');
const article = require('../../sql/MySql/views/articleDao');

const router = epxress.Router();

/**post请求**/
// 添加一篇文章
router.post('/article/add',(req,res,next)=>{

    let data = req.body;
    // 先检查用户权限
    let token = hp_jwt.validateToken(req.headers.token);
    // 判断是否登录
    if(token === null) {
        res.status(401).send('创建失败，请您先登录,/article/add');
    }
    else {  
        article.addOne(
            data.pid, data.articleName, data.articleContent,data.author,data.tags,data.uid,
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