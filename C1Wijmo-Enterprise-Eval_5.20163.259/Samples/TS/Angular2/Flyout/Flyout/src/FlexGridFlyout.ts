

import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcCore from 'wijmo/wijmo';


import * as wjcSelf from './FlexGridFlyout';
window['FlexGridFlyout'] = wjcSelf;


    'use strict';

    /**
     * Provides flyout menus when the mouse hovers over a FlexGrid's column headers.
     */
    export class FlexGridFlyout {
        _g: wjcGrid.FlexGrid;
        _flyout: HTMLElement;
        _col: wjcGrid.Column;
        _toUpdate: any;

        static _SHOWDELAY = 900;
        static _HIDEDELAY = 600;

        /**
         * Initializes a new instance of the @see:FlexGridFlyout class.
         *
         * @param flex @see:FlexGrid that will receive the flyout menus.
         */
        constructor(flex: wjcGrid.FlexGrid) {
            this._g = flex;

            // create flyout
            this._flyout = document.createElement('div');
            wjcCore.addClass(this._flyout, 'wj-flyout');

            // connect event handlers
            var hdr = flex.columnHeaders.hostElement;
            flex.addEventListener(flex.hostElement, 'mousedown', this._hide.bind(this));
            flex.addEventListener(hdr, 'mouseenter', this._mouseenter.bind(this));
            flex.addEventListener(hdr, 'mouseleave', this._mouseleave.bind(this));
            flex.addEventListener(this._flyout, 'mouseenter', this._mouseenter.bind(this));
            flex.addEventListener(this._flyout, 'mouseleave', this._mouseleave.bind(this));
        }

        // ** object model

        /**
         * Gets a reference to the @see:HTMLElement that represents the flyout menu.
         */
        get flyout(): HTMLElement {
            return this._flyout;
        }
        /**
         * Gets a reference to the @see:Column that owns the flyout menu currently being shown.
         */
        get column(): wjcGrid.Column {
            return this._col;
        }

        // ** event handlers

        _mouseenter(e: MouseEvent) {
            clearTimeout(this._toUpdate);
            this._toUpdate = setTimeout(() => {
                this._show(e);
            }, FlexGridFlyout._SHOWDELAY);
        }
        _mouseleave(e: MouseEvent) {
            clearTimeout(this._toUpdate);
            this._toUpdate = setTimeout(() => {
                this._hide(e);
            }, FlexGridFlyout._HIDEDELAY);
        }

        // ** implementation

        _show(e: MouseEvent) {
            if (e.target == this._g.columnHeaders.hostElement) {
                var ht = this._g.hitTest(e);
                if (ht.cellType == wjcGrid.CellType.ColumnHeader && ht.col > -1) {
                    var rc = this._g.columnHeaders.getCellBoundingRect(0, ht.col);
                    wjcCore.showPopup(this._flyout, rc, true); // display to get width
                    rc.left -= (this._flyout.offsetWidth - rc.width) / 2; // center horizontally
                    wjcCore.showPopup(this._flyout, rc, true); // update display
                    this._col = this._g.columns[ht.col];
                }
            }
        }
        _hide(e: MouseEvent) {
            wjcCore.hidePopup(this._flyout, true, true);
            this._col = null;
        }
    }

