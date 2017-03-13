

import * as wjcGrid from 'wijmo/wijmo.grid';



'use strict';

import { Component, EventEmitter, Inject, ViewChild, Input, AfterViewInit, NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GridBaseCmp } from './GridBaseCmp';
import { DataSvc } from '../../services/DataSvc';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';

// FlexGrid Merging component.
@Component({
    selector: 'grid-merging-cmp',
    templateUrl: 'src/components/grid/gridMergingCmp.html'
})

export class GridMergingCmp extends GridBaseCmp {

    constructor( @Inject(DataSvc) dataSvc: DataSvc) {
        super(dataSvc);
        this.data = this.dataSvc.getData(500);        
    }     

    sourceChanged() {
        this.updateDataMapSettings();
        this.updateHeaders();
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.updateHeaders();
    }

    // add some column headers to show merging
     updateHeaders() {
        var flex = this.flex;
        if (flex) {

            // insert new row if not yet
            if (flex.columnHeaders.rows.length === 1) {
                flex.columnHeaders.rows.insert(0, new wjcGrid.Row());
            }
            var row = flex.columnHeaders.rows[0];
            row.allowMerging = true;

            // set headings so the cells merge
            for (var i = 0; i < flex.columns.length; i++) {
                var hdr = 'String';
                switch (flex.columns[i].binding) {
                    case 'id':
                    case 'amount':
                    case 'discount':
                        hdr = 'Number';
                        break;
                    case 'active':
                        hdr = 'Boolean';
                        break;
                }
                flex.columnHeaders.setCellData(0, i, hdr);
            }
        }
    }
}

const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: GridMergingCmp }
]);

@NgModule({
    imports: [CommonModule, routing, WjGridModule, WjInputModule],
    declarations: [GridMergingCmp],
})
export class GridMergingModule {
}

