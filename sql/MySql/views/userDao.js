
const pool = require('../hp_mySql');

let User = {};

const tableName = 'hp_my_blog.user';

/**
 * 添加一个用户。
 * userName 用户名
 * email    用户邮箱
 * password 用户密码 
 * callback用来获取执行后的2个值
 */
User.addOne = function(userName,email,password,callback){
    let sql = `INSERT INTO hp_my_blog.user (userName,email,password) VALUES ('${userName}','${email}','${password}')`;
    pool.getConnection((err,conn)=>{
        conn.query(sql,(err,data)=>{
            callback(err,data);
        })
        conn.release();
    });
}
/**
 * 封装了删除一条实例的方法
 * obj要删除实例的数据的条件比如 userName:'xhp';，如果有多个符合实例，则删除第一个 
 * callback用来获取执行后的2个值
 */
User.deleteOne = function(obj,callback) {

}

/**
 * 封装了更新一条实例的方法
 * findObj要更新实例数据的条件比如 userName:'xhp';updateObj要更新的数据,可以是部分属性，比如{password:"100086"},如果有多个符合查询条件的实例，则更新第一个 
 * callback用来获取执行后的2个值
 */
User.updateOne = function(findObj,updateObj,callback) {

}

/**
 * 根据用户名和密码来查询
 * userName 用户名
 * password 用户密码
 * callback用来获取2个值
 */

User.query = function(userName,password,callback) {
    let sql = `SELECT * FROM  user WHERE binary userName = '${userName}' AND binary password = '${password}'`;
    pool.getConnection((err,conn)=>{
        conn.query(sql,(err,data)=>{
            callback(err,data);
        })
        conn.release();
    });
}
module.exports = User;
