declare function require(name: string);
const chalk = require('chalk');
const { exec } = require('child_process');
const { currentDateTime } = require('./helpers');
/**
 * @description : method to initiate git repository
 * @param {*} dir : path of file
 * @returns : return console output
 */
const initializeGitRepo = dir => {
  const cmd = `git init`;
  console.log(dir, cmd);
  exec(cmd, { cwd: dir }, (error, stdout) => {
    if (error) {
      console.error(
        chalk.red(
          `[${currentDateTime()}]} Error: Failed to intialized git repo. ${error}`,
        ),
      );
      process.exit(1);
    }
    console.log(`stdout: ${stdout}`);
  });
};

export { initializeGitRepo };
