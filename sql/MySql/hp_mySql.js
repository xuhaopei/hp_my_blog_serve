var mysql = require('mysql');

// 配置信息
const options = {                   
    host            : 'localhost',
    user            : 'root',
    password        : '123456',
    database        : 'hp_my_blog',
    port            : '3306',
    connectTimeout  : 5000,         // 连接超时时间
    multipleStatements : false,     // 是否允许一个query语句里面包含多条sql语句
    connectionLimit : 100,          // 链接数限制
    queueLimit      : 0,            // 最大连接等待数（0为无限制） 
}
// 连接数据库
var pool  = mysql.createPool(options);
 
// 监听当数据库失去连接的时候重新连接
pool.on('error',err=>{
    console.log("数据库错误，重新连接中.....");
    err.code === 'PROTOCOL_CONNECTION_LOST' && setTimeout(reConnectPool);
});

// 重连数据库
function reConnectPool() {
    pool = mysql.createPool(options);
}

// 重构查询
pool.hp_query = function(sql,callBack){
    pool.getConnection((err,conn)=>{
        conn.query(sql,(err,data)=>{
            callBack(err,data);
        })
        conn.release();
    });
}


module.exports = pool;
