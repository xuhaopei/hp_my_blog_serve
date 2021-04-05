const epxress = require('express');
const hp_jwt = require('../../validate/token.js');
const Article = require('../../sql/MySql/views/articleDao');
const Directory = require('../../sql/MySql/views/directoryDao');

const router = epxress.Router();

/******************************get请求***************************/
/**
 * 删除文章
 */
router.get('/article/delete', (req, res, next) => {
    let data = req.query;
    // 先检查用户权限
    let token = hp_jwt.validateToken(req.headers.token);
    // 判断是否登录
    if (token === null) {
        res.status(401).send('请您登录');
    }
    // 根据token里面的id检查用户的文章，再判断删除的文章里面是否都属于用户的文章
    let articleIds = new Set();
    let deleteId = Number(data.id);           
    Article.queryLikeByUId(token.data.id, '', 0, 999, (err, data) => {
        data.forEach((ele)=>{
            articleIds.add(ele.id)
        })
        if(articleIds.has(deleteId) === false) {
            res.status(403).send(`无权限删除id为${ele}的文章`);
            return;
        }
        Article.deleteOne(
            deleteId,
            (err, data) => {
                if (err) {
                    next(err);
                }
                res.status(200).json(data);
            }
        )

    })
})

/**
 * 根据数组ID批量删除数据
 */
router.get('/article/deleteMore', (req, res, next) => {
    let data = req.query;
    // 先检查用户权限
    let token = hp_jwt.validateToken(req.headers.token);
    // 判断是否登录
    if (token === null) {
        res.status(401).send('请您登录');
    }
    // 根据token里面的id检查用户的文章，再判断删除的文章里面是否都属于用户的文章
    let articleIds = new Set();
    let deleteIds = data.ids;           
    deleteIds = deleteIds.map((ele)=>Number(ele));
    Article.queryLikeByUId(token.data.id, '', 0, 999, (err, data) => {
        data.forEach((ele)=>{
            articleIds.add(ele.id)
        })
        
        for (const ele of deleteIds) {
            if(articleIds.has(ele) === false) {
                res.status(403).send(`无权限删除id为${ele}的文章`);
                return;
            }
        }
        Article.deleteMoreById(
            deleteIds.join(','),
            (err, data) => {
                if (err) {
                    next(err);
                }
                Directory.deleteMoreByAriticleIds(deleteIds.join(','),(err, data)=>{
                    if (err) {
                        next(err);
                    }
                    res.status(200).json(data);
                })
               
            }
        )

    })
})
/************************服务器报错*************************************/
router.use((err, req, res, next) => {
    if (err) {
        console.log(err);
        res.status(500).json(err);
    }
})
module.exports = router;