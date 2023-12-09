
// 打车时，你可以打快车和专车（都有车辆名称和车牌号）
// 快车每公里 1 元，专车每公里 2 元
// 打车时，你要启动行程并显示车辆信息
// 结束行程，显示价格（假定行驶了 5 公里）
class Car {
    constructor(name,num){
        this.name = name 
        this.num = num 
    }
}
class Kuaiche extends Car{
    price = 1 
    constructor(name,num){
        super(name,num)
    }
}

class Zhuanche extends Car{
    price = 2
    constructor(name,num){
        super(name,num)
    }
}

class Trip{
    constructor(car){
        this.car = car 
    }
    start(){
        console.log(this.car.name,this.car.num )
    }
    end(){
        console.log(this.car.price* 5)
    }
}
const car = new Kuaiche('宝马','渝A88888')
const trip = new Trip(car)
trip.start()
trip.end()


// 某停车场，分 3 层，每层 100 车位
// 每个车位可以监控车辆的进入和离开
// 车辆进入前，显示每层的空余车位数量
// 车辆进入时，摄像头可识别车牌号和时间
// 车辆出来时，出口显示器显示车牌号和停车时长

/**
 * 分析：
 * 单位 层  车位 
 * 显示器 摄像头
 * 车
 * 
 * 
 * 车位 ： 进入 离开 是否有车
 * 显示器： 显示空余车位，
 * 摄像头 ： 进入时 显示车牌  记录时间   出来时 显示车牌 停车时长
 * 
 */

class Park{
    constructor(){
        this.state = false 
    }
    in(){
        this.state = true ;
    }
    out(){
        this.state = false 
    }
    isEmpty(){
        return  !this.state  
    }
}
class Camera{
    constructor(){

    }
    
}

