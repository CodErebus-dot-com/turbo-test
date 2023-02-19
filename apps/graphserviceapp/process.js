import { execSync } from 'child_process';

execSync('grep -RiIl service | xargs sed -i ""  "s/service/service/g"')