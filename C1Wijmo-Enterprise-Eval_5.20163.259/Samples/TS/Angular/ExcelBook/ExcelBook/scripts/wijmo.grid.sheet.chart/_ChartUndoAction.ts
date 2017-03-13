module wijmo.grid.sheet.chart {
    'use strict';

    /*
	 * Defines the _ChartInsertAction class.
	 *
	 * It deals with the undo\redo for inserting chart in the @see:FlexSheet control.
	 */
    export class _ChartInsertAction extends _UndoAction {
        private _chartEngine: ChartEngine;
        private _chartType: wijmo.chart.ChartType;
        private _data: any[];
        private _chartRect: Rect;
        private _chartContainerRect: Rect;
        private _cellRnages: CellRange[];

        /*
		 * Initializes a new instance of the @see:_ChartInsertAction class.
		 *
		 * @param chartEngine The @see: ChartEngine the engine to handle the @see:FlexChart in the @see:FlexSheet control.
         * @param chartType the type of the chart.
         * @param data the data used to render the chart.
         * @param chartRect the bounds rectangle to locate the chart.
         * @param cellRanges the cells to generate the @see:FlexChart in the @see:FlexSheet control.
		 */
        constructor(chartEngine: ChartEngine, chartType: wijmo.chart.ChartType, data: any[], chartRect: Rect, cellRanges: CellRange[]) {
            super(chartEngine._owner);

            this._chartEngine = chartEngine;
            this._chartType = chartType;
            this._data = data;
            this._chartRect = chartRect;
            this._cellRnages = cellRanges;
        }

        /*
		 * Overrides the undo method of its base class @see:_UndoAction.
		 */
        undo() {
            var chart: wijmo.chart.FlexChart,
                chartHost: HTMLElement,
                chartContainer: HTMLElement,
                chartCnt = this._chartEngine._charts.length;

            if (chartCnt > 0) {
                chart = this._chartEngine._charts[chartCnt - 1].chart;
                chartHost = chart.hostElement;
                chartContainer = chartHost.parentElement;
                this._chartEngine._undoing = true;
                this._chartRect = new Rect(chartHost.offsetLeft, chartHost.offsetTop, chartHost.offsetWidth, chartHost.offsetHeight);
                this._chartContainerRect = new Rect(chartContainer.offsetLeft, chartContainer.offsetTop, chartContainer.offsetWidth, chartContainer.offsetHeight);
                if (chart === this._chartEngine._selectedChart) {
                    this._chartEngine._selectedChart = null;
                }
                this._chartEngine.removeChart(chart);
                this._chartEngine._undoing = false;
            }
        }

        /*
		 * Overrides the redo method of its base class @see:_UndoAction.
		 */
        redo() {
            var chartObj: IChartObject,
                chart: wijmo.chart.FlexChart,
                chartContainer: HTMLElement;

            this._chartEngine._undoing = true;
            chartObj = this._chartEngine.addChart(this._chartType, this._data, this._chartRect);
            chartObj.cellRanges = this._cellRnages;
            chart = chartObj.chart;
            chartContainer = chart.hostElement.parentElement;

            setCss(chartContainer, {
                top: this._chartContainerRect.top + 'px',
                left: this._chartContainerRect.left + 'px',
                height: this._chartContainerRect.height + 'px',
                width: this._chartContainerRect.width + 'px'
            });

            this._chartEngine._undoing = false;
        }
    }

    /*
	 * Defines the _ChartRemoveAction class.
	 *
	 * It deals with the undo\redo for removing chart in the @see:FlexSheet control.
	 */
    export class _ChartRemoveAction extends _UndoAction {
        private _chartEngine: ChartEngine;
        private _chartType: wijmo.chart.ChartType;
        private _data: any;
        private _cellRnages: CellRange[];
        private _chartRect: Rect;
        private _chartContainerRect: Rect;

        /*
		 * Initializes a new instance of the @see:_ChartRemoveAction class.
		 *
		 * @param chartEngine The @see: ChartEngine the engine to handle the @see:FlexChart in the @see:FlexSheet control.
         * @param chartObj contains related information of the @see:FlexChart in the @see:FlexSheet control.
		 */
        constructor(chartEngine: ChartEngine, chartObj: IChartObject) {
            super(chartEngine._owner);

            var chart = chartObj.chart,
                chartHost = chartObj.chart.hostElement,
                chartContainer = chartHost.parentElement;

            this._chartEngine = chartEngine;
            this._chartType = chart.chartType;
            this._data = chart.itemsSource;
            this._cellRnages = chartObj.cellRanges;
            this._chartRect = new Rect(chartHost.offsetLeft, chartHost.offsetTop, chartHost.offsetWidth, chartHost.offsetHeight);
            this._chartContainerRect = new Rect(chartContainer.offsetLeft, chartContainer.offsetTop, chartContainer.offsetWidth, chartContainer.offsetHeight);
        }

        /*
		 * Overrides the undo method of its base class @see:_UndoAction.
		 */
        undo() {
            var chartObj: IChartObject,
                chart: wijmo.chart.FlexChart,
                chartContainer: HTMLElement;

            this._chartEngine._undoing = true;
            chartObj = this._chartEngine.addChart(this._chartType, this._data, this._chartRect);
            chartObj.cellRanges = this._cellRnages;
            chart = chartObj.chart;
            chartContainer = chart.hostElement.parentElement;

            setCss(chartContainer, {
                top: this._chartContainerRect.top + 'px',
                left: this._chartContainerRect.left + 'px',
                height: this._chartContainerRect.height + 'px',
                width: this._chartContainerRect.width + 'px'
            });
            
            this._chartEngine._undoing = false;
        }

        /*
		 * Overrides the redo method of its base class @see:_UndoAction.
		 */
        redo() {
            var chart: wijmo.chart.FlexChart,
                chartCnt = this._chartEngine._charts.length;

            if (chartCnt > 0) {
                chart = this._chartEngine._charts[chartCnt - 1].chart;
                this._chartEngine._undoing = true;
                if (chart === this._chartEngine._selectedChart) {
                    this._chartEngine._selectedChart = null;
                }
                this._chartEngine.removeChart(chart);
                this._chartEngine._undoing = false;
            }
        }
    }

    /*
	 * Defines the _ChartColumnsChangedAction class.
	 *
	 * It deals with the undo\redo for insert or delete column of the flexsheet.
	 */
    export class _ChartColumnsChangedAction extends _ColumnsChangedAction {
        private _chartEngine: ChartEngine;
        private _oldCharts: IChartSetting[];
        private _newCharts: IChartSetting[];

        /*
		 * Initializes a new instance of the @see:_ChartColumnsChangedAction class.
		 *
		 * @param chartEngine The @see: ChartEngine that the _ChartColumnsChangedAction works for.
		 */
        constructor(chartEngine: ChartEngine) {
            super(chartEngine._owner);

            this._chartEngine = chartEngine;
            this._oldCharts = chartEngine._getChartSettings();
        }

        /*
		 * Overrides the undo method of its base class @see:_ColumnsChangedAction.
		 */
        undo() {
            var chartObj: IChartObject,
                chartSetting: IChartSetting,
                data: any[],
                i: number;

            this._chartEngine._undoing = true;
            super.undo();

            i = this._chartEngine._charts.length - 1;
            for (; i >=0; i--) {
                chartObj = this._chartEngine._charts[i];
                if (chartObj.sheetIndex === this['_sheetIndex']) {
                    this._chartEngine.removeChart(chartObj.chart);
                }
            }
            for (i = 0; i < this._oldCharts.length; i++) {
                chartSetting = this._oldCharts[i];
                if (chartSetting.sheetIndex === this['_sheetIndex']) {
                    data = this._chartEngine._generateChartData(chartSetting.cellRanges);
                    chartObj = this._chartEngine.addChart(chartSetting.chartType, data, chartSetting.chartRect);
                    chartObj.cellRanges = chartSetting.cellRanges;

                    setCss(chartObj.chart.hostElement.parentElement, {
                        top: chartSetting.chartContainerRect.top + 'px',
                        left: chartSetting.chartContainerRect.left + 'px',
                        height: chartSetting.chartContainerRect.height + 'px',
                        width: chartSetting.chartContainerRect.width + 'px'
                    });
                }

            }
            this._chartEngine._undoing = false;
        }

        /*
		 * Overrides the redo method of its base class @see:_ColumnsChangedAction.
		 */
        redo() {
            var chartObj: IChartObject,
                chartSetting: IChartSetting,
                data: any[],
                i: number;

            this._chartEngine._undoing = true;
            super.redo();

            i = this._chartEngine._charts.length - 1;
            for (; i >= 0; i--) {
                chartObj = this._chartEngine._charts[i];
                if (chartObj.sheetIndex === this['_sheetIndex']) {
                    this._chartEngine.removeChart(chartObj.chart);
                }
            }
            for (i = 0; i < this._newCharts.length; i++) {
                chartSetting = this._newCharts[i];
                if (chartSetting.sheetIndex === this['_sheetIndex']) {
                    data = this._chartEngine._generateChartData(chartSetting.cellRanges);
                    chartObj = this._chartEngine.addChart(chartSetting.chartType, data, chartSetting.chartRect);
                    chartObj.cellRanges = chartSetting.cellRanges;

                    setCss(chartObj.chart.hostElement.parentElement, {
                        top: chartSetting.chartContainerRect.top + 'px',
                        left: chartSetting.chartContainerRect.left + 'px',
                        height: chartSetting.chartContainerRect.height + 'px',
                        width: chartSetting.chartContainerRect.width + 'px'
                    });
                }

            }
            this._chartEngine._undoing = false;
        }

        /*
		 * Overrides the saveNewState method of its base class @see:_ColumnsChangedAction.
		 */
        saveNewState(): boolean {
            this._newCharts = this._chartEngine._getChartSettings();
            return super.saveNewState();
        }
    }

    /*
	 * Defines the _ChartRowsChangedAction class.
	 *
	 * It deals with the undo\redo for insert or delete column of the flexsheet.
	 */
    export class _ChartRowsChangedAction extends _RowsChangedAction {
        private _chartEngine: ChartEngine;
        private _oldCharts: IChartSetting[];
        private _newCharts: IChartSetting[];

        /*
		 * Initializes a new instance of the @see:_ChartRowsChangedAction class.
		 *
		 * @param chartEngine The @see: ChartEngine that the _ChartRowsChangedAction works for.
		 */
        constructor(chartEngine: ChartEngine) {
            super(chartEngine._owner);

            this._chartEngine = chartEngine;
            this._oldCharts = chartEngine._getChartSettings();
        }

        /*
		 * Overrides the undo method of its base class @see:_RowsChangedAction.
		 */
        undo() {
            var chartObj: IChartObject,
                chartSetting: IChartSetting,
                data: any[],
                i: number;

            this._chartEngine._undoing = true;
            super.undo();

            i = this._chartEngine._charts.length - 1;
            for (; i >= 0; i--) {
                chartObj = this._chartEngine._charts[i];
                if (chartObj.sheetIndex === this['_sheetIndex']) {
                    this._chartEngine.removeChart(chartObj.chart);
                }
            }
            for (i = 0; i < this._oldCharts.length; i++) {
                chartSetting = this._oldCharts[i];
                if (chartSetting.sheetIndex === this['_sheetIndex']) {
                    data = this._chartEngine._generateChartData(chartSetting.cellRanges);
                    chartObj = this._chartEngine.addChart(chartSetting.chartType, data, chartSetting.chartRect);
                    chartObj.cellRanges = chartSetting.cellRanges;

                    setCss(chartObj.chart.hostElement.parentElement, {
                        top: chartSetting.chartContainerRect.top + 'px',
                        left: chartSetting.chartContainerRect.left + 'px',
                        height: chartSetting.chartContainerRect.height + 'px',
                        width: chartSetting.chartContainerRect.width + 'px'
                    });
                }

            }
            this._chartEngine._undoing = false;
        }

        /*
		 * Overrides the redo method of its base class @see:_RowsChangedAction.
		 */
        redo() {
            var chartObj: IChartObject,
                chartSetting: IChartSetting,
                data: any[],
                i: number;

            this._chartEngine._undoing = true;
            super.redo();

            i = this._chartEngine._charts.length - 1;
            for (; i >= 0; i--) {
                chartObj = this._chartEngine._charts[i];
                if (chartObj.sheetIndex === this['_sheetIndex']) {
                    this._chartEngine.removeChart(chartObj.chart);
                }
            }
            for (i = 0; i < this._newCharts.length; i++) {
                chartSetting = this._newCharts[i];
                if (chartSetting.sheetIndex === this['_sheetIndex']) {
                    data = this._chartEngine._generateChartData(chartSetting.cellRanges);
                    chartObj = this._chartEngine.addChart(chartSetting.chartType, data, chartSetting.chartRect);
                    chartObj.cellRanges = chartSetting.cellRanges;

                    setCss(chartObj.chart.hostElement.parentElement, {
                        top: chartSetting.chartContainerRect.top + 'px',
                        left: chartSetting.chartContainerRect.left + 'px',
                        height: chartSetting.chartContainerRect.height + 'px',
                        width: chartSetting.chartContainerRect.width + 'px'
                    });
                }

            }
            this._chartEngine._undoing = false;
        }

        /*
		 * Overrides the saveNewState method of its base class @see:_RowsChangedAction.
		 */
        saveNewState(): boolean {
            this._newCharts = this._chartEngine._getChartSettings();
            return super.saveNewState();
        }
    }
}