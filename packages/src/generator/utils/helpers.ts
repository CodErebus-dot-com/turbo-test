declare function require(name: string);
const chalk = require('chalk');
const path = require('path');
const fs = require('fs-extra');
const { ignoreDirs } = require('./constants');

/**
 * @description : method to get the current date and time
 * @returns current date and time
 */
const currentDateTime = () => {
  const date = new Date();
  const str =
    date.getMonth() +
    1 +
    '/' +
    date.getDate() +
    '/' +
    date.getFullYear() +
    ' ' +
    date.getHours() +
    ':' +
    date.getMinutes() +
    ':' +
    date.getSeconds();
  return str;
};

/**
 * @description : method to check if commandName is pnpm or not
 * @returns boolean
 */
const isPnpm = commandName => commandName && commandName === 'pnpm';

/**
 * @description : js generator to yield all files from a directory recursively
 * @param {*} directoryPath : location of the directory
 */
function* fileYielder(directoryPath) {
  const files = fs.readdirSync(directoryPath, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      yield* fileYielder(path.join(directoryPath, file.name));
    } else {
      yield path.join(directoryPath, file.name);
    }
  }
}

/**
 * @description : js generator to yield all directories from a directory
 * @param {*} directoryPath : location of the directory
 */
function* dirYielder(directoryPath) {
  const items = fs.readdirSync(directoryPath, { withFileTypes: true });
  for (const item of items) {
    if (item.isDirectory()) {
      yield path.join(directoryPath, item.name);
    }
  }
}

/**
 * @description : function to log all the yielded files from a directory
 * @param {*} directoryPath : location of the directory
 */
function logFilesToConsole(directoryPath) {
  let fileCount = 0;
  console.log(chalk.green(chalk.bold('FILES ADDED: ')));
  for (const filePath of fileYielder(directoryPath)) {
    console.log(chalk.cyan(`${++fileCount}:  ${filePath}`));
  }
}

const inReservedDirs = dir => ignoreDirs.includes(dir);

export { currentDateTime, isPnpm, fileYielder, dirYielder, logFilesToConsole, inReservedDirs };
