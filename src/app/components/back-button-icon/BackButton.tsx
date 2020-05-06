import React, { Component } from 'react';

interface IProps {
    onClick: () => void,
    size: string,
    fillColor: string
}

class BackButton extends Component<IProps> {
    render() {
        return (
            <div style={{width: this.props.size, height: this.props.size, cursor: "pointer"}}>
                <svg onClick={this.props.onClick} className="back-button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={this.props.fillColor} width={this.props.size} height={this.props.size}>
                    <path d="M14.71 15.88L10.83 12l3.88-3.88c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L8.71 11.3c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .38-.39.39-1.03 0-1.42z" />
                </svg>
            </div>
        );
    }
}

export default BackButton;