const epxress = require('express');
const hp_jwt  = require('../../validate/token.js');
const Article = require('../../sql/MySql/views/articleDao');
const Directory = require('../../sql/MySql/views/directoryDao');
const maps = require('./map');
const router = epxress.Router();

/************************初始化映射表********************************/
maps.init(); 

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
    else if(token.data.id === maps.directory_id_uid.get(Number(data.id))){ 
        // 删除深层次的文章时需要用到pids
        Directory.queryByPath(data.id,(err,data1)=>{
            let pids = [];
            data1.forEach((ele)=>{
                if(ele.articleId === 0) {
                    pids.push(ele.id);
                }
                maps.directory_id_uid.delete(ele.id);
            });
            // 删目录
            Directory.deleteOne(data.id,(err,newData)=>{
                if(err) {
                    next(err); 
                }
                // 删文章
                Article.deleteOneByPids(pids.join(","),(err,data)=>{
                    res.status(200);
                    res.json(data);
                })
            })
        });

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
