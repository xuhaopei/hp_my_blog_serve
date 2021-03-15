const epxress = require('express');
const hp_jwt  = require('../../validate/token.js');  
const Comment = require('../../sql/MySql/views/commentDao');


const router = epxress.Router();

/**************************post请求******************************/

/******************************get请求***************************/
/**
 * 修改评论的点赞次数
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
            Comment.updateOneGood(
                data.id, data.tags + ',' + token.id,
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
