import React, { useState, Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import Loading from "app/components/loading/Loading";
import history from "app/util/history"
import { useAuth0, Auth0Context } from "app/util/auth0-context";
import SignIn from "app/views/signin/SignIn";
import Dashboard from "app/views/dashboard/Dashboard";
import PrivateRoute from "app/components/private-route/PrivateRoute";
import UserDetail from "app/views/user-detail/UserDetail";
import SearchedDetail from "app/views/searched-detail/SearchedDetail";

interface IState {
    isLoading: boolean,
    isAuthenticated: boolean
}

class App extends Component<{}, IState> {

    constructor(props: any) {
        super(props)
        const { loading, isAuthenticated } = Auth0Context.Consumer
        this.state = {
            isLoading: loading,
            isAuthenticated: isAuthenticated
        }
    }

    render() {
        if (this.state.isLoading) {
            return <Loading />;
        }
        return (
            <div>
                <Router history={history}>
                    {this.state.isAuthenticated && (
                        // do something when authenticated
                        <div></div>
                    )}
                    <main>
                        <Switch>
                            <Route path="/" exact component={SignIn} />
                            <Route path="/dashboard" component={Dashboard} />
                            <Route path="/user" component={UserDetail} />
                            <Route path="/result" component={SearchedDetail} />
                        </Switch>
                    </main>
                </Router>
            </div>
        )
    }

}

export default App;
