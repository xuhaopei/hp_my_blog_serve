const pool = require('../hp_mySql');
const { model } = require('mongoose');


const tableName = 'hp_my_blog.article';


let Handle = {
    /**
     * 添加一篇文章
     * @param {Number} pid              目录ID
     * @param {String} articleName      文章标题
     * @param {String} articleContent   文章内容
     * @param {String} articleAuthor    文章作者
     * @param {Function} callback       回调函数接收2个参数 
     */
    addOne(pid, articleName, articleContent,author,tags,callback) {
        let sql = `INSERT INTO ${tableName} (pid,articleName,articleContent,author,tags) VALUES ('${pid}','${articleName}','${articleContent}','${author}','${tags}')`;
        
        pool.getConnection((err,conn)=>{
            conn.query(sql,(err,data)=>{
                callback(err,data);
            })
            conn.release();
        });
    },
    /**
     * 根据文章ID删除一篇文章
     * @param {Number} id            文章ID
     * @param {Function} callback    回调函数接收2个参数 
     */
    deleteOne(id, callback) {
        let sql = `DELETE FROM ${tableName} WHERE id='%${id}%'`;
        pool.getConnection((err,conn)=>{
            conn.query(sql,(err,data)=>{
                callback(err,data);
            })
            conn.release();
        }); 
    },
    /**
     * 根据文章ID更新一篇文章
     * @param {String} articleId        文章ID
     * @param {String} articleName      文章标题
     * @param {String} articleContent   文章内容
     * @param {String} author           文章作者
     * @param {String} tags             标签
     * @param {Function} callback       回调函数接收2个参数 
     */
    updateOne(id, articleName, articleContent, author, tags, callback) {
        let sql = `UPDATE ${tableName} SET  articleName='${articleName}', articleContent='${articleContent}', author='${author}', tags='${tags}' WHERE id='${id}'`;
        pool.getConnection((err,conn)=>{
            conn.query(sql,(err,data)=>{
                callback(err,data);
            })
            conn.release();
        });
    },
    /**
     * 根据文章ID更新一篇文章
     * @param {Number} articleId        文章ID
     * @param {Number} articleName      文章标题
     */
    updateOneRead(id, read) {
        let sql = `UPDATE ${tableName} SET  read='${read}' WHERE id='${id}'`;
        pool.getConnection((err,conn)=>{
            conn.query(sql,(err,data)=>{
                callback(err,data);
            })
            conn.release();
        });
    },
    /**
     * 根据文章ID查找一篇文章
     * @param {Number} id        文章ID
     * @param {Function} callback       回调函数接收2个参数 
     */
    query(id, callback) {
        let sql = `SELECT * FROM  ${tableName} WHERE id='${id}'`;
        pool.getConnection((err,conn)=>{
            conn.query(sql,(err,data)=>{
                callback(err,data);
            })
            conn.release();
        });        
    },
    /**
    * 查询所有文章
    * @param {String} articleId        文章ID
    * @param {Function} callback       回调函数接收2个参数 
    */
   queryAll(callback) {
        let sql = `SELECT * FROM  ${tableName} `;
        pool.getConnection((err,conn)=>{
            conn.query(sql,(err,data)=>{
                callback(err,data);
            })
            conn.release();
        });
        
   }
}
module.exports = Handle;