var mongoose = require('../hp_MongoDbBase');

// 设计表结构
var Article = new mongoose.Schema({
    articleId: Number,
    articleName: String,
    articleContent: String
});

// 创建/指定表   第一个参数是表的名称(mongodb会将大写名称改成小写后加s) 第二个参数是表结构
var Article = mongoose.model('Article', Article);

let Handle = {
    /**
     * 添加一篇文章
     * @param {Number} articleId        文章ID
     * @param {String} articleName      文章标题
     * @param {String} articleContent   文章内容
     * @param {Function} callback       回调函数接收2个参数 
     */
    addOne(articleId, articleName, articleContent, callback) {
        let obj = {
            articleId,
            articleName,
            articleContent
        }
        let one = new Article(obj);
        one.save(function (err, msg) {
            callback(err, msg);
        });
    },
    /**
     * 根据文章ID删除一篇文章
     * @param {Number} articleId        文章ID
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
     * @param {Number} articleId        文章ID
     * @param {String} articleName      文章标题
     * @param {String} articleContent   文章内容
     * @param {Function} callback       回调函数接收2个参数 
     */
    updateOne(articleId, articleName, articleContent, callback) {
        let findObj = {
            articleId
        }
        let updateObj = {
            articleId,
            articleName,
            articleContent
        }
        let query = Article.where(findObj);
        query.findOneAndUpdate(updateObj, (err, data) => {
            callback(err, data);
        })
    },

    /**
     * 根据文章ID查找一篇文章
     * @param {Number} articleId        文章ID
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
    }
}

module.exports = Handle;
/*****************************test****************************************************** */
// Article.queryNameAndPassowrd('xhp1','10',(err,data)=>{
//     if (err) return console.error(err);
//     console.log(data)
// })
// var test = {
//     title: "生活区",
//     smallItems: [
//       "目录1",
//       "目录2",
//       [{ title: "教程", smallItems: ["1111", "22222"] }]
//     ]
//   }
// Article.addOne(test,(err,data)=>{
//     if(err) console.log('键值重复');
// })

// Article.deleteOne({ArticleName:'李丽莎'},(err,data)=>{
//     if (err) return console.error(err);
//     console.log(data)
// })
// Article.query(null,(err,data)=>{
//     if(err) console.log(err);
//     console.log(data);
// });
