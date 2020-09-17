const fs = require('fs')

export const createFolder = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true }, (err) => {})
  }
}
