const epxress = require('express');
const hp_jwt  = require('../../validate/token.js');
const Comment = require('../../sql/MySql/views/commentDao');

const router = epxress.Router();

/******************************get请求***************************/
// 根据文章id查询所有评论
router.get('/comment/queryAll',(req,res,next)=>{
    let query = req.query;

    Comment.queryByaId(query.uid,(err,data)=>{
        if(err) {
            next(err); 
        }
        else if(data.length === 0) {
            res.status(404);
            res.send('没评论,/comment/queryAll');
        }
        else {
            res.status(200);
            res.json(initCommentData(data));
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
module.exports = router;


/**
 * 将数据库的评论数组封装成树形图形，关键是根据父path与子目录path来确定插入关系的
 * @param {Array} data 
 */
 function initCommentData(data){
    let newData = data;
    let array = [];
    let hadInsert = false;          // 用来判断新的数据是插在目录里面了，还是插在array里
    for (const iterator of newData) {
        let one;
        hadInsert = false;
        one = new Comment(iterator.id, iterator.pId, iterator.path, iterator.content, iterator.date, iterator.uId);
        /**判断one能否插入目录中，不能则插入array */
        for (const parent of array) {
            if(digui(parent,one)) {
                hadInsert = true;
                break;
            }
        }
        
        if(hadInsert === false) {
            array.push(one);
        }
        
    }
    return array;

    function Comment(id,pId,path,content,date,uId){
        this.id = id;
        this.pId = pId;
        this.path = path;
        this.content = content;
        this.date = date;
        this.uId = uId;
        this.childrens = [];
    }
    function digui(parentObj,sonObj) {
        let parentPath = parentObj.path;                            
        let sonPath = sonObj.path.substring(0,sonObj.path.lastIndexOf('/'));
        let hadInsert = false;
        /**如果sonPath截取部分跟parentPath一样，说明sonObj要插入到这个评论的孩子中*/
        if(parentPath === sonPath) {

            parentObj.childrens.push(sonObj)
            hadInsert = true;

        }
        /**否则查看sonObj是否要插入到这个评论的孩子中的孩子中 */
        else {
            for (const iterator of parentObj.childrens) {
                hadInsert = digui(iterator,sonObj,flag);
                if(hadInsert)break;         // 防止已经插入到目录的元素重复插入         
            }
        }
        return hadInsert;
    }
}
