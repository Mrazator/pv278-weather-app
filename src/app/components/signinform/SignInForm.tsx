import React, { Component } from 'react';
import './SignInForm.scss'
import { Link } from 'react-router-dom';
import Button from '../button/Button';

class SignInForm extends Component {
    render() {
        return (
            <form id="sign-in-form">
                <label htmlFor="email">Email</label>
                <input id="email" type="text" />
                <label htmlFor="password">Password</label>
                <input id="password" type="password" />
                <Button className="submit" to="/dashboard">Login</Button>
            </form>
        );
    }
}

export default SignInForm;