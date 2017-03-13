

import * as wjcCore from 'wijmo/wijmo';



'use strict';

import { Component, EventEmitter, Inject, AfterViewInit, NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataSvc } from '../../services/DataSvc';
import { InputBaseCmp } from '../input/InputBaseCmp';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';

// Wijmo Data component.
@Component({
    selector: 'grid-data-cmp',
    templateUrl: 'src/components/infra/dataCmp.html'
})

export class DataCmp extends InputBaseCmp {

    cv: wjcCore.CollectionView;
    groupedList: any[];    
    filter: { id?: string, country?: string, color?: string, minAmount?: number, month?: number };

    private _toFilter: any;
    private _timeOut: any;


    constructor( @Inject(DataSvc) dataSvc: DataSvc) {
        super(dataSvc);
        this.cv = new wjcCore.CollectionView(dataSvc.getData(500));
        this.cv.pageSize = 10;
        this.groupedList = this.cv.items;

        this.cv.filter = this._filterFun.bind(this);

        this.cv.newItemCreator = ()=> {
            var newItem = dataSvc.getData(1)[0];
            newItem.id = -1;
            return newItem;
        };
        this.cv.collectionChanged.addHandler(()=> {
            this.groupedList = this.cv.items;
            if (this.cv.groups && this.cv.groups.length > 0) {
                this.groupedList = [];
                for (var i = 0; i < this.cv.groups.length; i++) {
                    this._addGroup(this.cv.groups[i]);
                }
            }
        });
        this.filter = { id: '', country: '', color: '', minAmount: null, month: null };
    }

    doFilter() {
          if (this._timeOut) {
              clearTimeout(this._timeOut);
            }

          this._timeOut = setTimeout(()=> {
                    this._timeOut = null;
                    this.cv.refresh();
          }, 250);
    }

    // IEditableCollectionView commands
    isEditing() {
        return this.cv.isEditingItem || this.cv.isAddingNew;
    }
    edit() {
        this.cv.editItem(this.cv.currentItem);
    }
    add() {
        this.cv.addNew();
    }
    delete() {
        this.cv.remove(this.cv.currentItem);
    }
    commit() {
        this.cv.commitEdit();
        this.cv.commitNew();
    }
    cancel() {
        this.cv.cancelEdit();
        this.cv.cancelNew();
    }
    moveCurrentTo(item: any) {
        if (!this.isEditing() && !this.isGroup(item)) {
            this.cv.moveCurrentTo(item);
        }
    }

    // sorting
    getSort(propName: string) {
        var sd = this.cv.sortDescriptions;
        if (sd.length > 0 && sd[0].property == propName) {
            return sd[0].ascending ? '▲' : '▼';
        }
        return '◇';
    }

    toggleSort(propName: string) {
        var sd = this.cv.sortDescriptions;
        var ascending = true;
        if (sd.length > 0 && sd[0].property == propName) {
            ascending = !sd[0].ascending;
        }
        var sdNew = new wjcCore.SortDescription(propName, ascending);

        // remove any old sort descriptors and add the new one
        sd.splice(0, sd.length, sdNew);
    }

    // grouping
    getGroup(propName: string) {
        var index = this._findGroup(propName);
        return index < 0
            ? /*'▯' +*/ Array(this.cv.groupDescriptions.length + 2).join('▷')
            : /*'▮' +*/ Array(index + 2).join('▶');
    }

    toggleGroup(propName: string) {
        var gd = this.cv.groupDescriptions;
        var index = this._findGroup(propName);
        if (index >= 0) {
            gd.removeAt(index);
        } else {
            if (propName == 'amount') {

                // when grouping by amount, use ranges instead of specific values
                gd.push(new wjcCore.PropertyGroupDescription(propName, function (item, propName) {
                    var value = item[propName]; // amount
                    if (value > 1000) return 'Large Amounts';
                    if (value > 100) return 'Medium Amounts';
                    if (value > 0) return 'Small Amounts';
                    return 'Negative Amounts';
                }));
            } else {

                // group by specific property values
                gd.push(new wjcCore.PropertyGroupDescription(propName));
            }
        }
    }

    isGroup(item :any) {
        return item instanceof wjcCore.CollectionViewGroup;
    }

    private _addGroup(g:  any) {
        this.groupedList.push(g);
        if (g.isBottomLevel) {
            for (var i = 0; i < g.items.length; i++) {
                this.groupedList.push(g.items[i]);
            }
        } else {
            for (var i = 0; i < g.groups.length; i++) {
                this._addGroup(g.groups[i]);
            }
        }
    }

    private _findGroup(propName: string) {
        var gd = this.cv.groupDescriptions;
        for (var i = 0; i < gd.length; i++) {
            if (gd[i].propertyName == propName) {
                return i;
            }
        }
        return -1;
    }

    // filtering
    private _filterFun(item: any) {

        // check each filter parameter
        var f = this.filter;
        if (f) {
            if ((f.id == 'odd' && item.id % 2 == 0) ||
                (f.id == 'even' && item.id % 2 != 0)) {
                return false;
            }
            if (f.country && item.country.indexOf(f.country) < 0) {
                return false;
            }
            if (f.month != null && item.start.getMonth() != f.month * 1) {
                return false;
            }
            if (f.color && item.color.indexOf(f.color) < 0) {
                return false;
            }
            if (f.minAmount != null && item.amount < f.minAmount * 1) {
                return false;
            }
        }

        // all passed, return true to include the item
        return true;
    }
}

const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: DataCmp }
]);

@NgModule({
    imports: [CommonModule, FormsModule, routing, WjInputModule],
    declarations: [DataCmp],
})
export class DataModule {
}

