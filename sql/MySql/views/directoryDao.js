
const pool = require('../hp_mySql');

const tableName = 'notes.directors';


let Handle = {
    /**
     * 插入一个目录或者文章
     * @param {Number} pid 
     * @param {String} path 
     * @param {String} name 
     * @param {Number} articleId 
     */
    addOne(pid,path,name,articleId,uid,callback) {
        let sql = `INSERT INTO ${tableName} (pid,path,name,articleId,uid) VALUES (?,?,?,?,?)`;
        pool.getConnection((err,conn)=>{
            conn.query(sql,[pid,path,name,articleId,uid],(err,data)=>{
                callback(err,data);
            })
            conn.release();
        });
    },
    /**
     * 根据id更新目录或者文章
     * @param {*} id 
     * @param {*} path 
     * @param {*} callback 
     */
    updateOne(id,path,callback) {
        let sql = `UPDATE ${tableName} SET  path=? WHERE id=?`;
        pool.getConnection((err,conn)=>{
            conn.query(sql,[path,id],(err,data)=>{
                callback(err,data);
            })
            conn.release();
        });
    },
    /**
     * 根据id删除目录或者文章
     * @param {*} id 
     */
    deleteOne(id,callback) {
        var id = '%'+ id + '%';

        pool.getConnection((err,conn)=>{
            
            let sql = `DELETE FROM ${tableName} WHERE path like ?`;

            conn.query(sql,[id],(err,data)=>{
                callback(err,data);
            })
            conn.release();
        });        
    },
    /**
     * 根据articleId删除目录里的文章
     * @param {*} articleId 
     */
    deleteOnByAriticleId(articleId,callback) {
        let sql = `DELETE FROM ${tableName} WHERE articleId=?`;
        pool.getConnection((err,conn)=>{
            conn.query(sql,[articleId],(err,data)=>{
                callback(err,data);
            })
            conn.release();
        });        
    },
    /**
     * 查询所有目录信息
     * @param {Function} callback      回调函数接收2个参数 
     */
    query(callback){
        let sql = `SELECT * FROM ${tableName}`;
        pool.getConnection((err,conn)=>{
            conn.query(sql,(err,data)=>{
                callback(err,data);
            })
            conn.release();
        });
    },
    /**
     * 查询用户id的所有目录信息
     * @param {Function} callback      回调函数接收2个参数 
     */
    queryByUid(uid,callback){
        let sql = `SELECT * FROM ${tableName} WHERE id=?`;
        pool.getConnection((err,conn)=>{
            conn.query(sql,[uid],(err,data)=>{
                callback(err,data);
            })
            conn.release();
        });
    },
};
//Handle.init();
module.exports = Handle;




