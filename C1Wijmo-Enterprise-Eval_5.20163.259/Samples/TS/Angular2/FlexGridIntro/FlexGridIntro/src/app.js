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
///<reference path="../typings/globals/core-js/index.d.ts"/>
var wjcCore = require('wijmo/wijmo');
// Angular
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var platform_browser_1 = require('@angular/platform-browser');
var wijmo_angular2_grid_1 = require('wijmo/wijmo.angular2.grid');
var wijmo_angular2_input_1 = require('wijmo/wijmo.angular2.input');
var AppTab_1 = require('./components/AppTab');
var DataSvc_1 = require('./services/DataSvc');
'use strict';
// The application root component.
var AppCmp = (function () {
    function AppCmp(dataSvc) {
        this.selectionMode = 'CellRange';
        //private
        this._groupBy = '';
        this._filter = '';
        this.dataSvc = dataSvc;
        this.data = new wjcCore.CollectionView(this.dataSvc.getData(100));
        this.cvGroup = new wjcCore.CollectionView(this.dataSvc.getData(100));
        this.cvFilter = new wjcCore.CollectionView(this.dataSvc.getData(100));
        this.cvFilter.filter = this._filterFunction.bind(this);
        this.cvMaster = new wjcCore.CollectionView(this.dataSvc.getData(100));
        this.cvPaging = new wjcCore.CollectionView(this.dataSvc.getData(100));
        this.cvPaging.pageSize = 10;
        this.treeData = this.dataSvc.getTreeData();
    }
    Object.defineProperty(AppCmp.prototype, "groupBy", {
        get: function () {
            return this._groupBy;
        },
        set: function (value) {
            if (this._groupBy != value) {
                this._groupBy = value;
                this._applyGroupBy();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppCmp.prototype, "filter", {
        get: function () {
            return this._filter;
        },
        set: function (value) {
            if (this._filter != value) {
                this._filter = value;
                if (this._toFilter) {
                    clearTimeout(this._toFilter);
                }
                var self = this;
                this._toFilter = setTimeout(function () {
                    self.cvFilter.refresh();
                }, 500);
            }
        },
        enumerable: true,
        configurable: true
    });
    AppCmp.prototype.toggleFreeze = function (flex) {
        if (flex) {
            var frozenCount = flex.frozenRows == 0 ? 2 : 0;
            flex.frozenRows = frozenCount;
            flex.frozenColumns = frozenCount;
        }
    };
    AppCmp.prototype.getAmountColor = function (amount) {
        if (amount < 500)
            return 'darkred';
        if (amount < 2500)
            return 'black';
        return 'darkgreen';
    };
    AppCmp.prototype.sortedColumn = function (flex) {
        if (!flex) {
            return;
        }
        var view = flex.collectionView;
        if (view && flex.childItemsPath) {
            for (var i = 0; i < view.items.length; i++) {
                this._sortItem(view.items[i], view, flex.childItemsPath);
            }
            view.refresh();
        }
    };
    AppCmp.prototype._applyGroupBy = function () {
        var cv = this.cvGroup;
        cv.beginUpdate();
        cv.groupDescriptions.clear();
        if (this.groupBy) {
            var groupNames = this.groupBy.split(',');
            for (var i = 0; i < groupNames.length; i++) {
                var groupName = groupNames[i];
                if (groupName == 'date') {
                    var groupDesc = new wjcCore.PropertyGroupDescription(groupName, function (item, prop) {
                        return item.date.getFullYear();
                    });
                    cv.groupDescriptions.push(groupDesc);
                }
                else if (groupName == 'amount') {
                    var groupDesc = new wjcCore.PropertyGroupDescription(groupName, function (item, prop) {
                        return item.amount >= 5000 ? '> 5,000' : item.amount >= 500 ? '500 to 5,000' : '< 500';
                    });
                    cv.groupDescriptions.push(groupDesc);
                }
                else {
                    var groupDesc = new wjcCore.PropertyGroupDescription(groupName);
                    cv.groupDescriptions.push(groupDesc);
                }
            }
            cv.refresh();
        }
        cv.endUpdate();
    };
    AppCmp.prototype._filterFunction = function (item) {
        if (this._filter) {
            return item.country.toLowerCase().indexOf(this._filter.toLowerCase()) > -1;
        }
        return true;
    };
    AppCmp.prototype._sortItem = function (item, view, childItemsPath) {
        var children = item[childItemsPath];
        if (children && wjcCore.isArray(children)) {
            children.sort(view._compareItems());
            for (var i = 0; i < children.length; i++) {
                this._sortItem(children[i], view, childItemsPath);
            }
        }
    };
    AppCmp = __decorate([
        core_1.Component({
            selector: 'app-cmp',
            templateUrl: 'src/app.html',
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
            imports: [wijmo_angular2_input_1.WjInputModule, wijmo_angular2_grid_1.WjGridModule, platform_browser_1.BrowserModule, forms_1.FormsModule, AppTab_1.TabsModule],
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