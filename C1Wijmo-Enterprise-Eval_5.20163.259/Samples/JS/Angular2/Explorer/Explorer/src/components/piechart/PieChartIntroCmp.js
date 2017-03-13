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
var wjcChart = require('wijmo/wijmo.chart');
'use strict';
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var DataSvc_1 = require('../../services/DataSvc');
var PieChartBaseCmp_1 = require('./PieChartBaseCmp');
var wijmo_angular2_chart_1 = require('wijmo/wijmo.angular2.chart');
var wijmo_angular2_input_1 = require('wijmo/wijmo.angular2.input');
// PieChart Introduction sample component.
var PieChartIntroCmp = (function (_super) {
    __extends(PieChartIntroCmp, _super);
    function PieChartIntroCmp(dataSvc) {
        _super.call(this, dataSvc);
        this.pal = 0;
        this.palettes = ['standard', 'cocoa', 'coral', 'dark', 'highcontrast', 'light', 'midnight', 'minimal', 'modern', 'organic', 'slate'];
        this.labels = 0;
        this.lblBorder = false;
    }
    PieChartIntroCmp.prototype.getPalette = function (palIdx) {
        return wjcChart.Palettes[this.palettes[palIdx]];
    };
    PieChartIntroCmp.prototype.hasLabels = function () {
        var chart = this.chart;
        return chart && chart.dataLabel.position != 0;
    };
    ;
    __decorate([
        core_1.ViewChild('chart')
    ], PieChartIntroCmp.prototype, "chart", void 0);
    PieChartIntroCmp = __decorate([
        core_1.Component({
            selector: 'pie-chart-intro-cmp',
            templateUrl: 'src/components/piechart/pieChartIntroCmp.html'
        }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc))
    ], PieChartIntroCmp);
    return PieChartIntroCmp;
}(PieChartBaseCmp_1.PieChartBaseCmp));
exports.PieChartIntroCmp = PieChartIntroCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: PieChartIntroCmp }
]);
var PieChartIntroModule = (function () {
    function PieChartIntroModule() {
    }
    PieChartIntroModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, routing, wijmo_angular2_chart_1.WjChartModule, wijmo_angular2_input_1.WjInputModule],
            declarations: [PieChartIntroCmp],
        })
    ], PieChartIntroModule);
    return PieChartIntroModule;
}());
exports.PieChartIntroModule = PieChartIntroModule;
//# sourceMappingURL=PieChartIntroCmp.js.map