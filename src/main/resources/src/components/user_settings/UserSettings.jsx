import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class UserSettings extends Component {

    static propTypes = {
        dispatch: PropTypes.func
    };

    render() {
        return (
            <div>User Settings</div>
        );
    }
}

export default connect()(UserSettings);