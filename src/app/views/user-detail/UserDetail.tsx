import React, { Component, useReducer } from 'react';
import Header from 'app/components/header/Header';
import "./UserDetail.scss";
import { RouteComponentProps } from 'react-router-dom';
import Button from 'app/components/button/Button';
import UserIcon from 'app/components/user-icon/UserIcon';
import ActionArea from 'app/components/action-area/ActionArea';
import { useAuth0 } from 'app/util/react-auth0-spa';

function UserDetail(props: RouteComponentProps) {
    const { logout, user } = useAuth0();

    const updatedAt = new Date(user.updated_at)
    const formattedDate = updatedAt.getFullYear() + "-" + (updatedAt.getMonth() + 1) + "-" + updatedAt.getDate() + " " + updatedAt.getHours() + ":" + updatedAt.getMinutes() + ":" + updatedAt.getSeconds() 
    
    return (
        <div className="user-detail">
            <Header history={props.history} path={props.location.pathname} />
            <ActionArea>
                <div className="info">
                    <UserIcon className="user-picture" />
                    <h3>{user.email}</h3>
                    <h6>{user.name}</h6>
                </div>
                <div className="detail">
                    <span>Updated at: {formattedDate}</span>
                </div>
                <div className="logout-wrapper">
                    <Button onClick={() => logout()} className="logout" secondary>Log out</Button>
                </div>
            </ActionArea>
        </div>
    );
}

export default UserDetail;
