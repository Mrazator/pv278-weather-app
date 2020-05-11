import React, { Component } from 'react';

import Header from 'app/components/header/Header';
import Tile from 'app/components/tile/Tile';
import ActionArea from 'app/components/action-area/ActionArea';
import SearchForm from 'app/components/search-form/SearchForm';
import GraphTile from 'app/components/graph-tile/GraphTile';

import { IDashBoardState, IProcessedData } from 'app/views/dashboard/IDashBoard';

import { getDiffInDays } from 'app/util/utils';
import { API_KEY, API_URI, PRECIPITATION, SNOW, SUNSHINE } from 'app/util/api';
import DynamicTable, { Column, IRow } from 'app/components/dynamic-table/DynamicTable';
import SearchDescription from 'app/components/search-description/SearchDescription';

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
            },
            table: {
                tableRows: [],
                sortedBy: Column.DAY
            }
        }

        this.getData = this.getData.bind(this)
        this.onSearchChangeValue = this.onSearchChangeValue.bind(this)
        this.processData = this.processData.bind(this)
        this.sortBy = this.sortBy.bind(this)
        this.getAverageValue = this.getAverageValue.bind(this)
        this.getTableRows = this.getTableRows.bind(this)
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

        const dashBoardData = !isLoading && (
            <>
                    <Tile title={`Probability of a rain`}>
                        <GraphTile data={processedData.precipitation} weatherDetailName="Rain" />
                    </Tile>
                    <Tile title="Probability of a snow">
                        <GraphTile data={processedData.snow} weatherDetailName="Snow" />
                    </Tile>
                    <Tile title="Probability of a sunshine">
                        <GraphTile data={processedData.sunshine} weatherDetailName="Sunshine" />
                    </Tile>
                    <DynamicTable
                        title="Average data"
                        tableRows={this.state.table.tableRows}
                        sortBy={this.sortBy}
                    />
                </>
        )

        return (
            <div id="dashboard">
                <Header />
                <ActionArea>
                    <Tile underTile={<SearchDescription />}>
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
        const tableRows = this.getTableRows(search.from, search.to)

        this.setState({
            ...this.state,
            processedData,
            table: {
                tableRows,
                sortedBy: Column.DAY
            }
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
                    probability: daySum / numOfRecords,
                })

                // reset
                currentDate.setDate(currentDate.getDate() + 1)
                numOfRecords = 0
            }

            result[key] = processedData
        }

        return result
    }

    // --------------------
    // TABLE METHODS
    // --------------------

    private sortBy(currentSort: Column): void {
        var tableRows = this.state.table.tableRows;
        if (currentSort === this.state.table.sortedBy) {
            tableRows.reverse()
            this.setState({
                ...this.state,
                table: {
                    tableRows,
                    sortedBy: currentSort
                }
            })
        } else {
            switch (currentSort) {
                case Column.DAY:
                    tableRows.sort((a: IRow, b: IRow) => {
                        return a.day < b.day ? -1 : 1;
                    })
                    break;
                case Column.PRECIPITATION:
                    tableRows.sort((a: IRow, b: IRow) => {
                        return a.precipitation - b.precipitation;
                    })
                    break;
                case Column.SNOW:
                    tableRows.sort((a: IRow, b: IRow) => {
                        return a.snow - b.snow;
                    })
                    break;
                case Column.SUNSHINE:
                    tableRows.sort((a: IRow, b: IRow) => {
                        return a.sunshine - b.sunshine;
                    })
                    break;
            }
            this.setState({
                ...this.state,
                table: {
                    tableRows,
                    sortedBy: currentSort
                }
            })
        }
    }

    private getAverageValue(rawData: any, date: Date): number {
        let value = 0;
        let data = rawData.filter((month: any) => {
            return month.month === date.getMonth() + 1
        });
        data.forEach((month: any) => {
            value += month[date.getDate()]
        })
        value /= data.length;
        return value;
    }

    private getTableRows(from: Date, to: Date): IRow[] {
        const table: IRow[] = []
        for (let index = 0; index <= getDiffInDays(from, to); index++) {
            let tmpDate = new Date(from)
            tmpDate.setDate(tmpDate.getDate() + index)

            table.push({
                day: tmpDate,
                precipitation: this.getAverageValue(this.state.rawData.precipitation, tmpDate),
                snow: this.getAverageValue(this.state.rawData.snow, tmpDate),
                sunshine: this.getAverageValue(this.state.rawData.sunshine, tmpDate)
            })
        }
        return table
    }
}

export default Dashboard;