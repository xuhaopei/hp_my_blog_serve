function canCross(array,token){
    let newArray = array.filter((ele)=>{
        if(ele.canCross === 1) return true;
        else if(token && token.data.id == ele.uId) return true;
        else return false;
    })
    return newArray;
}
module.exports = canCross;