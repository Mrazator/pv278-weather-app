import React from 'react';
import './SignIn.scss';
import Logo from 'app/components/logo/Logo';
import SignInForm from 'app/components/signinform/SignInForm';
import ActionArea from 'app/components/action-area/ActionArea';

const SignIn: React.FC = props => {
  return (
    <div id="signin">
        <Logo />
        <SignInForm />
    </div>
  );
}

export default SignIn;
