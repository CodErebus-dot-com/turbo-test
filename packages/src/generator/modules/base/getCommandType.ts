// declare function require(name:string);
import { fileDirOps, constants } from '../../utils/index';
import path = require('path');

const { dirFileExists } = fileDirOps;
const { appConstants, commandTypes } = constants;

/**
 * @description : method to identify which command type need to be used
 * @param {*} installLocation : localtion of lock files
 * @returns command type
 */
const getCommandType = installLocation => {
  const packageLock = path.join(installLocation, appConstants.PACKAGE_LOCK);
  const pnpmLock = path.join(installLocation, appConstants.PNPM_LOCK);
  const yarnLock = path.join(installLocation, appConstants.YARN_LOCK);

  if (dirFileExists(yarnLock)) {
    return {
      command: commandTypes.YARN,
      fileName: appConstants.YARN_LOCK,
    };
    // return commandTypes.YARN;
  }

  if (dirFileExists(pnpmLock)) {
    return {
      command: commandTypes.PNPM,
      fileName: appConstants.PNPM_LOCK,
    };
    // return commandTypes.PNPM;
  }

  if (dirFileExists(packageLock)) {
    return {
      command: commandTypes.NPM,
      fileName: appConstants.PACKAGE_LOCK,
    };
    // return commandTypes.NPM
  }

  return {
    command: commandTypes.YARN,
    fileName: appConstants.YARN_LOCK,
  };
};

export default getCommandType;
