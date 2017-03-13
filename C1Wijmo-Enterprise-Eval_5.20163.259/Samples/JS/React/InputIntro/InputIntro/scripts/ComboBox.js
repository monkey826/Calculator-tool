var ComboBox = React.createClass({
    getInitialState: function () {
        var countries = Util.getCountries();
        return {
            countries: countries
        };
    },
    render: function () {
        return React.createElement("div", null, 
            React.createElement("h2", null, "ComboBox"), 
            React.createElement("p", null, "The ComboBox control is very similar to the AutoComplete control, but rather than" + ' ' + "providing a list of suggestions as you type, the ComboBox will automatically complete" + ' ' + "and select the entry as you type."), 
            React.createElement("p", null, 
                "Like the AutoComplete control, you must minimally set the ComboBox's ", 
                React.createElement("b", null, "itemsSource"), 
                "property to an array of data in order to populate its item list. You may also want to" + ' ' + "specify whether the ComboBox is editable via the ", 
                React.createElement("b", null, "isEditable"), 
                " property. The", 
                React.createElement("b", null, "isEditable"), 
                " property determines whether or not a user can enter values that do" + ' ' + "not appear in the ComboBox's item list."), 
            React.createElement("p", null, 
                "The example below uses two ComboBoxes bound to the same data source as the AutoComplete" + ' ' + "control above. The first ComboBox's ", 
                React.createElement("b", null, "isEditable"), 
                " property is set to false, while the" + ' ' + "second ComboBox's ", 
                React.createElement("b", null, "isEditable"), 
                " property is set to true."), 
            React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "col-md-6"}, 
                    React.createElement("div", null, 
                        React.createElement("ul", {className: "nav nav-tabs", role: "tablist"}, 
                            React.createElement("li", {className: "active"}, 
                                React.createElement("a", {href: "#cbJsx", role: "tab", "data-toggle": "tab"}, "JSX")
                            ), 
                            React.createElement("li", null, 
                                React.createElement("a", {href: "#cbJs", role: "tab", "data-toggle": "tab"}, "JS")
                            )), 
                        React.createElement("div", {className: "tab-content"}, 
                            React.createElement("div", {className: "tab-pane active pane-content", id: "cbJsx"}, 
                                '<div className="app-input-group">\n', 
                                '    <label htmlFor="cmb1">Non-Editable: </label>\n', 
                                '    <Wj.ComboBox id="cmb1"\n', 
                                '        itemsSource={ this.state.countries }\n', 
                                '        isRequired={ false } />\n', 
                                '</div>\n', 
                                '<div className="app-input-group">\n', 
                                '    <label htmlFor="cmb2">Editable: </label>\n', 
                                '    <Wj.ComboBox id="cmb2"\n', 
                                '        itemsSource={ this.state.countries }\n', 
                                '        isRequired={ true } />\n', 
                                '</div>'), 
                            React.createElement("div", {className: "tab-pane pane-content", id: "cbJs"}, 
                                'getInitialState: function () {\n', 
                                '    var countries = Util.getCountries();\n', 
                                '    return {\n', 
                                '        countries: countries\n', 
                                '    }\n', 
                                '}')))
                ), 
                React.createElement("div", {className: "col-md-6"}, 
                    React.createElement("h4", null, "Result (live): "), 
                    React.createElement("div", {className: "app-input-group"}, 
                        React.createElement("label", {htmlFor: "cmb1"}, "Non-Editable: "), 
                        React.createElement(Wj.ComboBox, {id: "cmb1", itemsSource: this.state.countries, isEditable: false})), 
                    React.createElement("div", {className: "app-input-group"}, 
                        React.createElement("label", {htmlFor: "cmb2"}, "Editable: "), 
                        React.createElement(Wj.ComboBox, {id: "cmb2", itemsSource: this.state.countries, isEditable: true})))));
    }
});
//# sourceMappingURL=ComboBox.js.map