const fs = require('fs')

/**
 * 读取 JSON 文件
 * @param {string} filePath - 文件路径
 * @returns {Promise<Object>} JSON 对象
 */
const readJsonFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                reject(err)
            } else {
                try {
                    const jsonData = JSON.parse(data)
                    resolve(jsonData)
                } catch (parseError) {
                    reject(parseError)
                }
            }
        })
    })
}

/**
 * 写入 JSON 文件
 * @param {string} filePath - 文件路径
 * @param {Object} data - 要写入的数据
 * @returns {Promise<void>}
 */
const writeJsonFile = (filePath, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data), (err) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

/**
 * 读取 TXT 文件
 * @param {string} filePath - 文件路径
 * @returns {Promise<string>} 文件内容
 */
const readTxtFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

/**
 * 写入 TXT 文件
 * @param {string} filePath - 文件路径
 * @param {string} data - 要写入的数据
 * @returns {Promise<void>}
 */
const writeTxtFile = (filePath, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

module.exports = {
    readJsonFile,
    writeJsonFile,
    readTxtFile,
    writeTxtFile
}
