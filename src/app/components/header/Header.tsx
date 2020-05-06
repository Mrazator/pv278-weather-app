import React, { Component } from 'react';
import './Header.scss'
import Logo from '../logo/Logo';
import { Link } from 'react-router-dom';
import UserIcon from '../user-icon/UserIcon';
import BackButton from '../back-button-icon/BackButton';

interface IProps {
    history?: any,
    path?: string
}

class Header extends Component<IProps> {

    render() {
        return (
            <div id="header">
                <div className="back-button-wrapper">
                    {this.props.history ? <BackButton onClick={this.props.history?.goBack} fillColor="#5F738C" size="45px" /> : null}
                </div>
                <Logo className="small" />
                <div className="user-button-wrapper">
                    {this.props.path === "/user" ? null : <Link className="link-user-button" to="/user"><UserIcon className="user-button" /></Link>}
                </div>
            </div>
        );
    }
}

export default Header;