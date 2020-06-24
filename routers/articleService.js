const epxress = require('express');

const Article = require('../sql/MySql/views/articleDao');
const Directory = require('../sql/MySql/views/directoryDao');

const router = epxress.Router();

router.post('/Article/add',(req,res,next)=>{
    let array = req.body;
    console.log(array);
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
    let id = query.id;
    Article.query(id,(err,data)=>{
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

router.get('/Article/findAll',(req,res,next)=>{

    Article.queryAll((err,data)=>{
        if(err) {
            next(err); 
        }
        else if(data.length === 0) {
            res.status(404);
            res.send('文章不存在嗷');
        }
        else {
            res.status(200);
            res.json(data);
        }
    })
})
router.post('/Article/update',(req,res,next)=>{
    let body = req.body;
    Article.updateOne(...body,(err,data)=>{

        if(err) {
            next(err); 
        }
        res.status(200);
        res.send('更新文章成功！');
    })
})

router.get('/Article/updateRead',(req,res,next)=>{
    let query = req.query;
    let id = query.id;
    let read = query.read;
    Article.updateOneRead(id,read,(err,data)=>{
        if(err) {
            next(err); 
        }
        res.status(200);
        res.send('更新阅读次数成功！');
    })
})

router.get('/Article/delete',(req,res,next)=>{
    let query = req.query;
    let articleId = query.articleId;
    Directory.deleteOnByAriticleId(articleId,(err,data)=>{
        if(err) {
            next(err); 
        }
    });
    Article.deleteOne(articleId,(err,data)=>{
        if(err) {
            next(err); 
        }
        res.status(200);
        res.send('删除文章成功！');
    })

})
module.exports = router;