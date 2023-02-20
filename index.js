const chalk = require("chalk");
const fs = require("fs-extra");
const { program } = require("commander");
const path = require('path');
const execSync = require('child_process').execSync;
const os = require('os');
const tmp = require('tmp');

let projectName;

program
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')} [options]`)
  .action(name => {
    projectName = name;
  });

program.parse();

const projectPath = path.resolve(projectName);

console.log(chalk.blue("Hello world"));
console.log(process.cwd());
console.log(projectName);
console.log(path.resolve(projectName));

fs.mkdir(projectPath);
fs.copy("./base", projectPath);

async function init() {
  const packageJson = await fs.readJSONSync("./test.json");

  packageJson.name = projectName;
  console.log(packageJson);
  fs.writeFileSync("./test.json", JSON.stringify(packageJson, null, 2) + os.EOL);
}

init();
