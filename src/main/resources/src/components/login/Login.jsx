import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { authorize, toggleViewName } from '../../actions/actions.jsx';
import { getAuth, setAuth } from '../../utils/auth.jsx';
import './login.scss';
import Ajax from '../../utils/ajax.jsx';
import * as VIEWS from '../../constants/views.jsx';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class Login extends Component {

    static propTypes = {
        dispatch: PropTypes.func,
        router: PropTypes.shape({
            push: PropTypes.func
        })
    };

    static contextTypes = {
        muiTheme: PropTypes.object.isRequired
    };

    state = {
        username: '',
        password: '',
        rememberMe: false,
        usernameError: false,
        passwordError: false,
        loading: false,
        showAlert: false
    };

    componentDidMount() {
        const user = getAuth();
        if (user.username && user.password && user.rememberMe) {
            this.setState({
                username: user.username,
                password: user.password,
                rememberMe: true
            });
        }
    }

    handleLogin() {
        const { username, password } = this.state;

        let usernameError = username === '';
        let passwordError = password === '';
        if (usernameError || passwordError) {
            this.setState({
                usernameError: usernameError,
                passwordError: passwordError
            });
        } else {
            let uri = '/api/user?username=' + username + '&password=' + password;
             Ajax.httpGet(uri, this.handleLoginCallback.bind(this));
            this.setState({loading: true});

            /*let user = {
                userId: 1,
                firstName: 'Craig',
                lastName: 'Walker',
                email: 'cw@gmail.com',
                gender: 'male',
                dob: '1/1/1900',
                username: 'walkercr'
            };
            this.handleLoginCallback(200, JSON.stringify(user));*/
        }
    }

    handleLoginCallback(status, response) {
        const { username, password, rememberMe } = this.state;
        const { dispatch, router } = this.props;

        if (status === 200) {
            let user = JSON.parse(response);
            setAuth(user.id, username, password);
            dispatch(authorize(user, rememberMe));
            router.push(VIEWS.HOME_PATH);

        } else {               // display a modal here for failed login
            this.setState({
                username: '',
                password: '',
                rememberMe: false,
                usernameError: false,
                passwordError: false,
                loading: false,
                showAlert: true
            });
        }
    }

    closeAlert = () => this.setState({showAlert: false});

    render() {
        const { dispatch } = this.props;
        const {
            username,
            password,
            rememberMe,
            usernameError,
            passwordError,
            loading,
            showAlert
        } = this.state;

        return (
            <div className='container-layout'>
                <div className='form-container'>
                    <form className='form'>
                        <TextField
                            id='loginUsername'
                            fullWidth
                            hintText="Username"
                            floatingLabelText="Username"
                            errorText={usernameError ? 'Username is required' : null}
                            type="text"
                            value={username}
                            onChange={e => this.setState({username: e.target.value})}
                        /><br />
                        <TextField
                            id='loginPassword'
                            fullWidth
                            hintText="Password"
                            floatingLabelText="Password"
                            errorText={passwordError ? 'Password is required' : null}
                            type="password"
                            value={password}
                            onChange={e => this.setState({password: e.target.value})}
                        /><br />
                        <Checkbox
                            id='rememberMeCheckbox'
                            className='form-element'
                            label='Remember me'
                            onClick={() => this.setState({rememberMe: !rememberMe})}>
                        </Checkbox>
                        <div className='login-btn'>
                            {loading ?
                                <CircularProgress /> :
                                <RaisedButton
                                    primary
                                    fullWidth
                                    id='loginButton'
                                    className='form-element'
                                    label={'Log in'}
                                    onClick={this.handleLogin.bind(this)}
                                />
                            }
                            <Dialog
                                actions={
                                    <FlatButton
                                        primary
                                        label="OK"
                                        onTouchTap={this.closeAlert}
                                    />
                                }
                                modal={false}
                                open={showAlert}
                                onRequestClose={this.closeAlert}>
                                Login failed
                            </Dialog>
                        </div>
                        <div className='help-container'>
                            <div className='new-account-btn'>
                                <RaisedButton
                                    secondary
                                    id='signUpButton'
                                    label={'Sign up'}
                                    onClick={() => dispatch(toggleViewName(VIEWS.SIGNUP_NAME))}
                                    containerElement={<Link to={VIEWS.SIGNUP_PATH} />}
                                />
                            </div>
                            <div className='forgot-password'>
                                <Link
                                    to={VIEWS.FORGOT_PASSWORD_PATH}
                                    className='form-element'
                                    style={{color: this.context.muiTheme.palette.primary1Color}}
                                    onClick={() => dispatch(toggleViewName(VIEWS.FORGOT_PASSWORD_NAME))}>
                                    Forgot password?
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect()(Login);