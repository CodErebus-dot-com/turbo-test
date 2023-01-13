// #!/usr/bin/env node
import { cc, Generator, Options } from '@code-shaper/shaper-utils';
import * as inquirer from 'inquirer';
import inquirerDirectory from 'inquirer-directory';
import * as path from 'path';
import * as fs from 'fs-extra';
import { commonQuestionsProjectSetup } from './utils/questions';
import { reactAppTypeMap, nextAppTypeMap } from './utils/constants';
import { isEmptyDir, dirFileExists } from './utils/fileDirOps';
import { logFilesToConsole } from './utils/helpers';

// import the generartor file from modules directory
import base from './modules/base/baseGen';
// Register inquirer prompts
inquirer.registerPrompt('directory', inquirerDirectory);

// export const archgenerator: Generator = {
//   id: 'generator',
//   name: 'generator',
//   description: 'generates a react/next application',
//   generate: archGenerator,
// };

let options;

// async function archGenerator(rootDir: string, inputOptions: Options) {
//   const cwd = process.cwd();
//   const isEmptyCwd = isEmptyDir(cwd) ? true : false;
//   const packageJson = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json')).toString());
//   const isNxWorkspace = dirFileExists(path.join(cwd, 'nx.json')) || packageJson.nx !== undefined;
//   const isTurboWorkspace = dirFileExists(path.join(cwd, 'turbo.json')) || packageJson.turbo !== undefined;
//   const isLernaWorkspace = dirFileExists(path.join(cwd, 'lerna.json')) || packageJson.lerna !== undefined;

//   const questions = commonQuestionsProjectSetup(rootDir, isEmptyCwd);
//   options = await inquirer.prompt(questions, inputOptions);
//   const { itemName } = options;

//   options['appName'] = cc.snakeCase(itemName);
//   options['APP'] = options.appType;
//   options['ARCH'] = options.archType;
//   options['appType'] = options.appType === 'React App' ? 'react' : 'next';
//   options['archType'] =
//     options.appType === 'react'
//       ? reactAppTypeMap[options.archType]
//       : nextAppTypeMap[options.archType];
//   options['gitInnit'] = options.initializeGit;

//   const { appName, appType } = options;
//   console.log(options);
//   console.log();
//   console.log('This is the GenesisX/react-archetype!!!');

//   // Call the generator function
//   if(isEmptyCwd) {
//     // function call to handle empty directory goes here
//     console.log('This is an empty directory...');
//     console.log(`${appType === 'react' ? 'create-react-app' : 'create-next-app'} will be called here!`)
//   } else {
//     if(isNxWorkspace || isTurboWorkspace || isLernaWorkspace) {
//       console.log("Base function will be called here!");
//       // base(options);
//     } else {
//       console.log('Sorry! The selected directory is neither empty nor is a monorepo...');
//     }
//   }

//   // uncomment the below line to log copied files to console
//   // logFilesToConsole(path.join(options.parentDir, appName));
//   console.log();
//   console.log(`${appName} Created`);
//   console.log();
//   console.log('Done.');

//   return Promise.resolve();
// }

console.log("Hello");
(async () => {
  const cwd = process.cwd();
  const isEmptyCwd = isEmptyDir(cwd) ? true : false;
  const packageJson = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json')).toString());
  const isNxWorkspace = dirFileExists(path.join(cwd, 'nx.json')) || packageJson.nx !== undefined;
  const isTurboWorkspace = dirFileExists(path.join(cwd, 'turbo.json')) || packageJson.turbo !== undefined;
  const isLernaWorkspace = dirFileExists(path.join(cwd, 'lerna.json')) || packageJson.lerna !== undefined;

  const questions = commonQuestionsProjectSetup(cwd, isEmptyCwd);
  options = await inquirer.prompt(questions);
  const { itemName } = options;

  options['appName'] = cc.snakeCase(itemName);
  options['APP'] = options.appType;
  options['ARCH'] = options.archType;
  options['appType'] = options.appType === 'React App' ? 'react' : 'next';
  options['archType'] =
    options.appType === 'react'
      ? reactAppTypeMap[options.archType]
      : nextAppTypeMap[options.archType];
  options['gitInnit'] = options.initializeGit;

  const { appName } = options;
  console.log(options);
  console.log();
  console.log('This is the GenesisX/react-archetype!!!');

  // Call the generator function
  if(isEmptyCwd) {
    // function call to handle empty directory goes here
    console.log('This is an empty directory!');
  } else {
    if(isNxWorkspace || isTurboWorkspace || isLernaWorkspace) {
      // base(options);
      console.log("Testing!");
    } else {
      console.log('Sorry! The selected directory is neither empty nor is a monorepo...');
    }
  }

  // uncomment the below line to log copied files to console
  // logFilesToConsole(path.join(options.parentDir, appName));
  console.log();
  console.log(`${appName} Created`);
  console.log();
  console.log('Done.');

  return Promise.resolve();
})();
