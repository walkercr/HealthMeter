import { LOGIN, LOGOUT, TOGGLE_VIEW, USERNAMES } from '../actions/actions.jsx';
import { HOME_PATH_NAME } from '../constants/views.jsx';

const defaultState = {
    loggedIn: false,
    user: {},
    view: HOME_PATH_NAME,
    usernames: []
};

export default function reduce(state = defaultState, action) {
    switch (action.type) {
        case LOGIN:
            return Object.assign({}, state, {
                loggedIn: true,
                user: action.user,
                keepCookies: action.keepCookies,
                view: HOME_PATH_NAME
            });
        case LOGOUT:
            console.log('logging out');
            return Object.assign({}, state, {
                loggedIn: false,
                view: HOME_PATH_NAME
            });
        case TOGGLE_VIEW:
            return Object.assign({}, state, {
                view: action.view
            });
        case USERNAMES:
            return Object.assign({}, state, {
                usernames: state.usernames.concat(action.usernames)
            });
        default:
            return state;
    }
}