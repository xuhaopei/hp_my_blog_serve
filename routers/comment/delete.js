const epxress = require('express');
const hp_jwt  = require('../../validate/token.js');
const Comment = require('../../sql/MySql/views/commentDao');

const router = epxress.Router();

/******************************get请求***************************/
/**
 * 删除评论
 */
router.get('/comment/delete',(req,res,next)=>{
    let data = req.query;
    // 先检查用户权限
    let token = hp_jwt.validateToken(req.headers.token);
    // 判断是否登录
    if(token === null) {
        res.status(401).send('请您登录,/comment/delete');
    }
    // 判断是否为自己的目录 或者 自己是否为管理员
    else if(token.id === data.uid || token.authority == 0){  
        // 删树级评论 
        Comment.deleteOne(data.id,(err,data)=>{
            if(err) {
                next(err); 
            }
            res.status(200);
            res.send("删除成功");
        })
    } else {
        res.status(403).send('无权限,/comment/delete');
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
