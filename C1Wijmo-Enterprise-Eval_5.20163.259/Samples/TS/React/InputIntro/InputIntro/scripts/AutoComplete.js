var AutoComplete = React.createClass({
    getInitialState: function () {
        var countries = Util.getCountries();
        return {
            countries: countries,
            country: countries[0]
        };
    },
    // Wijmo event handlers
    countryChanged: function (s, e) {
        this.setState({ country: s.text });
    },
    render: function () {
        return React.createElement("div", null, 
            React.createElement("h2", null, "AutoComplete"), 
            React.createElement("p", null, "The AutoComplete control is a word completion control that allows you to filter its" + ' ' + "item list as you type, as well as select a value directly from its drop-down list."), 
            React.createElement("p", null, 
                "To use the AutoComplete control, you must minimally set the ", 
                React.createElement("b", null, "itemsSource"), 
                " property" + ' ' + "to an array of data in order to populate its item list. The AutoComplete" + ' ' + "control also offers several other properties to alter its behavior, such as" + ' ' + "the ", 
                React.createElement("b", null, "cssMatch"), 
                " property.The ", 
                React.createElement("b", null, "cssMatch"), 
                " property allows you to specify the" + ' ' + "CSS class that is used to highlight parts of the content that match your search terms."), 
            React.createElement("p", null, 
                "The example below uses an array of strings to populate the AutoComplete control's" + ' ' + "item list using the ", 
                React.createElement("b", null, "itemsSource"), 
                " property.To see a list of suggestions," + ' ' + "type ", 
                React.createElement("b", null, "\"ab\""), 
                " or ", 
                React.createElement("b", null, "\"za\""), 
                " in the AutoComplete controls below."), 
            React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "col-md-6"}, 
                    React.createElement("div", null, 
                        React.createElement("ul", {className: "nav nav-tabs", role: "tablist"}, 
                            React.createElement("li", {className: "active"}, 
                                React.createElement("a", {href: "#acJsx", role: "tab", "data-toggle": "tab"}, "JSX")
                            ), 
                            React.createElement("li", null, 
                                React.createElement("a", {href: "#acJs", role: "tab", "data-toggle": "tab"}, "JS")
                            )), 
                        React.createElement("div", {className: "tab-content"}, 
                            React.createElement("div", {className: "tab-pane active pane-content", id: "acJsx"}, 
                                '<div className="app-input-group">\n', 
                                '    <label htmlFor="ac1">itemsSource Only: </label>\n', 
                                '    <Wj.AutoComplete id="ac1"\n', 
                                '        itemsSource={ this.state.countries }\n', 
                                '        text={ this.state.country }\n', 
                                '        textChanged={ this.countryChanged }/>\n', 
                                '</div>\n', 
                                '<div className="app-input-group">\n', 
                                '    <label htmlFor="ac2">itemsSource &amp; cssMatch: </label>\n', 
                                '    <Wj.AutoComplete id="ac2"\n', 
                                '        itemsSource={ this.state.countries }\n', 
                                '        cssMatch="highlight"\n', 
                                '        text={ this.state.country }\n', 
                                '        textChanged={ this.countryChanged }/>\n', 
                                '</div>\n', 
                                '<p>\n', 
                                '    <b>Selected Country: { this.state.country }</b>\n', 
                                '</p>'), 
                            React.createElement("div", {className: "tab-pane pane-content", id: "acJs"}, 
                                'getInitialState: function () {\n', 
                                '    var countries = Util.getCountries();\n', 
                                '    return {\n', 
                                '        countries: countries,\n', 
                                '        country: countries[0]\n', 
                                '    }\n', 
                                '},\n', 
                                '\n', 
                                '// Wijmo event handlers\n', 
                                'countryChanged: function (s, e) {\n', 
                                '    this.setState({ country: s.text });\n', 
                                '}')))
                ), 
                React.createElement("div", {className: "col-md-6"}, 
                    React.createElement("h4", null, "Result (live):"), 
                    React.createElement("div", {className: "app-input-group"}, 
                        React.createElement("label", {htmlFor: "ac1"}, "itemsSource Only: "), 
                        React.createElement(Wj.AutoComplete, {id: "ac1", itemsSource: this.state.countries, text: this.state.country, textChanged: this.countryChanged})), 
                    React.createElement("div", {className: "app-input-group"}, 
                        React.createElement("label", {htmlFor: "ac2"}, "itemsSource & cssMatch: "), 
                        React.createElement(Wj.AutoComplete, {id: "ac2", itemsSource: this.state.countries, cssMatch: "highlight", text: this.state.country, textChanged: this.countryChanged})), 
                    React.createElement("p", null, 
                        React.createElement("b", null, 
                            "Selected Country: ", 
                            this.state.country)
                    ))));
    }
});
//# sourceMappingURL=AutoComplete.js.map