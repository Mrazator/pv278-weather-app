import React from 'react';
import './SignIn.scss';
import Logo from 'app/components/logo/Logo';
import SignInForm from 'app/components/signinform/SignInForm';
import { useAuth0 } from 'app/util/react-auth0-spa';
import { Redirect } from 'react-router-dom';

const SignIn: React.FC = props => {
  const { isAuthenticated } = useAuth0()

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <div id="signin">
      <Logo />
      <SignInForm />
    </div>
  );
}

export default SignIn;
