const epxress = require('express');
const pool = require('../sql/pool');
const router = epxress.Router();

router.get('/user/query',(res,req,next)=>{
    pool.hp_query('select * from user',(err,data)=>{
        if(err) next(err)
        req.json(data);
    })
})

router.post('/user/add',(req,res,next)=>{
    pool.hp_query(`INSERT INTO user (userName,email,password) VALUES ('${req.body.username}','${req.body.email}','${req.body.password}')`,(err,data)=>{
        if(err) next(err)
        res.json(data);
    })
})
// 当调用api出现错误时，统一到这里处理;
router.use((err,req,res,next)=>{
    if(err) {
        console.log(err);
        res.status(500).json(err); 
    }
})


module.exports = router;