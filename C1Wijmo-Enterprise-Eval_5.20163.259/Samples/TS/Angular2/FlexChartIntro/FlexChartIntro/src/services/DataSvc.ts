




'use strict';

import { Injectable } from '@angular/core';

// Common data service
@Injectable()
export class DataSvc {
    // data used to generate random items
    getData(countries: string[]): any[] {
        var data = [];
        for (let i = 0; i < countries.length; i++) {
            data.push({
                country: countries[i],
                downloads: Math.round(Math.random() * 20000),
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000
            });
        }
        return data;
    };

    getFunnelData(countries: string[]): any[] {
        var data = [], sales = 10000;
        for (var i = 0; i < countries.length; i++) {
            data.push({
                country: countries[i],
                sales: sales
            });
            sales = sales - Math.round(Math.random() * 2000);
        }
        return data;
    };

    getBoxData(countries: string[]): any[] {
        var data = [],
            d = function () {
                return Math.round(Math.random() * 100);
            };
        for (var i = 0; i < countries.length; i++) {
            data.push({
                country: countries[i],
                downloads: [d(), d(), d(), d(), d(), d(), d(), d(), d(), d(), d(), d()],
                sales: [d(), d(), d(), d(), d(), d(), d(), d(), d(), d(), d()],
                expenses: [d(), d(), d(), d(), d(), d(), d(), d(), d(), d(), d(), d(), d()]
            });
        }
        return data;
    };

}