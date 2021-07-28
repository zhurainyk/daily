function name(s){

    this.s = s
}

name.calls = function(){
    console.log('calls')
}

name.prototype.send = function(){
    console.log("send")
}

let ss = new name('ss')
ss.calls()
ss.send()