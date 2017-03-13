'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
// Common data service
var DataSvc = (function () {
    function DataSvc() {
    }
    // data used to generate random items
    DataSvc.prototype.getData = function (countries) {
        var data = [];
        for (var i = 0; i < countries.length; i++) {
            data.push({
                country: countries[i],
                downloads: Math.round(Math.random() * 20000),
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000
            });
        }
        return data;
    };
    ;
    DataSvc.prototype.getFunnelData = function (countries) {
        var data = [], sales = 10000;
        for (var i = 0; i < countries.length; i++) {
            data.push({
                country: countries[i],
                sales: sales
            });
            sales = sales - Math.round(Math.random() * 2000);
        }
        return data;
    };
    ;
    DataSvc.prototype.getBoxData = function (countries) {
        var data = [], d = function () {
            return Math.round(Math.random() * 100);
        };
        for (var i = 0; i < countries.length; i++) {
            data.push({
                country: countries[i],
                downloads: [d(), d(), d(), d(), d(), d(), d(), d(), d(), d(), d(), d()],
                sales: [d(), d(), d(), d(), d(), d(), d(), d(), d(), d(), d()],
                expenses: [d(), d(), d(), d(), d(), d(), d(), d(), d(), d(), d(), d(), d()]
            });
        }
        return data;
    };
    ;
    DataSvc = __decorate([
        core_1.Injectable()
    ], DataSvc);
    return DataSvc;
}());
exports.DataSvc = DataSvc;
//# sourceMappingURL=DataSvc.js.map