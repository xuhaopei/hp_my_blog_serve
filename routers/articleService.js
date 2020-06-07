const epxress = require('express');

const Article = require('../sql/MongoDb/views/articleDao');

const router = epxress.Router();

router.post('/Article/add',(req,res,next)=>{
    let array = req.body;
    // 这里必须用...array 因为你不能确定客户端传递过来的值。
    Article.addOne(...array,(err,data)=>{
        if(err) {
            next(err); 
        }
        res.status(200);
        res.json(data);
    })
})

router.get('/Article/find',(req,res,next)=>{
    let query = req.query;
    let articleId = Number(query.articleId);

    Article.query(articleId,(err,data)=>{
        if(err) {
            next(err); 
        }
        else if(data.length === 0) {
            res.status(404);
            res.send('文章不存在嗷');
        }
        else {
            res.status(200);
            res.json(data[0]);
        }
    })
})

router.get('/Article/update',(req,res,next)=>{
    let query = req.query();
    console.log(query)
    let articleId = query.articleId;
    let articleName = query.articleName;
    let articleContent = query.articleContent;

    Article.updateOne(articleId,articleName,articleContent,(err,data)=>{
        if(err) {
            next(err); 
        }
        res.status(200);
        res.send('更新文章成功！');
    })
})

router.get('/Article/delete',(req,res,next)=>{
    let query = req.query();
    console.log(query)
    let articleId = query.articleId;

    Article.deleteOne(articleId,(err,data)=>{
        if(err) {
            next(err); 
        }
        res.status(200);
        res.send('删除文章成功！');
    })
})
module.exports = router;