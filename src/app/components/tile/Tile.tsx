import React, { Component } from 'react';
import "./Tile.scss"

interface IProps {
    title?: string
}

class Tile extends Component<IProps> {
    render() {
        return (
            <div className="segment">
                {this.props.title && <span className="title">{this.props.title}</span>}
                <div className="tile">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Tile;