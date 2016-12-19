import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { toggleViewName, logout } from '../actions/actions.jsx';
import { removeAuth } from '../utils/auth.jsx';
import { NAV_ITEMS, GUEST_OPTIONS, USER_OPTIONS } from '../constants/views.jsx';
import NavBar from '../components/nav_bar/NavBar.jsx';
import Footer from '../components/footer/Footer.jsx';
import './app.scss';

class App extends Component {

    static propTypes = {
        location: PropTypes.shape({
            pathname: PropTypes.string
        }),
        children: PropTypes.element,
        dispatch: PropTypes.func,
        loggedIn: PropTypes.bool,
        keepCookies: PropTypes.bool,
        user: PropTypes.object,
        view: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = { visible: false };
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        const { dispatch, view, location } = this.props;

        for (let i = 0; i < NAV_ITEMS.length; i++) {
            if (location.pathname === NAV_ITEMS[i].path) {
                if (view !== NAV_ITEMS[i].name) {
                    dispatch(toggleViewName(NAV_ITEMS[i].name));
                }
                break;
            }
        }
    }

    handleLogout() {
        this.props.dispatch(logout());
        if (!this.props.keepCookies) {
            removeAuth();
        }
    }

    render () {
        const { view, loggedIn, children } = this.props;

        return (
            <div>
                <NavBar
                    title="Honey Do"
                    view={view}
                    navItems={NAV_ITEMS}
                    options={loggedIn ? USER_OPTIONS : GUEST_OPTIONS}
                    onLogout={this.handleLogout}
                />
                {children}
                <Footer text="Stay on task with Honey Do!" />
            </div>
        );
    }
}

export default connect(state => ({
    loggedIn: state.default.loggedIn,
    keepCookies: state.default.keepCookies,
    user: state.default.user,
    view: state.default.view
}))(App);