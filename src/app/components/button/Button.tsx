import React, { Component } from 'react';
import "./Button.scss";
import { Link } from 'react-router-dom';

interface IProps {
    to: string,
    className?: string,
    secondary?: boolean
}

class Button extends Component<IProps> {
    render() {
        var buttonStyle: string = this.props.className ? this.props.className + " " : ""
        if (this.props.secondary) {
            buttonStyle += "secondary"
        }
        return (
            <Link to={this.props.to} id="button" className={buttonStyle}>
                {this.props.children}
            </Link>
        );
    }
}

export default Button;