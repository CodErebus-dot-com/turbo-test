declare function require(name: string);

const path = require('path');
import { sourcePathContants, appConstants } from './constants';

const templatesPath = path.join(__dirname, '..', sourcePathContants.TEMPLATES_DIR);
const microAppTemplatePath = path.join(templatesPath, sourcePathContants.MICRO_APP);
const nextTemplatePath = path.join(templatesPath, sourcePathContants.NEXT_DIR);
const baseTemplatePath = path.join(nextTemplatePath, sourcePathContants.BASE_DIR);
const commonDirPath = path.join(templatesPath, sourcePathContants.COMMON_DIR);
const tempDirPath = path.join(commonDirPath, sourcePathContants.TEMP_DIR);
const essentialsTemplatePath = path.join(commonDirPath, sourcePathContants.ESSENTIALS_DIR);
const srcTemplatePath = path.join(commonDirPath, sourcePathContants.SRC_DIR);
const storybookPath = path.join(commonDirPath, sourcePathContants.STORYBOOK_DIR);
const sourcePackagesPath = path.join(commonDirPath, appConstants.PACKAGES_DIR);
const configTemplatePath = path.join(commonDirPath, appConstants.CONFIG_DIR);

export {
  templatesPath,
  microAppTemplatePath,
  nextTemplatePath,
  baseTemplatePath,
  commonDirPath,
  tempDirPath,
  essentialsTemplatePath,
  srcTemplatePath,
  storybookPath,
  sourcePackagesPath,
  configTemplatePath,
};
