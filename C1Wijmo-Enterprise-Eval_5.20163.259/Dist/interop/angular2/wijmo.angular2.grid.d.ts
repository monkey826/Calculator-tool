/*
    *
    * Wijmo Library 5.20163.259
    * http://wijmo.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    *
    * Licensed under the Wijmo Commercial License.
    * sales@wijmo.com
    * http://wijmo.com/products/wijmo-5/license/
    *
    */
/**
* Contains Angular 2 components for the <b>wijmo.grid</b> module.
*
* <b>wijmo.angular2.grid</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>&lt;p&gt;Here is a data bound FlexGrid control with four columns:&lt;/p&gt;
* &lt;wj-flex-grid [itemsSource]="data"&gt;
*   &lt;wj-flex-grid-column
*     [header]="'Country'"
*     [binding]="'country'"&gt;
*   &lt;/wj-flex-grid-column&gt;
*   &lt;wj-flex-grid-column
*     [header]="'Sales'"
*     [binding]="'sales'"&gt;
*   &lt;/wj-flex-grid-column&gt;
*   &lt;wj-flex-grid-column
*     [header]="'Expenses'"
*     [binding]="'expenses'"&gt;
*   &lt;/wj-flex-grid-column&gt;
*   &lt;wj-flex-grid-column
*     [header]="'Downloads'"
*     [binding]="'downloads'"&gt;
*   &lt;/wj-flex-grid-column&gt;
* &lt;/wj-flex-grid&gt;</pre>
*
*/
import { EventEmitter, AfterViewInit } from '@angular/core';
import { ElementRef, Injector, ViewContainerRef, TemplateRef, Renderer } from '@angular/core';
import { OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import * as ngCore from '@angular/core';
import { IWjComponentMetadata } from 'wijmo/wijmo.angular2.directiveBase';
/**
 * Angular 2 component for the @see:wijmo.grid.FlexGrid control.
 *
 * Use the <b>wj-flex-grid</b> component to add <b>FlexGrid</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>. For example:
*
* <pre>&lt;p&gt;Here is a data bound FlexGrid control with four columns:&lt;/p&gt;
* &lt;wj-flex-grid [itemsSource]="data"&gt;
*   &lt;wj-flex-grid-column
*     [header]="'Country'"
*     [binding]="'country'"&gt;
*   &lt;/wj-flex-grid-column&gt;
*   &lt;wj-flex-grid-column
*     [header]="'Sales'"
*     [binding]="'sales'"&gt;
*   &lt;/wj-flex-grid-column&gt;
*   &lt;wj-flex-grid-column
*     [header]="'Expenses'"
*     [binding]="'expenses'"&gt;
*   &lt;/wj-flex-grid-column&gt;
*   &lt;wj-flex-grid-column
*     [header]="'Downloads'"
*     [binding]="'downloads'"&gt;
*   &lt;/wj-flex-grid-column&gt;
* &lt;/wj-flex-grid&gt;</pre>
 *
 * The <b>WjFlexGrid</b> component is derived from the <b>FlexGrid</b> control and
 * inherits all its properties, events and methods.
 *
 * The <b>wj-flex-grid</b> component may contain the following child components:
 * @see:wijmo/wijmo.angular2.grid.detail.WjFlexGridDetail
 * , @see:wijmo/wijmo.angular2.grid.filter.WjFlexGridFilter
 *  and @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn.
*/
export declare class WjFlexGrid extends wijmo.grid.FlexGrid implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<{}>;
    wjModelProperty: string;
    gotFocusNg: EventEmitter<{}>;
    lostFocusNg: EventEmitter<{}>;
    beginningEditNg: EventEmitter<{}>;
    cellEditEndedNg: EventEmitter<{}>;
    cellEditEndingNg: EventEmitter<{}>;
    prepareCellForEditNg: EventEmitter<{}>;
    formatItemNg: EventEmitter<{}>;
    resizingColumnNg: EventEmitter<{}>;
    resizedColumnNg: EventEmitter<{}>;
    autoSizingColumnNg: EventEmitter<{}>;
    autoSizedColumnNg: EventEmitter<{}>;
    draggingColumnNg: EventEmitter<{}>;
    draggedColumnNg: EventEmitter<{}>;
    sortingColumnNg: EventEmitter<{}>;
    sortedColumnNg: EventEmitter<{}>;
    resizingRowNg: EventEmitter<{}>;
    resizedRowNg: EventEmitter<{}>;
    autoSizingRowNg: EventEmitter<{}>;
    autoSizedRowNg: EventEmitter<{}>;
    draggingRowNg: EventEmitter<{}>;
    draggedRowNg: EventEmitter<{}>;
    deletingRowNg: EventEmitter<{}>;
    loadingRowsNg: EventEmitter<{}>;
    loadedRowsNg: EventEmitter<{}>;
    rowEditStartingNg: EventEmitter<{}>;
    rowEditStartedNg: EventEmitter<{}>;
    rowEditEndingNg: EventEmitter<{}>;
    rowEditEndedNg: EventEmitter<{}>;
    rowAddedNg: EventEmitter<{}>;
    groupCollapsedChangedNg: EventEmitter<{}>;
    groupCollapsedChangingNg: EventEmitter<{}>;
    itemsSourceChangedNg: EventEmitter<{}>;
    selectionChangingNg: EventEmitter<{}>;
    selectionChangedNg: EventEmitter<{}>;
    scrollPositionChangedNg: EventEmitter<{}>;
    updatingViewNg: EventEmitter<{}>;
    updatedViewNg: EventEmitter<{}>;
    updatingLayoutNg: EventEmitter<{}>;
    updatedLayoutNg: EventEmitter<{}>;
    pastingNg: EventEmitter<{}>;
    pastedNg: EventEmitter<{}>;
    pastingCellNg: EventEmitter<{}>;
    pastedCellNg: EventEmitter<{}>;
    copyingNg: EventEmitter<{}>;
    copiedNg: EventEmitter<{}>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
/**
 * Angular 2 component for the @see:wijmo.grid.Column control.
 *
 * The <b>wj-flex-grid-column</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.grid.WjFlexGrid component.
 *
 * Use the <b>wj-flex-grid-column</b> component to add <b>Column</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexGridColumn</b> component is derived from the <b>Column</b> control and
 * inherits all its properties, events and methods.
 *
 * The <b>wj-flex-grid-column</b> component may contain a @see:wijmo/wijmo.angular2.grid.WjFlexGridCellTemplate child directive.
*/
export declare class WjFlexGridColumn extends wijmo.grid.Column implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<{}>;
    wjProperty: string;
    isSelectedChangePC: EventEmitter<{}>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
/**
* Angular 2 directive for the @see:FlexGrid cell templates.
*
* The <b>wjFlexGridCellTemplate</b> directive defines a template for a certain
* cell type in @see:FlexGrid. The template should be defined on a <b>&lt;template&gt;</b> element
* and must contain a <b>cellType</b> attribute that
* specifies the @see:wijmo/wijmo.angular2.grid.CellTemplateType. Depending on the template's cell type,
* the <b>&lt;template&gt;</b> element with the <b>wjFlexGridCellTemplate</b> directive must be a child
* of either @see:wijmo/wijmo.angular2.grid.WjFlexGrid
* or @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn directives.
*
* Column-specific cell templates must be contained in <b>wj-flex-grid-column</b>
* components, and cells that are not column-specific (like row header or top left cells)
* must be contained in the <b>wj-flex-grid</b> component.
*
* The <b>&lt;template&gt;</b> element with the <b>wjFlexGridCellTemplate</b> directive
* may contain an arbitrary HTML fragment with Angular 2 interpolation expressions and
* other components and directives.
*
* Bindings in HTML fragment can use the <b>cell</b> local template variable containing the cell context object,
* with <b>col</b>, <b>row</b>, and <b>item</b> properties that refer to the @see:Column,
* @see:Row, and <b>Row.dataItem</b> objects pertaining to the cell.
*
* For cell types like <b>Group</b> and <b>CellEdit</b>, an additional <b>value</b>
* property containing an unformatted cell value is provided. For example, here is a
* @see:FlexGrid control with templates for row header cells and, regular
* and column header cells of the Country column:
*
* <pre>import * as wjGrid from 'wijmo/wijmo.angular2.grid';
* &nbsp;
* &#64;Component({
*     directives: [wjGrid.WjFlexGrid, wjGrid.WjFlexGridColumn, wjGrid.WjFlexGridCellTemplate],
*     template: `
* &lt;wj-flex-grid [itemsSource]="data"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'RowHeader'" let-cell="cell"&gt;
*     {&#8203;{cell.row.index}}
*   &lt;/template&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'RowHeaderEdit'"&gt;
*     ...
*   &lt;/template&gt;
* &nbsp;
*   &lt;wj-flex-grid-column [header]="'Country'" [binding]="'country'"&gt;
*     &lt;template wjFlexGridCellTemplate [cellType]="'ColumnHeader'" let-cell="cell"&gt;
*       &lt;img src="resources/globe.png" /&gt;
*         {&#8203;{cell.col.header}}
*     &lt;/template&gt;
*     &lt;template wjFlexGridCellTemplate [cellType]="'Cell'" let-cell="cell"&gt;
*       &lt;img src="resources/{&#8203;{cell.item.country}}.png" /&gt;
*       {&#8203;{cell.item.country}}
*     &lt;/template&gt;
*   &lt;/wj-flex-grid-column&gt;
*   &lt;wj-flex-grid-column [header]="'Sales'" [binding]="'sales'"&gt;&lt;/wj-flex-grid-column&gt;
* &lt;/wj-flex-grid&gt;
* `,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
* For more detailed information on specific cell type templates, refer to the
* documentation for @see:wijmo/wijmo.angular2.grid.CellTemplateType enumeration.
*
* The <b>wjFlexGridCellTemplate</b> directive supports the following attributes:
*
* <dl class="dl-horizontal">
*   <dt>cellType</dt>
*   <dd>
*     The <b>CellTemplateType</b> value defining the type of cell to which the template is applied.
*   </dd>
*   <dt>cellOverflow</dt>
*   <dd>
*     Defines the <b>style.overflow</b> property value for cells.
*   </dd>
* </dl>
*
* The <b>cellType</b> attribute takes any of the following enumerated values:
*
* <b>Cell</b>
*
* Defines a regular (data) cell template. Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn component.
* For example, this cell template shows flags in the cells of Country column:
*
* <pre>&lt;wj-flex-grid-column [header]="'Country'" [binding]="'country'"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'Cell'" let-cell="cell"&gt;
*     &lt;img src="resources/{&#8203;{cell.item.country}}.png" /&gt;
*     {&#8203;{cell.item.country}}
*   &lt;/template&gt;
* &lt;/wj-flex-grid-column&gt;</pre>
*
* If <b>Group</b> template is not provided for a hierarchical @see:FlexGrid (that is, one with the <b>childItemsPath</b> property
* specified), non-header cells in group rows of
* this @see:Column also use this template.
*
* <b>CellEdit</b>
*
* Defines a template for a cell in edit mode. Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn component.
* This cell type has an additional <b>cell.value</b> property available for binding. It contains the
* original cell value before editing, and the updated value after editing.

* For example, here is a template that uses the Wijmo @see:InputNumber control as an editor
* for the "Sales" column:
*
* <pre>&lt;wj-flex-grid-column [header]="'Sales'" [binding]="'sales'"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'CellEdit'"&gt;
*     &lt;wj-input-number [(value)]="cell.value" [step]="1"&gt;&lt;/wj-input-number&gt;
*   &lt;/template&gt;
* &lt;/wj-flex-grid-column&gt;</pre>
*
* <b>ColumnHeader</b>
*
* Defines a template for a column header cell. Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn component.
* For example, this template adds an image to the header of the "Country" column:
*
* <pre>&lt;wj-flex-grid-column [header]="'Country'" [binding]="'country'"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'ColumnHeader'" let-cell="cell"&gt;
*     &lt;img src="resources/globe.png" /&gt;
*       {&#8203;{cell.col.header}}
*   &lt;/template&gt;
* &lt;/wj-flex-grid-column&gt;</pre>
*
* <b>RowHeader</b>
*
* Defines a template for a row header cell. Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGrid component.
* For example, this template shows row indices in the row headers:
*
* <pre>&lt;wj-flex-grid [itemsSource]="data"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'RowHeader'" let-cell="cell"&gt;
*     {&#8203;{cell.row.index + 1}}
*   &lt;/template&gt;
* &lt;/wj-flex-grid&gt;</pre>
*
* Note that this template is applied to a row header cell, even if it is in a row that is
* in edit mode. In order to provide an edit-mode version of a row header cell with alternate
* content, define the <b>RowHeaderEdit</b> template.
*
* <b>RowHeaderEdit</b>
*
* Defines a template for a row header cell in edit mode. Must be a child of the
* @see:wijmo/wijmo.angular2.grid.WjFlexGrid component. For example, this template shows dots in the header
* of rows being edited:
*
* <pre>&lt;wj-flex-grid [itemsSource]="data"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'RowHeaderEdit'"&gt;
*     ...
*   &lt;/template&gt;
* &lt;/wj-flex-grid&gt;</pre>
*
* Use the following <b>RowHeaderEdit</b> template to add the standard edit-mode indicator to cells where the <b>RowHeader</b> template
* applies:
*
* <pre>&lt;wj-flex-grid [itemsSource]="data"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'RowHeaderEdit'"&gt;
*     {&#8203;{&amp;#x270e;}}
*   &lt;/template&gt;
* &lt;/wj-flex-grid&gt;</pre>
*
* <b>TopLeft</b>
*
* Defines a template for the top left cell. Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGrid component.
* For example, this template shows a down/right glyph in the top-left cell of the grid:
*
* <pre>&lt;wj-flex-grid [itemsSource]="data"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'TopLeft'"&gt;
*     &lt;span class="wj-glyph-down-right"&gt;&lt;/span&gt;
*   &lt;/template&gt;
* &lt;/wj-flex-grid&gt;</pre>
*
* <b>GroupHeader</b>
*
* Defines a template for a group header cell in a @see:GroupRow, Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn component.
*
* The <b>cell.row</b> property contains an instance of the <b>GroupRow</b> class. If the grouping comes
* from @see:CollectionView, the <b>cell.item</b> property references the @see:CollectionViewGroup object.
*
* For example, this template uses a checkbox element as an expand/collapse toggle:
*
* <pre>&lt;wj-flex-grid-column [header]="'Country'" [binding]="'country'"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'GroupHeader'" let-cell="cell"&gt;
*     &lt;input type="checkbox" [(ngModel)]="cell.row.isCollapsed"/&gt;
*     {&#8203;{cell.item.name}} ({&#8203;{cell.item.items.length}} items)
*   &lt;/template&gt;
* &lt;/wj-flex-grid-column&gt;</pre>
*
* <b>Group</b>
*
* Defines a template for a regular cell (not a group header) in a @see:GroupRow. Must be a child of the
* @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn component. This cell type has an additional <b>cell.value</b> property available for
* binding. In cases where columns have the <b>aggregate</b> property specified, it contains the unformatted
* aggregate value.
*
* For example, this template shows aggregate's value and kind for group row cells in the "Sales"
* column:
*
* <pre>&lt;wj-flex-grid-column [header]="'Sales'" [binding]="'sales'" [aggregate]="'Avg'"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'Group'" let-cell="cell"&gt;
*     Average: {&#8203;{cell.value | number:'1.0-0'}}
*   &lt;/template&gt;
* &lt;/wj-flex-grid-column&gt;</pre>
*
* <b>ColumnFooter</b>
*
* Defines a template for a regular cell in a <b>columnFooters</b> panel. Must be a child of the
* @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn component. This cell type has an additional <b>cell.value</b>
* property available for binding that contains a cell value.
*
* For example, this template shows aggregate's value and kind for a footer cell in the "Sales"
* column:
*
* <pre>&lt;wj-flex-grid-column [header]="'Sales'" [binding]="'sales'" [aggregate]="'Avg'"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'ColumnFooter'" let-cell="cell"&gt;
*     Average: {&#8203;{cell.value | number:'1.0-0'}}
*   &lt;/template&gt;
* &lt;/wj-flex-grid-column&gt;</pre>
*
* <b>BottomLeft</b>
*
* Defines a template for the bottom left cells (at the intersection of the row header and column footer cells).
* Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGrid component.
* For example, this template shows a sigma glyph in the bottom-left cell of the grid:
*
* <pre>&lt;wj-flex-grid [itemsSource]="data"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'BottomLeft'"&gt;
*     &amp;#931;
*   &lt;/template&gt;
* &lt;/wj-flex-grid&gt;</pre>
*
* <b>NewCellTemplate</b>
*
* Defines a cell in a new row template. Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn component.
* Note that the <b>cell.item</b> property is undefined for this type of a cell.
* For example, this cell template shows a placeholder in the Date column's cell in the "new row" item:
*
* <pre>&lt;wj-flex-grid-column [header]="'Date'" [binding]="'date'"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'NewCellTemplate'"&gt;
*     Enter a date here
*   &lt;/template&gt;
* &lt;/wj-flex-grid-column&gt;</pre>
*/
export declare class WjFlexGridCellTemplate implements ngCore.OnInit, ngCore.OnDestroy {
    viewContainerRef: ViewContainerRef;
    templateRef: TemplateRef<any>;
    elRef: ElementRef;
    private domRenderer;
    cdRef: ChangeDetectorRef;
    wjFlexGridCellTemplate: any;
    cellTypeStr: string;
    cellOverflow: string;
    cellType: CellTemplateType;
    valuePaths: Object;
    autoSizeRows: boolean;
    grid: WjFlexGrid;
    column: WjFlexGridColumn;
    ownerControl: any;
    constructor(viewContainerRef: ViewContainerRef, templateRef: TemplateRef<any>, elRef: ElementRef, parentCmp: any, domRenderer: Renderer, injector: Injector, cdRef: ChangeDetectorRef);
    static _getTemplContextProp(templateType: CellTemplateType): string;
    ngOnInit(): void;
    ngOnDestroy(): void;
    _instantiateTemplate(parent: HTMLElement): {
        viewRef: ngCore.EmbeddedViewRef<any>;
        rootElement: Element;
    };
    private _attachToControl();
}
/**
* Defines the type of cell on which a template is to be applied. This value is specified in the <b>cellType</b> attribute
* of the @see:wijmo/wijmo.angular2.grid.WjFlexGridCellTemplate directive.
*/
export declare enum CellTemplateType {
    /** Defines a regular (data) cell. */
    Cell = 0,
    /** Defines a cell in edit mode. */
    CellEdit = 1,
    /** Defines a column header cell. */
    ColumnHeader = 2,
    /** Defines a row header cell. */
    RowHeader = 3,
    /** Defines a row header cell in edit mode. */
    RowHeaderEdit = 4,
    /** Defines a top left cell. */
    TopLeft = 5,
    /** Defines a group header cell in a group row. */
    GroupHeader = 6,
    /** Defines a regular cell in a group row. */
    Group = 7,
    /** Defines a cell in a new row template. */
    NewCellTemplate = 8,
    /** Defines a column footer cell. */
    ColumnFooter = 9,
    /** Defines a bottom left cell (at the intersection of the row header and column footer cells). **/
    BottomLeft = 10,
}
export declare class WjGridModule {
}
