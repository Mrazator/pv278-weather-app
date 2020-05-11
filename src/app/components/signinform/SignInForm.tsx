import React from 'react';
import './SignInForm.scss'
import Button from '../button/Button';
import { useAuth0 } from "../../util/react-auth0-spa";

function SignInForm(props: any) {
    const { loginWithPopup } = useAuth0();

    return (
        <form id="sign-in-form">
            <Button onClick={() => loginWithPopup({})} className="submit">Login</Button>
        </form>
    );
}

export default SignInForm;