import React, { Component } from 'react';
import "./Button.scss";
import { Link } from 'react-router-dom';

interface IProps {
    to: string,
    disabled?: boolean,
    className?: string,
    secondary?: boolean,
    onClick?: () => Promise<void>
}

class Button extends Component<IProps> {
    render() {
        var buttonStyle: string = this.props.className ? this.props.className + " " : ""
        if (this.props.secondary) {
            buttonStyle += "secondary"
        }

        return this.props.disabled
            ? (
                <Link
                    to="#"
                    onClick={this.props.onClick}
                    id="button"
                    className={buttonStyle}
                    style={{ background: 'grey' }}
                >
                    Loading weather data...
                </Link>)
            : (
                <Link
                    to={this.props.to
                    }
                    onClick={this.props.onClick}
                    id="button"
                    className={buttonStyle}
                >
                    {this.props.children}
                </Link>
            );
    }
}

export default Button;