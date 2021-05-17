const epxress = require('express');
const hp_jwt  = require('../../validate/token.js');
const Calenderplan = require('../../sql/MySql/views/calenderplanDao');

const router = epxress.Router();

/******************************get请求***************************/
// 根据用户id和计划日期查询计划接口
router.get('/calenderplan/queryOne',(req,res,next)=>{
    let data = req.query;
    // 先检查用户权限
    let token = hp_jwt.validateToken(req.headers.token);
    console.log(token)
    // 判断是否登录
    if(token === null) {
        res.status(401).json('请您登录,/calenderplan/queryOne');
    } else {
        Calenderplan.queryOne(
            token.data.id, data.date,
            (err,data)=>{
                if(err) {
                    next(err); 
                } 
                else {
                    res.status(200);
                    res.json(data[0]);
                }
            }
        )
    }

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
