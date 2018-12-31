import utilCrypto from './crypto';
import mail from './mail';
import validate from './validate';
import sso from './sso';
import { checkPermissions } from './permissions';

export {
    utilCrypto,
    sso,
    validate,
    mail,
    checkPermissions
};

export const getEnv = () => process.env.NODE_ENV;
