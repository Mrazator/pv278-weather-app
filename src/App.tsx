import React, { lazy, Suspense } from "react";
import { Router, Route, Switch } from "react-router-dom";

import { useAuth0 } from "app/util/react-auth0-spa";

import history from "app/util/history"
import Loading from "app/components/loading/Loading";

import SignIn from "app/views/signin/SignIn";
import UserDetail from "app/views/user-detail/UserDetail";

const Dashboard = lazy(() => import('app/views/dashboard/Dashboard'));

function App(props: {}) {
    const { isAuthenticated } = useAuth0()

    return (
        <div>
            <Suspense fallback={<Loading />}>
                <Router history={history}>
                    <main>
                        <Switch>
                            <Route path="/" exact component={SignIn} />
                            {isAuthenticated && [
                                <Route key="1" path="/dashboard" component={Dashboard} />,
                                <Route key="2" path="/user" component={UserDetail} />
                            ]}
                        </Switch>
                    </main>
                </Router>
            </Suspense>
        </div>
    )
}

export default App;