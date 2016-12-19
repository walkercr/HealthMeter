import cookie from 'react-cookie';

const AUTH_ID = 'id';
const AUTH_USERNAME = 'username';
const AUTH_PASSWORD = 'password';
const COOKIE_PATH = {path: '/'};

export const getAuth = () => {
    return {
        id: cookie.load(AUTH_ID),
        username: cookie.load(AUTH_USERNAME),
        password: cookie.load(AUTH_PASSWORD)
    };
};

export const setAuth = (id, username, password) => {
    cookie.save(AUTH_ID, id, COOKIE_PATH);
    cookie.save(AUTH_USERNAME, username, COOKIE_PATH);
    cookie.save(AUTH_PASSWORD, password, COOKIE_PATH);
};

export const removeAuth = () => {
    [AUTH_ID, AUTH_USERNAME, AUTH_PASSWORD].forEach((name) => {
        cookie.remove(name, COOKIE_PATH);
    });
};