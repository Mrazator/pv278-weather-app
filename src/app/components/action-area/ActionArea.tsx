import React, { Component } from 'react';
import "./ActionArea.scss"

class ActionArea extends Component {
    render() {
        return (
            <div className="action-area">
                {this.props.children}
            </div>
        );
    }
}

export default ActionArea;