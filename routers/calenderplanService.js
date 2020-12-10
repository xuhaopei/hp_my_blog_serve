const epxress = require('express');


const calenderplan = require('../sql/MySql/views/calenderplanDao');
const apiRouter = require('./baseRouter');
const hp_jwt = require('../validate/token');

const routerPath = apiRouter.calenderService;
const router = epxress.Router();

router.post(routerPath.commit,(req,res,next)=>{
    let token = hp_jwt.validateToken(req.headers.token);
    if(token === null) {
        res.status(401);
        res.json('当前操作没有权限，请您登录~');
    } else {
        let body = req.body;
        let id = body.id;
        let allFinish = body.allFinish;
        calenderplan.editOne(id, JSON.stringify(body.gridData), allFinish, (err, data)=>{
            if(err) {
                next(err);
            }
            res.json('编辑成功!');
        })
      
    }  
})

router.get(routerPath.getCalender,(req,res,next)=>{

    let token = hp_jwt.validateToken(req.headers.token);
    if(token === null) {
        res.status(401);
        res.json('当前操作没有权限，请您登录~');
    } else {
        let query = req.query;
        let uid = token.data.userId;
        let date = query.date;
        calenderplan.queryOne(uid, date, (err, data)=>{
            if(data.length == 0) {
                let onePlan = [{
                    date:date,
                    gridData:[
                    ],
                    uid:uid,
                    id:0,
                    allFinish:0,
                }];
                calenderplan.addOne(uid, date, JSON.stringify(onePlan[0].gridData), (err,data)=>{
                    if(err) {
                        next(err);
                    } else {
                        onePlan[0].id = data.insertId;
                        onePlan[0].gridData = JSON.stringify(onePlan[0].gridData);
                        res.status(200);
                        res.json(onePlan[0]);
                    }
                })
            } else {
                res.status(200);
                res.json(data[0]);
            }
        })
      
    }
})
module.exports = router; 