const epxress = require('express');
const hp_jwt  = require('../../validate/token.js');
const Calenderplan = require('../../sql/MySql/views/calenderplanDao');

const router = epxress.Router();

/**************************post请求******************************/
/**
 * 修改日记
 */
router.post('/calenderplan/update',(req,res,next)=>{
    let data = req.body;
    // 先检查用户权限
    let token = hp_jwt.validateToken(req.headers.token);
    // 判断是否登录
    if(token === null) {
        res.status(401).json('无权限');
    }
    
    else {  
        Calenderplan.editOne(
            data.id, JSON.stringify(data.gridData), data.allFinish,data.date,
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
    } 
})
/******************************get请求***************************/
/**
 * 修改文章的阅读次数
 */
 router.get('/article/updateRead',(req,res,next)=>{

    let data = req.query;

    Article.updateOneRead(
        data.id, data.read,
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
})
/**
 * 修改文章的点赞次数
 */
 router.get('/article/updateGood',(req,res,next)=>{

    let data = req.query;
    
    // 先检查用户权限
    let token = hp_jwt.validateToken(req.headers.token);

    // 如果是自己点赞自己则取消，否则判断点赞人里面有无自己的ID,有则拒绝，无则点赞
    if(token.id === data.uid) {  
        res.status(403).json('无法点赞自己,/article/updateGood');
    } else {  
        let goods = data.good.split(',');

        if(goods.includes(token.id + '')) {
            res.status(403).json('已经点赞自己了,/article/updateGood');
        } else {
            Article.updateOne(
                data.id, data.tags + ',',
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
        }
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
