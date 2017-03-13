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
var wjcCore = require('wijmo/wijmo');
'use strict';
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var wijmo_angular2_input_1 = require('wijmo/wijmo.angular2.input');
var wijmo_angular2_chart_1 = require('wijmo/wijmo.angular2.chart');
var wijmo_angular2_chart_finance_1 = require('wijmo/wijmo.angular2.chart.finance');
var wijmo_angular2_chart_finance_analytics_1 = require('wijmo/wijmo.angular2.chart.finance.analytics');
var DataSvc_1 = require('./../../services/DataSvc');
var TooltipSvc_1 = require('./../../services/TooltipSvc');
//Indicators sample component
var IndicatorsCmp = (function () {
    function IndicatorsCmp(dataSvc, tooltipSvc) {
        this.data = [];
        this.dataSvc = dataSvc;
        this.tooltipSvc = tooltipSvc;
        this.dataList = dataSvc.getDataList();
        this.indicators = dataSvc.getIndicatorList();
        this.selectedSymbol = this.dataList[0].symbol;
        this.selectedIndicator = this.indicators[0].abbreviation;
        this.setDataSource();
        this.title = 'Indicators';
        this.properties = {
            // ATR, CCI, RSI, Williams %R
            atrPeriod: 14,
            cciPeriod: 20,
            rsiPeriod: 14,
            williamsRPeriod: 14,
            // MACD
            fastPeriod: 12,
            slowPeriod: 26,
            smoothingPeriod: 9,
            macdStyles: {
                macdLine: {
                    stroke: '#bfa554'
                },
                signalLine: {
                    stroke: '#bf8c54'
                }
            },
            // Fast Stochastic
            stochKPeriod: 14,
            stochDPeriod: 3,
            stochSmoothingPeriod: 1,
            stochStyles: {
                kLine: {
                    stroke: '#eddd46'
                },
                dLine: {
                    stroke: '#edb747'
                }
            }
        };
    }
    IndicatorsCmp.prototype.selectedSymbolChanged = function (s, e) {
        this.setDataSource();
    };
    IndicatorsCmp.prototype.chartRendered = function (s, e) {
        var tooltip = this.tooltipSvc.getFinancialTooltip;
        // customize tooltips
        if (this.chart) {
            this.chart.tooltip.content = tooltip;
        }
        if (this.indicatorChart) {
            this.indicatorChart.tooltip.content = tooltip;
        }
        if (this.chart && this.indicatorChart && !isNaN(this.chart.axisX.actualMax)
            && !isNaN(this.chart.axisX.actualMin)) {
            this.indicatorChart.axisX.max = this.chart.axisX.actualMax;
            this.indicatorChart.axisX.min = this.chart.axisX.actualMin;
        }
    };
    IndicatorsCmp.prototype.fastSlowPeriodChanged = function () {
        var data = this.data, props = this.properties, len, smoothing;
        if (data.length <= 0) {
            return;
        }
        len = data.length;
        smoothing = props.smoothingPeriod;
        props.fastPeriod = wjcCore.clamp(props.fastPeriod, 2, Math.abs(len - smoothing));
        props.slowPeriod = wjcCore.clamp(props.slowPeriod, 2, Math.abs(len - smoothing));
    };
    IndicatorsCmp.prototype.smoothingPeriodChanged = function () {
        var data = this.data, props = this.properties, len, max;
        if (data.length <= 0) {
            return;
        }
        len = data.length;
        max = Math.max(props.fastPeriod, props.slowPeriod);
        props.smoothingPeriod = wjcCore.clamp(props.smoothingPeriod, 2, Math.abs(len - max));
    };
    IndicatorsCmp.prototype.stochKPeriodChanged = function () {
        var data = this.data, props = this.properties, len, max;
        if (data.length <= 0) {
            return;
        }
        len = data.length;
        max = Math.abs(len - props.stochDPeriod);
        if (props.stochSmoothingPeriod > 1) {
            max -= props.stochSmoothingPeriod;
        }
        props.stochKPeriod = wjcCore.clamp(props.stochKPeriod, 2, max);
    };
    IndicatorsCmp.prototype.stochDPeriodChanged = function () {
        var data = this.data, props = this.properties, len, max;
        if (data.length <= 0) {
            return;
        }
        len = data.length;
        max = Math.abs(len - props.stochKPeriod);
        if (props.stochSmoothingPeriod > 1) {
            max -= props.stochSmoothingPeriod;
        }
        props.stochDPeriod = wjcCore.clamp(props.stochDPeriod, 2, max);
    };
    IndicatorsCmp.prototype.stochSmoothingPeriodChanged = function () {
        var data = this.data, props = this.properties, len, max;
        if (data.length <= 0 || props.stochSmoothingPeriod <= 1) {
            return;
        }
        len = data.length;
        max = Math.abs(len - props.stochKPeriod - props.stochDPeriod);
        max = max || 1;
        props.stochSmoothingPeriod = wjcCore.clamp(props.stochSmoothingPeriod, 1, max);
    };
    IndicatorsCmp.prototype.setDataSource = function () {
        var _this = this;
        var symbol = this.selectedSymbol;
        this.dataSvc.getData(symbol).subscribe(function (data) {
            _this.data = data;
        });
    };
    IndicatorsCmp.prototype.atrPeriodChanged = function (input) {
        if (input.value < input.min || input.value > input.max) {
            return;
        }
        this.properties.atrPeriod = input.value;
    };
    IndicatorsCmp.prototype.rsiPeriodChanged = function (input) {
        if (input.value < input.min || input.value > input.max) {
            return;
        }
        this.properties.rsiPeriod = input.value;
    };
    IndicatorsCmp.prototype.cciPeriodChanged = function (input) {
        if (input.value < input.min || input.value > input.max) {
            return;
        }
        this.properties.cciPeriod = input.value;
    };
    IndicatorsCmp.prototype.wrPeriodChanged = function (input) {
        if (input.value < input.min || input.value > input.max) {
            return;
        }
        this.properties.williamsRPeriod = input.value;
    };
    __decorate([
        core_1.ViewChild('chart')
    ], IndicatorsCmp.prototype, "chart", void 0);
    __decorate([
        core_1.ViewChild('indicatorChart')
    ], IndicatorsCmp.prototype, "indicatorChart", void 0);
    IndicatorsCmp = __decorate([
        core_1.Component({
            selector: 'indicators-cmp',
            templateUrl: 'src/components/analytics/IndicatorsCmp.html',
        }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc)),
        __param(1, core_1.Inject(TooltipSvc_1.TooltipSvc))
    ], IndicatorsCmp);
    return IndicatorsCmp;
}());
exports.IndicatorsCmp = IndicatorsCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: IndicatorsCmp }
]);
var IndicatorsModule = (function () {
    function IndicatorsModule() {
    }
    IndicatorsModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, routing,
                wijmo_angular2_input_1.WjInputModule, wijmo_angular2_chart_1.WjChartModule, wijmo_angular2_chart_finance_1.WjChartFinanceModule, wijmo_angular2_chart_finance_analytics_1.WjChartFinanceAnalyticsModule],
            declarations: [IndicatorsCmp],
        })
    ], IndicatorsModule);
    return IndicatorsModule;
}());
exports.IndicatorsModule = IndicatorsModule;
//# sourceMappingURL=IndicatorsCmp.js.map