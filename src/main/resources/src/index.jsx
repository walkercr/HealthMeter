import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import * as reducers from './reducers/reducer.jsx';
import App from './containers/App.jsx';
import * as View from './components/views/index.jsx';
import 'grommet/scss/hpinc/index.scss';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const store = createStore(
    combineReducers({
            ...reducers,
        routing: routerReducer
    })
);

const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render((
    <MuiThemeProvider>
        <Provider store={store}>
            <Router history={history}>
                <Route path='/' component={App}>
                    <IndexRoute component={View.Home} />
                    <Route path="login" component={View.Login} />
                    <Route path="user-settings" component={View.UserSettings} />
                    <Route path="forgot-password" component={View.ForgotPassword} />
                    <Route path="signup" component={View.SignUp} />
                </Route>
            </Router>
        </Provider>
    </MuiThemeProvider>
    ), document.getElementById('app')
);