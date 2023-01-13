import { helpers, packagesInfo, constants } from '../../utils/index';
import axios from 'axios';
import emoji = require('node-emoji');
import chalk = require('chalk');

const { currentDateTime } = helpers;
const { apiEndpoints } = constants;
const { setPackageVersion } = packagesInfo;

const fetchPackageVersion = async () => {
  try {
    // spinnerInit.start();
    console.info(
      chalk.green(
        `[${currentDateTime()}] - ${emoji.get('pizza')} Updating packages version. Please wait...`,
      ),
    );
    const reactRes = await axios.get(apiEndpoints.reactLatest);
    const reactLatestVersion = reactRes?.data?.objects[0]?.package.version;
    setPackageVersion('react', reactLatestVersion);
    setPackageVersion('react-dom', reactLatestVersion);

    const nextRes = await axios.get(apiEndpoints.nextLatest);
    setPackageVersion('next', nextRes?.data?.objects[0]?.package.version);

    // spinnerInit.stop();
  } catch (err) {
    console.error(
      chalk.red(
        `[${currentDateTime()}] - ${emoji.get(
          'fire',
        )} Error: Failed to get package version. ${err}`,
      ),
    );
    process.exit(1);
  }
};

export default fetchPackageVersion;
