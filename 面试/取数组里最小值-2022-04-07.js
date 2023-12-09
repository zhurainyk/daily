// class Sort{
//     constructor(data,compare){
//         this.data = data.slice()
//         this.compare = compare || ((a,b)=>a-b)
//     }
//     take(){//取数组最小值
//         if(!this.data.length){
//             return 
//         }
//         let min = this.data[0]
//         let minIndex = 0;
//         for(let i=1;i<this.data.length;i++){
//             if(this.compare(this.data[i],min)<0){
//                 min = this.data[i]
//                 minIndex = i;
//             }
//         }
//         this.data[minIndex] = this.data[this.data.length-1]; //不用splice是因为o(n)的操作  我希望是一个o(1)的操作
//         this.data.pop()
//         return min 
//     }
// }

class Sort{
    constructor(data,compare){
        this.data= data;
        this.compare = compare ||((a,b)=>a-b)
    }
    take(){
        if(!this.data.length ){
            return 
        } 
        let min = this.data[0]
        let minIndex = 0;
        for(let i=0;i<this.data.length;i++){
            if(this.compare(this.data[i],min)<0){
                min = this.data[i]
                minIndex = i;
            }
        }
        this.data[minIndex] = this.data[this.data.length-1];
        this.data.pop() 
        return min 
    }
}

let s = new Sort([1,2,3,4,5,0,7,6])
// s.take()
console.log(s.take(),s.data )  //0 ,  [1,2,3,4,5,6,7]
