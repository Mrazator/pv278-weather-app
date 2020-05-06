import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Route, withRouter } from "react-router-dom";
import { useAuth0 } from "app/util/auth0-context";
import { RouteComponentProps } from 'react-router';

interface HomeProps extends RouteComponentProps {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>,
  path: string | string[]
}

const PrivateRoute: React.FC<HomeProps> = ({ component: Component, path, location, ...rest }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    const fn = async () => {
      if (!isAuthenticated) {
        await loginWithRedirect({
          appState: { targetUrl: location.pathname }
        });
      }
    };
    fn();
  }, [isAuthenticated, loginWithRedirect, path, location]);

  const render = (props: any) => (isAuthenticated === true ? <Component {...props} /> : null);

  return <Route path={path} render={render} {...rest} />;
};

export default withRouter(PrivateRoute);
