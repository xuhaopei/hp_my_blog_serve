const epxress = require('express');
const hp_jwt  = require('../../validate/token.js');
const Calenderplan = require('../../sql/MySql/views/calenderplanDao');

const router = epxress.Router();

/******************************get请求***************************/
/**
 * 删除文章
 */
router.get('/article/delete',(req,res,next)=>{

})

/************************服务器报错*************************************/
router.use((err,req,res,next)=>{
    if(err) {
        console.log(err);
        res.status(500).json(err); 
    }
})
module.exports = router;
