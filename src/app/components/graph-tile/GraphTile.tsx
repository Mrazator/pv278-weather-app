import React, { Component } from 'react';
import "./GraphTile.scss";
import { Chart } from "react-google-charts";

import { IProcessedData } from "app/views/dashboard/IDashBoard";

interface IGraphTileProps {
    data: IProcessedData[],
    weatherDetailName: string
}

class GraphTile extends Component<IGraphTileProps, {}> {
    render() {
        const transformedData = this.props.data.map(x => {
            const date: Date = new Date(x.date)

            return [`${date.getDate()}. ${date.getMonth() + 1}.`, x.probability]
        })

        return (
            <Chart
                width="95%"
                className="chart"
                chartType="AreaChart"
                data={
                    [
                        ['Day', this.props.weatherDetailName],
                        ...transformedData
                    ]}
                options={{
                    areaOpacity: 1,
                    colors: ['#5882CC'],
                    legend: 'none',
                    chartArea: { width: '100%', height: '80%' },
                    vAxis: { textPosition: 'in', format: 'percent', maxValue: 1, ticks: [0,0.5,1] },
                    hAxis: { textPosition: 'in', textStyle: { fontName: 'Roboto', bold: true, auraColor: '#F4F4F4', opacity: 0.8 } },
                    annotations: {
                        textStyle: {
                            fontName: 'Roboto'
                        }
                    }
                }}
            />
        );
    }
}

export default GraphTile;
