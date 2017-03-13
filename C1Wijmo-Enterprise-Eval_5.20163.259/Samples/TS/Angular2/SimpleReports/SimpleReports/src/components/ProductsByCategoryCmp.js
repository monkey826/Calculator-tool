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
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var DataSvc_1 = require('../services/DataSvc');
var ProductsByCategoryCmp = (function () {
    function ProductsByCategoryCmp(dataSvc) {
        this.today = new Date();
        this.products = dataSvc.products;
        this.categories = dataSvc.categories;
    }
    // get an array of elements from a CollectionView by looking up a property value
    ProductsByCategoryCmp.prototype.select = function (view, prop, val) {
        var arr = [];
        for (var i = 0; i < view.items.length; i++) {
            var item = view.items[i];
            if (item[prop] == val) {
                arr.push(item);
            }
        }
        return arr;
    };
    ProductsByCategoryCmp = __decorate([
        core_1.Component({
            selector: 'product-by-catalog-cmp',
            templateUrl: 'src/components/productsByCategoryCmp.html'
        }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc))
    ], ProductsByCategoryCmp);
    return ProductsByCategoryCmp;
}());
exports.ProductsByCategoryCmp = ProductsByCategoryCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: ProductsByCategoryCmp }
]);
var ProductsByCategoryModule = (function () {
    function ProductsByCategoryModule() {
    }
    ProductsByCategoryModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, routing],
            declarations: [ProductsByCategoryCmp],
        })
    ], ProductsByCategoryModule);
    return ProductsByCategoryModule;
}());
exports.ProductsByCategoryModule = ProductsByCategoryModule;
//# sourceMappingURL=ProductsByCategoryCmp.js.map