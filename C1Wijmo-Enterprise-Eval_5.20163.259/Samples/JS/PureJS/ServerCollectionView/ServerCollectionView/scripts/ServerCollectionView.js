var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var wijmo;
(function (wijmo) {
    var collections;
    (function (collections) {
        'use strict';
        /**
         * Extends @see:wijmo.collections.CollectionView to retrieve sorted
         * and paginated data from a very simple data service.
         */
        var ServerCollectionView = (function (_super) {
            __extends(ServerCollectionView, _super);
            /**
             * Initializes a new instance of the @see:ServerCollectionView class.
             *
             * @param url Url of the data service (e.g. 'DataHandler.ashx').
             * @param options JavaScript object containing initialization data (property
             * values and event handlers) for the @see:ServerCollectionView.
             */
            function ServerCollectionView(url, options) {
                var _this = this;
                _super.call(this);
                /**
                 * Occurs when the @see:ServerCollectionView starts loading data.
                 */
                this.loading = new wijmo.Event();
                /**
                 * Occurs when the @see:ServerCollectionView finishes loading data.
                 */
                this.loaded = new wijmo.Event();
                /**
                 * Occurs when there is an error reading or writing data.
                 */
                this.error = new wijmo.Event();
                this._url = wijmo.asString(url, false);
                if (options) {
                    wijmo.copy(this, options);
                }
                // when sortDescriptions change, sort on server
                this.sortDescriptions.collectionChanged.addHandler(function () {
                    _this._getData();
                });
                // go get the data
                this._getData();
            }
            Object.defineProperty(ServerCollectionView.prototype, "isLoading", {
                // ** object model
                /**
                 * Gets a value that indicates the @see:ServerCollectionView is
                 * currently loading data.
                 *
                 * This property can be used to provide progress indicators.
                 */
                get: function () {
                    return this._loading;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Raises the @see:loading event.
             */
            ServerCollectionView.prototype.onLoading = function (e) {
                this.loading.raise(this, e);
            };
            /**
             * Raises the @see:loaded event.
             */
            ServerCollectionView.prototype.onLoaded = function (e) {
                this.loaded.raise(this, e);
            };
            /**
             * Loads or re-loads the data from the server.
             */
            ServerCollectionView.prototype.load = function () {
                this._getData();
            };
            /**
             * Raises the @see:error event.
             *
             * By default, errors throw exceptions and trigger a data refresh. If you
             * want to prevent this behavior, set the @see:RequestErrorEventArgs.cancel
             * parameter to true in the event handler.
             *
             * @param e @see:RequestErrorEventArgs that contains information about the error.
             */
            ServerCollectionView.prototype.onError = function (e) {
                this.error.raise(this, e);
                return !e.cancel;
            };
            // ** overrides
            // we're paging on the server, so the pageView is the view
            ServerCollectionView.prototype._getPageView = function () {
                return this._view;
            };
            Object.defineProperty(ServerCollectionView.prototype, "totalItemCount", {
                /**
                 * Gets the total number of items in the view before paging is applied.
                 */
                get: function () {
                    return this._count;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ServerCollectionView.prototype, "pageCount", {
                /**
                 * Gets the total number of pages.
                 */
                get: function () {
                    return this.pageSize ? Math.ceil(this.totalItemCount / this.pageSize) : 1;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ServerCollectionView.prototype, "pageSize", {
                /**
                 * Gets or sets the number of items to display on a page.
                 */
                get: function () {
                    return this._pgSz;
                },
                set: function (value) {
                    if (value != this._pgSz) {
                        this._pgSz = wijmo.asInt(value);
                        this._pgIdx = wijmo.clamp(this._pgIdx, 0, this.pageCount - 1); // ensure page index is valid (TFS 121226)
                        this._getData();
                    }
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Raises the @see:pageChanging event.
             *
             * @param e @see:PageChangingEventArgs that contains the event data.
             */
            ServerCollectionView.prototype.onPageChanging = function (e) {
                _super.prototype.onPageChanging.call(this, e);
                if (!e.cancel) {
                    this._getData();
                }
                return !e.cancel;
            };
            // ** overrides
            // disable sort and filter on client since we're doing it on the server
            ServerCollectionView.prototype._performRefresh = function () {
                // save settings
                var canFilter = this._canFilter, canSort = this._canSort;
                // perform refresh
                this._canFilter = this._canSort = false;
                _super.prototype._performRefresh.call(this);
                // restore settings
                this._canFilter = canFilter;
                this._canSort = canSort;
            };
            // ** implementation
            // get url for OData read request
            /*protected*/ ServerCollectionView.prototype._getReadUrl = function () {
                var url = this._url;
                if (url[url.length - 1] != '/') {
                    url += '/';
                }
                return url;
            };
            // get parameters for read request
            /*protected*/ ServerCollectionView.prototype._getReadParams = function () {
                var settings = {};
                // server sort
                if (this.sortDescriptions.length) {
                    var sort = '';
                    for (var i = 0; i < this.sortDescriptions.length; i++) {
                        var sd = this.sortDescriptions[i];
                        if (sort)
                            sort += ',';
                        sort += sd.property;
                        if (!sd.ascending)
                            sort += ' desc';
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
            };
            // get the data
            /*protected*/ ServerCollectionView.prototype._getData = function () {
                var _this = this;
                // get the data on a timeout to avoid doing it too often
                if (this._toGetData) {
                    clearTimeout(this._toGetData);
                }
                this._toGetData = setTimeout(function () {
                    // start loading
                    _this._loading = true;
                    _this.onLoading();
                    // go get the data
                    var url = _this._getReadUrl();
                    wijmo.httpRequest(url, {
                        data: _this._getReadParams(),
                        success: function (xhr) {
                            // parse response
                            // (dates are serialized in 'MS format': '/Date(1484679657962)/')
                            var response = JSON.parse(xhr.response, function (key, value) {
                                if (wijmo.isString(value)) {
                                    var match = value.match(/\/Date\((\d+)\)\//);
                                    if (match) {
                                        value = new Date(parseInt(match[1]));
                                    }
                                }
                                return value;
                            });
                            // store results
                            _this._count = response.count;
                            _this.sourceCollection = response.value;
                            _this.refresh();
                            // done
                            _this._loading = false;
                            _this.onLoaded();
                        },
                        error: function (xhr) {
                            _this._loading = false;
                            _this.onLoaded();
                            if (_this.onError(new wijmo.RequestErrorEventArgs(xhr))) {
                                throw 'HttpRequest Error: ' + xhr.status + ' ' + xhr.statusText;
                            }
                        }
                    });
                }, 100);
            };
            // handle errors...
            ServerCollectionView.prototype._error = function (xhr) {
                if (this.onError(new wijmo.RequestErrorEventArgs(xhr))) {
                    this._getData();
                    throw 'HttpRequest Error: ' + xhr.status + ' ' + xhr.statusText;
                }
            };
            return ServerCollectionView;
        }(collections.CollectionView));
        collections.ServerCollectionView = ServerCollectionView;
    })(collections = wijmo.collections || (wijmo.collections = {}));
})(wijmo || (wijmo = {}));
//# sourceMappingURL=ServerCollectionView.js.map