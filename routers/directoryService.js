const epxress = require('express');

//const Directory = require('../sql/MongoDb/views/directoryDao');

const Directory = require('../sql/MySql/views/directoryDao');

const router = epxress.Router();

router.get('/Directory/getAllDirectory',(req,res,next)=>{
    Directory.query((err,data)=>{
        if(err) {
            console.log(err)
            next(err); 
        }
        res.status(200);
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
            one = new Directory(iterator.name,iterator.id,iterator.path);
        }
        else {
            one = new Artilce(iterator.articleId,iterator.name,iterator.path);
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
    function Artilce(articleId,articleName,path){
        this.articleId = articleId;
        this.articleName = articleName;
        this.path = path;
    }
    function Directory(title,titleId,path){
        this.title = title;
        this.titleId = titleId;
        this.smallItems = [[]];
        this.path = path;
    }
    function digui(parentObj,sonObj,flag) {
        let parentPath = parentObj.path;                            
        let sonPath = sonObj.path.substring(0,sonObj.path.length-2);
        /**如果sonPath截取部分跟parentPath一样，说明sonObj要插入到这个目录中*/
        if(parentPath === sonPath) {
            if(flag === 0) {
                parentObj.smallItems[parentObj.smallItems.length - 1].push(sonObj);
            }
            else {
                parentObj.smallItems.unshift(sonObj);
            }
            return true;
        }
        else {
            for (const iterator of parentObj.smallItems[parentObj.smallItems.length - 1]) {
                return digui(iterator,sonObj,flag);
            }
        }
        return false;
    }
}

module.exports = router;