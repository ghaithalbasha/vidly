import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';

class LoginForm extends Form {
    state = {
        data: {
            username: '',
            password: '',
        },
        errors: {},
    };

    username = React.createRef(); // we can use it as ref={this.username}
    password = React.createRef(); // we can use it as ref={this.password}

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password'),
    };

    doSubmit = () => {
        console.log('Submitted');
    };

    render() {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('username', 'Username', 'text', true)}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderButton('Login')}
                </form>
            </div>
        );
    }
}

export default LoginForm;
