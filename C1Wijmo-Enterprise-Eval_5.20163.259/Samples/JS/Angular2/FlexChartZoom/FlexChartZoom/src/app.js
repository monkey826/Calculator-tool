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
// Angular
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var platform_browser_1 = require('@angular/platform-browser');
var wijmo_angular2_chart_1 = require('wijmo/wijmo.angular2.chart');
var wijmo_angular2_input_1 = require('wijmo/wijmo.angular2.input');
var wijmo_angular2_chart_interaction_1 = require('wijmo/wijmo.angular2.chart.interaction');
var DataSvc_1 = require('./services/DataSvc');
'use strict';
// The FlexChartZoom application root component.
var AppCmp = (function () {
    function AppCmp(dataSvc) {
        var _this = this;
        dataSvc.getData().subscribe(function (data) {
            _this.data = data;
            setTimeout(function () {
                _this.chartGestures.posX = 0.1;
                _this.chartGestures.posY = 0.1;
                _this.chartGestures.scaleX = 0.5;
                _this.chartGestures.scaleY = 0.5;
            }, 100);
        });
        this.mouseAction = 'Zoom';
        this.interactiveAxes = 'X';
        this.isTouch = navigator.userAgent.match(/iPad/i) != null || /Android/i.test(navigator.userAgent);
        this.disabled = true;
    }
    AppCmp.prototype.resetAxes = function () {
        var _this = this;
        if (this.chartGestures) {
            this.chartGestures.reset();
        }
        window.setTimeout(function () {
            _this.disabled = true;
        }, 20);
    };
    AppCmp.prototype.rangeChanged = function () {
        this.disabled = false;
    };
    __decorate([
        core_1.ViewChild('zoomChart')
    ], AppCmp.prototype, "zoomChart", void 0);
    __decorate([
        core_1.ViewChild('chartGestures')
    ], AppCmp.prototype, "chartGestures", void 0);
    AppCmp = __decorate([
        core_1.Component({
            selector: 'app-cmp',
            templateUrl: 'src/app.html'
        }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc))
    ], AppCmp);
    return AppCmp;
}());
exports.AppCmp = AppCmp;
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [wijmo_angular2_input_1.WjInputModule, wijmo_angular2_chart_1.WjChartModule, wijmo_angular2_chart_interaction_1.WjChartInteractionModule, http_1.HttpModule, platform_browser_1.BrowserModule, forms_1.FormsModule],
            declarations: [AppCmp],
            providers: [DataSvc_1.DataSvc],
            bootstrap: [AppCmp]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
core_1.enableProdMode();
// Bootstrap application with hash style navigation and global services.
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule);
//# sourceMappingURL=app.js.map