// 将用户自己的文章或者审核通过的文章返回
function canCross(array,token){
    let newArray = array.filter((ele)=>{
        if(ele.canCross === 1) return true;
        else if(token && token.data.id == ele.uId) return true;
        else return false;
    })
    return newArray;
}
module.exports = canCross;