Function.prototype.myBind =  function () {
  const _this = this;
  const args = Array.prototype.slice.call(arguments);
  const context = args.shift();
  return function () {
    _this.apply(context, args);
  };
}

const test = {
    txt:'title',
    fn:function(sss){
        console.log(this.txt,sss)
    }
}
window.txt ='ff'
function t(){
    
  return  test.fn.myBind(this,'hellow')

}


let s = t()
s()