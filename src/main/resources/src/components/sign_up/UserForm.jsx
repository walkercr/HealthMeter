import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import SignUpButtonGroup from './SignUpButtonGroup.jsx';
import './sign-up.scss';
import '../login/login.scss';

export default class UserForm extends React.Component {

    static propTypes = {
        firstName: React.PropTypes.string.isRequired,
        lastName: React.PropTypes.string.isRequired,
        email: React.PropTypes.string.isRequired,
        gender: React.PropTypes.string.isRequired,
        currentPage: React.PropTypes.number.isRequired,
        totalPages: React.PropTypes.number.isRequired,
        onPrev: React.PropTypes.func.isRequired,
        onCancel: React.PropTypes.func.isRequired,
        onNext: React.PropTypes.func.isRequired
    };

    state = {
        firstName: this.props.firstName,
        firstNameError: false,
        lastName: this.props.lastName,
        lastNameError: false,
        email: this.props.email,
        emailError: false,
        gender: this.props.gender,
        genderError: false,
        dob: null
    };

    handlePrev() {
        this.props.onPrev(this.state.firstName, this.state.lastName,
            this.state.email, this.state.gender, this.state.dob);
    }

    handleNext() {
        let isRequired = 'This field is required';
        let first = this.state.firstName === '' ? isRequired : null,
            last = this.state.lastName === '' ? isRequired : null,
            email = this.state.email === '' ? isRequired : null,
            gender = this.state.gender === '' ? isRequired : null;
        if (first || last || email) {
            this.setState({
                firstNameError: first,
                lastNameError: last,
                emailError: email,
                genderError: gender
            });
        } else {
            this.props.onNext(this.state.firstName, this.state.lastName,
                this.state.email, this.state.gender, this.state.dob);
        }
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
                        onChange={e => this.setState({firstName: e.target.value, firstNameError: null})}
                    />
                    <TextField
                        fullWidth
                        hintText='Last Name'
                        floatingLabelText='Last Name'
                        errorText={this.state.lastNameError}
                        type='text'
                        value={this.state.lastName}
                        onChange={e => this.setState({lastName: e.target.value, lastNameError: null})}
                    />
                    <TextField
                        fullWidth
                        hintText='Email'
                        floatingLabelText='Email'
                        errorText={this.state.emailError}
                        type='email'
                        value={this.state.email}
                        onChange={e => this.setState({email: e.target.value, emailError: null})}
                    />
                    <SelectField
                        fullWidth
                        floatingLabelText='Gender'
                        hintText='Gender'
                        errorText={this.state.genderError}
                        value={this.state.gender}
                        onChange={(event, index, value) => this.setState({gender: value})}>
                        <MenuItem value={'Male'} primaryText='Male' />
                        <MenuItem value={'Female'} primaryText='Female' />
                    </SelectField>
                    <SignUpButtonGroup
                        currentPage={this.props.currentPage}
                        totalPages={this.props.totalPages}
                        onPrev={this.handlePrev.bind(this)}
                        onCancel={this.props.onCancel}
                        onNext={this.handleNext.bind(this)}
                    />
                </div>
            </div>
        );
    }
}