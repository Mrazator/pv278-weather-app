import React, { Component } from 'react';
import Header from 'app/components/header/Header';
import Tile from 'app/components/tile/Tile';
import ActionArea from 'app/components/action-area/ActionArea';
import SearchForm from 'app/components/search-form/SearchForm';
import GraphTile from 'app/components/graph-tile/GraphTile';
import { getDateString } from 'app/util/utils';
import InTileHeading from 'app/components/in-tile-heading/InTileHeading';

const API_URI = "https://munisun-d71a.restdb.io/rest"
const PRECIPITATION = "precipitation"
const API_KEY = "5df0aababf46220df655d9df"

export interface ISearchState {
    from: string,
    to: string,
}

interface IRawDataState {
    precipitation: any[]
}

interface IDashBoardState {
    search: ISearchState,
    rawData: IRawDataState
}

class Dashboard extends Component<{}, IDashBoardState> {
    constructor(props: any) {
        super(props)

        this.state = {
            search: {
                ...this.getDefaultSearchDate()
            },
            rawData: {
                precipitation: [],
            }
        }

        this.getData = this.getData.bind(this)
        this.onSearchChangeValue = this.onSearchChangeValue.bind(this)
        this.processData = this.processData.bind(this)
    }

    async componentDidMount() {
        this.setState({
            rawData: {
                ...await this.getData()
            }
        })
    }

    render() {
        return (
            <div id="dashboard">
                <Header />
                <ActionArea>
                    <Tile>
                        <SearchForm
                            {...this.state.search}
                            onHandleChange={this.onSearchChangeValue}
                            onShowWeather={this.processData}
                        />
                    </Tile>
                    {/* <Tile title="Next 7 days">
                        <GraphTile />
                    </Tile> */}
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

    getDefaultSearchDate() {
        const today = new Date()
        const weekAfter = new Date()
        weekAfter.setDate(weekAfter.getDate() + 7)

        return {
            from: getDateString(today),
            to: getDateString(weekAfter)
        }
    }

    onSearchChangeValue(key: string, value: string) {
        this.setState({
            search: {
                ...this.state.search,
                [key]: value,
            }
        })
    }

    async getData() {
        const headers = {
            "x-apikey": API_KEY
        }

        const precipitation = await fetch(`${API_URI}/${PRECIPITATION}`, {
            headers
        })

        return {
            precipitation: await precipitation.json()
        }
    }

    // To-do: some validation of search params
    async processData() {
        if (this.state.rawData.precipitation.length === 0) {
            return;
        }
        

        for(const monthlyData of this.state.rawData.precipitation) {
            const { _id, year, month, ...days } = monthlyData

            for(const day of Object.keys(days)) {
                const value = monthlyData[day]

                if(value > 40) {
                    console.log(value, day, month, month.year)
                }
            }
        }
        console.log(this.state.rawData.precipitation)
    }
}

export default Dashboard;