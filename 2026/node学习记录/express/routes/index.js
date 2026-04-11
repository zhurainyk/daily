const express = require('express')
const fs = require('fs')
const { calculateDivisors } = require('../utils/calculator')
const { readJsonFile, writeJsonFile, readTxtFile, writeTxtFile } = require('../services/fileService')
const { queryWay, queryWayMap } = require('../config')

const router = express.Router()

// 首页路由
router.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    fs.readFile('./files/demo.html', (err, data) => {
        if (err) {
            res.end('读取文件失败')
        } else {
            res.send(data)
        }
    })
})

// 图片路由
router.get('/files/img/:name', (req, res) => {
    const name = req.params.name
    fs.readFile(`./files/img/${name}`, (err, data) => {
        if (err) {
            res.end('读取文件失败')
        } else {
            res.send(data)
        }
    })
})

// 数字计算路由
router.get('/:num', async (req, res) => {
    const startTime = Date.now()
    const num = req.params.num
    
    if (num === 'favicon.ico') {
        return res.end()
    }

    console.log('----分隔符1-----', num)
    const filePath = queryWayMap[queryWay]

    try {
        if (queryWay === 'txt') {
            // TXT 模式
            const txtFilePath = `${filePath}${num}.txt`
            try {
                const data = await readTxtFile(txtFilePath)
                const arr = JSON.parse(data)
                const endTime = Date.now()
                const time = endTime - startTime
                console.log(`耗时${time}ms`)
                console.log('----分隔符3-----')
                res.render('zhuyu', { num, arr, time })
            } catch (err) {
                console.log('读取文件失败', queryWay)
                const arr = calculateDivisors(num)
                await writeTxtFile(txtFilePath, JSON.stringify(arr))
                const endTime = Date.now()
                const time = endTime - startTime
                console.log(`耗时${time}ms`)
                console.log('----分隔符2-----')
                res.render('zhuyu', { num, arr, time })
            }
        } else if (queryWay === 'json') {
            // JSON 模式
            try {
                const fileJson = await readJsonFile(filePath)
                if (!fileJson.hasOwnProperty(String(num))) {
                    const arr = calculateDivisors(num)
                    console.log('arr', arr)
                    fileJson[String(num)] = arr
                    console.log('写入json文件成功', fileJson[num])
                    await writeJsonFile(filePath, fileJson)
                }
                const arr = fileJson[num]
                const endTime = Date.now()
                const time = endTime - startTime
                console.log(`耗时${time}ms`)
                console.log('----分隔符4-----')
                res.render('zhuyu', { num, arr, time })
            } catch (err) {
                console.log('读取文件失败', queryWay)
                const arr = calculateDivisors(num)
                await writeJsonFile(filePath, arr)
                const endTime = Date.now()
                const time = endTime - startTime
                console.log(`耗时${time}ms`)
                console.log('----分隔符2-----')
                res.render('zhuyu', { num, arr, time })
            }
        }
    } catch (error) {
        console.error('处理请求时出错:', error)
        res.status(500).send('服务器错误')
    }
})

module.exports = router
