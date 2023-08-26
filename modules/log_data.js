const fs = require('fs')
const path = require('path')

function logData(req) {
  let res = ''

  let now = new Date
  res += now.toLocaleString()
  res += '\t'
  res += req.socket.remoteAddress
  res += '\t'
  res += req.method
  res += '\t'
  res += req.url
  res += '\n'

  let logPath = path.join(__dirname, '../log/')
  
  let allLog = fs.readdirSync(logPath)
  let lastFileName = allLog[allLog.length - 1]
  let lastFilePath = path.join(__dirname, '../log/', lastFileName)
  let stat = fs.statSync(lastFilePath)
  let logNum = parseInt(lastFileName)

  if (stat.size >= 1000) {
    logNum++
  }

  let filePath = path.join(__dirname, '../log/', logNum + '.log')

  fs.writeFileSync(filePath, res, {flag: 'a+'})
}

module.exports = logData