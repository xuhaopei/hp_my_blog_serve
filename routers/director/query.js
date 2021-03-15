const epxress = require('express');
const hp_jwt  = require('../../validate/token.js');
const Directory = require('../../sql/MySql/views/directoryDao');

const router = epxress.Router();

/******************************get请求***************************/
// 根据用户id查询所有目录信息
router.get('/directory/queryAll',(req,res,next)=>{
    let query = req.query;
    // 先检查用户权限
    let token = hp_jwt.validateToken(req.headers.token);
    // 判断是否登录
    if(token === null) {
        res.status(401).json('请您登录,/directory/queryAll');
    } 
    else if(token.id === query.uid) {
        Directory.queryByUid(query.uid,(err,data)=>{
            if(err) {
                next(err); 
            }
            else if(data.length === 0) {
                res.status(404);
                res.send('目录不存在,/directory/queryAll');
            }
            else {
                res.status(200);
                res.json(data);
            }
        })
    }
    else {
        res.status(403);
        res.send('您无此权限操作,/directory/queryAll');
    }


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
