const epxress = require('express');

//const Directory = require('../sql/MongoDb/views/directoryDao');

const Directory = require('../sql/MySql/views/directoryDao');
const Article = require('../sql/MySql/views/articleDao');

const router = epxress.Router();

router.get('/Directory/getAllDirectory',(req,res,next)=>{
    Directory.query((err,data)=>{
        if(err) {
            console.log(err)
            next(err); 
        }
        res.status(200);
        //res.setHeader('Content-type','text/plain');
        //res.setHeader('Set-Cookie', ['name=xhp','Expires=Wed, 09 Jun 2021 10:18:14 GMT']);  
        let newData =  initDirectorData(data);
        res.json(newData);
    })
})

router.post('/Directory/updateDirectory',(req,res,next)=>{
    let array = req.body;
    Directory.updateOne(...array,(err,data)=>{
        if(err) {
            next(err); 
        }
        res.status(200);
        res.json(data);
    })
})

router.post('/Directory/createDirectory',(req,res,next)=>{
    let array = req.body;
    // 创建目录，顺便更新目录。
    Directory.addOne(...array,(err,data)=>{
        if(err) {
            next(err); 
        }
        array[0] = data.insertId;
        array[1] = array[1] + '/' + data.insertId;
        Directory.updateOne(...array,(err,data)=>{
            if(err) {
                next(err); 
            }
            res.status(200);
            console.log(data);
            res.json(data);
        })
    })

})

router.post('/Directory/deleteDirectory',(req,res,next)=>{
    let array = req.body;
    // 删除目录，顺便所有文章。
    Directory.deleteOne(...array,(err,data)=>{
        if(err) {
            next(err); 
        }
        Article.deleteOneByPid(array[0],(err,data)=>{
            res.status(200);
            res.json(data);
        })
    })

})
/**
 * 将数据库的目录数组封装成树图形
 * @param {*} data 
 */
function initDirectorData(data){
    
    let newData = data;
    let array = [];
    let hadInsert = false;          // 用来判断新的数据是插在目录里面了，还是插在array里
    for (const iterator of newData) {
        let one;
        hadInsert = false;
        if(iterator.articleId === 0) {
            one = new Directory(iterator.id,iterator.pid,iterator.path,iterator.name);
        }
        else {
            one = new Artilce(iterator.id,iterator.pid,iterator.path,iterator.name,iterator.articleId);
        }
        /**判断one能否插入目录中，不能则插入array */
        for (const obj of array) {
            if(digui(obj,one,iterator.articleId)) {
                hadInsert = true;
                break;
            }
        }
        if(hadInsert === false) {
            array.push(one);
        }
        
    }
    return array;
    function Artilce(id,pid,path,name,articleId){
        this.id = id;
        this.pid = pid;
        this.path = path;
        this.name = name;
        this.articleId = articleId;
    }
    function Directory(id,pid,path,name){
        this.id = id;
        this.pid = pid;
        this.name = name;
        this.path = path;
        this.childrens = [[]];
    }
    function digui(parentObj,sonObj,flag) {
        let parentPath = parentObj.path;                            
        let sonPath = sonObj.path.substring(0,sonObj.path.lastIndexOf('/'));
        /**如果sonPath截取部分跟parentPath一样，说明sonObj要插入到这个目录中*/
        if(parentPath === sonPath) {
            if(flag === 0) {
                parentObj.childrens[parentObj.childrens.length - 1].push(sonObj);
            }
            else {
                parentObj.childrens.unshift(sonObj);
            }
            return true;
        }
        else {
            for (const iterator of parentObj.childrens[parentObj.childrens.length - 1]) {
                return digui(iterator,sonObj,flag);
            }
        }
        return false;
    }
}

module.exports = router;