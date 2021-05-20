const epxress = require('express');
const hp_jwt  = require('../../validate/token.js');
const Article = require('../../sql/MySql/views/articleDao.js');
const canCross = require("../../util/filterArticles");

const router = epxress.Router();

/******************************get请求***************************/
// 根据文章id查询文章信息
router.get('/article/queryOne',(req,res,next)=>{
    let query = req.query;
    let id = query.id;
    Article.queryById(id,(err,data)=>{
        if(err) {
            next(err); 
        }
        else if(data.length === 0) {
            res.status(404);
            res.send('文章不存在,/article/queryOne');
        }
        else {
            Article.updateOneRead(
                data[0].id, Number(data[0].readTime) + 1,
                (err,data1)=>{
                }
            )
            res.status(200);
            res.json(data[0]);
        }
    })

})

// 根据content,查询文章的标题或标签总数量。
router.get('/article/queryLikeSum',(req,res,next)=>{
    let query = req.query;
    let content = query.content;
    Article.queryLikeSum(content,(err,data)=>{
        if(err) {
            next(err); 
        }
        else {
            // let token = hp_jwt.validateToken(req.headers.token);
            // if(token && token.data.authority === 1) {
            // } else {
            //     data = canCross(data,token);
            // }
            if(data.length === 0) {
                res.status(404);
                res.send('文章不存在,/article/queryLikeSum');
            }
            res.status(200);
            res.json(data[0]['COUNT(*)']);
        }
    })
})
// 根据content,分页模糊查询文章的标题或标签。
router.get('/article/queryLike',(req,res,next)=>{
    let query = req.query;
    let content = query.content;
    let start = query.start;
    let end = query.end;
    Article.queryLike(content,start,end,(err,data)=>{
        if(err) {
            next(err); 
        }
        else if(data.length === 0) {
            res.status(404);
            res.send('文章不存在,/article/queryLike');
        }
        else {
            let token = hp_jwt.validateToken(req.headers.token);
            if(token && token.data.authority === 1) {
            } else {
                data = canCross(data,token);
            }
            res.status(200);
            res.json(data);
        }
    })
})

// 根据用户id和Content,查询文章的标题或标签总数量。
router.get('/article/queryLikeByUIdAndContentSum',(req,res,next)=>{
    let query = req.query;
    let content = query.content;
    let uId = query.uId;
    Article.queryLikeByUIdSum(uId,content,(err,data)=>{
        if(err) {
            next(err); 
        }
        else if(data.length === 0) {
            res.status(404);
            res.send('文章不存在,/article/queryLike');
        }
        else {
            res.status(200);
            res.json(data[0]['COUNT(*)']);
        }
    })
})
// 根据用户id和Content,分页模糊查询文章的标题或标签。
router.get('/article/queryLikeByUIdAndContent',(req,res,next)=>{
    let query = req.query;
    let content = query.content;
    let uId = query.uId;
    let start = query.start;
    let end = query.end;
    Article.queryLikeByUId(uId,content,start,end,(err,data)=>{
        if(err) {
            next(err); 
        }
        else if(data.length === 0) {
            res.status(404);
            res.send('文章不存在,/article/queryLike');
        }
        else {
            res.status(200);
            res.json(data);
        }
    })
})
/**************************post请求******************************/

/************************服务器报错*************************************/
router.use((err,req,res,next)=>{
    if(err) {
        console.log(err);
        res.status(500).json(err); 
    }
})
module.exports = router;
