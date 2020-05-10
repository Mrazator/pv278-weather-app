import React, { Component } from 'react';
import Loader from 'react-loader-spinner'

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
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
                    style={{ background: 'grey', padding: 0 }}
                >
                    <Loader
                        type="ThreeDots"
                        color="white"
                        height={30}
                        width={30}
                    />
                </Link>
            )
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