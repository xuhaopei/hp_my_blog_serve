const epxress = require('express');
const hp_jwt  = require('../../validate/token.js');
const Directory = require('../../sql/MySql/views/directoryDao');

const router = epxress.Router();

/******************************get请求***************************/
// 根据用户id查询所有目录信息
router.get('/directory/queryAll',(req,res,next)=>{
    let query = req.query;
    // 先检查用户权限
    let token = hp_jwt.validateToken(req.headers.token).data;
    // 判断是否登录
    if(token === null) {
        res.status(401).json('请您登录,/directory/queryAll');
    } 
    else if(token.id === Number(query.uid)) {
        Directory.queryByUid(query.uid,(err,data)=>{
            if(err) {
                next(err); 
            }
            else if(data.length === 0) {
                res.status(200);
                res.send({});
            }
            else {
                res.status(200);
                let initData = initDirectorData(data);
                res.json(initData);
            }
        })
    }
    else {
        res.status(403);
        res.send('您无此权限操作,/directory/queryAll');
    }


})

// 根据分页数量，文章标签、标题模糊查询文章
router.get('/article/queryLike',(req,res,next)=>{
    let query = req.query;
    let content = query.content;
    let pageNum = query.pageNum;
    Article.queryLike(content,pageNum,(err,data)=>{
        if(err) {
            next(err); 
        }
        else if(data.length === 0) {
            res.status(404);
            res.send('文章不存在,/article/queryLike');
        }
        else {
            res.status(200);
            res.json(data);
        }
    })
})
/**************************post请求******************************/

/************************服务器报错*************************************/
router.use((err,req,res,next)=>{
    if(err) {
        console.log(err);
        res.status(500).json(err); 
    }
})

/**
 * 将数据库的目录数组封装成树形图形，关键是根据父目录path与子目录（子文件）path来确定插入关系的
 * @param {Array} data 
 */
 function initDirectorData(data){
    let newData = data;
    let array = [];
    let hadInsert = false;          // 用来判断新的数据是插在目录里面了，还是插在array里
    for (const iterator of newData) {
        let one;
        hadInsert = false;
        if(iterator.articleId === 0) {
            one = new Directory(iterator.id,iterator.pid,iterator.path,iterator.name,iterator.articleId,iterator.uid);
        }
        else {
            one =  iterator;
        }
        /**判断one能否插入目录中，不能则插入array */
        for (const obj of array) {
            if(obj.childrens && digui(obj,one,iterator.articleId)) {
                hadInsert = true;
                break;
            }
        }
        
        if(hadInsert === false) {
            array.push(one);
        }
        
    }
    return array;
    function Directory(id,pid,path,name,articleId,uid){
        this.id = id;
        this.pid = pid;
        this.name = name;
        this.path = path;
        this.articleId = articleId;
        this.uid = uid;
        this.childrens = [[]];
    }
    function digui(parentObj,sonObj,flag) {
        let parentPath = parentObj.path;                            
        let sonPath = sonObj.path.substring(0,sonObj.path.lastIndexOf('/'));
        let hadInsert = false;
        /**如果sonPath截取部分跟parentPath一样，说明sonObj要插入到这个目录中*/
        if(parentPath === sonPath) {
            if(flag === 0) {
                parentObj.childrens[parentObj.childrens.length - 1].push(sonObj);
            }
            else {
                parentObj.childrens.unshift(sonObj);
            }
            hadInsert = true;
        }
        /**否则查看sonObj是否要插入到这个目录的子目录中 */
        else {
            for (const iterator of parentObj.childrens[parentObj.childrens.length - 1]) {
                hadInsert = digui(iterator,sonObj,flag);
                if(hadInsert)break;         // 防止已经插入到目录的元素重复插入         
            }
        }
        return hadInsert;
    }
}
module.exports = router;
