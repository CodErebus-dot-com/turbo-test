import getCommandType from './getCommandType';
import chalk = require('chalk');
import path = require('path');
import emoji = require('node-emoji');
import { helpers, fileDirOps, install, constants } from '../../utils/index';

const { currentDateTime, inReservedDirs } = helpers;
const { removeDir, getMostRecentDirectory } = fileDirOps;
const { installPackages } = install;
const {
  appConstants: { NODE_MODULES },
} = constants;

/**
 * @description : method to install depencies of project using [yarn | pnpm | npm]
 * @param {*} installLocation : location of root where dependencies need to install
 * @param {*} newProject : boolean
 */
const installDependencies = async (installLocation, newProject) => {
  const { command: cmd, fileName } = getCommandType(installLocation);
  let command = cmd;

  if (newProject) {
    console.info(
      chalk.yellow(
        `[${currentDateTime()}] - ${emoji.get(
          'pizza',
        )} Removing existing lock file and node_module folder. Please wait...`,
      ),
    );
    try {
      removeDir(path.join(installLocation, NODE_MODULES));
      removeDir(path.join(installLocation, fileName));
    } catch (err) {
      console.error(
        chalk.red(
          `[${currentDateTime()}] - ${emoji.get(
            'fire',
          )} Error: Failed to delete node_module and lock file/folder from root`,
        ),
        err,
      );
    }
  }
  let stepIn;
  let isRecentDir;
  if (newProject) {
    const recentDir = getMostRecentDirectory(process.cwd());
    isRecentDir = recentDir && !inReservedDirs(recentDir);

    if (isRecentDir) {
      console.info(
        chalk.green.bold(`[${currentDateTime()}] - Found [${recentDir}] directory created.`),
      );
      stepIn = `cd ${recentDir}`;
      command = `${stepIn} && ${command}`;
    }
  }

  installPackages(command, newProject, stepIn, isRecentDir);
};

export default installDependencies;
