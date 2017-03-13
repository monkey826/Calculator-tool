"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var DataSvc_1 = require('../services/DataSvc');
var BindingFlexSheetBaseCmp_1 = require('./BindingFlexSheetBaseCmp');
var wijmo_angular2_grid_sheet_1 = require('wijmo/wijmo.angular2.grid.sheet');
var FilteringCmp = (function (_super) {
    __extends(FilteringCmp, _super);
    function FilteringCmp(dataSvc) {
        _super.call(this, dataSvc);
        this.filterEnable = false;
    }
    FilteringCmp.prototype.flexSheetInit = function (flexSheet) {
        _super.prototype.flexSheetInit.call(this, flexSheet);
        if (flexSheet) {
            this.filterEnable = !!flexSheet.itemsSource;
        }
    };
    // Show the column filter for the flexSheet control.
    FilteringCmp.prototype.showFilter = function () {
        if (this.flexSheet) {
            this.flexSheet.showColumnFilter();
        }
    };
    FilteringCmp = __decorate([
        core_1.Component({
            selector: 'filtering-cmp',
            templateUrl: 'src/components/filteringCmp.html',
        }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc))
    ], FilteringCmp);
    return FilteringCmp;
}(BindingFlexSheetBaseCmp_1.BindingFlexSheetBaseCmp));
exports.FilteringCmp = FilteringCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: FilteringCmp }
]);
var FilteringModule = (function () {
    function FilteringModule() {
    }
    FilteringModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, routing, wijmo_angular2_grid_sheet_1.WjGridSheetModule],
            declarations: [FilteringCmp],
        })
    ], FilteringModule);
    return FilteringModule;
}());
exports.FilteringModule = FilteringModule;
//# sourceMappingURL=FilteringCmp.js.map