const fs = require('fs/promises')
const path = require('path')
const url = require('url')


start2()

async function start() {
  let dir = await fs.readdir('.')

  // let test = 
  dir.forEach(fileName => {
    let ext = path.extname(fileName)

    if (ext === '.html') {
      let name = path.parse(fileName).name
      fs.appendFile('dirs.txt', name + '\n')
    }

  })


  // console.log(test);
}

function start2() {
  let urlName = '/test'

  // let test = url.parse(urlName)
  
  console.log(test);
}