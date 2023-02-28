import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';

class RegisterForm extends Form {
    state = {
        data: {
            username: '',
            password: '',
            name: '',
        },
        errors: {},
    };

    schema = {
        username: Joi.string()
            .required()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string()
            .required()
            .regex(/^[a-zA-Z0-9]{3,30}$/)
            .min(5)
            .label('Password'),
        name: Joi.string().required().label('Name'),
    };

    doSubmit = () => {
        console.log('Registered');
    };

    render() {
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('username', 'Username', 'email', true)}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderInput('name', 'Name')}
                    {this.renderButton('Register')}
                </form>
            </div>
        );
    }
}

export default RegisterForm;
