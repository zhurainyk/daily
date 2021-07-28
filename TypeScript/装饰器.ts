export function measure(target:any,name:any,descriptor){
    const oldValue = descriptor.value;
    descriptor.value = async function(){
        const start = Date.now()
        const res = await oldValue.apply(this,arguments);
        console.log(`${name} 执行耗时 ${Date.now() - start} 毫秒`)
        return res;
    }

    return descriptor
}