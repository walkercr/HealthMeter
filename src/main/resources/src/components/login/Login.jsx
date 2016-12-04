import React from 'react';
import './login.scss';
import cookie from 'react-cookie';
import Ajax from '../../lib/ajax.jsx';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import SignUp from '../sign_up/SignUp.jsx';

export default class Login extends React.Component {

    static contextTypes = {muiTheme: React.PropTypes.object.isRequired};

    static propTypes = {
        username: React.PropTypes.string,
        password: React.PropTypes.string,
        onLogin: React.PropTypes.func.isRequired
    };

    static defaultProps = {username: '', password: ''};

    state = {
        username: this.props.username,
        password: this.props.password,
        usernameError: false,
        passwordError: false,
        rememberMe: false,
        signUp: false
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.username !== nextProps.username
            && this.props.password !== nextProps.password) {
            this.initializeState(nextProps);
        }
    }

    initializeState(props = this.props) {
        this.setState({
            username: props.username,
            password: props.password,
            rememberMe: false,
            signUp: false
        });
    }

    handleLogin() {
        let usernameError = this.state.username === '';
        let passwordError = this.state.password === '';
        if (usernameError || passwordError) {
            this.setState({usernameError: usernameError, passwordError: passwordError});
        } else {
            /*let uri = '/api/user?username=' + this.state.username
                + '&password=' + this.state.password;
            Ajax.httpGet(uri, this.handleLoginCallback.bind(this));*/
            let user = {
                userId: 1,
                firstName: 'Craig',
                lastName: 'Walker',
                email: 'cw@gmail.com',
                gender: 'male',
                dob: '1/1/1900',
                username: 'walkercr'
            };
            this.props.onLogin(user);
        }
    }

    handleLoginCallback(status, response) {
        if (status === 200) {
            let path = this.state.rememberMe ? '/' : '/session/';
            let user = JSON.parse(response);
            cookie.save("id", user.id, {path: path});
            cookie.save("username", this.state.username, {path: path});
            cookie.save("password", this.state.password, {path: path});
            this.props.onLogin(user);
        } else {
            this.initializeState();
        }
    }

    handleForgotPassword() {
        console.log('forgot password');
    }

    handleSignUp(username, password) {
        this.setState({username: username, password: password, signUp: false});
    }

    render() {
        // add an event handler to get the list of taken usernames to pass as a prop
        if (this.state.signUp) {
            return (
                <SignUp
                    onSignUp={this.handleSignUp.bind(this)}
                    onCancel={this.initializeState.bind(this)}
                />
            );
        }
        return (
            <div className='container-layout'>
                <div className='form-container'>
                    <form className='form'>
                        <TextField
                            id='loginUsername'
                            fullWidth
                            hintText="Username Field"
                            floatingLabelText="Username"
                            errorText={this.state.usernameError ? 'This field is required' : null}
                            type="text"
                            value={this.state.username}
                            onChange={e => this.setState({username: e.target.value})}
                        /><br />
                        <TextField
                            id='loginPassword'
                            fullWidth
                            hintText="Password Field"
                            floatingLabelText="Password"
                            errorText={this.state.passwordError ? 'This field is required' : null}
                            type="password"
                            value={this.state.password}
                            onChange={e => this.setState({password: e.target.value})}
                        /><br />
                        <Checkbox
                            id='rememberMeCheckbox'
                            className='form-element'
                            label='Remeber me'
                            onClick={() => this.setState({rememberMe: !this.state.rememberMe})}>
                        </Checkbox>
                        <div className='login-btn'>
                            <RaisedButton
                                primary
                                fullWidth
                                id='loginButton'
                                className='form-element'
                                label={'Log in'}
                                onClick={this.handleLogin.bind(this)}>
                            </RaisedButton>
                        </div>
                        <div className='help-container'>
                            <div className='new-account-btn'>
                                <RaisedButton
                                    secondary
                                    id='signUpButton'
                                    label={'Sign up'}
                                    onClick={() => this.setState({signUp: true})}>
                                </RaisedButton>
                            </div>
                            <div className='forgot-password'>
                                <a
                                    href='#'
                                    className='form-element'
                                    style={{color: this.context.muiTheme.palette.primary1Color}}
                                    onClick={this.handleForgotPassword.bind(this)}>
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}