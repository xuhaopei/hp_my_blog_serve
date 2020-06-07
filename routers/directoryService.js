const epxress = require('express');

const Directory = require('../sql/MongoDb/views/directoryDao');

const router = epxress.Router();

router.get('/Directory/getAllDirectory',(req,res,next)=>{
    Directory.query((err,data)=>{
        if(err) {
            next(err); 
        }
        res.status(200);
        res.json(data);
    })
})

router.post('/Directory/updateDirectory',(req,res,next)=>{
    let array = req.body;
    console.log(array)
    Directory.updateOne(...array,(err,data)=>{
        if(err) {
            next(err); 
        }
        res.status(200);
        res.json(data);
    })
})


module.exports = router;