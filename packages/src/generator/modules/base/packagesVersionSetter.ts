declare function require(name: string);
import path = require('path');
import { jsonHelper, helpers, fileDirOps, constants, packagesInfo } from '../../utils/index';

const { replaceString } = jsonHelper;
const { isPnpm } = helpers;
const { writeJsonFile } = fileDirOps;
const {
  appConstants: { PACKAGE_JSON },
} = constants;
const { getPackageVersion } = packagesInfo;

const setPackagesVersion = async commandName => {
  const rootDir = process.cwd();
  const workspaceVersion = isPnpm(commandName) ? 'workspace:*' : '*';
  const reactVersion = isPnpm(commandName) ? getPackageVersion('react') : '*';
  const hooksDir = path.join(rootDir, 'packages', 'hooks');
  const serviceDir = path.join(rootDir, 'packages', 'services');
  const hooksPackageJson = require(path.join(hooksDir, PACKAGE_JSON));
  const servicesPackageJson = require(path.join(serviceDir, PACKAGE_JSON));

  const finalHooksPackage = replaceString(hooksPackageJson, '{workspacePrefix}', workspaceVersion);
  const finalServicePackage = replaceString(servicesPackageJson, '{reactVersion}', reactVersion);

  await writeJsonFile(path.join(hooksDir, PACKAGE_JSON), finalHooksPackage);
  await writeJsonFile(path.join(serviceDir, PACKAGE_JSON), finalServicePackage);
};

export default setPackagesVersion;
