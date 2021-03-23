const pool = require('../hp_mySql');

const tableName = 'notes.calenderplan';


let Handle = {
    addOne(uid, date, gridData, callback){

        let sql = `INSERT INTO ${tableName} (uid,date,gridData) VALUES (?,?,?)`

        pool.getConnection((err,conn)=>{
            conn.query(sql,[uid,date,gridData],(err,data)=>{
                callback(err,data);
            })
            conn.release();
        });
    },

    editOne(id, gridData, allFinish, callback) {
        
        let sql = `
        update
        ${tableName} 
        set 
        ${tableName}.gridData = ?,
        ${tableName}.allFinish = ?
        where 
        ${tableName}.id = ?
        `;
        pool.getConnection((err,conn)=>{
            conn.query(sql,[gridData, allFinish, id],(err,data)=>{
                callback(err,data);
            })
            conn.release();
        });
        
    },

    queryOne(uid, date, callback) {
        let sql = `
                SELECT * FROM ${tableName} WHERE uid=? AND date=?
            `;
        pool.getConnection((err,conn)=>{

            conn.query(sql,[uid,date],(err,data)=>{
                callback(err,data);
            })
            conn.release();
        });
        
    },
}

module.exports = Handle;
