"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var wjcOdata = require('wijmo/wijmo.odata');
var wjcCore = require('wijmo/wijmo');
'use strict';
var core_1 = require('@angular/core');
// Common data service
var DataSvc = (function () {
    function DataSvc() {
        this.minInvoiceAmount = 2000;
    }
    DataSvc.prototype.initData = function () {
        var _this = this;
        var url = 'http://services.odata.org/V4/Northwind/Northwind.svc';
        this.products = new wjcOdata.ODataCollectionView(url, 'Products', {
            groupDescriptions: [
                new wjcCore.PropertyGroupDescription('ProductName', function (item, propName) {
                    var value = item[propName];
                    return value[0].toUpperCase();
                })
            ],
            sortDescriptions: ['ProductName'],
            loaded: function (s, e) {
                _this.viewLoaded();
            }
        });
        this.categories = new wjcOdata.ODataCollectionView(url, 'Categories', {
            fields: ['CategoryID', 'CategoryName', 'Description'],
            sortDescriptions: ['CategoryName'],
            loaded: function (s, e) {
                _this.viewLoaded();
            }
        });
        this.customers = new wjcOdata.ODataCollectionView(url, 'Customers', {
            sortDescriptions: ['CompanyName'],
            loaded: function (s, e) {
                _this.viewLoaded();
            }
        });
        this.minInvoiceAmount = 2000;
        this.invoices = new wjcOdata.ODataCollectionView(url, 'Invoices', {
            groupDescriptions: ['Country', 'Salesperson'],
            sortDescriptions: [
                new wjcCore.SortDescription('Country', true),
                new wjcCore.SortDescription('Salesperson', true),
                new wjcCore.SortDescription('ExtendedPrice', false)
            ],
            filterDefinition: 'ExtendedPrice ge ' + this.minInvoiceAmount,
            loaded: function (s, e) {
                _this.viewLoaded();
            }
        });
        this.employees = new wjcOdata.ODataCollectionView(url, 'Employees', {
            fields: ['EmployeeID', 'LastName', 'FirstName', 'Title', 'TitleOfCourtesy', 'BirthDate', 'HireDate', 'Address', 'City', 'Region', 'PostalCode', 'Country', 'HomePhone', 'Extension', 'Notes', 'ReportsTo'],
            groupDescriptions: ['Country', 'City'],
            sortDescriptions: ['Country', 'City'],
            loaded: function (s, e) {
                _this.viewLoaded();
            }
        });
        this.productSales = new wjcOdata.ODataCollectionView(url, 'Product_Sales_for_1997', {
            groupDescriptions: ['CategoryName'],
            sortDescriptions: ['CategoryName', 'ProductName'],
            loaded: function (s, e) {
                _this.viewLoaded();
            }
        });
    };
    // update scope after loading each view
    DataSvc.prototype.viewLoaded = function () {
        this.viewsLoaded = (this.viewsLoaded || 0) + 1;
        this.viewsLoadedFun();
    };
    DataSvc = __decorate([
        core_1.Injectable()
    ], DataSvc);
    return DataSvc;
}());
exports.DataSvc = DataSvc;
//# sourceMappingURL=DataSvc.js.map