
///<reference path="../typings/globals/core-js/index.d.ts"/>
import * as wjcCore from 'wijmo/wijmo';





// Angular
import { Component, EventEmitter, Provider, Input, Inject, enableProdMode, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjCoreModule } from 'wijmo/wijmo.angular2.core';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { TabsModule } from './components/AppTab';
import { FormattedModelAccessor } from './directives/FormattedModelAccessor';
import { NumberInputAccessor } from './directives/NumberInputAccessor';
import { GlobalizePipe } from './pipes/appPipes';
import { DataSvc } from './services/DataSvc';
'use strict';

// The application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})

export class AppCmp {

    cvGettingStarted: wjcCore.CollectionView;
    cvCRM: wjcCore.CollectionView;
    cvSorting: wjcCore.CollectionView;
    cvFiltering: wjcCore.CollectionView;
    cvGrouping: wjcCore.CollectionView;
    cvEditing: wjcCore.CollectionView;
    cvPaging: wjcCore.CollectionView;
    cvTrackingChanges: wjcCore.CollectionView;
    cvTrackingChangesExtra: wjcCore.CollectionView;

    groupItems: any;
    fieldNames: string[];
    currentItem: any;
    current: any;

    protected dataSvc: DataSvc;

    private _selectedGroupOpt = '';
    private _toFilter: any;
    private _thisFilterFunction: wjcCore.IPredicate;
    private _filter: string;

    constructor( @Inject(DataSvc) dataSvc: DataSvc) {
        // initialize the collectionview
        this.cvGettingStarted = new wjcCore.CollectionView(dataSvc.getData(10));
        this.cvCRM = new wjcCore.CollectionView(dataSvc.getData(10));
        this.cvSorting = new wjcCore.CollectionView(dataSvc.getData(10));
        this.cvFiltering = new wjcCore.CollectionView(dataSvc.getData(10));
        this.cvGrouping = new wjcCore.CollectionView(dataSvc.getData(20));
        this.cvEditing = new wjcCore.CollectionView(dataSvc.getData(10));
        this.cvPaging = new wjcCore.CollectionView(dataSvc.getData(55));
        this.cvTrackingChanges = new wjcCore.CollectionView(dataSvc.getData(6));
        this.cvTrackingChangesExtra = new wjcCore.CollectionView(dataSvc.getData(6));

        this.fieldNames = dataSvc.getNames();
        this._thisFilterFunction = this._filterFunction.bind(this);
        this.groupItems = this.cvGrouping.items;
        this.currentItem = this.cvEditing.currentItem;

        // update the group list
        this.cvGrouping.collectionChanged.addHandler(() => {
            this.groupItems = this.cvGrouping.items;
            if (this.cvGrouping.groups && this.cvGrouping.groups.length > 0) {
                this.groupItems = [];
                for (var i = 0; i < this.cvGrouping.groups.length; i++) {
                    this._addGroup(this.cvGrouping.groups[i]);
                }
            }
        });

        // define the new item value.
        this.cvEditing.newItemCreator = () => {
            var item = dataSvc.getData(1)[0];

            // aggregate the max value of id in the collection.
            item.id = wjcCore.getAggregate(wjcCore.Aggregate.Max, this.cvEditing.sourceCollection, 'id') + 1;
            return item;
        }
        // syn the scope currentItem with the collectionview.
        this.cvEditing.currentChanged.addHandler(() => {
            this.currentItem = this.cvEditing.currentItem;
        });

        // page settings
        this.cvPaging.pageSize = 10;
        this.cvTrackingChanges.trackChanges = true;
        this.cvTrackingChangesExtra.trackChanges = true;

        // keep the original state of the current item in tracking Changes
        this.current = this.cvTrackingChangesExtra.currentItem ? JSON.stringify(this.cvTrackingChangesExtra.currentItem) : null;
        this.cvTrackingChangesExtra.currentChanged.addHandler((s, e) => {
            this.current = s.currentItem ? JSON.stringify(s.currentItem) : null;
        });

        // keep track of the original state of edited items
        var original = [];
        this.cvTrackingChangesExtra.itemsEdited.collectionChanged.addHandler((s, e: any) => {
            if (e.action == wjcCore.NotifyCollectionChangedAction.Add ||
                e.action == wjcCore.NotifyCollectionChangedAction.Change) {

                // check if we have this item's original data
                var index = this.cvTrackingChangesExtra.sourceCollection.indexOf(e.item);
                var found = -1;
                for (var i = 0; i < original.length && found < 0; i++) {
                    if (original[i].index == index) {
                        found = i;
                    }
                }

                // if we have the item, check original value
                if (found > -1) {

                    // if the current value is the same as the original, remove
                    var valueNow = JSON.stringify(e.item);
                    if (valueNow == original[found].value) {
                        original.splice(found, 1);
                        index = this.cvTrackingChangesExtra.itemsEdited.indexOf(e.item);
                        this.cvTrackingChangesExtra.itemsEdited.splice(index, 1);
                    }
                } else { // if we don't, store it now
                    found = original.length;
                    original.push({ index: index, value: this.current });
                }
            }
        });
    }

    // filtering
    get filter(): string {
        return this._filter;
    }
    set filter(value: string) {
        if (this._filter != value) {
            this._filter = value;
            this._applyFilter();
        }
    }

    // grouping
    get selectedGroupOpt(): string {
        return this._selectedGroupOpt;
    }
    set selectedGroupOpt(value: string) {
        if (this._selectedGroupOpt != value) {
            this._selectedGroupOpt = value;
            this._applyGrouping();
        }
    }

    isGroupItem(item: any): boolean {
        return item instanceof wjcCore.CollectionViewGroup;
    };

    avgAmount(item:any) {
        // it only works when the item is a group item.
        if (!this.isGroupItem(item)) {
            return;
        }

        // get the average value of group amount values.
        var avg = item.getAggregate(wjcCore.Aggregate.Avg, 'amount');
        return wjcCore.Globalize.format(avg, '');
    };

    private _addGroup(g:any) {
        this.groupItems.push(g);
        if (g.isBottomLevel) {
            for (var i = 0; i < g.items.length; i++) {
                this.groupItems.push(g.items[i]);
            }
        }
        else {
            for (var i = 0; i < g.groups.length; i++) {
                this._addGroup(g.groups[i]);
            }
        }
    }

    // current record management
    stopCurrent() {
        this.cvCRM.currentChanging.addHandler(this._stopCurrentIn4th);
    };

    // restore to be able to change current.
    reset() {
        this.cvCRM.currentChanging.removeHandler(this._stopCurrentIn4th);
    };

    // sorting
    toggleSort(fieldName:string) {
        // get all the sort descriptions.
        var sd = this.cvSorting.sortDescriptions;
        var ascending = true;

        // try to find whether the field has been sorted.
        if (sd.length > 0 && sd[0].property === fieldName) {
            // if finded, toggle the sort order.
            ascending = !sd[0].ascending;
        }

        // create a new SortDescription object.
        var sdNew = new wjcCore.SortDescription(fieldName, ascending);

        // remove any old sort descriptors and add the created one.
        sd.splice(0, sd.length, sdNew);
    };

    // get the sort label
    getSort(propName:string) {
        var sd = this.cvSorting.sortDescriptions;
        if (sd.length > 0 && sd[0].property === propName) {
            return sd[0].ascending ? '▲' : '▼';
        }
        return '';
    };

    // editing
    confirmUpdate() {
        // commit editing/adding
        this.cvEditing.commitEdit();
        this.cvEditing.commitNew();
    };
    cancelUpdate() {
        // cancel editing or adding
        this.cvEditing.cancelEdit();
        this.cvEditing.cancelNew();
    };

    // apply filter (applied on a 500 ms timeOut)
    private _applyFilter() {
        if (this._toFilter) {
            clearTimeout(this._toFilter);
        }
        //var self = this;
        this._toFilter = setTimeout(() => {
            this._toFilter = null;
            if (this.cvFiltering) {
                var cv = this.cvFiltering;
                if (cv) {
                    if (cv.filter != this._thisFilterFunction) {
                        cv.filter = this._thisFilterFunction;
                    } else {
                        cv.refresh();
                    }
                }
            }
        }, 500);
    }

    // ICollectionView filter function
    private _filterFunction(item: any): boolean {
        var filter = this.filter.toLowerCase();
        if (!filter) {
            return true;
        }
        return item['country'].toLowerCase().indexOf(filter) > -1;
    }

    // forbid changing current when the current item is the 4th one.
    private _stopCurrentIn4th(sender, e) {
        // when the current is the 4rd item, stop moving.
        if (sender.currentPosition === 3) {
            e.cancel = true;
        }
    }


    private _applyGrouping() {
        var gd,
            fieldName = this.selectedGroupOpt;

        gd = this.cvGrouping.groupDescriptions;

        if (!fieldName) {
            // clear all the group settings.
            gd.splice(0, gd.length);
            return;
        }

        if (this._findGroup(fieldName) >= 0) {
            return;
        }

        if (fieldName == 'amount') {
            // when grouping by amount, use ranges instead of specific values
            gd.push(new wjcCore.PropertyGroupDescription(fieldName, function (item, propName) {
                var value = item[propName]; // amount
                if (value > 1000) return 'Large Amounts';
                if (value > 100) return 'Medium Amounts';
                if (value > 0) return 'Small Amounts';
                return 'Negative Amounts';
            }));
        }
        else {
            // group by specific property values
            gd.push(new wjcCore.PropertyGroupDescription(fieldName));
        }
    }


    // check whether the group with the specified property name already exists.
    private _findGroup(propName: string) {
        var gd = this.cvGrouping.groupDescriptions;
        for (var i = 0; i < gd.length; i++) {
            if (gd[i].propertyName === propName) {
                return i;
            }
        }
        return -1;
    }
}

@NgModule({
    imports: [WjCoreModule, WjGridModule,BrowserModule, FormsModule, TabsModule],
    declarations: [GlobalizePipe, FormattedModelAccessor, NumberInputAccessor, AppCmp],
    providers: [DataSvc], 
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);
