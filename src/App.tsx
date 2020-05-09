import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import Loading from "app/components/loading/Loading";
import history from "app/util/history"
import { Auth0Context } from "app/util/auth0-context";
import SignIn from "app/views/signin/SignIn";
import Dashboard from "app/views/dashboard/Dashboard";
import UserDetail from "app/views/user-detail/UserDetail";

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
                        </Switch>
                    </main>
                </Router>
            </div>
        )
    }

}

export default App;
