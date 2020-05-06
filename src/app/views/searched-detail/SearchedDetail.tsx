import React, { Component } from 'react';
import Header from 'app/components/header/Header';
import { RouteComponentProps } from 'react-router-dom';
import SearchForm from 'app/components/search-form/SearchForm';
import Tile from 'app/components/tile/Tile';
import "./SearchedDetail.scss";
import ActionArea from 'app/components/action-area/ActionArea';
import GraphTile from 'app/components/graph-tile/GraphTile';
import InTileHeading from 'app/components/in-tile-heading/InTileHeading';

class SearchedDetail extends Component<RouteComponentProps> {
    render() {
        return (
            <div id="searched-detail">
                <Header history={this.props.history} path={this.props.location.pathname} />
                <ActionArea>
                    <Tile>
                        <SearchForm />
                    </Tile>
                    <Tile>
                        <InTileHeading>Rainy days: 2</InTileHeading>
                    </Tile>
                    <Tile>
                        <InTileHeading>Sunny days: 2</InTileHeading>
                    </Tile>
                    <Tile>
                        <InTileHeading>Snowy days: 2</InTileHeading>
                    </Tile>
                    <Tile title="Probability of Rain">
                        <GraphTile />
                    </Tile>
                    <Tile title="Last Year Rain Condition">
                        <GraphTile />
                    </Tile>
                </ActionArea>
            </div>
        );
    }
}

export default SearchedDetail;