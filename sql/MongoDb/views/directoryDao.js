var mongoose = require('../hp_MongoDbBase');

// 设计表结构
var Directory = new mongoose.Schema({
    title: String,
    smallItems: Array
});

// 创建/指定表   第一个参数是表的名称(mongodb会将大写名称改成小写后加s) 第二个参数是表结构
var Directory = mongoose.model('Directory', Directory);


let Handle = {
    /**
     * 根据title来更新目录。
     * @param {String} title           文章ID
     * @param {Object} updateObj       需要更新的所有信息
     * @param {Function} callback      回调函数接收2个参数 
     */
    updateOne(title, updateObj, callback) {
        let findObj = {
            title
        }
        let query = Directory.where(findObj);
        query.findOneAndUpdate(updateObj, (err, data) => {
            callback(err, data);
        })
    },
    /**
     * 查询所有目录信息
     * @param {Function} callback      回调函数接收2个参数 
     */
    query(callback){
        Directory.find((err, data) => {
            callback(err, data);
        })
    }
};

module.exports = Handle;




