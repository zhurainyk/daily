/**
 * 计算一个数字的所有约数
 * @param {number} num - 输入的数字
 * @returns {number[]} 约数数组
 */
const calculateDivisors = (num) => {
    const arr = []
    for (let i = 1; i <= num; i++) {
        if (num % i === 0) {
            arr.push(i)
        }
    }
    return arr
}

module.exports = {
    calculateDivisors
}
