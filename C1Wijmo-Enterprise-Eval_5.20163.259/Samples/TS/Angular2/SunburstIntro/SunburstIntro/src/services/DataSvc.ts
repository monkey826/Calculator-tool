




'use strict';

import { Injectable } from '@angular/core';
import * as wijmo from 'wijmo/wijmo';

// Common data service
@Injectable()
export class DataSvc {
    getData(): any[] {
        var data = [],
            times = [['Jan', 'Feb', 'Mar'], ['Apr', 'May', 'June'], ['Jul', 'Aug', 'Sep'], ['Oct', 'Nov', 'Dec']],
            years = [], year = new Date().getFullYear(), yearLen, i, quarterAdded = false;

        yearLen = Math.max(Math.round(Math.abs(5 - Math.random() * 10)), 3);
        for (i = yearLen; i > 0; i--) {
            years.push(year - i);
        }
        // populate itemsSource
        years.forEach((y, i) => {
            var addQuarter = Math.random() > 0.5;
            if (!quarterAdded && i === years.length - 1) {
                //ensure add at least one quarter.
                addQuarter = true;
            }
            if (addQuarter) {
                quarterAdded = true;
                times.forEach((q, idx) => {
                    var addMonth = Math.random() > 0.5,
                        quar = 'Q' + (idx + 1);
                    if (addMonth) {
                        q.forEach(m => {
                            data.push({
                                year: y.toString(),
                                quarter: quar,
                                month: m,
                                value: Math.round(Math.random() * 100)
                            });
                        });
                    } else {
                        data.push({
                            year: y.toString(),
                            quarter: quar,
                            value: Math.round(Math.random() * 400)
                        });
                    }
                });
            } else {
                data.push({
                    year: y.toString(),
                    value: Math.round(Math.random() * 1200)
                });
            }
        });

        return data;
    }

    getHierarchicalData(): any[] {
        var data = [],
            times = [['Jan', 'Feb', 'Mar'], ['Apr', 'May', 'June'], ['Jul', 'Aug', 'Sep'], ['Oct', 'Nov', 'Dec']],
            years = [], year = new Date().getFullYear(), yearLen, i, quarterAdded = false;

        yearLen = Math.max(Math.round(Math.abs(5 - Math.random() * 10)), 3);
        for (i = yearLen; i > 0; i--) {
            years.push(year - i);
        }
        // populate itemsSource
        years.forEach((y, i) => {
            var addQuarter = Math.random() > 0.5;
            if (!quarterAdded && i === years.length - 1) {
                //ensure add at least one quarter.
                addQuarter = true;
            }
            var year: any = {
                year: y.toString(),
            };
            if (addQuarter) {
                var quarters = [];
                quarterAdded = true;
                times.forEach((q, idx) => {
                    var addMonth = Math.random() > 0.5,
                        quarter: any = {
                            quarter: 'Q' + (idx + 1)
                        };

                    if (addMonth) {
                        var months = [];
                        q.forEach(m => {
                            months.push({
                                month: m,
                                value: Math.round(Math.random() * 100)
                            });
                        });
                        quarter.items = months;
                    } else {
                        quarter.value = Math.round(Math.random() * 400);
                    }
                    quarters.push(quarter);
                });
                year.items = quarters;
            } else {
                year.value = Math.round(Math.random() * 1200)
            }
            data.push(year);
        });

        return data;
    }

    getThemingData(): any[] {
        var data = [{
            name: '5',
            items: [{
                name: '4',
                items: [{
                    name: '3',
                    items: [{
                        name: '2',
                        items: [{
                            name: '1',
                            value: 1
                        }]
                    }]
                }]
            }]
        }];
        return data;
    }

    getGroupCVData(): wijmo.CollectionView {
        var data = [],
            quarters = ['Q1', 'Q2', 'Q3', 'Q4'],
            months = [[{
                name: 'Jan',
                value: 1
            }, {
                name: 'Feb',
                value: 2
            }, {
                name: 'Mar',
                value: 3
            }], [{
                name: 'Apr',
                value: 4
            }, {
                name: 'May',
                value: 5
            }, {
                name: 'June',
                value: 6
            }], [{
                name: 'Jul',
                value: 7
            }, {
                name: 'Aug',
                value: 8
            }, {
                name: 'Sep',
                value: 9
            }], [{
                name: 'Oct',
                value: 10
            }, {
                name: 'Nov',
                value: 11
            }, {
                name: 'Dec',
                value: 12
            }]],
            years = [], year = new Date().getFullYear(), yearLen, i, len = 100;

        yearLen = 3;
        for (i = yearLen; i > 0; i--) {
            years.push(year - i);
        }

        var y, q, m;

        for (i = 0; i < len; i++) {
            y = Math.floor(Math.random() * yearLen);
            q = Math.floor(Math.random() * 4);
            m = Math.floor(Math.random() * 3);

            data.push({
                year: years[y],
                quarter: quarters[q],
                month: months[q][m].name,
                monthVal: months[q][m].value,
                value: Math.round(Math.random() * 100)
            });
        }

        var cv = new wijmo.CollectionView(data);


        cv.sortDescriptions.push(new wijmo.SortDescription('year', false));
        cv.sortDescriptions.push(new wijmo.SortDescription('quarter', false));
        cv.sortDescriptions.push(new wijmo.SortDescription('monthVal', false));
        cv.groupDescriptions.push(new wijmo.PropertyGroupDescription('year'));
        cv.groupDescriptions.push(new wijmo.PropertyGroupDescription('quarter'));
        cv.groupDescriptions.push(new wijmo.PropertyGroupDescription('month'));
        return cv;
    }

}
