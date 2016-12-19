import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import './home.scss';

class Home extends Component {

    static propTypes = {
        loggedIn: PropTypes.bool,
        user: PropTypes.object
    };

    state = {
        loading: null
    };

    render() {
        console.log('home');
        return <div style={{minHeight: '400px'}}>Home</div>;
    }
}

export default connect(state => ({
    loggedIn: state.loggedIn,
    user: state.user
}))(Home);