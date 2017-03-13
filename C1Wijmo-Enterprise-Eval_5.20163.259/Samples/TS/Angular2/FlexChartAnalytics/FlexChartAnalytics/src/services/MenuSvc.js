'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
// Application navigation menu service.
var MenuSvc = (function () {
    function MenuSvc() {
    }
    MenuSvc.prototype.getMenu = function () {
        var ret = [
            {
                "section": "Analytics",
                "links": [
                    { "text": "TrendLine", "url": "#/trendline", "alias": "TrendLine" },
                    { "text": "MovingAverage", "url": "#/movingaverage", "alias": "MovingAverage" },
                    { "text": "YFunctionSeries", "url": "#/yfunctionseries", "alias": "YFunctionSeries" },
                    { "text": "Parametric FunctionSeries", "url": "#/parametricfunctionseries", "alias": "ParametricFunctionSeries" },
                    { "text": "Waterfall", "url": "#/waterfall", "alias": "Waterfall" },
                    { "text": "Box&Whisker", "url": "#/boxwhisker", "alias": "BoxWhisker" },
                    { "text": "ErrorBar", "url": "#/errorbar", "alias": "ErrorBar" }
                ]
            }];
        return ret;
    };
    MenuSvc = __decorate([
        core_1.Injectable()
    ], MenuSvc);
    return MenuSvc;
}());
exports.MenuSvc = MenuSvc;
//# sourceMappingURL=MenuSvc.js.map