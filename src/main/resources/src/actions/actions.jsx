export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const TOGGLE_VIEW = 'TOGGLE_VIEW';
export const USERNAMES = 'USERNAMES';

export const authorize = (user, keepCookies) => {
    return {
        type: LOGIN,
        user: user,
        keepCookies: keepCookies
    };
};

export const logout = () => {
    return { type: LOGOUT };
};

export const toggleViewName = (view) => {
    return {
        type: TOGGLE_VIEW,
        view: view
    };
};

export const addUsernames = (usernames) => {
    return {
        type: USERNAMES,
        usernames: usernames
    };
};