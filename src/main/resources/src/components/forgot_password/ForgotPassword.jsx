import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class ForgotPassword extends Component {

    static propTypes = {
        dispatch: PropTypes.func
    };

    render() {
        console.log('forgot password');
        return (
            <div>Forgot Password</div>
        );
    }
}

export default connect()(ForgotPassword);