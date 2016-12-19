export const LOGIN_NAME = 'Login';
export const FORGOT_PASSWORD_NAME = 'Forgot Password';
export const LOGOUT_NAME = 'Logout';
export const HOME_NAME = 'Home';
export const SIGNUP_NAME = 'Sign up';
export const USER_SETTINGS_NAME = 'User Settings';

export const LOGIN_PATH_NAME = LOGIN_NAME;
export const FORGOT_PASSWORD_PATH_NAME = FORGOT_PASSWORD_NAME;
export const LOGOUT_PATH_NAME = HOME_NAME;
export const HOME_PATH_NAME = HOME_NAME;
export const SIGNUP_PATH_NAME = SIGNUP_NAME;
export const USER_SETTINGS_PATH_NAME = USER_SETTINGS_NAME;

export const LOGIN_PATH = '/login';
export const FORGOT_PASSWORD_PATH = '/forgot-password';
export const LOGOUT_PATH = '/';
export const HOME_PATH = '/';
export const SIGNUP_PATH = '/signup';
export const USER_SETTINGS_PATH = '/user-settings';

export const GUEST_OPTIONS = [
    {
        name: LOGIN_NAME,
        path: LOGIN_PATH,
        pathName: LOGIN_PATH_NAME
    },
    {
        name: SIGNUP_NAME,
        path: SIGNUP_PATH,
        pathName: SIGNUP_PATH_NAME
    }
];

export const USER_OPTIONS = [
    {
        name: USER_SETTINGS_NAME,
        path: USER_SETTINGS_PATH,
        pathName: USER_SETTINGS_PATH_NAME
    },
    {
        name: LOGOUT_NAME,
        path: LOGOUT_PATH,
        pathName: LOGOUT_PATH_NAME
    }
];

export const NAV_ITEMS = [
    {
        name: HOME_NAME,
        path: HOME_PATH,
        pathName: HOME_PATH_NAME
    }
];