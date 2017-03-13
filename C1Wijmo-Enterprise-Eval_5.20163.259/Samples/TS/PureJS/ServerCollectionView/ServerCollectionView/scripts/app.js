﻿onload = function () {

    // load data from the server using our ServerCollectionView
    // this CollectionView performs sorting and paging on the server.
    // it does not support filtering or write operations.
    var view = new wijmo.collections.ServerCollectionView('DataHandler.ashx', {
        pageSize: 8,
        loaded: function () { // show current page/page count when data loads
            var currPage = wijmo.format('Page {page:n0} of {count:n0}', {
                page: view.pageIndex + 1,
                count: view.pageCount
            });
            document.getElementById('txtCurrent').value = currPage;
        }
    });

    // bind a FlexGrid to the ServerCollectionView
    // make the grid read-only since the ServerCollectionView does not support writing
    // users can sort the data on the server by clicking the grid's column headers
    var theGrid = new wijmo.grid.FlexGrid('#theGrid', {
        itemsSource: view,
        isReadOnly: true // our ServerCollectionView doesn't support writing
    });

    // handle pager buttons
    // clicking these buttons will load the requested page from the server
    // and the grid will be updated automatically
    document.getElementById('thePager').addEventListener('click', function (e) {
        switch (e.target.id) {
            case 'btnFirst':
                view.moveToFirstPage();
                break;
            case 'btnPrev':
                view.moveToPreviousPage();
                break;
            case 'btnNext':
                view.moveToNextPage();
                break;
            case 'btnLast':
                view.moveToLastPage();
                break;
        }
    });

    // allow user to select a page size
    var thePageSize = new wijmo.input.ComboBox('#thePageSize', {
        itemsSource: [6, 8, 10, 12, 20, 25, 50, 1000],
        text: view.pageSize.toString(),
        selectedIndexChanged: function (s, e) {
            view.pageSize = s.selectedValue;
        }
    })
}
