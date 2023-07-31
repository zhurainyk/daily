/**
 * 1.在一个二维数组中，每一行都按照从左到右递增的顺序排序，
 * 每一列都按照从上到下递增的顺序排序。请完成一个函数，
 * 输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
 */



function find(target='',array){
    let rowCount = array.length-1;
    let i ;//外围数组的长度i
    let j;//里层数组的长度
    for(i = rowCount,j=0;i>=0 && j<array[i].length;){
        if(target === array[j][i] ){
            console.log(j,i)
            return true
        }else if(target<array[j][i]){
            i--
            continue
        }else if(target>array[j][i]) {
            j++
            continue
        }
    }
    return false
}

console.log(find(4,[[1,2,3],[4,5,6],[7,8,9]]))

//思路

/**
 * 找一个二位数组中的数是否存在
 * 首先定一个变量 i j i表示外围数组index  j表示里面数组的index ++
 */

