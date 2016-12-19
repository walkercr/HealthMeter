import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';

export default class Footer extends Component {

    static propTypes = {
        text: PropTypes.node
    };

    render() {
        return (
            <AppBar
                title={this.props.text}
                titleStyle={{textAlign: "center"}}
                showMenuIconButton={false}
                style={{backgroundColor: 'black', marginTop: '50px'}}
            />
        );
    }
}