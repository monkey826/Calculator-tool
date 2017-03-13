
///<reference path="../typings/globals/core-js/index.d.ts"/>
import * as wjcCore from 'wijmo/wijmo';
import * as wjcChart from 'wijmo/wijmo.chart';
import * as wjcChartInteraction from 'wijmo/wijmo.chart.interaction';
import * as wjcChartAnnotation from 'wijmo/wijmo.chart.annotation';
import * as wjcChartAnalytics from 'wijmo/wijmo.chart.analytics';
import * as wjcInput from 'wijmo/wijmo.input';





import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { WjChartModule } from 'wijmo/wijmo.angular2.chart';
import { WjChartInteractionModule } from 'wijmo/wijmo.angular2.chart.interaction';
import { WjChartAnnotationModule } from 'wijmo/wijmo.angular2.chart.annotation';
import { WjChartAnalyticsModule } from 'wijmo/wijmo.angular2.chart.analytics';
import { DataSvc } from './services/DataSvc';
import { Portfolio } from './services/Portfolio';

    'use strict';

    // The Explorer application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})
export class AppCmp {
    protected dataSvc: DataSvc;
    showMovingAverage: boolean;
    showLineMarker: boolean;
    showAnnotation: boolean;
    movingAveragePeriod: number;
    movingAverageType: string;
    searchCompany: Function;
    portfolio: Portfolio;
    private cache: any;
    private chartPeriodClicked: boolean;
    private pOffset: wjcCore.Rect;
    private _changeXContentFunc: Function;
    private _changeYContentFunc: Function;
    private increColor = '#129B14';
    private decreColor = '#BA2418';
    private _chartRendered = false;
    chartType: string;
    dateRange: string;
    volSeriesIsVisible: boolean;
    volYAxis: wjcChart.Axis;
    markerVisible: boolean;
    details: string;
    hasData: boolean;
    mainquote: any;
    @ViewChild('rsChart') rsChart: wjcChart.FlexChart;
    @ViewChild('stChart') stChart: wjcChart.FlexChart;
    @ViewChild('rangeSelector') rangeSelector: wjcChartInteraction.RangeSelector;
    @ViewChild('volSeries') volSeries: wjcChart.Series;
    @ViewChild('al') al: wjcChartAnnotation.AnnotationLayer;

    constructor( @Inject(DataSvc) dataSvc: DataSvc) {
        this.cache = {};
        this.dataSvc = dataSvc;
        this._init();
    }

    _init() {
        var cache = this.cache;

        this.hasData = false;
        this.markerVisible = false;
        this.volYAxis = new wjcChart.Axis(0);
        this.volSeriesIsVisible = true;
        this.showAnnotation = false;
        this.showLineMarker = false;
        this.chartType = 'Line';
        this.portfolio = this.dataSvc.getPortfolio(this.dataSvc);
        this.portfolio.itemsChanged.addHandler(this.itemsChanged.bind(this));
        this.movingAveragePeriod = 10;
        this.movingAverageType = 'Simple';
        this.searchCompany = (query, max, callback) => {
            // try getting the result from the cache
            var result = cache[query];
            if (result) {
                callback(result);
                return;
            }

            // not in cache, get from server
            this.dataSvc.getStockInfo({ search: query, max: max }).subscribe(result => {
                // parse result
                var lines = result.split('\r'),
                    matches = [];
                for (var i = 0; i < lines.length; i++) {
                    var items = lines[i].split('\t');
                    if (items.length == 2) {
                        var symbol = items[0].trim(),
                            name = items[1].trim(),
                            symbolName = '<b>' + symbol + '</b>: ' + name;
                        matches.push({ symbol: symbol, name: name, symbolName: symbolName });
                    }
                }

                // store result in cache
                cache[query] = matches;

                // and return the result
                callback(matches);
            }, error => {
                console.log('error: ' + error.responseText);
                cache[query] = null; // << no point in trying this query again
                callback(null);
            });
        };
        this._changeXContentFunc = this._changeXContent.bind(this);
        this._changeYContentFunc = this._changeYContent.bind(this);
    }

    itemsChanged() {
        if (this.rsChart && this.portfolio && this.rsChart.series.length === 0) {
            var paneOffset = wjcCore.getElementRect(document.querySelector('.chartcontainer')),
                overlapEle = <HTMLElement>document.querySelector('.overlap');

            if (overlapEle) {
                overlapEle.style.top = paneOffset.top + 'px';
                overlapEle.style.left = paneOffset.left + 'px';
                overlapEle.style.width = paneOffset.width + 'px';
                overlapEle.style.height = paneOffset.height + 'px';
            }
        }
        if (this.portfolio.mainQuoteUpdated && this.portfolio.view.items.length > 1) {
            var item = this.portfolio.view.items[1],
                data = item.chartData,
                len = data.length,
                changeVal;

            this.mainquote = {
            }
            this.mainquote.name = item.name + '(' + item.symbol + ')';
            this.mainquote.color = item.color;

            if (!data[len - 1] || !data[len - 2]) {
                return;
            }
            changeVal = data[len - 1].close - data[len - 2].close;
            this.mainquote.price = data[len - 1].close;
            this.mainquote.changeColor = changeVal < 0 ? this.decreColor : this.increColor;
            this.mainquote.changePrice = (changeVal > 0 ? '+' : '') + changeVal.toFixed(2).toString();
            this.portfolio.mainQuoteUpdated = false;
        }
    }

    stChartRendered() {
        // customize tooltip
        if (this.stChart) {
            var chart = this.stChart,
                ele = this.stChart.hostElement,
                item;

            if (this.volSeries) {
                this.volSeries.axisY = this.volYAxis;
                if (this.volSeries.getValues(0)) {
                    this.volYAxis.max = Math.max.apply(null, this.volSeries.getValues(0)) * 8;
                }
            }

            this.hasData = false;
            if (this.portfolio.view.items && this.portfolio.view.items[1]) {
                item = this.portfolio.view.items[1];
                this.hasData = !!(item.chartData && item.chartData.length && item.chart);
            }
            this.pOffset = wjcCore.getElementRect(ele.querySelector('.wj-plot-area'));
            
            if (!this._chartRendered) {
                this._chartRendered = true;
                chart.tooltip.content = '';
                ele.addEventListener('click', function (evt) {
                });
                ele.addEventListener('mousemove', e => {
                    this.setQuotesDetailInfo(e);
                });

                // control line marker
                ele.addEventListener('mouseenter', e => {
                    this.markerVisible = true;
                });

                ele.addEventListener('mouseleave', e => {
                    this.markerVisible = false;
                });

                // for touch
                if ('ontouchstart' in window) {
                    ele.addEventListener('touchmove', e => {
                        this.setQuotesDetailInfo(e);
                        e.preventDefault();
                    });
                    ele.addEventListener('touchstart', e => {
                        this.markerVisible = true;
                        this.setQuotesDetailInfo(e);
                    });
                }
            }
        }
    }
    
    //set main quote detail information
    setQuotesDetailInfo(e) {
        var series = this.stChart.series,
            hitTest, itmSource, detail = '',
            displaySeriesNum = this.portfolio.displayChartSeriesNum,
            point, pointIndex,
            ptMarker, annoItem;
        if (!series || series.length === 0) {
            return;
        }
        if (e) {
            point = e instanceof MouseEvent ?
                new wjcCore.Point(e.pageX, e.pageY) :
                new wjcCore.Point(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
        }

        (<any>series).forEach(ser => {
            if (e) {
                // each series has different data range
                hitTest = ser.hitTest(new wjcCore.Point(point.x, NaN));
                if (hitTest == null || hitTest.x == null || hitTest.y == null) {
                    return;
                }
                pointIndex = hitTest.pointIndex;
            } else {
                pointIndex = ser.itemsSource.length - 1;
            }

            var itm = ser.itemsSource[pointIndex],
                dateStr;

            if (!itm || ser instanceof wjcChartAnalytics.MovingAverage ||
                ser.binding === 'volume') {
                return;
            }
            annoItem = this.al.getItem(ser.name);
            if (annoItem) {
                if (annoItem.pointIndex !== pointIndex) {
                    annoItem.pointIndex = pointIndex;
                }
            }

            dateStr = wjcCore.Globalize.format(itm.date, 'MMM dd, yyyy');

            if (displaySeriesNum === 1) {//include volume, trend series
                if (ser.binding === 'high,low,open,close' && e) {
                    detail = dateStr +
                        ' Open: ' + itm.open +
                        ' High: ' + itm.high +
                        ' Low: ' + itm.low +
                        ' Close: ' + itm.close +
                        ' Volume: ' + itm.volume;
                } else {
                    detail = dateStr +
                        ' Price: ' + itm.close +
                        ' Volume: ' + itm.volume;
                }
            } else {
                detail += this._getCurPointQuoteInfo(ser.name, itm.closeChg, ser.style.stroke);
            }
        })

        this.details = detail;
    }
    
    private _getCurPointQuoteInfo(syml, info, symlColor) {
        var color = this.increColor, pSymbol = '';

        if (info < 0) {
            color = this.decreColor;
        } else {
            pSymbol = "+";
        }

        return '<span style="color: ' + symlColor + ';">' + syml + '</span><span style="color:' + color + ';">' +
            pSymbol + (info * 100).toFixed(2) + '%'
            + '</span> ';
    }

    rsChartRendered() {
        // customize tooltip
        if (this.rsChart) {
            this.rsChart.tooltip.content = '';

            this._resetRangeSelector();
        }
    }

    chartPeriodChange(period) {
        this.portfolio.chartPeriod = period;
        this._resetRangeSelector();
    }

    private _resetRangeSelector() {
        this.chartPeriodClicked = true;
        this.rangeSelector.max = null;
        this.rangeSelector.min = this.portfolio.getChartStartDate().valueOf();
        this.chartPeriodClicked = false;
    }

    rangeChanged(event) {
        var dateRangeSelector = this.rangeSelector,
            activeBtn = <HTMLElement>document.querySelector('.btn-group-xs .btn.active');

        if (!this.chartPeriodClicked && activeBtn) {
            wjcCore.removeClass(activeBtn, 'active');
            activeBtn.blur();
        }
        this._updateStChartRange(dateRangeSelector.min, dateRangeSelector.max);

        //update the date range
        this.dateRange = wjcCore.Globalize.format(new Date(dateRangeSelector.min), 'MMM dd, yyyy') +
            ' - ' + wjcCore.Globalize.format(new Date(dateRangeSelector.max), 'MMM dd, yyyy');
    }
    //update stock chart range
    private _updateStChartRange(min, max) {
        this.portfolio.startDate = new Date(min);
        this.portfolio.endDate = new Date(max);
    }

    changeYContent() {
        return this._changeYContentFunc;
    };

    private _changeYContent(hitTest, pt) {
        var contents = this._getMarkerContents(new wjcCore.Point(pt.x, pt.y));
        return contents && contents.y ? contents.y.toString() : '';
    }

    changeXContent() {
        return this._changeXContentFunc;
    };

    private _changeXContent(hitTest, pt) {
        var contents = this._getMarkerContents(new wjcCore.Point(pt.x, pt.y));
        return contents && contents.x ? contents.x.toString() : '';
    }

    //get line marker content
    private _getMarkerContents(pt) {
        var chart = this.stChart, ht, xContent, yContent,
            newHitPoint = new wjcCore.Point(pt.x, NaN), content = '';

        if (!chart) {
            return;
        }
        if (chart.series.length < 1) {
            return;
        }
        //calculate the y value
        yContent = this._getAxixYValue(pt.y);
        ht = chart.series[0].hitTest(newHitPoint);

        if (ht.x && ht.y !== null) {
            xContent = wjcCore.Globalize.formatDate(ht.x, 'MM-dd-yyyy');
        }
        return { x: xContent, y: yContent };
    }

    private _getAxixYValue(y) {
        var chart = this.stChart,
            yVal, axisYRange, axisYMax, axisYMin;

        if (this.pOffset === undefined) {
            return 0;
        }

        axisYMax = chart.axisY.actualMax;
        axisYMin = chart.axisY.actualMin;
        axisYRange = axisYMax - axisYMin;
        if ((this.showMovingAverage && chart.series.length === 3) ||
            (!this.showMovingAverage && chart.series.length === 2)) {
            yVal = (axisYMax - ((y - this.pOffset.top) / this.pOffset.height) * axisYRange)
                .toFixed(2);
        } else {
            yVal = ((axisYMax - ((y - this.pOffset.top) / this.pOffset.height) * axisYRange) * 100)
                .toFixed(2) + '%';
        }
        return yVal;
    }

    getPointIndex(xVal) {
        var data = this.portfolio.view.items[1] && this.portfolio.view.items[1].chartData,
            i, len;

        if (data) {
            for (i = 0, len = data.length; i < len; i++) {
                if (xVal.getTime() === data[i].date.getTime()) {
                    return i;
                }
            }
        }
    }

    exportImage(exportMenu) {
        this.stChart.saveImageToFile('chart.' + exportMenu.selectedValue || 'png');
    }

    periodChanged = (input: wjcInput.InputNumber) => {
        if (input.value < input.min || input.value > input.max) {
            return;
        }
        this.movingAveragePeriod = input.value;
    };
    }

@NgModule({
    imports: [WjInputModule, WjChartModule, WjChartInteractionModule, WjChartAnnotationModule,
        WjChartAnalyticsModule, BrowserModule, FormsModule, HttpModule],
    declarations: [AppCmp],
    providers: [DataSvc],
    bootstrap: [AppCmp]
})
export class AppModule {
}

enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);
