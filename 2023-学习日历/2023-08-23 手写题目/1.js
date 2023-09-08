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