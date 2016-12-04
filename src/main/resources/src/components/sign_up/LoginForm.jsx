import React from 'react';
import TextField from 'material-ui/TextField';
import SignUpButtonGroup from './SignUpButtonGroup.jsx';
import './sign-up.scss';
import '../login/login.scss';

export default class LoginForm extends React.Component {

    static propTypes = {
        existingUsernames: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        username: React.PropTypes.string.isRequired,
        currentPage: React.PropTypes.number.isRequired,
        totalPages: React.PropTypes.number.isRequired,
        onPrev: React.PropTypes.func.isRequired,
        onCancel: React.PropTypes.func.isRequired,
        onSubmit: React.PropTypes.func.isRequired
    };

    state = {
        username: this.props.username,
        usernameError: null,
        password: '',
        passwordError: null,
        confirmPassword: '',
        confirmPasswordError: null
    };

    handleSubmit() {
        let isRequired = 'This field is required';
        let user = this.state.firstName === '' ? isRequired : null,
            pass = this.state.lastName === '' ? isRequired : null,
            confirm = this.state.email === '' ? isRequired : null;
        if (!pass && !confirm && this.state.password !== this.state.confirmPassword) {
            confirm = 'Must match password';
        }
        if (user || pass || confirm) {
            this.setState({
                usernameError: user,
                passwordError: pass,
                confirmPasswordError: confirm
            });
        } else if(this.props.existingUsernames.indexOf(this.state.username) !== -1) {
            this.setState({usernameError: 'This username is not available'});
        } else {
            this.props.onSubmit(this.state.username, this.state.password);
        }
    }

    render() {
        return (
            <div className='container-layout'>
                <div className='form-container'>
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
                    <SignUpButtonGroup
                        currentPage={this.props.currentPage}
                        totalPages={this.props.totalPages}
                        nextLabel={'Submit'}
                        onPrev={() => this.props.onPrev(this.state.username)}
                        onCancel={this.props.onCancel}
                        onNext={this.handleSubmit.bind(this)}
                    />
                </div>
            </div>
        );
    }
}