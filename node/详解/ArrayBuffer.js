//ArrayBuffer 
/**
 * 可以理解为一块内存 
 * 通用的 固定长度的原始二进制数据缓冲区
 * ArrayBuffer 不能直接操作 通过 类型数组对象来操作 TypedArray 
 * 
 * 位 bit   
 * 字节 byte
 *  1 byte = 8位bit 
 * js种Number类型 是64位   = 8 byte
 */
const buffer = new ArrayBuffer(8)
console.log({buffer}) //8个字节  <00 00 00 00 00 00 00 00>


const int16Buffer = new Int16Array(buffer)
console.log({int16Buffer}) //Int16Array [ 0, 0, 0, 0 ]

/**
 * Unit8Array
 * 表示一个8位的无符号整型数组
 * 创建的时候内容被初始化位0
 * 
 * 和普通数组的区别是 Unit8Array 具有内存属性
 * 
 */

const unit8 = new Uint8Array(2) //2位
console.log(unit8) //Uint8Array [ 0, 0 ]
console.log(unit8.BYTES_PER_ELEMENT) //特定强类型数组中每个元素所占用的字节数。


//ArrayBuffer 和 TypedArray的关系 
/**
 * TypedArray:Unit8Array, int32Array ,Int16Array
 * ArrayBuffer:本身是一个0 和 1  存放在一个集合
 */

const buffer1 = Buffer.alloc(10) //创建10个字节的内存
console.log(buffer1) //<Buffer 00 00 00 00 00 00 00 00 00 00> 10个字节


const buffer2 = Buffer.alloc(10,1) //第二个参数是填充buffer的数据 
console.log(buffer2) //<Buffer 01 01 01 01 01 01 01 01 01 01>

const buffer3 = Buffer.alloc(10,'ABC')
console.log(buffer3.toString()) // ABCABCABCA 只能存放10个字符  多余的会被截掉

const buffer4 = Buffer.allocUnsafe(10) //快速创建一个缓存区 不过缓冲区  有遗留数据
console.log(buffer4) //<Buffer cf 68 00 00 26 00 20 00 00 00>  很乱的数据

//总结 ArrayBuffer 扮演了一个原生内存的角色



//NodeJS Buffer 

/**
 * Buffer 实现了Unit8Array 的 API
 * Buffer 的实例  => 整形数组
 * Buffer的大小是固定的 在创建的时候就已经确定了 无法调整 
 * 
 */

const buffers = Buffer.from('hello world')
console.log(buffers) //<Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64> 11个字节
console.log(buffers.toString()) //hello world
console.log(buffers.toString('base64')) //aGVsbG8gd29ybGQ=
const base64 = buffers.toString('base64') //buffer 转为了base64 
console.log(base64)
console.log(Buffer.from(base64,'base64').toString()) // base64 转回了 string

function str2Base64(str){ //字符串转base64 
    return Buffer.from(str).toString('base64')
}

// console.log(toBase64('abcd_+'))
const Base64 = str2Base64('abcd_+')

function base64ToStr(base){
    return Buffer.from(base,'base64').toString()
}

console.log(base64ToStr(Base64))



