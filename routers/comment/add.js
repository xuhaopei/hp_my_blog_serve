const epxress = require('express');
const hp_jwt  = require('../../validate/token.js');
const Comment = require('../../sql/MySql/views/commentDao');

const router = epxress.Router();

/**post请求**/
// 添加一则评论
router.post('/comment/add',(req,res,next)=>{

    let data = req.body;
    // 先检查用户权限
    let token = hp_jwt.validateToken(req.headers.token);
    // 判断是否登录
    if(token === null) {
        res.status(401).json('请您登录,/article/add');
    }
    else {  
        // 添加评论。
        Comment.addOne(
            data.content, data.aId, data.uId, data.userName, data.path, data.pId,
            (err,data1)=>{
                if(err){
                    next(err);
                }
                // 更新评论，确定评论的path，以便构造树
                Comment.updateOne(
                    data1.insertId,  // 评论id
                    data.path + '/' +  data1.insertId,
                    (err,data)=>{
                        if(err) {
                            next(err); 
                        }
                        res.status(200);
                        res.json(data);
                    }
                )
            }
        )
    }
})

/**get请求**/

// 当调用api出现错误时，统一到这里处理;
router.use((err,req,res,next)=>{
    if(err) {
        console.log(err);
        res.status(500).json(err); 
    }
})
module.exports = router;