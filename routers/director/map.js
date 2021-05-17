
const Directory = require('../../sql/MySql/views/directoryDao');


let Handle = {
    directory_id_uid :  new Map(),
    init(){
        Directory.query((err,data)=>{
            data.forEach(element => {
                this.directory_id_uid.set(element.id, element.uid);
            }); 
        })   
    }
}


module.exports = Handle;