const fs = require('fs')
const path = require('path')

const getApi = require('./get_api')


function serverHandler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')

  let body = [];
  req
    .on('data', (chunk) => {
      body.push(chunk);
    })
    .on('end', () => {
      body = Buffer.concat(body).toString();

      try {
        body = JSON.parse(body)
      } catch (error) {
        if (body.includes('=')) {
          let bodyArr = body.split('&')
          body = bodyArr.reduce((res, item) => {
            let key = item.split('=')[0]
            let val = item.split('=')[1]
            res[key] = val
            return res
          }, {})
        }
      }

      if (req.method === 'GET') {
        getStatic(req, res)
      }
    
      if (req.method === 'POST') {
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