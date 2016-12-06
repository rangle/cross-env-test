/**
 * @type {{ env: Object, exit: function(code: number) }}
 */
const process;

/**
 * @param {number} code
 */
process['exit'] = function (code) {}

/**
 * @type {{}}
 */
process['env'] = {};