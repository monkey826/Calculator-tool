'use strict'; // always use strict mode!

/**
* =============================
*      XhrFileLoader.js
* =============================
*
* This file contains the logic for "loading" the contents of a 
* plaintext file from some input path and returning those
* contents to a callback.
*
* This is the first file that we'll load in our app, so
* declare the empty, global WijmoPeriodicSunburst object that
* will hold all of our functions and other variables to avoid
* polluting the global scope.
*
*/

var WijmoPeriodicSunburst = {};

/* Define JSDoc callback types */

/**
 * This is a loadObjectCallback for returning an object parsed out from JSON
 *
 * @callback loadObjectCallback
 * @param {Object} jsonObject the JavaScript object parsed from the specified JSON file
 */

WijmoPeriodicSunburst.XhrFileLoader = {
    /**
     * A function that asynchronously reads a local or remote file's plaintext contents and returns them as a payload to a 
     * callback function.
     * 
     * @param {string} filePath a relative or absolute local path or a remote URL to the file to read
     * @param {readFileCallback} callback a callback function that is passed the file contents as a string upon success
     */
    readPlaintextContents: function (filePath, callback) {
        var reqClient = new XMLHttpRequest();
        reqClient.onload = callback;
        reqClient.open("get", filePath, true);
        reqClient.send();
    }
};