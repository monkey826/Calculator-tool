

import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';



'use strict';


import { Component, EventEmitter, Inject, AfterViewInit, NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridBaseCmp } from './GridBaseCmp';
import { RouterModule } from '@angular/router';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { DataSvc } from '../../services/DataSvc';
import { SparkSvc } from '../../services/SparkSvc';

// FlexGrid Custom Cells component.
@Component({
    selector: 'grid-custom-cells-cmp',
    templateUrl: 'src/components/grid/gridCustomCellsCmp.html'
})

export class GridCustomCellsCmp extends GridBaseCmp implements AfterViewInit {

    protected sparkSvc: SparkSvc;

    constructor( @Inject(DataSvc) dataSvc: DataSvc, @Inject(SparkSvc) sparkSvc: SparkSvc) {
        super(dataSvc);
        this.data = dataSvc.getData(1000);
        this.sparkSvc = sparkSvc;
    }

    ngAfterViewInit() {
        this._updateColumns();
    }

    itemsSourceChanged() {
        this._updateColumns();
    }

    private _updateColumns() {
        var flex = this.flex;
        if (!(flex && flex.collectionView)) {
            return;
        }
        var chartColumns = ['amount', 'amount2', 'discount'],
            items = flex.collectionView.items;

        for (var i = 0; i < chartColumns.length; i++) {
            var col = <any>flex.columns.getColumn(chartColumns[i]);
            if (col) {
                col.chartInfo = {
                    posColor: 'green',
                    negColor: 'red',
                    min: wjcCore.getAggregate(wjcCore.Aggregate.Min, items, col.binding),
                    max: wjcCore.getAggregate(wjcCore.Aggregate.Max, items, col.binding)
                };
            }
        }
    }

     itemFormatter = (panel: wjcGrid.GridPanel, r: number, c: number, cell: HTMLElement) => {
        if (panel.cellType == wjcGrid.CellType.Cell) {

            // use chartInfo to draw a bar chart
            var col = panel.columns[c];
            if (col.chartInfo) {
                cell.innerHTML = this._getBar(panel, r, c);
                return;
            }

            // create other types of custom content
            switch (col.name) {
                case 'sparklines':
                    cell.innerHTML = this.sparkSvc.getSparklines(panel.rows[r].dataItem['sales'], null, null);
                    break;
                case 'sparkbars':
                    cell.innerHTML = this.sparkSvc.getSparkbars(panel.rows[r].dataItem['sales'], null, null);
                    break;
                case 'ticker':
                    var sales = panel.rows[r].dataItem['sales'],
                        first = sales[0],
                        last = sales[sales.length - 1],
                        delta = last / first - 1;
                    cell.innerHTML =
                        '<div style="color:' + (delta >= 0 ? 'green' : 'red') + '">' +
                        '<span style="float:left;width:60px;font-size:larger;text-align:right">' + wjcCore.Globalize.format(last, 'n2') + '</span>' +
                        '<span style="float:left;width:30px">' + (delta > 0 ? '&#x25b2;' : '&#x25bc;') + '</span>' +
                        '<span style="float:left;font-size:smaller;">(' + wjcCore.Globalize.format(delta, 'p0') + ')</span>' +
                        '<div>';
                    break;
            }
        }
    }

     private _getBar(panel: wjcGrid.GridPanel, r: number, c: number) {
        var col = panel.columns[c],
            ci = col.chartInfo,
            base = Math.min(ci.max, Math.max(ci.min, 0)),
            xbase = Math.round((base - ci.min) / (ci.max - ci.min) * 100),
            val = panel.getCellData(r, c, false),
            xval = Math.round((val - ci.min) / (ci.max - ci.min) * 100),
            style = 'box-sizing:border-box;height:100%;padding:4px;opacity:.5;';
        style += 'background-color:' + (val > 0 ? ci.posColor : ci.negColor) + ';';
        style += (xval > xbase)
            ? 'width:' + (xval - xbase) + '%;margin-left:' + xbase + '%;'
            : 'width:' + (xbase - xval) + '%;margin-left:' + xval + '%;';
        return '<div style="' + style + '" />';
    }
}


const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: GridCustomCellsCmp }
]);

@NgModule({
    imports: [CommonModule, routing, WjGridModule],
    declarations: [GridCustomCellsCmp],
})
export class GridCustomCellsModule {
}
