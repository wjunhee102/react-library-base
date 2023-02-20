const chalk = require("chalk");
const fs = require("fs-extra");
const { program } = require("commander");
const path = require('path');
const os = require('os');
const tmp = require('tmp');

function createTemplate(projectName) {
  return new Promise((resolve, reject) => {

    const projectPath = path.resolve(projectName);
    let dirPath;

    if(
      process
      && Array.isArray(process.argv)
      && process.argv[1]
    ) {
    
      let rootPath = process.argv[0];
      
      if(rootPath.includes("bin/node")) {
    
        dirPath = rootPath.replace("bin/node", "lib/node_modules/@wjunhee102/react-library-base/base");

      } 
    } else {

      reject("Template does not exist.")

      return;
    }

    try {
      fs.mkdir(projectPath);
      fs.copy(dirPath, projectPath);

      resolve("create template!");
    } catch(e) {
      reject("Template creation failed.");
    }
  });
}

function setPackageJson(projectPath, projectName) {
  return new Promise((resolve, reject) => {

    const packageJsonPath = path.resolve(projectPath, "./package.json");
    const packageJson = fs.readJSONSync(packageJsonPath);

    if(packageJson) {
      resolve(packageJson);
    } else {
      reject("Not get packageJson.");
    }
  })
  .then((packageJson) => {
    return new Promise((resolve, reject) => {
      if(!packageJson) {

        reject(errorMessage);
  
        return;
      }
  
      packageJson.name = projectName;
      
      try {
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + os.EOL);
        resolve("Set package.json.");
      } catch (e) {
        reject("Failed to configure package.json.");
      }

      return;
    }) 
    
  }).catch((errorMessage) => {
    return Promise.error(errorMessage);
  })
}

function createPakage() {
  return new Promise((resolve, reject) => {
    let projectName;

    program
    .arguments('<project-directory>')
    .usage(`${chalk.green('<project-directory>')} [options]`)
    .action(name => {
      projectName = name;
    });

    program.parse();

    if(!projectName) {

      reject("Please enter the project name.");

      return;
    }

    const projectPath = path.resolve(projectName);

    createTemplate(projectPath)
    .then((successMessage) => {
      
      setPackageJson(projectPath, projectName)
      .then(resolve)
      .catch(reject);

    })
    .catch(reject);

  });

}

function init() {

  createPakage()
  .then((successMessage) => {
    console.log(chalk.green(successMessage));
  })
  .catch((errorMessage) => {
    console.log(chalk.red(errorMessage));
  });

}

init();
