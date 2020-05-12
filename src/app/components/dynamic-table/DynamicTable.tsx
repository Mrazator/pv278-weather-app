import React, { Component } from 'react';
import "./DynamicTable.scss";
import Arrow from '../icons/Arrow';

interface IProps {
    title: string,
    sortBy: (currentSort: Column) => void,
    tableState: ITableState
}

export interface IRow {
    day: Date,
    precipitation: number,
    sunshine: number,
    snow: number
}

export interface ITableState {
    tableRows: IRow[],
    sortedBy: Column,
    direction: string
}

export enum Column {
    DAY = "Day",
    PRECIPITATION = "Precipitation",
    SUNSHINE = "Sunshine",
    SNOW = "Snow"
}

class DynamicTable extends Component<IProps> {
    private displayRecords(data: IRow[]) {
        return data.map((row: IRow) =>
            <tr key={row.day.toISOString()}>
                <td>{row.day.getDate()}.{row.day.getMonth() + 1}.</td>
                <td>{row.precipitation.toFixed(2)} mm/hour</td>
                <td>{row.sunshine.toFixed(1)}</td>
                <td>{row.snow.toFixed(2)} mm/hour</td>
            </tr>
        )
    }

    render() {
        var columnHeaders = []
        for (let column in Column) {
            let c: Column = Column[column as keyof typeof Column];
            columnHeaders.push(
                <th onClick={() => this.props.sortBy(c)}>
                    <span className="table-head-text">{c}{this.props.tableState.sortedBy == c && <Arrow className={this.props.tableState.direction} />}</span>
                </th>
            )
        }
        return (
            <div className="dynamic-table">
                <span className="title">{this.props.title}</span>
                <table cellSpacing="5px">
                    <thead>
                        <tr>
                            {columnHeaders}
                        </tr>
                    </thead >
                    <tbody>
                        {this.displayRecords(this.props.tableState.tableRows)}
                    </tbody>
                </table >
            </div >
        );
    }
}

export default DynamicTable;
