import React, { Component } from 'react';

import Header from 'app/components/header/Header';
import Tile from 'app/components/tile/Tile';
import ActionArea from 'app/components/action-area/ActionArea';
import SearchForm from 'app/components/search-form/SearchForm';
import GraphTile from 'app/components/graph-tile/GraphTile';

import { IDashBoardState, IProcessedData } from 'app/views/dashboard/IDashBoard';

import { getDiffInDays } from 'app/util/utils';
import { API_KEY, API_URI, PRECIPITATION, SNOW, SUNSHINE } from 'app/util/api';

class Dashboard extends Component<{}, IDashBoardState> {
    state: IDashBoardState;

    constructor(props: any) {
        super(props)

        this.state = {
            search: {
                ...this.getDefaultSearchDate()
            },
            rawData: {
                precipitation: [],
                sunshine: [],
                snow: []
            },
            processedData: {
                precipitation: [],
                sunshine: [],
                snow: []
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

        await this.processData()
    }

    render() {
        const { rawData, search, processedData } = this.state;

        const isLoading = rawData.precipitation.length === 0 || rawData.sunshine.length === 0 || rawData.snow.length === 0

        const dashBoardData = isLoading // add some loading animation
            ? <h2>...</h2>
            : (
                <>
                    <Tile title={`Probability of a rain`}>
                        <GraphTile data={processedData.precipitation} />
                    </Tile>
                    <Tile title="Probability of a snow">
                        <GraphTile data={processedData.snow} />
                    </Tile>
                    <Tile title="Probability of a sunshine">
                        <GraphTile data={processedData.sunshine} />
                    </Tile>
                </>
            )

        return (
            <div id="dashboard">
                <Header />
                <ActionArea>
                    <Tile>
                        <SearchForm
                            {...search}
                            disabled={isLoading}
                            onHandleChange={this.onSearchChangeValue}
                            onShowWeather={this.processData}
                        />
                    </Tile>
                    {dashBoardData}
                </ActionArea>
            </div>
        );
    }

    getDefaultSearchDate() {
        const today = new Date()
        const weekAfter = new Date()
        weekAfter.setDate(weekAfter.getDate() + 7)

        return {
            from: today,
            to: weekAfter
        }
    }

    onSearchChangeValue(key: string, value: string) {
        this.setState({
            search: {
                ...this.state.search,
                [key]: new Date(value),
            }
        })
    }

    async getData() {
        const headers: any = {
            "x-apikey": API_KEY,
        }

        // very bad server performance
        const [precipitation, snow, sunshine] = await Promise.all([
            fetch(`${API_URI}/${PRECIPITATION}`, { headers }).then((x: any) => x.json()),
            fetch(`${API_URI}/${SNOW}`, { headers }).then(x => x.json()),
            fetch(`${API_URI}/${SUNSHINE}`, { headers }).then(x => x.json())
        ])

        return {
            precipitation,
            snow,
            sunshine
        }
    }

    // To-do: some validation of search params
    async processData() {
        const { rawData, search } = this.state;
        const processedData = await this.getProcessedData(rawData, search)

        this.setState({
            ...this.state,
            processedData
        })
    }

    // To-do: worker?
    async getProcessedData(rawData: any, search: any): Promise<any> {
        const result: any = {}
        
        const from = new Date(search.from.getTime())
        from.setDate(search.from.getDate() - 1)

        const to = new Date(search.to.getTime())
        to.setDate(search.to.getDate() + 1)

        for (const key of Object.keys(rawData)) {
            const monthlyData = rawData[key]
                .filter((x: any) => x.month - 1 >= from.getMonth() || x.month - 1 <= to.getMonth());

            console.log(monthlyData)
            const daysDiff = getDiffInDays(from, to);

            const processedData: IProcessedData[] = []
            let currentDate = new Date(from.getTime())

            for (let i = 0; i < daysDiff; i++) {
                let numOfRecords = 0

                const daySum = monthlyData.reduce((prev: any, curr: any) => {
                    if (curr.month - 1 === currentDate.getMonth()) {
                        numOfRecords++;
                        let happenedOrNot = 0;

                        if (curr[currentDate.getDate()]) {
                            happenedOrNot = 1
                        }

                        return prev + happenedOrNot //adding binary value, whether the event happened=1 or did not happen=0 it was i.e raining or not
                    }

                    return prev
                }, 0)

                processedData.push({
                    date: currentDate.toUTCString(),
                    probability: Math.round(daySum / numOfRecords * 100),
                })

                // reset
                currentDate.setDate(currentDate.getDate() + 1)
                numOfRecords = 0
            }

            result[key] = processedData
        }

        return result
    }
}

export default Dashboard;