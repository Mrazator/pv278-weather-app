import React, { Component } from 'react';
import Header from 'app/components/header/Header';
import Tile from 'app/components/tile/Tile';
import ActionArea from 'app/components/action-area/ActionArea';
import SearchForm from 'app/components/search-form/SearchForm';
import GraphTile from 'app/components/graph-tile/GraphTile';

class Dashboard extends Component<{}, {}> {
    render() {
        return (
            <div id="dashboard">
                <Header />
                <ActionArea>
                    <Tile>
                        <SearchForm />
                    </Tile>
                    <Tile title="Next 7 days">
                        <GraphTile />
                    </Tile>
                </ActionArea>
            </div>
        );
    }
}

export default Dashboard;