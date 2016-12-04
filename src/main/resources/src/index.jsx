import React from 'react';
import ReactDOM from 'react-dom';
import {lightBlue600, blueGrey500, grey400, deepOrangeA400} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './containers/App.jsx';
import './index.scss';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#2196f3',
        primary2Color: '#ff3b3f',
        primary3Color: '#a9a9a9',
        accent1Color: deepOrangeA400,
        pickerHeaderColor: deepOrangeA400,
        canvasColor: '#efefef'
    }
});

const Theme = () => (
    <MuiThemeProvider muiTheme={muiTheme}>
        <App muiTheme={muiTheme} />
    </MuiThemeProvider>
);

ReactDOM.render(<Theme />, document.getElementById("app"));