import { appConstants, appTypes } from '../../utils/constants';

const getNextPort = rootPacakgeJson => {
  const basePort = 4000;
  const reactApps = rootPacakgeJson[appConstants.UNIVERSAL_REACT]?.apps.filter(
    a => a.appType === appTypes.REACT_APP,
  );
  return reactApps?.length ? basePort + reactApps.length : basePort;
};

export default getNextPort;
