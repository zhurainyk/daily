/**
 *  Stream 流
 * shell通过各个管道连接各个部分 ；输入和输出的规范文本流
 * Nodejs内置的Stream模块实现了类似的功能，各个模块之前通过pipe()连接 
 */

const Stream = require('stream')
const Readable = Stream.Readable
const Writeable = Stream.Writeable;
const Duplex = Stream.Duplex;
const Transform = Stream.Transform;

const fs = require('fs')

//读取当前文件 写入到cmd
fs.createReadStream('./ArrayBuffer.js').pipe(process.stdout)


//封装改写
class ToReadable extends Readable{
    constructor(iterator){
        super()
        this.iterator = iterator;
    }
    _read(){
        const res = this.iterator.next()
        if(res.done){
            return this.push(null)
        }
        setTimeout(()=>{
            this.push(res.val + '\n')
        },0)
    }
}

const iterator = function(limit){
    return {
        next:function(){
            if(limit--){
                return{
                    done:false,
                    value:limit+Math.random()
                }
            }
            return{
                done:true
            }
        }
    }
}(10000)

const readable = new ToReadable(iterator)
readable.on('data',data=>process.stdout.write(data))
readable.on('end',()=>process.stdout.write('~~~done'))