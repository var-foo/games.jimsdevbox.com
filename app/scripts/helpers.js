'use strict';
/**
 * Helper functions that make life easier, no function here should depend on any framework/library
 */
var Vf = window.Vf || {};
Vf.helper = {

    /**
     * Checks to see if a property is NOT null or undefined
     *
     * @param {obj | string | array} prop The property to check for
     * @returns {Boolean} True if NOT null OR undefined, else false
     */
    nnou: function (prop) {
        return prop !== null && typeof prop !== "undefined";
    },

    /**
     * Check to see if an object is empty
     *
     * @param {Object} obj the object to check
     * @returns {Boolean} True if object is empty
     */
    isEmpty: function (obj) {
        var key,
            hasOwnProperty = Object.prototype.hasOwnProperty;

        // null and undefined are empty
        if (!this.nnou(obj)) {
            return true;
        }
        // If it's an array, we need to see if it has a length
        if (Object.prototype.toString.call(obj) === "[object Array]" && obj.length && obj.length > 0) {
            return false;
        }
        if (Object.prototype.toString.call(obj) === "[object Array]" && obj.length === 0) {
            return true;
        }
        for (key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                return false;
            }
        }
        // Doesn't handle toString and toValue enumeration bugs in IE < 9
        return true;
    },

    /**
     * Set the view path
     * Brought to you by the coalition for shorter strings and easier maintenance.
     *
     * @param {string} path
     * @returns {string}
     */
    setView: function (path, useDiffPath) {
        var rootPath = '/assets/views',
            pathSuffix = '.html';

        if (useDiffPath) {
            return path + pathSuffix;
        } else {
            return rootPath + path + pathSuffix;
        }
    },

    /**
     * Uses $.grep internally to search an array by a key/value pair.
     * @todo This violates the rule on the namespace by requiring jQuery.
     * @param {array} array The array to search
     * @param {string} key The key name to search for
     * @param {string} value the value of the key to search for
     * @param {boolean} invert If true, will return an array of items that didn't match the search.
     * @returns {array}
     */
    searchArray: function (array, key, value, invert) {
        return $.grep(array, function (item) {
            return item[key] === value;
        }, invert);
    }
};


