/**
 * Created by JongHyeok Choi on 2017. 5. 28..
 */

/**
 * Custom Module
 */
const MODE = require('./mode.js');

module.exports = {
    get mode() {
        return MODE.ALL;
    }
};