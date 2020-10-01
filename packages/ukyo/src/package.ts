import * as fs from "fs";
import * as path from "path";
import { set } from "lodash";

function editPackage() {
  const appDirectory = fs.realpathSync(process.cwd());
  const packageJson = require(path.join(appDirectory, "./package.json"));

  if (packageJson) {
    set(packageJson, "main", "./src/js/app.js");
    set(packageJson, "scripts.build", "npm clean && ukyo-core build");
    set(packageJson, "scripts.clean", "rimraf dist");
    set(packageJson, "scripts.start", "ukyo-core start");
    set(packageJson, "browserslist", "last 2 versions");
  }

  fs.writeFile("package.json", JSON.stringify(packageJson, null, 2), (err) => {
    if (err) {
      throw err;
    }
  });
}

export default editPackage;
