const pool = require('../hp_mySql');

let format = require('date-format');
const tableName = 'notes.article';
const tableName1 = 'notes.directors';


let Handle = {
    /**
     * 添加一篇文章
     */
    addOne(pid, articleName, articleContent,author,tags,uid,articleHtml,callback) {
        
        let sql = `INSERT INTO ${tableName} (pid,articleName,articleContent,author,tags,uId,articleHtml) VALUES (?,?,?,?,?,?,?)`;
        pool.getConnection((err,conn)=>{
        
            conn.query(sql,[pid, articleName, articleContent,author,tags,uid,articleHtml],(err,data)=>{
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
     * 根据数组ID批量删除数据
     * @param {*} array 
     */
    deleteMoreById(ids,callback) {
        let sql = `DELETE FROM ${tableName} WHERE id in (${ids})`;
        pool.getConnection((err,conn)=>{
            conn.query(sql,[],(err,data)=>{
                callback(err,data);
            })
            conn.release();
        }); 
    },
    /**
     * 根据文章ID更新一篇文章
     */
    updateOne(id, articleName, articleContent, tags,articleHtml,callback) {
        let alertDate = format.asString();
        let sql = `
        update
        ${tableName}, 
        ${tableName1}
        set 
        ${tableName1}.name = ?,
        ${tableName}.articleName = ?,
        ${tableName}.articleContent = ?,
        ${tableName}.alertDate = ?,
        ${tableName}.tags = ?,
        ${tableName}.articleHtml = ?
        where 
        ${tableName}.id = ?
        and
        ${tableName}.id = ${tableName1}.articleId;
        `;
        pool.getConnection((err,conn)=>{
            conn.query(sql,[articleName,articleName,articleContent,alertDate,tags,articleHtml,id],(err,data)=>{
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
     * 根据文章ID更新文章点赞
     * @param {Number} articleId        文章ID
     * @param {Number} good             阅读次数
     */
     updateOneGood(id,good ) {
        let sql = `UPDATE ${tableName} SET  good= ? WHERE id=?`;
        pool.getConnection((err,conn)=>{
            conn.query(sql,[good,id],(err,data)=>{
                callback(err,data);
            })
            conn.release();
        });
    },    
    /**
     * 根据content,分页模糊查询文章的标题或标签。
     */
     queryLike(content,start,end,callback) {
        let sql = `
            SELECT 
            id,pid,articleName,alertDate,tags,uId
            FROM ${tableName} 
            WHERE CONCAT(IFNULL(articleName,''),IFNULL(tags,'')) 
            LIKE  ?
            Order By alertDate Desc
            limit ?,?
            `;
        pool.getConnection((err,conn)=>{
            conn.query(sql,[`%${content}%`,Number(start),Number(end)],(err,data)=>{
                callback(err,data);
            })
            conn.release();
        });        
    },
    /**
     * 根据用户id和Content,分页模糊查询文章的标题或标签。
     */
      queryLikeByUId(uId,content,start,end,callback) {
        let sql = `
            SELECT 
            id,pid,articleName,alertDate,tags,uId
            FROM ${tableName} 
            WHERE 
            ${tableName}.uId = ?
            AND
            CONCAT(IFNULL(articleName,''),IFNULL(tags,''))  LIKE  ?
            Order By alertDate Desc
            limit ?,?
            `;
        pool.getConnection((err,conn)=>{
            conn.query(sql,[Number(uId),`%${content}%`,Number(start),Number(end)],(err,data)=>{
                callback(err,data);
            })
            conn.release();
        });        
    },
    /**
     * 获取文章总数量
     */
    likeQueryAllNumber(content,callback){
        let sql = `
        SELECT COUNT(*) FROM  ${tableName}
        WHERE CONCAT(IFNULL(articleName,''),IFNULL(tags,'')) 
        LIKE  ?
        `;
        pool.getConnection((err,conn)=>{
            conn.query(sql,[`%${content}%`],(err,data)=>{
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
     queryById(id, callback) {
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
        let sql = `SELECT * FROM  ${tableName}   Order By id Desc`;
        console.log(sql)
        pool.getConnection((err,conn)=>{
            conn.query(sql,(err,data)=>{
                callback(err,data);
            })
            conn.release();
        }); 
    },
    /**
     * 分页查询
     * @param {Number} pageId 
     * @param {Number} pageSize 
     * @param {Function} callback 
     */
    querySome(pageId,pageSize,callback){
        let start = (pageId-1) * pageSize;
        let sql = `SELECT 
        id,pid,articleName,alertDate,tags 
        FROM  ${tableName} Order By alertDate Desc limit ?,? `;
        pool.getConnection((err,conn)=>{
            conn.query(sql,[start,pageSize],(err,data)=>{
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
    /**
     * 查询最近创建文章的数量
     * @param {Number} size 查询最近的数量 
     */
    queryNear(size,callback) {
        size = size-'';
        let sql = `SELECT id,pid,articleName,alertDate,tags FROM  ${tableName} Order By id Desc limit 0,?`;
        pool.getConnection((err,conn)=>{
            conn.query(sql,[size],(err,data)=>{
                callback(err,data);
            })
            conn.release();
        });  
    }
    
}
module.exports = Handle;