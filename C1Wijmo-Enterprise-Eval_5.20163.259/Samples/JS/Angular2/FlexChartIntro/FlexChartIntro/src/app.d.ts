/// <reference path="../typings/globals/core-js/index.d.ts" />
import * as wjcCore from 'wijmo/wijmo';
import * as wjcChart from 'wijmo/wijmo.chart';
import * as wjcInput from 'wijmo/wijmo.input';
import { DataSvc } from './services/DataSvc';
export declare class AppCmp {
    countries: string[];
    data: {
        country: string;
        downloads: number;
        sales: number;
        expenses: number;
    }[];
    funnelData: any;
    boxData: any;
    chartType: string;
    stacking: string;
    legendPosition: string;
    rotated: boolean;
    header: string;
    footer: string;
    titleX: string;
    titleY: string;
    tooltipContent: string;
    selectionMode: string;
    trafficData: wjcCore.ObservableArray;
    series1Visible: wjcChart.SeriesVisibility;
    series2Visible: wjcChart.SeriesVisibility;
    series3Visible: wjcChart.SeriesVisibility;
    funnelChart: wjcChart.FlexChart;
    boxChart: wjcChart.FlexChart;
    _toAddData: any;
    _interval: any;
    protected dataSvc: DataSvc;
    constructor(dataSvc: DataSvc);
    ngAfterViewInit(): void;
    setInterval: (interval: any) => void;
    seriesVisible: (idx: any, checked: any) => void;
    private _addTrafficItem;
    neckWidthChanged: (sender: wjcInput.InputNumber) => void;
    neckHeightChanged: (sender: wjcInput.InputNumber) => void;
    funnelTypeChanged: (sender: wjcInput.Menu) => void;
}
export declare class AppModule {
}
