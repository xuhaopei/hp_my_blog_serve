const epxress = require('express');
const hp_jwt  = require('../../validate/token.js');
const Article = require('../../sql/MySql/views/articleDao.js');

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
            res.status(200);
            res.json(data[0]);
        }
    })

})

// 根据分页数量，文章标签、标题模糊查询文章
router.get('/article/queryLike',(req,res,next)=>{
    let query = req.query;
    let content = query.content;
    let pageNum = query.pageNum;
    Article.queryLike(content,pageNum,(err,data)=>{
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
