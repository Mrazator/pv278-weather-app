import React, { Component, ReactNode } from 'react';
import "./Tile.scss"

interface IProps {
    title?: ReactNode,
    underTile?: ReactNode
}

class Tile extends Component<IProps> {
    render() {
        return (
            <div className="segment">
                {this.props.title && <span className={`title${this.props.underTile ? ' top' : ''}`}>{this.props.title}</span>}
                {this.props.underTile ?
                    <div className="tile under">
                        {this.props.underTile}
                    </div> : null
                }
                <div className={`tile${this.props.underTile ? ' top' : ''}`}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Tile;
