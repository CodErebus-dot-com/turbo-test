const appTypes = {
  REACT_APP: 'react',
  NEXT_APP: 'next',
};

const nextAppTypes = {
  SSR_APP: 'ssr',
  SSG_APP: 'ssg',
  ISR_APP: 'isr',
};

const reactAppTypes = {
  CSR_APP: 'csr',
  SSR_APP: 'ssr',
  MICRO_APP: 'microApp',
};

const appTypeMap = {
  'React App': appTypes.REACT_APP,
  'Next App': appTypes.NEXT_APP,
};

const nextAppTypeMap = {
  'SSR(Server-side rendering)': nextAppTypes.SSR_APP,
  'SSG(Static site generation)': nextAppTypes.SSG_APP,
  'ISR(Incremental static regeneration)': nextAppTypes.ISR_APP,
};

const reactAppTypeMap = {
  'CSR(Client-side rendering)': reactAppTypes.CSR_APP,
  'SSR(Server-side rendering)': reactAppTypes.SSR_APP,
  'Micro-App': reactAppTypes.MICRO_APP,
};

const apiEndpoints = {
  reactLatest: 'https://registry.npmjs.org/-/v1/search?text=react&size=1',
  nextLatest: 'https://registry.npmjs.org/-/v1/search?text=next&size=1',
};

const reservedDir = {
  MODULES: 'modules',
};

const ignoreDirs = ['modules', '.vscode', 'storybook', 'apps', 'packages'];

const commandTypes = {
  NPM: 'npm',
  YARN: 'yarn',
  PNPM: 'pnpm',
};

const sourcePathContants = {
  TEMPLATES_DIR: 'templates',
  MICRO_APP: reactAppTypes.MICRO_APP,
  BASE_DIR: 'base',
  COMMON_DIR: 'common',
  REACT_DIR: 'react',
  NEXT_DIR: 'next',
  ESSENTIALS_DIR: 'essentials',
  SRC_DIR: 'src',
  STORYBOOK_DIR: 'storybook',
  TEMP_DIR: 'temp',
};

const appConstants = {
  UNIVERSAL_REACT: 'universal-react',
  PACKAGE_JSON: 'package.json',
  VSCODE_DIR: '.vscode',
  PACKAGES_DIR: 'packages',
  CONFIG_DIR: 'config',
  YARN_LOCK: 'yarn.lock',
  PACKAGE_LOCK: 'package-lock.json',
  PNPM_LOCK: 'pnpm-lock.yaml',
  NODE_MODULES: 'node_modules',
  HUSKY_RC: '.huskyrc.json',
  ROOT: 'root',
  NEXT_ENV: 'next-env.d.ts',
  NEXT_CONFIG: 'next.config.js',
};

const destinationPathContants = {
  DOCS_DIR: 'docs',
  WEB_DIR: 'web',
  APPS_DIR: 'apps',
  PAGES_DIR: 'pages',
};

export {
  appTypes,
  nextAppTypes,
  reactAppTypes,
  appTypeMap,
  nextAppTypeMap,
  reactAppTypeMap,
  apiEndpoints,
  reservedDir,
  ignoreDirs,
  commandTypes,
  sourcePathContants,
  appConstants,
  destinationPathContants,
};
