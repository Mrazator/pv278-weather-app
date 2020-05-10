import React, { Component } from 'react';
import "./GraphTile.scss";
import { Chart } from "react-google-charts";
import { IProcessedData } from 'app/views/dashboard/Dashboard';

interface IGraphTileProps {
    data: IProcessedData[]
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
                        ['Day', 'Sunshine'],
                        ...transformedData
                    ]}
                options={{
                    areaOpacity: 1,
                    colors: ['#00A991'],
                    // legend: 'none',
                    chartArea: { width: '100%', height: '80%' },
                    vAxis: { textPosition: 'in' },
                    hAxis: { textStyle: { fontName: 'Roboto', bold: true } },
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

/*
<!DOCTYPE html>
<html lang="en-US">
<body>

<h1>My Web Page</h1>

<div id="piechart"></div>

<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

<script type="text/javascript">
// Load google charts
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

// Draw the chart and set the chart values
function drawChart() {
  var data = google.visualization.arrayToDataTable([
  ['Day', 'Rain per Day'],
  ['Mo', 1],
  ['Tu', 0.5],
  ['We', 0.02],
  ['Th', 0.09],
  ['Fr', 0.15],
  ['Sa', 0.6],
  ['Su', 0.9],
]);

  // Optional; add a title and set the width and height of the chart
  var options = {'title':'My Average Day', 'width':550, 'height':400, 'lineWidth': 1, 'areaOpacity': 1, 'colors': ['#F3C'], 'vAxis': {'maxValue': 1, 'ticks': [0, 0.5, 1], 'format': 'percent'}, 'legend': {'position': 'none'}};

  // Display the chart inside the <div> element with id="piechart"
  var chart = new google.visualization.AreaChart(document.getElementById('piechart'));
  chart.draw(data, options);
}
</script>

</body>
</html>

*/