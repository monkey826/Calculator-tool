

import * as wjcGrid from 'wijmo/wijmo.grid';



'use strict';

import { Component, EventEmitter, Inject, ViewChild, Input, NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GridBaseCmp } from './GridBaseCmp';
import { DataSvc } from '../../services/DataSvc';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';

// FlexGrid Unbound component.
@Component({
    selector: 'grid-unbound-cmp',
    templateUrl: 'src/components/grid/gridUnboundCmp.html'
})

export class GridUnboundCmp extends GridBaseCmp {

    constructor( @Inject(DataSvc) dataSvc: DataSvc) {
        super(dataSvc);

    }

    ngAfterViewInit() {
        this.update();
    }

    update() {
        if (this.flex) {
            var flex = this.flex;
            flex.allowResizing = wjcGrid.AllowResizing.Both;
            flex.allowDragging = wjcGrid.AllowDragging.Both;

            // add 50 rows, 10 columns
            for (var r = 0; r < 50; r++) {
                flex.rows.push(new wjcGrid.Row());
            }
            for (var c = 0; c < 10; c++) {
                flex.columns.push(new wjcGrid.Column());
            }

            // populate the scrollable area
            for (var r = 0; r < flex.rows.length; r++) {
                for (var c = 0; c < flex.columns.length; c++) {
                    flex.setCellData(r, c, 'r' + r + ',c' + c);
                }
            }

            // add 3 rows to the column header and 3 columns to the row header panels
            for (var i = 0; i < 3; i++) {
                flex.columnHeaders.rows.insert(0, new wjcGrid.Row());
                flex.rowHeaders.columns.insert(0, new wjcGrid.Column());
            }

            // populate the fixed area
            var p = flex.columnHeaders;
            for (var r = 0; r < p.rows.length; r++) {
                for (var c = 0; c < p.columns.length; c++) {
                    p.setCellData(r, c, 'cHdr r' + r + ',c' + c);
                }
            }
            p = flex.rowHeaders;
            for (var r = 0; r < p.rows.length; r++) {
                for (var c = 0; c < p.columns.length; c++) {
                    p.setCellData(r, c, 'rHdr r' + r + ',c' + c);
                }
            }
            p = flex.topLeftCells;
            for (var r = 0; r < p.rows.length; r++) {
                for (var c = 0; c < p.columns.length; c++) {
                    p.setCellData(r, c, 'tl r' + r + ',c' + c);
                }
            }
        }
    }
}

const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: GridUnboundCmp }
]);

@NgModule({
    imports: [CommonModule, routing, WjGridModule],
    declarations: [GridUnboundCmp],
})
export class GridUnboundModule {
}

