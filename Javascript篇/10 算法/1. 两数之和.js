/**
 * 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
 * 输入：nums = [2,7,11,15], target = 9
    输出：[0,1]
    解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

    输入：nums = [3,2,4], target = 6
    输出：[1,2]

    输入：nums = [3,3], target = 6
    输出：[0,1]
 */
    let time
    function twoSum (nums,target){
        //暴力破解
        time  = new Date()
        for(let i =0;i<nums.length;i++){
            for(let j=i+1;j<nums.length;j++){
                if(nums[i]+nums[j]===target){
                    
                    return [i , j]
             
                }
            }
        }
    }
    // console.log(twoSum([4,2,1,3,6,7],13))
    // console.log( new Date() - time)
    // 解题思路
    // 知识点：
    // map对象中存放的是{key,value}键值对
    // has(key)方法判断map中是否存在key，返回boolen值
    // get(key)方法返回map中的value值
    
    // 解题过程：
    // 1.用map来存放{数组元素值，坐标}这样的键值对
    // 2.运用逆向解法，即用target减去数组中的某个元素，然后来判断map中是否有相同的值，若有则存在满足条件的答案，返回两个坐标即可；若没有，则保存{数组中某个元素值，对应的坐标}到map对象中。依次遍历即可判断是否有满足条件的两个元素。
    
 

    function twoSum2(nums,target){
        time  = new Date()
        let m = {}
        for(let i=0;i<nums.length;i++){
            if((target - nums[i]) in m){
                return [i,m[target - nums[i]]]
            }else{
                m[nums[i]] = i ;
            }
        }
    }
    console.log(twoSum2([4,2,1,3,6,7],13))
    console.log( new Date() - time)
