const epxress = require('express');
const pool = require('../sql/pool');
const router = epxress.Router();

router.get('/user',(res,req,next)=>{
    pool.hp_query("select * from user",(err,data)=>{
        if(err) next(err)
        req.json(data);
    })
})

// 当调用api出现错误时，统一到这里处理;
router.use((err,req,res,next)=>{
    if(err) {
        res.status(500).json(err); 
    }
})


module.exports = router;