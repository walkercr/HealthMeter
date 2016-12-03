import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './app.scss';

export default class App extends React.Component {

    static propTypes = {muiTheme: React.PropTypes.object.isRequired};
    static childContextTypes = {muiTheme: React.PropTypes.object.isRequired};

    getChildContext() {
        return {muiTheme: getMuiTheme(this.props.muiTheme)};
    }

    render() {
        return (
            <div>App</div>
        );
    }
}