import * as wjcChartFinance from 'wijmo/wijmo.chart.finance';
import { DataSvc } from './../../services/DataSvc';
import { TooltipSvc } from './../../services/TooltipSvc';
export declare class LineBreakCmp {
    dataSvc: DataSvc;
    tooltipSvc: TooltipSvc;
    dataList: any[];
    item: string;
    data: any[];
    selectedSymbol: string;
    options: any;
    style: any;
    altStyle: any;
    title: string;
    chart: wjcChartFinance.FinancialChart;
    constructor(dataSvc: DataSvc, tooltipSvc: TooltipSvc);
    selectedSymbolChanged(): void;
    chartRendered(): void;
    optionChanged(): void;
    private setDataSource();
}
export declare class LineBreakModule {
}
