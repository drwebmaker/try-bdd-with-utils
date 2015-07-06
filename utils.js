module.exports = {
 
    /**
     * Sort given array by provided rule in comparator function
     * @param {Array} list
     * @param {Function} comparator
     */
 
    sort:function (list, comparator) {
        var n = list.length;
        for (var i = 0; i < n-1; i++) {
            for (var j = 0; j < n-1-i; j++) {
                if ((comparator && comparator(list[j], list[j + 1])) || (!comparator && list[j] > list[j+1])) {
                    var t = list[j+1];
                    list[j+1] = list[j];
                    list[j] = t;
                }
            }
        }
        return list;

    },

    /**
     * Make first letter of given string upper case
     * @param {String} string
     * @return {String} capitalized string
     */
 
    capitalize:function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
 
    /**
     * Camelize given string or array of string
     * @param {Array|String} sequence
     * @return {String} capitalized string
     */
 
    camelize:function (sequence) {

        function toCamele(str) {
            return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
                return letter.toUpperCase();
            }).replace(/\s+/g, '');
        }

        if(Object.prototype.toString.call(sequence).toUpperCase() === '[OBJECT STRING]') {
            sequence = toCamele(sequence);
        } else if (Object.prototype.toString.call(sequence).toUpperCase() === '[OBJECT ARRAY]') {
            var str = sequence.toString();
            sequence = toCamele(str).split(",");
        }
        return sequence;
    },
 
    /**
     * Cut of any count of spaces from the beginning and from the end of the string
     * @param {String} str
     * @return {String}
     */
 
    trim:function (str) {
        return str.replace(/(^\s*)/, '').replace(/(\s*$)/, '');
    },

    /**
     * Reverses a specified list.
     * @param {Array} list - a list to be reversed, may be empty.
     * @return {Array} - the same instance of list but reverted
     */
 
    reverse:function (list) {
        var result = [];
        for (var i = 0; i < list.length; i++) {
            result.unshift(list[i]);
        }
        return result;
    },
 
    /**
     *  Change each list's element by applying handler
     *  @params {Array|Object} list - input sequence
     *  @params {Function} iterator  - some rule which changes each element
     *  @return {Array} new list with changes elements
     */
 
    map:function (list, iterator) {
        var tmpArr = [];

        if (Object.prototype.toString.call(list).toUpperCase() === '[OBJECT OBJECT]') {
            var tmpObj = {};
            for(var key in list) {
                if (list.hasOwnProperty(key)) {
                    tmpObj[key] = iterator(list[key]);
                    tmpArr.push(tmpObj[key]);
                }
            }
        } else if(Object.prototype.toString.call(list).toUpperCase() === '[OBJECT ARRAY]') {
            for (var i = 0; i < list.length; i++) {
                tmpArr.push(iterator(list[i]));
            }
        }

        return tmpArr;
    },
 
    /**
     * Group some input sequence of element by some rule
     * @param {Array} list - input sequence
     * @param {Function} iterator -  provide group id for each element
     * @return {Object} object of group id properties which point to arrays of element from input sequence
     */
 
    groupBy:function (list, iterator) {
        var res = {};
        var key;
        for(var i = 0; i<list.length; i++){
            key = iterator(list[i]);
            if(!res[key]){
                res[key] = [];
            }
            res[key].push(list[i]);
        }

        return res;

    },

    /**
     * Creates a version of the function that can only be called one time. 
     * Repeated calls to the modified function will have no effect. 
     * @param {Function} func - your target function
     * @return {Function} new  function which could be invoked only once
     */

    once: function(func){
        return;
    }, 


    /**
     * Creates and returns a new debounced version of the passed function 
     * which will postpone its execution until after wait milliseconds 
     * have elapsed since the last time it was invoked. 
     * @param {Function} func - your target function
     * @param {Number} wait -  milliseconds have elapsed since the last time it was invoked
     * @return {Function} new debounced version of the passed function
     */

    debounce: function(func, wait){
        return;
    },

    /**
     * It compares two objects and returns true or false
     */

    deepEqual: function ( obj1, obj2 ) {
        var countObj1 = 0, countObj2 = 0;
        if (obj1 === obj2) return true;
        if (obj1 === null || typeof obj1 !== "object" || obj2 === null || typeof obj2 !== "object") return false;
        for (var key in obj1) {
            countObj1++;
        }
        for (var prop in obj2) {
            countObj2++;
            if (!(prop in obj1) || !this.deepEqual(obj1[prop], obj2[prop])) return false;
        }
        return countObj1 === countObj2;
    }
};

