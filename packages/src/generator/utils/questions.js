const { appTypeMap, nextAppTypeMap, reactAppTypeMap } = require('./constants');

const commonQuestionsProjectSetup = (rootDir, isEmptyCwd) => [
  {
    type: 'input',
    name: 'itemName',
    message: 'Enter your app name',
    default: 'my_app',
  },
  {
    type: 'list',
    name: 'appType',
    message: 'What do you want to create? (Use arrow keys to navigate)',
    choices: Object.keys(appTypeMap),
  },
  {
    when: data => data.appType === 'Next App',
    type: 'list',
    name: 'archType',
    message: 'What type of next architecture you want to use?',
    choices: Object.keys(nextAppTypeMap),
  },
  {
    when: data => data.appType === 'React App',
    type: 'list',
    name: 'archType',
    message: 'What type of react architecture do you want to use?',
    choices: Object.keys(reactAppTypeMap),
  },
  {
    when: !isEmptyCwd,
    name: 'basePath',
    type: 'confirm',
    message: 'Do you want to run your application from deep/base path?',
    default: true,
  },
  {
    when: data => data.basePath === true,
    type: 'input',
    name: 'customBasePath',
    message: 'Please enter base path:',
    default: '/docs',
  },
  {
    when: !isEmptyCwd,
    type: 'directory',
    name: 'parentDir',
    pageSize: 20,
    message: 'Parent directory? (usually "<directory name>")',
    basePath: rootDir,
  },
  {
    name: 'initializeGit',
    type: 'confirm',
    message: 'Do you want to initialize a git repo?',
    default: true,
  },
];

module.exports = { commonQuestionsProjectSetup };
