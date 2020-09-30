import * as fs from 'fs'

export const createFolder = (path: string): void => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true })
  }
}
