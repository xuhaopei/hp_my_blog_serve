const epxress = require('express');


const Article = require('../sql/MySql/views/articleDao');
const Directory = require('../sql/MySql/views/directoryDao');
const apiRouter = require('./baseRouter');

const routerPath = apiRouter.articleServilce;
const router = epxress.Router();

router.post(routerPath.add,(req,res,next)=>{

    //let [pid, articleName, articleContent,author,tags,articleContentText] = [...req.body];
    
    Article.addOne(...req.body,(err,data)=>{
        if(err) {
            next(err); 
        }
        res.status(200);
        res.json(data);
    })
})

router.get(routerPath.find,(req,res,next)=>{
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

router.get(routerPath.findLike,(req,res,next)=>{
    let query = req.query;
    let content = query.content;
    Article.likeQuery(content,(err,data)=>{
        if(err) {
            next(err); 
        }
        else {
            res.status(200);
            res.json(data);
        }
    })
})
router.get(routerPath.findAll,(req,res,next)=>{

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
            data.forEach(element => {
                element.articleContent = element.articleContent.replace(/’/g,'\'');
            });
            res.json(data);
        }
    })
})
router.post(routerPath.update,(req,res,next)=>{
    let body = req.body;
    Article.updateOne(...body,(err,data)=>{

        if(err) {
            next(err); 
        }
        res.status(200);
        res.send('更新文章成功！');
    })
})

router.get(routerPath.updateRead,(req,res,next)=>{
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

router.get(routerPath.delete,(req,res,next)=>{
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