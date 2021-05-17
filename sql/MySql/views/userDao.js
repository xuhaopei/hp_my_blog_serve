
const pool = require('../hp_mySql');

let User = {};

const tableName = 'notes.user';

/**
 * 添加一个用户。
 * callback用来获取执行后的2个值
 */
User.addOne = function(userName,email,password,sex,school,major,classes,callback){
    let sql = `INSERT INTO ${tableName} (userName,email,password,sex,school,major,class) VALUES (?,?,?,?,?,?,?)`;
    pool.getConnection((err,conn)=>{
        conn.query(sql,[userName,email,password,sex,school,major,classes],(err,data)=>{
            callback(err,data);
        })
        conn.release();
    });
}
/**
 * 根据id删除用户
 */
User.deleteOne = function(ids,callback) {
    let sql = `DELETE FROM ${tableName} WHERE id in (${ids})`;
    pool.getConnection((err,conn)=>{
        conn.query(sql,[],(err,data)=>{
            callback(err,data);
        })
        conn.release();
    }); 
}

/**
 * 修改用户信息
 * 
 */
User.alertOne = function(id,userName,password,sex,school,major,callback) {
    let sql = `
    update
    ${tableName}
    set 
    ${tableName}.userName = ?,
    ${tableName}.password = ?,
    ${tableName}.sex = ?,
    ${tableName}.school = ?,
    ${tableName}.major = ?
    where 
    ${tableName}.id = ?
    `;
    pool.getConnection((err,conn)=>{
        conn.query(sql,[userName,password,sex,school,major,id],(err,data)=>{
            callback(err,data);
        })
        conn.release();
    });
}
/**
 * 修改用户全部信息
 * 
 */
 User.alertOneAll = function(id, authority, _class, email, major, password,school,sex,userName,callback) {
    let sql = `
    update
    ${tableName}
    set 
    ${tableName}.authority = ?,
    ${tableName}.class = ?,
    ${tableName}.email = ?,
    ${tableName}.major = ?,
    ${tableName}.password = ?,
    ${tableName}.school = ?,
    ${tableName}.sex = ?,
    ${tableName}.userName = ?
    where 
    ${tableName}.id = ?
    `;
    pool.getConnection((err,conn)=>{
        conn.query(sql,[authority, _class, email, major, password,school,sex,userName,id],(err,data)=>{
            callback(err,data);
        })
        conn.release();
    });
}
/**
 * 根据用户名和密码来查询
 * userName 用户名
 * password 用户密码
 * callback用来获取2个值
 */
User.queryByUserNameAndPassword = function(email,password,callback) {
    let sql = `SELECT * FROM  ${tableName} WHERE  ${tableName}.email = ? AND ${tableName}.password = ?`;
    pool.getConnection((err,conn)=>{
        conn.query(sql,[email,password],(err,data)=>{
            callback(err,data);
        })
        conn.release();
    });
}

/**
 * 根据邮箱查询用户信息
 * @param {*} email 
 * @param {*} callback 
 */
User.queryByEmail = function(email,callback) {
    let sql = `SELECT * FROM  user WHERE binary email = ? `;
    pool.getConnection((err,conn)=>{
        conn.query(sql,[email],(err,data)=>{
            callback(err,data);
        })
        conn.release();
    });
}

/**
 * 根据id查询用户信息
 * @param {*} id 
 * @param {*} callback 
 */
 User.queryById = function(id,callback) {
    let sql = `SELECT * FROM  ${tableName} WHERE ${tableName}.id = ? `;
    pool.getConnection((err,conn)=>{
        conn.query(sql,[id],(err,data)=>{
            callback(err,data);
        })
        conn.release();
    });
}

/**
 * 分页查询用户
 */
User.queryMore = function(start,end,callback) {
    let sql = `
    SELECT 
    *
    FROM ${tableName} 
    limit ?,?
    `;
    pool.getConnection((err, conn) => {
        conn.query(sql, [Number(start), Number(end)], (err, data) => {
            callback(err, data);
        })
        conn.release();
    });
}
module.exports = User;
