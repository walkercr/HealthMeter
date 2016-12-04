import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import cookie from 'react-cookie';
import Ajax from '../lib/ajax.jsx';
import Login from '../components/login/Login.jsx';
import Menu from '../components/menu/Menu.jsx';
import Home from '../components/home/Home.jsx';
import Nutrition from '../components/nutrition/Nutrition.jsx';
import Measurements from '../components/measurements/Measurements.jsx';
import Exercise from '../components/exercise/Exercise.jsx';
import Goals from '../components/goals/Goals.jsx';
import Performance from '../components/performance/Performance.jsx';
import Analysis from '../components/analysis/Analysis.jsx';
import './app.scss';

export default class App extends React.Component {

    static login = 'Login';
    static home = 'Home';
    static nutrition = 'Nutrition';
    static measurements = 'Measurements';
    static exercise = 'Exercise';
    static goals = 'Goals';
    static performance = 'Performance';
    static analysis = 'Analysis';

    static propTypes = {muiTheme: React.PropTypes.object.isRequired};
    static childContextTypes = {muiTheme: React.PropTypes.object.isRequired};

    state = {
        loggedIn: false,
        view: null,
        viewName: null,
        user: null,
        loading: null
    };

    getChildContext() {
        return {muiTheme: getMuiTheme(this.props.muiTheme)};
    }

    componentDidMount() {
        let id = cookie.load("id");
        let username = cookie.load("username");
        let password = cookie.load("password");
        if (id && username && password) {
            this.fetchUser(id);
        } else {
            this.goToLogin();
        }
    }

    fetchUser(id) {
        Ajax.httpGet('/api/user/' + id, (status, response) => {
            let user = null;
            if (status === 200) {
                user = JSON.parse(response);
            }
            this.setState({user: user, loggedIn: true});
            this.goToHomePage();
        });
    }

    goToLogin(username = '', password = '') {
        this.setState({
            loggedIn: false,
            view: (
                <Login
                    username={username}
                    password={password}
                    onLogin={this.handleLogin.bind(this)}
                />
            ),
            viewName: App.login
        });
    }

    handleLogin(user) {
        this.setState({loggedIn: true, user: user});
        this.goToHomePage();
    }

    handleLogout() {
        cookie.remove("id", {path: '/'});
        cookie.remove("username", {path: '/'});
        cookie.remove("password", {path: '/'});
        this.goToLogin();
    }

    handleHomePage() {
        if (this.state.viewName !== App.home) {
            this.goToHomePage();
        }
    }

    goToHomePage() {
        this.setState({
            view: <Home user={this.state.user} />,
            viewName: App.home
        });
    }

    handleNutrition() {
        if (this.state.viewName !== App.nutrition) {
            this.setState({view: <Nutrition/>, viewName: App.nutrition});
        }
    }

    handleMeasurements() {
        if (this.state.viewName !== App.measurements) {
            this.setState({view: <Measurements/>, viewName: App.measurements});
        }
    }

    handleExercise() {
        if (this.state.viewName !== App.exercise) {
            this.setState({view: <Exercise/>, viewName: App.exercise});
        }
    }

    handleGoals() {
        if (this.state.viewName !== App.goals) {
            this.setState({view: <Goals/>, viewName: App.goals});
        }
    }

    handlePerformance() {
        if (this.state.viewName !== App.performance) {
            this.setState({view: <Performance/>, viewName: App.performance});
        }
    }

    handleAnalysis() {
        if (this.state.viewName !== App.analysis) {
            this.setState({view: <Analysis/>, viewName: App.analysis});
        }
    }

    render() {
        return (
            <div>
                {this.state.loggedIn ?
                    <Menu
                        title={this.state.viewName}
                        loggedIn={this.state.loggedIn}
                        onHome={this.handleHomePage.bind(this)}
                        onNutrition={this.handleNutrition.bind(this)}
                        onMeasurements={this.handleMeasurements.bind(this)}
                        onExercise={this.handleExercise.bind(this)}
                        onGoals={this.handleGoals.bind(this)}
                        onPerformance={this.handlePerformance.bind(this)}
                        onAnalysis={this.handleAnalysis.bind(this)}
                        onLogout={this.handleLogout.bind(this)}>
                    </Menu> :
                    null
                }
                {this.state.view}
            </div>
        );
    }
}