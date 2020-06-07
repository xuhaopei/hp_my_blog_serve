var mongoose = require('../hp_MongoDbBase');

// 设计表结构
var User = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    authority: {
        type: Number,
        required: true,
        default: 0
    },
    creatDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

// 创建/指定表   第一个参数是表的名称(mongodb会将大写名称改成小写后加s) 第二个参数是表结构
var User = mongoose.model('User', User);

let Handle = {
    /**
 * 添加一个用户。
 * userName 用户名
 * email    用户邮箱
 * password 用户密码 
 * callback用来获取执行后的2个值
 */
    addOne(userName, email, password, callback) {
        const obj = {
            userName,
            email,
            password,
        }
        const one = new User(obj);
        one.save(function (err, msg) {
            callback(err, msg);
        });
    },
    /**
     * 封装了删除一条实例的方法
     * obj要删除实例的数据的条件比如 userName:'xhp';，如果有多个符合实例，则删除第一个 
     * callback用来获取执行后的2个值
     */
    deleteOne(obj, callback) {
        var query = User.where(obj);
        query.findOneAndDelete((err, data) => {
            callback(err, data);
        })
    },
    /**
     * 封装了更新一条实例的方法
     * findObj要更新实例数据的条件比如 userName:'xhp';updateObj要更新的数据,可以是部分属性，比如{password:"100086"},如果有多个符合查询条件的实例，则更新第一个 
     * callback用来获取执行后的2个值
     */
    updateOne(findObj, updateObj, callback) {
        var query = User.where(findObj);
        query.findOneAndUpdate(updateObj, (err, data) => {
            callback(err, data);
        })
    },

    /**
     * 根据用户名和密码来查询
     * userName 用户名
     * password 用户密码
     * callback用来获取2个值
     */

    query(userName, password, callback) {
        let obj = {
            userName,
            password
        }
        var query = User.where(obj);
        query.find((err, data) => {
            callback(err, data);
        })
    }
}

module.exports = Handle;

