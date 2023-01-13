declare function require(name: string);
const { Spinner } = require('cli-spinner');
const spinners = require('./spinners.json');

const spinnerInit = new Spinner('%s');
spinnerInit.setSpinnerString(spinners[3]).setSpinnerTitle(' : ');

export { spinnerInit };
