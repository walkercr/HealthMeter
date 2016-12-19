import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import './sign-up.scss';
import '../login/login.scss';
import Ajax from '../../utils/ajax.jsx';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import CircularProgress from 'material-ui/CircularProgress';
import { setAuth } from '../../utils/auth.jsx';
import { authorize, toggleViewName, addUsernames } from '../../actions/actions.jsx';
import { HOME_PATH, HOME_NAME } from '../../constants/views.jsx';
import { OK, CREATED, CONFLICT } from '../../constants/httpCodes.jsx';

class SignUp extends Component {

    static propTypes = {
        existingUsernames: PropTypes.arrayOf(PropTypes.string),
        dispatch: PropTypes.func,
        router: PropTypes.shape({
            push: PropTypes.func
        })
    };

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            rememberMe: false,
            firstNameError: null,
            lastNameError: null,
            emailError: null,
            usernameError: null,
            passwordError: null,
            confirmPasswordError: null,
            usernameTaken: false,
            showConfirmation: false,
            loading: false,
            signupFailure: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCreateNewUser = this.handleCreateNewUser.bind(this);
        this.handleCreateNewUserCallback = this.handleCreateNewUserCallback.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidMount() {
        this.getExistingUsernames();
    }

    getExistingUsernames() {
        const { dispatch } = this.props;

        Ajax.httpGet('/api/user', (status, response) => {
            if (status === OK) {
                let usernames = JSON.parse(response);
                console.log(usernames);
                dispatch(addUsernames(usernames));
            }
        });
    }

    handleSubmit() {
        const errors = this.checkErrors();
        if (errors) {
            this.setState({
                firstNameError: errors.firstName,
                lastNameError: errors.lastName,
                emailError: errors.email,
                usernameError: errors.username,
                passwordError: errors.password,
                confirmPasswordError: errors.confirmPassword
            });
        } else {
            this.setState({showConfirmation: true});
        }
    }

    checkErrors() {
        const isRequired = '* Required field';

        let first = this.state.firstName ? null : isRequired,
            last = this.state.lastName ? null : isRequired,
            email = this.state.email ? null : isRequired,
            uname = this.state.username ? null : isRequired,
            pass = this.state.password ? null : isRequired,
            confirm = this.state.confirmPassword ? null : isRequired;

        if (!confirm && this.state.password !== this.state.confirmPassword) {
            confirm = 'Must match password';
        }

        if (!uname && this.props.existingUsernames.indexOf(this.state.username) !== -1) {
            uname = 'Username is taken';
        }

        if (first || last || email || uname || pass || confirm) {
            return {
                firstName: first,
                lastName: last,
                email: email,
                username: uname,
                password: pass,
                confirmPassword: confirm
            };
        }

        return null;
    }

    handleCreateNewUser() {
        const { firstName, lastName, email, username, password } = this.state;

        this.setState({loading: true, showConfirmation: false});
        let user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            password: password
        };
        Ajax.httpPost('/api/user', user, this.handleCreateNewUserCallback);
        //this.handleCreateNewUserCallback(201, JSON.stringify(user));
    }

    handleCreateNewUserCallback(status, response) {
        const { username, password, rememberMe } = this.state;
        const { dispatch, router } = this.props;

        if (status === CREATED) {
            let user = JSON.parse(response);
            setAuth(user.id, username, password);
            dispatch(authorize(user, rememberMe));
            dispatch(addUsernames([username]));
            router.push(HOME_PATH);

        } else if (status === CONFLICT) {
            this.setState({usernameTaken: true, loading: false});

        } else {
            this.setState({loading: false, signupFailure: true});
        }
    }

    handleCancel() {
        const { router, dispatch } = this.props;
        router.push(HOME_PATH);
        dispatch(toggleViewName(HOME_NAME));
    }

    confirmationDialog() {
        const dialogActions = [
            <RaisedButton
                label='Cancel'
                secondary
                style={{marginRight: '12px'}}
                onTouchTap={() => this.setState({showConfirmation: false})}
            />,
            <RaisedButton
                label='Confirm'
                primary
                onTouchTap={this.handleCreateNewUser}
            />
        ];

        const loadProgress = this.state.loading ? <CircularProgress /> : null;

        return (
            <Dialog
                title='Confirm User Details'
                actions={dialogActions}
                modal
                open={this.state.showConfirmation}>
                <div>{'First Name: ' + this.state.firstName}</div>
                <div>{'Last Name: ' + this.state.lastName}</div>
                <div>{'Email: ' + this.state.email}</div>
                <div>{'Username: ' + this.state.username}</div>
                {loadProgress}
            </Dialog>
        );
    }

    signupFailSnackbar() {
        return (
            <Snackbar
                open={this.state.signupFailure}
                message='Sign up failed. Please try again.'
                autoHideDuration={4000}
                onRequestClose={() => this.setState({signupFailure: false})}
                action='OK'
                onActionTouchTap={() => this.setState({signupFailure: false})}
            />
        );
    }

    render() {
        return (
            <div className='container-layout'>
                <div className='form-container'>
                    <TextField
                        fullWidth
                        hintText={'First Name'}
                        floatingLabelText='FirstName'
                        errorText={this.state.firstNameError}
                        type='text'
                        value={this.state.firstName}
                        onChange={e => this.setState({
                            firstName: e.target.value,
                            firstNameError: null
                        })}
                    />
                    <TextField
                        fullWidth
                        hintText='Last Name'
                        floatingLabelText='Last Name'
                        errorText={this.state.lastNameError}
                        type='text'
                        value={this.state.lastName}
                        onChange={e => this.setState({
                            lastName: e.target.value,
                            lastNameError: null
                        })}
                    />
                    <TextField
                        fullWidth
                        hintText='Email'
                        floatingLabelText='Email'
                        errorText={this.state.emailError}
                        type='email'
                        value={this.state.email}
                        onChange={e => this.setState({
                            email: e.target.value,
                            emailError: null
                        })}
                    />
                    <TextField
                        fullWidth
                        hintText='Username'
                        floatingLabelText='Username'
                        errorText={this.state.usernameError}
                        type='text'
                        value={this.state.username}
                        onChange={e => this.setState({
                            username: e.target.value,
                            usernameError: null
                        })}
                    />
                    <TextField
                        fullWidth
                        hintText='Password'
                        floatingLabelText='Password'
                        errorText={this.state.passwordError}
                        type='password'
                        value={this.state.password}
                        onChange={e => this.setState({
                            password: e.target.value,
                            passwordError: null
                        })}
                    />
                    <TextField
                        fullWidth
                        hintText='Confirm Password'
                        floatingLabelText='Confirm Password'
                        errorText={this.state.confirmPasswordError}
                        type='password'
                        value={this.state.confirmPassword}
                        onChange={e => this.setState({
                            confirmPassword: e.target.value,
                            confirmPasswordError: null
                        })}
                    />
                    <Checkbox
                        id='rememberMeCheckbox'
                        className='form-element'
                        label='Remember me'
                        onClick={() => this.setState({
                            rememberMe: !this.state.rememberMe
                        })}>
                    </Checkbox>
                    <div style={{marginTop: '12px'}}>
                        <RaisedButton
                            secondary
                            label='Cancel'
                            style={{marginRight: '12px'}}
                            onTouchTap={this.handleCancel}
                        />
                        <RaisedButton
                            primary
                            label='Submit'
                            style={{float: 'right'}}
                            onTouchTap={this.handleSubmit}
                        />
                    </div>
                    {this.confirmationDialog()}
                    {this.state.signupFailure ? this.signupFailSnackbar() : null}
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    existingUsernames: state.default.usernames
}))(SignUp);