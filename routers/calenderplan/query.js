const epxress = require('express');
const hp_jwt  = require('../../validate/token.js');
const Calenderplan = require('../../sql/MySql/views/calenderplanDao');

const router = epxress.Router();

/******************************get请求***************************/
// 根据计划日期和计划uid，查询文章信息
router.get('/calenderplan/queryOne',(req,res,next)=>{
    let data = req.query;
    // 先检查用户权限
    let token = hp_jwt.validateToken(req.headers.token);
    // 判断是否登录
    if(token === null) {
        res.status(401).json('请您登录,/calenderplan/queryOne');
    }
    Calenderplan.queryOne(
        token.id, data.date,
        (err,data)=>{
            if(err) {
                next(err); 
            }
            else if(data.length === 0) {
                res.status(404);
                res.send('不存在,/article/queryOne');
            }
            else {
                res.status(200);
                res.json(data[0]);
            }
        }
    )

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
