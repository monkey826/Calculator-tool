

import * as wjcChart from 'wijmo/wijmo.chart';
import * as wjcCore from 'wijmo/wijmo';



'use strict';

import { Component, EventEmitter, Inject, ViewChild, Input, AfterViewInit, NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WjChartModule } from 'wijmo/wijmo.angular2.chart';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';

// Chart marker component
@Component({
    selector: 'chart-marker-cmp',
    templateUrl: 'src/components/chart/chartMarkerCmp.html'
})

export class ChartMarkerCmp implements AfterViewInit{

    itemsSource: any[];
    changeContent: Function;

    @ViewChild('chart') chart: wjcChart.FlexChart;
    @ViewChild('lineMarker') lineMarker: wjcChart.LineMarker;

    private _lines = 1;
    private _pt: wjcCore.Point;

    constructor() {
        this.itemsSource = [];
        for (var i = 0; i < 300; i++) {
            this.itemsSource.push({
                date: new Date(10, 0, i),
                output: Math.floor(Math.random() * 10),
                input: Math.floor(Math.random() * 10 + 10)
            });
        }
        this._pt = new wjcCore.Point();
        this.changeContent = this._changeContent.bind(this);
    }

    get lines() {
        return this._lines;
    }
    set lines(value: number) {
        if (this._lines != value) {
            this._lines = value;
            if (this.lineMarker) {
                if (this._lines === 0 && this.lineMarker.interaction === 2) {
                    this.lineMarker.interaction = 1;
                }
                this.lineMarker.lines = this._lines;
            }
        }
    }

    positionChanged(point: wjcCore.Point) {
        this._pt = point;
    }

    ngAfterViewInit() {
        this.lineMarker.alignment = wjcChart.LineMarkerAlignment.Auto;
    }

    private _changeContent() {
        var html = '', chart = this.chart;
        if (!chart) {
            return;
        }
        for (var i = 0; i < chart.series.length; i++) {
            var s = chart.series[i];
            var ht = s.hitTest(new wjcCore.Point(this._pt.x, NaN));

            // find series lines to get its color
            var polyline = $(s.hostElement).find('polyline')[0];

            // add series info to the marker content
            if (ht.x && ht.y !== null) {
                if (i == 0) {
                    html += wjcCore.Globalize.formatDate(ht.x, 'dd-MMM');
                }
                html += '<div style="color:' + polyline.getAttribute('stroke') + '">' + ht.name + ' = ' + ht.y.toFixed(2) + '</div>';
            }
        }
        return html;
    }
}

const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: ChartMarkerCmp }
]);

@NgModule({
    imports: [CommonModule, routing, WjChartModule, WjInputModule],
    declarations: [ChartMarkerCmp],
})
export class ChartMarkerModule {
}
