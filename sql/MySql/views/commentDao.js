
const pool = require('../hp_mySql');

const tableName = 'notes.Comment';


let Handle = {
    /**
     * 添加一条评论
     * @param {Number} pid 
     * @param {String} path 
     * @param {String} content 
     * @param {Number} articleId 
     */
    addOne(content, aId, uId, userName, path, pId,callback) {
        let sql = `INSERT INTO ${tableName} (aId,uId,userName,content,path,pId) VALUES (?,?,?,?,?,?)`;
        pool.getConnection((err,conn)=>{
            conn.query(sql,[ aId, uId, userName, content, path, pId],(err,data)=>{
                callback(err,data);
            })
            conn.release();
        });
    },
    /**
     * 根据id更新评论路径
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
     * 根据id更新点赞次数
     * @param {*} id 
     * @param {*} good 
     * @param {*} callback 
     */
    updateOneGood(id,good,callback){
        let sql = `UPDATE ${tableName} SET  good=? WHERE id=?`;
        pool.getConnection((err,conn)=>{
            conn.query(sql,[good,id],(err,data)=>{
                callback(err,data);
            })
            conn.release();
        });        
    },
    /**
     * 根据id删除评论
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
     * 查询用户id的所有目录信息
     * @param {Function} callback      回调函数接收2个参数 
     */
     queryByaId(aId,callback){
        let sql = `SELECT * FROM ${tableName} WHERE aId=?`;
        pool.getConnection((err,conn)=>{
            conn.query(sql,[aId],(err,data)=>{
                callback(err,data);
            })
            conn.release();
        });
    },
};
//Handle.init();
module.exports = Handle;




