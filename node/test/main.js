 const puppeteer = require('puppeteer')

 const url = 'https://huaban.com/explore/quanjingsheying'

 const sleep = (time) => new Promise(res => {
     setTimeout(() => {
         res(1)
     }, time)
 })

//  getIndex(url)
 async function getIndex(url) {
     const browser = await puppeteer.launch({
         headless: false //关闭无头浏览器
     })
     const page = await browser.newPage() //创建新页面
     await page.goto(url, {
         timeout: 0,
         waitUntil: 'networkidle0'
     }) //跳到页面 等待6s 
     await sleep(3000)
     console.log({
         page
     })
 }

 const ping = require('ping')
//  const pingIp = (ip) => new Promise((resolve, reject) => {
//      let time = new Date().getTime()
//      console.log({ip})
//      ping.sys.probe(ip, (isActive) => {
//          if (isActive) {
//              resolve({
//                  ip: ip,
//                  time: new Date().getTime() - time
//              })
//          } else {
//              reject({
//                  ip: ip,
//                  time: -1
//              })
//          }
//      })
//  })
//  pingIp('https://huaban.com').then(res=>{
//      console.log(res)
//  })
ping.sys.probe('https://huaban.com', (isActive) => {
    if (isActive) {
        console.log(true)
    } else {
        console.log(false)
    }
})