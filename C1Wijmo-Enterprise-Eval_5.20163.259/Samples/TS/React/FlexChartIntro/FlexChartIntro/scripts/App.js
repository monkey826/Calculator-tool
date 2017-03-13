var App = React.createClass({
    render: function () {
        return React.createElement("div", null, 
            React.createElement("div", {className: "header"}, 
                React.createElement("div", {className: "container"}, 
                    React.createElement("img", {src: "resources/wijmo5.png", alt: "Wijmo 5"}), 
                    React.createElement("h1", null, "FlexChart 101 (React) "), 
                    React.createElement("p", null, "This page shows how to get started with Wijmo's FlexChart control."))
            ), 
            React.createElement("div", {className: "container"}, 
                React.createElement(GettingStarted, null), 
                React.createElement(ChartTypes, null), 
                React.createElement(MixedChartTypes, null), 
                React.createElement(LegendAndTitles, null), 
                React.createElement(Tooltips, null), 
                React.createElement(StylingSeries, null), 
                React.createElement(CustomizingAxes, null), 
                React.createElement(Theming, null), 
                React.createElement(SelectionModes, null), 
                React.createElement(ToggleSeries, null), 
                React.createElement(DynamicCharts, null)));
    }
});
//# sourceMappingURL=App.js.map