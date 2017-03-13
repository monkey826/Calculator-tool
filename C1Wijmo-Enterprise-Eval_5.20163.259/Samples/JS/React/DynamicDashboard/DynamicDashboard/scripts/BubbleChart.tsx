﻿declare var React: any;

var BubbleChart = React.createClass({
    render: function () {
        return <Wj.FlexChart
            chartType="Bubble"
            itemsSource={this.props.data}
            bindingX="date"
            axisX={{ format: 'MMM-yy' }}
            axisY={{ title: 'Sales (Bubble size indicates profit)' }}
            legend={{ position: 'None' }}
            series={[
                { name: 'Sales/Profit', binding: 'sales,profit' }
            ]} />
    }
});