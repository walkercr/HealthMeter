import React from 'react';
import ReactDOM from 'react-dom';
import {lightBlue600, blueGrey500, grey400, deepOrangeA400} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './containers/app.jsx';
import './index.scss';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: lightBlue600,
        primary2Color: blueGrey500,
        primary3Color: grey400,
        accent1Color: deepOrangeA400,
        pickerHeaderColor: deepOrangeA400
    }
});

const Theme = () => (
    <MuiThemeProvider muiTheme={muiTheme}>
        <App muiTheme={muiTheme} />
    </MuiThemeProvider>
);

ReactDOM.render(<Theme />, document.getElementById("app"));