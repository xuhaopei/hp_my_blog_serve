let obj = {
    valueof(){
        console.log("valueof");
        return '是valueof'
    }
};

console.log(obj)

let array = Object.getOwnPropertyNames(obj);

for (const iterator of array) {
    console.log(iterator)
}