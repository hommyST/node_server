const fs = require('fs')
const path = require('path')

const getApi = require('./get_api')
const logData = require('./log_data')


function serverHandler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')

  logData(req)

  let body = [];
  req
    .on('data', (chunk) => {
      body.push(chunk);
    })
    .on('end', () => {
      body = Buffer.concat(body).toString();



      if (req.method === 'GET') {
        getStatic(req, res)
      }
    
      if (req.method === 'POST') {
        let reqType = req.headers['content-type']
        if (reqType.includes('application/json')) {
          body = JSON.parse(body)
        } else if (reqType.includes('application/x-www-form-urlencoded')) {
          body = body.split('&').reduce((res, item) => {
            let key = item.split('=')[0]
            let val = item.split('=')[1]
            res[key] = val
            return res
          }, {})
        } else if (reqType.includes('multipart/form-data')) {
          let boundaryIndex = reqType.indexOf('boundary=')
          if (boundaryIndex !== -1) {
            let boundary = reqType.slice(boundaryIndex + 9)
            let tres = body.split(boundary)
  
            tres = tres.filter(el => el.includes('name'))
  
            body = tres.reduce((res, item) => {
              let key = item.match(/name="(.+)"/)[1]
              let val = item.split('\r\n')[3]
              val = Number(val) || val
              if (val === 'true') val = true
              if (val === 'false') val = false
  
              res[key] = val
              return res
            }, {})
          }
        }

        getApi(req, res, body)
      }
    })
}

function getStatic(req, res) {
  res.setHeader('Content-Type', 'text/html;charset=utf-8')
  let filePath = path.join(__dirname, '../static/', req.url + '.html')
  let isFile = fs.existsSync(filePath)

  let readFileOpt = { encoding: 'utf8' }
  let body

  if (isFile) {
    res.writeHead(200)
    body = fs.readFileSync(filePath, readFileOpt)
  } else {
    res.writeHead(404)
    let notFound = path.join(__dirname, '../static/', 'notFound.html')
    body = fs.readFileSync(notFound, readFileOpt)
  }

  res.end(body)
}


module.exports = serverHandler