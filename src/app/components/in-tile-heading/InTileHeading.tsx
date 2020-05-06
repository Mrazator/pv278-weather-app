import React, { Component } from 'react';
import "./InTileHeading.scss";

class InTileHeading extends Component {
    render() {
        return (
            <div className="in-tile-heading">
                <span>{this.props.children}</span>
            </div>
        );
    }
}

export default InTileHeading;