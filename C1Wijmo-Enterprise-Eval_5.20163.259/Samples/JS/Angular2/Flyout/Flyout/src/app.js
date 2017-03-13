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
var wjcFlexgridflyout = require('./FlexGridFlyout');
var wjcCore = require('wijmo/wijmo');
// Angular
var core_1 = require('@angular/core');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var platform_browser_1 = require('@angular/platform-browser');
var wijmo_angular2_grid_1 = require('wijmo/wijmo.angular2.grid');
var DataSvc_1 = require('./services/DataSvc');
'use strict';
// The application root component.
var AppCmp = (function () {
    function AppCmp(dataSvc) {
        this.data = dataSvc.getData();
    }
    AppCmp.prototype.ngAfterViewInit = function () {
        this._initializeFlyout(this.flex);
    };
    AppCmp.prototype._initializeFlyout = function (s) {
        // create the FlexGridFlyout
        var f = new wjcFlexgridflyout.FlexGridFlyout(s);
        // add some content to the flyout element
        f.flyout.innerHTML =
            '<span id="fo-size"    title="Auto Size Column" class="glyphicon glyphicon-resize-horizontal"></span>' +
                '<span id="fo-sorta"   title="Sort Ascending"   class="glyphicon glyphicon glyphicon-sort-by-attributes"></span>' +
                '<span id="fo-sortd"   title="Sort Descending"  class="glyphicon glyphicon glyphicon-sort-by-attributes-alt"></span>' +
                '<span id="fo-refresh" title="Refresh Data"     class="glyphicon glyphicon glyphicon-refresh"></span>' +
                '<span id="fo-comment" title="Show Comment"     class="glyphicon glyphicon glyphicon-comment"></span>';
        // handle clicks on the flyout element
        s.addEventListener(f.flyout, 'click', function (e) {
            switch (e.target.id) {
                case 'fo-size':
                    s.autoSizeColumn(f.column.index);
                    break;
                case 'fo-sorta':
                case 'fo-sortd':
                    var sd = s.collectionView.sortDescriptions;
                    sd.clear();
                    sd.push(new wjcCore.SortDescription(f.column.binding, e.target.id == 'fo-sorta'));
                    break;
                case 'fo-refresh':
                    s.collectionView.refresh();
                    break;
                case 'fo-comment':
                    alert('Showing detail for column ' + f.column.header + '...');
                    break;
            }
            wjcCore.hidePopup(f.flyout);
        });
    };
    ;
    __decorate([
        core_1.ViewChild('flex')
    ], AppCmp.prototype, "flex", void 0);
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
            imports: [wijmo_angular2_grid_1.WjGridModule, platform_browser_1.BrowserModule],
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