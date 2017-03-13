var MixedChartTypes = React.createClass({
    render: function () {
        return React.createElement("div", null, 
            React.createElement("h2", null, "Mixed Chart Types"), 
            React.createElement("p", null, 
                "You can use different chart types for each chart series by setting the ", 
                React.createElement("b", null, "chartType"), 
                "property on the series itself. This overrides the chart's default chart type."), 
            React.createElement("p", null, 
                "In the example below, the chart's ", 
                React.createElement("b", null, "chartType"), 
                " property is set to ", 
                React.createElement("b", null, "Column"), 
                "," + ' ' + "but the ", 
                React.createElement("b", null, "Downloads"), 
                " series overrides that to use the ", 
                React.createElement("b", null, "LineAndSymbol"), 
                "chart type:"), 
            React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "col-md-6"}, 
                    React.createElement("div", null, 
                        React.createElement("ul", {className: "nav nav-tabs", role: "tablist"}, 
                            React.createElement("li", {className: "active"}, 
                                React.createElement("a", {href: "#mctJsx", role: "tab", "data-toggle": "tab"}, "JSX")
                            ), 
                            React.createElement("li", null, 
                                React.createElement("a", {href: "#mctJs", role: "tab", "data-toggle": "tab"}, "JS")
                            )), 
                        React.createElement("div", {className: "tab-content"}, 
                            React.createElement("div", {className: "tab-pane active pane-content", id: "mctJsx"}, 
                                '<Wj.FlexChart\n', 
                                '    itemsSource={ Util.getData() } \n', 
                                '    bindingX="country"\n', 
                                '    series={[\n', 
                                '        { name: \'Sales\', binding: \'sales\' },\n', 
                                '        { name: \'Expenses\', binding: \'expenses\' },\n', 
                                '        { name: \'Downloads\', binding: \'downloads\', chartType: \'LineSymbols\' }\n', 
                                '    ]} />'), 
                            React.createElement("div", {className: "tab-pane pane-content", id: "mctJs"}, 
                            // no code required
                            "// no code required")))
                ), 
                React.createElement("div", {className: "col-md-6"}, 
                    React.createElement("h4", null, "Result (live):"), 
                    React.createElement(Wj.FlexChart, {itemsSource: Util.getData(), bindingX: "country", series: [
                        { name: 'Sales', binding: 'sales' },
                        { name: 'Expenses', binding: 'expenses' },
                        { name: 'Downloads', binding: 'downloads', chartType: 'LineSymbols' }
                    ]}))));
    }
});
//# sourceMappingURL=MixedChartTypes.js.map