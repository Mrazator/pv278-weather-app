import React, { Component } from 'react';
import Header from 'app/components/header/Header';
import "./UserDetail.scss";
import { RouteComponentProps } from 'react-router-dom';
import Button from 'app/components/button/Button';
import UserIcon from 'app/components/user-icon/UserIcon';

class UserDetail extends Component<RouteComponentProps> {
    render() {
        return (
            <div className="user-detail">
                <Header history={this.props.history} path={this.props.location.pathname} />
                <div className="info">
                    <UserIcon className="user-button" />
                    <h3>email@myemail.com</h3>
                    <h6>basic user</h6>
                </div>
                <div className="detail">
                    <span>Registered: 12.1.2020</span>
                    <span>Last log in: 4.3.2020</span>
                </div>
                <div className="logout-wrapper">
                    <Button className="logout" to="/" secondary>Log out</Button>
                </div>
            </div>
        );
    }
}

export default UserDetail;