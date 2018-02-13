#!/usr/bin/env node

const child_process = require('child_process');
const inquirer = require('inquirer');
const fs = require('fs');

const CURR_DIR = process.cwd();
const CHOICES = fs.readdirSync(`${__dirname}/rawr-templates`);

const QUESTIONS = [
  {
    name: 'project-choice',
    type: 'list',
    message: 'What project template would you like to generate?',
    choices: CHOICES
  },
  {
    name: 'project-name',
    type: 'input',
    message: 'Project name:',
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'Project name may only include letters, numbers, underscores and hashes.';
    }
  }
];

inquirer.prompt(QUESTIONS)
  .then(answers => {
    const projectChoice = answers['project-choice'];
    const projectName = answers['project-name'];
    const templatePath = `${__dirname}/rawr-templates/${projectChoice}`;

    // fs.mkdirSync(`${CURR_DIR}/${projectName}`);

    // createDirectoryContents(templatePath, projectName)
    //   .then(installNodeModules(projectName));

    createProject(templatePath, projectName)
  });

function createProject (templatePath, projectName) {
  runCreateReactApp(projectName)
    .then(createDirectoryContents(templatePath, projectName))
    .then(installNodeModules(projectName))
}

function runCreateReactApp (projectName) {
  return new Promise(function (resolve, reject) {
    child_process.execSync(`create-react-app ${projectName}`, {stdio: [0,1,2]})
  })
}

function createDirectoryContents (templatePath, newProjectPath) {
  return new Promise(function(resolve, reject) {
    const filesToCreate = fs.readdirSync(templatePath);

    filesToCreate.forEach(file => {
      const origFilePath = `${templatePath}/${file}`;

      // get stats about the current file
      const stats = fs.statSync(origFilePath);

      if (stats.isFile()) {
        const contents = fs.readFileSync(origFilePath, 'utf8');

        const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
        fs.writeFileSync(writePath, contents, 'utf8');
      } else if (stats.isDirectory()) {
        fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

        // recursive call
        createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
      }
    });
  });

  if (filesToCreate) {
    console.log('hskdhfskdhfksjdfh')
    resolve(console.log('were good....'))
  } else {
    reject(console.log('An error occurred...'))
  }
}

function installNodeModules (projectPath) {
  child_process
    .execSync(`npm install --prefix ${projectPath}/`,{stdio: [0, 1, 2]});
}

// function installNodeModules (projectPath) {
//   child_process
//     .execSync(`cd ${projectPath} && npm install`,{stdio: [0, 1, 2]});
// }
