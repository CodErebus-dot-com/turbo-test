declare function require(name: string);
import path = require('path');
import emoji = require('node-emoji');
import { fileDirOps, helpers, constants, paths, jsonHelper, gitHelpers } from '../../utils/index';
import chalk = require('chalk');
import setPackagesVersion from './packagesVersionSetter';
import fetchPackageVersion from './packagesVersionFetcher';
import getCommandType from './getCommandType';
import getNextPort from './getNextPort';
import installDependencies from './installDependencies';

const {
  appConstants: { CONFIG_DIR, PACKAGE_JSON },
  sourcePathContants: { SRC_DIR },
  appTypes: { REACT_APP, NEXT_APP },
} = constants;
const { copyDir, writeJsonFile, deleteFile, dirFileExists } = fileDirOps;
const { currentDateTime, isPnpm, dirYielder } = helpers;
const { initializeGitRepo } = gitHelpers;
const { mergeJsons, replaceString, applyCommandType, applyVersion } = jsonHelper;
const {
  baseTemplatePath,
  commonDirPath,
  templatesPath,
  essentialsTemplatePath,
  configTemplatePath,
  srcTemplatePath,
  sourcePackagesPath,
} = paths;

const copyNextBaseDirectory = options => {
  const { appName, parentDir } = options;

  const dstDir = path.join(parentDir, appName);
  const srcDir = path.join(baseTemplatePath);

  copyDir(path.join(srcDir, SRC_DIR), path.join(dstDir, SRC_DIR), []);
  copyDir(srcDir, dstDir, [SRC_DIR]);
};

const modifyPackageJson = (options, commandName) => {
  const { appName, basePath, appType, archType, parentDir } = options;
  const dstDir = path.join(parentDir, appName);

  const appTemplatePath = path.join(templatesPath, appType, archType);
  const basePackage = require(path.join(baseTemplatePath, PACKAGE_JSON));
  const appPackage = require(path.join(appTemplatePath, PACKAGE_JSON));
  const commonPackage = require(path.join(commonDirPath, PACKAGE_JSON));
  let packageFile = mergeJsons(basePackage, appPackage);

  if (appType === REACT_APP) {
    packageFile.name = appName;
    packageFile.scripts = {
      ...appPackage.scripts,
      ...commonPackage.scripts,
    };
    packageFile.dependencies = {
      ...appPackage.dependencies,
      ...commonPackage.dependencies,
    };
    packageFile.devDependencies = {
      ...appPackage.devDependencies,
      ...commonPackage.devDependencies,
    };
  } else {
    packageFile = mergeJsons(packageFile, commonPackage);
  }

  packageFile = mergeJsons(packageFile, { name: appName });
  if (basePath !== undefined) {
    packageFile = mergeJsons(packageFile, {
      scripts: {
        'env-var': `cross-env BASE_PATH=${basePath}`,
      },
    });
  } else {
    packageFile = replaceString(packageFile, '{commandType} env-var && ');
  }

  try {
    if (isPnpm(commandName)) {
      fetchPackageVersion();
    }
    setPackagesVersion(commandName); // temporarily commented
  } catch (err) {
    console.error(chalk.red(`[${currentDateTime()}] - ${emoji.get('fire')} Errors: ${err}`));
  }

  if (appType === REACT_APP) {
    packageFile = replaceString(packageFile, '{PORT}', `${getNextPort(packageFile)}`);
  }
  packageFile = applyCommandType(packageFile, commandName);
  packageFile = applyVersion(packageFile, commandName);
  writeJsonFile(path.join(dstDir, PACKAGE_JSON), packageFile);
  installDependencies(dstDir, false);
};

const copyCommonPackagesDirectory = () => {
  const dstDir = path.join(process.cwd(), 'packages');

  for (const dirPath of dirYielder(sourcePackagesPath)) {
    const packagesInd = dirPath.lastIndexOf('packages');
    const dirName = dirPath.slice(packagesInd + 9);

    if (!dirFileExists(path.join(dstDir, dirName))) {
      copyDir(path.join(sourcePackagesPath, dirName), path.join(dstDir, dirName), []);
    }
  }
};

const copyCommonDirectory = options => {
  const { appName, parentDir } = options;
  const dstDir = path.join(parentDir, appName);

  copyCommonPackagesDirectory();
  copyDir(essentialsTemplatePath, dstDir, [PACKAGE_JSON]);
  copyDir(configTemplatePath, path.join(dstDir, CONFIG_DIR), []);
  copyDir(srcTemplatePath, path.join(dstDir, SRC_DIR), []);
  deleteFile(path.join(dstDir, SRC_DIR, PACKAGE_JSON));
};

const createArchitecture = options => {
  const { appName, parentDir, appType, archType } = options;
  const dstDir = path.join(parentDir, appName);
  const srcDir = path.join(templatesPath, appType, archType);
  copyDir(srcDir, dstDir, [PACKAGE_JSON]);
  appType === NEXT_APP && copyNextBaseDirectory(options);
};

// const copyRootConfigsDirectory = options => {
//   const { appName, parentDir } = options;
//   rootDir = path.join(parentDir, appName);
//   let dstDir = '';
//   let srcDir = '';

//   dstDir = rootDir;
//   srcDir = path.join(__dirname, 'templates/common/essentials');
//   copyDir(srcDir, dstDir, []);

//   srcDir = path.join(__dirname, 'templates/common/config');
//   dstDir = path.join(rootDir, 'config');
//   copyDir(srcDir, dstDir, []);

//   srcDir = path.join(__dirname, 'templates/common/src');
//   dstDir = path.join(rootDir, 'src');
//   copyDir(srcDir, dstDir, ['package.json']);
// }

const base = options => {
  const { APP, ARCH, parentDir, appName, gitInnit } = options;

  console.log(`Selected AppType: ${chalk.bold(APP)}`);
  console.log(`Selected ${APP} Architecture: ${chalk.bold(ARCH)}`);
  console.log();
  console.info(
    chalk.green(`[${currentDateTime()}] - ${emoji.get('rocket')} Start creating ${ARCH}.`),
  );

  const commandName = getCommandType(path.join(parentDir, appName)).command;

  copyCommonDirectory(options);
  createArchitecture(options);
  modifyPackageJson(options, commandName);

  if (gitInnit !== false) {
    initializeGitRepo(path.join(parentDir, appName));
  }

  // cant test the line below as it is dependent on #208
  // copyRootConfigsDirectory(options);
  console.log();
  // return 0;
};

export default base;
