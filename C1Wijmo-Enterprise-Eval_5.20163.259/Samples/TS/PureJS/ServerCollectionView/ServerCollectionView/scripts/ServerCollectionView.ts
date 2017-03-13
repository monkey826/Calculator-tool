module wijmo.collections {
    'use strict';

    /**
     * Extends @see:wijmo.collections.CollectionView to retrieve sorted
     * and paginated data from a very simple data service.
     */
    export class ServerCollectionView extends CollectionView {
        _url: string;
        _count: number;
        _toGetData: number;
        _loading: boolean;

        /**
         * Initializes a new instance of the @see:ServerCollectionView class.
         *
         * @param url Url of the data service (e.g. 'DataHandler.ashx').
         * @param options JavaScript object containing initialization data (property
         * values and event handlers) for the @see:ServerCollectionView.
         */
        constructor(url: string, options?: any) {
            super();
            this._url = asString(url, false);
            if (options) {
                copy(this, options);
            }

            // when sortDescriptions change, sort on server
            this.sortDescriptions.collectionChanged.addHandler(() => {
                this._getData();
            });

            // go get the data
            this._getData();
        }

        // ** object model

        /**
         * Gets a value that indicates the @see:ServerCollectionView is 
         * currently loading data.
         * 
         * This property can be used to provide progress indicators.
         */
        get isLoading(): boolean {
            return this._loading;
        }
        /**
         * Occurs when the @see:ServerCollectionView starts loading data.
         */
        loading = new Event();
        /**
         * Raises the @see:loading event.
         */
        onLoading(e?: EventArgs) {
            this.loading.raise(this, e);
        }
        /**
         * Occurs when the @see:ServerCollectionView finishes loading data.
         */
        loaded = new Event();
        /**
         * Raises the @see:loaded event.
         */
        onLoaded(e?: EventArgs) {
            this.loaded.raise(this, e);
        }
        /**
         * Loads or re-loads the data from the server.
         */
        load() {
            this._getData();
        }
        /**
         * Occurs when there is an error reading or writing data.
         */
        error = new Event();
        /**
         * Raises the @see:error event.
         *
         * By default, errors throw exceptions and trigger a data refresh. If you
         * want to prevent this behavior, set the @see:RequestErrorEventArgs.cancel
         * parameter to true in the event handler.
         *
         * @param e @see:RequestErrorEventArgs that contains information about the error.
         */
        onError(e: RequestErrorEventArgs): boolean {
            this.error.raise(this, e);
            return !e.cancel;
        }

        // ** overrides

        // we're paging on the server, so the pageView is the view
        _getPageView() {
            return this._view;
        }
        /**
         * Gets the total number of items in the view before paging is applied.
         */
        get totalItemCount(): number {
            return this._count;
        }
        /**
         * Gets the total number of pages.
         */
        get pageCount(): number {
            return this.pageSize ? Math.ceil(this.totalItemCount / this.pageSize) : 1;
        }
        /**
         * Gets or sets the number of items to display on a page.
         */
        get pageSize(): number {
            return this._pgSz;
        }
        set pageSize(value: number) {
            if (value != this._pgSz) {
                this._pgSz = asInt(value);
                this._pgIdx = clamp(this._pgIdx, 0, this.pageCount - 1); // ensure page index is valid (TFS 121226)
                this._getData();
            }
        }
        /**
         * Raises the @see:pageChanging event.
         *
         * @param e @see:PageChangingEventArgs that contains the event data.
         */
        onPageChanging(e: collections.PageChangingEventArgs): boolean {
            super.onPageChanging(e);
            if (!e.cancel) {
                this._getData();
            }
            return !e.cancel;
        }

        // ** overrides

        // disable sort and filter on client since we're doing it on the server
        _performRefresh() {

            // save settings
            var canFilter = this._canFilter,
                canSort = this._canSort;

            // perform refresh
            this._canFilter = this._canSort = false;
            super._performRefresh();

            // restore settings
            this._canFilter = canFilter;
            this._canSort = canSort;
        }

        // ** implementation

        // get url for OData read request
        /*protected*/ _getReadUrl(): string {
            var url = this._url;
            if (url[url.length - 1] != '/') {
                url += '/';
            }
            return url;
        }

        // get parameters for read request
        /*protected*/ _getReadParams(): any {
            var settings = {}

            // server sort
            if (this.sortDescriptions.length) {
                var sort = '';
                for (var i = 0; i < this.sortDescriptions.length; i++) {
                    var sd = this.sortDescriptions[i];
                    if (sort) sort += ',';
                    sort += sd.property;
                    if (!sd.ascending) sort += ' desc';
                }
                settings['$orderby'] = sort;
            }

            // server paging
            if (this.pageSize > 0) {
                settings['$skip'] = this.pageIndex * this.pageSize;
                settings['$top'] = this.pageSize;
            }

            // done
            return settings;
        }

        // get the data
        /*protected*/ _getData() {

            // get the data on a timeout to avoid doing it too often
            if (this._toGetData) {
                clearTimeout(this._toGetData);
            }
            this._toGetData = setTimeout(() => {

                // start loading
                this._loading = true;
                this.onLoading();

                // go get the data
                var url = this._getReadUrl();
                httpRequest(url, {
                    data: this._getReadParams(),
                    success: (xhr) => {

                        // parse response
                        // (dates are serialized in 'MS format': '/Date(1484679657962)/')
                        var response = JSON.parse(xhr.response, (key, value) => {
                            if (isString(value)) {
                                var match = value.match(/\/Date\((\d+)\)\//);
                                if (match) {
                                    value = new Date(parseInt(match[1]));
                                }
                            }
                            return value;
                        });

                        // store results
                        this._count = response.count;
                        this.sourceCollection = response.value;
                        this.refresh();

                        // done
                        this._loading = false;
                        this.onLoaded();
                    },
                    error: (xhr) => {
                        this._loading = false;
                        this.onLoaded();
                        if (this.onError(new RequestErrorEventArgs(xhr))) {
                            throw 'HttpRequest Error: ' + xhr.status + ' ' + xhr.statusText;
                        }
                    }
                });
            }, 100);
        }

        // handle errors...
        private _error(xhr: XMLHttpRequest) {
            if (this.onError(new RequestErrorEventArgs(xhr))) {
                this._getData();
                throw 'HttpRequest Error: ' + xhr.status + ' ' + xhr.statusText;
            }
        }
    }
}