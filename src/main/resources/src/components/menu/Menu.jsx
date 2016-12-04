import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import './menu.scss';

export default class Menu extends React.Component {

    static contextTypes = {muiTheme: React.PropTypes.object.isRequired};

    static propTypes = {
        title: React.PropTypes.string.isRequired,
        loggedIn: React.PropTypes.bool.isRequired,
        onHome: React.PropTypes.func.isRequired,
        onNutrition: React.PropTypes.func.isRequired,
        onMeasurements: React.PropTypes.func.isRequired,
        onExercise: React.PropTypes.func.isRequired,
        onGoals: React.PropTypes.func.isRequired,
        onPerformance: React.PropTypes.func.isRequired,
        onAnalysis: React.PropTypes.func.isRequired,
        onLogout: React.PropTypes.func.isRequired
    };

    state = {open: false};

    handleSelection(callback) {
        this.setState({open: false});
        callback();
    }

    render() {
        return (
            <div>
                <AppBar
                    title={this.props.title}
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonTouchTap={() => this.setState({open: !this.state.open})}>
                </AppBar>
                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}>
                    <AppBar
                        title='Menu'
                        showMenuIconButton={false}
                        style={{backgroundColor: this.context.muiTheme.palette.accent1Color}}
                    />
                    <MenuItem
                        onTouchTap={() => this.handleSelection(this.props.onHome)}>
                        Home
                    </MenuItem>
                    <Divider />
                    <MenuItem
                        onTouchTap={() => this.handleSelection(this.props.onNutrition)}>
                        Nutrition
                    </MenuItem>
                    <Divider />
                    <MenuItem
                        onTouchTap={() => this.handleSelection(this.props.onMeasurements)}>
                        Measurements
                    </MenuItem>
                    <Divider />
                    <MenuItem
                        onTouchTap={() => this.handleSelection(this.props.onExercise)}>
                        Exercise
                    </MenuItem>
                    <Divider />
                    <MenuItem
                        onTouchTap={() => this.handleSelection(this.props.onGoals)}>
                        Goals
                    </MenuItem>
                    <Divider />
                    <MenuItem
                        onTouchTap={() => this.handleSelection(this.props.onPerformance)}>
                        Performance
                    </MenuItem>
                    <Divider />
                    <MenuItem
                        onTouchTap={() => this.handleSelection(this.props.onAnalysis)}>
                        Analysis
                    </MenuItem>
                    <Divider />
                    <MenuItem
                        onTouchTap={() => this.handleSelection(this.props.onLogout)}>
                        Log out
                    </MenuItem>
                </Drawer>
            </div>
        );
    }
}