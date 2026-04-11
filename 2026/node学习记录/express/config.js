const port = 3000
const queryWay = 'json'

const queryWayMap = {
    'txt': './files/fileNumber/',
    'json': './files/fileNumber/file.json'
}

module.exports = {
    port,
    queryWay,
    queryWayMap
}
