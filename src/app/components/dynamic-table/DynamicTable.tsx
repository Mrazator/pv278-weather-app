import React, { Component } from 'react';
import "./DynamicTable.scss";

interface IProps {
    title: string,
    tableRows: IRow[],
    sortBy: (currentSort: Column) => void
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
        return (
            <div className="dynamic-table">
                <span className="title">{this.props.title}</span>
                <table cellSpacing="5px">
                    <thead>
                        <tr>
                            <th onClick={() => this.props.sortBy(Column.DAY)}>{Column.DAY}</th>
                            <th onClick={() => this.props.sortBy(Column.PRECIPITATION)}>{Column.PRECIPITATION}</th>
                            <th onClick={() => this.props.sortBy(Column.SUNSHINE)}>{Column.SUNSHINE}</th>
                            <th onClick={() => this.props.sortBy(Column.SNOW)}>{Column.SNOW}</th>
                        </tr>
                    </thead >
                    <tbody>
                        {this.displayRecords(this.props.tableRows)}
                    </tbody>
                </table >
            </div >
        );
    }
}

export default DynamicTable;