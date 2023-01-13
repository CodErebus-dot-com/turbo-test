import { isPnpm } from './helpers';
import { getPackageVersion } from './packagesInfo';

/**
 * @description : method to check whether an item is object or not
 * @param {*} item : any data item
 * @returns : boolean
 */
const isObject = item => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

/**
 * @description : method to merge two json object
 * @param {*} masterJson : parent json object
 * @param {*} slaveJson : slave json object to be merged
 * @returns : Object
 */
const mergeJsons = (masterJson, ...slaveJson) => {
  if (!slaveJson.length) return masterJson;
  const source = slaveJson.shift();
  if (isObject(masterJson) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!masterJson[key])
          Object.assign(masterJson, {
            [key]: {},
          });
        mergeJsons(masterJson[key], source[key]);
      } else {
        Object.assign(masterJson, {
          [key]: source[key],
        });
      }
    }
  }
  return mergeJsons(masterJson, ...slaveJson);
};

/**
 * @description : method to replace string from object
 * @param {*} obj : Object type
 * @param {*} regexStr : string need to replace
 * @param {*} replacedStr : string replace with
 * @returns : Object
 */
function replaceString(obj, regexStr, replacedStr = '') {
  const regex = new RegExp(regexStr, 'gi');
  const str = JSON.stringify(obj).replace(regex, replacedStr);
  return JSON.parse(str);
}

/**
 * @description : method to create correct command type as per user input
 * @param {*} obj : Object type
 * @param {*} commandType : command type ex: npm,yarn,pnpm
 * @returns : object
 */
function applyCommandType(obj, commandType) {
  const packageString = JSON.stringify(obj);
  const regex = /{commandType}/gi;

  let str = packageString.replace(regex, commandType);

  if (commandType === 'npm') {
    str = packageString.replace(regex, `${commandType} run`);
  }

  return JSON.parse(str);
}

/**
 * @description : method to create correct versions
 * @param {*} obj : Object type
 * @param {*} commandType : command type ex: npm,yarn,pnpm
 * @returns : object
 */
function applyVersion(obj, commandType) {
  const packageString = JSON.stringify(obj);
  const nextRegex = /{nextVersion}/gi;
  const reactRegex = /{reactVersion}/gi;
  const workspaceRegex = /{workspacePrefix}/gi;
  const workSpaceVersion = isPnpm(commandType) ? 'workspace:*' : '*';
  const ractVersion = isPnpm(commandType) ? getPackageVersion('react') : '*';
  const nextVersion = isPnpm(commandType) ? getPackageVersion('next') : '*';

  let str = packageString.replace(nextRegex, nextVersion);
  str = str.replace(reactRegex, ractVersion);
  str = str.replace(workspaceRegex, workSpaceVersion);

  return JSON.parse(str);
}

export { mergeJsons, replaceString, applyCommandType, applyVersion };
