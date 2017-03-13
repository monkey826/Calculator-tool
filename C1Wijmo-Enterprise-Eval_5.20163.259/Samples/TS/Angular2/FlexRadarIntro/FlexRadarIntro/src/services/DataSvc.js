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
    DataSvc.prototype.getData = function () {
        var data = [], countries = 'US,Germany,UK,Japan,Italy,Greece'.split(',');
        // populate itemsSource
        for (var i = 0; i < countries.length; i++) {
            data.push({
                country: countries[i],
                downloads: Math.ceil(Math.random() * 80) + 20,
                sales: Math.ceil(Math.random() * 80) + 20
            });
        }
        return data;
    };
    DataSvc.prototype.getPolarData = function () {
        var data = [], len = 360;
        // populate itemsSource
        for (var i = 0; i <= len; i += 10) {
            data.push({
                longitude: i,
                latitude1: Math.ceil(Math.random() * 30) + 60,
                latitude2: Math.ceil(Math.random() * 30) + 30
            });
        }
        return data;
    };
    DataSvc = __decorate([
        core_1.Injectable()
    ], DataSvc);
    return DataSvc;
}());
exports.DataSvc = DataSvc;
//# sourceMappingURL=DataSvc.js.map