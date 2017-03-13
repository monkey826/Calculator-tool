"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
'use strict';
var core_1 = require('@angular/core');
var DataSvc_1 = require('./../services/DataSvc');
//TrendLines sample component
var TrendLinesCmp = (function () {
    function TrendLinesCmp(dataSvc) {
        var _this = this;
        this.periodChanged = function (input) {
            if (input.value < input.min || input.value > input.max) {
                return;
            }
            _this.movingAveragePeriod = input.value;
        };
        this.data = [];
        this.dataSvc = dataSvc;
        this.setDataSource();
        this.header = 'Facebook, Inc. (FB)';
        this.movingAveragePeriod = 2;
        this.movingAverageType = 'Simple';
        this.movingAverageName = 'Simple Moving Average';
    }
    TrendLinesCmp.prototype.changeType = function (maMenu) {
        this.movingAverageName = maMenu.selectedValue + ' Moving Average';
    };
    TrendLinesCmp.prototype.setDataSource = function () {
        var _this = this;
        this.dataSvc.getData().subscribe(function (data) {
            _this.data = data;
        });
    };
    TrendLinesCmp = __decorate([
        core_1.Component({
            selector: 'trend-lines-cmp',
            templateUrl: 'src/components/TrendLinesCmp.html' }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc))
    ], TrendLinesCmp);
    return TrendLinesCmp;
}());
exports.TrendLinesCmp = TrendLinesCmp;
//# sourceMappingURL=TrendLinesCmp.js.map