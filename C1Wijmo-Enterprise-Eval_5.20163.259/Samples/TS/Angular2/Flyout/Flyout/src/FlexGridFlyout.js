"use strict";
var wjcGrid = require('wijmo/wijmo.grid');
var wjcCore = require('wijmo/wijmo');
var wjcSelf = require('./FlexGridFlyout');
window['FlexGridFlyout'] = wjcSelf;
'use strict';
/**
 * Provides flyout menus when the mouse hovers over a FlexGrid's column headers.
 */
var FlexGridFlyout = (function () {
    /**
     * Initializes a new instance of the @see:FlexGridFlyout class.
     *
     * @param flex @see:FlexGrid that will receive the flyout menus.
     */
    function FlexGridFlyout(flex) {
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
    Object.defineProperty(FlexGridFlyout.prototype, "flyout", {
        // ** object model
        /**
         * Gets a reference to the @see:HTMLElement that represents the flyout menu.
         */
        get: function () {
            return this._flyout;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGridFlyout.prototype, "column", {
        /**
         * Gets a reference to the @see:Column that owns the flyout menu currently being shown.
         */
        get: function () {
            return this._col;
        },
        enumerable: true,
        configurable: true
    });
    // ** event handlers
    FlexGridFlyout.prototype._mouseenter = function (e) {
        var _this = this;
        clearTimeout(this._toUpdate);
        this._toUpdate = setTimeout(function () {
            _this._show(e);
        }, FlexGridFlyout._SHOWDELAY);
    };
    FlexGridFlyout.prototype._mouseleave = function (e) {
        var _this = this;
        clearTimeout(this._toUpdate);
        this._toUpdate = setTimeout(function () {
            _this._hide(e);
        }, FlexGridFlyout._HIDEDELAY);
    };
    // ** implementation
    FlexGridFlyout.prototype._show = function (e) {
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
    };
    FlexGridFlyout.prototype._hide = function (e) {
        wjcCore.hidePopup(this._flyout, true, true);
        this._col = null;
    };
    FlexGridFlyout._SHOWDELAY = 900;
    FlexGridFlyout._HIDEDELAY = 600;
    return FlexGridFlyout;
}());
exports.FlexGridFlyout = FlexGridFlyout;
//# sourceMappingURL=FlexGridFlyout.js.map