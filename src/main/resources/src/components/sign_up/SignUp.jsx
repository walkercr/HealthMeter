import React from 'react';
import Ajax from '../../lib/ajax.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import UserForm from './UserForm.jsx';
import LoginForm from './LoginForm.jsx';
import './sign-up.scss';
import '../login/login.scss';

export default class SignUp extends React.Component {

    static userFormPage = 1;
    static loginFormPage = 2;

    static propTypes = {
        onSignUp: React.PropTypes.func.isRequired,
        onCancel: React.PropTypes.func.isRequired
    };

    state = {
        existingUsernames: null,
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        dob: '',
        username: '',
        password: '',
        confirmPassword: '',
        usernameTaken: false,
        showConfirmation: false,
        loading: false,
        currentPage: SignUp.userFormPage
    };

    componentDidMount() {
        Ajax.httpGet('/api/user?usernames=true', this.handleUsernamesCallback.bind(this));
    }

    handleUsernamesCallback(status, response) {
        if (status === 200) {
            console.log(response);
            console.log(JSON.parse(response));
            this.setState({existingUsernames: JSON.parse(response)});
        } else {
            this.setState({existingUsernames: []});
        }
    }

    handleUserFormNext(first, last, email, gender, dob) {
        this.setState({
            firstName: first,
            lastName: last,
            email: email,
            gender: gender,
            dob: dob,
            currentPage: SignUp.loginFormPage});
    }

    handleLoginFormPrev(username) {
        this.setState({username: username, currentPage: SignUp.userFormPage});
    }

    handleLoginFormSubmit(username, password) {
        this.setState({username: username, password: password, showConfirmation: true});
    }

    handleCreateNewUser() {
        this.setState({loading: true, showConfirmation: false});
        let user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        };
        Ajax.httpPost('/api/user', user, this.handleCreateNewUserCallback.bind(this));
    }

    handleCreateNewUserCallback(status) {
        this.setState({loading: false});
        if (status === 201) {
            this.setState({currentPage: SignUp.loginFormPage});
            this.props.onSignUp(this.state.username, this.state.password);
        } else {
            // should be an alert for an error
            this.setState({usernameTaken: true});
        }
    }

    render() {
        if (!this.state.existingUsernames || this.state.loading) {
            return <CircularProgress/>;
        }
        if (this.state.showConfirmation) {
            let dialogActions = [
                <RaisedButton
                    label='Cancel'
                    secondary
                    style={{marginRight: '12px'}}
                    onTouchTap={() => this.setState({showConfirmation: false})}
                />,
                <RaisedButton
                    label='Confirm'
                    primary
                    onTouchTap={this.handleCreateNewUser.bind(this)}
                />
            ];
            return (
                <Dialog
                    title='Confirm User Details'
                    actions={dialogActions}
                    modal
                    open={this.state.showConfirmation}>
                    <Divider/>
                    {'First Name: ' + this.state.firstName}<br/>
                    {'Last Name: ' + this.state.lastName}<br/>
                    {'Email: ' + this.state.email}<br/>
                    {'Gender: ' + this.state.gender}<br/>
                    {'Date of Birth: ' + this.state.dob}<br/>
                    {'Username: ' + this.state.username}
                </Dialog>

            );
        }

        let totalPages = 2;
        switch (this.state.currentPage) {
            case SignUp.userFormPage:
                return (
                    <UserForm
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        email={this.state.email}
                        gender={this.state.gender}
                        currentPage={this.state.currentPage}
                        totalPages={totalPages}
                        onPrev={() => {}}
                        onCancel={this.props.onCancel}
                        onNext={this.handleUserFormNext.bind(this)}
                    />
                );
            case SignUp.loginFormPage:
                return (
                    <LoginForm
                        existingUsernames={this.state.existingUsernames.usernames}
                        username={this.state.username}
                        currentPage={this.state.currentPage}
                        totalPages={totalPages}
                        onPrev={this.handleLoginFormPrev.bind(this)}
                        onCancel={this.props.onCancel}
                        onSubmit={this.handleLoginFormSubmit.bind(this)}
                    />
                );
            default:
                return <div>An error occurred. Please refresh the page.</div>;
        }
    }
}