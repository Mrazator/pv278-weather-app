import React, { Component } from 'react';

interface IProps {
    className: string
}

class Arrow extends Component<IProps> {
    render() {
        return (
            <svg className={this.props.className} style={{ width: "25px", height: "25px" }} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                <path d="M7 10l5 5 5-5z" />
                <path d="M0 0h24v24H0z" fill="none" />
            </svg>
        );
    }
}

export default Arrow;
