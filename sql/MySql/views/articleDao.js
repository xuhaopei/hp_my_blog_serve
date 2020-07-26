const pool = require('../hp_mySql');

let format = require('date-format');
const tableName = 'hp_my_blog.article';


let Handle = {
    /**
     * 添加一篇文章
     * @param {Number} pid                  目录ID
     * @param {String} articleName          文章标题
     * @param {String} articleContent       文章内容
     * @param {String} articleAuthor        文章作者
     * @param {String} tags                 标签
     * @param {String} articleContentText   文章text内容
     * @param {Function} callback           回调函数接收2个参数 
     */
    addOne(pid, articleName, articleContent,author,tags,articleContentText,callback) {

        let sql = `INSERT INTO ${tableName} (pid,articleName,articleContent,author,tags,articleContentText) VALUES (?,?,?,?,?,?)`;
        pool.getConnection((err,conn)=>{
        
            conn.query(sql,[pid, articleName, articleContent,author,tags,articleContentText],(err,data)=>{
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

        let sql = `DELETE FROM ${tableName} WHERE id=?`;

        pool.getConnection((err,conn)=>{
            
            conn.query(sql,[id],(err,data)=>{
                callback(err,data);
            })
            conn.release();
        }); 
    },
    /**
     * 根据目录ID删除文章
     * @param {Number} pid            文章目录ID
     * @param {Function} callback    回调函数接收2个参数 
     */
    deleteOneByPid(pid, callback) {
        let sql = `DELETE FROM ${tableName} WHERE pid=?`;
        pool.getConnection((err,conn)=>{
            conn.query(sql,[pid],(err,data)=>{
                callback(err,data);
            })
            conn.release();
        }); 
    },
    /**
     * 根据文章ID更新一篇文章
     * @param {String} articleId            文章ID
     * @param {String} articleName          文章标题
     * @param {String} articleContent       文章HTML内容
     * @param {String} tags                 标签
     * @param {String} articleContentText   文章text内容
     * @param {Function} callback           回调函数接收2个参数 
     */
    updateOne(id, articleName, articleContent, tags, articleContentText,callback) {
        let alertDate = format.asString();
        let sql = `
        update
        hp_my_blog.directors, 
        hp_my_blog.article 
        set 
        hp_my_blog.directors.name = ?,
        hp_my_blog.article.articleName = ?,
        hp_my_blog.article.articleContent = ?,
        hp_my_blog.article.alertDate = ?,
        hp_my_blog.article.tags = ?,
        hp_my_blog.article.articleContentText = ?
        where 
        hp_my_blog.article.id = ?
        and
        hp_my_blog.article.id=hp_my_blog.directors.articleId;
        `;
        pool.getConnection((err,conn)=>{
            conn.query(sql,[articleName,articleName,articleContent,alertDate,tags,articleContentText,id],(err,data)=>{
                callback(err,data);
            })
            conn.release();
        });
    },
    /**
     * 根据文章ID更新文章阅读次数
     * @param {Number} articleId        文章ID
     * @param {Number} read             阅读次数
     */
    updateOneRead(id, read) {
        let sql = `UPDATE ${tableName} SET  read= ? WHERE id=?`;
        pool.getConnection((err,conn)=>{
            conn.query(sql,[read,id],(err,data)=>{
                callback(err,data);
            })
            conn.release();
        });
    },
    /**
     * 根据content模糊查询文章的标题，标签，文章内容。
     * @param {String} content             
     * @param {Function} callback       回调函数接收2个参数 
     */
    likeQuery(content, callback) {
        let sql = `
            SELECT * FROM hp_my_blog.article 
            WHERE CONCAT(IFNULL(articleName,''),IFNULL(articleContentText,''),IFNULL(author,''),IFNULL(tags,'')) 
            LIKE '%${content}%'`;
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
    },
    /**
     * 分页查询
     * @param {Number} id 
     * @param {Number} size 
     * @param {Function} callback 
     */
    querySome(id,size,callback){
        let start = (id-1) * size;
        let end = start + size;
        let sql = `SELECT * FROM  ${tableName}  limit ?,?`;
        pool.getConnection((err,conn)=>{
            conn.query(sql,[start,end],(err,data)=>{
                callback(err,data);
            })
            conn.release();
        });         
    },
    /**
     * 获取文章总数量
     */
    queryAllNumber(callback){
        let sql = `SELECT COUNT(*) FROM  ${tableName}`;
        pool.getConnection((err,conn)=>{
            conn.query(sql,(err,data)=>{
                callback(err,data);
            })
            conn.release();
        });         
    },    
}
module.exports = Handle;