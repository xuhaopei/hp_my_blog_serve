const pool = require('../hp_mySql');


const tableName = 'hp_my_blog.article';


let Handle = {
    /**
     * 添加一篇文章
     * @param {String} articleId        文章ID
     * @param {String} articleName      文章标题
     * @param {String} articleContent   文章内容
     * @param {String} zone             文章所属区域
     * @param {String} articleAuthor    文章作者
     * @param {Function} callback       回调函数接收2个参数 
     */
    addOne(articleId, articleName, articleContent,zone,articleAuthor, callback) {
        let obj = {
            articleId,
            articleName,
            articleContent,
            zone,
            articleAuthor
        }
        let one = new Article(obj);
        one.save(function (err, msg) {
            callback(err, msg);
        });
    },
    /**
     * 根据文章ID删除一篇文章
     * @param {String} articleId        文章ID
     * @param {Function} callback       回调函数接收2个参数 
     */
    deleteOne(articleId, callback) {
        let obj = {
            articleId
        }
        let query = Article.where(obj);
        query.findOneAndDelete((err, data) => {
            callback(err, data);
        })
    },
    /**
     * 根据文章ID更新一篇文章
     * @param {String} articleId        文章ID
     * @param {String} articleName      文章标题
     * @param {String} articleContent   文章内容
     * @param {String} zone             文章所属区域
     * @param {String} articleAuthor    文章作者
     * @param {Function} callback       回调函数接收2个参数 
     */
    updateOne(articleId, articleName, articleContent, zone, articleAuthor, callback) {
        let findObj = {
            articleId
        }
        let updateObj = {
            articleId,
            articleName,
            articleContent,
            zone,
            articleAuthor
        }
        let query = Article.where(findObj);
        query.findOneAndUpdate(updateObj, (err, data) => {
            console.log(data)
            callback(err, data);
        })
    },

    /**
     * 根据文章ID查找一篇文章
     * @param {String} articleId        文章ID
     * @param {Function} callback       回调函数接收2个参数 
     */
    query(articleId, callback) {
        let obj = {
            articleId
        }
        let query = Article.where(obj);
        query.find((err, data) => {
            callback(err, data);
        })
    },
    /**
    * 查询所有文章
    * @param {String} articleId        文章ID
    * @param {Function} callback       回调函数接收2个参数 
    */
   queryAll(callback) {
       Article.find((err, data) => {
           callback(err, data);
       })
   }
}