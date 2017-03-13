

import * as wjcGridSheet from 'wijmo/wijmo.grid.sheet';



'use strict';

import { Component, ViewChild, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import { WjGridSheetModule } from 'wijmo/wijmo.angular2.grid.sheet';

@Component({
    selector: 'custom-function-cmp',
    templateUrl: 'src/components/customFunctionCmp.html'
})
export class CustomFunctionCmp {
    // references FlexSheet named 'flexSheet' in the view
    @ViewChild('flexSheet') flexSheet: wjcGridSheet.FlexSheet;

    flexSheetInit(flexSheet: wjcGridSheet.FlexSheet) {
        var self = this;

        if (flexSheet) {
            flexSheet.addCustomFunction('customSumProduct', (range1, range2) => {
                var flexSheet = self.flexSheet,
                    result = 0,
                    val1, val2;

                if (range1.rowSpan === range2.rowSpan && range1.columnSpan === range2.columnSpan) {
                    for (var rowIndex = 0; rowIndex < range1.rowSpan; rowIndex++) {
                        for (var columnIndex = 0; columnIndex < range1.columnSpan; columnIndex++) {
                            val1 = +flexSheet.getCellValue(range1.topRow + rowIndex, range1.leftCol + columnIndex, false);
                            val2 = +flexSheet.getCellValue(range2.topRow + rowIndex, range2.leftCol + columnIndex, false);
                            result += val1 * val2;
                        }
                    }
                }
                return result;
            }, 'Custom SumProduct Function', 2, 2);

            flexSheet.unknownFunction.addHandler((sender: any, e: wjcGridSheet.UnknownFunctionEventArgs) => {
                var result = '',
                    i: number;
                if (e.params) {
                    for (i = 0; i < e.params.length; i++) {
                        result += e.params[i];
                    }
                }
                e.value = result;
            });

            flexSheet.deferUpdate(() => {
                for (var ri = 0; ri < flexSheet.rows.length; ri++) {
                    for (var ci = 0; ci < 3; ci++) {
                        flexSheet.setCellData(ri, ci, ri + ci);
                    }
                }

                flexSheet.setCellData(0, 3, '=customSumProduct(A1:A10, B1:B10)');
                flexSheet.setCellData(1, 3, '=customFunc(1, "B", 3)');
            });
        }
    }
}


const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: CustomFunctionCmp }
]);

@NgModule({
    imports: [CommonModule, routing, WjGridSheetModule],
    declarations: [CustomFunctionCmp],
})
export class CustomFunctionModule {
}

