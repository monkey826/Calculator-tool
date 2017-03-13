

import * as wjcCore from 'wijmo/wijmo';
import * as wjcChartFinance from 'wijmo/wijmo.chart.finance';



'use strict';

import { Component, ViewChild, Inject} from '@angular/core';

import { DataSvc } from './../services/DataSvc';

//Marker sample component
@Component({
    selector: 'marker-cmp',
    templateUrl: 'src/components/MarkerCmp.html'
})

export class MarkerCmp {
    dataSvc: DataSvc;
    data: any[];
    header: string;
    changeContent: Function;
    changeYContent: Function;
    changeXContent: Function;
    pt: wjcCore.Point;
    markcontents;
    pOffset: wjcCore.Rect;
    @ViewChild('chart') chart: wjcChartFinance.FinancialChart;

    constructor( @Inject(DataSvc) dataSvc: DataSvc) {
        this.data = [];
        this.pt = new wjcCore.Point();
        this.dataSvc = dataSvc;
        this.setDataSource();
        this.header = 'Facebook, Inc. (FB)';
        this.changeContent = () => {
            this.markcontents = this._getMarkerContents(new wjcCore.Point(this.pt.x, this.pt.y));
            return this.markcontents ? this.markcontents.content : '';
        };
        this.changeXContent = () => {
            return this.markcontents && this.markcontents.x ? this.markcontents.x.toString() : '';
        };
        this.changeYContent = () => {
            return this.markcontents && this.markcontents.y ? this.markcontents.y.toString() : '';
        };
    }

    midPosChanged(event) {
        this.pt = event;
    }

    chartRendered() {
        var chart = this.chart;
        if (!chart) {
            return;
        }
        chart.tooltip.content = '';
        chart.axisY.position = 3;
        chart.rendered.addHandler(() => {
            var chartHostEle = chart.hostElement,
                pa = chartHostEle.querySelector('.wj-plot-area');
            this.pOffset = wjcCore.getElementRect(pa);
        });

        var lineMarkers = chart.hostElement.querySelectorAll('.wj-chart-linemarker-container');
        this._markershowing(lineMarkers, 'hidden');
        chart.hostElement.onmouseenter = e => {
            this._markershowing(lineMarkers, 'visible');
        }
        if ('ontouchstart' in window) {
            chart.hostElement.ontouchstart = e => {
                this._markershowing(lineMarkers, 'visible');
            }
        }
        chart.hostElement.onmouseleave = e => {
            this._markershowing(lineMarkers, 'hidden');
        }
    }

    private _markershowing(lineMarkers, visible) {
        for (var i = 0; i < lineMarkers.length; i++) {
            lineMarkers[i].style.visibility = visible;
        }
    }

    //get line marker content
    private _getMarkerContents(pt) {
        var chart = this.chart,
            newHitPoint = new wjcCore.Point(pt.x, NaN),
            ht, xContent, yContent, axisYMax, axisYMin,
            content = '';

        if (!chart || chart.series.length < 1) {
            return;
        }
        axisYMax = chart.axisY.actualMax;
        axisYMin = chart.axisY.actualMin;
        //calculate the y value
        if (this.pOffset == null) {
            yContent = 0;
        } else {
            yContent = axisYMax - ((pt.y - this.pOffset.top) / this.pOffset.height) * (axisYMax - axisYMin);
            yContent = yContent.toFixed(2);
        }
        ht = chart.series[0].hitTest(newHitPoint);

        if (ht.x && ht.y !== null) {
            xContent = ht.x;
        }
        return { content: '', x: xContent, y: yContent };
    }

    private setDataSource() {
        this.dataSvc.getData().subscribe(data => {
            this.data = data;
        });
    }
}
