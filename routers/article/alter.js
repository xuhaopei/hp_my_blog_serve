const epxress = require('express');
const hp_jwt  = require('../../validate/token.js');
const Article = require('../../sql/MySql/views/articleDao');

const router = epxress.Router();

/**************************post请求******************************/
/**
 * 修改文章信息
 */
router.post('/article/update',(req,res,next)=>{
    let data = req.body;
    // 先检查用户权限
    let token = hp_jwt.validateToken(req.headers.token);

    // 如果是管理员 或者 参数uid与tokenid一致(用户修改自己)
    if(token.data.authority === 1 || token.data.id === data.uid) {  
        Article.updateOne(
            Number(data.id), data.articleName, data.articleContent, data.tags,data.articleHtml,
            (err,data)=>{
                if(err) {
                    next(err);
                } else if(data.length===0){
                    res.status(404).send("资源不存在");
                } else {
                    res.status(200).json(data);
                }
            }
        )
    } else {  // 如果都不是 无权修改
        res.status(401).json('无权限修改,/article/update');
    }
})

/**
 * 修改文章审核信息
 */
 router.post('/article/updateCanCross',(req,res,next)=>{
    let data = req.body;
    // 先检查用户权限
    let token = hp_jwt.validateToken(req.headers.token);

    // 如果是管理员 或者 参数uid与tokenid一致(用户修改自己)
    if(token.data.authority === 1) {  
        Article.updateOneByCanCross(
            data.ids.join(','),
            data.num,
            (err,data)=>{
                if(err) {
                    next(err);
                } else if(data.length===0){
                    res.status(404).send("资源不存在");
                } else {
                    res.status(200).json(data);
                }
            }
        )
    } else {  // 如果都不是 无权修改
        res.status(401).json('无权限修改,/article/update');
    }
})
/******************************get请求***************************/

/**
 * 修改文章的点赞次数
 */
 router.get('/article/updateGood',(req,res,next)=>{

    let data = req.query;
    
    // 先检查用户权限
    let token = hp_jwt.validateToken(req.headers.token);

    if(token === null) {
        res.status(401);
        res.send('请你登录');
    } else {
        Article.queryById(data.id,(err,data)=>{
            if(err) {
                next(err); 
            }
            else if(data.length === 0) {
                res.status(404);
                res.send('文章不存在,/article/queryOne');
            }
            else {

                let goods = data[0].good === null ? [] : data[0].good.split(',');
                if(goods.includes(token.data.id + '')) {
                    res.status(403).send('已经点赞自己了,/article/updateGood');
                } else {
                    Article.updateOneGood(
                        data[0].id, goods.join(',') + token.data.id + ',',
                        (err,data)=>{
                            if(err){
                                res.status(404);
                                res.send(err);
                            } 
                            else {
                                res.status(200);
                                res.send("点赞成功")
                            }
                        }
                    )
                }
                
            }
        })
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
